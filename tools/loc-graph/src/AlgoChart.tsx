import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { useMiSans } from './useMiSans';
import history from '../../../.github/loc_history.json';

/**
 * README 里「代码行数随时间」图的动效版。
 *
 * 数据直接读 .github/loc_history.json（由 scripts/loc_graph.py 用 cloc 逐提交统计），
 * 几何与配色照抄同一脚本生成的 loc-history*.svg：
 * 画布 900×290、绘图区 x 40~860 / y 40~220、纵轴按 nice_round 取整（现在落在 0~100k）、
 * 横轴日期斜 45°。
 * 动效：坐标轴淡入 → 折线从左往右画出来（面积与数字跟着走）→ 折线头脉冲 → 收尾淡出。
 */

type Row = { sha: string; date: string; loc: number };

const DATA = history as Row[];

const W = 900;
const H = 290;
const X0 = 40;
const X1 = 860;
const Y0 = 40;
const Y1 = 220;

const PALETTE = {
  light: { bg: '#ffffff', grid: '#e5e7eb', text: '#111827', sub: '#9ca3af', line: '#111827' },
  dark: { bg: '#0d1117', grid: '#30363d', text: '#c9d1d9', sub: '#8b949e', line: '#3fb950' },
};

/** 与 scripts/loc_graph.py 的 nice_round / calculate_ymax 一致，图表上限跟着数据走 */
const niceRound = (n: number): number => {
  if (n <= 0) return 10;
  const magnitude = 10 ** (Math.trunc(n).toString().length - 1);
  for (const step of [1, 2, 3, 5, 10]) {
    if (n <= step * magnitude) return step * magnitude;
  }
  return 10 * magnitude;
};

const yMaxFor = (max: number): number => {
  if (max <= 0) return 100;
  let ymax = niceRound(max);
  if (max >= ymax * 0.95) {
    if (ymax < 100) ymax += 10;
    else if (ymax < 1000) ymax += 100;
    else if (ymax < 10000) ymax += 1000;
    else ymax += 10000;
    ymax = niceRound(ymax);
  }
  return ymax;
};

const lastLoc = DATA.length ? DATA[DATA.length - 1].loc : 0;
const Y_MAX = yMaxFor(lastLoc);
const TICKS = [0, 1, 2, 3, 4].map((i) => Math.round((Y_MAX * i) / 4));

const xAt = (i: number) => X0 + (i / Math.max(1, DATA.length - 1)) * (X1 - X0);
const yAt = (loc: number) => Y1 - (Math.min(loc, Y_MAX) / Y_MAX) * (Y1 - Y0);
const tickLabel = (v: number) =>
  v === 0 ? '0' : v >= 1_000_000 ? `${v / 1_000_000}M` : `${v / 1000}k`;
const fmtDate = (iso: string) => {
  const [y, m, d] = iso.slice(0, 10).split('-');
  return `${d}.${m}.${y}`;
};

const DRAW_START = 14;
const DRAW_END = 92;

type Props = { theme: 'light' | 'dark'; scale?: number };

