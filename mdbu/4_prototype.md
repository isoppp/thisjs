# 4. prototype

## prototype

JavaScript におけるすべてのオブジェクトは Object に由来します。すべてのオブジェクトはObject.prototype からメソッドとプロパティを継承しています。by MDN

functionを宣言すると内部的にFunctionオブジェクトがnewされていて、prototypeプロパティを持っています。

```
function hoge(){}
 console.log(hoge.prototype); // log Object {}
```

** 注意 **
今回はprototypeへの参照は`__proto__`で行う。という前提でソースを書きます。
ES6では`__proto__`は標準仕様に含まれましたが、ES5ではなんとも言えないので、その辺は一旦棚上げ。

## prototype chain

```
オブジェクトはプロトタイプと呼ばれる、他のオブジェクト（または null ）への内部的な繋がりを持っています。
このプロトタイプオブジェクトは、あるオブジェクトがそのプロトタイプとして nullを持つまで、プロトタイプを継承します。
このような、オブジェクトが他のオブジェクトのプロトタイプとなる連鎖を、プロトタイプチェーンと呼びます。
by MDN
```

ようするにnullになるまでprototypeを辿っていくという話。
nullになるのはObject.prototype.hogeから遡った場合。

そいつが持っているのか、というのを調べる`hasOwnProperty`物がある。
これも実は`Object.prototype.hasOwnProperty`から継承されてきているという話。

```
// 0. この時点でTestというFunctionオブジェクトが生成される。
function Test(){}

// 1. Test自身がhasOwnPropertyを持っているかを調べる console.log(Test.hasOwnProperty('hasOwnProperty')); // false

// 2. TestのprototypeがhasOwnPropertyを持っているかを調べる
 console.log(Test.__proto__.hasOwnProperty('hasOwnProperty')); // false

// 3. 実は1と2って同じという話
 console.log(Test.hasOwnProperty === Test.__proto__.hasOwnProperty); // true

// 4. Test.__proto__.__proto___ は元のObjectを指している

 console.log(Test.__proto__.__proto__); // {}               
 console.log(Test.__proto__.__proto__.hasOwnProperty('hasOwnProperty')); // true

// 5. Test.__proto__.__proto__.__proto__ はオブジェクトまで遡ったためnullを返す
// どこから参照してもここまでプロパティを遡って探しに行きます。

console.log(Test.__proto__.__proto__.__proto__); // null
  console.log(Test.__proto__.__proto__.__proto__.hasOwnProperty('hasOwnProperty')); // TypeError: Cannot read property 'hasOwnProperty' of null
```

Test.hasOwnProertyは使用できますが、これはようするに、
`Test.__proto__.__proto__.hasOwnProperty('hasOwnProperty')`
ここまでprototypeが参照を遡っているということです。
Function.prototypeを参照して、Object.prototypeを参照してその先がないのでnullとなります。

これがprototype chainです。
はい、よくわかりませんね。ええ。

### コンストラクタの利用

`new`キーワードを付けて生成することで、実現可能です。
newをつけない場合ただの関数として機能します。
ここでもnewをつけるかつけないかでthisの参照が変わることになります。
またコンストラクタを利用する事を明示するためにそういう利用のされ方を想定している物はUpper Camelでの命名を利用する慣例があります。

```
function Hoge() {
    this.count = 0;
}

Hoge.prototype.fuga = function (v) {
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
```

この場合hogeはcountプロパティを持つオブジェクトを生成します。
hogeとfugaのprototypeはインスタンス化する時点のHoge.prototypeの値です。

このコードを見れば分かりますが、functionのprototypeの中身は共通化されます。
その一方でconstructor内で定義した物はそのオブジェクトに紐付いていて、
new　したタイミングで初期化されます。


**TIPS**

ちなみにですが`Hoge.prototype = {...}`というような記載は既に定義されているprototypeを上書きしてしまいますのでよくありません。タイプ数は押しまず`Hoge.hoge = ...`という定義を行うようにしましょう。

こう記載することにより、bark関数の生成は一度となる。
汎用的に使う場合はprototypeで定義した方が良い。

### Object.create

このメソッドを呼び出すと、新しいオブジェクトが生成されます。関数の最初の引数が、このオブジェクトのプロトタイプになります。

```
var a = {a: 1}; 
// a ---> Object.prototype ---> null

var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (継承された)

var c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null
```


## 長すぎてつらいので終わる
prototypeはjavascriptの中々の関門だと思いますが、ある程度把握しておくことは大事だと思います。
今回の説明だけでもまだまだ概要と仕組みを話しただけで、使われ方に関しては擬似クラスのような利用方法もあるので語るべきことは多くあります。

