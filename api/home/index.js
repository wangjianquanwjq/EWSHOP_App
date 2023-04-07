import request from '../../utils/request.js'

/*
* 1.获取商城楼层列表
*/
export function getHomeList(){
	return request({
		url:'/api/index',
		method:'get'
	})
}

// export function getCartProducts(){
// 	return request({
// 		url:'/***',
// 		method:'POST'
// 	})
// }
