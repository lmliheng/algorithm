
let time = [5, 10, 10]
let totalTrips = 9

let t = 0
while (true) {
    let trips = 0
    t++
    for (let i = 0; i < time.length; i++) {
        trips += Math.floor(t / time[i])
        console.log('t: ' + t + ', trips加上' + Math.floor(t / time[i]))
    }

    if(trips >=totalTrips){
        break
    }
}
console.log(t)