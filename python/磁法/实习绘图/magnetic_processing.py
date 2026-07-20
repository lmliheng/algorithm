"""
磁法数据处理：向上延拓、化极(RTP)、垂向一阶导数
数据来源：data/ 目录下的 CSV 文件
IGRF参数：GPS(29.0470032, 113.1393198), 海拔35m, 2026年
"""
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap
from scipy.interpolate import griddata
from scipy.ndimage import gaussian_filter
import warnings
warnings.filterwarnings('ignore')


# ============ GMT 经典地质图风格 ============
def set_gmt_style():
    """设置 GMT (Generic Mapping Tools) 经典地质勘探图风格"""
    plt.rcParams.update({
        # 字体：中文字体优先，西文 Helvetica/Arial 作为 fallback
        'font.family': 'sans-serif',
        'font.sans-serif': ['Microsoft YaHei', 'SimHei', 'Helvetica', 'Arial', 'DejaVu Sans'],
        'font.size': 9,
        'axes.unicode_minus': False,

        # 坐标轴：四周完整边框（GMT 经典 frame）
        'axes.linewidth': 1.0,
        'axes.edgecolor': 'black',
        'axes.labelsize': 9,
        'axes.labelcolor': 'black',
        'axes.titlesize': 10,
        'axes.titleweight': 'normal',
        'axes.labelweight': 'normal',
        'axes.spines.top': True,
        'axes.spines.right': True,
        'axes.facecolor': '#f5f5f2',  # 略带米色的地质图底色

        # 刻度：朝内（GMT 默认）
        'xtick.labelsize': 8,
        'ytick.labelsize': 8,
        'xtick.direction': 'in',
        'ytick.direction': 'in',
        'xtick.major.size': 4.0,
        'ytick.major.size': 4.0,
        'xtick.minor.size': 2.5,
        'ytick.minor.size': 2.5,
        'xtick.major.width': 1.0,
        'ytick.major.width': 1.0,
        'xtick.minor.width': 0.6,
        'ytick.minor.width': 0.6,
        'xtick.color': 'black',
        'ytick.color': 'black',

        # 网格（GMT 经典 grid 线）
        'axes.grid': True,
        'axes.grid.which': 'major',
        'grid.color': '#b0b0b0',
        'grid.linestyle': '--',
        'grid.linewidth': 0.5,
        'grid.alpha': 0.6,

        # 图例
        'legend.fontsize': 8,
        'legend.frameon': True,
        'legend.edgecolor': 'black',
        'legend.facecolor': 'white',

        # 线条
        'lines.linewidth': 1.0,

        # 保存
        'savefig.dpi': 600,
        'savefig.bbox': 'tight',
        'savefig.facecolor': 'white',
    })


# GMT 风格磁异常配色：地形高程色阶（绿-黄-棕），模拟 GMT 的 globe/globe-cmap
# 正异常=暖色（高地），负异常=冷色（深谷）
def _make_gmt_terrain_cmap():
    nodes = [0.00, 0.15, 0.30, 0.45, 0.60, 0.75, 1.00]
    colors = ['#08306b',   # 深海蓝（负异常强）
              '#2171b5',   # 海蓝
              '#6baed6',   # 浅蓝（接近零）
              '#fee391',   # 浅黄
              '#fe9929',   # 橙
              '#cc4c02',   # 红棕
              '#7f2704']   # 深棕（正异常强）
    return LinearSegmentedColormap.from_list('gmt_terrain', list(zip(nodes, colors)))


GMT_CMAP = _make_gmt_terrain_cmap()


def add_panel_label(ax, label, x=-0.08, y=1.02):
    """在子图左上角添加 panel 标签 (a, b, c, ...)"""
    ax.text(x, y, label, transform=ax.transAxes,
            fontsize=11, fontweight='bold', va='top', ha='left',
            color='black')


set_gmt_style()


# ============ IGRF-14 计算 ============
# from pyIGRF.value import igrf_value

# LAT = 29.0470032
# LON = 113.1393198
# ALT_KM = 0.035  # 35m -> km
# YEAR = 2026.5   # 2026年7月

