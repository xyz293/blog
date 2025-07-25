<script setup>
import {get_my } from '../../api/my-detail'
import {onMounted,reactive} from 'vue'
const my_data = reactive()
const get_detail =async ()=>{
  const res = await get_my()
  console.log(res.data)
}
onMounted(()=>{
  get_detail()
})
</script>
<template>
    <div></div>
</template>