+++
title = "Jekyll の記事と WordPress の記事を Hugo にインポートする"
date = 2017-08-13T05:17:55+09:00
+++

## 背景

WordPress から Jekyll に移行した時に記事の移行が面倒で放っておいた。  
Hugo に移行することにしたから Jekyll の記事と WordPress の記事を Hugo にインポートすることになった。  
つらい。

## Hugo に合わせた最終的な形式

こんな感じに統一することを目指す。  
記事のファイルの見通しをよくするためにディレクトリを分けて管理したかったので URL は各ファイルで指定する。

```md
+++
title = "Jekyll の記事と WordPress の記事を Hugo にインポートする"
date = 2017-08-13T04:26:50+09:00
aliases = ["/2017-08-import/"]
+++

## 記事内容

つらつら
```

## 手順

実際に行ったインポート作業の内容はこちら。  
[Feature import article by 5000164 · Pull Request #2 · 5000164/blog](https://github.com/5000164/blog/pull/2)

## WordPress の記事を Markdown 形式に変換する

最初は Jekyll に移行しようと思ってたのでこれを使いました。  
[benbalter/wordpress-to-jekyll-exporter: One-click WordPress plugin that converts all posts, pages, taxonomies, metadata, and settings to Markdown and YAML which can be dropped into Jekyll](https://github.com/benbalter/wordpress-to-jekyll-exporter)

## ファイル名を調整する

なんか日付がたくさんついてたので年と月でディレクトリを分けてからファイル名をきれいにした。

```bash
brew install rename
find . -name "*.md" | xargs rename 's/\d\d\d\d-\d\d-\d\d-\d\d\d\d-\d\d-//'
```

## Jekyll の記事の URL はファイル名に依存してたのでファイルの中に書き込む

ファイル名をファイルの中に書き込んでからあとで url に設定をするようにする。  
ついでにファイル名も調整する。

```bash
for i in $(find . -name "*.markdown"); do echo ${i} > ${i}.new; cat ${i} >> ${i}.new; done
find . -name "*.markdown.new" | xargs rename 's/.markdown.new/.md/'
find . -name "*.markdown" | xargs rm -f
find . -name "*.md" | xargs rename 's/\d\d\d\d-\d\d-\d\d-//'
```

## ひたすら正規表現で置換する

あとはもう望む形になるようにひたすら正規表現で置換する。  
`title` と `date` は最初から入っているものをうまく使う。  
Jekyll の `date` の形式が違くてエラーになっていたので書式に気をつける。  
WordPress からエクスポートした記事には `permalink` が入っていたのでそれをうまく利用して `url` にする。  
Jekyll のファイルには先ほどファイルの中に埋め込んだファイル名をうまく使って `url` にする。  
画像のリンクとかもひたすら変換する。

## あとはなんかおかしいのを見つけたら手で直す

WordPress からエクスポートしたものが変なふうになってたり、なぜか `date` が 2 個設定されている記事があったり、おかしいものがあったら見つけ次第手で直す。

## 見た目おかしかったり壊れてるところがあったりするけどひとまず完了

なんとなく見られるようになればよい、という感じでやりました。
