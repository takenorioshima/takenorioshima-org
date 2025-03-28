---
title: "VS Code で WordPress のテーマを快適に開発したい – リンター・フォーマッターの導入(2025年版)"
excerpt: "VS Code に WordPress のリンター・フォーマッターを導入する。"
date: "2025-03-28"
tags: ["programming"]
---

[以前にまとめた環境](/posts/vscode-wordpress-linter-formatter/)について phpcs が動作しなくなっていたので新しく整備しなおしました、の作業メモ。設定手順も少なく・簡単になっていました。

## 以前の環境での問題

- phpcs によるリアルタイムなエラー表示がされない。
- VS Code の PROBLEMS タブ(⇧⌘M)にもエラー表示がされない。
- ターミナルでの `vendor/bin/phpcs --standard=WordPress bar.php` は正しく動作する。

## WordPress Coding Standard を新規インストール

以前にインストールした `squizlabs/php_codesniffer`・`wp-coding-standards/wpcs` をアンインストールしてから、[公式](https://github.com/WordPress/WordPress-Coding-Standards?tab=readme-ov-file#installation)で案内されている方法で最新のパッケージをインストールします。

```sh
❯ composer remove squizlabs/php_codesniffer wp-coding-standards/wpcs
❯ composer config allow-plugins.dealerdirect/phpcodesniffer-composer-installer true
❯ composer require --dev wp-coding-standards/wpcs:"^3.0"
```

インストール後に利用できるルールセットを確認。WordPress のルールセットがすでに追加されていました。

```sh
❯ vendor/bin/phpcs -i
The installed coding standards are MySource, PEAR, PSR1, PSR2, PSR12, Squiz, Zend, Modernize, NormalizedArrays, Universal, PHPCSUtils, WordPress, WordPress-Core, WordPress-Docs and WordPress-Extra
```

## VS Code のプラグインを追加

リアルタイムでのエラー表示や、ファイル保存時の自動フォーマットのため、以下のプラグインを追加します。以前に利用していた **PHP Sniffer & Beautifier** (valeryanm.vscode-phpsab) は削除。

- **PHP Intelephense** 強力なコード補完やコードジャンプで PHP でのコーディング作業に欠かせない拡張機能。stubs を追加することで WordPress 関数も補完・コードヒントが効くようになります。
- **phpcs** (shevaua.phpcs) エラーをリアルタイムに表示するため追加。
- **phpcbf** (persoderlind.vscode-phpcbf) ファイル保存時にコーディングスタンダートに準じたルールで自動整形するために追加。

```sh
❯ code --install-extension bmewburn.vscode-intelephense-client shevaua.phpcs persoderlind.vscode-phpcbf
```

## phpcs・phpcbf のパスを通す

phpcs は `vendor/bin/phpcs` で通りましたが、phpcbf のパスが `vendor/bin/phpcbf` だとエラーとなり、実行されませんでした。

```
PHPCBF: spawn vendor/bin/phpcbf ENOENT. executablePath not found.
executablePath not found.
```

相対パスで `./vendor/bin/phpcbf` とすると実行されました。

## 最終的な .vscode/settings.json

こんな感じになりました。(今回の設定分だけ抽出しています)

```json:settings.json
{
  "phpcs.executablePath": "vendor/bin/phpcs",
  "phpcs.standard": "WordPress",
  "phpcbf.executablePath": "./vendor/bin/phpcbf",
  "phpcbf.standard": "WordPress",
  "phpcbf.onsave": true,
  "[php]": {
    "editor.defaultFormatter": "persoderlind.vscode-phpcbf"
  },
  "intelephense.stubs": [
    "Core",
    "date",
    "json",
    "mbstring",
    "standard",
    "pcre",
    "wordpress",
    "curl"
  ],
}
```

## 確認

VS Code を Reload Window してから、

- WordPress コーディング規約による自動エラー検出がされること
- ファイル保存時の自動整形されること

を、WordPress コーディング規約でエラーとなるインデントが崩れた・エスケープすべき記述を含むコードで試します。

```php
<?php
if($post  ){ // Expected 1 space after closing parenthesis; found 0 と怒られる.
echo home_url(); // All output should be run through an escaping function. と怒られる.
  } // Line indented incorrectly; expected 0 tabs, found 2 spacesphpcs と怒られる.
```

↓ `home_url()` を `esc_url(home_url())` としてエラーを解消し、保存。自動整形されることを確認する。

```php
<?php
if ( $post ) {
	echo esc_url( home_url() );
}
```

とても・気持ちが・いい。
