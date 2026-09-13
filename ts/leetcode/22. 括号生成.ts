/**
 * @22. 括号生成
 */
function generateParenthesis(n: number): string[] {
    let res: string[] = []
    let str = ""
    const dfs = (str: string, l: number, r: number) => {
        if (r > l) {
            return
        }
        if (r === n && l === n) {
            res.push(str)
            return
        }
        if (l < n) {

            dfs(str + "(", l + 1, r)
        }
        if (r < l) {
            dfs(str + ")", l, r + 1)
        }

    }
    dfs(str, 0, 0)
    return res
};