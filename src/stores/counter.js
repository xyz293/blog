
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('token', () => {
     
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')
  function change(data){
    username.value = data
  }
  return { username,password,change }
},{
  persist:true
})
