---
title: "TypeScript で Spread syntax を使った時は型がうまくチェックできなかったので Type Guard を使う"
published: "2021-07-11 11:10:22 +0900"
updated: "2021-07-11 11:10:22 +0900"
---

下記のようなコードを書いた時に、プロパティ名を間違っていたのだがそれに気付かずにうまく動かないなと思っていた。

```typescript
type A = {
  a: string;
  b: string;
}

const a = {
  ...b,
  ...{
    a: "a",
    bb: "b"
  }
} as A;
```

プロパティ名を間違っていたら TypeScript が警告で教えてくれると思っていたので違う場所を調べていたのだが、おかしなところが見つからず、いろいろ見ていたらプロパティ名が間違っていただけだったことがわかった。どうやら Spread syntax を使った時は型がうまくチェックできないようだった[^1]。

[^1]: [Spread operator stripping type definition in typescript - Stack Overflow](https://stackoverflow.com/questions/66159348/spread-operator-stripping-type-definition-in-typescript)

うまくやる方法を調べたが見つけられず、User-Defined Type Guards で型をチェックすることにした。

```typescript
type A = {
  a: string;
  b: string;
}

const isA = (arg: any): arg is A =>
  typeof arg === "object" &&
  Object.keys(arg).every((k) =>
    [
      "__typename",
      "a",
      "b",
    ].includes(k)
  ); 

const a = {
  ...b,
  ...{
    a: "a",
    bb: "b"
  }
};

assert(isA(a));
```

こうすることでプロパティ名を間違った時に気付けるようになったが、もっとうまくやる方法があるような気がする。
