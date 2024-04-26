<template>
	<view :class="isOpen?'pc-open':'pc-close'" :data-theme="themeMode">
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main u-flex u-col-top pc-has-right">
				<pcSideBar :pageIndex="55" @menu-event="parentMenu"></pcSideBar>
				<view class="pc-wrapper">
					<view class="pc-wrapper-head u-flex u-m-b-30">
						<text class="iconfont icon-user-protection u-font-36 u-m-r-16"></text>
						<text class="u-font-36">{{$t('个人信息')}}</text>
					</view>
					<view class="pc-panel u-m-b-30 u-p-40">
						<view class="pc-user u-flex u-col-top">
							<view class="pc-user-left u-m-r-40">
								<template v-if="userInfo_common.head_img">
									<view class="m-rela ava-class u-flex u-row-center" @click="userHeadImg_common">
										<image :src="userInfo_common.head_img" mode="aspectFill"
											style="width: 92px;height: 92px;border-radius: 50%;"></image>
										<image src="@/static/images/index/ava-1.png" class="ava-header-select"></image>
									</view>
								</template>
								<template v-if="!userInfo_common.head_img">
									<view class="pc-rela" @click="userHeadImg_common">
										<image :src="require('@/static/images/pc/ava-1.png')" class="pc-rela-avatar">
										</image>
										<image :src="require('@/static/images/index/ava-1.png')"
											class="ava-header-select"> </image>
									</view>
								</template>
								<view class="vip-pc-icon u-m-t-30">
									<image :src="require(`@/static/images/vip/${userInfo_common.level_name}.png`)"
										v-if="userInfo_common.level_name"></image>
								</view>
							</view>
							<view class="flex_bd u-p-t-40">
								<view class="u-m-b-20 u-font-40 m-font-b">
									{{$t('Hi')}} , {{userInfo_common.username}}
								</view>
								<view class="text-light u-m-b-40">
									{{userInfo_common.balance?formatCurrency(userInfo_common.balance)+' ₽':'0.00 ₽'}}
								</view>
								<profile></profile>
							</view>
						</view>
					</view>
					<view class="pc-panel u-p-32">
						<view class="pc-panel-tt u-font-36 u-m-b-30">{{$t('user27')}}</view>
						<bankCard></bankCard>
					</view>
				</view>
				<view class="pc-right-bar">
					<pcSideUser></pcSideUser>
				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content">
				<view class="container">
					<uniNavHeader></uniNavHeader>
					<template v-if="tutorialKey == 7 || tutorialKey == 8">
						<view class="userTutorialMask"></view>
						<view class="finishClass u-flex" @click="skipTutorial">
							<view class="u-m-r-20">{{$t('跳过')}}</view>
							<image src="@/static/images/index/c_close.png" style="width: 20px;height: 20px;"></image>
						</view>
					</template>
					<view class="bs-wrapper">
						<view class="u-flex u-row-center flex--direction">
							<view class="u-flex u-col-center">
								<template v-if="userInfo_common.head_img">
									<view class="m-rela ava-class u-flex u-row-center" @click="userHeadImg_common">
										<image :src="userInfo_common.head_img" mode="aspectFill"
											style="width: 92px;height: 92px;border-radius: 50%;">
										</image>
										<image src="@/static/images/index/ava-1.png" class="ava-header-select">
										</image>
									</view>
								</template>
								<template v-if="!userInfo_common.head_img">
									<view class="m-rela" @click="userHeadImg_common">
										<image :src="require('@/static/images/index/menu/ava.png')"
											style="width: 105px;height: 103px;"></image>
										<image :src="require('@/static/images/index/ava-1.png')"
											class="ava-header-select">
										</image>
									</view>
								</template>
							</view>

							<view class="u-m-t-20 m-font-20 m-font-b">{{userInfo_common.username}}</view>
							<view class="balance-btn-4 u-flex u-row-center u-m-t-30">
								<image :src="require(`@/static/images/vip/${userInfo_common.level_name}.png`)"
									v-if="userInfo_common.level_name" class="level-vip-icon"></image>
									<!-- <view class="m-font-12 u-text-left">{{$t('等级')}}</view> -->
									<view class="level-class-1 u-m-l-30">
										<text class="iconfont icon-shoucang4 u-m-r-4 m-font-12"></text>
										<text
											class="m-font-12 m-font-b">{{userInfo_common.level_nickname?$t(userInfo_common.level_nickname):$t(userInfo_common.level_name)}}</text>
									</view>
							</view>
							<view class="balance-btn-1">
								<view class="m-font-18 m-font-b">
									{{userInfo_common.balance?formatCurrency(userInfo_common.balance)+' ₽':'0.00 ₽'}}
								</view>
								<view class="u-m-t-10">{{$t('user1')}}</view>
								<view class="u-m-t-10 u-flex u-row-center" v-if="userInfo_common.freeze_sta == 2">
									<u-count-down separator="ucenter" :timestamp="userInfo_common.freeze_countdown"
										font-size="32" color="#fff" separator-color="#000" bg-color="#D69923">
									</u-count-down>


									<image src="@/static/images/index/Subtract.png" mode=""
										style="width: 14px;height: 14px;margin-left: -25px;"
										@click="banusSescripton = !banusSescripton"></image>
									<view class="BonusSescriptionClass u-c-g" v-if="banusSescripton">{{$t('冻结彩金解封时间说明')}}
									</view>
									<view class="BonusSescriptionClassFixed" v-if="banusSescripton"
										@click="banusSescripton = !banusSescripton"></view>
								</view>
							</view>
							<view class="balance-btn-2 w_100 u-m-b-20">
								<view class="m-font-b u-flex u-row-center">
									<view class="text-yellow u-m-r-10 m-font-18">
										{{userInfo_common.freeze_sta == 3?formatCurrency(userInfo_common.freeze_balance)+' ₽':'0 ₽'}}
									</view>
									<view class="m-rela">
										<image src="@/static/images/index/Subtract.png" style="width: 14px;height: 14px"
											@click="banusSescripton2 = !banusSescripton2"></image>
										<view class="BonusSescriptionClass2 u-c-g" v-if="banusSescripton2">
											{{$t('冻结彩金金额说明')}}
										</view>
										<view class="BonusSescriptionClassFixed2" v-if="banusSescripton2"
											@click="banusSescripton2 = !banusSescripton2"></view>
									</view>
								</view>
								<view class="u-m-t-10">{{$t('冻结彩金')}}</view>
							</view>

							<!-- <view class="u-flex u-row-between w_100">
								<view class="w_50 balance-btn-2" @click="handselChange('add')">
									<view class="m-font-16">
										<text
											class="u-m-r-10 text-yellow">{{userInfo_common.already_handsel?userInfo_common.already_handsel+' ₽':'0.00 ₽'}}</text>
										<text class="iconfont icon-right"></text>
									</view>
									<view class="u-m-t-10">{{$t('累计彩金')}}</view>
								</view>
								<view class="w_50 balance-btn-2 u-m-l-20">
									<view class="m-font-16 text-yellow u-flex u-row-center">
										<view class="u-m-r-10">
											{{userInfo_common.freeze_sta == 3?userInfo_common.freeze_balance+' ₽':'0.00 ₽'}}
										</view>
										<view class="m-rela">
											<image src="@/static/images/index/Subtract.png" mode=""
												style="width: 14px;height: 14px;" @click="banusSescripton = !banusSescripton"></image>
											<view class="BonusSescriptionClass u-c-g" v-if="banusSescripton">{{$t('冻结彩金金额说明')}}</view>
										</view>
									</view>
									<view class="u-m-t-10">{{$t('冻结彩金')}}</view>
								</view>
							</view> -->
							<view class="u-flex u-row-between w_100 u-m-t-10 m-rela">
								<view class="w_50 balance-btn-3 u-m-l-50"
									@click="testLogin_go('/pages/ucenter/recharge')">
									<image src="@/static/images/index/menu/withdraw.png" mode=""
										style="width: 28px;height: 28px;z-index: 1;"></image>
									<view class="u-m-t-10">{{$t('user4')}}</view>
								</view>
								<view class="w_50 balance-btn-3 u-m-r-50 u-m-l-20" @click="withDrawChange">
									<image src="@/static/images/index/menu/insert.png" mode=""
										style="width: 28px;height: 28px;z-index: 1;"></image>
									<view class="u-m-t-10">{{$t('user5')}}</view>
								</view>
								<template v-if="tutorialKey == 7">
									<view class="tutorial-7 TutorialInfoClass_re">
										<view>{{$t('在这里为您的帐户充值')}}</view>
									</view>
								</template>
								<template v-if="tutorialKey == 7">
									<view class="tutorial-8 TutorialInfoClass_wi">
										<view>{{$t('提款从这里')}}</view>
										<view class="u-text-right text-yellow u-m-t-10" @click="tutorialChange(8)">
											{{$t('下一步')}}
										</view>
									</view>
								</template>
							</view>
							<view class="menu-class">
								<view class="u-flex u-row-between m-c-w menu-item-class"
									:class="tutorialKey == 8 && index== 0 ?'userTutorialPosition m-rela':''"
									v-for="(item,index) in userMenu" :key="`userMenu${index}`" @click="$go(item.url)">
									<template v-if="tutorialKey == 8 && index== 0">
										<view class="tutorial-9 TutorialInfoClass_ws">
											<view>{{$t('代理中心在这里')}}</view>
											<view class="u-text-right text-yellow u-m-t-10" @click="tutorialChange(9)">
												{{$t('下一步')}}
											</view>
										</view>
									</template>
									<view class="u-flex">
										<image :src="item.img" style="height: 20px;width: 20px"></image>
										<view class="u-m-l-20 m-font-15">{{item.text}}</view>
									</view>
									<view class="iconfont icon-right"></view>
								</view>
								<template v-if="androidIos == 1 && doanLoadAnd">
									<view class="u-flex u-row-between m-c-w menu-item-class u-m-t-30"
										@click="androidDownload">
										<view class="u-flex">
											<image src="@/static/images/index/menu/12.png"
												style="height: 22px;width: 22px">
											</image>
											<view class="u-m-l-20 m-font-15">{{$t('downloadDescription')}}</view>
										</view>
										<view class="iconfont icon-right"></view>
									</view>
								</template>
								<template v-if="androidIos == 2 && doanLoadIOS">
									<view class="u-flex u-row-between m-c-w menu-item-class u-m-t-30"
										@click="iosDownload">
										<view class="u-flex">
											<image src="@/static/images/index/menu/12.png"
												style="height: 22px;width: 22px">
											</image>
											<view class="u-m-l-20 m-font-15">
												{{iosBut==0?$t('downloadDescription'):iosBut==1?$t('信任开发者'):''}}
											</view>
										</view>
										<view class="iconfont icon-right"></view>
									</view>
								</template>
							</view>
						</view>
					</view>
					<view class="m-footer ucenter-active">
						<uniNavFooter fIndex="3"></uniNavFooter>
					</view>
					<u-popup v-model="handselPop" mode="bottom" :mask-custom-style="uPopMaskCustomStyle"
						borderRadius="32" @close="handseClose" z-index="10001">
						<view class="bs-popup pc_pop">
							<view class="bs-popup-hd">
								<view class="tt m-c-w">{{$t('彩金领取记录')}}</view>
								<image src="@/static/images/index/close.png"
									style="width: 32px;height: 32px;position: absolute;right: 15px;" mode=""
									@click="handselPop = false">
								</image>
							</view>
							<view class="bs-popup-body">
								<view class="hall-item-class">
									<view class="tra-filter u-flex" @click="dataShow = true">
										<view class="u-m-r-16">{{$t(sreachData)}}</view>
										<text class="iconfont icon-calendar u-c-g"></text>
									</view>
								</view>
								<view class="u-flex w_100 u-row-between u-c-g m-font-12 u-m-t-40 u-m-b-30">
									<view class="w_31">{{$t('彩金')}}</view>
									<view class="w_31">{{$t('来源')}}</view>
									<view class="w_31 u-text-center">{{$t('日期')}}</view>
								</view>
								<template v-if="empty == 1">
									<scroll-view style="max-height: 30vh;min-height: 30vh;" scroll-y="true"
										@scrolltolower="scrolltolowerChnage">
										<view class="u-flex u-row-between w_100 m-c-w u-m-t-20 hall-item-class"
											v-for="(item,index) in handselList" :key="`handselList${index}`">
											<view class="w_31 m-font-14 m-font-b">{{item.handsel}}</view>
											<view class="w_31 m-font-12">{{$t(item.msg)}}</view>
											<view class="w_31 u-text-center m-font-12">{{item.update_time}}</view>
										</view>
									</scroll-view>
								</template>
								<template v-if="empty == 0">
									<listEmpty :isDefault="true" class="u-bd-8" :listHighly='400'>
									</listEmpty>
								</template>
							</view>
						</view>
					</u-popup>
					<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10999">
					</u-top-tips>
					<u-popup v-model="handselInfoPop2" mode="bottom" :mask-custom-style="uPopMaskCustomStyle"
						borderRadius="32" z-index="10001">
						<view class="bs-popup pc_pop">
							<view class="bs-popup-hd">
								<view class="tt m-c-w">{{$t('冻结彩金备注')}}</view>
								<image src="@/static/images/index/close.png"
									style="width: 32px;height: 32px;position: absolute;right: 15px;" mode=""
									@click="handselInfoPop2 = false">
								</image>
							</view>
							<view class="bs-popup-body">
								<scroll-view style="max-height: 40vh;min-height: 40vh;" scroll-y="true">
									<view class="u-c-g">1.{{$t('注册彩金描述')}}</view>
									<view class="u-c-g u-m-t-30">2.{{$t('订单所产生收益描述')}}</view>
									<view class="u-c-g u-m-t-30">3.{{$t('代理返佣描述')}}</view>
								</scroll-view>
							</view>
						</view>
					</u-popup>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniNavFooter from '@/components/uni-foot-bar/uni-foot-bar.vue'
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	import pcSideUser from "./components/side-user.vue"
	import bankCard from "./components/bankCard.vue"
	import profile from "./components/profile.vue"
	export default {
		components: {
			uniNavHeader,
			uniNavFooter,
			pcNavHeader,
			pcSideBar,
			pcSideUser,
			profile,
			bankCard
		},
		data() {
			return {
				doanLoadAnd: false, // 安卓下载
				doanLoadIOS: false, // IOS下载
				iosBut: 0,
				androidDownloadUrl: '',
				iosDownloadUrl: '',
				androidIos: null, // 1安卓 2IOS
				userMenu: [{
					text: this.$t('menu8'),
					img: require('@/static/images/index/menu/4.png'),
					url: '/pages/wsCenter/index'
				}, {
					text: this.$t('我的注单'),
					img: require('@/static/images/index/menu/14.png'),
					url: '/pages/tradeing/index'
				}, {
					text: this.$t('账单记录'),
					img: require('@/static/images/index/menu/2.png'),
					url: '/pages/ucenter/record'
				}, {
					text: this.$t('user27'),
					img: require('@/static/images/index/menu/7.png'),
					url: '/pages/ucenter/bankCard'
				}, {
					text: this.$t('user8'),
					img: require('@/static/images/index/menu/6.png'),
					url: '/pages/ucenter/profile'
				}, {
					text: this.$t('邀请好友'),
					img: require('@/static/images/index/menu/8.png'),
					url: '/pages/invte/invte'
				}, {
					text: this.$t('常见问题'),
					img: require('@/static/images/index/menu/10.png'),
					url: '/pages/ucenter/kefu'
				}],
				handselPop: false,
				empty: null,
				sreachData: this.$t('选择日期'),
				page: 1,
				start_time: '',
				end_time: '',
				handselInfoPop2: false,
				banusSescripton: false,
				banusSescripton2: false
			}
		},
		onLoad() {
			this.getUserInfo_common();
			this.getStatus();
			this.tutorialKey = this.$helper.get('tutorialKey');
		},
		methods: {
			tutorialChange(i) {
				this.tutorialKey = i;
				this.$helper.set('tutorialKey', i);
				if (i == 9) {
					this.skipTutorial();
				}
			},
			scrolltolowerChnage() {
				if (this.status == 'noMore') {
					return;
				}
				this.handselChange();
			},
			dataConfirm(e) {
				this.start_time = '';
				this.end_time = '';
				this.sreachData = e.startMonth + '/' + e.startDay + '/' + e.startYear + ' - ' + e.endMonth + '/' + e
					.endDay + '/' + e.endYear;
				this.start_time = e.startDate;
				this.end_time = e.endDate;
				this.page = 1;
				this.handselList = [];
				this.handselChange('add');
			},
			handseClose() {
				this.start_time = '';
				this.end_time = '';
				this.page = 1;
				this.handselList = [];
				this.sreachData = this.$t('选择日期');
			},
			async handselChange(add) {
				uni.showLoading({
					mask: true,
					title: this.$t("loading")
				});
				let res = await this.$u.api.my_handsel_record_p({
					page: this.page,
					limit: 20,
					start_time: this.start_time,
					end_time: this.end_time
				});
				uni.hideLoading();
				if (res && res.code == 1) {
					this.handselPop = true;
					if (add) {
						this.handselList = res.data;
					} else {
						this.handselList = this.handselList.concat(res.data);
					}
					if (res.data.length == 20) {
						this.status = "loading";
						this.page++;
					} else {
						this.status = "noMore";
					}
					if (this.handselList.length > 0) {
						this.empty = 1;
					} else {
						this.empty = 0;
					}
				}
			},
			async getStatus() {
				uni.setNavigationBarTitle({
					title: this.$t('menu7')
				});
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
				let ret = await this.$u.api.doanload_p();
				if (ret) {
					this.androidDownloadUrl = ret.data.android_download_url;
					this.iosDownloadUrl = ret.data.ios_download_url;
				}
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
			}
		}
	}
