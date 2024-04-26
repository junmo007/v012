<template>
	<view class="turn-wrapper">
		<u-popup v-model="wheelshow" mode="bottom" :mask-custom-style="uPopMaskCustomStyle" borderRadius="32">
			<view class="turntable-container-header">
				<view>{{$t('转盘')}}</view>
				<view class="u-m-t-10">{{'VIP '+minLevel + ' - ' + 'VIP ' + maxLevel}}</view>
				<image src="./images/close.png" class="close" mode="" @click="wheelshow = false"></image>
			</view>
			<view class="turntable-container">
				<view class="turn-tab">
					<view class="turn-tab-item" :class="turnCount == index ? 'active' : ''"
						@click="turnCountChange(index)" v-for="(item,index) in lotteryConfig"
						:key="`lotteryConfig${index}`">{{$t(item.title)}}</view>
				</view>
				<view class="u-text-center text-yellow u-m-t-30" @click="luckyPopupChange">{{$t('我的卡券')}}</view>
				<!-- <image src="./images/thu-panel.png" class="turntable-bg" mode=""></image> -->
				<view class="main-box">
					<!-- <view class="turn-tab-bar flex-center">
						<view class="flex-col">
							<view class="turn-tab">
								<view class="turn-tab-item" :class="turnCount == index ? 'active' : ''"
									@click="turnCountChange(index)" v-for="(item,index) in lotteryConfig"
									:key="`lotteryConfig${index}`">{{$t(item.title)}}</view>
							</view>
						</view>
						<view class="bar-link" style="z-index: 99;" @click="luckyPopupChange">
							{{$t('我的卡券')}}
						</view>
					</view> -->
					<!-- <view class="u-flex u-row-center u-p-l-10 u-p-r-10 u-p-t-10 u-m-b-10 u-rela">
						<view class="tab-vip">
							<view>{{'VIP '+minLevel + ' - ' + 'VIP ' + maxLevel}}</view>
						</view>
						<view class="u-flex m-c-w u-abso" style="right: 0;z-index: 99;" @click="relaPopChange">
							<view>{{$t('规则')}}</view>
							<view class="iconfont icon-right"></view>
						</view>
					</view> -->
					<!-- <image src="./images/tu-head2.png" class="turntable-hd" mode="widthFix"></image> -->
					<!-- <view class="turn-head">
						<image :src="$t('turntableThuHead')" class="turntable-hd" mode="widthFix"></image>
					</view> -->
					<view class="fury-wheel__wheel-bg-img">
						<image src="./images/circle3.png" class="wheel-bg-img" mode=""></image>
						<image src="./images/circle4.png" class="wheel-bg-img2" mode=""></image>
						<view class="fury-wheel__wheel-img">
							<LuckyWheel ref="myLucky" :defaultConfig="defaultConfig" :prizes="prizes" :blocks="blocks"
								width="300" height="300" :buttons="buttons" @start="startCallback" @end="endCallback" />
						</view>
						<!-- <image src="./images/left_right.png" class="wheel-left_right" mode=""></image> -->
						<!-- <image src="./images/top.png" class="wheel-top" mode="" v-if="!mainbind"></image> -->
						<!-- <view class="btn btn-submit" @tap="startCallback">
							{{ mainbind ? $t('正在抽奖') : $t('立即参与') }}
						</view> -->
						<!-- <view class="wheel-draw-middle">
							<image src="./images/draw-middle.png" mode=""></image>
							<template v-if="freeCount > 0 || freeCount == -1">
								<view class="wheel-draw-middle-text">{{$t('免费抽奖次数')}}：{{ freeCount }}</view>
							</template>
							<template v-else>
								<template v-if="(userIntegral >= requiredIntegral) && userIntegral != 0">
									<view class="wheel-draw-middle-text">
										<view>{{requiredIntegral}}{{$t('积分次')}}</view>
										<view>{{$t('当前积分')}}:{{userIntegral}}</view>
									</view>
								</template>
								<template v-else>
									<view class="wheel-draw-middle-text">
										<view>{{requiredBalance}}{{$t('余额次')}}</view>
										<view>{{$t('当前余额')}}:{{userBalance}}</view>
									</view>
								</template>
							</template>
						</view> -->
					</view>

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
				</view>
				<view class="u-p-l-30 u-p-r-30">
					<template v-if="freeCount > 0 || freeCount == -1">
						<view class="u-text-center">{{$t('免费抽奖次数')}}：{{ freeCount }}</view>
					</template>
					<template v-else>
						<template v-if="(userIntegral >= requiredIntegral) && userIntegral != 0">
							<view class="u-text-center">{{requiredIntegral}}{{$t('积分次')}}</view>
							<view class="u-text-center u-m-t-10">{{$t('当前积分')}}:{{userIntegral}}</view>
						</template>
						<template v-else>
							<view class="u-text-center">{{requiredBalance}}{{$t('余额次')}}</view>
							<view class="u-text-center u-m-t-10">{{$t('当前余额')}}:{{userBalance}}</view>
						</template>
					</template>
					<view class="lottery-btn" @click="startCallback">
						{{ mainbind ? $t('正在抽奖') : $t('立即参与') }}
					</view>
					<view class="u-flex u-row-center u-m-t-30" @click="relaPopChange">
						<image src="./images/help.png" style="width: 14px;height: 14px;" mode=""></image>
						<view class="u-m-l-12 text-yellow">{{$t('规则')}}</view>
					</view>
					<view class="uni-swiper">
						<view class="swiper">
							<swiper :indicator-dots="indicator" :autoplay="autoplay" :interval="interval"
								:duration="duration" vertical="true" class="swiper">
								<swiper-item class="text" v-for="(item,index) in rollList" :key="`rollList${index}`">
									<view class="u-text-center">
										{{$t('恭喜')}} {{item.username}} {{$t('抽到')}} {{item.title}}
									</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="close-box" @click="wheelshow = false">
				<image src="./images/close.png" mode=""></image>
			</view> -->
		</u-popup>

		<u-popup v-model="actualPrize" mode="bottom" :mask-custom-style="uPopMaskCustomStyle" borderRadius="32">
			<view class="turntable-container-header">
				<view class="u-p-t-20">{{content}}</view>
				<image src="./images/close.png" class="close" mode="" @click="actualPrize = false"></image>
			</view>
			<view class="u-p-30">
				<view class="form-main">
					<uni-forms err-show-type="toast" ref="form" :modelValue="formData" :rules="rules" :border="false">
						<view class="u-m-b-16 u-m-t-30">
							<text>{{$t('姓名')}}</text>
							<text style="color: #D12C2C;">*</text>
						</view>
						<uni-forms-item name="name">
							<uni-easyinput type="text" v-model="formData.name" :styles="styles" />
						</uni-forms-item>
						<view class="u-m-b-16 u-m-t-20">
							<text>{{$t('手机号')}}</text>
							<text style="color: #D12C2C;">*</text>
						</view>
						<uni-forms-item name="phone">
							<uni-easyinput type="text" v-model="formData.phone" :styles="styles" />
						</uni-forms-item>
						<view class="u-m-b-16 u-m-t-20">
							<text>{{$t('地址')}}</text>
							<text style="color: #D12C2C;">*</text>
						</view>
						<uni-forms-item name="address">
							<uni-easyinput type="text" v-model="formData.address" :styles="styles" />
						</uni-forms-item>
					</uni-forms>
				</view>
				<view class="w_100 btn--submit u-text-center u-p-30 u-m-t-30" @click="actualPrizeChange">
					<view class="m-line-1 m-font-b">{{$t('确定')}}</view>
				</view>
			</view>
		</u-popup>




		<u-popup v-model="luckyPopup" mode="bottom">
			<view class="bs-popup-hd m-c-w">
				<view>{{$t("我的卡卷")}}</view>
				<image src="@/static/images/index/menu/back.png"
					style="width: 42px;height: 42px;position: absolute;left: 12px;" @click="luckyPopupCloseChange">
				</image>
			</view>
			<scroll-view class="turntable-container" scroll-y="true" @scrolltolower="scrolltolower">
				<view class="main-box">
					<!-- <view class="u-flex u-m-20">
						<view class="u-m-r-20" :class="cashCurrent == 1 ? 'cash-tabs-item-active' : 'cash-tabs-item'"
							@click="cashChange(1)">{{$t('我的卡卷')}}</view>
						<view :class="cashCurrent == 2 ? 'cash-tabs-item-active' : 'cash-tabs-item'"
							@click="cashChange(2)">{{$t('抽奖记录')}}</view>
					</view> -->

					<template v-if="cashCurrent == 1">
						<template v-if="showEmpty == 1">
							<view class="cash-list-class" v-for="(item,index) in cashList" :key="`cashList${index}`">
								<!-- <view class="turntable-cash-icon-class">
										<image src="./images/lefu-icon.png" class="turntable-cash-icon" mode=""></image>
									</view> -->
								<view class="turntable-cash-right u-flex u-row-between">
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
								</view>
								<view class="u-flex u-m-t-10 u-c-9" v-if="item.is_make == 0">
									<view class="u-m-r-14">{{$t('有效期至')}}</view>
									<view>{{item.over_time}}</view>
								</view>
							</view>
						</template>
						<template v-if="showEmpty == 0">
							<listEmpty class="u-bd-8" :listHighly='400'>
							</listEmpty>
						</template>
					</template>
					<template v-if="cashCurrent == 2">
						<template v-if="showEmpty2 == 1">
							<view class="cash-list-class" v-for="(item,index) in lotteryrecordList"
								:key="`lotteryrecordList${index}`">
								<view class="u-flex u-row-between">
									<view class="cash-left">
										<view class="title">{{item.title}}</view>
										<view class="time">{{item.time}}</view>
									</view>
									<view class="cash-right-time">{{item.price}}</view>
								</view>
							</view>
						</template>
						<template v-if="showEmpty2 == 0">
							<listEmpty class="u-bd-8" :listHighly='400'>
							</listEmpty>
						</template>
					</template>
				</view>
			</scroll-view>
			<!-- <view class="close-box" @click="luckyPopupCloseChange">
				<image src="./images/close.png" mode=""></image>
			</view> -->
		</u-popup>
		<u-popup v-model="relaPop" mode="bottom" borderRadius="10" width="328px">
			<view class="bs-dist-popup">
				<view class="bs-popup-hd m-c-w">
					<view>{{$t("抽奖规则")}}</view>
					<image src="@/static/images/index/menu/back.png"
						style="width: 42px;height: 42px;position: absolute;left: 12px;" @click="relaPop = false">
					</image>
				</view>
				<scroll-view class="turntable-container-scroll" scroll-y="true">
					<image :src="$t(ruleImg)" mode="widthFix" style="width: 100%"></image>
				</scroll-view>
			</view>
		</u-popup>
		
		<uni-popup ref="LuckySu" type="bottom" @close="LuckySuClose">
			<view class="uc-pop">
				<view class="u-p-40 pop-bottom">
					<view class="u-flex u-row-center flex--direction">
						<image src="./images/su.png" style="width: 88px;height: 88px;" mode=""></image>
						<view class="u-p-t-20 u-p-b-20">{{$t('恭喜')}}</view>
						<view class="u-m-t-20 text-yellow">{{$t('您的奖励')}}:{{content}}</view>
						<view class="w_100 btn--submit u-text-center u-p-20 u-m-t-30" @click="LuckySuClose">
							<view class="m-line-1 m-font-b">{{$t('确定')}}</view>
						</view>
					</view>
				</view>
			</view>
			<fireworks zIndex="10888" ref="fireworksRef" />
		</uni-popup>
		<uni-popup ref="prizeCollection" type="bottom">
			<view class="uc-pop">
				<view class="u-p-40 pop-bottom">
					<view class="u-flex u-row-center flex--direction">
						<image src="@/static/images/dw/su.png" style="width: 88px;height: 88px;" mode=""></image>
						<view class="u-p-t-20 u-p-b-20">{{$t('您的奖励')}}:{{content}}</view>
						<view class="u-m-t-20 text-yellow">{{$t('我们会尽快与您联系')}}</view>
						<view class="w_100 btn--submit u-text-center u-p-20 u-m-t-30" @click="prizeCollectionClose">
							<view class="m-line-1 m-font-b">{{$t('确定')}}</view>
						</view>
					</view>
				</view>
			</view>
			<fireworks zIndex="10888" ref="fireworksRef" />
		</uni-popup>
		<u-modal v-model="resultShow" :content="content" @confirm="confirm" :content-style="contentStyle"
			:show-title="false" confirm-color="#000"></u-modal>
		<u-toast ref="uToast" />
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10999">
		</u-top-tips>
	</view>
