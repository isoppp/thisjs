class: middle

# thisから始まるjavascript
---

class: middle
## 適当紹介

元々はゲームの音屋さん。<br>
仕事が暇すぎて何か色々手を出し初めて...

- pythonでターミナルで動くマスターマインド作る
- Unityでアプリを作る（C#)
- この間ハイパー雑用係として何か色々やる
- Titanium mobileでアプリを作る(javascript)
- Web楽しそうだったので勢いでWeb業界にダイブしてみる。<br>
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
2  types<br>
3  prototype<br>
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
.markerIn[
## true
]
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
.markerIn[
## true
]
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
.markerIn[
## false
]
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
.markerIn[
## false
]
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
.markerIn[
## false/true
]

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
間違いなくテストにでます。

<br>
.small[
.small[
(正確には.marker[thisの設定のされ方のパターン]です)
]
]

---
class: middle, center
# と、その前に<br>.marker[グローバルのthis]の話

---
.u-tac[
### グローバルのthis
]

Q1

```javascript
console.log(this === window); //true
```

ブラウザで実行すると`this`は`window`オブジェクトを参照します。

```javascript
console.log(this); // window object
```
--
.borderBox[
.tips[TIPS]<br>
これはブラウザではグローバルオブジェクトにグローバルオブジェクト自身を参照する`window`プロパティが定義されているためで、javascriptのグローバルは`window`だ、という理解では間違っています。例えばですが、node.jsでは異なる定義がされています。<br>
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

function hoge...として定義された.marker[関数の中のthisはグローバル]を参照します。

.borderBox[
.tips[TIPS]<br>
ただし、node(CommonJS)やES6のモジュールで定義された関数の場合は`undefined`になります。
]

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

.marker[メソッドとして呼び出された関数のthisはそのオブジェクトがthis]として設定されます。この場合はq3がthisとして返されます。

---
class: middle, center
## 関数とメソッド

関数とメソッドの差がよく分からない？<br>
.marker[呼び出す時の記載方法]をイメージします。

```javascript
var q3 = {
    q3m: function(){
        console.log(this === window);
    }
};

q3.q3m(); // false メソッドとしての呼び出し
var q3m = q3.q3m; // メソッドを変数に代入
q3m(); // true 関数としての呼び出し
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

.marker[コンストラクタ関数の中のthisは生成されたインスタンス]を指します。<br>
この場合は`new Q4()`によって生成されるインスタンスを指します。

---
.u-tac[
### コンストラクタ小話
]

1. `new`をつけて呼び出すとコンストラクタが実行され新しいインスタンスを生成する。<br>
2. `new`しないと関数として動作する。

ということは.marker[どちらかによって`this`の参照先が変化]するということ。

__命名__<br>
`new`つけて使ってくれ！という意思表示をしたい場合には、<br>
.marker[Upper Camelの命名]にする慣例があります。

__インスタンスのチェック__<br>
命名をつけた所で`new`をつけ忘れる場合があるということで、関数側で.marker[newが無くてもinstanceを生成するようにする]ことも慣例となっているようです。

```
function Q4(){
    if (!(this instanceof Q4)) return new Q4();
}

```

---
class: middle
## 用語

#### .marker[インスタンス (instance) 訳:実体]

.borderBox[
オブジェクト指向言語においては、多くの場合クラスと呼ばれるものを元に作成したオブジェクトの実体を指す。 by wikipedia
]

オブジェクトの実体。

#### .marker[コンストラクタ (constructor) 訳:建設者、建設会社]

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

### は？どこの事いってんの？

って思うでしょ

---
class: middle, center
### ES5では...

```
function Hoge(){
  //constructor
  this.foo = 0;
}
```

これはclass構文ではないので分かりにくいですが…<br>
.small[(内部的には`new`で呼び出された場合はその関数自身がconstructorとして扱われる)]

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

class構文が導入されたので分かりやすくなりました。

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

applyやcallすると.marker[apply(xxx)の引数の中身でthisを束縛]します。

---

.u-tac[
# 4種類のthis
]

--
.marker[__1. 関数呼び出しパターン__]<br>
`hoge();`
これはグローバルを参照する。

--

.marker[__2. メソッド呼び出しパターン__]<br>
`hoge.fuga();`
これはfuga内にthis参照がある場合hogeを参照する。

--

.marker[__3. コンストラクタ呼び出しパターン__]<br>
`new Hoge()`
これはHoge内に`this.a=...`のようなthis参照がある場合作成されたインスタンスを参照する。

--

.marker[__4. call applyパターン__]<br>
`function.call(hoge)`/`function.apply(hoge)`はfunctionに渡すthisを束縛する。

---
class: middle, center
と、みせかけて…
# 5種類のthis(ES6)
.small[.small[ファッ！？]]

---
# ES6

- let(ローカル変数宣言）
- const（定数宣言)
- for...of（valueのループ）
- Symbol(不変なインスタンスの型)
- \`\`(テンプレートストリング)
- function(val = 0)（デフォルト引数）
- {}（ブロックスコープ）
- function(...hoge)（名前が分からない）

などなど色々な物が増えています。<br>
が、ES6については深くは触れません。<br>
今回はthisの話になります。

---
class: middle, center
# .marker[thisで重要なのはアロー関数]

.small[.small[アローファンクションとかファットアローとか言われます。]]
---
class: middle, center
# () => {}

---
class: middle, center
.rotate90[
# () => {}
]

.small[.small[何か顔に見えますね…]]

---
#### arrow functionにおけるthis

```
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
    console.log('2',self .selfTime); // 1..2..3..
  }, 1000);

  // arrow functionは関数が定義されたスコープを参照する
  setInterval(() => {
    this.time++;
    console.log('3',this.time); // 1..2..3..
  }, 1000);
}

