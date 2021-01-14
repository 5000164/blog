---
title: "Ruby on Rails の Strong Parameters の使い方を調べた"
published: "2021-01-14 15:04:00 +0900"
updated: "2021-01-14 15:04:00 +0900"
featuredImage: "../../../../images/2021/1/14/ruby-on-rails-strong-parameters-featured.jpg"
---

Ruby on Rails の Strong Parameters の使い方がよくわからなかったので調べた。現時点での理解としては下記のように使うのがよさそう。

```ruby
  def create
    statements_params = params.permit(:group_id, :user_id, :content).tap { |p| p.require([:group_id, :user_id, :content]) }.to_h
    group_id = statements_params[:group_id].to_i
    user_id = statements_params[:user_id].to_i
    content = statements_params[:content]
    statement = Statement.new(user_id: user_id, group_id: group_id, content: content)
    statement.save
    head 201
  end
```

やりたいことは

- 必須項目をチェックしたい
- 特定の要素のみを取得したい

になる。チュートリアルだと `require` してから `permit` していて、使い分けがよくわからなかった。ドキュメントを探してどうやら `require` が必須チェックをするもの、`permit` が特定の要素を取得するものだとわかった[^1][^2][^3]。

[^1]: [ActionController::StrongParameters](https://api.rubyonrails.org/classes/ActionController/StrongParameters.html)
[^2]: [ActionController::Parameters](https://api.rubyonrails.org/classes/ActionController/Parameters.html#method-i-require)
[^3]: [ActionController::Parameters](https://api.rubyonrails.org/classes/ActionController/Parameters.html#method-i-permit)

必須項目に対して必須チェックをしたかったので `require` でいけると思ったが、`require` すると階層をもぐってしまうのでそのままでは使えなかった。サンプルコードを見ていたら `permit` した後に副作用を与えないように `tap` してから `require` しているものがあり、これでよさそうと思った。

`permit` は新しい `ActionController::Parameters` を返すが、そのままでは使いづらかったので `to_h` で Hash にしてから個別の変数に代入しつつ、型の変換が必要な時はこの時に変換してあげるのがよさそう。