# D, I, H, X, Y, Z, F = igrf_value(LAT, LON, ALT_KM, YEAR)
# print(f"=== IGRF-14 磁场参数 ===")
# print(f"位置: ({LAT}, {LON}), 海拔: {ALT_KM*1000}m")
# print(f"磁偏角 D = {D:.2f}°")
# print(f"磁倾角 I = {I:.2f}°")
# print(f"总场强度 F = {F:.1f} nT")
# print(f"水平分量 H = {H:.1f} nT")
# print(f"北向 X = {X:.1f} nT, 东向 Y = {Y:.1f} nT, 垂直 Z = {Z:.1f} nT")
# print()

INC = 45.43
DEC = -4.33


# ============ 日变校正函数 ============
def get_diurnal_value(time_input, diurnal_file='data/Diurnal_Station.csv'):
    import os
    if not os.path.exists(diurnal_file):
        raise FileNotFoundError(f"日变站文件不存在: {diurnal_file}")

    if not hasattr(get_diurnal_value, 'diurnal_data'):
        raw_data = np.loadtxt(diurnal_file, delimiter=',', skiprows=1,
                              encoding='utf-8-sig', usecols=(0, 1))
        time_raw = raw_data[:, 1].astype(int)
        hh = time_raw // 10000
        mm = (time_raw % 10000) // 100
        ss = time_raw % 100
        time_seconds = hh * 3600 + mm * 60 + ss
        get_diurnal_value.diurnal_data = {
            'nT': raw_data[:, 0],
            'time_seconds': time_seconds
        }

    t_int = time_input.astype(int)
    input_hh = t_int // 10000
    input_mm = (t_int % 10000) // 100
    input_ss = t_int % 100
    input_seconds = input_hh * 3600 + input_mm * 60 + input_ss

    t_min = get_diurnal_value.diurnal_data['time_seconds'].min()
    t_max = get_diurnal_value.diurnal_data['time_seconds'].max()
    input_seconds = np.clip(input_seconds, t_min, t_max)

    nT = np.interp(input_seconds,
                   get_diurnal_value.diurnal_data['time_seconds'],
                   get_diurnal_value.diurnal_data['nT'])
    return nT


# ============ 读取测线数据 ============
line_names = [
    'Line01_Raw.csv', 'Line02_Raw.csv', 'Line03_Raw.csv',
    'Line04_Raw.csv', 'Line05_Raw.csv', 'Line06_Raw.csv'
]
line_spacing = 5  # 测线间距（米）

all_x, all_y, all_deltaT = [], [], []

for i, filename in enumerate(line_names, start=1):
    file_path = f'data/{filename}'
    try:
        data = np.loadtxt(file_path, delimiter=',', skiprows=1, encoding='utf-8-sig')
        dist = data[:, 0]
        field = data[:, 1]
        meas_time = data[:, 2]
    except Exception as e:
        print(f"读取 {file_path} 失败: {e}")
        continue

    diurnal_val = get_diurnal_value(meas_time)
    deltaT = field - diurnal_val

    xCoord = dist
    yCoord = i * line_spacing * np.ones_like(dist)

    all_x.extend(xCoord)
    all_y.extend(yCoord)
    all_deltaT.extend(deltaT)
    print(f"测线{i}: {len(dist)}个测点, ΔT范围 [{np.min(deltaT):.1f}, {np.max(deltaT):.1f}] nT")

all_x = np.array(all_x)
all_y = np.array(all_y)
all_deltaT = np.array(all_deltaT)

print(f"\n总计: {len(all_x)} 个测点")
print(f"ΔT范围: [{all_deltaT.min():.1f}, {all_deltaT.max():.1f}] nT\n")


# ============ 网格化插值 ============
nx, ny = 200, 200
grid_x = np.linspace(all_x.min(), all_x.max(), nx)
grid_y = np.linspace(5, 30, ny)
XI, YI = np.meshgrid(grid_x, grid_y)

ZI = griddata((all_x, all_y), all_deltaT, (XI, YI), method='cubic')

# 用最近邻填充 NaN 边缘
ZI_nn = griddata((all_x, all_y), all_deltaT, (XI, YI), method='nearest')
mask = np.isnan(ZI)
ZI[mask] = ZI_nn[mask]

