<script setup>
import {  ref,onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { get_detail } from '../../api/artcrile'
import {likeArticle} from '../../api/artcrile'

const route = useRoute()
const id = route.params.id
const article = ref({
  articleCover: '',
  articleTitle: '',
  articleContent: ''
})
const show_detail = async () => {
  const res = await get_detail(id)
  article.value = res.data.data
  console.log(article.value)
  const likeRes = await likeArticle(id);
  console.log(likeRes);
}

onMounted(() => {
  
  show_detail()
})
</script>

 <template>
  <div class="detail-container">
    <div class="cover-wrapper">
      <img :src="article.articleCover" alt="文章封面"  />
    </div>
    <h1 class="title">{{ article.articleTitle }}</h1>
    <div class="content" v-html="article.articleContent"></div>
  </div>
</template>
<style scoped>
.detail-container {
  max-width: 900px;
  margin: 48px auto;
  padding: 40px 48px 60px;
  background: #fff9f0;
  border-radius: 20px;
  box-shadow:
    0 8px 24px rgba(255, 179, 71, 0.3),
    inset 0 0 60px rgba(255, 223, 141, 0.4);
  color: #4a4a4a;
  font-family: 'Poppins', sans-serif;
  user-select: text;
}

.cover-wrapper {
  overflow: hidden;
  border-radius: 20px;
  margin-bottom: 40px;
  box-shadow: 0 0 28px rgba(255, 165, 0, 0.4);
}

.cover-img {
  width: 100%;
  height: 380px;
  object-fit: cover;
  border-radius: 20px;
  transition: transform 0.35s ease;
}

.cover-img:hover {
  transform: scale(1.04);
  cursor: pointer;
}

.title {
  font-size: 3.2rem;
  font-weight: 800;
  margin-bottom: 36px;
  background: linear-gradient(90deg, #ffb347, #ffcc33);
  -webkit-text-fill-color: transparent;
  user-select: text;
  text-shadow: 0 2px 6px rgba(255, 165, 0, 0.4);
}

.content {
  font-size: 18.5px;
  line-height: 1.8;
  color: #555555;
  word-break: break-word;
}

.content p {
  margin-bottom: 1.3em;
}

.content ul {
  margin: 14px 0 24px 24px;
  list-style: disc;
  color: #e67300;
}

.content pre {
  background: #fff3d9;
  border-radius: 16px;
  padding: 20px;
  font-family: 'Fira Code', monospace;
  font-size: 16px;
  color: #a85f00;
  box-shadow: 0 0 20px #ffb34788;
  overflow-x: auto;
  margin-bottom: 26px;
  user-select: text;
}

.content code {
  background: #fff1b8;
  padding: 4px 8px;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  color: #a85f00;
  font-weight: 600;
}
</style>