var time = new TimeCount();
```

---
class: middle, center
と、いうことで…

## .marker[ES5は4]種類
## .marker[ES6は5]種類

でした。
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
これも何か変ですよね？<br>
せっかくなのでjQueryのeachを見に行ってみます。

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
きっと今なら理解できるのではないかと思います。

あまりcall/apply/bindを乱用すると訳が分からなくなるので、<br>
jqueryのthisの束縛に関しては.marker[負の遺産]と表現する人もおられます。

ご注意を！

---
class: middle, center
### 質疑応答＆休憩タイム！
---
class: middle, center

# 2 データ型

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
# Objects(Array/Functions/Null/RegExp)
```
typeof [1, 2, 4] === 'object';
typeof new Date() === 'object';

typeof function(){} === 'function';
typeof Math.sin === 'function';

typeof null === 'object'

typeof /abc/ === 'object'
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

#### 問題. 結果はなんでしょう

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

#### 問題. 結果はなんでしょう

```
typeof function(){}
typeof Math.sin
```

--

答え:function

--

- 型
    object
- typeof
    function

---
.u-tac[
## null
]

#### 問題. 結果はなんでしょう

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

.u-tac[
## RegExp
]

#### 問題. 結果はなんでしょう

```
typeof /abc/
```

--

答え:object

--

- 型
    object
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
class: middle, center
# Kobanashi of jQuery

---
class: middle
この辺りの認識が正しいと色々と理解しやすくなります。

```
var hoge = $('fuga');
console.log(typeof hoge);
```
このhogeってなんやねんって話になりますが、<br>
舐めすぎだったら死にますが、これはただのobjectです。

`hogehoge is not defined`<br>
`hogehoge is not a function`<br>
みたいなエラーが出てあばばばばってなりますが、<br>
ただのオブジェクトだと分かっていればちょっとは追いやすくなるはずです！

逆にんなこたぁ知ってるよと言われるのであれば今回ちょっと内容不満ありですかな…。

---
class: middle, center
### 質疑応答＆休憩タイム！
---
class: middle, center

.markerIn[
# 3 prototype
]

---
class: middle, center

