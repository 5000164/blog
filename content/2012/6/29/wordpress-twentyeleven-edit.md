+++
title = "WordPress のテーマ「TwentyEleven」でいろいろ消したり幅広げたり色変えたりした"
date = 2012-06-29T01:52:41+00:00
aliases = ["/2012-06-wordpress_twentyeleven_edit/"]
+++

デザインをいろいろと変更しました。  
作業の途中で元ファイルがわからなくなりテーマをまるごと再インストールしたりもしました。  
設定情報とかも一緒に消しちゃって記事が見れなくなった時は焦った。  
でもなんとか元に戻りました。  
以下は変更内容です。  
あんまり詳しく調べずに、それっぽいファイルをそれっぽく修正したらそれっぽい動きになっただけなので、参考にする時は注意してください。  
まず、出したくないものを消します。  
メニューバー（ナビゲーションバー）と検索ボックスを消します。  
今のところ使用していないので。

- header.php の114行目以降

```php
<?php
                     // Has the text been hidden?
                     if ( 'blank' == get_header_textcolor() ) :
                ?>
                     <div>
                     <?php get_search_form(); ?>
                     </div>
                <?php
                     else :
                ?>
                     <?php get_search_form(); ?>
                <?php endif; ?>

                <nav id="access" role="navigation">
                     <h3><?php _e( 'Main menu', 'twentyeleven' ); ?></h3>
                     <?php /* Allow screen readers / text browsers to skip the navigation menu and get right to the good stuff. */ ?>
                     <div><a href="#content" title="<?php esc_attr_e( 'Skip to primary content', 'twentyeleven' ); ?>"><?php _e( 'Skip to primary content', 'twentyeleven' ); ?></a></div>
                     <div><a href="#secondary" title="<?php esc_attr_e( 'Skip to secondary content', 'twentyeleven' ); ?>"><?php _e( 'Skip to secondary content', 'twentyeleven' ); ?></a></div>
                     <?php /* Our navigation menu. If one isn't filled out, wp_nav_menu falls back to wp_page_menu. The menu assigned to the primary location is the one used. If one isn't assigned, the menu with the lowest ID is used. */ ?>
                     <?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); ?>
                </nav><!-- #access -->
      </header><!-- #branding -->

      <div id="main">
```

を下記に変更します。

```php
<?php
                     // Has the text been hidden?
                     if ( 'blank' == get_header_textcolor() ) :
                ?>
                     <div>
                     </div>
                <?php
                     else :
                ?>
                <?php endif; ?>

      </header><!-- #branding -->

      <div id="main">
```

これでヘッダがすっきりしました。  
次にフッタの「Proudly powered by WordPress」を消したいのでフッダまるごと消します。

- footer.php の 15 - 29 行

```php
<footer id="colophon" role="contentinfo">

                <?php
                     /* A sidebar in the footer? Yep. You can can customize
                     * your footer with three columns of widgets.
                     */
                     if ( ! is_404() )
                          get_sidebar( 'footer' );
                ?>

                <div id="site-generator">
                     <?php do_action( 'twentyeleven_credits' ); ?>
                     <a href="<?php echo esc_url( __( 'http://wordpress.org/', 'twentyeleven' ) ); ?>" title="<?php esc_attr_e( 'Semantic Personal Publishing Platform', 'twentyeleven' ); ?>" rel="generator"><?php printf( __( 'Proudly powered by %s', 'twentyeleven' ), 'WordPress' ); ?></a>
                </div>
      </footer><!-- #colophon -->
```

を下記に変更します。

```php
<footer id="colophon" role="contentinfo">

                <?php
                     /* A sidebar in the footer? Yep. You can can customize
                     * your footer with three columns of widgets.
                     */
                     if ( ! is_404() )
                          get_sidebar( 'footer' );
                ?>

      </footer><!-- #colophon -->
```

これでフッダが表示されなくなりました。  
次は、トップページ表示時に記事の内容を表示したくないので、タイトルのみ表示されるようにします。

