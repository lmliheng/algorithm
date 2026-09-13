function nextPalindrome(n) {
    let s = String(n);
    let len = s.length;
    let half = Math.ceil(len / 2);
    let left = s.slice(0, half);

    function makePalindrome(left) {
        let l = left.split('');
        let res = l.concat(
            l.slice(0, len % 2 === 0 ? half : half - 1).reverse()
        );
        return Number(res.join(''));
    }

    let candidate = makePalindrome(left);

    if (candidate >= n) {   // ← 改这里：> 改成 >=
        return candidate;
    }

    let nextLeft = String(Number(left) + 1);
    return makePalindrome(nextLeft);
}