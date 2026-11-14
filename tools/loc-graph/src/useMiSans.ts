import { useEffect, useState } from 'react';
import { continueRender, delayRender, staticFile } from 'remotion';

/**
 * 加载 Adelie 的品牌字体 MiSans（packages/ui/src/fonts/misans 的拉丁子集）。
 * 字体没就绪就渲染会掉到系统字体，所以用 delayRender 卡住渲染直到字体可用。
 */
let cached = false;

export const useMiSans = (): void => {
  const [handle] = useState(() => (cached ? null : delayRender('Loading MiSans')));

  useEffect(() => {
    if (handle === null) {
      return;
    }
    const faces = [
      new FontFace('MiSans', `url(${staticFile('fonts/misans-400-latin.woff2')}) format('woff2')`, { weight: '400' }),
      new FontFace('MiSans', `url(${staticFile('fonts/misans-500-latin.woff2')}) format('woff2')`, { weight: '500' }),
    ];
    Promise.all(faces.map((face) => face.load()))
      .then((loaded) => {
        loaded.forEach((face) => document.fonts.add(face));
        cached = true;
      })
      .catch(() => {
        // 字体加载失败就退回系统字体，不要让整条渲染卡死
      })
      .finally(() => continueRender(handle));
  }, [handle]);
};
