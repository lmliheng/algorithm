@echo off
setlocal enabledelayedexpansion

REM 创建 txt 目录（如果不存在）
if not exist txt (
    mkdir txt
)

REM 遍历当前目录下所有 .js 文件
for %%f in (*.js) do (
    REM 复制并重命名为 .txt 到 txt 目录
    copy "%%f" "txt\%%~nf.txt" >nul
)

echo 完成：已将 JS 文件转换为 TXT 并放入 txt 目录
pause