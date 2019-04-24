---
title: "WPF で枠のないウィンドウを作る"
date: "2014-03-11 23:17:38 +0900"
---

![](/images/2014/03/20140311_practice1.png)

## 実際に作ったものはこんな感じです

![](/images/2014/03/20140311_practice1-300x300.png)

ソースコードはこちら。

- [5000164/wpf-practice-1](https://github.com/5000164/wpf-practice-1)

## 実装するにあたって参考にしたサイト

こちらの記事を参考にさせていただきました。

- [WPF で Zune のようなウィンドウを作る | grabacr.nét](http://grabacr.net/archives/480)

この記事に沿っていったらできました。  
これを追記するだけ。

```
<WindowChrome.WindowChrome>
    <WindowChrome CaptionHeight="23" ResizeBorderThickness="100" />
</WindowChrome.WindowChrome>
```

## 枠なしには出来たけどウィンドウの影が気になる

ウィンドウの枠がなくなってかっこよくなったのに、影が主張し過ぎで気になります。  
この影も消したい。  
影を消す方法を調べていたら、先ほどと同じブログのこちらの記事にたどり着きました。

- [WPF で Visual Studio 2012 のような光るウィンドウを作る | grabacr.nét](http://grabacr.net/archives/507)

なるほど、よくわからん。  
WPF初心者の私には無理だと判断したので、この記事の冒頭で紹介されていた簡易版で実装します。

## 影をいい感じにつける

```
<Window x:Class="練習1.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="MainWindow"
        Width="700"
        Height="700"
        WindowStyle="None"
        AllowsTransparency="True"
        WindowStartupLocation="CenterScreen"
        Background="Transparent">
～中略～
    <Border BorderBrush="#222222" Background="#222222" BorderThickness="1" Margin="100">
        <Border.Effect>
            <DropShadowEffect ShadowDepth="0" BlurRadius="100" Color="#000000" Opacity="0.7" />
        </Border.Effect>
～中略～
    </Border>
</Window>
```

Window に `WindowStyle="None"`、 `AllowsTransparency="True"`、 `Background="Transparent"` を指定することで、枠を消して透明にしています。  
アプリが描画できる範囲が Window の 700 x 700 の内側のみで、その内側にさらに影とウィンドウを描画する、という認識です。  
内側の Border に Margin を設けて、影をつけています。

## WindowStyle="None"だと移動やリサイズができない

しかし、この方法だと移動がリサイズができなくなるらしいです。  
こちらの記事などで、 `WindowStyle="None"` を使用した時の対策が書かれていました。

- [とんがれ！ ほげたん WPFでリサイズ可能な枠なしウィンドウを作成する](http://hogetan.blog24.fc2.com/blog-entry-7.html)

よくわからない、できればやりたくない。  
と思っていたら、前述の WindowChrome のおかげか、特に何もせずに移動もリサイズもできました。

## よくわからないけど動いたので完成

というわけで、枠なしのウィンドウを作りたい、という目的は達成しました。  
ただ、ウィンドウの影はOS側に任せるべき処理であって、アプリ側でいじるべきではないと感じました。