export const AlgoChart: React.FC<Props> = ({ theme, scale = 2 }) => {
  useMiSans();
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const c = PALETTE[theme];

  // 坐标轴淡入
  const axes = interpolate(f, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  const xLab = interpolate(f, [6, 20], [0, 1], { extrapolateRight: 'clamp' });

  // 折线画出进度
  const p = interpolate(f, [DRAW_START, DRAW_END], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const k = p * (DATA.length - 1);
  const whole = Math.floor(k);
  const frac = k - whole;

  const pts: [number, number][] = [];
  for (let i = 0; i <= whole; i++) {
    pts.push([xAt(i), yAt(DATA[i].loc)]);
  }
  if (whole < DATA.length - 1) {
    const a = DATA[whole];
    const b = DATA[whole + 1];
    const loc = a.loc + (b.loc - a.loc) * frac;
    pts.push([xAt(whole) + (xAt(whole + 1) - xAt(whole)) * frac, yAt(loc)]);
  }
  const linePath = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
  const areaPath = `${linePath} L ${(pts[pts.length - 1]?.[0] ?? X0).toFixed(2)} ${Y1} L ${X0} ${Y1} Z`;

  // 当前值：跟随画的进度
  const curIdx = Math.min(DATA.length - 1, whole + (frac > 0 ? 1 : 0));
  const cur = DATA[curIdx];
  const shownLoc = Math.round(
    whole >= DATA.length - 1
      ? DATA[DATA.length - 1].loc
      : (DATA[whole]?.loc ?? 0) + ((DATA[whole + 1]?.loc ?? 0) - (DATA[whole]?.loc ?? 0)) * frac
  );

  const tip = pts[pts.length - 1];
  const done = p >= 1;
  const pulse = done
    ? 1 + 0.35 * Math.sin(((f - DRAW_END) / 12) * Math.PI) * Math.max(0, 1 - (f - DRAW_END) / 30)
    : 1;
  const tipIn = spring({ frame: f - DRAW_START, fps: 30, config: { stiffness: 200, damping: 20 } });

  // 收尾淡出，循环不硬切
  const out = interpolate(f, [durationInFrames - 16, durationInFrames - 2], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const xTicks = Array.from({ length: 11 }, (_, i) =>
    Math.min(DATA.length - 1, Math.round((i * (DATA.length - 1)) / 10))
  );

  return (
    <AbsoluteFill style={{ background: c.bg }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: W,
          height: H,
          transform: `scale(${scale})`,
          transformOrigin: '0 0',
          opacity: out,
          fontFamily: "'MiSans', 'DejaVu Sans', sans-serif",
        }}
      >
        <svg width={W} height={H} style={{ display: 'block' }}>
          {/* 网格 + 纵轴刻度 */}
          <g opacity={axes}>
            {TICKS.map((v) => (
              <g key={v}>
                <line x1={X0} y1={yAt(v)} x2={X1} y2={yAt(v)} stroke={c.grid} strokeWidth={1} />
                <text x={32} y={yAt(v) + 4} fontSize={10} fill={c.text} textAnchor="end">
                  {tickLabel(v)}
                </text>
              </g>
            ))}
            <line x1={X0} y1={Y0} x2={X0} y2={Y1} stroke={c.grid} opacity={0.5} />
            <line x1={X0} y1={Y1} x2={X1} y2={Y1} stroke={c.grid} />
          </g>

          {/* 横轴日期 */}
          <g opacity={xLab}>
            {xTicks.map((idx) => (
              <text
                key={idx}
                x={xAt(idx)}
                y={235}
                fontSize={9}
                fill={c.text}
                textAnchor="middle"
                transform={`rotate(-45 ${xAt(idx).toFixed(2)} 235)`}
              >
                {fmtDate(DATA[idx].date)}
              </text>
            ))}
          </g>

          {/* 面积 + 折线 */}
          {pts.length > 1 && (
            <>
              <path d={areaPath} fill={c.line} opacity={0.08} />
              <path
                d={linePath}
                fill="none"
                stroke={c.line}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity={axes}
              />
            </>
          )}

          {/* 折线头部 */}
          {tip && (
            <g opacity={tipIn}>
              <circle cx={tip[0]} cy={tip[1]} r={9 * pulse} fill={c.line} opacity={0.18} />
              <circle cx={tip[0]} cy={tip[1]} r={3.2 * pulse} fill={c.line} />
            </g>
          )}
        </svg>

        {/* 计数 */}
        <div
          style={{
            position: 'absolute',
            right: W - X1,
            top: 6,
            textAlign: 'right',
            opacity: interpolate(f, [8, 24], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: c.text,
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: -0.5,
              lineHeight: 1,
            }}
          >
            {shownLoc.toLocaleString('en-US')}
          </div>
          <div style={{ fontSize: 11, color: c.sub, marginTop: 5, letterSpacing: 0.4 }}>
            lines of code · {cur?.date.slice(0, 10) ?? ''}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
