---
title: 大地电磁一维正演 | MT1D Forward 公式详细推导(各向同性)
date: 2022-03-27 12:00:00
tags: [Study,MT]
categories: [Study]
mathjax: true
---

#### Maxwell方程组
任何宏观的电磁场都遵循经典的麦克斯韦(Maxwell)方程组，
Maxwell方程组的微分形式如下：
$$\nabla\times H=j_c+\frac{\partial D}{\partial t} \tag{1}$$
$$\nabla\times E=-\frac{\partial B}{\partial t} \tag{2}$$
$$\nabla\cdot D=\rho_v \tag{3}$$
$$\nabla\cdot B=0 \tag{4}$$

式中，$H$为磁场强度$(A/m)$，$E$为电场强度$(V/m)$，$D$为电位移或电感应强度$(C/m^2)$，$B$为磁感应强度$(T)$，$j_c$为传导电流密度$(A/m^2)$，$\rho_v$为自由电荷密度$(C/m^3)$。

其中，第一方程为全电流定律，表明传导电流和变化的电场都产生磁场；第二方程为电磁感应定律，表明变化的磁场产生电场；第三方程为高斯定律，表明电荷以发散的方式在空间产生电场；第四方程为磁通连续性原理，表明磁场是无源场，磁力线总是闭合曲线。

为了完整地描述时变电磁场的特性，麦克斯韦方程还应包括电荷守恒方程以及媒质的本构方程，即：
$$\nabla\cdot j_c=-\frac{\partial\rho_v}{\partial t} \tag{5}$$
$$j_c=\sigma E \tag{6}$$
$$D=\varepsilon E \tag{7}$$
$$B=uH \tag{8}$$

式中，$\sigma$为电导率；$\varepsilon$为介电常数，通常取真空值$\varepsilon=\varepsilon_0=8.854187817×10^{−12}F/𝑚$；$u$为磁导率，通常取真空值$u=u_0=4\pi×10^{−7}𝐻/𝑚$。

电磁场需满足的边界条件可以表述为：在两种介质的边界上，电场$E$和磁场$H$的切向分量连续，而位移电流$D$和磁感应强度$B$的法向分量连续，即：
$$E_{1t}=E_{2t}，H_{1t}=H_{2t}，  
D_{1n}=D_{2n}，B_{1n}=B_{2n}
 \tag{9}$$
 这里，下角标$t$表示切向分量，$n$表示法向分量。

#### 一维层状介质的Maxwell方程组

 下面考虑水平层状模型上的电磁场：
 假设时间因子为$e^{i\omega t}$（意味着$\frac{\partial}{\partial t}=i\omega $）
 
 **Notice：在一些推导中，时间因子为$e^{-i\omega t}$,因此一些式子(含有$i\omega u_0$的式子)会有正负号的差异**
 
 由式$(2)$和式$(8)$得：
 $$\nabla\times E=-\frac{\partial (u_0H)}{\partial t}=-i\omega u_0H$$
即 $$\nabla\times E+i\omega u_0H=0 \tag{10}$$
由式$(1)$（忽略位移电流）和式$(6)$得：
$$\nabla\times H=\sigma E $$
即
$$\nabla\times H-\sigma E=0 \tag{11}$$

将式$(10)$展开得：
$$\begin{aligned} \nabla\times E
&=
\begin{vmatrix}
\overrightarrow i &\overrightarrow j&\overrightarrow k\\
\frac{\partial}{\partial x}&\frac{\partial}{\partial y}&\frac{\partial}{\partial z}\\
E_x&E_y&E_z\\
\end{vmatrix}
\\&
=(\frac{\partial E_z}{\partial y}-\frac{\partial E_y}{\partial z})\overrightarrow i+
(\frac{\partial E_x}{\partial z}-\frac{\partial E_z}{\partial x})\overrightarrow j+
(\frac{\partial E_y}{\partial x}-\frac{\partial E_x}{\partial y})\overrightarrow k
\\&
=-i\omega u_0(H_x\overrightarrow i+H_y\overrightarrow j+H_Z\overrightarrow k) \end{aligned} \tag{12}$$

