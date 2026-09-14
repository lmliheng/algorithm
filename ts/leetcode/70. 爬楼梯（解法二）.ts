/**
 * @70. 爬楼梯（解法二）
 */

/**
 * @param {string} path
 * @return {string}
 */
function simplifyPath(path: string): string {
    let pathArr: string[] = path.split("/")
    // . 和 //可以处理
  //  console.log(pathArr)
    let pathArr_1: string[] = pathArr.filter(item => {
    if(item !== "" && item !== "."){
        return item
    }
  }) as string[]
  // 处理/../

  for(let i = 0; i < pathArr_1.length; i++){
    if(pathArr_1[i] === '..' ){
        console.log(pathArr_1)
        if(pathArr_1[i-1] !== undefined){
            pathArr_1.splice(i-1, 2)
            console.log("删除后", pathArr_1)
            // 需要更新i
            i = i - 2
        } else {
            pathArr_1.splice(i, 1)
            i = i - 1
        }
    }
  }

  return '/' + pathArr_1.join('/')
}

// console.log(simplifyPath("./home/../foo/"))
// console.log(simplifyPath('/home//foo/'))
// console.log(simplifyPath("/home/user/Documents/../Pictures"))
// console.log(simplifyPath("/.../a/../b/c/../d/./"))
// console.log(simplifyPath("/../"))

//console.log(simplifyPath('/a/./b/../../c/'))
console.log(simplifyPath('/home/../../..'))

export {};
