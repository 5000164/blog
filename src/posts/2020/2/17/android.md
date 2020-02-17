---
title: "Android の Chrome で通知の許可設定がタップできない"
published: "2020-02-17 22:21:50 +0100"
updated: "2020-02-17 22:21:50 +0100"
---

Android の Chrome で通知の許可設定がタップできなくてずっと困っていたが、最近原因を見つけることができた。どうやらセキュリティのためにオーバーレイアプリの動作中はタップができないようだった。

自分の環境では Swiftly Switch を常に動かしているのでいつもタップできない状態だった。一度オフにしてから操作することで無事にタップすることができた。ヒントがなさすぎるので、タップできなかった時に通知などが出てくれればいいのにと思った。

# 参考

- [Chrome confirmation buttons not working on Android 10? Disable overlays from other apps](https://www.androidpolice.com/2019/11/01/psa-chrome-confirmation-buttons-on-android-10-overlay/)
