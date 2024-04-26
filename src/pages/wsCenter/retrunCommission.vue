<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader isback :title="this.$t('agent37')" @clickLeft="menuClick"></uniNavHeader>
			<view class="bs-wrapper">
				<view class="site-head u-flex">
					<view class="site-tit">
						<text>{{$t('agent37')}}</text>
						<view class="line"></view>
					</view>
					<view class="site-back" @click="common_back">
						<text class="iconfont icon-close"></text>
					</view>
				</view>
				<view class="gooLight-two">
					<view class="gooLight">
						<view class="fan-card u-p-30 u-m-b-20">
							<view class="ret-select u-m-b-20">
								<uni-data-select v-model="cateValue" :localdata="caterange" @change="catechange"
									:clear="false">
								</uni-data-select>
							</view>
							<template v-if="cateValue == 0">
								<view class="ret-val u-font-32 u-m-b-20">
									{{userTeamStatreg.reg_count?userTeamStatreg.reg_count:0}}
								</view>
								<uni-row :gutter="12">
									<uni-col :span="8">
										<view class="light_blue">
											<view class="mun">
												{{userTeamStatreg.reg_count1?userTeamStatreg.reg_count1:0}}
											</view>
											<view class="nam">{{$t("一级会员")}}</view>
											<!-- <view class="rightimg"></view> -->
										</view>
									</uni-col>
									<uni-col :span="8">
										<view class="light_blue">
											<view class="mun">
												{{userTeamStatreg.reg_count2?userTeamStatreg.reg_count2:0}}
											</view>
											<view class="nam">{{$t("二级会员")}}</view>
										</view>
									</uni-col>
									<uni-col :span="8">
										<view class="light_blue">
											<view class="mun">
												{{userTeamStatreg.reg_count3?userTeamStatreg.reg_count3:0}}
											</view>
											<view class="nam">{{$t("三级会员")}}</view>
										</view>
									</uni-col>
								</uni-row>
							</template>
							<template v-if="cateValue == 1">
								<view class="ret-val u-font-32 u-m-b-20">
									{{userTeamStatreCharge.recharge_count?userTeamStatreCharge.recharge_count:0}}
								</view>
								<uni-row :gutter="12">
									<uni-col :span="8">
										<view class="light_blue">
											<view class="mun">
												{{userTeamStatreCharge.recharge_count1?userTeamStatreCharge.recharge_count1:0}}
											</view>
											<view class="nam">{{$t("一级会员")}}</view>
										</view>
									</uni-col>
									<uni-col :span="8">
										<view class="light_blue">
											<view class="mun">
												{{userTeamStatreCharge.recharge_count2?userTeamStatreCharge.recharge_count2:0}}
											</view>
											<view class="nam">{{$t("二级会员")}}</view>
										</view>
									</uni-col>
									<uni-col :span="8">
										<view class="light_blue">
											<view class="mun">
												{{userTeamStatreCharge.recharge_count3?userTeamStatreCharge.recharge_count3:0}}
											</view>
											<view class="nam">{{$t("三级会员")}}</view>
										</view>
									</uni-col>
								</uni-row>
							</template>
							<template v-if="cateValue == 2">
								<view class="ret-val u-font-32 u-m-b-20">
									{{userTeamStatcash.withdraw_count?userTeamStatcash.withdraw_count:0}}
								</view>
								<uni-row :gutter="12">
									<uni-col :span="8">
										<view class="light_blue">
											<view class="mun">
												{{userTeamStatcash.withdraw_count1?userTeamStatcash.withdraw_count1:0}}
											</view>
											<view class="nam">{{$t("一级会员")}}</view>
										</view>
									</uni-col>
									<uni-col :span="8">
										<view class="light_blue">
											<view class="mun">
												{{userTeamStatcash.withdraw_count2?userTeamStatcash.withdraw_count2:0}}
											</view>
											<view class="nam">{{$t("二级会员")}}</view>
										</view>
									</uni-col>
									<uni-col :span="8">
										<view class="light_blue">
											<view class="mun">
												{{userTeamStatcash.withdraw_count3?userTeamStatcash.withdraw_count3:0}}
											</view>
											<view class="nam">{{$t("三级会员")}}</view>
										</view>
									</uni-col>
								</uni-row>
							</template>
							<template v-if="cateValue == 3">
								<view class="ret-val u-font-32 u-m-b-20">
									{{userTeamStatOrder.order_count?userTeamStatOrder.order_count:'0.00'}}
								</view>
								<uni-row :gutter="12">
									<uni-col :span="8">
										<view class="light_blue">
											<view class="mun">
												{{userTeamStatOrder.order_count1?userTeamStatOrder.order_count1:0}}
											</view>
											<view class="nam">{{$t("一级会员")}}</view>
										</view>
									</uni-col>
									<uni-col :span="8">
										<view class="light_blue">
											<view class="mun">
												{{userTeamStatOrder.order_count2?userTeamStatOrder.order_count2:0}}
											</view>
											<view class="nam">{{$t("二级会员")}}</view>
										</view>
									</uni-col>
									<uni-col :span="8">
										<view class="light_blue">
											<view class="mun">
												{{userTeamStatOrder.order_count3?userTeamStatOrder.order_count3:0}}
											</view>
											<view class="nam">{{$t("三级会员")}}</view>
										</view>
									</uni-col>
								</uni-row>
							</template>
							<template v-if="cateValue == 4">
								<view class="ret-val u-font-32 u-m-b-20">
									{{userTeamStatProfit.profit_count?userTeamStatProfit.profit_count:0}}
								</view>
								<uni-row :gutter="12">
									<uni-col :span="8">
										<view class="light_blue">
											<view class="mun">
												{{userTeamStatProfit.profit_count1?userTeamStatProfit.profit_count1:0}}
											</view>
											<view class="nam">{{$t("一级会员")}}</view>
										</view>
									</uni-col>
									<uni-col :span="8">
										<view class="light_blue">
											<view class="mun">
												{{userTeamStatProfit.profit_count2?userTeamStatProfit.profit_count2:0}}
											</view>
											<view class="nam">{{$t("二级会员")}}</view>
										</view>
									</uni-col>
									<uni-col :span="8">
										<view class="light_blue">
											<view class="mun">
												{{userTeamStatProfit.profit_count3?userTeamStatProfit.profit_count3:0}}
											</view>
											<view class="nam">{{$t("三级会员")}}</view>
										</view>
									</uni-col>
								</uni-row>
							</template>
							<template v-if="cateValue == 5">
								<view class="ret-val u-font-32 u-m-b-20">
									{{teamOrder.order_count?teamOrder.order_count:0}}
								</view>
								<uni-row :gutter="12">
									<uni-col :span="8">
										<view class="light_blue">
											<view class="mun">
												{{teamOrder.order_count1?teamOrder.order_count1:0}}
											</view>
											<view class="nam">{{$t("一级会员")}}</view>
										</view>
									</uni-col>
									<uni-col :span="8">
										<view class="light_blue">
											<view class="mun">
												{{teamOrder.order_count2?teamOrder.order_count2:0}}
											</view>
											<view class="nam">{{$t("二级会员")}}</view>
										</view>
									</uni-col>
									<uni-col :span="8">
										<view class="light_blue">
											<view class="mun">
												{{teamOrder.order_count3?teamOrder.order_count3:0}}
											</view>
											<view class="nam">{{$t("三级会员")}}</view>
										</view>
									</uni-col>
								</uni-row>
							</template>
						</view>
						<!-- 列表 -->
						<template v-if="cateValue != 5">
							<view class="form-row u-m-b-20">
								<view class="game-tabs ">
									<u-tabs height="64" bar-height="0" bg-color="none" gutter="36"
										active-color="#ffffff" inactive-color="#ffffff" :list="tabs" :current="current"
										@change="changeTab">
									</u-tabs>
								</view>
							</view>
						</template>
						<template v-if="cateValue == 0">
							<view class="tm-table">
								<template v-if="showEmpty == 1">
									<view class="tm-table-thead">
										<view class="tm-row u-flex">
											<view class="td td-1">{{$t("agent62")}}</view>
											<view class="td td-2">{{$t("等级")}}</view>
											<view class="td text-right td-3">{{$t("注册日期")}}</view>
										</view>
									</view>
									<view class="tm-table-tbody">
										<view @click="goShow_id(res)" class="tm-row fan-card u-flex u-m-t-20"
											v-for="(res, index) in teamuserList" :key="`list${index}`">
											<view class="td td-1">
												<view class="t-circle u-flex">
													<view class="circle">
														{{res.username[0]}}
													</view>
													<view class="text">{{res.username}}</view>
												</view>
											</view>
											<view class="td td-2">
												Level{{res.level}}
											</view>
											<view class="td text-right td-3">
												{{res.add_time}}
											</view>
										</view>
										<view class="load-more-box">
											<uni-load-more :status="status1" :contentText="contentText1">
											</uni-load-more>
										</view>
									</view>
								</template>
								<template v-if="showEmpty == 2">
									<listEmpty :isDefault="true" class="u-m-30" :listHighly='300'>
									</listEmpty>
								</template>
							</view>
						</template>
						<template v-if="cateValue == 1">
							<view class="tm-table">
								<template v-if="showEmpty1 == 1">
									<view class="tm-table-thead">
										<view class="tm-row u-flex">
											<view class="td td-1">{{$t("agent62")}}</view>
											<view class="td td-2">{{$t("user33")}}</view>
											<view class="td text-right td-3">{{$t("trade7")}}</view>
										</view>
									</view>
									<view class="tm-table-tbody">
										<view @click="goShow(res)" class="tm-row fan-card u-flex u-m-t-20"
											v-for="(res, index) in userTeamRechargeList" :key="`list${index}`">
											<view class="td td-1">
												<view class="t-circle u-flex">
													<view class="circle">
														{{res.username[0]}}
													</view>
													<view class="text">{{res.username}}</view>
												</view>
											</view>
											<view class="td td-2">
												{{res.apply_price}}
											</view>
											<view class="td text-right td-3">
												{{res.add_time}}
											</view>
										</view>
										<view class="load-more-box">
											<uni-load-more :status="status2" :contentText="contentText2">
											</uni-load-more>
										</view>
									</view>
								</template>
								<template v-if="showEmpty1 == 2">
									<listEmpty :isDefault="true" class="u-m-30" :listHighly='300'>
									</listEmpty>
								</template>
							</view>
						</template>
						<template v-if="cateValue == 2">
							<view class="tm-table">
								<template v-if="showEmpty2 == 1">
									<view class="tm-table-thead">
										<view class="tm-row u-flex">
											<view class="td td-1">{{$t("agent62")}}</view>
											<view class="td td-2">{{$t("user33")}}</view>
											<view class="td text-right td-3">{{$t("trade7")}}</view>
										</view>
									</view>
									<view class="tm-table-tbody">
										<view @click="goShow(res)" class="tm-row fan-card u-flex u-m-t-20"
											v-for="(res, index) in userTeamCashList" :key="`list${index}`">
											<view class="td td-1">
												<view class="t-circle u-flex">
													<view class="circle">
														{{res.username[0]}}
													</view>
													<view class="text">{{res.username}}</view>
												</view>
											</view>
											<view class="td td-2">
												{{res.w_price}}
											</view>
											<view class="td text-right td-3">
												{{res.add_time}}
											</view>
										</view>
										<view class="load-more-box">
											<uni-load-more :status="status3" :contentText="contentText3">
											</uni-load-more>
										</view>
									</view>
								</template>
								<template v-if="showEmpty2 == 2">
									<listEmpty :isDefault="true" class="u-m-30" :listHighly='300'>
									</listEmpty>
								</template>
							</view>
						</template>
						<template v-if="cateValue == 3 || cateValue == 4">
							<view class="tm-table">
								<template v-if="showEmpty3 == 1">
									<view class="tm-table-thead">
										<view class="tm-row u-flex">
											<view class="td td-1">{{$t("agent62")}}</view>
											<view class="td td-2">{{$t("user33")}}</view>
											<view class="td text-right td-3">{{$t("trade7")}}</view>
										</view>
									</view>
									<view class="tm-table-tbody">
										<view @click="goShow(res)" class="tm-row fan-card u-flex u-m-t-20"
											v-for="(res, index) in userTeamOrderList" :key="`list${index}`">
											<view class="td td-1">
												<view class="t-circle u-flex">
													<view class="circle">
														{{res.username[0]}}
													</view>
													<view class="text">{{res.username}}</view>
												</view>
											</view>
											<view class="td td-2">
												{{res.tz_price}}
											</view>
											<view class="td text-right td-3">
												{{res.add_time}}
											</view>
										</view>
										<view class="load-more-box">
											<uni-load-more :status="status4" :contentText="contentText4">
											</uni-load-more>
										</view>
									</view>
								</template>
								<template v-if="showEmpty3 == 2">
									<listEmpty :isDefault="true" class="u-m-30" :listHighly='300'>
									</listEmpty>
								</template>
							</view>
						</template>
						<template v-if="cateValue == 5">
							<view style="height: 150px;">
							</view>
						</template>
					</view>
				</view>

			</view>
			<!-- 团队成员 弹窗 -->
			<u-popup v-model="APopup" mode="bottom" border-radius="30" :mask-custom-style="uPopMaskCustomStyle">
				<view class="bs-popup w_100">
					<view class="bs-popup-hd">
						<view class="tt">{{username}}</view>
						<view class="iconfont icon-close m-c-w" @click="closeA()"></view>
					</view>
					<scroll-view scroll-y="true" style="height: 60vh;">
						<view class="bs-popup-body ">
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
													<view>{{$t('user32')}}: {{item.zd_number}}</view>
													<view class="text-gray">{{item.add_time}}</view>
												</uni-td>
												<uni-td align="center" width="20">
													<view>{{item.zd_fs}}:{{item.kd_fs}}</view>
												</uni-td>
												<uni-td align="center" width="25">
													<view>{{item.tz_price}}</view>
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
										<uni-load-more :status="nextStatus" :contentText="contentTextDetails">
										</uni-load-more>
									</view>
								</scroll-view>
							</view>
						</view>
					</scroll-view>
				</view>
			</u-popup>
		</view>
		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			listEmpty,
			pcBg
		},
		data() {
			return {
				href: '',
				sideshow: false,
				// tab
				teamuser: {},
				keyword: "",
				Dpagenow: 1,
				pagin: 0,
				showEmpty: null,
				searchLevel: 4,
				// v2.0
				current: 0,
				username: '',
				teamuserdetail: {
					"status": 1,
					"balance": "", // 账户余额
					"add_time": "", // 注册时间
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
				cateValue: 0,
				teamuserList: [],
				userTeamStatreg: {},
				status1: 'more',
				contentText1: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				// 新充值
				userTeamStatreCharge: {},
				userTeamRechargeList: [],
				status2: 'more',
				contentText2: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				showEmpty1: null,
				// 总提现
				userTeamStatcash: {},
				userTeamCashList: [],
				status3: 'more',
				contentText3: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				showEmpty2: null,
				// 总注单
				userTeamStatOrder: {},
				userTeamOrderList: [],
				status4: 'more',
				contentText4: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				showEmpty3: null,
				// 总盈利
				userTeamStatProfit: {},
				// 下级用户投注详情
				pages: 1,
				nextStatus: 'more',
				contentTextDetails: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				showNextEmpty: null,
				// 投注人数统计
				teamOrder: {},
				teamUserOrderDetail: [],
				APopup: false,
			}
		},
		computed: {
			caterange() {
				return [{
						value: 0,
						text: this.$t('新注册')
					},
					{
						value: 1,
						text: this.$t('新充值')
					},
					{
						value: 2,
						text: this.$t('总提现')
					},
					{
						value: 3,
						text: this.$t('总投注')
					},
					{
						value: 4,
						text: this.$t('总盈利')
					},
					{
						value: 5,
						text: this.$t('投注人数')
					}
				]
			},
			tabs() {
				return [{
						name: this.$t("全部")
					},
					{
						name: this.$t("level_1")
					},
					{
						name: this.$t("level_2")
					},
					{
						name: this.$t("level_3")
					},
				]
			},
		},
		onLoad() {
			this.getTeamuser('add');
			this.getTeamStatreg();
		},
		onReachBottom() {
			switch (this.cateValue) {
				case 0:
					if (this.status1 == 'noMore') {
						return;
					}
					this.getTeamuser();
					break;
				case 1:
					if (this.status2 == 'noMore') {
						return;
					}
					this.getTeamRechargeList();
					break;
				case 2:
					if (this.status3 == 'noMore') {
						return;
					}
					this.getTeamCashList();
					break;
				case 3:
					if (this.status4 == 'noMore') {
						return;
					}
					this.getTeamOrderList();
					break;
				case 4:
					if (this.status4 == 'noMore') {
						return;
					}
					this.getTeamOrderList();
					break;
				default:
					if (this.status1 == 'noMore') {
						return;
					}
					this.getTeamuser();
					break;
			}
		},
		methods: {
			menuClick() {
				this.sideshow = !this.sideshow
			},
			openA() {
				this.APopup = true;
			},
			closeA() {
				this.APopup = false;
			},
			// 获取新注册数据
			async getTeamStatreg() {
				let res = await this.$u.api.teamstatreg_p({
					isday: 1,
				});
				if (res && res.code == 1) {
					this.userTeamStatreg = res.data;
				}
			},
			async getTeamuser(add) {
				let ret = await this.$u.api.teamuser_p({
					username: this.keyword,
					page: this.Dpagenow,
					limit: 10,
					level: this.searchLevel == 0 ? 4 : this.searchLevel,
					isday: 1
				});
				if (ret && ret.code == 1) {
					this.teamuser = ret.data;
					if (add) {
						this.teamuserList = ret.data.list;
					} else {
						this.teamuserList = this.teamuserList.concat(ret.data.list);
					}
					if (ret.data.list.length == 10) {
						this.status1 = "loading";
						this.Dpagenow++;
					} else {
						this.status1 = "noMore";
					}
					if (this.teamuserList.length > 0) {
						this.showEmpty = 1;
					} else {
						this.showEmpty = 2;
					}
				}
			},
			// 获取新充值
			async getTeamStatreCharge() {
				let res = await this.$u.api.teamstatrecharge_p({
					isday: 1
				});
				if (res && res.code == 1) {
					this.userTeamStatreCharge = res.data;
				}
			},
			// 充值列表
			async getTeamRechargeList(add) {
				let ret = await this.$u.api.teamrechargelist_p({
					page: this.Dpagenow,
					limit: 10,
					level: this.searchLevel == 0 ? 4 : this.searchLevel,
					isday: 1
				});
				if (ret && ret.code == 1) {
					if (add) {
						this.userTeamRechargeList = ret.data;
					} else {
						this.userTeamRechargeList = this.userTeamRechargeList.concat(ret.data);
					}
					if (ret.data.length == 10) {
						this.status2 = "loading";
						this.Dpagenow++;
					} else {
						this.status2 = "noMore";
					}
					if (this.userTeamRechargeList.length > 0) {
						this.showEmpty1 = 1;
					} else {
						this.showEmpty1 = 2;
					}
				}
			},
			// 总提现
			async getTeamStatcash() {
				let res = await this.$u.api.teamstatcash_p({
					isday: 0
				});
				if (res && res.code == 1) {
					this.userTeamStatcash = res.data;
				}
			},
			async getTeamCashList(add) {
				let ret = await this.$u.api.teamcashlist_p({
					page: this.Dpagenow,
					limit: 10,
					level: this.searchLevel == 0 ? 4 : this.searchLevel,
					isday: 0
				});
				if (ret && ret.code == 1) {
					if (add) {
						this.userTeamCashList = ret.data;
					} else {
						this.userTeamCashList = this.userTeamCashList.concat(ret.data);
					}
					if (ret.data.length == 10) {
						this.status3 = "loading";
						this.Dpagenow++;
					} else {
						this.status3 = "noMore";
					}
					if (this.userTeamCashList.length > 0) {
						this.showEmpty2 = 1;
					} else {
						this.showEmpty2 = 2;
					}
				}
			},
			// 总注单
			async getTeamStatorder() {
				let res = await this.$u.api.teamstatorder_p({
					isday: 0
				});
				if (res && res.code == 1) {
					this.userTeamStatOrder = res.data;
				}
			},
			async getTeamOrderList(add) {
				let ret = await this.$u.api.teamorderlist_p({
					page: this.Dpagenow,
					limit: 10,
					level: this.searchLevel == 0 ? 4 : this.searchLevel,
					isday: 0
				});
				if (ret && ret.code == 1) {
					if (add) {
						this.userTeamOrderList = ret.data;
					} else {
						this.userTeamOrderList = this.userTeamOrderList.concat(ret.data);
					}
					if (ret.data.length == 10) {
						this.status4 = "loading";
						this.Dpagenow++;
					} else {
						this.status4 = "noMore";
					}
					if (this.userTeamOrderList.length > 0) {
						this.showEmpty3 = 1;
					} else {
						this.showEmpty3 = 2;
					}
				}
			},
			// 总盈利
			async getTeamStatProfit() {
				let res = await this.$u.api.teamstatprofit_p({
					isday: 0
				});
				if (res && res.code == 1) {
					this.userTeamStatProfit = res.data;
				}
			},
			async getTeamOrder() {
				let res = await this.$u.api.team_ordernum_p({
					isday: 0
				});
				if (res && res.code == 1) {
					this.teamOrder = res.data;
				}
			},
			async goShow_id(index) {
				this.uid = index.id;
				this.username = index.username
				await this.getDetail(index.id);
				this.getTeamUserDetails('add');
				this.openA();
			},
			async goShow(index) {
				this.uid = index.uid;
				this.username = index.username
				await this.getDetail(index.uid);
				this.getTeamUserDetails('add');
				this.openA();
			},
			scrolltolower() {
				if (this.nextStatus == 'noMore') {
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
					this.nextStatus = "loading";
					this.pages++;
				} else {
					this.nextStatus = "noMore";
				}
				if (this.teamUserOrderDetail.length > 0) {
					this.showNextEmpty = 1;
				} else {
					this.showNextEmpty = 0;
				}
			},
			async getDetail(uid) {
				let ret = await this.$u.api.teamuserdetail_p({
					uid
				});
				if (ret && ret.code == 1) {
					this.teamuserdetail = ret.data;
				}
			},
			changeTab(index) {
				this.current = index;
				this.searchLevel = index;
				this.Dpagenow = 1;

				switch (this.cateValue) {
					case 0:
						this.showEmpty = null;
						this.status1 = 'loading';
						this.teamuserList = [];
						this.teamuser = {};
						this.getTeamuser('add');
						break;
					case 1:
						this.showEmpty1 = null;
						this.status2 = 'loading';
						this.userTeamRechargeList = [];
						this.getTeamRechargeList('add');
						break;
					case 2:
						this.showEmpty2 = null;
						this.status3 = 'loading';
						this.userTeamCashList = [];
						this.getTeamCashList('add');
						break;
					case 3:
						this.showEmpty3 = null;
						this.status4 = 'loading';
						this.userTeamOrderList = [];
						this.getTeamOrderList('add');
						break;
					case 4:
						this.showEmpty3 = null;
						this.status4 = 'loading';
						this.userTeamOrderList = [];
						this.getTeamOrderList('add');
						break;
					default:
						this.Dpagenow = 1;
						this.teamuserList = [];
						this.teamuser = {};
						this.getTeamuser('add');
						this.getTeamStatreg();
						break;
				}

			},
			catechange(e) {
				this.current = 0;
				this.cateValue = e;
				this.Dpagenow = 1;
				this.searchLevel = 4;
				switch (e) {
					case 0:
						this.Dpagenow = 1;
						this.teamuserList = [];
						this.teamuser = {};
						this.getTeamuser('add');
						this.getTeamStatreg();
						break;
					case 1:
						this.userTeamStatreCharge = {};
						this.userTeamRechargeList = [];
						this.getTeamRechargeList('add');
						this.getTeamStatreCharge();
						break;
					case 2:
						this.userTeamStatcash = {};
						this.userTeamCashList = [];
						this.getTeamStatcash();
						this.getTeamCashList('add');
						break;
					case 3:
						this.userTeamStatOrder = {};
						this.userTeamOrderList = [];
						this.getTeamStatorder();
						this.getTeamOrderList('add');
						break;
					case 4:
						this.userTeamOrderList = [];
						this.userTeamStatProfit = {};
						this.getTeamOrderList('add');
						this.getTeamStatProfit();
						break;
					case 5:
						this.teamOrder = {};
						this.getTeamOrder();
						break;
					default:
						this.Dpagenow = 1;
						this.teamuserList = [];
						this.teamuser = {};
						this.getTeamuser('add');
						this.getTeamStatreg();
						break;
				}
			},
		}
	}
