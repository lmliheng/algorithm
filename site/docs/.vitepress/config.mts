import { defineConfig } from 'vitepress'

/**
 * 中文检索分词。
 *
 * VitePress 默认按空白/连字符切词，中文标题会整句变成一个 token，
 * 搜「两数之和」以外的子串（比如「两数」）就命中不了。这里把 CJK 段落
 * 拆成单字 + 相邻二元组，英文仍按词切，站内搜索才真的能用。
 */
const CJK = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/

function tokenize(text: string): string[] {
  const tokens: string[] = []
  for (const segment of text.split(/[^\p{Letter}\p{Number}]+/u)) {
    if (!segment) continue
    if (CJK.test(segment)) {
      for (const char of segment) tokens.push(char)
      for (let i = 0; i + 1 < segment.length; i += 1) tokens.push(segment.slice(i, i + 2))
    } else {
      tokens.push(segment.toLowerCase())
    }
  }
  return tokens
}

/** 站点挂在 https://lmliheng.github.io/algorithm/ 下 */
const BASE = '/algorithm/'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Algorithm',
  description: '多语言算法题解 · 按题号、标签、语言、来源、难度、复杂度检索',

  base: BASE,
  ignoreDeadLinks: true,
  lastUpdated: false,

  head: [
    ['meta', { name: 'theme-color', content: '#3451b2' }],
    // 图标：SVG 给现代浏览器，ico 兜底老浏览器，apple-touch-icon 管 iOS 加到主屏。
    // head 里的链接不会自动带上 base，得自己拼。
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${BASE}favicon.svg` }],
    ['link', { rel: 'icon', sizes: '16x16 32x32 48x48', href: `${BASE}favicon.ico` }],
    ['link', { rel: 'apple-touch-icon', href: `${BASE}apple-touch-icon.png` }],
    ['link', { rel: 'manifest', href: `${BASE}site.webmanifest` }],
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '题解索引', link: '/problems/index' },
      { text: '站点说明', link: '/guide/' },
    ],

    sidebar: [
      {
        text: '题解',
        items: [
          { text: '检索全部题解', link: '/' },
          { text: '纯文本索引', link: '/problems/index' },
        ],
      },
      {
        text: '关于本站',
        items: [{ text: '站点说明', link: '/guide/' }],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/lmliheng/algorithm' }],

    outline: { level: [2, 3], label: '本页解法' },

    docFooter: { prev: '上一篇', next: '下一篇' },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索题解', buttonAriaLabel: '搜索题解' },
          modal: {
            noResultsText: '没有找到匹配的题解',
            resetButtonTitle: '清除筛选条件',
            displayDetails: '展开详情',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
        miniSearch: {
          options: { tokenize },
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 2, titles: 3 },
          },
        },
      },
    },
  },
})
