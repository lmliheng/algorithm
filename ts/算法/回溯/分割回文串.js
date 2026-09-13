/**
 * @分割回文串
 * 
 * 拿"aab"举例
 * start=0,"a","aa"回文,"aab"不回文，
 * 回文进入下一个DFS
 */

function partition(s) {
    let n=s.length
    let res=[]
    function dfs(start, path) {
        if (start === n) {
            res.push([...path]);
            return;
        }
        for (let end = start; end < n; end++) {

            const sub = s.slice(start, end + 1);
            
            if (check(sub)) {
                path.push(sub);
                dfs(end + 1, path);
                path.pop();
            }
        }
    }

    dfs(0, []);
    return res
};

function check(str) {
    let n = str.length
    for (let i = 0; i < Math.floor(n / 2); i++) {
        if (str[i] !== str[n - 1 - i]) {
            return false
        }
    }
    return true
}