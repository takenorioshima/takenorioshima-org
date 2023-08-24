---
title: "不良になった ProCo Rat2 のスイッチを交換したい"
excerpt: "踏んでもカチッとならず不良となったスイッチを交換しよう。"
coverImage: "/assets/blog/proco-rat-replace-switch/cover.jpg"
date: "2023-08-24"
tags: ["music"]
---

10 代のころから使い続けている ProCo Rat2。ついにスイッチが壊れてしまったので、新しいものに交換してこれからも使い続けよう、の記録です。

## 症状

スイッチを押してもカチッとならず、エフェクトの ON / OFF が切り替わらない。

<video controls autoplay loop muted src="/assets/blog/proco-rat-replace-switch/problem.mov" type="video/mp4">
Sorry, your browser doesn't support embedded videos.
</video>

## 分解

つまみやナット類を外し、基板を取り外します。時期によって様々なバリエーションがある ProCo Rat2。わたしの個体はこのような PCB・部品配置となっていました、の記録。部品が取り付けられていないパターンがあったり(R16)、パターン面に「CAPTAIN IS SMILING」の文字があったり、眺めて楽しむことができます 😀

![pcb-front](/assets/blog/proco-rat-replace-switch/pcb-front.jpg)
![pcb-back](/assets/blog/proco-rat-replace-switch/pcb-back.jpg)

オリジナルのスイッチは Carling の X ウイングのものが使われていました。基板にナット止めという、独特な固定方法でした。配線を記録し、取り外します。

![broken-switch](/assets/blog/proco-rat-replace-switch/broken-switch.jpg)

## 交換するスイッチ

今回は部品箱にストックのあった、Alpha の DPDT(双極双投)・オルタネイトなスイッチに交換します。左が取り外したオリジナルのスイッチ、右が交換するスイッチです。

![switches](/assets/blog/proco-rat-replace-switch/switches.jpg)

X ウイングなスイッチとのピン配置の比較です。このような配置で 2 回路(ピンクと緑)入っているので、対応するように配線します。

![pins](/assets/blog/proco-rat-replace-switch/pins.png)

## 配線してケースに戻す

趣味の錫メッキ線カクカク配線を行い、完成です。

![solder](/assets/blog/proco-rat-replace-switch/solder.jpg)

ケースにやさしく戻し、これからの活躍に期待します 🙂

![done](/assets/blog/proco-rat-replace-switch/done.jpg)
