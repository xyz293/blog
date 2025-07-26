<template>
  <div class="danmaku-board" :style="{ backgroundImage: `url(${photo_address})` }">
    <!-- 弹幕容器 -->
    <div class="danmaku-container" >
      <div
        class="danmaku"
        v-for="(msg, index) in messages"
        :key="index"
        :style="{ top: `${index * 50}px`, animationDuration: `${5 + Math.random() * 5}s` }"
      >
        <img  class="avatar" alt="头像" />
        <span class="text">{{ msg.username }}：{{ msg.text }}</span>
      </div>
    </div>

    <!-- 输入框 -->
    <div class="input-box">
      <input
        type="text"
        v-model="inputText"
        placeholder="说点什么吧"
        @click="showInput = true"
      />
      <button v-if="showInput"  @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import {get_message} from '../../api/message'
const show_message = async () => {
  const res = await get_message()
  console.log(res.data.data)
}

import { get_photo_list} from '../../api/photo'
const showInput = ref(false)
const sendMessage=()=>{
    showInput.value = false
}
const photo_address = ref('')
const show_photo = async ()=>{
  const res = await get_photo_list()
  console.log(res)
  const index = Math.floor(Math.random()*res.data.data.length)
  photo_address.value = res.data.data[index].imgUrl
  setTimeout(()=>{
   const index = Math.floor(Math.random()*res.data.data.length)
  photo_address.value = res.data.data[index].imgUrl
  console.log(1)
  },3000)
 
}
onMounted(()=>{
  show_photo()
  show_message()
})
const inputText = ref('')
const messages = ref([
  { username: 'shelly', text: '有人吗', avatar: 'https://i.pravatar.cc/50?img=1' },
  { username: '游客', text: '有哦', avatar: 'https://i.pravatar.cc/50?img=2' },
  { username: 'OuterCyrex', text: '太强了( ▽ )', avatar: 'https://i.pravatar.cc/50?img=3' },
  { username: 'odk-l', text: '早上好，中午好，晚上好', avatar: 'https://i.pravatar.cc/50?img=4' }
])


</script>

<style scoped>
/* 🌌 背景 */
.danmaku-board {
  position: relative;
  min-height: 100vh;
  background: url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29') no-repeat center center;
  background-size: cover;
  overflow: hidden;
  font-family: 'Microsoft YaHei', sans-serif;
  padding: 20px;
  color: #fff;
}

/* 弹幕区域 */
.danmaku-container {
  position: relative;
  width: 100%;
  height: 70vh;
  overflow: hidden;
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

  
  animation: moveLeft 1s linear infinite;
}

/* 弹幕移动动画 */
@keyframes moveLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-150vw);
  }
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
