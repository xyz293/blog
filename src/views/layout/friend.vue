<template>
  <div class="friend-container">
    <section class="carousel-banner">
      <transition name="fade" mode="out-in">
        <img
          :src="photo_address"
          :key="photo_address"
          alt="轮播图"
          class="carousel-image"
        />
      </transition>
    </section>

    <section class="friend-page">
      <h2>友情链接</h2>
      <div class="friend-list">
        <a
          v-for="friend in friends"
          :key="friend.id"
          :href="friend.url"
          target="_blank"
          rel="noopener noreferrer"
          class="friend-card"
          :style="{ '--accent-color': friend.color }"
        >
          <div class="avatar-wrapper">
            <img :src="friend.avatar" alt="头像" class="avatar" />
            <div class="avatar-glow"></div>
          </div>
          <div class="info">
            <h3>{{ friend.name }}</h3>
            <p class="introduction">{{ friend.introduction }}</p>
            <div class="visit-btn">访问 →</div>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { get_photo_list } from '../../api/photo'
import {get_friend} from '../../api/friend'
const friends = ref([])
const show_friend=async()=>{
    const res = await get_friend()
    console.log(res.data.data)
    friends.value = res.data.data
    console.log(friends.value)
}
defineOptions({
  name: 'FriendS'
})

const photo_address = ref('')
let timerId = null

const show_photo = async () => {
  const res = await get_photo_list()
  const randomIndex = Math.floor(Math.random() * res.data.data.length)
  photo_address.value = res.data.data[randomIndex].imgUrl 
  const photos = res.data.data
  if (!photos || photos.length === 0) return

  photo_address.value = photos[0].imgUrl || photos[0].photoUrl || photos[0].url

  timerId = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * photos.length)
    photo_address.value = photos[randomIndex].imgUrl || photos[randomIndex].photoUrl || photos[randomIndex].url
  }, 4000)
}

onMounted(() => {
  show_photo()
  show_friend()
})

onUnmounted(() => {
  if (timerId) clearInterval(timerId)
})
</script>

<style scoped>
.friend-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px 60px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  user-select: none;
  color: #dde6f0;
}

/* 轮播图区域 */
.carousel-banner {
  width: 100%;
  margin-bottom: 40px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 20px #3344ffaa;
  position: relative;
  height: 280px;
}

.carousel-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
  display: block;
  border-radius: 16px;
}

/* 图片切换淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 友情链接区 */
.friend-page {
  background: linear-gradient(135deg, #0b1223, #1c2541);
  border-radius: 20px;
  box-shadow: 0 12px 40px rgb(0 0 0 / 0.5);
  padding: 40px 30px 50px;
}

.friend-page h2 {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 40px;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #f0f1f5;
  text-shadow: 0 0 8px var(--main-color, #409eff);
}

/* 友情链接列表 */
.friend-list {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
}

/* 单个友链卡片 */
.friend-card {
  position: relative;
  display: flex;
  align-items: center;
  width: 280px;
  background: linear-gradient(145deg, #202a50, #1a2240);
  border-radius: 20px;
  box-shadow:
    4px 4px 14px #15204a,
    -4px -4px 14px #2b3a7d;
  text-decoration: none;
  color: inherit;
  padding: 20px;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    background 0.3s ease;
  overflow: hidden;
}

.friend-card:hover {
  transform: translateY(-15px) scale(1.05);
  box-shadow:
    8px 8px 40px var(--accent-color),
    -8px -8px 40px var(--accent-color);
  background: linear-gradient(145deg, #25305f, #1f2b54);
}

/* 头像区 */
.avatar-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  margin-right: 20px;
  border-radius: 50%;
  overflow: visible;
  flex-shrink: 0;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--accent-color);
  box-shadow: 0 0 10px var(--accent-color);
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.friend-card:hover .avatar {
  transform: scale(1.1) rotate(10deg);
}

/* 发光环 */
.avatar-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 110px;
  height: 110px;
  background: radial-gradient(circle, var(--accent-color) 30%, transparent 80%);
  filter: blur(15px);
  transform: translate(-50%, -50%);
  opacity: 0.6;
  z-index: 1;
  transition: opacity 0.3s ease;
}

.friend-card:hover .avatar-glow {
  opacity: 1;
}

/* 文字信息区 */
.info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.info h3 {
  font-size: 1.8rem;
  margin: 0 0 8px;
  font-weight: 800;
  text-shadow: 0 0 6px var(--accent-color);
}

.introduction {
  font-size: 1.1rem;
  color: #aabbffcc;
  margin-bottom: 20px;
  line-height: 1.4;
  user-select: text;
}

/* 访问按钮 */
.visit-btn {
  align-self: flex-start;
  padding: 8px 16px;
  background: var(--accent-color);
  color: #0b0a07;
  font-weight: 700;
  border-radius: 30px;
  box-shadow: 0 4px 12px var(--accent-color);
  transition: background 0.3s ease, color 0.3s ease;
  user-select: none;
}

.visit-btn:hover {
  background: #fff;
  color: var(--accent-color);
}

/* 响应式调整 */
@media (max-width: 720px) {
  .friend-list {
    justify-content: center;
  }
  .friend-card {
    width: 90vw;
    max-width: 320px;
  }
}
</style>
