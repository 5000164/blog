+++
title = "Operaの右クリックで現在表示中ページのタイトルやらURLをaタグで取得したりいい感じにする"
date = 2012-07-05T01:02:05+00:00
url = "2012-07-opera_url"
+++

<div>
  <div>
    Operaのmenu.iniを編集して実現します。
  </div>

  <div>
    まずファイルの
  </div>

```
[Document Popup Menu]
```
</div>

<div>
  の部分を探します。
</div>

<div>
  見つけたら下に
</div>

```javascript
++++++++++++++++++--9
 ; get URL & Link
 Item, "Copy URL" = Go to page, "javascript:(function(){window.prompt('', document.title+'\n'+location.href);})();" & Delay, 100 & Cut & Cancel
 Item, "Create Link" = Go to page, "javascript:(function(){window.prompt('', '\n\n&lt;section&gt;\n&lt;div&gt;&lt;a href=\u0022'+location.href+'\u0022&gt;'+document.title+'&lt;/a&gt;&lt;/div&gt;\n&lt;p&gt;\n\n&lt;/p&gt;\n&lt;/section&gt;\n\n');})();" & Delay, 100 & Cut & Cancel
 Item, "Reference Link" = Go to page, "javascript:(function(){window.prompt('', '&lt;div&gt;&lt;a href=\u0022'+location.href+'\u0022&gt;'+document.title+'&lt;/a&gt;&lt;/div&gt;\n\n');})();" & Delay, 100 & Cut & Cancel
```

<div>
  と追加します。
</div>

<div>
  これでOperaを再起動すれば完了です。
</div>

<div>
  これは単純にJavaScriptを利用しています。
</div>

<div>
  実装するときにダブルコーテーションのところで一回ハマりました。
</div>

<div>
  ダブルコーテーションをエスケープしてなかったのが動かない原因かと思いきや、Operaの設定を解釈する側でダブルコーテーションを使用してはいけなかったみたいです。
</div>

<div>
  なのでダブルコーテーションをUnicodeの「0022」で表現して回避しています。
</div>

<div>
  実際にこれを使ってみるとこんな感じになります。
</div>

<div>
  カスタマイズは簡単なので、自分の環境に合わせて使ってください。
</div><section> 

<div>
  「Copy URL」
</div>

```html
生きるためのブログ
http://5000164.jp/
```
</section> <section> 

<div>
  「Create Link」
</div>

```html
&lt;section&gt;
&lt;div&gt;&lt;a href="http://5000164.jp/"&gt;生きるためのブログ&lt;/a&gt;&lt;/div&gt;
&lt;p&gt;

&lt;/p&gt;
&lt;/section&gt;

```
</section> <section>

<div>
  「Reference Link」
</div>

```html
&lt;div&gt;&lt;a href="http://5000164.jp/"&gt;生きるためのブログ&lt;/a&gt;&lt;/div&gt;
```
</section>

<div>
  参考
</div>

<div>
  <a href="http://my.opera.com/gyozazuki/blog/2009/10/20/opera">gyozazuki &#8211; Operaの右クリックメニュー</a>
</div>

<div>
  <a href="http://d.hatena.ne.jp/mame-tanuki+tiraura/20100220/CopyURL">ブラウザで表示しているページのＵＲＬとタイトルをクリップボードにコピーする &#8211; そっとチラ裏</a>
</div>

<div>
  <a href="http://d.hatena.ne.jp/mame-tanuki+tiraura/20110425/CopyURL2">ブラウザで表示しているページのＵＲＬとタイトルをクリップボードにコピーする(改) &#8211; そっとチラ裏</a>
</div>

<div>
  <a href="http://www.tohoho-web.com/js/string.htm">文字列（String）</a>
</div>

<div>
  <a href="http://wisdom.sakura.ne.jp/programming/cs/cs3.html">リテラル</a>
</div>

<div>
</div>

<div>
</div>