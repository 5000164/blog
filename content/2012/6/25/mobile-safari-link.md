+++
title = "Mobile Safari で数字に勝手にリンクが貼られるのを無効化する"
date = 2012-06-25T23:09:21+00:00
aliases = ["/2012-06-mobile_safari_link/"]
+++

Mobile Safari では数字を電話番号だとみなして、勝手に電話番号のリンクを貼ることがあります。
これを防ぐためには勝手にリンクを貼る機能を無効化し、 `telto:` で明示的にリンクを貼りましょう。
機能を無効化するには、ヘッダに下記のmetaタグを追加します。

```html
<meta name="format-detection" content="telephone=no">
```

`telto:` でのリンクの貼り方は下記になります。

```html
<a href="telto:000-0000-0000">000-0000-0000</a>
```

## 参考サイト

- [jQueryMobileを使ってのスマートフォンサイトの構築メモ at HouseTect, JavaScriptな情報をあなたに](http://hisasann.com/housetect/2011/02/jquerymobile.html)
