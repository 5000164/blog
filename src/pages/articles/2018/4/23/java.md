---
title: "Scala から Java ライブラリを使った時のメモ"
date: "2018-04-23T21:18:30+09:00"
---

## build.sbt でライブラリの追加

```scala
libraryDependencies += groupID % artifactID % revision
```

のように書く。  
最初 Scala の略記法のように `%%` と書いていたのでうまく動かなかった。

- [sbt Reference Manual — ライブラリ依存性](https://www.scala-sbt.org/1.x/docs/ja/Library-Dependencies.html#%E3%83%9E%E3%83%8D%E3%83%BC%E3%82%B8%E4%BE%9D%E5%AD%98%E6%80%A7%EF%BC%88Managed+Dependencies%EF%BC%89)

## 型のキャスト

Java ライブラリに渡したりするためにキャストする時は `asInstanceOf` を使う。  
また、

```scala
import collection.JavaConverters._
```

のようにインポートしておくことで `asScala` や `asJava` でコレクションを変換できる。

- [Scalaのキャスト - Qiita](https://qiita.com/cupper/items/9028a5a108deb8706717)
- [Java と Scala 間のコレクションの変換 | Scala Documentation](https://docs.scala-lang.org/ja/overviews/collections/conversions-between-java-and-scala-collections.html)

## null を Option に変換

Java ライブラリのメソッドが `null` を返す場合がある時に、 `Option(func(value))` のように `Option` を使うことで Option 型に変換できる。  
値があったら `Some(result)` が返ってきて、 `null` だったら `None` が返ってくるようになる。

- [Javaとの相互運用 · Scala研修テキスト](https://dwango.github.io/scala_text/java-interop.html#null%E3%81%A8option)
