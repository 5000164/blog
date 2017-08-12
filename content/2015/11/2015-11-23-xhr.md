+++
title = "XHR のプリフライトリクエストを Access-Control-Allow-Origin で許可する"
date = 2015-11-23T19:03:22+09:00
url = "2015-11-xhr"
+++

Firefox で API からデータが取得できない
===
サーバー側に API を実装して、Chrome では値が取得できてるのに、Firefox では値が取得できていなかった。  
ちゃんと `Access-Control-Allow-Origin: *` って感じにしてたのに、許可されていませんって感じのエラーメッセージが出ていた。  
開発ツールのネットワークの履歴を見てたら、メソッドのところが `OPTIONS` って出てたので、OPTIONS メソッドの時にも `Access-Control-Allow-Origin: *` を返してあげるようにした。  
FuelPHP のコントローラーにどうやって書くのだろと思って試しに書いてみたら動いた。

```php
/**
 * プリフライトリクエスト用のコントローラー
 */
public function options_index()
{
    $this->response->set_header('Access-Control-Allow-Origin', '*');
}
```

こんな感じ。  
どうやら、XHR ではプリフライトリクエストってやつを送るらしくて、その時にアクセスが許可されていないから API からデータを持ってきていなかったらしい。(現時点の Chrome では送ってなかった)  
なるほどな。
