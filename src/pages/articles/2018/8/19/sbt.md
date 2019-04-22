---
title: "sbt ~test でテストを実行し続ける"
date: "2018-08-19T12:35:17+09:00"
---

下記コマンドを実行する。

```sh
sbt ~test
```

そうするとファイルの変更を検知するたびに自動でテストを実行してくれる。  
仕組みとしては `~` を付けることで `test` コマンドに限らず継続的にコマンドを実行してくれるというもの。  
ドキュメントはこのあたり。

- [sbt Reference Manual — Running](https://www.scala-sbt.org/1.x/docs/Running.html#Continuous+build+and+test)
- [sbt Reference Manual — Triggered Execution](https://www.scala-sbt.org/1.x/docs/Triggered-Execution.html)
