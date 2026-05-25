let str='aBaAb'
console.log('a'.charCodeAt(0)) // 97
console.log('A'.charCodeAt(0)) // 65

console.log('a'> 'A') // 97 > 65 => true
console.log('a'> 96) // 97 > 65 => true

console.log('a'.includes('A')) // false
console.log('a'.toLowerCase().includes('A'.toLowerCase())) // true