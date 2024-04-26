<template>
	<view>
		<view class="navbar-box" :class="isback?'isback':''">
			<view class="uni-navbar flex-center ">
				<template v-if="isback">
					<image src="@/static/images/index/menu/back.png"
						style="width: 42px;height: 42px;position: absolute;left: 12px;" @click="back">
					</image>
					<view class="u-flex u-row-center w_100 m-font-18 m-font-b">
						{{title}}
					</view>
				</template>
				<template v-if="!isback">
					<image @click="testLogin_go('/pages/index/index')" src="@/static/images/index/logo.png"
						style="width: 72px;height: 44px;"></image>
				</template>
				<template v-if="isback && search">
					<image src="@/static/images/index/menu/search.png"
						style="width: 42px;height: 42px;position: absolute;right: 12px;"
						@click="$go('/pages/gameResults/search')">
					</image>
				</template>
				<template v-if="!isback">
					<view class="uni-navbar-right flex-center">
						<template v-if="!userInfo_common">
							<view class="no-login-bal-bar-box1 m-line-1" @click="$go('/pages/login/index')">
								<view class="btn bal-bar">
									{{$t('login')}}
								</view>
							</view>
							<view class="no-login-bal-bar-box2 u-m-l-20 m-line-1" @click="$go('/pages/register/index')">
								<view class="btn bal-bar">
									{{$t('register')}}
								</view>
							</view>
						</template>
						<template v-if="userInfo_common">
							<view class="header-balance-class u-flex" @click="testLogin_go('/pages/ucenter/recharge')">
								<view>{{userInfo_common.balance1?formatCurrency(userInfo_common.balance)+' ₽':'0.00 ₽'}}</view>
								<image src="@/static/images/plus-circle.png" class="u-m-l-10"
									style="width: 18px;height: 18px;">
								</image>
							</view>
							<image src="@/static/images/index/menu/msg.png" class="u-m-l-20"
								style="width: 36px;height: 36px;" @click="goMsg">
							</image>
						</template>
						<image src="@/static/images/index/menu/menu.png" class="u-m-l-20"
							style="width: 36px;height: 36px;" @click="onClickLeft">
						</image>
					</view>
				</template>
			</view>
		</view>
		<!-- 菜单 -->
		<u-popup v-model="showpopup" mode="bottom" width="100%" :custom-style="customStyle"
			:mask-custom-style="maskStyle" z-index="10000" border-radius="32">
			<scroll-view style="max-height: 90vh;" scroll-y="true">
				<view class="menu-container">
					<view class="user-nav-menu">
						<view class="u-flex u-row-center u-m-b-30">
							<image src="@/static/images/index/side-logo.png" style="width: 146px;height: 80px;"></image>
						</view>
						
						<!-- <view class="u-flex u-row-between w_100 u-m-b-30">
							<view class="w_50" @click="testLogin_go('/pages/ucenter/recharge')">
								<image src="@/static/images/index/menu/side-re.jpg" style="width: 100%;max-height: 160px;border-radius: 16px;"
									mode="widthFix"></image>
							</view>
							<view class="w_50 u-m-l-14">
								<image src="@/static/images/index/menu/side-z.jpg" style="width: 100%;max-height: 160px;border-radius: 16px;"
									mode="widthFix"></image>
							</view>
						</view> -->
						<view class="u-flex u-row-between w_100 u-m-t-40 u-m-b-40">
							<view class="w_50 balance-btn-3 u-m-l-50" @click="testLogin_go('/pages/ucenter/recharge')">
								<image src="@/static/images/index/menu/withdraw.png" mode=""
									style="width: 28px;height: 28px;z-index: 1;"></image>
								<view class="u-m-t-10">{{$t('user4')}}</view>
							</view>
							<view class="w_50 balance-btn-3 u-m-r-50 u-m-l-20"
								@click="withDrawChange">
								<image src="@/static/images/index/menu/insert.png" mode=""
									style="width: 28px;height: 28px;z-index: 1;"></image>
								<view class="u-m-t-10">{{$t('user5')}}</view>
							</view>
						</view>
						
						<view class="menu-class">
							<view class="u-flex u-row-between m-c-w menu-item-class" v-for="(item,index) in userMenu"
								:key="`userMenu${index}`" @click="navGo(item.url)" :class="index>0?'u-m-t-30':''">
								<view class="u-flex">
									<image :src="item.img" style="height: 22px;width: 22px"></image>
									<view class="u-m-l-20 m-font-16">{{item.text}}</view>
								</view>
								<view class="iconfont icon-right text-yellow"></view>
							</view>
							<easySelect ref="easySelect" size="mini" :value="selecValue" :icon="iconV"
								@showLang="showLang" @selectOne="selectOne" class="m-c-w"> </easySelect>
							<template v-if="androidIos == 1 && doanLoadAnd">
								<view class="u-flex u-row-between m-c-w menu-item-class u-m-t-30"
									@click="androidDownload">
									<view class="u-flex">
										<image src="@/static/images/index/menu/12.png" style="height: 22px;width: 22px">
										</image>
										<view class="u-m-l-20 m-font-15">{{$t('downloadDescription')}}</view>
									</view>
									<view class="iconfont icon-right text-yellow"></view>
								</view>
							</template>
							<template v-if="androidIos == 2 && doanLoadIOS">
								<view class="u-flex u-row-between m-c-w menu-item-class u-m-t-30" @click="iosDownload">
									<view class="u-flex">
										<image src="@/static/images/index/menu/12.png" style="height: 22px;width: 22px">
										</image>
										<view class="u-m-l-20 m-font-15">
											{{iosBut==0?$t('downloadDescription'):iosBut==1?$t('信任开发者'):''}}
										</view>
									</view>
									<view class="iconfont icon-right text-yellow"></view>
								</view>
							</template>
						</view>
						<view class="u-flex w_100 u-m-t-40" :class="loginStatus?'u-row-between':'u-row-center'">
							<view class="w_50 bottom-btn-1 u-flex u-row-center" @click="localStorageClose">
								<image src="@/static/images/index/menu/del.png" mode=""
									style="width: 20px;height: 20px;">
								</image>
								<view class="u-m-l-10">{{$t('清除缓存')}}</view>
							</view>
							<view class="w_50 bottom-btn-1 u-flex u-m-l-20 u-row-center" v-if="loginStatus"
								@click="logout">
								<view class="u-m-r-10">{{$t('logout')}}</view>
								<image src="@/static/images/index/menu/out.png" mode=""
									style="width: 20px;height: 20px;">
								</image>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</u-popup>
		<!-- 提现密码绑定 -->
		<u-popup v-model="setUserPwdpopup" mode="center" :mask-close-able="false" border-radius="20">
			<view class="uc-pop">
				<view class="u-flex u-row-between u-p-30 pop-top top-bd">
					<view class="u-m-t-10 m-font-b">{{$t('提示')}}</view>
				</view>
				<view class="u-p-40 pop-bottom bottom-bd">
					<view class="u-p-t-20 u-p-b-20">{{$t('您还没设置提现密码')}}</view>
					<view class="u-flex u-row-center w_100 u-m-t-30">
						<view class="w_50 btn--submit u-text-center u-p-20" @click="goSetPwd">
							<view class="m-line-1 m-font-b">{{$t('前往')}}</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 转出三方余额 -->
		<u-popup v-model="outThirdBalance" mode="center" :mask-close-able="false" borderRadius="20">
			<view class="uc-pop">
				<view class="u-flex u-row-between u-p-30 pop-top top-bd w_100">
					<view class="u-m-t-10 m-font-b">{{$t('提示')}}</view>
					<view class="iconfont icon-close" @click="outThirdBalance = false"></view>
				</view>
				<view class="u-p-40 pop-bottom bottom-bd w_100">
					<view class="u-p-t-20 u-p-b-20">
						<text>{{$t('You have a balance stored in a third party')}},{{$t('余额')}}:</text>
						<text class="u-m-l-10">{{userInfo_common.third_balance?userInfo_common.third_balance:'0.00'}}</text>
					</view>
					<view class="u-flex u-row-center w_100 u-m-t-30">
						<view class="w_50 btn--submit u-text-center u-p-20" @click="getBalance">
							<view class="m-line-1 m-font-b">{{$t('转出')}}</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<view class="u-tips" v-if="tips" @click="tipsStatus"></view>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
		</u-top-tips>
	</view>
