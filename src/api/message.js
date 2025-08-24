import request from '../ulits/request'
export function get_message() { 
  return request({
    url: '/message/list',
    method: 'get'
  })
}
export function add_message(messageContent,nickname,avatar) { 
  return request({
    url: '/message/add',
    method: 'post',
    data:{
      messageContent,
      nickname,
      avatar
    }
  })
}
