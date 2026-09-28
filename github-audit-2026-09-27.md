# GitHub 账号审计 · lmliheng

生成时间：2026-09-27 · 数据来源：GitHub REST + GraphQL API（只读），全部指标来自实时查询

> **后续变更（2026-09-27，审计之后）**：按用户指示删除了 22 个仓库（清单与编号见 `repo-list-numbered.md`），账号仓库数 39 → **17**（自有 12 + fork 5，公开 15 / 私有 2）。因此本文中"39 个仓库""37 public / 2 private""19 个提交数 <20"等计数反映的是**删除前**的状态。安全项 1、7、10 与部分质量结论需按删除后的状态重新理解（见各条目附注）。

---

## 1. 账号概览

| 项目 | 值 |
| --- | --- |
| 登录名 / 昵称 | `lmliheng` / liheng |
| 公司 / 地区 | 中南大学 / 中国·湖南省长沙市 |
| 个人简介 | 主要关注 @vuejs @langchain 等；主要方向：Agent 自我进化、Vue 生态、Agent 应用、模型训练微调 |
| 主页 / 邮箱 | 个人主页（blog）**未填写**；公开邮箱未设置 |
| 社交链接 | https://x.com/lmliheng 、 https://www.npmjs.com/~lmliheng |
| 注册时间 | 2024-02-06（账号约 2 年 7 个月） |
| 套餐 | Free |
| 关注 / 粉丝 | 关注 10，粉丝 13，Star 过 5 个仓库，Watch 16 个 |
| Gist | 0 |
| 两步验证（2FA） | **已开启** ✅ |
| 置顶仓库 | algorithm、AgentCode、JScreator、vue-mini |
| Profile README | 有（`lmliheng/lmliheng`，59 次提交） |

## 2. 运营状态

**产出节奏（贡献统计）**

| 年份 | 提交 | PR | Issue | 参与评审 | 涉及仓库 |
| --- | --- | --- | --- | --- | --- |
| 2024 | 202 | 11 | 13 | 0 | 13 |
| 2025 | **11** | 2 | 3 | 0 | 4 |
| 2026（至今） | **644** | 1 | 10 | 0 | 22 |

- 近 12 个月总贡献 **687**；最近 30 天里只有 3 天没有提交，属于**高频活跃**状态。
- 2025 年几乎停摆（全年 11 次提交），2026 年恢复并大幅拉高，是典型的"休整—爆发"曲线。
- 2026 年新建 **27 个仓库**（占全部仓库 69%），说明当前处于快速试错期：开新项目很快，沉淀相对少。
- 自有提交（不含 fork 上游）**937 次**，作者全部是你自己；三年里 **PR 评审 0 次**、被他人合入的 PR 极少 → 纯单人开发模式，没有协作/评审环节。

**仓库活跃度**

- 2026-09 有提交的仓库 14 个：algorithm、obsidian-notes、AgentCode、LianjinTai、penguin-harness、llm、lmliheng、qwen-code、WeKnora、BrowserSkill、vue-mini、JScreator、GDPevo、Docker-files。
- 单仓库提交量前列：algorithm（476，其中你的提交 391）、qwen-code（9966，fork 上游累计）、WeKnora（3085，fork）、leetcode-solu（1456，fork）、docmost（1125，fork）、penguin-harness（572，fork）、BrowserSkill（521，fork）。
  注意：**fork 仓库的提交数包含上游历史**，不代表你的产出。
- 11 个仓库超过 6 个月没有提交（code、Wave-Analyst、DoQ、lihe-engine、onlylink、mianshiwang-nuxt、FastWebServer、Magnetotelluric-Signal-Processing、document、CmdUtils、icon）。

**社区影响**

- 收到 Star 合计 **132**，主要来自两个 C 语言仓库：FastWebServer（68★）、CmdUtils（54★）；其余 8 个仓库各 1–2★。
- 被 fork 2 次；没有外部贡献者在你自有仓库贡献过代码（contributors 均为 1–3 人，且多为你自己/机器人）。
- 有 5 个 issue 长期未处理，最老的从 2024-06 挂到现在：CmdUtils #1/#2/#3、DiskCleaner #1、lmliheng #1。

## 3. 仓库数量与质量

**总量**：39 个仓库 = 自有 24 + Fork 15；公开 37、私有 2（obsidian-notes、LianjinTai）；已归档 3（vue-mini、DiskCleaner、learn）。

**质量分布**

| 指标 | 结果 |
| --- | --- |
| 提交数 ≥50 | 13 个 |
| 提交数 20–49 | 7 个 |
| 提交数 <20 | **19 个（49%）** |
| 体积 <200 KB（近乎空仓） | 9 个 |
| 有 README | 38/39（私有仓 obsidian-notes 无） |
| 有 LICENSE | **21/39**（缺 18 个） |
| 有 Topics 标签 | **7/39** |
| 有仓库描述 | 36/39（lmliheng、Wave-Analyst、Magnetotelluric-Signal-Processing 缺） |
| 有 CI 工作流 | 12/39；但**只有 algorithm 真正跑过 Actions**（439 次运行，最近一次 success，2026-09-27）。其余要么是 fork（GitHub 默认禁用 fork 的 workflow），要么从未触发（document、CmdUtils） |
| 启用分支保护 | **0/39** |
| 发过 Release | 3 个（CmdUtils 20、code 7、FastWebServer 2） |
| 语言分布 | TypeScript 8、HTML 6、Vue 5、JavaScript 4、Python 4、C 2、Java 2、Go/TeX/C++/Dockerfile 各 1 |

