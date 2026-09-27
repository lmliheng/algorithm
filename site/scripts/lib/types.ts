/** 站点生成器共用的数据结构。 */

export type Lang = 'typescript' | 'javascript' | 'python' | 'java' | 'sql'

/** 从代码注释里解析出来的原始元数据（未归一化）。 */
export interface RawMeta {
  lc: number | null
  /** 题号是不是明确写出来的（`@lc`/`lc N`），而不是从标题行里猜的 */
  lcExplicit: boolean
  title: string | null
  source: string | null
  difficulty: string | null
  tags: string[]
  unknownTags: string[]
  time: string | null
  space: string | null
  version: string | null
  note: string | null
  author: string | null
  url: string | null
}

/** 文件名解析结果。 */
export interface NameParts {
  id: number | null
  title: string | null
  variant: string | null
}

/** 一个文件在 git 历史里的位置。 */
export interface FileHistory {
  firstAuthor: string | null
  firstDate: string | null
  lastAuthor: string | null
  lastDate: string | null
  commits: number
}

/** 一条解法（一个文件，或 Java 单文件里的一个方法块）。 */
export interface Solution {
  lang: Lang
  langLabel: string
  variant: string | null
  time: string | null
  space: string | null
  note: string | null
  declared: boolean
  path: string
  githubUrl: string
  line: number | null
  author: string | null
  updated: string | null
  commits: number
  tags: string[]
  difficulty: string | null
  source: string
  code: string
}

/** 一道题（同一题号的多语言、多解法聚合）。 */
export interface Problem {
  key: string
  id: number | null
  slug: string
  title: string
  displayTitle: string
  source: string
  sourceLabel: string
  difficulty: string | null
  tags: string[]
  author: string | null
  updated: string | null
  languages: Lang[]
  langLabels: string[]
  solutions: Solution[]
}

/** 供前端筛选的索引（不含代码）。 */
export interface ProblemsIndex {
  generatedAt: string
  repo: string
  branch: string
  stats: {
    problems: number
    solutions: number
    missingTags: number
    missingComplexity: number
  }
  tagGroups: Record<string, readonly string[]>
  problems: Array<Omit<Problem, 'solutions'> & { solutions: Array<Omit<Solution, 'code'>> }>
}

/** scan 落盘的完整索引（含代码），供 render 使用。 */
export interface FullProblemsIndex {
  generatedAt: string
  repo: string
  branch: string
  stats: ProblemsIndex['stats']
  tagGroups: Record<string, readonly string[]>
  problems: Problem[]
}
