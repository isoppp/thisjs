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
### 質疑応答＆休憩タイム！
