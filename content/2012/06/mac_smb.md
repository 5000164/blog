+++
title = "Macでsmbに接続する時にユーザ名を最初から入力された状態にする"
date = 2012-06-26T00:12:55+00:00
url = "2012-06-mac_smb"
+++

Macから認証がかかってるサーバへ接続する際は、サーバアドレス入力後にユーザ名とパスワードを入力します。

この時に、Macにログインしてるユーザ名を初期入力してくれてるのですが、必ずしもサーバのユーザ名と一致しているわけではありません。

下記のようにサーバアドレスを入力することで、任意のユーザ名を初期入力させておくことができます。

今まで接続していたアドレス

```
smb://ServerName/ShareName
```

ユーザ名を初期入力させて接続するアドレス

```
smb://ドメイン名;ユーザ名@ServerName/ShareName
```

参考

[Mac OS X：Windows ファイル共有 (SMB) に接続する方法](http://support.apple.com/kb/HT1568?viewlocale=ja_JP&locale=ja_JP)

ログインした時に自動接続する方法もあるらしいです。

[Mac OS X：ログインしたときに自動的にサーバに接続する方法](http://support.apple.com/kb/HT4011?viewlocale=ja_JP&locale=ja_JP)