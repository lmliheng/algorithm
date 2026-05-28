

var WordDictionary = function() {
    this.children={}
};

/** 
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
     let node = this.children
    for (let i = 0; i < word.length; i++) {
        if (!node[word[i]]) {
            node[word[i]] = {}
        }
        node = node[word[i]]
    }
    node.isEnd = true
};

/** 
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    const node = this.searchPrefix(word);
    return node !== undefined && node.isEnd !== undefined;
};


WordDictionary.prototype.searchPrefix = function (prefix) {
    let node = this.children;
    for (const ch of prefix) {
        
    }
    return node;
}


let wd=new WordDictionary()
wd.addWord('haha')
