import numpy as np
import matplotlib
matplotlib.use('Agg')  # 非交互后端，直接保存图片
import matplotlib.pyplot as plt
from scipy.interpolate import griddata
import warnings
warnings.filterwarnings('ignore')

from matplotlib.ticker import FuncFormatter

# 中文字体设置
plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'Arial Unicode MS']
plt.rcParams['axes.unicode_minus'] = False


# ============ 日变校正函数 ============
def get_diurnal_value(time_input, diurnal_file='data/Diurnal_Station.csv'):
    """根据时间获取日变站磁场强度值"""
    import os
    if not os.path.exists(diurnal_file):
        raise FileNotFoundError(f"日变站文件不存在: {diurnal_file}")

    if not hasattr(get_diurnal_value, 'diurnal_data'):
        raw_data = np.loadtxt(diurnal_file, delimiter=',', skiprows=1,
                              encoding='utf-8-sig', usecols=(0, 1))

        # 时间转换：HHMMSS → 秒
        time_raw = raw_data[:, 1].astype(int)
        hh = time_raw // 10000
        mm = (time_raw % 10000) // 100
        ss = time_raw % 100
        time_seconds = hh * 3600 + mm * 60 + ss

        get_diurnal_value.diurnal_data = {
            'nT': raw_data[:, 0],
            'time_seconds': time_seconds
        }

    # 输入时间转换
    t_int = time_input.astype(int)
    input_hh = t_int // 10000
    input_mm = (t_int % 10000) // 100
    input_ss = t_int % 100
    input_seconds = input_hh * 3600 + input_mm * 60 + input_ss

    # 时间范围限制
    t_min = get_diurnal_value.diurnal_data['time_seconds'].min()
    t_max = get_diurnal_value.diurnal_data['time_seconds'].max()
    input_seconds = np.clip(input_seconds, t_min, t_max)

    # 线性插值
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

all_x, all_y, all_deltaT, all_line_no = [], [], [], []

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

    # 日变校正
    diurnal_val = get_diurnal_value(meas_time)
    deltaT = field - diurnal_val

    # 坐标分配：测线编号1~6对应y=5,10,...,30，间距5米
    xCoord = dist
    yCoord = i * line_spacing * np.ones_like(dist)

    all_x.extend(xCoord)
    all_y.extend(yCoord)
    all_deltaT.extend(deltaT)
    all_line_no.extend([i] * len(dist))

    print(f"测线{i} ({filename}): {len(dist)}个测点, ΔT范围 [{np.min(deltaT):.1f}, {np.max(deltaT):.1f}] nT")

# 转换为 numpy 数组
all_x = np.array(all_x)
all_y = np.array(all_y)
all_deltaT = np.array(all_deltaT)
all_line_no = np.array(all_line_no)

print(f"\n总计: {len(all_x)} 个测点")
print(f"X范围: [{all_x.min():.1f}, {all_x.max():.1f}] m")
print(f"Y范围: [{all_y.min():.1f}, {all_y.max():.1f}] m")
print(f"ΔT范围: [{all_deltaT.min():.1f}, {all_deltaT.max():.1f}] nT")


# ============ 网格化插值 ============
grid_x = np.linspace(all_x.min(), all_x.max(), 200)
grid_y = np.linspace(5, 30, 200)
XI, YI = np.meshgrid(grid_x, grid_y)

ZI = griddata((all_x, all_y), all_deltaT, (XI, YI), method='cubic')


# ============ 等值线图 ============
fig, ax = plt.subplots(figsize=(10, 8))

# 等值线填充
levels = 20
contourf = ax.contourf(XI, YI, ZI, levels=levels, cmap='RdBu_r', alpha=0.9)
contour = ax.contour(XI, YI, ZI, levels=10, colors='k', linewidths=0.8)
ax.clabel(contour, inline=True, fontsize=8, fmt='%.1f')

# 所有测点位置
ax.scatter(all_x, all_y, c='black', s=20, marker='o', zorder=5, label='测点位置')

# 标注每个测点的 ΔT 值
for px, py, pv in zip(all_x, all_y, all_deltaT):
    ax.annotate(f'{pv:.1f}', xy=(px, py), xytext=(3, 3),
                textcoords='offset points', fontsize=6, color='black')

# 测线编号标注（右侧）
for i in range(1, len(line_names) + 1):
    y_pos = i * line_spacing
    ax.text(all_x.max() + 1.5, y_pos, f'L{i}', fontsize=11,
            verticalalignment='center', fontweight='bold')

# 纵坐标：测线编号 1~6，间距5米
ax.set_ylim(5, 30)
ax.set_yticks(np.arange(1, len(line_names) + 1) * line_spacing)
ax.set_yticklabels(np.arange(1, len(line_names) + 1))
ax.set_ylabel('测线编号', fontsize=12)

# 横坐标：测线方向
ax.set_xlabel('测线方向 (m)', fontsize=12)
fig.colorbar(contourf, ax=ax, label='ΔT (nT)')
ax.legend(loc='lower left')
plt.tight_layout()
plt.savefig('style1_basic.png', dpi=300, bbox_inches='tight')
plt.close()
print("已保存: style1_basic.png")
print("\n图像生成完成！")
