---
title: "Wikipedia のモバイル版を表示する Chrome 拡張機能を作った"
date: "2015-03-26T23:37:41+09:00"
---

Wikipedia はモバイル版の方が見やすいと思うのでモバイル版を表示する拡張機能を作った。  
ソースはこちら。

- [5000164/redirect-to-mobile-wikipedia](https://github.com/5000164/redirect-to-mobile-wikipedia)

# 作り始める

Chrome 拡張機能の作り方がわからなかったので調べていたらドットインストールがあったのでここで勉強。

- [Google Chrome拡張機能入門 (全20回) - プログラミングならドットインストール](http://dotinstall.com/lessons/basic_chrome_v2)  

概要を把握。  
思ってたよりさっくり作れそう。  

# TypeScript を使いたい

TypeScript を試したかった。  
npm で TypeScript をインストールして PhpStorm で自動コンパイルするところまではすぐできた。  
でも Chrome の API を認識させることができなくて困った。  
ライブラリをダウンロードすればいけるよって書いてあったけど、それだけだと chrome なんてないよと怒られてしまう。  
だから手動でインストールしてパスを通したら、今度は定義が複数あるって言われた。  
最終的に、PhpStorm 側でダウンロードしたものを消して、tsd でダウンロードしたやつを PhpStorm 側に設定することで落ち着いた。

- [Transpiling TypeScript to JavaScript](https://www.jetbrains.com/phpstorm/help/transpiling-typescript-to-javascript.html)  
- [TypeScript での Chrome 拡張機能開発 Tips - Qiita](http://qiita.com/pine613/items/0c89bf4ff0fdcafbc5ff)  
- [TypeScript で Chrome Extension を開発する際の環境準備 - Qiita](http://qiita.com/macococo/items/e3833a30e99d421584e0)  
- [javascript - How do I use WebStorm for Chrome Extension Development? - Stack Overflow](http://stackoverflow.com/questions/13997468/how-do-i-use-webstorm-for-chrome-extension-development)

# ver. 1

特定のページに来た時に動作すればいいんだから content_scripts でいけるだろと思って実装した。  
なんか preRequest イベントってのがあるからそれ使いたい。  
でも動かなかった。  
うまく動かせなかったので諦めて location.href でモバイル版にリダイレクトさせていた。  
ださい。

# ver. 2

落ち着いて考えたら content_scripts はどうやらページが表示された後に動作する気配がある。  
ってことは background にすれば preRequest 使えるんじゃないだろうかという仮説。  
やってみたら使えた。  
ということでアクセスする URL を確認して Wikipedia だったらそのままモバイル版を表示する拡張機能ができた。

- [What are extensions? - Google Chrome](https://developer.chrome.com/extensions)  
- [Content Scripts - Google Chrome](https://developer.chrome.com/extensions/content_scripts)  
- [Event Pages - Google Chrome](https://developer.chrome.com/extensions/event_pages)  
- [chrome.webRequest - Google Chrome](https://developer.chrome.com/extensions/webRequest)  

# 参考

- [Sample Extensions - Google Chrome](https://developer.chrome.com/extensions/samples#search:catblock)
    - この CatBlock というサンプルがとても参考になった
