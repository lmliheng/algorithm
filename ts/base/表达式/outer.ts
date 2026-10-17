/**
 * @outer
 * 
 */
let stop=false
outer:
for (let i = 0; i < 10; i++) {
    if(stop){
        break
    }
    for (let j = 0; j < 5; j++) {
        if (Math.random() > 0.5) {
            stop=true
            continue outer
        }
    }
}