</template>

<script>
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import LuckyWheel from '@/components/@lucky-canvas/uni/lucky-wheel' // 大转盘
	import fireworks from '@/components/sanshui-fireworks/sanshui-fireworks.vue'
	export default {
		components: {
			listEmpty,
			fireworks,
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
				cashList: [],
				luckyPopup: false,
				page: 1,
				status: 'more',
				showEmpty: null,
				minLevel: 0,
				maxLevel: 0,
				relaPop: false,
				ruleImg: 'turntable-rule-',
				freeCount: 0,
				userIntegral: 0,
				userBalance: 0,
				requiredIntegral: 0,
				wlWidth: 280,
				wlHeight: 280,
				defaultConfig: {
					stopRange: 0,
					gutter: 1,
					offsetDegree: 23
				},
				buttons: [{
					radius: '100px',
					pointer: true,
					imgs: [{
						top: '-20px',
						width: '38px',
						height: '38px',
						src: require("./images/pointer1.png")
					}, {
						top: '-40px',
						width: '29px',
						height: '31px',
						src: require("./images/pointer2.png")
					}]
				}],
				blocks: [{
					padding: '45px',
					imgs: []
				}],
				prizesIdByIndex: {},
				prizes: [],
				cashCurrent: 1,
				lotteryrecordList: [],
				page2: 1,
				status2: 'more',
				showEmpty2: null,
				Congratulations: false,
				formData: {
					name: '',
					phone: '',
					address: ''
				},
				styles: {
					color: '#ffffff',
					border: 'var(--easyinput__border)',
					borderRadius: "8px"
				},
				actualPrize: false,
				rules: {
					name: {
						rules: [{
							required: true,
							errorMessage: this.$t("请输入您的姓名"),
						}]
					},
					phone: {
						rules: [{
							required: true,
							errorMessage: this.$t("请输入您的手机"),
						}]
					},
					address: {
						rules: [{
							required: true,
							errorMessage: this.$t("请输入您的地址"),
						}]
					}
				},
				lotteryData: {},
			}
		},
		activated() {
			this.userInfo_common = this.$helper.get('userInfo');
		},
		mounted() {
			this.userInfo_common = this.$helper.get('userInfo');
		},
		methods: {
			actualPrizeChange(){
				let _this = this;
				this.$refs.form.validate().then(async res => {
					let ret = await this.$u.api.lottery_set_address_p({
						id: this.lotteryData.rec_id,
						name: res.name,
						phone: res.phone,
						land: res.address
					});
					if(ret && ret.code == 1){
						this.actualPrize = false;
						this.prizeCollectionChnage();
					}else {
						this.$refs.uTips.show({
							title: this.$t(ret.msg)
						});
					}
				}).catch(err => {})
			},
			prizeCollectionChnage() {
				this.$refs.prizeCollection.open();
			},
			prizeCollectionClose() {
				this.$refs.prizeCollection.close();
			},
			LuckySuChnage() {
				this.$refs.LuckySu.open();
			},
			LuckySuClose() {
				this.$refs.LuckySu.close();
				this.getLotteryConfig();
				if(this.lotteryData.type == 2){
					this.actualPrize = true;
				}
			},
			async getLotteryLotteryrecord(add) {
				let res = await this.$u.api.lottery_lotteryrecord_p({
					page: this.page2,
					limit: 10,
					state: 1,
					prize_type: 1,
					lottery_id: this.lotteryConfig[this.turnCount].id
				});
				if (res) {
					if (add) {
						this.lotteryrecordList = res.data;
					} else {
						this.lotteryrecordList = this.lotteryrecordList.concat(res.data);
					}
					if (res.data.length == 10) {
						this.status2 = "loading";
						this.page2++;
					} else {
						this.status2 = "noMore";
					}
					if (this.lotteryrecordList.length > 0) {
						this.showEmpty2 = 1;
					} else {
						this.showEmpty2 = 0;
					}
				}
			},
			cashChange(i) {
				this.cashCurrent = i;
				if (i == 1) {
					this.page = 1;
					this.cashList = [];
					this.showEmpty = null;
					this.getLotteryCardCase('add');
				} else {
					this.page2 = 1;
					this.showEmpty2 = null;
					this.lotteryrecordList = [];
					this.getLotteryLotteryrecord('add');
				}
			},
			relaPopChange() {
				this.relaPop = true;
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
			luckyPopupChange() {
				this.getLotteryCardCase('add');
				this.luckyPopup = true;
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
			scrolltolower() {
				if (this.status == 'noMore') {
					return;
				}
				this.getLotteryCardCase();
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
					this.userIntegral = res.integral * 1;
					this.userBalance = res.balance * 1;
					this.getLotteryLotteryprize();
				}
			},
			async getLotteryLotteryprize() {
				let res = await this.$u.api.lottery_lotteryprize_p({
					id: this.lotteryConfig[this.turnCount].id
				});
				if (res && res.code == 1) {
					this.ruleImg = 'turntable-rule-';
					this.prizeList = res.data;
					this.initPrizes(res.data);
					this.limitCount = this.lotteryConfig[this.turnCount].limit_count;
					this.freeCount = this.lotteryConfig[this.turnCount].free_count;
					this.minLevel = this.lotteryConfig[this.turnCount].min_level;
					this.maxLevel = this.lotteryConfig[this.turnCount].max_level;
					this.ruleImg = this.ruleImg + this.lotteryConfig[this.turnCount].id;
					this.requiredIntegral = this.lotteryConfig[this.turnCount].required_integral;
					this.requiredBalance = this.lotteryConfig[this.turnCount].required_balance;
				}
			},
			initPrizes(prizes) {
				this.prizes = [];
				for (const key in prizes) {
					const element = prizes[key];
					this.prizesIdByIndex[element.id] = key;
					this.prizes.push({
						imgs: [{
							top: '-0',
							width: 80,
							height: 88,
							src: element.pic
							// src: require("./images/2.png")
						}]
					})
				}
			},
			turnCountChange(i) {
				this.turnCount = i;
				this.getLotteryLotteryprize();
			},
			async startCallback() {
				var that = this;
				if (that.mainbind == false) {
					let res = await this.$u.api.lottery_lottery_p({
						lottery_id: this.lotteryConfig[this.turnCount].id
					});
					if (res.code == 1 && res) {
						this.lotteryData = res.data;
						that.mainbind = true;
						that.$refs.myLucky.play();
						setTimeout(() => {
							const index = that.prizesIdByIndex[res.data.id];
							that.$refs.myLucky.stop(index);
						}, 4500);
						that.content = that.prizeList[that.prizesIdByIndex[res.data.id]].title;
						// that.content = res.data.title;
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
				let _this = this;
				this.mainbind = false;
				this.LuckySuChnage();
			},
			// 中间记录
			async lotteryrecord_api() {
				let res = await this.$u.api.lottery_lotteryrecord_p({
					page: 1,
					limit: 30,
					state: 0,
					prize_type: 1
				});
				if (res.code == 1 && res) {
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
		border-bottom: 1px solid #4D4886;
		padding: 0 20px;
	}

	.turn-tab-bar {
		padding: 0 5px;
	}

	.turn-tab-bar .bar-link {
		color: #ffffff;
		padding: 0 3px;
	}

	.turn-tab-item {
		width: 30%;
		padding: 0 10rpx;
		height: 40px;
		line-height: 40px;
		color: var(--tab-item-color);
		margin-right: 10px;
	}

	.turn-tab-item.active {
		padding-bottom: 2px;
		position: relative;
		color: #ffffff !important;
	}

	.turn-tab-item.active::after {
		content: '';
		left: 0;
		right: 0;
		bottom: 0;
		transform: translateY(10%);
		position: absolute;
		width: 100%;
		height: 4px;
		border-radius: 3px 3px 0px 0px;
		background: rgba(233, 174, 58, 1);
		box-shadow: 0px 0px 6px 2px rgba(255, 184, 0, 0.5);
	}

	.turntable-container {
		/* margin: 0 auto; */
		position: relative;
		/* width: 328px; */
		height: 590px;
		/* padding: 12px 5px; */
		/* background: linear-gradient(to right, #011E72, #01113F); */
		background: rgba(30, 23, 57, 1);
		border-radius: 10px;
	}

	.u-p-lr-0 {
		padding: 0 !important;
	}

	.turntable-container .turntable-bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 485px;
		background-size: contain;
	}

	.main-box {
		width: 100%;
		position: relative;
		z-index: 11;
		margin: 0 auto;
	}

	.draw-middle-button {
		margin-bottom: 20px;
	}

	.uni-swiper {
		width: 100%;
		height: 34px;
		margin: 0 auto;
		margin-top: 15px;
		overflow: hidden;
		padding: 8px 16px;
		border-radius: 12px;
		background: rgba(49, 43, 79, 1);
	}

	.swiper-bg {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 1;
	}

	.swiper {
		height: 25px;
	}

	.wheel-draw-middle {
		position: relative;
		z-index: 199;
		height: 55px;
		/* width: 150px; */
		width: 130px;
		bottom: -83%;
		left: 57%;
		transform: translate(-50%, 10%);
	}

	.wheel-draw-middle image {
		width: 100%;
		height: 55px;
	}

	.wheel-draw-middle-text {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 8px;
		color: #fff;
		transform: scale(.8);
	}

	.draw-middle {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		height: 55px;
		width: 130px;
		background-image: url(./images/draw-middle.png);
		position: absolute;
		bottom: -8%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.turn-head {
		margin: 0 -12px;
		text-align: center;
	}

	.turn-head image {
		width: 80%;
		margin: 0 auto;
		max-height: 70px;
	}

	.tab-vip {
		color: #fff;
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

	.cash-list-class {
		/* background-color: #fff; */
		padding: 15px;
		/* border-radius: 25px; */
		/* margin: 0 10px 10px 10px; */
		border-bottom: 1px solid #4c4882;
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

	.cash-list-class .cash-left .title {
		font-size: 18px;
		font-weight: bold;
	}

	.cash-list-class .cash-left .time {
		margin-top: 10px;
	}

	.cash-list-class .cash-right-time {
		font-family: PingFang SC;
		font-weight: 600;
		font-size: 15px;
		color: #F80808;
	}


	.turntable-cash-right {
		flex: 1;
	}

	.turntable-cash-right .turntable-cash-top .top-text-left {
		font-size: 18px;
		font-weight: bold;
	}

	.turntable-cash-right .turntable-cash-top .top-text-right {
		color: #2f7ae1;
	}

	.turntable-cash-right .turntable-cash-bottom .top-text-left {
		color: #8F8F8F;
	}

	.turntable-cash-right .turntable-cash-bottom .top-text-right {
		color: #fff;
		min-width: 80px;
		margin-left: 5px;
		text-align: center;
		padding: 10px 12px;
		border-radius: 8px;
		background: rgba(233, 174, 58, 1);
	}

	.turntable-cash-right .turntable-cash-bottom .top-text-right2 {
		color: #fff;
		min-width: 80px;
		margin-left: 5px;
		text-align: center;
		padding: 10px 12px;
		border-radius: 8px;
		background: rgba(233, 174, 58, 1);

	}

	.turntable-container-scroll {
		height: 260px;
	}

	/* .fury-wheel__wheel-bg-img {
		position: relative;
		z-index: 1;
		width: 260px;
		height: 260px;
		margin: -75px auto 15px;
	} */

	.fury-wheel__wheel-bg-img .wheel-bg-img {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 235px;
		height: 235px;
		z-index: 2;
	}

	.fury-wheel__wheel-bg-img .wheel-bg-img2 {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 245px;
		height: 245px;
		z-index: 1;
	}



	/* .fury-wheel__wheel-bg-img .wheel-left_right {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 330px;
		height: 135px;
	}

	.fury-wheel__wheel-bg-img .wheel-top {
		position: absolute;
		left: 37%;
		top: 26.5%;
		transform: translate(-50%, -50%);
		width: 90px;
		height: 132px;
		transform: rotate(358deg);
		z-index: 100;
	} */

	.fury-wheel__wheel-img {
		position: relative;
		z-index: 111;
	}

	.cash-tabs-item {
		/* height: 40px; */
		color: #000;
		padding: 10px 15px;
		/* line-height: 40px; */
		font-weight: bold;
		background: #F7F7F7;
		border-radius: 35px;
	}

	.cash-tabs-item-active {
		/* height: 40px; */
		/* line-height: 40px; */
		padding: 10px 15px;
		color: #fff;
		font-weight: bold;
		background: #3B7DEE;
		border-radius: 35px;
	}

	.turntable-container-header {
		height: 52px;
		padding: 6px 10px;
		position: relative;
		text-align: center;
		border-radius: 20px 20px 0px 0px;
		background: rgba(49, 43, 79, 1);
		border-bottom: 1px solid rgba(77, 72, 134, 1)
	}

	.turntable-container-header .close {
		width: 32px;
		height: 32px;
		position: absolute;
		top: 10px;
		right: 15px;
	}

	.lottery-btn {
		margin-top: 20px;
		text-align: center;
		padding: 15px 24px;
		border-radius: 16px;
		background: rgba(233, 174, 58, 1);
	}
</style>
