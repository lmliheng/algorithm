/**
 * 从代码注释里读出题解元数据。
 *
 * 新写法（推荐，各语言一致）：
 *   @lc 115
 *   @title 不同的子序列
 *   @source leetcode
 *   @difficulty hard
 *   @tags dp,字符串
 *   @time O(n*m)
 *   @space O(m)
 *   @version 一维滚动数组
 *   @note 相比解法二把空间降到 O(m)
 *
 * 旧写法也认，不必回头改老文件：
 *   @两数之和                       → 标题
 *   @1.两数之和 / @115. 不同的子序列  → 题号 + 标题
 *   lc 1                            → 题号
 *   时间复杂度O(n),空间复杂度O(1)     → 复杂度
 *   困难 / dp解法 - 困难              → 难度
 *   Python 文档字符串首行、SQL `-- 175. 组合两个表` → 标题
 */

import { normalizeTags } from './tags.ts'
import type { Lang, RawMeta } from './types.ts'

const KEY_ALIASES: Record<string, string> = {
  lc: 'lc',
  id: 'lc',
  num: 'lc',
  no: 'lc',
  title: 'title',
  name: 'title',
  source: 'source',
  from: 'source',
  difficulty: 'difficulty',
  diff: 'difficulty',
  level: 'difficulty',
  tags: 'tags',
  tag: 'tags',
  time: 'time',
  timecomplexity: 'time',
  space: 'space',
  spacecomplexity: 'space',
  version: 'version',
  ver: 'version',
  note: 'note',
  notes: 'note',
  desc: 'note',
  description: 'note',
  author: 'author',
  url: 'url',
  link: 'url',
  href: 'url',
}

const DIFFICULTY_ONLY = /^(简单|中等|困难|easy|medium|hard)[\s。.]*$/i

const TIME_RE = /(?:时间复杂度|time\s*complexity)\s*[:：=]?\s*(O\s*\([^)]*\))/
const SPACE_RE = /(?:空间复杂度|space\s*complexity)\s*[:：=]?\s*(O\s*\([^)]*\))/

function emptyMeta(): RawMeta {
  return {
    lc: null,
    lcExplicit: false,
    title: null,
    source: null,
    difficulty: null,
    tags: [],
    unknownTags: [],
    time: null,
    space: null,
    version: null,
    note: null,
    author: null,
    url: null,
  }
}

