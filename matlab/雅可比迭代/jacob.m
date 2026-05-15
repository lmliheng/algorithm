function [x, iter, res] = jacob(A, b, x0, tol, maxit)
%JACOB 使用雅可比迭代法求解线性方程组 Ax = b。
%   [x, iter, res] = JACOB(A, b) 使用 x0 = zeros(n,1) 作为初始向量，
%   收敛容差 tol=1e-6，最大迭代次数 maxit = 100。
% 
%   [x, iter, res] = JACOB(A, b, x0, tol, maxit) 可指定初始猜测值、收敛容差及最大迭代次数。


% nargin 检查输入参数并设置默认值
if nargin < 3 || isempty(x0)
    x0 = zeros(size(b));
end
if nargin < 4 || isempty(tol)
    tol = 1e-6;
end
if nargin < 5 || isempty(maxit)
    maxit = 100;
end

[n, m] = size(A);

if n ~= m
    error('矩阵A必须是方阵。');
end
if numel(b) ~= n
    error('右端项b必须与A兼容。');
end

D = diag(diag(A));
if any(diag(D) == 0)
    error('矩阵A有零对角线元素；雅可比方法无法继续。');
end


R = A - D;

x = x0(:);
res = norm(b - A*x);
for iter = 1:maxit
    x_new = (b - R*x) ./ diag(D);
    res = norm(b - A*x_new);
    x = x_new;
    if res <= tol
        break;
    end
end

if iter == maxit && res > tol
    warning('jacob:NoConvergence', '雅可比迭代在最大迭代次数内未收敛。');
end
end