# 轻微平滑以减少插值噪声
ZI = gaussian_filter(ZI, sigma=2)

# 网格间距
dx = (all_x.max() - all_x.min()) / (nx - 1)
dy = (30 - 5) / (ny - 1)


# ============ FFT 频域处理工具函数 ============

def get_wavenumbers(nx, ny, dx, dy):
    """计算波数矩阵"""
    kx = 2 * np.pi * np.fft.fftfreq(nx, d=dx)
    ky = 2 * np.pi * np.fft.fftfreq(ny, d=dy)
    KX, KY = np.meshgrid(kx, ky)
    K = np.sqrt(KX**2 + KY**2)
    K[0, 0] = 1e-10  # 避免除零
    return KX, KY, K


def pad_grid(Z, pad_factor=2):
    """镜像延拓以减少边缘效应"""
    ny, nx = Z.shape
    pnx, pny = nx * pad_factor, ny * pad_factor
    Z_pad = np.zeros((pny, pnx))

    # 中心区域
    oy = (pny - ny) // 2
    ox = (pnx - nx) // 2
    Z_pad[oy:oy+ny, ox:ox+nx] = Z

    # 镜像延拓四个边
    Z_pad[:oy, ox:ox+nx] = Z[1:oy+1, :][::-1, :]       # 上
    Z_pad[oy+ny:, ox:ox+nx] = Z[-(oy+1):-1, :][::-1, :] # 下
    Z_pad[oy:oy+ny, :ox] = Z[:, 1:ox+1][:, ::-1]        # 左
    Z_pad[oy:oy+ny, ox+nx:] = Z[:, -(ox+1):-1][:, ::-1]  # 右

    # 四个角
    Z_pad[:oy, :ox] = Z[1:oy+1, 1:ox+1][::-1, ::-1]
    Z_pad[:oy, ox+nx:] = Z[1:oy+1, -(ox+1):-1][::-1, ::-1]
    Z_pad[oy+ny:, :ox] = Z[-(oy+1):-1, 1:ox+1][::-1, ::-1]
    Z_pad[oy+ny:, ox+nx:] = Z[-(oy+1):-1, -(ox+1):-1][::-1, ::-1]

    return Z_pad, (oy, ox, ny, nx)


def unpad_grid(Z_pad, info):
    """裁剪回原始大小"""
    oy, ox, ny, nx = info
    return Z_pad[oy:oy+ny, ox:ox+nx]


def upward_continuation(Z, dx, dy, height):
    """
    向上延拓：将磁场数据向上延拓 height 米
    频域滤波器: exp(-k * h)
    """
    ny, nx = Z.shape
    Z_pad, info = pad_grid(Z)
    pny, pnx = Z_pad.shape
    pdx = dx
    pdy = dy

    KX, KY, K = get_wavenumbers(pnx, pny, pdx, pdy)

    F = np.fft.fft2(Z_pad)
    F_uc = F * np.exp(-K * height)
    Z_uc = np.real(np.fft.ifft2(F_uc))

    return unpad_grid(Z_uc, info)


def reduction_to_pole(Z, dx, dy, inc, dec):
    """
    化极处理（Reduction to the Pole）
    将斜磁化异常转换为垂直磁化（极地）异常

    参数:
        inc: 磁倾角（度），正向下
        dec: 磁偏角（度），正东偏
    假设: x=北, y=东, 感应磁化（磁化方向=地磁场方向）
    """
    ny, nx = Z.shape
    Z_pad, info = pad_grid(Z)
    pny, pnx = Z_pad.shape

    KX, KY, K = get_wavenumbers(pnx, pny, dx, dy)

    inc_rad = np.radians(inc)
    dec_rad = np.radians(dec)

    # 方向因子（感应磁化，场方向 = 磁化方向）
    # theta = sin(I) + i * cos(I) * (kx*cos(D) + ky*sin(D)) / k
    theta = (np.sin(inc_rad) +
             1j * np.cos(inc_rad) * (KX * np.cos(dec_rad) + KY * np.sin(dec_rad)) / K)

    # RTP 滤波器 = 1 / theta^2
    rtp_filter = 1.0 / (theta * theta)

    # DC 分量保持不变
    rtp_filter[0, 0] = 1.0

    # 限制滤波器振幅，防止低纬度放大噪声
    max_amp = 10.0
    amp = np.abs(rtp_filter)
    scale = np.where(amp > max_amp, max_amp / amp, 1.0)
    rtp_filter = rtp_filter * scale

    F = np.fft.fft2(Z_pad)
    F_rtp = F * rtp_filter
    Z_rtp = np.real(np.fft.ifft2(F_rtp))

    return unpad_grid(Z_rtp, info)


