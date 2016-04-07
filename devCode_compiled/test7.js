"use strict";

var arr = [1, 2, 3];

arr.forEach(function (item, index, array) {
  console.log(this); // window
});

$.each(arr, function () {
  console.log(this); // 1,2,3...
});


```
function each(obj, callback) {
  var length,
      i = 0;

  if (isArrayLike(obj)) {
    length = obj.length;
    for (; i < length; i++) {
*      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  } else {
    for (i in obj) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  }

  return obj;
}
```
