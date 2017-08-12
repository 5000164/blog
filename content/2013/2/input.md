+++
title = "テキストボックスの文字を右寄せにしているとiOSで入力しにくい"
date = 2013-02-07T00:57:47+00:00
url = "2013-02-input"
image: /wp-content/uploads/2013/02/de_20130206_input_thumb.jpg
+++
[<img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: block; float: none; margin-left: auto; border-top: 0px; margin-right: auto; border-right: 0px; padding-top: 0px" title="de_20130206_input" border="0" alt="de_20130206_input" src="http://5000164.jp/wp-content/uploads/2013/02/de_20130206_input_thumb.jpg" width="300" height="300" />](http://5000164.jp/wp-content/uploads/2013/02/de_20130206_input.jpg)

&nbsp;

# iOSでの文字入力

iOSでテキストボックスに文字を入力しますよね。

カーソルを移動する矢印がないですよね。

不便ですよね。

文字を右寄せにしているともっと不便です。

右端までなかなか移動できません。

&nbsp;

## どうして右寄せにしているのか

全部数字だったりすると桁を合わせて見やすくするためにも右寄せにしたりしますよね。

それが入力項目だから使いづらくなってるわけです。

&nbsp;

# iOSでも入力しやすくする方法

ひらめきました。

focusがあたっている時は左寄せにしてあげればいいのです。

&nbsp;

## デモとコード



&nbsp;

&nbsp;

## 動作画面

このように動作します。[<img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: block; float: none; margin-left: auto; border-top: 0px; margin-right: auto; border-right: 0px; padding-top: 0px" title="de_20130206_image1" border="0" alt="de_20130206_image1" src="http://5000164.jp/wp-content/uploads/2013/02/de_20130206_image1_thumb.jpg" width="320" height="480" />](http://5000164.jp/wp-content/uploads/2013/02/de_20130206_image1.jpg)

テキストボックスに数字を右寄せで表示。

&nbsp;

[<img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: block; float: none; margin-left: auto; border-top: 0px; margin-right: auto; border-right: 0px; padding-top: 0px" title="de_20130206_image2" border="0" alt="de_20130206_image2" src="http://5000164.jp/wp-content/uploads/2013/02/de_20130206_image2_thumb.jpg" width="320" height="480" />](http://5000164.jp/wp-content/uploads/2013/02/de_20130206_image2.jpg)

上のテキストボックスは特に何も設定をしていません。

文字を消すにはカーソルを右側に持って行かなければならないのですが手間がかかる。

&nbsp;

[<img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: block; float: none; margin-left: auto; border-top: 0px; margin-right: auto; border-right: 0px; padding-top: 0px" title="de_20130206_image3" border="0" alt="de_20130206_image3" src="http://5000164.jp/wp-content/uploads/2013/02/de_20130206_image3_thumb.jpg" width="320" height="480" />](http://5000164.jp/wp-content/uploads/2013/02/de_20130206_image3.jpg)

下のテキストボックスはfocusがあたった時点で左寄せにしています。

このようになることで簡単に文字の右側にカーソルを持ってくることができます。

&nbsp;

# まとめ

何気ないことですが、こういったことの積み重ねがUXの向上につながっていくと考えています。

ずっとどうすれば編集しやすくなるか考えていたので、1つの案としてこれが出てきたことでほっとしています。