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


