import Vue from 'vue'
import App from './App'
import {
	go
} from './common/tool.js'
import helper from './common/helper';
import Vuex from 'vuex'
import store from '@/store';
import VueI18n from 'vue-i18n';
// 引入全局uView
import uView from 'uview-ui'

// http拦截器，此为需要加入的内容
import httpInterceptor from '@/common/http.interceptor.js'

// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'

// 引入混入
import mine from '@/common/common.js';

// 颜色


let vuexStore = require("@/store/$u.mixin.js");

Vue.use(Vuex)
Vue.mixin(vuexStore);
Vue.mixin(mine)
Vue.use(uView);
Vue.use(VueI18n);

Vue.config.productionTip = false;
Vue.prototype.$go = go;
Vue.prototype.$helper = helper;
Vue.prototype.$lucky_show = 0;
App.mpType = 'app'

var load = async function() {
	//多语言
	var messages = {}
	var i18n_messages = helper.get('i18n_messages');
	if (i18n_messages) {
		messages = i18n_messages
	}
	let themeMode = helper.get('themeMode');
	// if (!themeMode) {
		// 深色
		// helper.set('themeMode', 'dark');
		// 浅色
		// helper.set('themeMode','light');
	// }
	var i18n_lang = helper.getLang();
	const i18n = new VueI18n({
		locale: i18n_lang ? i18n_lang : 'CN', // 设置语言环境
		fallbackLocale: 'CN',
		silentTranslationWarn: true,
		messages // 设置语言环境信息
	})

	const app = new Vue({
		store,
		i18n,
		...App
	});
	Vue.use(httpInterceptor, app)
	Vue.use(httpApi, app);



	await uni.$u.api.getSystemInfo().then((res) => {
		if (res.code == 1) {
			messages = res.lang;
			for (const lang in messages) {
				i18n.mergeLocaleMessage(lang, messages[lang]);
			}
			if (res.locale && !i18n_lang) {
				i18n.locale = res.locale
				helper.setLang(res.locale);
				helper.set('i18n_icon', res.locale_flag);
				// helper.set('isGuide', true);
			}
			// if(!helper.get('token_key')){
			// 	helper.set('isGuide', true);
			// }
			helper.set('alllang', res.alllang);
			helper.set('area_code', res.idc_default);
			helper.set('idc_default', res.idc_default);
			helper.set('idc_default_flag', res.idc_default_flag);
			helper.set('idc', res.idc);
			helper.set('i18n_messages', messages);
			helper.set('rule', res.data);
			Vue.prototype.$lucky_show = res.data.turntableStatus * 1;
			// helper.setHeadInfo();
		} else {
			helper.set('showErrorMsg', res.msg);
			uni.reLaunch({
				url: "/pages/page/error"
			});
		}
	})
	
	
	function checkUrlContainsUcenterIndex() {
	    var url = window.location.href;
	    var pattern = /ucenter\/index/;
	    return pattern.test(url);
	}
	
	
	if (helper.get('token') && !checkUrlContainsUcenterIndex()) {
		uni.$u.api.userInfo_p().then((res) => {
			if (res) {
				helper.set('userInfo', res.data);
				helper.set('userBalanceOther', res.data.balance1);
				if (parseInt(helper.get('rule').force_pwd) == 1) {
					helper.set('userWithPwd', res.data.withdrawal_psd);
					if (res.data.withdrawal_psd) {
						helper.set('testPwd', false);
					} else {
						helper.set('testPwd', true);
					}
				}
			}
		})
	}
	
	


	app.$mount();
}

//为了必须先获取服务端的config和lang messages配置信息
load().then(r => {

});
