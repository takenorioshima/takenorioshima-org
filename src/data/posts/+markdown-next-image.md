---
title: "Next.js + Markdown なブログ記事中の画像に next/image コンポーネントを使いたい"
excerpt: "Next.js + Markdown なブログ記事中の画像に next/image コンポーネントを使いたい"
coverImage: "/assets/blog/markdown-embed/cover.jpg"
date: "2023-04-27"
tags: ["programming"]
---

このブログサイトは Next.js + Markdown で書かれています。Markdown で画像を埋め込むと単純な img タグの出力になりますが、これを next/image コンポーネントに置き換えてパフォーマンスをよくしよう、のメモです。

## 現状

このように Markdown を書くとこのような html が出力されるところを、

```markdown
![Some Image](/assets/path/to/some/image.jpg)
```

```html
<img src="/assets/path/to/some/image.jpg" alt="Some Image" />
```

このように `<Image />` コンポーネントで出力されるようにしたい。

```js
<Image src="/assets/path/to/some/image.jpg" alt="Some Image" />
```

## Markdown 変換系で入れている現状利用している package

- remark-parse
- remark-rehype
- rehype-code-titles
- rehype-prism
- rehype-slug
- rehype-stringify

Next.js のバージョンは v13.1.0 です。

## rehype-parse, rehype-react, image-size の追加

`<Image />` コンポーネントを使うためには記事の内容を React Node に変換する必要があります。html → hast → reactNode という変換を行うため、rehype-parse と rehype-react を追加します。

また `<Image />` コンポーネントは `width`, `height` の指定が必須です。画像のサイズを取得するために、image-size を追加します。

```sh
% yarn add -D rehype-parse rehype-react image-size
```

## 実装

HTML の出力を React Node に変換する関数 `toReactNode` 、`img` タグの置き換えに使う `CutomImage` コンポーネントを追加します。

```tsx:[slug].js
const toReactNode = (content: string) => {
  return unified()
    .use(rehypeParse, {
      fragment: true,
    })
    .use(rehypeReact, {
      createElement,
      Fragment,
      components: {
        a: CustomLink,
        img: CustomImage,
      },
    })
    .processSync(content).result;
};

const CustomImage: FC<ImgHTMLAttributes<HTMLImageElement>> = ({ src = "", alt = "" }) => {
  return <Image src={src} alt={alt} />;
};
```

本文中の HTML 出力部分を書き換えて、React Node に変換します。

```diff-tsx:[slug].js
 export default function Post({ post }: Props) {
   return (
     <Layout>
       <article className="mb-20">
         <div className="prose">
-           {post.content}
+           {toReactNode(post.content)}
         </div>
       </article>
     </Layout>
   );
 }
```

`CutomImage` コンポーネントに `width` `height` の設定を追加します。

```diff-tsx:[slug].js
+ import sizeOf from "image-size";

 const CustomImage: FC<ImgHTMLAttributes<HTMLImageElement>> = ({ src = "", alt = "" }) => {
-   return <Image src={src} alt={alt} />;
+   const { width, height } = sizeOf(src);
+   const aspectRatio = width / height;
+   return <Image src={src} alt={alt} width={width} height={height} />;
 };
```
