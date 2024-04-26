<template>
	<view :class="isOpen?'pc-open':'pc-close'">
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main u-flex u-col-top pc-has-right">
				<pcSideBar :pageIndex="51" @menu-event="parentMenu"></pcSideBar>
				<view class="pc-wrapper">
					<view class="pc-panel u-m-b-32 u-p-60">
						<view class="u-flex u-abso vip-userInfo">
							<template v-if="userInfo_common.head_img">
								<image :src="userInfo_common.head_img"
									style="width: 40px;height: 40px;border-radius: 50%;" @click="userHeadImg_common">
								</image>
							</template>
							<template v-if="!userInfo_common.head_img">
								<image :src="require('@/static/images/vip/avatar.png')"
									style="width: 40px;height: 40px;" @click="userHeadImg_common"></image>
							</template>
							<view class="u-m-l-20">
								<view class="m-font-20 m-font-b">{{userInfo_common.username}}</view>
								<view class="m-font-14 text-yellow u-m-t-6">
									{{userInfo_common.balance?formatCurrency(userInfo_common.balance)+' ₽':'0.00 ₽'}}
								</view>
							</view>
						</view>
						<view class="vip-pc-swiper" v-if="userVip">
							<view class="swiper-arrow swiper-left" @click="goToPrev">
								<text class="iconfont icon-left"></text>
							</view>
							<view class="swiper-arrow swiper-right" @click="goToNext">
								<text class="iconfont icon-right"></text>
							</view>
							<swiper class="pc-swiper" display-multiple-items="1" previous-margin="34%" next-margin="33%"
								:current="VIPCurrent" @change="VIPswiperList" :autoplay="false" ref="vipSwiper">
								<swiper-item v-for="(item,index) in userVip" :key="index" class=" u-flex u-row-center"
									style="overflow: inherit;">
									<image :src="require(`@/static/images/vip/${item.level_name}.png`)" mode="widthFix"
										:class="VIPCurrent == index ? 'pc-vip-active-item' : 'pc-vip-item u-m-t-30'">
									</image>
								</swiper-item>
							</swiper>
						</view>
					</view>
					<view class="pc-panel u-p-48">
						<view v-if="userVip.length > 0" class="w_80">
							<view class="m-font-18 u-m-b-32">{{$t('您将获得')}}</view>
							<view class="u-flex u-row-between  u-m-b-32 ">
								<view class="w_50 vip-receive-bonus-card u-text-center">
									<text>{{userVip[VIPCurrent].level_gold?formatCurrency(userVip[VIPCurrent].level_gold)+' ₽':'0 ₽'}}</text>
								</view>
								<view class="w_50 vip-receive-bonus-card u-text-center u-m-l-14">
									{{userVip[VIPCurrent].integral?userVip[VIPCurrent].integral:'0'}} {{$t('积分')}}
								</view>
							</view>
							<view class="cur_pointer"
								:class="userVip[VIPCurrent].status == 1 ?'yes-receiveBtn':'no-receiveBtn'"
								@click="receiveAward(userVip[VIPCurrent].id)">
								{{userVip[VIPCurrent].status == 1?$t('领取'):userVip[VIPCurrent].status == 2?$t('已领取'):$t('暂不可领取')}}
							</view>
						</view>
					</view>
				</view>
				<view class="pc-right-bar">
					<pcSideTrade></pcSideTrade>
				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="container u-skeleton">
				<view class="bs-wrapper">
					<view class="vip-navbar u-flex u-row-center">
						<image src="@/static/images/index/logo.png"
							style="width: 72px;height: 44px;position: absolute;left: 12px;" @click="common_back">
						</image>
						<view class="m-font-b m-font-18">{{$t('VIPClub')}}</view>
					</view>
					<template v-if="tutorialKey == 6">
						<view class="userTutorialMask"></view>
						<view class="finishClass u-flex" @click="skipTutorial">
							<view class="u-m-r-20">{{$t('跳过')}}</view>
							<image src="@/static/images/index/c_close.png" style="width: 20px;height: 20px;"></image>
						</view>
					</template>
					<template v-if="tutorialKey == 6">
						<view class="tutorial-6 TutorialInfoClass_page_vip">
							<view>{{$t('VIP指导')}}</view>
							<view class="u-text-right text-yellow u-m-t-10" @click="tutorialChange(7)">
								{{$t('下一步')}}
							</view>
						</view>
					</template>
					<template v-if="tutorialKey == 6">
						<view class="footer-vip u-flex u-row-center flex--direction" @click="tutorialChange(7)">
							<image src="@/static/images/index-footer/bottom-44.png"
								style="width: 20px;height: 20px;"></image>
							<view class="u-m-t-14">{{$t("VIP")}}</view>
						</view>
					</template>
					<view class="u-flex u-m-t-20">
						<template v-if="userInfo_common.head_img">
							<image :src="userInfo_common.head_img" style="width: 40px;height: 40px;border-radius: 50%;"
								@click="userHeadImg_common">
							</image>
						</template>
						<template v-if="!userInfo_common.head_img">
							<image :src="require('@/static/images/vip/avatar.png')" style="width: 40px;height: 40px;"
								@click="userHeadImg_common"></image>
						</template>
						<view class="u-m-l-20">
							<view class="u-flex">
								<view class="m-font-20 m-font-b">{{userInfo_common.username}}</view>
								<view class="user-vip-level u-m-l-20" v-if="userInfo_common.level_name == 'VIP0'">
									{{userInfo_common.level_nickname?$t(userInfo_common.level_nickname):$t(userInfo_common.level_name)}}
								</view>
								<view class="user-vip-leve2 u-m-l-20 u-flex"
									v-if="userInfo_common.level_name != 'VIP0'">
									<view class="iconfont icon-shoucang4 m-font-11"></view>
									<view class="m-font-11 u-m-l-10">
										{{userInfo_common.level_nickname?$t(userInfo_common.level_nickname):$t(userInfo_common.level_name)}}
									</view>
								</view>
							</view>

							<view class="m-font-14 text-yellow u-m-t-6">
								{{userInfo_common.balance?formatCurrency(userInfo_common.balance)+' ₽':'0.00 ₽'}}
							</view>
						</view>
					</view>
					<template v-if="userVip">
						<swiper class="vip-swiper" display-multiple-items="1" previous-margin="34%" next-margin="33%"
							:current="VIPCurrent" @change="VIPswiperList" :autoplay="false">
							<swiper-item v-for="(item,index) in userVip" :key="index"
								class="u-p-t-50 u-flex u-row-center" style="overflow: inherit;">
								<image :src="require(`@/static/images/vip/${item.level_name}.png`)" mode="widthFix"
									:class="VIPCurrent == index ? 'vip-active-item' : 'vip-item'">
								</image>
							</swiper-item>
						</swiper>
						<template v-if="userVip.length > 0 && userVip[VIPCurrent].vip_condition.length > 0">
							<view class="u-flex u-row-center u-m-t-40">
								<view class="vip-details-btn" @click="lookVipDetailsChange">{{$t('查看')}}</view>
							</view>
						</template>
					</template>

					<view class="user-profile-panel u-p-30 u-m-t-40"
						v-if="userVip.length > 0 && userVip[VIPCurrent].level_name != 'VIP0'">
						<view class="u-text-center m-font-18">{{$t('您将获得')}}</view>
						<view class="u-flex u-row-center w_100 u-m-t-20 u-m-b-20">
							<view class="w_50 vip-receive-bonus-card u-text-center">
								<text>{{userVip[VIPCurrent].level_gold?formatCurrency(userVip[VIPCurrent].level_gold)+' ₽':'0 ₽'}}</text>
							</view>
							<!-- <view class="w_50 vip-receive-bonus-card u-text-center u-m-l-14">
								{{userVip[VIPCurrent].integral?userVip[VIPCurrent].integral:'0'}} {{$t('积分')}}
							</view> -->
						</view>
						<view :class="userVip[VIPCurrent].status == 1 ?'yes-receiveBtn':'no-receiveBtn'"
							@click="userVip[VIPCurrent].status == 1 ?receiveAward(userVip[VIPCurrent].id):''">
							{{userVip[VIPCurrent].status == 1?$t('领取'):userVip[VIPCurrent].status == 2?$t('已领取'):$t('暂不可领取')}}
						</view>
					</view>
					<view class="user-profile-panel u-p-30 u-m-t-40"
						v-if="userVip.length > 0 && userVip[VIPCurrent].level_name == 'VIP0'">
						<view class="u-text-center m-font-13">{{$t('获得等级的任务')}}</view>
						<view class="u-m-t-20 text-yellow m-font-18 u-text-center">
							{{userInfo_common.level_nickname?$t(userInfo_common.level_nickname):$t(userInfo_common.level_name)}}
						</view>
						<view class="vip-recharge-class1 u-flex u-row-right" @click="$go('/pages/invte/invte')">
							<image src="@/static/images/vip/vip-rech.png"
								style="width: 127px;height: 60px;position: absolute;left: 30px;bottom: 0;"></image>
							<view class="u-flex m-font-16 m-font-b u-row-right">
								<view class="u-m-r-20">{{$t('邀请另一个人')}}</view>
								<view class="iconfont icon-arrowright"></view>
							</view>
						</view>
					</view>
					<!-- <view class="collapse-bar u-m-t-46 u-m-b-26">
						<image src="../../static/images/index/emoji01.png" mode=""></image>
						<text>{{$t('可享福利')}}</text>
					</view>
					<view class="collapse-cells">
						<u-collapse :accordion="false" :head-style="headStyle" :bodyStyle="bodyStyle">
							<u-collapse-item v-for="(item, index) in itemList" :key="index">
								<view class="collapse-title" slot="title">
									{{item.head}}
								</view>
								<view class="collapse-body">
									{{item.body}}
								</view>
							</u-collapse-item>
						</u-collapse>
					</view> -->
					<view class="u-text-center u-m-t-60 u-m-b-20 m-font-18 m-font-b">{{$t("VIP标题描述")}}</view>
					<view class="fan-card u-p-30">
						<view>{{$t("VIP内容描述")}}</view>
					</view>
					<view style="height: 10px;"></view>
				</view>
			</view>
			<view class="m-footer ucenter-active">
				<uniNavFooter fIndex="2"></uniNavFooter>
			</view>
		</template>
		<u-skeleton :loading="skeletonLoading" :animation="true" bgColor="var(--body-bg)" el-color="var(--u-skeletonA)"
			bg-color="var(--u-skeletonB)"></u-skeleton>
		<u-popup v-model="vipDetailsPop" mode="bottom" borderRadius="32" :mask-custom-style="uPopMaskCustomStyle">
			<view class="bs-popup-hd u-p-30">
				<view class="tt">{{$t('VIP')}}</view>
				<image src="@/static/images/index/close.png"
					style="width: 32px;height: 32px;position: absolute;right: 15px;" mode=""
					@click="vipDetailsPop = false">
				</image>
			</view>
			<view class="bs-popup-body" v-if="userVip.length > 0">
				<view class="u-flex u-row-between vip-cond_row"
					v-for="(item,index) in userVip[VIPCurrent].vip_condition" :key="`userVip${index}`">
					<view class="u-flex max-w_70">
						<view class="conDian"></view>
						<view class="">
							<view class="vip-value m-font-16">
								{{item.value}}
							</view>
							<view class="vip-key u-c-g u-m-t-6">
								{{item.key}}
							</view>
						</view>
					</view>
					<view class="vip_plan">{{(item.plan*100).toFixed(2)+'%'}}</view>
				</view>
			</view>
		</u-popup>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10999">
		</u-top-tips>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniNavFooter from '@/components/uni-foot-bar/uni-foot-bar.vue'
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	import pcSideTrade from "@/components/pc-side-trade/trade.vue"
	export default {
		components: {
			uniNavHeader,
			pcNavHeader,
			pcSideBar,
			pcSideTrade,
			uniNavFooter
		},
		data() {
			return {
				userVip: [], //用户VIP数据
				currVip: {}, //展示下级晋升数据
				skeletonLoading: true,
				VIPCurrent: 0,
				itemList: [{
					head: '1.' + this.$t('什么是充值总额'),
					body: this.$t('充值总额详情')
				}, {
					head: '2.' + this.$t('直推总额'),
					body: this.$t('直推总额详情')
				}, {
					head: '3.' + this.$t('团队总人数是什么'),
					body: this.$t('团队总人数详情')
				}, {
					head: '4.' + this.$t('VIP问题4'),
					body: this.$t('VIP答案4')
				}, {
					head: '5.' + this.$t('VIP问题5'),
					body: this.$t('VIP答案5')
				}],
				headStyle: {
					color: 'var(--body-color)'
				},
				bodyStyle: {
					color: '#999'
				},
				vipDetailsPop: false
			}
		},
		async onLoad() {
			this.tutorialKey = this.$helper.get('tutorialKey');
			await this.getUserVip();
			this.getUserInfo_common();
			uni.setNavigationBarTitle({
				title: this.$t('VIPClub')
			});
		},
		methods: {
			tutorialChange(i) {
				this.$helper.set('tutorialKey', i);
				this.$go('/pages/ucenter/index');
			},
			lookVipDetailsChange() {
				this.vipDetailsPop = true;
			},
			lookVipDetailsClose() {
				this.vipDetailsPop = false;
			},
			async receiveAward(level_id) {
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.vip_apply_p({
					level_id
				});
				uni.hideLoading();
				if (res && res.code == 1) {
					this.getUserVip()
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
				}
			},
			VIPswiperList(e) {
				this.VIPCurrent = e.detail.current;
			},
			//购买VIP
			async buyVIP() {
				var _this = this;
				uni.showLoading({
					title: this.$t('loading')
				});
				let parm = {
					id: _this.currVip.id
				};
				let res = await this.$u.api.buy_vip_p(parm);
				if (res.code == 1) {
					let newVip = _this.userVip[Number(res.data) - 1];
					_this.activeLevel = newVip.activeVip;
					_this.currVip = newVip;
					_this.userInfo_common.level_id = newVip.id;
					_this.userInfo_common.level_name = newVip.level_name;
					await _this.getUserInfo_common(); //获取用户信息
				}
				_this.$refs.uTips.show({
					title: _this.$t(res.msg)
				});
				_this.vipTipShow = false;

			},
			async getUserVip() {
				let res = await this.$u.api.user_vip_p();
				if (res && res.code == 1) {
					this.skeletonLoading = false;
					let vip = [];
					vip = res.data;
					for (let i in vip) {
						vip[i].activeVip = Number(vip[i].id) - 1;
						if (this.userInfo_common.level_id == vip[i].id) {
							this.currVip = vip[Number(i)];
							this.VIPCurrent = Number(i);
						}
					}
					this.userVip = vip;
				}
				setTimeout(function() {
					document.querySelector('.vip-swiper').classList.add('show');
				}, 1000); // 延迟1秒后显示元素
			},
			goToPrev() {
				if (this.VIPCurrent > 0) {
					this.VIPCurrent -= 1;
				}
				console.log(this.VIPCurrent)
			},
			goToNext() {
				if (this.VIPCurrent < this.userVip.length - 1) {
					this.VIPCurrent += 1;
				}
			},
		}
	}
