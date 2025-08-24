<script setup>
import {ref, reactive } from 'vue'
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

</style>
