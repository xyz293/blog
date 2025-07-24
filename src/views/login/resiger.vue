<script setup>
import { onMounted, onUnmounted, ref, reactive } from 'vue'
import { getUserInfo, register } from '../../api/user'
import { useRouter } from 'vue-router'


defineOptions({
  name: 'RegisterForm'
})

const router = useRouter()
const main = ref(null)
const user = reactive({
  username: '',
  password: '',
  code: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'change' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'change' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { min: 6, message: '长度不能小于 6 个字符', trigger: 'change' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '密码只能包含字母、数字和下划线', trigger: 'change' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'change' }
  ]
}

const register_data = async () => {
  try {
    await main.value.validate()
    const res = await register(user.username, user.password, user.code)
    if (res.data.code === 200) {
      router.push('/login')
    } else {
      alert(res.data.msg || '注册失败')
    }
  } catch (err) {
    console.error('注册失败:', err)
  }
}

const get_data = async () => {
  const res = await getUserInfo(user.username)
  console.log(res)
  console.log(user.username)
}

// 粒子动画部分
const canvasRef = ref(null)
let ctx = null
let particles = []
let animationId = null
const PARTICLE_COUNT = 80

function initParticles(width, height) {
  particles = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.3,
    })
  }
}

function drawParticles(width, height) {
  ctx.clearRect(0, 0, width, height)
  // 星空蓝色点和线
  ctx.fillStyle = '#a2b9ff'
  ctx.strokeStyle = 'rgba(162, 185, 255, 0.15)'
  ctx.lineWidth = 1

  particles.forEach(p => {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(162, 185, 255, ${p.alpha})`
    ctx.fill()
  })

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 120) {
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }
}

function animate() {
  const width = ctx.canvas.width
  const height = ctx.canvas.height

  particles.forEach(p => {
    p.x += p.vx
    p.y += p.vy

    if (p.x < 0 || p.x > width) p.vx = -p.vx
    if (p.y < 0 || p.y > height) p.vy = -p.vy
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

<template>
  <div class="login-container">
    <!-- 星空粒子背景 -->
    <canvas ref="canvasRef" class="particles-bg"></canvas>

    <div class="login-form form-card">
      <div class="login-title">欢迎注册系统</div>
      <el-form label-width="80px" status-icon :model="user" :rules="rules" ref="main">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" clearable v-model="user.username" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" show-password clearable v-model="user.password" />
        </el-form-item>

        <el-form-item prop="code" label="验证码" class="captcha-item">
          <el-input
            placeholder="请输入验证码"
            clearable
            style="flex: 1; min-width: 0;"
            v-model="user.code"
          />
          <el-button type="primary" class="captcha-btn" @click="get_data">获取验证码</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="full-width-btn" @click="register_data">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.particles-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  /* 星空深蓝渐变背景 */
  background: linear-gradient(135deg, #0b1a3f 0%, #1e2a72 70%, #141c3e 100%);
}

.login-container {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #0b1a3f 0%, #1e2a72 70%, #141c3e 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #d0d9ff;
}

.login-form {
  position: relative;
  z-index: 1;
  width: 400px;
  padding: 40px 35px;
  background-color: rgba(20, 32, 70, 0.85);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(10, 30, 80, 0.9);
  animation: fadeInUp 0.6s ease-out;
}

.login-title {
  text-align: center;
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #a2b9ff;
}

.el-form-item {
  margin-bottom: 25px;
  transition: all 0.3s ease;
  color: #cbd6ff;
}

.el-form-item:hover {
  transform: scale(1.01);
}

.el-input__wrapper {
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px #4a72d0;
  transition: box-shadow 0.3s, border-color 0.3s;
  background-color: #162a66;
  color: #d0d9ff;
}

.el-input__wrapper:hover {
  box-shadow: inset 0 0 0 1.5px #8ea9ff;
}

.el-input__inner {
  height: 40px;
  font-size: 15px;
  background-color: transparent;
  color: #d0d9ff;
}

.el-input.is-focus .el-input__wrapper {
  box-shadow: inset 0 0 0 2px #8ea9ff;
}

.el-form-item.is-error .el-input__wrapper {
  box-shadow: inset 0 0 0 2px #ff6b6b;
}

.el-form-item__error {
  color: #ff6b6b;
  font-size: 12px;
  margin-top: 4px;
  padding-left: 2px;
  transition: opacity 0.3s;
}

.el-button {
  height: 42px;
  font-weight: bold;
  font-size: 16px;
  border-radius: 8px;
  background: linear-gradient(to right, #5a7cf4, #a2b9ff);
  transition: background 0.3s ease, transform 0.2s;
  box-shadow: 0 6px 16px rgba(90, 124, 244, 0.6);
  width: auto;
  padding: 0 20px;
  color: white;
  user-select: none;
  cursor: pointer;
}

.el-button:hover {
  background: linear-gradient(to right, #8ea9ff, #c4d1ff);
  transform: scale(1.05);
}

.el-button.is-loading {
  opacity: 0.7;
  pointer-events: none;
}

.full-width-btn {
  width: 90%;
}

.captcha-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
