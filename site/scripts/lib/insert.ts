/**
 * 往源码开头那段注释里增补元信息行。
 *
 * 只做「插入」，不改写原有注释内容、不动代码，所以可以反复运行：
 * 已经有 @tags / @time 等字段的文件会被跳过。
 */

import type { Lang } from './types.ts'

interface Located {
  /** 注释块起始下标 */
  start: number
  /** 注释块结尾下标（不含） */
  end: number
  /** 首行内容 */
  firstLine: string
  /** 首行行尾换行符的下标 */
  firstLineEnd: number
  /** 首行缩进 */
  indent: string
  /** 每一行的注释前缀 */
  prefix: string
  /** 整个注释块是不是只有一行（单行块需要拆开） */
  singleLine: boolean
}

/** 找到文件开头的注释块，规则与 meta.ts 保持一致。 */
export function locateLeadingComment(source: string, lang: Lang): Located | null {
  const rawLines = source.split('\n')
  let cursor = 0
  let index = 0

  // Java 的 package / import 排在注释之前
  while (index < rawLines.length) {
    const raw = rawLines[index] as string
    const trimmed = raw.replace(/\r$/, '').trim()
    if (!trimmed || /^(package|import|using|#include)\b/.test(trimmed)) {
      cursor += raw.length + 1
      index++
      continue
    }
    break
  }

  const line = (rawLines[index] ?? '').replace(/\r$/, '')
  const trimmed = line.trim()
  const indent = (line.match(/^[ \t]*/) as RegExpMatchArray)[0]
  const start = cursor + indent.length
  const firstLineEnd = source.indexOf('\n', start)
  if (firstLineEnd === -1) return null

  const make = (end: number, prefix: string, singleLine: boolean): Located => ({
    start,
    end,
    firstLine: source.slice(start, firstLineEnd),
    firstLineEnd,
    indent,
    prefix,
    singleLine,
  })

  if (lang === 'python') {
    const match = trimmed.match(/^[rRuUbBfF]{0,3}("""|''')/)
    if (!match) return null
    const quote = match[1] as string
    const contentStart = start + match[0].length
    const closeAt = source.indexOf(quote, contentStart)
    if (closeAt === -1) return null
    const singleLine = closeAt < firstLineEnd
    return make(closeAt + quote.length, '', singleLine)
  }

  if (trimmed.startsWith('/*')) {
    const closeAt = source.indexOf('*/', start)
    if (closeAt === -1) return null
    const singleLine = closeAt < firstLineEnd
    return make(closeAt + 2, `${indent} * `, singleLine)
  }

  if (trimmed.startsWith('--') || trimmed.startsWith('//')) {
    const marker = trimmed.startsWith('--') ? '--' : '//'
    let end = cursor
    let i = index
    while (i < rawLines.length) {
      const raw = rawLines[i] as string
      if (!raw.trim().startsWith(marker)) break
      end += raw.length + 1
      i++
    }
    // 行注释不需要包壳，插在第一行之后即可
    return make(Math.min(end, source.length), `${indent}${marker} `, false)
  }

  return null
}

/** 注释块里是否已经有某个字段。 */
export function hasField(source: string, located: Located, field: string): boolean {
  const text = source.slice(located.start, located.end)
  return new RegExp(`@\\s*${field}\\b`, 'i').test(text)
}

/** 把若干 `@key value` 行插进开头注释块。返回新源码；没有注释块时返回 null。 */
export function insertMetaLines(
  source: string,
  lang: Lang,
  fields: string[],
): { source: string; located: Located } | null {
  if (fields.length === 0) return null

  const located = locateLeadingComment(source, lang)
  if (!located) return null

  const crlf = source.includes('\r\n')
  const newline = crlf ? '\r\n' : '\n'
  const body = fields.map((field) => `${located.prefix}${field}`).join(newline)

  if (located.singleLine) {
    // 单行块注释（/** ... */、"""..."""）要拆成多行才能放字段
    const inner = located.firstLine
      .replace(/^\s*\/\*+/, '')
      .replace(/\*\/\s*$/, '')
      .trim()
    const rebuilt =
      lang === 'python'
        ? ['"""', inner, ...fields, '"""'].filter((text, i) => !(i === 1 && text === '')).join(newline)
        : [
            `${located.indent}/**`,
            ...(inner ? [`${located.prefix}${inner}`] : []),
            ...fields.map((field) => `${located.prefix}${field}`),
            `${located.indent} */`,
          ].join(newline)
    return {
      source: source.slice(0, located.start) + rebuilt + source.slice(located.end),
      located,
    }
  }

  const insertAt = located.firstLineEnd + 1
  return {
    source: source.slice(0, insertAt) + body + newline + source.slice(insertAt),
    located,
  }
}

/**
 * 文件开头没有注释块时，新建一个再写入。Java 插到 package/import 之后。
 */
export function ensureMetaLines(source: string, lang: Lang, fields: string[]): string {
  if (fields.length === 0) return source

  const existing = locateLeadingComment(source, lang)
  if (existing) {
    const result = insertMetaLines(source, lang, fields)
    return result ? result.source : source
  }

  const crlf = source.includes('\r\n')
  const newline = crlf ? '\r\n' : '\n'
  const block =
    lang === 'python'
      ? ['"""', ...fields, '"""', ''].join(newline)
      : lang === 'sql'
        ? [...fields.map((field) => `-- ${field}`), ''].join(newline)
        : ['/**', ...fields.map((field) => ` * ${field}`), ' */', ''].join(newline)

  if (lang !== 'java') return block + source

  // Java：跳过 package / import 之后插入
  const lines = source.split('\n')
  let cursor = 0
  let index = 0
  while (index < lines.length) {
    const raw = lines[index] as string
    const trimmed = raw.replace(/\r$/, '').trim()
    if (!trimmed || /^(package|import)\b/.test(trimmed)) {
      cursor += raw.length + 1
      index++
      continue
    }
    break
  }
  // 注释块后面空一行更符合 Java 习惯
  return source.slice(0, cursor) + block + source.slice(cursor)
}
