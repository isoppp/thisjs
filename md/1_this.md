class: middle, center
# 1 this

---
class: middle, center
# 問題
### ブラウザで実行した場合の結果はどうなるか

---
class: u-pdt60, center
## Q1

```javascript
console.log(this === window) //q1;
```

--
### true

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
### true

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
### false

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
### false

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
### false/true

---
class: middle, center

# 今日のゴール

---
class: middle, center
.markerSIn[
### thisの変化パターンをなんとなく知ること。
]
### どうせ忘れるので覚えることは目的としない。
<br>
<br>
こんなこと知ってるよって方はすんません…

---
class: middle, center
# thisの種類

---
class: middle, center
.markerSIn[
## 「thisの参照の種類は4種類ある」<br>
]
今日のテストはこれだけ！

---
class: middle, center
# と、その前に.markerS[globalのthis]の話

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


















