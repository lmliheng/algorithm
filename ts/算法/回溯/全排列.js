/**
 * @全排列
 * 
 * path的长度等于nums时，记录结果
 * 用used记录是否已访问，在回溯的时候撤销used记录
 * 
 */
function permute(nums) {
    let n = nums.length
    let res = []
    let used=Array.from({length:n},()=>false)
    const BackTrack = (path) => {
        if (path.length == n) {
            res.push([...path])
            return 
        }

        for(let i=0;i<n;i++){
            if(used[i]){
                continue
            }
            path.push(nums[i])
            used[i]=true
            BackTrack(path)
            path.pop()
            used[i]=false
        }
    }
    BackTrack([])
    return res
};