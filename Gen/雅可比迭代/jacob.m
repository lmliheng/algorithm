function [x, iter, res] = jacob(A, b, x0, tol, maxit)
%JACOB Solve linear system Ax = b by Jacobi iteration.
%   [x, iter, res] = JACOB(A, b) uses x0 = zeros(n,1), tol=1e-6,
%   maxit = 100.
%   [x, iter, res] = JACOB(A, b, x0, tol, maxit) specifies initial guess,
%   tolerance, and maximum iterations.

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
    error('Matrix A must be square.');
end
if numel(b) ~= n
    error('Right-hand side b must be compatible with A.');
end

D = diag(diag(A));
if any(diag(D) == 0)
    error('Matrix A has zero diagonal entries; Jacobi method cannot proceed.');
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
    warning('jacob:NoConvergence', 'Jacobi iteration did not converge within the maximum number of iterations.');
end
end
