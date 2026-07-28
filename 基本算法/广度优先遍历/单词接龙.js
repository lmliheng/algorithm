/**
 * @单词接龙
 */
let beginWord = "hit"
let endWord = "cog"
let wordList = ["hot", "dot", "dog", "lot", "log", "cog"]


function isOneWordDiff(s1,s2){
    // s1.length===s2.length
    let n=s1.length
    let diffNum=0
    for(let i=0;i<n;i++){
        if(s1[i]!==s2[i]){
            diffNum++
        }

        if(diffNum>1){
            return false
        }
    }
    if(diffNum===1){
        return true
    }else{
        return false
    }
}
//create graph 开销很大
/**
 * {
 * 'hit':['hot'],
 * 'hot':['dot','lot'],
 * 'dot':['dog','lot'],
 * 'dog':['log','cog'],
 * 'lot':['hot','dot'],
 * 'log':['dog','cog'],
 * 'cog':['dog','cog']
 * 
 * }
 */

let graph={}
for(let i=0;i<wordList.length;i++){

}

let stack=[]


console.log(isOneWordDiff('sssw','wssw'))