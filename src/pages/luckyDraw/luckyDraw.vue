<template>
	<view>
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<!-- 轮播图 -->
			<view class="pc-main">
				<view class="pc-turntable">
					<view class="bar-link cur_pointer" @click="luckyPopupChange">
						{{$t('我的卡券')}}
					</view>
					<view class="turntable-container">
						<view class="main-box">
							<view class="turn-tab-bar flex-center">
								<view class="flex-col">
									<view class="turn-tab">
										<view class="turn-tab-item" :class="turnCount == index ? 'active' : ''"
											@click="turnCountChange(index)" v-for="(item,index) in lotteryConfig"
											:key="`lotteryConfig${index}`">{{$t(item.title)}}</view>
									</view>
								</view>
								<view class="tab-vip">
									<view>{{'VIP '+minLevel + ' - ' + 'VIP ' + maxLevel}}</view>
								</view>
							</view>
							<view class="turn-head">
								<!-- <image src="./images/tu-head2.png" class="turntable-hd" mode="widthFix"></image> -->
								<image :src="$t('turntableThuHead')" class="turntable-hd" mode="widthFix"></image>
							</view>
							<view class="fury-wheel__wheel-bg-img">
								<image src="./images/circle2.png" class="wheel-bg-img" mode=""></image>
								<view class="fury-wheel__wheel-img">
									<LuckyWheel ref="myLucky" :prizes="prizes" :defaultConfig="defaultConfig"
										:blocks="blocks" width="480" height="480" :buttons="buttons"
										@start="startCallback" @end="endCallback" />
								</view>
								<image src="./images/left_right.png" class="wheel-left_right" mode=""></image>
								<image src="./images/top.png" class="wheel-top" mode="" v-if="!mainbind"></image>
								<view class="btn btn-submit" @tap="startCallback">
									{{ mainbind ? $t('正在抽奖') : $t('立即参与') }}
								</view>
							</view>
							<!-- <view>（{{$t('今日剩余次数')}}：{{ limitCount>=0?limitCount:$t('无限') }}）</view> -->
							<!-- <view class="draw-middle-button u-text-center" @tap="btnFun">
								<view class="draw-tip">
									<view class="text">
										<template v-if="freeCount > 0 || freeCount == -1">
											<view>{{$t('免费抽奖次数')}}：{{ freeCount }}</view>
										</template>
										<template v-else>
											<template v-if="(userIntegral >= requiredIntegral) && userIntegral != 0">
												<view>{{requiredIntegral}}{{$t('积分次')}}</view>
												<view>{{$t('当前积分')}}:{{userIntegral}}</view>
											</template>
											<template v-else>
												<view>{{requiredBalance}}{{$t('余额次')}}</view>
												<view>{{$t('当前余额')}}:{{userBalance}}</view>
											</template>
										</template>
									</view>
								</view>
							
								<view class="btn btn-submit">
									{{ mainbind ? $t('正在抽奖') : $t('立即参与') }}
								</view>
							</view> -->
							<!-- <view class="turn-info m-c-w cur_pointer">
								<view @click="wheel_go('/pages/ucenter/vip')">{{$t('邀请成为有效用户可增加参与机会')}}
								</view>
							</view> -->
						</view>
					</view>
					<!-- list -->
					<view class="result-panel">
						<view class="uni-swiper">
							<swiper :indicator-dots="indicator" :autoplay="autoplay" :interval="interval"
								:duration="duration" vertical="true" class="swiper" display-multiple-items="8">
								<swiper-item class="text" v-for="(item,index) in rollList" :key="`rollList${index}`">
									<view>
										{{$t('恭喜')}} {{item.username}} {{$t('抽到')}} {{item.title}}
									</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</view>
			<u-modal v-model="resultShow" :content="content" @confirm="confirm" :content-style="contentStyle"
				:show-title="false" confirm-color="#000"></u-modal>
			<u-toast ref="uToast" />
		</template>
		<u-popup v-model="luckyPopup" mode="center" border-radius="16" :mask-custom-style="uPopMaskCustomStyle"
			width="500px">
			<view class="bs-popup bs-dist-popup no-border">
				<view class="bs-popup-hd ">
					<view>{{$t("我的卡卷")}}</view>
					<view class="iconfont icon-close" @click="luckyPopupCloseChange"></view>
				</view>
				<scroll-view class="turntable-container-scroll" scroll-y="true" @scrolltolower="scrolltolower">
					<view class="bs-popup-body">
						<template v-if="showEmpty == 1">
							<view class="cash-list-class" v-for="(item,index) in cashList" :key="`cashList${index}`">
								<view class="u-flex u-row-between u-col-top">
									<view class="turntable-cash-icon-class">
										<image src="@/components/turntable-list/draw-one/images/lefu-icon.png"
											class="turntable-cash-icon" mode=""></image>
									</view>
									<view class="turntable-cash-right">
										<view class="u-flex u-row-between turntable-cash-top">
											<view class="top-text-left">{{$t(item.title)}}</view>
										</view>
										<view class="u-flex u-row-between turntable-cash-bottom u-m-t-16">
											<view class="top-text-left">{{$t(item.desc)}}</view>
											<template v-if="item.type == 5">
												<view class="top-text-right" v-if="item.is_make == 0"
													@click="chshChange(item.type)">{{$t('去使用')}}</view>
												<view class="top-text-right2" v-if="item.is_make == 1">{{$t('已使用')}}
												</view>
												<view class="top-text-right2" v-if="item.is_make == 2">{{$t('已过期')}}
												</view>
												<view class="top-text-right2" v-if="item.is_make == 3">{{$t('已达标')}}
												</view>
												<view class="top-text-right2" v-if="item.is_make == 4">{{$t('待审核')}}
												</view>
											</template>
											<template v-if="item.type == 6">
												<view class="top-text-right" v-if="item.is_make == 0"
													@click="chshChange(item.type)">{{$t('去使用')}}</view>
												<view class="top-text-right2" v-if="item.is_make == 1">{{$t('已使用')}}
												</view>
												<view class="top-text-right2" v-if="item.is_make == 2">{{$t('已过期')}}
												</view>
												<view class="top-text-right2" v-if="item.is_make == 3"
													@click="standardChange(item.id)">{{$t('已达标')}}</view>
												<view class="top-text-right2" v-if="item.is_make == 4">{{$t('待审核')}}
												</view>
											</template>
										</view>
										<view class="u-flex u-m-t-30 u-c-9" v-if="item.is_make == 0">
											<view class="u-m-r-14">{{$t('有效期至')}}</view>
											<view>{{item.over_time}}</view>
										</view>
									</view>
								</view>
							</view>
						</template>
						<template v-if="showEmpty == 0">
							<listEmpty class="u-bd-8" :listHighly='400'>
							</listEmpty>
						</template>
					</view>
				</scroll-view>
			</view>
		</u-popup>
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
	import LuckyWheel from '@/components/@lucky-canvas/uni/lucky-wheel' // 大转盘
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
			pcNavHeader,
			LuckyWheel
		},
		data() {
			return {
				resultShow: false,
				wheelshow: false,
				content: '',
				url: "#",
				indicator: false,
				autoplay: true,
				interval: 2000,
				duration: 500,
				dianimage: 0,
				bgtimer: null,
				rollList: [],
				mainname: 'kai',
				endname: 't',
				mainbind: false,
				lotteryConfig: [],
				turnCount: 0,
				contentStyle: {
					background: 'var(--gradient-color)',
					color: '#fff'
				},
				prizeList: [],
				requiredBalance: '',
				limitCount: null,
				luckyPopup: false,
				cashList: [],
				page: 1,
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				showEmpty: null,
				defaultConfig: {
					stopRange: 0,
					gutter: 1,
					offsetDegree: -23
				},
				buttons: [{
					radius: '100px',
					pointer: true,
					imgs: [{
						top: '-60px',
						width: '100px',
						height: '100px',
						src: require("./images/pointer3.png")
					}]
				}],
				blocks: [{
					padding: '2px',
					imgs: []
				}],
				prizesIdByIndex: {},
				prizes: [],
				minLevel: 0,
				maxLevel: 0,
			}
		},
		onLoad() {
			this.getLotteryConfig();
			this.lotteryrecord_api();
		},
		methods: {
			scrolltolower() {
				if (this.status == 'noMore') {
					return;
				}
				this.getLotteryCardCase();
			},
			async standardChange(id) {
				let res = await this.$u.api.lottery_playcard_p({
					id,
					lottery_id: this.lotteryConfig[this.turnCount].id
				});
				if (res) {
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
				}
			},
			luckyPopupChange() {
				this.getLotteryCardCase('add');
				this.luckyPopup = true;
			},
			chshChange(i) {
				if (i == 5) {
					this.$go('/pages/ucenter/recharge');
				} else if (i == 6) {
					this.$go('/pages/invte/invte');
				}
				this.luckyPopupCloseChange();
				this.wheelshow = false;
			},
			luckyPopupCloseChange() {
				this.page = 1;
				this.cashList = [];
				this.showEmpty = null;
				this.luckyPopup = false;
			},
			async redemption(id, lottery_id) {
				let res = await this.$u.api.lottery_setcashvolume_p({
					id,
					lottery_id
				});
				if (res) {
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
					this.getLotteryCardCase('add');
				}
			},
			async getLotteryCardCase(add) {
				uni.showLoading({
					title: this.$t("loading")
				});
				let ret = await this.$u.api.lottery_card_case_p({
					page: this.page,
					limit: 10,
					state: '',
					type: ''
				});
				if (ret) {
					uni.hideLoading();
					if (add) {
						this.cashList = ret.data;
					} else {
						this.cashList = this.cashList.concat(ret.data);
					}
					if (ret.data.length == 10) {
						this.status = "loading";
						this.page++;
					} else {
						this.status = "noMore";
					}
					if (this.cashList.length > 0) {
						this.showEmpty = 1;
					} else {
						this.showEmpty = 0;
					}
				}
			},
			wheel_go(url) {
				this.wheelshow = false;
				this.$go(url);
			},
			wheelshowChange() {
				this.turnCount = 0;
				this.wheelshow = true;
				this.getLotteryConfig();
				this.lotteryrecord_api();
			},
			async getLotteryConfig() {
				let res = await this.$u.api.lottery_lotteryconfig_p();
				if (res && res.code == 1) {
					this.lotteryConfig = res.data;
					this.getLotteryLotteryprize();
				}
			},
			async getLotteryLotteryprize() {
				let res = await this.$u.api.lottery_lotteryprize_p({
					id: this.lotteryConfig[this.turnCount].id
				});
				if (res && res.code == 1) {
					this.prizeList = res.data;
					this.initPrizes(res.data);
					this.requiredBalance = this.lotteryConfig[this.turnCount].required_balance;
					this.limitCount = this.lotteryConfig[this.turnCount].limit_count;
					this.minLevel = this.lotteryConfig[this.turnCount].min_level;
					this.maxLevel = this.lotteryConfig[this.turnCount].max_level;
				}
			},
			initPrizes(prizes) {
				this.prizes = [];
				for (const key in prizes) {
					const element = prizes[key];
					this.prizesIdByIndex[element.id] = key;
					this.prizes.push({
						imgs: [{
							top: '82px',
							width: 117,
							height: 125,
							src: element.pic
							// src: require("./images/2.png")
						}]
					})
				}
			},
			async startCallback() {
				var that = this;
				if (that.mainbind == false) {
					let res = await this.$u.api.lottery_lottery_p({
						lottery_id: this.lotteryConfig[this.turnCount].id
					});
					if (res.code == 1 && res) {
						that.mainbind = true;
						that.$refs.myLucky.play();
						setTimeout(() => {
							const index = that.prizesIdByIndex[res.data.id];
							that.$refs.myLucky.stop(index);
						}, 4500);
						that.content = that.prizeList[that.prizesIdByIndex[res.data.id]].title;
					} else {
						that.$refs.uTips.show({
							title: that.$t(res.msg)
						});
					}
				} else {
					that.$refs.uToast.show({
						title: that.$t('请不要多次点击'),
						type: 'error',
					})
				}
			},
			endCallback() {
				this.mainbind = false;
				this.resultShow = true;
			},
			turnCountChange(i) {
				this.turnCount = i;
				this.getLotteryLotteryprize();
			},
			async btnFun() {
				var that = this;
				if (that.mainbind == false) {
					let res = await this.$u.api.lottery_lottery_p({
						lottery_id: this.lotteryConfig[this.turnCount].id
					});
					if (res.code == 1 && res) {
						var index = 0;
						for (let i in that.prizeList) {
							that.prizeList[i].lotteryClass = i * 1;
							if (that.prizeList[i].id == res.data.id) {
								index = that.prizeList[i].lotteryClass;
							}
						}
						that.mainbind = true;
						that.mainname = 'kai';
						that.endname = 't';
						that.mainname = 'kai' + (index + 1);
						setTimeout(() => {
							that.endname = 't' + (index + 1);
							that.content = that.prizeList[index].title
							that.resultShow = true;
						}, 3900);
					} else {
						that.$refs.uTips.show({
							title: that.$t(res.msg)
						});
					}
				} else {
					that.$refs.uToast.show({
						title: that.$t('请不要多次点击'),
						type: 'error',
					})
				}
			},
			// 中间记录
			async lotteryrecord_api() {
				let res = await this.$u.api.lottery_lotteryrecord_p({
					page: 1,
					limit: 30,
					state: 0,
					prize_type: 1
				});
				if (res.data && res) {
					this.rollList = res.data;
				}
			},
			confirm() {
				this.mainbind = false;
				this.mainname = 'kai';
				this.endname = 't';
				this.getLotteryConfig();
				this.$emit("configBan");
			}
		}
	}
