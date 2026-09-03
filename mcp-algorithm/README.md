# mcp-algorithm

Agent 驱动的 MCP 服务器：根据自然语言提问，在你的算法库中检索最相关的题解，返回文件路径 + GitHub 链接。

## 功能

- 单个 MCP 工具 `query_algorithm`：入参即用户原话提问
- Agent 两阶段检索：
  1. **粗筛**：DeepSeek 从完整文件路径清单（714 个）中挑 20 个候选
  2. **精读**：读取候选文件真实代码，DeepSeek 精挑最相关的 1-5 个并写说明
  这样即使文件名无意义（如 `3286.js`），也能靠代码内容正确识别
- 每个结果包含：题目名、仓库相对路径、一句话说明、GitHub 链接
- 链接自动拼接：`https://github.com/lmliheng/algorithm/blob/master/<相对路径>`（零维护）

## 技术栈

- TypeScript + Node 24（原生直跑 TS，零构建）
- 官方 `@modelcontextprotocol/sdk`（stdio 传输）
- DeepSeek chat/completions（与 `@lmliheng/agent` 同款调用模式）

## 目录结构

```
mcp-algorithm/
├── src/
│   ├── index.ts      # MCP 服务器入口（注册 query_algorithm 工具）
│   ├── config.ts     # 环境变量配置
│   ├── scanner.ts    # 递归扫描算法库，生成相对路径清单
│   ├── deepseek.ts   # DeepSeek 客户端
│   ├── retriever.ts  # Agent 两阶段检索（粗筛路径 + 精读代码）+ JSON 解析
│   ├── github.ts     # GitHub 链接拼接
│   └── smoke.ts      # 冒烟测试（不经过 MCP 协议直跑核心链路）
├── .env.example      # 环境变量模板
└── package.json
```

## 安装与配置

```bash
npm install
copy .env.example .env
```

编辑 `.env`：

```env
# 必填
DEEPSEEK_API_KEY=sk-xxx

# 可选（默认值见下）
# DEEPSEEK_MODEL=deepseek-v4-flash
# ALGORITHM_DIR=C:\Users\Lenovo\Desktop\project\algorithm
```

## 冒烟测试

配好 Key 后，直接跑一遍核心链路（扫描 → 检索 → 拼链接）：

```bash
npm run smoke -- "最长上升子序列怎么写"
```

无 Key 时也会先验证扫描链路（算法库路径、文件数量），并给出清晰的缺 Key 提示。

## 接入 Qwen Code

在 Qwen Code 的 MCP 配置中添加：

```json
{
  "mcpServers": {
    "mcp-algorithm": {
      "command": "node",
      "args": ["--env-file-if-exists=.env", "src/index.ts"],
      "cwd": "C:\\Users\\Lenovo\\Desktop\\mcp-algorithm"
    }
  }
}
```

启动后即可在对话中直接提问，例如：

- 「最长上升子序列怎么写」
- 「滑动窗口的最大值用哪个文件」
- 「有没有并查集的题解」

## 配置项

| 环境变量 | 默认值 | 说明 |
| --- | --- | --- |
| `DEEPSEEK_API_KEY` | （无） | DeepSeek API Key，必填 |
| `DEEPSEEK_BASE_URL` | `https://api.deepseek.com/chat/completions` | API 端点 |
| `DEEPSEEK_MODEL` | `deepseek-v4-flash` | 模型名 |
| `ALGORITHM_DIR` | `~/Desktop/project/algorithm` | 算法库根目录 |
| `GITHUB_REPO` | `lmliheng/algorithm` | GitHub 仓库 |
| `GITHUB_BRANCH` | `master` | 链接使用的分支 |
| `MAX_RESULTS` | `5` | 检索结果上限 |
