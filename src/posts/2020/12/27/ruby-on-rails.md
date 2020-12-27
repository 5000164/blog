---
title: "Ruby on Rails のチュートリアルをやった時のログ"
published: "2020-12-27 16:48:53 +0900"
updated: "2020-12-27 16:48:53 +0900"
featuredImage: "../../../../images/2020/12/27/ruby-on-rails-featured.jpg"
---

Ruby on Rails を勉強しようと思ってチュートリアルをやったのでその時のログ。

# まずはインストールから

Docker で環境を作ろうと思ったので、[Quickstart: Compose and Rails | Docker Documentation](https://docs.docker.com/compose/rails/) を参考に少し変更しながら進めた。

- Dockerfile の Ruby が 2.5 だったので 2.7 に変えた
- Gemfile の Rails が 5 だったので 6 に変えた
- ホストからコンテナの DB にアクセスするために 5432 ポートを開放
- 起動時になんかエラーが出たので調べたら、Webpacker というやつが Rails の 6 から使われるようになったようで、フロントエンドのコードを書く予定はない[^1]のでフロントエンド系のものをコメントアウトする[^2]
  - sass-rails
  - webpacker
  - turbolinks

[^1]: API サーバーだけを作る予定
[^2]: [How to disable/remove webpacker from a project? · Issue #1333 · rails/webpacker](https://github.com/rails/webpacker/issues/1333) を参考に削除したが、後から API サーバーとしてセットアップする方法がわかったので後述

# Ruby on Rails のチュートリアルをやる

チュートリアル [Getting Started with Rails — Ruby on Rails Guides](https://guides.rubyonrails.org/getting_started.html) をやる。

## Welcome 生成

```
docker-compose run web rails generate controller Welcome index
```

## ライブラリが足りなくて動かない

ライブラリが足りないっぽくて表示ができなかった。調べたら API サーバーとして使う方法のガイド [Using Rails for API-only Applications — Ruby on Rails Guides](https://guides.rubyonrails.org/api_app.html) があったのでそれを読む。

API サーバーとして使う場合は rails new する時に --api オプションを付けることで API 用にできるっぽかった[^3]。

```
docker-compose run --no-deps web rails new . --api --force --database=postgresql
```

Welcome コントローラーも下記のようにすることで不要なファイルが生成されなくなった。

```
docker-compose run web rails generate controller Welcome index --no-assets
```

[^3]: インストール時に除外したライブラリも含まれなくなっていた

## API のレスポンスを返す

まずは適当なレスポンスを返すようにする。

```
class WelcomeController < ApplicationController
  def index
    render json: {hello: 'rails'}
  end
end
```

とやることでレスポンスを返すようにできた。でも変更が自動反映されていないっぽかった。自動反映されていないことに気づかなくて時間がかかってしまった。

## 自動更新されるようにする

調べたら [Code is not reloaded in dev with Docker on OS X · Issue #25186 · rails/rails](https://github.com/rails/rails/issues/25186#issuecomment-530275858) のせいだった。 この設定を変えることで変更が自動反映されるようになった。

## Articles 生成

```
docker-compose run web rails generate controller Articles --no-assets
```

## new がなくて動かない

チュートリアル通りに進めていたら動かなかった。どうやら api_only にしたら new と edit は routes に生成されないらしかった[^4]ので飛ばして進める。

[^4]: [ruby - New and Edit Routes missing in Rails Resources routes - Stack Overflow](https://stackoverflow.com/questions/60531303/new-and-edit-routes-missing-in-rails-resources-routes)

## モデルを作る

```
docker-compose run web rails generate model Article title:string text:text
docker-compose run web rails db:migrate
```

## 関連したモデル

```
docker-compose run web rails generate model Comment commenter:string body:text article:references
docker-compose run web rails db:migrate
```

## Comments のコントローラー

```
docker-compose run web rails generate controller Comments --no-assets
```

`GET http://localhost:3000/articles/1/comments` でコメントの一覧を返せるようにしようと思ったら `ArgumentError: Unknown validator: 'InValidator'` というエラーが出てうまく実行できなかった。調べたら Comment モデルの validates の定義方法が間違っているようだった。`validates :status, in: VALID_STATUSES` を `validates :status, inclusion: { in: VALID_STATUSES }` にしたら動いた。

現行のドキュメントの [https://guides.rubyonrails.org/getting_started.html#using-concerns](https://guides.rubyonrails.org/getting_started.html#using-concerns) だと間違ったままだったが、edge バージョンのドキュメント [https://edgeguides.rubyonrails.org/getting_started.html#using-concerns](https://edgeguides.rubyonrails.org/getting_started.html#using-concerns) では修正済みだった。

# デバッグ実行

チュートリアルが終わったので IDE でデバッグ実行をできるようにする。いろいろ試したら動いた時のログが下記。

- とりあえず remote interpreter を追加
- `rails server launcher was not found in project` というエラーが出てうまくいかない
- 調べてもパッとした解決方法が見つからなくて、見かけた方法である .idea ディレクトリを消して IDE に再構築をしてもらうという方法を試した
- `No Rails found in SDK` というエラーが出た
- .idea を消したので remote interpreter が消えてたので再追加
- load spring というメッセージが出てきたから load した
- アプリケーションの実行はできるようになったが、デバッグ実行は ruby-debug-ide がないと言われてできなかった
- `docker-compose run web gem install ruby-debug-ide` したけどうまく動かず、Gemfile 使ってる時はそっちに書くらしい
- Gemfile に `gem 'ruby-debug-ide'` を追加
- IDE に bundler でインストールするか聞かれたので bundler を含めてインストール
- なんかうまくいかなかった
- なんかのタイミングで docker の build が走ったので、そっちがうまくいってないのかもと思って手動で build
- IDE の設定画面から gem の同期をやったら ruby-debug-ide が増えてた
- デバッグ実行をしたら `LoadError: cannot load such file -- debase` というエラーが出た
- [ruby-debug/ruby-debug-ide: An interface which glues ruby-debug to IDEs like Eclipse (RDT), NetBeans and RubyMine.](https://github.com/ruby-debug/ruby-debug-ide) に `Ruby 2.x - ruby-debug-ide and debase` って書いてあるから `debase` も追加した
- 追加してみたけど何も変わってないかも知れない
- そもそも IDE の調子が悪かったので再起動した
- デバッグ実行したら実行できた
- docker-compose を再 build したけどただの再起動でもいけたのかも
