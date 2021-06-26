---
title: "JavaScript で特定のプロパティの値を変えるやり方のメモ"
published: "2021-06-26 14:21:28 +0900"
updated: "2021-06-26 14:21:28 +0900"
---

特定の条件の時にオブジェクトの一部だけ値を変えて処理したいと思うことがたまにある。

いちいち変数に入れるのも面倒だから値を変えたらそのまま使いたいという時にどうすればいいのかパッと出てこなくて、こうやればできるなと思ったのでメモ。

```javascript
doSomething({
  ...object,
  ...(condition
    ? { property: object.property * 10 }
    : {}),
});
```

こうすることで特定の条件の時だけ特定のプロパティの値を変えたものをそのまま使うことができる。

やっていることは [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) で同じ property を上書きしているだけ。
