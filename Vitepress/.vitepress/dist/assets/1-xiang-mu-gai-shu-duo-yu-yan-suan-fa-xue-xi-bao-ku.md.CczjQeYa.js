import{c as s,S as n,j as t,m as i}from"./chunks/framework.DvQr6YbT.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"1-xiang-mu-gai-shu-duo-yu-yan-suan-fa-xue-xi-bao-ku.md","filePath":"1-xiang-mu-gai-shu-duo-yu-yan-suan-fa-xue-xi-bao-ku.md"}'),p={name:"1-xiang-mu-gai-shu-duo-yu-yan-suan-fa-xue-xi-bao-ku.md"};function e(l,a,r,h,o,d){return n(),t("div",null,[...a[0]||(a[0]=[i(`<p>当你第一次打开这个仓库，可能会被满屏的数字编号文件和中文目录名搞得一头雾水——<code>1.js</code> 是什么？<code>P198</code> 又代表什么？别担心，这正是本文要帮你理清的。<strong>Algorithm Zoo</strong> 是一个以 LeetCode 题解为核心、横跨 Java / JavaScript / TypeScript / C++ 四种语言的学习型仓库，它不仅提供可运行的代码，还附有详细注释、复杂度分析和优化思路，是一份面向初学者的算法学习地图。</p><p>Sources: <a href="./README.html#l1-l8">README.md</a></p><h2 id="项目定位与核心价值" tabindex="-1">项目定位与核心价值 <a class="header-anchor" href="#项目定位与核心价值" aria-label="Permalink to “项目定位与核心价值”">​</a></h2><p>这个仓库的本质是一个<strong>个人算法训练笔记的系统化沉淀</strong>。它不是一本教科书，而是一个&quot;边做边学&quot;的实战记录——每一道题都保留了思考过程：从暴力解法到优化解法，从时间复杂度 O(n²) 到 O(n) 的演进路径。对于初学者而言，这种&quot;先有直觉、再求优化&quot;的学习路径比直接给出最优解更有教育意义。</p><p>仓库的三个核心特征：<strong>多语言对照</strong>（同一道题用 Java 和 JS 分别实现，便于对比语言特性）、<strong>结构化组织</strong>（Java 目录按题号+题目名归档，JS 目录按编号检索）、<strong>知识延伸</strong>（从 LeetCode 题解扩展到数值计算、MATLAB、前端框架等关联领域）。</p><p>Sources: <a href="./README.html#l16-l42">README.md</a></p><h2 id="整体架构总览" tabindex="-1">整体架构总览 <a class="header-anchor" href="#整体架构总览" aria-label="Permalink to “整体架构总览”">​</a></h2><p>在深入任何一行代码之前，先从宏观上理解这个仓库的架构。下图展示了项目的六大模块及其内在关联：</p><div class="language-mermaid"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">graph TB</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph 核心题解层</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        A[&quot;Java 题解&lt;br/&gt;43 个题目目录&lt;br/&gt;标准化 src/main + src/test 结构&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        B[&quot;JS/TS 题解&lt;br/&gt;90+ 编号文件&lt;br/&gt;详尽注释与复杂度分析&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        C[&quot;C++ 题解&lt;br/&gt;链表与指针实战&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph 算法基础层</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        D[&quot;基本算法&lt;br/&gt;进制转换 · BST判断&lt;br/&gt;排序 · Dijkstra&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph 知识扩展层</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        E[&quot;数值计算与 MATLAB&lt;br/&gt;线性方程组 · 范数 · 积分&lt;br/&gt;数据拟合 · 最速下降法&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        F[&quot;JS 语言特性&lt;br/&gt;Object 底层机制&lt;br/&gt;Express 框架 · SCSS&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph 工程化层</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        G[&quot;Git Hooks&lt;br/&gt;规范化提交信息&lt;br/&gt;Conventional Commits&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D --&gt; A</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    D --&gt; B</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A --&gt;|同题对照| B</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    B --&gt;|类型化| C</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A --&gt;|数据结构基础| E</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    B --&gt;|语言深度| F</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    A &amp; B &amp; C --&gt; G</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style A fill:#ED8B00,color:#fff</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style B fill:#F7DF1E,color:#333</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style C fill:#00599C,color:#fff</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style D fill:#4CAF50,color:#fff</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style E fill:#8B4513,color:#fff</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style F fill:#61DAFB,color:#333</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style G fill:#9C27B0,color:#fff</span></span></code></pre></div><p>架构分为四层：<strong>核心题解层</strong>是仓库的主体，包含 Java、JS/TS、C++ 三种语言的 LeetCode 实现；<strong>算法基础层</strong>提供独立于 LeetCode 的经典算法实现（如 Dijkstra 最短路径）；<strong>知识扩展层</strong>将算法思维延伸到数值计算和前端工程领域；<strong>工程化层</strong>则保障代码提交的规范性。</p><p>Sources: <a href="./README.html#l46-l78">README.md</a></p><h2 id="多语言覆盖对比" tabindex="-1">多语言覆盖对比 <a class="header-anchor" href="#多语言覆盖对比" aria-label="Permalink to “多语言覆盖对比”">​</a></h2><p>不同语言在这个仓库中承担着不同的学习角色。下表清晰地展示了各语言的定位差异：</p><table tabindex="0"><thead><tr><th>维度</th><th>☕ Java</th><th>⚡ JavaScript / TypeScript</th><th>⚙️ C++</th></tr></thead><tbody><tr><td><strong>文件组织</strong></td><td>每题独立目录，含 <code>src/main</code> + <code>src/test</code></td><td>按题号命名（如 <code>1.js</code>、<code>198.ts</code>）</td><td>单文件 <code>test.cpp</code></td></tr><tr><td><strong>题目数量</strong></td><td>43 个题目目录</td><td>90+ 个编号文件</td><td>1 个示例</td></tr><tr><td><strong>代码风格</strong></td><td>面向对象，规范的包声明和类结构</td><td>函数式为主，附详细注释块</td><td>指针操作，结构体定义</td></tr><tr><td><strong>注释深度</strong></td><td>README 含题目描述和链接</td><td>内嵌复杂度分析 + 优化思路</td><td>基础注释</td></tr><tr><td><strong>学习侧重</strong></td><td>架构规范、测试分离</td><td>算法思路演化、多解法对比</td><td>内存管理、指针实战</td></tr><tr><td><strong>典型示例</strong></td><td><a href="./Java/两数之和P1/src/main/Solution.java.html#l1-l20">Solution.java</a></td><td><a href="JS/1.js#L1-L56">1.js</a></td><td><a href="./cpp/test.cpp.html#l1-l60">test.cpp</a></td></tr></tbody></table><p><strong>关键洞察</strong>：Java 和 JS/TS 之间存在大量同题对照关系。例如 LeetCode 198（打家劫舍），Java 版采用标准 dp 数组写法 <code>dp[i] = Math.max(dp[i-2] + nums[i], dp[i-1])</code>，而 JS 版则用 <code>Math.max(...dp.slice(0, i-1)) + nums[i]</code> 的展开写法——两种实现思路的差异本身就是极佳的学习素材。<a href="./Java/打家劫舍P198/src/main/Solution.java.html#l4-l19">Java 版</a> | <a href="JS/198.js#L1-L11">JS 版</a></p><p>Sources: <a href="./README.html#l82-l114">README.md</a></p><h2 id="可视化目录结构" tabindex="-1">可视化目录结构 <a class="header-anchor" href="#可视化目录结构" aria-label="Permalink to “可视化目录结构”">​</a></h2><p>以下是仓库的精简目录树，帮助你快速定位感兴趣的内容：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>algorithm/</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── Java/                          # ☕ Java 题解（43 个题目）</span></span>
<span class="line"><span>│   ├── 两数之和P1/                 # P 后数字 = LeetCode 题号</span></span>
<span class="line"><span>│   │   ├── README.md              #   题目描述与链接</span></span>
<span class="line"><span>│   │   └── src/</span></span>
<span class="line"><span>│   │       ├── main/Solution.java #   核心解法</span></span>
<span class="line"><span>│   │       └── test/Test.java     #   测试用例</span></span>
<span class="line"><span>│   ├── 爬楼梯P70/</span></span>
<span class="line"><span>│   ├── 打家劫舍P198/</span></span>
<span class="line"><span>│   ├── 接雨水/</span></span>
<span class="line"><span>│   ├── 二叉树/                    #   独立数据结构专题</span></span>
<span class="line"><span>│   └── ...（共 43 个目录）</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── JS/                            # ⚡ JavaScript / TypeScript 题解</span></span>
<span class="line"><span>│   ├── 1.js                       # LeetCode 1: 两数之和</span></span>
<span class="line"><span>│   ├── 198.js / 198.ts            # 同一题的 JS 与 TS 版本对照</span></span>
<span class="line"><span>│   ├── 堆.js                      # 经典算法：最小堆与最大堆</span></span>
<span class="line"><span>│   ├── 归并排序.js                 # 经典算法：归并排序</span></span>
<span class="line"><span>│   ├── 排列组合模拟.js             # 经典算法：回溯全排列</span></span>
<span class="line"><span>│   ├── Object/                    # JS 对象底层机制探索</span></span>
<span class="line"><span>│   ├── express/                   # Express 框架实践</span></span>
<span class="line"><span>│   ├── node-ts/                   # TypeScript 编译配置</span></span>
<span class="line"><span>│   └── tsconfig.json              # TS 编译选项</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── cpp/                           # ⚙️ C++ 实现</span></span>
<span class="line"><span>│   └── test.cpp                   # 合并两个有序链表</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── 基本算法/                       # 📚 基础算法专题</span></span>
<span class="line"><span>│   ├── 二进制转十进制/</span></span>
<span class="line"><span>│   ├── 十进制转二进制/</span></span>
<span class="line"><span>│   ├── 平衡二叉树判断/</span></span>
<span class="line"><span>│   ├── 排序/</span></span>
<span class="line"><span>│   └── 迪杰拉特斯/                # Dijkstra 最短路径</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── math/                          # 🔬 数值计算理论</span></span>
<span class="line"><span>│   ├── 解线性方程组/               # LU分解 · 雅可比迭代 · 高斯消元</span></span>
<span class="line"><span>│   ├── 向量和矩阵范数/</span></span>
<span class="line"><span>│   ├── 数值积分/</span></span>
<span class="line"><span>│   ├── 数据拟合/</span></span>
<span class="line"><span>│   └── 最速下降法/</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── matlab/                        # 📊 MATLAB 实现</span></span>
<span class="line"><span>│   ├── matlab_learn/              #   系统学习模块</span></span>
<span class="line"><span>│   ├── 雅可比迭代/                #   数值方法实现</span></span>
<span class="line"><span>│   └── 线性方程组精确解/</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── scss/                          # 🎨 SCSS 预处理器</span></span>
<span class="line"><span>├── githook/                       # 🔧 Git 提交规范钩子</span></span>
<span class="line"><span>├── LICENSE                        # MIT 开源协议</span></span>
<span class="line"><span>└── README.md                      # 项目说明文档</span></span></code></pre></div><p>Sources: <a href="./README.html#l46-l78">README.md</a></p><h2 id="题解代码的两种风格" tabindex="-1">题解代码的两种风格 <a class="header-anchor" href="#题解代码的两种风格" aria-label="Permalink to “题解代码的两种风格”">​</a></h2><p>这个仓库最独特的学习价值在于，同一种算法思想在不同语言中的表达方式截然不同。以两道经典题目为例：</p><p><strong>LeetCode 1 · 两数之和</strong>：Java 版使用双层循环的暴力解法，代码结构工整但时间复杂度 O(n²)；JS 版则在注释中保留了原始暴力思路，同时给出了 HashMap 优化解法，将复杂度降至 O(n)。这种&quot;先有直觉，再求优化&quot;的呈现方式，正是初学者最需要的学习路径。<a href="./Java/两数之和P1/src/main/Solution.java.html#l4-l19">Java 版</a> | <a href="JS/1.js#L1-L56">JS 版</a></p><p><strong>LeetCode 42 · 接雨水</strong>：JS 版采用&quot;找最高点、左右分别扫描&quot;的策略，先定位最高柱的索引，再分别从左右两端向最高点遍历，累加可接雨水量。这种解法思路直观，适合初学者理解接雨水问题的核心——<strong>每个位置能接的雨水量取决于其左右两侧最高柱的较小值</strong>。<a href="JS/42.js#L5-L24">JS 版</a></p><p><strong>经典算法 · 堆</strong>：JS 版独立实现了最小堆和最大堆的完整类，包含 <code>insert</code>、<code>up</code>（上浮）、<code>down</code>（下沉）、<code>pop</code>、<code>peek</code> 五个核心操作。代码中 <code>(index - 1) &gt;&gt; 1</code> 这种位运算求父节点的方式，比 <code>Math.floor((index-1)/2)</code> 更高效，是值得留意的小技巧。<a href="JS/%E5%A0%86.js#L1-L153">堆.js</a></p><p>Sources: <a href="JS/1.js#L1-L56">1.js</a></p><h2 id="学习路线建议" tabindex="-1">学习路线建议 <a class="header-anchor" href="#学习路线建议" aria-label="Permalink to “学习路线建议”">​</a></h2><p>仓库的 README 提供了四阶段学习路线，从入门基础到高级挑战层层递进。结合本 Wiki 的目录结构，推荐以下阅读顺序：</p><table tabindex="0"><thead><tr><th>阶段</th><th>学习重点</th><th>推荐阅读</th></tr></thead><tbody><tr><td><strong>入门</strong></td><td>项目全貌、环境搭建、目录约定</td><td><a href="./1-xiang-mu-gai-shu-duo-yu-yan-suan-fa-xue-xi-bao-ku.html">项目概述</a> → <a href="./2-kuai-su-kai-shi-huan-jing-da-jian-yu-yun-xing.html">快速开始</a> → <a href="./3-cang-ku-jia-gou-yu-mu-lu-yue-ding.html">仓库架构</a></td></tr><tr><td><strong>基础</strong></td><td>数组、字符串、简单排序</td><td><a href="./6-javascript-typescript-ti-jie-bian-hao-jian-suo-yu-duo-chong-jie-fa-dui-bi.html">JS/TS 题解检索</a> → <a href="./9-shuang-zhi-zhen-yu-hua-dong-chuang-kou-zi-fu-chuan-yu-shu-zu-wen-ti.html">双指针与滑动窗口</a></td></tr><tr><td><strong>进阶</strong></td><td>动态规划、贪心、回溯</td><td><a href="./8-dong-tai-gui-hua-ru-men-cong-fei-bo-na-qi-dao-da-jia-jie-she.html">动态规划入门</a> → <a href="./10-tan-xin-ce-lue-jia-you-zhan-wen-ti-yu-tiao-yue-you-xi.html">贪心策略</a> → <a href="./11-hui-su-fa-pai-lie-zu-he-yu-gua-hao-sheng-cheng.html">回溯法</a></td></tr><tr><td><strong>深入</strong></td><td>数据结构、数值计算</td><td><a href="./13-er-cha-shu-bian-li-cha-ru-yu-ping-heng-xing-pan-duan.html">二叉树</a> → <a href="./14-dui-zui-xiao-dui-yu-zui-da-dui-de-wan-zheng-shi-xian.html">堆</a> → <a href="./22-xian-xing-fang-cheng-zu-qiu-jie-gao-si-xiao-yuan-lu-fen-jie-yu-ya-ke-bi-die-dai.html">线性方程组求解</a></td></tr></tbody></table><p>Sources: <a href="./README.html#l187-l213">README.md</a></p><h2 id="仓库元信息速查" tabindex="-1">仓库元信息速查 <a class="header-anchor" href="#仓库元信息速查" aria-label="Permalink to “仓库元信息速查”">​</a></h2><table tabindex="0"><thead><tr><th>项目属性</th><th>详情</th></tr></thead><tbody><tr><td><strong>项目名称</strong></td><td>Algorithm Zoo</td></tr><tr><td><strong>开源协议</strong></td><td>MIT License（Copyright 2024 liheng）</td></tr><tr><td><strong>语言覆盖</strong></td><td>Java · JavaScript · TypeScript · C++ · MATLAB · SCSS</td></tr><tr><td><strong>题解规模</strong></td><td>Java 43 题 · JS/TS 90+ 文件 · C++ 1 题</td></tr><tr><td><strong>Node 依赖</strong></td><td>TypeScript ^6.0.3</td></tr><tr><td><strong>TS 编译目标</strong></td><td>ES2015，CommonJS 模块，严格模式</td></tr><tr><td><strong>Git 提交规范</strong></td><td>Conventional Commits（feat/fix/docs/style/refactor/test/chore）</td></tr></tbody></table><p>Sources: <a href="./LICENSE.html#l1-l5">LICENSE</a> | <a href="JS/package.json#L1-L5">package.json</a> | <a href="JS/tsconfig.json#L1-L11">tsconfig.json</a> | <a href="./githook/commit-msg.html#l1-l13">commit-msg</a></p><h2 id="下一步" tabindex="-1">下一步 <a class="header-anchor" href="#下一步" aria-label="Permalink to “下一步”">​</a></h2><p>你已经了解了项目的全貌——它是一个从 LeetCode 题解出发、延伸至数值计算和前端工程的多语言学习宝库。接下来，建议按照以下顺序深入探索：</p><ol><li><strong><a href="./2-kuai-su-kai-shi-huan-jing-da-jian-yu-yun-xing.html">快速开始：环境搭建与运行</a></strong> —— 在本地把代码跑起来，这是所有学习的第一步</li><li><strong><a href="./3-cang-ku-jia-gou-yu-mu-lu-yue-ding.html">仓库架构与目录约定</a></strong> —— 理解文件命名规则和目录组织逻辑，让后续导航更高效</li><li><strong><a href="./5-java-ti-jie-ti-xi-xiang-mu-jie-gou-yu-jie-ti-mo-ban.html">Java 题解体系</a></strong> —— 从最规范的 Java 解法模板开始，建立算法思维的基本框架</li></ol><p>算法学习之路，始于足下。</p>`,37)])])}const E=s(p,[["render",e]]);export{g as __pageData,E as default};
