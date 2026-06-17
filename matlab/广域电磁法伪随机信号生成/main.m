% Copyright (c) 2024 by Central South University.  
% coding: utf-8                                                     
% Programme written by Yang Yaokun                        
% For more information, contact by email: revenir32@outlook.com 
% Please read the README.md before use. 
% ------------------------------------------

clc
clearvars

ct = ChannelTask();


ct.AddInterval(2, [1 32]);
ct.AddInterval(2, [1 2 4 8 16 32]);

ct.PlotSpectrum();

% ct.SignalStack{1}
% ct.SignalStack{2}
% % ct.SignalStack{3}
% length(ct.signal)
