---
title: "Operaの右クリックで表示中のページのURLを取得したり別のブラウザで開いたり"
published: "2013-03-04 04:16:33 +0900"
updated: "2013-03-04 04:16:33 +0900"
featuredImage: "../../../../images/2013/3/4/opera-featured.jpg"
---

# Operaの右クリックをカスタマイズ

Operaの右クリックで表示されるメニューをちょっとカスタマイズするだけですごく使いやすくなりますよ

便利ですよ

というわけでOperaのmenu.iniに下記を追記します

# 現在表示中のページのタイトルとURLを取得する

```javascript
[Document Popup Menu]
～中略～
++++++++++++++++++--
Item, "Copy URL" = Go to page, "javascript:(function(){window.prompt('', document.title+'\n'+location.href);})();" & Delay, 100 & Cut & Cancel
```

# 現在表示中のページをChromeで開く

```javascript
[Document Popup Menu]
～中略～
++++++++++++++++++--
Item, "Open page in Google Chrome"=Execute program, "chrome","%u"
```

# リンク先のページをChromeで開く

```javascript
[Link Popup Menu]
～中略～
++++++++++++++++++--
Item, "Open link in Google Chrome"=Execute program, "chrome","%l"
```

# 結論

ちょっとしたカスタマイズですごく幸せになれます
