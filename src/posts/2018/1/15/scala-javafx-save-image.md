---
title: "Scala で JavaFX の Casvas の内容を画像として保存する"
published: "2018-01-15 20:35:10 +0900"
updated: "2018-01-15 20:35:10 +0900"
---

[昨日の記事](/2018/1/14/scala-javafx-generate-image/) の続きのようなもの。  
`Canvas` で表示できるようになったから画像として保存する。  
コードはこんな感じ。

```scala
val c = new Canvas(300, 300)
val gc = c.getGraphicsContext2D
gc.setFill(Color.GRAY)
gc.setFont(Font.font("Hiragino Sans", 20))
gc.fillText("テキスト", 50, 50)

val wi = new WritableImage(300, 300)
c.snapshot(null, wi)
val ri = SwingFXUtils.fromFXImage(wi, null)
val f = new File("test.png")
ImageIO.write(ri, "png", f)

val root = new StackPane()
root.getChildren.add(c)
val scene = new Scene(root, 350, 350)
primaryStage.setTitle("test")
primaryStage.setScene(scene)
primaryStage.show()
```

これを実行するとこういう画像ファイルが生成される。

![生成された画像](../../../../images/2018/1/15/scala-javafx-save-image-1.png)

# ざっくり説明

`Canvas` の内容を `WritableImage` に変換する。  
これが `Canvas` が持ってる `snapshot` というメソッドでできるっぽい。  
その後は `RenderedImage` に変換してファイルに保存する。

# 参考

- [Java-Buddy: Save Canvas to PNG file](http://java-buddy.blogspot.jp/2013/04/save-canvas-to-png-file.html)
- [JavaFX 2 Snapshot as PNG Image | code.makery.ch](http://code.makery.ch/blog/javafx-2-snapshot-as-png-image/)

# ついでに保存場所選択

下記のコードを追加することで保存する場所を選べるようになった。

```scala
val fc = new FileChooser
val f = fc.showSaveDialog(primaryStage)
```
