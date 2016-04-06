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
