</script>

<style lang="scss">
	.bs-wrapper {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-image: url("@/static/images/vip/Rectangle.png");
	}

	.vip-navbar {
		height: 70px;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
	}

	.user-profile-panel {
		background-position: top center;
		background-size: 182px 3px;
		background-repeat: no-repeat;
		background-image: url("@/static/images/vip/Vector.png");
	}

	.collapse-bar {
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 20px;
			height: 20px;
		}
	}

	.collapse-cells {
		::v-deep .u-collapse-item {
			background-color: #3E3664;
			border-radius: 15px;
			overflow: hidden;
			margin-bottom: 10px;

			.u-collapse-head {
				padding: 0 !important;
			}
		}

		.collapse-title {
			padding: 20px 0 20px 20px;
		}

		::v-deep .u-arrow-down-icon {
			width: 32px;
			height: 32px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #D1CCE9;
			border-radius: 50%;
			background-color: #4D4886;
		}

		.collapse-body {
			background-color: #312B4F;
			color: #ffffff;
			padding: 15px;
		}
	}

	.vip-receive-bonus-card {
		padding: 12px;
		font-size: 18px;
		font-weight: 600;
		border-radius: 16px;
		background: rgba(65, 61, 113, 1);
	}

	.yes-receiveBtn {
		width: 100%;
		text-align: center;
		padding: 0 5px;
		height: 40px;
		line-height: 40px;
		color: #FFF;
		border-radius: 10px;
		font-weight: bold;
		background: rgba(233, 174, 58, 1);
	}

	.no-receiveBtn {
		width: 100%;
		text-align: center;
		padding: 0 5px;
		height: 40px;
		line-height: 40px;
		color: #9895A7;
		border-radius: 10px;
		font-weight: bold;
		background: #8D6D44;
	}

	.vip-swiper {
		margin-top: -30px;
		width: 100%;
		padding: 0 12%;
		height: 260px;
		background-image: url('@/static/images/vip/picture.png');
		background-repeat: no-repeat;
		background-size: 100% 72px;
		background-position: bottom;
		opacity: 0;
		transition: opacity .5s;
		transition-delay: .5s;
	}

	.vip-swiper.show {
		opacity: 1;
	}


	.vip-active-item {
		width: 240px;
		transform: scale(2);
		transition: all .5s;
		z-index: 99;
	}

	.vip-item {
		z-index: 88;
		width: 175px;
		transform: scale(1.6);
		transition: all .5s;
		filter: blur(2px);
	}

	.vip-details-btn {
		font-size: 16px;
		min-width: 125px;
		text-align: center;
		padding: 10px 20px;
		border-radius: 12px;
		background: rgb(233, 174, 58);
	}

	.conDian {
		width: 8px;
		height: 8px;
		min-width: 8px;
		min-height: 8px;
		margin-right: 8px;
		border-radius: 50%;
		background-color: #E9AE3A;
	}

	.vip_plan {
		text-align: center;
		min-width: 50px;
		margin-left: 5px;
		padding: 4px 8px;
		border-radius: 12px;
		background: rgba(233, 174, 58, 1);
	}

	.vip-cond_row {
		border-bottom: 1px solid #403d6e;
		padding: 10px 0 10px 0;
	}

	.vip-cond_row:last-child {
		border-bottom: 0;
		padding: 10px 0 30px 0;
	}

	// pc
	.vip-pc-swiper {
		position: relative;
		width: 548px;
		height: 320px;
		margin: 0 auto;
		background-image: url('@/static/images/vip/pc-swiper-bg.png');
		background-position: center bottom;
		background-repeat: no-repeat;
		padding-bottom: 20px;

		.swiper-arrow {
			position: absolute;
			top: 50%;
			margin-top: -20px;
			width: 40px;
			height: 40px;
			border-radius: 10px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			background-color: #828095;
			cursor: pointer;
			color: #1E1739;
			font-weight: bold;
		}

		.swiper-left {
			left: -30px
		}

		.swiper-right {
			right: -30px;
		}
	}

	.pc-swiper {
		width: 100%;
		height: 300px;
	}

	.pc-vip-item {
		width: 160px;
		height: 175px;
		transition: all .5s;
		filter: blur(2px);
		transform: scale(1.5);
	}

	.pc-vip-active-item {
		width: 240px;
		height: 240px;
		transform: scale(1.8);
	}

	.vip-userInfo {
		top: 24px;
		left: 15px;
	}

	.w_80 {
		width: 80%;
	}


	.vip-recharge-class1 {
		padding: 23px 20px;
		margin-top: 14px;
		position: relative;
		border-radius: 16px;
		background-image: url('@/static/images/help/bg-2.png');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		background-color: rgba(62, 54, 100, 1);
	}
	
	.vip-recharge-class1 .bottom-bg3 {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 100px;
		height: 85px;
		background-image: url('@/static/images/help/3-right.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		z-index: 1;
	}

	.user-vip-level {
		padding: 3px 10px;
		border-radius: 6px;
		border: 1px solid rgba(209, 204, 233, 1);
		font-family: TT Hoves;
		font-size: 11px;
		font-weight: 600;
		line-height: 14px;
		text-align: center;
	}


	.user-vip-leve2 {
		padding: 3px 10px;
		font-weight: 600;
		line-height: 14px;
		border-radius: 6px;
		background: linear-gradient(180deg, #F0B000 0%, #EC8D00 100%);
	}
	
	.footer-vip {
		position: fixed;
		z-index: 10999;
		width: 95px;
		height: 64px;
		bottom: 27px;
		right: 27%;
		border-radius: 16px;
		background: linear-gradient(to top,#5B4409,#0E0E0D);
	}
</style>
