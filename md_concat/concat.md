class: middle

# thisから始まるjavascript
---

class: middle

# agenda

1  this<br>
2  closure<br>
3  types<br>
4  prototype<br>
---
class: middle, center
# 1 this

---
class: middle, center
# 問題
### ブラウザで実行した場合の結果はどうなるか

---
class: pdt100, center
## Q1

```javascript
console.log(this === window) //q1;
```

--
### true

---
class: pdt100, center
## Q2

```javascript
function q2(){
    console.log(this === window);
}

q2();  //q2;
```

--
### true

---
class: pdt100, center
## Q3

```javascript
var q3 = { 
    q3m: function(){
        console.log(this === window);
    } 
};

q3.q3m();  //q3;
```

--
### false

---
class: pdt100, center
## Q4

```javascript
function Q4(){
    console.log(this === window);
}    

new Q4();  //q4;
```

--
### false

---
class: pdt100, center
## Q5

```javascript
var q5 = {
    q5Func : function (){
        console.log(this === window);
    }
}

q5.q5Func(); //q5-1
q5.q5Func.apply(window); //q5-2
```

--
### false/false

---
class: middle, center

# 今日のゴール

---
class: pdt100, center
### thisの変化パターンをなんとなく知ること。<br>
### どうせ忘れるので覚えることは目的としない。
--
<br>
<br>
こんなこと知ってるよって方はすんません…

---
class: middle, center
# thisの種類

---
class: middle, center
## thisの参照の種類は4種類ある<br>
知ってる方は置いといて知らなかった人はこれだけは覚えて帰ってください。

---
class: middle, center
# と、その前にglobalのthisの話

---
### Q1

```javascript
console.log(this === window); //true
```

ブラウザで実行するとglobalのthisはwindowオブジェクトになります。

```javascript
console.log(this); // window object
```
--
<br>
__TIPS__<br>
これはブラウザではglobalにwindowオブジェクトが定義されているためで、javascriptのglobalはwindowだ、という理解では間違っています。<br>
例えばですが、node.jsでは異なる定義がされています。<br>
気になる方は`node`→`console.log(this);`してみてください。

---
class: middle, center
# 4種類のthis

---
class: middle, center
## 1. 関数呼び出しパターン
---
Q2

```javascript
function q2(){
    console.log(this === window);
}

q2(); // true
```

function hoge...として定義された関数の中のthisはglobalを参照します。

---
class: middle, center
## 2. メソッド呼び出しパターン
---
Q3

```javascript
var q3 = { 
    q3m: function(){
        console.log(this === window);
    } 
};

q3.q3m(); // false
```

オブジェクトの中に定義された**メソッドのthis参照**はそのオブジェクトがthisとして返されます。この場合はq3がthisとして返されます。

---
class: middle, center
## 関数とメソッド

関数とメソッドの差がよく分からない？<br>
簡単に説明するなら呼び出し時の記載方法をイメージすると良い。

```javascript
xxx.yyy(); // メソッド
yyy(); // 関数
```

---
class: middle, center
## 3. コンストラクタ呼び出しパターン
---
Q4

```javascript
function Q4(){
    console.log(this === window);
}    

new Q4(); // false
```

new されて新しいインスタンスが生成される場合、その中のthisはそれ自身を指します。この場合はq4を指します。

**TIPS**

この事からnewするかしないかでthisの参照が変わってしまうため、newを付けてインスタンスの初期化をして利用すべき物はUpper Camelの命名が用いられる事が多い。

---
class: middle, center
**用語**
インスタンス：

```text
オブジェクト指向言語においては、多くの場合クラスと呼ばれるものを元に作成したオブジェクトの実体を指す。 by wikipedia
```

オブジェクトの実態。

コンストラクタ：

```text
新たなオブジェクトを生成する際に呼び出されて内容の初期化などを行なう関数、メソッドのことである。 by wikipedia
```

オブジェクトを生成する際の初期化処理。

---
class: middle, center
## 4. call applyパターン

Q5

```javascript
var q5 = {
    q5Func : function (){
        console.log(this === window);
    }
}

q5.q5Func(); // false
q5.q5Func.apply(window); //true 
```

applyやcallするとapply(xxx)の引数の中身でthisを束縛します。



















---
class: middle, center

# 2 closure

```
引数以外の変数を実行時の環境ではなく、
自身が定義された環境（静的スコープ）において解決することを特徴とする。
関数とそれを評価する環境のペアであるともいえる。 by wikipedia
```

---
class: middle, center
簡単な例

