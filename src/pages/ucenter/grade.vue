<!-- 用户等级 -->
<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader :title="$t('VIP Grade')"></uniNavHeader>
			<!-- sidebar -->
			<view class="site-head u-flex u-m-b-30">
				<view class="site-tit">
					<text>{{$t('VIP Grade')}}</text>
					<view class="line"></view>
				</view>
				<view class="site-back" @click="common_back">
					<text class="iconfont icon-close"></text>
				</view>
			</view>
			<!-- main -->
			<view class="bs-container" v-if="false">
				<!-- 用户卡片 -->
				<view class="gradient-bg">
					<view class="u-flex">
						<image :src="userDefaultHeader" class="userHeaderImg" mode="">
						</image>
						<view class="u-m-l-20">
							<view class="font-20">{{userInfo_common.username}}</view>
							<view class="u-flex">
								<view class="u-flex">
									<view style="font-size: 14px;">
										ID:{{userInfo_common.id}}</view>
									<view class="iconfont icon-copy_outline u-m-l-14"
										@click="common_copy(`${userInfo_common.id}`)"></view>
								</view>
								<!-- <view class="m_level_name u-m-l-20">
								{{userInfo_common.level_name}}
							</view> -->
							</view>
						</view>
					</view>
					<!-- 进度条 -->
					<view class="u-m-t-30 u-m-b-30">
						<u-line-progress active-color="#2b1404" :percent="defaultProgress" :showPercent="false"
							:is_right_percent="true" height="15" inactive-color="#f3ce02">
						</u-line-progress>
						<view class="u-flex u-row-between line-bottom-text u-m-t-20">
							<view class="u-e-7" v-if="reultData.user.is_top != 1">{{$t(cur_vip)}}</view>
							<view class="u-e-7" v-if="reultData.user.is_top == 1">{{$t(cur_vip)}} / {{$t(next_vip)}}
							</view>
							<view class="u-e-7">
								<template v-if="reultData.user.current.type == 0">
									<view>
										{{reultData.user.is_top != 1 ?reultData.user.current.recharge_amount+'/'+reultData.user.next.recharge_amount:reultData.user.current.recharge_amount}}
									</view>
								</template>
								<template v-if="reultData.user.current.type == 1">
									<view>
										{{$t('Single Recharge')+':'+reultData.user.is_top != 1 ?reultData.user.next.recharge_amount:reultData.user.current.recharge_amount}}
									</view>
								</template>
							</view>
						</view>
					</view>
				</view>
				<!-- 等级状态 -->
				<view class="bottom-info">
					<view class="u-m-t-30">
						<view class="u-m-b-20 m-font-16">VIP Luxury privileges</view>
						<view class="uc-cells " style="margin: 0 -15px;">
							<view class="j-cell">
								<image class="uc-icon" src="../../static/images/topboom/user_tag.png?t=20" mode="">
								</image>
								<view class="flex_bd">{{$t('Promotion Recharge')}}</view>
								<view class="text-pick">{{reult_key.recharge_amount}}</view>
							</view>
							<view class="j-cell">
								<image class="uc-icon" src="../../static/images/topboom/money_request.png?t=12" mode="">
								</image>
								<view class="flex_bd">{{$t('Daily Withdrawals')}}</view>
								<view class="text-pick">{{reult_key.day_limit}}</view>
							</view>
							<view class="j-cell">
								<image class="uc-icon" src="../../static/images/topboom/withdrawal.png?t=2" mode="">
								</image>
								<view class="flex_bd">{{$t('提现金额')}}</view>
								<view class="text-pick">{{reult_key.min_amount+'~'+reult_key.max_amount}}</view>
							</view>
						</view>
					</view>
					<!-- 晋升奖励领取 -->
					<view class="reward" v-if="reultData.user.current.level_gold > 0">
						<!--  v-if="reultData.user.current.level_gold > 0" -->
						<view class="u-flex u-row-between u-p-30 u-c-9">
							<view>
								<view>{{$t('Promotion Reward')}}</view>
								<view class="u-m-t-10 text-orange">{{reultData.user.current.level_gold}}</view>
							</view>
							<view class="reward-btn u-m-t-10">{{$t('Received')}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	export default {
		components: {
			uniNavHeader,
			pcBg
		},
		data() {
			return {
				sideshow: false,
				userDefaultHeader: '',
				defaultProgress: 0,
				vipbgY: '',
				vipbgN: '',
				reultData: {
					user: {
						current: {
							id: 0,
							recharge_amount: 0,
							type: 0
						},
						next: {
							id: 0,
							recharge_amount: 0,
							type: 0
						},
						is_top: 0
					}

				},
				reult_key: {
					recharge_amount: 0,
					day_limit: 0,
					min_amount: 0,
					max_amount: 0,
				},
				cur_vip: '',
				next_vip: ''
			}
		},
		onLoad() {

		},
		onShow() {
			this.getData();
		},
		methods: {
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async getData() {
				let res = await this.$u.api.user_vip_p();
				if (res) {
					this.reultData = res;
					let c_le_na = res.user.current.level_name;
					let c_len = c_le_na.length;
					this.cur_vip = 'VIP' + ' ' + c_le_na.substring(3, c_len);
					if (res.user.is_top != 1) {
						let n_le_na = res.user.next.level_name;
						let n_len = n_le_na.length;
						this.next_vip = 'VIP' + ' ' + n_le_na.substring(3, n_len);
					}

					if (res.data.length > 0) {
						for (let i in res.data) {
							if (this.userInfo_common.level_name == res.data[i].level_name) {
								this.reult_key = res.data[i];
							}
							let r_le_na = res.data[i].level_name;
							let r_len = r_le_na.length;
							let rur_vip = r_le_na.substring(3, r_len);
							this.reultData.data[i].my_level_name = rur_vip;
						}
					}
					this.defaultProgress = 0;
					setTimeout(_ => {
						this.defaultProgress = this.defaultProgress + res.plan;
					}, 500)
				}
			},
			itemLevel(item) {
				this.reult_key = {}
				this.reult_key = item;
			}
		}
	}
</script>

<style lang="scss">
	.userLevelCar {
		width: 100%;
		color: #fff;
		min-height: 150px;
		padding: 20px;
		border-radius: 10px;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.userHeaderImg {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}

	.icon-sxx {
		font-size: 11px;
	}

	.font-20 {
		font-size: 20px;
	}

	.font-16 {
		font-size: 16px;
	}

	.bottom-info {
		min-height: calc(70vh);
		padding: 20px;
		margin-top: -20px;
		background-color: var(--bottom-info-bg);
		border-radius: 24px 24px 0 0;
	}

	.level-scroll {
		width: 100%;
		height: 130px;
		margin-top: 10px;
		position: relative;
		white-space: nowrap;
	}

	.m_level_name {
		color: #d2b60a;
		padding: 2px 5px;
		border-radius: 4px;
		background-image: linear-gradient(to bottom, #100701, #3d1c03);
	}

	.line-bottom-text {
		color: var(--line-bottom-text-color);
	}

	.bottom-box {
		width: 150px;
		height: 130px;
		padding: 20px;
		border-radius: 12px;
	}

	.bg-y {
		color: #fff;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.bg-n {
		color: #999;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.level-font {
		font-size: 24px;
		font-weight: bold;
		padding-top: 25px;
		margin-left: 10px;
	}

	.reward {
		height: 80px;
		margin-top: 20px;
		border-radius: 10px;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.reward-btn {
		color: #abaaab;
		padding: 5px 20px;
		border-radius: 20px;
		background-color: #d8d4d3;
	}
</style>
