---
title: "Ansible で作成したユーザーをパスワードなしで sudo できるようにする"
date: "2015-11-28 02:55:39 +0900"
---

## 先に簡単な結論

`/etc/sudoers.d/` の下にパスワードなしで sudo できる設定を追加する。

## Vagrant の VM に Ansible で環境を構築する

いつもは vagrant ユーザーをそのまま使っていたのだが、ユーザー名を変えておいた方がなんとなくよさそう、と思ってユーザー名を変えることにした。  
ユーザーの追加は user モジュールを使って簡単にできる。  
問題は作成したユーザーで sudo できないことだった。

## 一応オプションをつけて毎回パスワードを入力すれば回避できる

```
ansible-playbook playbook.yml --ask-sudo-pass
```

ってやって、毎回パスワードを入れれば動く。  
でもだるい。

## vagrant ユーザーはなんでパスワードなしで sudo できるのか

なぜ、どうして。  
全然仕組みを理解できていなかった。  
そして今日たまたまこの記事を見る。

- [suとsudoの違い - Qiita](http://qiita.com/aosho235/items/05d4a4f549016e41cde7)

「suは切替先ユーザー（root）のパスワードが要求されるのに対し、sudoは元のユーザーのパスワードが要求される。」  
なるほど、もしかしてこれでは？  
「ansible sudoers」でググる。

- [Ansibleでユーザを追加 - Qiita](http://qiita.com/kiarina/items/813878489f4adba4eb34)
- [ansibleでsudo可能なユーザを追加する - Qiita](http://qiita.com/suin/items/155ca2b98c485935db1b)

なるほど。  
「sudo group」でググる。

- [sudoユーザーを追加する方法 - Linux入門 - Webkaru](http://webkaru.net/linux/sudo-user-add/)

やってみよう。

## sudo はできたけどパスワードは聞かれる

なぜだ。  
そうか、vagrant と同じグループに入れればいいのかと思いつく。  
vagrant グループに入れてみる。

## 状況は変わらず

なんで vagrant はパスワードなしで実行できるんだ。  
特に `/etc/sudoers` に vagrant の記述はないのに。  
と思ったら、よく見たら最後に `#includedir /etc/sudoers.d` って書いてある。

## /etc/sudoers.d/ に vagrant ってファイルがあった

```
vagrant ALL=(ALL) NOPASSWD:ALL
```

これか。  
なるほどたしかにパスワードなしって書いてある。  
でもそしたらやっぱり vagrant グループに入れればいけるのでは？

## % がついてないからグループに指定してるのではなく vagrant ユーザーにだけ指定してた

やっと理解した。  
つまり追加するユーザーの設定をここに追加すればいいわけだ。

## copy モジュールで持ってったら動いた

やった。  
でも調べてたらもっと簡単な記述があった。

- [Vagrant + Ansibleで環境構築をコード化する(4)さらにPlaybook　～終わり～ - Qiita](http://qiita.com/hidekuro/items/8cd1ebe1c52a256593ef)

## 結論

```
+++
- hosts: all
  remote_user: vagrant
  sudo: yes
  vars:
    user_name: # ユーザー名を設定
    password: # ハッシュ化したパスワードを設定
  tasks:
    - user: name={{ user_name }} password={{ password }} groups={{ user_name }}
    - lineinfile: dest=/etc/sudoers.d/{{ user_name }} line="{{ user_name }} ALL=(ALL) NOPASSWD:ALL" create=yes owner=root group=root mode=0440
    - authorized_key: user={{ user_name }} key="{{ lookup('file', '/home/charlie/.ssh/id_rsa.pub') }}" # Ansible を実行しているユーザーの持っている公開鍵へのパス
```

これで同じ playbook の中で作成したユーザーでパスワードなしで `sudo: yes` できるようになった。
