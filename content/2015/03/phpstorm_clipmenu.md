+++
title = "PhpStorm で ClipMenu が動作しない問題を修正する"
date = 2015-03-22T17:10:34+09:00
url = "2015-03-phpstorm_clipmenu"
+++

## ClipMenu が PhpStorm でうまく動かない

つらい。

## ClipMenu が PhpStorm でうごくようにする

1. PhpStorm で command + shift + A か Help > Find Actoin... で検索窓の表示
2. Registry と検索し return か ダブルクリックで Registry の表示
3. ide.mac.useNativeClipboard にチェックを入れる
    - use くらいまで打つと検索結果に出てくる

## 結果

良好。

## 参考

* [PHPStormとTextExpanderとの相性が悪いので対処方法を探してみました | matomerge.com](http://matomerge.com/phpstorm-is-incompatible-with-textexpander/)
