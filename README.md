# Aetheria Blog

这是一个由我亲手打造的静态博客，不依赖任何框架，仅使用 Markdown 转 HTML 的方式生成内容
主要用于记录我在刷题、学习编程和技术探索过程中的思考与笔记

## 它是怎么工作的
- 在 `posts/` 目录下撰写 Markdown 文章（.md 文件）
- 运行  `npm run build `命令，将文章生成静态 HTML 文件并输出到 `dist/ `目录
- 通过 Cloudflare Pages 自动部署上线
