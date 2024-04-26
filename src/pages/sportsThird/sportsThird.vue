<template>
	<view  :class="isOpen?'pc-open':'pc-close'" :data-theme="themeMode">
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main u-flex u-col-top ">
				<pcSideBar :pageIndex="55" @menu-event="parentMenu"></pcSideBar>
				<view class="pc-sports">
					<template v-if="urlType == 1">
						<view id="html_view"></view>
						<template v-if="!trueStatus">
							<video src="@/static/images/index/fbLoading.mp4" :controls="false" object-fit="cover" ref="video"
								muted :vslide-gesture-in-fullscreen="false" :autoplay="true"
								:enable-progress-gesture="false" style="width: 100%;height: 100vh;"></video>
						</template>
					</template>
					<template v-if="urlType == 2">
						<web-view class="webViewClass" :src="url" id="myiframe"></web-view>
					</template>
				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<template v-if="urlType == 1">
				<view id="html_view"></view>
				<template v-if="!trueStatus">
					<video src="@/static/images/index/fbLoading.mp4" :controls="false" object-fit="cover" ref="video"
						muted :vslide-gesture-in-fullscreen="false" :autoplay="true"
						:enable-progress-gesture="false" style="width: 100vw;height: 100vh;"></video>
					<uniNavFooter fIndex="1"></uniNavFooter>
				</template>
			</template>
			<template v-if="urlType == 2">
				<web-view class="webViewClass" :src="url" id="myiframe"></web-view>
				<uniNavFooter fIndex="1"></uniNavFooter>
			</template>
		</template>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
		</u-top-tips>
	</view>
</template>

<script>
	import uniNavFooter from '@/components/uni-foot-bar/uni-foot-bar.vue'
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	export default {
		components: {
			uniNavFooter,
			pcNavHeader,
			pcSideBar
		},
		data() {
			return {
				url: '',
				trueStatus: false,
				urlType: 1, //1 html  2 url
				gameType: '',
				// isThirdGame: false,
				gid: '',
			}
		},
		async onLoad(option) {
			if (option) {
				this.gid = option.gid;
				
				let api = this.$helper.get('rule').game_url;
				if (api) {
					await this.getPrice(option.gid, option.backUrl, api + '/game/login_game');
				} else {
					await this.successChange(option.gid, option.backUrl);
				}
			} else {
				this.$go('back');
			}
		},
		mounted() {
			this.getIframe();
			this.$refs.video.play();
		},
		methods: {
			async outGame() {
				uni.showLoading({
					title: this.$t('loading')
				});
				let api = this.$helper.get('rule').game_url;
				if (api) {
					this.$u.post(api + '/game/user_transout', {
						tid: 0
					}).then(res => {
						if (res) {
							uni.hideLoading();
							this.common_back();
						}
					});
				} else {
					let res = await this.$u.api.game_user_transout_p({
						tid: 0
					});
					if (res) {
						uni.hideLoading();
						this.common_back();
					}
				}
			},
			enterGame() {
				this.isThirdGame = false;
				this.trueStatus = true;
			},
			getFirstChild() {
				document.getElementById('html_view').firstChild.style.height = 'calc(100vh - 100px)';
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async getPrice(gid, backUrl, api) {
				let parse = {};
				if (this.$helper.get('game_back_url')) {
					parse = {
						platform: 2,
						back_url: this.$helper.get('game_back_url'),
						gid
					};
				} else {
					parse = {
						platform: 2,
						gid
					};
				}
				this.$u.post(api, parse).then(async res => {
					if (res && res.code == 1) {
						if (this.$helper.get('game_back_url') && uni.getSystemInfoSync().platform ==
							'ios') {
							location.href = res.data;
						} else {
							if (res.type == 'html') {
								this.urlType = 1;
								await this.set_innerHTML('html_view', res.data);
								await this.getFirstChild();
								// setTimeout(_ => {
								// 	this.trueStatus = true;
								// 	this.isThirdGame = true;
								// }, 2000);
								// setTimeout(_ => {
								// 	this.isThirdGame = false;
								// }, 5000);
							} else {
								this.urlType = 2;
								this.url = res.data;
								// setTimeout(_ => {
								// 	this.isThirdGame = true;
								// 	this.trueStatus = true;
								// }, 2000);
								// setTimeout(_ => {
								// 	this.isThirdGame = false;
								// }, 5000);
							}
						}
					} else {
						this.trueStatus = false;
						this.$refs.uTips.show({
							title: this.$t(res.msg)
						});
						setTimeout(_ => {
							this.common_back();
						}, 3000)
					}
				});
			},


			async successChange(gid, backUrl) {
				// 获取html
				let parse = {};
				if (this.$helper.get('game_back_url')) {
					parse = {
						platform: 2,
						back_url: this.$helper.get('game_back_url'),
						gid
					};
				} else {
					parse = {
						platform: 2,
						gid
					};
				}
				let res = await this.$u.api.game_login_game_p(parse);
				if (res && res.code == 1) {
					if (this.$helper.get('game_back_url') && uni.getSystemInfoSync().platform == 'ios') {
						location.href = res.data;
					} else {
						if (res.type == 'html') {
							this.urlType = 1;
							await this.set_innerHTML('html_view', res.data);
							await this.getFirstChild();
							// setTimeout(_ => {
							// 	this.trueStatus = true;
							// 	this.isThirdGame = true;
							// }, 2000);
							// setTimeout(_ => {
							// 	this.isThirdGame = false;
							// }, 5000);
						} else {
							this.urlType = 2;
							this.url = res.data;
							// setTimeout(_ => {
							// 	this.isThirdGame = true;
							// 	this.trueStatus = true;
							// }, 2000);
							// setTimeout(_ => {
							// 	this.isThirdGame = false;
							// }, 5000);
						}
					}
				} else {
					this.trueStatus = false;
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
					setTimeout(_ => {
						this.common_back();
					}, 3000)
				}
			},
			getIframe() {
				var int = setInterval(_ => {
					var iframe = document.getElementById("myiframe");
					if (iframe) {
						clearInterval(int);
					}
				}, 500);
			},
			set_innerHTML(objId, html) {
				let obj = document.getElementById(objId);
				var ie = navigator.appVersion.match(/MSIE/);
				var opera = (navigator.userAgent.toLowerCase().indexOf("opera") != -1);
				if (ie && !opera) {
					html = '<span style="display: none">hack ie</span>' + html;
				}
				obj.innerHTML = html;
				var scripts = obj.getElementsByTagName("script");
				if (scripts) {
					let repstr = "write('" + objId + "',"
					let repstr2 = "writeln('" + objId + "',"
					for (var i = 0; i < scripts.length; i++) {
						let script = scripts[i].text.replace(/document.write\(/ig, repstr).replace(/document.writeln\(/ig,
							repstr2)
						eval(script)
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	.pc-sports{
		position: relative;
		width: 100%;
	}
	.html_class {
		height: 100vh !important;
	}

	.webViewClass {
		margin-bottom: 100px;
		min-height: calc(100vh - 100px);
	}
	.pc-main .webViewClass{
		height: 100vh;
		width: 100%;
		margin: 0;
		transform: translateX(0);
	}
	
	
	
	
	
	
	
	
	
</style>
