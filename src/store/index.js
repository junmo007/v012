import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		indexGameObj: {}
	},
	mutations: {
		setIndexGameObj(state,indexGameObj){
			state.indexGameObj = indexGameObj;
		}
	}
})

export default store