<template>
	<view class="foot-tabbar">
		<u-tabbar v-model="current" active-color="var(--foot-tab-icon-active-color)"
			inactive-color="var(--foot-tab-icon-color)" :list="list" bg-color="#0D0D0D" height="72px" icon-size="20px"
			:border-top='false' :beforeSwitch="beforeSwitch"></u-tabbar>
	</view>
</template>

<script>
	export default {
		name: "",
		components: {},
		props: {
			fIndex: {
				type: String,
				default: "0"
			},
		},
		data() {
			return {
				current: this.fIndex,
				loginStatus: false
			}
		},
		activated() {
			this.loginStatus = this.$helper.get('loginStatus');
		},
		computed: {
			list() {
				return [{
					iconPath: "../../static/images/index-footer/bottom-11.png",
					selectedIconPath: "../../static/images/index-footer/bottom-1.png",
					text: this.$t("public8"),
				}, {
					iconPath: "../../static/images/index-footer/bottom-22.png",
					selectedIconPath: "../../static/images/index-footer/bottom-2.png",
					text: this.$t("体育"),
				}, {
					iconPath: "../../static/images/index-footer/bottom-44.png?f=444",
					selectedIconPath: "../../static/images/index-footer/bottom-4.png?f=444",
					text: this.$t("VIP"),
				}, {
					iconPath: "../../static/images/index-footer/bottom-55.png?f=5",
					selectedIconPath: "../../static/images/index-footer/bottom-5.png?f=5",
					text: this.$t("menu7"),
				}]
			}
		},
		created() {
			this.loginStatus = this.$helper.get('loginStatus');
		},
		methods: {
			beforeSwitch(e) {
				let option = this.$helper.get('game_data_v2');
				if (this.loginStatus) {
					if (this.current == 1) {
						try {
							this.footGameBack();
							if (e == 0) {
								uni.navigateTo({
									url: '/pages/index/index'
								});
							} else if (e == 1) {
								if (option.tc_code == 'PB') {
									this.$helper.set('game_back_url', window.location.href);
								}
								uni.navigateTo({
									url: '/pages/sportsThird/sportsThird?gid=' + option.id
									// url: '/pages/sports/index'
								})

							} else if (e == 2) {
								uni.navigateTo({
									url: '/pages/ucenter/vipClub'
								});
							} else if (e == 3) {
								uni.navigateTo({
									// url: '/pages/tradeing/index'
									url: '/pages/ucenter/index'
								});
							}
						} catch (e) {
							console.log(e);
						}
					} else {
						if (e == 0) {
							uni.navigateTo({
								url: '/pages/index/index'
							});
						} else if (e == 1) {
							if (option.tc_code == 'PB') {
								this.$helper.set('game_back_url', window.location.href);
							}
							uni.navigateTo({
								url: '/pages/sportsThird/sportsThird?gid=' + option.id
								// url: '/pages/sports/index'
							})
						} else if (e == 2) {
							uni.navigateTo({
								url: '/pages/ucenter/vipClub',
							});
						} else if (e == 3) {
							uni.navigateTo({
								// url: '/pages/tradeing/index',
								url: '/pages/ucenter/index'
							});
						}
					}
				} else {
					uni.redirectTo({
						url: '/pages/login/index'
					});
				}
			},
			async footGameBack() {
				let api = this.$helper.get('rule').game_url;
				if (api) {
					this.$u.post(api + '/game/user_transout', {
						tid: this.$helper.get('game_data_v2').g_tcid ? this.$helper.get('game_data_v2')
							.g_tcid : ''
					}).then(res => {
						if (res && res.code == 1) {
							this.$router.go(0);
						}
					});
				} else {
					let res = await this.$u.api.game_user_transout_p({
						tid: this.$helper.get('game_data_v2').g_tcid ? this.$helper.get('game_data_v2')
							.g_tcid : ''
					});
					if (res && res.code == 1) {
						this.$router.go(0);
					}
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.foot-tabbar {
		height: 64px;
		background: var(--body-bg);
		height: calc(64px + constant(safe-area-inset-bottom));
		height: calc(64px + env(safe-area-inset-bottom));

		::v-deep u-tabbar {
			position: fixed;
			left: 15px;
			right: 15px;
			bottom: 10px;
			z-index: 9999;
		}

		::v-deep .u-tabbar__content {
			border-top: 1px solid rgba(77, 72, 134, 1);
			background: rgba(13, 13, 13, 1) !important;
			box-shadow: 0px -4px 38px 0px rgba(255, 255, 255, 0.1);
			width: calc(100vw - 30px);
			border-radius: 80rpx;
			bottom: 2%;
			left: 15px;
			right: 15px;
			overflow: hidden;
			padding-bottom: constant(safe-area-inset-bottom) !important;
			padding-bottom: env(safe-area-inset-bottom) !important;
		}

		::v-deep .u-tabbar__content__active-img {
			position: relative;
		}

		::v-deep .u-tabbar__content__active-img::after {
			content: '';
			width: 100%;
			height: 100%;
			position: absolute;
			// bottom: 0;
			background-image: url('@/static/images/index-footer/active.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;
		}

		::v-deep .u-line-1 {
			background: #fff;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			font-weight: bold;
		}

		::v-deep .u-tabbar__content__item__text {
			padding-top: 5px;
		}

		::v-deep .u-tabbar__content__item:last-child .u-icon .u-icon__img {
			width: 22px !important;
			height: 22px !important;
		}

		::v-deep .active .u-tabbar__content__item__text::after {
			content: '';
			width: 25px;
			height: 4px;
			background: rgba(233, 174, 58, 1);
			border-radius: 2px 2px 0 0;
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
