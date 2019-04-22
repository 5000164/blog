---
title: "iOS のブラウザで数字のみのキーボードを出す"
date: "2012-10-15T22:33:16+00:00"
---

iOS のブラウザにおいて数字のみのキーボードを出したいときがあります。  
しかし、 `input type="number"` ってやっても数字以外のキーがでてきてしまう。  
そうだ、 `input type="tel"` ってやれば数字のみになる、しかしセマンティックではない。

## そこで、 `input type="text" pattern="\d*"`

HTML5 からは入力文字を pattern で正規表現を利用して制御できるようになりました。  
そこで入力可能文字を数字のみにすると iOS で数字のみのキーボードを出してくれるというものです。  
賢いですね。

## というわけで、実演

```html
<input type="number">
```

{{< figure src="/images/2012/10/number1.png" title="" >}}

```html
<input type="tel">
```

{{< figure src="/images/2012/10/tel1.png" title="" >}}

```html
<input type="text" pattern="\d*">
```

{{< figure src="/images/2012/10/text1.png" title="" >}}

## 以下、参考

- [少しのコードで実装可能な15のスマートフォンサイト用小技集 | Webクリエイターボックス](http://www.webcreatorbox.com/tech/smartphone-snippets/)
- [input 要素 - フォーム - HTML要素 - HTML5 タグリファレンス - HTML5.JP](http://www.html5.jp/tag/elements/input.html)
- [JavaScript講座　15章　JavaScriptでの正規表現](http://www.site-cooler.com/kwl/javascript/15.htm)
