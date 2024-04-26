<template>
	<view>
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main">
				<u-row gutter="45" class="u-m-t-30 u-col-top" style="align-items: flex-start;">
					<u-col span="10">
						<view class="m-font-b m-c-w">{{$t('Mission center')}}</view>
						<view class="u-flex u-flex-wrap w_100 u-col-top u-m-b-40 u-row-between">
							<!-- @click="shareDetailsChange(item.share_name)" -->
							<view class="share-item u-m-t-30 cur_pointer w_50" v-for="(item,index) in rewardArr"
								:key="`rewardArr${index}`" v-if="item.type == 1">
								<view class="u-flex">
									<image :src="item.icon" style="width: 30px;height: 30px;margin-right: 14px;" mode=""
										v-if="item.icon"></image>
									<view>
										<view>{{$t(item.title)}}</view>
										<view class="u-m-t-10">
											<text>{{$t('Reward')}}:</text>
											<text class="highlight u-m-l-10">{{$t('CurUnit') + numberLimit(item.reward)}}</text>
										</view>
									</view>
								</view>
								<view class="u-m-t-30 u-c-9">{{$t('shareInfo')}}</view>
							</view>
							<!-- 任务进度 -->
							<view class="share-item u-m-t-30 w_50" v-for="(item,index) in rewardArr"
								:key="`rewardArr2${index}`" v-if="item.type != 1"
								:class="item.state == 3 ? 'FinishState' : ''">
								<view class="u-flex u-row-between">
									<view class="u-flex">
										<image :src="item.icon" style="min-width: 30px;height: 30px;margin-right: 14px;"
											mode="" v-if="item.icon"></image>
										<view>
											<view>{{$t(item.title)}}</view>
											<view class="u-m-t-10">
												<text>{{$t('Reward')}}:</text>
												<text class="highlight u-m-l-10">{{$t('CurUnit') + numberLimit(item.reward)}}</text>
											</view>
											<template v-if="item.type == 3">
												<view class="u-m-t-10">
													<text>{{$t('首充金额')}}:</text>
													<text
														class="highlight u-m-l-10">{{$t('CurUnit') + numberLimit(item.condition)}}</text>
												</view>
											</template>
											<template v-if="item.type == 4">
												<view class="u-m-t-10">
													<text>{{$t('交易金额')}}:</text>
													<text
														class="highlight u-m-l-10">{{$t('CurUnit') + numberLimit(item.condition)}}</text>
												</view>
												<view class="u-m-t-10" v-if="item.condition2">
													<text>{{$t('单笔交易金额')}}:</text>
													<text
														class="highlight u-m-l-10">{{$t('CurUnit') + numberLimit(item.condition2)}}</text>
												</view>
											</template>
											<template v-if="item.type == 5 || item.type == 6">
												<view class="u-m-t-10">
													<text>{{$t('购买天数')}}:</text>
													<text class="highlight u-m-l-10">{{item.day}}</text>
												</view>
												<view class="u-m-t-10">
													<text>{{item.type == 5?$t('购买金额'):$t('自购基金')}}:</text>
													<text
														class="highlight u-m-l-10">{{$t('CurUnit') + numberLimit(item.condition)}}</text>
												</view>
											</template>
										</view>
									</view>
									<!-- 右侧进度跳 -->
									<view>
										<!-- 已完成 -->
										<template v-if="item.type == 2 || item.type == 4">
											<template v-if="item.state == 1">
												<view class="FinishClass btn btn--class"
													@click="receiveChange(item.reward,item.id)">
													{{$t('领取')}}
												</view>
											</template>
											<!-- 未完成 -->
											<template v-if="item.state == 2">
												<template v-if="item.type == 2">
													<view class="u-flex flex--direction" style="min-width: 80px;">
														<u-circle-progress active-color="#306DF0" bg-color="transparent"
															width="85" border-width="6" inactive-color="#C2C2C2"
															:percent="(item.plan / item.condition) * 100">
															<text
																class='u-progress-info'>{{item.plan}}/{{item.condition}}</text>
														</u-circle-progress>
														<view class="FinishClass btn btn--class u-m-t-10"
															@click="$go('/pages/invte/invte')">
															{{$t('去邀请')}}
														</view>
													</view>
												</template>
												<template v-if="item.type == 4">
													<u-circle-progress active-color="#306DF0" bg-color="transparent"
														width="85" border-width="6" inactive-color="#C2C2C2"
														:percent="item.plan">
														<!-- <text class='u-progress-info'>{{item.plan}}/{{item.condition}}</text> -->
													</u-circle-progress>
												</template>
											</template>
											<!-- 已领取 -->
											<template v-if="item.state == 3">
												<view class="Finish">
													<u-icon name="checkmark" color="#fff" size="50"></u-icon>
												</view>
											</template>
										</template>
										<template v-if="item.type == 3 && item.state == 1">
											<view class="FinishClass btn btn--class"
												@click="receiveChange(item.reward,item.id)">
												{{$t('领取')}}
											</view>
										</template>
										<template v-if="item.type == 3 && item.state == 3">
											<view class="Finish">
												<u-icon name="checkmark" color="#fff" size="50"></u-icon>
											</view>
										</template>
										<template v-if="item.type == 5 && item.state == 1">
											<view class="FinishClass btn btn--class"
												@click="receiveChange(item.reward,item.id)">
												{{$t('领取')}}
											</view>
										</template>
										<template v-if="item.type == 5 && item.state == 3">
											<view class="Finish">
												<u-icon name="checkmark" color="#fff" size="50"></u-icon>
											</view>
										</template>
										<template v-if="item.type == 6 && item.state == 1">
											<view class="FinishClass btn btn--class"
												@click="receiveChange(item.reward,item.id)">
												{{$t('领取')}}
											</view>
										</template>
										<template v-if="item.type == 6 && item.state == 3">
											<view class="Finish">
												<u-icon name="checkmark" color="#fff" size="50"></u-icon>
											</view>
										</template>
									</view>
								</view>
								<view class="u-m-t-16 u-c-9" v-if="item.start_time">{{item.start_time}} -
									{{item.end_time}}
								</view>
							</view>
						</view>
					</u-col>
				</u-row>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content" :data-theme="themeMode">
				<view class="container">
					<uniNavHeader :title="this.$t('Mission center')" :pageActive="7"></uniNavHeader>
					<view class="bs-wrapper">
						<view class="gooLight">
							<!-- @click="shareDetailsChange(item.share_name)" -->
							<view class="share-item u-m-b-20 cur_pointer" v-for="(item,index) in rewardArr"
								:key="`rewardArr${index}`" v-if="item.type == 1">
								<view class="u-flex">
									<image :src="item.icon" style="width: 30px;height: 30px;margin-right: 14px;" mode=""
										v-if="item.icon"></image>
									<view>
										<view>{{$t(item.title)}}</view>
										<view class="u-m-t-10">
											<text>{{$t('Reward')}}:</text>
											<text class="highlight u-m-l-10">{{$t('CurUnit') + numberLimit(item.reward)}}</text>
										</view>
									</view>
								</view>
								<view class="u-m-t-30 u-c-9">{{$t('shareInfo')}}</view>
							</view>
							<!-- 任务进度 -->
							<view class="share-item u-m-b-20" v-for="(item,index) in rewardArr"
								:key="`rewardArr2${index}`" v-if="item.type != 1"
								:class="item.state == 3 ? 'FinishState' : ''">
								<view class="u-flex u-row-between">
									<view class="u-flex">
										<image :src="item.icon" style="min-width: 30px;height: 30px;margin-right: 14px;"
											mode="" v-if="item.icon"></image>
										<view>
											<view>{{$t(item.title)}}</view>
											<view class="u-m-t-10">
												<text>{{$t('Reward')}}:</text>
												<text class="highlight u-m-l-10">{{$t('CurUnit') + numberLimit(item.reward)}}</text>
											</view>
											<template v-if="item.type == 3">
												<view class="u-m-t-10">
													<text>{{$t('首充金额')}}:</text>
													<text
														class="highlight u-m-l-10">{{$t('CurUnit') + numberLimit(item.condition)}}</text>
												</view>
											</template>
											<template v-if="item.type == 4">
												<view class="u-m-t-10">
													<text>{{$t('交易金额')}}:</text>
													<text
														class="highlight u-m-l-10">{{$t('CurUnit') + numberLimit(item.condition)}}</text>
												</view>
												<view class="u-m-t-10" v-if="item.condition2">
													<text>{{$t('单笔交易金额')}}:</text>
													<text
														class="highlight u-m-l-10">{{$t('CurUnit') + numberLimit(item.condition2)}}</text>
												</view>
											</template>
											<template v-if="item.type == 5 || item.type == 6">
												<view class="u-m-t-10">
													<text>{{$t('购买天数')}}:</text>
													<text class="highlight u-m-l-10">{{item.day}}</text>
												</view>
												<view class="u-m-t-10">
													<text>{{item.type == 5?$t('购买金额'):$t('自购基金')}}:</text>
													<text
														class="highlight u-m-l-10">{{$t('CurUnit') + numberLimit(item.condition)}}</text>
												</view>
											</template>
										</view>
									</view>
									<!-- 右侧进度跳 -->
									<view>
										<!-- 已完成 -->
										<template v-if="item.type == 2 || item.type == 4">
											<template v-if="item.state == 1">
												<view class="FinishClass btn btn--class"
													@click="receiveChange(item.reward,item.id)">
													{{$t('领取')}}
												</view>
											</template>
											<!-- 未完成 -->
											<template v-if="item.state == 2">
												<template v-if="item.type == 2">
													<view class="u-flex flex--direction" style="min-width: 80px;">
														<u-circle-progress active-color="#E9AE3A" bg-color="transparent"
															width="85" border-width="6" inactive-color="#C3D7DB"
															:percent="(item.plan / item.condition) * 100">
															<text
																class='u-progress-info'>{{item.plan}}/{{item.condition}}</text>
														</u-circle-progress>
														<view class="FinishClass btn btn--submit u-m-t-30"
															@click="$go('/pages/invte/invte')">
															{{$t('去邀请')}}
														</view>
													</view>
												</template>
												<template v-if="item.type == 4">
													<u-circle-progress active-color="#E9AE3A" bg-color="transparent"
														width="85" border-width="6" inactive-color="#C3D7DB"
														:percent="item.plan">
														<!-- <text class='u-progress-info'>{{item.plan}}/{{item.condition}}</text> -->
													</u-circle-progress>
												</template>
											</template>
											<!-- 已领取 -->
											<template v-if="item.state == 3">
												<view class="Finish">
													<u-icon name="checkmark" color="#fff" size="50"></u-icon>
												</view>
											</template>
										</template>
										<template v-if="item.type == 3 && item.state == 1">
											<view class="FinishClass btn btn--submit"
												@click="receiveChange(item.reward,item.id)">
												{{$t('领取')}}
											</view>
										</template>
										<template v-if="item.type == 3 && item.state == 3">
											<view class="Finish">
												<u-icon name="checkmark" color="#fff" size="50"></u-icon>
											</view>
										</template>
										<template v-if="item.type == 5 && item.state == 1">
											<view class="FinishClass btn btn--submit"
												@click="receiveChange(item.reward,item.id)">
												{{$t('领取')}}
											</view>
										</template>
										<template v-if="item.type == 5 && item.state == 3">
											<view class="Finish">
												<u-icon name="checkmark" color="#fff" size="50"></u-icon>
											</view>
										</template>
										<template v-if="item.type == 6 && item.state == 1">
											<view class="FinishClass btn btn--submit"
												@click="receiveChange(item.reward,item.id)">
												{{$t('领取')}}
											</view>
										</template>
										<template v-if="item.type == 6 && item.state == 3">
											<view class="Finish">
												<u-icon name="checkmark" color="#fff" size="50"></u-icon>
											</view>
										</template>
									</view>
								</view>
								<view class="u-m-t-16 text-pick" v-if="item.start_time">{{item.start_time}} -
									{{item.end_time}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>


		<u-popup v-model="receivePop" mode="center" border-radius="35" :mask-custom-style="uPopMaskCustomStyle">
			<view class="bs-popup">
				<view class="bs-popup-hd">
					<view class="tt">{{$t("Invite friends to register")}}</view>
					<view class="iconfont icon-close" @click="receivePopClose"></view>
				</view>
				<view class="u-flex u-row-center">
					<image src="../share/image/giftBoxImg.png" style="height:100px;width:80px" class="u-m-t-20"
						mode="aspectFill">
					</image>
				</view>
				<view class="u-m-t-40 u-text-center m-font-16 highlight" v-if="userReward">{{$t('Your reward')}}:
					{{$t('CurUnit') + ' ' + numberLimit(userReward)}}
				</view>
				<view style="height: 20px;"></view>
				<view class="popup-btns flex-center">
					<button type="default" @click="payReceive" class="btn btn--submit payTypeBtn">{{$t("领取")}}</button>
				</view>
			</view>
		</u-popup>

		<!-- <fireworks zIndex="10888" ref="fireworksRef" v-if="receive" /> -->

		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
		</u-top-tips>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniNavFooter from '@/components/uni-foot-bar/uni-foot-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import fireworks from '@/components/sanshui-fireworks/sanshui-fireworks.vue'
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import {
		accMul,
		accAdd,
		changeTwoDecimal_f
	} from '@/common/tool.js'
	export default {
		components: {
			uniNavHeader,
			uniNavFooter,
			listEmpty,
			fireworks,
			pcNavHeader
		},
		data() {
			return {
				receivePop: false,
				popupMode: 'bottom',
				rewardState: 1,
				rewardArr: [],
				receive: false,
				userReward: '',
				userRecID: 0
			}
		},
		onShow() {
			this.onLoadChange();
			this.getRewardList();
		},
		mounted() {},
		onReachBottom() {},
		methods: {
			onLoadChange() {
				if (this.mobile_common) {
					this.popupMode = 'bottom'
				} else {
					this.popupMode = 'center'
				}
			},
			receivePopClose() {
				this.receivePop = false;
			},
			receiveChange(reward, id) {
				this.userRecID = id;
				this.userReward = reward;
				this.receivePop = true;
				let time1 = setTimeout(_ => {
					this.receive = true;
					this.$refs.fireworksRef.initCanvas();
					clearTimeout(time1);
				}, 800);
			},
			shareDetailsChange(share_name) {
				let name = JSON.stringify(share_name);
				this.$go('/pages/ucenter/shareDetails?share_name=' + name);
			},
			// 获取任务列表
			async getRewardList() {
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.reward_list_p();
				if (res && res.code == 1) {
					this.rewardState = res.state;
					this.rewardArr = res.data;
				}
				uni.hideLoading();
			},
			async payReceive() {
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.reward_pay_receive_p({
					r_id: this.userRecID
				});
				this.getUserBalance();
				this.$refs.uTips.show({
					title: this.$t(res.msg)
				});
				this.receivePopClose();
				uni.hideLoading();
				this.getRewardList();
			}
		}
	}
</script>

<style lang="scss">
	.text-pick{
		color: #D1CCE9;
	}
	.share-item {
		background-color: #413D71;
		padding: 20px;
		border-radius: 16px;
		position: relative;
	}

	.share-bottom-img {
		width: 22%;
		margin: 15px 0;
		padding: 8px 0;
		text-align: center;
		border-radius: 8px;
		background-color: #25282F;
	}

	.share-bottom-img image {
		border-radius: 5px;
	}

	.Finish {
		background: #2FBD2B;
		width: 35px;
		height: 35px;
		border-radius: 50%;
		text-align: center;
		line-height: 45px;
	}

	.FinishClass {
		padding: 5px 10px;
	}

	.btn--class {
		color: #fff !important;
		background-color: var(--ui-color-normal) !important;
		border: 1px solid var(--ui-color-normal) !important;
		border-radius: 8px;
	}

	.FinishState {
		// filter: blur(1px);
		opacity: .5;
	}

	.u-progress-info {
		font-size: 20px;
		color: #c2c2c2;
	}
	
	.site-head {
		background: var(--mar-bg);
		padding: 0 15px;
	}
	
	.bs-wrapper {
		padding: 70px 0 0 0 !important;
	}
	
	.gooLight {
		padding: 15px;
		background-color: #312B4F;
		border-radius: 16px 16px 0 0;
	}
	
	.container ::v-deep .uni-navbar {
		background: var(--mar-bg);
	}
</style>
