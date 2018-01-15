+++
title = "スクロールしてコンテンツが重なった部分にだけぼかしをかけているように見せる"
date = 2013-12-08T05:40:29+00:00
url = "2013-12-blur"
+++
{{< figure src="/images/2013/12/20131208_blur.png" title="" >}}

## きっかけ

iOS7って半透明のレイヤーの透過した部分だけぼかしがかかりますよね。
  
CSSでも同じことができないかなと思って調べました。

## 結論

現在のCSSではできない模様。

## 擬似的に実現

CSSにはblurというプロパティがあるのですが、このblurはコンテンツ全体にぼかしをかけます。
  
重なったレイヤーの透過した部分にだけぼかしをかける、といったことはできません。
  
なので、このblurをうまく使って一部だけのぼかしを擬似的に実現します。

## デモ

<div class="codepen">
  <p data-height="350" data-theme-id="2816" data-slug-hash="CIGyt" data-user="5000164" data-default-tab="result" class='codepen'>
    See the Pen <a href='http://codepen.io/5000164/pen/CIGyt'>スクロールして重なった部分だけぼかし</a> by SUGAWARA Hiroshi (<a href='http://codepen.io/5000164'>@5000164</a>) on <a href='http://codepen.io'>CodePen</a>
  </p>
  
  <p>
    </div> 
    
    <p>
      このデモは-webkit-のベンダープレフィックスがついているのであしからず。
    </p>
    
    <h1>
      実装方法
    </h1>
    
    <p>
      まず、HTMLで同じ内容のコンテンツを2つ用意します。<br /> 次に、CSSで2つのコンテンツがきれいにくっつくように指定します。<br /> ポイントはoverflow-x: hidden;とoverflow-y: scroll;です。<br /> そうしたら、同じ内容のコンテンツの片方にblurをかけます。<br /> その次は、2つのコンテンツの表示位置を同じ高さに合わせます。<br /> ここではbeforeの擬似要素を使って高さを合わせています。<br /> 最後に、JavaScriptでスクロールを同期すれば完了です。
    </p>
    
    <h1>
      まとめ
    </h1>
    
    <p>
      スクロールの制御もJavaScriptでやってしまうと相性がいいのかも知れないと思いました。<br /> とりあえず、半透明のレイヤーの透過した部分にだけぼかしをかけるというCSSのプロパティが欲しいです。
    </p>