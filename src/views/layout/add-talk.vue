<script setup>
import { ref } from 'vue'
import {add_talk,up_avatar}  from '../../api/talk'
import {useRouter} from 'vue-router'
const router =useRouter()
const talk_list =ref({
  talkContent:'',
  isTop:0,
  status:'',
  file:null
})

const data_file =async(e)=>{
talk_list.value.file = e.target.files[0]
   const res =await up_avatar(talk_list.value.file)
   console.log(res) 
}
const up_data =async()=>{
    const res =await add_talk(talk_list.value.talkContent,talk_list.value.isTop,talk_list.value.status)
    console.log(res)

}
const check =ref(null)
const rules ={
  talkContent: [
    { required: true, message: '请输入说说内容', trigger: 'blur' },
    { min: 3, max: 500, message: '长度在 3 到 500 个字符', trigger: 'blur' }
  ],
  isTop: [
    { required: true, message: '请选择是否置顶', trigger: 'change' }
  ],
  file: [
    { required: true, message: '请上传图片', trigger: 'change' }
  ]
}
function submitForm() {
   check.value.validate((valid) => {
    if (valid) {
      up_data()
      data_file()
      router.push('/talk')
    } else {
      console.log('error submit!!');
      return false;
    }
   })
}
</script>

<template>
  <div class="form-wrapper">
    <h2 class="title">发布说说</h2>
    <div class="stars-bg"></div>
    <el-form label-position="top" class="talk-form" :model="talk_list" :rules="rules" ref= 'check'>
      <el-form-item label="说说内容" required prop="talkContent">
        <el-input
          v-model="talkContent"
          type="textarea"
          rows="5"
          placeholder="请输入说说内容"
          maxlength="500"
          show-word-limit
          clearable
        />
      </el-form-item>

      <el-form-item label="是否置顶" required>
        <el-radio-group v-model="isTop" size="medium">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item prop="file">
        <input type="file" @change="data_file" class="file-input" />
        <div v-if="statusFile" class="file-name">已选择文件: {{ statusFile.name }}</div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm" size="large" class="submit-btn">
          发布说说
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.form-wrapper {
  max-width: 480px;
  margin: 40px auto;
  padding: 32px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.12);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 24px;
  font-weight: 700;
  color: #409eff;
  user-select: none;
}

.talk-form .el-form-item {
  margin-bottom: 20px;
}
.stars-bg {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(180deg, #0b3d91 0%, #000014 100%);
  z-index: -1;
}
.stars-bg::before {
  content: '';
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  box-shadow:
    10px 20px white,
    50px 80px white,
    100px 150px white,
    200px 120px white,
    300px 60px white,
    400px 180px white,
    500px 30px white,
    600px 90px white,
    700px 140px white,
    800px 200px white;
  border-radius: 50%;
  animation: twinkle 3s infinite ease-in-out;
}

@keyframes twinkle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.file-input {
  width: 100%;
  padding: 8px 6px;
  border-radius: 6px;
  border: 1px solid #dcdfe6;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.file-input:hover {
  border-color: #409eff;
}

.file-name {
  margin-top: 8px;
  font-size: 0.9rem;
  color: #606266;
  user-select: none;
}

.submit-btn {
  width: 100%;
  font-weight: 600;
  letter-spacing: 1.2px;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #66b1ff;
}
</style>