将式$(11)$展开得：
$$\begin{aligned} \nabla\times H
&=
\begin{vmatrix}
\overrightarrow i &\overrightarrow j&\overrightarrow k\\
\frac{\partial}{\partial x}&\frac{\partial}{\partial y}&\frac{\partial}{\partial z}\\
H_x&H_y&H_z\\
\end{vmatrix}
\\
&=(\frac{\partial H_z}{\partial y}-\frac{\partial H_y}{\partial z})\overrightarrow i+
(\frac{\partial H_x}{\partial z}-\frac{\partial H_z}{\partial x})\overrightarrow j+
(\frac{\partial H_y}{\partial x}-\frac{\partial H_x}{\partial y})\overrightarrow k
\\&
=\sigma (E_x\overrightarrow i+E_y\overrightarrow j+E_Z\overrightarrow k) \end{aligned} \tag{13}$$

在一维介质的情况下，电导率仅仅依赖于深度，因此，在$xy$平面上，电磁场可以近似看作均匀的，即偏导数$\frac{\partial}{\partial x},\frac{\partial}{\partial y}$相对于$\frac{\partial}{\partial z}$可以省略不计，于是，式$(12)$和式$(13)$可以写为：

$$-\frac{\partial E_y}{\partial z}\overrightarrow i+
\frac{\partial E_x}{\partial z}\overrightarrow j=-i\omega u_0(H_x\overrightarrow i+H_y\overrightarrow j+H_Z\overrightarrow k) \tag{12}$$

$$-\frac{\partial H_y}{\partial z}\overrightarrow i+
\frac{\partial H_x}{\partial z}\overrightarrow j+
=\sigma (E_x\overrightarrow i+E_y\overrightarrow j+E_Z\overrightarrow k) \tag{13}$$

于是，得到下列一维电阻率介质Maxwell方程组：
$$\frac{\partial E_y}{\partial z}=i\omega u_0H_x \tag{14}$$

$$\frac{\partial E_x}{\partial z}=-i\omega u_0H_y \tag{15}$$

$$-\frac{\partial H_y}{\partial z}
=\sigma E_x \tag{16}$$

$$\frac{\partial H_x}{\partial z}
=\sigma E_y \tag{17}$$

#### 一维层状介质的视电阻率和相位公式 
下面，我们利用式$(15)$和式$(16)$来推导视电阻率和相位公式：

首先，假设地电模型由$N$层组成，每层的电导率为$\sigma_j$，厚度为$h_j(j=1,···,N)$，第$N$层为均匀半空间，即$h_N=\infty$，那么，根据式$(15)$和式$(16)$可知，第$j$层的电场和磁场满足下面的方程：

$$\frac{\partial E_{xj}}{\partial z}=-i\omega u_0H_{yj} \tag{18}$$

$$-\frac{\partial H_{yj}}{\partial z}
=\sigma_j E_{xj} \tag{19}$$

由式$(18)$得：

$$H_{yj}=-\frac{1}{i\omega u_0}\frac{\partial E_{xj}}{\partial z} \tag{20}$$

将式$(20)$代入式$(19)$得：

$$\frac{\partial ^2 E_{xj}}{\partial z^2}
=i\omega u_0\sigma_j E_{xj}$$

即

$$\frac{\partial ^2 E_{xj}}{\partial z^2}
-i\omega u_0\sigma_j E_{xj}=0 \tag{21}$$

令$k_j=\sqrt{i\omega u_0\sigma_j}$（$k$常被称为**波数**），则式$(21)$可以写为：

$$\frac{\partial ^2 E_{xj}}{\partial z^2}
-k_j^2 E_{xj}=0 \tag{22}$$

式$(22)$的通解为：

$$E_{xj}=A_je^{k_jz}+B_je^{-k_jz} \tag{23}$$

这里， $z_j\leqslant z\leqslant z_{j+1}$。

将式$(23)$代入式$(20)$，有

$$H_{yj}=-\frac{k_j}{i\omega u_0}(A_je^{k_jz}-B_je^{-k_jz}) \tag{24}$$

由$(23)$和$(24)$得：

