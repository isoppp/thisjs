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
