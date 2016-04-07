var arr = new Array(1, 2, 3);

console.log(arr.length); // from Array
console.log(arr.toString()); // from Array
console.log(arr.__proto__.__proto__); // Object.[[prototype]]
console.log(arr.__proto__.__proto__.toString()); // from Object

// MDNの継承の中にFunctionから継承されていそうな記載があるけどundefined
console.log(arr.displayName); // undefined
console.log(arr.bind); // undefined
console.log(arr.name); // undefined

// Globalに定義されているArray
// ArrayというFunction定義なので
// Function(ArrayというFunction Object) --> Function --> Object;
console.log(Array.__proto__); //Function(ArrayというFunction Object)
console.log(Array.__proto__.__proto__); // Function
console.log(Array.__proto__.__proto__.__proto__); //Object

// Arrayによって生成されるオブジェクト
// Arrayによって構築されるObjectはArrayがFunctionだとかは関係ないので
// Object --> Object
var arr = new Array(1, 2, 3);
console.log(arr.__proto__); // arrayによって生成されたObject(log [])
console.log(arr.__proto__.__proto__); // Object {}