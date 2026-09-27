/**
 * 扫描题源，产出两份产物：
 *   site/.cache/problems.full.json    含代码，供 render 生成页面
 *   site/docs/public/problems.json    不含代码，供站点前端筛选
 *
 * 用法：
 *   npm run scan            扫描并输出统计
 *   npm run scan -- --todo  额外列出还缺标签/复杂度的题目
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { collectProblems } from './lib/collect.ts'
import {
  CACHE_DIR,
  FULL_JSON,
  PUBLIC_DIR,
  PUBLIC_JSON,
  REPO_BRANCH,
  REPO_ROOT,
  REPO_SLUG,
} from './lib/config.ts'
import { TAG_GROUPS } from './lib/tags.ts'
import { LANGS } from './lib/vocab.ts'
import type { FullProblemsIndex, Lang, ProblemsIndex } from './lib/types.ts'

function main(): void {
  const started = Date.now()
  const { problems, warnings } = collectProblems(REPO_ROOT)

  const solutionCount = problems.reduce((sum, problem) => sum + problem.solutions.length, 0)
  const missingTags = problems.filter((problem) => problem.tags.length === 0)
  const missingComplexity = problems.filter((problem) =>
    problem.solutions.every((solution) => !solution.time && !solution.space),
  )

  const byLang = new Map<Lang, number>()
  for (const problem of problems) {
    for (const lang of problem.languages) byLang.set(lang, (byLang.get(lang) ?? 0) + 1)
  }
  const bySource = new Map<string, number>()
  for (const problem of problems) {
    bySource.set(problem.sourceLabel, (bySource.get(problem.sourceLabel) ?? 0) + 1)
  }

  /** 供 render 生成页面，保留代码。 */
  const full: FullProblemsIndex = {
    generatedAt: new Date().toISOString(),
    repo: REPO_SLUG,
    branch: REPO_BRANCH,
    stats: {
      problems: problems.length,
      solutions: solutionCount,
      missingTags: missingTags.length,
      missingComplexity: missingComplexity.length,
    },
    tagGroups: TAG_GROUPS,
    problems,
  }

  /** 供浏览器筛选，去掉代码，体积小得多。 */
  const publicIndex: ProblemsIndex = {
    ...full,
    problems: problems.map(({ solutions, ...rest }) => ({
      ...rest,
      solutions: solutions.map(({ code, ...solution }) => {
        void code
        return solution
      }),
    })),
  }

  mkdirSync(CACHE_DIR, { recursive: true })
  mkdirSync(PUBLIC_DIR, { recursive: true })
  writeFileSync(FULL_JSON, `${JSON.stringify(full, null, 2)}\n`, 'utf8')
  writeFileSync(PUBLIC_JSON, `${JSON.stringify(publicIndex)}\n`, 'utf8')

  const format = (entries: Map<string, number>): string =>
    [...entries.entries()].sort((a, b) => b[1] - a[1]).map(([key, value]) => `${key} ${value}`).join(' · ')

  console.log(`扫描完成，用时 ${Date.now() - started}ms`)
  console.log(`  题目 ${problems.length} · 解法 ${solutionCount}`)
  console.log(`  语言 ${format(byLang as Map<string, number>)}`)
  console.log(`  来源 ${format(bySource)}`)
  console.log(`  缺标签 ${missingTags.length} 题 · 缺复杂度 ${missingComplexity.length} 题`)

  if (warnings.length > 0) {
    console.log(`\n需要注意 ${warnings.length} 条：`)
    for (const warning of warnings.slice(0, 20)) console.log(`  - ${warning}`)
    if (warnings.length > 20) console.log(`  … 其余 ${warnings.length - 20} 条省略`)
  }

  if (process.argv.includes('--todo')) {
    console.log('\n待补元数据的题目（在文件头加 @tags / @time / @space 即可）：')
    for (const problem of [...new Set([...missingTags, ...missingComplexity])]) {
      const gaps: string[] = []
      if (problem.tags.length === 0) gaps.push('标签')
      if (problem.solutions.every((solution) => !solution.time && !solution.space)) gaps.push('复杂度')
      console.log(`  ${problem.displayTitle}  [缺 ${gaps.join('、')}]  ${problem.solutions[0]?.path ?? ''}`)
    }
  }

  console.log(`\n产物：${FULL_JSON}`)
  console.log(`      ${PUBLIC_JSON}`)
  void LANGS
}

main()
