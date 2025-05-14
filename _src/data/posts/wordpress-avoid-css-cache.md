---
title: "WordPress で CSS・JS のキャッシュ読み込みを回避する"
excerpt: "サイト更新確認時の「スーパーリロードのお願い」にさよならをしよう。"
date: "2025-01-30"
modified: "2025-03-17"
tags: ["Programming"]
---

CSS や JavaScript ファイルの更新が含まれるリリース作業後、確認時にローカルキャッシュが読み込まれて、「こちらでは変更が確認できないのですが？」のやり取りを回避する小技メモ。

## やりたいこと

CSS や JS ファイルの読み込み時にバージョンのパラメータ( `ver` )を追加して、キャッシュを無効化する。

```html
<link rel="stylesheet" href="path/to/main.min.css" type="text/css" media="all" />
```

↓

```html
<link rel="stylesheet" href="path/to/main.min.css?ver=1.1" type="text/css" media="all" />
```

## `ver` の値にはファイル更新日時を使おう

[wp_enqueue_style()](https://developer.wordpress.org/reference/functions/wp_enqueue_style/)・[wp_enqueue_script()](https://developer.wordpress.org/reference/functions/wp_enqueue_script/) では 4 番目の引数で`ver` を指定できます。

```php
$theme = wp_get_theme();
wp_enqueue_style( 'main', get_theme_file_uri('/path/to/main.min.css'), array(), $theme->get('Version'), 'all' );
```

で style.css に記述されたバージョンを `ver` の値として指定できますが、手作業でのバージョン書き換えが必要 + 差分が小さいリリース時には書き換えを忘れそう。漏れが無いようにファイルの更新日時を `YmdHis` の形式で取得して、`ver` に指定します。

```php
$css_path = 'path/to/main.min.css';
$css_version = gmdate( 'YmdHis', filemtime( get_theme_file_path( $css_path ) ) );
wp_enqueue_style( 'main', get_theme_file_uri( $css_path ), array(), $css_version, 'all' );
```

JavaScript の読み込みも同様に指定しましょう。

```php
$js_path = 'path/to/main.min.js';
$js_version = gmdate( 'YmdHis', filemtime( get_theme_file_path( $js_path ) ) );
wp_enqueue_script( 'main', get_theme_file_uri( $js_path ), array(), $js_version, true );
```

## 確認

サイトを表示して、`ver` の値として更新日時が付いているか確認しましょう。

```html
<link rel="stylesheet" id="main-css" href="path/to/main.min.css?ver=20250130013247" type="text/css" media="all" />
```

```html
<script type="text/javascript" id="main-js" src="path/to/main.min.js?ver=20250130101851"></script>
```

これでローカルキャッシュの読み込みを回避することができました。おつかれさまでした。
