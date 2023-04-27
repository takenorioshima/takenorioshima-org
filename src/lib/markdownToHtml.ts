import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeCodeTitles)
    .use(rehypePrism)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .process(markdown);
  return result.toString();
}
