/**
 * @difficulty medium
 * @tags 回溯,括号,字符串
 * @time O(4^n)
 * @space O(n)
 * @note 回溯生成，右括号数不得超过左括号数
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