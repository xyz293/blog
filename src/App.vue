<script setup>
import { onMounted } from 'vue'
import request from './ulits/request'
const getPosts = async () => {
  const res = await request.get('/code', {
    	query: {
      username: '40505282@qq.com'
    }
  })
  console.log(res.data)
}
onMounted(() => {
  getPosts()
})
</script>
<template>
    <router-view></router-view>
</template>