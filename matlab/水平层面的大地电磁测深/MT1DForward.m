function [apparentRho,Phase] = MT1DForward(rho,h,f) 

nFreqs = length(f);
nLayer = length(rho);

for iFreq = 1:nFreqs
    omega = 2*pi*f(iFreq);
    u0 = 4*pi*1e-7;


    for j = nLayer:-1:1
    k = sqrt(1i*omega*u0/rho(j));
    Z0 = sqrt(1i*omega*u0*rho(j));
    if j==nLayer
        Z = Z0;
        continue;
    end
    R = (Z0-Z)/(Z0+Z);
    Q = exp(-2*k*h(j));
    Z = Z0*(1-R*Q)/(1+R*Q);
    end

    Z(iFreq)=Z;
     apparentRho(iFreq) = (abs(Z(iFreq)).^2)./(omega*u0);
     Phase(iFreq) = atan2d(imag(Z(iFreq)),real(Z(iFreq)));
end

end