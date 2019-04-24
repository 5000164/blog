---
title: "UbuntuのIntelliJ IDEAでJUnitを使う準備をする"
date: "2014-06-14 22:46:26 +0900"
---

## Ubuntuのバージョン
ubuntu 14.04 LTS  
64bit

## Javaのインストール
```
sudo apt-get update
sudo apt-get install -y python-software-properties
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install -y oracle-java8-installer
sudo update-java-alternatives -s java-7-oracle
```
## 参考  
[Ubuntu 12.04 LTS に Java (Oracle JDK) をインストールする - xykのブログ](http://xyk.hatenablog.com/entry/2013/10/15/175623)

## IntelliJ IDEAのインストール
公式サイトからダウンロードする  
[IntelliJ IDEA — The Best Java and Polyglot IDE](http://www.jetbrains.com/idea/)  
任意のディレクトリに配置

## IntelliJ IDEAの起動
解凍したディレクトリ内の`bin/idea.sh`を実行

## プロジェクトの作成
Java を選択  
Project SDK で New -> JDK を選択  
`/usr/lib/jvm/java-8-oracle`を選択してOK

## JUnitをインストール
GitHub のリンクから`junit.jar`と`hamcrest-core.jar`をダウンロード  
[junit-team/junit](https://github.com/junit-team/junit)  
`junit.jar`と`hamcrest-core.jar`をプロジェクトにコピー  
`junit.jar`と`hamcrest-core.jar`をライブラリに追加  
## 参考  
[junit-4.11.jar が単独で使えない - 日々常々](http://d.hatena.ne.jp/irof/20130110/p1)

## 試してみる
プロジェクトの直下に`test`ディレクトリを作成  
`test`ディレクトリを`Test Sources Root`にマーク  
`src`ディレクトリの下に Java Class ファイルを作成  
適当にメソッドを追加  
クラスの範囲にキャレットがある状態で、メニューバー -> Navigate -> Test を選択  
Create Test で JUnit4 を選び、Member で作成したメソッドをチェックして OK  
作成されたテストメソッドを右クリックして Run を実行

## 補足
テストメソッド名に日本語を使用した際に、テスト結果が文字化けしていた  
IntelliJ IDEA の設定から、IDE Settings -> Appearance -> Override default fonts by を使用して回避
