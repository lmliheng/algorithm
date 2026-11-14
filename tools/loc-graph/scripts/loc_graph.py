#!/usr/bin/env python3
"""统计每次提交的代码行数（cloc 计数），写出 .github/loc_history.json 与静态 SVG 图。

数据口径与原先的 botforge-pro/loc-graph-action（MIT）一致：
  - 逐提交用 cloc 数 code 行，排除 .git / .github / package-lock.json
  - 结果缓存在 .github/loc_history.json，只对新增提交做计算
本仓库改成自己维护，好处有两点：不再依赖第三方 action；同一份数据可以直接喂给
tools/loc-graph 的 Remotion 组件，渲染成会动的 README 图（见 scripts/render.mjs）。

退出码恒为 0；是否有更新通过 $GITHUB_OUTPUT 的 changed=true/false 告诉 workflow，
只有 changed=true 时才需要渲染动图、提交。
"""

import json
import os
import shutil
import subprocess
import sys
import tarfile
import tempfile
from datetime import datetime

GITHUB_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", ".github")
OUTPUT_JSON = os.path.normpath(os.path.join(GITHUB_DIR, "loc_history.json"))
OUTPUT_SVG = os.path.normpath(os.path.join(GITHUB_DIR, "loc-history.svg"))
OUTPUT_SVG_LIGHT = os.path.normpath(os.path.join(GITHUB_DIR, "loc-history-light.svg"))
OUTPUT_SVG_DARK = os.path.normpath(os.path.join(GITHUB_DIR, "loc-history-dark.svg"))

EXCLUDE_DIRS = [".git", ".github"]
EXCLUDE_FILES = ["package-lock.json"]


def sh(cmd):
    return subprocess.check_output(cmd, text=True).strip()


def commits():
    """[(sha, committer date ISO8601)]，从旧到新。"""
    lines = sh(["git", "log", "--format=%H %cI", "--reverse"]).splitlines()
    return [tuple(line.split(" ", 1)) for line in lines]


def load_history():
    if os.path.exists(OUTPUT_JSON):
        with open(OUTPUT_JSON, encoding="utf-8") as f:
            return json.load(f)
    return []


def save_history(hist):
    os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(hist, f, ensure_ascii=False, indent=2)
        f.write("\n")


def cloc_code_lines(root):
    """cloc 的 SUM.code：根目录 root 下（不含 .git/.github）的代码行数。"""
    cmd = ["cloc", "--json", "--quiet", "--exclude-dir=" + ",".join(EXCLUDE_DIRS)]
    for name in EXCLUDE_FILES:
        cmd.append("--not-match-f=" + name.replace(".", r"\."))
    cmd.append(root)
    data = json.loads(sh(cmd))
    return int(data.get("SUM", {}).get("code", 0))


def loc_at(sha):
    """把提交内容导出到临时目录再数，避免 checkout 污染工作区（本仓库常有未提交的改动）。"""
    tmp = tempfile.mkdtemp(prefix="loc-")
    try:
        archive = subprocess.Popen(["git", "archive", "--format=tar", sha], stdout=subprocess.PIPE)
        with tarfile.open(fileobj=archive.stdout, mode="r|") as tar:
            tar.extractall(tmp, filter="data")
        archive.wait()
        if archive.returncode != 0:
            raise RuntimeError(f"git archive {sha} failed")
        return cloc_code_lines(tmp)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


# ---------- 静态 SVG（README 不支持动图时的退路，也与历史输出保持一致） ----------

def nice_round(n):
    if n <= 0:
        return 10
    magnitude = 10 ** (len(str(int(n))) - 1)
    for step in (1, 2, 3, 5, 10):
        if n <= step * magnitude:
            return step * magnitude
    return 10 * magnitude


def calculate_ymax(max_val):
    if max_val <= 0:
        return 100
    ymax = nice_round(max_val)
    if max_val >= ymax * 0.95:
        if ymax < 100:
            ymax += 10
        elif ymax < 1000:
            ymax += 100
        elif ymax < 10000:
            ymax += 1000
        else:
            ymax += 10000
        ymax = nice_round(ymax)
    return ymax


