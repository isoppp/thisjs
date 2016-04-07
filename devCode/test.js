class Hoge{
  constructor(){
    this.foo = 0;
  }
}

function Hoge(){
  //constructor
  this.foo = 0;
}

function test (...args){
  console.log(typeof args); // object
  console.log(args); // [ 1,2,3 ]
  console.log(args.length); // [ 1,2,3 ]
  console.log(arguments); // { '0': 1, '1': 2, '2': 3 }
}
test(1,2,3);

var s1 = Symbol("s");
var s2 = Symbol("s");
console.log(s1 === s1); // true
console.log(s1 === s2); // false

const sym = Symbol("foo");
const obj = {[sym]: 1, text:'text'};
console.log(obj[sym]); // 1

for(var o in obj){
  console.log(o);
}


var key = Symbol('hoge');
Array.prototype[key] = function(){}
var arr = [];

for(var o in arr){
  console.log(o); // text
}
Array.prototype['key'] = function(){}

for(var o in arr){
  console.log(o); // text
}

console.log(typeof null === 'object');


