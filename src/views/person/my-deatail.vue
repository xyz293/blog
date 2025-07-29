<template>
  <div class="starry-layout">
    <div class="stars"></div>
    <div class="stars2"></div>
    <div class="stars3"></div>

    <el-container>
      <!-- 左侧导航 -->
      <el-aside width="250px" class="aside-left">
        <div class="aside-content">
          ✨
          <el-form>
            <el-form-item>
              <el-button
                type="primary"
                round
                class="edit-btn"
                :class="{ 'btn-bounce-anim': bounceStates.speak }"
                @mousedown="startBounce('speak')"
                @animationend="endBounce('speak')"
                @click="go_mytalk"
              >
                我的说说
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                round
                class="edit-btn"
                :class="{ 'btn-bounce-anim': bounceStates.collect }"
                @mousedown="startBounce('collect')"
                @animationend="endBounce('collect')"
                @click="go_talk"
              >
                留言板
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                round
                class="edit-btn"
                @click="go_photo"
                :class="{ 'btn-bounce-anim': bounceStates.photo }"
                @mousedown="startBounce('photo')"
                @animationend="endBounce('photo')"
              >
                我的相册
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                round
                class="edit-btn"
                :class="{ 'btn-bounce-anim': bounceStates.comment }"
                @mousedown="startBounce('comment')"
                @animationend="endBounce('comment')"
              >
                我的评论
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                round
                class="edit-btn"
                @click="go_friend"
                :class="{ 'btn-bounce-anim': bounceStates.friend }"
                @mousedown="startBounce('friend')"
                @animationend="endBounce('friend')"
              >
                友情关注
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-aside>

      <!-- 主体 -->
      <el-main>
        <div class="profile-container">
          <el-card shadow="hover" class="profile-card">
            <div class="avatar-box">
              <img :src="data_list.avatar" alt="头像" class="avatar-img" />
              <h2 class="nickname">{{ data_list.nickname || '星空旅行者' }}</h2>
              <p class="username">@{{ data_list.username || '新用户' }}</p>
            </div>

            <el-divider></el-divider>

            <div class="info-list">
              <p>
                <span class="label">📧 邮箱：</span>{{ data_list.email || '未填写' }}
              </p>
              <p>
                <span class="label">🆔 用户ID：</span>{{ data_list.id || '未知' }}
              </p>
            </div>

            <el-button
              type="primary"
              round
              class="edit-btn"
              :class="{ 'btn-bounce-anim': bounceStates.edit }"
              @mousedown="startBounce('edit')"
              @animationend="endBounce('edit')"
              @click="showedit"
            >
              🌙 编辑资料
            </el-button>
          </el-card>
        </div>
      </el-main>

      <!-- 右侧栏 -->
      <el-aside width="260px" class="aside-right">
        <div class="aside-edit-panel">
          <h3 class="edit-title">🌌 编辑资料</h3>

          <el-form v-if="showInput" label-position="top" class="edit-form">
            <!-- 昵称 -->
            <el-form-item label="昵称">
              <el-input v-model="nickname" placeholder="请输入新昵称"></el-input>
            </el-form-item>

            <!-- 邮箱 -->
            <el-form-item label="邮箱">
              <el-input v-model="email" placeholder="请输入新邮箱"></el-input>
            </el-form-item>

            <!-- 密码 -->
            <el-form-item label="密码">
              <el-input v-model="password" placeholder="请输入新密码" show-password></el-input>
            </el-form-item>
             <el-form-item label="邮箱">
              <el-input v-model="code" placeholder="验证码"></el-input>
              <el-button type="primary" @click="send_code">发送验证码</el-button>
            </el-form-item>


            <!-- 头像上传 -->
            <el-form-item label="上传头像">
              <input
                type="file"
                accept="image/*"
                ref="fileInput"
                style="display:none"
                @change="onAvatarChange"
              />
              <el-button type="primary" @click="triggerFileInput">选择头像</el-button>
            </el-form-item>

            <!-- 头像预览 -->
            <div class="avatar-preview" v-if="avatarPreview">
              <img :src="avatarPreview" alt="头像预览" />
            </div>

            <!-- 提交按钮 -->
            <el-form-item>
              <el-button type="primary" class="submit-btn" @click="edit_user">✨ 保存修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script setup>
