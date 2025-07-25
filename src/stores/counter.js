
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('token', () => {
     
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')
  const like =localStorage.getItem('like')
  function change(data){
    username.value = data
  }
  function change_like(data){
    like.value = data
  }
  function add_like(){
    like.value = like.value+1
  }
  return { username,password,like,change,change_like ,add_like}
},{
  persist:true
})
