+++
title = "WPFで枠のないウィンドウを作る"
date = 2014-03-11T23:17:38+00:00
url = "2014-03-wpf_practice_1"
+++
<img src="{{ .Site.BaseURL }}/images/2014/03/20140311_practice1-300x300.png" alt="20140311_practice1" width="300" height="300" class="aligncenter size-medium wp-image-1121" srcset="{{ .Site.BaseURL }}/images/2014/03/20140311_practice1-300x300.png 300w, {{ .Site.BaseURL }}/images/2014/03/20140311_practice1-150x150.png 150w, {{ .Site.BaseURL }}/images/2014/03/20140311_practice1.png 700w" sizes="(max-width: 300px) 100vw, 300px" />

# 実際に作ったものはこんな感じです

<img src="{{ .Site.BaseURL }}/images/2014/03/20140311_practice1.png" alt="20140311_practice1" width="700" height="700" class="aligncenter size-full wp-image-1121" srcset="{{ .Site.BaseURL }}/images/2014/03/20140311_practice1.png 700w, {{ .Site.BaseURL }}/images/2014/03/20140311_practice1-150x150.png 150w, {{ .Site.BaseURL }}/images/2014/03/20140311_practice1-300x300.png 300w" sizes="(max-width: 700px) 100vw, 700px" />

ソースコードはこちら。
  
[5000164/wpf-practice-1](https://github.com/5000164/wpf-practice-1)

# 実装するにあたって参考にしたサイト

こちらの記事を参考にさせていただきました。

[WPF で Zune のようなウィンドウを作る | grabacr.nét](http://grabacr.net/archives/480)

この記事に沿っていったらできました。
  
これを追記するだけ。

<pre class="brush: xml; title: ; notranslate" title="">&lt;WindowChrome.WindowChrome&gt;
        &lt;WindowChrome CaptionHeight="23" ResizeBorderThickness="100" /&gt;
    &lt;/WindowChrome.WindowChrome&gt;
</pre>

# 枠なしには出来たけどウィンドウの影が気になる

ウィンドウの枠がなくなってかっこよくなったのに、影が主張し過ぎで気になります。
  
この影も消したい。
  
影を消す方法を調べていたら、先ほどと同じブログのこちらの記事にたどり着きました。

[WPF で Visual Studio 2012 のような光るウィンドウを作る | grabacr.nét](http://grabacr.net/archives/507)

なるほど、よくわからん。
  
WPF初心者の私には無理だと判断したので、この記事の冒頭で紹介されていた簡易版で実装します。

# 影をいい感じにつける

<pre class="brush: xml; title: ; notranslate" title="">&lt;Window x:Class="練習1.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="MainWindow"
        Width="700"
        Height="700"
        WindowStyle="None"
        AllowsTransparency="True"
        WindowStartupLocation="CenterScreen"
        Background="Transparent"&gt;
～中略～
    &lt;Border BorderBrush="#222222" Background="#222222" BorderThickness="1" Margin="100"&gt;
        &lt;Border.Effect&gt;
            &lt;DropShadowEffect ShadowDepth="0" BlurRadius="100" Color="#000000" Opacity="0.7" /&gt;
        &lt;/Border.Effect&gt;
～中略～
    &lt;/Border&gt;
&lt;/Window&gt;
</pre>

WindowにWindowStyle="None"、AllowsTransparency="True"、Background="Transparent"を指定することで、枠を消して透明にしています。

アプリが描画できる範囲がWindowの700&#215;700の内側のみで、その内側にさらに影とウィンドウを描画する、という認識です。
  
内側のBorderにMarginを設けて、影をつけています。

# WindowStyle="None"だと移動やリサイズができない

しかし、この方法だと移動がリサイズができなくなるらしいです。
  
こちらの記事などで、WindowStyle="None"を使用した時の対策が書かれていました。

[とんがれ！ ほげたん WPFでリサイズ可能な枠なしウィンドウを作成する](http://hogetan.blog24.fc2.com/blog-entry-7.html)

よくわからない、できればやりたくない。
  
と思っていたら、前述のWindowChromeのおかげか、特に何もせずに移動もリサイズもできました。

# よくわからないけど動いたので完成

というわけで、枠なしのウィンドウを作りたい、という目的は達成しました。
  
ただ、ウィンドウの影はOS側に任せるべき処理であって、アプリ側でいじるべきではないと感じました。