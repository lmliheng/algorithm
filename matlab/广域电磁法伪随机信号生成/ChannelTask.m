classdef ChannelTask < handle
    properties (Access = public)
        SignalStack              cell
        signal            (1, :) double = []
        nInterval         (1, 1) double = 0
        samplingTime      (1, :) double = []
        samplingFrequency (1, 1) double = 8
        figureHandle           
    end

    methods (Access = public)
        function ct = ChannelTask()
            ct.SignalStack = cell(1, 5);
        end

        function ct = AddInterval(ct, sampling_time, frequency_list)
            ct.nInterval = ct.nInterval + 1;

            si = SignalInterval(frequency_list, 4, sampling_time);
            ct.SignalStack(ct.nInterval) = {si};

            ct.samplingTime = cat(2, ct.samplingTime, si.samplingTime);
            sampling_Frequency = lcm(ct.samplingFrequency, si.samplingFrequency);
            ct.signal = [];
            for i = 1:ct.nInterval
                si = ct.SignalStack{i};
                si.Sampling(sampling_Frequency/si.samplingFrequency);
                ct.signal = cat(2, ct.signal, si.signal);
            end
            ct.samplingFrequency = sampling_Frequency;
        end

        function ct = RemoveInterval(ct)
            if ct.nInterval > 1
                ct.signal(end-length(ct.SignalStack{ct.nInterval}.signal)+1:end) = [];
                delete(ct.SignalStack{ct.nInterval});
                ct.samplingTime(ct.nInterval) = [];
                ct.nInterval = ct.nInterval - 1;
            end
        end

        function ct = PlotSpectrum(ct)
            time = linspace(0, sum(ct.samplingTime), ct.samplingFrequency*sum(ct.samplingTime));
            figure('Color', 'w')

            subplot(3, ct.nInterval, 1:ct.nInterval)
            plot(time, ct.signal, 'k' ,'LineWidth', .8)
            grid on
            ax = gca;

            ax.FontSize      = 10;
            ax.XLim          = [0, sum(ct.samplingTime)];
            ax.YLim          = [-1.2, 1.2];
            ax.XLabel.String = 't/s';
            ax.YLabel.String = 'Amplitude/A';
            ax.Title.String  = 'Time domain signal';

            for i = 1:ct.nInterval
                si = ct.SignalStack{i};
           
                subplot(3, ct.nInterval, ct.nInterval+i)
                semilogx(si.frequency, si.amplitude, 'k' , ...
                    'LineWidth', .8)
                hold on
                grid on
                semilogx(si.dominantFrequency, si.dominantAmplitude, 'ro', ...
                    'MarkerSize', 5)
                ax = gca; 

                ax.FontSize = 10;
                ax.XLabel.String = 'Frequency/Hz';
                if (i == 1)
                    ax.YLabel.String = 'Amplitude/A';
                end
                ax.Title.String = ['Signal ', num2str(i)];
                hold off

                subplot(3, ct.nInterval, ct.nInterval*2+1:ct.nInterval*3)
                colorchar = ['r', 'g', 'b', 'c', 'm', 'y', 'k'];
                semilogx(si.frequency, si.amplitude, colorchar(i), ...
                    'LineWidth', .8, ...
                    'DisplayName', ['Signal ', num2str(i)])

                hold on
                grid on


                semilogx(si.dominantFrequency, si.dominantAmplitude, 'o', ...
                    'MarkerSize', 5, ...
                    'MarkerEdgeColor', 'k', ...
                    'HandleVisibility', 'off')
                ax = gca;
                ax.FontSize = 10;
                ax.XLabel.String = 'Frequency/Hz';
                ax.YLabel.String = 'Amplitude/A';
                ax.Title.String = 'Specturm';
            end

            legend('Location', 'northwest');
        end
    end
end