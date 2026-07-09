# -*- coding: utf-8 -*-
"""优化 data 目录下所有 CSV 文件：
1. Diurnal_Station.csv: 只保留磁场强度和时间两列，英文逗号分隔
2. 所有 Line*_Raw.csv: 表头逗号化，数据行清理双逗号/多余空格，统一英文逗号分隔
"""
import os
import re

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")

# ---------- 1. Diurnal_Station.csv ----------
def process_diurnal():
    filepath = os.path.join(DATA_DIR, "Diurnal_Station.csv")
    with open(filepath, "r", encoding="utf-8-sig") as f:
        lines = f.readlines()

    rows = []
    for line in lines:
        line = line.strip()
        if not line:
            continue

        # 判断分隔方式
        if "," in line:
            # 前两行格式: magnetic_field,time
            parts = [p.strip() for p in line.split(",") if p.strip()]
            if len(parts) >= 2:
                mag = parts[0]
                time_val = parts[1]
                rows.append(f"{mag},{time_val}")
        else:
            # 空格分隔格式: 0 point_number magnetic_field sensor_height time
            parts = line.split()
            if len(parts) >= 5:
                mag = parts[2]       # 磁场强度
                time_val = parts[4]  # 时间
                rows.append(f"{mag},{time_val}")

    out = "磁场强度/nT,time\n" + "\n".join(rows) + "\n"
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(out)
    print(f"Diurnal_Station.csv: {len(rows)} rows written")


# ---------- 2. Line*_Raw.csv ----------
def process_line_files():
    for fname in sorted(os.listdir(DATA_DIR)):
        if not fname.startswith("Line") or not fname.endswith(".csv"):
            continue

        filepath = os.path.join(DATA_DIR, fname)
        with open(filepath, "r", encoding="utf-8-sig") as f:
            lines = f.readlines()

        out_lines = []
        for line in lines:
            line = line.strip()
            if not line:
                continue

            if line.startswith("距离"):
                # 表头: 空格 -> 逗号
                header = ",".join(part.strip() for part in line.split() if part.strip())
                out_lines.append(header)
            else:
                # 数据行: 统一用逗号分隔，去除空字段和多余空格
                # 先把连续逗号中的空字段去掉
                parts = [p.strip() for p in line.split(",")]
                # 过滤掉空字符串（双逗号产生的空字段）
                parts = [p for p in parts if p]
                out_lines.append(",".join(parts))

        out = "\n".join(out_lines) + "\n"
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(out)
        print(f"{fname}: {len(out_lines)} rows written")


if __name__ == "__main__":
    process_diurnal()
    process_line_files()
    print("\nAll CSV files processed.")
