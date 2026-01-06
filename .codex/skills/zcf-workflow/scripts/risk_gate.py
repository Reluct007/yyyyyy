from __future__ import annotations

import argparse
import json
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

from repo_config import get_bool, get_dict, get_int, get_str_list, load_repo_config


@dataclass(frozen=True)
class RiskReport:
    level: str
    need_confirm: bool
    reasons: list[str]
    suggested_checks: list[str]
    changed_files: list[str]
    commands: list[str]


@dataclass(frozen=True)
class RiskGateSettings:
    mode: str
    exit_code: int
    use_builtins: bool
    validation_scripts: list[str]
    high_risk_file_prefixes: list[str]
    high_risk_file_exact: list[str]
    high_risk_path_tokens: list[str]
    high_risk_command_tokens: list[str]
    config_path: Path | None
    config_schema_version: int | None
    config_warnings: tuple[str, ...]
    config_error: str | None


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def read_json(path: Path) -> dict:
    return json.loads(read_text(path))


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


def script_command(package_manager: str, script: str) -> str:
    if package_manager == "npm":
        return f"npm run {script}"
    return f"{package_manager} {script}"


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


def normalize_path(value: str) -> str:
    return value.replace("\\", "/")


def detect_next_repo(root: Path, package_json: dict | None) -> bool:
    if (root / "next.config.js").exists() or (root / "next.config.mjs").exists() or (root / "next.config.ts").exists():
        return True
    if (root / "src" / "app").exists() or (root / "src" / "pages").exists():
        return True

    if not isinstance(package_json, dict):
        return False
    deps = package_json.get("dependencies") or {}
    dev_deps = package_json.get("devDependencies") or {}
    for container in (deps, dev_deps):
        if isinstance(container, dict) and isinstance(container.get("next"), str):
            return True
    return False


def settings_from_repo_config(root: Path) -> RiskGateSettings:
    result = load_repo_config(root)
    risk_gate = get_dict(result.data, "riskGate")

    mode_value = risk_gate.get("mode")
    mode = mode_value.strip().lower() if isinstance(mode_value, str) else "hard"
    if mode not in {"hard", "soft"}:
        mode = "hard"

    exit_code = get_int(risk_gate, "exitCode", 3)
    if exit_code < 1 or exit_code > 125:
        exit_code = 3

    use_builtins = get_bool(risk_gate, "useBuiltins", True)
    validation_scripts = get_str_list(risk_gate, "validationScripts") or ["format:check", "lint", "build"]

    high_risk_file_prefixes = [normalize_path(p).lower() for p in get_str_list(risk_gate, "highRiskFilePrefixes")]
    high_risk_file_exact = [normalize_path(p).lower() for p in get_str_list(risk_gate, "highRiskFileExact")]
    high_risk_path_tokens = [t.lower() for t in get_str_list(risk_gate, "highRiskPathTokens")]
    high_risk_command_tokens = [t.lower() for t in get_str_list(risk_gate, "highRiskCommandTokens")]

    return RiskGateSettings(
        mode=mode,
        exit_code=exit_code,
        use_builtins=use_builtins,
        validation_scripts=validation_scripts,
        high_risk_file_prefixes=high_risk_file_prefixes,
        high_risk_file_exact=high_risk_file_exact,
        high_risk_path_tokens=high_risk_path_tokens,
        high_risk_command_tokens=high_risk_command_tokens,
        config_path=result.path,
        config_schema_version=result.schema_version,
        config_warnings=result.warnings,
        config_error=result.error,
    )


def git_files(root: Path) -> list[str]:
    name_only = []
    for args in (
        ["git", "diff", "--name-only"],
        ["git", "diff", "--cached", "--name-only"],
        ["git", "ls-files", "--others", "--exclude-standard"],
    ):
        out = run(args, cwd=root)
        if out:
            name_only.extend([line.strip() for line in out.splitlines() if line.strip()])
    return sorted(set(name_only))


def is_docs_only(files: list[str]) -> bool:
    if not files:
        return False
    for f in files:
        fl = f.lower()
        if fl.endswith((".md", ".mdx")):
            continue
        if fl.startswith(("docs/", "content/")):
            continue
        if fl in {"readme.md", "license", "license.md"}:
            continue
        return False
    return True


def has_any_prefix(path: str, prefixes: tuple[str, ...]) -> bool:
    return any(path.startswith(prefix) for prefix in prefixes)


