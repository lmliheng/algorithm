import type { AppConfig } from './config.ts'

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface DeepSeekResult {
  content: string
  latencyMs: number
}

/** 兼容 OpenAI 格式的 chat/completions 单次调用（与 @lmliheng/agent 的 callDeepSeek 同模式） */
export async function callDeepSeek(
  config: AppConfig,
  messages: ChatMessage[],
): Promise<DeepSeekResult> {
  if (!config.deepseekApiKey) {
    throw new Error('缺少 DEEPSEEK_API_KEY，请先在 .env 中完成配置。')
  }

  const startedAt = Date.now()
  const response = await fetch(config.deepseekBaseUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.deepseekApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: config.deepseekModel, messages }),
  })

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[]
  }

  if (!response.ok) {
    throw new Error(`DeepSeek 调用失败：${response.status} ${JSON.stringify(data)}`)
  }

  const content = data.choices?.[0]?.message?.content
  if (!content) {
    throw new Error(`DeepSeek 没有返回有效消息：${JSON.stringify(data)}`)
  }

  return { content, latencyMs: Date.now() - startedAt }
}