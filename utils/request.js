// import baseUrl from '../baseUrl';
import qs from 'qs' // 处理data
const request = (params) => {
	/*
	 * 1.初始化值
	 */
	let baseUrl = 'https://api.shop.eduwork.cn'
	let _self = this;
	let url = params.url;
	let method = params.method || 'GET';
	let data = params.data || {};
	data.token = "" // default-access_token
	/*
	 *2.判断token
	 */
	// if (!params.token) { // 如果没有传递token
	// 	let token = uni.getStorageSync('token'); // 在本地查找
	// 	if (!token) { // 如果本地没有就跳转到登录页面
	// 		uni.navigateTo({
	// 			url: 'pages/views/login/index'
	// 		});
	// 	} else {
	// 		data.token = '179509245-9c91827e0224bdc18d0b118b8be1b5af';
	// 	}
	// }
	/*
	 * 3.添加头部
	 */
	let defaultOpot = {
		// 'Content-Type': 'application/x-www-form-urlencoded',
		'Terminal-Type': 'innerH5',
		'Content-Type': 'application/json;charset=UTF-8',
	}
	/*
	 * 4.处理 POST
	 */
	let header = {}
	method = method.toUpperCase()
	if (method == 'POST') {
		header = {
			'Content-Type': 'application/x-www-form-urlencoded',
		}
		data = qs.stringify(data)
	}
	// 5.请求地址
	const requestUrl = baseUrl + url;
	uni.showLoading({
		title: '加载中...'
	});
	// 6.用 Promise 创建回调
	return new Promise((resolve, reject) => {
		uni.request({
				url: requestUrl,
				method: method,
				header: Object.assign({}, defaultOpot, header),
				data: data,
				dataType: 'json',
			})
			.then(res => {
				if (res.statusCode == 200) {
					resolve(res.data)
				}
			})
			.catch(err => { // 错误
				reject(err)
			})
			.finally(() => {
				console.log('不管是否成功都要执行')
				uni.hideLoading();
			})
	})
}
export default request