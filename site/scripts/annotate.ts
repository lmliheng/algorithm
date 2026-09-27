/**
 * 把元信息写进源码开头的注释里。
 *
 * 数据来自 `site/.cache/annotate/*.yaml`（批处理产物）：
 *   npm run annotate            只看会改什么，不写文件（dry-run）
 *   npm run annotate -- --write 真正写入
 *
 * 只插入 @difficulty / @tags / @time / @space / @note 这几行，
 * 已有同名字段的文件会跳过该字段，可以反复运行。
 */

import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { ANNOTATE_DIR, REPO_ROOT } from './lib/config.ts'
import { ensureMetaLines, hasField, locateLeadingComment } from './lib/insert.ts'
import { normalizeTag } from './lib/tags.ts'
import { EXT_LANG, DIFFICULTIES } from './lib/vocab.ts'
import { parseAnnotationYaml } from './lib/yaml-lite.ts'
import type { Lang } from './lib/types.ts'

interface Plan {
  file: string
  lang: Lang
  fields: string[]
  skipped: string[]
  problems: string[]
}

function readBatch(name: string): string[] {
  return readFileSync(path.join(ANNOTATE_DIR, name), 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
}

function main(): void {
  const write = process.argv.includes('--write')
  const only = process.argv.indexOf('--file') >= 0
    ? (process.argv[process.argv.indexOf('--file') + 1] ?? null)
    : null

  if (!existsSync(ANNOTATE_DIR)) {
    throw new Error(`找不到 ${ANNOTATE_DIR}，请先生成批处理清单与 YAML`)
  }

  const yamlFiles = readdirSync(ANNOTATE_DIR).filter((name) => name.endsWith('.yaml'))
  if (yamlFiles.length === 0) throw new Error(`${ANNOTATE_DIR} 下没有 YAML`)

  const manifests = new Map<string, string>()
  for (const name of readdirSync(ANNOTATE_DIR).filter((n) => n.endsWith('.txt'))) {
    for (const file of readBatch(name)) manifests.set(file, name)
  }

  const records = new Map<string, ReturnType<typeof parseAnnotationYaml>[number]>()
  for (const name of yamlFiles) {
    for (const record of parseAnnotationYaml(readFileSync(path.join(ANNOTATE_DIR, name), 'utf8'))) {
      records.set(record.path, record)
    }
  }

  const plans: Plan[] = []
  const problems: string[] = []
  const missing: string[] = []

  for (const [file, record] of records) {
    if (only && file !== only) continue

    const abs = path.join(REPO_ROOT, file)
    if (!existsSync(abs)) {
      problems.push(`${file}: 文件不存在`)
      continue
    }

    const lang = EXT_LANG[path.extname(file).toLowerCase()]
    if (!lang) {
      problems.push(`${file}: 语言无法识别`)
      continue
    }

    const source = readFileSync(abs, 'utf8')
    const located = locateLeadingComment(source, lang)
    const has = (field: string): boolean => (located ? hasField(source, located, field) : false)

    const fields: string[] = []
    const skipped: string[] = []

    if (record.difficulty) {
      if (!DIFFICULTIES[record.difficulty]) problems.push(`${file}: 难度取值非法「${record.difficulty}」`)
      else if (has('difficulty')) skipped.push('@difficulty')
      else fields.push(`@difficulty ${record.difficulty}`)
    }

    const tags: string[] = []
    for (const raw of record.tags) {
      const tag = normalizeTag(raw)
      if (tag) {
        if (!tags.includes(tag)) tags.push(tag)
      } else {
        problems.push(`${file}: 标签「${raw}」不在受控词表内，已忽略`)
      }
    }
    if (tags.length > 0) {
      if (has('tags')) skipped.push('@tags')
      else fields.push(`@tags ${tags.join(',')}`)
    }

    for (const key of ['time', 'space'] as const) {
      const value = record[key]
      if (!value) continue
      if (!/^O\s*\(.+\)$/.test(value.trim())) {
        problems.push(`${file}: ${key} 格式可疑「${value}」`)
        continue
      }
      if (has(key)) skipped.push(`@${key}`)
      else fields.push(`@${key} ${value.trim()}`)
    }

    if (record.note) {
      if (has('note')) skipped.push('@note')
      else fields.push(`@note ${record.note}`)
    }

    if (fields.length === 0) continue
    plans.push({ file, lang, fields, skipped, problems: [] })
  }

  for (const [file, batch] of manifests) {
    if (!records.has(file)) missing.push(`${file}（清单 ${batch}）`)
  }

  console.log(`清单 ${manifests.size} 个文件，YAML 覆盖 ${records.size} 个，本次将处理 ${plans.length} 个`)
  if (plans[0]) {
    console.log('\n示例（第一个文件将插入的行）：')
    for (const field of plans[0].fields) console.log(`  ${field}`)
  }
  if (missing.length > 0) {
    console.log(`\nYAML 里缺失 ${missing.length} 个文件：`)
    for (const item of missing.slice(0, 20)) console.log(`  - ${item}`)
  }
  if (problems.length > 0) {
    console.log(`\n需要留意 ${problems.length} 条：`)
    for (const item of problems.slice(0, 20)) console.log(`  - ${item}`)
  }

  if (!write) {
    console.log('\ndry-run：没有写入任何文件。加 --write 才会真正写入。')
    return
  }

  let written = 0
  for (const plan of plans) {
    const abs = path.join(REPO_ROOT, plan.file)
    const source = readFileSync(abs, 'utf8')
    const updated = ensureMetaLines(source, plan.lang, plan.fields)
    if (updated === source) continue
    writeFileSync(abs, updated, 'utf8')
    written += 1
  }
  console.log(`\n已写入 ${written} 个文件。`)
}

main()