def format_number(n):
    if n >= 1000000:
        return f"{n / 1000000:.0f}M" if n % 1000000 == 0 else f"{n / 1000000:.1f}M"
    if n >= 1000:
        return f"{n / 1000:.0f}k" if n % 1000 == 0 else f"{n / 1000:.1f}k"
    return str(n)


def generate_svg(points, output_path, theme="light", w=900, h=260, pad=40):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    if not points:
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}"><text x="12" y="24">No data</text></svg>')
        return

    if theme == "dark":
        bg, grid, axis = "#0d1117", "#30363d", "#30363d"
        line = text = point = "#3fb950"
        text = "#c9d1d9"
    else:
        bg, grid, axis = "white", "#e5e7eb", "#9ca3af"
        line = text = point = "#111827"

    ys = [p["loc"] for p in points]
    ymax = calculate_ymax(max(ys))
    n = len(points)

    def sx(i):
        return pad + i * (w - 2 * pad) / max(1, n - 1)

    def sy(v):
        return h - pad - v * (h - 2 * pad) / ymax

    path = "M " + " L ".join(f"{sx(i):.2f} {sy(ys[i]):.2f}" for i in range(n))

    y_grid = []
    for i in range(5):
        val = int(ymax * i / 4)
        y = sy(val)
        y_grid.append(f'<line x1="{pad}" y1="{y:.2f}" x2="{w - pad}" y2="{y:.2f}" stroke="{grid}"/>')
        y_grid.append(f'<text x="{pad - 8}" y="{y + 4:.2f}" font-size="10" fill="{text}" text-anchor="end">{format_number(val)}</text>')

    first = datetime.fromisoformat(points[0]["date"]).date()
    last = datetime.fromisoformat(points[-1]["date"]).date()
    use_time = (last - first).days <= 2
    step = max(1, n // 10)
    x_grid, labels = [], []
    for i in range(0, n, step):
        x = sx(i)
        x_grid.append(f'<line x1="{x:.2f}" y1="{pad}" x2="{x:.2f}" y2="{h - pad}" stroke="{grid}" opacity="0.5"/>')
        dt = datetime.fromisoformat(points[i]["date"])
        label = dt.strftime("%H:%M" if use_time else "%d.%m.%Y")
        labels.append(
            f'<text x="{x:.2f}" y="{h - pad + 15:.2f}" font-size="9" fill="{text}" text-anchor="middle" '
            f'transform="rotate(-45 {x:.2f} {h - pad + 15:.2f})">{label}</text>'
        )

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h + 30}" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
  <rect width="100%" height="100%" fill="{bg}"/>
  <g>
    {''.join(y_grid)}
    {''.join(x_grid)}
    <line x1="{pad}" y1="{h - pad}" x2="{w - pad}" y2="{h - pad}" stroke="{axis}"/>
    <line x1="{pad}" y1="{pad}" x2="{pad}" y2="{h - pad}" stroke="{axis}"/>
    <path d="{path}" fill="none" stroke="{line}" stroke-width="2"/>
    <circle cx="{sx(n - 1):.2f}" cy="{sy(ys[-1]):.2f}" r="3" fill="{point}"/>
    {''.join(labels)}
  </g>
</svg>'''
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(svg)


def main():
    hist = load_history()
    done = {e["sha"] for e in hist}
    todo = [(sha, date) for sha, date in commits() if sha not in done]

    for sha, date in todo:
        hist.append({"sha": sha, "date": date, "loc": loc_at(sha)})
        print(f"  {sha[:8]} {date[:10]} loc={hist[-1]['loc']}", flush=True)
    hist.sort(key=lambda e: datetime.fromisoformat(e["date"]))

    changed = bool(todo) or not os.path.exists(OUTPUT_SVG_LIGHT)
    if changed:
        save_history(hist)
        generate_svg(hist, OUTPUT_SVG_LIGHT, "light")
        generate_svg(hist, OUTPUT_SVG_DARK, "dark")
        shutil.copy(OUTPUT_SVG_LIGHT, OUTPUT_SVG)
        print(f"updated: {len(hist)} commits, last loc={hist[-1]['loc'] if hist else 0}")

    out = os.environ.get("GITHUB_OUTPUT")
    if out:
        with open(out, "a", encoding="utf-8") as f:
            f.write(f"changed={'true' if changed else 'false'}\n")
            f.write(f"commits={len(hist)}\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
