from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from datetime import datetime
from pathlib import Path

from repo_config import get_bool, get_dict, get_str_list, load_repo_config


SKIP_DIR_NAMES = {
    ".git",
    ".next",
    ".turbo",
    "node_modules",
    "dist",
    "build",
    "out",
    ".codex",
}


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def read_json(path: Path) -> dict:
    return json.loads(read_text(path))


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


def detect_package_manager(root: Path, package_json: dict | None) -> str | None:
    package_manager_field = None
    if isinstance(package_json, dict):
        package_manager_field = package_json.get("packageManager")
    if isinstance(package_manager_field, str) and package_manager_field:
        return package_manager_field.split("@", 1)[0]

    if (root / "pnpm-lock.yaml").exists():
        return "pnpm"
    if (root / "yarn.lock").exists():
        return "yarn"
    if (root / "package-lock.json").exists():
        return "npm"
    return None


def find_agents_files(root: Path) -> list[Path]:
    results: list[Path] = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIR_NAMES]
        if "AGENTS.md" in filenames:
            results.append(Path(dirpath) / "AGENTS.md")
        if len(results) >= 50:
            break
    return sorted(results)


def format_bool(value: bool) -> str:
    return "是" if value else "否"


def summarize_eslint_boundaries(eslint_text: str) -> list[str]:
    summary: list[str] = []

    if "no-restricted-imports" in eslint_text:
        summary.append("依赖方向与边界通过 `no-restricted-imports` 规则固化（以 eslint 配置为准）。")

    if "Client 模块禁止导入 'next/headers'" in eslint_text:
        summary.append("Client 模块禁止导入 `next/headers`（Server-only API）。")

    if "Client 模块禁止导入 'server-only'" in eslint_text:
        summary.append("Client 模块禁止导入 `server-only` 标记。")

    if "Client 模块禁止导入 '@/core/db/**'" in eslint_text:
        summary.append("Client 模块禁止导入 `@/core/db/**`（DB 访问必须 server-only）。")

    if "shared UI 层仅允许依赖" in eslint_text:
        summary.append(
            "shared UI 层仅允许依赖 `@/core/i18n/navigation` 与 `@/core/auth/client`（其余 core 依赖禁止）。"
        )

    if "content pipeline 必须保持 server-only" in eslint_text or "shared/content 禁止依赖 UI/client 层" in eslint_text:
        summary.append("`src/shared/content/**` 必须保持 server-only，禁止依赖 UI/client 层。")

    if "Route Handler 禁止依赖 UI 层" in eslint_text:
        summary.append("`src/app/**/route.ts` 禁止依赖 UI 层（blocks/components/contexts/themes）。")

    return summary


