<script setup>
import { get_photo_list } from '../../api/photo'
import { onMounted, ref ,onUnmounted} from 'vue'
import {get_about} from '../../api/user'
import {get_my} from '../../api/my-detail'
const photo_list = ref([])
const photo_url = ref('')
const about = ref('')
const data=ref({})

const showphoto = async () => {
  const res = await get_photo_list()
  console.log(res)
  photo_list.value = res.data.data
}
const showabout = async () => {
  const res = await get_about()
  const res1 = await get_my()

  console.log(res)
  console.log(res1)
  data.value=res1.data.data
  about.value = res.data.data
}
let timer =null
const play = () => {
  // 确保有数据
  if (photo_list.value.length === 0) return

  // 设置第一张图（去空格）
  photo_url.value = photo_list.value[0].imgUrl.trim()

  // 开始轮播
  timer=setInterval(() => {
    const random = Math.floor(Math.random() * photo_list.value.length)
    photo_url.value = photo_list.value[random].imgUrl.trim()
  }, 3000)
}

onMounted(async () => {
  await showabout()

  await showphoto()
  play()
})
onUnmounted(()=>{
  clearInterval(timer)
})

</script>

<template>
  <div class="container">

  <div class="photo-container">
    <img :src="photo_url" alt="轮播图片" />
  </div>
  <div class="context">
    <div>
      <h2>关于我</h2>
    
      <img :src="data.avatar
" alt="">
  <p>{{data.nickname}}</p>
  <p>{{data.email}}</p>

  <p>{{about}}</p>

    </div>
 
  </div>
  </div>
</template>

<style scoped>
.container{
  margin: 0 auto;
   display: flex;
 justify-content:space-between

}
.photo-container {
  display: flex;
  justify-content: center;  /* 水平居中 */
  align-items: center;      /* 垂直居中 */
  min-height: 100vh;        /* 占满整个视口高度 */
  box-sizing: border-box;
}
 .context{
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
 }
 .context img{
  width: 200px;
  height: 200px;
  border-radius: 50%;

 }
.photo-container img {
  width: 70%;
  height: 70%;             /* 保持宽高比 */

  border-radius: 12px;      /* 可选：圆角更美观 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 可选：阴影 */
  object-fit: cover;        /* 如果是固定高宽，可裁剪图片保持比例 */
}
</style>