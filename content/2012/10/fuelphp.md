+++
title = "FuelPHP1.3でProfilerを有効にしたら最初から展開した状態で表示されるようにする"
date = 2012-10-15T01:50:10+00:00
url = "2012-10-fuelphp"
+++

{{< figure src="/images/2012/10/FuelPHP_Profiler.png" title="" >}}

最近FuelPHPを使っています。 

バージョン1.2.1を使っていたのですが、1.3がでたということで1.3を使い始めました。 

そこでデバッグをするときに、&#8217;profiling&#8217; => true,とかしてプロファイラを表示させるんですが、プロファイラが最小化状態で表示されます。 

1.2.1のプロファイラは展開した状態で表示されてたのに。 

trueってしたらプロファイラは常に表示されてて欲しいです。 

ということで、常に表示されるようにします。 

```
fuel/core/vendor/phpquickprofiler/display.php
```

を開きます。 

305行目の 

```php
$return_output .='&lt;div style="clear:both;"&gt;&lt;/div&gt;&lt;div id="pqp-container" class="pQp tallDetails" style="display:none;position:inherit;"&gt;';
```

を 

```php
$return_output .='&lt;div style="clear:both;"&gt;&lt;/div&gt;&lt;div id="pqp-container" class="pQp tallDetails" style="display:block;position:inherit;"&gt;';
```

にします。 

（display:none;をdisplay:block;に変更。） 

661行目の 

```php
$return_output .='&lt;/div&gt;&lt;/div&gt;&lt;div id="openProfiler"&gt;&lt;a href="#" onclick="openProfiler();return false" title="Open Code Profiler"&gt;Code Profiler&lt;/a&gt;&lt;/div&gt;';
```

を 

```php
$return_output .='&lt;/div&gt;&lt;/div&gt;&lt;div id="openProfiler" style="display: none; "&gt;&lt;a href="#" onclick="openProfiler();return false" title="Open Code Profiler"&gt;Code Profiler&lt;/a&gt;&lt;/div&gt;';
```

にします。 

（ style=&#8221;display: none; &#8220;の追記。） 

以上で常時表示されるようになったはずです。 

検索して見つけた要素のスタイルを適当に変更してるだけなので、なんか他に方法があるのかもしれませんけども。 

とりあえず、これでちょっとだけ快適になった。 

常時表示されなくなったことにはなにか理由があるんですかねえ。

