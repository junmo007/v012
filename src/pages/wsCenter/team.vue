<template>
	<view>
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main">
				<view class="u-flex u-row-between u-m-b-30">
					<view class="m-font-b u-m-b-30 main-skin-color">{{$t('agent37')}}</view>
					<view class="pc-game-tabs">
						<u-tabs height="64" bar-height="0" bg-color="none" gutter="36" active-color="#ffffff"
							inactive-color="#ffffff" :list="tabs" :current="current" @change="changeTab">
						</u-tabs>
					</view>
				</view>
				<view class="pc-main-cell">
					<template v-if="showEmpty == 1">
						<scroll-view style="height: calc(100vh - 230px);" scroll-y="true"
							@scrolltolower="scrolltolowerChnage">
							<view class="tm-table">
								<view class="pc-tm-table-thead">
									<view class="tm-row u-flex">
										<view class="td td-1">{{$t("用户名")}}</view>
										<view class="td td-2">{{$t("等级")}}</view>
										<view class="td td-3">{{$t("注册日期")}}</view>
									</view>
								</view>
								<view class="tm-table-tbody main-skin-color">
									<view @click="goShow(res)" class="tm-row u-flex u-m-t-20 cur_pointer"
										style="border-bottom: 1px solid #282E46;" v-for="(res, index) in teamuser"
										:key="`list${index}`">
										<view class="td td-1">
											<view class="pc-t-circle u-flex">
												<view class="circle">
													{{res.username[0]}}
												</view>
												<view class="text">{{res.username}}</view>
											</view>
										</view>
										<view class="td td-2">
											{{$t('Level')}}{{res.level}}
										</view>
										<view class="td td-3">
											{{res.add_time}}
										</view>
									</view>
									<view class="load-more-box">
										<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
									</view>
								</view>
							</view>
						</scroll-view>
					</template>
					<template v-if="showEmpty == 0">
						<view class="bs-wrapper-two">
							<listEmpty :isDefault="true" :listHighly='500'>
							</listEmpty>
						</view>
					</template>
				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content" :data-theme="themeMode">
				<view class="container" :class="sideshow?'is-mask':''">
					<uniNavHeader isback :title="this.$t('agent37')" @clickLeft="menuClick"></uniNavHeader>
					<view class="team-main">
						<view class="game-tabs">
							<u-tabs height="68" bar-height="6" bar-width="80" bg-color="none" gutter="36"
								active-color="#FFFFFF" inactive-color="#9792B2" :list="tabs" :current="current"
								:bar-style="barStyle" @change="changeTab">
							</u-tabs>
						</view>
						<view class="gooLight">
							<template v-if="showEmpty == 1">
								<view class="tm-table">
									<view class="tm-table-thead">
										<view class="tm-row u-flex u-c-g">
											<view class="td td-1 m-font-12">{{$t("用户名")}}</view>
											<view class="td td-2 m-font-12">{{$t("等级")}}</view>
											<view class="td text-right td-3 m-font-12">{{$t("注册日期")}}</view>
										</view>
									</view>
									<view class="tm-table-tbody">
										<view class="tm-row fan-card u-flex u-m-t-20" v-for="(res, index) in teamuser"
											:key="`teamuser${index}`" @click="goShow(res)">
											<view class="td td-1">
												<view class="t-circle u-flex">
													<template v-if="res.head_img">
														<image :src="res.head_img"
															style="width: 36px;height: 36px;border-radius: 36px;">
														</image>
													</template>
													<template v-if="!res.head_img">
														<image src="@/static/images/vip/avatar.png"
															style="width: 36px;height: 36px;border-radius: 50%;">
														</image>
													</template>
													<view class="text u-m-l-10 m-font-16">{{res.username}}</view>
												</view>
											</view>
											<view class="td td-2 team-Level level-class-1 u-text-center" style="padding: 5px 3px;"
												:class="res.level == 1 ? 'level-class-1' : res.level == 2 ? 'level-class-2' : 'level-class-3'">
												<text class="iconfont icon-shoucang4 u-m-r-4 m-font-12"></text>
												<text class="m-font-12 m-font-b">{{$t('Level')}}{{res.level}}</text>
											</view>
											<view class="td text-right td-3 m-font-14">
												{{res.add_time}}
											</view>
										</view>
										<view class="load-more-box">
											<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
										</view>
									</view>
								</view>
							</template>
							<template v-if="showEmpty == 0">
								<view class="bs-wrapper-two">
									<listEmpty :isDefault="true" :listHighly='500'>
									</listEmpty>
								</view>
							</template>
						</view>
					</view>
				</view>
			</view>
		</template>
		<!-- 团队成员 弹窗 -->
		<!-- <u-popup v-model="APopup" :mode="mobile_common?'bottom':'center'" border-radius="32"
			:mask-custom-style="uPopMaskCustomStyle" width="460px">
			<view class="bs-popup w_100">
				<view class="bs-popup-hd">
					<view class="tt">{{username}}</view>
					<view class="iconfont icon-close" @click="closeA()"></view>
				</view>
				<scroll-view scroll-y="true" style="height: 60vh;">
					<view class="bs-popup-body">
						<view class="tm-panel fan-card u-m-b-20">
							<view class="tm-panel_hd highlight u-p-30">{{$t("基础信息")}}</view>
							<view class="tm-panel_bd u-p-30">
								<view class="tm-items u-m-b-26">
									<view class="tm-item">
										<text class="text-gray">{{$t('agent20')}}: </text>
										<text>{{ teamuserdetail.status == 1 ? $t('agent21') : $t('agent22') }}</text>
									</view>
									<view class="tm-item">
										<text class="text-gray">{{$t('提现次数')}}: </text>
										<text>{{ teamuserdetail.withdrawal.number }}</text>
									</view>
								</view>
								<uni-row class="uni-data-row">
									<uni-col :span="12">
										<view class="tm-data-col data-bg-a">
											<view class="u-m-b-10">{{$t("user4")}}</view>
											<view class="val u-strong">{{teamuserdetail.recharge.price}}</view>
										</view>
									</uni-col>
									<uni-col :span="12">
										<view class="tm-data-col data-bg-b">
											<view class="u-m-b-10">{{$t("user5")}}</view>
											<view class="val u-strong">{{teamuserdetail.withdrawal.price}}</view>
										</view>
									</uni-col>
								</uni-row>
							</view>
						</view>
						<view class="tm-panel fan-card u-m-b-20">
							<view class="tm-panel_hd highlight u-p-30">{{$t("投注信息")}}</view>
							<view class="tm-panel_bd u-p-30">
								<uni-row class="uni-data-row">
									<uni-col :span="12">
										<view class="tm-data-col data-bg-c">
											<view class="u-m-b-10">{{$t("总亏损")}}</view>
											<view class="val u-strong">{{teamuserdetail.zhudan.lose}}</view>
										</view>
									</uni-col>
									<uni-col :span="12">
										<view class="tm-data-col data-bg-d">
											<view class="u-m-b-10">{{$t("总获利")}}</view>
											<view class="val u-strong">{{teamuserdetail.zhudan.win}}</view>
										</view>
									</uni-col>
								</uni-row>
								<view class="tm-items u-m-t-26">
									<view class="tm-item">
										<text class="text-gray">{{$t('user1')}}:</text>
										<text>{{teamuserdetail.balance}}</text>
									</view>
									<view class="tm-item">
										<text class="text-gray">{{$t('agent18')}}:</text>
										<text>{{teamuserdetail.zhudan.price}}</text>
									</view>
									<view class="tm-item">
										<text class="text-gray">{{$t('agent17')}}:</text>
										<text>{{teamuserdetail.zhudan.number}}</text>
									</view>
								</view>
							</view>
						</view>
						<view class="tm-panel fan-card">
							<view class="tm-panel_hd highlight u-p-30">{{$t("Betting details")}}</view>
							<scroll-view scroll-y="true" style="max-height: 40vh;" @scrolltolower="scrolltolower">
								<view class="tm-panel_bd ">
									<uni-table emptyText="">
										<uni-tr>
											<uni-th align="left" width="30">{{$t('user32')}}</uni-th>
											<uni-th align="center" width="20">{{$t('Investment content')}}</uni-th>
											<uni-th align="center" width="25">{{$t('investment amount')}}</uni-th>
											<uni-th align="right" width="25">{{$t('user34')}}</uni-th>
										</uni-tr>
										<uni-tr v-for="(item,index) in teamUserOrderDetail" :key="index">
											<uni-td align="left" width="30">
												<view>{{$t('user32')}}: {{item.zd_number}}22</view>
												<view class="text-gray">{{item.add_time}}22</view>
											</uni-td>
											<uni-td align="center" width="20">
												<view>{{item.zd_fs}}:{{item.kd_fs}}22</view>
											</uni-td>
											<uni-td align="center" width="25">
												<view>{{item.tz_price}}22</view>
											</uni-td>
											<uni-td align="right" width="25">
												<view class="blue-color" v-if="item.status==1">{{$t('已下单')}}</view>
												<view class="blue-color" v-if="item.status==2">{{$t('已撤单')}}</view>
												<view class="blue-color" v-if="item.status==3">{{$t('trade13')}}
												</view>
												<view class="blue-color" v-if="item.status==4">{{$t('trade12')}}
												</view>
											</uni-td>
										</uni-tr>
									</uni-table>
								</view>
								<view class="load-more-box u-flex u-row-center">
									<uni-load-more :status="status2" :contentText="contentText2"></uni-load-more>
								</view>
							</scroll-view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup> -->


		<u-popup v-model="APopup" mode="bottom" :mask-custom-style="uPopMaskCustomStyle" borderRadius="32"
			z-index="10001">
			<view class="bs-popup pc_pop">
				<view class="bs-popup-hd">
					<view class="tt m-c-w">{{$t('基础信息')}}</view>
					<image src="@/static/images/index/close.png"
						style="width: 32px;height: 32px;position: absolute;right: 15px;" mode=""
						@click="APopup = false">
					</image>
				</view>
				<view class="bs-popup-body">
					<view class="u-flex u-row-center flex--direction">
						<template v-if="teamuserdetail.head_img">
							<image :src="teamuserdetail.head_img" style="width: 85px;height: 85px;border-radius: 36px;">
							</image>
						</template>
						<template v-if="!teamuserdetail.head_img">
							<image src="@/static/images/vip/avatar.png"
								style="width: 85px;height: 85px;border-radius: 50%;">
							</image>
						</template>
						<view class="m-font-20 m-font-b u-m-t-20">{{username}}</view>
						<view class="u-flex u-row-between w_100 u-m-t-30" v-if="teamuserdetail && teamuserdetail.rebate">
							<view class="w_50 team-btn">
								<view class="m-font-22 m-font-b">
									{{teamuserdetail.rebate.rake?formatCurrency(teamuserdetail.rebate.rake)+' ₽':'0 ₽'}}
								</view>
								<view class="u-m-t-10 u-c-g m-font-13">{{$t('返佣总额')}}</view>
							</view>
							<view class="w_50 team-btn u-m-l-20">
								<view class="m-font-22 m-font-b">
									{{teamuserdetail.rebate.off_rake?formatCurrency(teamuserdetail.rebate.off_rake)+' ₽':'0 ₽'}}
								</view>
								<view class="u-m-t-10 u-c-g m-font-13">{{$t('充值返利')}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>


		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			listEmpty,
			pcNavHeader,
			pcBg
		},
		data() {
			return {
				sideshow: false,
				teamuser: [],
				keyword: "",
				Dpagenow: 1,
				pagin: 0,
				showEmpty: null,
				searchLevel: 4,
				// v2.0
				current: 0,
				username: '',
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				teamuserdetail: {
					status: 1,
					balance: "", // 账户余额
					add_time: "", // 注册时间
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
				uid: 0,
				pages: 1,
				status2: 'more',
				contentText2: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				showEmpty2: null,
				teamUserOrderDetail: [],
				APopup: false,
				barStyle: {
					backgroundColor: '#FFB80080',
				}
			}
		},
		computed: {
			tabs() {
				return [{
						name: this.$t("全部")
					},
					{
						name: this.$t("一级会员")
					},
					{
						name: this.$t("二级会员")
					},
					{
						name: this.$t("三级会员")
					},
				]
			},
		},
		onReachBottom() {
			if (this.status == 'noMore') {
				return;
			}
			this.getTeamuser();
		},
		onLoad() {
			this.getTeamuser('add');
		},
		methods: {
			scrolltolowerChnage() {
				if (this.status == 'noMore') {
					return;
				}
				this.getTeamuser();
			},
			scrolltolower() {
				if (this.status2 == 'noMore') {
					return;
				}
				this.getTeamUserDetails();
			},
			async getTeamUserDetails(add) {
				let ret = await this.$u.api.team_get_order_p({
					uid: this.uid,
					page: this.pages,
					limit: 10
				});
				if (add) {
					this.teamUserOrderDetail = ret.data;
				} else {
					this.teamUserOrderDetail = this.teamUserOrderDetail.concat(ret.data);
				}
				if (ret.data.length == 10) {
					this.status2 = "loading";
					this.pages++;
				} else {
					this.status2 = "noMore";
				}
				if (this.teamUserOrderDetail.length > 0) {
					this.showEmpty2 = 1;
				} else {
					this.showEmpty2 = 0;
				}
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			openA() {
				this.APopup = true;
			},
			closeA() {
				this.APopup = false;
			},
			async getTeamuser(add) {
				let ret = await this.$u.api.teamuser_p({
					username: this.keyword,
					page: this.Dpagenow,
					limit: 10,
					level: this.searchLevel == 0 ? 4 : this.searchLevel,
					isday: 0
				});
				if (ret && ret.code == 1) {
					if (add) {
						this.teamuser = ret.data.list;
					} else {
						this.teamuser = this.teamuser.concat(ret.data.list);
					}
					if (ret.data.list.length == 10) {
						this.status = "loading";
						this.Dpagenow++;
					} else {
						this.status = "noMore";
					}
					if (this.teamuser.length > 0) {
						this.showEmpty = 1;
					} else {
						this.showEmpty = 0;
					}
				}
			},
			async goShow(index) {
				this.uid = index.id;
				this.username = index.username
				await this.getDetail(index.id);
				this.getTeamUserDetails('add');
				this.openA();
			},
			async getDetail(uid) {
				uni.showLoading({
					title: this.$t('loading')
				});
				let ret = await this.$u.api.teamuserdetail_p({
					uid
				});
				if (ret && ret.code == 1) {
					uni.hideLoading();
					this.teamuserdetail = ret.data;
				}
			},
			changeTab(index) {
				this.current = index;
				this.searchLevel = index;
				this.status = 'loading';
				this.Dpagenow = 1;
				this.teamuser = [];
				this.getTeamuser('add');
			},
		}
	}
</script>

<style lang="scss">
	.tm-panel_hd {
		background: #F6F7F8;
		border-radius: var(--card-radius) var(--card-radius) 0 0;
	}

	.game-tabs {
		margin-bottom: 15px;
		height: 68rpx;
		box-sizing: content-box;
		border-bottom: 2px solid #4D4886;

		::v-deep .u-tab-bar {
			background-color: #E9AE3A !important;
			border-radius: 6px 6px 0 0 !important;
			box-shadow: 1px -3px 6px #FFB80080;
			margin-bottom: -1px;
		}
	}

	.pc-game-tabs {
		::v-deep .u-tab-item {
			border-radius: 5px;
			margin-right: 10px;
			border: 1px solid var(--pc-game-tabs-border);
			color: var(--main-skin-color) !important;
			cursor: pointer;
		}

		::v-deep .item-active {
			background: var(--pc-game-tabs-active);
			color: #ffffff !important;
			border: none;
		}
	}

	.pc-tm-table-thead {
		.tm-row {
			background: var(--pc-tm-table-thead-bg);
			color: #fff;
			border-radius: 8px;
			padding: 5px 0;
		}
	}

	.tm-table-thead {
		.tm-row {
			background: transparent;
		}
	}



	.tm-row {
		.td {
			padding: 5px 15px;
		}
	}

	.tm-table-tbody {
		.tm-row {
			height: 60px;
		}
	}

	.td-1 {
		width: 40%;
	}

	.td-2 {
		width: 25%;
	}

	.td-3 {
		width: 35%;
	}

	.pc-t-circle .circle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: #282E46;
		color: #fff;
		width: 25px;
		height: 25px;
		line-height: 25px;
		border-radius: 25px;
		margin-right: 5px;
	}

	.t-circle .circle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: var(--circle-bg);
		width: 25px;
		height: 25px;
		border-radius: 25px;
		margin-right: 5px;
	}

	.tm-items {
		.tm-item {
			padding: 3px 0;

			.text-gray {
				padding-right: 4px;
			}
		}
	}

	.tm-data-col {
		padding: 10px;
		color: #ffffff;
		text-align: center;
	}

	.uni-data-row {
		.uni-col:first-child .tm-data-col {
			border-radius: var(--card-radius) 0 0 var(--card-radius);
		}

		.uni-col:last-child .tm-data-col {
			border-radius: 0 var(--card-radius) var(--card-radius) 0;
		}
	}

	.data-bg-a {
		background: var(--data-bg-a);
	}

	.data-bg-b {
		background: var(--data-bg-b);
	}

	.data-bg-c {
		background: var(--data-bg-c);
	}

	.data-bg-d {
		background: var(--data-bg-d);
	}

	.fan-card {
		background: var(--card-style2);

		::v-deep .uni-table {
			background-color: transparent;
			font-size: 12px
		}

		::v-deep .uni-table-td {
			font-size: 12px;
			color: #000;
			border-bottom: 0;
		}

		::v-deep .uni-table-th {
			font-size: 14px;
			font-weight: bold;
			color: var(--body-color);
			border-bottom: 1px dotted var(--dotted-bg-1);
		}
	}

	.container {
		::v-deep .uni-navbar {
			background: var(--mar-bg);
		}
	}

	.bs-popup .tm-panel {
		background: var(--popup-tm-panel-bg);
	}

	.bs-popup .icon-close {
		background: #C4C4C4;
		color: var(--mar-bg);
		;
	}

	.container {
		background: var(--mar-bg);
	}

	.team-main {
		padding-top: 70px;
	}

	.gooLight {
		background-color: #322b50;
		min-height: calc(100vh - 70px);
		padding: 15px;
		border-radius: 16px 16px 0 0;
	}

	.tm-panel .highlight {
		color: #4063C2 !important;
	}

	.team-btn {
		text-align: center;
		border-radius: 16px;
		padding: 8px 12px;
		background: rgba(65, 61, 113, 1);
	}

	.team-Level {
		border-radius: 6px;
	}

	.level-class-1 {
		color: rgba(89, 97, 99, 1);
		background: linear-gradient(180deg, #D7E2E7 0%, #C3D7DB 100%);

	}

	.level-class-2 {
		color: #fff;
		background: linear-gradient(180deg, #F0B000 0%, #EC8D00 100%);
	}

	.level-class-3 {
		color: #fff;
		background: linear-gradient(180deg, #C26216 0%, #B64E14 100%);

	}
	
	.bs-popup-body {
		padding: 15px 15px 35px 15px;
	}
</style>
