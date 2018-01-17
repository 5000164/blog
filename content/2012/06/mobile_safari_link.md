+++
title = "Mobile Safariで数字に勝手にリンクが貼られるのを無効化する"
date = 2012-06-25T23:09:21+00:00
url = "2012-06-mobile_safari_link"
+++

Mobile Safariでは数字を電話番号だとみなして、勝手に電話番号のリンクを貼ることがあります。

これを防ぐためには勝手にリンクを貼る機能を無効化し、telto:で明示的にリンクを貼りましょう。

機能を無効化するには、ヘッダに下記のmetaタグを追加します。

<pre class="brush: xml; title: ; notranslate" title="">&lt;meta name="format-detection" content="telephone=no"&gt;
</pre>

telto:でのリンクの貼り方は下記になります。

<pre class="brush: xml; title: ; notranslate" title="">&lt;a href="telto:000-0000-0000"&gt;000-0000-0000&lt;/a&gt;
</pre>

参考サイト

<a title="jQueryMobileを使ってのスマートフォンサイトの構築メモ at HouseTect, JavaScriptな情報をあなたに" href="http://hisasann.com/housetect/2011/02/jquerymobile.html" target="_blank">jQueryMobileを使ってのスマートフォンサイトの構築メモ at HouseTect, JavaScriptな情報をあなたに</a>