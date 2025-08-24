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

</style>
