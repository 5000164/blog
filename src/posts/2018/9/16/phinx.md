---
title: "Phinx 使ってみた"
published: "2018-09-18 23:34:58 +0900"
updated: "2018-09-18 23:34:58 +0900"
---

Phinx はこれ。

- [Phinx](https://phinx.org/)

ドキュメントはここ。  
(CakePHP の方にもあるけどこっちの方が見やすい気がする)  
(ページのタイトルがバージョンに関わらず 0.9.2 と古い表記なので最初迷った)

- [Phinx Documentation — Phinx 0.9.2 documentation](http://docs.phinx.org/en/latest/)

# 動機

DB をマイグレーションしようと思った時に、せっかくだから PHP 製のマイグレーションツールを使おうと思って探したら Phinx がよさそうだったから使ってみた。

# ざっくりした使い方

- MySQL に対してマイグレーションを行おうと思ったので pdo_mysql を使えるようにしておく

```
FROM php:7.2.9-cli

RUN docker-php-ext-install pdo_mysql
```

```bash
docker build -t phinx ./docker/phinx
```

- 初期化

```bash
docker run --rm --interactive --tty \
    --volume $PWD:/app \
    -w /app \
    phinx vendor/bin/phinx init
```

- マイグレーションファイル作成

```bash
docker run --rm --interactive --tty \
    --volume $PWD:/app \
    -w /app \
    phinx vendor/bin/phinx create CreateUserTable
```

- マイグレーション実行

```bash
docker run --rm --interactive --tty \
    --volume $PWD:/app \
    --net myapp_default \
    -w /app \
    phinx vendor/bin/phinx migrate -e development
```

# 所感

PHP プロジェクトの場合に PHP で統一できるのはいい。  
Docker でさっと使えて便利だった。  
マイグレーションファイルの書き方は独自記法があるようだったが、SQL をそのまま書いて使った。  
軽くしか使ってないけどなんとなくよさそうかも。

# 参考

- [5000164/php7-practice-1](https://github.com/5000164/php7-practice-1)
    - 練習用に使ってみたリポジトリ