- content.php を下記にします (長いのをごっそり消してるので元ファイルは割愛)

```php
<?php
 /**
 * The default template for displaying content
 *
 * @package WordPress
 * @subpackage Twenty_Eleven
 * @since Twenty Eleven 1.0
 */
 ?>

      <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
           <header>
                <?php if ( is_sticky() ) : ?>
                     <hgroup>
                          <h2><a href="<?php the_permalink(); ?>" title="<?php printf( esc_attr__( 'Permalink to %s', 'twentyeleven' ), the_title_attribute( 'echo=0' ) ); ?>" rel="bookmark"><?php the_title(); ?></a></h2>
                          <h3><?php _e( 'Featured', 'twentyeleven' ); ?></h3>
                     </hgroup>
                <?php else : ?>
                <h1><a href="<?php the_permalink(); ?>" title="<?php printf( esc_attr__( 'Permalink to %s', 'twentyeleven' ), the_title_attribute( 'echo=0' ) ); ?>" rel="bookmark"><?php the_title(); ?></a></h1>
                <?php endif; ?>
           </header><!-- .entry-header -->
      </article><!-- #post-<?php the_ID(); ?> -->
```

21 - 32 行のヘッダの meta 情報を削除し、 34 - 81 行のコンテント情報を削除します。  
あとはデザインを変更します。  
まずはコンテント幅の変更から。

- style.css の 196 行目前後

```css
/* One column */
 .one-column #page {
      max-width: 690px;
}
```

を下記に変更します。

```css
/* One column */
 .one-column #page {
      width: 980px;
}
```

これでコンテント幅が変わったはずです。  
コンテント幅の980pxはAppleのサイトを参考にしています。  
次は背景色と文字色を変更します。  
おそらく暗い背景に設定しているので dark.css というものを読み込んでおり、このファイルを編集します。  
普通は普通に style.css を編集すれば反映される気がします。

- dark.css の 10 行目前後

```css
body {
      background: #1d1d1d;
      color: #bbb;
}
 #page {
      background: #0f0f0f;
}
```

を下記に変更します。

```css
body {
      background: rgb(25, 25, 25);
      color: rgb(250, 250, 250);
}
 #page {
      background: rgb(50, 50, 50);
}
```

これで色情報が反映されると思いきや反映されません。  
インスペクタで調べたところ、 head タグの中に style が直接書かれていたのが原因でした。  
なのでこの直接指定している出力を切ります。

- functions.php の 106 - 111 行の

```php
      // Add support for custom backgrounds.
      add_theme_support( 'custom-background', array(
           // Let WordPress know what our default background color is.
           // This is dependent on our current color scheme.
           'default-color' =&amp;gt; $default_background_color,
      ) );
```

の記述を削除します。  
そして 144 行目の

```php
          add_custom_background();
```

の記述を削除します。  
おそらく 102 行目の

```php
$default_background_color = '1d1d1d';
```

とかの指定を変えてあげれば色が変わるんでしょうけど、スタイルの指定は css で一括で管理したいので削除します。  
以上で設定終了です。  
多少は人様にみせられるような形になってきたかなと思います。  
今後はもっとスタイルをいじっていきたいですね。

参考

- WordPressのテーマ作成（１）：ファイル構成 - 基礎編 | Lovelog+* - WordPressリファレンス
- WordPressのテーマとなるファイル構成 | プログラミングアフィリエイトで集客する方法
- WordPressカスタマイズ－カスタムヘッダーで背景を変更する－ | remember-it
- [E BISUCOM TECH LAB : WordPress 3.3.xにおけるカスタム背景の表示 （WordPressレッスンブックのサンプルで背景画像が表示されない問題に関して）](http://ebisu.com/memo/custom_background/)
- [WordPress3.4のテーマカスタマイザーで自由度の高いテーマを作ろう | webOpixel](http://www.webopixel.net/wordpress/586.html)
