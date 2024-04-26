<template>
	<view class="cash-list">
		<u-popup v-model="luckyPopup" mode="center" border-radius="16" :width="!mobile?'550px':'350px'">
			<view class="bs-popup bs-dist-popup no-border">
				<view class="bs-popup-hd">
					<view>{{$t("我的卡卷")}}</view>
					<view class="iconfont icon-close" @click="luckyPopupCloseChange"></view>
				</view>
				<scroll-view class="turntable-container-scroll" scroll-y="true" @scrolltolower="scrolltolower">
					<view class="bs-popup-body">
						<template v-if="showEmpty == 1">
							<view class="cash-list-class" v-for="(item,index) in cashList" :key="`cashList${index}`" @click="change(index)">
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
											<view class="top-text-left">{{$t(item.condition)}}</view>
											<view :class="current == index ? 'cash-select-active' : 'cash-select'">
											</view>
										</view>
									</view>
								</view>
								<view class="u-flex u-m-t-30 u-c-9">
									<view class="u-m-r-14">{{$t('有效期至')}}</view>
									<view>{{item.over_time}}</view>
								</view>
							</view>
							<view class="cash-btn" @click="configChange">{{$t('确认使用')}}</view>
						</template>
						<template v-if="showEmpty == 0">
							<listEmpty class="u-bd-8" :listHighly='400'>
							</listEmpty>
						</template>
					</view>
				</scroll-view>
			</view>
		</u-popup>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10999">
		</u-top-tips>
	</view>
</template>

<script>
	import listEmpty from '@/components/list-empty/list-empty.vue'
	export default {
		components: {
			listEmpty
		},
		data() {
			return {
				cashList: [],
				luckyPopup: false,
				page: 1,
				status: 'more',
				showEmpty: null,
				mobile: false,
				current: null
			}
		},
		methods: {
			change(e){
				this.current = e;
			},
			// 是否为移动端
			_isMobile() {
				let flag = navigator.userAgent.match(
					/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
				);
				return flag;
			},
			configChange(){
				this.$emit('selectCashData',this.cashList[this.current]);
				this.luckyPopupCloseChange();
			},
			getMobile() {
				if (this._isMobile()) {
					/*
					 * 移动端
					 */
					this.mobile = true;
				} else {
					/*
					 * pc端
					 */
					this.mobile = false;
				}
			},
			scrolltolower() {
				if (this.status == 'noMore') {
					return;
				}
				this.getLotteryCardCase('', 5);
			},
			luckyPopupCloseChange() {
				this.page = 1;
				this.cashList = [];
				this.showEmpty = null;
				this.luckyPopup = false;
			},
			async getLotteryCardCase(add, type) {
				uni.showLoading({
					title: this.$t("loading")
				});
				let ret = await this.$u.api.lottery_card_case_p({
					page: this.page,
					limit: 10,
					state: 0,
					type
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
			luckyPopupChange(type) {
				this.luckyPopup = true;
				this.cashList = [];
				this.page = 1;
				this.showEmpty = null;
				this.getLotteryCardCase('add', type);
			}
		},
		activated() {
			this.getMobile();
		},
		mounted() {
			this.getMobile();
		}
	}
</script>

<style scoped>
	.turntable-container-scroll {
		height: 550px;
	}

	.cash-list-class {
		cursor: pointer;
		background-color: #fff;
		padding: 15px;
		border-radius: 5px;
		margin: 0 0 10px 0;
		border: 2px dashed #FDE1C8;
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
		background-color: #E67817;
	}

	.cash-select {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		border: 1px solid #E67817;
	}

	.cash-select-active {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		border: 1px solid #E67817;
		background-color: #E67817;
	}
	
	.cash-btn {
		color: #fff;
		margin-top: 15px;
		border-radius: 10px;
		text-align: center;
		padding: 12px 15px;
		background-color: #E67817;
	}
</style>