</script>


<style scoped>
	.pc-turntable {
		position: relative;
		display: flex;
		overflow: hidden;
		padding: 30px 0;
		height: 800px;
		background: url(./images/main-bg.jpg) center no-repeat;
		background-size: 100% 100%;
	}

	.bar-link {
		color: #ffffff;
		padding: 0 3px;
		position: absolute;
		right: 75px;
		top: 40px;
		line-height: 36px;
	}

	.left-bg {
		position: absolute;
		left: 0;
		top: 30px;
		width: 700px;
		background-size: contain;
	}

	.top-right-bg {
		position: absolute;
		right: 0;
		top: 0;
		width: 315px;
		height: auto;
		background-size: contain;
	}

	/deep/ .u-mode-center-box {
		background-color: transparent;
	}

	.close-box {
		margin-top: 20px;
		margin-left: auto;
		margin-right: auto;
		cursor: pointer;
		width: 36px;
	}

	.close-box image {
		width: 33px;
		height: 33px;
	}

	.turn-tab {
		display: flex;
		align-items: center;
		text-align: center;
	}

	.turn-tab-bar {
		margin-bottom: 20px;
	}

	.turn-tab-item {
		font-weight: bold;
		min-width: 80px;
		padding: 0 10rpx;
		height: 36px;
		line-height: 36px;
		border-radius: 30px;
		cursor: pointer;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		color: #222;
		background-color: #ffffff;
		margin-right: 6px;
	}

	.turn-tab-item.active {
		background-image: url(./images/tab.png);
		color: #ffffff;
	}

	.turntable-container {
		position: relative;
		width: 470px;
		height: 550px;
		padding: 12px 5px;
		border-radius: 10px;
		margin-left: 60px;
	}

	.turntable-container .turntable-bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 485px;
		background-size: contain;
	}

	.turn-info {
		text-align: center;
	}

	.turn-info view {
		padding: 2px 0;
	}

	image {
		width: 100%;
		height: 100%;
	}

	.main-box {
		width: 100%;
		position: relative;
		z-index: 11;
		margin: 0 auto;
	}

	.turn-cell {
		text-align: center;
	}

	.title-h1 {
		margin-bottom: 10px;
		line-height: 1;
	}

	.title-h1 text {
		color: #78ff15;
		font-size: 40px;
		font-weight: bold;
		text-shadow: 2px 2px 1px #8787ff;
	}

	.turn-cell .btn--vip {
		text-align: center;
		border-radius: 40px;
		font-weight: bold;
		color: #bf8328;
		height: 30px;
		line-height: 30px;
		padding: 0;
		font-style: italic;
		font-size: 16px;
		width: 200px;
		margin-bottom: 5px;
		background-image: linear-gradient(to right, #f0eb84, #ebbb53);
	}

	.body-one {
		width: 100%;
		height: 376rpx;
		margin-top: 420rpx;
		position: relative;
		z-index: 2;
	}

	.draw-box {
		position: relative;
		margin-left: auto;
		margin-right: auto;
		margin-top: -106px;
		z-index: 1;
		width: 470px;
		height: 470px;
		margin-bottom: 15px;
	}

	.draw-box .draw-circle {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 470px;
		height: 530px;
	}

	.draw-box .draw-circle-active {
		animation: tubleChange 4s ease 1;
	}

	.draw-bg {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 340px;
		height: 340px;
		overflow: hidden;
		border-radius: 50%;
	}

	.draw-dian {
		width: 600rpx;
		height: 653rpx;
		position: absolute;
		left: 0;
		top: 0;
	}

	.draw-btn {
		text-align: center;
		width: 70px;
		height: 130px;
		position: absolute;
		left: 50%;
		top: 100px;
		cursor: pointer;
		transform: translateX(-50%);
		z-index: 1;
	}

	.draw-btn image {
		width: 100%;
		height: 100%;
	}

	.draw-middle-button {
		margin-bottom: 20px;
	}

	.body-box {
		width: 100%;
		height: 100%;
	}

	.body-main {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
	}

	.body-main .title {
		line-height: 50rpx;
		color: #222;
		text-align: center;
		font-size: 24rpx;
		margin-top: 40rpx;
	}

	.body-main .image {
		width: 20px;
		height: 20px;
		margin: 0 auto;
		margin-top: 10rpx;
	}

	.body-main.t2 {
		transform: rotate(45deg);
	}

	.body-main.t3 {
		transform: rotate(90deg);
	}

	.body-main.t4 {
		transform: rotate(135deg);
	}

	.body-main.t5 {
		transform: rotate(180deg);
	}

	.body-main.t6 {
		transform: rotate(225deg);
	}

	.body-main.t7 {
		transform: rotate(270deg);
	}

	.body-main.t8 {
		transform: rotate(315deg);
	}

	.body-box.kai1 {
		animation: kai1 4s ease 1;
	}

	.body-box.kai2 {
		animation: kai2 4s ease 1;
	}

	.body-box.kai3 {
		animation: kai3 4s ease 1;
	}

	.body-box.kai4 {
		animation: kai4 4s ease 1;
	}

	.body-box.kai5 {
		animation: kai5 4s ease 1;
	}

	.body-box.kai6 {
		animation: kai6 4s ease 1;
	}

	.body-box.kai7 {
		animation: kai7 4s ease 1;
	}

	.body-box.kai8 {
		animation: kai8 4s ease 1;
	}

	@keyframes tubleChange {
		0% {
			transform: translate(-50%, -50%) rotate(0);
		}

		90% {
			transform: translate(-50%, -50%) rotate(1800deg);
		}

		100% {
			transform: translate(-50%, -50%) rotate(1800deg);
		}
	}

	@keyframes kai1 {
		0% {
			transform: rotate(0);
		}

		90% {
			transform: rotate(1800deg);
		}

		100% {
			transform: rotate(1800deg);
		}
	}

	@keyframes kai2 {
		0% {
			transform: rotate(0);
		}

		90% {
			transform: rotate(1755deg);
		}

		100% {
			transform: rotate(1755deg);
		}
	}

	@keyframes kai3 {
		0% {
			transform: rotate(0);
		}

		90% {
			transform: rotate(1710deg);
		}

		100% {
			transform: rotate(1710deg);
		}
	}

	@keyframes kai4 {
		0% {
			transform: rotate(0);
		}

		90% {
			transform: rotate(1665deg);
		}

		100% {
			transform: rotate(1665deg);
		}
	}

	@keyframes kai5 {
		0% {
			transform: rotate(0);
		}

		90% {
			transform: rotate(1620deg);
		}

		100% {
			transform: rotate(1620deg);
		}
	}

	@keyframes kai6 {
		0% {
			transform: rotate(0);
		}

		90% {
			transform: rotate(1575deg);
		}

		100% {
			transform: rotate(1575deg);
		}
	}

	@keyframes kai7 {
		0% {
			transform: rotate(0);
		}

		90% {
			transform: rotate(1530deg);
		}

		100% {
			transform: rotate(1530deg);
		}
	}

	@keyframes kai8 {
		0% {
			transform: rotate(0);
		}

		90% {
			transform: rotate(1485deg);
		}

		100% {
			transform: rotate(1485deg);
		}
	}

	.body-box.t1 {
		transform: rotate(1800deg);
	}

	.body-box.t2 {
		transform: rotate(1755deg);
	}

	.body-box.t3 {
		transform: rotate(1710deg);
	}

	.body-box.t4 {
		transform: rotate(1665deg);
	}

	.body-box.t5 {
		transform: rotate(1620deg);
	}

	.body-box.t6 {
		transform: rotate(1575deg);
	}

	.body-box.t7 {
		transform: rotate(1530deg);
	}

	.body-box.t8 {
		transform: rotate(1485deg);
	}

	.main-title {
		font-family: Adobe 黑体 Std R;
		line-height: 80rpx;
		font-size: 32rpx;
		text-align: center;
		color: #fefeff;
		margin-top: 40rpx;
		width: 100%;
	}

	.main-title span {
		display: inline-block;
		vertical-align: top;
		margin: 0 20rpx;
		color: #ffdd52;
	}

	.uni-swiper {
		width: 100%;
		position: relative;
		margin: 0 auto;
		margin-top: 2px;
		overflow: hidden;
	}

	.uni-swiper .swiper {
		height: 320px;
		font-size: 16px;
	}

	.swiper-bg {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 1;
	}

	.btn-submit {
		background-image: url(./images/submit-button.png);
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		height: 52px;
		border-radius: 52px;
		min-width: 166px;
		padding: 0 10px;
		color: #fff;
		font-size: 20px;
		cursor: pointer;
		text-shadow: 0 2px 5px rgba(253, 66, 8, .2);
		box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
		position: absolute;
		bottom: -180px;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.turn-head {
		margin-left: -20px;
		text-align: center;
	}

	.turn-head image {
		width: 100%;
	}

	.tab-vip {
		color: #ffffff;
		text-align: center;
	}

	.draw-middle-button {
		z-index: 99;
		position: relative;
	}

	.draw-middle-button .draw-tip {
		color: #fff;
		font-size: 12px;
		position: absolute;
		left: 50%;
		bottom: 118%;
		background: linear-gradient(#7ab2ff, #2f7ae1);
		border: 1px solid #ffffff;
		border-radius: 40px;
		transform: translateX(-50%);
		padding: 5px 10px;
	}

	.result-panel {
		box-sizing: border-box;
		padding: 50px 80px;
		width: 468px;
		height: 500px;
		margin-left: 250px;
		margin-top: 150px;
		/* background: url(./images/listpanel.png) no-repeat; */
		background-size: 100% 100%;
		background: rgba(9, 40, 92, .6);
	}

	.news-list {
		border: 1px dashed #f79e49;
		position: relative;
		padding: 15px;
		cursor: pointer;
		border-radius: 12px;
		margin-bottom: 12px;

		.btn--gray {
			width: 100%;
			border-radius: 4px;
		}

		.news-list-head {
			display: flex;
			align-items: center;
			margin-bottom: 10px;
		}

		.news-list-title {
			font-size: 15px;
		}

		.person-title {
			color: #000;
		}

		.list-desc {
			line-height: 1.8;
		}

		.list-cate .dot {
			display: inline-flex;
			width: 8px;
			height: 8px;
			background: var(--tab-active);
			border-radius: 2px;
			margin-right: 5px;
		}

		.list-cate .text {
			font-weight: bold;
			background: var(--font-color);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}

		.list-time {
			font-size: 12px;
		}

		.news-pic {
			margin-right: 15px;
			font-size: 0;

			image {
				display: block;
				width: 160px;
				height: 110px;
				border-radius: 10px;
			}
		}
	}

	.turntable-container-scroll {
		height: 550px;
	}

	.cash-list-class {
		background-color: #fff;
		padding: 15px;
		border-radius: 5px;
		margin: 0 0 10px 0;
		border: 2px dashed #A4BFF8;
	}

	.cash-list-class .turntable-cash-icon-class {
		background-color: #F5F6F7;
		border-radius: 10px;
		padding: 10px;
		box-shadow: 3px 6px 12px 0px rgba(0, 0, 0, 0.4);
	}

	.cash-list-class .turntable-cash-icon-class .turntable-cash-icon {
		width: 35px;
		height: 30px;
		background-size: contain;

	}

	.turntable-cash-right {
		flex: 1;
		margin-left: 25px;
	}

	.turntable-cash-right .turntable-cash-top .top-text-left {
		font-size: 18px;
		font-weight: bold;
	}

	.turntable-cash-right .turntable-cash-top .top-text-right {
		color: #F24400;
	}

	.turntable-cash-right .turntable-cash-bottom .top-text-left {
		color: #8F8F8F;
	}

	.turntable-cash-right .turntable-cash-bottom .top-text-right {
		color: #fff;
		min-width: 80px;
		margin-left: 25px;
		padding: 8px 15px;
		text-align: center;
		cursor: pointer;
		border-radius: 5px;
		background-color: #306DF0;
	}

	.turntable-cash-right .turntable-cash-bottom .top-text-right2 {
		color: #306DF0;
		min-width: 80px;
		margin-left: 5px;
		cursor: pointer;
		padding: 8px 15px;
		text-align: center;
		border-radius: 30px;
		background-color: #ccc;
	}

	.bs-popup {
		background: #fff;
	}

	.fury-wheel__wheel-bg-img {
		position: relative;
		z-index: 1;
		width: 321px;
		height: 393px;
		margin: 15px auto 15px;
	}

	.fury-wheel__wheel-bg-img .wheel-bg-img {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 435px;
		height: 530px;
	}

	.fury-wheel__wheel-bg-img .wheel-left_right {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 555px;
		height: 150px;
	}

	.fury-wheel__wheel-bg-img .wheel-top {
		position: absolute;
		left: 30%;
		top: 20%;
		transform: translate(-50%, -50%);
		width: 129px;
		height: 159px;
		transform: rotate(358deg);
		z-index: 100;
	}

	.fury-wheel__wheel-img {
		position: absolute;
		left: -25%;
		top: 0%;
		z-index: 111;
		transition-property: transform;
		transition-timing-function: cubic-bezier(.19, -.11, .03, 1.04);
	}
</style>
