import unified from "unified";
import markdown from "remark-parse";
import breaks from "remark-breaks";
import math from "remark-math";
import htmlKatex from "remark-html-katex";
import hljs from "remark-highlight.js";
import html from "remark-html";
import gh from "hast-util-sanitize/lib/github.json";
import merge from "deepmerge";

const schema = merge(gh, {
  attributes: {
    "*": ["className", "style"],
  },
});

export const markdownProcessor = unified()
  .use(markdown)
  .use(breaks)
  .use(math)
  .use(htmlKatex)
  .use(hljs)
  .use(html, { sanitize: schema });
