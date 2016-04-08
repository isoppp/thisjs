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