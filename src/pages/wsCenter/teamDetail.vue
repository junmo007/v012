<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader isback :title="$t('agent37')" @clickLeft="menuClick"></uniNavHeader>
			<!-- sidebar -->
			<view class="sidebar" :class="sideshow?'is-show':''">
				<uniSideHeader @menuClick="menuClick" nIndex="7"></uniSideHeader>
			</view>
			<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
			<!-- main -->
			<view class="bs-container" v-if="false">
				<view class="bs-content">
					<template v-if="teamuserdetail.username">
						<view class=" panel team--preview">
							<view class="team-list-cell flex-center">
								<view class="t-circle">
									<view
										style="width: 45px; height: 45px; border-radius: 50%;background-color: var(--ui-color-normal);font-size: 22px;">
										{{teamuserdetail.username[0]}}
									</view>
								</view>
								<view class="flex_bd">
									<view class="t-id">{{teamuserdetail.username}}</view>
									<view class="t-time">{{teamuserdetail.add_time}}</view>
								</view>
							</view>
						</view>
					</template>
					<view class="panel">
						<view class="tm-detail-body">
							<view class="tm-detail-row u-flex u-row-between">
								<view class="tm-label u-e-7">{{$t('agent20')}}</view>
								<view class="">
									<view class="value text-green" v-if="teamuserdetail.status == 1">{{$t('agent21')}}
									</view>
									<view class="value text-red" v-if="teamuserdetail.status == 0">{{$t('agent22')}}
									</view>
								</view>
							</view>
							<view class="tm-detail-row u-flex u-row-between">
								<view class="tm-label u-e-7">{{$t('user4')}}</view>
								<view class="value">{{teamuserdetail.recharge.price}}</view>
							</view>
							<view class="tm-detail-row u-flex u-row-between">
								<view class="tm-label u-e-7">{{$t('agent19')}}</view>
								<view class="">
									<view class="value">{{teamuserdetail.recharge.number}}</view>
								</view>
							</view>
							<view class="tm-detail-row u-flex u-row-between">
								<view class="tm-label u-e-7">{{$t('user5')}}</view>
								<view class="">
									<view class="value">{{teamuserdetail.withdrawal.price}}</view>
								</view>
							</view>
							<view class="tm-detail-row u-flex u-row-between">
								<view class="tm-label u-e-7">{{$t('agent18')}}</view>
								<view class="">
									<view class="value">{{teamuserdetail.zhudan.price}}</view>
								</view>
							</view>
							<view class="tm-detail-row u-flex u-row-between">
								<view class="tm-label u-e-7">{{$t('agent17')}}</view>
								<view class="">
									<view class="value">{{teamuserdetail.zhudan.number}}</view>
								</view>
							</view>
							<view class="tm-detail-row u-flex u-row-between">
								<view class="tm-label u-e-7">{{$t('agent16')}}</view>
								<view class="">
									<view class="value">{{teamuserdetail.zhudan.win}}</view>
								</view>
							</view>
							<view class="tm-detail-row u-flex u-row-between">
								<view class="tm-label u-e-7">{{$t('agent15')}}</view>
								<view class="">
									<view class="value">{{teamuserdetail.zhudan.lose}}</view>
								</view>
							</view>
							<view class="tm-detail-row u-flex u-row-between">
								<view class="tm-label u-e-7">{{$t('user1')}}</view>
								<view class="">
									<view class="value">{{teamuserdetail.balance}}</view>
								</view>
							</view>
							<view class="tm-detail-row u-flex u-row-between">
								<view class="tm-label u-e-7">{{$t('agent14')}}</view>
								<view class="">
									<view class="value text-green">{{teamuserdetail.zhudan.loss}}</view>
								</view>
							</view>



						</view>

					</view>
					<view class="bs-foot-button flex-center justify-center">
						<button type="default" @click="$go('/pages/wsCenter/betDetails?id='+uid)"
							class="btn btn--default">{{$t('Betting details')}}</button>
					</view>
				</view>

				<!-- <uni-popup ref="bettingDetails" type="center">
				<view class="bs-popup bs-center-popup">
					<view class="bs-popup-hd">
					<view class="u-text-center" style="font-size: 18px;">{{$t('Betting details')}}</view>
						<view class="iconfont icon-close" @click="clonBettingDetails"></view>
					</view>
					<view class="bs-popup-body">
						<scroll-view :scroll-y="true" @scrolltolower="scroll_order"
							style="max-height: 400px;">
							<uni-table stripe width="100%" emptyText=''>
								<uni-tr>
									<uni-th align="center">{{$t('order time')}}</uni-th>
									<uni-th align="center">{{$t('Investment content')}}</uni-th>
									<uni-th align="center">{{$t('investment amount')}}</uni-th>
									<uni-th align="center">{{$t('user34')}}</uni-th>
								</uni-tr>
								<uni-tr v-for="(item,index) in dl_data" :key="index">
									<uni-td align="center">{{item.add_time}}</uni-td>
									<uni-td align="center"><text style="color: var(--ui-color-dark);">{{item.zd_fs}}:{{item.kd_fs}}</text>
									</uni-td>
									<uni-td align="center">{{item.tz_price}}</uni-td>
						
									<uni-td align="center">
										<view class="mini_btn" v-if="item.status==1"> {{$t('已下单')}}
										</view>
										<u-button type="error" size="mini" :disabled="true" v-if="item.status==2">
											{{$t('已撤单')}}
										</u-button>
										<u-button type="error" size="mini" v-if="item.status==3">
											{{$t('trade13')}}
										</u-button>
										<u-button type="success" size="mini" v-if="item.status==4">
											{{$t('trade12')}}
										</u-button>
									</uni-td>
								</uni-tr>
							</uni-table>
							<div class="loading-box">
								<uni-load-more :status="dl_status"></uni-load-more>
							</div>
						</scroll-view>
					</view>
				</view>
			</uni-popup> -->
			</view>
		</view>
		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			pcBg
		},
		data() {
			return {
				href: '',
				sideshow: false,
				uid: 0,
				teamuserdetail: {
					recharge: {
						price: 0,
						number: 0
					},
					withdrawal: {
						price: 0,
						number: 0
					},
					zhudan: {
						price: 0,
						number: 0,
						lose: 0,
						win: 0,
						loss: 0,
					}
				},
				dl_contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				dl_pagenow: 1,
				dl_status: 'more',
				dl_data: [],
			}
		},
		async onLoad(options) {
			if (options.id) {
				this.uid = options.id;
				this.getDetail();
			} else {
				this.$go('back');
			}
		},
		onReachBottom() {},
		methods: {
			scroll_order() {
				if (this.dl_status == 'noMore') {
					return;
				} else {
					this.getDlopen_order();
				}
			},
			showBettingDetails() {
				this.getDlopen_order();
				this.$refs.bettingDetails.open();
			},
			async getDlopen_order() {
				uni.showLoading({
					title: this.$t('loading')
				})
				let res = await this.$u.api.team_get_order_p({
					uid: this.uid,
					page: this.dl_pagenow,
					limit: 10
				});
				if (res) {
					uni.hideLoading();
					if (res.data.length > 0) {
						for (let i = 0; i < res.data.length; i++) {
							this.dl_data.push(res.data[i]);
						}
						// 加载状态结束
						if (res.data.length < 10) {
							this.dl_status = "noMore";
						} else {
							this.dl_status = "loading";
							this.dl_pagenow++;
						}
					} else {
						this.dl_status = "noMore";
					}
				}
			},
			clonBettingDetails() {
				this.$refs.bettingDetails.close();
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			// 规则
			async getDetail() {
				let ret = await this.$u.api.teamuserdetail_p({
					uid: this.uid
				});
				if (ret) {
					this.teamuserdetail = ret.data;
				}
			},
			// tab
			tabchange(i) {
				this.cur = i
			}
		}
	}
</script>

<style lang="scss">
	.team--preview {
		padding: 20px;
		margin-bottom: 20px;
	}

	.mini_btn {
		color: #fff;
		cursor: pointer;
		padding: 1px 4px;
		border-radius: 6px;
		background-color: var(--ui-color-dark);
	}

	.ws-profile-panel {
		background-image: var(--userInfo-card);
		background-size: cover;
		color: #FFFFFF;
		height: 288px;
	}


	.diy-progress ::v-deep .uni-progress-inner-bar::after {
		content: '';
		width: 27px;
		height: 27px;
		display: block;
		position: absolute;
		right: -1px;
		top: 50%;
		margin-top: -14px;

		background-size: contain;
	}


	// 手机微商
	.ws-center-card {
		background-image: var(--userInfo-card);
		background-size: cover;
		color: #FFFFFF;
		border-radius: 10px;
		padding: 0 18px;
	}

	.bs-foot-button .btn {
		width: 100%;
	}
</style>
