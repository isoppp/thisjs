'use strict';

function Hoge() {
  this.count = 0;
}

Hoge.prototype.fuga = function () {
  this.count++;
  this.__proto__.a++;
  console.log('a', this.__proto__.a);
  console.log('count', this.count);
};
Hoge.prototype.a = 0;

var hoge = new Hoge();
var fuga = new Hoge();
console.log(hoge); //{ count: 0, text: '' }
console.log(hoge.__proto__); //{ fuga: [Function] }
hoge.fuga(); // a 1 count 1
hoge.fuga(); // a 2 count 2
fuga.fuga(); // a 3 count 1
fuga.fuga(); // a 4 count 2
console.log(hoge.a); // 4 Hoge.__proto__.aを参照しています。
console.log(fuga.a); // 4 Hoge.__proto__.aを参照しています。