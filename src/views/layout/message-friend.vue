<template>
  <div class="danmaku-board">
    <!-- 背景轮播图，带左右滑动动画 -->
    <transition name="bg-slide" mode="out-in">
      <div
        :key="photo_address"
        class="bg-image"
        :style="{ backgroundImage: `url(${photo_address})` }"
      ></div>
    </transition>

    <!-- 弹幕容器 -->
    <div class="danmaku-container">
      <div
        class="danmaku"
        v-for="(msg, index) in messages"
        :key="index"
        :style="{
          top: `${Math.random() * 400}px`,
          animationDuration: `${5 + Math.random() * 5}s`
        }"
      >
        <img class="avatar" :src="msg.avatar" alt="头像" />
        <span class="text">{{ msg.nickname }}：{{ msg.messageContent }}</span>
      </div>
    </div>

    <!-- 输入框 -->
    <div class="input-box">
      <input
        v-model="message"
        type="text"
        placeholder="说点什么吧"
        @click="showInput = true"
      />
      <button v-if="showInput" @click="sendmessage">发送</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { add_message, get_message } from '../../api/message'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { get_photo_list } from '../../api/photo'

const router = useRouter()
const messages = ref([])
const message = ref('')
const username = localStorage.getItem('username')
const avatar = localStorage.getItem('avatar')
const showInput = ref(false)
const photo_address = ref('')
let photoTimer = null

const show_message = async () => {
  const res = await get_message()
  messages.value = res.data.data
}

const sendmessage = async () => {
  if (localStorage.getItem('token') == null) {
    ElMessage({ message: '请先登录', type: 'warning' })
    router.push('/login')
    return
  }
  else if (message.value == '') {
    ElMessage({ message: '请输入内容', type: 'warning' })
    return
  }
  await add_message({
    messageContent: message.value,
    name: username,
    avatar: avatar
  })

  messages.value.unshift({
    avatar,
    nickname: username,
    messageContent: message.value
  })
  message.value = ''
  showInput.value = false
}

const show_photo = async () => {
  const res = await get_photo_list()
  const photos = res.data.data
  if (!photos || photos.length === 0) return

  // 初始化一张图
  const index = Math.floor(Math.random() * photos.length)
  photo_address.value = photos[index].imgUrl

  // 轮播切换背景
  photoTimer = setInterval(() => {
    const index = Math.floor(Math.random() * photos.length)
    photo_address.value = photos[index].imgUrl
  }, 4000)
}

onMounted(() => {
  show_photo()
  show_message()
})

onUnmounted(() => {
  clearInterval(photoTimer)
})
</script>

<style scoped>
.danmaku-board {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  font-family: 'Microsoft YaHei', sans-serif;
  padding: 20px;
  color: #fff;
}

/* 背景图层 */
.bg-image {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  z-index: 0;
}

/* 轮播动画 */
.bg-slide-enter-active,
.bg-slide-leave-active {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
  z-index: 0;
}
.bg-slide-enter-from {
  transform: translateX(100%);
}
.bg-slide-enter-to {
  transform: translateX(0);
}
.bg-slide-leave-from {
  transform: translateX(0);
}
.bg-slide-leave-to {
  transform: translateX(-100%);
}

/* 弹幕容器层，叠在背景上 */
.danmaku-container {
  position: relative;
  width: 100%;
  height: 70vh;
  overflow: hidden;
  z-index: 1;
}

/* 单条弹幕 */
.danmaku {
  position: absolute;
  right: -300px;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  padding: 8px 15px;
  border-radius: 20px;
  white-space: nowrap;
  animation: moveLeft 25s linear forwards;
}

/* 弹幕飞行动画 */
@keyframes moveLeft {
  from { transform: translateX(0); }
  to { transform: translateX(-150vw); }
}

/* 头像 */
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

/* 输入框 */
.input-box {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  width: 80%;
  max-width: 600px;
  background: rgba(0, 0, 0, 0.4);
  padding: 10px;
  border-radius: 30px;
  z-index: 2;
}

.input-box input {
  flex: 1;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 16px;
  padding: 8px;
  outline: none;
}

.input-box button {
  background: #536dfe;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;
  transition: background 0.3s ease;
}
.input-box button:hover {
  background: #3a4fd6;
}
</style>
