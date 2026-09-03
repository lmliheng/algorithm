/**
 * 将仓库相对路径拼接为 GitHub 网页链接。
 */
export function buildGithubUrl(repo: string, branch: string, relPath: string): string {
  return `https://github.com/${repo}/blob/${branch}/${relPath}`
}