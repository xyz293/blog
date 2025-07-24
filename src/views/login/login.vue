<script setup>
import { onMounted, onUnmounted, ref, reactive } from 'vue'
import { login } from '../../api/user'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'LoginForm'
})
const router = useRouter()
const main = ref(null)

const user = reactive({
  username: '',
  password: ''
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
  ]
}

const login_data = async () => {
  try {
    await main.value.validate()
    const res = await login(user.username, user.password)
    console.log(res)
    localStorage.setItem('token',res.data.data)
    if (res.data.code === 200) {
      router.push('/')
    } else {
      // 可自行处理失败提示，比如 Message 组件
      alert(res.data.msg || '登录失败')
    }
  } catch (err) {
    console.error('登录失败:', err)
    // 校验失败
  }
}

// 粒子动画相关
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
  ctx.fillStyle = '#bbb'
  ctx.strokeStyle = 'rgba(187,187,187,0.15)'
  ctx.lineWidth = 1

  particles.forEach(p => {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(187,187,187,${p.alpha})`
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
    <canvas ref="canvasRef" class="particles-bg"></canvas>

    <div class="login-form form-card">
      <div class="login-title">欢迎登录系统</div>
      <el-form label-width="80px" status-icon :model="user" :rules="rules" ref="main">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" clearable v-model="user.username" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" show-password clearable v-model="user.password" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="full-width-btn" @click="login_data" :style="{marginRight:'20px'}">登录</el-button>
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
  background: #f0f4ff; /* 带一点淡蓝色调，更接近星空夜晚的冷色 */
}

.login-container {
  height: 100vh;
  width: 100vw;
  background: #f0f4ff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-form {
  position: relative;
  z-index: 1;
  width: 400px;
  padding: 40px 35px;
  background-color: #ffffffdd; /* 半透明白 */
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(38, 78, 240, 0.24);
  animation: fadeInUp 0.6s ease-out;
  backdrop-filter: saturate(180%) blur(20px); /* 模糊背景，增加质感 */
}

.login-title {
  text-align: center;
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #264ef0; /* 深蓝色 */
}

.el-form-item {
  margin-bottom: 25px;
  transition: all 0.3s ease;
}

.el-form-item:hover {
  transform: scale(1.02);
}

.el-input__wrapper {
  border-radius: 8px;
  box-shadow: inset 0 0 0 1.5px #264ef0; /* 深蓝色边框 */
  transition: box-shadow 0.3s, border-color 0.3s;
  background-color: #f7faff;
}

.el-input__wrapper:hover {
  box-shadow: inset 0 0 0 2.5px #4a73ff;
}

.el-input__inner {
  height: 40px;
  font-size: 15px;
  background-color: transparent;
  color: #0a0a23;
}

.el-input.is-focus .el-input__wrapper {
  box-shadow: inset 0 0 0 3px #264ef0;
}

.el-form-item.is-error .el-input__wrapper {
  box-shadow: inset 0 0 0 2px #ff4d4f;
}

.el-form-item__error {
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 4px;
  padding-left: 2px;
  transition: opacity 0.3s;
}

.el-button {
  width: 100%;
  height: 42px;
  font-weight: 700;
  font-size: 16px;
  border-radius: 8px;
  background: linear-gradient(90deg, #264ef0 0%, #4a73ff 100%);
  transition: background 0.3s ease, transform 0.2s;
  box-shadow: 0 6px 20px rgba(38, 78, 240, 0.45);
  color: white;
  user-select: none;
}

.el-button:hover {
  background: linear-gradient(90deg, #4a73ff 0%, #264ef0 100%);
  transform: scale(1.05);
}

.el-button.is-loading {
  opacity: 0.7;
  pointer-events: none;
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
