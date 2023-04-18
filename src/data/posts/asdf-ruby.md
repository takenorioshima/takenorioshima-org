---
title: "asdf で Ruby をインストールする"
excerpt: "Node.js・Ruby・PHP...いろいろな開発言語のバージョン切り替えを一括管理できる大変便利な asdf 。理解を深めるため、asdf で Ruby をインストールする手順をまとめました。"
coverImage: "/assets/blog/asdf-ruby/cover.jpg"
date: "2023-01-14"
tags: ["programming"]
---

Node.js・Ruby・PHP...いろいろな開発言語のバージョン切り替えを一括管理できる大変便利な env 系ツール、[asdf](https://asdf-vm.com/)。Node.js に続き、Ruby をインストールしてみます。

## 環境

- macOS 13.1
- zsh

## GitHub から asdf を Clone

Homebrew 経由でも導入できますが、公式のおすすめに従って`git clone`で導入します。現時点での最新リリースのタグ v0.11.0 を指定しています。

```sh
% git clone https://github.com/asdf-vm/asdf.git ~/.asdf -b v0.11.0
```

## asdf の読み込み

~/.zshrc に以下コマンドを追加します。fig を使っている場合は Dotfiles > Scripts に追加すると、一元管理できて良い感じがします。

```sh
. $HOME/.asdf/asdf.sh
```

設定ファイルを再読み込みして、asdf のバージョンを確認してみます。

```sh
# .zshrc に追加した場合
% source .zshrc
% asdf version
  v0.11.0-6a4f51a
```

```sh
# fig の Scripts に追加した場合
% fig source
% asdf version
  v0.11.0-6a4f51a
```

## asdf で Ruby を管理できるようにプラグインをインストール

[プラグインの公式リポジトリ](https://github.com/asdf-vm/asdf-ruby)の案内に従って Ruby のプラグインをインストールします。

```sh
% asdf plugin add ruby https://github.com/asdf-vm/asdf-ruby.git

# asdf のプラグイン一覧に ruby が追加されたことを確認
% asdf plugin list
nodejs
ruby
```

## インストール可能なバージョンのリストを確認

`asdf list-all [プラグイン名]`でインストール可能なバージョンの一覧が確認できます。

```sh
% asdf list-all ruby
1.8.5-p52
1.8.5-p113
1.8.5-p114
1.8.5-p115
1.8.5-p231
1.8.6
...
3.1.2
3.1.3
3.2.0-dev
3.2.0-preview1
3.2.0-preview2
3.2.0-preview3
3.2.0-rc1
3.2.0
```

今回は Ruby 3.0.4 をインストールしてみます。

```sh
% asdf install ruby 3.0.4

# グローバルのバージョンを 3.0.4 に指定
% asdf global ruby 3.0.4

# 確認
% ruby -v
ruby 3.0.4p208 (2022-04-12 revision 3fa771dded) [arm64-darwin22]
```

無事、指定したバージョンのインストールを行うことができました。

## 試しに別のバージョンも入れてみる

Ruby 2.7.6 も追加でインストールして、バージョン切り替えなど試してみましょう。

```sh
% asdf install ruby 2.7.6

# インストールされたバージョン一覧を確認
% asdf list ruby
  2.7.6
 *3.0.4

# グローバルのバージョンを 2.7.6 に指定
% asdf global ruby 2.7.6

# グローバル設定の確認 - *がついているものがグローバルのバージョン
% asdf list ruby
 *2.7.6
  3.0.4

# ruby -v でも確認
% ruby -v
ruby 2.7.6p219 (2022-04-12 revision c9c2245c0a) [arm64-darwin22]
```

## うまくいかない時は？

「あれ、設定した通りにならないな...🤔」な時は、シェルの設定ファイルや asdf の shim が反映されていない場合があります。

```sh
# adsf の shims を更新
% asdf reshim

# shell の設定ファイルを再読込
% source ~/.zshrc

# fig なら
% fig source
```

などを試してみましょう。
