% file_io.m
% MATLAB 文件 I/O 操作示例
% 本示例演示 MATLAB 中文件的读写操作

fprintf('========== MATLAB 文件 I/O 操作示例 ==========\n\n');

% 确保当前目录有写入权限
current_dir = pwd;
fprintf('当前工作目录: %s\n', current_dir);

% ========== 1. 文本文件读写 ==========
fprintf('\n1. 文本文件读写\n');

% 写入文本文件
fid = fopen('example.txt', 'w');
if fid == -1
    error('无法创建文件 example.txt');
end

fprintf(fid, '这是一个示例文本文件\n');
fprintf(fid, '可以写入多行内容\n');
fprintf(fid, '数字: %d, %.2f, %s\n', 42, pi, 'Hello');
fclose(fid);
fprintf('已写入: example.txt\n');

% 读取文本文件
fid = fopen('example.txt', 'r');
if fid == -1
    error('无法打开文件 example.txt');
end

fprintf('读取 example.txt 内容:\n');
while ~feof(fid)
    line = fgetl(fid);
    fprintf('  %s\n', line);
end
fclose(fid);

% ========== 2. CSV 文件读写 ==========
fprintf('\n2. CSV 文件读写\n');

% 创建数据
data = [1, 2, 3, 4, 5;
        6, 7, 8, 9, 10;
        11, 12, 13, 14, 15];

% 写入 CSV
csvwrite('example.csv', data);
fprintf('已写入: example.csv\n');

% 读取 CSV
data_read = csvread('example.csv');
fprintf('读取 example.csv 内容:\n');
disp(data_read);

% 使用 dlmwrite 和 dlmread (更灵活)
dlmwrite('example_tab.txt', data, '\t');  % 使用 Tab 分隔
fprintf('已写入: example_tab.txt (Tab 分隔)\n');

data_tab = dlmread('example_tab.txt', '\t');
fprintf('读取 example_tab.txt 内容:\n');
disp(data_tab);

% ========== 3. MAT 文件 (MATLAB 专用格式) ==========
fprintf('\n3. MAT 文件 (MATLAB 专用格式)\n');

% 创建变量
A = magic(5);
B = rand(3, 4);
C = 'Hello World';
D = struct('name', 'Alice', 'age', 25);

% 保存为 MAT 文件
save('example.mat', 'A', 'B', 'C', 'D');
fprintf('已保存: example.mat (包含变量 A, B, C, D)\n');

% 加载 MAT 文件
loaded = load('example.mat');
fprintf('加载 example.mat 中的变量:\n');
fprintf('  A (5x5 magic matrix):\n');
disp(loaded.A);
fprintf('  C (字符串): %s\n', loaded.C);

% ========== 4. Excel 文件读写 ==========
fprintf('\n4. Excel 文件读写\n');

% 注意: 需要安装 Excel 或 MATLAB 的 Excel 支持
try
    % 写入 Excel
    data_excel = [1, 2, 3; 4, 5, 6; 7, 8, 9];
    xlswrite('example.xlsx', data_excel);
    fprintf('已写入: example.xlsx\n');
    
    % 读取 Excel
    [num, txt, raw] = xlsread('example.xlsx');
    fprintf('读取 example.xlsx 数值数据:\n');
    disp(num);
    
catch ME
    fprintf('Excel 操作失败 (可能需要 Excel 支持): %s\n', ME.Message);
end

% ========== 5. 图像文件读写 ==========
fprintf('\n5. 图像文件读写\n');

% 创建示例图像
img = rand(100, 100, 3);  % 随机彩色图像
imwrite(img, 'example.png');
fprintf('已保存: example.png\n');

% 读取图像
img_read = imread('example.png');
fprintf('读取 example.png (尺寸: %dx%dx%d)\n', size(img_read));

% ========== 6. 文件操作 (dir, exist, delete) ==========
fprintf('\n6. 文件操作\n');

% 列出当前目录文件
fprintf('当前目录文件列表:\n');
files = dir('example.*');
for i = 1:length(files)
    fprintf('  %s (大小: %d bytes)\n', files(i).name, files(i).bytes);
end

% 检查文件是否存在
if exist('example.mat', 'file')
    fprintf('文件 example.mat 存在\n');
end

% 删除文件 (取消注释以启用)
% delete('example.txt');
% delete('example.csv');
% fprintf('已删除临时文件\n');

% ========== 7. 二进制文件读写 ==========
fprintf('\n7. 二进制文件读写\n');

% 写入二进制文件
fid = fopen('example.bin', 'wb');
if fid == -1
    error('无法创建文件 example.bin');
end

data_binary = [1.1, 2.2, 3.3, 4.4, 5.5];
fwrite(fid, data_binary, 'double');
fclose(fid);
fprintf('已写入: example.bin (二进制)\n');

% 读取二进制文件
fid = fopen('example.bin', 'rb');
data_binary_read = fread(fid, inf, 'double')';
fclose(fid);
fprintf('读取 example.bin 内容: ');
disp(data_binary_read);

% ========== 8. 清理临时文件 ==========
fprintf('\n8. 清理临时文件\n');
temp_files = {'example.txt', 'example.csv', 'example_tab.txt', ...
              'example.mat', 'example.png', 'example.bin', ...
              'example.xlsx', 'example.xlsx'};

for i = 1:length(temp_files)
    if exist(temp_files{i}, 'file')
        delete(temp_files{i});
    end
end
fprintf('已清理所有临时文件\n');

fprintf('\n所有文件 I/O 示例完成！\n');
fprintf('==========================================\n');
