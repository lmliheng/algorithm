### 设计
1. 末尾分号可隐藏变量在控制台的打印

2. persistent变量
3. global全局变量

### 数据类型
struct： 类比对象
double：[1,2,3;4,5,6]或者[2 1 3 2 4 1 2 1 2]
char：'hello'
cell：
logical：布尔类型

### 模块化

1. 加载mat数据

[load](https://ww2.mathworks.cn/help/matlab/ref/load.html)：load遇到文件打不开时，只给一句非常笼统的错误提示，不会自动把真正的系统错误原因（比如“找不到文件 / 权限不足 / 路径含中文乱码”）打印出来
验证mat文件是否生效： whos -file test.mat

2. whos
whos:查看工作区的所有变量，返回一个struct数据，
whos 变量 ：可显示变量的 名称、大小、字节数、类型,属性attribute 等详细信

3. 函数
[函数](https://blog.csdn.net/zhibaijiang/article/details/147601560)
nargin 用于检查函数形参个数

### 扩展
[web](https://ww2.mathworks.cn/help/matlab/referencelist.html?type=function&listtype=cat&category=web-access-streaming&blocktype=all&capability=&addon=&startrelease=&endrelease=&s_tid=CRUX_lftnav)