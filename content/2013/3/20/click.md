+++
title = "iOSでDOMに要素追加してjQueryでclickイベントを取得する"
date = 2013-03-20T01:46:32+00:00
aliases = ["/2013-03-click/"]
+++

{{< figure src="/images/2013/03/de_20130319_click.jpg" title="" >}}

## clickイベントを取得したい

DOMに要素を追加するとjQueryのclickイベントって効かなくなるんですね

知らなかった

そういう時はjQueryのonを使えばclickイベントも取得できるってことで実装

Chromeで動作確認

動いた

iOSで見てみる

動かない

## iOSでonのclickイベントが取得できない

iOSで動かなくていろいろ調べてみました

でもサンプルが動いてるサイトもある

うーん

そこで手元でちょっとずつ変更を加えながら調べてみたところ

サンプルのaタグをdivタグに変えると動かなくなるということが判明

そこでonlick=&#8221;&#8221;を追加すれば動くようになるという記事を発見

divタグにonclick=&#8221;&#8221;を追加することでiOSでも無事にclickイベントを拾うことができました

iOSのlabel要素と同じ対処法ですね

動かないのは同じような理由なのでしょうか

## デモ

## まとめ

iOSのDOMに追加したdiv要素のclickイベントを取得したかったらonclick=&#8221;&#8221;をつけること

## 参考

[スマートフォンブラウザのjQuery Clickイベントに関すること &#8211; くらげだらけ](http://kudakurage.hatenadiary.com/entry/20120502/1335920244)

[guess what?: JQueryのliveイベントがiPhoneのSafariで登録できない](http://aqubiblog.blogspot.jp/2011/04/jqueryliveiphonesafari.html)
