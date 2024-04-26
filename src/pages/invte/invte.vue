<template>
	<view :class="isOpen?'pc-open':'pc-close'">
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main u-flex u-col-top pc-has-right">
				<pcSideBar :pageIndex="4" @menu-event="parentMenu"></pcSideBar>
				<view class="pc-wrapper">
					<view class="pc-wrapper-head u-flex u-m-b-30">
						<text class="iconfont icon-business-handshake u-font-36 u-m-r-16"></text>
						<text class="u-font-36">{{$t('推荐有礼')}}</text>
					</view>
					<view class="pc-panel u-flex u-m-b-30 u-p-32" style="background:#3E3664">
						<view class="flex_bd">
							<view class="share-left">
								<view class="u-font-36 u-m-b-30">{{$t('我的推广')}}</view>
								<view class="share-cell u-m-b-30">
									<view class="u-m-b-20">{{$t('agent12')}}:</view>
									<view class="share-bar">
										<view class="flex_bd">{{teampromotion.rec_url}}</view>
										<view class="iconfont icon-fuzhituceng"
											@click="copy(teampromotion.rec_url,'iscopya')"></view>
									</view>
								</view>
								<view class="share-cell">
									<view class="u-m-b-20">{{$t('agent13')}}:</view>
									<view class="share-bar">
										<view class="flex_bd">{{teampromotion.rec_code}}</view>
										<view class="iconfont icon-fuzhituceng"
											@click="copy(teampromotion.rec_code,'iscopya')"></view>
									</view>
								</view>
							</view>
						</view>
						<view class="gift-box">
							<image src="../../static/images/pc/pc-gift.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="pc-panel u-p-32 u-m-b-30">
						<view class="g-label u-font-32 u-m-b-30 u-flex u-row-center">
							<image src="@/static/images/index/emoji01.png" mode="" style="width: 20px;height: 20px;">
							</image>
							<text>{{$t('您将获得')}}</text>
						</view>
						<u-row gutter="20">
							<u-col span="6">
								<view class="invte-data u-flex">
									<view class="ec-pic">
										<image src="../../static/images/pc/data-1.png" mode=""></image>
									</view>
									<view class="flex_bd">
										<view class="u-font-28 text-light u-m-b-20">{{$t('目前还差')}}</view>
										<view class="u-font-36">
											<u-line-progress active-color="#E9AE3A" inactive-color="#5C46AD" height="43"
												:show-percent="false" :percent="teampopularize.percentage">
												<view class="m-font-13"
													:class="teampopularize.percentage<=30?'u-line-progress-no-data':''">
													{{(teampopularize.people?teampopularize.people:'0')+'/'+(teampopularize.task_volume?teampopularize.task_volume:'0')}}
												</view>
											</u-line-progress>
										</view>
									</view>
								</view>
							</u-col>
							<u-col span="6">
								<view class="invte-data u-flex">
									<view class="ec-pic">
										<image src="../../static/images/pc/data-2.png" mode=""></image>
									</view>
									<view class="flex_bd">
										<view class="u-font-28 text-light u-m-b-20">
											{{$t('佣金')}}
										</view>
										<view class="u-font-36">
											{{teampopularize.not_finish[0].stratum_bonus?formatCurrency(teampopularize.not_finish[0].stratum_bonus)+' ₽':'0 ₽'}}
										</view>
									</view>
								</view>
							</u-col>
						</u-row>
					</view>
					<view class="vip-pc-swiper" v-if="userVip">
						<view class="swiper-arrow swiper-left" @click="goToPrev">
							<text class="iconfont icon-left"></text>
						</view>
						<view class="swiper-arrow swiper-right" @click="goToNext">
							<text class="iconfont icon-right"></text>
						</view>
						<view class="swiper-main">
							<swiper :autoplay="false" :current="VIPCurrent" class="u-skeleton-fillet vipSwiperClass"
								@change="VIPswiperList" display-multiple-items="2">
								<swiper-item v-for="(item,index) in userVip" :key="`userVip${index}`">
									<view class="vipClubClass">
										<view class="u-flex vipItemClubTop">
											<view class="item-icon">
												<image :src="require(`@/static/images/vip/${item.level_name}.png`)"
													mode="widthFix"
													:class="VIPCurrent == index ? 'pc-vip-active-item' : 'pc-vip-item '">
												</image>
											</view>
											<view class="vip_level">{{item.level_name}}</view>
										</view>
										<scroll-view scroll-y="true" class="conditionClass"
											v-if="item.vip_condition.length > 0">
											<view class="vip-cond_row u-flex" v-for="(iit,iidex) in item.vip_condition"
												:key="`vip_condition${iidex}`">
												<text class="conDian"></text>
												<view class="flex_bd">
													<view class="vip-value">
														{{iit.value}}
													</view>
													<view class="vip-key">
														{{iit.key}}
													</view>
												</view>
											</view>
										</scroll-view>
									</view>
								</swiper-item>
							</swiper>
							<view class="custom-dots">
								<view v-for="(item, index) in userVip" :key="`dot-${index}`"
									:class="{'dot': true, 'active': VIPCurrent === index}"
									@click="setSwiperCurrent(index)"></view>
							</view>
							<!-- <view class="swiper-icon-left swiper-icon"
								:class="VIPCurrent > 0 ? 'swiper-active-icon' : ''">
								<u-icon name="arrow-leftward" color="var(--textPwdStyle-bg)" size="28"
									@click="VIPCurrentCut"></u-icon>
							</view>
							<view class="swiper-icon-right swiper-icon"
								:class="VIPCurrent < userVip.length - 1 ? 'swiper-active-icon' : ''">
								<u-icon name="arrow-rightward" color="var(--textPwdStyle-bg)" size="28"
									@click="VIPCurrentAdd"></u-icon>
							</view> -->
						</view>
					</view>
				</view>
				<view class="pc-right-bar">
					<pcSideTrade></pcSideTrade>
				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content" :data-theme="themeMode">
				<view class="container">
					<uniNavHeader isback :title="this.$t('推荐有礼')" :pageActive="8"></uniNavHeader>
					<view class="bs-wrapper">
						<view class="invte-main">
							<view class="inv-cells">
								<view class="inv-banner">
									<u-image :src="$t('invteTopImg')" class="invImg" borderRadius="8px" height="160px"
										mode="aspectFill">
										<u-loading slot="loading"></u-loading>
									</u-image>
								</view>
								<template v-if="teamStatus == 1">
									<view class="inv-numbsers u-flex" v-if="InvitationEvent == 2">
										<view class="flex_bd">
											<scroll-view scroll-x="true">
												<view class="num-box"
													:class="teampopularize.people>item.stratum_number?'active':''"
													v-for="(item,index) in teampopularize.finish" :key="`fin${index}`">
													<image src="@/static/images/vip/heroicons.png" style="width: 20px;height: 20px;"></image>
													<view class="num-label">{{item.stratum_number}}</view>
												</view>
												<template v-if="!is_top">
													<view class="num-box" @click="popularizeChange(index)"
														:class="detailsIndex==index?'clickActive':''"
														v-for="(item,index) in teampopularize.not_finish"
														:key="`no_fin${index}`">
														<image src="@/static/images/vip/heroicons.png" style="width: 20px;height: 20px;"></image>
														<view class="num-label">{{item.stratum_number}}</view>
													</view>
												</template>
											</scroll-view>
										</view>
									</view>
									<view class="fan-card fan-inv-card u-m-b-40">
										<view class="u-p-30">
											<view class="g-label m-font-18 u-m-b-20 u-text-center">{{$t('您将获得')}}</view>
											<u-line-progress active-color="#E9AE3A" inactive-color="#5C46AD" height="48"
												:show-percent="false" :percent="teampopularize.percentage">
												<view class="u-flex" :class="teampopularize.percentage<=30?'u-line-progress-no-data':''">
													<view class="m-font-13 u-m-r-10">
														{{(teampopularize.people?teampopularize.people:'0')+'/'+(teampopularize.task_volume?teampopularize.task_volume:'0')}}
													</view>
													<image src="@/static/images/vip/heroicons2.png" style="width: 16px;height: 16px;"></image>
												</view>
											</u-line-progress>
											<view class="u-flex u-row-center w_100 u-m-t-20 u-m-b-20">
												<view class="w_50 invte-card u-text-center">
													<text
														v-if="teampopularize.not_finish">{{teampopularize.not_finish[detailsIndex].stratum_bonus?formatCurrency(teampopularize.not_finish[detailsIndex].stratum_bonus)+' ₽':'0 ₽'}}</text>
												</view>
												<!-- <view class="w_50 invte-card u-text-center u-m-l-14">
													<text
														v-if="teampopularize.not_finish">{{teampopularize.not_finish[detailsIndex].integral}} {{$t('积分')}}</text>
												</view> -->
											</view>
											<!-- <view class="u-flex u-row-center">
													<image src="@/static/images/cancel.png"
														style="width: 20px;height: 20px;" mode=""></image>
													<view class="u-m-l-16" v-if="InvitationEvent == 2">
														{{$t('目前还差')}}
														{{(teampopularize.task_volume - teampopularize.people)?(teampopularize.task_volume - teampopularize.people):'0'}}
														{{$t('个有效用户')}}
													</view>
												</view> -->
											<view class="receiveBtn u-m-t-40"
												:class="actionRewards.count > 0 && actionRewards.sum_rewards_price > 0 && InvitationEvent == 1?'yes-receiveBtn':'no-receiveBtn'"
												@click="actionRewards.count > 0 && actionRewards.sum_rewards_price > 0 && InvitationEvent == 1?getApplyRewards():''">
												{{$t('领取')}}
											</view>
										</view>
									</view>
								</template>
								<view class="thirdAppClass" :class="thirdApp.length > 4 ? 'thirdAppScrollView' : 'u-p-b-30'"
									v-if="thirdApp && thirdApp.length > 0">
									<view class="m-font-18 u-m-b-20 u-text-center">{{$t('分享可领取奖励')}}</view>
									<scroll-view scroll-x="true">
										<view class="u-flex">
											<view class="thirdAppItem" v-for="(item,index) in thirdApp" :key="`thirdApp${index}`"
												:class="index > 0 ? 'u-m-l-20' : ''" @click="platUrl2(item.link)">
												<image :src="item.icon" style="width: 30px;height: 30px;border-radius: 3px;"></image>
											</view>
										</view>
									</scroll-view>
								</view>
								<template v-if="teamStatus == 2">
									<view class="ws-applay">
										<view class="ws-article">
											<view class="hd-cont">
												<view class="t1 u-strong m-c-w">{{$t('agent68')}}</view>
											</view>
											<view class="ws-content">
												<view class="ws-level-cell" :class="isIR?'m-text-right':''">
													<view class="tt">
														1: {{$t('agent9')}}
													</view>
													<view class="info">{{$t('agent70')}}</view>
												</view>
												<view class="ws-level-cell" :class="isIR?'m-text-right':''">
													<view class="tt">
														2: {{$t('agent38')}}
													</view>
													<view class="info">{{$t('agent71')}}</view>
												</view>
												<view class="ws-level-cell" :class="isIR?'m-text-right':''">
													<view class="tt">
														3: {{$t('agent73')}}
													</view>
													<view class="info">{{$t('agent72')}}</view>
												</view>
											</view>
										</view>
									</view>
								</template>
							</view>
							<view class="u-text-center u-m-t-40 u-m-b-20 m-font-18 m-font-b">{{$t("推荐有礼标题描述")}}</view>
							<view class="fan-card u-p-30">
								<view>{{$t("推荐有礼内容描述")}}</view>
							</view>
						</view>
						<view class="inv-foot" v-if="teamStatus == 1">
							<uni-row :gutter="20">
								<uni-col :span="24">
									<view class="inv-copy-cell u-m-b-30">
										<view class="inv-label">{{$t('agent12')}}</view>
										<view class="flex_bd">
											<view class="m-line-1">{{teampromotion.rec_url}}</view>
										</view>
										<image src="../../static/images/file_copy.png" class="copy-icon"
											@click="copy(teampromotion.rec_url,'iscopya')"></image>
									</view>
								</uni-col>
								<uni-col :span="24">
									<view class="inv-copy-cell">
										<view class="inv-label">{{$t('agent13')}}</view>
										<view class="flex_bd">
											<view class="m-line-1">{{teampromotion.rec_code}}</view>
										</view>
										<image src="../../static/images/file_copy.png" class="copy-icon"
											@click="copy(teampromotion.rec_code,'iscopya')"></image>
									</view>
								</uni-col>
							</uni-row>
						</view>
					</view>
				</view>
			</view>
		</template>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10999">
		</u-top-tips>
		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	import pcSideTrade from "@/components/pc-side-trade/trade.vue"
	export default {
		components: {
			uniNavHeader,
			listEmpty,
			pcNavHeader,
			pcBg,
			pcSideBar,
			pcSideTrade
		},
		data() {
			return {
				cateValue: 0,
				collvalue: "0",
				iscopya: false,
				iscopyb: false,
				isget: false,
				teampromotion: {}, // 推广链接
				is_top: false,
				actionList: [],
				actionRewards: {},
				teampopularize: {}, //推广用户数据
				InvitationEvent: null,
				teamStatus: null,
				userVip: [], //用户VIP数据
				currVip: {}, //展示下级晋升数据
				skeletonLoading: true,
				VIPCurrent: 0,
				detailsIndex: 0,
				thirdApp: []
			}
		},
		async onLoad() {
			await this.getteampromotion();
			if (!this.mobile_common) {
				await this.getUserVip();
			}
			this.getAppShare();
			this.getUserInfo_common();
			// await this.getRewards();
			this.getActionShareDetail();
			uni.setNavigationBarTitle({
				title: this.$t('推荐有礼')
			});
		},
		methods: {
			async getAppShare() {
				let res = await this.$u.api.team_app_share_p();
				if (res && res.code == 1) {
					this.thirdApp = res.data;
				}
			},
			popularizeChange(i) {
				this.detailsIndex = i;
			},
			parentMenu() {
				this.menuToggle()
			},
			async getActionShareDetail() {
				let res = await this.$u.api.action_share_detail_p();
				if (res) {
					this.actionList = res.data;
					if (this.actionList.id) {
						this.InvitationEvent = 1;
						this.getRewards(this.actionList.id);
					} else {
						this.InvitationEvent = 2;
						this.getTeampopularize();
					}
				}
			},
			async getRewards(action_id) {
				let res = await this.$u.api.action_get_action_rewards_p({
					action_id
				});
				if (res) {
					this.actionRewards = res.data;
				}
			},
			async getApplyRewards() {
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.action_apply_rewards_p({
					action_id: this.actionList.id
				});
				if (res) {
					uni.hideLoading();
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
				}
			},
			async getApplyRewardsLogs() {
				let res = await this.$u.api.action_apply_rewards_logs_p();
			},
			// 推广人数
			async getTeampopularize() {
				let ret = await this.$u.api.teampopularize_p();
				if (ret && ret.code == 1) {
					if (ret.data.not_finish.length > 0) {
						this.is_top = false;
					} else {
						this.is_top = true;
					}
					this.teampopularize = ret.data;
					this.teamStatus = 1;
				} else {
					this.teamStatus = 2;
					this.retMsg = ret.msg;
				}
			},
			// 推广链接
			async getteampromotion() {
				let ret = await this.$u.api.teampromotion_p();
				if (ret) {
					this.teampromotion = ret.data;
				}
			},
			copy(value, iscopy) {
				if (iscopy === 'iscopya') {
					this.iscopya = true
				}
				if (iscopy === 'iscopyb') {
					this.iscopyb = true
				}
				let result
				let textarea = document.createElement("textarea")
				textarea.value = value
				textarea.readOnly = "readOnly"
				document.body.appendChild(textarea)
				textarea.select() // 选中文本内容
				textarea.setSelectionRange(0, value.length) // 设置选定区的开始和结束点
				this.$refs.uTips.show({
					title: this.$t('agent2')
				});
				result = document.execCommand("copy") //将当前选中区复制到剪贴板
				textarea.remove()
			},
			VIPswiperList(e) {
				this.VIPCurrent = e.detail.current;
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
	.u-c-a {
		color: #AA6932;
	}

	.invte-main {
		padding-bottom: 140px;
	}

	.site-head {
		background: var(--mar-bg);
	}

	.gooLight {
		background: var(--mar-bg);
	}

	.bs-wrapper-two {
		border-radius: 12px 12px 0 0;
		background-color: #ebeff6;
		border-radius: 15px 15px 0 0;
	}

	.noteamUser {
		margin-top: 200px;
		text-align: center;
		font-size: 24px;
		color: #6bf280;
		font-weight: bold;
	}

	.solid-line-1 {
		height: 1px;
		width: 150px;
		background: linear-gradient(to right, var(--blue-color), rgba(69, 113, 255, 0))
	}

	.solid-line-2 {
		height: 1px;
		width: 150px;
		background: linear-gradient(to right, rgba(26, 234, 203, 1), rgba(26, 234, 203, 0))
	}

	.solid-line-3 {
		height: 1px;
		width: 150px;
		background: linear-gradient(to right, rgba(93, 91, 178, 1), rgba(93, 91, 178, 0))
	}

	.container {
		background: var(--mar-bg);
	}

	// .container ::v-deep .uni-navbar {
	// 	background: var(--mar-bg);
	// }

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

	// .receiveBtn {
	// 	width: 100%;
	// 	text-align: center;
	// 	padding: 0 5px;
	// 	height: 40px;
	// 	line-height: 40px;
	// 	color: #FFF;
	// 	border-radius: 10px;
	// 	font-weight: bold;
	// 	background: rgba(233, 174, 58, 1);
	// }

	// @media (min-width: 750px) {
	// 	.receiveBtn {
	// 		width: 30%;
	// 	}
	// }

	.collapseClass {
		border-radius: 16px;
		background-color: #3E3664;
		overflow: hidden;
		margin-bottom: 8px;

		.collapse-label {
			color: #D1CCE9;
		}

		.col-value {
			margin-right: 10px;
			font-size: 18px;
		}

		.collapse-body {
			background-color: #312B4F;
			color: #ffffff;
		}

		.collapse-row {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 12px;
			border-bottom: 1px solid #1d1737;
		}

		::v-deep .uni-collapse-item__title-arrow {
			width: 32px;
			height: 32px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #D1CCE9;
			border-radius: 50%;
			background-color: #4D4886;
		}
	}

	.tra-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15px 0 15px 15px;

		.col-status {
			display: flex;
			align-items: center;

			image {
				width: 24px;
				height: 24px;
			}
		}
	}

	.inv-content {
		background-color: #312B4F;
		color: #ffffff;
		padding: 15px;
		line-height: 1.67;
	}

	.invte-card {
		font-size: 18px;
		font-weight: 600;
		padding: 11px 12px;
		border-radius: 16px;
		background: rgba(65, 61, 113, 1);
	}

	.u-line-progress-no-data {
		width: 135px;
		min-width: 130px;
		padding-left: 15px;
	}

	// pc
	.gift-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 45%;
		height: 226px;
		border-radius: 16px;
		background: url(../../static/images/pc/gift-bg.png) no-repeat;
		background-size: cover;
		margin-left: 20px;

		image {
			width: 210px;
		}
	}

	.share-left {
		height: 220px;
	}

	.share-bar {
		border-radius: 8px;
		background-color: #312B4F;
		display: flex;
		align-items: center;
		height: 42px;
		padding: 0 16px;
	}

	.invte-data {
		background-color: #3E3664;
		border-radius: 16px;
		padding: 10px;

		.ec-pic {
			width: 152px;
			height: 72px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 10px;
			background-color: #413D71;
			margin-right: 16px;

			image {
				width: 80px;
				height: 72px;
			}
		}
	}

	.vip-pc-swiper {
		position: relative;
		margin-left: -10px;
		margin-right: -10px;

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
			z-index: 22;
		}

		.swiper-left {
			left: -10px
		}

		.swiper-right {
			right: -10px;
		}
	}

	.vipSwiperClass {
		width: 100%;
		height: 320px;
	}

	.vipClubClass {
		height: 100%;
		margin: 0 8px;
		border-radius: 16px;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-color: #312B4F;
		padding: 20px;
	}

	.vipClubClass .vipItemClubTop {
		margin-bottom: 10px;

		.item-icon {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #1E1739;
			width: 88px;
			height: 88px;
			border-radius: 16px;
			margin-right: 10px;
		}
	}

	.vipClubClass .vipItemClubTop image {
		width: 72px;
		height: 72px;
	}

	.conditionClass .conDian {
		width: 18px;
		height: 18px;
		min-width: 8px;
		min-height: 8px;
		margin-right: 8px;
		border-radius: 50%;
		border: 3px solid #4D4886;
	}

	.vipClubClass .vipItemClubTop .vipIcon {
		width: 40px;
		height: 42px;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-image: url("@/static/images/skin/bluelight/march-vip-left.png");
	}

	.vipClubClass .vipItemClubTop .vip_level {
		font-size: 18px;
		font-weight: 600;
	}

	.vip-cond_row {
		position: relative;
		padding: 10px 0;
	}

	.vip-cond_row::before {
		position: absolute;
		left: 20px;
		bottom: 0;
		height: 1px;
		right: 0;
		background-color: #403d6e;
		content: '';
	}

	.vip-cond_row .vip-value {
		font-size: 16px;
		margin-bottom: 5px;
	}

	.vip-cond_row .vip-key {
		font-size: 12px;
		color: #D1CCE9;
	}

	.clickActive {
		border: 2px solid rgb(233, 174, 58);
	}

	.inv-numbsers ::v-deep .uni-scroll-view {
		padding-bottom: 5px;
	}

	.thirdAppClass {
		padding: 15px 15px 5px 15px;
		margin-bottom: 15px;
		color: var(--body-color);
		border-radius: var(--card-radius);
		background: var(--card-style);
	}
	
	.thirdAppItem {
		padding: 13px;
		border-radius: 12px;
		background: rgba(65, 61, 113, 1);
	}

	.thirdAppScrollView ::v-deep .uni-scroll-view {
		padding-bottom: 10px;
	}
</style>
