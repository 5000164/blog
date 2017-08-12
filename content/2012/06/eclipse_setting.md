+++
title = "Eclipse設定メモ"
date = 2012-06-26T00:55:37+00:00
url = "2012-06-eclipse_setting"
+++
毎回毎回Eclipseの設定を思い出すのがめんどくさくなったのでついにメモった。
  
とりあえず最低限の設定だけ。

  * Eclipse Market Place 
      * Eclipse Color Themeで検索する。 
          * Eclipse Color ThemeをInstallする。

環境設定

  * >General 
      * Show heap status 
          * check
      * >Appearance 
          * -Color Theme 
              * Obsidian
          * -Color and Fonts 
              * Basic 
                  * Text Font 
                      * Ricty 13
      * >ContentTypes 
          * Text 
              * CSS 
                  * Add 
                      * *.scss
      * >Editors 
          * -FIle Associations 
              * File types 
                  * Add 
                      * *.css
                      * *.scss
              * Associated editors 
                  * \*.cssと\*.scssどちらも 
                      * CSS Editor
                      * Text Editor
          * >Text Editors 
              * Show line numbers 
                  * check
              * Show whitespace characters 
                  * check
      * -Keys 
          * Content Assist 
              * command + return
      * >Workspace 
          * Text file encoding 
              * Other : UTF-8
          * New text file line delimiter 
              * Other : Unix
  * >Web 
      * >CSS Files 
          * Encoding 
              * ISO 10646/Unicode(UTF-8)

設定ファイル
  
Eclipse.appのパッケージの内容を表示。
  
/Contents/MacOS/eclipse.iniを開く。
  
下記内容に変更。

<pre class="brush: plain; title: ; notranslate" title="">-vmargs
-XX:MaxPermSize=256m
-Xss2m
-Xms256m
-Xmx1024m
</pre>

これで設定をとりあえずエクスポートして完了。
  
あとはDropboxで共有するなりなんなり。

参考サイト
  
<a title="livedoor Techブログ : Eclipse初心者がAndroid開発する際に押さえるべきこと" href="http://blog.livedoor.jp/techblog/archives/65399350.html" target="_blank">livedoor Techブログ : Eclipse初心者がAndroid開発する際に押さえるべきこと</a>
  
Eclipse Color Themeを使ってみよう
  
設定のインポート・エクスポート &#8211; devillikeaangelの日記