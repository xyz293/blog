import request from '../ulits/request'
export function get_my() {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
  })
}