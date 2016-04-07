class: middle

# thisから始まるjavascript
---

class: middle
## 適当紹介

元々はゲームの音屋さん。<br>
仕事が暇すぎて何か色々手を出し初めて...

- pythonでターミナルで動く[マスターマインド](https://ja.wikipedia.org/wiki/%E3%83%9E%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%9E%E3%82%A4%E3%83%B3%E3%83%89)作る
- Unityでアプリを作る（C#)
- この間ハイパー雑用係として色々何かやる
- Titanium mobileでアプリを作る(javascript)
- Web楽しそうでWebに業界にダイブしてみる。<br>
- ~~jsつらい…（今ここ）~~
---
class: middle,center

# 何これ？
---
class: middle,center

# javascriptって難しいよ！
###って話をします

---
class: middle
jsというかフロントの世界って.marker[動くコードと質の高いコードの幅]がかなりある。<br>
だからスキルレベルもかなりの幅がある世界。<br>

動けばいいでしょ！と言われても完全否定はできない、<br>
でも一応ご飯食べていくならちゃんと理解して書こうという話。

今後の流れとしてもjavascriptはちょいちょい難しくなっていくというか<br>
.marker[フロントエンジニアのカバー範囲が増えていく]流れ<br>

---
.u-tac[
## 最近
]
最近求人でこの辺のスキルを必要とされたりするようになってきた。<br><br>

.borderBox[
html : jade/slim等のテンプレートエンジン<br>
css : scss/stylus/less等のメタ言語の知識とBEM/SMACSS等のOOCSSの知識<br>
js : ES6(ES2015)/React/node.js/npm<br>
]

---
class: middle,center
# 多すぎわろた(^p^）

---
class: middle,center

~~まぁいいや~~
# 現実逃避してjsの勉強

---
class: middle,center
.u-tac.u-mgb30[
# thisから始まるjavascript
]

---
class: middle
.u-mgl60[
# agenda
.u-fs24[
1  this<br>
2  closure<br>
3  types<br>
4  prototype<br>
]
]

---
class: middle, center
# 1 this

---
class: middle, center
# 問題
### .marker[ブラウザで実行した場合]の結果はどうなるか

---
class: u-pdt60, center
## Q1

```javascript
console.log(this === window) //q1;
```

--
## true

---
class: u-pdt60, center
## Q2

```javascript
function q2(){
    console.log(this === window);
}

q2();  //q2;
```

--
## true

---
class: u-pdt60, center
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
## false

---
class: u-pdt60, center
## Q4

```javascript
function Q4(){
    console.log(this === window);
}    

new Q4();  //q4;
```

--
## false

---
class: u-pdt60, center
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
## false/true

---
class: middle, center

# 今日のゴール

---
class: middle, center
.markerIn[
### thisの変化パターンをなんとなく知ること。
]

どうせ忘れるので覚えることは目的としない。<br>
んなこと知ってるよって方はすんません…

---
class: middle, center
# thisの種類

---
class: middle, center
.markerSIn[
## 「.marker[thisの種類は4種類]」<br>
]
間違いなくテストにでます

---
class: middle, center
# と、その前に.marker[globalのthis]の話

---
.u-tac[
### globalのthis
]

Q1

```javascript
console.log(this === window); //true
```

ブラウザで実行するとglobalのthisはwindowオブジェクトになります。

```javascript
console.log(this); // window object
```
--
.borderBox[
.tips[TIPS]<br>
これはブラウザではglobalにwindowオブジェクトが定義されているためで、javascriptのglobalはwindowだ、という理解では間違っています。例えばですが、node.jsでは異なる定義がされています。<br>
気になる方は`node`→`console.log(this);`してみてください。
]
---
class: middle, center
# 4種類のthis

---
class: middle, center
## 1. 関数呼び出しパターン
---
.u-tac[
### 4種類のthis / 関数呼び出しパターン
]

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
.u-tac[
### 4種類のthis / メソッド呼び出しパターン
]

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
## .marker[関数とメソッド]

関数とメソッドの差がよく分からない？<br>
簡単に説明するなら.marker[呼び出す時の記載方法]をイメージすると良いです。

```javascript
xxx.yyy(); // メソッド
yyy(); // 関数
```

---
class: middle, center
## 3. コンストラクタ呼び出しパターン
---
.u-tac[
### 4種類のthis / コンストラクタ呼び出しパターン
]

Q4

```javascript
function Q4(){
    console.log(this === window);
}    

new Q4(); // false
```

new されて新しいインスタンスが生成される場合、その中のthisはそれ自身を指します。<br>
この場合はq4を指します。

--

.borderBox[
.tips[TIPS]<br>
newするかしないかでthisの参照が変わってしまうため、newを付けて新しくインスタンスを生成をして利用すべき物はUpper Camelの命名が使われる慣例があります。
]



---
class: middle
## 用語

#### インスタンス (instance) 訳:実体

.borderBox[
オブジェクト指向言語においては、多くの場合クラスと呼ばれるものを元に作成したオブジェクトの実体を指す。 by wikipedia
]

オブジェクトの実体。

#### コンストラクタ (constructor) 訳:建設者、建設会社

.borderBox[
新たなオブジェクトを生成する際に呼び出されて内容の初期化などを行なう関数、メソッドのことである。 by wikipedia
]

オブジェクトを生成時に呼び出される関数。

---
class: center
## コンストラクタについて

--
```javascript
function Q4(){
    console.log(this === window);
}

new Q4(); // false
```

--
.borderBox[
新たなオブジェクトを生成する際に呼び出されて内容の初期化などを行なう関数、メソッドのことである。 by wikipedia
]

--

### は？関数じゃねえじゃん。

って思うでしょ。その通りです。

---
class: middle, center
### ES5では...

```
function Hoge(){
  //constructor
  this.foo = 0;
}
```

これはclass構文がないからであって<br>
.small[(内部的にはprototype.constructorがHogeを参照する)]

---
class: middle, center
### ES6では...

```
class Hoge{
    constructor(){
        this.foo = 0;
    }
}
```

というようにちゃんと関数で実装できるようになりました。

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

.u-tac[
# ４種類のthis
]

--
__1. 関数呼び出しパターン__<br>
`hoge();`
これはグローバルを参照する。

--

__2. メソッド呼び出しパターン__<br>
`hoge.fuga();`
これはfuga内にthis参照がある場合hogeを参照する。

--

__3. コンストラクタ呼び出しパターン__<br>
`new Hoge()`
これはHoge内に`this.a=...`のようなthis参照がある場合Hoge自身を参照する。

--

__4. call applyパターン__<br>
`function.call(hoge)`/`function.apply(hoge)`はfunctionに渡すthisを束縛する。

















---
class: middle, center
# Kobanashi of jQuery

---
class: middle, center
```
$this = $(this);
```

よくこういうことやりますね。<br>
何か不思議だなとか思った事ありますか？

---
class: middle, center
今回はeachを例に見てみますが…

```
var arr = [1, 2, 3];

arr.forEach(function (item, index, array) {
  console.log(this); // window
});

$.each(arr, function () {
  console.log(this); // 1,2,3...
});
```

--
これも普通に考えると変ですよね？<br>
jQueryのeachを見に行ってみます。

---
class: middle, center
## each in jquery
```
function each(obj, callback) {
  var length,
      i = 0;

  if (isArrayLike(obj)) {
    length = obj.length;
    for (; i < length; i++) {
      if (callback.call(obj[i], i, obj[i]) === false) { //ここ！
        break;
      }
    }
  } else {
    for (i in obj) {
      if (callback.call(obj[i], i, obj[i]) === false) { //ここ！
        break;
      }
    }
  }

  return obj;
}
```

---
class: middle, center
## callで束縛されていた！

というだけでした。<br>
今ならなんとなくは理解できるのではないかと思います。

あまりcall/apply/bindを乱用すると訳が分からなくなるので、<br>
jqueryのthisの束縛に関しては.marker[負の遺産]と表現する人もおられます。

ご注意を！

---
class: middle, center

# 2 closure

.u-tal[
引数以外の変数を実行時の環境ではなく、自身が定義された環境（静的スコープ）において解決することを特徴とする。関数とそれを評価する環境のペアであるともいえる。<br>
by wikipedia
]
---
class: middle
#### 簡単な例

```
var increment = (function() {
  var _count = 0;

  return function() {
      _count++;
      console.log(_count);
  }
})();
```


これは即時関数でfunctionを返すため、<br>
内部の_countは外側からアクセスできません。<br>
他の言語だと`private hoge`にあたるプライベートな変数となります。

---
class: middle

#### ちょっと深めな使い方例

```
function nameToAge(name) {
   var list = {
      'iso': '18',
      'gai': '45'
   };
   return list[name] || 'unknown';
}
```

これは名前を引数に与えると年齢を返す関数です。<br>
一見良さそうに見えるかもしれませんが、<br>
`var list`の中身は実は特に変更することもないし、<br>
外側からアクセスすることもありません。<br>
（という設計思想ということにしてください）<br>
なので一度定義したらそれを使い回すようにします。

---
class: middle
#### 書き換えてみると…
```
var nameToAge = (function() {
   var list = {
      'iso': '18',
      'gai': '45'
   };
   return function(name) { return list[name] || 'unknown';};
})();
```

こうすることによってnameToAgeに代入される時に一度だけ`list`は定義され、<br>
外側からも変更できないように隠蔽することができます。<br><br>
これ以上の深堀はあれですが、メモリも関連していたりするので、<br>
closureとメモリで検索すると面白いですぜ！



---
class: middle, center

# 3 データ型

---
class: middle

.u-tac[
## 種類

__.marker[ES5は6種類、ES6は7種類]。これ大事。__

]

.marker[Number] :数値 42 や 3.14159 など(int/float等の区別はありません。)<br>
.marker[String] :文字列<br>
.marker[Boolean] :真偽値<br>
.marker[Null] :null 値を意味する特殊なキーワードです。<br>
.marker[Undefined] :値が未定義<br>
.marker[Object]

__ES6で追加__

.marker[Symbol] :インスタンスが固有で不変

---
class: middle, center

.markerIn[
## Symbol(ES6)
]

__インスタンスが固有で不変__ってなんやねん？

---

一度定義したらそれと一致する値を再度生成することは不可能な値です。

```
Symbol("hoge") === Symbol("hoge"); // false
```

--


```
var s1 = Symbol("s");
var s2 = Symbol("s");
console.log(s1 === s1); // true
console.log(s1 === s2); // false
```

--
そしてこれは`for in`ループで検知されません。

```
const sym = Symbol("foo");
const obj = {[sym]: 1, text:'text'};
console.log(obj[sym]); // 1

for(var o in obj){
  console.log(o); // text
}
```

---
.small[正直使いどころや使う場所が難しいが…]

--

```
var key = Symbol('hoge');
someLibrary[key] = function(){...}
```
このメソッド名使われてたっけ？みたいなのを気にせず拡張できる。

--
```
var key = Symbol('hoge');
Array.prototype[key] = function(){...}
var arr = [];

for(var o in obj){
  console.log(o); // no log
}
Array.prototype['key'] = function(){...}

for(var o in obj){
  console.log(o); // key
}
```
.marker[for in に検知されない]のもあり、<br>
確実にオリジナルなメソッドを組み込みのオブジェクトに拡張できる

---
class: middle,center
## らしい

---
class: middle,center

その他enumっぽいものを作りたくてそのvalueとして使う。<br>
.small[（とはいえvalueをsymbolにしたらenumとはまた違うんじゃ？って突っ込みたい）]<br>
とかがあるのですが、先ほど例に出した拡張性を担保するための機能のようです。

---
class: middle,center
# 詳しくはWEBで！

---
class: middle, center
## データ型とtype of

---
class: middle, center
# Numbers
```
typeof 37 === 'number';
typeof 3.14 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // "Not-A-Number"とは言いながらこうなります
```

---
class: middle, center
# Strings
```
typeof "" === 'string';
typeof "hoge" === 'string';
typeof (typeof 1) === 'string'; // typeof は必ず文字列を返します
```

---
class: middle, center
# Booleans
```
typeof true === 'boolean';
typeof false === 'boolean';

```

---
class: middle, center
# Symbols
```
typeof Symbol() === 'symbol'
typeof Symbol('foo') === 'symbol'
typeof Symbol.iterator === 'symbol'

```

---
class: middle, center
# Undefined
```
typeof undefined === 'undefined';
typeof aiueo === 'undefined'; //未定義の変数

```

---
class: middle, center
# Objects
```
typeof {a:1} === 'object';

```

---
class: middle, center
# Objects(Array/Functions/Null)
```
typeof [1, 2, 4] === 'object';
typeof new Date() === 'object';

typeof function(){} === 'function';
typeof Math.sin === 'function';

typeof null === 'object'
```

---
class: middle, center
# ん？

---
class: middle, center
# 最後のやつが気になる？流石です

---
.u-tac[
## Array
]

#### 問題

```
typeof [1, 2, 4]
```

--

答え:object

--

- 型
    object
- typeof
    object

---
.u-tac[
## Function
]

#### 問題

```
typeof function(){} === 'function';
typeof Math.sin === 'function';
```

--

答え:object

--

- 型
    object
- typeof
    function

---
.u-tac[
## Null
]

#### 問題

```
typeof null
```

--

答え:object

--

- 型
    null
- typeof
    object

---

class: middle, center
## おまけ

オブジェクトとして生成してtype ofをするとまた結果が変わります。

```
var myNumberNew = new Number(23);
var myNumber = 23;

// logs 'object Number'
console.log(typeof myNumberNew, typeof myNumber)
```

---
class: middle, center
# orz
---

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
class: middle
.marker[functionを宣言するとObjectによってFunctionオブジェクトがnewされる。]

.marker[Objectによって作られたのでObject.prototypeを継承している]。

prototypeは.marker[インスタンス生成時に]`__proto__`.marker[に参照がセット]され、これらは一致する。

```
function Hoge(){} // この時点でFunctionオブジェクトが生成され初期化されている
console.log(Hoge.prototype); // Hoge {}

var hoge = new Hoge(); // Hoge.prototypeへの参照持つオブジェクトを作成
console.log(hoge.prototype); // undefined

console.log(Hoge.prototype === hoge.__proto__); // true
console.log(Hoge.prototype === hoge.prototype); // false
console.log(Hoge === hoge); // false

var fuga = Object.create(Hoge); // Hoge.prototypeを持つ新しいオブジェクトを生成
console.log(fuga.prototype); // Hoge {}

console.log(Hoge.prototype === fuga.__proto__); // false
console.log(Hoge.prototype === fuga.prototype); // true
console.log(Hoge === fuga); // false
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
class: middle, center
# よく分からなすぎてつらい

.small[大事な事なので(ry]

---
class: middle

.markerIn.tac[
### コンストラクタの利用
]

`new`キーワードを付けて生成することで、実現可能です。<br>
newをつけない場合ただの関数として機能します。<br>
ここでもnewをつけるかつけないかでthisの参照が変わることになります。<br>
thisの所でも記載しましたが、コンストラクタを利用する事を明示するためには<br>
.marker[Upper Camel]の命名にしましょう！

---
class: middle
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
console.log(hoge.a , fuga.a); // 4  4 共にHoge.__proto__.aを参照しています。
```

.small[
この場合hogeはcountプロパティを持つオブジェクトを生成します。
hogeとfugaのprototypeはインスタンス化する時点のHoge.prototypeの値です。
定義されたprototypeの中身は共通化されます。
その一方でconstructor内で定義した値はそのオブジェクトに紐付いていて、`new`したタイミングで初期化されます。
]
---
class: middle
## おまけ(prototypeの定義方法)

`Hoge.prototype = {...}`というような記載は既に定義されているprototypeを上書きしてしまいますのでよくありません。タイプ数は押しまず`Hoge.prototype.hoge = ...`という定義を行うようにしましょう。

---
class: middle
## おまけ2(Object.create)

#### Object.create

最初のサンプルで使用していますが、このメソッドを呼び出すと、新しいオブジェクトが生成されます。関数の最初の引数が、このオブジェクトのプロトタイプになります。

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
# おわりに

---
class: middle, center
# よく分からなすぎてつらい

.small[大事な事なので(ry]

---
class: middle, center
# Final Object Quest

---
class: middle

.u-tac[
## prototype chainを職業ツリーに例えてみる。
]

- .hoge = その職業の時のみ使用できるスキル（固有スキル）
- .prototype.hoge = 転職しても引き継がれるスキル（継承スキル）

.borderBox[
オブジェクトはプロトタイプと呼ばれる、他のオブジェクト（または null ）への内部的な繋がりを持っています。
このプロトタイプオブジェクトは、あるオブジェクトがそのプロトタイプとして nullを持つまで、プロトタイプを継承します。
このような、オブジェクトが他のオブジェクトのプロトタイプとなる連鎖を、プロトタイプチェーンと呼びます。
by MDN
]

Object(見習い) = 初期キャラクタ状態。

全てのキャラクターは必ず見習い(Object)から始まる。

---

#### Object（見習い）

```
var obj = new Object();
```


.small[
見習いは全てのキャラクターが作成された場合の初期職業です。

##### 固有スキル

こいつの固有スキルはややこしいので省略。

##### 継承スキル（一部）

- toString();
- hasOwnProperty();
]

---
#### Function(マモノ使い)

```
var func = new Function();
```

.small[
マモノ使いには見習い（Object）のジョブをマスターしている必要がある。<br>
（これはシステム的に決まっている）

##### 固有スキル（一部）

- name
- length

##### 継承スキル（一部）

- toString() 見習いから継承されているが、ここでスキル内容が別のものに強化（上書き）される。
- apply()

#### 継承されているスキル（一部）

- toString(); 見習い（Object)から継承されたスキル
- hasOwnProperty(); 見習い（Object)から継承されたスキル
]

