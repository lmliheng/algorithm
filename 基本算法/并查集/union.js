// JavaScript 实现
export class UnionFind {
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

// // 1. 创建并查集，有 5 个节点
// const uf = new UnionFind(5);

// // 2. 建立连接
// uf.union(0, 1);   // 连接 0 和 1
// uf.union(1, 2);   // 连接 1 和 2
// uf.union(3, 4);   // 连接 3 和 4

// console.log(uf.find(0))
// console.log(uf.find(1))

// // 3. 查询连通性
// console.log(uf.find(0) === uf.find(2));  // true，0-1-2 连通
// console.log(uf.find(0) === uf.find(3));  // false，不同集合
// console.log(uf.find(3) === uf.find(4));  // true，3-4 连通