def analyze(root: Path, files: list[str], commands: list[str], settings: RiskGateSettings) -> RiskReport:
    reasons: list[str] = []

    package_json_path = root / "package.json"
    package_json = None
    if package_json_path.exists():
        try:
            package_json = read_json(package_json_path)
        except Exception:  # noqa: BLE001
            package_json = None

    package_manager = detect_package_manager(root, package_json) or "pnpm"
    scripts = {}
    if isinstance(package_json, dict):
        scripts = package_json.get("scripts") or {}

    if settings.config_error:
        reasons.append(f"仓库级配置解析失败：{settings.config_error}")
    if settings.config_warnings:
        for w in settings.config_warnings:
            reasons.append(f"仓库级配置警告：{w}")

    def resolve_script(script: str) -> str | None:
        if isinstance(scripts, dict) and script in scripts:
            return script_command(package_manager, script)
        return None

    files_norm_lc = [normalize_path(f).lower() for f in files]
    deps_changed = any(
        f in {"package.json", "pnpm-lock.yaml", "yarn.lock", "package-lock.json", "npm-shrinkwrap.json"}
        for f in files_norm_lc
    )
    config_changed = any(
        f.startswith(("next.config.", "eslint.config."))
        or f in {
            "tsconfig.json",
            ".prettierrc",
            ".prettierrc.json",
            ".prettierrc.yml",
            "prettier.config.js",
            "prettier.config.mjs",
        }
        for f in files_norm_lc
    )
    env_changed = any(f.startswith(".env") or f.endswith(".env") for f in files_norm_lc)

    is_next = detect_next_repo(root, package_json)
    middleware_changed = is_next and any(f == "src/middleware.ts" for f in files_norm_lc)
    api_changed = is_next and any(has_any_prefix(f, ("src/app/api/", "src/pages/api/")) for f in files_norm_lc)
    auth_billing_db_changed = any(
        any(token in f for token in ("/auth", "/billing", "/stripe", "/db", "prisma", "drizzle", "migration", "migrations"))
        for f in files_norm_lc
    )

    cmd_lc = " \n".join(commands).lower()
    deps_cmd = any(token in cmd_lc for token in ("pnpm add", "pnpm up", "npm install", "yarn add", "yarn upgrade"))
    db_cmd = any(
        token in cmd_lc
        for token in (
            "db:migrate",
            "prisma migrate",
            "drizzle",
            "migration",
            "drop",
            "truncate",
            "reset",
        )
    )
    dangerous_git_cmd = any(token in cmd_lc for token in ("git push", "git reset --hard", "git commit"))

    if deps_changed or deps_cmd:
        reasons.append("依赖/锁文件变更（可能影响构建与运行时）")
    if config_changed:
        reasons.append("构建/规范配置变更（可能影响 CI 与产物）")
    if env_changed:
        reasons.append("环境变量文件变更（可能影响运行时行为）")
    if middleware_changed:
        reasons.append("middleware 变更（可能影响鉴权/路由/缓存等全局行为）")
    if auth_billing_db_changed:
        reasons.append("认证/计费/数据库相关变更（高风险域）")
    if api_changed:
        reasons.append("API 路由变更（可能影响外部契约）")
    if db_cmd:
        reasons.append("包含潜在数据操作命令（需要确认与回滚策略）")
    if dangerous_git_cmd:
        reasons.append("包含高风险 git 命令（需要明确确认）")

    custom_risk = False
    if settings.high_risk_file_exact or settings.high_risk_file_prefixes or settings.high_risk_path_tokens:
        for f in files_norm_lc:
            if f in settings.high_risk_file_exact:
                custom_risk = True
                break
            if any(f.startswith(prefix) for prefix in settings.high_risk_file_prefixes):
                custom_risk = True
                break
            if any(token in f for token in settings.high_risk_path_tokens):
                custom_risk = True
                break

    if commands and settings.high_risk_command_tokens:
        if any(token in cmd_lc for token in settings.high_risk_command_tokens):
            custom_risk = True

    if custom_risk:
        reasons.append("命中仓库级配置定义的高风险规则（风险闸门）")

    builtin_risk = deps_changed or deps_cmd or config_changed or middleware_changed or api_changed or auth_billing_db_changed or env_changed or db_cmd or dangerous_git_cmd

    if is_docs_only(files):
        level = "低"
    elif (settings.use_builtins and builtin_risk) or custom_risk:
        level = "高"
    elif files or commands:
        level = "中"
    else:
        level = "未知"

    need_confirm = level == "高"

    suggested_checks: list[str] = []
    if is_docs_only(files):
        suggested_checks = []
    else:
        for script in settings.validation_scripts:
            cmd = resolve_script(script)
            if cmd:
                suggested_checks.append(cmd)
        if not suggested_checks:
            suggested_checks.append("<未发现可用 scripts：请检查 package.json 的 scripts 配置>")

    return RiskReport(
        level=level,
        need_confirm=need_confirm,
        reasons=reasons or (["未检测到明确高风险信号（仍建议保持最小验证）"] if (files or commands) else []),
        suggested_checks=suggested_checks,
        changed_files=files,
        commands=commands,
    )


