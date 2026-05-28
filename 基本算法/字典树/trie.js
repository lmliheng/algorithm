
var Trie = function () {
    // 多叉树
    this.children = {}

};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
    let node = this.children
    for (let i = 0; i < word.length; i++) {
        if (!node[word[i]]) {
            node[word[i]] = {}
        }
        node = node[word[i]]
    }
    node.isEnd = true
};
// 
Trie.prototype.searchPrefix = function (prefix) {
    let node = this.children;
    for (const ch of prefix) {
        if (!node[ch]) {
            return false;
        }
        node = node[ch];
    }
    return node;
}

/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
    const node = this.searchPrefix(word);
    return node !== undefined && node.isEnd !== undefined;
}

/** 
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

console.log(trie.startsWith('a'))
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