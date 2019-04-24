---
title: "高速化のために Hugo で CSS を HTML に埋め込む"
date: "2017-11-20 13:26:39 +0900"
---

## 速い is 正義

CSS は HTML に埋め込んだ方が速いらしい。  
では Hugo でどうやってそれを実現するのか。  
partial を使えばできそうだと思ってぐぐったらあった。

- [[Feature request] Partial CSS files · Issue #3186 · gohugoio/hugo](https://github.com/gohugoio/hugo/issues/3186)

これに従って下記のように修正する。

```
<style type="text/css">{{ partial "css/main.css" . | print | safeCSS }}{{ partial "css/monokai.css" . | print | safeCSS }}</style>
```

これでできた。  
コードはここ。

- [高速化のために Web フォントをやめて CSS を HTML への埋め込みにした · 5000164/remember@0f3132d](https://github.com/5000164/remember/commit/0f3132d2b44924e02d60568c912f536accdfa598)

## Minify はまだできてない

簡単にやる方法あるのかな。

## 2018.1.20 追記

CSS の Minify は YUI Compressor と WebStorm の File Watcher を使って実現した。

- [Minifying CSS - Help | WebStorm](https://www.jetbrains.com/help/webstorm/minifying-css.html)

## 2018.8.18 追記

Hugo が minify に対応した。

- [Output Minification, Live-Reload Fixes and More | Hugo](https://gohugo.io/news/0.47-relnotes/)
