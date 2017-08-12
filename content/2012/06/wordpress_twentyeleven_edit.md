+++
title = "WordPressのテーマ「TwentyEleven」でいろいろ消したり幅広げたり色変えたりした"
date = 2012-06-29T01:52:41+00:00
url = "2012-06-wordpress_twentyeleven_edit"
+++
<div>
  デザインをいろいろと変更しました。
</div>

<div>
  作業の途中で元ファイルがわからなくなりテーマをまるごと再インストールしたりもしました。
</div>

<div>
  設定情報とかも一緒に消しちゃって記事が見れなくなった時は焦った。
</div>

<div>
  でもなんとか元に戻りました。
</div>

<div>
  以下は変更内容です。
</div>

<div>
  あんまり詳しく調べずに、それっぽいファイルをそれっぽく修正したらそれっぽい動きになっただけなので、参考にする時は注意してください。
</div>

<div>
  まず、出したくないものを消します。
</div>

<div>
  メニューバー（ナビゲーションバー）と検索ボックスを消します。
</div>

<div>
  今のところ使用していないので。
</div>

<div>
  header.phpの114行目以降
</div>

<pre class="brush: php; title: ; notranslate" title="">&amp;lt;?php
                     // Has the text been hidden?
                     if ( 'blank' == get_header_textcolor() ) :
                ?&amp;gt;
                     &amp;lt;div&amp;gt;
                     &amp;lt;?php get_search_form(); ?&amp;gt;
                     &amp;lt;/div&amp;gt;
                &amp;lt;?php
                     else :
                ?&amp;gt;
                     &amp;lt;?php get_search_form(); ?&amp;gt;
                &amp;lt;?php endif; ?&amp;gt;

                &amp;lt;nav id=&amp;quot;access&amp;quot; role=&amp;quot;navigation&amp;quot;&amp;gt;
                     &amp;lt;h3&amp;gt;&amp;lt;?php _e( 'Main menu', 'twentyeleven' ); ?&amp;gt;&amp;lt;/h3&amp;gt;
                     &amp;lt;?php /* Allow screen readers / text browsers to skip the navigation menu and get right to the good stuff. */ ?&amp;gt;
                     &amp;lt;div&amp;gt;&amp;lt;a href=&amp;quot;#content&amp;quot; title=&amp;quot;&amp;lt;?php esc_attr_e( 'Skip to primary content', 'twentyeleven' ); ?&amp;gt;&amp;quot;&amp;gt;&amp;lt;?php _e( 'Skip to primary content', 'twentyeleven' ); ?&amp;gt;&amp;lt;/a&amp;gt;&amp;lt;/div&amp;gt;
                     &amp;lt;div&amp;gt;&amp;lt;a href=&amp;quot;#secondary&amp;quot; title=&amp;quot;&amp;lt;?php esc_attr_e( 'Skip to secondary content', 'twentyeleven' ); ?&amp;gt;&amp;quot;&amp;gt;&amp;lt;?php _e( 'Skip to secondary content', 'twentyeleven' ); ?&amp;gt;&amp;lt;/a&amp;gt;&amp;lt;/div&amp;gt;
                     &amp;lt;?php /* Our navigation menu. If one isn't filled out, wp_nav_menu falls back to wp_page_menu. The menu assigned to the primary location is the one used. If one isn't assigned, the menu with the lowest ID is used. */ ?&amp;gt;
                     &amp;lt;?php wp_nav_menu( array( 'theme_location' =&amp;gt; 'primary' ) ); ?&amp;gt;
                &amp;lt;/nav&amp;gt;&amp;lt;!-- #access --&amp;gt;
      &amp;lt;/header&amp;gt;&amp;lt;!-- #branding --&amp;gt;

      &amp;lt;div id=&amp;quot;main&amp;quot;&amp;gt;
</pre>

<div>
  を下記に変更します。
</div>

<pre class="brush: php; title: ; notranslate" title="">&amp;lt;?php
                     // Has the text been hidden?
                     if ( 'blank' == get_header_textcolor() ) :
                ?&amp;gt;
                     &amp;lt;div&amp;gt;
                     &amp;lt;/div&amp;gt;
                &amp;lt;?php
                     else :
                ?&amp;gt;
                &amp;lt;?php endif; ?&amp;gt;

      &amp;lt;/header&amp;gt;&amp;lt;!-- #branding --&amp;gt;

      &amp;lt;div id=&amp;quot;main&amp;quot;&amp;gt;
</pre>

<div>
  これでヘッダがすっきりしました。
</div>

