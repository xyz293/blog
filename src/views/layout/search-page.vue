<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { search } from '../../api/artcrile'

const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})

const router = useRouter()
const datas = ref([])
const isLoading = ref(true)

// 获取文章详情
const getDetail = (id) => {
  router.push(`/detail/${id}`)
}

// 搜索文章
const searchArticle = async () => {
  if (!props.text.trim()) {
    datas.value = []
    isLoading.value = false
    return
  }

  try {
    const res = await search(props.text)
    datas.value = res.data?.data || []
  } catch (error) {
    console.error('搜索失败:', error)
    datas.value = []
  } finally {
    isLoading.value = false
  }
}

// 初始加载 & 监听 text 变化
onMounted(() => {
  searchArticle()
})

watch(() => props.text, () => {
  isLoading.value = true
  searchArticle()
})
</script>

<template>
  <div class="search-result-container">
    <!-- 加载状态 -->
    <div v-if="isLoading" class="loading">
      <p>搜索中...</p>
    </div>

    <!-- 无结果 -->
    <div v-else-if="datas.length === 0" class="no-result">
      <p>暂无相关文章</p>
    </div>

    <!-- 搜索结果列表 -->
    <article
      v-for="item in datas.slice(0, 5)"
      :key="item.id"
      class="article-item"
      @click="getDetail(item.id)"
    >
      <p class="article-title">{{ item.articleTitle }}</p>
    </article>
  </div>
</template>

<style scoped>
.search-result-container {
  padding: 20px;
  font-family: 'Microsoft YaHei', 'Segoe UI', sans-serif;
  color: #2c3e50;
  max-width: 800px;
  margin: 0 auto;
  min-height: 60px;
}

/* 单个文章项 */
.article-item {
  position: relative;
  padding: 16px 20px;
  background: #ffffff;
  border: 1px solid #dde2e8;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 14px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.article-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  border-color: #3498db;
}

.article-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #3498db, #1a7fcc);
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: 12px 0 0 12px;
}

.article-item:hover::before {
  opacity: 1;
}

/* 文章标题 */
.article-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #1f2d3d;
  line-height: 1.5;
  word-wrap: break-word;
  transition: color 0.3s;
}

.article-item:hover .article-title {
  color: #3498db;
}

/* 加载与无结果提示 */
.loading,
.no-result {
  padding: 20px;
  text-align: center;
  color: #7f8c8d;
  font-size: 15px;
  background-color: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 10px;
}

.no-result {
  font-style: italic;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .search-result-container {
    padding: 15px;
  }

  .article-item {
    padding: 14px 16px;
    border-radius: 10px;
  }

  .article-title {
    font-size: 15px;
  }
}

@media (max-width: 360px) {
  .article-item {
    padding: 12px 14px;
  }

  .article-title {
    font-size: 14.5px;
  }
}
</style>