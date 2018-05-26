+++
title = "設定ファイルを Scala で書く"
date = 2018-05-26T15:18:13+09:00
+++

## 背景

- リポジトリに入れたくない情報は別ファイルに設定として書く
- 型が表現できないのが面倒くさい

## 目的

- Scala で設定ファイルを書けるようにする

## やり方

- Scala で設定を書いて Eval する

## 具体的なコード

- 設定を表現する

```scala
trait SettingsType {
  val hogeSettings: String
  val fooSettings: FooSettings
}

case class FooSettings(
    bar: String,
    baz: Int)
```

- build.sbt で依存関係を解決

```sbt
libraryDependencies += "org.scala-lang" % "scala-compiler" % scalaVersion.value
```

- Eval するコードを書く

```scala
import scala.io.Source
import scala.reflect.runtime.{currentMirror, universe}
import scala.tools.reflect.ToolBox

object Settings {
  val toolbox: ToolBox[universe.type] = currentMirror.mkToolBox()
  val settings: SettingsType = toolbox.eval(toolbox.parse(Source.fromResource("Settings.scala").mkString)).asInstanceOf[SettingsType]
}
```

- 設定を書く

```scala
new SettingsType {
    val hogeSettings = "hogehoge"
    val fooSettings = FooSettings("foobar", 1)
}
```

- 設定がリポジトリに含まれないように .gitignore に追記

```gitignore
Settings.scala
```

- 設定方法がわかりやすいようにサンプルを SettingsSample として作っておいてリポジトリに含める

```scala
new SettingsType {
    val hogeSettings = ""
    val fooSettings = FooSettings("", 0)
}
```

## 参考

- [Scala2.11でEval - xuwei-k's blog](https://xuwei-k.hatenablog.com/entry/20140607/1402128646)
- [Scala で YAML を読み込む方法 (の代替) - Qoosky](https://www.qoosky.io/techs/66d656fb42)
