---
title: "asdf で Node.js をインストールする"
excerpt: "Node.js・Ruby・PHP...いろいろな開発言語のバージョン切り替えを一括管理できる大変便利な asdf 。理解を深めるため、asdf で Node.js をインストールする手順をまとめました。"
date: "2023-01-02",
modifiedDate: "2025-04-14
tags: ["Programming"]
---

Node.js・Ruby・PHP...いろいろな開発言語のバージョン切り替えを一括管理できる大変便利な env 系ツール、[asdf](https://asdf-vm.com/)。理解を深めるため、asdf で Node.js をインストールする手順をまとめました。

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

## asdf で Node.js を管理できるようにプラグインをインストール

asdf plugin add nodejs 

[プラグインの公式リポジトリ](https://github.com/asdf-vm/asdf-nodejs)の案内に従って Node.js のプラグインをインストールします。

```sh
❯ asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git

# asdf のプラグイン一覧に nodejs が追加されたことを確認
❯ asdf plugin list
nodejs

## Node.js のインストール

今回は 22.14.0 をインストールしてみます。

```sh
❯ asdf install nodejs 22.14.0

## インストールされている nodejs のバージョンを確認
❯ asdf list nodejs
  22.14.0
```

インストール可能なバージョンは `asdf list all nodejs` で確認もできます。

```sh
❯ asdf list all nodejs
0.1.14
0.1.15
0.1.16
0.1.17
0.1.18
...
23.7.0
23.8.0
23.9.0
23.10.0
23.11.0
```

試しに別のバージョンも追加してみましょう。

```sh
❯ asdf install nodejs 20.19.0

## インストールされている nodejs のバージョンを確認
❯ asdf list nodejs
  20.19.0
  22.14.0
```

## Node.js のバージョンを指定

グローバルでも・プロジェクト単位でも、バージョンの指定ができます。指定されているバージョンには * が付きます。

```sh
## グローバルなバージョン指定( ~/.tools-versions で指定 )
❯ asdf set -u nodejs 20.19.0
❯ node -v
 *20.19.0
  22.14.0

## プロジェクト単位のバージョン指定( 現在のディレクトリの .tools-versions で指定)
❯ adsf set nodejs 22.14.0
❯ node -v
  20.19.0
 *22.14.0
```

## Yarn を有効化する

この状態で `yarn` すると、以下のエラーが表示されました。

```sh
❯ yarn
No version is set for command yarn
Consider adding one of the following versions in your config file at /Users/takenorioshima/Documents/GitHub/takenorioshima-org/.tool-versions
nodejs 22.14.0
```

Node.js のバージョンが >= 16.10 の場合は、以下コマンドで `yarn` を有効化できました。簡単！

```sh
❯ corepack enable yarn
❯ asdf reshim
❯ yarn -v
1.22.19
```
