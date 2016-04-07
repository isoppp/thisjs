"use strict";

var _obj;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hoge = function Hoge() {
  _classCallCheck(this, Hoge);

  this.foo = 0;
};

function Hoge() {
  //constructor
  this.foo = 0;
}

function test() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  console.log(typeof args === "undefined" ? "undefined" : _typeof(args)); // object
  console.log(args); // [ 1,2,3 ]
  console.log(args.length); // [ 1,2,3 ]
  console.log(arguments); // { '0': 1, '1': 2, '2': 3 }
}
test(1, 2, 3);

var s1 = Symbol("s");
var s2 = Symbol("s");
console.log(s1 === s1); // true
console.log(s1 === s2); // false

var sym = Symbol("foo");
var obj = (_obj = {}, _defineProperty(_obj, sym, 1), _defineProperty(_obj, "text", 'text'), _obj);
console.log(obj[sym]); // 1

for (var o in obj) {
  console.log(o);
}

var key = Symbol('hoge');
Array.prototype[key] = function () {};
var arr = [];

for (var o in arr) {
  console.log(o); // text
}
Array.prototype['key'] = function () {};

for (var o in arr) {
  console.log(o); // text
}

console.log(_typeof(null) === 'object');