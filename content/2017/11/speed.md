+++
title = "高速化のために Hugo で CSS を HTML に埋め込む"
date = 2017-11-20T13:26:39+09:00
url = "2017-11-speed"
+++

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

- [高速化のために Web フォントをやめて CSS を HTML への埋め込みにした · 5000164/divided@0f3132d](https://github.com/5000164/divided/commit/0f3132d2b44924e02d60568c912f536accdfa598)

## Minify はまだできてない

簡単にやる方法あるのかな。