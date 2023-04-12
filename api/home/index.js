import request from '../../utils/request.js'

/*
* 1.获取商城楼层列表
*/
export function getHomeList(params) {
	return request({
		url: `/api/index?page=${params.page}&${params.type}=1`,
		method: 'get',
		showLoading:false
	})
}

// export function getCartProducts(){
// 	return request({
// 		url:'/***',
// 		method:'POST'
// 	})
// }