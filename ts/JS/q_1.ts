let events: string[] =  ["WD","NB","0","4","4"]
let score = 0
let counter = 0

for (let i = 0; i < events.length && counter < 10; i++) {

    if (Number.isInteger(Number(events[i]))) {
        score+=(+events[i])
        continue
    }

    if (events[i] === 'W') {
        counter++
        continue
    }

    if (events[i] === 'WD') {
        score++
        continue

    }

    if (events[i] === 'NB') {
        score++
        continue
    }

}
console.log([score, counter])
