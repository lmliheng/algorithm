/**
 * 扫描题源 → 题目列表。
 *
 * 收录范围（只收算法题）：
 *   ts/leetcode/**         TypeScript / JavaScript 题解
 *   python/**（除 base）   Python 题解
 *   sql/leetcode/**        SQL 题解
 *   Java/src/main/java/**  Java 题解，按 `@题号.标题` 标记切分单文件
 *
 * 题号、标题、解法名取自文件名；来源取自路径；作者和时间取自 git 历史；
 * 复杂度、标签、难度、版本说明取自代码注释。注释缺失不影响收录。
 */

import { readdirSync, readFileSync } from 'node:fs'
import type { Dirent } from 'node:fs'
import path from 'node:path'
import { githubUrl } from './config.ts'
import { emptyHistory, loadHistory } from './git.ts'
import { splitJavaFile } from './java.ts'
import { extractLeadingComment, parseMetaBlock } from './meta.ts'
import { parseFileName, slugify, stripVariant } from './naming.ts'
import {
  EXT_LANG,
  LANGS,
  normalizeDifficulty,
  normalizeSource,
  sourceFromPath,
  sourceLabel,
} from './vocab.ts'
import type { FileHistory, Lang, Problem, RawMeta, Solution } from './types.ts'

/** 收录的目录 → 扩展名。 */
const ROOTS: Array<{ dir: string; exts: string[] }> = [
  { dir: 'ts/leetcode', exts: ['.ts', '.js'] },
  { dir: 'python', exts: ['.py'] },
  { dir: 'sql/leetcode', exts: ['.sql'] },
]

/** Java 题源目录（单文件按标记切分）。 */
const JAVA_ROOT = 'Java/src/main/java'

const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  '.vitepress',
  'target',
  'dist',
  '__pycache__',
  'site',
  '.cache',
])

/** 不是题目的文件。 */
const SKIP_FILES = [/^python\/base\//]

const LANG_ORDER: Lang[] = ['typescript', 'javascript', 'python', 'java', 'sql']

interface Draft {
  path: string
  lang: Lang
  code: string
  line: number | null
  meta: RawMeta
  id: number | null
  title: string | null
  variant: string | null
  source: string
  declared: boolean
  /** `python/hot100/N.py` 里的 N 是 Hot100 清单序号，不是题号 */
  series: number | null
}

export interface CollectResult {
  problems: Problem[]
  /** 需要处理的情况：未识别标签、Java 文件没有题目标记等。 */
  warnings: string[]
}

function walk(rootAbs: string, exts: string[], baseRel: string): string[] {
  const found: string[] = []
  let entries: Dirent[]
  try {
    entries = readdirSync(rootAbs, { withFileTypes: true })
  } catch {
    return found
  }
  for (const entry of entries) {
    const abs = path.join(rootAbs, entry.name)
    const rel = `${baseRel}/${entry.name}`
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue
      found.push(...walk(abs, exts, rel))
    } else if (entry.isFile() && exts.some((ext) => entry.name.endsWith(ext))) {
      found.push(rel)
    }
  }
  return found
}

const CN_NUMERALS: Record<string, number> = {
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9,
  十: 10,
}

/** 解法排序权重：原写法在前，解法二/三 依次在后。 */
function variantRank(variant: string | null): number {
  if (!variant) return 0
  const match = variant.match(/([0-9一二三四五六七八九十]+)/)
  if (!match) return 99
  const raw = match[1] as string
  if (/^\d+$/.test(raw)) return Number(raw)
  return CN_NUMERALS[raw] ?? 99
}

function langRank(lang: Lang): number {
  const index = LANG_ORDER.indexOf(lang)
  return index === -1 ? 99 : index
}

function baseName(relPath: string): string {
  const name = relPath.split('/').pop() ?? relPath
  return name.replace(/\.[^.]+$/, '')
}

function parentDirOf(relPath: string): string | null {
  const parts = relPath.split('/')
  return parts.length >= 2 ? (parts[parts.length - 2] as string) : null
}

