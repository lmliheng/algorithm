let gas:number[] = [5,1,2,3,4]
let cost:number[] = [4,4,1,5,1]
let l=gas.length
    // 保证解是唯一的。。
    let start:number[]=[] // 有效起点
    for(let i=0;i<l;i++){
        if(gas[i]>=cost[i]){
            start.push(i)
        }
    }
    if(start===null){
        console.log(-1)    
    }

console.log(start)
    for (let i = 0; i < start.length; i++) {
        let car_oil = 0  // start[0]=3,[1]=4
        let disable = false
        

        if (start[i] === 0) {
            console.log("start:0")
            
            for (let m = 0; m < l; m++) {
                if (m === 0) {
                    car_oil = gas[m]
                } else if (m === l - 1) {
                    car_oil = car_oil - cost[l - 1]
                }
                else {
                    car_oil = car_oil + gas[m] - cost[m - 1]
                }
                console.log("当前油量:",car_oil)
                if (car_oil < 0) {
                    disable = true //油量耗尽 
                    break
                }
            }
            if (disable) {
                continue
            } else {
                //console.log("start:0,当前油量:",car_oil)
                console.log(start[i])
            }

        } else {


            for (let m = start[i]; m < l; m++) {
                if (m === start[i]) {
                    car_oil = gas[m]
                } else {
                    car_oil = car_oil + gas[m] - cost[m - 1]
                }
                if (car_oil < 0) {
                    disable = true
                    break
                }
            }

            if (disable) {
                continue
            }

            for (let n = 0; n <= start[i]; n++) {

                if (n === 0) {
                    car_oil = car_oil + gas[n] - cost[l - 1]
                } else if (n === start[i]) {
                    car_oil = car_oil - cost[n - 1]
                } else {
                    car_oil = car_oil + gas[n] - cost[n - 1]
                }

                if (car_oil < 0) {
                    disable = true
                    break
                }

            }

            if (disable) {
                continue
            } else {
                console.log(i)
            }
        }


    }

        
    
