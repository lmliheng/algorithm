/**
 * 一次批量读取 git 历史，得到每个文件的作者和时间。
 *
 * 关键点：整仓库只启动一次 git 进程。逐个文件跑 `git log -- path`
 * 在 200+ 文件时要启动 200+ 次进程，CI 上会明显拖慢构建。
 */

import { execFileSync } from 'node:child_process'
import type { FileHistory } from './types.ts'

const RECORD = '\u001e'
const FIELD = '\u001f'

/** 仓库相对路径（正斜杠）→ 历史信息。 */
export function loadHistory(repoRoot: string): Map<string, FileHistory> {
  const history = new Map<string, FileHistory>()

  let output: string
  try {
    output = execFileSync(
      'git',
      [
        '-c',
        'core.quotepath=false',
        'log',
        '--reverse',
        '--name-only',
        '--date=iso-strict',
        `--format=${RECORD}%an${FIELD}%aI`,
      ],
      { cwd: repoRoot, encoding: 'utf8', maxBuffer: 512 * 1024 * 1024 },
    )
  } catch {
    // 没有 git 或不是仓库时退化为"无历史"，站点照样能构建
    return history
  }

  for (const record of output.split(RECORD)) {
    if (!record.trim()) continue
    const newline = record.indexOf('\n')
    const header = newline >= 0 ? record.slice(0, newline) : record
    const [author, date] = header.split(FIELD)
    if (!author || !date) continue

    const files = (newline >= 0 ? record.slice(newline + 1) : '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)

    for (const file of files) {
      const existing = history.get(file)
      if (!existing) {
        history.set(file, {
          firstAuthor: author,
          firstDate: date,
          lastAuthor: author,
          lastDate: date,
          commits: 1,
        })
      } else {
        existing.lastAuthor = author
        existing.lastDate = date
        existing.commits += 1
      }
    }
  }

  return history
}

/** 取不到历史时给一份空记录。 */
export function emptyHistory(): FileHistory {
  return {
    firstAuthor: null,
    firstDate: null,
    lastAuthor: null,
    lastDate: null,
    commits: 0,
  }
}
