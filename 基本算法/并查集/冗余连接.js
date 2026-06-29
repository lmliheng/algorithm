// JavaScript 实现
class UnionFind {
    constructor(n) {
        // 初始化：每个人的父节点指向自己
        this.parent = new Array(n).fill(0).map((_, index) => index);
    }

    // 查找 x 所属集合的根节点
    find(x) {
        while (this.parent[x] !== x) {
            x = this.parent[x];
        }
        return x;
    }

    // 合并 x 和 y 所在的集合,y是根节点
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if (rootX !== rootY) {
            // 将一个根节点的父节点设为另一个根节点
            this.parent[rootX] = rootY;
        }
    }
}


const edges = [[1, 2], [1, 3], [2, 3]];
const n = edges.length;
const uf = new UnionFind(n + 1); // 节点从 1 开始

for (const [u, v] of edges) {
    // 如果 u 和 v 已经连通，说明这条边是多余的
    if (uf.find(u) === uf.find(v)) {
        console.log([u,v])
    }
    uf.union(u, v);
}

