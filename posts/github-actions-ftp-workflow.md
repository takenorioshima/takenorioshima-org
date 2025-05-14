---
title: "GitHub Actions を使って main ブランチの内容を ftp で自動デプロイしたい"
excerpt: "手作業による ftp をやめて、便利に自動化しよう。"
date: "2023-12-06"
modifiedDate: "2024-11-15"
tags: ["programming"]
---

GitHub Actions を使って GitHub の main ブランチに merge されたタイミングで ftp で本番環境に自動デプロイする、の設定手順です。

「GitHub でバージョン管理をしているが、本番反映は ftp クライアントソフトなどを使って都度・手動でアップロードしている」なプロジェクトに導入すると便利なので、まとめました。

## GitHub Actions の追加

[SamKirkland/FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action) を参考に進めます。プロジェクトディレクトリ配下に `/.github/workflows/main.yml` を作成し、以下を追加します。

```yml:main.yml
on:
  push:
    branches:
      - main
  workflow_dispatch:

name: 🚀 Deploy website on push
jobs:
  web-deploy:
    name: 🎉 Deploy
    runs-on: ubuntu-latest
    steps:
    - name: 🚚 Get latest code
      uses: actions/checkout@v3

    - name: 📂 Sync files
      uses: SamKirkland/FTP-Deploy-Action@v4.3.4
      with:
        server: ftp.samkirkland.com
        username: myFtpUserName
        password: ${{ secrets.ftp_password }}
```

ftp 接続情報のサーバ名・ユーザ名・リモートディレクトリも GitHub の Secrets で管理したいので + 定数はアッパースネーク表記にしたいので、以下を変更します。

```diff-yml:main.yml
 on:
   push:
     branches:
       - main
   workflow_dispatch:

 name: 🚀 Deploy website on push
 jobs:
   web-deploy:
     name: 🎉 Deploy
     runs-on: ubuntu-latest
     steps:
     - name: 🚚 Get latest code
       uses: actions/checkout@v3

     - name: 📂 Sync files
       uses: SamKirkland/FTP-Deploy-Action@v4.3.4
       with:
-        server: ftp.samkirkland.com
+        server: ${{ secrets.FTP_SERVER }}
-        username: myFtpUserName
+        username: ${{ secrets.FTP_USERNAME }}
-        password: ${{ secrets.ftp_password }}
+        password: ${{ secrets.FTP_PASSWORD }}
+        server-dir: ${{ secrets.FTP_SERVER_DIR }}
```

`package.json`や`node_modules`ディレクトリなど、本番リリース時に不要なファイル・ディレクトリがあれば除外しておきます。今回のプロジェクトの場合は最終的に以下のようになりました。

```yml:main.yml
on:
  push:
    branches:
      - main
  workflow_dispatch:

name: 🚀 Deploy website on push
jobs:
  web-deploy:
    name: 🎉 Deploy
    runs-on: ubuntu-latest
    steps:
    - name: 🚚 Get latest code
      uses: actions/checkout@v3

    - name: 📂 Sync files
      uses: SamKirkland/FTP-Deploy-Action@v4.3.4
      with:
        server: ${{ secrets.FTP_SERVER }}
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        server-dir: ${{ secrets.FTP_SERVER_DIR }}
        exclude: |
          .git*
          .git*/**
          node_modules/**
          package.json
          yarn.lock
          composer.lock
          composer.json
          vendor/**
          .vscode/**
```

## GitHub で Secrets の追加

GitHub の該当リポジトリの Settings > Secrets and Variables > Actions から New repository secrets と進み、secrets を作成します。

今回は `FTP_SERVER`・`FTP_USERNAME`・`FTP_PASSWORD`・`FTP_SERVER_DIR` の 4 つを作成しました。`FTP_SERVER_DIR` は末尾に / が必要なので注意。

![GitHub Settings](/assets/posts/github-actions-ftp-workflow/github-secrets.png)

## main に merge してみる

作成した main.yml を main ブランチに merge してみましょう。GitHub の該当リポジトリの GitHub Actions で今回作成した Workflow が走っていることが確認できます。

## ftp でも確認

ftp 接続を行なってデプロイが完了しているかを確認してみると、リモートディレクトリに `.ftp-deploy-sync-state.json` というソースコードにはないファイルが追加されていました。中身を覗いてみると各ファイルの hash が。初回以降のデプロイ時には変更のあった差分のみ転送することで、高速化と Billing Time の節約が図られていました 😃
