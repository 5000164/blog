---
title: "Scala でコマンドライン引数を分解する"
date: "2018-05-15 20:47:36 +0900"
---

下記のように書くことでコマンドライン引数を分解できる。

```scala
val keyArgs = args.collect {
  case "--dry-run" => "dry-run"
}.toSet
val keyValueArgs = args.sliding(2).toList.collect {
  case Array("--date", specifiedDate: String) => "date" -> Some(specifiedDate)
}.toMap
```

```bash
--date "2018-05-15 00:00:00" --dry-run
```

のようなコマンドライン引数を渡した時に `keyArgs` と `keyValueArgs` はそれぞれ下記のようになる。

```scala
// keyArgs
Set("dry-run")

// keyValueArgs
Map("date" -> Some("2018-05-15 00:00:00"))
```
