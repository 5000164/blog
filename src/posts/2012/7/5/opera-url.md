---
title: "Opera の右クリックで現在表示中ページのタイトルやら URL を a タグで取得したりいい感じにする"
date: "2012-07-05 01:02:05 +0900"
---

Opera の menu.ini を編集して実現します。  
まずファイルの

```
[Document Popup Menu]
```

の部分を探します。  
見つけたら下に

```javascript
++++++++++++++++++--9
 ; get URL & Link
 Item, "Copy URL" = Go to page, "javascript:(function(){window.prompt('', document.title+'\n'+location.href);})();" & Delay, 100 & Cut & Cancel
 Item, "Create Link" = Go to page, "javascript:(function(){window.prompt('', '\n\n<section>\n<div><a href=\u0022'+location.href+'\u0022>'+document.title+'</a></div>\n<p>\n\n</p>\n</section>\n\n');})();" & Delay, 100 & Cut & Cancel
 Item, "Reference Link" = Go to page, "javascript:(function(){window.prompt('', '<div><a href=\u0022'+location.href+'\u0022>'+document.title+'</a></div>\n\n');})();" & Delay, 100 & Cut & Cancel
```

と追加します。  
これで Opera を再起動すれば完了です。  
これは単純にJavaScriptを利用しています。  
実装するときにダブルコーテーションのところで一回ハマりました。  
ダブルコーテーションをエスケープしてなかったのが動かない原因かと思いきや、 Opera の設定を解釈する側でダブルコーテーションを使用してはいけなかったみたいです。  
なのでダブルコーテーションを Unicode の「0022」で表現して回避しています。  
実際にこれを使ってみるとこんな感じになります。  
カスタマイズは簡単なので、自分の環境に合わせて使ってください。

- Copy URL

```html
生きるためのブログ
http://5000164.jp/
```

- Create Link

```html
<section>
<div><a href="http://5000164.jp/">生きるためのブログ</a></div>
<p>

</p>
</section>

```

- Reference Link

```html
<div><a href="http://5000164.jp/">生きるためのブログ</a></div>
```

# 参考

- [gyozazuki - Operaの右クリックメニュー](http://my.opera.com/gyozazuki/blog/2009/10/20/opera)
- [ブラウザで表示しているページのＵＲＬとタイトルをクリップボードにコピーする - そっとチラ裏](http://d.hatena.ne.jp/mame-tanuki+tiraura/20100220/CopyURL)
- [ブラウザで表示しているページのＵＲＬとタイトルをクリップボードにコピーする(改) - そっとチラ裏](http://d.hatena.ne.jp/mame-tanuki+tiraura/20110425/CopyURL2)
- [文字列（String）](http://www.tohoho-web.com/js/string.htm)
- [リテラル](http://wisdom.sakura.ne.jp/programming/cs/cs3.html)
