// 1. Create a function using function declaration named sum with one parameter of Array type, the
// returned result is the sum of all elements which are greater than 20.

// 2. Create a function using function expression named getNewArray with one parameter of String
// Array, return a new array which contains all string, length is greater than and equal to 5, and
// contains letter ‘a’.

// 3. Implement an arrow function with feature below:

// concat('hi', [1,2,3], ['Hello','world']) -> return result: ['h', 'i', 1,2,3, 'Hello','world']

function sum(arr) {
    return arr.reduce((acc, cur) => cur > 20 ? acc + cur : acc)
}

const getNewArray = function (arr) {
    return arr.filter(word => word.length >= 5 && word.includes('a'))
}

const concat = (arg1, arg2, arg3) => { // (...arr) => { // old solution
    return [...arg1, ...arg2, ...arg3] // new solution
    // return arr.reduce((acc, cur) => {(typeof(cur) == 'object' ? acc.push(...cur) : acc.push(...cur.split('')))
    // return acc}, []) // old solution
}

let arrOfsum = [22, 10, 30, 5]
let arrOfwords = ['application', 'was', 'development', 'starship']


console.log(sum(arrOfsum))
console.log('##########################')
console.log(getNewArray(arrOfwords))
console.log('##########################')
console.log(concat('hi', [1, 2, 3], ['Hello', 'world']))