/** 没有标题时，从代码里猜个方法名兜底。 */
function methodHint(code: string, lang: Lang): string | null {
  if (lang === 'python') return code.match(/def\s+([A-Za-z_]\w*)/)?.[1] ?? null
  if (lang === 'java') {
    const match = code.match(
      /(?:public|private|protected)\s+(?:static\s+|final\s+)*[\w<>[\],. ]+\s+([A-Za-z_]\w*)\s*\(/,
    )
    return match?.[1] ?? null
  }
  return (
    code.match(/function\s+([A-Za-z_$]\w*)/)?.[1] ??
    code.match(/(?:const|let|var)\s+([A-Za-z_$]\w*)\s*=\s*(?:function|\()/)?.[1] ??
    null
  )
}

/** 把一条源码整理成 Draft。`fromMeta` 为 true 时题号/标题只认注释（Java 用）。 */
function buildDraft(
  relPath: string,
  lang: Lang,
  code: string,
  line: number | null,
  meta: RawMeta,
  declared: boolean,
  fromMeta = false,
): Draft {
  const parentDir = parentDirOf(relPath)
  const parts = parseFileName(baseName(relPath), parentDir)

  let id: number | null
  let title: string | null
  let variant: string | null
  let series: number | null = null

  if (fromMeta) {
    id = meta.lc
    title = meta.title
    variant = null
  } else if (parentDir === 'hot100') {
    // Hot100 清单序号 ≠ LeetCode 题号：只认注释里写明的题号；
    // 从标题行里读出来的数字，只有和清单序号不同才当作真题号。
    series = parts.id
    id = meta.lcExplicit
      ? meta.lc
      : meta.lc !== null && meta.lc !== series
        ? meta.lc
        : null
    title = parts.title ?? meta.title
    variant = parts.variant
  } else {
    id = parts.id ?? meta.lc
    title = parts.title
    variant = parts.variant
    if (!title && meta.title) title = meta.title
  }

  if (title) {
    const [clean, extra] = stripVariant(title)
    title = clean || null
    if (!variant && extra) variant = extra
  }
  if (!title) {
    title = methodHint(code, lang) ?? (id !== null ? `LC ${id}` : baseName(relPath))
  }

  const source = normalizeSource(meta.source) ?? sourceFromPath(relPath)

  return { path: relPath, lang, code, line, meta, id, title, variant, source, declared, series }
}

/** 扫描全部题源并聚合。 */
export function collectProblems(repoRoot: string): CollectResult {
  const history = loadHistory(repoRoot)
  const drafts: Draft[] = []
  const warnings: string[] = []

  for (const root of ROOTS) {
    for (const relPath of walk(path.join(repoRoot, root.dir), root.exts, root.dir)) {
      if (SKIP_FILES.some((re) => re.test(relPath))) continue
      const lang = EXT_LANG[path.extname(relPath).toLowerCase()]
      if (!lang) continue

      const code = readFileSync(path.join(repoRoot, relPath), 'utf8')
      const meta = parseMetaBlock(extractLeadingComment(code, lang))
      if (meta.unknownTags.length > 0) {
        warnings.push(`${relPath}: 未识别的标签 ${meta.unknownTags.join('、')}（不在受控词表内，已忽略）`)
      }
      const draft = buildDraft(relPath, lang, code, null, meta, false)
      if (draft.series !== null && draft.id === null) {
        warnings.push(
          `${relPath}: 文件名序号 ${draft.series} 是 Hot100 清单顺序、不是题号，注释里也没有明确题号，` +
            `已按标题「${draft.title}」单独收录；在文件头补一行 \`@lc <题号>\` 就会并入对应题目`,
        )
      }
      drafts.push(draft)
    }
  }

  for (const relPath of walk(path.join(repoRoot, JAVA_ROOT), ['.java'], JAVA_ROOT)) {
    const code = readFileSync(path.join(repoRoot, relPath), 'utf8')
    const entries = splitJavaFile(code)
    if (entries.length === 0) {
      warnings.push(`${relPath}: 没有 \`@题号.标题\` 标记，未收录（加上标记即可出现在站点上）`)
      continue
    }
    for (const entry of entries) {
      if (entry.meta.unknownTags.length > 0) {
        warnings.push(`${relPath}: 未识别的标签 ${entry.meta.unknownTags.join('、')}`)
      }
      drafts.push(buildDraft(relPath, 'java', entry.code, entry.line, entry.meta, entry.declared, true))
    }
  }

  // 分组：有题号的按题号合并（多语言/多解法同页）；没有题号的按 来源 + 标题
  const groups = new Map<string, Draft[]>()
  for (const draft of drafts) {
    const key =
      draft.id !== null ? `lc:${draft.id}` : `t:${draft.source}:${slugify(draft.title ?? draft.path)}`
    const list = groups.get(key)
    if (list) list.push(draft)
    else groups.set(key, [draft])
  }

  const usedSlugs = new Set<string>()
  const problems: Problem[] = []

  for (const [key, group] of groups) {
    // 标题取该题下出现最多的写法；并列时用先出现的（收录顺序是 ts → python → java → sql）
    const titleCount = new Map<string, number>()
    for (const draft of group) {
      const candidate = draft.title ?? (draft.id !== null ? `LC ${draft.id}` : baseName(draft.path))
      titleCount.set(candidate, (titleCount.get(candidate) ?? 0) + 1)
    }
    let title = key
    let bestCount = -1
    for (const [candidate, count] of titleCount) {
      if (count > bestCount) {
        bestCount = count
        title = candidate
      }
    }

    const id = group.find((draft) => draft.id !== null)?.id ?? null

    let slug = id !== null ? String(id) : slugify(title)
    if (usedSlugs.has(slug)) {
      let n = 2
      while (usedSlugs.has(`${slug}-${n}`)) n += 1
      slug = `${slug}-${n}`
    }
    usedSlugs.add(slug)

    const sourceCount = new Map<string, number>()
    for (const draft of group) sourceCount.set(draft.source, (sourceCount.get(draft.source) ?? 0) + 1)
    const source =
      [...sourceCount.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] ??
      'leetcode'

    const tags: string[] = []
    for (const draft of group) {
      for (const tag of draft.meta.tags) if (!tags.includes(tag)) tags.push(tag)
    }

    const solutions: Solution[] = group
      .map((draft) => {
        const hist: FileHistory = history.get(draft.path) ?? emptyHistory()
        return {
          lang: draft.lang,
          langLabel: LANGS[draft.lang],
          variant: draft.variant,
          time: draft.meta.time,
          space: draft.meta.space,
          note: draft.meta.note,
          declared: draft.declared,
          path: draft.path,
          githubUrl: draft.meta.url ?? githubUrl(draft.path, draft.line),
          line: draft.line,
          author: draft.meta.author ?? hist.lastAuthor,
          updated: hist.lastDate,
          commits: hist.commits,
          tags: draft.meta.tags,
          difficulty: normalizeDifficulty(draft.meta.difficulty),
          source: draft.source,
          code: draft.code,
        } satisfies Solution
      })
      .sort(
        (a, b) =>
          variantRank(a.variant) - variantRank(b.variant) ||
          langRank(a.lang) - langRank(b.lang) ||
          a.path.localeCompare(b.path),
      )

    const languages = LANG_ORDER.filter((lang) => solutions.some((item) => item.lang === lang))
    const updated =
      solutions
        .map((item) => item.updated)
        .filter((value): value is string => Boolean(value))
        .sort()
        .pop() ?? null

    // 只有题号、没有题目名时不要显示成 "746. LC 746"
    const placeholder = id !== null && title === `LC ${id}`

    problems.push({
      key,
      id,
      slug,
      title,
      displayTitle: id !== null && !placeholder ? `${id}. ${title}` : title,
      source,
      sourceLabel: sourceLabel(source),
      difficulty: solutions.find((item) => item.difficulty !== null)?.difficulty ?? null,
      tags,
      author: solutions.find((item) => item.author)?.author ?? null,
      updated,
      languages,
      langLabels: languages.map((lang) => LANGS[lang]),
      solutions,
    })
  }

  problems.sort(
    (a, b) =>
      (a.id ?? Number.MAX_SAFE_INTEGER) - (b.id ?? Number.MAX_SAFE_INTEGER) ||
      a.title.localeCompare(b.title),
  )

  return { problems, warnings }
}
