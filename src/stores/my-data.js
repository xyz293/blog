import { defineStore } from 'pinia'
import { ref } from 'vue'



export const userStore = defineStore('my-data', () => {
  const username = ref('')
  const avatar = ref('')

  function change_username(newName) {
    username.value = newName
  }

  function change_avatar(newAvatar) {
    avatar.value = newAvatar
  }

  return { username, avatar, change_username, change_avatar }
}, {
  persist: true  
})
