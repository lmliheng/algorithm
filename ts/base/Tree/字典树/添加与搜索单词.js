/**
 * @添加与搜索单词
 */
var WordDictionary = function () {
    this.children = {}
};

/** 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
    let node = this.children
    for (let i = 0; i < word.length; i++) {
        // 创建
        if (!node[word[i]]) {
            node[word[i]] = {}
        }
        node = node[word[i]]
    }
    node.isEnd = true
};



/** 
 * @search方法
 * 这里字典中都是英文....所以没有考虑中文和特殊字符
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
    const dfs = (node, index) => {
        if (index === word.length) {
            return node.isEnd === undefined ? false : node.isEnd
        }
        const ch = word[index];
        if (ch !== '.') {
            if (!node[ch]) return false;
            return dfs(node[ch], index + 1);
        }

        for (const key in node) {
            if (key === 'isEnd') continue;
            if (dfs(node[key], index + 1)) {
                return true;
            }
        }
        return false
    }

    return dfs(this.children, 0)
};


let WD = new WordDictionary()
WD.addWord('coo')
WD.addWord('cb')
WD.addWord('coomk1l')
WD.addWord('cool vue, 我正在构建最小的vue核心')
// console.log(WD.searchPrefix('coo.'))
console.log(WD.search('co'))
console.log(WD.search('c.o'))
console.log(JSON.stringify(WD))