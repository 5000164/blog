+++
title = "HTMLとCSSとJavaScriptで空白と改行を削除するWebアプリを作ったので詳細説明します"
date = 2013-11-29T21:01:01+00:00
url = "2013-11-space_delete"
+++

{{< figure src="/images/2013/11/20131129_space_delete.png" title="" >}}

## 作ったもの

まずは実際に作ったものです。  
見てからの方がわかりやすいと思います。  
[空白改行削除 | 5000164 here.](http://5000164.jp/space_delete/ "空白改行削除 | 5000164 here.")

## 概要

半角スペース、全角スペース、タブ、改行を削除できます。

## 機能

## 改行削除

改行を削除して出力領域に書き出し。  
ショートカットキーはCtrl + Enter。  
書き出したらテキストは全選択の状態なのでそのままコピー可。

## 空白削除

半角スペース、全角スペース、タブを削除して編集領域に上書き。  
ショートカットキーはShift + Enter。  
空白の削除前に戻したい場合はCtrl + Alt + Z。

## 空白改行削除

半角スペース、全角スペース、タブ、改行を削除して出力領域に書き出し。  
ショートカットキーはCtrl + Shift + Enter。

## 補助機能

TabキーでTab文字の挿入。  
Shift + Tabで行頭のTab文字を削除。  
範囲を選択して削除した場合は選択範囲に対して処理の実行。  
範囲を選択してTab、Shift + Tabを押した場合には選択行に対して実行。

## 実装解説

それではHTMLとCSSとJavaScriptについて各部分の詳細を説明します。

## 実装解説：HTML

メインの部分はこんな感じです。

```html
<header>
  <div class="button_wrapper">
    <div class="button"><label><input type="checkbox" id="space_delete_flg"><div id="space_button">空白</div></label></div>
    <div class="button"><label><input type="checkbox" id="newline_delete_flg" checked><div id="newline_button">改行</div></label></div>
    <div id="delete_button" class="button">削除</div>
  </div>
  <a href="http://5000164.jp/2013-11-space_delete/" target="_blank"><div id="info">i</div></a>
</header>
<div id="input_wrapper">
  <div id="input_area">
    <textarea id="input"></textarea>
    <div id="input_background"></div>
  </div>
</div>
<div id="output_area">
  <input type="text" id="result" readonly></input>
</div>
```

タグ構造は非常にシンプルです。  
今回はtextareaに入力した内容に合わせて背景色を変えるという処理を行っているので、textareaとdivタグを重ねています。  
ただ、contenteditableを使えば1つのタグだけでいけるのかもしれません。  
textareaとdivタグを重ねる手法だと、常に内容を同期させる必要があるので処理が重くなる可能性があります。  
ちょっとした入力内容から大丈夫かも知れませんが、次に同じようなことをしたくなったらcontenteditableでやります。

## 実装解説：CSS

今回のCSSでは、編集領域をウィンドウサイズに合わせる、空白などの見えない文字を可視化する、ボタンを押した時にテキストが動く、というところがメインです。

## 編集領域をウィンドウサイズに合わせる

まずは編集領域をウィンドウサイズに合わせる部分から。  
重要になるのはこのへんです。

```css
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: hsl(0, 0%, 15%);
}
#input_wrapper {
  box-sizing: border-box;
  width: 100%;
  min-width: 640px;
  height: 100%;
  margin: 0;
  padding: 30px 0 20px;
  background: hsl(0, 0%, 15%);
}
```

あんまり見なれないheight: 100%;が重要になります。  
私は初めて使った気がします。  
height: 100%;を使うためには、htmlとbodyにheight: 100%;を指定する必要があります。  
これ重要です。  
あとはコンテンツ部分にもheight: 100%;を指定して、paddingで上下の余白を調整してあげれば、コンテンツの高さを自動でウィンドウサイズに合わせることができます。

## 空白などの見えない文字を可視化する

まずはtextareaとdivタグがずれないようにちゃんとスタイルを合わせます。

```css
#input_area {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-width: 640px;
  height: 100%;
  margin: 0;
  padding: 0;
}
#input {
  z-index: 2;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  min-width: 610px;
  height: 100%;
  margin: 0;
  padding: 0 15px;
  resize: none;
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;
  font-family: sans-serif;
  font-size: 18px;
  line-height: 30px;
  color: hsl(0, 0%, 85%);
  background: transparent;
  border: none;
  outline: none;
}
#input_background {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: auto;
  box-sizing: border-box;
  width: 100%;
  min-width: 610px;
  height: 100%;
  margin: 0;
  padding: 0 15px;
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;
  font-family: sans-serif;
  font-size: 18px;
  line-height: 30px;
  color: transparent;
}
```

ここではまず、親要素にposition: relative;を指定して、子要素にposition: absolute;のtop: 0;left: 0;で位置を合わせ、文字のスタイルなどを一致させます。  
そしてtextareaをbackground: transparent;とすることで後ろのdivタグが見えるようになります。  
divタグにはcolor: transparent;と指定してテキストが見えないようにします。  
これで表示する位置を合わせたら、次は実際に表示させます。

```css
#input_background > pre {
  display: inline;
  margin: 0;
  white-space: pre-wrap;
  font-family: sans-serif;
  font-size: 18px;
  line-height: 30px;
}
#input_background > pre:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-family: sans-serif;
  font-size: 10px;
  line-height: 30px;
  color: hsl(0, 0%, 40%);
  text-align: center;
}
#input_background > pre.space {
  position: relative;
  background: hsl(0, 0%, 20%);
}
#input_background > pre.space:after {
  content: "･";
}
#input_background > pre.em_space {
  position: relative;
  background: hsl(0, 0%, 20%);
}
#input_background > pre.em_space:after {
  content: "□";
  font-size: 18px;
}
#input_background > pre.tab {
  position: relative;
  background: hsl(0, 0%, 20%);
}
#input_background > pre.tab:after {
  content: "→";
  text-align: left;
}
#input_background > pre.crlf {
  position: relative;
  background: hsl(0, 0%, 20%);
}
#input_background > pre.crlf:after {
  content: "←↓";
}
#input_background > pre.cr {
  position: relative;
  background: hsl(0, 0%, 20%);
}
#input_background > pre.cr:after {
  content: "←";
}
#input_background > pre.lf {
  position: relative;
  background: hsl(0, 0%, 20%);
}
#input_background > pre.lf:after {
  content: "↓";
}
```

ここではJavaScriptで該当の文字をpreタグで囲い、該当の文字ごとにクラス名が付けられる、という前提でのスタイルです。  
例えば、pre.spaceがあったら、背景を変えて「･」を表示させるようにしています。  
実際にpreタグの中に「･」を入れてしまうとtextareaとdivタグで内容が一致しなくなってしまうので、擬似要素を使って表示しています。

## ボタンを押した時にテキストが動く

ここでは私がかねてから実装してみたかった、バウンスするようなアニメーションを適用しています。  
例として空白ボタンを見てみます。

```css
header input[type=checkbox]:checked + #space_button {
  background: hsl(0, 0%, 5%);
  border: 1px solid hsl(0, 0%, 4%);
  box-shadow: 0 1px 0 0 hsl(0, 0%, 13%);
  text-indent: -.1em;
  letter-spacing: -.1em;
  -webkit-animation: space_button 500ms ease 0 1 normal;
}
```

擬似要素が:checkedの時にだけアニメーションを指定することで、空白ボタンがチェックされたらアニメーションするようにしています。  
実際のアニメーションの動作はこうなっています。

```css
@-webkit-keyframes space_button {
  0% {
    text-indent: 1em;
    letter-spacing: 1em;
  }
  10% {
    text-indent: .9em;
    letter-spacing: .9em;
  }
  20% {
    text-indent: .7em;
    letter-spacing: .7em;
  }
  30% {
    text-indent: .4em;
    letter-spacing: .4em;
  }
  40% {
    text-indent: -.1em;
    letter-spacing: -.1em;
  }
  50% {
    text-indent: .3em;
    letter-spacing: .3em;
  }
  60% {
    text-indent: -.1em;
    letter-spacing: -.1em;
  }
  70% {
    text-indent: .1em;
    letter-spacing: .1em;
  }
  80% {
    text-indent: -.1em;
    letter-spacing: -.1em;
  }
  90% {
    text-indent: 0em;
    letter-spacing: 0em;
  }
  100% {
    text-indent: -.1em;
    letter-spacing: -.1em;
  }
}
```

このように、ここではtext-indentとletter-spacingを使うことで文字の間隔を変えています。  
あとは10%ごとに跳ね返ってるように見えるように間隔を調整すれば完了です。  
空白を消してるぞ！っというような動きができたので個人的には非常に満足しています。

## 実装解説：JavaScript

JavaScriptの解説ですね。  
おおまかに分けると、入力内容の同期、空白や改行の削除処理、Tabの処理、となっています。  
また、今回はライブラリとしてjQueryを使用しています。

## 入力内容の同期

特定の文字に色をつけるために、textareaとdivの内容を同期します。  
その際に、特定の文字をマークアップしたり、入力内容のエスケープを行います。

```javascript
// ～中略～
$(function() {
  // ～中略～
  // 入力された値を常に監視する
  $("#input").bind('keydown keyup keypress change focus click', function() {
    inputWatch($("#input").val());
  });
  
  // スクロールを同期する
  $("#input").bind('keydown keyup keypress change scroll', function() {
    $("#input_background").scrollTop($("#input").scrollTop());
  });
  // ～中略～
});



// 入力内容を監視
function inputWatch(inputText) {
  inputText = escapeHtml(inputText);
  
  // 入力された文字列を可視化する
  inputText = inputText.replace(/ /g, "<pre class=\"space\"> </pre>"); // 半角スペース
  inputText = inputText.replace(/　/g, "<pre class=\"em_space\">　</pre>"); // 全角スペース
  inputText = inputText.replace(/\t/g, "<pre class=\"tab\">   </pre>"); // タブ
  inputText = inputText.replace(/\r\n/g, "<pre class=\"crlf\"></pre><br>"); // CRLF
  inputText = inputText.replace(/\r/g, "<pre class=\"cr\"></pre><br>"); // CR
  inputText = inputText.replace(/\n/g, "<pre class=\"lf\"></pre><br>"); // LF
    
  // div要素の最後が<br>だとheightに反映されないようなので空白を最後に追加する
  inputText += "　";
  
  // 入力内容と背景用の内容を同期させる
  $("#input_background").html(inputText);
}



// HTML用に文字列をエスケープする
function escapeHtml(string) {
  // エスケープ対象は「&」「<」「>」「"」「'」
  string = string.replace(/&/g, "&amp;");
  string = string.replace(/</g, "&lt;");
  string = string.replace(/>/g, "&gt;");
  string = string.replace(/\"/g, "&quot;");
  string = string.replace(/\'/g, "&#39;");
  
  return string;
}
```

内容を同期する時は、内容が変更しそうなイベントをすべてバインドして、同期処理を走らせます。

## 空白や改行の削除処理

空白や改行は正規表現で削除しています。

```javascript
// 改行削除
function newlineDelete() {
  var posStart = $("#input").get(0).selectionStart;
  var posEnd = $("#input").get(0).selectionEnd;
  var inputStr = $("#input").val();
  
  // 範囲選択をしていない場合
  if(posStart === posEnd) {
    // 改行をすべて削除
    $("#result").val(inputStr.replace(/[\n\r]/g, ""));
  }
  // 範囲選択をしている場合
  else {
    var selStr = inputStr.substring(posStart, posEnd);
    // 改行をすべて削除
    $("#result").val(selStr.replace(/[\n\r]/g, ""));
  }
  
  $("#result").focus();
}



// 空白削除
function spaceDelete() {
  var posStart = $("#input").get(0).selectionStart;
  var posEnd = $("#input").get(0).selectionEnd;
  var inputStr = $("#input").val();
  // 内容をバックアップ
  backupStr = $("#input").val();
  backupPos = posStart;
  
  // 範囲選択をしていない場合
  if(posStart === posEnd) {
    // 空白をすべて削除
    $("#input").val(inputStr.replace(/[ 　\t]/g, ""));
    // キャレットの位置から前にある空白の数だけキャレットの位置を前に移動する
    var moveCount = (inputStr.substring(0, posStart).match(/[ 　\t]/g) == null) ? 0 : inputStr.substring(0, posStart).match(/[ 　\t]/g).length;
    var pos = posStart - moveCount;
    $("#input").get(0).setSelectionRange(pos, pos);
  }
  // 範囲選択をしている場合
  else {
    var selStr = inputStr.substring(posStart, posEnd);
    // 空白をすべて削除
    $("#input").val(inputStr.substring(0, posStart) + selStr.replace(/[ 　\t]/g, "") + inputStr.substring(posEnd, inputStr.length));
    $("#input").get(0).setSelectionRange(posStart, posStart);
  }
}



// 空白改行削除
function spaceNewlineDelete() {
  var posStart = $("#input").get(0).selectionStart;
  var posEnd = $("#input").get(0).selectionEnd;
  var inputStr = $("#input").val();
  
  // 範囲選択をしていない場合
  if(posStart === posEnd) {
  // 空白改行をすべて削除
    $("#result").val(inputStr.replace(/[ 　\n\r\t]/g, ""));
  }
  // 範囲選択をしている場合
  else {
    var selStr = inputStr.substring(posStart, posEnd);
    // 改行をすべて削除
    $("#result").val(selStr.replace(/[ 　\n\r\t]/g, ""));
  }
  
  $("#result").focus();
}
```

範囲選択をしていない場合は非常にシンプルなのですが、範囲を選択している時は選択範囲にのみ処理を実行させるようにすると処理が複雑になります。  
範囲選択をしている時は、選択範囲の始点と終点を取得し、それを基に処理を行います。

## Tabの処理

ここが1番大変でした。  
ここに1番時間がかかりました。  
とりあえずソースはこんな感じです。

```javascript
// タブを入力
function insertTab() {
  var posStart = $("#input").get(0).selectionStart;
  var posEnd = $("#input").get(0).selectionEnd;
  var inputStr = $("#input").val();
  
  // 範囲選択をしていない場合
  if(posStart === posEnd) {
    // カーソルの位置にタブを追加
    $("#input").val(inputStr.substring(0,posStart) + "\t" + inputStr.substring(posStart, inputStr.length));
    // カーソルの位置をタブの後ろに移動させる
    $("#input").get(0).setSelectionRange(posStart + 1, posStart + 1);
  }
  // 範囲選択をしている場合
  else {
    var beforeSelStr = inputStr.substring(0, posStart);
    var selStr = inputStr.substring(posStart, posEnd);
    var afterSelStr = inputStr.substring(posEnd, inputStr.length);
    
    // 選択範囲始点の行頭にタブを追加
    beforeSelStrSplit = beforeSelStr.split(/\n|\r|\r\n/g);
    beforeSelStrSplit[beforeSelStrSplit.length - 1] = "\t" + beforeSelStrSplit[beforeSelStrSplit.length - 1];
    // 選択範囲の行頭にタブを追加
    selStr = selStr.replace(/[\n\r]/g, "\n\t");
    // 分割した文字列を結合
    $("#input").val(beforeSelStrSplit.join("\n") + selStr + afterSelStr);
    // カーソルの選択範囲を維持する
    $("#input").get(0).setSelectionRange(posStart + 1, posEnd + ((selStr.match(/[\n\r]/g) == null) ? 0 : selStr.match(/[\n\r]/g).length) + 1);
  }
}



// 行頭のタブを削除
function deleteTab() {
  var posStart = $("#input").get(0).selectionStart;
  var posEnd = $("#input").get(0).selectionEnd;
  var inputStr = $("#input").val();
  
  // 範囲選択をしていない場合
  if(posStart === posEnd) {
    var beforeSelStr = inputStr.substring(0, posStart);
    var afterSelStr = inputStr.substring(posStart, inputStr.length);
    
    // キャレットの行を取得
    beforeSelStrSplit = beforeSelStr.split(/\n|\r|\r\n/g);
    afterSelStrSplit = afterSelStr.split(/\n|\r|\r\n/g);
    var beforeSelLineStr = beforeSelStrSplit[beforeSelStrSplit.length - 1];
    var targetStr = beforeSelLineStr + afterSelStrSplit[0];
    afterSelStrSplit[0] = "";
    // 行頭のタブを削除
    beforeSelStrSplit[beforeSelStrSplit.length - 1] = targetStr.replace(/^\t/, "");
    // 分割した文字列を結合
    $("#input").val(beforeSelStrSplit.join("\n") + afterSelStrSplit.join("\n"));
    // カーソルの位置を維持する
    var moveCount = (beforeSelLineStr.match(/^\t/) == null) ? 0 : 1;
    $("#input").get(0).setSelectionRange(posStart - moveCount, posStart - moveCount);
  }
  // 範囲選択をしている場合
  else {
    var beforeSelStr = inputStr.substring(0, posStart);
    var selStr = inputStr.substring(posStart, posEnd);
    var afterSelStr = inputStr.substring(posEnd, inputStr.length);
    
    // 対象となる行を取得
    beforeSelStrSplit = beforeSelStr.split(/\n|\r|\r\n/g);
    selStrSplit = selStr.split(/\n|\r|\r\n/g);
    afterSelStrSplit = afterSelStr.split(/\n|\r|\r\n/g);
    var beforeSelLineStr = beforeSelStrSplit[beforeSelStrSplit.length - 1];
    var afterSelLineStr = selStrSplit[selStrSplit.length - 1];
    var targetStr = beforeSelLineStr + selStr + afterSelStrSplit[0];
    beforeSelStrSplit[beforeSelStrSplit.length - 1] = "";
    afterSelStrSplit[0] = "";
    // 行頭のタブを削除
    selStr = targetStr.replace(/^\t/, "").replace(/\n\t|\r\t|\r\n\t/g, "\n");
    // 分割した文字列を結合
    $("#input").val(beforeSelStrSplit.join("\n") + selStr + afterSelStrSplit.join("\n"));
    // カーソルの位置を維持する
    var moveCountStart = (beforeSelLineStr.match(/^\t/) == null) ? 0 : 1;
    var moveCountEnd = (afterSelLineStr.match(/^\t/) == null) ? 0 : 1;
    moveCountEnd += (targetStr.match(/\n\t|\r\t|\r\n\t/g) == null) ? 0 : targetStr.match(/\n\t|\r\t|\r\n\t/g).length;
    $("#input").get(0).setSelectionRange(posStart - moveCountStart, posEnd - moveCountEnd);
  }
}
```

はい、ご覧のとおり複雑なことになってます。  
なぜかといいますと、textareaからは行頭というものを取得できないためです。  
改行記号を含んだ文字列として扱われます。  
なので、Shift + Tabをした場合や範囲選択をしている場合は、行頭を判別する処理が必要になります。  
また、Tab文字を入れたり消したりしますので、キャレットの位置がずれてしまいます。  
なので、変動した文字数を数えて、それに合わせてキャレットを移動させてあげています。  
ここらへんの処理がcontenteditableを使うと簡潔に書けそうな感じでした。（ブラウザは制限されるかも知れませんが。）

## まとめ

現時点でこのWebアプリはver.4です。  
ver.3では、Sfhit + Tab以外のキーボードからひと通りの処理に対応、空白文字可視化、などを行って制作時間は7時間くらい。  
ver.4では、Shift + Tab対応、範囲選択の処理に対応、デザイン変更、などを行って制作時間は12時間くらい。  
補助機能の実装に1番時間がかかってしまった。  
今までの合計製作時間は26時間くらいですね。  
非常に楽しく実装できて、とても勉強になって、一時期非常に役に立ったので、とても有意義でした。

## 参考にさせていただいたサイト

- [JavaScript &#8211; Facebookみたいにtextareaの一部を強調する &#8211; Qiita [キータ]](http://qiita.com/yuku_t/items/516ec6fe59b77b93edc5 "JavaScript - Facebookみたいにtextareaの一部を強調する - Qiita [キータ]")
- [Facebookライクにテキストエリアを強調する方法 | Backlogブログ](http://www.backlog.jp/blog/2013/06/facebook-like-textarea.html "Facebookライクにテキストエリアを強調する方法 | Backlogブログ")
- [CSSだけでウィンドウぴったりに表示する編集画面を作る。（CSS おれおれ Advent Calendar 2012 – 23日目） | Ginpen.com](http://ginpen.com/2012/12/24/fix-window-height/ "CSSだけでウィンドウぴったりに表示する編集画面を作る。（CSS おれおれ Advent Calendar 2012 – 23日目） | Ginpen.com")
- [CSSでheight:100%を使う方法について。 | Ginpen.com](http://ginpen.com/2011/07/01/height-100-parcent/ "CSSでheight:100%を使う方法について。 | Ginpen.com")
- [textareaでタブを入力できるようにする &#8211; hokaccha.hamalog v2](http://d.hatena.ne.jp/hokaccha/20111028/1319814792 "textareaでタブを入力できるようにする - hokaccha.hamalog v2")
