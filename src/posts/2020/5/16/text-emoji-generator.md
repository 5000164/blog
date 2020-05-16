---
title: "Electron と Scala.js と scalajs-react と ScalaCSS を使ってアプリを作った時のログ"
published: "2020-05-16 19:46:10 +0200"
updated: "2020-05-16 19:46:10 +0200"
featuredImage: "../../../../images/2020/5/16/text-emoji-generator-featured.jpg"
---

この記事は 2018 年 2 月ころに作業した内容を 2020 年 5 月に公開したものです。

# 実際のリポジトリ

- [5000164/text-emoji-generator: テキスト絵文字を生成する](https://github.com/5000164/text-emoji-generator)

# 背景

- Slack 用のテキスト絵文字を簡単に作りたい
- 色の指定は行いたいので画面が欲しい
- すぐ起動できるようにデスクトップアプリにする

# 構成

- Electron
- Scala.js
- scalajs-react
- ScalaCSS

# 環境構築

- 下記を参考に動くようにする
  - [Basic tutorial - Scala.js](http://www.scala-js.org/doc/tutorial/basic/index.html)
  - [japgolly/scalajs-react: Facebook's React on Scala.JS](https://github.com/japgolly/scalajs-react)
  - [japgolly/scalacss: Super type-safe CSS for Scala and Scala.JS.](https://github.com/japgolly/scalacss)
  - [shashkovdanil/scalajs-react-boilerplate: Create Scala.js React apps](https://github.com/shashkovdanil/scalajs-react-boilerplate)
  - [electron/electron-packager: Customize and package your Electron app with OS-specific bundles (.app, .exe, etc.) via JS or CLI](https://github.com/electron/electron-packager)

# 入力した文字を Canvas に描画する

- 下記を参考に実装する
  - [https://japgolly.github.io/scalajs-react/#examples/todo](https://japgolly.github.io/scalajs-react/#examples/todo)
  - [scalajs-react/USAGE.md at master · japgolly/scalajs-react](https://github.com/japgolly/scalajs-react/blob/master/doc/USAGE.md)
  - [scalajs-react/CALLBACK.md at master · japgolly/scalajs-react](https://github.com/japgolly/scalajs-react/blob/master/doc/CALLBACK.md)

# Canvas を画像として保存する

- 下記を参考に実装する
  - [scala-js-dom](http://scala-js.github.io/scala-js-dom/)
  - [How to embed javascript code directly in scala.js? - Stack Overflow](https://stackoverflow.com/questions/28656170/how-to-embed-javascript-code-directly-in-scala-js)
  - [node.js - How to invoke nodejs modules from scala.js? - Stack Overflow](https://stackoverflow.com/questions/28656343/how-to-invoke-nodejs-modules-from-scala-js)
  - [JavaScript types - Scala.js](https://www.scala-js.org/doc/interoperability/types.html)
  - [Convert a base64 string to a file in Node - CodeBlocQ](http://www.codeblocq.com/2016/04/Convert-a-base64-string-to-a-file-in-Node/)

# ライブラリのライセンスを表記する

- 下記を参考にリポジトリに追加する
  - [gitbucket/licenses.md at master · gitbucket/gitbucket](https://github.com/gitbucket/gitbucket/blob/master/doc/licenses.md)
  - [gwen/LICENSE-THIRDPARTY at master · gwen-interpreter/gwen](https://github.com/gwen-interpreter/gwen/blob/master/LICENSE-THIRDPARTY)
  - [このバージョンについて | Slack](https://slack.com/libs/desktop)
- ライセンスを生成するために使用しているライブラリ
  - [sbt/sbt-license-report: Report on licenses used in an sbt project.](https://github.com/sbt/sbt-license-report)
  - [davglass/license-checker: Check NPM package licenses](https://github.com/davglass/license-checker)
