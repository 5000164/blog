+++
title = "AWS Lambda の Python 3.6 で LINE Bot を動かす"
date = 2017-08-14T23:04:38+09:00
+++

## 目的

LINE Bot を使って生活を少し便利にしたい。

## 背景

最近 LINE をよく使ってるから。  
なんかちょっとしたメモとか簡単に確認したいなーと思ったから。  
たまたま AWS Lambda の料金を調べたら思っていたよりも安かったので使ってみたくなったから。

## この記事のスタートとゴール

スタートは、 LINE をすでに使っているが、 API などは使ったことがないところ。  
ゴールは、 LINE のグループチャットで特定の発言をしたら特定の内容を返してくれるところ。

## LINE Bot を使えるように登録する

Messaging API の登録をする。

- [Messaging APIのご紹介 | LINE Business Center](https://business.line.me/ja/services/bot)

Developer Trial を選ぶ。

- [LINE BOTの作り方を世界一わかりやすく解説（１）【アカウント準備編】 - Qiita](http://qiita.com/yoshizaki_kkgk/items/bd4277d3943200beab26)

## LINE Bot を使えるように設定する

LINE@ MANAGER から以下の感じに Bot を設定する。

- API を利用する
- Webhook を利用する
- グループトーク参加を利用する
- 自動応答メッセージを利用しない
- 友だち追加時あいさつを利用しない
- 基本設定アカウントページメニュー非表示

## LINE Bot と友だちになってグループトークを作成

QR コードから友だち追加する。

- [LINE Messaging APIを使用したLINE Botの作り方 - george’s ぶろぐ](http://whippet-818.hatenablog.com/entry/2017/02/07/004558)

友だちになったらグループトークを作成して追加する。

## AWS Lambda と Amazon API Gateway を作成する

記事を参考にしながら AWS Lambda と Amazon API Gateway を作成する。

- [Line botをAWS LambdaとAPI Gatewayでアモーレ！！- 実装編 - Qiita](http://qiita.com/kooohei/items/650c331f95f83072f4d6)  
- [API Gatewayを使ってアクセスキー認証でLambdaを実行する - Qiita](http://qiita.com/toshihirock/items/8720118164a02dfdd11a)  

## URL に直接アクセスして Hello from Lambda を表示する

そのままではうまく動かなかった。  
いろいろ見ていたら「LAMBDA_PROXY」のところが違うということに気付いた。

- ["API Gateway"のバックエンドを"Lambda"にしてJSONデータをエコーさせる | cloudpack.media](https://cloudpack.media/15956)

調べたら新たに追加された機能らしい。  
似たような現象を見つけて、レスポンスの返し方が違うと気付く。

- [AWS API Gateway Lambda proxy integration を使う - うさぎ駆動開発](http://aile.hatenablog.com/entry/2016/09/23/220522)

公式のサンプルが見つけられなかったけど、この記事のように `statusCode` と `body` を入れたら動いた。

- [Python Lambda Proxy for API Gateway](http://webscale.plumbing/python-lambda-api-gateway-proxy)

この段階でのコードは下記。  
これでブラウザでアクセスすることで `Hello from Lambda` と表示される。

```python
def lambda_handler(event, context):
    return {'statusCode': 200, 'body': 'Hello from Lambda'}
```

「Lambda プロキシ統合の使用」のオプションを外したら最初のままのコードでも動いたが、このオプションを付けた方が楽な部分があるらしい？ので付けたままにしておく。

## LINE からのリクエストを受け取れるようにする

LINE developers の Webhook URL にさきほど作成した Amazon API Gateway の URL を登録する。  
この時に `amazonaws.com:443` のように HTTPS のポート番号を付けないとうまくいかない、らしい。  
Webhook URL を設定したら Bot のいるグループチャットで発言をして CloudWatch にログが出ることを確認する。

## LINE に発言する

Python なので Requests とか使えたら楽だけど、サードパーティーのライブラリは zip でアップロードしたりという操作が必要なようだったので、今回は標準の機能だけでやる。

環境変数に LINE developers の Channel Secret と Channel Access Token をセットする。  
KMS というやつを使った方がセキュアらしいんですがちょっとよくわかりませんでしたすいません。

- [AWS Lambda環境変数対応をお触り - Qiita](http://qiita.com/TakashiKOYANAGAWA/items/30352b288b23c8c8daae)

ここで `event` の中身を取ろうとしたら、なんかうまく取れない。  
記事によって書いてあることもまちまちでよくわからない。

- [LINE Messaging API と AWS Lambda で LINE BOT を作ってみた](http://www.kazuweb.asia/aws/lambda/chatbot)  
- [LINE Bot APIの使ってLINEからメッセージを送ることで自宅のエアコンの電源を入れられるようにするシステム(AWS利用)を試作してみる : 工作と競馬](http://blog.livedoor.jp/sce_info3-craft/archives/9508633.html)  
- [LINE Messaging APIを試してみた | レコチョクのエンジニアブログ](https://techblog.recochoku.jp/1835)

なのでまずはログを残すことにした。  
とても簡単にログが残せて CloudWatch が使えてすごい便利ー、ってなりました。  
こういう恩恵が受けられるのがサーバーレスアーキテクチャーなのかなーとかちょっと思ったよくわかってないけど。

- [ログ記録 (Python) - AWS Lambda](http://docs.aws.amazon.com/ja_jp/lambda/latest/dg/python-logging.html)

ログを残して見てみた結果、 `event` は dict で `event` が持ってる `body` の中身が JSON の文字列だということがわかりました。  
なので、他のサイトでやっているように events をループで回したいってなったら以下の方法でいけることがわかった。  

```python
for event in json.loads(event['body'])['events']:
    # なにか処理
```

ここまで来たらあとは LINE に POST を送れば発言できる。

- [Python3のスクリプトでjsonをPOSTする - Qiita](http://qiita.com/neko_the_shadow/items/324976c7b54623e82b26)

現時点でのコードは下記のような感じ。  
発言を受け取ったらただ `test` と発言するだけ。

```python
import logging

import os
import urllib.request, urllib.parse
import json

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(request, context):
    
    logger.info(request)
    
    for event in json.loads(request['body'])['events']:
        logger.info(json.dumps(event))
        
        url = 'https://api.line.me/v2/bot/message/reply'
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + os.environ['LINE_CHANNEL_ACCESS_TOKEN']
        }
        body = {
            'replyToken': event['replyToken'],
            'messages': [
                {
                    "type": "text",
                    "text": "test",
                }
            ]
        }
        
        req = urllib.request.Request(url, data=json.dumps(body).encode('utf-8'), method='POST', headers=headers)
        with urllib.request.urlopen(req) as res:
            logger.info(res.read().decode("utf-8"))
    
    return {'statusCode': 200, 'body': '{}'}

```

`def lambda_handler(request, context):` の部分は `event` っていう変数名が使いたかったので第一引数の変数名を `request` に変更。  
これの `"text": "test",` の部分を `"text": event['message']['text'],` と変えるとオウム返しを行うことができる。  
`logger.info(json.dumps(event))` みたいな感じで JSON 文字列としてログに残しておくと CloudWatch が勝手にログを整形して表示してくれるので便利。

## 特定の内容の時だけ反応するようにする

ここまできたらあとは作れば動くという感じなので簡単。  
`event['message']['text']` が発言内容を持っているのでループの最初で下記のように特定の発言以外を弾くようにしてあげればいい。

```python
if event['message']['text'] != 'memo':
    continue
```

## 特定の発言者にだけ反応するようにする

こちらも同じような感じ。  
発言者のユーザー ID が `event['source']['userId']` で取れるので、特定のユーザー ID 以外を弾くようにする。

```python
if event['source']['userId'] != 'userId':
    continue
```

## リクエストの検証を行う

サーバーの公開されている API に送られたリクエストのうち、 LINE からきたリクエストだけを信用するようにする。  
この検証を行わないと LINE 以外からのリクエストにも反応してしまう。  
個人の認証が LINE からのリクエストの検証と、ユーザー ID の特定だけで、信頼できるものなのかどうかはわからないので別途調査が必要。  
リクエストの検証自体はサンプルを元に簡単に実装することができた。  
Amazon API Gateway のテスト機能が便利だった。

- [LINE API Reference](https://devdocs.line.me/ja/)  
- [1時間でLINE BOTを作ってみた – Ultica Blog – ウルチカ ブログ –](https://blog.ultica.jp/archives/6)

## あらかじめ用意しておいたメモを特定の発言で返してくれる Bot の完成

いろいろ調整して最終的にできあがったコードがこちら。

```python
import logging

import os
import urllib.request, urllib.parse
import json

import base64
import hashlib
import hmac

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(request, context):

    # リクエストの検証を行う
    channel_secret = os.environ['LINE_CHANNEL_SECRET']
    body = request.get('body', '')
    hash = hmac.new(channel_secret.encode('utf-8'), body.encode('utf-8'), hashlib.sha256).digest()
    signature = base64.b64encode(hash).decode('utf-8')

    # LINE 以外からのアクセスだった場合は処理を終了させる
    if signature != request.get('headers').get('X-Line-Signature', ''):
        logger.info(f'LINE 以外からのアクセス request={request}')
        return {'statusCode': 200, 'body': '{}'}

    for event in json.loads(body).get('events', []):

        # 発言者を絞り込む
        if event['source']['userId'] != 'userId':
            continue

        # 反応する発言内容を絞り込む
        if event['message']['text'] != 'memo':
            continue

        logger.info(json.dumps(request))
        logger.info(json.dumps(event))

        # LINE に発言する
        url = 'https://api.line.me/v2/bot/message/reply'
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + os.environ['LINE_CHANNEL_ACCESS_TOKEN'],
        }
        body = {
            'replyToken': event['replyToken'],
            'messages': [
                {
                    'type': 'text',
                    'text': 'memo\n\n返してもらいたいメモの内容をここに書く',
                }
            ]
        }
        req = urllib.request.Request(url, data=json.dumps(body).encode('utf-8'), method='POST', headers=headers)
        with urllib.request.urlopen(req) as res:
            res_body = res.read().decode('utf-8')
            if res_body != '{}':
                logger.info(res_body)

    return {'statusCode': 200, 'body': '{}'}
```

## 感想

最近 Python を触っているのでなにも考えずに Python を選択したが、思ったよりも情報が少なくて大変だった。  
bot 作るのって楽しい。  
AWS Lambda を触ってみれてよかった。  
もうちょい機能とか足して個人用に便利にしていきたい。  
こんな感じでコード書いてったらひどいことになりそうだから、 AWS Lambda でうまいこと整理する方法を知りたい。
