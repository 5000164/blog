---
title: "Ruby on Rails でマイグレーションした時のログ"
published: "2021-01-12 15:05:28 +0900"
updated: "2021-01-12 15:05:28 +0900"
featuredImage: "../../../../images/2021/1/12/ruby-on-rails-migrations-featured.jpg"
---

# マイグレーションファイルを作成する

コマンドで列を指定するのも大変そうだったのでとりあえずファイルだけ作成。

```
docker-compose exec web rails generate model User
```

# id のカラム名を自分で指定したい

そのまま何もしなければ id という名前で id のカラムが出来上がるようだった。自分で名前を付けたかったので調べたら `primary_key: 'user_id'` というようなオプションを渡せばいいようだった[^1]。id なしにしたい場合は `id: false` のオプションを指定する。

[^1]: [ActiveRecord::ConnectionAdapters::SchemaStatements](https://api.rubyonrails.org/v6.1.0/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-create_table)

# 外部キーを設定したい

`create_table` で `references` を使えば指定できそうと思ったけど、`PRIMARY_KEY` が id という名前の時しか使えない感じがする。`add_foreign_key` を追加することで指定できたのでこちらを使う[^2]。

[^2]: [ActiveRecord::ConnectionAdapters::SchemaStatements](https://api.rubyonrails.org/v6.1.0/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-add_foreign_key)

# インデックスを貼りたい

`create_table` の時に `index: true` とすればインデックスを貼ることができた。

# マイグレーションをやり直したい

```
docker-compose exec web rails db:migrate VERSION=0 
```

でマイグレーションを全部戻した後に

```
docker-compose exec web rails db:migrate
```

すればやり直せる[^3]。

```
docker-compose exec web rails db:reset 
```

だと `db/schema.rb` の内容を使って作り直すだけで、マイグレーションをやり直しているわけではない[^4][^5]。

[^3]: [ruby - Roll back all rails migrations or drop tables and modify migrations (start from scratch) - Stack Overflow](https://stackoverflow.com/questions/8198350/roll-back-all-rails-migrations-or-drop-tables-and-modify-migrations-start-from/8198366#8198366)
[^4]: 初めは `db:reset` でやり直せていると思ってしまったので、設定を変えてもうまく反映されないと勘違いしてしまっていた。
[^5]: [Active Record Migrations — Ruby on Rails Guides](https://edgeguides.rubyonrails.org/active_record_migrations.html#resetting-the-database)

# カラムを NOT NULL にしたい

いろいろ試してみたが、カラムに `null: false` を指定することで NOT NULL にすることができた[^6][^7]。変更を確認するクエリは下記のような感じ[^8][^9][^10]。

```sql
SELECT *
FROM information_schema.columns
WHERE table_name = :table;

SELECT *
FROM information_schema.table_constraints
WHERE table_name = :table;

SELECT tablename, indexname
FROM pg_indexes
WHERE tablename = :table;
```

[^6]: [Rails db migration not recognising Null and Not Null for varchar · Issue #27017 · rails/rails](https://github.com/rails/rails/issues/27017)
[^7]: [rails generate migrationコマンドまとめ - Qiita](https://qiita.com/zaru/items/cde2c46b6126867a1a64)
[^8]: [ActiveRecord::ConnectionAdapters::SchemaStatements](https://edgeapi.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-change_column_null)
[^9]: `change_column_null` で直接指定してもうまくいかなかったので、おかしいと思って `information_schema` で確認したら反映されていたので、IDE がうまく変更を検知できていなかっただけだったようだった。
[^10]: IntelliJ IDEA 系の IDE でクエリ実行時にパラメーターを設定できることを初めて知った。便利。

# ユニーク制約をかけたい

カラムに `unique: true` を付けたらいけるかなと思ったけどだめだったっぽい。`add_index :candidates, :user_id, unique: true` のようにすることでいけた[^11]。複数カラムでユニークにする場合は `add_index :user_groups, [:user_id, :group_id], unique: true` のようにすることでいけた。

[^11]: [ActiveRecord::ConnectionAdapters::SchemaStatements](https://api.rubyonrails.org/v6.1.0/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-add_index)
