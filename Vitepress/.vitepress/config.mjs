import { defineConfig } from 'vitepress'

export default defineConfig({
  srcDir: "post",

  title: "Algorithm Zoo",
  description: "多语言算法学习宝库 - Java / JavaScript / TypeScript / C++",
  lang: "zh-CN",

  base: '/algorithm/',

  ignoreDeadLinks: true,

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '项目概述', link: '/1-xiang-mu-gai-shu-duo-yu-yan-suan-fa-xue-xi-bao-ku' },
      { text: '快速开始', link: '/2-kuai-su-kai-shi-huan-jing-da-jian-yu-yun-xing' },
      { text: '代码展示', link: '/code-solutions/index' },
      { text: '算法专题', link: '/8-dong-tai-gui-hua-ru-men-cong-fei-bo-na-qi-dao-da-jia-jie-she' }
    ],

    sidebar: [
      {
        text: '入门指南',
        items: [
          { text: '项目概述', link: '/1-xiang-mu-gai-shu-duo-yu-yan-suan-fa-xue-xi-bao-ku' },
          { text: '环境搭建', link: '/2-kuai-su-kai-shi-huan-jing-da-jian-yu-yun-xing' },
          { text: '仓库架构', link: '/3-cang-ku-jia-gou-yu-mu-lu-yue-ding' },
          { text: '代码规范', link: '/4-dai-ma-gui-fan-yu-gong-xian-li-cheng' }
        ]
      },
      {
        text: '题解体系',
        items: [
          { text: 'Java 题解', link: '/5-java-ti-jie-ti-xi-xiang-mu-jie-gou-yu-jie-ti-mo-ban' },
          { text: 'JS/TS 题解', link: '/6-javascript-typescript-ti-jie-bian-hao-jian-suo-yu-duo-chong-jie-fa-dui-bi' },
          { text: 'C++ 题解', link: '/7-c-ti-jie-lian-biao-yu-zhi-zhen-shi-zhan' }
        ]
      },
      {
        text: '算法专题',
        items: [
          { text: '动态规划', link: '/8-dong-tai-gui-hua-ru-men-cong-fei-bo-na-qi-dao-da-jia-jie-she' },
          { text: '贪心策略', link: '/10-tan-xin-ce-lue-jia-you-zhan-wen-ti-yu-tiao-yue-you-xi' },
          { text: '回溯与递归', link: '/11-hui-su-fa-pai-lie-zu-he-yu-gua-hao-sheng-cheng' },
          { text: '图论与最短路径', link: '/12-tu-lun-ji-chu-dijkstra-zui-duan-lu-jing-suan-fa' },
          { text: '二叉树遍历', link: '/13-er-cha-shu-bian-li-cha-ru-yu-ping-heng-xing-pan-duan' },
          { text: '堆与优先队列', link: '/14-dui-zui-xiao-dui-yu-zui-da-dui-de-wan-zheng-shi-xian' },
          { text: '链表操作', link: '/15-lian-biao-cao-zuo-he-bing-fan-zhuan-yu-huan-jian-ce' },
          { text: '排序算法', link: '/16-gui-bing-pai-xu-fen-zhi-si-xiang-de-jing-dian-ti-xian' },
          { text: '双指针与滑动窗口', link: '/9-shuang-zhi-zhen-yu-hua-dong-chuang-kou-zi-fu-chuan-yu-shu-zu-wen-ti' }
        ]
      },
      {
        text: '代码展示',
        items: [
          { text: '题解索引', link: '/code-solutions/index' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lmliheng/algorithm' }
    ],

    search: {
      provider: 'local'
    }
  }
})
