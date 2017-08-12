+++
title = "コンテンツを横に2つ並べた時に片方だけコンテンツ幅がウィンドウ幅に追従するようにする"
date = 2013-12-01T04:40:56+00:00
url = "2013-12-fluid"
image: /wp-content/uploads/2013/12/20131201_fluid.png
+++
[<img src="http://5000164.jp/wp-content/uploads/2013/12/20131201_fluid-300x300.png" alt="20131201_fluid" width="300" height="300" class="aligncenter size-medium wp-image-950" srcset="http://5000164.jp/wp-content/uploads/2013/12/20131201_fluid-300x300.png 300w, http://5000164.jp/wp-content/uploads/2013/12/20131201_fluid-150x150.png 150w, http://5000164.jp/wp-content/uploads/2013/12/20131201_fluid.png 900w" sizes="(max-width: 300px) 100vw, 300px" />](http://5000164.jp/wp-content/uploads/2013/12/20131201_fluid.png)

# デモ

文章では説明しづらいので、なんだかよくわからないタイトルになってしまいました。
  
まずは実際に見てもらった方が早いと思います。

<div class="codepen">
  <p data-height="268" data-theme-id="2816" data-slug-hash="qxgIF" data-user="5000164" data-default-tab="result" class='codepen'>
    See the Pen <a href='http://codepen.io/5000164/pen/qxgIF'>qxgIF</a> by SUGAWARA Hiroshi (<a href='http://codepen.io/5000164'>@5000164</a>) on <a href='http://codepen.io'>CodePen</a>
  </p>
  
  <p>
    </div> 
    
    <p>
      ここではデモのために、ウィンドウの幅ではなくdivの幅を変更するようにしています。<br /> divの幅を変更してみると、左側のテーブルの幅は変わらずに右側の文章の幅だけが変わっているのが確認できます。
    </p>
    
    <h1>
      実装方法
    </h1>
    
    <p>
      cssはこのようになっています。（関係のないプロパティは省略しています。）
    </p>
    
    <pre class="brush: css; title: ; notranslate" title="">
div {
  position: relative;
}
table {
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
}
p {
  margin: 0 0 0 250px;  
}
</pre>
    
    <p>
      非常に簡単です。<br /> まず、tableをposition: absolute;で固定することを考えます。<br /> そのために親要素にposition: relative;を指定します。<br /> これでtableの位置が固定されるので、あとは右側のコンテンツにmarginを指定してtableと重ならないようにします。<br /> これだけです。
    </p>
    
    <h1>
      複雑に考える必要はなかった
    </h1>
    
    <p>
      最初に右側のコンテンツだけウィンドウサイズに応じて幅を変更させようとした時は、もっと複雑に考えていました。<br /> 左側のコンテンツにmin-widthを指定して、左右のコンテンツにwidthでそれぞれ%を指定しようとしたのですが、これは%で指定すると幅が大きく変わった時にレイアウトが崩れるので断念。<br /> 次はJavaScriptでウィンドウサイズのイベントを取得して動的にwidthを変更するしかないかと思ったのですが、なるべくシンプルにいってJavaScriptは使いたくなかったので保留。<br /> 他にいい方法がないかと考えていた時にこの方法を思いつきました。<br /> 試しに実装してみたら期待通りの動きをしてくれたのでこの方法に決定。<br /> シンプルに書けるのはいいものです。
    </p>
    
    <h1>
      まとめ
    </h1>
    
    <p>
      この方法は応用が利きそうです。
    </p>