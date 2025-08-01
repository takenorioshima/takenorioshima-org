---
title: "ESP32 (ESP-WROOM-32) にBLE-MIDI書き込めない！の解決法"
excerpt: "格安 ESP32 ボードでつまづいたときの解決メモ"
cover: "esp32_top.jpg"
date: "2025-07-31"
tags: ["Programming"]
---

AliExpress や Amazon で手に入る格安 ESP32 ボード。便利で手軽な反面、仕様がまちまちで「何が悪いのかわからないまま動かない」という事態に陥りがちです。
わたしも BLE-MIDI の例を試していてハマってしまったので、エラーとその対処法のメモです。

## 環境

- 使用ボード：ESP32 ESP-WROOM-32（Amazon で 700 円程度で購入したもの）
- 開発環境：macOS 15.5 (24F74)、Arduino IDE 2.3.6

## ボードの外観

![Top](/assets/posts/esp32-ble-midi-upload-error/esp32_top.jpg)
![Bottom](/assets/posts/esp32-ble-midi-upload-error/esp32_bottom.jpg)

## セットアップ手順

#### ボードの追加

- Board Manager で `arduino-esp32` を追加
- ボードの選択：ESP32 Dev Module、ポートは /dev/cu.usbserial-0001

#### ライブラリの追加

- `ESP32-BLE-MIDI` (`0.3.2`) を Library Manager から追加
- 依存関係として `NimBLE-Arduino` (`2.3.2`) も追加される

## エラー内容

✅ コンパイル OK → ❌ アップロードでエラーが発生。

- エラーメッセージ(抜粋)

```cpp
BLEMidiServer.h:18:10: error: 'void BLEMidiServerClass::onConnect(NimBLEServer*)' marked 'override', but does not override
BLEMidiServer.h:19:10: error: 'void BLEMidiServerClass::onDisconnect(NimBLEServer*)' marked 'override', but does not override
exit status 1
Compilation error: exit status 1
```

## 解決方法

- Library Manager で `NimBLE-Arduino` を `1.4.3` にダウングレード
- 先に追加された `2.3.2` は自動でアンインストールされるので手動削除は不要

## 再度アップロードを試す

無事、ESP32 側に BLE-MIDI のサンプルを書き込むことができました。
