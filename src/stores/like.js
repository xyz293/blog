import { defineStore } from 'pinia'
import { ref } from 'vue'

export const likeStore = defineStore('like', () => {
  // 初始值从 localStorage 中读取并转为数字
  const like = ref(Number(localStorage.getItem('like')) || 0)
  function add_like() {
    like.value++
  }


  return {
    like,
    add_like,

  }
}, {
  persist: true // 你用这个也可以持久化，无需手动写 localStorage
})
