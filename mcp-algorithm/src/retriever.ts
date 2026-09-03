import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { AppConfig } from './config.ts'
import { callDeepSeek, type ChatMessage } from './deepseek.ts'

export interface AlgorithmHit {
  /** 仓库相对路径，如 `基本算法/动态规划以及优化/最长递增子序列.js` */
  relPath: string
  /** 题目名（文件名去扩展名） */
  title: string
  /** 一句话说明 */
  summary: string
}

/** 阶段一粗筛出的候选数量 */
const CANDIDATE_COUNT = 20
/** 阶段二精读时每个文件最多读取的行数（控制上下文体积） */
const CODE_LINE_LIMIT = 120
/** 阶段二精读时所有文件合计的最大行数 */
const TOTAL_LINE_LIMIT = 2000

/**
 * Agent 两阶段检索：
 * 1. 粗筛：LLM 从文件路径清单中挑出最相关的候选（依据文件名/目录，快且便宜）。
 * 2. 精读：读取候选文件的真实代码内容，LLM 精挑最相关的 1-N 个并写说明。
 * 这样即使文件名无意义（如 3286.js），也能靠代码内容正确识别。
 */
export async function retrieveAlgorithms(
  config: AppConfig,
  fileList: string[],
  query: string,
): Promise<AlgorithmHit[]> {
  const candidates = await roughFilter(config, fileList, query)
  if (candidates.length === 0) return []

  return refine(config, candidates, query, config.maxResults)
}

/** 阶段一：从完整清单粗筛候选路径（严格校验来自清单，防 LLM 捏造） */
async function roughFilter(
  config: AppConfig,
  fileList: string[],
  query: string,
): Promise<string[]> {
  const allowed = new Set(fileList)
  const systemPrompt = `你是算法检索助手。下面是我算法库的全部文件清单（相对路径，按算法类别分目录）。

要求：
1. 根据用户的提问，从清单中挑选最相关的 ${CANDIDATE_COUNT} 个以内的候选文件。
2. 只输出一个 JSON 字符串数组，不要输出任何其他文字、注释或 Markdown 代码块标记。
3. 数组元素必须是清单中完全一致的相对路径，不得捏造。
4. 如果没有任何相关文件，输出空数组 []。
5. 这一步宁多勿漏：拿不准的文件也放进候选，后续会精读代码确认。

文件清单：
${fileList.join('\n')}`

  const { content } = await callDeepSeek(config, [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: query },
  ])

  return extractJsonArray(content).filter((p): p is string => typeof p === 'string' && allowed.has(p))
}

/** 阶段二：读取候选文件代码，精挑最终结果 */
async function refine(
  config: AppConfig,
  candidates: string[],
  query: string,
  maxResults: number,
): Promise<AlgorithmHit[]> {
  const codeBlocks = await readCodeBlocks(config.algorithmDir, candidates)
  if (codeBlocks.length === 0) return []

  const systemPrompt = `你是算法检索助手。下面是候选算法的真实代码内容（按【文件】路径分隔）。

要求：
1. 根据用户的提问，基于代码内容判断每个文件解决什么问题，挑选最相关的 ${maxResults} 个以内的文件。
2. 只输出一个 JSON 数组，不要输出任何其他文字、注释或 Markdown 代码块标记。
3. 数组每个元素格式：{"relPath": "与【文件】标记完全一致的相对路径", "title": "题目名（去掉扩展名的文件名）", "summary": "一句话中文说明该文件是什么算法/解决什么问题，基于代码实际内容归纳"}
4. 如果没有任何相关文件，输出空数组 []。
5. relPath 不得捏造，必须来自上面给出的代码块。

候选代码：
${codeBlocks.join('\n')}`

  const { content } = await callDeepSeek(config, [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: query },
  ])

  const allowed = new Set(candidates)
  return extractHits(content).filter((h) => allowed.has(h.relPath)).slice(0, maxResults)
}

/** 读取多个候选文件的代码片段，向前截断各行，并受总行数上限约束 */
async function readCodeBlocks(algorithmDir: string, candidates: string[]): Promise<string[]> {
  const valid = await Promise.all(
    candidates.map(async (rel) => {
      let lines: string[]
      try {
        const text = await fs.readFile(path.join(algorithmDir, rel), 'utf8')
        lines = text.split(/\r?\n/)
      } catch {
        return null
      }
      if (lines.length === 0) return null
      // 代码逻辑一般集中在开头（注释/思路/核心实现），截断过长文件控制上下文
      return { rel, text: lines.slice(0, CODE_LINE_LIMIT).join('\n') }
    }),
  )

  const kept: string[] = []
  let total = 0
  for (const item of valid) {
    if (!item) continue
    const lineCount = item.text.split('\n').length
    if (total + lineCount > TOTAL_LINE_LIMIT) break
    total += lineCount
    kept.push(`【文件】${item.rel}\n${item.text}`)
  }
  return kept
}

/** 从 LLM 输出中提取 JSON 数组（容忍 ```json 围栏与前后噪音） */
function extractJsonArray(raw: string): unknown[] {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/)
  const jsonText = fenced ? fenced[1] : raw
  const start = jsonText.indexOf('[')
  const end = jsonText.lastIndexOf(']')
  if (start === -1 || end === -1 || end <= start) return []

  let parsed: unknown
  try {
    parsed = JSON.parse(jsonText.slice(start, end + 1))
  } catch {
    return []
  }
  return Array.isArray(parsed) ? parsed : []
}

/** 解析精读阶段的命中结果 */
function extractHits(raw: string): AlgorithmHit[] {
  return extractJsonArray(raw)
    .filter(isValidHit)
    .map((hit) => ({
      relPath: hit.relPath,
      title: hit.title,
      summary: hit.summary,
    }))
}

function isValidHit(hit: unknown): hit is AlgorithmHit {
  if (typeof hit !== 'object' || hit === null) return false
  const h = hit as Record<string, unknown>
  return (
    typeof h.relPath === 'string' &&
    h.relPath.length > 0 &&
    typeof h.title === 'string' &&
    typeof h.summary === 'string'
  )
}