function Hoge() {} // この時点でFunctionオブジェクトが生成され初期化されている
console.log(Hoge.prototype); // log Hoge {}

var hoge = new Hoge(); // Hoge.prototypeへの参照持つオブジェクトを作成
console.log(hoge.prototype); // undefined

console.log(Hoge.prototype === hoge.__proto__); // true
console.log(Hoge.prototype === hoge.prototype); // false
console.log(Hoge === hoge); // false

var fuga = Object.create(Hoge); // Hoge.prototypeを持つ新しいオブジェクトを生成
console.log(fuga.prototype); // log Hoge {}

console.log(Hoge.prototype === fuga.__proto__); // false
console.log(Hoge.prototype === fuga.prototype); // true
console.log(Hoge === fuga); // false