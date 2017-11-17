+++
title = "開いているページのはてなブックマークのコメントページに移動するブックマークレット"
date = 2017-11-17T13:13:43+09:00
url = "2017-11-hatebu"
+++

## コード

```javascript
javascript:(function(){location=('http://b.hatena.ne.jp/entry/'+location.host+location.pathname+location.search)}());
```

## 背景

はてなブックマークの人気エントリーを RSS で購読しているが、なんでこれが人気エントリーになっているんだろう？と思う時がある。  
その時に毎回はてなブックマークを検索して、そこからさらに URL を入力して、とやっていたが、それが手間だったのでブックマークレットで遷移できるようにした。
