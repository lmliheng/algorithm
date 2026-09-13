/**
 * @单词接龙
 * @在BFS的队列定义中使用了对象作为元素记录step
 */
let beginWord = "hit"
let endWord = "cog"
let wordList = ["hot", "dot", "dog", "lot", "log", "cog"]

let n = wordList.length

function isOneWordDiff(s1, s2) {
    // s1.length===s2.length
    let n = s1.length
    let diffNum = 0
    for (let i = 0; i < n; i++) {
        if (s1[i] !== s2[i]) {
            diffNum++
        }

        if (diffNum > 1) {
            return false
        }
    }
    if (diffNum === 1) {
        return true
    } else {
        return false
    }
}

// console.log(isOneWordDiff('sssw', 'wssw'))
//create graph 开销很大-无向图生成
/**
 * {
 * 'hit':['hot'],
 * 'hot':['dot','lot'],
 * 'dot':['dog','lot','hot'],
 * 'dog':['log','cog','dot'],
 * 'lot':['hot','dot','log'],
 * 'log':['dog','cog','lot'],
 * 'cog':['dog','cog']
 * 
 * }
 */

let graph = {}
// 初始化beginWord
for (let i = 0; i < n; i++) {
    if (isOneWordDiff(beginWord, wordList[i])) {
        if (graph[beginWord] === undefined) {
            graph[beginWord] = [wordList[i]]
        } else {
            graph[beginWord].push(wordList[i])
        }
    }
}
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (wordList[i] === wordList[j]) {
            continue
        }
        if (isOneWordDiff(wordList[i], wordList[j])) {
            if (graph[wordList[i]] === undefined) {
                graph[wordList[i]] = [wordList[j]]
            } else {
                graph[wordList[i]].push(wordList[j])
            }
        }
    }
}

console.log(graph)
let visit = new Set()
let quene = [{ word: beginWord, step: 1 }]
visit.add(beginWord)
while (quene.length) {
    let { word, step } = quene.shift()
    if (word === endWord) {
        console.log(step)
    }
    let neighbors = graph[word] || []
    for (let w of neighbors) {
        if (!visit.has(w)) {
            visit.add(w)
            quene.push({ word: w, step: step + 1 })
        }
    }
}

// console.log(0)
