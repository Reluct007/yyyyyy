from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

from repo_config import load_repo_config


def safe_reconfigure_stdio() -> None:
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(errors="replace")
        except Exception:  # noqa: BLE001
            pass


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def write_text(path: Path, content: str) -> None:
    path.write_text(content, encoding="utf-8", newline="\n")


def run_python(args: list[str], cwd: Path) -> subprocess.CompletedProcess:
    env = dict(os.environ)
    env["PYTHONIOENCODING"] = "utf-8"
    return subprocess.run(
        [sys.executable, *args],
        cwd=str(cwd),
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        env=env,
    )


def main() -> int:
    safe_reconfigure_stdio()

    parser = argparse.ArgumentParser(description="zcf-workflow skill 自校验（不修改仓库内容）。")
    parser.add_argument("--verbose", action="store_true", help="输出更多细节")
    args = parser.parse_args()

    skill_root = Path(__file__).resolve().parents[1]
    references_dir = skill_root / "references"
    scripts_dir = skill_root / "scripts"

    required_paths = [
        skill_root / "SKILL.md",
        references_dir / "workflow.md",
        references_dir / "core.md",
        references_dir / "templates.md",
        references_dir / "safety.md",
        references_dir / "validation.md",
        scripts_dir / "collect_context.py",
        scripts_dir / "scaffold_plan.py",
        scripts_dir / "risk_gate.py",
        scripts_dir / "repo_config.py",
    ]

    errors: list[str] = []

    def fail(message: str) -> None:
        errors.append(message)

    for p in required_paths:
        if not p.exists():
            fail(f"缺少必需文件：{p.as_posix()}")

    if errors:
        for e in errors:
            print(f"[fail] {e}")
        return 1

    # prompts/workflow.md 禁止作为事实来源：允许提及“忽略”，但不允许在“单一事实来源/对齐”语境下引用。
    banned_same_line_tokens = ("单一事实来源", "事实来源", "对齐", "以其为", "优先查", "优先查这里")
    for doc in [skill_root / "SKILL.md", *sorted(references_dir.glob("*.md"))]:
        text = read_text(doc)
        for idx, line in enumerate(text.splitlines(), start=1):
            if "prompts/workflow.md" not in line:
                continue
            if any(token in line for token in banned_same_line_tokens):
                fail(f"{doc.as_posix()}:{idx} 禁止将 prompts/workflow.md 作为事实来源/对齐目标：{line.strip()}")

    # schemaVersion 校验：支持缺失（默认 1）、拒绝非整数。
    with tempfile.TemporaryDirectory(prefix="zcf-workflow-validate-") as tmp:
        tmp_root = Path(tmp).resolve()
        config_path = tmp_root / "codex-workflow.config.json"

        write_text(
            config_path,
            json.dumps(
                {
                    "schemaVersion": 1,
                    "riskGate": {"mode": "hard", "exitCode": 7},
                },
                ensure_ascii=False,
                indent=2,
            )
            + "\n",
        )
        cfg = load_repo_config(tmp_root)
        if cfg.error:
            fail(f"schemaVersion=1 配置不应报错：{cfg.error}")
        if cfg.schema_version != 1:
            fail(f"schemaVersion=1 解析异常：{cfg.schema_version}")

        write_text(
            config_path,
            json.dumps(
                {
                    "riskGate": {"mode": "hard", "exitCode": 7},
                },
                ensure_ascii=False,
                indent=2,
            )
            + "\n",
        )
        cfg_missing = load_repo_config(tmp_root)
        if cfg_missing.error:
            fail(f"schemaVersion 缺失应向后兼容：{cfg_missing.error}")
        if cfg_missing.schema_version != 1:
            fail(f"schemaVersion 缺失时应默认按 1 解析：{cfg_missing.schema_version}")

        write_text(
            config_path,
            json.dumps(
                {
                    "schemaVersion": "bad",
                    "riskGate": {"mode": "hard", "exitCode": 7},
                },
                ensure_ascii=False,
                indent=2,
            )
            + "\n",
        )
        cfg_bad = load_repo_config(tmp_root)
        if not cfg_bad.error:
            fail("schemaVersion 非整数应报错，但未报错")

    # risk_gate hard 模式阻断 / --force 放行。
    with tempfile.TemporaryDirectory(prefix="zcf-workflow-risk-gate-") as tmp:
        tmp_root = Path(tmp).resolve()
        config_path = tmp_root / "codex-workflow.config.json"
        write_text(
            config_path,
            json.dumps(
                {
                    "schemaVersion": 1,
                    "riskGate": {"mode": "hard", "exitCode": 7},
                },
                ensure_ascii=False,
                indent=2,
            )
            + "\n",
        )

        risk_gate = scripts_dir / "risk_gate.py"
        out_rel = ".codex/evidence/validate/risk_gate.txt"
        blocked = run_python(
            [risk_gate.as_posix(), "--root", tmp_root.as_posix(), "--command", "git push", "--out", out_rel],
            cwd=tmp_root,
        )
        if blocked.returncode != 7:
            fail(f"risk_gate hard 模式应以 exitCode=7 阻断，但实际 returncode={blocked.returncode}")
        if "危险操作检测" not in (blocked.stdout + blocked.stderr):
            fail("risk_gate 阻断时应输出危险操作确认块，但未检测到关键字“危险操作检测”")

        out_path = tmp_root / out_rel
        if not out_path.exists():
            fail("risk_gate 使用 --out 应生成落盘文件，但未生成")
        else:
            out_text = read_text(out_path)
            if "风险闸门（risk_gate）" not in out_text:
                fail("risk_gate 输出文件内容异常：未包含风险报告标题")

        forced = run_python(
            [risk_gate.as_posix(), "--root", tmp_root.as_posix(), "--command", "git push", "--force", "--out", out_rel],
            cwd=tmp_root,
        )
        if forced.returncode != 0:
            fail(f"risk_gate 使用 --force 应放行（returncode=0），但实际 returncode={forced.returncode}")

    if errors:
        for e in errors:
            print(f"[fail] {e}")
        return 1

    if args.verbose:
        print("[ok] 所有自检项通过")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
