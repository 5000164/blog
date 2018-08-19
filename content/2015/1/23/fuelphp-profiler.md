+++
title = "FuelPHP に fuelphp-profiler-log をインストールする"
date = 2015-01-23T03:32:18+09:00
+++

## FuelPHP のログにプロファイラの情報を出力できるパッケージをインストールしてみる

FuelPHP のバージョンは 1.7.2。  
インストールするパッケージはこちら。  
[MiuraKatsu/fuelphp-profiler-log](https://github.com/MiuraKatsu/fuelphp-profiler-log)  
手順を見ると、Core を直接いじってるので、Core をいじらないで拡張する。

## 手順

`fuel/packages` で下記コマンド実行してパッケージの取得  
`git clone --recursive git://github.com/MiuraKatsu/fuelphp-profiler-log.git profiler-log`

`config` の `packages` に `profiler-log` を追加

`packages/profiler-log/core/class/profiler.php` を `app/classes/profiler.php` にコピーして編集  
`namespace` と `use` を削除  
`class Profiler extends \Fuel\Core\Profiler` として継承

`app/bootstrap.php` を編集  
`Autoloader::add_classes` に `'Profiler' => APPPATH . 'classes/profiler.php',` を追加

`packages/profiler-log/config/profiler.php` を `app/config/profiler.php` にコピーして編集  
`output` の値を `false` から `true` に変更

## 動作確認

画面の右下にプロファイラが表示されていて、ログにプロファイラの情報が出力されていれば成功。

## まとめ

とりあえず使ってみる。

## 参考

[FuelPHPで３種のprofilerを使ってみた](http://www.slideshare.net/MiuraKatsu/ss-26186401)
