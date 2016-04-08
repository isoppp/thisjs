console.log(typeof /abc/ === 'object');

var o = Object.create(null);
console.log(o.__proto__); // undefined

var arr = new Array(1,2,3);

console.log(arr.length); // from Array
console.log(arr.__proto__); // []
console.log(arr.__proto__.__proto__); // {}
console.log(arr.__proto__.__proto__.__proto__); // {null

// MDNの継承の中にFunctionから継承されていそうな記載があるけどundefined
console.log(arr.displayName); // undefined
console.log(arr.bind); // undefined
console.log(arr.name); // undefined

function TimeCount() {
  this.time = 0;

  setInterval(function () {
    console.log('1',this.time); // undefined
  }, 1000);

  // self/that等で解消していた
  var self = this;
  self.selfTime = 0;
  setInterval(function () {
    self.selfTime++;
    console.log('2',self .selfTime);
  }, 1000);

  // 関数が定義されたスコープを捕捉して参照する
  setInterval(()=>{
    this.time++;
    console.log('3',this.time);
  }, 1000);
}

var time = new TimeCount();