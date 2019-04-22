---
title: "Hugo でシンタックスハイライトを使う"
date: "2017-08-14T22:44:23+09:00"
---

## 2018.1.20 追記

バージョン 0.28 から導入された Chroma で何も考えず簡単にシンタックスハイライトが使えるようになった。

- [Hugo | Hugo 0.28: High-speed Syntax Highlighting!](https://gohugo.io/news/0.28-relnotes/)
- [Hugo | Syntax Highlighting](https://gohugo.io/content-management/syntax-highlighting/)

## 結論

- シンタックスハイライト用の css をテーマで読み込んでおく
- `config.toml` に下記の設定を追加

```
pygmentscodefences = true
pygmentsCodeFencesGuessSyntax = true
pygmentsStyle = "monokai"
pygmentsUseClasses = true
pygmentsoptions = "linenos=inline"
```

## 背景

コードを見やすくしたいからシンタックスハイライトを使おうと思った。  
やってみたら思ったよりもできなかった。  
なんか疲れたのでメモ。

## 手順

## Pygments をインストールする

シンタックスハイライトするのに必要なやつ。  
何も考えずに入れる。

```bash
sudo easy_install Pygments
```

## シンタックスハイライト用の css を生成する

カラーコードを直接埋め込む方法もあるけど、クラスで指定した方がかっこいいと思ったのでクラスで指定する。  
クラスで指定する場合は css を事前に生成しておいて読むこんでおく必要がある。  
下記のコマンドで css を生成する。  
デフォルトで用意されていないカラースキーマの使い方がわからなかったので今回は monokai を使う。

```bash
pygmentize -f html -S monokai -a .highlight > monokai.css
```

## 生成した css をテーマで読み込む

テーマの static ディレクトリに css を置いて header で読み込む。

## シンタックスハイライトを使うように設定する

`config.toml` に下記の設定を追加。  
`pygmentscodefences` の設定が公式ドキュメントに見つからなくて罠だった。  
これを `true` にしないとバッククオート 3 つでシンタックスハイライトを有効にする機能が動かない。  
`pygmentsoptions` は Pygments のオプションを指定するところで、ここで見た目を変えたりできる。

```
pygmentscodefences = true
pygmentsCodeFencesGuessSyntax = true
pygmentsStyle = "monokai"
pygmentsUseClasses = true
pygmentsoptions = "linenos=inline"
```

## 感想

スッとできると思ったら意外とひっかかって疲れた。  
でも終わってみれば簡単っぽい。

## 参考

- [Hugo | Syntax Highlighting](https://gohugo.io/tools/syntax-highlighting/)
- [How to install Pygments (syntax highlighter) using Homebrew :: Andrew Havens, Ruby Developer](http://www.andrewhavens.com/posts/13/how-to-install-pygments-syntax-highlighter-using-homebrew/)
- [Pygmentsを使ってコードをシンタックスハイライトするようにした | tech.portalshit.net](http://tech.portalshit.net/2010/08/13/jekyll-with-pygments/)
- [PygmentsでSyntax Highlightされたcatとlessを手に入れる ::ハブろぐ](https://havelog.ayumusato.com/develop/others/e523-pretty_cat_and_less_pygments.html)
- [Command Line Interface — Pygments](http://pygments.org/docs/cmdline/)
- [Hugo Themes | Hugo Octopress](https://themes.gohugo.io/hugo-octopress/)
- [[Hugo] Syntax highlight](https://code-house.jp/2016/08/20/hugosyntaxhighlight/)
