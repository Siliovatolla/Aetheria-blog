import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const POSTS_DIR = './posts';
const OUTPUT_DIR = './dist';
const LAYOUT_PATH = './layout.html';

// 创建输出目录
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 读取模板
const layoutTemplate = fs.readFileSync(LAYOUT_PATH, 'utf8');

// 处理每篇 Markdown
for (const file of fs.readdirSync(POSTS_DIR)) {
  if (!file.endsWith('.md')) continue;

  const slug = file.replace(/\.md$/, '');
  const title = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());

  const markdown = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
  const htmlContent = marked.parse(markdown);

  let finalHtml = layoutTemplate
  .replace(`{{ title }}`, title)
  .replace(`{{ content }}`, htmlContent);

  const outputPath = path.join(OUTPUT_DIR, `${slug}.html`);
  fs.writeFileSync(outputPath, finalHtml);
  console.log(`✅ Built: ${slug}.html`);
}

console.log('\n🎉 Build complete! Check the "dist" folder.');