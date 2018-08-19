+++
title = "Scala の SSL / TLS 通信の中身を見る"
date = 2018-01-05T17:48:03+09:00
+++

## Scala の通信の中身が見たい

Scala で API を叩くコードを書いた。  
ちゃんと API を叩けているのか知りたい、リクエストとレスポンスが見たいと思った。

## プロキシーを通す

[Charles](https://www.charlesproxy.com/) を使ってローカルにプロキシーを立てる。 ([Postman](https://www.getpostman.com/) も試してみたんだけどレスポンスが自動保存されないっぽい気がして、連続で API を叩いて内容がどんどん変わっていく今回の用途では使えなかった。)  
HTTP 通信のライブラリとして [sttp](https://github.com/softwaremill/sttp) を使用していたので [プロキシーの設定方法](http://sttp.readthedocs.io/en/latest/conf/proxy.html) を参考にして下記のように設定する。

```scala
val backend = HttpURLConnectionBackend(options = SttpBackendOptions.httpProxy("localhost", 8888))
```

これだけで、 HTTP 通信の中身は見られるようになる。

## 2018.5.28 追記

`HttpURLConnectionBackend` のデフォルト引数が `options: SttpBackendOptions = SttpBackendOptions.Default` となっていて、なにも設定しなければシステムのプロキシー設定を反映してくれるので

```scala
val backend: SttpBackend[Id, Nothing] = HttpURLConnectionBackend()
```

のままでいい。  
Charles は起動時に自動でシステムのプロキシー設定を書き換えてくれるので、設定がそのまま反映される。

## SSL / TLS 通信の中身を見えるようにする

SSL / TLS 通信の中身を見るための手順としては

- Charles の証明書を信頼したキーストアを生成する
- 生成したキーストアをアプリケーションから読み込む
- Charles の SSL Proxy を有効にする

となる。

## Charles の証明書を信頼したキーストアを生成する

まず Charles の証明書を取得する。  
これはアプリケーションのメニューの `Help > SSL Proxying > Save Charles Root Certificate...` から取得できる。  
拡張子は `Binary certificate (.cer)` で保存する。  
保存したら取得した証明書を信頼したキーストアを生成する。  
この時に普段使用されるキーストアを別の場所にコピーしてから作業を行うことで環境を汚さないようにした。  
普段使用されるキーストアは jdk の中にあり、自分の場合は `$(/usr/libexec/java_home)/lib/security/cacerts` にあった。

```sh
keytool -keystore cacerts -importcert -alias charles -file charles-ssl-proxying-certificate.cer
```

また、この時に `keytool -list -keystore cacerts` のようにして内容を表示して追加されたかどうか確認することができる。

## 生成したキーストアをアプリケーションから読み込む

先ほど作成したキーストアをアプリケーションから読み込む。  
実行環境としては IntelliJ IDEA で Scala を動かしている。  
設定方法が環境変数に指定する方法しかわからなかったので環境変数に設定を行う。  
下記のような内容を実行時の `VM parameters` に設定する。

```sh
-Djavax.net.ssl.keyStore=/path/to/cacerts -Djavax.net.ssl.keyStorePassword=changeit -Djavax.net.ssl.trustStore=/path/to/cacerts -Djavax.net.ssl.trustStorePassword=changeit
```

`/path/to/cacerts` には先ほど作成したキーストアへのパスを指定する。

## 2018.5.28 追記

sbt から実行する場合は

```sh
SBT_OPTS="-Djavax.net.ssl.keyStore=/path/to/cacerts -Djavax.net.ssl.keyStorePassword=changeit -Djavax.net.ssl.trustStore=/path/to/cacerts -Djavax.net.ssl.trustStorePassword=changeit" sbt run
```

のようにする。

## Charles の SSL Proxy を有効にする

証明書を設定することで通信を行えるようにはなるが、このままでは通信の内容を見ることはできない。  
通信の内容を見るために Charles の SSL Proxy の設定を有効にする。  
メニューの `Proxy > SSL Proxying Settings...` から設定画面を開き、 `Enable SSL Proxying` を有効にして対象のドメインを追加する。  
これで SSL / TLS の通信の内容を見ることができるようになる。

## 感想

なにをどうすれば通信の中身が見えるようになるのか全然わからない状態で調べ始めたけど、調べたらなんとかなってよかった。  
通信の中身が見えるの便利。

## ハマったことのメモ

- Scala に javaOptions を設定する方法がわからなかった
    - build.sbt に書いても動かなかった
        - IntelliJ IDEA 経由で実行してたからっぽい？ `sbt run` したら動いた
- 下記の方法で javaOptions の中身が表示できるけど仕組みはわかってない
    - これのおかげで javaOptions に設定できたと思ってたけどできてなかった、というところが問題だと気付くことができた

```scala
// import what we need
import java.lang.management.ManagementFactory

import scala.collection.JavaConverters._

// get a RuntimeMXBean reference
val runtimeMxBean = ManagementFactory.getRuntimeMXBean

// get the jvm's input arguments as a list of strings
val listOfArguments = runtimeMxBean.getInputArguments.asScala

// print the arguments using my logger
for (a <- listOfArguments) println(s"ARG: $a")
```

## 参考になったリンク

- [How to read JVM parameters/arguments from within a running Java application | alvinalexander.com](https://alvinalexander.com/java/how-see-jvm-parameters-arguments-from-running-java-application)
- [JavaのJSSEでクライアント証明書を自由に選択できるようにする - 理系学生日記](http://kiririmode.hatenablog.jp/entry/20160611/1465570800)
- [SSLクライアント証明書を使って通信する - Qiita](https://qiita.com/kompiro/items/25b2e01c2e9aaab7f67d)
- [javaのプログラムから、自己証明書等を利用したサイトにSSL接続する | ぱーくん plus idea](http://web.plus-idea.net/2012/10/java-ssl-keystore/)
- [How to use personal SSL CA on connecting to MySQL from Scala (sbt)](https://gist.github.com/tomykaira/6862475)
- [Java CA ストアへの証明書の追加 | Microsoft Docs](https://docs.microsoft.com/ja-jp/azure/java-add-certificate-ca-store)
- [JDK keytool の基本的な使い方 (openssl との対比) - Qoosky](https://www.qoosky.io/techs/9db75cec15)
- [JavaにSSL証明書を追加する - Qiita](https://qiita.com/nenokido2000/items/b36b6e5f0854d7d63ba6)