/** 取出文件开头那段注释的原文；没有则返回 null。 */
export function extractLeadingComment(source: string, lang: Lang): string | null {
  const lines = source.split(/\r?\n/)
  let index = 0

  // Java 的 package / import 排在注释之前，先跳过
  while (index < lines.length) {
    const line = (lines[index] as string).trim()
    if (!line || /^(package|import|using|#include)\b/.test(line)) {
      index++
      continue
    }
    break
  }

  const first = (lines[index] ?? '').trim()

  if (lang === 'python') {
    const match = first.match(/^[rRuUbBfF]{0,3}("""|''')/)
    if (!match) return null
    const quote = match[1] as string
    const rest = first.slice(match[0].length)
    const inlineEnd = rest.indexOf(quote)
    if (inlineEnd >= 0) return rest.slice(0, inlineEnd)
    const collected: string[] = [rest]
    for (let i = index + 1; i < lines.length; i++) {
      const line = lines[i] as string
      const end = line.indexOf(quote)
      if (end >= 0) {
        collected.push(line.slice(0, end))
        break
      }
      collected.push(line)
    }
    return collected.join('\n')
  }

  if (first.startsWith('/*')) {
    const collected: string[] = [first]
    if (first.includes('*/')) return collected.join('\n')
    for (let i = index + 1; i < lines.length; i++) {
      const line = lines[i] as string
      collected.push(line)
      if (line.includes('*/')) break
    }
    return collected.join('\n')
  }

  if (first.startsWith('--')) {
    const collected: string[] = []
    for (let i = index; i < lines.length; i++) {
      const line = (lines[i] as string).trim()
      if (!line.startsWith('--')) break
      collected.push(line)
    }
    return collected.join('\n')
  }

  if (first.startsWith('//')) {
    const collected: string[] = []
    for (let i = index; i < lines.length; i++) {
      const line = (lines[i] as string).trim()
      if (!line.startsWith('//')) break
      collected.push(line)
    }
    return collected.join('\n')
  }

  return null
}

/** 剥掉注释符号，得到干净的正文行。 */
function cleanLines(block: string): string[] {
  return block
    .split(/\r?\n/)
    .map((line) =>
      line
        .replace(/^\s*\/\*\*?/, '')
        .replace(/\*\/\s*$/, '')
        .replace(/^\s*(\*|\/\/|--|"""|''')\s?/, '')
        .trim(),
    )
    .filter((line) => line.length > 0)
}

function applyKey(meta: RawMeta, key: string, value: string): void {
  switch (key) {
    case 'title':
      meta.title = value
      break
    case 'source':
      meta.source = value
      break
    case 'difficulty':
      meta.difficulty = value
      break
    case 'time':
      meta.time = value
      break
    case 'space':
      meta.space = value
      break
    case 'version':
      meta.version = value
      break
    case 'note':
      meta.note = value
      break
    case 'author':
      meta.author = value
      break
    case 'url':
      meta.url = value
      break
    default:
      break
  }
}

/** 解析一个注释块。 */
export function parseMetaBlock(block: string | null): RawMeta {
  const meta = emptyMeta()
  if (!block) return meta

  const lines = cleanLines(block)
  const rawTags: string[] = []
  let freeLine: string | null = null

  for (const line of lines) {
    const atMatch = line.match(/^@\s*(.+)$/)

    if (atMatch) {
      const payload = (atMatch[1] as string).trim()

      // 老写法：`@115. 不同的子序列` / `@1.两数之和`
      const numbered = payload.match(/^(\d{1,5})\s*[.、]\s*(.*)$/)
      if (numbered) {
        meta.lc = Number(numbered[1])
        meta.lcExplicit = true
        const tail = (numbered[2] as string).trim()
        if (tail && !meta.title) meta.title = tail
        continue
      }

      // 关键字写法：`@tags dp,字符串`
      const kv = payload.match(/^([A-Za-z][\w-]*)\s*[:：]?\s*(.*)$/)
      if (kv) {
        const key = KEY_ALIASES[(kv[1] as string).toLowerCase().replace(/[\s_-]/g, '')]
        const value = (kv[2] as string).trim()
        if (key === 'tags') {
          rawTags.push(value)
          continue
        }
        if (key === 'lc') {
          const num = value.match(/\d{1,5}/)
          if (num) {
            meta.lc = Number(num[0])
            meta.lcExplicit = true
          }
          continue
        }
        if (key && value) {
          applyKey(meta, key, value)
          continue
        }
      }

      // 纯粹的 `@两数之和`
      if (!meta.title && payload) meta.title = payload
      continue
    }

    const lcOnly = line.match(/^lc\s*[:：#]?\s*(\d{1,5})$/i)
    if (lcOnly) {
      meta.lc = Number(lcOnly[1])
      meta.lcExplicit = true
      continue
    }

    const timeMatch = line.match(TIME_RE)
    if (timeMatch && !meta.time) meta.time = (timeMatch[1] as string).replace(/\s+/g, '')
    const spaceMatch = line.match(SPACE_RE)
    if (spaceMatch && !meta.space) meta.space = (spaceMatch[1] as string).replace(/\s+/g, '')

    if (!meta.difficulty) {
      const diffMatch = line.match(/(简单|中等|困难)/) ?? line.match(/\b(easy|medium|hard)\b/i)
      if (diffMatch) meta.difficulty = diffMatch[1] as string
    }

    if (!freeLine) freeLine = line
  }

  // 自由行兜底：Python 文档字符串首行、SQL `175. 组合两个表`
  if (freeLine && !DIFFICULTY_ONLY.test(freeLine) && !/^(时间|空间)/.test(freeLine)) {
    const numbered = freeLine.match(/^(\d{1,5})\s*[.、]\s*(.+)$/)
    if (numbered) {
      if (meta.lc === null) meta.lc = Number(numbered[1])
      if (!meta.title) meta.title = (numbered[2] as string).trim()
    } else if (!meta.title && freeLine.length <= 60) {
      meta.title = freeLine
    }
  }

  const joined = lines.join('\n')
  if (!meta.time) {
    const match = joined.match(/时间\s*[:：]?\s*(O\s*\([^)]*\))/)
    if (match) meta.time = (match[1] as string).replace(/\s+/g, '')
  }
  if (!meta.space) {
    const match = joined.match(/空间\s*[:：]?\s*(O\s*\([^)]*\))/)
    if (match) meta.space = (match[1] as string).replace(/\s+/g, '')
  }

  const normalized = normalizeTags(rawTags)
  meta.tags = normalized.tags
  meta.unknownTags = normalized.unknown

  return meta
}
