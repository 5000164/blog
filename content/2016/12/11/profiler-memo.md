+++
title = "調べた PHP のプロファイラーのメモ"
date = 2016-12-11T01:52:56+09:00
aliases = ["/2016-12-profiler_memo/"]
+++

## プロファイラーを調べた

PHP のパフォーマンスを向上させたくてプロファイリングすればなにかわかるのでは？と思ったので、プロファイリングしてくれるツールを調べた。
New Relic は無料のプランがなくなっていた？ので除外。

## 結論

テスト流す時に Xdebug でプロファイリングして、開発環境で XHProf でプロファイリングすればいいのかなと思った。  
XHProf は fork したプロセスのプロファイリングもできるみたいなことを見かけたため。  
実現性についてはこれから調べる。

## 調べたプロファイラーのメモ

- [Xdebug - Debugger and Profiler Tool for PHP](https://xdebug.org/)
- [phacility/xhprof: XHProf is a function-level hierarchical profiler for PHP and has a simple HTML based user interface.](https://github.com/phacility/xhprof)
- [PHP profiling tools - Z-Ray, Blackfire, Tideways, XHProf, XHGui - Blog by Sandro Keil](https://sandro-keil.de/blog/2015/02/10/php-profiling-tools/)
- [PHPプロファイラーのblackfireを使う - Qiita](http://qiita.com/bezeklik/items/926f73cccc5ddd452a06)
- [fork - php xdebug: How to profile forked process - Stack Overflow](http://stackoverflow.com/questions/16787462/php-xdebug-how-to-profile-forked-process)
- [PhpStorm 2016.3 Help :: Analyzing Xdebug Profiling Data](https://www.jetbrains.com/help/phpstorm/2016.3/analyzing-xdebug-profiling-data.html)
- [PhpStorm 2016.3 Help :: Enabling Profiling with Xdebug](https://www.jetbrains.com/help/phpstorm/2016.3/enabling-profiling-with-xdebug.html)
- [PhpStorm で PHPスクリプトの実行を解析する(Xdebugのプロファイラの結果を表示する) | バシャログ。](http://bashalog.c-brains.jp/12/11/08-095736.php)
- [PHPのプロファイラであるZ-RayのPreview版を試しました - uzullaがブログ](http://uzulla.hateblo.jp/entry/2015/10/28/124732)
