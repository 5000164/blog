+++
layout: post
title = ""PHP の二次元配列から同じキーの値だけで新しい配列を生成する""
date: 2015-07-23 00:15:30 +0900
comments: true
categories: 
+++

PHP の二次元配列から同じキーの値だけで新しい配列を生成する関数 array_column
====
他の人のコードを読んでたらたまたま見つけた便利な関数 array_column。  
二次元配列から同じキーの値だけで新しい配列を生成する。  
[PHP: array_column - Manual](http://php.net/manual/ja/function.array-column.php)

同じキーの値だけで新しい配列を作るサンプル
====
```php
<?php
$data = [
    [
        'id' => 1,
        'name' => 'aaa',
    ],
    [
        'id' => 2,
        'name' => 'bbb',
    ],
];

$id_list = array_column($data, 'id');
$name_list = array_column($data, 'name');

var_dump($id_list);
// array(2) {
//   [0]=>
//   int(1)
//   [1]=>
//   int(2)
// }

var_dump($name_list);
// array(2) {
//   [0]=>
//   string(3) "aaa"
//   [1]=>
//   string(3) "bbb"
// }

```

二次元配列の縦横を入れ替える (転置行列を得る) サンプル
====
```php
<?php
$data = [
    [
        'id' => 1,
        'name' => 'aaa',
    ],
    [
        'id' => 2,
        'name' => 'bbb',
    ],
];

$transposed_matrix = [];
foreach ($data[0] as $key => $value) {
    $transposed_matrix[$key] = array_column($data, $key);
}

var_dump($transposed_matrix);
// array(2) {
//     ["id"]=>
//   array(2) {
//         [0]=>
//     int(1)
//     [1]=>
//     int(2)
//   }
//   ["name"]=>
//   array(2) {
//         [0]=>
//     string(3) "aaa"
//     [1]=>
//     string(3) "bbb"
//   }
// }

```

参考
====
* [PHPのarray_columnが便利 - Qiita](http://qiita.com/harukasan/items/a0773aef27d838852e44)
* [【php】配列の縦横入れ替え的な操作 at softelメモ](https://www.softel.co.jp/blogs/tech/archives/2576)
* [PHPで二次元配列の転置行列を得る方法 - かなりすごいブログ](http://blog.supermomonga.com/articles/php/array-to-transverse-matrix.html)
    - 難しくて理解できなかった
