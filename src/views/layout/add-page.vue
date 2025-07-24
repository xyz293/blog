<template>
  <div class="blog-homepage add-article-page">
    <header class="header">
      <div class="container">
        <h1 class="logo">星空博客 - 添加文章</h1>
      </div>
    </header>
    <main class="container main-content">
      <h2 class="section-title">添加新文章</h2>
          <!--<el-button type="warning" @click="logout" :style="{float:'right',marginTop:'10px'}">退出登录</el-button>--> 
      <el-form
        :model="form"
        :rules="rules"
        ref="formRef"
        label-width="120px"
        status-icon
        class="add-form"
        style="margin-bottom: 100px"
      >
        <el-form-item label="文章标题" prop="form.articleTitle" :rules="[
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ]">
          <el-input v-model="form.articleTitle" placeholder="请输入文章标题" />
        </el-form-item>

        <el-form-item label="文章简介" prop="form.articleDesc" :rules="[
          { required: true, message: '请输入文章简介', trigger: 'blur' }
        ]">
          <el-input
            type="textarea"
            :rows="3"
            v-model="form.articleDesc"
            placeholder="请输入文章简介"
          />
        </el-form-item>

        <el-form-item label="文章内容" prop="form.articleContent" :rules="[
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ]">
          <el-input
            type="textarea"
            :rows="8"
            v-model="form.articleContent"
            placeholder="请输入文章内容"
          />
        </el-form-item>

        <el-form-item label="文章类型" prop="articleType">
          <el-input
            v-model.number="form.articleType"
            type="number"
            placeholder="请输入文章类型（可选）"
          />
        </el-form-item>

        <el-form-item label="分类名称" prop="form.categoryName" :rules="[
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]">
          <el-input v-model="form.categoryName" placeholder="请输入分类名称" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="empty">重置</el-button>
        </el-form-item>
      </el-form>
    </main>
  </div>
</template>

<script setup>
import { ref ,reactive} from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus'
import {add_artcrile} from '../../api/artcrile'
const formRef = ref(null)
const form = reactive({
 
  articleTitle: '',
  articleDesc: '',
  articleContent: '',
  categoryName: '',
  articleCover:''
})
const rules = {
  articleTitle: [
    { required: true, message: '请输入文章标题', trigger: 'change' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'change' }
  ],
  articleDesc: [
    { required: true, message: '请输入文章描述', trigger: 'change' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'change' }

  ],
  articleContent: [
    { required: true, message: '请输入文章内容', trigger: 'change' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'change' }
  ],
  categoryName: [
    { required: true, message: '请输入分类名称', trigger: 'change' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'change' }
  ],
  articleCover: [
    { required: true, message: '请输入文章封面', trigger: 'change' },
  ]
}
const empty = () => { 
    form.articleTitle = ''
    form.articleDesc = ''
    form.articleContent = ''
    form.categoryName = ''

}



function submitForm() {
  const res =add_artcrile(form.articleTitle,form.articleDesc,form.articleContent,form.categoryName)
  if(res.status===200){
    ElMessage({
      message: '添加成功',
      type: 'success'
    })
    empty()
  }
  else{
    ElMessage({
      message: '添加失败',
      type: 'error'
    })
  }
}


</script>

<style scoped>
/* 继承博客风格，部分调整 */
.add-article-page {
  background: radial-gradient(circle at center, #0c1451 0%, #030719 90%);
  color: #dce6ff;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
}

.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  z-index: 1;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #aabbff;
  text-shadow:
    0 0 8px #6677ffcc,
    0 0 16px #aabbff88;
  user-select: none;
}

.add-form {
  background: rgba(18, 21, 54, 0.85);
  padding: 24px 28px;
  border-radius: 20px;
  box-shadow:
    inset 0 0 25px #3344ff33,
    0 0 25px #4254ff88;
  backdrop-filter: saturate(200%) blur(8px);
}

.el-form-item__label {
  color: #bbcfff;
  font-weight: 600;
  user-select: none;
}

.el-input__inner {
  background: #20255a;
  color: #dce6ff;
  border-radius: 6px;
  border-color: #4455aa;
}

.el-input__inner::placeholder {
  color: #aabfffaa;
}

.el-button--primary {
  background: linear-gradient(135deg, #8a9dff, #4960ff);
  box-shadow: 0 0 18px #647cffbb;
  border: none;
}

.el-button--primary:hover {
  background: linear-gradient(135deg, #5067ff, #8393ff);
  box-shadow: 0 0 30px 4px #a3b1ffdd;
}

.el-button {
  user-select: none;
}
</style>
