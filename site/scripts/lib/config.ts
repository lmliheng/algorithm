/** 站点生成器的路径与仓库常量。 */

import path from 'node:path'

/** <repo>/site/scripts/lib */
const LIB_DIR = import.meta.dirname
/** <repo>/site/scripts */
const SCRIPTS_DIR = path.resolve(LIB_DIR, '..')
/** <repo>/site */
export const SITE_DIR = path.resolve(SCRIPTS_DIR, '..')
/** 仓库根目录 */
export const REPO_ROOT = path.resolve(SITE_DIR, '..')

export const CACHE_DIR = path.join(SITE_DIR, '.cache')
/** scan 的完整产物（含代码），供 render 使用 */
export const FULL_JSON = path.join(CACHE_DIR, 'problems.full.json')
/** 元信息批处理清单与 YAML 的所在目录 */
export const ANNOTATE_DIR = path.join(CACHE_DIR, 'annotate')

export const DOCS_DIR = path.join(SITE_DIR, 'docs')
/** 生成出来的题解页，不入库 */
export const PAGES_DIR = path.join(DOCS_DIR, 'problems')
/** 站点说明页：由 site/README.md 生成，不入库 */
export const GUIDE_DIR = path.join(DOCS_DIR, 'guide')
/** 站点说明页的来源文档 */
export const SITE_README = path.join(SITE_DIR, 'README.md')
/** 供前端筛选的索引，不入库 */
export const PUBLIC_DIR = path.join(DOCS_DIR, 'public')
export const PUBLIC_JSON = path.join(PUBLIC_DIR, 'problems.json')

export const REPO_URL = 'https://github.com/lmliheng/algorithm'
export const REPO_BRANCH = 'master'
export const REPO_SLUG = 'lmliheng/algorithm'

/** 拼出 GitHub 上的源码地址；路径按段编码，中文和空格都能点开。 */
export function githubUrl(relPath: string, line: number | null = null): string {
  const encoded = relPath.split('/').map(encodeURIComponent).join('/')
  const base = `${REPO_URL}/blob/${REPO_BRANCH}/${encoded}`
  return line ? `${base}#L${line}` : base
}
