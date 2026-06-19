const checkStr = (str) => {
    let len_ = str.length

    if (len_ % 2) {

        for (let j = 0; j < len_ / 2 - 1; j++) {
            console.log('str:', j, '-', str[j])
            if (str[j] !== str[len_ - 1 - j]) {
                return false
            }
        }
        return true
    } else {
        for (let j = 0; j < len_ / 2; j++) {
            if (str[j] !== str[len_ - 1 - j]) {
                return false
            }

        }
        return true
    }
}

console.log(checkStr('abc'))