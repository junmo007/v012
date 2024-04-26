<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader :title="$t('agent30')"></uniNavHeader>
			<!-- sidebar -->
			<view class="site-head u-flex u-m-b-30">
				<view class="site-tit">
					<text>{{$t('详情列表')}}</text>
					<view class="line"></view>
				</view>
				<view class="site-back" @click="common_back">
					<text class="iconfont icon-close"></text>
				</view>
			</view>
			<!-- main -->
			<view class="bs-panel">
				<view class="ws-panel">
					<view class="u-m-l-8">
						<view>{{$t('agent30')}}</view>
						<view class="u-m-t-10 m-font-b m-font-16">{{teamstatreg.reg_count}}</view>
					</view>
					<view class="u-m-t-10">
						<u-row gutter="16">
							<u-col span="4">
								<view class="team-user-car-level">
									<view class="lv-txt">{{$t('level_1')}}</view>
									<view class="m-font-16">{{teamstatreg.reg_count1}}</view>
								</view>
							</u-col>
							<u-col span="4">
								<view class="team-user-car-level">
									<view class="lv-txt">{{$t('level_2')}}</view>
									<view class="m-font-16">{{teamstatreg.reg_count2}}</view>
								</view>
							</u-col>
							<u-col span="4">
								<view class="team-user-car-level">
									<view class="lv-txt">{{$t('level_3')}}</view>
									<view class="m-font-16">{{teamstatreg.reg_count3}}</view>
								</view>
							</u-col>
						</u-row>
					</view>
				</view>
				<!-- 等级选择 -->
				<scroll-view scroll-x="true" style="min-height: 60px;">
					<view class="u-flex u-m-t-30">
						<view class="team-user-tabs-level"
							:class="teamTabsCurrent == 4 ? 'team-user-tabs-level-active' : ''"
							@click="teamTabsChange(4)">
							{{$t('全部')}}
						</view>
						<view class="team-user-tabs-level"
							:class="teamTabsCurrent == 1 ? 'team-user-tabs-level-active' : ''"
							@click="teamTabsChange(1)">
							{{$t('level_1')}}
						</view>
						<view class="team-user-tabs-level"
							:class="teamTabsCurrent == 2 ? 'team-user-tabs-level-active' : ''"
							@click="teamTabsChange(2)">
							{{$t('level_2')}}
						</view>
						<view class="team-user-tabs-level"
							:class="teamTabsCurrent == 3 ? 'team-user-tabs-level-active' : ''"
							@click="teamTabsChange(3)">
							{{$t('level_3')}}
						</view>
					</view>
				</scroll-view>
				<template v-if="showEmpty == 1">
					<u-row gutter="16" class="u-m-t-30 team-tabel-header">
						<u-col span="5">
							<view class="">
								{{$t('用户名')}}
							</view>
						</u-col>
						<u-col span="2">
							<view class="">
								{{$t('等级')}}
							</view>
						</u-col>
						<u-col span="5">
							<view class="">
								{{$t('user1')}}
							</view>
						</u-col>
					</u-row>
					<u-row gutter="16" class="u-m-t-30 team-tabel-list" v-for="(item,index) in teamUserList"
						:key="index" @click="showUserDetails(item.id)">
						<!-- <u-row gutter="16" class="u-m-t-30 team-tabel-list" v-for="(item,index) in teamUserList" :key="index"
					@click="$go('/pages/wsCenter/teamDetail?id='+item.id)"> -->
						<u-col span="5">
							<view class="team-tabel-item">
								{{$t(item.username)}}
							</view>
						</u-col>
						<u-col span="2">
							<view class="team-tabel-item">
								{{`Lv.${item.level}`}}
							</view>
						</u-col>
						<u-col span="5">
							<view class="team-tabel-item">
								{{$t(item.balance)}}
							</view>
						</u-col>
					</u-row>
					<view class="load-more-box">
						<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
					</view>
				</template>
				<template v-if="showEmpty == 2">
					<listEmpty :isDefault="true" :listHighly='320'></listEmpty>
				</template>
			</view>
			<!-- levelUser -->
			<u-popup v-model="levelUserPop" mode="bottom" borderRadius="30" :mask-custom-style="uPopMaskCustomStyle">
				<view class="u-flex u-row-between u-p-30">
					<view class="skin-text">{{levelUser.username}}</view>
					<view class="site-back" @click="levelUserPop = false">
						<text class="iconfont icon-close"></text>
					</view>
				</view>
				<scroll-view scroll-y="true" style="max-height: 400px;" @scrolltolower="levelLower">
					<view class="u-p-30">
						<view class="text-green m-font-16">{{$t('基础信息')}}</view>
						<view class="u-flex u-m-t-30">
							<view class="u-c-8">{{$t('agent20')}}:</view>
							<view class="skin-text u-m-l-8">{{levelUser.status == 1 ? $t('agent21') : $t('agent22')}}
							</view>
						</view>
						<view class="u-flex u-m-t-16">
							<view class="u-c-8">{{$t('提现次数')}}:</view>
							<view class="skin-text u-m-l-8">{{levelUser.withdrawal.number}}</view>
						</view>
						<view class="u-flex u-m-t-36">
							<view class="regCar bg_1">
								<view>{{$t('user4')}}</view>
								<view>{{levelUser.recharge.price}}</view>
							</view>
							<view class="regCar bg_2 u-m-l-30">
								<view>{{$t('user5')}}</view>
								<view>{{levelUser.withdrawal.price}}</view>
							</view>
						</view>
						<view class="u-m-t-50 text-green m-font-16">{{$t('投注信息')}}</view>
						<view class="u-flex u-m-t-36">
							<view class="regCar bg_1">
								<view>{{$t('agent16')}}</view>
								<view>{{levelUser.zhudan.win}}</view>
							</view>
							<view class="regCar bg_2 u-m-l-30">
								<view>{{$t('agent15')}}</view>
								<view>{{levelUser.zhudan.lose}}</view>
							</view>
						</view>
						<view class="u-m-t-20 u-flex">
							<view class="u-c-8">{{$t('user1')}}:</view>
							<view class="skin-text u-m-l-8">{{levelUser.balance}}</view>
						</view>
						<view class="u-m-t-20 u-flex">
							<view class="u-c-8">{{$t('agent18')}}:</view>
							<view class="skin-text u-m-l-8">{{levelUser.zhudan.price}}</view>
						</view>
						<view class="u-m-t-20 u-flex">
							<view class="u-c-8">{{$t('agent17')}}:</view>
							<view class="skin-text u-m-l-8">{{levelUser.zhudan.number}}</view>
						</view>
						<template v-if="orderDataList.length > 0">
							<view class="u-m-t-50 text-green m-font-16">{{$t('投注详情')}}</view>
							<view class="u-m-t-30">
								<u-row gutter="16" class="u-m-t-30 team-tabel-header">
									<u-col span="5">
										<view class="team-tabel-item">
											{{$t('订单')}}
										</view>
									</u-col>
									<u-col span="2">
										<view class="team-tabel-item">
											{{$t('比分')}}
										</view>
									</u-col>
									<u-col span="2">
										<view class="team-tabel-item">
											{{$t('investment amount')}}
										</view>
									</u-col>
									<u-col span="3" text-align="right">
										<view class="team-tabel-item">
											{{$t('状态')}}
										</view>
									</u-col>
								</u-row>
								<u-row gutter="16" class="u-m-t-30 team-tabel-bottom-header"
									v-for="(item,index) in orderDataList" :key="index">
									<u-col span="5">
										<view class="team-tabel-item">
											<view>{{item.zd_number}}</view>
											<view class="u-c-8">{{item.add_time}}</view>
										</view>
									</u-col>
									<u-col span="2">
										<view class="team-tabel-item">
											{{item.zd_fs}} : {{item.kd_fs}}
										</view>
									</u-col>
									<u-col span="2">
										<view class="team-tabel-item">
											{{item.tz_price}}
										</view>
									</u-col>
									<u-col span="3" text-align="right">
										<view class="team-tabel-item">
											<view class="text-orange" v-if="item.status == 1">{{$t('已下单')}}</view>
											<view class="text-red" v-if="item.status == 2">{{$t('已撤单')}}</view>
											<view class="text-green" v-if="item.status == 3">{{$t('trade13')}}</view>
											<view class="text-green" v-if="item.status == 4">{{$t('trade12')}}</view>
										</view>
									</u-col>
								</u-row>
								<view class="load-more-box">
									<uni-load-more :status="orderStatus" :contentText="orderContentText">
									</uni-load-more>
								</view>
							</view>
						</template>
					</view>
				</scroll-view>
			</u-popup>
		</view>
		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	export default {
		components: {
			uniNavHeader,
			listEmpty,
			pcBg
		},
		data() {
			return {
				href: '',
				sideshow: false,
				teamstatreg: {},
				teamTabsCurrent: 4,
				teamUserList: [],
				page: 1,
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				teamuser: {},
				showEmpty: null,
				userId: '',
				levelUser: {
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
				levelUserPop: false,
				orderPage: 1,
				orderStatus: 'more',
				orderDataList: [],
				orderContentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
			}
		},
		async onLoad() {
			this.getteamstatreg();
			await this.getTeamuser('add');
		},
		onReachBottom() {
			if (this.status == 'noMore') {
				return;
			}
			this.getTeamuser();
		},
		methods: {
			levelLower() {
				if (this.orderStatus == 'noMore') {
					return;
				}
				this.getDataList();
			},
			async getDataList(add) {
				let ret = await this.$u.api.team_get_order_p({
					uid: this.userUid,
					page: this.orderPage,
					limit: 10,
				});
				if (ret) {
					if (ret.data.length > 0) {
						if (add) {
							this.orderDataList = ret.data;
						} else {
							this.orderDataList = this.orderDataList.concat(ret.data);
						}
						if (ret.data.length == 10) {
							this.orderStatus = "loading";
							this.orderPage++;
						} else {
							this.orderStatus = "noMore";
						}
					} else {
						this.orderStatus = "noMore";
					}
				}
			},
			async showUserDetails(uid) {
				this.orderPage = 1;
				this.orderDataList = [];
				uni.showLoading({
					title: this.$t('loading')
				});
				this.userUid = uid;
				await this.getChuInfo();
				await this.getDataList('add');
				uni.hideLoading();
			},
			async getChuInfo() {
				let ret = await this.$u.api.teamuserdetail_p({
					uid: this.userUid
				});
				if (ret) {
					this.levelUser = ret.data;
					if (this.levelUser.id) {
						this.levelUserPop = true;
					}
				}
			},
			async getTeamuser(add) {
				uni.showLoading({
					title: this.$t('loading')
				});
				let ret = await this.$u.api.teamuser_p({
					level: this.teamTabsCurrent,
					isday: 0,
					page: this.page,
					limit: 10,
				});
				if (ret) {
					uni.hideLoading();
					this.teamuser = ret.data;
					if (ret.data.list.length > 0) {
						this.showEmpty = 1;
						if (add) {
							this.teamUserList = ret.data.list;
						} else {
							this.teamUserList = this.teamUserList.concat(ret.data.list);
						}
						// 加载状态结束
						if (ret.data.list.length == 10) {
							this.status = "loading";
							this.page++;
						} else {
							this.status = "noMore";
						}
					} else {
						this.showEmpty = 2;
						this.status = "noMore";
					}
				}
			},
			async teamTabsChange(i) {
				this.teamTabsCurrent = i;
				this.showEmpty = null;
				this.p = 1;
				this.teamUserList = [];
				await this.getTeamuser('add');
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async getteamstatreg() {
				let ret = await this.$u.api.teamstatreg_p({
					isday: 1
				});
				if (ret) {
					this.teamstatreg = ret.data;
				}
			},
			goShow(index) {
				uni.navigateTo({
					url: '/pages/wsCenter/thirdPage?level=' + index
				});
			}
		}
	}
</script>

<style lang="scss">
	.bs-panel {
		height: calc(100vh - 95px);
	}

	.ws-profile-panel {
		background-image: var(--userInfo-card);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		color: #FFFFFF;
		height: 158px;
		overflow: hidden;
	}

	.j-number {
		width: 38px;
		height: 37px;
		line-height: 36px;
		text-align: center;
		margin-right: 12px;
		color: #FFFFFF;
	}

	.j-cell {
		background: none;
	}

	.regCar {
		min-width: 120px;
		text-align: center;
		border-radius: 8px;
		padding: 5px;
	}

	.bg_1 {
		background-color: #14CA8F;
	}

	.bg_2 {
		background-color: #F19578;
	}

	.bg_3 {
		background-color: #545D66;
	}

	.bg_4 {
		background-color: #5558FF;
	}
</style>