import { get_my } from '../../api/my-detail'
import { onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {cahnge_nickname} from '../../api/user'
import {userStore} from '../../stores/my-data'
import {getUserInfo} from '../../api/user'
import {change_email} from '../../api/user'
import {change_password} from '../../api/user'
const userstore =userStore()

const send_code =async()=>{
  if(email.value){
   await getUserInfo(email.value)
  }
  alert('输入邮箱')
}
const go_mytalk =()=>{
  if(localStorage.getItem('token')){
    router.push('/talk')
  }
  else {
    alert('请先登录')
     router.push('/login')
  }
}
const showedit=()=>{
  if(localStorage.getItem('token')){
      showInput.value = true
  }
  else {
    alert('请先登录')
     router.push('/login')
  }

}
const edit_user=async()=>{
   await cahnge_nickname(nickname.value)
  console.log(nickname.value)
  await change_email(email.value,code.value)
  await change_password(password.value,code.value,email.value)
   showInput.value = false
   data_list.value.nickname=nickname.value
   data_list.value.email=email.value
    get_my_data()
    nickname.value=''
    email.value=''
    password.value=''
    code.value=''
}
const showInput = ref(false)
const data_list = ref({
  avatar: '',
  username: '',
  email: '',
  id: '',
  nickname: '',
})

const nickname = ref('')
const email = ref('')
const password = ref('')
const code = ref('')

const bounceStates = reactive({
  speak: false,
  collect: false,
  photo: false,
  comment: false,
  friend: false,
  edit: false,
})

function startBounce(key) {
  bounceStates[key] = false
  setTimeout(() => {
    bounceStates[key] = true
  }, 0)
}

function endBounce(key) {
  bounceStates[key] = false
}

const router = useRouter()

const go_talk = () =>{
  if(localStorage.getItem('token')){
    router.push('/talkfriend')
  }
  else {
    alert('请先登录')
     router.push('/login')
  }
}
const go_friend = () =>{
  if(localStorage.getItem('token')){
    router.push('/friend')
  }
  else {
    alert('请先登录')
     router.push('/login')
  }
}
const go_photo = () =>{
  if(localStorage.getItem('token')){
    router.push('/myphoto')
  }
  else {
    alert('请先登录')
     router.push('/login')
  }
}



const get_my_data = async () => {
  const res = await get_my()
  data_list.value = res.data.data

  // 初始化头像预览为当前头像
  avatarPreview.value = data_list.value.avatar
  userstore.change_avatar(data_list.value.avatar)
  userstore.change_username(data_list.value.nickname)
}

onMounted(() => {
  get_my_data()
})

// 头像上传相关
const fileInput = ref(null)
const avatarPreview = ref('')

function triggerFileInput() {
  fileInput.value.click()
}

function onAvatarChange(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      avatarPreview.value = event.target.result
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style scoped>
/* 🌌 页面背景：深蓝-紫色渐变星空 */
.starry-layout {
  min-height: 100vh;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  overflow: hidden;
  position: relative;
  padding: 20px;
  color: #e0e6f6;
  display: flex;
  flex-direction: column;
}

/* ✨ 星空层叠效果 */
.stars,
.stars2,
.stars3 {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: transparent;
}

/* 星空移动动画 */
@keyframes moveStars {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}
.stars {
  background: url('https://raw.githubusercontent.com/VincentGarreau/particles.js/master/demo/media/stars.png')
    repeat;
  animation: moveStars 200s linear infinite;
}
.stars2 {
  background: url('https://raw.githubusercontent.com/VincentGarreau/particles.js/master/demo/media/stars.png')
    repeat;
  animation: moveStars 400s linear infinite;
  opacity: 0.5;
}
.stars3 {
  background: url('https://raw.githubusercontent.com/VincentGarreau/particles.js/master/demo/media/stars.png')
    repeat;
  animation: moveStars 600s linear infinite;
  opacity: 0.3;
}

/* 📐 容器结构 */
.el-container {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px; /* 左右 aside 与主体的间距 */
}

/* ==================== 🟦 左右侧边栏 ==================== */
.aside-left,
.aside-right {
  width: 260px;
  padding: 25px 20px;
  background: #1f293e; /* 深蓝灰色，和左边一致 */
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
  color: #e0e6f6;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* 标题 */
.edit-title {
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 18px;
  color: #b1bfff;
  display: flex;
  align-items: center;
  gap: 8px;
  text-shadow: 0 0 8px rgba(83, 109, 254, 0.6);
}

/* 表单整体 */
.edit-form {
  width: 100%;
}

/* 表单标签 */
.el-form-item__label {
  color: #c3c9f5;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 6px;
}

/* 输入框样式 */
.el-input {
  background: #2c3a60; /* 深色输入框 */
  border-radius: 10px;
  border: none;
}
.el-input input {
  color: #e0e6f6;
  font-weight: 500;
  background: transparent !important;
}

/* 输入框聚焦效果 */
.el-input input:focus {
  outline: none;
  box-shadow: 0 0 8px #5370fe;
}

/* 头像预览 */
.avatar-preview {
  margin: 15px 0;
  display: flex;
  justify-content: center;
}
.avatar-preview img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #536dfe;
  box-shadow: 0 0 20px #7c4dffaa;
  transition: transform 0.3s ease;
}
.avatar-preview img:hover {
  transform: scale(1.1);
  box-shadow: 0 0 30px #7c4dffdd;
}

/* 保存按钮 */
.submit-btn {
  width: 100%;
  padding: 12px 0;
  font-weight: 700;
  font-size: 16px;
  border-radius: 25px;
  background: linear-gradient(90deg, #536dfe, #7c4dff);
  color: #fff;
  border: none;
  box-shadow: 0 5px 15px rgba(83, 109, 254, 0.6);
  cursor: pointer;
  transition: all 0.3s ease;
}
.submit-btn:hover {
  background: linear-gradient(90deg, #4054e8, #673ab7);
  box-shadow: 0 7px 20px rgba(124, 77, 255, 0.8);
  transform: translateY(-2px);
}

.aside-content {
  font-size: 18px;
  color: #cfd9e6;
  font-weight: 600;
  width: 100%;
  text-align: center;
}

/* ==================== 🟪 主体卡片 ==================== */
.profile-container {
  flex: 1;
  display: flex;
  justify-content: center;
  padding-top: 30px;
}
.profile-card {
  width: 380px;
  padding: 24px;
  border-radius: 20px;
  text-align: center;
  background: rgba(40, 50, 80, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s ease;
}
.profile-card:hover {
  transform: translateY(-5px);
}

/* 🌙 头像 */
.avatar-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar-img {
  width: 130px;
  height: 130px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #7ea6ff;
  box-shadow: 0 0 15px rgba(126, 166, 255, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.avatar-img:hover {
  transform: scale(1.08);
  box-shadow: 0 0 20px rgba(173, 216, 255, 0.7);
}

/* 🌙 用户名 / 昵称 */
.nickname {
  margin-top: 14px;
  font-size: 24px;
  font-weight: bold;
  color: #d1deff;
}
.username {
  font-size: 15px;
  color: #9cb4e5;
}

/* 🌙 信息列表 */
.info-list {
  margin-top: 12px;
  text-align: left;
  font-size: 15px;
  color: #dbe5ff;
}
.label {
  font-weight: bold;
  color: #a9c2ff;
}

/* ==================== 🔵 按钮 ==================== */
.edit-btn {
  margin-top: 16px;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  background: linear-gradient(45deg, #536dfe, #7c4dff);
  border: none;
  color: #fff;
  border-radius: 30px;
  box-shadow: 0 4px 12px rgba(83, 109, 254, 0.4);
  transition: background 0.3s ease, transform 0.2s ease;
}
.edit-btn:hover {
  background: linear-gradient(45deg, #4054e8, #673ab7);
  transform: translateY(-2px);
}

/* 弹跳动画 */
.btn-bounce-anim {
  animation: btn-bounce 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes btn-bounce {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(0.85);
  }
  50% {
    transform: scale(1.1);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}
</style>
