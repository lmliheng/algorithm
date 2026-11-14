import React from 'react';
import { Composition } from 'remotion';
import { AlgoChart } from './AlgoChart';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="AlgoChart"
      component={AlgoChart}
      defaultProps={{ theme: 'light' as const, scale: 2 }}
      durationInFrames={150}
      fps={30}
      width={1800}
      height={580}
    />
    <Composition
      id="AlgoChartDark"
      component={AlgoChart}
      defaultProps={{ theme: 'dark' as const, scale: 2 }}
      durationInFrames={150}
      fps={30}
      width={1800}
      height={580}
    />
  </>
);