</script>

<style lang="scss">
	.level-vip-icon {
		width: 56px;
		height: 56px;
		border-radius: 16px;
		background: rgba(49, 43, 79, 1);
	}

	.balance-btn-1 {
		margin: 10px 0 10px 0;
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

	.balance-btn-4 {
		width: 100%;
		text-align: center;
		border-radius: 16px;
		padding: 8px 12px;
		background: rgba(49, 43, 79, 1);
	}

	.menu-class {
		width: 100%;
		margin: 15px 0;
	}

	.menu-item-class {
		padding: 15px;
		background: rgba(62, 54, 100, 1);
		padding-bottom: 15px;
		border-bottom: 1px solid #4D4886;
	}

	.menu-item-class:first-child {
		border-radius: 12px 12px 0 0;
	}

	.menu-item-class:last-child {
		border-bottom: none;
		border-radius: 0 0 12px 12px;
	}

	.hall-item-class {
		padding-bottom: 10px;
		border-bottom: 1px solid #413D71;
	}

	.ava-header-select {
		position: absolute;
		bottom: 10px;
		right: 0;
		width: 36px;
		height: 36px;
	}

	.ava-class {
		background-image: url('@/static/images/index/ava-2.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		width: 110px;
		height: 110px;
	}

	.balance-btn-2 ::v-deep .uni-tooltip-popup {
		width: 140px;
		padding: 15px;
		left: -76px;
		z-index: 3;
	}

	.bs-popup-body {
		padding: 15px 0 15px 15px;
	}

	.bs-popup-body ::v-deep .uni-scroll-view {
		padding-right: 10px;
	}

	.BonusSescriptionClass {
		width: 140px;
		padding: 10px;
		border-radius: 5px;
		background-color: #2B2E44;
		position: absolute;
		top: 400px;
		right: 21%;
		z-index: 9;
		font-size: 12px;
		line-height: 20px;
	}

	.BonusSescriptionClass:before {
		content: "";
		position: absolute;
		bottom: 100%;
		left: 80%;
		border-style: solid;
		border-width: 10px;
		border-color: transparent transparent #2B2E44 transparent;
		transform: translateX(-50%);
	}

	.BonusSescriptionClassFixed {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
	}

	.BonusSescriptionClass2 {
		width: 200px;
		padding: 10px;
		border-radius: 5px;
		background-color: #2B2E44;
		position: absolute;
		top: 28px;
		right: -65px;
		z-index: 9;
		font-size: 12px;
		line-height: 20px;
	}

	.BonusSescriptionClass2:before {
		content: "";
		position: absolute;
		bottom: 100%;
		left: 62%;
		border-style: solid;
		border-width: 10px;
		border-color: transparent transparent #2B2E44 transparent;
		transform: translateX(-50%);
	}

	.BonusSescriptionClassFixed2 {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
	}





	// pc
	.vip-pc-icon {
		background-color: #1E1739;
		border-radius: 16px;
		width: 120px;
		height: 120px;
		display: inline-flex;
		align-items: center;
		justify-content: center;

		image {
			width: 104px;
			height: 104px;
		}
	}

	.pc-rela {
		position: relative;
		width: 88px;
		height: 88px;
		margin: 0 auto;
		cursor: pointer;

		.pc-rela-avatar {
			width: 88px;
			height: 88px;
			border-radius: 88px;
		}
	}

	.level-class-1 {
		color: #fff;
		padding: 5px 10px;
		border-radius: 6px;
		background: linear-gradient(180deg, #F0B000 0%, #EC8D00 100%);
	}
</style>
