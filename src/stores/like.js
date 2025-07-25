import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('token', () => {
  // 初始值从 localStorage 中读取并转为数字
  const like = ref(Number(localStorage.getItem('like')) || 0)

  function change_like(data) {
    like.value = data
    localStorage.setItem('like', data) // 更新持久化
  }

  function add_like() {
    like.value += 1
    localStorage.setItem('like', like.value) // 更新持久化
  }

  return {
    like,
    change_like,
    add_like
  }
}, {
  persist: true // 你用这个也可以持久化，无需手动写 localStorage
})
