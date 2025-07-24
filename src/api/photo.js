import request from '../ulits/request'
export function get_photo_list() {
  return request({
    url: '/carousel/list',
    method: 'get'
  })
}