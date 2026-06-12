f = logspace(-4, 4, 100)';
T = 1./f;  

%% S

rho1 = [100; 10; 100];      
h1 = [2000; 2000];         
S1 = h1(2)/rho1(2)          
rho2 = [100; 5; 100];      
h2 = [2000; 1000];         
S2 = h2(2)/rho2(2)         
rho3 = [100; 20; 100];     
h3 = [2000; 4000];        
S3 = h3(2)/rho3(2)         


[appRho1, Phase1] = MT1DForward(rho1, h1, f);
[appRho2, Phase2] = MT1DForward(rho2, h2, f);
[appRho3, Phase3] = MT1DForward(rho3, h3, f);


%% 创建Nature风格图表
% 设置全局参数
set(groot, 'defaultAxesFontName', 'Arial');  % 设置默认字体
set(groot, 'defaultTextFontName', 'Arial');

figure('Position', [100, 100, 800, 400]);

% 创建子图
ax1 = subplot(1, 1, 1);

% 设置Nature风格颜色
nature_red = [0.8, 0.2, 0.2];    % 深红色
nature_blue = [0.2, 0.4, 0.8];   % 深蓝色
nature_green = [0.2, 0.6, 0.4];  % 深绿色

% 绘制曲线
h1_line = loglog(ax1, T, appRho1, 'Color', nature_red, 'LineWidth', 2.5, 'LineStyle', '-');
hold on;
h2_line = loglog(ax1, T, appRho2, 'Color', nature_blue, 'LineWidth', 2.5, 'LineStyle', '--');
h3_line = loglog(ax1, T, appRho3, 'Color', nature_green, 'LineWidth', 2.5, 'LineStyle', ':');

% 设置坐标轴
set(ax1, 'XScale', 'log', 'YScale', 'log');
xlabel('周期 T (s)', 'FontSize', 12, 'FontWeight', 'normal');
ylabel('视电阻率 \rho_a (\Omega\cdot m)', 'FontSize', 12, 'FontWeight', 'normal');

% 设置坐标轴范围和刻度
xlim([1e-4, 1e4]);
ylim([5, 200]);

% 设置网格
grid(ax1, 'on');
set(ax1, 'GridLineStyle', ':', 'GridAlpha', 0.3, 'GridColor', [0.3, 0.3, 0.3]);

% 设置框线
set(ax1, 'Box', 'on', 'LineWidth', 1);

% 设置刻度
set(ax1, 'TickDir', 'out', 'TickLength', [0.02, 0.02]);
set(ax1, 'XMinorTick', 'on', 'YMinorTick', 'on');
set(ax1, 'FontSize', 11);

% 修正后的图例 - 使用正确的变量
lgd = legend(ax1, {sprintf('模型1: h=%.0f m, \\rho=%.0f \\Omega\\cdot m, S=%.0f S', h1(1), rho1(2), S1), ...
                   sprintf('模型2: h=%.0f m, \\rho=%.0f \\Omega\\cdot m, S=%.0f S', h2(1), rho2(2), S2), ...
                   sprintf('模型3: h=%.0f m, \\rho=%.0f \\Omega\\cdot m, S=%.0f S', h3(1), rho3(2), S3)}, ...
             'Location', 'southwest', 'FontSize', 10, 'Box', 'off');

% 设置图例字体为正常粗细
set(lgd, 'FontWeight', 'normal');

% 添加标题
title('S等值现象', 'FontSize', 13, 'FontWeight', 'bold', 'FontName', 'Arial');

% 设置背景
set(gcf, 'Color', 'white');
set(ax1, 'Color', 'white');

% 优化布局
set(gcf, 'PaperPositionMode', 'auto');
