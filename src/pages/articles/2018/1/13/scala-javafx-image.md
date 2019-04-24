---
title: "Scala で JavaFX を使って画像を表示する"
date: "2018-01-13 20:59:55 +0900"
---

こんな感じ。

```scala
val image = new Image(getClass.getResource("/test.png").toString)
val imageView = new ImageView(image)
val root = new StackPane()
root.getChildren.add(imageView)
val scene = new Scene(root, 350, 350)
primaryStage.setTitle("test")
primaryStage.setScene(scene)
primaryStage.show()
```

## ポイント

画像を下記のパスに配置して `getClass.getResource("/test.png").toString` でパスを取得すること。

```
.
└── src
    └── main
        └── resources
            └── test.png
```

## 参考

- [java - JavaFx Images Path - Stack Overflow](https://stackoverflow.com/questions/33305037/javafx-images-path)
