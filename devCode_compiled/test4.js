"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var obj = new Object();
console.log(obj.toString()); // [object Object]
console.log(obj.hasOwnProperty); // [Function: hasOwnProperty]

var func = new Function();

// from Object and overwriteFunction
console.log(func.toString()); // function anonymous() {}

// func.prototype -> object.prototype
console.log(func.__proto__.__proto__.toString()); // [object Object]

console.log(func.hasOwnProperty); // from Object
console.log(_typeof(func.name), func.length); // string 0

var arr = new Array(1, 2, 3);

console.log(arr.length); // 3 固有スキル
console.log(arr.toString()); // 1,2,3 継承されて上書きされた
console.log(arr.__proto__.__proto__.toString()); // 1,2,3 継承されて上書きされた
console.log(arr.__proto__.displayName); // 1,2,3 継承されて上書きされた
console.log(arr.__proto__.bind); // 1,2,3 継承されて上書きされた

// console.log(arr.__proto__.__proto__.__proto__.toString()); // 1,2,3 継承されて上書きされた

var arr = new Array(1, 2, 3);

console.log(typeof Array === "undefined" ? "undefined" : _typeof(Array));
console.log(typeof arr === "undefined" ? "undefined" : _typeof(arr));
console.log(arr);