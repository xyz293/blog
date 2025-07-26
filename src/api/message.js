import request from '../ulits/request'
export function get_message() { 
  return request({
    url: '/message/list',
    method: 'get'
  })
}
