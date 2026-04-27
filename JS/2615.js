var distance = function (nums) {
    let arr = new Array(nums.length).fill(0)
    for (let i = 0; i < nums.length; i++) {
        nums.forEach((item, index) => {
            if (!(i == index) && nums[i] == item) {
                arr[i] += Math.abs(i - index)
            }
        })
    }
    return arr
};

distance([1, 3, 1, 1, 2])
