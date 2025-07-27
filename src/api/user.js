import request from '../ulits/request'
export function getUserInfo(username) {
  return request({
    url: '/code',
    params: { username }
  })
}//3671263704
export function register(username, password, code) {
  return request({
    url: '/register',
    method: 'post',
    data: {
      username,
      password,
      code
    }
  });
}
export function login(username, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  });
}
export function cahnge_nickname(nickname) { 
  return request({
    url: '/user/info',
    method: 'put',
    data:{
      nickname,
    }
  })
}
export function change_avatar(avatarUrl){
  return request({
    url:'/user/avatar',
    method:'put',
    data:{
      avatarUrl
    }
  })
}
export function change_password(newPassword){
  return request({
    url:'/user/password',
    method:'put',
    data:{
      newPassword
    }
  })
}
