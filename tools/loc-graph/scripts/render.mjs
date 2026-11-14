#!/usr/bin/env node
/**
 * 把 .github/loc_history.json 渲染成 README 里的动图：
 *   .github/loc-history-light.webp / .github/loc-history-dark.webp
 *
 * 流程：Remotion 输出 PNG 序列（1800×580、每秒 30 帧、5 秒）→ 隔帧采样成 15fps →
 * 编码成动画 WebP（img2webp 优先，没有就退回 ffmpeg 的 libwebp_anim）。
 * 首帧是完整画面，不支持动图的地方会优雅地停在结尾状态。
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, copyFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(HERE, '..');
const REPO = path.resolve(PROJECT, '..', '..');
const GITHUB = path.join(REPO, '.github');
const TMP = path.join(PROJECT, 'tmp-frames');

const FPS_OUT = 15;
const SOURCE_FPS = 30;
const QUALITY = 64;
const COMPOSITIONS = [
  { id: 'AlgoChart', file: 'loc-history-light.webp', label: 'light' },
  { id: 'AlgoChartDark', file: 'loc-history-dark.webp', label: 'dark' },
];

const run = (cmd, args, opts = {}) => {
  const r = spawnSync(cmd, args, { stdio: 'inherit', cwd: PROJECT, ...opts });
  if (r.status !== 0) throw new Error(`${cmd} ${args.join(' ')} 失败 (exit ${r.status})`);
};

const framesOf = (dir) => {
  const names = readdirSync(dir).filter((n) => n.endsWith('.png'));
  const parsed = names.map((n) => {
    const m = n.match(/^(.*?)(\d+)\.png$/);
    return m ? { name: n, prefix: m[1], num: Number(m[2]), pad: m[2].length } : null;
  });
  if (!parsed.some(Boolean)) throw new Error(`${dir} 里没有帧`);
  const first = parsed.find(Boolean);
  parsed.sort((a, b) => a.num - b.num);
  return { files: parsed.map((p) => path.join(dir, p.name)), prefix: first.prefix, pad: first.pad };
};

const hasBinary = (name) => spawnSync('sh', ['-c', `command -v ${name}`]).status === 0;

const encode = (dir, out, tempOut) => {
  const { files, prefix, pad } = framesOf(dir);
  const picked = files.filter((_, i) => i % (SOURCE_FPS / FPS_OUT) === 0);
  const frameMs = Math.round(1000 / FPS_OUT);

  if (hasBinary('img2webp')) {
    run('img2webp', ['-loop', '0', '-d', String(frameMs), '-lossy', '-q', String(QUALITY), '-m', '4', '-o', tempOut, ...picked]);
  } else if (hasBinary('ffmpeg')) {
    const pattern = path.join(dir, `${prefix}%0${pad}d.png`);
    run('ffmpeg', ['-v', 'error', '-y', '-framerate', String(SOURCE_FPS), '-i', pattern,
      '-vf', `fps=${FPS_OUT}`,
      '-c:v', 'libwebp_anim', '-q:v', String(QUALITY), '-compression_level', '4', '-loop', '0', tempOut]);
  } else {
    throw new Error('既没有 img2webp 也没有 ffmpeg，无法编码动画 WebP');
  }
  copyFileSync(tempOut, out);
  const kb = Math.round(statSync(out).size / 1024);
  const seconds = (picked.length * frameMs) / 1000;
  console.log(`  ${path.relative(REPO, out)}  ${picked.length} 帧  ${seconds.toFixed(1)}s  ${kb} KB`);
};

const main = () => {
  if (!existsSync(path.join(GITHUB, 'loc_history.json'))) {
    throw new Error('.github/loc_history.json 不存在，先跑 scripts/loc_graph.py');
  }
  rmSync(TMP, { recursive: true, force: true });
  mkdirSync(TMP, { recursive: true });

  const remotion = path.join(PROJECT, 'node_modules', '.bin', 'remotion');
  for (const comp of COMPOSITIONS) {
    const dir = path.join(TMP, comp.label);
    console.log(`渲染 ${comp.id} …`);
    run(remotion, ['render', 'src/index.ts', comp.id, dir, '--sequence', '--image-format=png',
      '--concurrency=2', '--log=error']);
    encode(dir, path.join(GITHUB, comp.file), path.join(TMP, `${comp.label}.webp`));
  }
  rmSync(TMP, { recursive: true, force: true });
};

main();
