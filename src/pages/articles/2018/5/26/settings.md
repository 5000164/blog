---
title: "設定ファイルを Scala で書く"
date: "2018-05-26 15:18:13 +0900"
---

## 背景

- リポジトリに入れたくない情報は別ファイルに設定として書く
- 型が表現できないのが面倒くさい

## 目的

- Scala で設定ファイルを書けるようにする

## やり方

- Scala で設定を書いて Eval する

## ディレクトリ構成

```
.
├── build.sbt
└── src
    └── main
        ├── resources
        │   ├── Settings.scala
        │   └── SettingsSample.scala
        └── scala
            ├── infrastructure
            │   └── Settings.scala
            └── interfaces
                └── Application.scala
```

## 具体的なコード

## 依存関係を解決

build.sbt

```sbt
libraryDependencies += "org.scala-lang" % "scala-compiler" % scalaVersion.value
```

## 設定を Eval する

- 設定を表現する

infrastructure/Settings.scala

```scala
package infrastructure

import scala.io.Source
import scala.reflect.runtime.{currentMirror, universe}
import scala.tools.reflect.ToolBox

object Settings {
  val toolbox: ToolBox[universe.type] = currentMirror.mkToolBox()
  val settings: SettingsType = toolbox.eval(toolbox.parse(Source.fromResource("Settings.scala").mkString)).asInstanceOf[SettingsType]
}

trait SettingsType {
  val hoge: String
  val foo: Int
}
```

## 設定を書く

resources/Settings.scala

```scala
import infrastructure.SettingsType

new SettingsType {
    override val hoge = "hogehoge"
    override val foo = 1
}
```

## 設定のサンプルを書く

- 設定方法がわかりやすいようにサンプルを SettingsSample として作っておいてリポジトリに含める

resources/SettingsSample.scala

```scala
import infrastructure.SettingsType

new SettingsType {
    override val hoge = ""
    override val foo = 0
}
```

## 設定がリポジトリに含まれないようにする

.gitignore

```gitignore
src/main/resources/Settings.scala
```

## 使い方

interfaces/Application.scala

```scala
package interfaces

import infrastructure.Settings.settings

object Application extends App {
  println(settings.hoge)
  println(settings.foo)
}
```

## 現時点での問題点

- コンパイルした時に設定ファイルが含まれてしまう
- 設定は外から指定できるようにしたい

## 参考

- [Scala2.11でEval - xuwei-k's blog](https://xuwei-k.hatenablog.com/entry/20140607/1402128646)
- [Scala で YAML を読み込む方法 (の代替) - Qoosky](https://www.qoosky.io/techs/66d656fb42)
