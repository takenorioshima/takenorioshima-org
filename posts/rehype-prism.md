---
title: "Next.js + Markdown なブログで Prism.js を使ってコードハイライティングしたい"
excerpt: "Next.js + Markdown なブログで Prism.js を使ってコードハイライティングしたい"
date: "2023-01-04"
modifiedDate: "2023-08-14"
tags: ["programming"]
---

Next.js + Markdown なブログで、Tailwind の prose だけだと、`pre` 内のコードがハイライト表示されずちょっとさみしい。読みやすくハイライト表示されるよう、Prism.js を導入してみた作業メモです。

## やりたいこと

![Before / After](/images/rehype-prism/before-after.png)

## rehype-prism-plus・rehype-code-titles の追加

rehype-prism もありますが、

- diff や 行番号も表示するために rehype-prism-plus
- ファイル名を表示するために rehype-code-titles

を導入してみます。

```sh
yarn add -D rehype-prism-plus rehype-code-titles
```

## Markdown から html への変換処理に上記プラグインを追加

このサイトの場合は [src/lib/markdownToHtml.ts](https://github.com/takenorioshima/takenorioshima-org/blob/main/src/lib/markdownToHtml.ts) で Markdown から html への変換処理をしているので、ここに処理を追加します。

```diff-ts:src/lib/markdownToHtml.ts
  import { unified } from "unified";
  import remarkParse from "remark-parse";
  import remarkRehype from "remark-rehype";
  import rehypeStringify from "rehype-stringify";
  import rehypeSlug from "rehype-slug";
  import rehypeRaw from "rehype-raw";
+ import rehypePrism from "rehype-prism-plus";
+ import rehypeCodeTitles from "rehype-code-titles";

  export default async function markdownToHtml(markdown: string) {
    const result = await unified()
      .use(remarkParse)
      .use(remarkRehype, { allowDangerousHtml: true })
+     .use(rehypeCodeTitles)
+     .use(rehypePrism)
      .use(rehypeRaw)
      .use(rehypeStringify)
      .use(rehypeSlug)
      .process(markdown);
    return result.toString();
  }
```

## ハイライト表示用のスタイルを追加

- [Prism themes](https://github.com/PrismJS/prism-themes)からお好みのテーマの css
- rehype-prism-plus が生成する Line Number や diff の css

を組み合わせて・微調整を行って \_app.tsx から `prism.css` としてプロジェクト側から読み込みます。

```tsx:src/pages/_app.tsx
import "../styles/prism.css";
```

このサイトでは最終的にこんな内容の [css](https://github.com/takenorioshima/takenorioshima-org/blob/main/src/styles/prism.css) になりました。

## 表示確認

いろいろな言語やオプションを使って、表示確認を行っていきましょう。

**css**

```css
.example {
  display: flex;
  align-items: center;
  height: calc(100vh - 2rem);
}
```

**tsx で 行番号表示 + 行のハイライト**

```tsx {1,4-6} showLineNumbers
import Header from "../header";
import Footer from "../footer";
import Item from "../../compoments/item";
import React, { useEffect } from "react";

type Props = {
  item: Item;
};

export default function Example({ item }: Props) {
  useEffect(() => {
    console.log("This is Example");
  }, []);

  return (
    <>
      <Header />
      <div className="example-class">
        <Item content={item.content} />
      </div>
      <Footer />
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

```php:functions.php
<?php
/**
 * Example function.
 *
 * @param $name string
 * @return void
 */
function the_example_function( $name = '' ){
  echo 'My name is' + $name + '!';
}
```

とても・良い感じに・なりました。
