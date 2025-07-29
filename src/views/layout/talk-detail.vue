<script setup>

import {get_talk_detail} from '../../api/talk'
import {onMounted,ref} from 'vue'
import {talk_like} from '../../api/talk'
import {useRoute} from 'vue-router'
import {likeStore} from '../../stores/like'
import talkComment from './talk-comment.vue'
const likestore = likeStore()
const route = useRoute()
const isshow=ref(false)
const talk   =ref({
    nickname:'',
    avatar:'',
    talkContent:'',
    createTime:'',
    commentCount:'',
    likeCount:'',
})
const get_like=async(id)=>{
    const res = await talk_like(id)
    if(res.data.code==200){
     likestore.add_like()
     talk.value.likeCount=likestore.likeCount
    }
    console.log(res)
}
const id =route.params.id
const show_talk =async(id)=>{
    const res = await get_talk_detail(id)
    if(res.data.code==200){
        talk.value = res.data.data
        console.log(res)
    }

}
onMounted(()=>{

    show_talk(id)
})
const get_comment=()=>{
  isshow.value = true
}
const shut=(newValue)=>{
  isshow.value = newValue
}
</script>
<template>
  <div class="talk-page">
    <!-- 说说内容卡片 -->
    <div class="talk-card">
      <div class="avatar">
        <img :src="talk.avatar" alt="头像" />
      </div>
      <div class="content">
        <div class="header">
          <span class="nickname">{{ talk.nickname }}</span>
          <time class="time">{{ talk.createTime }}</time>
        </div>

        <p class="talk-text">{{ talk.talkContent }}</p>

        <!-- 图片展示 -->
        <div v-if="talk.imgList && talk.imgList.length" class="img-list">
          <img v-for="(img, index) in talk.imgList" :key="index" :src="img" class="talk-img" />
        </div>

        <!-- 底部按钮 -->
        <div class="footer">
          <button class="likes-button" @click="get_like(id)">👍 {{ talk.likeCount }}</button>
          <button class="likes-button" @click="get_comment(id)">💬 评论</button>
        </div>
      </div>
    </div>

    <!-- 评论模块（子组件） -->
    <transition name="fade-slide">
      <talkComment v-if="isshow" :isshow="isshow" @submit="shut" />
    </transition>
  </div>
</template>

<style scoped>
.talk-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column; 
  align-items: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #0d0d25, #1a1f3a);
  gap: 20px; 
}

/* 评论模块显示/隐藏动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-15px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

/* 说说卡片样式 */
.talk-card {
  width: 100%;
  max-width: 700px;
  background: rgba(26, 31, 58, 0.95);
  border-radius: 16px;
  padding: 24px 32px;
  box-shadow: 0 0 12px #4455aa88;
  color: #dce6ff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
}

.talk-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(100, 120, 255, 0.3);
}

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
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.nickname {
  font-weight: bold;
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
  margin: 8px 0 12px;
  line-height: 1.5;
}

.img-list {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.talk-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 0 6px #3344ff55;
}

.footer {
  font-size: 14px;
  color: #aabbffcc;
  display: flex;
  gap: 16px;
}

/* 按钮样式 */
.likes-button {
  background: linear-gradient(135deg, #7488ff, #aabfff);
  border: none;
  border-radius: 16px;
  padding: 6px 14px;
  color: #0e1c5a;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 0 6px 1px #9bb2ffcc;
  transition: background-color 0.3s ease;
  user-select: none;
}

.likes-button:hover {
  background: linear-gradient(135deg, #aabfff, #7488ff);
}
</style>
