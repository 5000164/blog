---
title: "JetBrains IDE で minify しつつ source map を生成する"
date: "2018-08-24T13:23:10+09:00"
---

YUI Compressor を使っていたが YUI Compressor では minify した時に source map が生成できなかったので Closure Compiler を使う。

- [Closure Compiler  |  Google Developers](https://developers.google.com/closure/compiler/)

Closure Compiler は jar を持ってくるのがだるいなぁと思ってたら npm 版が出ていたのでそれを使う。

- [google-closure-compiler - npm](https://www.npmjs.com/package/google-closure-compiler)

インストールしたら JetBrains IDE で設定を追加する。

- Preferences | Tools | File Watchers の + から Closure Compiler を選択
- Program を設定

```
npx
```

- Arguments を設定

```
google-closure-compiler --compilation_level SIMPLE_OPTIMIZATIONS --js $FileName$ --source_map_format=V3 --create_source_map $FileNameWithoutExtension$.min.js.map --output_wrapper "%output%//@ sourceMappingURL=$FileNameWithoutExtension$.min.js.map"
```

設定は下記サイトを参考にした。  
npm 版を使ってるので npx を使ってるところが違う。

- [[WebStorm]JavaScriptファイルをMinifyする(Source Maps対応) | バシャログ。](http://bashalog.c-brains.jp/13/03/15-122723.php)

こんな感じになる。

![設定内容](/images/2018/8/24/minify/watcher.png)

## メモ

JetBrains IDE は IntelliJ IDEA とか PhpStorm とか WebStorm のこと。  
検索の時にどの単語を使うかで引っかからなかったりしたら悲しいのでここに列挙しておく。
