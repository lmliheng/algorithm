function minWindow(s, t) {
    const need = new Map()
    for (const c of t) {
        need.set(c, (need.get(c) || 0) + 1)
    }

    let left = 0
    let minLen = Infinity
    let start = -1
    let needCount = need.size

    for (let right = 0; right < s.length; right++) {
        const rc = s[right]

        if (need.has(rc)) {
            need.set(rc, need.get(rc) - 1)
            if (need.get(rc) === 0) needCount--
        }

        while (needCount === 0) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1
                start = left
            }

            const lc = s[left]
            if (need.has(lc)) {
                if (need.get(lc) === 0) needCount++
                need.set(lc, need.get(lc) + 1)
            }
            left++
        }
    }

    return start === -1 ? "" : s.slice(start, start + minLen)
}

console.log(minWindow("ADOBECODEBANC", "ABC")) // BANC