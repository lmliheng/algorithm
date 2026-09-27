/** 来源、语言、难度三张受控表。 */

import type { Lang } from './types.ts'

/** 来源 id → 展示名。 */
export const SOURCES: Record<string, string> = {
  leetcode: 'LeetCode',
  'leetcode-weekly': 'LeetCode 周赛',
  acm: 'ACM 模式',
  codeforces: 'Codeforces',
  nowcoder: '牛客',
  other: '其他',
}

/** 语言 id → 展示名。 */
export const LANGS: Record<Lang, string> = {
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  python: 'Python',
  java: 'Java',
  sql: 'SQL',
}

/** 扩展名 → 语言。 */
export const EXT_LANG: Record<string, Lang> = {
  '.ts': 'typescript',
  '.js': 'javascript',
  '.py': 'python',
  '.java': 'java',
  '.sql': 'sql',
}

/** 难度 id → 展示名。 */
export const DIFFICULTIES: Record<string, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
}

const DIFFICULTY_ALIASES: Record<string, string> = {
  easy: 'easy',
  简单: 'easy',
  入门: 'easy',
  medium: 'medium',
  中等: 'medium',
  中级: 'medium',
  hard: 'hard',
  困难: 'hard',
  高难: 'hard',
}

/** 难度归一化；认不出来返回 null。 */
export function normalizeDifficulty(raw: string | null | undefined): string | null {
  if (!raw) return null
  const key = raw.trim().toLowerCase()
  return DIFFICULTY_ALIASES[key] ?? DIFFICULTY_ALIASES[raw.trim()] ?? null
}

/** 来源归一化；认不出来返回 null。 */
export function normalizeSource(raw: string | null | undefined): string | null {
  if (!raw) return null
  const key = raw.trim().toLowerCase()
  if (SOURCES[key]) return key
  for (const id of Object.keys(SOURCES)) {
    if (SOURCES[id] === raw.trim()) return id
  }
  return null
}

/** 从仓库相对路径推断来源：路径里带 leetcode / 周赛 / ACM 模式。 */
export function sourceFromPath(relPath: string): string {
  if (relPath.includes('周赛')) return 'leetcode-weekly'
  if (relPath.includes('ACM模式')) return 'acm'
  if (/codeforces/i.test(relPath)) return 'codeforces'
  if (/nowcoder|牛客/i.test(relPath)) return 'nowcoder'
  if (/leetcode|hot100/i.test(relPath)) return 'leetcode'
  return 'leetcode'
}

/** 来源的展示名，未知来源原样返回。 */
export function sourceLabel(source: string): string {
  return SOURCES[source] ?? source
}