**结论**：账号是"多而浅，头部有两个真正的作品"的结构。

- 亮点：FastWebServer（68★，C）、CmdUtils（54★，C，20 个 Release）、algorithm（每天提交、有 CI、有 README/描述/topics）、AgentCode（Agent 方向主推项目）。
- 短板：一半仓库是一次性练手或 fork 存档；无 LICENSE / 无 topics 的仓库占了大多数，等于放弃了被别人发现和合法复用的机会；除 algorithm 外没有可持续运行的工程实践（无 CI 实跑、无分支保护、无 Release）。

## 4. 安全评估

| # | 级别 | 问题 | 说明 |
| --- | --- | --- | --- |
| 1 | **严重** | `.env` 泄露真实凭据（仓库已删，凭据仍需轮换） | `lmliheng/coding-words`（公开）默认分支上的 `back/.env` 明文提交了 `DB_HOST/DB_USER`、`DB_PASSWORD=1355…597a`（形似手机号+字符）、`JWT_SECRET=liheng`，公开约 4 个月（2026-05-17 之后）。该仓库已于 2026-09-27 删除，GitHub 上不再可见，但**泄露已经发生：必须轮换 DB 密码与 JWT 密钥**（删除仓库不等于止损） |
| 2 | **高** | 提交身份泄露私人信息 | 全局身份 `LiHeng <0110230306@csu.edu.cn>`（含学号）；当前工作区 `algorithm` 的仓库级配置又把邮箱覆盖为 `liheng2137@126.com`（你在 GitHub 上设为 private 的邮箱），已写进公开提交历史。任何人 `git log` 即可看到 |
| 3 | **高** | 令牌权限过大且两份 | `gh auth status` 显示两个 classic PAT（一个在环境变量、一个在系统凭据库），权限含 `admin:enterprise`、`admin:org`、`delete_repo`、`delete:packages`、`audit_log`、`workflow`、`copilot` 等。任一泄漏等于账号全失守 |
| 4 | **中** | SSH 密钥 13 把且无人维护 | 其中 7 把由外部工具自动创建（`ugit-created-ssh-key-donnot-delete-*`，最后一组是主机/IP 后缀：LAPTOP-25F0HB0O、MHY005、MHY026、WIN-UQ96GR9R0C8、XYG069 等），另有 cloudstudio 1 把；**3 把从未使用过**（cloudstudio、SK-20260702WBGV、MHY005）；4 把标题只有 "1"~"4"，无法判断归属 |
| 5 | **中** | 全部仓库未启用依赖告警 | Dependabot alerts / security updates：**0/39** 开启。Node/Python 项目（AgentCode、JScreator、ww-server 等）的依赖漏洞不会被提醒 |
| 6 | **低** | 提交无签名 | 没有 GPG 密钥、也没有 SSH 签名密钥，无法证明提交来源 |
| 7 | **低** | 无分支保护 | 0/39 仓库保护默认分支，`algorithm` 这类每天推送的仓库存在误 force-push 风险 |
| 8 | 信息 | 密钥扫描告警 | 37 个公开仓库已被 GitHub 默认的密钥扫描覆盖，当前开放告警仅 1 条：`WeKnora` 的 `miniprogram/project.config.json` 命中"腾讯微信 API AppID"，来自 fork 上游、非你引入。2 个私有仓库（obsidian-notes、LianjinTai）无密钥扫描覆盖（Free 套餐不支持） |

**做得对的地方**：账号级 2FA 已开启；令牌未出现在代码或远程 URL 中；公开仓库默认的密钥扫描与 push protection 大多处于 enabled（37/39、34/39）；未发现 `ghp_`/`sk-`/`AKIA`/私钥等真实密钥被提交。

## 5. 建议行动清单

**P0（本周内）**
1. 轮换 `coding-words` 的数据库密码与 `JWT_SECRET`，改用环境变量注入；同时确认该密码未在别处复用。
2. 把提交邮箱改为 GitHub noreply（`159103134+lmliheng@users.noreply.github.com`）：`git config --global user.email`，并对 `algorithm` 等仓库执行 `git config user.email`（该仓库目前被本地配置覆盖）。历史提交无法改写而不重写历史，重点是**不要再新增泄漏**。

**P1（本月内）**
3. 用 fine-grained PAT 取代宽权限 classic token，只授 `Contents`/`Issues`/`Pull requests`，并删除不用的旧 token。
4. 清理 SSH 密钥：删掉 `last_used` 为空或 6 个月未用、且不属于当前机器的条目。
5. 给 AgentCode、JScreator、ww-server、llm 等活跃项目开启 Dependabot alerts + security updates。

**P2（持续）**
6. 给 18 个缺 LICENSE 的仓库补上（MIT 最省事），给主要仓库补 Topics（提高可发现性）。
7. 给 `algorithm` 等活跃仓库开启分支保护（至少禁止 force push）。
8. 让 CI 真正跑起来：目前只有 `algorithm` 有 Actions 运行记录，其他自有仓库的工作流要么从未触发要么是 fork 的残留。
9. 归档或删除 19 个提交数 <20 的废弃仓库，让主页聚焦在 4–6 个真正的作品上；处理挂了两年的 5 个 open issue（回答或关闭并说明原因）。
10. 补全个人主页 blog 字段与公开邮箱，和 npm / X 账号保持一致，提升"可联系度"。
