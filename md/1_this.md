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