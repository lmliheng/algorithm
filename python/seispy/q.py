import numpy as np
from seispy.taup import taup_time
from seispy.core.depmodel import DepModel

# 建立模型
depth = np.array([0, 1, 3, 10, 15, 23, 33, 35])
v = np.array([2.0, 2.5, 3.0, 3.8, 4.5, 5.0, 7.5])
depmod = DepModel(depth, v, v)

# 计算走时
arrivals = taup_time(
    model=depmod,
    source_depth=22.0,           # 震源深度 22 km
    station_distance=100/111.19, # 100 km 转成角度 ≈ 0.899°
    phase_list=["P", "Pn", "Pg"] # 查看哪些震相存在
)

print("=== 走时计算结果 ===")
for arr in arrivals:
    print(f"震相: {arr['phase']:>4s} | 走时: {arr['time']:7.2f} s | 射线参数: {arr['ray_param']:.4f}")