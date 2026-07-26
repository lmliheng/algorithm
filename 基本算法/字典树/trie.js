
var Trie = function () {
    // 多叉树
    this.children = {}

};

/** 
 * @插入
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
    let node = this.children
    for (let i = 0; i < word.length; i++) {
        // 不存在属性就创建
        if (!node[word[i]]) {
            node[word[i]] = {}
        }
        node = node[word[i]]
    }
    node.isEnd = true
};
/**
 * @返回结尾字符
 * 
 * @param {*} prefix 
 * @returns 
 */
Trie.prototype.searchPrefix = function (prefix) {
    let node = this.children;
    for (const ch of prefix) {
        if (!node[ch]) {
            return undefined;
        }
        node = node[ch];
    }
    return node;
}

/** 
 * @判断搜索到的词的结尾是否符合isEnd
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
    const node = this.searchPrefix(word);
    return node !== undefined && node.isEnd !== undefined;
}

/** 
 * @没用的函数
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
    const result = this.searchPrefix(prefix);
    console.log(result)
    if (result === false) {
        return result
    } else if (result === null) {
        return false
    } else {
        return true
    }
};

let trie = new Trie()
trie.insert('cool trie')
trie.insert('co')
console.log(trie.search('co'))
console.log(JSON.stringify(trie))
// trie.insert('哈哈哈哈哈隔')
// trie.insert('wcni')
// trie.insert('abcdefghijk')

// console.log(JSON.stringify(trie))


// // console.log(trie.search('哈哈'))
// // console.log(trie.search('哈哈哈哈哈隔'))
// // console.log(trie.startsWith('哈哈哈'))
// // console.log(trie.startsWith('哈哈哈隔'))
// console.log(trie.search('abcdefghijk'))
// console.log(trie.search('abcdefghij'))
// console.log(trie.startsWith('fghijk'))
// console.log(trie.startsWith('abc'))

// console.log(JSON.stringify(trie.searchPrefix('bc')))