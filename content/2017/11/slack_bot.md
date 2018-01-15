+++
title = "Scala で Slack bot"
date = 2017-11-29T13:53:55+09:00
url = "2017-11-slack_bot"
+++

## 動機

Scala の勉強をするにあたって題材をどうしようか考えた。  
Twitter のことを最近いいなと感じ始めていたのだけれど投稿するのが面倒くさくて、簡単に投稿できるようにしたかったので普段よく使っている Slack から投稿できるようにすることにした。

## 概要

Slack の bot に投げた内容をツイートする。

## コード

ここです。

[5000164/scala-bot](https://github.com/5000164/scala-bot)

## 技術的なところ

## Scala のライブラリと Java のライブラリ

build.sbt で slack-scala-client は追加できるのに twitter4j-core は追加できないと悩んでいたら、 % と %% が違うことを知った。

> groupID % artifactID % revision のかわりに、 groupID %% artifactID % revision を使うと（違いは groupID の後ろの二つ連なった %%）、 sbt はプロジェクトの Scala のバイナリバージョンをアーティファクト名に追加する。 これはただの略記法なので %% 無しで書くこともできる:

[sbt Reference Manual — ライブラリ依存性](http://www.scala-sbt.org/1.x/docs/ja/Library-Dependencies.html)

slack-scala-client は Scala のライブラリなので略記法でいける、 twitter4j-core は Java のライブラリなので略記法ではいけない、ということだった。

## モックを使ったテスト

コントローラーのテストを書く時に、副作用が出る部分をモックにしようとした。  
調べたら Mockito というモックライブラリがよく使われているようなので、 ScalaTest と Mockito を使うことにした。

- [ScalaTest](http://www.scalatest.org/)
- [Mockito framework site](http://site.mockito.org/)
- [ScalaTest](http://www.scalatest.org/user_guide/testing_with_mock_objects)

情報をうまく探すことが出来なくて動かすまでに少し時間がかかった。

```scala
class OperatorSpec extends FreeSpec with MockitoSugar {
```

のように MockitoSugar をミックスインしたり、

```scala
import org.mockito.Mockito.{never, verify, when}
```

のように verify をインポートしたりすることで動くようになった。

しかし、モックの返り値を設定する thenReturn に

```scala
when(mockTwitter.tweet("text")).thenReturn(Right(Unit))
```

のように Unit を渡すとなぜかコンパイルエラーになってしまい動かなくなったので、

```scala
when(mockTwitter.tweet("text")).thenReturn(Right())
```

のように書いている。

また、

```scala
verify(mockTwitter).tweet("text")
```

はちゃんと引数の検証ができて想定していない値が渡されたらテストがコケるのに対して、

```scala
verify(mockClient).sendMessage("channel", "message")
```

の方は引数の値に関わらず、関数が実行されていればテストが通ってしまう状態になっている。  
関数が実行されていなければテストはコケる。

このあたりのコードはここに書いてある。

[scala-bot/OperatorSpec.scala at master · 5000164/scala-bot](https://github.com/5000164/scala-bot/blob/master/src/test/scala/jp/_5000164/scala_bot/interfaces/OperatorSpec.scala)

## 副作用がある関数の返り値

今回の場合では副作用は Twitter にツイートすることで発生する。  
副作用がある関数の返り値をどうやって表現するか、 Boolean にするか Option にするかライブラリが投げるエラーをそのままキャッチするか、どれもしっくりこないと思っていて調べていたら Either を見つけたので使ってみた。  
Either だと、エラーが起きたら文字列を返して、正常終了したら何も返さない、ということが表現できた。  
ツイートに成功したらそのままで、ツイートに失敗したら失敗した旨を Slack に投げたいと思っていたので、

```scala
twitter.tweet(Command.content(message.text)) match {
  case Right(_) =>
  case Left(error_message) => client.sendMessage(message.channel, error_message)
}
```

のように表現することができた。

## コマンドを増やしやすいような設計

今はツイートする機能だけだが、今後機能を増やしたいと思った時に追加しやすいように心がけた。  
そのために DDD を意識しながら全体の設計を行った。  
DDD はまだ全然勉強できておらず、これからたくさん学ぶ必要があるという感じだが、責任やレイヤーというものを意識した。

インターフェイス層としては

- アプリケーションのエンドポイント
- 発言されたメッセージの内容によって処理を振り分けるコントローラー
- Twitter へ投稿する処理

というように分け、ドメイン層としては

- メッセージの内容から指定されたコマンドを判定する
- 実際に処理を行うコマンド

というように分けた。  
判定したコマンドは case object としてコントローラーに返し、コントローラー側でパターンマッチを行って実際に処理を行うコマンドに投げる、という形にすることで、コマンドが追加しやすいようにした。

```scala
// コマンドに応じて処理を行う
Command.dispatch(message.text) match {
  case Some(TweetCommand) => // コマンドの内容を書く
  // 新しいコマンドを追加する時はここに書いていけばいい
}
```

## まとめ

Slack から Twitter に投稿できるようになって便利。  
小さいものでも、動くものを作ることで勉強になった。  
これからも勉強を続ける。
