---
title: "Next.js + Markdown なブログで Prism.js を使ってコードハイライティングしたい"
excerpt: "Next.js + Markdown なブログで Prism.js を使ってコードハイライティングしたい"
coverImage: "/assets/blog/stylelint/cover.jpg"
date: "2023-01-04"
author:
  name: Takenori Oshima
  picture: ""
ogImage:
  url: "/assets/blog/stylelint/cover.jpg"
---

Tailwind の prose だけだと、`pre` 内のコードがハイライト表示されずちょっとさみしい。読みやすくハイライト表示されるよう、Prism.js を導入してみた作業メモです。

## rehype-prism-plus を追加

rehype-prism もありますが、 diff 表示などもできる rehype-prism-plus を導入してみます。

```
yarn add -D rehype-prism-plus
```

## ハイライト表示用のスタイルを追加

- [Prism themes](https://github.com/PrismJS/prism-themes)からお好みのテーマの css
- rehype-prism-plus が生成する Line Number や diff の css

を組み合わせて・微調整を行って `prism.css` としてプロジェクト側から読み込みます。今回はこんな内容の css となりました。

```
import "../styles/prism.css";
```

## 表示確認

いろいろな言語やオプションを使って、表示確認を行っていきましょう。

**css**
```css
.example{
  display: flex;
  align-items: center;
  height: calc( 100vh - 2rem );
}
```

**tsx で 行番号表示 + 行のハイライト**
```tsx {1,4-6} showLineNumbers
import Item from "../../compoments/item";
import React, { useEffect } from "react";

type Props = {
  item: Item;
};

export default function Example({item}: Props) {
  useEffect(() => {
    console.log('This is Example');
  }, []);

  return (
    <>
      <div className="example-class">
        <Item content={item.content} />
      </div>
    </>
  );
}
```

**json で diff**
```diff-json
 {
   "private": true,
   "scripts": {
     "dev": "next",
-    "build": "next build",
+    "build": "next build && next export",
     "start": "next start",
     "typecheck": "tsc"
   },
   "dependencies": {
     "next": "latest",
     "react": "^18.2.0",
     "react-dom": "^18.2.0",
     "typescript": "^4.7.4"
   },
   "devDependencies": {
     "@types/react": "^18.0.15",
     "@types/react-dom": "^18.0.6",
   },
   "browserslist": [
     "defaults"
   ]
 }
```

**php**

```php:test.php
<?php
/**
 * Example function.
 * 
 * @param $name string
 * @return void
 */
function the_example_function ($name = '' ){
  echo 'My name is' + $name + '';
}
```

良い感じ！ですが、

- ファイル名・言語名の表示
- コピーボタン

も欲しくなりますね。

## ファイル名の表示