<div>
  次にフッタの「Proudly powered by WordPress」を消したいのでフッダまるごと消します。
</div>

<div>
  footer.phpの15行～29行
</div>

<pre class="brush: php; title: ; notranslate" title="">&amp;lt;footer id=&amp;quot;colophon&amp;quot; role=&amp;quot;contentinfo&amp;quot;&amp;gt;

                &amp;lt;?php
                     /* A sidebar in the footer? Yep. You can can customize
                     * your footer with three columns of widgets.
                     */
                     if ( ! is_404() )
                          get_sidebar( 'footer' );
                ?&amp;gt;

                &amp;lt;div id=&amp;quot;site-generator&amp;quot;&amp;gt;
                     &amp;lt;?php do_action( 'twentyeleven_credits' ); ?&amp;gt;
                     &amp;lt;a href=&amp;quot;&amp;lt;?php echo esc_url( __( 'http://wordpress.org/', 'twentyeleven' ) ); ?&amp;gt;&amp;quot; title=&amp;quot;&amp;lt;?php esc_attr_e( 'Semantic Personal Publishing Platform', 'twentyeleven' ); ?&amp;gt;&amp;quot; rel=&amp;quot;generator&amp;quot;&amp;gt;&amp;lt;?php printf( __( 'Proudly powered by %s', 'twentyeleven' ), 'WordPress' ); ?&amp;gt;&amp;lt;/a&amp;gt;
                &amp;lt;/div&amp;gt;
      &amp;lt;/footer&amp;gt;&amp;lt;!-- #colophon --&amp;gt;
</pre>

<div>
  を下記に変更します。
</div>

<pre class="brush: php; title: ; notranslate" title="">&amp;lt;footer id=&amp;quot;colophon&amp;quot; role=&amp;quot;contentinfo&amp;quot;&amp;gt;

                &amp;lt;?php
                     /* A sidebar in the footer? Yep. You can can customize
                     * your footer with three columns of widgets.
                     */
                     if ( ! is_404() )
                          get_sidebar( 'footer' );
                ?&amp;gt;

      &amp;lt;/footer&amp;gt;&amp;lt;!-- #colophon --&amp;gt;
</pre>

<div>
  これでフッダが表示されなくなりました。
</div>

<div>
  次は、トップページ表示時に記事の内容を表示したくないので、タイトルのみ表示されるようにします。
</div>

<div>
  content.phpを下記にします。（長いのをごっそり消してるので元ファイルは割愛）
</div>

<pre class="brush: php; title: ; notranslate" title="">&amp;lt;?php
 /**
 * The default template for displaying content
 *
 * @package WordPress
 * @subpackage Twenty_Eleven
 * @since Twenty Eleven 1.0
 */
 ?&amp;gt;

      &amp;lt;article id=&amp;quot;post-&amp;lt;?php the_ID(); ?&amp;gt;&amp;quot; &amp;lt;?php post_class(); ?&amp;gt;&amp;gt;
           &amp;lt;header&amp;gt;
                &amp;lt;?php if ( is_sticky() ) : ?&amp;gt;
                     &amp;lt;hgroup&amp;gt;
                          &amp;lt;h2&amp;gt;&amp;lt;a href=&amp;quot;&amp;lt;?php the_permalink(); ?&amp;gt;&amp;quot; title=&amp;quot;&amp;lt;?php printf( esc_attr__( 'Permalink to %s', 'twentyeleven' ), the_title_attribute( 'echo=0' ) ); ?&amp;gt;&amp;quot; rel=&amp;quot;bookmark&amp;quot;&amp;gt;&amp;lt;?php the_title(); ?&amp;gt;&amp;lt;/a&amp;gt;&amp;lt;/h2&amp;gt;
                          &amp;lt;h3&amp;gt;&amp;lt;?php _e( 'Featured', 'twentyeleven' ); ?&amp;gt;&amp;lt;/h3&amp;gt;
                     &amp;lt;/hgroup&amp;gt;
                &amp;lt;?php else : ?&amp;gt;
                &amp;lt;h1&amp;gt;&amp;lt;a href=&amp;quot;&amp;lt;?php the_permalink(); ?&amp;gt;&amp;quot; title=&amp;quot;&amp;lt;?php printf( esc_attr__( 'Permalink to %s', 'twentyeleven' ), the_title_attribute( 'echo=0' ) ); ?&amp;gt;&amp;quot; rel=&amp;quot;bookmark&amp;quot;&amp;gt;&amp;lt;?php the_title(); ?&amp;gt;&amp;lt;/a&amp;gt;&amp;lt;/h1&amp;gt;
                &amp;lt;?php endif; ?&amp;gt;
           &amp;lt;/header&amp;gt;&amp;lt;!-- .entry-header --&amp;gt;
      &amp;lt;/article&amp;gt;&amp;lt;!-- #post-&amp;lt;?php the_ID(); ?&amp;gt; --&amp;gt;
