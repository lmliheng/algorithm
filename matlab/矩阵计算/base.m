% 创建矩阵
A = [1 2 3; 4 5 6; 7 8 9]       % 3×3矩阵
B = zeros(3,4)                    % 全0矩阵
C = ones(2,5)                     % 全1矩阵
D = eye(4)                        % 单位矩阵
E = rand(3,3)                     % 随机矩阵[0,1]
F = randn(3,3)                    % 正态分布随机矩阵
G = diag([1,2,3])                 % 对角矩阵
H = magic(4)                      % 幻方矩阵

% 矩阵属性
size(A)                           % 尺寸 [行,列]
length(A)                         % 最大维度长度
numel(A)                          % 元素总数
ndims(A)                          % 维数
isempty(A)                        % 是否空矩阵
isscalar(A)                       % 是否为标量
isvector(A)                       % 是否为向量
ismatrix(A)                       % 是否为矩阵

A(2,3)                            % 第2行第3列
A(:,2)                            % 所有行第2列
A(3,:)                            % 第3行所有列
A(1:2,2:3)                        % 子矩阵
A(end,:)                          % 最后一行
A(:)                              % 展成一列
A(1:2:end)                        % 步长索引
A([1,3],[2,4])                    % 指定行列索引
A(A>5)                            % 逻辑索引


% 矩阵乘法
C = A * B                         % 矩阵乘法
C = A .* B                        % 对应元素相乘

% 矩阵除法
X = A \ B                         % 左除：解 AX=B
X = A / B                         % 右除：解 XA=B
X = A .\ B                        % 对应元素左除
X = A ./ B                        % 对应元素右除

% 幂运算
A^2                               % 矩阵乘方
A.^2                              % 元素乘方

% 转置
A'                                % 共轭转置
A.'                               % 非共轭转置

% 其他
A + B                             % 加法
A - B                             % 减法
-A                                % 取负
A + 5                             % 广播加法

det(A)                            % 行列式
inv(A)                            % 逆矩阵
pinv(A)                           % 伪逆
rank(A)                           % 秩
trace(A)                          % 迹
norm(A)                           % 范数
cond(A)                           % 条件数
rref(A)                           % 行最简形

% 特征值与特征向量
[V,D] = eig(A)                    % V特征向量，D特征值对角阵
e = eig(A)                        % 仅特征值

% 分解
[L,U,P] = lu(A)                   % LU分解
[Q,R] = qr(A)                     % QR分解
R = chol(A)                       % Cholesky分解
[U,S,V] = svd(A)                  % SVD分解


reshape(A, m, n)                  % 重塑形状
repmat(A, 2, 3)                   % 复制平铺
fliplr(A)                         % 左右翻转
flipud(A)                         % 上下翻转
rot90(A)                          % 旋转90度
triu(A)                           % 上三角
tril(A)                           % 下三角
diag(A)                           % 提取对角线
blkdiag(A,B)                      % 块对角矩阵
horzcat(A,B)                      % 水平拼接
vertcat(A,B)                      % 垂直拼接



sum(A)                            % 每列求和
sum(A,2)                          % 每行求和
mean(A)                           % 均值
median(A)                         % 中位数
std(A)                            % 标准差
var(A)                            % 方差
max(A)                            % 最大值
min(A)                            % 最小值
cumsum(A)                         % 累积和
cumprod(A)                        % 累积积
sort(A)                           % 排序
unique(A)                         % 去重


toeplitz([1,2,3])                 % Toeplitz矩阵
hankel([1,2,3])                   % Hankel矩阵
pascal(4)                         % Pascal矩阵
hilb(4)                           % Hilbert矩阵
vander([1,2,3])                   % Vandermonde矩阵
compan([1,2,3,4])                 % 伴随矩阵
gallery('lehmer',4)               % 测试矩阵库


% 维度不匹配
size(A)                           % 检查尺寸
size(B)

% 复数结果
real(A)                           % 取实部
imag(A)                           % 取虚部
abs(A)                            % 模
angle(A)                          % 相位角

% 数值精度
format long                       % 显示更多小数
eps                               % 机器精度