## prototype
JavaScript におけるすべてのオブジェクトは Object に由来します。<br>
すべてのオブジェクトはObject.prototype からメソッドとプロパティを継承しています。<br>
by MDN

.borderBox.small.u-tal[
.small[
.tips[TIPS]<br>
例外として、下記の方法で生成することでprototype継承を行わないオブジェクト生成も可能です。
```
var o = Object.create(null);
console.log(o.__proto__); // undefined
```
]
]

---
class: middle
#### Example
.marker[functionを宣言すると宣言した時点でFunctionインスタンスがnewされる]。<br>
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
class:
### prototype chain とは
.borderBox[
オブジェクトはプロトタイプと呼ばれる、他のオブジェクト（または null ）への内部的な繋がりを持っています。
このプロトタイプオブジェクトは、あるオブジェクトがそのプロトタイプとして nullを持つまで、プロトタイプを継承します。
このような、オブジェクトが他のオブジェクトのプロトタイプとなる連鎖を、プロトタイプチェーンと呼びます。
by MDN
]

--

nullになるまでプロトタイプを辿っていくという話。<br>
nullになるのはObject.prototypeをさらに辿った場合にnullとなる。

それ自身が保持しているのか、というのを調べる`hasOwnProperty`という関数がある。<br>
これも実は`Object.prototype.hasOwnProperty`から継承されてきているという話。

---
class: middle, center
# よく分からなすぎてつらい


---
class: middle, center

```
// 0. この時点でTestというFunctionオブジェクトが生成される。
function Test(){}
var test = new Test();

// 1. test自身がhasOwnPropertyを持っているかを調べる 
console.log(test.hasOwnProperty('hasOwnProperty')); // false

// 2. testのprototypeがhasOwnPropertyを持っているかを調べる
 console.log(test.__proto__.hasOwnProperty('hasOwnProperty')); // false

// 3. 実は1と2って同じという話
 console.log(test.hasOwnProperty === test.__proto__.hasOwnProperty); // true

// 4. test.__proto__.__proto___ は元のObjectを指している
 console.log(test.__proto__.__proto__); // {}
 console.log(test.__proto__.__proto__.hasOwnProperty('hasOwnProperty')); // true

// 5. test.__proto__.__proto__.__proto__ はオブジェクトまで遡ったためnullを返す
// どこから参照してもここまで辿って参照を探しに行きます。
console.log(test.__proto__.__proto__.__proto__); // null

// TypeError: Cannot read property 'hasOwnProperty' of null
 console.log(test.__proto__.__proto__.__proto__.hasOwnProperty('hasOwnProperty'));
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
`new`をつけない場合ただの関数として機能します。<br>
ここでも`new`をつけるかつけないかでthisの参照が変わることになります。<br>
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
var a = {aaa: 1};
// a ---> Object.prototype ---> null

var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.aaa); // 1 (継承された)

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
class: middle, center
# みなさんゲームは好きですか？

---
class: middle

.u-tac[
## prototype chainを職業ツリーに例えてみる。
]

---
class: middle

### 基本設定

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

#### .marker[Object（見習い）]

```
Object
```


.small[
見習いは全てのキャラクターが作成された場合の初期職業です。

##### .marker[固有スキル]

~~こいつの固有スキルはややこしいので省略。~~

##### .marker[継承スキル（一部）]

- toString();
- hasOwnProperty();
]

---
#### .marker[Function(マモノ使い)]

```
Function
```

.small[
マモノ使いに転職するには見習い（Object）のジョブをマスターしている必要がある。<br>
（これはシステム的に決まっている）

##### .marker[固有スキル（一部）]

- name
- length

##### .marker[継承スキル（一部）]

- toString() 見習いから継承されているが、ここでスキル内容が別のものに強化（上書き）される。
- apply()

#### .marker[継承されているスキル（一部）]

- toString(); 見習い（Object)から継承されたスキル
- hasOwnProperty(); 見習い（Object)から継承されたスキル
]

---

#### .marker[自分で職業を定義してWizardを作る]

```
function Wizard(){
    this.thunder = 'thunder' // 固有スキル
}

