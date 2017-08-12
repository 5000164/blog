+++
id: 52
title: WordPressのテーマ「TwentyEleven」で作成者とパーマリンクを非表示にする
date: 2012-06-26T01:47:45+00:00
author: 管理者
layout: post
guid: http://219.94.241.240/?p=52
permalink: /2012-06-wordpress_twentyeleven_display_none/
categories:
  - Development
tags:
  - WordPress
+++
<div>
  <div>
    テーマのフォルダにある
  </div>
  
  <div>
  </div>
  
  <pre class="brush: plain; title: ; notranslate" title="">
content-single.php
</pre>
  
  <div>
  </div>
  
  <div>
    を編集します。
  </div>
  
  <div>
  </div>
  
  <div>
    34～40行目の
  </div>
  
  <div>
  </div>
  
  <pre class="brush: php; title: ; notranslate" title="">
if ( '' != $tag_list ) {
$utility_text = __( 'This entry was posted in %1$s and tagged %2$s by &lt;a href=&quot;%6$s&quot;&gt;%5$s&lt;/a&gt;. Bookmark the &lt;a href=&quot;%3$s&quot; title=&quot;Permalink to %4$s&quot; rel=&quot;bookmark&quot;&gt;permalink&lt;/a&gt;.', 'twentyeleven' );
} elseif ( '' != $categories_list ) {
$utility_text = __( 'This entry was posted in %1$s by &lt;a href=&quot;%6$s&quot;&gt;%5$s&lt;/a&gt;. Bookmark the &lt;a href=&quot;%3$s&quot; title=&quot;Permalink to %4$s&quot; rel=&quot;bookmark&quot;&gt;permalink&lt;/a&gt;.', 'twentyeleven' );
} else {
$utility_text = __( 'This entry was posted by &lt;a href=&quot;%6$s&quot;&gt;%5$s&lt;/a&gt;. Bookmark the &lt;a href=&quot;%3$s&quot; title=&quot;Permalink to %4$s&quot; rel=&quot;bookmark&quot;&gt;permalink&lt;/a&gt;.', 'twentyeleven' );
}
</pre>
  
  <div>
  </div>
  
  <div>
    の部分を
  </div>
  
  <div>
  </div>
  
  <pre class="brush: php; title: ; notranslate" title="">
if ( '' != $tag_list ) {
$utility_text = __( 'category %1$s and tag %2$s', 'twentyeleven' );
} elseif ( '' != $categories_list ) {
$utility_text = __( 'category %1$s', 'twentyeleven' );
} else {
$utility_text = __( '', 'twentyeleven' );
}
</pre>
  
  <div>
  </div>
  
  <div>
    と変更します。
  </div>
  
  <div>
  </div>
  
  <div>
    おそらく、単一記事表示時にカテゴリやタグを表示する部分での処理だと思われます。
  </div>
  
  <div>
    全体表示時の対処はまだ不明。
  </div>
  
  <div>
    作成者とパーマリンクは表示されないので保留にします。
  </div>
  
  <p>
    &nbsp;
  </p>
  
  <div>
    参考サイト
  </div>
  
  <div>
    WordPressのTwentyElevenで作成者を非表示にする方法 | 沖縄なんくるウェブブログ
  </div>
  
  <p>
    &nbsp;
  </p>