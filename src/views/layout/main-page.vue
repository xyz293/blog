<template>
  <div class="blog-homepage">
    <canvas ref="canvasRef" class="particles-canvas"></canvas>

    <header class="header">
      <div class="container">
        <h1 class="logo">星空博客</h1>
        <div class="header-top">
          <nav class="nav">
            <a href="#" class="nav-link active">首页</a>
            <a href="#" class="nav-link">分类</a>
            <a href="#" class="nav-link">关于</a>
            <a href="#" class="nav-link">联系</a>
          </nav>
          <el-input
            v-model="searchQuery"
            placeholder="搜索文章..."
            clearable
            prefix-icon="el-icon-search"
            class="search-input"
          />
          <el-button type="primary" @click="pulish">发布文章</el-button>
        </div>
      </div>
    </header>

    <main class="container main-content">
      <h2 class="section-title">最新文章</h2>
      <div class="posts-grid">
        <article
          v-for="post in filteredPosts"
          :key="post.id"
          class="post-card"
        >
          <h3 class="post-title">{{ post.title }}</h3>
          <p class="post-excerpt">{{ post.excerpt }}</p>
          <div class="post-meta">
            <time>{{ post.date }}</time>
            <div class="tags">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="tag"
              >{{ tag }}</span>
            </div>
          </div>
          <button class="read-more">阅读更多</button>
        </article>
      </div>
    </main>

    <footer class="footer">
      <div class="container">&copy; 2025 星空博客 | 版权所有</div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ElInput, ElButton } from 'element-plus'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/button/style/css'
import {useRouter} from 'vue-router'
const router = useRouter()
const pulish =()=>{
    router.push('/add')
}
const post = ref([])
//在dom加载完成后执行，后续明天写

// 粒子背景相关代码
const canvasRef = ref(null)
let ctx = null
let particles = []
let animationId = null
const PARTICLE_COUNT = 100

function random(min, max) {
  return Math.random() * (max - min) + min
}

function initParticles(width, height) {
  particles = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: random(-0.15, 0.15),
      vy: random(-0.15, 0.15),
      size: random(0.6, 2.2),
      alpha: random(0.3, 1),
      alphaChange: random(0.002, 0.008),
      growing: Math.random() > 0.5
    })
  }
}

function drawParticles(width, height) {
  ctx.clearRect(0, 0, width, height)
  particles.forEach(p => {
    if (p.growing) {
      p.alpha += p.alphaChange
      if (p.alpha >= 1) p.growing = false
    } else {
      p.alpha -= p.alphaChange
      if (p.alpha <= 0.3) p.growing = true
    }

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.shadowColor = `rgba(255,255,255,${p.alpha})`
    ctx.shadowBlur = 8
    ctx.fillStyle = `rgba(255,255,255,${p.alpha})`
    ctx.fill()
  })
}

function animate() {
  const width = ctx.canvas.width
  const height = ctx.canvas.height
  particles.forEach(p => {
    p.x += p.vx
    p.y += p.vy
    if (p.x < 0) p.x = width
    else if (p.x > width) p.x = 0
    if (p.y < 0) p.y = height
    else if (p.y > height) p.y = 0
  })
  drawParticles(width, height)
  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  const canvas = canvasRef.value
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx = canvas.getContext('2d')
  initParticles(canvas.width, canvas.height)
  animate()
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initParticles(canvas.width, canvas.height)
  })
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
})


</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');

.blog-homepage {
  position: relative;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  color: #dce6ff;
  background: radial-gradient(circle at center, #0c1451 0%, #030719 90%);
  overflow-x: hidden;
  user-select: none;
}

/* 粒子背景画布，固定全屏，置于最底层 */
.particles-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}

/* 页面内容容器，置于粒子上层 */
.container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

/* Header 样式 */
.header {
  background: rgba(18, 21, 54, 0.95);
  color: #c1d4ff;
  padding: 24px 0;
  box-shadow: 0 4px 18px rgba(17, 21, 54, 0.9);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: saturate(180%) blur(10px);
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  user-select: none;
}

.logo {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  font-weight: 700;
  color: #bbcfff;
  letter-spacing: 2px;
  text-shadow:
    0 0 6px #aabfffaa,
    0 0 12px #6677ffcc;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  flex-wrap: wrap;
  gap: 12px;
}

/* 导航菜单 */
.nav {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.nav-link {
  color: #a9bbffcc;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease, color 0.3s ease;
  padding: 8px 16px;
  border-radius: 8px;
  user-select: none;
  box-shadow: 0 0 8px transparent;
}

.nav-link:hover,
.nav-link.active {
  background-color: #3a48a6dd;
  color: #e0e7ff;
  box-shadow:
    0 0 14px 4px #5267ffdd;
}

/* 搜索输入框 */
.search-input {
  max-width: 240px;
  background: #20255a;
  border-radius: 8px;
  color: #dce6ff;
}

/* 主体内容区域 */
.main-content {
  margin: 48px 0 80px;
}

/* 章节标题 */
.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 36px;
  color: #aabbff;
  text-shadow:
    0 0 8px #6677ffcc,
    0 0 16px #aabbff88;
  user-select: none;
}

/* 文章列表网格 */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
}

/* 单篇文章卡片 */
.post-card {
  background: rgba(18, 21, 54, 0.65);
  padding: 30px 28px;
  border-radius: 20px;
  box-shadow:
    inset 0 0 25px #3344ff33,
    0 0 25px #4254ff88;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;
  cursor: pointer;
  backdrop-filter: saturate(200%) blur(8px);
}

.post-card:hover {
  box-shadow:
    inset 0 0 30px #6680ff55,
    0 0 40px 6px #7f92ffcc;
  transform: translateY(-10px);
}

.post-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 18px;
  color: #d0dbff;
  text-shadow:
    0 0 6px #8a9dffcc,
    0 0 12px #bbcfffcc;
  user-select: text;
}

.post-excerpt {
  font-size: 16px;
  line-height: 1.7;
  color: #cbd4ffcc;
  flex-grow: 1;
  user-select: text;
  letter-spacing: 0.02em;
}

.post-meta {
  margin-top: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #a2b0ffcc;
  font-style: italic;
  user-select: none;
}

.tags {
  display: flex;
  gap: 12px;
}

.tag {
  background: linear-gradient(135deg, #7488ff, #aabfff);
  color: #0e1c5a;
  padding: 5px 16px;
  border-radius: 26px;
  font-weight: 700;
  font-size: 13px;
  user-select: none;
  box-shadow:
    0 0 6px 1px #9bb2ffcc;
  text-shadow:
    0 0 6px #5a74ffcc;
}

/* 阅读更多按钮 */
.read-more {
  margin-top: 28px;
  background: linear-gradient(135deg, #8a9dff, #4960ff);
  color: white;
  border: none;
  border-radius: 14px;
  padding: 14px 28px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  align-self: flex-start;
  box-shadow:
    0 0 18px #647cffbb;
  transition:
    background-color 0.4s ease,
    box-shadow 0.4s ease;
}

.read-more:hover {
  background: linear-gradient(135deg, #5067ff, #8393ff);
  box-shadow:
    0 0 30px 4px #a3b1ffdd;
}

/* 页脚 */
.footer {
  text-align: center;
  padding: 24px 0;
  font-size: 15px;
  color: #7c8ecf;
  border-top: 1px solid #182154;
  user-select: none;
  letter-spacing: 0.03em;
}

/* 响应式适配 */
@media (max-width: 720px) {
  .nav {
    flex-wrap: wrap;
    gap: 14px;
  }
  .posts-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
