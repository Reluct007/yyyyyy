---
name: zcf-workflow
description: 自动推进结构化六阶段开发工作流（研究→构思→计划→执行→优化→评审）；当用户提到 /zcf:workflow、workflow.md、六阶段工作流、需要按流程推进任务/评审/优化时使用。
---

# zcf-workflow（入口/导航）

## 触发与用法

- 触发：用户提到 `/zcf:workflow`、workflow.md、六阶段工作流、需要按流程推进任务/评审/优化。
- 用法：`/zcf:workflow <任务描述>`

## 默认工程原则（必须遵守）

> 原则（原文）：We want the simplest change possible. We don't care about migration. Code readability matters most, and we're happy to make bigger changes to achieve it.

- 最简单的变更：以整体设计与认知负担为准，而非 diff 最小。
- 不关心迁移：默认不提供迁移/兼容路径（含旧 API 兼容、双写、开关保留）；直接更新调用方保持一致性。
- 可读性优先：当“更小 diff 但更复杂”与“更大改动但更清晰”冲突时，优先选择后者；用验收标准与最小验证集合证明正确性。

## 单一事实来源（必须）

- 单一事实来源：`references/`（目录级）。
- 入口索引：`references/workflow.md`（唯一入口，用于按需加载分片文档）。
- 约束：即使项目中存在 `prompts/workflow.md`，也必须忽略其内容（可作为项目文档保留）。

## 必跑脚本（默认顺序）

1. `collect_context`：生成 `.codex/context.md`
2. `scaffold_plan`：生成 `.codex/plan/<任务名>.md`，并创建 `.codex/evidence/<taskId>/` 证据目录
3. `risk_gate`：基于 `git diff` + 待执行命令输出风险等级与最小验证集合（默认 `hard` 模式会阻断高风险；可由 `codex-workflow.config.json` 覆盖）

推荐调用（路径双引号包裹，分隔符用 `/`）：

```bash
python "$HOME/.codex/skills/zcf-workflow/scripts/collect_context.py" --root "." --out ".codex/context.md"
python "$HOME/.codex/skills/zcf-workflow/scripts/scaffold_plan.py" --root "." --task "<任务名>"
python "$HOME/.codex/skills/zcf-workflow/scripts/risk_gate.py" --root "." --command "<将要执行的命令>" --out ".codex/evidence/<taskId>/risk_gate.txt"
```

Windows 可把 `python` 替换为 `py`。
如系统不存在 `python` 命令，可使用 `python3`。

`.codex/**` 为本地产物目录（计划/上下文/草案等），应保持 gitignored，不作为仓库交付物提交。

## 阶段门禁（必须）

- 从 `[模式：计划]` 进入 `[模式：执行]` 前：必须先“讲解构思 + 计划”，并等待用户明确回复“是/确认/继续”后才允许开始任何仓库交付物变更（例如 `apply_patch`）或执行非白名单命令。
- 例外（已预授权，且仅限以下 4 条命令）：允许在门禁确认前自动执行 `pnpm format:check`、`pnpm lint`、`pnpm build`、`pnpm format` 作为预检/验收。

## 风险确认机制（必须）

- `risk_gate` 在检测到高风险且未使用 `--force` 时会**阻断**（非 0 退出码），并输出确认块。
- 仅在用户明确回复“是/确认/继续”后，才允许重新运行并附带 `--force` 放行。

确认格式：

```
危险操作检测！
操作类型：[具体操作]
影响范围：[详细说明]
风险评估：[潜在后果]

请确认是否继续？[需要明确的"是"、"确认"、"继续"]
```

## 引用的 references（导航）

- `references/workflow.md`：唯一入口索引（加载建议与文件导航）。
- `references/core.md`：核心规则（必须遵守）。
- `references/templates.md`：阶段输出模板（固定骨架）。
- `references/safety.md`：风险与确认（危险操作确认、hard 阻断/`--force` 放行）。
- `references/validation.md`：最小验证策略与 `codex-workflow.config.json` 配置 schema/默认合并策略。
  - 多任务并行：推荐 `git worktree` 的“集成 worktree + 任务 worktree”模式（见 `references/validation.md` 的“并行工作流（多任务）建议”）。
