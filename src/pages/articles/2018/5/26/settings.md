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

- `resources` 以下に設定ファイルを入れてしまうと生成された jar に含まれてしまうのでトップディレクトリに設定ファイルを配置する

```
.
├── build.sbt
├── Settings.settings
├── SettingsSample.settings
└── src
    └── main
        └── scala
            ├── infrastructure
            │   └── Settings.scala
            └── interfaces
                └── Application.scala
```

## 具体的なコード

## 依存関係を解決

- `build.sbt`

```sbt
libraryDependencies += "org.scala-lang" % "scala-compiler" % scalaVersion.value
```

## 設定を Eval する

- `infrastructure/Settings.scala` で設定を表現する
- `System.getProperty("settings")` を使うことで使用する設定ファイルを実行時に指定できるようになる
    - 例: `java -Dsettings=Settings.settings -jar run.jar`

```scala
package infrastructure

import scala.io.Source
import scala.reflect.runtime.{currentMirror, universe}
import scala.tools.reflect.ToolBox

object Settings {
  val toolbox: ToolBox[universe.type] = currentMirror.mkToolBox()
  val settings: SettingsType = toolbox.eval(toolbox.parse(Source.fromFile(System.getProperty("settings")).mkString)).asInstanceOf[SettingsType]
}

trait SettingsType {
  val hoge: String
  val foo: Int
}
```

## 設定を書く

- `Settings.settings`
    - 拡張子が `.scala` だとコンパイルされてしまうのでコンパイルされないように拡張子を任意の拡張子に変える
        - IntelliJ でこの拡張子を Scala ファイルとして開くという設定をすることでコードを補完しながら設定を書くことができる

```scala
import infrastructure.SettingsType

new SettingsType {
    override val hoge = "hogehoge"
    override val foo = 1
}
```

## 設定のサンプルを書く

- 設定方法がわかりやすいようにサンプルを `SettingsSample.settings` として作っておいてリポジトリに含める

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
Settings.scala
```

## 使い方

- `interfaces/Application.scala`

```scala
package interfaces

import infrastructure.Settings.settings

object Application extends App {
  println(settings.hoge)
  println(settings.foo)
}
```

## 参考

- [Scala2.11でEval - xuwei-k's blog](https://xuwei-k.hatenablog.com/entry/20140607/1402128646)
- [Scala で YAML を読み込む方法 (の代替) - Qoosky](https://www.qoosky.io/techs/66d656fb42)
