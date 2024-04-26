<template>
	<view>
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view style="background: var(--pc-main);">
				<image :src="$t('vipTopImgPC')" mode="" style="height: 230px;width: 100%;"></image>
			</view>
			<view class="pc-main">
				<view class="inv-cells">
					<!-- <view class="inv-banner u-skeleton-fillet">
						<u-image :src="$t('vipTopImg')" class="invImg" borderRadius="8px" height="300px"
							mode="aspectFill">
							<u-loading slot="loading"></u-loading>
						</u-image>
					</view> -->
					<view class="fan-inv-pc-card">
						<view class="inv-numbsers u-flex u-p-40 u-skeleton-fillet">
							<view class="flex_bd">
								<scroll-view scroll-x="true" scroll-with-animation="true" :scroll-into-view="toView">
									<view class="num-box u-p-t-16" :id="item.level_name"
										:class="activeLevel == item.level_name.substring(3,item.level_name.length) ? 'active' : ''"
										v-for="(item,index) in userVip" :key="`vip${index}`" @click="changeVip(item)">
										<view class="gift-ico u-flex u-row-center">
											<u-image src="@/static/images/skin/bluelight/gift2.png" width="28px"
												height="18px"></u-image>
										</view>
										<view class="num-label u-m-t-10 u-m-b-10">
											<text class="text-1">LV.</text>
											<text
												class="text-2">{{item.level_name.substring(3,item.level_name.length)}}</text>
										</view>
									</view>
								</scroll-view>
							</view>
						</view>
						<view class="u-p-40 u-skeleton-fillet">
							<view class="g-label m-font-18 u-m-b-16 m-font-b u-c-f">
								<text class="u-m-r-10">{{$t('晋升')}}</text>
								<text>{{currVip.level_name}}</text>
							</view>
							<view v-for="(itm,int) in currVip.vip_condition" :key="int" class="u-flex u-m-b-10 u-c-9">
								<view class="m-c-w">{{int + 1}}.</view>
								<view class="m-c-w">{{$t(itm.key)}}:</view>
								<view>{{itm.value}}</view>
								<template v-if="itm.is_finish">
									<u-icon name="checkmark" color="#1b669c" class="Satisfy" size="20">
									</u-icon>
								</template>
							</view>
							<view class="get-row u-flex u-row-center u-m-t-30" v-if="currVip.level_gold > 0">
								<view class="get-col"
									v-if="currVip.buy_amount > 0 && userInfo_common.level_id < currVip.id">
									<view class="u-flex">
										<view class="g-circle">
											<text>{{currVip.buy_amount}}</text>
										</view>
										<view class="text">{{$t('购买价格')}}</view>
									</view>
								</view>
								<view class="get-col">
									<view class="u-flex ">
										<view class="g-circle">
											<text>{{currVip.level_gold}}</text>
										</view>
										<view class="text">{{$t('CurUnit')}}</view>
									</view>
								</view>
							</view>
							<view class="wt-foot u-m-t-50" v-if="vipApply == 1">
								<template v-if="currVip.status == 0">
									<view class="btn btn--other m-font-b">
										<text>{{$t('未达标')}}</text>
									</view>
								</template>
								<template v-if="currVip.status == 1">
									<view class="btn btn--default m-font-b" @click="getVipApply">
										<text>{{$t('领取')}}</text>
									</view>
								</template>
								<template v-if="currVip.status == 2">
									<view class="btn btn--other m-font-b">
										<text>{{$t('已领取')}}</text>
									</view>
								</template>
							</view>
							<view class="wt-foot u-m-t-50"
								v-if="currVip.buy_amount > 0 && userInfo_common.level_id < currVip.id">
								<view class="btn btn--submit m-font-b w_50" @click="vipTipShow = true">
									<text>{{$t('buyVIP')}}</text>
								</view>
							</view>
							<view class="u-m-t-40" v-if="currVip">
								<view class="m-font-18 u-c-f">{{$t('VIP特权')}}</view>
								<!-- <view class="u-flex u-flex-wrap w_100">
									<view class="w_50 u-flex flex--direction u-row-center u-m-t-30">
										<u-image :src="$t('vip-img-1')" width="80px" height="80px" borderRadius="5px">
											<u-loading slot="loading"></u-loading>
										</u-image>
										<view class="u-m-t-10">{{$t('最高出款金额')}}</view>
										<view>{{currVip.max_amount}}</view>
									</view>
									<view class="w_50 u-flex flex--direction u-row-center u-m-t-30">
										<u-image :src="$t('vip-img-2')" width="80px" height="80px" borderRadius="5px">
											<u-loading slot="loading"></u-loading>
										</u-image>
										<view class="u-m-t-10">{{$t('最低出款金额')}}</view>
										<view>{{currVip.min_amount}}</view>
									</view>
									<view class="w_50 u-flex flex--direction u-row-center u-m-t-30">
										<u-image :src="$t('vip-img-3')" width="80px" height="80px" borderRadius="5px">
											<u-loading slot="loading"></u-loading>
										</u-image>
										<view class="u-m-t-10">{{$t('每日出款次数限制')}}</view>
										<view>{{currVip.day_limit}}</view>
									</view>
									<view class="w_50 u-flex flex--direction u-row-center u-m-t-30">
										<u-image :src="$t('vip-img-4')" width="80px" height="80px" borderRadius="5px">
											<u-loading slot="loading"></u-loading>
										</u-image>
										<view class="u-m-t-10">{{$t('高额佣金比例')}}</view>
										<view>
											{{currVip.fy_rate1+'%'+'-'+currVip.fy_rate2+'%'+'-'+currVip.fy_rate3+'%'}}
										</view>
									</view>
								</view> -->

								<view class="u-flex u-row-between w_100 u-m-t-30">
									<view class="privilegeClass u-flex u-row-between">
										<view class="u-m-r-10">
											<view class="m-font-b">{{$t('最高出款金额')}}</view>
											<view class="u-m-t-6">{{currVip.max_amount}}</view>
										</view>
										<u-image :src="$t('vip-img-1')" width="70px" height="70px" borderRadius="5px"
											style="min-width: 70px;min-height: 70px;">
											<u-loading slot="loading"></u-loading>
										</u-image>
									</view>

									<view class="privilegeClass u-flex u-row-between">
										<view class="u-m-r-10">
											<view class="m-font-b">{{$t('最低出款金额')}}</view>
											<view class="u-m-t-6">{{currVip.min_amount}}</view>
										</view>
										<u-image :src="$t('vip-img-2')" width="70px" height="70px" borderRadius="5px"
											style="min-width: 70px;min-height: 70px;">
											<u-loading slot="loading"></u-loading>
										</u-image>
									</view>

									<view class="privilegeClass u-flex u-row-between">
										<view class="u-m-r-10">
											<view class="m-font-b">{{$t('每日出款次数限制')}}</view>
											<view class="u-m-t-6">{{currVip.day_limit}}</view>
										</view>
										<u-image :src="$t('vip-img-3')" width="70px" height="70px" borderRadius="5px"
											style="min-width: 70px;min-height: 70px;">
											<u-loading slot="loading"></u-loading>
										</u-image>
									</view>

									<view class="privilegeClass u-flex u-row-between">
										<view class="u-m-r-10">
											<view class="m-font-b">{{$t('高额佣金比例')}}</view>
											<view class="u-m-t-6">
												{{currVip.fy_rate1+'%'+'-'+currVip.fy_rate2+'%'+'-'+currVip.fy_rate3+'%'}}
											</view>
										</view>
										<u-image :src="$t('vip-img-4')" width="70px" height="70px" borderRadius="5px"
											style="min-width: 70px;min-height: 70px;">
											<u-loading slot="loading"></u-loading>
										</u-image>
									</view>

								</view>
							</view>

							<view class="u-flex recUrlClass">
								<view class="u-m-r-30">
									<text class="u-c-9 u-m-r-10">{{$t('agent12')}}:</text>
									<text class="u-c-2 m-font-b u-m-r-20">{{teampromotion.rec_url}}</text>
									<button class="btn" :class="iscopya?'btn--blue':'btn--blue'"
										@click="copy(teampromotion.rec_url,'iscopya')">
										<text v-if="!iscopya" class="m-line-1">{{$t('复制链接')}}</text><text v-else
											class="m-line-1">{{$t('已复制')}}</text>
									</button>
								</view>
								<view class="u-m-l-30">
									<text class="u-c-9 u-m-r-10">{{$t('agent13')}}:</text>
									<text class="u-c-2 m-font-b u-m-r-20">{{teampromotion.rec_code}}</text>
									<button class="btn " :class="iscopyb?'btn--blue':'btn--blue'"
										@click="copy(teampromotion.rec_code,'iscopyb')">
										<text v-if="!iscopyb" class="m-line-1">{{$t('复制邀请码')}}</text><text v-else
											class="m-line-1">{{$t('已复制')}}</text>
									</button>
								</view>
							</view>
						</view>

						<!-- <view class="inv-cells u-skeleton-fillet">
									<view class="inv-cell">
										<view class="inv-head">
											<view class="flex_bd m-c-0">1. {{$t('什么叫有效用户')}}</view>
										</view>
										<view class="inv-content">{{$t('有效用户解释说明')}}</view>
									</view>
									<view class="inv-cell">
										<view class="inv-head">
											<view class="flex_bd m-c-0">2. {{$t('如何有效提升VIP')}}</view>
										</view>
										<view class="inv-content">{{$t('如何有效提升VIP解释说明')}}</view>
									</view>
								</view> -->

					</view>
					<view class="inv-cell-pc">
						<view class="m-font-b">1. {{$t('什么叫有效用户')}}</view>
						<view>{{$t('有效用户解释说明')}}</view>
						<view class="u-m-t-26 m-font-b">2. {{$t('如何有效提升VIP')}}</view>
						<view>{{$t('如何有效提升VIP解释说明')}}</view>
					</view>
				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content" :data-theme="themeMode">
				<view class="container u-skeleton">
					<uniNavHeader :title="this.$t('推荐有礼')"></uniNavHeader>
					<view class="bs-wrapper">
						<view class="site-head u-flex u-m-b-30">
							<view class="site-tit">
								<text>{{$t('推荐有礼')}}</text>
								<view class="line"></view>
							</view>
							<view class="site-back" @click="common_back">
								<text class="iconfont icon-close"></text>
							</view>
						</view>
						<view class="gooLight">
							<view class="invte-main">
								<view class="inv-cells">
									<view class="inv-banner u-skeleton-fillet">
										<u-image :src="$t('vipTopImg')" class="invImg" borderRadius="8px" height="160px"
											mode="aspectFill">
											<u-loading slot="loading"></u-loading>
										</u-image>
									</view>
									<view class="fan-card fan-inv-card u-m-b-20">
										<view class="inv-numbsers u-flex u-p-30 u-skeleton-fillet">
											<view class="flex_bd">
												<scroll-view scroll-x="true" scroll-with-animation="true"
													:scroll-into-view="toView">
													<view class="num-box u-p-t-16" :id="item.level_name"
														:class="activeLevel == item.level_name.substring(3,item.level_name.length) ? 'active' : ''"
														v-for="(item,index) in userVip" :key="`vip${index}`"
														@click="changeVip(item)">
														<view class="gift-ico u-flex u-row-center">
															<u-image src="@/static/images/skin/bluelight/gift2.png"
																width="28px" height="18px"></u-image>
														</view>
														<view class="num-label u-m-t-10 u-m-b-10">
															<text class="text-1">LV.</text>
															<text
																class="text-2">{{item.level_name.substring(3,item.level_name.length)}}</text>
														</view>
													</view>
												</scroll-view>
											</view>
										</view>
										<view class="u-p-30 u-skeleton-fillet">
											<view class="g-label m-font-14 u-m-b-16 m-font-b">
												<text class="u-m-r-10">{{$t('晋升')}}</text>
												<text>{{currVip.level_name}}</text>
											</view>
											<view v-for="(itm,int) in currVip.vip_condition" :key="int"
												class="u-flex u-m-b-10 u-c-9">
												<view>{{int + 1}}.</view>
												<view>{{$t(itm.key)}}:</view>
												<view>{{itm.value}}</view>
												<template v-if="itm.is_finish">
													<u-icon name="checkmark" color="#1b669c" class="Satisfy" size="20">
													</u-icon>
												</template>
											</view>
											<view class="get-row u-flex u-row-center u-m-t-30"
												v-if="currVip.level_gold > 0">
												<view class="get-col"
													v-if="currVip.buy_amount > 0 && this.userInfo_common.level_id < currVip.id">
													<view class="u-flex">
														<view class="g-circle">
															<text>{{currVip.buy_amount}}</text>
														</view>
														<view class="text">{{$t('购买价格')}}</view>
													</view>
												</view>
												<view class="get-col">
													<view class="u-flex ">
														<view class="g-circle">
															<text>{{currVip.level_gold}}</text>
														</view>
														<view class="text">{{$t('CurUnit')}}</view>
													</view>
												</view>
											</view>
											<view class="wt-foot u-m-t-50" v-if="vipApply == 1">
												<!-- <template v-if="currVip.is_apply == 0 && currVip.level_gold > 0">
													<view class="btn btn--default m-font-b" @click="getVipApply">
														<text>{{$t('领取')}}</text>
													</view>
												</template>
												<template v-if="currVip.is_apply == 1 && currVip.level_gold > 0">
													<view class="btn btn--other m-font-b">
														<text>{{$t('已领取')}}</text>
													</view>
												</template> -->
												<template v-if="currVip.status == 0">
													<view class="btn btn--other m-font-b">
														<text>{{$t('未达标')}}</text>
													</view>
												</template>
												<template v-if="currVip.status == 1">
													<view class="btn btn--default m-font-b" @click="getVipApply">
														<text>{{$t('领取')}}</text>
													</view>
												</template>
												<template v-if="currVip.status == 2">
													<view class="btn btn--other m-font-b">
														<text>{{$t('已领取')}}</text>
													</view>
												</template>
											</view>
											<view class="wt-foot u-m-t-50"
												v-if="currVip.buy_amount > 0 && this.userInfo_common.level_id < currVip.id">
												<view class="btn btn--submit m-font-b" @click="vipTipShow = true">
													<text>{{$t('buyVIP')}}</text>
												</view>
											</view>
										</view>
									</view>
								</view>
								<view class="inv-cells u-skeleton-fillet">
									<view class="inv-cell">
										<view class="inv-head">
											<view class="flex_bd">1. {{$t('什么叫有效用户')}}</view>
										</view>
										<view class="inv-content">{{$t('有效用户解释说明')}}</view>
									</view>
									<view class="inv-cell">
										<view class="inv-head">
											<view class="flex_bd">2. {{$t('如何有效提升VIP')}}</view>
										</view>
										<view class="inv-content">{{$t('如何有效提升VIP解释说明')}}</view>
									</view>
								</view>
							</view>
						</view>
						<template v-if="teamStatus == 1">
							<view style="height: 96px;background-color: var(--body-bg);"></view>
							<view class="inv-foot pc_box u-skeleton-fillet">
								<uni-row :gutter="40">
									<uni-col :span="12">
										<view class="inv-label m-line-1">{{$t('agent12')}}: {{teampromotion.rec_url}}
										</view>
										<button class="btn" :class="iscopya?'btn--blue':'u-c-c'"
											@click="copy(teampromotion.rec_url,'iscopya')">
											<text v-if="!iscopya" class="m-line-1">{{$t('复制链接')}}</text><text v-else
												class="m-line-1">{{$t('已复制')}}</text>
										</button>
									</uni-col>
									<uni-col :span="12">
										<view class="inv-label m-line-1">{{$t('agent13')}}: {{teampromotion.rec_code}}
										</view>
										<button class="btn " :class="iscopyb?'btn--blue':'u-c-c'"
											@click="copy(teampromotion.rec_code,'iscopyb')">
											<text v-if="!iscopyb" class="m-line-1">{{$t('复制邀请码')}}</text><text v-else
												class="m-line-1">{{$t('已复制')}}</text>
										</button>
									</uni-col>
								</uni-row>
							</view>
						</template>
					</view>
				</view>
				<pcBg></pcBg>
			</view>
			<u-skeleton :loading="skeletonLoading" :animation="true" bgColor="var(--body-bg)"
				el-color="var(--u-skeletonA)" bg-color="var(--u-skeletonB)"></u-skeleton>
		</template>
		<u-popup v-model="vipTipShow" mode="center" class="u-popup-style" :mask-custom-style="uPopMaskCustomStyle">
			<view class="bs-popup bs-tip-popup">
				<view class="bs-popup-hd">
					<view class="tt">{{$t('提示')}}</view>
				</view>
				<view class="bs-popup-body">
					<view class="bs-tip">
						{{$t('是否确认购买')}}
					</view>
					<view class="wt-btn-foot u-flex u-row-between u-m-t-60">
						<button class="btn btn--gray btn-bg" @click="vipTipShow = false">{{$t("public5")}}</button>
						<button class="btn btn--default" @click="buyVIP">{{$t("public6")}}</button>
					</view>
				</view>
			</view>
		</u-popup>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10999">
		</u-top-tips>
	</view>

