% plotting.m
% MATLAB 绘图基础示例
% 本示例演示 MATLAB 的 2D/3D 绘图功能

fprintf('========== MATLAB 绘图基础示例 ==========\n\n');

% ========== 1. 基本 2D 绘图 ==========
fprintf('1. 基本 2D 绘图\n');
fprintf('正在生成图 1: 基本正弦波...\n');

x = linspace(0, 2*pi, 100);
y = sin(x);

figure(1);
plot(x, y, 'b-', 'LineWidth', 2);
title('正弦函数 sin(x)');
xlabel('x');
ylabel('sin(x)');
grid on;

% ========== 2. 多条曲线 ==========
fprintf('正在生成图 2: 多条曲线...\n');

figure(2);
plot(x, sin(x), 'r-', 'LineWidth', 2);
hold on;
plot(x, cos(x), 'b--', 'LineWidth', 2);
plot(x, sin(x) .* cos(x), 'g:', 'LineWidth', 2);
hold off;

title('三角函数');
xlabel('x');
ylabel('y');
legend('sin(x)', 'cos(x)', 'sin(x)*cos(x)');
grid on;

% ========== 3. 子图 (subplot) ==========
fprintf('正在生成图 3: 子图布局...\n');

figure(3);
subplot(2, 2, 1);
plot(x, sin(x));
title('(a) sin(x)');
grid on;

subplot(2, 2, 2);
plot(x, cos(x));
title('(b) cos(x)');
grid on;

subplot(2, 2, 3);
plot(x, exp(-x/2) .* sin(x));
title('(c) 衰减正弦波');
grid on;

subplot(2, 2, 4);
plot(x, tanh(x));
title('(d) tanh(x)');
grid on;

% ========== 4. 散点图 ==========
fprintf('正在生成图 4: 散点图...\n');

figure(4);
x_rand = randn(200, 1);
y_rand = randn(200, 1);
scatter(x_rand, y_rand, 50, 'b', 'filled');
title('随机散点图 (正态分布)');
xlabel('X');
ylabel('Y');
grid on;

% ========== 5. 条形图 ==========
fprintf('正在生成图 5: 条形图...\n');

figure(5);
categories = {'A', 'B', 'C', 'D', 'E'};
values = [23, 45, 12, 67, 34];
bar(values);
title('条形图示例');
xlabel('类别');
ylabel('数值');
xticks(1:5);
xticklabels(categories);
grid on;

% ========== 6. 3D 绘图 ==========
fprintf('正在生成图 6: 3D 曲面图...\n');

figure(6);
[x3d, y3d] = meshgrid(-2:0.1:2, -2:0.1:2);
z3d = x3d .* exp(-x3d.^2 - y3d.^2);

surf(x3d, y3d, z3d);
title('3D 曲面图 (Gaussian)');
xlabel('X');
ylabel('Y');
zlabel('Z');
colorbar;

% ========== 7. 等高线图 ==========
fprintf('正在生成图 7: 等高线图...\n');

figure(7);
contour(x3d, y3d, z3d, 20, 'LineWidth', 1.5);
title('等高线图');
xlabel('X');
ylabel('Y');
colorbar;

% ========== 8. 极坐标图 ==========
fprintf('正在生成图 8: 极坐标图...\n');

figure(8);
theta = linspace(0, 2*pi, 100);
rho = sin(2*theta) .* cos(2*theta);
polarplot(theta, rho, 'r-', 'LineWidth', 2);
title('极坐标图');

% ========== 9. 图像保存 ==========
fprintf('\n9. 保存图像\n');

% 保存为 PNG
saveas(figure(1), 'sin_wave.png');
fprintf('已保存: sin_wave.png\n');

saveas(figure(6), '3d_surface.png');
fprintf('已保存: 3d_surface.png\n');

% 使用 print 保存高质量图像
print(figure(2), 'trig_functions', '-dpng', '-r300');
fprintf('已保存: trig_functions.png (300 DPI)\n');

fprintf('\n所有图像已生成！\n');
fprintf('==========================================\n');

% 保持图像窗口打开
fprintf('提示: 关闭所有图像窗口后继续...\n');
% 如果需要关闭所有图像，可以取消注释下一行
% close all;
