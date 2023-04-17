---
title: "VS Code で WordPress のテーマを快適に開発したい – リンター・フォーマッター・コーディング規約の導入"
excerpt: "VS Code で WordPress のテーマを快適に開発するために、リンター・フォーマッター・コーディング規約を導入する手順をまとめました。"
coverImage: "/assets/blog/vscode-wordpress-linter-formatter/cover.jpg"
date: "2022-12-21"
tags: ["Programming"]
author:
  name: Takenori Oshima
  picture: ""
ogImage:
  url: "/assets/blog/vscode-wordpress-linter-formatter/cover.jpg"
---

VS Code で WordPress のテーマを快適に開発するために、リンター / フォーマッター / コーディング規約を導入する手順をまとめました。同様の記事はネット上に多くありますが、

- PHP_CodeSniffer や WordPress コーディング規約をグローバル環境に導入するものが多い
  - それぞれの開発環境で個別に設定を調整する必要がある
  - Composer でプロジェクトごとに管理すると、この設定が不要になり、楽
- VS Code の PHP_CodeSniffer 用のプラグインが複数存在する
  - 設定内容に違いがあるため、混乱する
- PHP Intelephense と PHP_CodeSniffer をセットで導入したい
- 何度も同じ手順を繰り返している気がするので自身の環境構築メモを残したい

ことから、あらためてまとめました。

## 対象の人

- VS Code を使っている
- Composer はインストール済み
- WordPress 関数の自動補完を効かせたい / 引数や戻り値などのコードヒントが見れると嬉しい
- typo などによる単純なエラーはタイピング時に怒られたい
- インデントや括弧前後のスペースなどは保存時に自動的に整形してほしい

## 環境

- macOS 13.1
- VS Code 1.74.2
- composer 2.5.1

## Composer でのインストール

プロジェクトディレクトリに PHP_CodeSniffer と WordPress コーディング規約 をインストールします。

- PHP_CodeSniffer: コーディング規約に即したエラー表示、自動整形を行う php スクリプト
- WordPress コーディング規約: PHP_CodeSniffer で利用する WordPress のコーディング規約

```sh
% composer require --dev squizlabs/php_codesniffer wp-coding-standards/wpcs
```

Git でプロジェクトを管理しているので、上記コマンド実行後に作成される vendor 以下を .gitignore に追加しました。

## PHP_CodeSniffer の設定ファイルを更新

WordPress のコーディング規約をインストールしただけでは利用できません。PHP_CodeSniffer の設定ファイルに WordPress コーディング規約をインストールしたパスを追加します。

```sh
# 利用できるコーディング規約一覧に WordPress がないことを確認
% vendor/bin/phpcs -i
The installed coding standards are MySource, PEAR, PSR1, PSR2, PSR12, Squiz, Zend

# WordPressのコーディング規約 を追加
% vendor/bin/phpcs --config-set installed_paths vendor/wp-coding-standards/wpcs

# 利用できるコーディング規約一覧に WordPress が追加されたことを確認
% vendor/bin/phpcs -i
The installed coding standards are MySource, PEAR, PSR1, PSR2, PSR12, Squiz, Zend, WordPress, WordPress-Core, WordPress-Docs and WordPress-Extra
```

## VS Code の拡張機能を追加

- **PHP Intelephense**: 強力なコード補完やコードジャンプで PHP でのコーディング作業に欠かせない拡張機能。stubs を追加することで WordPress 関数も補完・コードヒントが効くようになります。
- **PHP Sniffer & Beautifier**: PHP_CodeSniffer による自動エラー表示と自動整形のために追加します。

```sh
% code --install-extension bmewburn.vscode-intelephense-client valeryanm.vscode-phpsab
```

## VS Code の設定を追加

プロジェクトディレクトリの .vscode/settings.json に以下設定を追加します。

### 設定の説明

- PHP Sniffer & Beautifier で利用するコーディング規約を WordPress に設定
- Composer でインストールした phpcs / phpcbf の実行パスを設定
- ファイル保存時に自動整形する
- PHP Intelephense の stubs に WordPress のコード補完が効くように wordpress (**lower case なので注意**)を追加
- .php のデフォルトフォーマッターを phpcbf に

※ 今回の設定のみ抽出しています。

```json:settings.json
{
  "phpsab.standard": "WordPress",
  "phpsab.executablePathCS": "vendor/bin/phpcs",
  "phpsab.executablePathCBF": "vendor/bin/phpcbf",
  "editor.formatOnSave": true,
  "intelephense.stubs": ["Core", "date", "json", "mbstring", "standard", "pcre", "wordpress"],
  "[php]": {
    "editor.defaultFormatter": "valeryanm.vscode-phpsab"
  }
}
```

## 動作確認

- WordPress コーディング規約による自動エラー検出がされること
- ファイル保存時の自動整形されること

を、WordPress コーディング規約でエラーとなるインデントが崩れた・エスケープすべき記述を含むコードで試します。

```php
<?php
if($post  ){
echo home_url(); // All output should be run through an escaping function. とエラー指摘される。
  }
```

↓ `home_url()` を `esc_url(home_url())` としてエラーを解消し、保存。自動整形されることを確認する。

```php
<?php
if ( $post ) {
	echo esc_url( home_url() );
}
```

とても・気持ちが・いい。

## PHP8+ 環境で動作しないとき

PHP8+ 環境で WordPress コーディング規約を利用すると、deprecated な Warning が発生し、動作しません。

```
Passing null to parameter #1 ($string) of type string is deprecated in ...
```

実行時にオプションを渡してエラーを非表示とすることで動作するようになります。settings.js に記述を追加します。

```json:settings.json {5-6}
{
  "phpsab.standard": "WordPress",
  "phpsab.executablePathCS": "vendor/bin/phpcs",
  "phpsab.executablePathCBF": "vendor/bin/phpcbf",
  "phpsab.snifferArguments": ["-d", "error_reporting='E_ALL&~E_DEPRECATED'"],
  "phpsab.fixerArguments": ["-d", "error_reporting='E_ALL&~E_DEPRECATED'"],
  "editor.formatOnSave": true,
  "intelephense.stubs": ["Core", "date", "json", "mbstring", "standard", "pcre", "wordpress"],
  "[php]": {
    "editor.defaultFormatter": "valeryanm.vscode-phpsab"
  }
}
```
