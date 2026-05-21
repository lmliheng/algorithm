function gameOfLife(board: number[][]): void {
    const m = board.length;
    const n = board[0].length;

    // 统计活邻居数量（安全写法）
    const countLives = (x: number, y: number): number => {
        let lives = 0;
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (
                    i >= 0 && i < m &&
                    j >= 0 && j < n &&
                    !(i === x && j === y) &&
                    (board[i][j] === 1 || board[i][j] === -1)
                ) {
                    lives++;
                }
            }
        }
        return lives;
    };

    // 第一轮：标记状态
    // 1 → 0 : -1
    // 0 → 1 : 2
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const lives = countLives(i, j);
            if (board[i][j] === 1) {
                if (lives < 2 || lives > 3) {
                    board[i][j] = -1; // 原来活，现在死
                }
            } else {
                if (lives === 3) {
                    board[i][j] = 2; // 原来死，现在活
                }
            }
        }
    }

    // 第二轮：还原成 0 / 1
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === -1) board[i][j] = 0;
            if (board[i][j] === 2) board[i][j] = 1;
        }
    }
}