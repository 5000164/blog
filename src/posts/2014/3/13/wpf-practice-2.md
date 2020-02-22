---
title: "WPF で方向キーを入力した方向へ四角形を動かす"
published: "2014-03-13 04:21:42 +0900"
updated: "2014-03-13 04:21:42 +0900"
featuredImage: ../../../../images/2014/3/13/wpf-practice-2-featured.png
---

# 実際に作ったものはこんな感じです

方向キーの入力した方向へで赤い点が動きます。  
ソースコードはこちら。

- [5000164/wpf-practice-2](https://github.com/5000164/wpf-practice-2)

# 画面に動かすものを表示する

とりあえずなんでもよかったので、 Rectangle タグで四角形を表示します。  
そして、位置を指定するために Canvas タグで囲みます。

```none
<Canvas>
    <Rectangle Name="pointer" Width="10" Height="10" Fill="Red" Canvas.Left="0" Canvas.Top="0" />
</Canvas>
```

これで XAML 側はほぼ完成。  
あとは動かすだけ。

# キーボードの入力を取得します

Window に PreviewKeyDown をつけます。  
これでキーが押されたらイベントが発生します。

- [WPFサンプル:KeyDownイベントとKeybord.Modifiersプロパティ:Gushwell&#8217;s C# Dev Notes](http://gushwell.ldblog.jp/archives/52318833.html)

# C# 側で座標を取得するために

まずは四角に Name をつけます。  
これで C# 側で変数として扱えます。

- [XAML とプログラムコード（WPF） (.NET Framework)](http://ufcpp.net/study/dotnet/wpf_xamlcode.html)

# 四角の現在位置を取得する

C# 側で四角につけた名前から座標を取得します。

```csharp
// 現在地を取得
Double leftPosition = Canvas.GetLeft(this.pointer);
Double topPosition = Canvas.GetTop(this.pointer);
```

- [Canvas.GetLeft メソッド (System.Windows.Controls)](http://msdn.microsoft.com/ja-jp/library/system.windows.controls.canvas.getleft(v=vs.110).aspx)

# 入力されたキーの内容を判断する

次は、方向キーが入力された方向へ動くために、入力されたキーを判断します。

```csharp
// 入力された方向キーの方向へ移動
if (e.Key == Key.Up)
    // 上
else if (e.Key == Key.Down)
    // 下
else if (e.Key == Key.Left)
    // 左
else if (e.Key == Key.Right)
    // 右
```

- [Key 列挙体 (System.Windows.Input)](http://msdn.microsoft.com/ja-jp/library/system.windows.input.key(v=vs.110).aspx)

# 入力された方向へ移動する

入力された方向がわかったら、その方向へ座標を移動して this.pointer にセットします。

```csharp
// 入力された方向キーの方向へ移動
if (e.Key == Key.Up)
    Canvas.SetTop(this.pointer, topPosition - 10);
else if (e.Key == Key.Down)
    Canvas.SetTop(this.pointer, topPosition + 10);
else if (e.Key == Key.Left)
    Canvas.SetLeft(this.pointer, leftPosition - 10);
else if (e.Key == Key.Right)
    Canvas.SetLeft(this.pointer, leftPosition + 10);
```

- [Canvas.SetLeft メソッド (System.Windows.Controls)](http://msdn.microsoft.com/ja-jp/library/system.windows.controls.canvas.setleft(v=vs.110).aspx)

# 完成

これで、キーボードの方向キーを入力した方向へ移動することができました。  
ただ、ゲームのようなものを作ろうと思っていたのですが、これだと実装が大変そうです。  
他の方法も調べてみようと思います。
