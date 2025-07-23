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