def vertical_derivative(Z, dx, dy, order=1):
    """
    垂向n阶导数
    频域滤波器: k^n
    """
    ny, nx = Z.shape
    Z_pad, info = pad_grid(Z)
    pny, pnx = Z_pad.shape

    KX, KY, K = get_wavenumbers(pnx, pny, dx, dy)

    F = np.fft.fft2(Z_pad)
    vd_filter = K**order
    vd_filter[0, 0] = 0  # 去除直流分量

    F_vd = F * vd_filter
    Z_vd = np.real(np.fft.ifft2(F_vd))

    return unpad_grid(Z_vd, info)


# 1. 向上延拓
heights = [5, 10, 20]  # 延拓高度（米）
Z_uc_list = []
for h in heights:
    Z_uc = upward_continuation(ZI, dx, dy, h)
    Z_uc_list.append(Z_uc)
    print(f"向上延拓 {h}m: ΔT范围 [{np.nanmin(Z_uc):.1f}, {np.nanmax(Z_uc):.1f}] nT")

# 2. 化极
Z_rtp = reduction_to_pole(ZI, dx, dy, INC, DEC)
print(f"化极处理: ΔT范围 [{np.nanmin(Z_rtp):.1f}, {np.nanmax(Z_rtp):.1f}] nT")

# 3. 垂向一阶导数
Z_vd = vertical_derivative(ZI, dx, dy, order=1)
print(f"垂向一阶导数: 范围 [{np.nanmin(Z_vd):.4f}, {np.nanmax(Z_vd):.4f}] nT/m")

# 化极后的垂向导数
Z_rtp_vd = vertical_derivative(Z_rtp, dx, dy, order=1)
print(f"化极后垂向导数: 范围 [{np.nanmin(Z_rtp_vd):.4f}, {np.nanmax(Z_rtp_vd):.4f}] nT/m")
print()


# ============ 绘图函数 (GMT 地质风格) ============
def plot_contour(ax, XI, YI, ZI_data, title, cbar_label,
                 levels=20, show_points=False, show_lines=True,
                 vmin=None, vmax=None):
    """GMT 经典地质勘探图风格等值线绘图函数"""
    if vmin is None:
        vmin = np.nanpercentile(ZI_data, 2)
    if vmax is None:
        vmax = np.nanpercentile(ZI_data, 98)

    # GMT 地形色阶填充
    cf = ax.contourf(XI, YI, ZI_data, levels=levels, cmap=GMT_CMAP,
                     alpha=0.95, vmin=vmin, vmax=vmax)
    # 等值线：深棕色粗线（GMT 经典风格）
    cs = ax.contour(XI, YI, ZI_data, levels=10, colors='#5a3a1a',
                    linewidths=0.8)
    ax.clabel(cs, inline=True, fontsize=6, fmt='%.0f', colors='black')

    if show_points:
        # 黑色实心测点（GMT 风格）
        ax.scatter(all_x, all_y, c='black', s=10, marker='o',
                   zorder=5, edgecolors='white', linewidths=0.4)

    if show_lines:
        for i in range(1, len(line_names) + 1):
            y_pos = i * line_spacing
            ax.text(all_x.max() * 1.02, y_pos, f'L{i}', fontsize=8,
                    verticalalignment='center', color='black',
                    fontweight='bold')

    ax.set_ylim(5, 30)
    ax.set_yticks(np.arange(1, len(line_names) + 1) * line_spacing)
    ax.set_yticklabels([str(i) for i in range(1, len(line_names) + 1)])
    # 中文标签（地质勘探报告惯例）
    ax.set_ylabel('测线编号', fontsize=9)
    ax.set_xlabel('测线方向距离 (m)', fontsize=9)
    ax.set_title(title, fontsize=10, pad=8)
    ax.set_aspect('equal', adjustable='box')
    return cf


