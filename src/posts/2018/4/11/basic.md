---
title: "Basic 認証の realm は正しく設定する"
published: "2018-04-11 23:16:34 +0900"
updated: "2018-04-11 23:16:34 +0900"
---

sbt で Basic 認証がかかっている依存を解決するために ~/.sbt/.credentials に認証情報を書いていたけど、 realm がずれていたせいで認証に失敗するということが起きた。  
realm とは領域という意味で、おそらく ~/.sbt/.credentials の host と realm からどの認証情報を使用するのか判断している気がする。  
なので、 realm がずれていると認証に失敗する。

- [HTTP（Hyper Text Transfer Protocol）～後編：インターネット・プロトコル詳説（2） - ＠IT](http://www.atmarkit.co.jp/ait/articles/0103/16/news003.html)
- [Basic認証 - Wikipedia](https://ja.wikipedia.org/wiki/Basic%E8%AA%8D%E8%A8%BC)

正しい realm は curl で確認できる。

```bash
curl -v <対象の URL> 2>&1 | grep realm
```

- [ivy - sbt dependency resolver with basic auth - Stack Overflow](https://stackoverflow.com/questions/11603607/sbt-dependency-resolver-with-basic-auth)