</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	export default {
		components: {
			uniNavHeader,
			listEmpty,
			pcBg,
			pcNavHeader
		},
		data() {
			return {
				cateValue: 0,
				collvalue: "0",
				iscopya: false,
				iscopyb: false,
				isget: false,
				teampromotion: {}, // 推广链接
				teampopularize: {}, //推广用户数据
				retMsg: '',
				is_top: false,
				userVip: [], //用户VIP数据
				currVip: {}, //展示下级晋升数据
				activeLevel: '',
				teamStatus: null, //是否代理商
				toView: '',
				skeletonLoading: true,
				vipTipShow: false,
				vipApply: 0
			}
		},
		async onLoad() {
			await this.getUserVip();
			await this.getTeampopularize();
			this.getteampromotion();
			uni.setNavigationBarTitle({
				title: this.$t('推荐有礼')
			});
		},
		methods: {
			async getVipApply() {
				let res = await this.$u.api.vip_apply_p({
					level_id: this.currVip.id
				});
				if (res && res.code == 1) {
					this.getTeampopularize();
				}
				this.$refs.uTips.show({
					title: this.$t(res.msg)
				});
			},
			// 是否为代理用户
			async getTeampopularize() {
				let ret = await this.$u.api.teampopularize_p();
				if (ret && ret.code == 1 && !this.skeletonLoading) {
					this.teamStatus = 1;
				} else {
					this.teamStatus = 2;
				}
			},
			// 推广链接
			async getteampromotion() {
				let ret = await this.$u.api.teampromotion_p();
				if (ret && ret.code == 1) {
					this.teampromotion = ret.data;
				}
			},
			//购买VIP
			async buyVIP() {
				var _this = this;
				uni.showLoading({
					title: this.$t('loading')
				});
				let parm = {
					id: _this.currVip.id
				};
				let res = await this.$u.api.buy_vip_p(parm);
				if (res.code == 1) {
					let newVip = _this.userVip[Number(res.data) - 1];
					_this.activeLevel = newVip.activeVip;
					_this.currVip = newVip;
					_this.toView = newVip.level_name;
					_this.userInfo_common.level_id = newVip.id;
					_this.userInfo_common.level_name = newVip.level_name;
					await _this.getUserInfo_common(); //获取用户信息
				}
				_this.$refs.uTips.show({
					title: _this.$t(res.msg)
				});
				_this.vipTipShow = false;

			},
			async getUserVip() {
				let res = await this.$u.api.user_vip_p();
				if (res && res.code == 1) {
					this.skeletonLoading = false;
					let vip = [];
					vip = res.data;
					for (let i in vip) {
						vip[i].activeVip = Number(vip[i].id) - 1;
						if (this.userInfo_common.level_id == vip[i].id) {
							this.currVip = vip[Number(i)];
							this.activeLevel = Number(i);
							setTimeout(_ => {
								this.toView = this.currVip.level_name;
							}, 1000);
						}
					}
					this.userVip = vip;
				}
			},
			changeVip(item) {
				this.activeLevel = item.activeVip;
				this.currVip = item;
				this.toView = item.level_name;
			},
			copy(value, iscopy) {
				if (iscopy === 'iscopya') {
					this.iscopya = true
				}
				if (iscopy === 'iscopyb') {
					this.iscopyb = true
				}
				let result
				let textarea = document.createElement("textarea")
				textarea.value = value
				textarea.readOnly = "readOnly"
				document.body.appendChild(textarea)
				textarea.select() // 选中文本内容
				textarea.setSelectionRange(0, value.length) // 设置选定区的开始和结束点
				this.$refs.uTips.show({
					title: this.$t('agent2')
				});
				result = document.execCommand("copy") //将当前选中区复制到剪贴板
				textarea.remove()
			},
		}
	}
