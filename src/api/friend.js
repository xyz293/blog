import rerquest from '../ulits/request'
 
 export function get_friend(){
        return rerquest({
            url:'/friend/list',
            method:'get'
        })
    }
