<script setup>
import {my_photo} from '../../api/my-detail'
import {onMounted,ref} from 'vue'
const photo_list =ref({
  photoUrl:'',
  photoName:'',
  photoDesc:''
})
const show_photo=async()=>{
  const res=await my_photo()
  console.log(res)
  photo_list.value=res.data.data.recordList

}
onMounted(()=>{
  show_photo()
})

</script>
<template>
  <div class="photo-page">
    <div class="stars"></div>
    <div class="photo-gallery">
      <div class="photo-card" v-for="item in photo_list" :key="item.id">
        <img :src="item.photoUrl" :alt="item.photoName" class="photo-img" />
        <div class="photo-info">
          <p class="photo-name">{{ item.photoName }}</p>
          <p class="photo-desc">{{ item.photoDesc || '暂无描述' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.photo-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: black;
}

/* 🌟 星空层 */
.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent url('https://www.transparenttextures.com/patterns/stardust.png') repeat;
  animation: moveStars 200s linear infinite;
  z-index: 0;
}

/* 🌠 星空缓慢移动效果 */
@keyframes moveStars {
  from { background-position: 0 0; }
  to { background-position: 10000px 10000px; }
}

/* 📸 相册布局 */
.photo-gallery {
  position: relative;
  z-index: 1; /* ✅ 保证照片在星空上面 */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 40px;
}

.photo-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.photo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.4);
}

.photo-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.photo-info {
  padding: 12px;
}

.photo-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.photo-desc {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}
</style>