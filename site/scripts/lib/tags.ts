/**
 * 受控标签词表。
 *
 * 站点筛选器和题解标注共用这一份：题解里只能写词表里的标签，
 * 写别名（如 backtrace / 动态规划）会被自动归一，写词表外的会被收集成
 * "未识别标签"在 npm run scan 报告里列出来，方便补充词表。
 */

export const TAG_GROUPS: Record<string, readonly string[]> = {
  算法思想: [
    'dp',
    '贪心',
    '回溯',
    '递归',
    '分治',
    '二分',
    '双指针',
    '滑动窗口',
    '前缀和',
    '差分',
    '位运算',
    '数学',
    '模拟',
    '排序',
    'BFS',
    'DFS',
    '拓扑排序',
    '状态压缩',
  ],
  数据结构: [
    '数组',
    '字符串',
    '哈希表',
    '链表',
    '栈',
    '单调栈',
    '队列',
    '堆',
    '树',
    '二叉搜索树',
    '图',
    '并查集',
    '字典树',
    '矩阵',
  ],
  题型: ['子数组', '子序列', '区间', '组合', '排列', '括号', '设计', '计数', '原地算法', '博弈'],
}

export const ALL_TAGS: readonly string[] = Object.values(TAG_GROUPS).flat()

const TAG_SET = new Set(ALL_TAGS)

/** 标签 → 组名，用于分组展示。 */
export const TAG_GROUP_OF: Record<string, string> = Object.fromEntries(
  Object.entries(TAG_GROUPS).flatMap(([group, tags]) => tags.map((tag) => [tag, group])),
)

/** 别名 → 词表标签。键都是小写、去分隔符的写法。 */
const TAG_ALIASES: Record<string, string> = {
  // 算法思想
  dp: 'dp',
  dynamicprogramming: 'dp',
  dynamicprograming: 'dp',
  dp解法: 'dp',
  动态规划: 'dp',
  greedy: '贪心',
  贪心算法: '贪心',
  贪心策略: '贪心',
  backtracking: '回溯',
  backtrace: '回溯',
  backtrack: '回溯',
  '回溯法': '回溯',
  回溯算法: '回溯',
  recursion: '递归',
  递归法: '递归',
  divideandconquer: '分治',
  divide: '分治',
  分治法: '分治',
  binarysearch: '二分',
  二分查找: '二分',
  二分法: '二分',
  二分答案: '二分',
  twopointers: '双指针',
  双指针法: '双指针',
  快慢指针: '双指针',
  左右指针: '双指针',
  slidingwindow: '滑动窗口',
  滑动窗口法: '滑动窗口',
  prefixsum: '前缀和',
  前缀和数组: '前缀和',
  differencearray: '差分',
  差分数组: '差分',
  bit: '位运算',
  bitmanipulation: '位运算',
  位操作: '位运算',
  二进制位: '位运算',
  math: '数学',
  数学题: '数学',
  数论: '数学',
  simulation: '模拟',
  模拟题: '模拟',
  sort: '排序',
  sorting: '排序',
  排序算法: '排序',
  bfs: 'BFS',
  广度优先: 'BFS',
  广度优先搜索: 'BFS',
  层次遍历: 'BFS',
  层序遍历: 'BFS',
  dfs: 'DFS',
  深度优先: 'DFS',
  深度优先搜索: 'DFS',
  先序遍历: 'DFS',
  中序遍历: 'DFS',
  后序遍历: 'DFS',
  拓扑: '拓扑排序',
  topologicalsort: '拓扑排序',
  状压: '状态压缩',
  状压dp: '状态压缩',
  bitmask: '状态压缩',

  // 数据结构
  hash: '哈希表',
  hashmap: '哈希表',
  hashtable: '哈希表',
  哈希: '哈希表',
  散列表: '哈希表',
  映射: '哈希表',
  list: '链表',
  linkedlist: '链表',
  单链表: '链表',
  双向链表: '链表',
  stack: '栈',
  monotonicstack: '单调栈',
  queue: '队列',
  单调队列: '队列',
  双端队列: '队列',
  heap: '堆',
  priorityqueue: '堆',
  优先队列: '堆',
  最小堆: '堆',
  最大堆: '堆',
  大顶堆: '堆',
  小顶堆: '堆',
  tree: '树',
  二叉树: '树',
  树结构: '树',
  bst: '二叉搜索树',
  二叉查找树: '二叉搜索树',
  排序二叉树: '二叉搜索树',
  graph: '图',
  图的遍历: '图',
  图论: '图',
  unionfind: '并查集',
  disjointset: '并查集',
  trie: '字典树',
  前缀树: '字典树',
  matrix: '矩阵',
  二维数组: '矩阵',
  二维矩阵: '矩阵',
  array: '数组',
  string: '字符串',

  // 题型
  subarray: '子数组',
  连续子数组: '子数组',
  subsequence: '子序列',
  interval: '区间',
  区间合并: '区间',
  合并区间: '区间',
  combination: '组合',
  组合总和: '组合',
  组合数: '组合',
  permutation: '排列',
  全排列: '排列',
  parentheses: '括号',
  括号生成: '括号',
  有效括号: '括号',
  design: '设计',
  设计题: '设计',
  数据结构设计: '设计',
  counting: '计数',
  inplace: '原地算法',
  原地: '原地算法',
  game: '博弈',
  gametheory: '博弈',
  博弈论: '博弈',
  游戏: '博弈',
}

/** 去掉大小写和分隔符，便于别名命中。 */
function fold(raw: string): string {
  return raw.trim().toLowerCase().replace(/[\s_\-·、,，]/g, '')
}

/** 归一化单个标签；不在词表内返回 null。 */
export function normalizeTag(raw: string): string | null {
  const folded = fold(raw)
  if (!folded) return null
  if (TAG_SET.has(folded)) return folded
  const aliased = TAG_ALIASES[folded]
  if (aliased) return aliased
  for (const tag of ALL_TAGS) {
    if (fold(tag) === folded) return tag
  }
  return null
}

/** 归一化一组标签，返回词表内标签与未识别的原始写法。 */
export function normalizeTags(raw: string | readonly string[]): { tags: string[]; unknown: string[] } {
  // 两种入参都要能拆：整串 "dp,字符串"，或已经切开、但每项仍可能带分隔符的数组
  const source = typeof raw === 'string' ? [raw] : raw
  const parts = source.flatMap((item) => item.split(/[,，、;；/\s]+/))
  const tags: string[] = []
  const unknown: string[] = []
  for (const part of parts) {
    if (!part.trim()) continue
    const tag = normalizeTag(part)
    if (tag) {
      if (!tags.includes(tag)) tags.push(tag)
    } else if (!unknown.includes(part.trim())) {
      unknown.push(part.trim())
    }
  }
  return { tags, unknown }
}
