/**
 * 文件名 → { 题号, 标题, 解法 }。
 *
 * 文件名是题号和标题的唯一权威来源，支持的写法：
 *   115. 不同的子序列.ts            → 115 / 不同的子序列
 *   115. 不同的子序列（解法二）.ts   → 115 / 不同的子序列 / 解法二
 *   114. 二叉树展开为链表解法二.ts   → 114 / 二叉树展开为链表 / 解法二   （无括号也认）
 *   50. Pow(x, n).ts               → 50 / Pow(x, n)
 *   跳跃游戏/3.js                   → 标题取父目录 + 序号 → 跳跃游戏3
 *   python/hot100/1.py             → 1 / 标题待注释补充
 *   接雨水2.py                      → 无题号，标题即文件名
 */

import type { NameParts } from './types.ts'

/** 标题末尾的解法后缀：解法二 / （解法2） / 方法三 等。 */
const VARIANT_SUFFIX = /[\s(（]*\s*(?:解法|方法|方案|思路)\s*([0-9一二三四五六七八九十]+)\s*[)）]?\s*$/

/** 题号前缀：`115.` / `115、` / `115_` / `115 `。 */
const ID_PREFIX = /^(\d{1,5})\s*[.、_\-—:\s]\s*/

/** 纯数字文件名，如 `3.js`。 */
const BARE_NUMBER = /^\d{1,5}$/

/** 这些目录名只是分类，不能当题目标题用。 */
const GENERIC_DIRS = new Set([
  'leetcode',
  'hot100',
  'python',
  'ts',
  'js',
  'src',
  'main',
  'java',
  'algorithm',
  'com',
  'sql',
  'base',
  '周赛',
  'ACM模式',
])

const CN_DIGITS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']

/** Arabic 数字转中文数字（只处理 1–99，够用法解序号）。 */
export function toChineseNumber(raw: string): string {
  if (!/^\d+$/.test(raw)) return raw
  const n = Number(raw)
  if (n < 0 || n > 99) return raw
  if (n < 10) return CN_DIGITS[n] as string
  const tens = Math.floor(n / 10)
  const ones = n % 10
  const tensPart = tens === 1 ? '十' : `${CN_DIGITS[tens]}十`
  return ones === 0 ? tensPart : `${tensPart}${CN_DIGITS[ones]}`
}

/** 从标题尾部剥离解法后缀，返回 [标题, 解法]。 */
export function stripVariant(raw: string): [string, string | null] {
  const match = raw.match(VARIANT_SUFFIX)
  if (!match) return [raw.trim(), null]
  const title = raw.slice(0, match.index).trim()
  if (!title) return [raw.trim(), null]
  return [title, `解法${toChineseNumber((match[1] as string).trim())}`]
}

/** 解析单个文件名。parentDir 用于 `跳跃游戏/3.js` 这类写法。 */
export function parseFileName(base: string, parentDir: string | null): NameParts {
  let name = base.trim()

  const [withoutVariant, variantFromName] = stripVariant(name)
  name = withoutVariant
  let variant = variantFromName

  const idMatch = name.match(ID_PREFIX)
  let id: number | null = null
  let title: string | null = null

  if (idMatch) {
    id = Number(idMatch[1])
    const rest = name.slice(idMatch[0].length).trim()
    title = rest || null
    if (!title && parentDir && !GENERIC_DIRS.has(parentDir)) {
      // 例如 `跳跃游戏/1.js`：文件名带序号但没标题，用父目录当标题。
      title = `${parentDir}${id}`
      id = null
      variant = null
    }
  } else if (BARE_NUMBER.test(name)) {
    if (parentDir && !GENERIC_DIRS.has(parentDir)) {
      title = `${parentDir}${name}`
    } else {
      id = Number(name)
    }
  } else {
    title = name
  }

  if (title) {
    const [cleanTitle, extraVariant] = stripVariant(title)
    title = cleanTitle
    if (!variant && extraVariant) variant = extraVariant
  }

  return { id, title: title || null, variant }
}

/** 标题 → URL slug：保留中英文数字，其余折成连字符。 */
export function slugify(raw: string): string {
  const slug = raw
    .trim()
    .toLowerCase()
    .replace(/[^\p{Script=Han}\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
  return slug || 'item'
}