</pre>

<div>
  21行～32行のヘッダのmeta情報を削除し、
</div>

<div>
  34行～81行のコンテント情報を削除します。
</div>

<div>
  あとはデザインを変更します。
</div>

<div>
  まずはコンテント幅の変更から。
</div>

<div>
  style.cssの196行目前後
</div>

<pre class="brush: css; title: ; notranslate" title="">/* One column */
 .one-column #page {
      max-width: 690px;
 }
</pre>

<div>
  を下記に変更します。
</div>

<pre class="brush: css; title: ; notranslate" title="">/* One column */
 .one-column #page {
      width: 980px;
 }
</pre>

<div>
  これでコンテント幅が変わったはずです。
</div>

<div>
  コンテント幅の980pxはAppleのサイトを参考にしています。
</div>

<div>
  次は背景色と文字色を変更します。
</div>

<div>
  おそらく暗い背景に設定しているのでdark.cssというものを読み込んでおり、このファイルを編集します。
</div>

<div>
  普通は普通にstyle.cssを編集すれば反映される気がします。
</div>

<div>
  dark.cssの10行目前後
</div>

<pre class="brush: css; title: ; notranslate" title="">body {
      background: #1d1d1d;
      color: #bbb;
 }
 #page {
      background: #0f0f0f;
 }
</pre>

<div>
  を下記に変更します。
</div>

<pre class="brush: css; title: ; notranslate" title="">body {
      background: rgb(25, 25, 25);
      color: rgb(250, 250, 250);
 }
 #page {
      background: rgb(50, 50, 50);
 }
</pre>

<div>
  これで色情報が反映されると思いきや反映されません。
</div>

<div>
  インスペクタで調べたところ、headタグの中にstyleが直接書かれていたのが原因でした。
</div>

<div>
  なのでこの直接指定している出力を切ります。
</div>

<div>
  functions.phpの106行～111行の
</div>

<pre class="brush: php; title: ; notranslate" title="">functions.phpの106行～111行の
      // Add support for custom backgrounds.
      add_theme_support( 'custom-background', array(
           // Let WordPress know what our default background color is.
           // This is dependent on our current color scheme.
           'default-color' =&amp;gt; $default_background_color,
      ) );
</pre>

<div>
  の記述を削除します。
</div>

<div>
  そして144行目の
</div>

<pre class="brush: php; title: ; notranslate" title="">          add_custom_background();
</pre>

<div>
  の記述を削除します。
</div>

<div>
  おそらく102行目の
</div>

<pre class="brush: php; title: ; notranslate" title="">$default_background_color = '1d1d1d';
</pre>

<div>
  とかの指定を変えてあげれば色が変わるんでしょうけど、スタイルの指定はcssで一括で管理したいので削除します。
</div>

<div>
  以上で設定終了です。
</div>

<div>
  多少は人様にみせられるような形になってきたかなと思います。
</div>

<div>
  今後はもっとスタイルをいじっていきたいですね。
</div>

<div>
  参考
</div>

<div>
  WordPressのテーマ作成（１）：ファイル構成 &#8211; 基礎編 | Lovelog+* &#8211; WordPressリファレンス
</div>

<div>
  WordPressのテーマとなるファイル構成 | プログラミングアフィリエイトで集客する方法
</div>

<div>
  WordPressカスタマイズ－カスタムヘッダーで背景を変更する－ | remember-it
</div>

<div>
  <a title="E BISUCOM TECH LAB : WordPress 3.3.xにおけるカスタム背景の表示 （WordPressレッスンブックのサンプルで背景画像が表示されない問題に関して）" href="http://ebisu.com/memo/custom_background/" target="_blank">E BISUCOM TECH LAB : WordPress 3.3.xにおけるカスタム背景の表示 （WordPressレッスンブックのサンプルで背景画像が表示されない問題に関して）</a>
</div>

<div>
  <a title="WordPress3.4のテーマカスタマイザーで自由度の高いテーマを作ろう | webOpixel" href="http://www.webopixel.net/wordpress/586.html" target="_blank">WordPress3.4のテーマカスタマイザーで自由度の高いテーマを作ろう | webOpixel</a>
</div>