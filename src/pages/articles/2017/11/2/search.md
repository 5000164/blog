---
title: "Google 検索で日本語で検索するブックマークレット"
date: "2017-11-02 13:05:43 +0900"
---

## 2018.4.18 追記

元から下記の方法を使ったやり方が便利だった。

- [いもすさんのツイート: "Google Chromeの検索エンジン設定で、e を ?q=%s&lr=lang_en&hl=ja に、j を ?q=%s&lr=lang_ja&hl=ja に、デフォルトを ?q=%s&lr=lang_ja|lang_en&hl=ja にすると能動的に検索する言語が選べて便利（定期）… https://t.co/8p9hdK3V9f"](https://twitter.com/imos/status/965743608044208129)

## コード

```javascript
javascript:(function(){location=(location.href+'&hl=ja')}());
```

## 背景

Google 検索の設定を英語にしているが、まだ読めないことがたくさんあるので日本語で検索したくなる。  
URL に `hl=ja` というパラメーターをつけることで言語設定を日本語にして検索することができるのでそれを簡略するためにブックマークレットを使う。
