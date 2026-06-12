f = logspace(-4,4,100)';
rho = [100;10;100];
h = [2000;2000];

% 不是s等值
rho_s_1 = [100;1000;100];
h_s_1 = [2000;200000]; 


% 第一层的视电阻率随频率的变化
[apparentRho,Phase]=MT1DForward(rho,h,f);
[apparentRho_s_1,Phase_s_1]=MT1DForward(rho_s_1,h_s_1,f);

plot(1./f,apparentRho,'o','MarkerSize',5,'MarkerFaceColor',[0,0.45,0.74])
set(gca,'Yscale','log','Xscale','log','LineWidth',1.5,'FontSize',12)
xlabel('periods [s]');
ylabel('视电阻率 \rho [\Omega m]')
axis([10^-3,10^3,10^0,10^4]);


hold on;

plot(1./f,apparentRho_s_1,'o','MarkerSize',5,'MarkerFaceColor',[0,0.45,0.74])
set(gca,'Yscale','log','Xscale','log','LineWidth',1.5,'FontSize',12)
xlabel('periods [s]');
ylabel('视电阻率 \rho [\Omega m]')
axis([10^-3,10^3,10^0,10^4]);