<template>
	<view class="container">
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
		</u-top-tips>
	</view>
</template>
<script>
	export default {
		onLoad(e) {
			if(this.$helper.get('thirdLoginSign') == 'VK'){
				// VK 三方登录
				this.onLoad_VK();
			}else if(this.$helper.get('thirdLoginSign') == 'Google'){
				// Google 登录处理
				this.onLoad_Google();
			}
		},
		methods: {
			onLoad_VK(){
				var thirdLoginId = this.$helper.get('thirdLoginId');
				var href = window.location.href;
				var param_href = this.getUrlParams(href);
				this.third_login(thirdLoginId, param_href.payload);
			},
			onLoad_Google(){
				var code = '';
				var thirdLoginId = this.$helper.get('thirdLoginId');
				var href = window.location.href; 
				var paramStr = href.split("?");
				var params = paramStr[1].split("&");
				if(params){
					for (var i = 0; i < params.length; i++) {
						var param = params[i];
						let ind = param.indexOf('=');
						if(ind>0){
							let key = param.substring(0,ind);			
							let val = param.substring(ind+1);
							if(key=='code'){
								this.third_login(thirdLoginId,decodeURI(val));
								break;
							}
						}
					}
				}
			},
			getUrlParams(url) {
				const paramsArray = url.split('?')[1].split('&');
				const params = paramsArray.reduce((acc, param) => {
					const [key, value] = param.split('=');
					acc[decodeURIComponent(key)] = decodeURIComponent(value);
					return acc;
				}, {});
				return params;
			},
			async third_login(id, code) {
				var res_code = this.$helper.get('share_code');
				let ret = await this.$u.api.third_login({
					id: id,
					code: code,
					rec_code: res_code
				});
				if (ret.code == 1) {
					this.$helper.rm('thirdLoginId');
					this.$helper.rm('share_code');
					this.$helper.rm('thirdLoginSign');
					this.$helper.set('token', ret.data.token);
					this.$helper.set('token_key', ret.data.token_key);
					this.$helper.set('shouNotice', true);
					this.$helper.set('shouCooperation', true);
					this.$helper.set('loginStatus', true);
					await this.getUserInfo_common();
					this.$go("/pages/index/index");
				}else {
					this.$refs.uTips.show({
						title: this.$t(ret.msg)
					});
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/register/index'
						})
					}, 3000);
				}
			}
		}
	}
</script>
