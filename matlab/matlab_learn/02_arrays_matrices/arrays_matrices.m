% arrays_matrices.m
% MATLAB 数组和矩阵操作示例
% 本示例演示 MATLAB 中数组和矩阵的创建、索引、运算等核心操作

fprintf('========== MATLAB 数组和矩阵操作示例 ==========\n\n');

% ========== 1. 创建数组和矩阵 ==========
fprintf('1. 创建数组和矩阵\n');

% 行向量
row1 = [1, 2, 3, 4, 5];
row2 = 10:10:50;  % 从 10 到 50，步长为 10
row3 = linspace(0, 1, 10);  % 从 0 到 1，生成 10 个等间距的点

fprintf('行向量 row1: ');
disp(row1);
fprintf('行向量 row2 (10:10:50): ');
disp(row2);
fprintf('行向量 row3 (linspace):\n');
disp(row3);

% 列向量
col1 = [1; 2; 3; 4; 5];
col2 = (1:5)';  % 转置行向量得到列向量

fprintf('列向量 col1:\n');
disp(col1);
fprintf('列向量 col2 (转置):\n');
disp(col2);

% 矩阵
mat1 = [1, 2, 3; 4, 5, 6; 7, 8, 9];  % 3x3 矩阵
mat2 = zeros(3, 4);  % 3x4 零矩阵
mat3 = ones(2, 3);   % 2x3 全1矩阵
mat4 = eye(3);       % 3x3 单位矩阵
mat5 = rand(3, 3);  % 3x3 随机矩阵（0-1之间）

fprintf('3x3 矩阵 mat1:\n');
disp(mat1);
fprintf('3x4 零矩阵:\n');
disp(mat2);
fprintf('2x3 全1矩阵:\n');
disp(mat3);
fprintf('3x3 单位矩阵:\n');
disp(mat4);
fprintf('3x3 随机矩阵:\n');
disp(mat5);

% ========== 2. 索引和切片 ==========
fprintf('\n2. 索引和切片\n');

A = [10, 20, 30, 40, 50;
     60, 70, 80, 90, 100;
     110, 120, 130, 140, 150];

fprintf('矩阵 A:\n');
disp(A);

fprintf('A(2, 3) = %d (第2行第3列)\n', A(2, 3));
fprintf('A(1, :) = '); disp(A(1, :));  % 第1行所有列
fprintf('A(:, 2) = '); disp(A(:, 2));  % 所有行的第2列
fprintf('A(1:2, 2:4) =\n');
disp(A(1:2, 2:4));  % 子矩阵

% 使用 end 关键字
fprintf('A(end, :) = '); disp(A(end, :));  % 最后一行
fprintf('A(:, end-1) = '); disp(A(:, end-1));  % 倒数第二列

% ========== 3. 矩阵运算 ==========
fprintf('\n3. 矩阵运算\n');

B = [1, 2; 3, 4];
C = [5, 6; 7, 8];

fprintf('矩阵 B:\n');
disp(B);
fprintf('矩阵 C:\n');
disp(C);

fprintf('B + C =\n');
disp(B + C);

fprintf('B * C (矩阵乘法)=\n');
disp(B * C);

fprintf('B .* C (逐元素乘法)=\n');
disp(B .* C);

fprintf('B ^ 2 (矩阵平方)=\n');
disp(B ^ 2);

fprintf('B .^ 2 (逐元素平方)=\n');
disp(B .^ 2);

% ========== 4. 矩阵转置和逆 ==========
fprintf('\n4. 矩阵转置和逆\n');

D = [1, 2, 3; 4, 5, 6];
fprintf('矩阵 D:\n');
disp(D);

fprintf('D'' (转置)=\n');
disp(D');

% 逆矩阵（必须是方阵且满秩）
E = [1, 2; 3, 4];
fprintf('矩阵 E:\n');
disp(E);
fprintf('inv(E) (逆矩阵)=\n');
disp(inv(E));
fprintf('E * inv(E) (应该接近单位矩阵)=\n');
disp(E * inv(E));

% ========== 5. 常用矩阵函数 ==========
fprintf('\n5. 常用矩阵函数\n');

F = [1, 2, 3; 4, 5, 6; 7, 8, 9];
fprintf('矩阵 F:\n');
disp(F);

fprintf('size(F) = '); disp(size(F));
fprintf('length(F) = %d\n', length(F));
fprintf('numel(F) = %d\n', numel(F));
fprintf('sum(F) = '); disp(sum(F));  % 每列求和
fprintf('mean(F) = '); disp(mean(F));  % 每列平均值
fprintf('max(F) = '); disp(max(F));  % 每列最大值
fprintf('min(F) = '); disp(min(F));  % 每列最小值

fprintf('diag(F) = '); disp(diag(F));  % 对角线元素
fprintf('trace(F) = %d\n', trace(F));  % 迹
fprintf('det(E) = %.4f\n', det(E));  % 行列式
fprintf('eig(F) (特征值) = '); disp(eig(F));

% ========== 6. 数组拼接和变形 ==========
fprintf('\n6. 数组拼接和变形\n');

G = [1, 2; 3, 4];
H = [5, 6; 7, 8];

fprintf('水平拼接 [G, H]=\n');
disp([G, H]);

fprintf('垂直拼接 [G; H]=\n');
disp([G; H]);

% 变形
I = 1:12;
fprintf('向量 I (1:12): ');
disp(I);

J = reshape(I, 3, 4);  % 变成 3x4 矩阵
fprintf('reshape(I, 3, 4)=\n');
disp(J);

fprintf('\n示例完成！\n');
fprintf('==========================================\n');
