// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store'

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
import store from './store'
Vue.prototype.$store = store
export function createApp() {
	const app = createSSRApp(App)
	return {
		store,
		app
	}
}
// #endif
