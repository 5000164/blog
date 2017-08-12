+++
title = ""FuelPHP で Debug::dump() と Log::debug() を簡単に使えるようにする""
date = 2015-03-01T22:19:02+09:00
+++

FuelPHP で Debug::dump() とか Log::debug() とかうつのがだるかった
====
e() という関数があったから、同じ感じで d() とか l() にしたいなって思った。

引数をただダンプするだけのようなやつを作った
====
ソースはこちら。  
FuelPHP 1.7.2 で動作確認してます。  
[FuelPHP で Debug::dump() と Log::debug() を簡単に使えるようにする](https://gist.github.com/5000164/a933cb3f485c9a60a1a0)

配置方法
====
e() という関数を追ったら core 直下の base.php に書いてあったので、同じような感じで app の下に base.php というファイルを作って bootstrap.php で require する。

結果
====
d() とか l() で表示できるようになって楽になった。
