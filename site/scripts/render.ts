/**
 * 读取 scan 的完整产物，生成题解页与纯文本索引。
 *
 * 产物（都在 site/docs/problems/，不入库）：
 *   <slug>.md   每题一页：元信息 + 各语言各解法代码
 *   index.md    全量索引，无 JS 也能用，同时喂给 VitePress 本地搜索
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { FULL_JSON, GUIDE_DIR, PAGES_DIR, REPO_URL, SITE_README } from './lib/config.ts'
import { DIFFICULTIES } from './lib/vocab.ts'
import type { FullProblemsIndex, Problem, Solution } from './lib/types.ts'

type FullIndex = FullProblemsIndex

/** 代码里有多少个连续反引号，围栏就比它长一点。 */
function fenceFor(code: string): string {
  const runs = code.match(/`+/g)
  const longest = runs ? Math.max(...runs.map((run) => run.length)) : 0
  return '`'.repeat(Math.max(3, longest + 1))
}

function cell(text: string): string {
  return text.replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim()
}

function shortDate(iso: string | null): string {
  return iso ? iso.slice(0, 10) : '—'
}

function difficultyLabel(difficulty: string | null): string {
  if (!difficulty) return '—'
  return DIFFICULTIES[difficulty] ?? difficulty
}

function tagsCell(tags: readonly string[]): string {
  return tags.length > 0 ? tags.map((tag) => `\`${tag}\``).join(' ') : '—'
}

function codeBlock(solution: Solution): string {
  const fence = fenceFor(solution.code)
  const after = solution.code.endsWith('\n') ? '' : '\n'
  return `${fence}${solution.lang} [${solution.langLabel}]\n${solution.code}${after}${fence}`
}

function solutionSection(solution: Solution, index: number, total: number, sameLang: number): string {
  const parts: string[] = []

  if (total > 1) {
    // 同一语言有多个解法时才编号；否则直接写语言名就够了
    const name = solution.variant ?? (sameLang > 1 ? '解法一' : solution.langLabel)
    parts.push(`## ${solution.variant ? `${name} · ${solution.langLabel}` : name}`)
    parts.push('')
  }

  const meta: string[] = [`**${solution.langLabel}**`]
  if (solution.time) meta.push(`\`${solution.time}\` 时间`)
  if (solution.space) meta.push(`\`${solution.space}\` 空间`)
  if (solution.variant && total === 1) meta.push(solution.variant)
  meta.push(`更新于 ${shortDate(solution.updated)}`)
  parts.push(meta.join(' · '))
  parts.push('')

  if (solution.declared) {
    parts.push('> ⚠️ 这个条目目前只有方法签名/注释，实现还没写。')
    parts.push('')
  }
  if (solution.note) {
    parts.push(`> ${solution.note}`)
    parts.push('')
  }

  parts.push(codeBlock(solution))
  parts.push('')
  parts.push(`源码：[\`${solution.path}\`](${solution.githubUrl})`)
  parts.push('')

  void index
  return parts.join('\n')
}

function problemPage(index: FullIndex, problem: Problem): string {
  const out: string[] = []
  out.push('---')
  out.push(`title: "${problem.displayTitle.replace(/"/g, '\\"')}"`)
  out.push('---')
  out.push('')
  out.push(`# ${problem.displayTitle}`)
  out.push('')

  out.push(`- **题号**：${problem.id ?? '—'}`)
  out.push(`- **来源**：${problem.sourceLabel}`)
  out.push(`- **难度**：${difficultyLabel(problem.difficulty)}`)
  out.push(`- **标签**：${tagsCell(problem.tags)}`)
  out.push(`- **语言**：${problem.langLabels.join(' · ')}`)
  out.push(`- **解法**：${problem.solutions.length} 个`)
  out.push(`- **作者**：${problem.author ?? '—'}`)
  out.push(`- **最近更新**：${shortDate(problem.updated)}`)
  out.push('')

  problem.solutions.forEach((solution, position) => {
    const sameLang = problem.solutions.filter((item) => item.lang === solution.lang).length
    out.push(solutionSection(solution, position, problem.solutions.length, sameLang))
  })

  out.push('---')
  out.push('')
  out.push(`在 GitHub 上查看题目所在目录：[${index.repo}](${REPO_URL})`)
  out.push('')
  return out.join('\n')
}

function indexPage(index: FullIndex): string {
  const rows = index.problems.map((problem) => {
    const languages = problem.langLabels.join(' ')
    return `| [${problem.id ?? '—'}](./${problem.slug}.html) | [${cell(problem.title)}](./${problem.slug}.html) | ${cell(languages)} | ${difficultyLabel(problem.difficulty)} | ${tagsCell(problem.tags)} | ${cell(problem.sourceLabel)} | ${shortDate(problem.updated)} |`
  })

  return [
    '# 题解索引',
    '',
    `共 **${index.problems.length}** 题、**${index.stats.solutions}** 份解法，生成于 ${shortDate(index.generatedAt)}。`,
    '',
    '想按标签、语言、难度筛选，去[首页](/)的检索器；这一页是纯文本索引，也用于站内搜索。',
    '',
    '| 题号 | 题目 | 语言 | 难度 | 标签 | 来源 | 最近更新 |',
    '| --- | --- | --- | --- | --- | --- | --- |',
    ...rows,
    '',
  ].join('\n')
}

/**
 * 站点说明页：直接把 site/README.md 搬进 docs/guide/index.md。
 *
 * 单一事实来源还是仓库里的 README，改它就行，页面跟着重新生成。
 */
function writeGuidePage(): boolean {
  if (!existsSync(SITE_README)) {
    console.log(`  跳过站点说明页：找不到 ${SITE_README}`)
    return false
  }
  mkdirSync(GUIDE_DIR, { recursive: true })
  const readme = readFileSync(SITE_README, 'utf8').trimEnd()
  writeFileSync(
    path.join(GUIDE_DIR, 'index.md'),
    ['<!-- 由 site/README.md 生成，不要手改这一页 -->', '', readme, ''].join('\n'),
    'utf8',
  )
  return true
}

function main(): void {
  if (!existsSync(FULL_JSON)) {
    throw new Error(`找不到 ${FULL_JSON}，请先运行 npm run scan`)
  }

  const index = JSON.parse(readFileSync(FULL_JSON, 'utf8')) as FullIndex
  mkdirSync(PAGES_DIR, { recursive: true })

  const written = new Set<string>()
  for (const problem of index.problems) {
    const file = `${problem.slug}.md`
    writeFileSync(path.join(PAGES_DIR, file), problemPage(index, problem), 'utf8')
    written.add(file)
  }
  writeFileSync(path.join(PAGES_DIR, 'index.md'), indexPage(index), 'utf8')
  written.add('index.md')

  // 清掉上一轮生成、这轮已经不存在的页面
  let removed = 0
  for (const name of readdirSync(PAGES_DIR)) {
    if (!name.endsWith('.md') || written.has(name)) continue
    rmSync(path.join(PAGES_DIR, name))
    removed += 1
  }

  console.log(`生成题解页 ${index.problems.length} 个${removed > 0 ? `，清理旧页面 ${removed} 个` : ''}`)
  console.log(`  目录：${PAGES_DIR}`)

  if (writeGuidePage()) console.log(`生成站点说明页 → ${path.join(GUIDE_DIR, 'index.md')}`)
}

main()