---

#### 自分で職業を定義してWizardを作る

```
function Wizard(){
    this.thunder = 'thunder' // 固有スキル
}

Wizard.prototype.fireball = 'fireball' // 継承スキル
```

--

#### 上級職のHiWizardを作る

```
function HiWizard(){
    this.thunderStorm = 'thunderStorm'; // 固有スキル
}

// こいつはWizardから転職するよという定義
Object.setPrototypeOf(HiWizard.prototype, Wizard.prototype);

HiWizard.prototype.volcano = 'volcano'; // 継承スキル
```


---

### 使ってみる

```
var wiz = new Wizard();
console.log(wiz.thunder);
console.log(wiz.fireball);

var hiWiz = new HiWizard();
console.log(hiWiz.thunder); // undefined Wizardの固有スキル
console.log(hiWiz.fireball); // fireball Wizardの継承スキル
console.log(hiWiz.thunderStorm); // thunderStorm HiWizardの固有スキル
console.log(hiWiz.volcano); // volcano HiWizardの継承スキル
```

上手くいきました。<br>
`Object.setPrototypeOf(子.prototype、親.prototype)`で子に親の<br>
prototypeを継承させることにより親子関係を定義する事ができます。
---

### Wizardのプロトタイプチェーン

```
console.log(hiWiz.__proto__); // HiWizard { volcano: 'volcano' }
console.log(hiWiz.__proto__.__proto__); // Wizard { fireball: 'fireball' }
console.log(hiWiz.__proto__.__proto__.__proto__); // {}
```

インスタンスを生成するとオブジェクトが返されるのでマモノ使い（Function)は含まれません。

```
console.log(Wizard); // Function Wizard
console.log(Wizard.__proto__); // Function
console.log(Wizard.__proto__.__proto__); // Object
```

インスタンスを生成する前の`Wizard`自体はFunctionです。
インスタンスを生成して返ってくるobjectは生成されたObjectとなります。

---
class: middle, center
## どうでしたか？

---
class: middle, center
## さらに深堀りしていくときりが無いので一旦ここまでにします。
---
class: middle, center

# おわりに

正直何をどこまで説明すれば良いのかがわからずで、<br>
いろいろ中途半端だったらすみません…。

今回の話をもっとちゃんと理解した方が良い所や、<br>
他のアプローチもあったりするので、<br>
がんがん今回をきっかけにして深堀りして頂けると嬉しいです。

---
class: middle, center

# ありがとうございました！
<br>
<br>
.u-tar[
thisから始まるjavascript

~Fin~
]

