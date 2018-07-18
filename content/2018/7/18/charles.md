+++
title = "Charles の一覧から特定の拡張子を除外する"
date = 2018-07-18T23:23:36+09:00
+++

[Charles](https://www.charlesproxy.com/) の一覧から特定の拡張子を除外することができた。  
Filter は Settings から正規表現を有効にすると正規表現で絞り込めるようになる。  
この正規表現でどうやら否定的先読みが使えるようだったので、下記のように絞り込むことで特定の拡張子を除外することができた。

```regex
^https://blog\.5000164\.jp(?!.*(\.css|\.js|\.png|\.gif|\.ttf|\.woff|\.woff2)).*$
```
