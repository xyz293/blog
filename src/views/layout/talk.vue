<template>
  <div class="talk-page">
    <div class="stars-bg"></div>

    <div class="talk-container">
      <div class="talk-card" v-for="item in talks" :key="item.id">
        <div class="avatar">
          <img
            :src="item.avatar"
            alt="头像"
          />
        </div>

        <div class="content">
          <div class="header" @click="handleClick(item.id)">
            <span class="nickname">{{item.nickname}}</span>
            <time class="time">{{item.createTime}}</time>
          </div>

          <p class="talk-text">{{item.talkContent}}</p>

          <!-- ✅ 右下角按钮 -->
          <el-button class="like-btn"  type="danger" size="mini" :icon="Delete" @click="del(item.id)"></el-button>

          <div class="footer">
            <span class="likes">👍 {{item.likeCount}}</span>
            <span class="comments">💬 {{item.commentCount}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ✅ 右下角添加按钮 -->
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
import { ref, onMounted } from "vue";
import { get_talk } from '../../api/talk'
import { useRouter } from 'vue-router'
import {del_talk} from '../../api/talk'
const router  = useRouter()
const talks = ref([])
const del =async(id)=>{
  const res= await del_talk(id)
  console.log(res)
  console.log(id)
  get_talk_list()
}

const handleAddTalk=()=>{
  router.push('/add_talk')
}

const handleClick =(id)=>{
  router.push(`/talk/${id}`)
}

const get_talk_list=async()=>{
  const res = await get_talk()
  talks.value = res.data.data.recordList
  console.log(res.data.data.recordList)
}

onMounted(()=>{
  get_talk_list()
})
</script>

<style scoped>
.talk-page {
  position: relative;
  min-height: 100vh;
  background: #0d0d25;
  overflow: hidden;
  padding: 40px 20px;
}

.stars-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://cdn.pixabay.com/photo/2017/08/06/22/01/galaxy-2590582_1280.jpg') no-repeat center;
  background-size: cover;
  opacity: 0.3;
  z-index: 0;
}

/* ✅ 每个说说卡片 */
.talk-container {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.talk-card {
  position: relative;   /* ✅ 让 like-btn 可以用 absolute 定位 */
  display: flex;
  background: rgba(30, 36, 60, 0.9);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 0 12px #4455aa88;
  color: #dce6ff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.talk-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(100, 120, 255, 0.3);
}

/* ✅ 头像 */
.avatar img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 16px;
  border: 2px solid #4455aa;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 35px; /* ✅ 预留按钮的空间 */
}

/* ✅ 点赞按钮固定右下角 */
.like-btn {
  position: absolute;
  right: 10px;
  bottom: 5px;
  padding: 2px 8px;
  font-size: 12px;
  z-index: 2;
}

/* ✅ 页面的右下角按钮 */
.button-wrapper {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.nickname {
  font-weight: 700;
  font-size: 18px;
  color: #aabbff;
}

.time {
  font-size: 12px;
  color: #8899cc;
  font-style: italic;
}

.talk-text {
  font-size: 16px;
  line-height: 1.5;
  margin: 8px 0 12px;
}

.footer {
  font-size: 14px;
  color: #aabbffcc;
  display: flex;
  gap: 16px;
}
</style>
