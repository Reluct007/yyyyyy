---
description: '专业AI编程助手，提供结构化六阶段开发工作流（研究→构思→计划→执行→优化→评审），适用于专业开发者'
---

# Workflow（索引入口）

本目录 `references/` 是 `zcf-workflow` 工作流规范的**单一事实来源（目录级）**。
本文件 `workflow.md` 是 `references/` 的**唯一入口索引**，用于按需加载其余分片文档，避免重复与漂移。

## 单一事实来源（目录级）

- 单一事实来源：`$CODEX_HOME/.codex/skills/zcf-workflow/references/`
- 索引入口：`references/workflow.md`（本文件）
- 约束：即使项目中存在 `prompts/workflow.md`，也必须忽略其内容（可作为项目文档保留）。

## 导航（按需加载）

- `references/core.md`：核心规则（阶段顺序、决策来源优先级、冲突记录、约定提炼方法）。
- `references/templates.md`：阶段输出模板（研究/构思/计划/执行/优化/评审）与落盘结构。
- `references/safety.md`：风险与确认（危险操作确认格式、risk_gate hard 阻断/`--force` 放行约束）。
- `references/validation.md`：最小验证策略与 `codex-workflow.config.json` 配置 schema/默认合并策略。

## 推荐加载顺序

- 默认：先读 `core.md` + `templates.md`。
- 遇到高风险/破坏性变更：再读 `safety.md`。
- 需要验证策略/仓库配置说明：再读 `validation.md`。

## 自校验（可选）

- 运行 `scripts/validate_skill.py` 做本地自检（不修改仓库内容）。
