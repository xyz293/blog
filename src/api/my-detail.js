import request from '../ulits/request'
export function get_my() {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
  })
}
export function friend(){
    return request({
        url:'/friend/list',
        method:'get'
    })
}
export function my_photo(){
    return request({
        url:'/admin/photo/list',
        method:'get'
    })
}//明天完成我的页面的渲染，以及跳转