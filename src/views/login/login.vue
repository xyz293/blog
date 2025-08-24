<script setup>
import {  ref, reactive , defineEmits} from 'vue'

import { login } from '../../api/user'



defineOptions({
  name: 'LoginForm'
})
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
const emit = defineEmits(['enterregister','enterforget'])


const handleClick = () => {
  emit('enterregister',false)
}
const handleClick1 = () => {
  emit('enterforget',false)
}


const login_data = async () => {

    const res = await login(user.username, user.password)
    console.log(res)
    localStorage.setItem('token',res.data.data)
    if (res.data.code === 200) {
      handleClick1()
    } else {
      // 可自行处理失败提示，比如 Message 组件
      alert(res.data.msg || '登录失败')
    }
}

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
  <el-button type="primary" class="login-btn" @click="login_data" :style="{marginRight:'10px'}">登录</el-button>
</el-form-item>

<el-form-item>
  <div class="links-row">
    <el-button class="btn-link" @click="handleClick">注册账号</el-button>


   <el-button class="btn-link" @click="handleClick">忘记密码</el-button>


  </div>
</el-form-item>

      </el-form>
    </div>
  </div>
</template>

<style scoped>
.links-row{
  width: 300px;
  display: flex;
  justify-content: space-between;

}
.btn-link{
  color: #409eff;
 width: 100px;

}
.login-title{
  margin:2px 40px auto;
  margin-bottom: 20px;

}
.login-btn{
   display: block;
  width: 80%;         /* 宽度 80%，留两边边距 */
  height: 40px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  background: linear-gradient(90deg, #264ef0, #4a73ff);
  border: none;
  margin: 10px auto;   /* 上下 20px，左右 auto 自动居中 */
  text-align: center;

}
</style>
