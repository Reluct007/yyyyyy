from __future__ import annotations

import argparse
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path

from repo_config import load_repo_config


INVALID_FILENAME_CHARS = re.compile(r'[<>:"/\\\\|?*]+')


def safe_filename(value: str) -> str:
    value = value.strip()
    value = INVALID_FILENAME_CHARS.sub("-", value)
    value = re.sub(r"\s+", "_", value)
    value = value.strip("._-")
    return value or "task"


def run(cmd: list[str], cwd: Path) -> str | None:
    try:
        completed = subprocess.run(
            cmd,
            cwd=str(cwd),
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
    except FileNotFoundError:
        return None
    if completed.returncode != 0:
        return None
    return completed.stdout.strip()


def format_bool(value: bool) -> str:
    return "是" if value else "否"


def plan_template(task_name: str, now: str, root: Path, task_id: str) -> str:
    repo_root = root.as_posix()
    git_branch = run(["git", "rev-parse", "--abbrev-ref", "HEAD"], cwd=root)
    git_commit = run(["git", "rev-parse", "--short", "HEAD"], cwd=root)
    git_dirty = run(["git", "status", "--porcelain"], cwd=root)

    git_line = "否（非 git 仓库或 git 不可用）"
    if git_branch and git_commit is not None:
        git_line = f"{git_branch} @ {git_commit}（dirty={format_bool(bool(git_dirty))}）"

    repo_config = load_repo_config(root)
    config_line = "未发现"
    if repo_config.path:
        schema = f"schemaVersion={repo_config.schema_version}" if repo_config.schema_version is not None else "schemaVersion=unknown"
        config_line = f"{repo_config.path.relative_to(root).as_posix()}（{schema}）"

    conventions = "docs/CONVENTIONS.md" if (root / "docs" / "CONVENTIONS.md").exists() else "未发现"
    agents = "AGENTS.md" if (root / "AGENTS.md").exists() else "未发现（可用 collect_context 定位）"

    evidence_dir = f".codex/evidence/{task_id}"

    return f"""# {task_name}

> taskId：{task_id}
> 生成时间：{now}
> 仓库根目录：{repo_root}
> Git：{git_line}
> 仓库级配置：{config_line}
> 上下文快照：`.codex/context.md`（由 collect_context 生成）
> 证据目录：`{evidence_dir}/`（命令输出/差异快照等只落盘引用）
> 约定索引：{conventions}
> AGENTS 线索：{agents}

## 0. 输入与范围（可溯源）
- 工程原则（默认；除非需求显式覆盖）：最简单变更；不做迁移/兼容路径；可读性优先（必要时接受更大范围改动）。
- 需求/问题描述：...
- 目标用户/使用场景：...
- 范围：
  - 包含：...
  - 不包含：...
- 相关链接（issue/PR/文档）：...

## 1. 证据索引（E#，强制引用）
规则：
- 所有关键结论/决策/验收判定必须引用 E#（例如：依据 E3/E7）。
- 命令输出只落盘到 `{evidence_dir}/`，正文仅写“路径 + 结论摘要”。
- 最佳实践来源优先级：仓库既有约定与代码模式 > AGENTS 约束 > 官方文档（Context7）> 经验推断（推断必须可验证）。

- E1（项目画像快照）：`.codex/context.md`
  - 类型：command-output
  - 摘要：...
- E2（仓库约定索引）：{conventions}
  - 类型：repo-doc
  - 摘要：...
- E3（AGENTS 约束线索）：{agents}
  - 类型：repo-constraint
  - 摘要：...
- E4（关键配置/护栏摘要）：`eslint.config.*` / `tsconfig.json` / `next.config.*` / `package.json scripts`
  - 类型：repo-config
  - 摘要：...
- E5（官方/最佳实践：Context7）：`{evidence_dir}/context7.md`（或“不适用：... + 替代验证方式”）
  - 类型：context7
  - 摘要：...
- E6（risk_gate 输出）：`{evidence_dir}/risk_gate.txt`
  - 类型：command-output
  - 摘要：...
- E7（git diff 快照）：`{evidence_dir}/patch.diff`
  - 类型：command-output
  - 摘要：...
- E8（验证日志：lint）：`{evidence_dir}/lint.log`
  - 类型：command-output
  - 摘要：...
- E9（验证日志：build）：`{evidence_dir}/build.log`
  - 类型：command-output
  - 摘要：...

## 2. 目标与成功标准（验收）
- AC1：...
- AC2：...

## 3. 验证矩阵（验收 AC# → 命令 → 证据E#）
| AC# | 验收项 | 命令 | 证据(E#) | 判定口径 |
| --- | --- | --- | --- | --- |
| AC1 | ... | `<命令>` | E8 | ... |
| AC2 | ... | `<命令>` | E9 | ... |

## 4. 风险与回滚（必须）
- 风险清单：...
- 兼容/迁移/灰度策略（如需；默认不做）：...
- 回滚策略：...
- 数据回滚（如需）：...

## 5. 基线与对比验证（仅当优化/行为变化；否则写“不适用”）
不适用 / 适用：<选择其一并补全>

- Baseline（变更前）：
  - 指标/口径：...
  - 命令：`<命令>`
  - 证据：E?（`{evidence_dir}/baseline-*.log`）
- Compare（变更后）：
  - 指标/口径：...
  - 命令：`<命令>`
  - 证据：E?（`{evidence_dir}/compare-*.log`）
- 结论：<收益/无回归/不通过>

## 6. 方案与关键决策（概览，可追溯）
- 方案 A：...
  - 优点：...
  - 风险：...
- 方案 B：...
  - 优点：...
  - 风险：...
- 最终选择：...

## 7. 决策记录（D#，ADR 化，强制）
- D1：<标题>
  - 背景：...
  - 备选：...
  - 决策：...
  - 依据（E#）：E1/E2/E5 ...
  - 影响：...
  - 验证：AC# / 命令 / 证据(E#)
  - 回滚：...
  - 状态：提议 / 采纳 / 废弃

## 8. 实施步骤（原子化，可执行）
1. <文件/函数/逻辑概要>
   - 预期变更：...
   - 验收点：...
   - 风险/回滚点：...
2. ...

## 9. 风险闸门（risk_gate，事实记录）
- 阶段门禁确认（计划→执行，强制）：未确认 / 已确认（时间：...，原话：...）
- 命令：`python "$HOME/.codex/skills/zcf-workflow/scripts/risk_gate.py" --root "." --command "<将要执行的命令>" --out "{evidence_dir}/risk_gate.txt"`
- 证据：E6（`{evidence_dir}/risk_gate.txt`）
- 输出摘要：<风险等级/触发原因/最小验证集合>
- 若被阻断：
  - 用户确认记录：...
  - 放行命令：`python ".../risk_gate.py" ... --force --out "{evidence_dir}/risk_gate.txt"`

## 10. 验证/命令记录（证据引用）
- `<命令>` → <结论>（证据：E#，时间：...）

## 11. 变更文件（事实）
- `path/to/file`（新增/修改/删除） - <原因/影响>

## 12. 文档/配置同步
- 更新了哪些文档/配置（如有）：...
- 新增/变更环境变量（如有）：...
- 部署/上线注意事项（如有）：...

## 13. 未决问题
- ...

## 附录 A. 优化记录（[模式：优化]，必填：无则写“无”）
- 是否进入优化阶段：是 / 否
- 行为等价重构（可直接做；每条给出涉及文件/函数，并引用证据 E#）：...
- 性能/资源特征变化（需基线 + 对比验证；引用第 5 节）：不适用 / ...
- 行为变化（需确认 + 基线 + 对比验证；引用第 5 节）：不适用 / ...
- 结论：收益 / 无回归 / 不通过（若不通过：记录回滚点与后续动作）
"""


def main() -> int:
    parser = argparse.ArgumentParser(description="生成 .codex/plan/<任务名>.md 模板文件。")
    parser.add_argument("--root", default=".", help="项目根目录（默认当前目录）")
    parser.add_argument("--task", required=True, help="任务名（用于标题与文件名）")
    parser.add_argument("--task-id", default="", help="任务 ID（用于证据目录名）；为空则自动生成")
    parser.add_argument(
        "--out",
        default="",
        help="输出路径；为空则写入 <root>/.codex/plan/<task>.md",
    )
    parser.add_argument("--force", action="store_true", help="覆盖已有文件")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    if not root.exists():
        print(f"root 不存在：{root}", file=sys.stderr)
        return 2

    now_dt = datetime.now()
    now = now_dt.strftime("%Y-%m-%d %H:%M:%S")
    auto_id = safe_filename(f"{now_dt.strftime('%Y%m%d-%H%M%S')}-{args.task}")[:80]
    task_id = safe_filename(args.task_id) if args.task_id else auto_id

    filename = f"{safe_filename(args.task)}.md"
    out_path = Path(args.out) if args.out else (root / ".codex" / "plan" / filename)
    if not out_path.is_absolute():
        out_path = (root / out_path).resolve()

    out_path.parent.mkdir(parents=True, exist_ok=True)

    evidence_dir = root / ".codex" / "evidence" / task_id
    evidence_dir.mkdir(parents=True, exist_ok=True)

    context7_path = evidence_dir / "context7.md"
    if not context7_path.exists():
        context7_path.write_text(
            "\n".join(
                [
                    "# Context7/官方最佳实践（E5）",
                    "",
                    "结论：适用 / 不适用",
                    "",
                    "## 查询记录（可追溯）",
                    "- 库与版本：...",
                    "- resolve-library-id：...",
                    "- get-library-docs：...（topic/page）",
                    "",
                    "## 关键结论（摘要）",
                    "- ...",
                    "",
                    "## 对本仓库的落地约束",
                    "- ...",
                    "",
                    "## 不适用（若选择不适用必须填写）",
                    "- 不适用理由：...",
                    "- 替代验证方式（可回放）：...",
                    "",
                ]
            ),
            encoding="utf-8",
            newline="\n",
        )

    if out_path.exists() and not args.force:
        print(f"已存在（使用 --force 覆盖）：{out_path.as_posix()}", file=sys.stderr)
        return 2

    out_path.write_text(plan_template(args.task, now, root, task_id), encoding="utf-8", newline="\n")
    print(out_path.as_posix())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
