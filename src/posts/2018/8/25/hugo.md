---
title: "Hugo の minify で padding に設定してる値が欠ける"
published: "2018-08-25 23:55:19 +0900"
updated: "2018-08-25 23:55:19 +0900"
---

Hugo の 0.47 から minify する機能が追加された。

- [Output Minification, Live-Reload Fixes and More | Hugo](https://gohugo.io/news/0.47-relnotes/)

これをさっそく使っていたのだが、バグっぽい挙動に遭遇した。  
発生したバージョンは 0.47.1。

# 発生したバグ

padding に設定した値が欠けてしまう。  
実際に発生した状況は下記のような感じ。

```css
.about{padding:calc(42vw - -80px) 0 calc(5vw - -100px)}
```

というスタイルを設定。  
`hugo --gc --minify` で生成。

```css
.about{padding:calc(42vw - -80px) 0}
```

という値になっていた。

# 回避策

```css
.about{padding-top:calc(42vw - -80px);padding-bottom:calc(5vw - -100px);padding-left:0;padding-right:0}
```

のようにそれぞれ指定することで回避することができた。

# おまけ

- Stylus -> CSS に変換 -> YUI Compressor で minify -> Hugo の head に埋め込みつつ minify、という流れで変換していたので気付くのに時間がかかった
- `calc(42vw - -80px)` のように - を 2 回重ねているのは YUI Compressor のバグを回避するため
    - [YUI Compressor is breaking some CSS, specifically calc(100% + ##px) · Issue #59 · yui/yuicompressor](https://github.com/yui/yuicompressor/issues/59)
