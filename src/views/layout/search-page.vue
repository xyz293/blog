<script setup>
import {onMounted,ref} from 'vue'
import {useRoute} from 'vue-router'
import {search} from '../../api/artcrile'
const route = useRoute()    
const text =route.params.detail
const get_text=async()=>{
    const res = await search(text)
    console.log(res)
    list.value = res.data.data
}

onMounted(()=>{
    get_text()
   
})
import {useRouter} from 'vue-router'
const router = useRouter()
const list = ref([])
const handleClick = async (id) => {
    router.push(`/detail/${id}`)
}
</script>
<template>

    <div class="articles">
      <p
        v-for="item in list"
        :key="item.id"
        v-html="item.articleTitle"
        class="article-item"
        @click="handleClick(item.id)"
      ></p>
    </div>

</template>

<style scoped>
.article-container {
  max-width: 900px;
  margin: 20px auto 40px;
  padding: 0 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #e0e6ff;
  user-select: none;
}

/* 标签列表 */
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.tag {
  background: linear-gradient(135deg, #7a8cff, #aebaff);
  color: #1a264d;
  padding: 6px 18px;
  border-radius: 24px;
  font-weight: 600;
  font-size: 15px;
  box-shadow: 0 0 10px #8499ffaa;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.tag:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px #7687ffdd;
}

/* 文章列表容器 */
.articles {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* 文章条目 */
.article-item {
  background: linear-gradient(135deg, rgba(30, 30, 50, 0.7), rgba(50, 50, 80, 0.8));
  padding: 20px 28px;
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(40, 48, 110, 0.5);
  font-size: 20px;
  line-height: 1.5;
  color: #c5cee0;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: text;
  word-break: break-word;
}

.article-item:hover {
  background: linear-gradient(135deg, rgba(90, 100, 160, 0.8), rgba(110, 120, 190, 0.9));
  box-shadow: 0 8px 30px rgba(90, 100, 180, 0.8);
  transform: translateX(12px) scale(1.03);
}

/* 内嵌标签样式 */
.article-item span {
  color: #f47166;
  font-weight: 700;
}

.article-item em {
  color: #66ccff;
  font-style: italic;
}

.article-item b {
  color: #ffe066;
  font-weight: 700;
}

.article-item strong {
  color: #ff9966;
  font-weight: 700;
}

/* 响应式适配 */
@media (max-width: 720px) {
  .article-container {
    padding: 0 12px;
  }

  .tag-list {
    justify-content: center;
    gap: 8px;
  }

  .tag {
    font-size: 13px;
    padding: 5px 14px;
  }

  .article-item {
    font-size: 18px;
    padding: 16px 20px;
  }
}
</style>
