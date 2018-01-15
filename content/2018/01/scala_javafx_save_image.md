+++
title = "Scala で JavaFX の Casvas の内容を画像として保存する"
date = 2018-01-15T20:35:10+09:00
url = "2018-01-scala_javafx_save_image"
+++

[昨日の記事]({{< relref "2018/01/scala_javafx_generate_image.md" >}}) の続きのようなもの。  
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

{{< figure src="/images/2018/01/scala_javafx_save_image-1.png" title="生成された画像" >}}

## ざっくり説明

`Canvas` の内容を `WritableImage` に変換する。  
これが `Canvas` が持ってる `snapshot` というメソッドでできるっぽい。  
その後は `RenderedImage` に変換してファイルに保存する。

## 参考

- [Java-Buddy: Save Canvas to PNG file](http://java-buddy.blogspot.jp/2013/04/save-canvas-to-png-file.html)
- [JavaFX 2 Snapshot as PNG Image | code.makery.ch](http://code.makery.ch/blog/javafx-2-snapshot-as-png-image/)

## ついでに保存場所選択

下記のコードを追加することで保存する場所を選べるようになった。

```scala
val fc = new FileChooser
val f = fc.showSaveDialog(primaryStage)
```
