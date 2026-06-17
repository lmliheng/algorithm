classdef PseudoRandomSignal < handle
    properties (GetAccess = public, SetAccess = private)
        frequencyList % -> this -> sequence
        nSequence
    end

    properties (Access = private)
        sequence % -> Sampling -> signal
    end

    methods (Access = public)
        function prs = PseudoRandomSignal(frequencyList)
            arguments
                frequencyList (1, :) double = 1
            end
                prs.frequencyList = frequencyList;
                prs.MakeSequence();
        end

        function signal = Sampling(prs, n_interpolation, sampling_time)
            arguments
                prs             (1,1) PseudoRandomSignal
                n_interpolation (1,1) double = 1
                sampling_time   (1,1) double = 1
            end
            signal = repmat(repelem(prs.sequence, n_interpolation), ...
                                    1, sampling_time);
        end
    end

    methods (Access = private)
        function prs = MakeSequence(prs)
            nFrequency         = length(prs.frequencyList);
            n_cols_half_matrix = prs.frequencyList(1);
            for i = 2:nFrequency
                n_cols_half_matrix = lcm(n_cols_half_matrix, prs.frequencyList(i));
            end
            n_cols_matrix  = n_cols_half_matrix*2;
            sequenceMatrix = zeros(nFrequency, n_cols_matrix);
            prs.sequence   = zeros(1, n_cols_matrix);
            prs.nSequence  = n_cols_matrix;
            for i = 1:nFrequency
                half_period          = ones(1, n_cols_half_matrix/prs.frequencyList(i));
                pattern              = cat(2, half_period, -half_period);
                sequenceMatrix(i, :) = repmat(pattern, 1, prs.frequencyList(i));
            end
            prs.sequence = sign(sum(sequenceMatrix, 1));
        end
    end
end