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
    <div>
        
       <p v-for="item in list" :key="item.id" :style="{marginLeft:'400px'}" v-html=" item.articleTitle"
        class="article-item"
        @click = "handleClick(item.id)"
       ></p>
    </div>
</template>
<style>
.article-item {
  margin: 12px 0;
  margin-left: 400px;
  padding: 12px 20px;
  max-width: 800px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(40, 40, 40, 0.5));
  color: #f0f0f0;
  font-size: 20px;
  font-family: 'Segoe UI', sans-serif;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
}

.article-item * {
  color: inherit;
}

/* 🌈 常见标签美化 */
.article-item span {
  color: #f47466;
  font-weight: bold;
}

.article-item em {
  color: #66ccff;
  font-style: italic;
}

.article-item b {
  color: #ffe066;
  font-weight: bold;
}

.article-item strong {
  color: #ff9966;
  font-weight: bold;
}

.article-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateX(10px) scale(1.02);
}

</style>