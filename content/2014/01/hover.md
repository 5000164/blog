+++
title = "hoverした要素に好きなようにハイライトをかける"
date = 2014-01-22T17:10:00+00:00
url = "2014-01-hover"
+++

{{< figure src="/images/2014/01/20140122_hover.png" title="" >}}

## リンクとかをホバーしたら背景色を変えたりしますよね

リンクをホバーしたら文字色と背景色が変わるという実装はよくあります。

このコンテンツはクリッカブルですよ、と知らせるためですね。

でもリンクの中に画像が含まれている時は画像だけ変わらなかったりします。

これはちょっと違和感です。

そこですべてに覆いかぶさっているように見せます。

## まずはデモをどうぞ

<div class="codepen">
  <p data-height="332" data-theme-id="2816" data-slug-hash="vexEB" data-default-tab="result" class='codepen'>
    See the Pen <a href='http://codepen.io/5000164/pen/vexEB'>hoverした要素の上に色をかぶせる</a> by SUGAWARA Hiroshi (<a href='http://codepen.io/5000164'>@5000164</a>) on <a href='http://codepen.io'>CodePen</a>.
  </p>

  <p>
    </div> 

    <h1>
      実装の解説です
    </h1>

    <p>
      非常に簡単です。<br /> 今までhoverの擬似クラスにしていた部分をhoverの擬似クラスのafter擬似要素にします。<br /> 文章だとちょっとわかりづらいのでコードで書くと、
    </p>

    <pre class="brush: css; title: ; notranslate" title="">
a:hover {
  ・・・
}
</pre>

    <p>
      これを
    </p>

    <pre class="brush: css; title: ; notranslate" title="">
a:hover::after {
  ・・・
}
</pre>

    <p>
      こうします。<br /> あとはちょっと装飾してやれば簡単に実現できます。
    </p>

    <h1>
      まとめ
    </h1>

    <p>
      hoverした時に画像にハイライトがついていないのが個人的にすごく気になっていたので、簡単に実装できてよかったです。<br /> ちょっと応用すれば他のこともできそうですね。
    </p>