</script>

<style lang="scss">
	.noteamUser {
		margin-top: 200px;
		text-align: center;
		font-size: 24px;
		color: #6bf280;
		font-weight: bold;
	}

	.solid-line-1 {
		height: 1px;
		width: 150px;
		background: linear-gradient(to right, var(--blue-color), rgba(69, 113, 255, 0))
	}

	.solid-line-2 {
		height: 1px;
		width: 150px;
		background: linear-gradient(to right, rgba(26, 234, 203, 1), rgba(26, 234, 203, 0))
	}

	.solid-line-3 {
		height: 1px;
		width: 150px;
		background: linear-gradient(to right, rgba(93, 91, 178, 1), rgba(93, 91, 178, 0))
	}

	.num-label {
		color: var(--body-color);

		.text-1 {
			font-size: 12px;
			font-style: oblique;
			margin-right: 2px;
		}

		.text-2 {
			font-weight: bold;
			font-size: 15px;
		}
	}

	.Satisfy {
		padding: 1px;
		margin-left: 5px;
		border-radius: 50%;
		background-color: #03d6c9;
	}

	.site-head {
		background: var(--mar-bg);
		margin: -10px -16px 0 !important;
		padding: 0 27px 15px;
	}

	.bs-wrapper {
		background: var(--mar-bg);
		padding: 70px 0 0 0 !important;
	}

	.gooLight {
		background-color: #ebeff6;
		border-radius: 15px 15px 0 0;
		padding: 15px;
		border-top: 1px solid #e9e6e5;
	}


	.bs-popup-hd {
		background-color: var(--bs-popup-hd);
	}

	.bs-popup-hd .tt {
		color: #fff;
	}

	.fan-inv-pc-card {
		border-radius: 10px 10px 0 0;
		background: #09102A;
		border-bottom: 1px solid #192039;
	}

	.u-c-f {
		color: #F7D5A8;
	}

	.u-c-2 {
		color: #2D57B7;
	}

	.recUrlClass {
		margin-top: 20px;
		padding: 15px 25px;
		border-radius: 50px;
		background: #262C44;
	}

	.privilegeClass {
		width: 24%;
		min-width: 210px;
		color: #8E613C;
		padding: 16px;
		border-radius: 10px;
		background: linear-gradient(to right, #F2CB98, #F7D5A8);
	}

	.inv-cell-pc {
		color: #8FA7CD;
		border-radius: 0 0 10px 10px;
		padding: 20px;
		background: #09102A;
	}
</style>
