<template>
	<view class="aside-navbar" v-if="false">
		<view class="aside-logo">
			<navigator url="/pages/index/index">
				<image :src="$t('web_label_img')" mode="widthFix"></image>
			</navigator>
		</view>
		<view v-for="(item,index) in navs" :key="`nav${index}`" @click="openUrl(item.link,item.ck)" url="#"
			class="as-nav-item flex-center cur_pointer" :class="nIndex==item.idx?'active':''">
			<!--:class="(index <= 3 && nIndex == index - 1) || (index > 3 && nIndex == index)?'active':''"-->
			<!-- <text class="iconfont" :class="item.icon"></text> -->
			<image class="imgIco" :src="item.iconImg" mode="widthFix"></image>
			<text>{{item.text}}</text>
			<template v-if="item.idx == -1">
				<text class="iconfont icon-new newFundIcon u-m-l-6"></text>
			</template>
			<text class="iconfont icon-right"></text>
		</view>
		<view class="iconfont icon-close sideClose" @click="menuClick"></view>
		<view class="panel-end">
			<view class="sideLogout btn btn--default" @click="logout" v-if="loginStatus">{{$t("logout")}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "",
		components: {},
		props: {
			nIndex: {
				type: String,
				default: "1"
			},
		},
		data() {
			return {
				resizeIndex: 2,
				loginStatus: false,
			}
		},
		computed: {
			navs() {
				// var arr1 = [{
				// 	icon: 'icon-zhuye-1',
				// 	text: this.$t('首页'),
				// 	link: '/pages/index/index',
				// 	idx: -3,
				// }];
				var arr2 = [{
					icon: 'icon-bashayule',
					iconImg: '/static/images/topboom/basha.png',
					text: this.$t('沙巴娱乐'),
					link: '',
					ck: true
				}];
				// var arr3 = [{
				// 	icon: 'icon-shichangliebiao',
				// 	text: this.$t('menu1'),
				// 	link: '/pages/market/index',
				// 	idx: -2,
				// }];
				var arr4 = [{
					icon: 'icon-chucunjijin',
					iconImg: '/static/images/topboom/linechart.png',
					text: this.$t('储蓄基金'),
					link: '/pages/fund/index?current=0',
					idx: -1,
				}];
				var arr = [
					// { // 正在交易
					// 	icon: 'icon-zhengzaijiaoyi-1',
					// 	text: this.$t('menu2'),
					// 	link: '/pages/tradeing/index',
					// 	idx: 1,
					// },
					{
						icon: 'icon-lishizhangdan',
						iconImg: '/static/images/topboom/history.png',
						text: this.$t('menu3'),
						link: '/pages/hisaccount/index',
						idx: 2,
					},
					/*{
						icon:'../../static/images/nav4.png',
						text:this.$t('menu4'),
						link:'/pages/analyst/index'
					},*/
					// { // 赛事结果
					// 	icon: 'icon-saishijieguo',
					// 	text: this.$t('menu5'),
					// 	link: '/pages/gameResults/index',
					// 	idx: 4,
					// },
					{
						icon: 'icon-saishizixun',
						text: this.$t('menu6'),
						iconImg: '/static/images/topboom/info_circle.png',
						link: '/pages/ucenter/thirdMatch',
						idx: 5
						// link: '/pages/gameNews/index'
					},
					// { // 我的
					// 	icon: 'icon-gerenzhongxin1',
					// 	text: this.$t('menu7'),
					// 	link: '/pages/ucenter/index',
					// 	idx: 6,
					// },
					// {
					// 	icon: 'icon-weishangzhongxin',
					// 	text: this.$t('menu8'),
					// 	link: '/pages/wsCenter/index',
					// 	idx: 7,
					// },
					{
						icon: 'icon-huodongdating',
						text: this.$t('menu9'),
						iconImg: '/static/images/topboom/huodong.png',
						link: '/pages/activityHall/index',
						idx: 8,
					},
					{
						icon: 'icon-gonggaozhongxin1',
						text: this.$t('menu10'),
						iconImg: '/static/images/topboom/notice.png',
						link: '/pages/notice/index',
						idx: 9,
					},
					{
						icon: 'icon-guizeshuoming1',
						text: this.$t('menu11'),
						link: '/pages/rule/index',
						iconImg: '/static/images/topboom/rule.png',
						idx: 10,
					},
					// {
					// 	icon: 'icon--rule',
					// 	text: this.$t('官网链接'),
					// 	link: 'official_website_url',
					// 	idx: 11,
					// }

				];

				// if (this.$helper.get('rule').shabaStatus == 1 && this.$helper.get('rule').fundStatus == 1) {
				// 	return [...arr2, ...arr4, ...arr];
				// } else if (this.$helper.get('rule').shabaStatus == 1 && this.$helper.get('rule').fundStatus == 2) {
				// 	return [...arr2, ...arr];
				// } else if (this.$helper.get('rule').shabaStatus == 0 && this.$helper.get('rule').fundStatus == 1) {
				// 	return [...arr4, ...arr];
				// } else {
				// 	return [...arr];
				// }



				if (this.$helper.get('rule').fundStatus == 1) {
					return [...arr4, ...arr];
				} else {
					return [...arr];
				}

			}
		},
		activated() {
			this.loginStatus = this.$helper.get('loginStatus');
		},
		mounted() {
			this.loginStatus = this.$helper.get('loginStatus');
		},
		methods: {
			menuClick() {
				this.$emit('menuClick', false);
			},
			resize() {
				var that = this;
				uni.getSystemInfo({
					success(res) {
						if (res.windowWidth > res.windowHeight) {
							that.resizeIndex = 1;
						} else {
							that.resizeIndex = 2;
						}
					}
				})
			},
			async handleleftTwo() {
				var that = this;
				let query = {
					platform: that.resizeIndex
				}
				if (that.resizeAjax) {
					return;
				}
				that.resizeAjax = true;
				let res = await that.$u.api.game_get_api(query);
				res.code == 1 ? [that.resizeAjax = false, location.href = res.data.url] : [that.resizeAjax = false,
					that.$u.toast(that.$t(res.msg))
				];
			},
			openUrl(link, ck) {
				this.$emit('menuClick', false);
				let loginStatus = this.$helper.get('loginStatus');
				if (ck) {
					this.handleleftTwo();
					return;
				}
				if (link == "") {
					uni.reLaunch({
						url: '/pages/index/index',
					});
					var href = this.$t('third_news_url');
					window.open(href, '_blank');
				}
				// if (link == "official_website_url") {
				// 	uni.reLaunch({
				// 		url: '/pages/index/index',
				// 	});
				// 	var href = this.$t('official_website_url');
				// 	window.open(href, '_blank');
				// }
				if (!loginStatus) {
					uni.navigateTo({
						url: '/pages/login/index'
					});
				} else {
					if (link == "/pages/index/index") {
						uni.reLaunch({
							url: '/pages/index/index',
						});
					} else {
						uni.navigateTo({
							url: link
						})
					}
				}
			},
			logout() {
				this.logout_common();
				this.$emit('menuClick', false);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.aside-navbar {
		position: relative;
		z-index: 9999;
		height: 100%;
		background-size: cover;
		padding-top: 50px;
		overflow: hidden;
		overflow-y: auto;

		.icon-close {
			font-size: 18px;
			color: #fff;
			position: absolute;
			right: 15px;
			top: 15px;
			z-index: 99;
		}
	}

	.as-nav-item {
		position: relative;
		display: flex;
		align-items: center;
		padding: 15px;
		padding-left: 20px;
		padding-right: 15px;
		font-size: 14px;
		border-bottom: 1px solid #25282F;

		image {
			width: 32px;
			height: 32px;
			margin-right: 10px;
		}

		&.active::before {
			position: absolute;
			left: 0;
			top: 0;
			content: '';
			width: 6px;
			height: 46px;
		}

		.icon-right {
			display: inline-block;
			margin-left: auto;
			color: #D26C89;
			font-size: 14px;
			padding: 0;
		}
	}

	.aside-logo {
		padding: 0 15px;
		margin-bottom: 10px;
	}

	.aside-logo image {
		width: 150px;
		max-height: 50px;
	}

	.panel-end {
		padding: 30px 20px 0 20px;
	}

	.panel-end .btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 44px;
	}
</style>