# ============ 图1: 向上延拓（4 panel，GMT 风格） ============
fig, axes = plt.subplots(2, 2, figsize=(7.16, 5.8))
panel_labels = ['a', 'b', 'c', 'd']

# 原始 ΔT
cf = plot_contour(axes[0, 0], XI, YI, ZI,
                  f'ΔT 磁异常\n(D={DEC:.2f}°, I={INC:.2f}°)',
                  'ΔT (nT)', show_points=True)
add_panel_label(axes[0, 0], 'a')
cbar1 = fig.colorbar(cf, ax=axes[0, 0], label='ΔT (nT)',
                     shrink=0.85, pad=0.03)
cbar1.ax.tick_params(labelsize=7)
cbar1.outline.set_edgecolor('black')
cbar1.outline.set_linewidth(0.8)

# 延拓 5m, 10m, 20m
for idx, h in enumerate(heights):
    ax = axes.flat[idx + 1]
    cf = plot_contour(ax, XI, YI, Z_uc_list[idx],
                      f'向上延拓 {h} m',
                      'ΔT (nT)')
    add_panel_label(ax, panel_labels[idx + 1])
    cbar = fig.colorbar(cf, ax=ax, label='ΔT (nT)', shrink=0.85, pad=0.03)
    cbar.ax.tick_params(labelsize=7)
    cbar.outline.set_edgecolor('black')
    cbar.outline.set_linewidth(0.8)

plt.tight_layout(w_pad=1.8, h_pad=1.6)
plt.savefig('upward_continuation.png', dpi=600, bbox_inches='tight')
plt.close()
print("已保存: upward_continuation.png")

# ============ 图2: 化极处理（2 panel） ============
fig, axes = plt.subplots(1, 2, figsize=(7.16, 3.2))

cf = plot_contour(axes[0], XI, YI, ZI,
                  f'化极前 ΔT\n(I={INC:.2f}°, D={DEC:.2f}°)',
                  'ΔT (nT)', show_points=True)
add_panel_label(axes[0], 'a')
cbar = fig.colorbar(cf, ax=axes[0], label='ΔT (nT)', shrink=0.9, pad=0.03)
cbar.ax.tick_params(labelsize=7)
cbar.outline.set_edgecolor('black')
cbar.outline.set_linewidth(0.8)

cf = plot_contour(axes[1], XI, YI, Z_rtp,
                  '化极后 ΔT (RTP)\n(垂直磁化)',
                  'ΔT (nT)', show_points=True)
add_panel_label(axes[1], 'b')
cbar = fig.colorbar(cf, ax=axes[1], label='ΔT (nT)', shrink=0.9, pad=0.03)
cbar.ax.tick_params(labelsize=7)
cbar.outline.set_edgecolor('black')
cbar.outline.set_linewidth(0.8)

plt.tight_layout(w_pad=2.5)
plt.savefig('reduction_to_pole.png', dpi=600, bbox_inches='tight')
plt.close()
print("已保存: reduction_to_pole.png")

# ============ 图3: 垂向导数（2 panel） ============
fig, axes = plt.subplots(1, 2, figsize=(7.16, 3.2))

cf = plot_contour(axes[0], XI, YI, Z_vd,
                  '垂向一阶导数 ∂ΔT/∂z\n(化极前)',
                  '∂ΔT/∂z (nT/m)', show_points=True)
add_panel_label(axes[0], 'a')
cbar = fig.colorbar(cf, ax=axes[0], label='∂ΔT/∂z (nT/m)',
                    shrink=0.9, pad=0.03)
cbar.ax.tick_params(labelsize=7)
cbar.outline.set_edgecolor('black')
cbar.outline.set_linewidth(0.8)

