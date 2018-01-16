+++
title = "Android 実機の SQLite ファイルをローカルに持ってくる"
date = 2014-11-14T20:39:16+09:00
url = "2014-11-sqlite"
+++

## 結論

```
adb shell
run-as {パッケージ名} cat databases/{DB 名} > /sdcard/{DB 名}
exit
adb pull /sdcard/{DB 名} ~/Downloads/{DB 名}
```

## 解説

adb pull ではパッケージの権限がないため直接ファイルを取得できない  
なので run-as コマンドを使いパッケージの権限があるユーザーで adb pull できる領域にファイルをコピー  
Android は cp コマンドがないので cat コマンドの出力をリダイレクトして同じ内容のファイルを生成している  
ファイルが adb pull できる領域にコピーできたので adb pull

## あとはローカルで好きにできる

好きな GUI で簡単に見られる  
継続的に繰り返すのは大変だけど、手軽に見られるのは楽  
[DB Browser for SQLite](http://sqlitebrowser.org/)  
[SQLite Manager :: Add-ons for Firefox](https://addons.mozilla.org/ja/firefox/addon/sqlite-manager/)

## まとめ

```
adb -d shell "run-as {パッケージ名} cat databases/{DB 名} > /sdcard/{DB 名}"
adb pull /sdcard/{DB 名} ~/Downloads/{DB 名}
```
ってやれば 2 行でいけるかも知れないけど未検証  

## 参考

[Android端末の開発中データベース(SQlite)を見る方法 #Pistatium](http://kimihiro-n.appspot.com/show/275003)  
[[Android]実機デバッグでdata/dataに保存したファイルを取得する方法 | Memorandum blog](http://to-developer.com/blog/?p=1111)