</script>

<style lang="scss">
	.tm-panel_hd {
		background: #F6F7F8;
		border-radius: var(--card-radius) var(--card-radius) 0 0;
	}

	.mar-panel {
		background: var(--form-main-uni-easyinput__content);
		padding: 70px 15px 15px 15px;
		position: relative;
	}

	.game-tabs {
		::v-deep .u-tab-item {
			border-radius: var(--tab-radius);
			background: #F7F7F7;
			margin-right: 10px;
			color: var(--tab-item-color) !important;
			border: 1px solid #ccc;
		}

		::v-deep .item-active {
			background: #2F2BB1;
			color: #ffffff !important;
			border: none;
		}
	}

	.tm-table-thead {
		.tm-row {
			background: var(--table-top-color);
			border-radius: var(--card-radius);
			height: 50px;
		}
	}

	/* #ifdef MY-SKIN-GREEN */
	[data-theme="light"] .tm-table-thead .tm-row {
		background: #616b89;
		color: #ffffff;
	}

	/* #endif */
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

	.t-circle .circle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: var(--circle-bg);
		min-width: 25px;
		height: 25px;
		border-radius: 25px;
		margin-right: 5px;
	}

	.t-circle .text {
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
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
		::v-deep .uni-table {
			background-color: transparent;
			font-size: 12px
		}

		::v-deep .uni-table-td {
			font-size: 12px;
			color: var(--body-color);
			border-bottom: 0;
		}

		::v-deep .uni-table-th {
			font-size: 14px;
			font-weight: bold;
			color: var(--body-color);
			border-bottom: 1px dotted var(--dotted-bg-1);
		}
	}

	.ret-card {
		background: var(--ret-card-bg);
		color: #fff;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		text-align: center;
		border-radius: var(--card-radius);
		line-height: 1;
		padding: 8px 0;
		font-size: 12px;

		.u-strong {
			padding: 5px 0;
		}
	}

	.fan-card {
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

	.ret-select {
		position: relative;
		z-index: 5;
		min-width: 40%;
		max-width: 60%;

		::v-deep .uni-select {
			height: 40px;
		}
	}

	.ret-select ::v-deep .uni-select__selector-item {
		line-height: 20px;
		padding: 10px;
	}

	.bs-wrapper {
		// background: var(--mar-bg);
		padding: 60px 0 0 0 !important;
	}

	.gooLight-two {
		background: var(--mar-bg);
	}

	.gooLight {
		background-color: #ebeff6;
		border-radius: 15px 15px 0 0;
		padding: 15px;
		border-top: 1px solid #e9e6e5;
	}

	.site-head {
		background: var(--mar-bg);
		// margin: -10px -16px 0 !important;
		padding: 0 15px 15px;
	}

	// .ret-select ::v-deep .uni-select__selector-item.active {
	// 	color: #fff;
	// }

	.bs-popup-body {
		background: #ebeff6;
	}

	.tm-table .tm-table-thead .tm-row {
		// color: #fff;
		color: #000;
	}

	.tm-panel .highlight {
		color: #4063C2 !important;
	}

	.container ::v-deep .uni-navbar {
		background: var(--mar-bg);
	}
</style>
