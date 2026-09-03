/**
 * 冒烟测试：不经过 MCP 协议，直接跑一遍 扫描 → 检索 → 拼链接 的核心链路。
 * 用法：npm run smoke -- "最长上升子序列怎么写"（提问可选，默认值见下）
 */
import { loadConfig } from './config.ts'
import { scanAlgorithmFiles } from './scanner.ts'
import { buildGithubUrl } from './github.ts'
import { retrieveAlgorithms } from './retriever.ts'

const config = loadConfig()

console.log('=== mcp-algorithm 冒烟测试 ===')
console.log(`算法库目录 : ${config.algorithmDir}`)
console.log(`DeepSeek   : ${config.deepseekApiKey ? '已配置' : '未配置'} / ${config.deepseekModel}`)
console.log(`GitHub     : ${config.githubRepo} (${config.githubBranch})`)

const fileList = await scanAlgorithmFiles(config.algorithmDir)
console.log(`扫描结果   : ${fileList.length} 个文件`)
if (fileList.length === 0) {
  console.error('算法库为空或路径不正确，请检查 ALGORITHM_DIR 配置。')
  process.exit(1)
}

if (!config.deepseekApiKey) {
  console.error('\n未配置 DEEPSEEK_API_KEY，跳过真实检索。')
  console.error('请在项目根目录创建 .env（参考 .env.example）后重试。')
  process.exit(1)
}

const query = process.argv[2] ?? '最长上升子序列怎么写'
console.log(`\n提问      : ${query}`)

try {
  const hits = await retrieveAlgorithms(config, fileList, query)
  console.log(`命中 ${hits.length} 条：`)
  for (const hit of hits) {
    console.log(`- ${hit.title}`)
    console.log(`  文件  : ${hit.relPath}`)
    console.log(`  说明  : ${hit.summary}`)
    console.log(`  GitHub: ${buildGithubUrl(config.githubRepo, config.githubBranch, hit.relPath)}`)
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`\n检索失败：${message}`)
  process.exit(1)
}
