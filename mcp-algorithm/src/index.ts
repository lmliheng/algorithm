import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { loadConfig } from './config.ts'
import { scanAlgorithmFiles } from './scanner.ts'
import { buildGithubUrl } from './github.ts'
import { retrieveAlgorithms, type AlgorithmHit } from './retriever.ts'

const config = loadConfig()


// 启动时扫描一次算法库，生成文件清单供 Agent 检索。
// stdio 服务器不能往 stdout 写日志（会污染协议），一律用 stderr。
const fileList = await scanAlgorithmFiles(config.algorithmDir)
console.error(`[mcp-algorithm] 已加载算法库 ${config.algorithmDir}，共 ${fileList.length} 个文件`)
const server = new McpServer({ name: 'mcp-algorithm', version: '0.1.0' })

server.registerTool(
  'query_algorithm',
  {
    title: '查询算法题解',
    description:
      '根据自然语言提问，在用户的算法库中检索最相关的算法题解文件，返回文件路径、GitHub 链接和一句话说明。',
    inputSchema: {
      query: z.string().describe('用户关于算法的自然语言提问，例如：最长上升子序列怎么写'),
    },
  },
  async ({ query }) => {
    try {
      const hits = await retrieveAlgorithms(config, fileList, query)
      const results = hits.map((hit) => enrich(hit))
      return {
        content: [{ type: 'text' as const, text: formatResults(results) }],
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      return {
        content: [{ type: 'text' as const, text: `检索失败：${message}` }],
        isError: true,
      }
    }
  },
)

interface EnrichedHit extends AlgorithmHit {
  githubUrl: string
}

function enrich(hit: AlgorithmHit): EnrichedHit {
  return {
    ...hit,
    githubUrl: buildGithubUrl(config.githubRepo, config.githubBranch, hit.relPath),
  }
}

function formatResults(results: EnrichedHit[]): string {
  if (results.length === 0) {
    return '未在算法库中找到相关题解。可以换个说法再试，或直接告诉我题目关键词。'
  }
  const lines = results.map(
    (r, i) =>
      `${i + 1}. ${r.title}\n` +
      `   文件：${r.relPath}\n` +
      `   说明：${r.summary}\n` +
      `   GitHub：${r.githubUrl}`,
  )
  return lines.join('\n')
}

const transport = new StdioServerTransport()
await server.connect(transport)
