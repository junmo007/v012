<template>
	<view class="side-user">
		<view class="u-p-b-30 u-p-t-30 u-p-l-12 u-p-r-12 u-m-b-50">
			<view class="balance-btn-1 u-m-b-20">
				<view class="m-font-16">{{userBalance.balance1?userBalance.balance1+' ₽':'0.00 ₽'}}
				</view>
				<view class="u-m-t-10">{{$t('user1')}}</view>
				<view class="balanceLock" @click="handselInfoPop2 = true"
					v-if="userInfo_common.freeze_sta == 2">
					<view class="u-flex u-row-center">
						<view class="u-m-r-10">{{userInfo_common.freeze_time}}</view>
						<image src="@/static/images/index/Subtract.png" mode=""
							style="width: 14px;height: 14px;"></image>
					</view>
				</view>
			</view>
			<view class="balance-btn-2 u-m-b-20" @click="handselChange('add')">
				<view class="m-font-16">
					<text class="u-m-r-10 text-yellow">{{userInfo_common.already_handsel?userInfo_common.already_handsel+' ₽':'0.00 ₽'}}</text>
					<text class="iconfont icon-right"></text>
				</view>
				<view class="u-m-t-10">{{$t('累计彩金')}}</view>
			</view>
			<view class="balance-btn-2">
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
		</view>
		<view class="record-user">
			<view class="u-p-l-30 u-font-36 u-m-b-24">
				{{$t('交易记录')}}
			</view>
			<view class="pc-tabs">
				<u-tabs height="84" bar-height="6" bar-width="80" bg-color="none" gutter="36"
					active-color="#FFFFFF" inactive-color="#9792B2" :list="tabsList" :current="current"
					:bar-style="barStyle" @change="change">
				</u-tabs>
			</view>
			<view class="panel-record-list">
				<template v-if="current == 0">
					<template v-if="showEmpty == 1">
						<uni-collapse ref="collapse" v-model="collvalue">
							<uni-collapse-item class="collapseClass" v-for="(item,index) in dataList"
								:key="`dataList${index}`" :open="false">
								<template v-slot:title>
									<view class="tra-title">
										<view class="col-status">
											<image src="../../../static/images/plus-circle2.png"
												style="width: 20px;height: 20px;">
											</image>
											<text class="m-font-16">{{item.status == 1?$t('user35'):item.status == 2?$t('user36'):item.status == 3?$t('user37'):$t('user37')}}</text>
										</view>
										<view class="col-value">
											{{item.apply_price+' ₽'}}
										</view>
									</view>
								</template>
								<view class="collapse-body">
									<view class="collapse-row" @click="common_copy(item.order_sn)">
										<view class="collapse-label">{{$t("trade4")}}</view>
										<view class="collapse-value">
											<text class="iconfont icon-fuzhi2"></text>
											<text>{{item.order_sn}}</text>
										</view>
									</view>
									<view class="collapse-row" v-if="item.update_time">
										<view class="collapse-label">{{$t("user68")}}</view>
										<view class="collapse-value">{{item.update_time}}
										</view>
									</view>
									<view class="collapse-row">
										<view class="collapse-label">{{$t("充值方式")}}</view>
										<view class="collapse-value" v-if="item.channel==0">{{$t("线下转账")}}
										</view>
										<view class="collapse-value" v-if="item.channel==1">{{$t("在线充值")}}
										</view>
										<view class="collapse-value" v-if="item.channel==2">{{$t("USDT")}}
										</view>
										<view class="collapse-value" v-if="item.channel==3">{{$t("USDT")}}
										</view>
										<view class="collapse-value" v-if="item.channel==4">{{$t("电子钱包")}}
										</view>
										<view class="collapse-value" v-if="item.channel==6">{{$t("PIX")}}
										</view>
									</view>
									<view class="collapse-row" v-if="item.arrival_price">
										<view class="collapse-label">{{$t("到账金额")}}</view>
										<view class="collapse-value">{{item.arrival_price+' ₽'}}
										</view>
									</view>
								</view>
							</uni-collapse-item>
						</uni-collapse>
						<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
					</template>
					<template v-if="showEmpty == 0">
						<listEmpty :isDefault="true" class="u-bd-8" :listHighly='300'>
						</listEmpty>
					</template>
				</template>
				<template v-if="current == 1">
					<template v-if="showEmpty2 == 1">
						<uni-collapse ref="collapse" v-model="collvalue">
							<uni-collapse-item class="collapseClass" v-for="(item,index) in dataList2"
								:key="`dataList2${index}`" :open="false">
								<template v-slot:title>
									<view class="tra-title">
										<view class="col-status">
											<image src="../../../static/images/ArrowUp.png"
												style="width: 20px;height: 20px;">
											</image>
											<text class="m-font-16">{{item.status == 1?$t('agent78'):item.status == 2?$t('user36'):item.status == 3||item.status == 4?$t('user37'):$t('game59')}}</text>
										</view>
										<view class="col-value">
											{{item.w_price+' ₽'}}
										</view>
									</view>
								</template>
								<view class="collapse-body">
									<view class="collapse-row" @click="common_copy(item.order_sn)">
										<view class="collapse-label">{{$t("user32")}}</view>
										<view class="collapse-value">
											<text class="iconfont icon-fuzhi2"></text>
											<text>{{item.order_sn}}</text>
										</view>
									</view>
									<view class="collapse-row" v-if="item.status > 1">
										<view class="collapse-label">{{$t("user68")}}</view>
										<view class="collapse-value">{{item.update_time}}
										</view>
									</view>
									<view class="collapse-row">
										<view class="collapse-label">{{$t("提现方式")}}</view>
										<view class="collapse-value" v-if="item.channel==0">{{$t("线下转账")}}
										</view>
										<view class="collapse-value" v-if="item.channel==1">{{$t("在线提现")}}
										</view>
										<view class="collapse-value" v-if="item.channel==2">{{$t("USDT")}}
										</view>
										<view class="collapse-value" v-if="item.channel==3">{{$t("USDT")}}
										</view>
										<view class="collapse-value" v-if="item.channel==4">{{$t("电子钱包")}}
										</view>
										<view class="collapse-value" v-if="item.channel==6">{{$t("PIX")}}
										</view>
									</view>
									<view class="collapse-row" v-if="item.arrival_price">
										<view class="collapse-label">{{$t("到账金额")}}</view>
										<view class="collapse-value">{{item.arrival_price+' ₽'}}
										</view>
									</view>
								</view>
							</uni-collapse-item>
						</uni-collapse>
						<uni-load-more :status="status2" :contentText="contentText2"></uni-load-more>
					</template>
					<template v-if="showEmpty2 == 0">
						<!--  fullLiftText="暂无提现" -->
						<listEmpty :isDefault="true" class="u-bd-8" :listHighly='300'>
						</listEmpty>
					</template>
				</template>
				<template v-if="current == 2">
					<template v-if="waterrecordEmpty == 1">
						<uni-collapse ref="collapse" v-model="collvalue">
							<uni-collapse-item class="collapseClass" v-for="(item,index) in waterrecord"
								:key="`waterrecord${index}`" :open="true">
								<template v-slot:title>
									<view class="tra-title">
										<view class="col-status m-font-16">{{$t(item.msg)}}</view>
										<view class="col-value">
											{{item.type + item.price+' ₽'}}
										</view>
									</view>
								</template>
								<view class="collapse-body">
									<view class="collapse-row">
										<view class="collapse-label">{{$t("user68")}}</view>
										<view class="collapse-value">{{item.add_time}}
										</view>
									</view>
								</view>
							</uni-collapse-item>
						</uni-collapse>
						<uni-load-more :status="wstatus" :contentText="wcontentText"></uni-load-more>
					</template>
					<template v-if="waterrecordEmpty == 0">
						<listEmpty :isDefault="true" class="u-bd-8" :listHighly='300'>
						</listEmpty>
					</template>
				</template>
				<template v-if="current == 3">
					<template v-if="tableListEmpty == 1">
						<uni-collapse ref="collapse" v-model="collvalue">
							<uni-collapse-item class="collapseClass" v-for="(item,index) in tableList"
								:key="`tableList${index}`" :open="true">
								<template v-slot:title>
									<view class="tra-title">
										<view class="col-status m-font-16">{{$t(item.msg)}}</view>
										<view class="col-value">
											{{item.price+' ₽'}}
										</view>
									</view>
								</template>
								<view class="collapse-body">
									<view class="collapse-row">
										<view class="collapse-label">{{$t("状态")}}</view>
										<view class="collapse-value">
											{{item.status == 1?$t('user35'):item.status == 2?$t('user36'):item.status == 3?$t('user37'):$t('user37')}}
										</view>
									</view>
									<view class="collapse-row">
										<view class="collapse-label">{{$t("user68")}}</view>
										<view class="collapse-value">{{item.add_time}}
										</view>
									</view>
								</view>
							</uni-collapse-item>
						</uni-collapse>
						<uni-load-more :status="rstatus" :contentText="rcontentText"></uni-load-more>
					</template>
					<template v-if="tableListEmpty == 0">
						<!--  fullLiftText="您尚未参加任意活动" -->
						<listEmpty :isDefault="true" class="u-bd-8" :listHighly='300'>
						</listEmpty>
					</template>
				</template>
			</view>
		</view>
		<u-popup v-model="handselPop" mode="center" :mask-custom-style="uPopMaskCustomStyle" borderRadius="32"
			@close="handseClose" z-index="10001">
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
		<u-popup v-model="handselInfoPop2" mode="center" :mask-custom-style="uPopMaskCustomStyle" borderRadius="32"
			z-index="10001">
			<view class="bs-popup pc_pop">
				<view class="bs-popup-hd">
					<view class="tt m-c-w">{{$t('说明')}}</view>
					<image src="@/static/images/index/close.png"
						style="width: 32px;height: 32px;position: absolute;right: 15px;" mode=""
						@click="handselInfoPop2 = false">
					</image>
				</view>
				<view class="bs-popup-body">
					<scroll-view style="max-height: 40vh;min-height: 40vh;" scroll-y="true">
						<view>{{$t('冻结彩金金额说明')}}</view>
					</scroll-view>
				</view>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	import listEmpty from '@/components/list-empty/list-empty.vue'
	export default {
		components: {listEmpty},
		data() {
			return {
				doanLoadAnd: false, // 安卓下载
				doanLoadIOS: false, // IOS下载
				iosBut: 0,
				androidDownloadUrl: '',
				iosDownloadUrl: '',
				androidIos: null, // 1安卓 2IOS
				handselPop: false,
				empty: null,
				sreachData: this.$t('选择日期'),
				page: 1,
				start_time: '',
				end_time: '',
				handselInfoPop2: false,
				banusSescripton: false,
				tabsList: [{
					name: this.$t('user4')
				}, {
					name: this.$t('user5')
				}, {
					name: this.$t('账单')
				}, {
					name: this.$t('活动')
				}],
				current: 0,
				sideshow: false,
				dataList: [],
				page: 1,
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				dataList2: [],
				page2: 1,
				status2: 'more',
				contentText2: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				showEmpty: null,
				showEmpty2: null,
				tableListEmpty: null,
				waterrecordEmpty: null,
				enable: true,
				collvalue: '',
				barStyle: {
					backgroundColor: '#FFB800',
				},
			}
		},
		onLoad() {
			this.getUserInfo_common();
			this.getStatus();
			
		},
		mounted() {
			this.getDataList('add');
			this.getDataList2('add');
			this.getwaterrecord('add');
			this.getTableList('add');
			this.getTransferList('add');
		},
		methods: {
			async getDataList(add) {
				uni.showLoading({
					title: this.$t('loading')
				})
				let ret = await this.$u.api.rechargerecord_p({
					page: this.page,
					limit: 20,
					start_time: this.start_time,
					end_time: this.end_time,
				});
				if (ret) {
					uni.hideLoading();
					let arr_data = ret.data;
					if (add) {
						this.dataList = arr_data;
					} else {
						this.dataList = this.dataList.concat(arr_data);
					}
					for (let a in this.dataList) {
						this.dataList[a].isCheck = false;
					}
					// 加载状态结束
					if (arr_data.length == 20) {
						this.status = "loading";
						this.page++;
					} else {
						this.status = "noMore";
					}
					if (this.dataList.length > 0) {
						this.showEmpty = 1;
					} else {
						this.showEmpty = 0;
					}
				}
			},
			async getDataList2(add) {
				uni.showLoading({
					title: this.$t('loading')
				})
				let ret = await this.$u.api.withdrawrecord_p({
					page: this.page2,
					limit: 20,
					start_time: this.start_time,
					end_time: this.end_time,
				});
				if (ret) {
					uni.hideLoading();
					if (add) {
						this.dataList2 = ret.data;
					} else {
						this.dataList2 = this.dataList2.concat(ret.data);
					}
					for (let a in this.dataList2) {
						this.dataList2[a].isCheck = false;
					}
					// 加载状态结束
					if (ret.data.length == 20) {
						this.status2 = "loading";
						this.page2++;
					} else {
						this.status2 = "noMore";
					}
					if (this.dataList2.length > 0) {
						this.showEmpty2 = 1;
					} else {
						this.showEmpty2 = 0;
					}
				}
			},
			async getwaterrecord(add) {
				uni.showLoading({
					title: this.$t('loading')
				})
				let ret = await this.$u.api.waterrecord_p({
					page: this.wpage,
					limit: 10,
					start_time: this.start_time,
					end_time: this.end_time,
				});
				if (ret) {
					uni.hideLoading();
					if (add) {
						this.waterrecord = ret.data;
					} else {
						this.waterrecord = this.waterrecord.concat(ret.data);
					}
					// 加载状态结束
					if (ret.data.length == 10) {
						this.wstatus = "loading";
						this.wpage++;
					} else {
						this.wstatus = "noMore";
					}
					if (this.waterrecord.length > 0) {
						this.waterrecordEmpty = 1;
					} else {
						this.waterrecordEmpty = 0;
					}
				}
			},
			// 获取活动收入列表
			async getTableList(add, type) {
				uni.showLoading({
					title: this.$t('loading')
				})
				let res = await this.$u.api.recharge_mosaic_p({
					limit: 10,
					page: this.rpage,
					type: type,
					start_time: this.start_time,
					end_time: this.end_time,
				});
				if (res) {
					uni.hideLoading();
					if (add) {
						this.tableList = res.data;
					} else {
						this.tableList = this.tableList.concat(res.data);
					}
					if (res.data.length == 10) {
						this.rstatus = "loading";
						this.rpage++;
					} else {
						this.rstatus = "noMore";
					}
					if (this.tableList.length > 0) {
						this.tableListEmpty = 1;
					} else {
						this.tableListEmpty = 0;
					}
				}
			},
			// 获取转账记录列表
			async getTransferList(add) {
				uni.showLoading({
					title: this.$t('loading')
				})
				let res = await this.$u.api.transfer_list_p({
					limit: 10,
					page: this.t_page,
					type: this.t_cateType,
					start_time: this.start_time,
					end_time: this.end_time,
				});
				if (res) {
					uni.hideLoading();
					if (add) {
						this.transferList = res.data;
					} else {
						this.transferList = this.transferList.concat(res.data);
					}
					if (res.data.length == 10) {
						this.t_status = "loading";
						this.t_page++;
					} else {
						this.t_status = "noMore";
					}
					if (this.transferList.length > 0) {
						this.transferListEmpty = 1;
					} else {
						this.transferListEmpty = 0;
					}
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
			change(index) {
				this.sreachData = this.$t('选择日期');
				this.typeSelect = this.$t('赠送彩金');
				this.current = index;
				this.showEmpty = null;
				this.showEmpty2 = null;
				this.tableListEmpty = null;
				this.waterrecordEmpty = null;
				this.cateValue = 0;
				this.start_time = '';
				this.end_time = '';
				if (index == 0) {
					this.page = 1;
					this.dataList = [];
					this.getDataList('add');
				} else if (index == 1) {
					this.page2 = 1;
					this.dataList2 = [];
					this.getDataList2('add');
				} else if (index == 2) {
					this.wpage = 1;
					this.waterrecord = [];
					this.getwaterrecord('add');
				} else if (index == 3) {
					this.rpage = 1;
					this.tableList = [];
					this.getTableList('add', 1);
				} else if (index == 4) {
					this.t_page = 1;
					this.transferList = [];
					this.getTransferList('add');
				}
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
		width: 112px;
		height: 112px;
		padding: 8px;
		border-radius: 16px;
		background: rgba(49, 43, 79, 1);
	}

	.balance-btn-1 {
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
	.side-user{
		border-left: 1px solid #3E3664;
		min-height: calc(100vh - 60px);
	}
	
	.revokeBtn {
		color: var(--body-color);
		padding: 3px 20px;
	}
	
	.riqiClass {
		color: #204BBB;
		font-size: 0;
		margin: 0 5px;
	}
	
	.riqiClass image {
		width: 20px;
		height: 20px;
	}
	
	.pc-tabs{
		position: relative;
		line-height: 1;
		border-bottom: 1px solid #4c4882;
		height: 43px;
		::v-deep .u-tab-item{
			cursor: pointer;
		}
		.btn--submit{
			border-radius: 10px;
			padding: 0 16px;
			position: absolute;
			right: 0;
			top: 0;
			height: 36px;
		}
		::v-deep .item-active{
			background-image: url('/static/images/pc/tab_cur.png');
			background-position: center bottom;
			background-size: contain;
			background-repeat: no-repeat;
		}
	}
	
	.container {
		::v-deep .uni-navbar {
			background: var(--mar-bg);
		}
	}
	
	.tra-select ::v-deep .uni-select__selector-item {
		line-height: 20px;
		padding: 10px;
	}
	
	.bs-wrapper-bd {
		background: var(--mar-bg);
	}
	
	.bs-wrapper-two {
		padding: 15px 10px !important;
		border-radius: 12px 12px 0 0;
		background: var(--body-bg);
	}
	
	.m-c-review {
		color: #2B44B1;
	}
	
	.m-c-success {
		color: #50DA1B;
	}
	
	.m-c-error {
		color: #FF0000;
	}
	
	.tra-select ::v-deep .uni-select__selector {
		border-radius: 6px !important;
		padding: 7px !important;
	}
	
	.tra-select ::v-deep .uni-select {
		border: none !important;
	}
	
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
			font-size: 15px;
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
		padding: 14px 0 14px 14px;
		cursor: pointer;
		.col-status {
			display: flex;
			align-items: center;
	
			image {
				width: 24px;
				height: 24px;
			}
		}
	}
	
	.filter-cell {
		padding: 16px;
		border-bottom: 1px solid #4c4882;
	}
	
	.filter-cell:last-child {
		margin-bottom: 40px;
		border-bottom: 1px solid #4c4882;
	}
	.panel-record-list{
		padding: 8px;
	}
	
	
	
</style>
