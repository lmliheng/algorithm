type ToBeOrNotToBe = {
    toBe: (val: any) => boolean;
    notToBe: (val: any) => boolean;
};

function expect( val: any): ToBeOrNotToBe {

    const toBe = (b:any) => {
        if (b === val) {
            return true
        } else {
            throw new Error("Not Equal")
        }
    }
    const notToBe=(nb:any)=>{
       if(nb!==val){
        return true
       }else{
        throw new Error("Equal")
       }

    }
    return {toBe,notToBe}
};

/**
 * expect(5).toBe(5); // true
 * expect(5).notToBe(5); // throws "Equal"
 */

console.log(expect(5).notToBe(null))