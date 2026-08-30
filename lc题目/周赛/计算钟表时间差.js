
let startTime = "12:34:56"
let endTime = "13:00:00"
const computedSeconds = (str) => {
   return (+str.slice(0,2))*3600+(+str.slice(3,5))*60+(+str.slice(6))
}

console.log(computedSeconds(endTime)-computedSeconds(startTime))