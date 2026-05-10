 let s = "1010"
 let n = s.length;
    let pattern1 = ""; 
    let pattern2 = ""; 

    for (let i = 0; i < n; i++) {
        pattern1 += i % 2 === 0 ? "0" : "1";
        pattern2 += i % 2 === 0 ? "1" : "0";
    }

    let diff1 = 0;
    let diff2 = 0;

    for (let i = 0; i < n; i++) {
        if (s[i] !== pattern1[i]) diff1++;
        if (s[i] !== pattern2[i]) diff2++;
    }

    console.log(Math.min(diff1, diff2))
