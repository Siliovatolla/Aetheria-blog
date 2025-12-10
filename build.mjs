import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

// 配置路径
const POSTS_DIR = './posts';
const OUTPUT_DIR = './dist';
const LAYOUT_FILE = './layout.html';

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 读取布局模板
const layoutTemplate = fs.readFileSync(LAYOUT_FILE, 'utf8');

// 获取所有 Markdown 文件
const postFiles = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));

// 1. 生成每篇文章页面
postFiles.forEach(file => {
  const slug = file.replace(/\.md$/, '');
  const markdownPath = path.join(POSTS_DIR, file);
  const htmlPath = path.join(OUTPUT_DIR, `${slug}.html`);

  const markdownContent = fs.readFileSync(markdownPath, 'utf8');
  const htmlContent = marked.parse(markdownContent);

  const title = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());

  const pageHtml = layoutTemplate
    .replace('{{ title }}', title)
    .replace('{{ content }}', htmlContent);

  fs.writeFileSync(htmlPath, pageHtml);
  console.log(`✅ Built: ${slug}.html`);
});

// 2. 自动生成首页 index.html
const posts = postFiles.map(file => {
  const slug = file.replace(/\.md$/, '');
  const title = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
  return { slug, title };
});

const postListHtml = posts
  .map(post => `<li><a href="${post.slug}.html">${post.title}</a></li>`)
  .join('\n');

const homeHtml = layoutTemplate
  .replace('{{ title }}', 'Aetheria Blog')
  .replace('{{ content }}', `
    <h1>Welcome to My Blog</h1>
    <p>记录刷题与技术学习的点滴。</p>
    <h2>文章列表</h2>
    <ul>
      ${postListHtml}
    </ul>
  `);

fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), homeHtml);
console.log('✅ Built: index.html');

console.log('\n🎉 构建完成！所有文件已输出到 dist/ 目录。');