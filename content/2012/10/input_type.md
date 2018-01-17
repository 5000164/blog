+++
title = "iOSのブラウザで数字のみのキーボードを出す"
date = 2012-10-15T22:33:16+00:00
url = "2012-10-input_type"
+++

iOSのブラウザにおいて数字のみのキーボードを出したいときがあります。

しかし、input type=&#8221;number&#8221;ってやっても数字以外のキーがでてきてしまう。 

そうだ、input type=&#8221;tel&#8221;ってやれば数字のみになる、しかしセマンティックではない。 

## そこで、input type=&#8221;text&#8221; pattern=&#8221;\d*&#8221;

HTML5からは入力文字をpatternで正規表現を利用して制御できるようになりました。 

そこで入力可能文字を数字のみにするとiOSで数字のみのキーボードを出してくれるというものです。 

賢いですね。 

## というわけで、実演

<pre class="brush: xml; gutter: false; title: ; notranslate" title="">&lt;input type=&quot;number&quot;&gt;</pre>

{{< figure src="/images/2012/10/number1.png" title="" >}}

<pre class="brush: xml; gutter: false; title: ; notranslate" title="">&lt;input type=&quot;tel&quot;&gt;</pre>

{{< figure src="/images/2012/10/tel1.png" title="" >}}

<pre class="brush: xml; gutter: false; title: ; notranslate" title="">&lt;input type=&quot;text&quot; pattern=&quot;\d*&quot;&gt;</pre>

{{< figure src="/images/2012/10/text1.png" title="" >}}

## 以下、参考

少しのコードで実装可能な15のスマートフォンサイト用小技集 | Webクリエイターボックス

<http://www.webcreatorbox.com/tech/smartphone-snippets/> 

input 要素 &#8211; フォーム &#8211; HTML要素 &#8211; HTML5 タグリファレンス &#8211; HTML5.JP

<http://www.html5.jp/tag/elements/input.html> 

JavaScript講座　15章　JavaScriptでの正規表現

http://www.site-cooler.com/kwl/javascript/15.htm