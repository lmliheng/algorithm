f = logspace(-4,4,100)';
rho = [100;10;100];      % 三层地电模型
h = [2000;2000];         % 两个厚度(最后一层为均匀半空间)  

[apparentRho,Phase]=MT1DForward(rho,h,f);

subplot(2,1,1)
    plot(1./f,apparentRho,'o','MarkerSize',5,'MarkerFaceColor',[0,0.45,0.74])
    set(gca,'Yscale','log','Xscale','log','LineWidth',1.5,'FontSize',12)
    xlabel('periods [s]');
    ylabel('apparent \rho [\Omega m]')
    title('Rho');
    axis([10^-3,10^3,10^0,10^4]);

subplot(2,1,2)
    plot(1./f,Phase,'o','MarkerSize',5,'MarkerFaceColor',[0,0.45,0.74])
    set(gca,'Xscale','log','LineWidth',1.5,'FontSize',12)
    xlabel('periods [s]');
    ylabel('phase [\circ]');
    title('Phase');
    axis([10^-3,10^3,-inf,inf]);