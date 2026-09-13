let arr1=[1,2,3,4,5,6,7,8,9,10,10,10]
arr1=[...new Set(arr1)]
console.log(arr1)


  const fontCheck = (str1: string, str2: string) => {
        let l = Math.min(str1.length, str2.length)
        let n = 0
        for (let i = 0; i < l; i++) {
            if (str1[i] === str2[i]) {
                n++
            } else {
                break
            }
        }

        return n
    }

    console.log(fontCheck('1234','123456'))