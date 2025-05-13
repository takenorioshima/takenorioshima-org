---
title: "定期的にクリーンインストールしてさっぱりしたい"
excerpt: "サッとまっさら・さっぱり・スッキリするための手順まとめ"
date: "2025-05-12"
tags: ["Programming"]
---

使わなくなったアプリケーションのキャッシュファイルや過去のプロジェクトなどにディスクスペースが占有されていると気分がちょっと。定期的にディスク初期化 → クリーンインストールでまっさら・さっぱりしてスッキリ気持ちよくなりたい派です。環境構築作業について、備忘録的にまとめました。

## 環境

- macOS 15.4
- Apple Silicon

## Brewfile の準備

普段から Homebrew でインストールできるライブラリやアプリケーションを管理していると、`brew bundle dump` でインストールしたリスト Brewfile を生成でき、またこの Brewfile の内容を元に一括インストールすることができて、大変便利。

ちなみにわたしの Brewfile は[このような内容](https://github.com/takenorioshima/dotfiles/blob/main/Brewfile)。いつの間にか VS Code のエクステンションも扱えるようになっていて、良き。

```ruby
brew "asdf"
brew "composer"
brew "git"
brew "libyaml"

# GUI なアプリケーションも扱える!
cask "adobe-creative-cloud"
cask "amazon-q"
cask "arc"
cask "cmd-eikana"
cask "cursor"
cask "github"
cask "istat-menus"
cask "rectangle"
cask "slack"
cask "transmit"
cask "zoom"

# Font も扱える!
cask "font-jetbrains-mono"

# App Store のアプリケーションも扱える!
mas "1Password", id: 443987910
mas "DaVinci Resolve", id: 571213070

# VS Code のエクステンションも扱える!
vscode "alefragnani.project-manager"
vscode "amazonwebservices.codewhisperer-for-command-line-companion"
vscode "bmewburn.vscode-intelephense-client"
vscode "bradgashler.htmltagwrap"
vscode "bradlc.vscode-tailwindcss"
vscode "chadalen.vscode-jetbrains-icon-theme"
vscode "christian-kohler.path-intellisense"
vscode "dbaeumer.vscode-eslint"
vscode "eamodio.gitlens"
vscode "esbenp.prettier-vscode"
vscode "formulahendry.auto-rename-tag"
vscode "karunamurti.haml"
vscode "mechatroner.rainbow-csv"
vscode "oderwat.indent-rainbow"
vscode "rexshi.phpdoc-comment-vscode-plugin"
vscode "shevaua.phpcs"
vscode "simone-baldini.vscode-phpcbf"
vscode "stylelint.vscode-stylelint"
vscode "syler.sass-indented"
vscode "unifiedjs.vscode-mdx"
vscode "zignd.html-css-class-completion"
```

## Homebrew のインストール

ディスクを初期化した || 新しいマシン にまずは Homebrew のインストールを行います。 Command Line Tools for Xcode も一緒にインストールされるので、ちょっと時間がかかります。

```sh
❯ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Brewflie を準備して一括インストール

自分専用な Brewfile を GitHub で管理しておけば curl でさっと準備ができて便利。

```sh
❯ curl https://raw.githubusercontent.com/takenorioshima/dotfiles/refs/heads/main/Brewfile > ~/Brewfile
```

Brewfile を置いたディレクトリ(今回は `~/` )に移動して `brew bundle` で一括インストールします。パスワードを求められるアプリケーション(今回は zoom )もあったので、ちょこちょこチェックしつつ放置。

```sh
❯ brew bundle
Installing asdf
Installing composer
Installing git
…(略)
Installing github
Installing font-jetbrains-mono
Installing adobe-creative-cloud
`brew bundle` complete! 20 Brewfile dependencies now installed.
```

これで必要なライブラリ・アプリケーションのインストールはほぼほぼ完了です。Reason Studios など Homebrew でインストールできないアプリケーションは別途手作業で追加します。

## ターミナルのカスタマイズ

読みやすいターミナル、とっても肝要。デフォルトのさみしいターミナルに、

![default](/assets/posts/clean-install/default.png)

Prezto を導入してこのように読みやすく。

![pure](/assets/posts/clean-install/pure.png)

## Prezto の導入

Prezto を導入して pure テーマを適用します。まずは公式リポジトリをクローン。

```sh
❯ git clone --recursive https://github.com/sorin-ionescu/prezto.git "${ZDOTDIR:-$HOME}/.zprezto"
```

.zshrc などの設定ファイルは ~/.zprezto/runcoms/ 内に。設定ファイルへのシンボリックリンクを作成します。

```sh
❯ setopt EXTENDED_GLOB
❯ for rcfile in "${ZDOTDIR:-$HOME}"/.zprezto/runcoms/^README.md(.N); do
  ln -s "$rcfile" "${ZDOTDIR:-$HOME}/.${rcfile:t}"
done
```

すでにファイルが存在していて、

```sh
ln: /Users/takenorioshima/.zlogin: File exists
ln: /Users/takenorioshima/.zlogout: File exists
ln: /Users/takenorioshima/.zpreztorc: File exists
ln: /Users/takenorioshima/.zshenv: File exists
ln: /Users/takenorioshima/.zprofile: File exists
ln: /Users/takenorioshima/.zshrc: File exists
```

などとエラーになる場合は削除 or 退避させてから再度実行しましょう。

```sh
# 設定ファイルを一旦削除
❯ rm -rf .zlogin .zlogout .zpreztorc .zshenv .zprofile .zshrc

# 改めて
❯ setopt EXTENDED_GLOB
❯ for rcfile in "${ZDOTDIR:-$HOME}"/.zprezto/runcoms/^README.md(.N); do
  ln -s "$rcfile" "${ZDOTDIR:-$HOME}/.${rcfile:t}"
done
```

.zpreztorc (実体は `~/.zprezto/runcoms/zpreztorc` ) でテーマを指定します。今回も pure 。

```diff-sh:~/.zpreztorc:
  # Set the prompt theme to load.
  # Setting it to 'random' loads a random theme.
  # Auto set to 'off' on dumb terminals.
- zstyle ':prezto:module:prompt' theme 'sorin'
+ zstyle ':prezto:module:prompt' theme 'pure'
```

## asdf のパスを追加

.zshrc (実体は `~/.zprezto/runcoms/zshrc` ) に asdf のパスも追記しておきます。

```diff-sh:~/.zshrc
+ # asdf
+ export PATH="${ASDF_DATA_DIR:-$HOME/.asdf}/shims:$PATH"
```

これでほぼほぼの環境構築作業は完了です。今回もまっさら・さっぱり・スッキリ 🧹
