classdef Utils
    methods (Static)
        function c = add(a,b)
            c = a + b;
        end
        
        function c = multiply(a,b)
            c = a * b;
        end
        
        function y = clamp(x, lo, hi)
            y = max(lo, min(x, hi));
        end
    end
end