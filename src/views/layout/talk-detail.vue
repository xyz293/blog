<script setup>

import {get_talk_detail} from '../../api/talk'
import {onMounted,ref} from 'vue'
import {talk_like} from '../../api/talk'
import {useRoute} from 'vue-router'

const route = useRoute()
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
     
    talk.value.likeCount = Number(talk.value.likeCount) + 1
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
</script>
<template>
    <div></div>
  <div class="talk-page">
    <div class="talk-card" :style="{marginBottom: '400px'}">
      <div class="avatar">
        <img :src="talk.avatar" alt="头像" />
      </div>
      <div class="content">
        <div class="header">
          <span class="nickname">{{ talk.nickname }}</span>
          <time class="time">{{ talk.createTime }}</time>
        </div>

        <p class="talk-text">{{ talk.talkContent }}</p>

        <div v-if="talk.imgList && talk.imgList.length" class="img-list">
          <img v-for="(img, index) in talk.imgList" :key="index" :src="img" class="talk-img" />
        </div>

        <div class="footer">
      <button class="likes-button" @click="get_like(id)">👍 {{ talk.likeCount }}</button>
       <button class="likes-button" >💬评论</button>
        </div>
      </div>
    </div>
    <router-view></router-view>
   
  </div>
</template>

<style scoped>
.talk-page {
  min-height: 100vh;            /* 让容器高度满屏 */
  display: flex;                /* 使用flex布局 */
  justify-content: center;      /* 水平居中 */
  align-items: center;          /* 垂直居中 */
  padding: 20px;
  background: linear-gradient(135deg, #0d0d25, #1a1f3a);
}
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


.talk-card {
  width: 100%;                 /* 宽度占满容器 */
  max-width: 700px;            /* 最大宽度限制，防止太宽 */
  background: rgba(26, 31, 58, 0.95);
  border-radius: 16px;
  padding: 24px 32px;
  box-shadow: 0 0 12px #4455aa88;
  color: #dce6ff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.talk-card {
  display: flex;
  background: rgba(26, 31, 58, 0.95);
  border-radius: 16px;
  padding: 16px;
  margin: 20px auto;
  max-width: 600px;
  box-shadow: 0 0 12px #4455aa88;
  color: #dce6ff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.talk-card.top {
  border: 2px solid #6699ff;
  box-shadow: 0 0 24px #6688ffcc;
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
</style>