```
var increment = (function() {
  var _count = 0;

  return function() {
      _count++;
      console.log(_count);
  }
})();
```


これは即時関数でfunctionを返すため、
内部の_countは外側からアクセスできません。
他の言語だと`private hoge`にあたるプライベートな変数となります。

---
class: middle, center

ちょっと深めな使い方例

```
function nameToAge(name) {
   var list = {
      'iso': '18',
      'gai': '45'
   };
   return list[name] || 'unknown';
}
```

これは名前を引数に与えると年齢を返す関数ですが、一見良さそうに見えるかもしれません。ただし、var listの中身は実は特に変更することもないし、外側からアクセスすることもありません。

なので一度定義したらそれを使い回すようにします。

```
var nameToAge = (function() {
   var list = {
      'iso': '18',
      'gai': '45'
   };
   return function(name) { return list[name] || 'unknown';};
})();
```

ここでまたしてもクロージャの出番でこのようになります。
こうすることによってnameToAgeに代入される時の一度listは定義され、外側からも変更できないように隠蔽することができます。

これ以上の深堀はあれですが、closureとメモリで検索すると面白いですぜ！



---
class: middle, center

# 3 データ型

---
class: middle, center
## 種類

__ES5は6種類、ES6は7種類。これ大事。__

-	Number 数値 42 や 3.14159 など。int/float等の区別はありません。
-	String 文字列 
-	Boolean 真偽値
-	Null null 値を意味する特殊なキーワードです。
-	Undefined 値が未定義
-	Object

**TIPS**
ES6ではシンボル (Symbol)という型が追加されています。
これはインスタンスが固有で不変となるデータ型です。
と言っても意味が分からないと思いますが、これは省きます。

---
class: middle, center
## データ型とtype of

```
// Numbers
typeof 37 === 'number';
typeof 3.14 === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // "Not-A-Number"とは言いながらこうなります

// Strings
typeof "" === 'string';
typeof "bla" === 'string';
typeof (typeof 1) === 'string'; // typeof はいつも文字列を返します

// Booleans
typeof true === 'boolean';
typeof false === 'boolean';

// Symbols
typeof Symbol() === 'symbol'
typeof Symbol('foo') === 'symbol'
typeof Symbol.iterator === 'symbol'

// Undefined
typeof undefined === 'undefined';
typeof blabla === 'undefined'; //未定義の変数

// Objects
typeof {a:1} === 'object';

// Array.isArray や Object.prototype.toString.call によっって普通のオブジェクトと配列を区別してください
typeof [1, 2, 4] === 'object'; 
typeof new Date() === 'object';

// Functions
typeof function(){} === 'function';
typeof Math.sin === 'function';

```

---
class: middle, center
## おまけ

オブジェクトとして生成してtype ofをするとまた結果が変わるのです。

```
var myNumber = new Number(23); // an object
var myNumberLiteral = 23; // primitive number value, not an 

// logs 'object Number'
console.log(typeof myNumber, typeof myNumberLiteral)
```

---
class: middle, center
## おまけ2
この辺りの認識が正しいと色々と理解しやすくなります。

```
var hoge = $('fuga');
console.log(typeof hoge);
```
このhogeってなんやねんって話になりますが、
舐めすぎだったら死にますが、これはただのobjectです。
逆にんなこたぁ知ってるよと言われるのであれば今回ちょっと内容不満ありですかな…。


---
class: middle, center

# 4. prototype

---
class: middle, center

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

---
class: middle, center
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

---
class: middle, center
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

この場合hogeはcountプロパティを持つオブジェクトを生成します。
hogeとfugaのprototypeはインスタンス化する時点のHoge.prototypeの値です。

このコードを見れば分かりますが、functionのprototypeの中身は共通化されます。
その一方でconstructor内で定義した物はそのオブジェクトに紐付いていて、
new　したタイミングで初期化されます。

---
class: middle, center
**TIPS**

ちなみにですが`Hoge.prototype = {...}`というような記載は既に定義されているprototypeを上書きしてしまいますのでよくありません。タイプ数は押しまず`Hoge.hoge = ...`という定義を行うようにしましょう。

こう記載することにより、bark関数の生成は一度となる。
汎用的に使う場合はprototypeで定義した方が良い。

---
class: middle, center
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

---
class: middle, center
## 長すぎてつらいので終わる
prototypeはjavascriptの中々の関門だと思いますが、ある程度把握しておくことは大事だと思います。
今回の説明だけでもまだまだ概要と仕組みを話しただけで、使われ方に関しては擬似クラスのような利用方法もあるので語るべきことは多くあります。

