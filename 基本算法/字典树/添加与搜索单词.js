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


WordDictionary.prototype.searchPrefix = function (prefix) {
    let node = this.children
    for (const ch of prefix) {
        if (ch === '.') {
            node = node[ch]
            continue
        }
        if (!node[ch]) {
            return undefined
        }
        node = node[ch]
    }
    return node
}

/** 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
    const node = this.searchPrefix(word);
    return node !== undefined && node.isEnd !== undefined;
};


let WD = new WordDictionary()
WD.addWord('coo')
WD.addWord('cool vue')
console.log(WD.searchPrefix('c.o'))
console.log(WD.search('co'))
console.log(WD.search('c.'))
console.log(JSON.stringify(WD))