import numpy as np
import matplotlib.pyplot as plt
from seispy.core.depmodel import DepModel

# 深度分层 (km)
depth = np.array([0, 1, 3, 10, 15, 23, 33, 35])
# 各层速度 (km/s)
v = np.array([2.0, 2.5, 3.0, 3.8, 4.5, 5.0, 7.5])
# 构建参考模型：离散深度节点 + 各层厚度 + 速度
depmod = DepModel.read_layer_model(
    np.arange(35), #35
    np.diff(depth),
    vp=v,
    vs=v
)

# 绘制速度-深度曲线
depmod.plot_model(show=False)
plt.show()