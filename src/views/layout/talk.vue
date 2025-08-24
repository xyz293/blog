<template>
  <div class="talk-page">
    <!-- 🌌 背景图 -->
    <div class="stars-bg">
      <img :src="photo_address" alt="背景图" />
    </div>

    <!-- 📄 说说卡片 -->
    <div class="talk-container">
      <div class="talk-card" v-for="item in talks" :key="item.id">
        
        <!-- 👤 左边头像 -->
        <div class="avatar">
          <img :src="item.avatar" alt="头像" />
        </div>

        <!-- 📜 右边内容 -->
        <div class="content">
          <!-- 🔥 ✅ 图片内容放在最上方 -->
          <div class="talk-images" v-if="item.images && item.images.length" >
            <img 
              v-for="(img, idx) in item.images" 
              :key="idx" 
              :src="img" 
              alt="说说图片" 
              class="talk-img"
            />
          </div>

          <!-- 标题区域 -->
          <div class="header">
            <div class="info" @click ="handleClick(item.id)">
              <span class="nickname">{{ item.nickname }}</span>
              <time class="time">{{ item.createTime }}</time>
            </div>

            <!-- ✅ 删除按钮（移到这里） -->
            <el-button 
              class="delete-btn" 
              type="danger" 
              size="mini" 
              :icon="Delete" 
              @click.stop="del(item.id)">
            </el-button>
          </div>

          <!-- 文字内容 -->
          <p class="talk-text" @click ="handleClick(item.id)" >{{ item.talkContent }}</p>

          <!-- 底部信息 -->
          <div class="footer" @click ="handleClick(item.id)">
            <span class="likes">👍 {{ item.likeCount }}</span>
            <span class="comments">💬 {{ item.commentCount }}</span>
          </div>
        </div>
      </div>
    </div>
        <el-dialog
     v-model="isShow"

    title="用户登录" 
    width="360px"
    :style="{ top: '10vh' }"
    :close-on-click-modal="false"
    class="login-dialog"
  >
    <addtalk />
</el-dialog>
 <el-dialog
     v-model="loginshow"
    title="用户登录" 
    width="360px"
    :style="{ top: '10vh' }"
    :close-on-click-modal="false"
    class="login-dialog"
  >
    <login @enterregister="enter" v-if="show1"/>
    <regiser v-else :style="{top:'10vh'}"/>

</el-dialog>
    <!-- 悬浮按钮 -->
    <div class="button-wrapper">
      <el-button type="primary" class="add-button" @click="handleAddTalk">添加说说</el-button>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "TaLk"
})
import { Delete } from '@element-plus/icons-vue'
import { ref, onMounted, onUnmounted } from "vue";
import { get_talk } from '../../api/talk'
import { useRouter } from 'vue-router'
import { del_talk } from '../../api/talk'
import { get_photo_list } from '../../api/photo'
import addtalk from '../layout/add-talk.vue'
import login from '../login/login.vue'
import regiser from '../login/resiger.vue'

const isShow = ref(false)
const show1 = ref(true)

const loginshow = ref(false)
const enter=(data)=>{
  show1.value = data
}

const photo_list = ref([])
const photo_address = ref('')
const talks = ref([])
const router  = useRouter()
let timer = null
// 📌 获取背景轮播图
const show_photo = async () => { 
  const res = await get_photo_list()
  photo_list.value = res.data.data
  const index = Math.floor(Math.random() * photo_list.value.length)
  photo_address.value = photo_list.value[index].imgUrl

  timer =setInterval(() => {
    const index = Math.floor(Math.random() * photo_list.value.length)
    photo_address.value = photo_list.value[index].imgUrl
  }, 5000) // 每5秒更换一次图片
}

// 📌 删除说说
const del = async(id) => {
  const res = await del_talk(id)
  console.log(res)
  console.log(id)
  get_talk_list()
}

// 📌 添加说说
const handleAddTalk = () => {
  if(!localStorage.getItem('token')){
    loginshow.value = true

  }else{
      isShow.value = true
  }

}

// 📌 进入说说详情
const handleClick =(id)=>{
  router.push(`/talk/${id}`)
}

// 📌 获取说说列表
const get_talk_list = async() => {
  const res = await get_talk()
  talks.value = res.data.data.recordList
  console.log(res.data.data.recordList)
}

onMounted(()=>{
  get_talk_list()
  show_photo()
})
onUnmounted(() => {
  clearInterval(timer) // 清除定时器
});
</script>

<style>
.talk-page {
  position: relative;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.stars-bg img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.talk-container {
  padding: 20px;
}

.talk-card {
  display: flex;
  background: white;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.content {
  flex: 1;
  margin-left: 15px;
}

/* ✅ 图片区域放在顶部 */
.talk-images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  margin-bottom: 10px;
}

.talk-img {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.info {
  display: flex;
  flex-direction: column;
}

.nickname {
  font-weight: bold;
  font-size: 16px;
}

.time {
  font-size: 12px;
  color: #999;
}

/* ✅ 删除按钮样式 */
.delete-btn {
  margin-left: 10px;
}

.talk-text {
  margin: 8px 0;
  font-size: 14px;
  line-height: 1.6;
}

.footer {
  font-size: 13px;
  color: #666;
  display: flex;
  gap: 12px;
}

.button-wrapper {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
