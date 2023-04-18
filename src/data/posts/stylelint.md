---
title: "Sass のリンター/フォーマッターは Stylelint だけで良いのかもしれない"
excerpt: "きれいな Sass を書くために、Stylelint + Prettier の組み合わせがよく紹介されていますが、改めて設定してみると「Sass は Stylelint にお任せで十分かも」と思ったので、導入・設定メモを残しておきます。"
coverImage: "/assets/blog/stylelint/cover.jpg"
date: "2022-12-24"
tags: ["programming"]
---

きれいな Sass を書くために、Stylelint + Prettier の組み合わせがよく紹介されていますが、改めて設定してみると「Sass は Stylelint にお任せで十分かも」と思ったので、導入・設定メモを残しておきます。

## 環境

- macOS 12.6
- VS Code 1.73.1
- yarn 1.22.19

## yarn でのインストール

Stylelint とルールセットを yarn でプロジェクトディレクトリに追加します。今回は CSS プロパティも自動的に並び替えて欲しいので、Twitter Bootstrap の SCSS ルールセットも追加します。

- Stylelint
- ルールセットを 2 つ
  - stylelint-config-standard-scss
  - stylelint-config-twbs-bootstrap

```
❯ yarn add -D stylelint stylelint-config-standard-scss stylelint-config-twbs-bootstrap
```

Stylelint は 14.14.1 がインストールされました。

```
❯ yarn stylelint -v
14.14.1
```

## VS Code の拡張機能をインストール

Stylelint 公式の拡張機能 をインストールします。タキシードが・とても・すてきだ。

```
❯ code --install-extension stylelint.vscode-stylelint
```

Stylelint の設定ファイルを追加
プロジェクトディレクトリ( = package.json と同じ階層) に .stylelintrc を作成し、json で利用するルールセットを指定します。

```
{
  "extends": [
    "stylelint-config-twbs-bootstrap",
    "stylelint-config-standard-scss"
  ]
}
```

## VS Code の設定ファイルを調整

- VS Code の SCSS のリンターを無効にする
- VS Code の CSS のリンターを無効にする
- 拡張子 .scss が Stylelint の対象になるように追加
- ファイル保存時に自動整形する
- .scss のフォマッターを Stylelint にする ( Prettier との競合を回避 )

※ Stylelint に関係する項目のみ抽出しています。

```
{
  "scss.validate": false,
  "css.validate": false,
  "stylelint.snippet": ["scss"],
  "stylelint.validate": ["scss"],
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  },
  "[scss]": {
    "editor.defaultFormatter": "stylelint.vscode-stylelint"
  },
}
```

## 動作確認

めためたなインデント・プロパティ名の typo・不正な単位・大文字の混入を含めて、リンターが指摘してくれるか検証します。

```
.sample {
pading: 0pxl 0.25rem 0 0;
  line-height: 1;font-size: 10px;
    display: block;
margin: 0 1rem 0 0;
i  {
    font-SIZE: 2rem;
   }
}
```

↓ エラーを修正し、保存。プロパティの並び替え・小文字への置換・インデントの調整などが自動的に行われることを確認します。

```
.sample {
  display: block;
  padding: 0 0.25rem 0 0;
  margin: 0 1rem 0 0;
  font-size: 10px;
  line-height: 1;

  i {
    font-size: 2rem;
  }
}
```

とても・きれいで・気持ちが・いい。
