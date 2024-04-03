---
title: "WordPress コーディング規約 で Advanced Custom Fields の関数未定義エラーを解消したい"
excerpt: "プラグインで定義された関数を stubs で読み込んで、快適にコーディングしよう。"
date: "2023-08-22"
tags: ["Programming"]
---

WordPress のカスタムフィールドの管理に便利なプラグイン Advanced Custom Fields。このプラグインを利用することを前提として、テーマファイル内でプラグインの関数を記述することがありますが、テーマファイル内では関数が定義されていないため、未定義のエラー( Undefined function 'get_field'. )として怒られてしまいます。

プラグインの関数定義ファイル( stubs )をプロジェクトに追加することで、エラーの解消・コードヒントが出るようにした作業メモです。

## やりたいこと

```php
<?php
	echo esc_html( get_field( 'some-nice-field' ) );
	the_field( 'some-nice-field' );
?>
```

などで表示されるエラー

```
❌ Undefined function 'get_field'.
❌ Undefined function 'the_field'.
```

を解消したい。

## 環境

- macOS Venture 13.5
- VS Code 1.81.1

## Advanced Custom Fields の stubs を追加

Advanced Custom Fields の関数定義ファイル [php-stubs/acf-pro-stubs](https://github.com/php-stubs/acf-pro-stubs) を Composer で追加します。

```sh
❯ composer require --dev php-stubs/acf-pro-stubs
```

プロジェクトディレクトリ配下に `vendor/php-stubs/acf-pro-stubs` が追加されたことを確認します。

## 確認

VS Code のウィンドウをリロード( Developer: Reload Window )して、確認。

- エラーが出ていた箇所が消えていること。
- Advanced Custom Fields の関数を記述したときにコードヒントが表示されること(便利！)。

が確認できれば設定完了です。お疲れさまでした 😀
