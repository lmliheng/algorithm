% functions.m
% MATLAB 函数和数据结构示例
% 本示例演示 MATLAB 中函数的定义、调用，以及常用数据结构

fprintf('========== MATLAB 函数和数据结构示例 ==========\n\n');

% ========== 1. 匿名函数 (Anonymous Functions) ==========
fprintf('1. 匿名函数\n');

% 简单的匿名函数
square = @(x) x.^2;
double_val = @(x) 2*x;
add_numbers = @(a, b) a + b;

x = 1:5;
fprintf('x = '); disp(x);
fprintf('square(x) = '); disp(square(x));
fprintf('double_val(x) = '); disp(double_val(x));
fprintf('add_numbers(3, 5) = %d\n', add_numbers(3, 5));

% 复合匿名函数
compose_func = @(x) square(double_val(x));
fprintf('compose_func(3) = square(double_val(3)) = %d\n', compose_func(3));

% ========== 2. 局部函数 (Local Functions) ==========
fprintf('\n2. 局部函数调用\n');

result1 = myAdd(10, 20);
result2 = myMultiply(5, 6);
fprintf('myAdd(10, 20) = %d\n', result1);
fprintf('myMultiply(5, 6) = %d\n', result2);

% ========== 3. 函数句柄 (Function Handles) ==========
fprintf('\n3. 函数句柄\n');

% 内置函数的句柄
fprintf('内置函数句柄示例:\n');
func_handle = @sin;
x_vals = 0:pi/4:2*pi;
fprintf('sin(0:pi/4:2*pi) = '); disp(func_handle(x_vals));

% 将函数句柄作为参数传递
fprintf('\n将函数句柄作为参数:\n');
integrated_val = myIntegral(@sin, 0, pi);
fprintf('∫ sin(x) dx from 0 to pi = %.4f\n', integrated_val);

% ========== 4. 结构体 (Struct) ==========
fprintf('\n4. 结构体 (Struct)\n');

% 创建结构体
student.name = 'Alice';
student.age = 22;
student.major = 'Computer Science';
student.grades = [90, 85, 92, 88];

fprintf('学生信息:\n');
fprintf('  姓名: %s\n', student.name);
fprintf('  年龄: %d\n', student.age);
fprintf('  专业: %s\n', student.major);
fprintf('  成绩: '); disp(student.grades);
fprintf('  平均成绩: %.2f\n', mean(student.grades));

% 结构体数组
students(1).name = 'Bob';
students(1).age = 23;
students(2).name = 'Charlie';
students(2).age = 21;

fprintf('\n结构体数组:\n');
for i = 1:length(students)
    fprintf('  %d. %s (年龄 %d)\n', i, students(i).name, students(i).age);
end

% ========== 5. 元胞数组 (Cell Array) ==========
fprintf('\n5. 元胞数组 (Cell Array)\n');

% 创建元胞数组
C = {42, 'Hello World', [1, 2, 3, 4, 5], magic(3)};

fprintf('元胞数组 C:\n');
for i = 1:length(C)
    fprintf('  C{%d} = \n', i);
    disp(C{i});
end

% 访问元胞数组元素
fprintf('C{2} (字符串) = %s\n', C{2});
fprintf('C{3} (向量) = '); disp(C{3});

% ========== 6. 表格 (Table) ==========
fprintf('\n6. 表格 (Table)\n');

% 创建表格
Name = {'Alice'; 'Bob'; 'Charlie'; 'Diana'};
Age = [22; 23; 21; 24];
Major = {'CS'; 'Math'; 'Physics'; 'CS'};
GPA = [3.8; 3.5; 3.9; 3.7];

T = table(Name, Age, Major, GPA);
fprintf('学生表格 T:\n');
disp(T);

% 访问表格数据
fprintf('表格 T 的第2行:\n');
disp(T(2, :));
fprintf('表格 T 的 GPA 列:\n');
disp(T.GPA);

% ========== 7. 全局变量和持久变量 ==========
fprintf('\n7. 全局变量和持久变量\n');
fprintf('(注意: 在实际编程中应谨慎使用全局变量)\n');

% 演示持久变量（通过局部函数）
fprintf('调用 persistentDemo 3 次:\n');
for i = 1:3
    persistentDemo(i);
end

fprintf('\n示例完成！\n');
fprintf('==========================================\n');

% ============================================
% 局部函数定义 (Local Functions)
% ============================================

function result = myAdd(a, b)
    % 简单的加法函数
    result = a + b;
end

function result = myMultiply(a, b)
    % 简单的乘法函数
    result = a * b;
end

function integral = myIntegral(func, a, b)
    % 简单的数值积分（矩形法）
    n = 1000;
    x = linspace(a, b, n);
    y = func(x);
    integral = trapz(x, y);  % 使用梯形法积分
end

function persistentDemo(n)
    % 演示持久变量
    persistent count;
    
    if isempty(count)
        count = 0;
    end
    
    count = count + n;
    fprintf('  当前 count 值: %d\n', count);
end
