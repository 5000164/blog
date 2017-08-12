+++
title = "FuelPHP のログレベルは INFO の方が DEBUG よりも上"
date = 2015-03-06T00:25:25+09:00
url = "2015-03-fuelphp_log"
+++

FuelPHP のログレベルは INFO の方が DEBUG よりも上
====
Fuel の Core の Log クラスに $levels が定義されています。  
FuelPHP 1.7.2 で INFO は 200、DEBUG は 100。

なぜ疑問に思ったのか
====
FuelPHP の config.php の出力するログレベルの設定のところに、

```
/**
 * Logging Threshold.  Can be set to any of the following:
 *
 * Fuel::L_NONE
 * Fuel::L_ERROR
 * Fuel::L_WARNING
 * Fuel::L_DEBUG
 * Fuel::L_INFO
 * Fuel::L_ALL
 */
```

このように書いてあるので、「INFO に設定したら DEBUG ログも出るのかー」と勝手に思い込んでいたからでした。

実際に動かせばわかる
====
実際に動かしたら、設定が DEBUG の時はログレベル INFO も DEBUG も出力されたが、設定が INFO の時は INFO が出力されて DEBUG は出力されなかった。

結論
====
調べるために[ドキュメント](http://fuelphp.com/docs/classes/log.html)を読んでいたら、Log::write() で任意のレベルをつけられること、logger() というエイリアスの関数があることがわかった。  
[この前](http://blog.5000164.jp/2015-03-fuelphp_debug/) l() って関数でログ出力できるようにしたばっかりだったのに、すでに似たようなものがあったとは。  
ドキュメントを読むのは大事ですね。
