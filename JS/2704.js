"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function expect(val) {
    const toBe = (b) => {
        if (b === val) {
            return true;
        }
        else {
            throw new Error("Not Equal");
        }
    };
    const notToBe = (nb) => {
        if (nb !== val) {
            return true;
        }
        else {
            throw new Error("Equal");
        }
    };
    return { toBe, notToBe };
}
;
/**
 * expect(5).toBe(5); // true
 * expect(5).notToBe(5); // throws "Equal"
 */
console.log(expect(5).notToBe(null));
