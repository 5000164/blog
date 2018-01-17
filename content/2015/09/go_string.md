+++
title = "Go 言語で文字列としてダブルコーテーションや改行を入れる"
date = 2015-09-12T22:12:08+09:00
url = "2015-09-go_string"
+++

## golang でダブルコーテーションや改行を string 型の変数に入れる

go では " (ダブルコーテーション) で文字列を表します。  
文字列の中にダブルコーテーションを入れるには \ (バックスラッシュ) でエスケープすればよかった。

```go
test := "test\"test"
```

改行を入れるには \n で入れられる。

```go
newline := "a\nb\nc"
```

また、` (バッククオート) を使用することでヒアドキュメントのように書けた。

```go
here := `like
a
here document`
```

## 参考

- [Go 言語で複数行にまたがる文字列を作る - nise_nabeの日記](http://nisenabe.hatenablog.com/entry/2013/06/09/155207)
- [The Go Programming Language Specification - The Go Programming Language](http://golang.org/ref/spec#String_literals)