</template>

<script>
	import easySelect from "@/components/easy-language/easy-select.vue"
	import listEmpty from '@/components/list-empty/list-empty.vue'
	export default {
		components: {
			easySelect,
			listEmpty
		},
		data() {
			return {
				show: false,
				selecValue: '',
				iconV: '',
				loginStatus: false,
				tips: false,
				showpopup: false,
				balanceShow: false,
				customStyle: {
					"top": '60px',
				},
				maskStyle: {
					"zIndex": "8888",
					"top": '0',
					"transform": 'scale(1)',
					"background": 'rgba(0, 0, 0, 0.8)'
				},
				iosBut: 0,
				androidIos: null, // 1安卓 2IOS
				doanLoadAnd: false, // 安卓下载
				doanLoadIOS: false, // IOS下载
				setUserPwdpopup: false,
				invtePage: '/pages/invte/invte', // 邀请好友路劲
				userMenu: [{
					text: this.$t('VIP'),
					img: require('@/static/images/index/menu/13.png'),
					url: '/pages/ucenter/vipClub',
				}, {
					text: this.$t('menu5'),
					img: require('@/static/images/index/menu/1.png'),
					url: '/pages/gameResults/index',
				}, {
					text: this.$t('menu1'),
					img: require('@/static/images/index/menu/3.png'),
					url: '/pages/market/index'
				}, {
					text: this.$t('menu8'),
					img: require('@/static/images/index/menu/4.png'),
					url: '/pages/wsCenter/index'
				}, {
					text: this.$t('menu9'),
					img: require('@/static/images/index/menu/5.png'),
					url: '/pages/activityHall/index'
				}, {
					text: this.$t('user8'),
					img: require('@/static/images/index/menu/6.png'),
					url: '/pages/ucenter/profile'
				}, {
					text: this.$t('邀请好友'),
					img: require('@/static/images/index/menu/8.png'),
					url: '/pages/invte/invte'
				}, {
					text: this.$t('关于我们'),
					img: require('@/static/images/index/menu/9.png'),
					url: '/pages/ucenter/about'
				}, {
					text: this.$t('支持'),
					img: require('@/static/images/index/menu/10.png'),
					url: '/pages/help/help'
				}],
				setUserPhonePop: false
			}
		},
		props: {
			title: {
				type: String,
				default: ""
			},
			isback: {
				type: Boolean,
				default: false
			},
			isTestPwd: {
				type: Boolean,
				default: true
			},
			profile: {
				type: Boolean,
				default: true
			},
			search: {
				type: Boolean,
				default: false
			}
		},
		activated() {
			this.getDoanload();
			this.getUserHeader();
			this.getInvteRouter();
			this.userInfo_common = this.$helper.get('userInfo');
			this.userBalance = this.$helper.get('userBalance');
			this.loginStatus = this.$helper.get('loginStatus');
		},
		mounted() {
			this.getDoanload();
			this.getUserHeader();
			this.userInfo_common = this.$helper.get('userInfo');
			this.userBalance = this.$helper.get('userBalance');
			this.loginStatus = this.$helper.get('loginStatus');
			this.getInvteRouter();
			this.selecValue = this.$helper.getLang();
			let all_lang = this.$helper.get('alllang');
			if (all_lang != null) {
				for (let i = 0; i < all_lang.length; i++) {
					if (this.selecValue == all_lang[i].value) {
						this.iconV = all_lang[i].icon;
					}
				}
			}
		},
		methods: {
			navGo(url) {
				if (this.loginStatus) {
					this.$go(url);
					this.showpopup = false;
				} else {
					this.showpopup = false;
					this.$go('/pages/login/index');
				}
			},
			getInvteRouter() {
				if (parseInt(this.$helper.get('rule').is_agent_reward) == 0) {
					this.invtePage = '/pages/ucenter/vip'
				}
			},
			setUserPwdOpen() {
				this.setUserPwdpopup = true;
			},
			setUserPwdClose() {
				this.setUserPwdpopup = false;
			},
			androidDownload() {
				window.location.href = this.$t('AndroidDownloadUrl_Looks');
			},
			iosDownload() {
				if (this.iosBut == 0) {
					window.location.href = this.$t('IOSDownloadUrl_Looks');
					this.iosBut = 1;
				} else {
					window.location.href = 'https://www.pgyer.com/app/getProvisionFile';
				}
			},
			async headUserBan() {
				await this.getUserInfo_common();
			},
			async getDoanload() {
				switch (uni.getSystemInfoSync().platform) {
					case 'android':
						this.androidIos = 1;
						break;
					case 'ios':
						this.androidIos = 2;
						break;
					default:
						this.androidIos = 1;
						break;
				}
				if (this.$t('AndroidDownloadUrl_Looks') != 'AndroidDownloadUrl_Looks') {
					this.doanLoadAnd = true;
				} else {
					this.doanLoadAnd = false;
				}
				if (this.$t('IOSDownloadUrl_Looks') != 'IOSDownloadUrl_Looks') {
					this.doanLoadIOS = true;
				} else {
					this.doanLoadIOS = false;
				}
			},
			async getBalance() {
				uni.showLoading({
					title: this.$t('loading')
				});
				let api = this.$helper.get('rule').game_url;
				if (api) {
					this.$u.post(api + '/game/user_transout', {
						tid: 0
					}).then(async res => {
						if (res) {
							uni.hideLoading();
							await this.getUserBalance();
						}
						this.balanceShow = !this.balanceShow;
						setTimeout(_ => {
							if (!this.balanceShow) {
								this.balanceShow = true;
							}
						}, 200);
					});
				} else {
					let res = await this.$u.api.game_user_transout_p({
						tid: 0
					});
					if (res) {
						uni.hideLoading();
						await this.getUserBalance();
					}
					this.balanceShow = !this.balanceShow;
					setTimeout(_ => {
						if (!this.balanceShow) {
							this.balanceShow = true;
						}
					}, 200);
				}
			},
			goSetPwd() {
				this.setUserPwdClose();
				this.$go('/pages/ucenter/profile?setpwd=' + true);
			},
			showLang(e) {
				this.show = e;
				this.tips = true;
			},
			tipsStatus() {
				this.tips = false;
				this.$refs.easySelect.hideOptions();
			},
			selectOne(options) {
				this.$helper.setLang(options.label);
				this.$i18n.locale = options.label;
				this.selecValue = options.label;
				this.iconV = options.icon;
				this.$router.go(0);
			},
			async logout() {
				this.showpopup = false;
				this.loginStatus = false;
				await this.logout_common();
			},
			onClickLeft() {
				this.showpopup = !this.showpopup;
			},
			goMsg() {
				if (this.loginStatus) {
					if (parseInt(this.$helper.get('rule').force_pwd) == 1) {
						if (this.isTestPwd) {
							this.$go('/pages/msg/index');
						}
					} else {
						this.$go('/pages/msg/index');
					}
				} else {
					this.$go('/pages/login/index');
				}
			},
			back() {
				if (parseInt(this.$helper.get('rule').force_pwd) == 1) {
					if (this.isTestPwd) {
						this.common_back();
					}
				} else {
					this.common_back();
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.u-tips {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 998;
	}

	.navbar-box {
		height: 70px;
		position: fixed;
		z-index: 9999;
		top: 0;
		left: 0;
		width: 100%;
		padding-top: constant(safe-area-inset-top) !important;
		padding-top: env(safe-area-inset-top) !important;
	}

	.uni-navbar-right {
		position: relative;
		margin-left: auto;
	}

	.uni-navbar {
		width: 100%;
		padding: 0 26px;
		color: var(--navbar-color);
		height: 70px;
		background: var(--hearder-bg);
		box-shadow: 0px 3px 14px 0px rgba(11, 8, 108, 0.13);
	}


	@media (max-width:821px) {
		.uni-navbar {
			padding: 0 16px;
		}
	}

	.uni-navbar .flex_bd {
		text-align: center;
	}

	@media (max-width:560px) {

		.uni-navbar {
			padding: 0 12px;
		}
	}


	@media (min-width:900px) {
		.uni-navbar {
			width: 465px;
			margin: 0 50%;
			-webkit-transform: translateX(-50%);
			transform: translateX(-50%);
		}
	}

	.user-nav-menu {
		padding: 15px;
	}

	.header-balance-class {
		color: #fff;
		padding: 10px 15px;
		border-radius: 30px;
		background-color: #413D71;
	}

	.header-menun-class {
		padding: 10px;
		color: #D1CCE9;
		border-radius: 50%;
		background-color: #413D71;
	}

	.balance-btn-1 {
		margin: 20px 0 10px 0;
		width: 100%;
		text-align: center;
		border-radius: 16px;
		padding: 6px 12px 6px 12px;
		background: rgba(233, 174, 58, 1);
	}

	.balance-btn-2 {
		text-align: center;
		border-radius: 16px;
		padding: 8px 12px;
		background: rgba(65, 61, 113, 1);
	}

	.balance-btn-3 {
		position: relative;
		text-align: center;
		border-radius: 16px;
		padding: 10px 12px;
		background: rgba(65, 61, 113, 1);
	}

	.balance-btn-3::after {
		content: '';
		width: 100%;
		border-radius: 16px;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-image: url('@/static/images/index/menu/Ellipse.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.bottom-btn-1 {
		text-align: center;
		border-radius: 12px;
		padding: 10px 12px;
		background: rgba(100, 76, 188, 1);
	}

	.menu-class {
		padding: 15px;
		border-radius: 12px;
		background: rgba(62, 54, 100, 1);
	}

	.menu-item-class {
		padding-bottom: 15px;
		border-bottom: 1px solid #4D4886;
	}

	.menu-item-class:last-child {
		padding-bottom: 0;
		border-bottom: none;
	}

	.hall-item-class {
		padding-bottom: 10px;
		border-bottom: 1px solid #413D71;
	}

	.level-vip-icon {
		width: 96px;
		height: 96px;
		padding: 10px;
		border-radius: 12px;
		background: rgba(30, 23, 57, 1);
	}
</style>
