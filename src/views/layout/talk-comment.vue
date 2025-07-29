<script setup>
import { ref ,onMounted} from 'vue'
import {get_comment} from '../../api/talk'
const commentList = ref([])
defineProps({
    isshow:Boolean
})
const artcrile = ref(false)
const show_comment=async ()=>{
    const res = await get_comment()
    console.log(res.data.data.recordList)
     commentList.value = res.data.data.recordList
    if(commentList.value != null){
       artcrile.value = true
    }
    else {
      artcrile.value = false
    }
}
onMounted(()=>{
    show_comment()
})

// 评论内容
const commentText = ref('')
const emit = defineEmits(['submit'])
// 提交评论方法
const submitComment = () => {
   emit('submit', false)
}
</script>

<template>
  <div class="comment-container" v-if="isshow">
    <div class="comment-form"> 
        <el-input
        v-model="commentText"
        type="textarea"
        :rows="4"
        placeholder="说点什么吧..."
        class="comment-textarea"
      />
      <el-button
        type="primary"
        round
        class="submit-btn"
        @click="submitComment"
      >
        提交评论
      </el-button>
    </div>
    <div class="comment-header">
      <h3>评论列表</h3>
      <el-form  v-if="artcrile">
        <el-form-item v-for="item in commentList" :key="item.id">
         <p>
            {{ item.commentText }}
         </p>
        </el-form-item>
      </el-form>
      <p v-else>暂无评论o_o</p>
    </div>
  </div>
</template>

<style scoped>
.comment-container {
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  background: rgba(26, 31, 58, 0.95); /* 和父组件一致 */
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(100, 120, 255, 0.15);
  display: flex;
  flex-direction: column;
  color: #dce6ff; /* 默认文字变浅蓝 */
}

/* 评论输入区域 */
.comment-form {
  background: rgba(36, 41, 78, 0.95);
  border-radius: 16px 16px 0 0;
  box-shadow: 0 2px 12px rgba(64, 158, 255, 0.10);
  padding: 28px 32px 18px 32px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* 输入框 */
.comment-textarea :deep(.el-textarea__inner) {
  border-radius: 10px;
  border: 1.5px solid #4455aa;
  font-size: 16px;
  padding: 14px;
  background: rgba(240, 243, 255, 0.95); /* 浅底 */
  color: #222;
  transition: border-color 0.3s;
}

.comment-textarea :deep(.el-textarea__inner):focus {
  border-color: #66aaff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.10);
  outline: none;
}

/* 按钮 */
.submit-btn {
  align-self: flex-end;
  padding: 9px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
  background: linear-gradient(90deg, #7488ff 60%, #66b1ff 100%);
  color: #fff;
  border: none;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.10);
  transition: background 0.3s, box-shadow 0.3s;
  margin-top: 4px;
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(90deg, #66b1ff 60%, #7488ff 100%);
  box-shadow: 0 4px 16px rgba(64, 158, 255, 0.18);
}

/* 评论列表 */
.comment-header {
  background: rgba(26, 31, 58, 0.95); /* 统一背景色 */
  border-radius: 0 0 16px 16px;
  box-shadow: 0 2px 12px rgba(64, 158, 255, 0.06);
  padding: 24px 32px 10px 32px;
  margin-top: 0;
}

.comment-header h3 {
  margin-bottom: 20px;
  color: #aabbff;
  font-size: 21px;
  font-weight: 700;
  letter-spacing: 1px;
}

/* 评论内容样式 */
.el-form-item p {
  background: rgba(44, 51, 92, 0.9); /* 比整体背景稍浅 */
  border-radius: 14px;
  padding: 16px 18px;
  margin: 0;
  color: #e0e6ff;
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.10);
  border: 1.5px solid rgba(80, 100, 200, 0.5);
  word-break: break-all;
  line-height: 1.7;
}

/* 手机端适配 */
@media (max-width: 700px) {
  .comment-container {
    max-width: 98vw;
    padding: 0;
  }
  .comment-form, .comment-header {
    padding: 14px 4vw;
  }
  .comment-header h3 {
    font-size: 18px;
  }
  .el-form-item p {
    font-size: 15px;
    padding: 12px 10px;
  }
}
</style>
