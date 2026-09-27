# 算法题解站点（site/）

把仓库里的算法题源码自动生成一个可检索的静态站点，推送到 `master` 后由 GitHub Actions 发布到
GitHub Pages：https://lmliheng.github.io/algorithm/

**生成的页面不入库**，每次构建现场生成，仓库里只有生成脚本和站点配置。

这份文档同时发布为站点的「站点说明」页（`site/README.md` → `docs/guide/index.md`，构建时生成）。

## 收录范围

| 目录 | 语言 | 说明 |
| --- | --- | --- |
| `ts/leetcode/**` | TypeScript / JavaScript | 文件名即题号与标题 |
| `python/**` | Python | 除 `python/base/` |
| `sql/leetcode/**` | SQL | |
| `Java/src/main/java/**` | Java | 单文件按 `@题号.标题` 标记切分 |

`ts/JS/**` 的通用笔记、`matlab/` 等不在收录范围内（只收算法题）。

## 命令

依赖统一装在仓库根目录的 `package.json` 里（`site/` 下没有自己的 `package.json`），
所以命令都在**仓库根目录**执行：

```bash
npm install              # 首次
npm run site:scan        # 扫描题源，输出统计；-- --todo 列出还缺标签/复杂度的题目
npm run site:gen         # 扫描 + 生成题解页和站点说明页
npm run site:dev         # 本地预览（先 gen 再起 dev server）
npm run site:build       # 完整构建，产物在 site/docs/.vitepress/dist
npm run site:icons       # 重新生成图标（只有改了图标设计才需要跑）
npm run typecheck        # 站点生成脚本的类型检查
```

本地预览地址是 http://localhost:5173/algorithm/ （`base` 是 `/algorithm/`）。

`npm run typecheck` 走的是根目录的 `tsconfig.site.json`，只圈定 `site/scripts`；
`ts/` 是练习代码、本来就带着一批类型错误，混进来会让检查永远红。

## 元数据从哪来

**能推导的不用手写。**

| 字段 | 来源 |
| --- | --- |
| 题号 / 标题 / 解法 | 文件名，如 `115. 不同的子序列（解法二）.ts`；`跳跃游戏/1.js` 用父目录 + 序号 |
| 语言 | 扩展名 |
| 来源 | 路径里的 `leetcode` / `周赛` / `ACM模式`，可用注释覆盖 |
| 作者 / 最近更新 | git 历史 |
| 复杂度 / 标签 / 难度 / 版本说明 | 代码注释 |

### 注释写法

放在文件开头即可，各语言一致（TS/JS 用 `/** */`，Python 用 `"""`，SQL 用 `--`）：

```ts
/**
 * @lc 115
 * @title 不同的子序列
 * @source leetcode
 * @difficulty hard
 * @tags dp,字符串
 * @time O(n*m)
 * @space O(m)
 * @version 一维滚动数组
 * @note 相比解法二把空间从 O(n*m) 降到 O(m)
 */
```

只写注释里的哪几行都行，缺的字段页面显示 `—`，不影响构建。老写法也认：
`@两数之和`、`@1.两数之和`、`lc 1`、`时间复杂度O(n),空间复杂度O(1)`、`困难`。

## 标签是受控词表

只有 `scripts/lib/tags.ts` 里列出的标签会被采纳，分三组：算法思想、数据结构、题型。
写别名（`backtrace`、`动态规划`、`二分查找`…）会被自动归一；写了词表外的词，
`npm run site:scan` 会把它列在"需要注意"里，方便决定是补词表还是改标注。

## 图标

图标是 `site/scripts/icons.ts` 用几何画出来再自己光栅化成 PNG 的，不依赖图形库：
所有坐标写在 64×64 的设计方格里，4×4 超采样抗锯齿，最后按最简 PNG 格式编码，
多个尺寸再打包成 `.ico`。产物是要入库的静态资源：

| 文件 | 用途 |
| --- | --- |
| `docs/public/favicon.svg` | 浏览器标签页（手写，不由脚本生成） |
| `docs/public/favicon.ico` | 标签页兜底，内含 16 / 32 / 48 |
| `docs/public/apple-touch-icon.png` | iOS 加到主屏（铺满不透明，让系统自己切圆角） |
| `docs/public/icon-192.png` / `icon-512.png` | PWA 清单 |
| `docs/public/icon-maskable-512.png` | PWA maskable，图形缩到安全区内 |
| `docs/public/site.webmanifest` | PWA 清单，指向上面几张 |

改了图标设计，跑 `npm run site:icons` 重新生成即可（`favicon.svg` 要手动同步）。

## 目录结构

```
site/
├── scripts/            生成脚本（TypeScript，Node 原生类型剥离，无需编译）
│   ├── scan.ts         扫描题源 → .cache/problems.full.json + docs/public/problems.json
│   ├── render.ts       → docs/problems/**.md（每题一页 + 全量索引）+ docs/guide/index.md
│   ├── annotate.ts     把批注 YAML 写回源码注释
│   ├── icons.ts        生成图标
│   └── lib/            git 历史、注释解析、文件名解析、Java 切分、词表
└── docs/
    ├── index.md        首页：题解检索器（<ProblemExplorer />）
    ├── .vitepress/     VitePress 配置、主题、检索组件
    ├── public/         图标、site.webmanifest、problems.json（生成）
    ├── guide/          站点说明页（生成，来源是本文件）
    └── problems/       题解页（生成）
```

## 发布

`.github/workflows/deploy.yml`：`master` 上有题源或站点改动时构建并部署；
`test.yml` 只在 PR 和非 master 分支做构建校验，不发布。两者都在仓库根目录
`npm ci` 后跑 `npm run typecheck` / `npm run site:build`。

GitHub 仓库需要在 Settings → Pages 里把 Source 设为 **GitHub Actions**（只需设一次）。
