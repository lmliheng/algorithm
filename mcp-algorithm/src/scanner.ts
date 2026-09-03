import { promises as fs } from 'node:fs'
import path from 'node:path'

const SKIP_DIRS = new Set(['.git', 'node_modules', '.github', '.vscode', 'dist', 'coverage'])
const FILE_EXTS = new Set(['.js', '.md'])

/**
 * 递归扫描算法库，返回所有算法文件的相对路径（POSIX 风格，如 `基本算法/动态规划以及优化/最长递增子序列.js`）。
 */
export async function scanAlgorithmFiles(algorithmDir: string): Promise<string[]> {
  const files: string[] = []

  async function walk(dir: string, rel: string): Promise<void> {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    entries.sort((a, b) => a.name.localeCompare(b.name))

    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (SKIP_DIRS.has(entry.name)) continue
        await walk(path.join(dir, entry.name), rel ? `${rel}/${entry.name}` : entry.name)
      } else if (entry.isFile()) {
        if (!FILE_EXTS.has(path.extname(entry.name).toLowerCase())) continue
        files.push(rel ? `${rel}/${entry.name}` : entry.name)
      }
    }
  }

  await walk(algorithmDir, '')
  return files
}