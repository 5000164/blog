+++
title = ""IDE で FuelPHP の補完を効かせるための _autocomplete.php を生成するタスク""
date = 2015-03-05T02:41:53+09:00
+++

IDE に FuelPHP の補完を効かせたい
====
補完効かないのだるいなーと思ってぐぐったらあった。  
[Eclipse で FuelPHP のコード補完を行わせる冴えたやり方 - A Day in Serenity @ kenjis](http://d.hatena.ne.jp/Kenji_s/20120123/1327301678)  
これで生成して自動補完させることができた。

Core を拡張していたからクラス名が重複してしまった
====
Core を拡張したクラスと _autocomplete.php のクラスがだぶってしまって、IDE が警告を出してきた。  
でも手作業でコメントアウトするのはだるい。  
というわけで生成処理を変更した。  
FuelPHP 1.7.2 で動作確認してます。  
[IDE で FuelPHP の補完を効かせるための _autocomplete.php を生成するタスク](https://gist.github.com/5000164/a7731d2e151c664bef13)

MIT ライセンスのソースを初めて変更して公開した
====
MIT ライセンスなので、原著作者のライセンス表記があればライセンス違反にはならないはずだが、変更して公開するのは初めてなのでこの書き方で正しいのか不安になる。

結果
====
自動補完便利。  
PhpStorm 賢い。
