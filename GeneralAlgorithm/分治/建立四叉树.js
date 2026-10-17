/**
 * @建立四叉树
 * 递归 /分治思想
 */
class Node {
    constructor(val, isLeaf, topLeft = null, topRight = null, bottomLeft = null, bottomRight = null) {
        this.val = val;
        this.isLeaf = isLeaf;
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomLeft = bottomLeft;
        this.bottomRight = bottomRight;
    }
}

let grid = [
    [1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0]
]

function quadTree(grid, x, y, offset) {
    if (offset <= 0) return null;

    const first = grid[x][y];
    for (let i = x; i < x + offset; i++) {
        for (let j = y; j < y + offset; j++) {
            if (grid[i][j] !== first) {
                return new Node(
                    first,
                    false,
                    quadTree(grid, x, y, offset / 2),
                    quadTree(grid, x, y + offset / 2, offset / 2),
                    quadTree(grid, x + offset / 2, y, offset / 2),
                    quadTree(grid, x + offset / 2, y + offset / 2, offset / 2)
                );
            }
        }
    }

    return new Node(first, true);
}

function construct(grid) {
    return quadTree(grid, 0, 0, grid.length);
}


console.log(construct(grid))