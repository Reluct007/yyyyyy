# 验证策略（最小但足够）

## 默认策略

- docs-only 变更：可跳过验证（仍建议确保文档/索引引用有效）。
- 其它变更：
  1. 先运行 `risk_gate` 评估风险并推导“最小验证集合”。
  2. 若 `risk_gate` 被 `hard` 模式阻断：先走 `references/safety.md` 的确认流程，再用 `--force` 重新运行 `risk_gate` 获取建议集合。
  3. 执行建议的最小验证集合（以仓库 `package.json scripts` 为准）。
  4. 命令输出**只落盘**到 `.codex/evidence/<taskId>/`，并在 `.codex/plan/<任务名>.md` 的“证据索引（E#）”与“验证矩阵（AC#→命令→证据E#）”中登记；plan 正文只写“路径 + 结论”。

## 命令输出落盘（推荐）

- `risk_gate` 输出：优先使用 `--out` 写入 `.codex/evidence/<taskId>/risk_gate.txt`，便于留档与复盘。
- 验证日志：建议按脚本/命令分别落盘（例如 `lint.log`、`build.log`），并在 plan 中用 E# 引用。
- 若涉及“性能/资源特征变化”或“行为变化”：必须同时落盘 Baseline 与 Compare 证据（例如 `baseline-*.log` / `compare-*.log`），并在 plan 中给出对比验证方案与判定口径。

## 最小验证集合推导（约定）

- 默认候选脚本名：`format:check`、`lint`、`build`。
- 实际执行命令由 `risk_gate` 从 `package.json scripts` 推导；缺失则自动跳过。
- `build` 通常在变更触及依赖/配置/关键链路时需要；若仅 docs-only 可跳过。

## 并行工作流（多任务）建议

当你在同一个工作区同时推进多个 zcf-workflow 时：
- `git diff` 会混入其它任务的变更，导致 `risk_gate` 的风险判定与最小验证集合被“污染”。
- `pnpm lint` / `pnpm build` 在多数仓库是全量校验，只要任一任务仍处于 WIP，验收阶段就可能持续失败，从而卡住收敛。

推荐策略（强烈建议，KISS）：
- **每个 workflow 使用独立分支 + 独立工作树（git worktree）**，让 `risk_gate`/验证只针对该任务的变更集。
- **“集成 worktree + 任务 worktree”模式（推荐默认）**：
  - 集成 worktree：保持在 `main`（或 `integration`）且尽量干净；只做合并/变基与最终全量验证。
  - 任务 worktree：每个任务一个目录 + 一个分支（例如 `zcf/<task>`），独立开发与自测。
  - 示例（仅供参考，按你的目录结构调整；路径用双引号包裹）：
    - 在集成 worktree 创建任务 worktree（以 `main` 为基线）：
      - `git worktree add "../worktrees/<task>" -b "zcf/<task>" "main"`
    - 在任务 worktree 开发与验证：
      - `pnpm install`（首次进入该 worktree 或 lockfile 变化时）
      - `pnpm format:check` / `pnpm lint` / `pnpm build`
    - 回到集成 worktree 做集成与验收：
      - 合并/变基该任务分支（按团队约定选择 merge 或 rebase）
      - 再跑一次全量 `pnpm format:check` / `pnpm lint` / `pnpm build` 作为最终验收

备选策略（无法隔离时）：
- **串行验收/集成窗口**：允许多个 workflow 并行推进，但只在“集成窗口”统一跑全量 `pnpm lint/build`；单个 workflow 的评审可记录“全量验证被其它 WIP 阻断”，并明确后续需要在集成窗口补齐的验证项。
- 当全量验证失败且明显非本任务范围：只落盘日志与归因，不扩散修复范围；用“隔离工作树/回退其它 WIP 变更”作为首选解法。

## 仓库级配置：`codex-workflow.config.json`（可提交）

为支持多仓库复用，可在仓库根目录提交 `codex-workflow.config.json` 定制 `risk_gate` 行为。

### schemaVersion（最小 schema）

- `schemaVersion`：整数，当前支持 `1`。
- 兼容策略：
  - 缺失：视为 `1`（向后兼容）。
  - 大于 `1`：尽力按 `1` 解析已知字段并给出警告（不保证完整语义）。
  - 非整数：视为配置错误并回退到默认行为（脚本会提示错误）。

### riskGate 字段

```json
{
  "schemaVersion": 1,
  "riskGate": {
    "mode": "hard",
    "exitCode": 3,
    "useBuiltins": true,
    "validationScripts": ["format:check", "lint", "build"],
    "highRiskFilePrefixes": ["src/app/api/", "src/pages/api/"],
    "highRiskFileExact": ["src/middleware.ts"],
    "highRiskPathTokens": ["auth", "billing", "stripe", "db", "migration"],
    "highRiskCommandTokens": ["git push", "git reset --hard", "git commit", "db:migrate"]
  }
}
```

- `mode`：`hard`（默认）/ `soft`
  - `hard`：高风险直接阻断；需确认后用 `--force` 放行。
  - `soft`：仅提示，不阻断。
- `exitCode`：阻断时的退出码（默认 `3`，范围建议 1–125）。
- `useBuiltins`：是否启用内置启发式（默认 `true`）。
- `validationScripts`：用于推导最小验证集合的脚本名列表（默认 `["format:check","lint","build"]`）。
- `highRiskFilePrefixes` / `highRiskFileExact` / `highRiskPathTokens` / `highRiskCommandTokens`：自定义高风险匹配规则。

### 默认合并策略（向后兼容）

- 配置文件只需提供覆盖项；未提供的字段使用脚本内置默认值。
- 未识别字段会被忽略（保留将来扩展空间）。
