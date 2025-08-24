/*<template>
  <div class="article-page">
    <!-- 左侧：文章内容区域 -->
    <div class="content">
      <h1 class="title">{{ articleData?.articleTitle }}</h1>
      <!-- 使用 v-html 渲染由 marked 生成的 HTML -->
      <div 
        class="markdown-content" 
        v-html="fullHtmlContent"
      ></div>
    </div>

    <!-- 右侧：侧边栏目录 -->
    <div class="sidebar">
      <h3>目录</h3>
      <nav class="table-of-contents">
        <ul>
          <!-- 遍历 tocHeadings 数组生成目录项 -->
          <li 
            v-for="heading in tocHeadings" 
            :key="heading.id"
            :style="{ marginLeft: (heading.level - 1) * 20 + 'px' }"
          >
            <!-- 点击链接，页面滚动到对应的标题 -->
            <a :href="`#${heading.id}`">{{ heading.title }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
// 1. 导入组合式 API
import { ref, onMounted } from 'vue';
// 2. 导入 marked 库
import marked from 'marked';

// 3. 定义响应式数据
// 假设这是从后端 API 获取的数据
const articleData = ref(null);
const fullHtmlContent = ref('');
const tocHeadings = ref([]);

// 4. 定义提取标题的函数
const extractHeadings = (markdownText) => {
  const headings = [];
  const lines = markdownText.split('\n');

  for (let line of lines) {
    // 跳过以 '!' 开头的行（通常是图片）
    if (line.trim().startsWith('!')) {
      continue;
    }

    // 使用正则表达式精确匹配 Markdown 标题
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const title = headingMatch[2].trim();
      // 生成唯一的 ID，用于锚点链接
      const id = title.toLowerCase()
                   .replace(/\s+/g, '-') // 空格转为连字符
                   .replace(/[^\w-]/g, ''); // 移除非字母数字或连字符的字符
      headings.push({ level, title, id });
    }
  }
  return headings;
};

// 5. 在组件挂载后执行逻辑
onMounted(async () => {
  // 模拟从后端获取数据
  // 在实际项目中，这里会是一个 fetch 或 axios 请求
  const mockResponse = {
    "flag": true,
    "code": 200,
    "msg": "操作成功",
    "data": {
      "id": 101,
      "articleTitle": "SpringCloud笔记",
      "articleCover": "https://arrange-shelly.oss-cn-chengdu.aliyuncs.com/article/a50655209fc37a653b1ebee7974a6307.png",
      "articleContent": "# 微服务\n## 一：MP补充：\n### 1.1.注解：\n![image-20240515222354043](https://i-blog.csdnimg.cn/img_convert/bca9238c56881110f4ad753af87a0e30.png)\n### 1.2.配置：\n![image-20240516152122328](https://i-blog.csdnimg.cn/img_convert/58fd0b2180377438c881a4a01c95319f.png)\n### 1.3.条件构造器：\n...\n" // 省略
    }
  };

  // 将模拟数据赋值给 articleData
  articleData.value = mockResponse.data;

  // 配置 marked 的 renderer，为标题生成 id
  const renderer = new marked.Renderer();
  renderer.heading = function(text, level) {
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    return `<h${level} id="${id}">${text}</h${level}>`;
  };

  // 2. 使用 marked 将 Markdown 转换为 HTML
  // 这会自动处理图片、代码块等所有 Markdown 语法
  fullHtmlContent.value = marked.parse(articleData.value.articleContent, { renderer });

  // 3. 从原始的 Markdown 文本中提取标题，用于生成目录
  tocHeadings.value = extractHeadings(articleData.value.articleContent);
});
</script>*/