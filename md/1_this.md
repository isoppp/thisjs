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

function hoge...として定義された.marker[関数の中のthisはglobal]を参照します。

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

オブジェクトの中に定義された.marker[メソッドのthis参照はそのオブジェクトがthis]として返されます。この場合はq3がthisとして返されます。

---
class: middle, center
## 関数とメソッド

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

`new`で.marker[新しくインスタンスを生成する場合、その中のthisは生成されるインスタンス]を指します。<br>
この場合は`Q4`を指します。

--

.borderBox[
.tips[TIPS]<br>
`new`するかしないかでthisの参照が変わってしまうため、`new`を付けて.marker[新しくインスタンスを生成をして利用すべき物はUpper Camelの命名]が使われる慣例があります。
]



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

class構文が導入されたので関数で実装できるようになりました。

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
# ４種類のthis
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
















