+++
title = "WordPressのテーマ「TwentyEleven」で作成者とパーマリンクを非表示にする"
date = 2012-06-26T01:47:45+00:00
url = "2012-06-wordpress_twentyeleven_display_none"
+++

テーマのフォルダにある

```
content-single.php
```

を編集します。

34～40行目の

```php
if ( '' != $tag_list ) {
$utility_text = __( 'This entry was posted in %1$s and tagged %2$s by &lt;a href=&quot;%6$s&quot;&gt;%5$s&lt;/a&gt;. Bookmark the &lt;a href=&quot;%3$s&quot; title=&quot;Permalink to %4$s&quot; rel=&quot;bookmark&quot;&gt;permalink&lt;/a&gt;.', 'twentyeleven' );
} elseif ( '' != $categories_list ) {
$utility_text = __( 'This entry was posted in %1$s by &lt;a href=&quot;%6$s&quot;&gt;%5$s&lt;/a&gt;. Bookmark the &lt;a href=&quot;%3$s&quot; title=&quot;Permalink to %4$s&quot; rel=&quot;bookmark&quot;&gt;permalink&lt;/a&gt;.', 'twentyeleven' );
} else {
$utility_text = __( 'This entry was posted by &lt;a href=&quot;%6$s&quot;&gt;%5$s&lt;/a&gt;. Bookmark the &lt;a href=&quot;%3$s&quot; title=&quot;Permalink to %4$s&quot; rel=&quot;bookmark&quot;&gt;permalink&lt;/a&gt;.', 'twentyeleven' );
}
```

の部分を

```php
if ( '' != $tag_list ) {
$utility_text = __( 'category %1$s and tag %2$s', 'twentyeleven' );
} elseif ( '' != $categories_list ) {
$utility_text = __( 'category %1$s', 'twentyeleven' );
} else {
$utility_text = __( '', 'twentyeleven' );
}
```

と変更します。

おそらく、単一記事表示時にカテゴリやタグを表示する部分での処理だと思われます。

全体表示時の対処はまだ不明。

作成者とパーマリンクは表示されないので保留にします。

参考サイト

    WordPressのTwentyElevenで作成者を非表示にする方法 | 沖縄なんくるウェブブログ

