#!/usr/bin/env node
/**
 * 把渲染好的两张动图部署到 Vercel（项目名默认 algorithm-loc），
 * README 用 https://algorithm-loc.vercel.app/loc-history-{light,dark}.webp 引用。
 *
 * 走 Deployments API，不用 Vercel CLI：每次是一个新的不可变部署，部署成功后
 * project 的生产域名自动指过去，所以同一个 URL 每天更新，图片不占仓库历史。
 *
 * 环境变量：VERCEL_TOKEN（必需）、VERCEL_PROJECT（可选，默认 algorithm-loc）
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(HERE, '..');
const REPO = path.resolve(PROJECT, '..', '..');
const GITHUB = path.join(REPO, '.github');

const API = 'https://api.vercel.com';
const TOKEN = process.env.VERCEL_TOKEN;
const NAME = process.env.VERCEL_PROJECT || 'algorithm-loc';

if (!TOKEN) {
  console.error('缺少 VERCEL_TOKEN，跳过 Vercel 部署');
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const history = JSON.parse(readFileSync(path.join(GITHUB, 'loc_history.json'), 'utf8'));
const last = history[history.length - 1] ?? { loc: 0, date: '' };
const first = history[0] ?? { date: '' };
const fmt = (n) => n.toLocaleString('en-US');

const index = `<!doctype html>
<html lang="zh-CN">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>algorithm · lines of code</title>
<style>
  :root { color-scheme: light dark; --bg:#fff; --fg:#111827; --sub:#6b7280; --line:#e5e7eb; }
  @media (prefers-color-scheme: dark) { :root { --bg:#0d1117; --fg:#c9d1d9; --sub:#8b949e; --line:#30363d; } }
  body { margin:0; background:var(--bg); color:var(--fg);
         font:15px/1.6 -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; }
  main { max-width: 960px; margin: 0 auto; padding: 48px 20px 64px; }
  h1 { font-size: 16px; font-weight: 600; margin: 0 0 4px; letter-spacing: .2px; }
  p.sub { color: var(--sub); margin: 0 0 28px; font-size: 13px; }
  .num { font-size: 44px; font-weight: 600; letter-spacing: -1px; font-variant-numeric: tabular-nums; line-height: 1; }
  .num small { font-size: 13px; font-weight: 400; letter-spacing: 0; color: var(--sub); margin-left: 8px; }
  picture, img { display:block; width:100%; height:auto; margin: 24px 0 8px; }
  footer { margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--line);
           color: var(--sub); font-size: 12px; }
  a { color: inherit; }
</style>
<main>
  <h1>algorithm · lines of code</h1>
  <p class="sub">cloc 逐提交统计，每天自动更新一次</p>
  <div class="num">${fmt(last.loc)}<small>lines · ${last.date.slice(0, 10)}</small></div>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="loc-history-dark.webp">
    <img src="loc-history-light.webp" alt="Lines of code over time">
  </picture>
  <footer>
    ${history.length} commits，${first.date.slice(0, 10)} 起 ·
    <a href="https://github.com/lmliheng/algorithm">github.com/lmliheng/algorithm</a>
  </footer>
</main>
</html>
`;

const vercelJson = {
  headers: [
    {
      source: '/(.*)\\.webp',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=60, s-maxage=60, stale-while-revalidate=86400' }],
    },
  ],
};

const files = [
  ['index.html', Buffer.from(index, 'utf8')],
  ['vercel.json', Buffer.from(JSON.stringify(vercelJson, null, 2), 'utf8')],
  ['loc-history-light.webp', readFileSync(path.join(GITHUB, 'loc-history-light.webp'))],
  ['loc-history-dark.webp', readFileSync(path.join(GITHUB, 'loc-history-dark.webp'))],
];

const call = async (p, init = {}) => {
  const res = await fetch(`${API}${p}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    throw new Error(`${init.method ?? 'GET'} ${p} -> ${res.status}: ${text.slice(0, 300)}`);
  }
  return data;
};

const main = async () => {
  console.log(`部署到 Vercel 项目 ${NAME} …`);
  const dep = await call('/v13/deployments', {
    method: 'POST',
    body: JSON.stringify({
      name: NAME,
      project: NAME,
      target: 'production',
      files: files.map(([file, buf]) => ({ file, data: buf.toString('base64'), encoding: 'base64' })),
      projectSettings: { framework: null },
    }),
  });
  console.log('  deployment', dep.id, dep.url);

  let state = dep.readyState;
  for (let i = 0; i < 60 && state !== 'READY' && state !== 'ERROR' && state !== 'CANCELED'; i++) {
    await sleep(5000);
    const cur = await call(`/v13/deployments/${dep.id}`);
    state = cur.readyState;
    process.stdout.write(`  ${state}\n`);
  }
  if (state !== 'READY') {
    throw new Error(`部署没有完成，最终状态 ${state}`);
  }

  const project = await call(`/v9/projects/${NAME}`);
  const domains = (project.targets?.production?.alias ?? []).map((a) => a.domain ?? a);
  const domain = domains.find((d) => d.endsWith('.vercel.app')) ?? `${NAME}.vercel.app`;
  for (const file of ['loc-history-light.webp', 'loc-history-dark.webp']) {
    console.log(`  https://${domain}/${file}`);
  }
  console.log(`  页面 https://${domain}/`);
};

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