cf = plot_contour(axes[1], XI, YI, Z_rtp_vd,
                  '垂向一阶导数 ∂ΔT/∂z\n(化极后)',
                  '∂ΔT/∂z (nT/m)', show_points=True)
add_panel_label(axes[1], 'b')
cbar = fig.colorbar(cf, ax=axes[1], label='∂ΔT/∂z (nT/m)',
                    shrink=0.9, pad=0.03)
cbar.ax.tick_params(labelsize=7)
cbar.outline.set_edgecolor('black')
cbar.outline.set_linewidth(0.8)

plt.tight_layout(w_pad=2.5)
plt.savefig('vertical_derivative.png', dpi=600, bbox_inches='tight')
plt.close()
print("已保存: vertical_derivative.png")

# ============ 图4: 综合对比（6 panel） ============
fig, axes = plt.subplots(3, 2, figsize=(7.16, 7.2))
summary_labels = ['a', 'b', 'c', 'd', 'e', 'f']

# Row 1: 原始 & 化极
cf = plot_contour(axes[0, 0], XI, YI, ZI,
                  f'原始 ΔT\n(I={INC:.2f}°, D={DEC:.2f}°)',
                  'ΔT (nT)', show_points=True)
add_panel_label(axes[0, 0], 'a')
cbar = fig.colorbar(cf, ax=axes[0, 0], shrink=0.85, pad=0.03)
cbar.ax.tick_params(labelsize=6)
cbar.outline.set_edgecolor('black')
cbar.outline.set_linewidth(0.8)

cf = plot_contour(axes[0, 1], XI, YI, Z_rtp,
                  '化极处理 (RTP)',
                  'ΔT (nT)', show_points=True)
add_panel_label(axes[0, 1], 'b')
cbar = fig.colorbar(cf, ax=axes[0, 1], shrink=0.85, pad=0.03)
cbar.ax.tick_params(labelsize=6)
cbar.outline.set_edgecolor('black')
cbar.outline.set_linewidth(0.8)

# Row 2: 向上延拓 10m & 20m
cf = plot_contour(axes[1, 0], XI, YI, Z_uc_list[1],
                  '向上延拓 10 m',
                  'ΔT (nT)')
add_panel_label(axes[1, 0], 'c')
cbar = fig.colorbar(cf, ax=axes[1, 0], shrink=0.85, pad=0.03)
cbar.ax.tick_params(labelsize=6)
cbar.outline.set_edgecolor('black')
cbar.outline.set_linewidth(0.8)

cf = plot_contour(axes[1, 1], XI, YI, Z_uc_list[2],
                  '向上延拓 20 m',
                  'ΔT (nT)')
add_panel_label(axes[1, 1], 'd')
cbar = fig.colorbar(cf, ax=axes[1, 1], shrink=0.85, pad=0.03)
cbar.ax.tick_params(labelsize=6)
cbar.outline.set_edgecolor('black')
cbar.outline.set_linewidth(0.8)

# Row 3: 垂向导数
cf = plot_contour(axes[2, 0], XI, YI, Z_vd,
                  '垂向一阶导数\n(化极前)',
                  '∂ΔT/∂z (nT/m)', show_points=False)
add_panel_label(axes[2, 0], 'e')
cbar = fig.colorbar(cf, ax=axes[2, 0], shrink=0.85, pad=0.03)
cbar.ax.tick_params(labelsize=6)
cbar.outline.set_edgecolor('black')
cbar.outline.set_linewidth(0.8)

cf = plot_contour(axes[2, 1], XI, YI, Z_rtp_vd,
                  '垂向一阶导数\n(化极后)',
                  '∂ΔT/∂z (nT/m)', show_points=False)
add_panel_label(axes[2, 1], 'f')
cbar = fig.colorbar(cf, ax=axes[2, 1], shrink=0.85, pad=0.03)
cbar.ax.tick_params(labelsize=6)
cbar.outline.set_edgecolor('black')
cbar.outline.set_linewidth(0.8)

plt.tight_layout(w_pad=1.5, h_pad=1.8)
plt.savefig('summary_all_processing.png', dpi=600, bbox_inches='tight')
plt.close()
print("已保存: summary_all_processing.png")

