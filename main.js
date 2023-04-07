import App from './App.vue'

// #ifndef VUE3
import Vue from 'vue'
// import Vant from "vant"
// import 'vant/lib/index.css'
// Vue.use(Vant)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
