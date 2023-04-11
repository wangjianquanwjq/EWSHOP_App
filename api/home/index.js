import request from '../../utils/request.js'

/*
* 1.获取商城楼层列表
*/
export function getHomeList(params) {
	return request({
		url: `/api/index?page=${params.page}`,
		method: 'get'
	})
}

// export function getCartProducts(){
// 	return request({
// 		url:'/***',
// 		method:'POST'
// 	})
// }