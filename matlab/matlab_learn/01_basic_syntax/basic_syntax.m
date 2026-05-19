% 01_basic_syntax.m
% MATLAB 基础语法示例
% 本示例演示 MATLAB 的基本语法，包括变量、数据类型、运算符和输入输出

fprintf('========== MATLAB 基础语法示例 ==========\n\n');

% ========== 1. 变量赋值和显示 ==========
fprintf('1. 变量赋值和显示\n');
name = 'Alice';  % 字符串
age = 25;        % 整数
height = 1.75;   % 浮点数
isStudent = true; % 布尔值

fprintf('姓名: %s\n', name);
fprintf('年龄: %d\n', age);
fprintf('身高: %.2f 米\n', height);
fprintf('是否是学生: %d\n', isStudent);

% ========== 2. 基本运算 ==========
fprintf('\n2. 基本运算\n');
a = 10;
b = 3;

fprintf('a = %d, b = %d\n', a, b);
fprintf('加法: a + b = %d\n', a + b);
fprintf('减法: a - b = %d\n', a - b);
fprintf('乘法: a * b = %d\n', a * b);
fprintf('除法: a / b = %.4f\n', a / b);
fprintf('整数除法: a \\ b = %d\n', a \ b);
fprintf('幂运算: a ^ b = %d\n', a ^ b);
fprintf('取模: mod(a, b) = %d\n', mod(a, b));

% ========== 3. 向量和矩阵基础 ==========
fprintf('\n3. 向量和矩阵基础\n');
rowVector = [1, 2, 3, 4, 5];  % 行向量
colVector = [1; 2; 3; 4; 5];  % 列向量
matrix = [1, 2, 3; 4, 5, 6; 7, 8, 9];  % 3x3 矩阵

fprintf('行向量: ');
disp(rowVector);
fprintf('列向量:\n');
disp(colVector);
fprintf('3x3 矩阵:\n');
disp(matrix);

% ========== 4. 常用函数 ==========
fprintf('\n4. 常用数学函数\n');
x = 16;
fprintf('x = %d\n', x);
fprintf('sqrt(x) = %.2f\n', sqrt(x));
fprintf('log(x) = %.4f\n', log(x));
fprintf('log10(x) = %.4f\n', log10(x));
fprintf('exp(1) = %.4f\n', exp(1));
fprintf('abs(-x) = %d\n', abs(-x));

% ========== 5. 输入输出 ==========
fprintf('\n5. 输入输出示例\n');
% 在脚本中，我们可以使用 input 函数（但运行时会暂停等待输入）
% 这里演示如何显示格式化的输出
fprintf('圆周率 pi = %.6f\n', pi);
fprintf('正弦函数 sin(pi/2) = %.2f\n', sin(pi/2));

% ========== 6. 注释和代码组织 ==========
fprintf('\n6. 注释示例\n');
% 单行注释以百分号开头
% 可以写多行注释

%{
    这是块注释
    可以注释多行代码
    在调试时很有用
%}

fprintf('注释可以帮助理解代码！\n');

% ========== 7. 清除变量和命令行 ==========
fprintf('\n7. 清理工作区\n');
% 在实际使用中，可以用以下命令：
% clear - 清除所有变量
% clc - 清除命令行窗口
% close all - 关闭所有图形窗口

fprintf('示例完成！\n');
fprintf('==========================================\n');
