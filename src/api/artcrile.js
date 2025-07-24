import request from '../ulits/request'
export function add_artcrile(articleTitle,articleDesc,articleContent,categoryName){
    return request({
        url:'/admin/article/add',
        method:'post',
        data:{
            articleTitle,
            articleDesc,
            articleContent,
            categoryName

        }
    })
}
export function get_artcrile_list(){
    return request({
        url:'/article/list',
        method:'get',
        params:{
            
        }
    })
}
export function get_detail(id) {
  return request({
    url: `/article/${id}`, // 直接拼接 id
    method: 'get'
  })
}
export function search(text){
    return request({
        url:'/article/search',
        params:{
          keyword:  text
        }
    })
}
export function likeArticle(articleId) {
  return request.post(`/article/${articleId}/like`);
}