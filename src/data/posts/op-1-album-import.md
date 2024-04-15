---
title: "Teenage Engineering OP-1 の Album に PC から mp3 / m4a / aif を流し込みたい"
excerpt: "もう実時間またない。OP-1 の Album に PC から mp3 / m4a / aif を読み込ませる方法"
date: "2022-12-27"
tags: ["music"]
---

Teenage Engineering OP-1 には「Album」という機能があります。

- レコードを模した A 面・B 面が用意されている
- テープ再生・リアルタイムでの演奏・外部入力(ラインイン)をリアルタイムで録音できる
- A 面・B 面、それぞれ 6 分まで録音できる

という「マスターレコーダー」的な機能で、思いついたスケッチの記録などに外部レコーダーが別途不要で、大変便利です。

外部入力(ラインイン)も録音できることから、

- PC の出力を OP-1 の外部入力(ラインイン)へ接続
- Album で録音開始・PC で音源再生開始
- 実時間待つ 😇

でオケを録音するなどして、ライヴなどでのポン出しにも使っています。

## 本当は怖い OP-1 Album の UI

この Album 機能の PLAY 操作はいつだってドキドキです。PLAY ボタンと REC ボタンが隣り合わせになっており、REC ボタンを押した瞬間に **Album の内容が削除され新規録音が始まる**ためです。鬼の UI ッ...！

![Album UI](/assets/blog/op-1-album-import/ui.jpg)

誤って REC ボタンを押して録音内容が削除された結果、「ラインインを繋いでオケを録音し直す(実時間待つ 😇)」な経験が複数回ある私。REC 操作は Shift + REC など冗長なキーアクションとして欲しいものです。

## PC から 音源ファイル を流し込めれば良いのに

OP-1 は USB Mass Storage として振る舞えるので、「PC から音源ファイルを転送すれば良いのでは？」と考えますが、

- 44.1kHz/16bit の aif
- ファイル名は side_a.aif もしくは side_b.aif
- 長さは **6 分 ジャスト**

でないと転送後のリブート時に不正なデータとして受け付けてもらえません(空のファイルが生成され、上書きされる)。
つまり 2 分の曲でも「(無音を含めて)6 分ジャストの長さ」のデータを用意する必要があります。

## ffmpeg で OP-1 Album の仕様に合わせた aif を生成する

[ffmpeg](https://ffmpeg.org/) でいい感じに生成できました。2 行目の入力ファイルのパス・4 行目の出力ファイル名は適宜調整してください。

```sh {2,4} showLineNumbers
❯ ffmpeg \
  -i path-to-your-source.mp3 \
  -af "apad=whole_dur=00:\06:\00" -acodec pcm_s16le \
  side_a.aif
```

生成された side_a.aif (または side_b.aif ) を USB Mass Storage モードで OP-1 に転送しリブートすると、Album として読み込まれます。
