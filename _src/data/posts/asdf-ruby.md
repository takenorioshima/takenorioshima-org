---
title: "asdf で Ruby をインストールする"
excerpt: "Node.js・Ruby・PHP...いろいろな開発言語のバージョン切り替えを一括管理できる大変便利な asdf 。理解を深めるため、asdf で Ruby をインストールする手順をまとめました。"
date: "2023-01-14"
modifiedDate: "2025-04-14"
tags: ["programming"]
---

Node.js・Ruby・PHP...いろいろな開発言語のバージョン切り替えを一括管理できる大変便利な env 系ツール、[asdf](https://asdf-vm.com/)。Node.js に続き、Ruby をインストールしてみます。

## 環境

- macOS 15.4
- zsh

## GitHub から asdf を Clone

公式のおすすめに従って Homebrew で導入します。

```sh
❯ brew install asdf
```

今回はバージョン 0.16.7 がインストールされました。

```sh
❯ asdf -v
asdf version 0.16.7
```

## asdf の Shims のパスを追加

~/.zshrc に Shims ディレクトリのパスを追加しておきます。

```sh:~/.zshrc
export PATH="${ASDF_DATA_DIR:-$HOME/.asdf}/shims:$PATH"
```

## asdf で Ruby を管理できるようにプラグインをインストール

[プラグインの公式リポジトリ](https://github.com/asdf-vm/asdf-ruby)の案内に従って Ruby のプラグインをインストールします。

```sh
❯ asdf plugin add ruby https://github.com/asdf-vm/asdf-ruby.git

# asdf のプラグイン一覧に ruby が追加されたことを確認( nodejs は以前に追加したもの)
❯ asdf plugin list
nodejs
ruby
```

## インストール可能なバージョンのリストを確認

`asdf list all [プラグイン名]`でインストール可能なバージョンの一覧が確認できます。

```sh
❯ asdf list all ruby
1.8.5-p52
1.8.5-p113
1.8.5-p114
1.8.5-p115
1.8.5-p231
...
3.4.0
3.4-dev
3.4.1
3.4.2
3.5-dev
```

今回は Ruby 3.2.5 をインストールしてみます。

```sh
❯ asdf install ruby 3.2.5
```

と実行したら、以下のエラーがでました。

```sh
*** Following extensions are not compiled:
psych:
        Could not be configured. It will not be installed.
        Check /var/folders/v6/yxz1njnx3rx86228h1kmmhbc0000gn/T/ruby-build.20250414131332.79563.9ER2Az/ruby-3.2.5/ext/psych/mkmf.log for more details.

BUILD FAILED (macOS 15.4 on arm64 using ruby-build 20250409)
```

Ruby 3.2.0 以降は 3rd パーティライブラリのソースコード同梱が廃止された様子。Ruby のインストールに必要な libyaml を Homebrew でインストールします。

```sh
❯ brew install libyaml

# 改めて
❯ asdf install ruby 3.2.5
==> Installed ruby-3.2.5 to /Users/takenorioshima/.asdf/installs/ruby/3.2.5
```

無事インストールすることができました😃

## 試しに別のバージョンも入れてみる

Ruby 3.4.2 も追加でインストールして、バージョン切り替えなど試してみましょう。

```sh
❯ asdf install ruby 2.7.6

# インストールされたバージョン一覧を確認
❯ asdf list ruby
  3.2.5
  3.4.2

# グローバルのバージョンを 2.7.6 に指定
❯ asdf set -u ruby 3.2.5

# グローバル設定の確認 - *がついているものがグローバルのバージョン
❯ asdf list ruby
 *3.2.5
  3.4.2

# ruby -v でも確認
❯ ruby -v
ruby 3.2.5 (2024-07-26 revision 31d0f1a2e7) [arm64-darwin24]
```

## うまくいかない時は？

「あれ、設定した通りにならないな...🤔」な時は、シェルの設定ファイルや asdf の shim が反映されていない場合があります。

```sh
# which ruby で確認
❯ which ruby
/usr/bin/ruby

## where ruby で確認
❯ where ruby
/Users/takenorioshima/.asdf/shims/ruby
/usr/bin/ruby

# adsf の shims を更新してみる
❯ asdf reshim

# zsh の設定ファイルを再読込してみる
❯ source ~/.zshrc

# which ruby で再度確認
❯ which ruby
/Users/takenorioshima/.asdf/shims/ruby
```

などを試してみましょう。
