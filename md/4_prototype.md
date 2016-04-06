---
class: middle, center

.markerIn[
# prototype
]

---
class: middle, center

## prototype
JavaScript におけるすべてのオブジェクトは Object に由来します。<br>
すべてのオブジェクトはObject.prototype からメソッドとプロパティを継承しています。<br>
by MDN

---
class: middle, center

# 前置き
---
class: middle
.marker[functionを宣言すると内部的にFunctionオブジェクトがnewされる。]

そして.marker[全てのオブジェクトはprototypeプロパティ]を持つ。

prototypeは.marker[生成時に.__proto__に参照がセット]され、これらは一致する。

```
function hoge(){} // この時点でFunctionオブジェクトが生成され初期化されている
 console.log(hoge.prototype); // log Object {}
 console.log(hoge.prototype === hoge.__proto__); // true
```

---
class: middle

今回はprototypeへの参照は`__proto__`で行います。<br>
ただこの`__proto__`は.marker[ES5の標準仕様には含まれていません]。<br>
実装はブラウザ依存となっているので、IEはIE11からの対応となっています。

読み替えはこんな感じで！
```
function Hoge(){}
Hoge.prototype.xxx = 0;
var hoge = new Hoge();
hoge.__proto__.xxx === Hoge.prototype.xxx
```

ちなみにES6では`__proto__`は標準仕様に含まれました。<br>
が、同時にclass構文も実装されたりしているので、<br>
あまり使用する機会がないかもしれません。

---
class: middle, center
## prototype chain

---
class: middle
.borderBox[
オブジェクトはプロトタイプと呼ばれる、他のオブジェクト（または null ）への内部的な繋がりを持っています。
このプロトタイプオブジェクトは、あるオブジェクトがそのプロトタイプとして nullを持つまで、プロトタイプを継承します。
このような、オブジェクトが他のオブジェクトのプロトタイプとなる連鎖を、プロトタイプチェーンと呼びます。
by MDN
]

--

nullになるまでprototypeを辿っていくという話。<br>
nullになるのはObject.prototypeをさらに辿った場合にnullとなる。

そいつが持っているのか、というのを調べる`hasOwnProperty`物がある。<br>
これも実は`Object.prototype.hasOwnProperty`から継承されてきているという話。

---
class: middle, center
# よく分からなすぎてつらい


---
class: middle, center

```
// 0. この時点でTestというFunctionオブジェクトが生成される。
function Test(){}

// 1. Test自身がhasOwnPropertyを持っているかを調べる 
console.log(Test.hasOwnProperty('hasOwnProperty')); // false

// 2. TestのprototypeがhasOwnPropertyを持っているかを調べる
 console.log(Test.__proto__.hasOwnProperty('hasOwnProperty')); // false

// 3. 実は1と2って同じという話
 console.log(Test.hasOwnProperty === Test.__proto__.hasOwnProperty); // true

// 4. Test.__proto__.__proto___ は元のObjectを指している
 console.log(Test.__proto__.__proto__); // {}               
 console.log(Test.__proto__.__proto__.hasOwnProperty('hasOwnProperty')); // true

// 5. Test.__proto__.__proto__.__proto__ はオブジェクトまで遡ったためnullを返す
// どこから参照してもここまで辿って参照を探しに行きます。
console.log(Test.__proto__.__proto__.__proto__); // null

// TypeError: Cannot read property 'hasOwnProperty' of null
 console.log(Test.__proto__.__proto__.__proto__.hasOwnProperty('hasOwnProperty'));
```

---

Test.hasOwnProertyは使用できますが、これはようするに、<br>
`Test.__proto__.__proto__.hasOwnProperty('hasOwnProperty')`<br>
ここまでprototypeが参照を遡っているということです。<br>
Function.prototypeを参照して、Object.prototypeを参照してその先がないのでnullとなります。<br>

これがprototype chainです。
はい、よくわかりませんね。ええ。

---
class: middle, center
### コンストラクタの利用

`new`キーワードを付けて生成することで、実現可能です。
newをつけない場合ただの関数として機能します。
ここでもnewをつけるかつけないかでthisの参照が変わることになります。
またコンストラクタを利用する事を明示するためにそういう利用のされ方を想定している物はUpper Camelでの命名を利用する慣例があります。

---
class: middle, center
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

---
この場合hogeはcountプロパティを持つオブジェクトを生成します。
hogeとfugaのprototypeはインスタンス化する時点のHoge.prototypeの値です。

このコードを見れば分かりますが、functionのprototypeの中身は共通化されます。
その一方でconstructor内で定義した物はそのオブジェクトに紐付いていて、
new　したタイミングで初期化されます。

---
class: middle
## おまけ

`Hoge.prototype = {...}`というような記載は既に定義されているprototypeを上書きしてしまいますのでよくありません。タイプ数は押しまず`Hoge.hoge = ...`という定義を行うようにしましょう。

---
class: middle
## おまけ2

#### Object.create

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

---
class: middle, center
## おわりに
prototypeはjavascriptの中々の関門だと思いますが、ある程度把握しておくことは大事だと思います。
今回の説明だけでもまだまだ概要と仕組みを話しただけで、使われ方に関しては擬似クラスのような利用方法もあるので語るべきことは多くあります。

