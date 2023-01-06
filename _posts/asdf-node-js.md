---
title: 'asdf で Node.js をインストールする'
excerpt: ''
coverImage: '/assets/blog/dynamic-routing/cover.jpg'
date: '2023-01-02'
author:
  name: Takenori Oshima
  picture: '/assets/blog/authors/takenori.jpg'
ogImage:
  url: '/assets/blog/dynamic-routing/cover.jpg'
---

Node.js・Ruby・PHP...いろいろな開発言語のバージョン切り替えを一括管理できる大変便利なenv系ツール、[asdf](https://asdf-vm.com/)。理解を深めるため、asdf で Node.js インストールする作業をまとめました。

## GitHub から asdf を Clone

Homebrew 経由でも導入できますが、公式のおすすめに従って git clone で導入します。現時点での最新リリースのタグ `v0.11.0` を指定しています。

```
% git clone https://github.com/asdf-vm/asdf.git ~/.asdf -b v0.11.0
```

## asdf の読み込み
`~/.zshrc` に以下コマンドを追加します。fig を使っている場合は Dotfiles > Scripts に追加すると、一元管理できて良い感じがします。

```
. $HOME/.asdf/asdf.sh
```

設定ファイルを再読み込みして、asdf のバージョンを確認してみます。

```
# .zshrc に追加した場合
% source .zshrc
% asdf version
  v0.11.0-6a4f51a
```

```
# fig の Scripts に追加した場合
% fig source
% asdf version
  v0.11.0-6a4f51a
```

## asdf で Node.js を管理できるようにプラグインを追加

の前に asdf プラグインが依存するパッケージを Homebrew でインストールします。

```
% brew install gpg gawk
```

Node.js のプラグインを asdf 追加して Shims を更新します。

```
% asdf install nodejs
% asdf reshim
```

## Node.js のインストール

latest オプションをつけて、最新版をインストールしてみます。 19.3.0 がインストールされました。

```
% asdf install nodejs latest
% asdf list nodejs
  19.3.0
```

インストール可能なバージョンは`asdf list all nodejs`で確認でき、バージョンを指定してインストールすることもできます。バージョン`16.19.0`を追加してみます。

```
% asdf install nodejs 16.19.0
% asdf list nodejs
  16.19.0
  19.3.0
```

## Node.js のバージョンを指定

使用するバージョンを指定してみたら、エラーが出てしまいました。

```
% asdf global nodejs 16.19.0
% tail: /Users/takenorioshima/.tool-versions: No such file or directory
```

グローバルのバージョン指定で参照される`.tool-versions`が存在しないため、エラーとなっているようです。ホームディレクトリに空の`.tool-versions`を作成します。

```
% touch ~/.tool-version
```

再度指定すると設定ができました。現在グローバルで指定されているバージョンは`asdf list nodejs`の一覧に`*`が付いていることで確認できます。

```
% asdf global nodejs 16.19.0
% asdf list nodejs
 *16.19.0
  19.3.0
% node -v
v16.19.0
```

## Yarn を有効化する

Node.js のバージョンが >= 16.10 の場合はシンプルに `yarn` を有効化できました。

```
% corepack enable yarn
% asdf reshim
% yarn -v
1.22.19
```

