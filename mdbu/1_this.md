# 1 this

## 問題
ブラウザで実行した場合の結果はどうなるか

__Q1__

```javascript
console.log(this === window); //true
```

__Q2__

```javascript
function q2(){
    console.log(this === window);
}

q2(); // true
```

__Q3__

```javascript
var q3 = { 
    q3m: function(){
        console.log(this === window);
    } 
};

q3.q3m(); // false
```

__Q4__

```javascript
function Q4(){
    console.log(this === window);
}    

new Q4(); // false
```

__Q5__

```javascript
var q5 = {
    q5Func : function (){
        console.log(this === window);
    }
}

q5.q5Func(); // false
q5.q5Func.apply(window); //true
```

## 今日のゴール

thisの変化パターンをなんとなく知ること。
覚えることは目的としない。（きっと忘れる）

## thisの種類

**thisの参照の種類は4種類ある**
知ってる方は置いといて知らなかった人はこれだけは覚えて帰ってください。

## その前にglobalのthisの話

globalのthisの話

Q1

```javascript
console.log(this === window); //true
```

ブラウザで実行するとglobalのthisはwindowオブジェクトになります。

```javascript
console.log(this); // window object
```

**TIPS**
これはブラウザではglobalにwindowオブジェクトが定義されているためで、javascriptのglobalはwindowだ、という理解では間違っています。
例えばですが、node.jsでは異なる定義がされています。
気になる方は`node`→`console.log(this);`してみてください。

## 1. 関数呼び出しパターン

Q2

```javascript
function q2(){
    console.log(this === window);
}

q2(); // true
```

function hoge...として定義された関数の中のthisはglobalを参照します。

## 2. メソッド呼び出しパターン

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

## 関数とメソッド

関数とメソッドの差がよく分からない？
簡単に説明するなら呼び出し時の記載方法をイメージすると良い。

```javascript
xxx.yyy(); // メソッド
yyy(); // 関数
```

## 3. コンストラクタ呼び出しパターン

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


















