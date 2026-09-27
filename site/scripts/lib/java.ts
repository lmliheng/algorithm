/**
 * Java 单文件切分。
 *
 * `Alogorithm.java` 里一个 `@题号.标题` 的 Javadoc 块就代表一道题，
 * 块后面的方法体属于这道题；只写了 Javadoc 还没实现的方法会被标记为
 * "未实现"，页面上照样列出来。
 */

import { parseMetaBlock } from './meta.ts'
import type { RawMeta } from './types.ts'

export interface JavaEntry {
  /** 在文件里的行号（1 起） */
  line: number
  code: string
  meta: RawMeta
  declared: boolean
}

const JAVADOC = /\/\*\*[\s\S]*?\*\//g

/** 去掉整段代码共有的缩进，Java 方法块在类里是缩进的。 */
function dedent(code: string): string {
  const lines = code.split('\n')
  let min = Number.POSITIVE_INFINITY
  for (const line of lines) {
    if (!line.trim()) continue
    const indent = (line.match(/^[ \t]*/) as RegExpMatchArray)[0].length
    if (indent < min) min = indent
  }
  if (!Number.isFinite(min) || min === 0) return code
  return lines.map((line) => (line.trim() ? line.slice(min) : '')).join('\n')
}

/** 把 Java 源码按题目切分。认 `@lc 1` / `@title` 和老的 `@1.两数之和`，只取带题号的注释块。 */
export function splitJavaFile(source: string): JavaEntry[] {
  const blocks: Array<{ start: number; end: number; text: string; meta: RawMeta }> = []

  JAVADOC.lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = JAVADOC.exec(source)) !== null) {
    const text = match[0]
    const meta = parseMetaBlock(text)
    if (meta.lc === null) continue
    blocks.push({ start: match.index, end: match.index + text.length, text, meta })
  }

  return blocks.map((block, index) => {
    const next = blocks[index + 1]
    // 从 `/**` 所在行的行首开始，这样首行也带着类内的缩进，dedent 才能算准
    const lineStart = source.lastIndexOf('\n', block.start) + 1
    const indent = source.slice(lineStart, block.start)
    const raw = (indent + source.slice(block.start, next ? next.start : source.length)).trimEnd()
    const afterComment = raw.slice(indent.length + block.text.length)
    const declared = !/\{[\s\S]*\}/.test(afterComment)
    return {
      line: source.slice(0, lineStart).split('\n').length,
      code: dedent(raw),
      meta: block.meta,
      declared,
    }
  })
}
