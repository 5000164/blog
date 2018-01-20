+++
title = "Operaの右クリックで現在表示中ページのタイトルやらURLをaタグで取得したりいい感じにする"
date = 2012-07-05T01:02:05+00:00
aliases = ["/2012-07-opera_url/"]
+++

Operaのmenu.iniを編集して実現します。

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
 Item, "Create Link" = Go to page, "javascript:(function(){window.prompt('', '\n\n&lt;section&gt;\n&lt;div&gt;&lt;a href=\u0022'+location.href+'\u0022&gt;'+document.title+'&lt;/a&gt;&lt;/div&gt;\n&lt;p&gt;\n\n&lt;/p&gt;\n&lt;/section&gt;\n\n');})();" & Delay, 100 & Cut & Cancel
 Item, "Reference Link" = Go to page, "javascript:(function(){window.prompt('', '&lt;div&gt;&lt;a href=\u0022'+location.href+'\u0022&gt;'+document.title+'&lt;/a&gt;&lt;/div&gt;\n\n');})();" & Delay, 100 & Cut & Cancel
```

と追加します。

これでOperaを再起動すれば完了です。

これは単純にJavaScriptを利用しています。

実装するときにダブルコーテーションのところで一回ハマりました。

ダブルコーテーションをエスケープしてなかったのが動かない原因かと思いきや、Operaの設定を解釈する側でダブルコーテーションを使用してはいけなかったみたいです。

なのでダブルコーテーションをUnicodeの「0022」で表現して回避しています。

実際にこれを使ってみるとこんな感じになります。

カスタマイズは簡単なので、自分の環境に合わせて使ってください。

  「Copy URL」

```html
生きるためのブログ
http://5000164.jp/
```

  「Create Link」

```html
&lt;section&gt;
&lt;div&gt;&lt;a href="http://5000164.jp/"&gt;生きるためのブログ&lt;/a&gt;&lt;/div&gt;
&lt;p&gt;

&lt;/p&gt;
&lt;/section&gt;

```

  「Reference Link」

```html
&lt;div&gt;&lt;a href="http://5000164.jp/"&gt;生きるためのブログ&lt;/a&gt;&lt;/div&gt;
```

参考

  [gyozazuki &#8211; Operaの右クリックメニュー](http://my.opera.com/gyozazuki/blog/2009/10/20/opera)

  [ブラウザで表示しているページのＵＲＬとタイトルをクリップボードにコピーする &#8211; そっとチラ裏](http://d.hatena.ne.jp/mame-tanuki+tiraura/20100220/CopyURL)

  [ブラウザで表示しているページのＵＲＬとタイトルをクリップボードにコピーする(改) &#8211; そっとチラ裏](http://d.hatena.ne.jp/mame-tanuki+tiraura/20110425/CopyURL2)

[文字列（String）](http://www.tohoho-web.com/js/string.htm)

[リテラル](http://wisdom.sakura.ne.jp/programming/cs/cs3.html)

