import request from '../ulits/request'
export function get_talk() {
  return request({
    url: '/talk/list',
    method: 'get',
  })
}
export function get_talk_detail(id) {
  return request({
    url: `/talk/${id}`,
    method: 'get',
  })
}
export function talk_like(id) {
  return request({
    url: `/talk/${id}/like`,
    method: 'post',
  
  })
}
export function get_comment() {
  return request({
    url: '/recent/comment',
    method: 'post',
  })
}
export function add_talk(talkContent,isTop,status){
    return request({
        url:'/admin/talk/add',
        method:'post',
        data:{
            talkContent,
            isTop,
            status
        }
    })
}
export function up_avatar() {
  return request({
    url: '/admin/talk/upload',
    method: 'post',
  })
}
export function del_talk(id){
    return request({
        url:`/admin/talk/${id}`,
        method:'delete'
    })
}
