import numpy as np
import matplotlib.pyplot as plt
from seispy.core.depmodel import DepModel

# ========== 第一部分：画图（你的原始代码修正版） ==========
depth = np.array([0, 1, 3, 10, 15, 23, 33, 35])
v = np.array([2.0, 2.5, 3.0, 3.8, 4.5, 5.0, 7.5])

# 修正：直接传入深度节点和速度
depmod = DepModel(depth, v, v)

# 绘制速度-深度曲线
fig, ax = plt.subplots(figsize=(8, 10))
depmod.plot_model(show=False)
plt.title("Velocity Model with Source and Station")
plt.grid(True, alpha=0.3)

# 标记震源位置
ax.axhline(y=22, color='red', linestyle='--', label=f'Source Depth = 22 km')
ax.legend()
plt.show()

# ========== 第二部分：手动计算首波走时 ==========
print("\n" + "="*50)
print("首波走时计算")
print("="*50)

# 参数
h_source = 22.0      # 震源深度 (km)
X_station = 100.0    # 震中距 (km)

# 确定震源所在的层和下方的折射层
# 震源在 15-23 km 层，速度 v1 = 4.5 km/s
# 下方的折射层是 33-35 km 层，速度 v2 = 7.5 km/s
v1 = 4.5   # 震源层速度
v2 = 7.5   # 折射层速度
h_refractor = 33.0  # 折射层顶界深度

dh = h_refractor - h_source  # 11 km

# 临界角计算
sin_ic = v1 / v2
ic = np.arcsin(sin_ic)
cos_ic = np.cos(ic)
tan_ic = np.tan(ic)

print(f"临界角 ic = {np.degrees(ic):.2f}°")
print(f"sin(ic) = {sin_ic:.4f}")
print(f"cos(ic) = {cos_ic:.4f}")
print(f"tan(ic) = {tan_ic:.4f}")

# 临界距离
Xc = 2 * dh * tan_ic
print(f"临界距离 Xc = {Xc:.2f} km")

if X_station <= Xc:
    print(f"震中距 {X_station} km ≤ 临界距离 {Xc:.2f} km")
    print("没有首波到达！")
else:
    # 首波走时计算
    T_head = (2 * dh * cos_ic) / v1 + (X_station - 2 * dh * tan_ic) / v2
    print(f"\n震中距 X = {X_station} km")
    print(f"首波走时 T = {T_head:.2f} 秒")
    
    # 分解走时
    T_down_up = (2 * dh * cos_ic) / v1
    T_along = (X_station - 2 * dh * tan_ic) / v2
    print(f"  下行+上行时间: {T_down_up:.2f} 秒")
    print(f"  沿界面滑行时间: {T_along:.2f} 秒")

# ========== 第三部分：验证不同震中距的走时 ==========
print("\n" + "="*50)
print("不同震中距的首波走时")
print("="*50)

distances = [50, 80, 100, 150, 200, 300]
print(f"{'震中距(km)':<12} {'走时(s)':<10} {'是否为首波':<10}")
print("-"*32)

for X in distances:
    if X <= Xc:
        print(f"{X:<12} {'N/A':<10} {'否(太近)':<10}")
    else:
        T = (2 * dh * cos_ic) / v1 + (X - 2 * dh * tan_ic) / v2
        print(f"{X:<12} {T:<10.2f} {'是':<10}")