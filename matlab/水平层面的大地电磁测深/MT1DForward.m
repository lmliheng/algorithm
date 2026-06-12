function [apparentRho, Phase] = MT1DForward(rho, h, f) 

nFreqs = length(f);
nLayer = length(rho);

apparentRho = zeros(1, nFreqs);
Phase = zeros(1, nFreqs);
Z_surface = zeros(1, nFreqs);

u0 = 4*pi*1e-7;

for iFreq = 1:nFreqs
    omega = 2*pi*f(iFreq);
    
    Z_bottom = sqrt(1i * omega * u0 * rho(nLayer));
    
    for j = (nLayer-1):-1:1
        k = sqrt(1i * omega * u0 / rho(j));
        Z0 = sqrt(1i * omega * u0 * rho(j));
        
        R = (Z0 - Z_bottom) / (Z0 + Z_bottom);
        Q = exp(-2 * k * h(j));
        
        Z_top = Z0 * (1 - R * Q) / (1 + R * Q);
        
        Z_bottom = Z_top;
    end
    
    Z_surface(iFreq) = Z_bottom;
    
    apparentRho(iFreq) = (abs(Z_surface(iFreq))^2) / (omega * u0);
    Phase(iFreq) = atan2d(imag(Z_surface(iFreq)), real(Z_surface(iFreq)));
end

end