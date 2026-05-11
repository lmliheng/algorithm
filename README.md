# 🧠 Algorithm Zoo

<p align="center">
  <img src="https://img.shields.io/badge/Languages-Java%20%7C%20JS%20%7C%20TS%20%7C%20C++-blue.svg" alt="Languages">
  <img src="https://img.shields.io/badge/LeetCode-100%2B%20Problems-green.svg" alt="LeetCode">
  <img src="https://img.shields.io/badge/Study-Friendly-ff69b4.svg" alt="Study">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
</p>

<p align="center">
  <b>📚 深入学习算法与数据结构 | 多语言实现 | 详细题解</b>
</p>

---

## ✨ 项目亮点

<table>
<tr>
<td>

### 🎯 三大语言实现
<ul>
<li>☕ <b>Java</b> - 面向对象设计，清晰的架构</li>
<li>⚡ <b>JavaScript / TypeScript</b> - 前端算法训练</li>
<li>⚙️ <b>C++</b> - 性能优先的底层实现</li>
</ul>

</td>
<td>

### 📖 完善的学习体系
<ul>
<li>✅ 详细的代码注释与分析</li>
<li>✅ 时间/空间复杂度分析</li>
<li>✅ 多种解法对比</li>
<li>✅ 优化思路详解</li>
</ul>

</td>
</tr>
</table>

---

## 📂 项目结构

```
algorithm 算法/
│
├── 📁 Java/                    # ☕ Java 算法实现
│   ├── 两数之和P1/              # P1 = LeetCode 题号
│   │   ├── src/main/Solution.java
│   │   └── src/test/Test.java
│   ├── 买卖股票的最佳时机/
│   ├── 爬楼梯P70/
│   ├── 二叉树/
│   ├── 接雨水/
│   └── ... (100+ 题目)
│
├── 📁 JS/                      # ⚡ JavaScript / TypeScript
│   ├── 1.js ~ 2770.js          # LeetCode 题目编号
│   ├── express/                # Express 框架学习
│   ├── node-ts/                # TypeScript 实践
│   ├── Object/                 # JS 对象底层原理
│   └── 堆.js / 归并排序.js      # 经典算法
│
├── 📁 cpp/                     # ⚙️ C++ 实现
│   └── test.cpp
│
├── 📁 基本算法/                 # 📚 基础算法学习
│   ├── 排序/
│   ├── 二叉树/
│   └── 进制转换/
│
├── 📁 scss/                    # 🎨 样式预处理器
└── 📁 githook/                 # 🔧 Git 钩子配置
```

---

## 🗂️ 题目分类速览

### 🔥 Hot 100 热门题目

| 题目 | 难度 | Java | JS/TS |
|------|------|------|-------|
| [两数之和](Java/两数之和P1/) | 🟢 简单 | ✅ | ✅ |
| [两数相加](Java/两数相加P2/) | 🟡 中等 | ✅ | ✅ |
| [无重复字符的最长子串](Java/无重复字符的最长子串P3/) | 🟡 中等 | ✅ | - |
| [寻找两个正序数组的中位数](Java/) | 🔴 困难 | ✅ | - |
| [盛最多水的容器](Java/盛最多水的容器/) | 🟡 中等 | ✅ | - |

### 📊 按算法分类

```
├─ 🟢 简单
│   ├─ 两数之和 P1
│   ├─ 回文数 P9
│   ├─ 罗马数字转整数
│   └─ 爬楼梯 P70
│
├─ 🟡 中等
│   ├─ 无重复字符的最长子串 P3
│   ├─ 盛最多水的容器
│   ├─ 接雨水
│   ├─ 最小路径和 P64
│   └─ 买卖股票的最佳时机 II
│
└─ 🔴 困难
    ├─ 到达终点
    ├─ 最小覆盖子串
    └─ 除自身以外数组的乘积
```

---

## 🚀 快速开始

### 1. 📥 Clone 项目

```bash
git clone https://github.com/your-username/algorithm.git
cd "algorithm 算法"
```

### 2. ☕ Java 环境

```bash
cd Java/两数之和P1
# 编译运行
javac -cp src src/main/Solution.java src/test/Test.java -d out
java -cp out Test
```

### 3. ⚡ JavaScript 环境

```bash
cd JS
node 1.js
```

### 4. 📝 TypeScript 环境

```bash
cd JS/node-ts
npx ts-node test_ts.ts
```

---

## 💡 代码示例

### Java - 两数之和

```java
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return new int[] {};
}
```

### JavaScript - 两数之和

```javascript
var twoSum = function (nums, target) {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            return [map.get(nums[i]), i];
        }
        map.set(target - nums[i], i);
    }
    return [];
}
```

---

## 📈 学习路线

```
第一阶段：入门基础
├─ 数组、字符串操作
├─ 简单排序算法
└─ 基础数据结构（栈、队列）

第二阶段：数据结构
├─ 链表操作
├─ 二叉树遍历
├─ 哈希表应用
└─ 堆与优先队列

第三阶段：算法思想
├─ 双指针技巧
├─ 滑动窗口
├─ 动态规划入门
├─ 回溯算法
└─ 分治策略

第四阶段：挑战困难
├─ 复杂动态规划
├─ 图论基础
├─ 位运算技巧
└─ 高级数据结构
```

---

## 🛠️ 工具与环境

<div>

| 工具 | 用途 |
|------|------|
| <img src="https://img.shields.io/badge/-Java-ED8B00?logo=java&logoColor=white" height="20"> | JDK 8+ |
| <img src="https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white" height="20"> | JavaScript 运行时 |
| <img src="https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white" height="20"> | TypeScript 6.0+ |
| <img src="https://img.shields.io/badge/-C++-00599C?logo=c%2B%2B&logoColor=white" height="20"> | GCC/MinGW |

</div>

---

## 📝 代码规范

```bash
✅ 使用有意义的变量命名
✅ 添加必要的注释说明
✅ 分析时间和空间复杂度
✅ 考虑边界情况
❌ 避免硬编码
❌ 不要重复代码
```

---

## 🤝 贡献指南

欢迎提交 Issue 和 PR！

1. 🍴 Fork 本仓库
2. 🔨 创建新分支 (`git checkout -b feature/AmazingFeature`)
3. 💻 编写你的算法实现
4. 📝 添加测试用例
5. 🚀 提交并 Push
6. 🎉 开启 Pull Request

---

## 📜 License

本项目基于 [MIT License](LICENSE) 开源。

---

<p align="center">
  <b>⭐ 如果对你有帮助，请给我一个 Star！</b>
</p>

<p align="center">
  制作于 2026 · 算法学习之路，永无止境
</p>
