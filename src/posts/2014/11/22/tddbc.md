---
title: "最初から完璧を求めない - 「TDDBC in Tokyo 2014-11」に参加しました"
published: "2014-11-22 23:08:52 +0900"
updated: "2014-11-22 23:08:52 +0900"
---

# 「TDDBC in Tokyo 2014-11」に参加しました

イベントの詳細はこちら。  
[TDDBC in Tokyo 2014-11 - TDDBC | Doorkeeper](http://tddbc.doorkeeper.jp/events/17353)  

課題はこちら。  
[TDD演習課題 - TODOリストアプリ](https://gist.github.com/kyonmm/6102436)  

私の組の実装はこちら。  
[5000164/tddbc-tokyo_2014-11](https://github.com/5000164/tddbc-tokyo_2014-11)

# 理解しやすいテストを書く

基調講演は xUnit Test Patterns の著者である Gerard Meszaros さんの「Refactoring a Test」だった。  
単体テストはわかりやすく書く。  
悪いコードが示されて、ここはこうする、次はこうする、と話してくれた。  
1 つのテストコードは 5 行に抑える、7 行を超えると理解しづらくなる。  
カスタムアサーションというものを知った。  
すっきり書けるようになっててよかった。  

# なにをテストしたいのか？

このテストケースではなにをテストしたいのかを明確にする。  
重要でないセットアップは 1 つのメソッドにまとめてしまう。  
こうすることで、どこにフォーカスしたいテストなのかがわかりやすくなる。

# やっぱ英語はできないとだめだ

リアルタイムのヒアリングだとほとんど理解できなかった。  
単体テストの部分は、なんとなく知っている部分があったのでほんのりわかったが、機能テストとかの話になったら理解できなくなった。  
英語ができないってだけでアクセスできる情報が制限されるのってやっぱり残念だ。

# TDD はやっぱりおもしろい気がする

あの感じ好きだ。  
設計とかをもっと考えられるようになりたい。

# テストの粒度というか責務というかがわからない

というか全体的によくわかってない。  
これをまずは立ち読みしてみる。  
[実践テスト駆動開発 (Object Oriented SELECTION) | Steve Freeman, Nat Pryce, 和智 右桂, 高木 正弘 |本 | 通販 | Amazon](https://www.amazon.co.jp/dp/4798124583)

# やれるところからやる

いきなりはできない。  
最初から完璧な TDD を回すことはできない。  
経験が必要。  
やれないからやらないではいつまでもできない。  
やれるところからやる。  
実装するときに、TDD できそうか考える。  
やれそうならやる。  
やれないならなぜやれないのか考える。  
スキルが足りないのか、定義や分析が不十分なのか。  
再帰的に問題を洗い出す。  

# TDD のできる領域とできない領域がある

TDD に調査分析はできない。  
テストファーストだけでは TDD ではない。  
テストでデザインするのが TDD。  
設計を考える。

# テストは品質を担保する

相手が品質に納得できる必要がある。  
Hello, world! にテストはいらない。  
単体テストでやったことを機能テストでもやるか。  
やった方が品質は担保されるが工数がかかる。  
相手が納得できるところを探す。

# 他人に甘えていた

今までは、こういうのやりませんか？って呼びかけるだけだった。  
でもそれじゃだめだ。  
自分で勉強して、できるようになって、おれができるのでやりましょう、ってやるべきだった。  
環境に依存していちゃだめだ。  
やれるところからやる。  
自分のスキルがあって、その領域から一歩踏み出して経験して、どんどん領域を広げていくしかない。

# 勉強する

- [テストファースト、自動テストを導入するという事について（@社内勉強会）](https://www.slideshare.net/KyonMm/ss-41785717)
- [「いまさら聞けないTDD/BDD超入門」最新記事一覧 - ITmedia Keywords](http://www.atmarkit.co.jp/ait/kw/tdd_bdd.html)  
- [Mikado-Method - Google 検索](https://www.google.co.jp/search?q=Mikado-Method)
