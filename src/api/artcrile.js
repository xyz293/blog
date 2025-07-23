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