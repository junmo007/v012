<template>
	<view :class="isOpen?'pc-open':'pc-close'">
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main u-flex u-col-top pc-has-right" >
                <pcSideBar :pageIndex="9" @menu-event="parentMenu"></pcSideBar>
                <view class="pc-wrapper">
					<template v-if="showEmpty == 1">
						<u-row gutter="20">
							<u-col span="6" v-for="(item,index) in actionList" :key="item.index">
								<view class="activity-card" @click="hallChange(item.id)" >
									<view class="activity-photo">
										<u-image :src="item.c_img" width="100%" height="100%"></u-image>
									</view>
									<view class="flex_bd u-p-l-20 u-p-r-20">
										<view class="hall-title u-line-2 m-font-18 m-font-b">{{$t(item.c_title)}}</view>
										<view class="hall-intro u-line-2 u-m-b-40 u-m-t-40" v-html="item.c_intro">
										</view>
										<view class="pc-ac-item-btn m-line-1" @click="goShow(item)">{{$t('立即参与')}}</view>
									</view>
								</view>
							</u-col>
						</u-row>
						<view class="load-more-box">
							<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
						</view>
					</template>
					<template v-if="showEmpty == 0">
						<listEmpty :isDefault="true" :listHighly='450'></listEmpty>
					</template>
                </view>
                <view class="pc-right-bar">
                    <pcSideTrade></pcSideTrade>
                </view>
            </view>
		</template>
		<template v-if="mobile_common">
			<view class="content" :data-theme="themeMode">
				<view class="container">
					<uniNavHeader @clickLeft="menuClick" isback :title="$t('menu9')"></uniNavHeader>
					<view class="bs-wrapper">
						<view class="game-tabs" v-if="actionType.length > 0">
							<u-tabs height="64" bar-height="6" bar-width="80" bg-color="none" gutter="36"
								active-color="#FFFFFF" inactive-color="#9792B2" :list="actionType" :current="current"
								@change="change">
							</u-tabs>
						</view>
						<view class="hall-body">
							<template v-if="showEmpty == 1">
								<view v-for="(item,index) in actionList" :key="index">
									<u-image :src="item.c_img" mode="aspectFill" width="100%" height="184px" :class="index>0?'u-m-t-20':''"
										@click="hallChange(item.id)" loading-icon="@/static/images/dw/loading.png"
										error-icon="@/static/images/dw/loading.png" borderRadius="var(--card-radius)">
										<u-loading slot="loading"></u-loading>
										<u-image src="@/static/images/dw/loading.png" slot="error" mode="aspectFill"
											width="100%" height="340rpx" borderRadius="var(--card-radius)">
										</u-image>
									</u-image>
								</view>
								<view class="load-more-box">
									<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
								</view>
							</template>
							<template v-if="showEmpty == 0">
								<listEmpty :isDefault="true" :listHighly='450'></listEmpty>
							</template>
						</view>
					</view>
				</view>
			</view>
		</template>
		<u-popup v-model="hallL" :mode="mobile_common?'bottom':'center'" :mask-custom-style="uPopMaskCustomStyle" borderRadius="32">
			<view class="bs-popup pc_pop">
				<view class="bs-popup-hd">
					<view class="tt m-c-w">{{$t(hallData.c_title)}}</view>
					<view class="iconfont icon-close" @click="hallL = false"></view>
				</view>
				<scroll-view style="max-height: 70vh;" scroll-y="true">
					<view class="bs-popup-body">
						<!-- <u-image :src="hallData.c_img" mode="aspectFill" width="100%" height="184px"
							loading-icon="@/static/images/dw/loading.png" error-icon="@/static/images/dw/loading.png"
							borderRadius="var(--card-radius)">
							<u-loading slot="loading"></u-loading>
							<u-image src="@/static/images/dw/loading.png" slot="error" mode="aspectFill" width="100%"
								height="340rpx" borderRadius="var(--card-radius)">
							</u-image>
						</u-image> -->
						<view class="art-body u-m-t-20" v-html="hallData.c_detail"></view>
						<u-line-progress active-color="#E9AE3A" inactive-color="#5C46AD" height="48"
							:show-percent="false" :percent="hallData.plan">
							<view class="m-font-13" :class="hallData.plan <= 30 ? 'u-line-progress-no-data':''">
								{{(hallData.now?hallData.now:'0')+'/'+(hallData.goal?hallData.goal:'0')}}
							</view>
						</u-line-progress>
						
						<template v-if="hallData.handmx">
							<view class="u-flex w_100 u-row-between u-c-9 u-m-t-40">
								<view class="w_31">{{$t('彩金')}}</view>
								<view class="w_31 u-text-center">{{$t('日期')}}</view>
								<view class="w_31"></view>
							</view>
							<view class="u-flex u-row-between w_100 m-c-w u-m-t-20 hall-item-class"
								v-for="(item,index) in hallData.handmx" :key="index">
								<view class="w_31">{{item.handsel}}</view>
								<view class="w_31 u-text-center">{{item.effective_time}}</view>
								<view class="w_31 u-flex u-row-right">
									<view class="u-flex text-ygui" v-if="item.state == 1">
										<view class="iconfont icon-dui u-m-r-10"></view>
										<view>{{$t('已领取')}}</view>
									</view>
									<view class="btn btn--submit" v-if="item.play == 1" @click="handmxChange(item.id)">
										{{$t('领取')}}</view>
								</view>
							</view>
						</template>
						<view class="popup-btns flex-center" v-if="hallData.is_play == 1">
							<button type="default" @click="hallPlay" class="btn btn--submit">{{$t("public6")}}</button>
							</view>
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
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	import pcSideTrade from "@/components/pc-side-trade/trade.vue"
	export default {
		components: {
			uniNavHeader,
			listEmpty,
			pcNavHeader,
			pcSideBar,
			pcSideTrade
		},
		data() {
			return {
				sideshow: false,
				actionList: [],
				actionFirst: [],
				page: 1,
				status: 'more',
				showEmpty: null,
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				actionType: [],
				current: 0,
				hallL: false,
				hall_id: '',
				hallData: {}
			}
		},
		async onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('menu9')
			});
			this.getActionType();
			this.getactionList('add');
		},
		onReachBottom() {
			if (this.status == 'noMore') {
				return;
			}
			this.getactionList();
		},
		methods: {
			async handmxChange(id) {
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.my_handsel_play_p({
					id
				});
				uni.hideLoading();
				this.$refs.uTips.show({
					title: this.$t(res.msg)
				});
				if (res && res.code == 1) {
					this.hallL = false;
				}
			},
			async hallChange(action_id) {
				uni.showLoading({
					title: this.$t('loading')
				});
				this.hall_id = action_id;
				let ret = await this.$u.api.actiondetail_p({
					action_id
				});
				uni.hideLoading();
				if (ret && ret.code == 1) {
					this.hallL = true;
					this.hallData = ret.data;
				}
			},
			async hallPlay() {
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.actionapply_p({
					action_id: this.hall_id,
				});
				uni.hideLoading();
				this.$refs.uTips.show({
					title: this.$t(res.msg)
				});
			},
			async getActionType() {
				let res = await this.$u.api.action_type_p();
				if (res && res.code == 1) {
					let arr = [];
					arr = res.data;
					if (arr.length > 0) {
						arr.unshift({
							icon: '',
							id: 0,
							name: '全部'
						})
					};
					this.actionType = arr;
				}
			},
			change(index) {
				this.current = index;
				this.getactionList('add');
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async apply() {
				uni.showLoading({
					mask: true,
					title: this.$t('loading')
				});
				let ret = await this.$u.api.actionapply_p({
					action_id: this.actionFirst.id
				});
				if (ret) {
					this.$refs.uTips.show({
						title: this.$t(ret.msg)
					});
				}
			},
			async getactionList(add) {
				uni.showLoading({
					mask: true,
					title: this.$t("loading")
				});
				let ret = await this.$u.api.actionlist_p({
					page: this.page,
					limit: 10,
					t_id: this.current == 0 ? 0 : this.actionType[this.current].id
				});
				if (ret) {
					if (ret.data.length > 0) {
						this.showEmpty = 1;
						this.actionFirst = ret.data[0];
						if (add) {
							this.actionList = ret.data;
						} else {
							this.actionList = this.actionList.concat(ret.data);
						}
						if (ret.data.length == 10) {
							this.status = "loading";
							this.page++;
						} else {
							this.status = "noMore";
						}
					} else {
						this.showEmpty = 0;
						this.status = "noMore";
					}
				} else {
					this.showEmpty = 0;
					this.status = "noMore";
				}
			},
			goShow(index) {
				uni.navigateTo({
					url: '/pages/activityHall/activityDetail?id=' + index.id
				});
			}
		}
	}
</script>

<style lang="scss">
	.activity-card{
		display: flex;
		align-items: center;
		border-radius: 16px;
		background-color: #3E3664;
		overflow: hidden;
		margin-bottom: 8px;
		cursor: pointer;
		.activity-photo{
			width: 320px;
			height: 184px;
			font-size: 0;
			border-radius: 16px;
			display: block;
		}
	}

	@media(min-width: 700px){
		.pc_pop{
			width: 740px;
		}
	}



.u-line-progress-no-data {
		width: 135px;
		min-width: 130px;
		padding-left: 15px;
	}


</style>
