classdef SignalInterval < handle
    properties (GetAccess = public, SetAccess = public)
       signal            (1, :) double = [-1 1]
       samplingTime      (1, 1) double = 1
       samplingFrequency (1, 1) double = 2
       frequency         (1, :) double
       amplitude         (1, :) double
       dominantFrequency (1, :) double
       dominantAmplitude (1, :) double
    end

    properties (Access = private)
        frequencyList    (1, :) double = 1
        nSignal          (1, 1) double = 2
    end

    methods (Access = public)
        function si = SignalInterval(frequency_list, n_interpolation, sampling_time)
            prs = PseudoRandomSignal(frequency_list);
            si.signal            = prs.Sampling(n_interpolation, sampling_time);
            si.frequencyList     = frequency_list;
            si.samplingTime      = sampling_time;
            si.samplingFrequency = n_interpolation * prs.nSequence;
            si.nSignal           = length(si.signal);
            delete(prs); 

            si.Spectrum();
            si.MarkSpectrum();
        end

        function si = Sampling(si, n_interpolation)
            arguments
                si                    SignalInterval
                n_interpolation (1,1) double = 1
            end
            si.samplingFrequency = n_interpolation * si.samplingFrequency; 
            si.signal            = repelem(si.signal, n_interpolation);
            si.nSignal           = length(si.signal);
            si.Spectrum();
            si.MarkSpectrum();
        end
    end

    methods (Access = private)
        function si = Spectrum(si)
            n = si.nSignal /2;
            a = fft(si.signal); % win or win
            si.frequency = (0:n-1)/si.samplingTime;
            si.amplitude = abs(a(1:n))/n;
        end

        function si = MarkSpectrum(si)
            [~, index] = sort(si.amplitude,'descend');
            index = index(1:length(si.frequencyList));
            si.dominantFrequency = si.frequency(index);
            si.dominantAmplitude = si.amplitude(index);
        end
    end
end