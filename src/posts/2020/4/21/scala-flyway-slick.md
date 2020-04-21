---
title: "Scala で Flyway と Slick を使って codegen した時のログ"
published: "2020-04-21 12:51:04 +0200"
updated: "2020-04-21 12:51:04 +0200"
featuredImage: "../../../../images/2020/4/21/scala-flyway-slick-featured.jpg"
---

この記事は 2018 年 7 月ころに作業した内容を 2020 年 4 月に公開したものです。

- Slick と quill でどっちを使うか考えたけど、Slick だとテーブル構造からコードが codegen で自動生成できるらしいので Slick を使うことにした
- 公式ドキュメントを基にして build.sbt に依存を追加
  - [Getting Started](http://slick.lightbend.com/doc/3.2.3/gettingstarted.html)
- SQLite を使うので JDBC ドライバーも追加
  - [xerial/sqlite-jdbc: SQLite JDBC Driver](https://github.com/xerial/sqlite-jdbc)
  - データベースは後で SQLite から H2 にした
- メモ
  - [FlywayでScalaからデータベースをマイグレーションしてみる - YoshinoriN's Memento](https://yoshinorin.net/2018/02/04/use-flywaydb/)
  - [API - First Steps - Flyway by Boxfuse • Database Migrations Made Easy.](https://flywaydb.org/getstarted/firststeps/api)
  - [MySQL :: MySQL 5.6 リファレンスマニュアル :: 3.6.9 AUTO_INCREMENT の使用](https://dev.mysql.com/doc/refman/5.6/ja/example-auto-increment.html)
  - [Datatypes In SQLite Version 3](https://www.sqlite.org/datatype3.html)
  - [SQLite AUTOINCREMENT](https://www.tutorialspoint.com/sqlite/sqlite_using_autoincrement.htm)
- 公式ドキュメント
  - [Schema Code Generation](http://slick.lightbend.com/doc/3.2.3/code-generation.html)
- 公式ドキュメントのままだと動かなかったから参考になったやつ
  - [slick-codegenの基本使用例、DEFAULT値の付いたTIMESTAMPをOption型として出力する](https://qiita.com/peutes/items/fb14dcea37bb601cd151)
- SQLite の Driver の書き方はここを見た
  - [SQLite - SQLite - Flyway by Boxfuse • Database Migrations Made Easy.](https://flywaydb.org/documentation/database/sqlite)
- SQLite の Autoincrement は通常不要だけど Slick の自動生成コードが Autoincrement だとわかるように Autoincrement にした
  - [SQLite Autoincrement](https://www.sqlite.org/autoinc.html)
- case class を使った insert はここを参考にした
  - [Queries](http://slick.lightbend.com/doc/3.2.3/queries.html#inserting)
- 実際に作業した時の Pull Request
  - [Feature/migration by 5000164 · Pull Request #9 · 5000164/hatena-bookmark-filter](https://github.com/5000164/hatena-bookmark-filter/pull/9)
