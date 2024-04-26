<template>
	<view class="content" :data-theme="themeMode">
		<view class="container">
			<uniNavHeader isback :title="$t('agent59')" @clickLeft="menuClick"></uniNavHeader>
			<view class="bs-wrapper">
				<!-- main -->
				<view class="inv-body">
					<view class="w_100 record-item-1 u-text-center">
						<view class="m-font-b m-font-18">{{dataCount.sum?formatCurrency(dataCount.sum)+' ₽':'0 ₽'}}</view>
						<view class="u-m-t-16">{{$t('返佣总金额')}}</view>
					</view>
					<view class="u-flex u-row-between w_100 u-m-t-24">
						<view class="w_50 record-item-2 u-text-center u-m-r-24" @click="dataCount.no_settled?settledChange():''">
							<view class="m-font-b m-font-18">
								{{dataCount.no_settled?formatCurrency(dataCount.no_settled)+' ₽':'0 ₽'}}
							</view>
							<view class="u-m-t-16">{{$t('user3')}}</view>
							<view class="text-yellow u-m-t-14">{{$t('领取')}}</view>
						</view>
						<view class="w_50 record-item-2 u-text-center">
							<view class="m-font-b m-font-18">{{dataCount.settled?formatCurrency(dataCount.settled)+' ₽':'0 ₽'}}
							</view>
							<view class="u-m-t-16">{{$t('已结算')}}</view>
						</view>
					</view>
					<view class="u-flex u-row-center u-m-t-40 u-m-b-40" @click="dataShow = true">
						<view>{{$t(sreachData)}}</view>
						<text class="iconfont icon-calendar u-m-l-20"></text>
					</view>
				</view>


				<template v-if="showEmpty == 1">
					<view class="teamrecord-item" v-for="(item,index) in teamrecord" :key="`teamrecord-item${index}`"
						:class="index > 0 ?'u-m-t-20':''">
						<view class="top u-flex u-row-between">
							<view>{{$t('agent9')}}</view>
							<view>{{item.money?formatCurrency(item.money)+' ₽':'0.00 ₽'}}</view>
						</view>
						<view class="center u-flex u-row-between">
							<view>{{$t('user34')}}</view>
							<view>
								{{item.status == 1 ? $t('agent56') : item.status == 2 ? $t('agent57') : item.status == 3 || item.status == 4 ? $t('agent58') : ''}}
							</view>
						</view>
						<view class="bottom u-flex u-row-between">
							<view>{{$t('时间')}}</view>
							<view>{{item.create_time}}</view>
						</view>
					</view>
					<view class="load-more-box">
						<uni-load-more :status="status"></uni-load-more>
					</view>
				</template>
				<template v-if="showEmpty == 0">
					<listEmpty :isDefault="true" :listHighly='270' class="u-bd-8"></listEmpty>
				</template>
			</view>
			<u-picker v-model="dataShow" mode="time" :safe-area-inset-bottom="true" :title="$t('选择日期')"
				cancel-color="#fff" confirm-color="#fff" @confirm="dataConfirm">
			</u-picker>
			<!-- 备注详情 -->
			<uni-popup ref="remark" type="center">
				<view class="bs-popup pc_pop m-c-w" style="min-height: 100px;">
					<view class="bs-popup-hd">
						<view>{{$t('备注详情')}}</view>
						<view class="iconfont icon-close u-p-t-10 m-c-w" @click="closeRemark()"></view>
					</view>
					<scroll-view scroll-y="true" style="max-height: 300px;">
						<view>{{$t(remark)}}</view>
					</scroll-view>
				</view>
			</uni-popup>
		</view>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
		</u-top-tips>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	export default {
		components: {
			uniNavHeader,
			listEmpty
		},
		data() {
			return {
				sideshow: false,
				teamrecord: [],
				page: 1,
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				showEmpty: null,
				remark: '',
				sreachData: this.$t('选择日期'),
				dataShow: false,
				dataCount: {}
			}
		},
		onLoad() {
			this.getTeamrecord('', 'add');
		},
		onReachBottom() {
			if (this.status == 'nomore') {
				return;
			}
			this.getTeamrecord(this.sreachData_get);
		},
		methods: {
			async settledChange(){
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.team_profit_sell_p();
				uni.hideLoading();
				this.$refs.uTips.show({
					title: this.$t(res.msg)
				});
				if(res && res.code == 1){
					this.page = 1;
					this.matchList = [];
					this.getTeamrecord('','add');
				}
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			dataConfirm(e) {
				this.sreachData_get = '';
				this.sreachData = e.day + '-' + e.month + '-' + e.year;
				let date = e.year + '-' + e.month + '-' + e.day + '|' + e.year + '-' + e.month + '-' + e.day;
				this.sreachData_get = date;
				this.page = 1;
				this.matchList = [];
				this.getTeamrecord(date, 'add');
			},
			showRemark(e) {
				this.remark = e;
				this.$refs.remark.open();
			},
			closeRemark() {
				this.$refs.remark.close();
			},
			async getTeamrecord(date, add) {
				uni.showLoading({
					title: this.$t('loading')
				});
				let ret = await this.$u.api.teamrecord_p({
					page: this.page,
					limit: 10,
					date: date ? date : '',
					is_stat: 1
				});
				if (ret) {
					uni.hideLoading();
					this.dataCount = ret.data;
					if (ret.data.data.length > 0) {
						this.showEmpty = 1;
						if (add) {
							this.teamrecord = ret.data.data;
						} else {
							this.teamrecord = this.teamrecord.concat(ret.data.data);
						}
						// 加载状态结束
						if (ret.data.data.length == 10) {
							this.status = "loading";
							this.page++;
						} else {
							this.status = "nomore";
						}
					} else {
						this.showEmpty = 0;
						this.status = "nomore";
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	.record-item-1 {
		padding: 12px;
		border-radius: 16px;
		background: rgba(233, 174, 58, 1);

	}

	.record-item-2 {
		min-height: 100px;
		padding: 12px;
		border-radius: 16px;
		background: rgba(65, 61, 113, 1);
	}

	.teamrecord-item .top {
		background: rgba(62, 54, 100, 1);
		padding: 12px;
		border-radius: 16px 16px 0 0;
	}


	.teamrecord-item .center {
		background: #312B4F;
		padding: 12px;
		border-bottom: 1px solid #231C3F;
	}

	.teamrecord-item .bottom {
		background: #312B4F;
		padding: 12px;
		border-radius: 0 0 16px 16px;
	}
</style>
