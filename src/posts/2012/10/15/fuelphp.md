---
title: "FuelPHP 1.3 で Profiler を有効にしたら最初から展開した状態で表示されるようにする"
date: "2012-10-15 01:50:10 +0900"
---

![FuelPHP Profiler](/images/2012/10/15/fuelphp-1.png)

最近 FuelPHP を使っています。  
バージョン 1.2.1 を使っていたのですが、 1.3 がでたということで 1.3 を使い始めました。  
そこでデバッグをするときに、 `'profiling' => true` とかしてプロファイラを表示させるんですが、プロファイラが最小化状態で表示されます。  
1.2.1 のプロファイラは展開した状態で表示されてたのに。  
true ってしたらプロファイラは常に表示されてて欲しいです。  
ということで、常に表示されるようにします。

```
fuel/core/vendor/phpquickprofiler/display.php
```

を開きます。  
305 行目の

```php
$return_output .='<div style="clear:both;"></div><div id="pqp-container" class="pQp tallDetails" style="display:none;position:inherit;">';
```

を 

```php
$return_output .='<div style="clear:both;"></div><div id="pqp-container" class="pQp tallDetails" style="display:block;position:inherit;">';
```

にします。 (`display:none;` を `display:block;` に変更)  
661 行目の

```php
$return_output .='</div></div><div id="openProfiler"><a href="#" onclick="openProfiler();return false" title="Open Code Profiler">Code Profiler</a></div>';
```

を 

```php
$return_output .='</div></div><div id="openProfiler" style="display: none;"><a href="#" onclick="openProfiler();return false" title="Open Code Profiler">Code Profiler</a></div>';
```

にします。 (` style="display: none;"` の追記)  
以上で常時表示されるようになったはずです。  
検索して見つけた要素のスタイルを適当に変更してるだけなので、なんか他に方法があるのかもしれませんけども。  
とりあえず、これでちょっとだけ快適になった。  
常時表示されなくなったことにはなにか理由があるんですかねえ。