def main() -> int:
    parser = argparse.ArgumentParser(
        description="汇总项目画像（框架/脚本/关键配置/目录结构/AGENTS 约束线索），输出 Markdown。"
    )
    parser.add_argument("--root", default=".", help="项目根目录（默认当前目录）")
    parser.add_argument("--out", default="", help="输出文件路径；为空则输出到 stdout")
    args = parser.parse_args()

    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(errors="replace")
        except Exception:  # noqa: BLE001
            pass

    root = Path(args.root).resolve()
    if not root.exists():
        print(f"root 不存在：{root}", file=sys.stderr)
        return 2

    repo_config = load_repo_config(root)

    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    git_top = run(["git", "rev-parse", "--show-toplevel"], cwd=root)
    git_branch = run(["git", "rev-parse", "--abbrev-ref", "HEAD"], cwd=root)
    git_commit = run(["git", "rev-parse", "--short", "HEAD"], cwd=root)
    git_dirty = run(["git", "status", "--porcelain"], cwd=root)
    is_git_repo = git_top is not None

    package_json_path = root / "package.json"
    package_json = None
    package_json_error = None
    if package_json_path.exists():
        try:
            package_json = read_json(package_json_path)
        except Exception as exc:  # noqa: BLE001
            package_json_error = str(exc)

    package_manager = detect_package_manager(root, package_json)

    scripts: dict[str, str] = {}
    dependencies: dict[str, str] = {}
    dev_dependencies: dict[str, str] = {}
    if isinstance(package_json, dict):
        scripts = package_json.get("scripts") or {}
        dependencies = package_json.get("dependencies") or {}
        dev_dependencies = package_json.get("devDependencies") or {}

    def dep_version(name: str) -> str | None:
        value = dependencies.get(name) or dev_dependencies.get(name)
        return value if isinstance(value, str) else None

    key_deps = {
        "next": dep_version("next"),
        "react": dep_version("react"),
        "react-dom": dep_version("react-dom"),
        "typescript": dep_version("typescript"),
        "eslint": dep_version("eslint"),
        "prettier": dep_version("prettier"),
    }

    known_dirs = [
        "src/app",
        "src/core",
        "src/shared",
        "src/themes",
        "docs",
        "content",
        "public",
        "scripts",
    ]
    dirs_status = [(d, (root / d).exists()) for d in known_dirs]

    config_files = [
        "next.config.js",
        "next.config.mjs",
        "next.config.ts",
        "eslint.config.js",
        "eslint.config.mjs",
        "tsconfig.json",
        ".prettierrc",
        ".prettierrc.json",
        ".prettierrc.yml",
        "prettier.config.js",
        "prettier.config.mjs",
        ".env.example",
    ]
    config_status = [(f, (root / f).exists()) for f in config_files]

    tsconfig_path = root / "tsconfig.json"
    tsconfig = None
    tsconfig_error = None
    if tsconfig_path.exists():
        try:
            tsconfig = read_json(tsconfig_path)
        except Exception as exc:  # noqa: BLE001
            tsconfig_error = str(exc)

    strict_value = None
    if isinstance(tsconfig, dict):
        compiler_options = tsconfig.get("compilerOptions")
        if isinstance(compiler_options, dict):
            strict_value = compiler_options.get("strict")

    eslint_path = None
    for candidate in ("eslint.config.mjs", "eslint.config.js"):
        candidate_path = root / candidate
        if candidate_path.exists():
            eslint_path = candidate_path
            break

    eslint_text = None
    if eslint_path:
        eslint_text = read_text(eslint_path)
    eslint_summary = summarize_eslint_boundaries(eslint_text or "")

    agents_files = find_agents_files(root)

    lines: list[str] = []
    lines.append("# 项目画像")
    lines.append(f"- 生成时间：{now}")
    lines.append(f"- 根目录：{root.as_posix()}")
    if is_git_repo:
        dirty = bool(git_dirty)
        lines.append(
            f"- Git：{git_branch or 'unknown'} @ {git_commit or 'unknown'}（dirty={format_bool(dirty)}）"
        )
    else:
        lines.append("- Git：否（非 git 仓库或 git 不可用）")

    lines.append("")
    lines.append("## Codex 工作流配置（可选）")
    if repo_config.path:
        lines.append(f"- 配置文件：{repo_config.path.relative_to(root).as_posix()}")
        if repo_config.schema_version is not None:
            lines.append(f"- schemaVersion：{repo_config.schema_version}")
        if repo_config.error:
            lines.append(f"- 解析错误：{repo_config.error}")
        else:
            if repo_config.warnings:
                for w in repo_config.warnings:
                    lines.append(f"- 警告：{w}")
            risk_gate = get_dict(repo_config.data, "riskGate")
            mode_value = risk_gate.get("mode")
            mode = mode_value.strip().lower() if isinstance(mode_value, str) and mode_value.strip() else "hard"
            lines.append(f"- riskGate.mode：{mode}")
            lines.append(f"- riskGate.useBuiltins：{format_bool(get_bool(risk_gate, 'useBuiltins', True))}")
            validation_scripts = get_str_list(risk_gate, "validationScripts")
            if validation_scripts:
                lines.append(f"- riskGate.validationScripts：{', '.join(validation_scripts)}")
    else:
        lines.append("- 配置文件：未发现（可在仓库根目录添加 codex-workflow.config.json 并提交）")

    lines.append("")
    lines.append("## 工具链")
    lines.append(f"- 包管理器：{package_manager or 'unknown'}")
    for lock_name in ("pnpm-lock.yaml", "yarn.lock", "package-lock.json"):
        if (root / lock_name).exists():
            lines.append(f"- 锁文件：{lock_name}")

    lines.append("")
    lines.append("## 关键依赖版本（抽样）")
    for name, version in key_deps.items():
        if version:
            lines.append(f"- {name}：{version}")

    if package_json_error:
        lines.append("")
        lines.append("## package.json 解析失败")
        lines.append(f"- 错误：{package_json_error}")

    lines.append("")
    lines.append("## scripts（抽样）")
    if isinstance(scripts, dict) and scripts:
        for key in sorted(scripts.keys()):
            if key in {"dev", "build", "build:fast", "start", "lint", "format", "format:check"}:
                value = scripts.get(key)
                if isinstance(value, str):
                    lines.append(f"- {key}：{value}")
    else:
        lines.append("- 未发现 scripts（或 package.json 不存在）")

    lines.append("")
    lines.append("## 目录结构（关键路径）")
    for d, exists in dirs_status:
        lines.append(f"- {d}：{format_bool(exists)}")

    lines.append("")
    lines.append("## 关键配置文件")
    for f, exists in config_status:
        if exists:
            lines.append(f"- {f}")

    lines.append("")
    lines.append("## TypeScript（摘要）")
    if tsconfig_error:
        lines.append(f"- tsconfig.json 解析失败：{tsconfig_error}")
    elif tsconfig is None:
        lines.append("- 未发现 tsconfig.json")
    else:
        if isinstance(strict_value, bool):
            lines.append(f"- strict：{format_bool(strict_value)}")
        else:
            lines.append("- strict：unknown（请检查 tsconfig.json 的 compilerOptions.strict）")

    lines.append("")
    lines.append("## ESLint 边界护栏（摘要）")
    if eslint_path:
        lines.append(f"- 配置文件：{eslint_path.relative_to(root).as_posix()}")
    else:
        lines.append("- 配置文件：未发现 eslint.config.*")
    if eslint_summary:
        for item in eslint_summary:
            lines.append(f"- {item}")
    else:
        lines.append("- （未能提取摘要；请以 eslint 配置为准）")

    lines.append("")
    lines.append("## AGENTS.md（约束线索）")
    if agents_files:
        for p in agents_files:
            lines.append(f"- {p.relative_to(root).as_posix()}")
    else:
        lines.append("- 未发现")

    doc_entrypoints = [
        "docs/CONVENTIONS.md",
        "docs/architecture/shared-layering.md",
        "docs/CODE_REVIEW.md",
        "docs/ARCHITECTURE_REVIEW.md",
        "content/docs/logging-conventions.zh.mdx",
        "content/docs/code-review-checklist.zh.mdx",
    ]
    existing_doc_entrypoints = [
        p for p in doc_entrypoints if (root / Path(p)).exists()
    ]
    lines.append("")
    lines.append("## 工程文档入口（约定/审查）")
    if existing_doc_entrypoints:
        for p in existing_doc_entrypoints:
            lines.append(f"- {p}")
    else:
        lines.append("- 未发现（可选：添加 docs/CONVENTIONS.md 作为约定索引入口）")

    content = "\n".join(lines).rstrip() + "\n"

    if args.out:
        out_path = Path(args.out)
        if not out_path.is_absolute():
            out_path = root / out_path
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(content, encoding="utf-8", newline="\n")
        print(out_path.as_posix())
        return 0

    sys.stdout.write(content)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
