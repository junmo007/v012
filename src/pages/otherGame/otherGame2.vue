<template>
	<view>
		<view class="content" :data-theme="themeMode">
			<template v-if="urlType == 1">
				<uniNavHeader isback :title="this.$t('游戏')" @clickLeft="menuClick" :defaultBack="true">
				</uniNavHeader>
				<view id="html_view"></view>
				<template v-if="!trueStatus">
					<loading></loading>
				</template>
			</template>
			<template v-if="urlType == 2">
				<uniNavHeader isback :title="this.$t('游戏')" @clickLeft="menuClick" :defaultBack="true"
					:user_t_id="user_t_id"></uniNavHeader>
				<web-view class="webViewClass" :src="url"></web-view>
				<template v-if="!trueStatus">
					<loading></loading>
				</template>
			</template>
			<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
			</u-top-tips>
			<!-- <u-popup v-model="isThirdGame" mode="center" :mask-close-able="false" borderRadius="20">
				<view class="uc-pop">
					<view class="u-flex u-row-between u-p-30 pop-top top-bd w_100">
						<view class="u-m-t-10 m-font-b">{{$t('提示')}}</view>
					</view>
					<view class="u-p-40 pop-bottom bottom-bd w_100">
						<view class="u-p-t-20 u-p-b-20">
							<text>{{$t('Whether to enter the game')}}</text>
						</view>
						<view class="u-flex u-row-center w_100 u-m-t-30">
							<view class="w_50 btn--other u-text-center u-p-20 u-m-r-10" @click="outGame">
								<view class="m-line-1 m-font-b">{{$t('public5')}}</view>
							</view>
							<view class="w_50 btn--submit u-text-center u-p-20 u-m-l-10" @click="enterGame">
								<view class="m-line-1 m-font-b">{{$t('Enter')}}</view>
							</view>
						</view>
					</view>
				</view>
			</u-popup> -->
			<!-- 模拟三方加载 -->
			<template v-if="isThirdGame">
				<view class="loading-box">
					<view class="loading-wrapper">
						<view class="loading-third"></view>
					</view>
				</view>
			</template>
		</view>
		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import loading from '@/components/loading/loading.vue'
	import uniNavFooter from '@/components/uni-foot-bar/uni-foot-bar.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	export default {
		components: {
			uniNavHeader,
			uniNavFooter,
			loading,
			pcBg
		},
		data() {
			return {
				url: '',
				trueStatus: false,
				urlType: 2, //1 html  2 url
				gameType: '',
				user_t_id: 0,
				user_gid: 0,
				isThirdGame: false,
			}
		},
		async onLoad(option) {
			if (option) {
				// this.gameType = option.type;
				this.user_t_id = option.tid;
				this.user_gid = option.gid;
				await this.getPrice(option.gid);
			} else {
				this.$go('back');
			}
		},
		methods: {
			async outGame() {
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.game_user_transout_p({
					tid: this.user_t_id
				});
				if (res) {
					uni.hideLoading();
					this.common_back();
				}
			},
			enterGame() {
				this.isThirdGame = false;
				this.trueStatus = true;
			},
			getFirstChild() {
				document.getElementById('html_view').firstChild.style.height = '100vh';
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async getPrice(gid) {
				// 获取html
				let res = await this.$u.api.game_login_game_p({
					platform: 2,
					gid
				});
				if (res && res.code == 1) {
					if (res.type == 'html') {
						this.urlType = 1;
						await this.set_innerHTML('html_view', res.data);
						await this.getFirstChild();
						setTimeout(_ => {
							this.isThirdGame = true;
							this.trueStatus = true;
						}, 2000);
						setTimeout(_ => {
							this.isThirdGame = false;
						}, 5000);
					} else {
						this.urlType = 2;
						this.url = res.data;
						setTimeout(_ => {
							this.isThirdGame = true;
							this.trueStatus = true;
						}, 2000);
						setTimeout(_ => {
							this.isThirdGame = false;
						}, 5000);
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
	.html_class {
		height: 100vh !important;
	}

	.webViewClass {
		margin-top: 60px;
		padding-bottom: 60px;
		min-height: calc(100vh - 60px);
	}

	.bg {
		min-width: 100vw;
		min-height: 100vh;
		background-color: rgb(35, 59, 72);
	}

	.loading-box {
		position: fixed;
		left: 0;
		top: 60px;
		width: 100%;
		min-height: 100vh;
		background: var(--body-bg);
		user-select: none;
		z-index: 9999;
		overflow: hidden;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}

	@media (min-width: 750px) {
		.loading-box {
			width: 465px;
			margin: 0 50%;
			-webkit-transform: translateX(-50%);
			transform: translateX(-50%);
		}
	}

	.loading-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -30%);
		display: flex;
		flex-direction: column;
	}

	.loading-third {
		// border: 10px solid #3a347e;
		border: 10px solid var(--loading-third-bg);
		border-radius: 50%;
		border-top: 10px solid var(--body-bg);
		width: 85px;
		height: 85px;
		-webkit-animation: spin .7s linear infinite;
		animation: spin .7s linear infinite;
	}

	@-webkit-keyframes spin {
		0% {
			-webkit-transform: rotate(0deg);
		}

		100% {
			-webkit-transform: rotate(360deg);
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>