Wizard.prototype.fireball = 'fireball' // 継承スキル
```

--

#### .marker[上級職のHighWizardを作る]

```
function HighWizard(){
    this.thunderStorm = 'thunderStorm'; // 固有スキル
}

// こいつはWizardから転職するよという定義
Object.setPrototypeOf(HighWizard.prototype, Wizard.prototype);

HighWizard.prototype.volcano = 'volcano'; // 継承スキル
```


---

### 使ってみる

```
var wiz = new Wizard();
console.log(wiz.thunder); // thunder Wizardの固有スキル
console.log(wiz.fireball); // fireball Wizardの継承スキル

var hiWiz = new HighWizard();
console.log(hiWiz.thunder); // undefined Wizardの固有スキル
console.log(hiWiz.fireball); // fireball Wizardの継承スキル
console.log(hiWiz.thunderStorm); // thunderStorm HighWizardの固有スキル
console.log(hiWiz.volcano); // volcano HighWizardの継承スキル
```

上手くいきました。<br>
`Object.setPrototypeOf(子.prototype、親.prototype)`の書式で子に親の<br>
prototypeを継承させることにより親子関係を定義する事ができます。
---

### Functionの定義とそれにより生成されるインスタンス

.small[
無理やりな説明な分この辺ややこしくなります。すみません…

`new`でインスタンスを生成して返されたオブジェクトと
職業を定義したFunctionは全く別の話で継承ツリーも異なります。
（ここはどれだけ好きでも一度ゲーム脳から帰ってきてください）
]

--
生成されたオブジェクト
```
console.log(hiWiz.__proto__); // HighWizard { volcano: 'volcano' }
console.log(hiWiz.__proto__.__proto__); // Wizard { fireball: 'fireball' }
console.log(hiWiz.__proto__.__proto__.__proto__); // {}
```

--

Functionオブジェクト

```
console.log(Wizard); // Function Wizard
console.log(Wizard.__proto__); // Function
console.log(Wizard.__proto__.__proto__); // Object
```

---
### どういうことかというと…

この資料を作るときにArrayを例にあげようとしました。
MDNを参考にArrayの継承ツリーを確認するとFunctionとObjectが継承されていると書かれています。

なので書きのようなサンプルを作った所問題が起きた

```
var arr = new Array(1,2,3);

console.log(arr.length); // from Array
console.log(arr.__proto__); // []
console.log(arr.__proto__.__proto__); // {}
console.log(arr.__proto__.__proto__.__proto__); // null

// MDNの継承の中にFunctionから継承されていそうな記載があるけどundefined
console.log(arr.displayName); // undefined
console.log(arr.bind); // undefined
console.log(arr.name); // undefined
```

何故…？

---
### 原因はというと

Arrayによって生成されるオブジェクトとArrayという関数が頭の中で混ざっていた。
```
var arr = new Array(1,2,3);
```

配列なんだからこの`arr`に色々継承されているんでしょーと意気揚々としていたものの、
Arrayのページで説明されているのはArrayという組み込みの関数の話だった。

```
// ArrayというFunction定義なので
// Function(ArrayというFunction Object) --> Function --> Object;
console.log(Array.__proto__); //Function(ArrayというFunction Object)
console.log(Array.__proto__.__proto__); // Function
console.log(Array.__proto__.__proto__.__proto__); //Object
```

---
class: middle, center
## どうでしたか？

---
class: middle, center
## さらに深堀りしていくときりが無いので一旦ここまでにします。

---
class: middle, center
### 質疑応答＆休憩タイム！
---
class: middle, center

# おわりに

正直何をどこまで説明すれば良いのかがわからずで、<br>
いろいろ中途半端だったらすみません…。

今回の話をもっとちゃんと理解した方が良い所や、<br>
他のアプローチもあったりするので、<br>
今回をきっかけにして色々と深堀りして頂けると嬉しいです。

---
class: middle, center

# ありがとうございました！
<br>
<br>
.u-tar[
thisから始まるjavascript

~Fin~
]

