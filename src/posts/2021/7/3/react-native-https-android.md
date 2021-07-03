---
title: "Android Emulator 上で React Native のアプリを動かしてホストに HTTPS でアクセスする"
published: "2021-07-03 18:02:37 +0900"
updated: "2021-07-03 18:02:37 +0900"
---

Ruby on Rails の勉強をしていて、やっぱり動かせるクライアントが欲しいなと思って React Native でアプリを作り始めた。[Networking · React Native](https://reactnative.dev/docs/network) を読んでただ fetch したらデータが取得できたけど、

> On Android, as of API Level 28, clear text traffic is also blocked by default.

と書いてあったので HTTPS でアクセスできた方がいいのかなと思ってアクセスできるようにした。

# やり方

- `android/app/src/main/AndroidManifest.xml` に `android:networkSecurityConfig="@xml/network_security_config"` を追記する
- `android/app/src/main/res/xml/network_security_config.xml` に下記の内容を設定する

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="false">localhost</domain>
        <domain includeSubdomains="false">10.0.2.2</domain>
        <domain includeSubdomains="false">10.0.3.2</domain>
    </domain-config>
    <debug-overrides>
        <trust-anchors>
            <certificates src="@raw/localhost"/>
        </trust-anchors>
    </debug-overrides>
</network-security-config>
```

- サーバーで使用している証明書を `android/app/src/main/res/raw/localhost` にコピーする
- Android Emulator 上の React Native のアプリから `https://10.0.2.2/` にアクセスする

# 動くようになるまで

最終的にはこの設定だけで動くようになったが、こうなるまでにいろいろと調べた。最初はホストにアクセスする方法がわからなかったのでそこから。調べたら Android Emulator 上からは `10.0.2.2` でホストにアクセスできるとのことだった[^1]。さっそくアクセスしてみたら React Native で動かしてるアプリからアクセスしようとしてもエラーが出るが、Android Emulator 上の Chrome からはアクセスできるという状態になった。証明書をインストールする必要があるのかなと思って adb でファイルを渡してインストールしてみたが、変わらずアプリからはアクセスできないままだった[^2][^3]。

[^1]: [Set up Android Emulator networking | Android Developers](https://developer.android.com/studio/run/emulator-networking)
[^2]: [Androidエミュレータ(AVD)からローカルのwebサーバにアクセス - Qiita](https://qiita.com/rkunihiro/items/53a750b8e500b8b1df46)
[^3]: [How to push files to an emulator instance using Android Studio - Stack Overflow](https://stackoverflow.com/questions/30434451/how-to-push-files-to-an-emulator-instance-using-android-studio)

# エラーでググってみる

`TypeError: Network request failed` というエラーが出ていたのでそれでいろいろとググっていたら証明書に関するエラーかも知れないという話があったので見てみた[^4]。[Security with HTTPS and SSL | Android Developers](https://developer.android.com/training/articles/security-ssl.html) と [Network security configuration | Android Developers](https://developer.android.com/training/articles/security-config) を読んだら設定で証明書を指定することで動くようになりそうだということがわかった[^5]。`android/app/src/main/AndroidManifest.xml` の `application` に `android:networkSecurityConfig="@xml/network_security_config"` を追記して、`android/app/src/main/res/xml/network_security_config.xml` ファイルを作成し、例を参考に下記のように設定して、証明書をコピーした。

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config>
        <trust-anchors>
            <certificates src="@raw/localhost"/>
            <certificates src="system"/>
        </trust-anchors>
    </base-config>
</network-security-config>
```

[^4]: [javascript - React Native Post Request via Fetch throws Network Request Failed - Stack Overflow](https://stackoverflow.com/questions/34570193/react-native-post-request-via-fetch-throws-network-request-failed)
[^5]: また、設定で HTTP で動くようにもできそうだとわかったが、ここでは HTTPS で動かすことを目標としたまま進めた

# 設定したら違うエラーが出た

今度は Metro に接続できないというエラーが発生した。調べたら、おそらく、何も設定しなかったら React Native の設定が使われて HTTP でアクセスできるようになっていたものが、自分の設定ファイルを作成したことで設定が上書きされるようになったのだと思われる[^6]。なので、Metro は HTTP でアクセスできるようにするために設定を追加し、ついでに `debug-overrides` という設定を見つけたのでそれを使用して、最初に提示したような設定の内容となった[^7]。

[^6]: [[Android][DevSupport] Add Network Security Config file (fixes #22375) by Salakar · Pull Request #23105 · facebook/react-native](https://github.com/facebook/react-native/pull/23105)
[^7]: [RN is unable to communicate with metro bundler when targetSdkVersion 28 · Issue #22024 · facebook/react-native](https://github.com/facebook/react-native/issues/22024)

# 設定は合ってるはずなのに動かない

設定は合ってるはずなのに動かなかった。おかしいと思ってログをちゃんと見てみようと思って `npx react-native log-android` を実行してみた[^8][^9][^10]。そうしたら表示されるエラーが明らかにおかしくて、どこか間違ってるのかなと思って fetch しているコードを見てみたら、なにかの操作ミスで URL が指定されるべき場所に全然関係ない文字列が指定されていた。そこを `https://10.0.2.2/` から始まる URL にしたらちゃんと動いた。

[^8]: [How to do logging in React Native? - Stack Overflow](https://stackoverflow.com/questions/30115372/how-to-do-logging-in-react-native)
[^9]: 最初にログをちゃんと見るべき
[^10]: 見やすくてわかりやすかった

# React Native よさそう

React Native はまだ触り始めたばかりで全然わかっていないが、よさそうな感じがする。React のような感じのコードがアプリになるのすごい。とりあえず手持ちの Android と iPad にアプリをインストールしてみたが、実機でアプリが動くのは楽しい。これから開発を進めていく予定。
