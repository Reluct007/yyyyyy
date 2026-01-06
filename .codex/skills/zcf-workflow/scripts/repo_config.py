from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path


CONFIG_FILENAMES = ("codex-workflow.config.json",)
SUPPORTED_SCHEMA_VERSION = 1


@dataclass(frozen=True)
class RepoConfigResult:
    path: Path | None
    data: dict
    schema_version: int | None
    warnings: tuple[str, ...]
    error: str | None


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def load_repo_config(root: Path) -> RepoConfigResult:
    for filename in CONFIG_FILENAMES:
        path = root / filename
        if not path.exists():
            continue

        try:
            data = json.loads(read_text(path))
        except Exception as exc:  # noqa: BLE001
            return RepoConfigResult(
                path=path,
                data={},
                schema_version=None,
                warnings=(),
                error=f"配置解析失败：{exc}",
            )

        if not isinstance(data, dict):
            return RepoConfigResult(
                path=path,
                data={},
                schema_version=None,
                warnings=(),
                error="配置文件根节点必须是 JSON object",
            )

        warnings: list[str] = []
        schema_value = data.get("schemaVersion")
        if schema_value is None:
            schema_version = SUPPORTED_SCHEMA_VERSION
            warnings.append("schemaVersion 缺失：默认按 1 解析（向后兼容）。")
        elif isinstance(schema_value, int):
            schema_version = schema_value
        else:
            return RepoConfigResult(
                path=path,
                data={},
                schema_version=None,
                warnings=(),
                error="schemaVersion 必须是整数",
            )

        if schema_version < 1:
            return RepoConfigResult(
                path=path,
                data={},
                schema_version=schema_version,
                warnings=(),
                error="schemaVersion 必须 >= 1",
            )

        if schema_version != SUPPORTED_SCHEMA_VERSION:
            warnings.append(
                f"schemaVersion={schema_version} 未受支持：将尽力按 1 解析已知字段（不保证完整语义）。"
            )

        normalized = dict(data)
        normalized["schemaVersion"] = schema_version
        return RepoConfigResult(
            path=path,
            data=normalized,
            schema_version=schema_version,
            warnings=tuple(warnings),
            error=None,
        )

    return RepoConfigResult(path=None, data={}, schema_version=None, warnings=(), error=None)


def get_dict(source: dict, key: str) -> dict:
    value = source.get(key)
    return value if isinstance(value, dict) else {}


def get_str_list(source: dict, key: str) -> list[str]:
    value = source.get(key)
    if not isinstance(value, list):
        return []
    return [item for item in value if isinstance(item, str) and item.strip()]


def get_bool(source: dict, key: str, default: bool) -> bool:
    value = source.get(key)
    return value if isinstance(value, bool) else default


def get_int(source: dict, key: str, default: int) -> int:
    value = source.get(key)
    return value if isinstance(value, int) else default
