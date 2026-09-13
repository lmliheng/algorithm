/**
 * @mathjs
 */

import { eigs, matrix } from 'mathjs';

const A = [[1, 2], [3, 4]];
const { values, vectors } = eigs(A);

console.log('特征值:', values.toArray ? values.toArray() : values);
console.log('特征向量(列):', vectors.toArray ? vectors.toArray() : vectors);