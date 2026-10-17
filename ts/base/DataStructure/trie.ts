/**
 * 字典树节点接口
 */
interface TrieNode {
    [key: string]: TrieNode | boolean | undefined;
    isEnd?: boolean;
}

class Trie {
    private root: TrieNode;

    constructor() {
        this.root = {};
    }

    /**
     * 插入单词
     * @param word - 要插入的单词
     */
    insert(word: string): void {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!node[char]) {
                node[char] = {} as TrieNode;
            }
            node = node[char] as TrieNode;
        }
        node.isEnd = true;
    }

    /**
     * 搜索前缀，返回最后一个字符对应的节点
     * @param prefix - 要搜索的前缀
     * @returns 最后一个字符对应的节点，如果不存在则返回undefined
     */
    searchPrefix(prefix: string): TrieNode | undefined {
        let node = this.root;
        for (const ch of prefix) {
            if (!node[ch]) {
                return undefined;
            }
            node = node[ch] as TrieNode;
        }
        return node;
    }

    /**
     * 搜索完整单词
     * @param word - 要搜索的单词
     * @returns 是否存在该单词
     */
    search(word: string): boolean {
        const node = this.searchPrefix(word);
        return node !== undefined && node.isEnd === true;
    }

    /**
     * 检查是否有以指定前缀开头的单词
     * @param prefix - 要检查的前缀
     * @returns 是否存在以该前缀开头的单词
     */
    startsWith(prefix: string): boolean {
        const node = this.searchPrefix(prefix);
        return node !== undefined;
    }
}

if (process.argv[2] == '--test') {
    const trie = new Trie();
    trie.insert('cool trie');
    trie.insert('co');
    console.log(trie.search('co')); // true
    console.log(JSON.stringify(trie));
}
