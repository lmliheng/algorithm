# loc-graph · README 里那张「代码行数随时间」图

自己维护的版本（原来依赖 `botforge-pro/loc-graph-action`），数据与渲染都在这个目录里，
流程由 `.github/workflows/loc-graph.yml` 每天跑一次。

## 结构

| 路径 | 作用 |
| --- | --- |
| `scripts/loc_graph.py` | 逐提交用 `cloc` 数代码行，缓存进 `.github/loc_history.json`，同时生成静态 SVG |
| `scripts/render.mjs` | 用 Remotion 把同一份 json 渲染成 `1800×580` 的动画 WebP（浅色/深色各一张） |
| `src/AlgoChart.tsx` | 图表组件：几何、配色照抄 `loc-history*.svg`，纵轴上限跟着数据走 |
| `public/fonts/` | MiSans 拉丁子集，保证渲染出的数字字形稳定 |

数据口径与原 action 一致：`cloc` 的 `SUM.code`，排除 `.git`、`.github`、`package-lock.json`；
只对缓存里没有的提交做计算，所以每天通常只数 1 个提交。

## 本地跑

```bash
sudo apt-get install -y cloc webp   # webp 提供 img2webp；没有也能退回 ffmpeg
cd tools/loc-graph
npm ci
python3 scripts/loc_graph.py        # 更新 .github/loc_history.json + 静态 SVG
node scripts/render.mjs             # 出 .github/loc-history-{light,dark}.webp
```

`node scripts/render.mjs` 首次运行会下载 Chrome Headless Shell（约 220MB，几分钟），
之后复用 `node_modules/.remotion`。想看效果：`npm run dev` 打开 Remotion Studio。

## 产物去哪

- `.github/loc_history.json`、`.github/loc-history*.svg` —— 跟以前一样提交到 `master`
  （都是小文本，留着数据历史）。
- `.github/loc-history-{light,dark}.webp` —— 每张 250KB 上下，每天重出会把仓库撑大，所以：
  - 一条单提交、每天强制覆盖的 `loc-graph` 分支留一份（备份，`raw.githubusercontent.com` 可直取）；
  - 同时 `scripts/deploy-vercel.mjs` 把这两张图 + 一个预览页部署到 Vercel 项目 `algorithm-loc`，
    README 引用的就是 `https://algorithm-loc.vercel.app/loc-history-*.webp`。
- Vercel 部署用 Deployments API（`VERCEL_TOKEN`，在仓库 Actions secrets 里），
  每次是一个不可变部署，生产域名自动指过去，所以 URL 固定、内容每天更新。
  workflow 最后一步会把线上图和本地图做 sha256 比对，对不上就红。

## 形态

5 秒、15fps、循环播放：坐标轴淡入 → 折线从左往右画出（面积和右上角数字跟着走）→
折线头脉冲 → 收尾淡出。首尾都是空白背景，循环不硬切。