def operation_type(report: RiskReport) -> str:
    reasons_joined = "\n".join(report.reasons)
    if "高风险 git 命令" in reasons_joined:
        return "git 高风险操作"
    if "数据操作命令" in reasons_joined:
        return "数据操作/迁移"
    if "依赖/锁文件变更" in reasons_joined:
        return "依赖变更"
    if "构建/规范配置变更" in reasons_joined:
        return "构建/规范配置变更"
    if "环境变量文件变更" in reasons_joined:
        return "环境变量变更"
    if "middleware 变更" in reasons_joined or "API 路由变更" in reasons_joined:
        return "路由/中间件/接口变更"
    if "认证/计费/数据库相关变更" in reasons_joined:
        return "认证/计费/数据库域变更"
    if "仓库级配置定义的高风险规则" in reasons_joined:
        return "仓库自定义高风险变更"
    return "高风险变更"


def danger_title() -> str:
    title = "⚠️ 危险操作检测！"
    encoding = getattr(sys.stdout, "encoding", None) or "utf-8"
    try:
        title.encode(encoding)
    except Exception:  # noqa: BLE001
        return "危险操作检测！"
    return title


def main() -> int:
    parser = argparse.ArgumentParser(description="基于 git diff 与待执行命令进行风险分类。")
    parser.add_argument("--root", default=".", help="项目根目录（默认当前目录）")
    parser.add_argument(
        "--command",
        action="append",
        default=[],
        help="待执行命令（可重复传入，用于风险判定）",
    )
    parser.add_argument("--force", action="store_true", help="强制放行高风险（仅在已获得明确确认后使用）")
    parser.add_argument("--out", default="", help="将报告写入文件（UTF-8）；相对路径按 root 解析")
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

    settings = settings_from_repo_config(root)
    files = git_files(root)
    report = analyze(root, files, args.command or [], settings)

    lines: list[str] = []
    blocked = report.need_confirm and settings.mode == "hard" and not args.force
    if blocked:
        lines.append(danger_title())
        lines.append(f"操作类型：{operation_type(report)}")
        lines.append(
            f"影响范围：涉及变更文件 {len(report.changed_files)} 个，待执行命令 {len(report.commands)} 个；详情见下方风险报告。"
        )
        lines.append("风险评估：可能导致行为变化、构建/部署失败、外部契约破坏或数据/权限边界风险。")
        lines.append("")
        lines.append('请确认是否继续？[需要明确的"是"、"确认"、"继续"]')
        lines.append("")

    lines.append("# 风险闸门（risk_gate）")
    lines.append(f"- 风险等级：{report.level}")
    lines.append(f"- 需要确认：{'是' if report.need_confirm else '否'}")
    lines.append(f"- 仓库配置：{settings.config_path.as_posix() if settings.config_path else '未发现'}")
    if settings.config_path and settings.config_schema_version is not None:
        lines.append(f"- 仓库配置 schemaVersion：{settings.config_schema_version}")
    lines.append(f"- 变更文件数：{len(report.changed_files)}")
    if report.commands:
        lines.append(f"- 待执行命令数：{len(report.commands)}")

    if report.reasons:
        lines.append("")
        lines.append("## 触发原因")
        for r in report.reasons:
            lines.append(f"- {r}")

    if report.changed_files:
        lines.append("")
        lines.append("## 变更文件（抽样）")
        for f in report.changed_files[:20]:
            lines.append(f"- {f}")
        if len(report.changed_files) > 20:
            lines.append(f"- ...（共 {len(report.changed_files)} 个）")

    if report.commands:
        lines.append("")
        lines.append("## 待执行命令")
        for c in report.commands:
            lines.append(f"- `{c}`")

    lines.append("")
    lines.append("## 最小验证集合（建议）")
    if report.suggested_checks:
        for c in report.suggested_checks:
            lines.append(f"- `{c}`")
    else:
        lines.append("- （可跳过）")

    output = "\n".join(lines).rstrip() + "\n"
    sys.stdout.write(output)

    write_failed = False
    if args.out:
        out_path = Path(args.out)
        if not out_path.is_absolute():
            out_path = (root / out_path).resolve()
        try:
            out_path.parent.mkdir(parents=True, exist_ok=True)
            out_path.write_text(output, encoding="utf-8", newline="\n")
        except Exception as exc:  # noqa: BLE001
            write_failed = True
            print(f"写入 --out 失败：{out_path.as_posix()}：{exc}", file=sys.stderr)

    if blocked:
        return settings.exit_code
    return 2 if write_failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
