/**
 * @shit
 * @github已经归档
 * @计算过程过于简单
 */

const mathsteps = require('mathsteps');
// const steps = mathsteps.solveEquation('2x + 3x = 35');

// steps.forEach(step => {
//     // console.log("计算前: " + step.oldEquation.ascii());  // e.g. before change: 2x + 3x = 35
//     // console.log("计算类型: " + step.changeType);                  // e.g. change: SIMPLIFY_LEFT_SIDE
//     console.log("计算过程: " + step.newEquation.ascii());   // e.g. after change: 5x = 35
//     // console.log("# of substeps: " + step.substeps.length);      // e.g. # of substeps: 2
// });


const steps = mathsteps.solveEquation('2x^3 + 3x = 35');

steps.forEach(step => {
    // console.log("计算前: " + step.oldEquation.ascii());  // e.g. before change: 2x + 3x = 35
    // console.log("计算类型: " + step.changeType);                  // e.g. change: SIMPLIFY_LEFT_SIDE
    console.log("计算过程: " + step.newEquation.ascii());   // e.g. after change: 5x = 35
    // console.log("# of substeps: " + step.substeps.length);      // e.g. # of substeps: 2
});