$$\begin{aligned} Z_j^{xy}(z)=\frac{E_{xj}}{H_{yj}}
&=
-\frac{i\omega u_0}{k_j}(\frac{A_je^{k_jz}+B_je^{-k_jz}}{A_je^{k_jz}-B_je^{-k_jz}})
\\&
=\frac{i\omega u_0}{k_j}(\frac{\frac{A_j}{B_j}e^{2k_jz}+1}{-\frac{A_j}{B_j}e^{2k_jz}+1}) \end{aligned} \tag{25}$$

记$Z_{0j}=\frac{i\omega u_0}{k_j}=\sqrt{i\omega u_0\rho_j}$，表示**每一层的固有阻抗**，则

$$Z_j(z_j)=Z_j=Z_{0j}(\frac{\frac{A_j}{B_j}e^{2k_jz_j}+1}{-\frac{A_j}{B_j}e^{2k_jz_j}+1}) \tag{26}$$

$$Z_j(z_{j+1})=Z_{j+1}=Z_{0j}(\frac{\frac{A_j}{B_j}e^{2k_jz_{j+1}}+1}{-\frac{A_j}{B_j}e^{2k_jz_{j+1}}+1}) \tag{27}$$

由式$(26)$得

$$-Z_j\frac{A_j}{B_j}e^{2k_jz_j}+Z_j=Z_{0j}\frac{A_j}{B_j}e^{2k_jz_j}+Z_{0j} \tag{28}$$

因此，

$$\frac{A_j}{B_j}=\frac{Z_j-Z_{0j}}{Z_j+Z_{0j}}e^{-2k_jz_j} \tag{29}$$

将式$(29)$代入式$(27)$得：

$$\begin{aligned} Z_{j+1}&=
Z_{0j}(\frac{\frac{Z_j-Z_{0j}}{Z_j+Z_{0j}}e^{-2k_jz_j}e^{2k_jz_{j+1}}+1}{-\frac{Z_j-Z_{0j}}{Z_j+Z_{0j}}e^{-2k_jz_j}e^{2k_jz_{j+1}}+1})\\&=
Z_{0j}(\frac{\frac{Z_j-Z_{0j}}{Z_j+Z_{0j}}e^{2k_jh_j}+1}{-\frac{Z_j-Z_{0j}}{Z_j+Z_{0j}}e^{2k_jh_j}+1})\\&=
Z_{0j}\frac{Z_j(1+e^{2k_jh_j})+Z_{0j}(1-e^{2k_jh_j})}{Z_{0j}(1+e^{2k_jh_j})+Z_j(1-e^{2k_jh_j})}
\end{aligned} \tag{30}$$

或

$$\begin{aligned}
Z_j&=Z_{0j}\frac{Z_{j+1}(1+e^{-2k_jh_j})+Z_{0j}(1-e^{-2k_jh_j})}{Z_{0j}(1+e^{-2k_jh_j})+Z_{j+1}(1-e^{-2k_jh_j})}\\&=
Z_{0j}\frac{1-R_jQ_j}{1+R_jQ_j}
\end{aligned} \tag{31}$$

这里，
$$R_j=\frac{Z_{0j}-Z_{j+1}}{Z_{0j}+Z_{j+1}}， Q_j=e^{-2k_jh_j}$$

由此可见，第$j$层的阻抗与第$j+1$层有关，因此我们需要从第$N$层开始逐层递推出第1层的阻抗$Z_1$。

其中，第$N$层的固有阻抗$Z_{0n}=\sqrt{i\omega u_0\rho_n}$。

最后，通过$Z_1$，我们就可以得到视电阻率和相位：

$$\rho_a=\frac{1}{\omega u_0}|Z_1|^2=\frac{1}{\omega u_0}(Re^2Z_1+Im^2Z_1) \tag{32}$$
$$\phi=tan^{-1}\frac{Im(Z_1)}{Re(Z_1)} \tag{33}$$

#### The end

若想实现编程，请参考[MT1D Forward Matlab Code](https://cocklebur0924.github.io/2022/03/25/MT1D_Forward/)。

### Reference:

[1] 李予国老师2020年海洋电磁学课程讲义

[2] 韩波师兄MT1D_GN_inversion Code

[3] [Andrew Pethick:1D Magnetotelluric Forward Modelling](https://www.digitalearthlab.com/tutorial/tutorial-1d-mt-forward/)