import { useEffect, useState } from "react";

export default function useMarkdownParser(blogMarkdown){
    const [blogHtml, setBlogHtml] = useState(() => markdownToHtml(blogMarkdown))

    useEffect(() => {
        setBlogHtml(markdownToHtml(blogMarkdown))
    },[blogMarkdown])

    function markdownToHtml(blogMarkdown) {
      let blogHtml = blogMarkdown;

      const heading = /^(#{1,6})\s*(.*)$/gm;
      blogHtml = blogHtml.replace(heading, function (match, hashTags, title) {
        const count = hashTags.length;
        return `<h${count}>${title}</h${count}>`;
      });

      const bold = /\*\*(.*)\*\*/g;
      blogHtml = blogHtml.replace(bold, `<strong>$1</strong>`);

      const italics = /\*(.*)\*/g;
      blogHtml = blogHtml.replace(italics, `<em>$1</em>`);

      const listItem = /^\s*-\s*(.*)\s*\n/gm;
      blogHtml = blogHtml.replace(listItem, `<li>$1</li>`);

      const image = /!\[(.+)\]\((.+)\)/g;
      blogHtml = blogHtml.replace(image, `<img src=$2 alt=$1 class="img">`);

      const link = /\[(.+)\]\((.+)\)/g;
      blogHtml = blogHtml.replace(link, `<a href=$2 target="_blank">$1</a>`);

      const newLine = /\n/g;
      blogHtml = blogHtml.replace(newLine, `<br/>`);

      return `<div class="blog-html">${blogHtml}</div>`;
    }

    return blogHtml
}