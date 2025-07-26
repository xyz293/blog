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
            >
              🌙 编辑资料
            </el-button>
          </el-card>
        </div>
      </el-main>

      <!-- 右侧栏 -->
      <el-aside width="250px" class="aside-right">
        <div class="aside-content">🌌 个人推荐</div>
      </el-aside>
    </el-container>
  </div>
</template>

<script setup>
import { get_my } from '../../api/my-detail'
import { onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
const go_talk=()=>{
  router.push('/talkfriend')
}
const router = useRouter()

const go_friend = () => {
  router.push('/friend')
}
const go_photo = () => {
  router.push('/myphoto')
}
const data_list = ref({
  avatar: '',
  username: '',
  email: '',
  id: '',
  nickname: '',
})

// 用 reactive 保存每个按钮的动画状态
const bounceStates = reactive({
  speak: false,
  collect: false,
  photo: false,
  comment: false,
  friend: false,
  edit: false,
})

function startBounce(key) {
  // 先重置，再下一个事件循环设置，保证动画每次都触发
  bounceStates[key] = false
  setTimeout(() => {
    bounceStates[key] = true
  }, 0)
}

function endBounce(key) {
  bounceStates[key] = false
}

const get_my_data = async () => {
  const res = await get_my()
  data_list.value = res.data.data
}

onMounted(() => {
  get_my_data()
})
</script>

<style scoped>
/* 左侧 aside 渐变分割线 */
.aside-left {
  border-right: 3px solid;
  border-image: linear-gradient(to bottom, #536dfe, #3a4fd6) 1;
}

/* 按钮基础样式 */
.edit-btn {
  margin-top: 16px;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  background: #536dfe;
  border-color: #536dfe;
  color: #fff;
  box-shadow: 0 4px 15px rgba(83, 109, 254, 0.4);
  transition: background 0.3s ease, border-color 0.3s ease;
  user-select: none;
  cursor: pointer;
  transform-origin: center bottom;
  will-change: transform;
}
.edit-btn:hover {
  background: #3a4fd6;
  border-color: #3a4fd6;
}

/* 动画类 */
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

/* 🌌 星空背景渐变 */
.starry-layout {
  min-height: 100vh;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  overflow: hidden;
  position: relative;
  padding: 20px;
  color: #fff;
}

/* ✨ 星空层叠效果（闪烁星星） */
.stars,
.stars2,
.stars3 {
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
  top: 0;
  left: 0;
  background: transparent;
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

@keyframes moveStars {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}

/* 左右 aside */
.aside-left,
.aside-right {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.aside-content {
  font-size: 16px;
  color: #cfd9e6;
  font-weight: 600;
}

/* 🌟 主体卡片 */
.profile-container {
  display: flex;
  justify-content: center;
  padding: 20px;
  z-index: 3;
  position: relative;
}

.profile-card {
  width: 360px;
  padding: 20px;
  border-radius: 20px;
  text-align: center;
  background: rgba(30, 35, 50, 0.85);
  border: 2px solid rgba(255, 255, 255, 0.1);
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
  border: 3px solid #fff;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
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
  color: #c1d9ff;
}
.username {
  font-size: 15px;
  color: #8ea9d3;
}

/* 🌙 信息列表 */
.info-list {
  margin-top: 10px;
  text-align: left;
  font-size: 15px;
  color: #dbe5ff;
}
.label {
  font-weight: bold;
  color: #a9c2ff;
}
</style>
