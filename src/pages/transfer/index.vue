<template>
	<view>
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main u-flex">
				<pcSideBar :pageIndex="6"></pcSideBar>
				<view class="m-bg-w m-c-0 pc-main-right">
					<view class="m-font-b u-m-b-30">{{$t('转账')}}</view>
					<view class="u-flex">
						<view class="availableBalanceClass u-flex flex--direction u-row-center">
							<view class="m-font-b u-m-b-14 m-font-16">{{numberLimit(userInfo_common.balance)}}</view>
							<view>{{$t('user1')}}</view>
						</view>
						<view class="availableFreezeBalanceClass u-flex flex--direction u-row-center">
							<view class="m-font-b u-m-b-14 m-font-16">{{numberLimit(userInfo_common.user_transfer_balance)}}
							</view>
							<view>{{$t('冻结余额')}}</view>
						</view>
					</view>
					<view class="u-m-t-40 m-font-14 input-class">
						<view class="u-m-b-20">{{$t('账号')}}</view>
						<u-input v-model="zhangValue" type="text" :custom-style="customStyle" :clearable="false"
							:placeholder="$t('输入对方账号')" :border="true">
						</u-input>
					</view>
					<view class="u-m-t-40 m-font-14 input-class">
						<view class="u-flex u-row-between u-m-b-20">
							<view class="">{{$t('转账余额')}}</view>
							<view class="">
								<text class="u-c-r">*</text>
								<text>{{$t('TransferFee')}}</text>
							</view>
						</view>
						<u-input v-model="price" type="number" :custom-style="customStyle" :clearable="false"
							:placeholder="$t('输入转账余额')" :border="true" @blur="testPrice">
						</u-input>
					</view>
					<view class="u-m-t-40 m-font-14 input-class">
						<view class="u-m-b-20">{{$t('交易密码')}}</view>
						<u-input v-model="pwdValue" type="password" :custom-style="customStyle" :clearable="false"
							:placeholder="$t('输入交易密码')" :border="true" maxlength="6">
						</u-input>
					</view>
					<view @click="transferChange" class="transfer-btn">{{$t("转账")}}</view>
					<view class="u-m-t-24">
						<view>{{$t('注意事项')}}:</view>
						<view class="u-m-b-12 u-c-9">{{$t('PrecautionsInfo1')}}</view>
						<view class="u-m-b-12 u-c-9">{{$t('PrecautionsInfo2')}}</view>
						<view class="u-m-b-12 u-c-9">{{$t('PrecautionsInfo3')}}</view>
						<view class="u-m-b-12 u-c-9">{{$t('PrecautionsInfo4')}}</view>
						<view class="u-m-b-12 u-c-9">{{$t('PrecautionsInfo5')}}</view>
						<view class="u-m-b-12 u-c-9">{{$t('PrecautionsInfo6')}}</view>
						<view class="u-c-9">{{$t('PrecautionsInfo7')}}</view>
					</view>
				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content" :data-theme="themeMode">
				<view class="container">
					<uniNavHeader :title="this.$t('转账')" :pageActive="9"></uniNavHeader>
					<view class="bs-wrapper">
						<view class="site-head u-flex u-m-b-30">
							<view class="site-tit">
								<text>{{$t('转账')}}</text>
								<view class="line"></view>
							</view>
							<view class="site-back" @click="common_back">
								<text class="iconfont icon-close"></text>
							</view>
						</view>
						<view class="gooLight">
							<view class="u-flex u-row-between">
								<view class="availableBalanceClass w_48 u-flex flex--direction u-row-center">
									<view>{{numberLimit(userBalance.balance)}}</view>
									<view>{{$t('user1')}}</view>
								</view>
								<view class="availableFreezeBalanceClass w_48 u-flex flex--direction u-row-center">
									<view>{{numberLimit(userBalance.user_transfer_balance)}}</view>
									<view>{{$t('冻结余额')}}</view>
								</view>
								<!-- <image src="../transfer/image/zhuanzhangjilu.png" style="height:24px;width:22px"
									mode="aspectFill" @click="getUserBalance">
								</image> -->
							</view>
							<view class="u-m-t-40 m-font-14 input-class">
								<view class="u-m-b-20">{{$t('账号')}}</view>
								<u-input v-model="zhangValue" type="text" :custom-style="customStyle" :clearable="false"
									:placeholder="$t('输入对方账号')" :border="true">
								</u-input>
								<view class="u-m-t-8">
									<text class="u-c-r">*</text>
									<text>{{$t('TransferFee')}}</text>
								</view>
								<!-- <view class="FindClass" @click="findChang(zhangValue)">{{$t('查找')}}</view> -->
							</view>
							<!-- <view class="u-m-t-40 m-font-14 input-class">
								<view class="u-m-b-20">{{$t('用户名')}}</view>
								<u-input v-model="nameValue" type="text" :custom-style="customStyle2" :clearable="false"
									:placeholder="$t('自动带出用户名')" :disabled="true" />
								<view class="u-m-t-8">
									<text class="u-c-r">*</text>
									<text>{{$t('TransferFee')}}</text>
								</view>
							</view> -->
							<view class="u-m-t-40 m-font-14 input-class">
								<view class="u-m-b-20">{{$t('转账余额')}}</view>
								<u-input v-model="price" type="number" :custom-style="customStyle" :clearable="false"
									:placeholder="$t('输入转账余额')" :border="true" @blur="testPrice">
								</u-input>
							</view>
							<view class="u-m-t-40 m-font-14 input-class">
								<view class="u-m-b-20">{{$t('交易密码')}}</view>
								<u-input v-model="pwdValue" type="password" :custom-style="customStyle"
									:clearable="false" :placeholder="$t('输入交易密码')" :border="true" maxlength="6">
								</u-input>
							</view>
							<view class="popup-btns flex-center">
								<button type="default" @click="transferChange"
									class="btn btn--submit">{{$t("转账")}}</button>
							</view>
							<view class="u-m-t-24">
								<view>{{$t('注意事项')}}:</view>
								<view class="u-m-b-12">{{$t('PrecautionsInfo1')}}</view>
								<view class="u-m-b-12">{{$t('PrecautionsInfo2')}}</view>
								<view class="u-m-b-12">{{$t('PrecautionsInfo3')}}</view>
								<view class="u-m-b-12">{{$t('PrecautionsInfo4')}}</view>
								<view class="u-m-b-12">{{$t('PrecautionsInfo5')}}</view>
								<view class="u-m-b-12">{{$t('PrecautionsInfo6')}}</view>
								<view>{{$t('PrecautionsInfo7')}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>


		<u-popup v-model="configPop" mode="center" border-radius="35" :mask-custom-style="uPopMaskCustomStyle">
			<view class="bs-popup m-bg-w">
				<view class="bs-popup-hd m-bg-w">
					<view class="tt m-c-0">{{$t("温馨提示")}}</view>
					<view class="iconfont icon-close" @click="configPopClose"></view>
				</view>
				<view class="u-m-30 u-text-center">
					<view class="m-font-b">{{ $t('确定转账到用户') + this.zhangValue + price + $t('金额') + $t('CurUnit') + '?'}}
					</view>
					<view>{{$t('包含手续费') + (parseInt(price * (transferConfig.charge / 100))) + $t('CurUnit') }}</view>
				</view>
				<view class="u-flex u-row-between u-m-30">
					<u-button type="default" @click="configPopClose" class="w_48 btn btn--clone payTypeBtn">{{$t("取消")}}
					</u-button>
					<u-button type="default" @click="findChang" class="w_48 btn btn--submit payTypeBtn"
						:throttle-time="3000">{{$t("确认")}}</u-button>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="pricePop" mode="center" border-radius="35" :mask-custom-style="uPopMaskCustomStyle">
			<view class="bs-popup m-bg-w">
				<view class="bs-popup-hd m-bg-w">
					<view class="tt m-c-0">{{$t("温馨提示")}}</view>
					<view class="iconfont icon-close" @click="pricePopClose"></view>
				</view>
				<view class="u-m-30 m-font-b">{{$t('转账范围为') + transferConfig.min + '-' + transferConfig.max}}</view>
				<view class="popup-btns u-m-30">
					<button type="default" @click="pricePopClose"
						class="btn btn--submit payTypeBtn">{{$t("确认")}}</button>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="userNamePop" mode="center" border-radius="35" :mask-custom-style="uPopMaskCustomStyle">
			<view class="bs-popup m-bg-w">
				<view class="bs-popup-hd m-bg-w">
					<view class="tt m-c-0">{{$t("温馨提示")}}</view>
					<view class="iconfont icon-close" @click="userNamePopClose"></view>
				</view>
				<view class="u-m-30 m-font-b">{{$t('查找不到此用户')}}</view>
				<view class="popup-btns u-m-30">
					<button type="default" @click="userNamePopClose"
						class="btn btn--submit payTypeBtn">{{$t("确认")}}</button>
				</view>
			</view>
		</u-popup>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
		</u-top-tips>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniNavFooter from '@/components/uni-foot-bar/uni-foot-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import fireworks from '@/components/sanshui-fireworks/sanshui-fireworks.vue'
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	import {
		accMul,
		accAdd,
		changeTwoDecimal_f
	} from '@/common/tool.js'
	export default {
		components: {
			uniNavHeader,
			uniNavFooter,
			listEmpty,
			fireworks,
			pcNavHeader,
			pcSideBar
		},
		data() {
			return {
				configPop: false,
				pricePop: false,
				userNamePop: false,
				popupMode: 'bottom',
				zhangValue: '',
				customStyle: {
					height: '42px'
				},
				customStyle2: {
					height: '42px',
					background: '#EAEAEA',
					padding: '10px',
					borderRadius: '10px'
				},
				nameValue: '',
				pwdValue: '',
				userId: 0,
				price: '',
				transferConfig: {}
			}
		},
		onLoad() {
			this.getTransferConfig();
		},
		onReachBottom() {},
		methods: {
			async getTransferConfig() {
				let res = await this.$u.api.transfer_config_p();
				if (res.code == 1) {
					this.transferConfig = res.data;
				}
			},
			testPrice() {
				if (Number(this.price) > Number(this.transferConfig.max) || Number(this.price) < Number(this.transferConfig
						.min)) {
					this.pricePop = true;
				}
			},
			onLoadChange() {
				if (this.mobile_common) {
					this.popupMode = 'bottom'
				} else {
					this.popupMode = 'center'
				}
			},
			configPopClose() {
				this.configPop = false;
			},
			pricePopClose() {
				this.pricePop = false;
			},
			userNamePopClose() {
				this.userNamePop = false;
			},
			async findChang() {
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.transfer_search_name_p({
					to_name: this.zhangValue
				});
				if (res.code == 1) {
					this.userId = res.data;
					// this.nameValue = this.zhangValue;
					let res2 = await this.$u.api.transfer_play_p({
						to_name: this.zhangValue,
						to_uid: res.data,
						price: this.price,
						withdrawal_psd: this.pwdValue
					});
					this.configPop = false;
					this.$refs.uTips.show({
						title: this.$t(res2.msg)
					});
				} else {
					// this.nameValue = '';
					// this.zhangValue = '';
					// this.pwdValue = '';
					// this.userId = 0;
					// this.price = '';
					this.userNamePop = true;
				}
			},
			transferChange() {
				if (!this.zhangValue) {
					this.$refs.uTips.show({
						title: this.$t('输入对方账号')
					});
					return
				}

				if (!this.price) {
					this.$refs.uTips.show({
						title: this.$t('输入转账余额')
					});
					return
				}

				if (!this.pwdValue) {
					this.$refs.uTips.show({
						title: this.$t('输入交易密码')
					});
					return
				}
				this.configPop = true;
			},
			async configChange() {
				this.findChang()
			}
		}
	}
</script>

<style lang="scss">
	.site-head {
		background: var(--mar-bg);
		padding: 0 15px;
	}

	.bs-wrapper {
		background: var(--mar-bg);
		padding: 60px 0 0 0 !important;
	}

	.gooLight {
		background-color: #ebeff6;
		border-radius: 15px 15px 0 0;
		padding: 15px;
		border-top: 1px solid #e9e6e5;
	}

	.availableBalanceClass {
		color: #306DF0;
		padding: 10px 20px;
		background: #D5DEFF;
		border-radius: 10px;
		margin-right: 20px;
	}

	.availableFreezeBalanceClass {
		color: #848484;
		padding: 10px 20px;
		background: #EAEAEA;
		border-radius: 10px;
		// margin-right: 20px;
	}

	.input-class ::v-deep .u-input--border {
		border-radius: 10px;
	}

	.FindClass {
		color: #306DF0;
		position: absolute;
		right: 10px;
		top: 0;
		z-index: 2;
		height: 42px;
		line-height: 42px;
	}

	.bs-popup .icon-close {
		color: #fff;
		width: 20px;
		height: 20px;
		background: #c4c4c4;
		font-size: 10px;
	}

	.btn--clone {
		color: #333333;
		background: #E2E2E2;
	}

	@media (min-width: 100px) {
		.availableBalanceClass {
			padding: 20px;
			min-width: 150px;
		}

		.availableFreezeBalanceClass {
			padding: 20px;
			min-width: 150px;
		}
	}

	.transfer-btn {
		background: #306DF0;
		border: 1px solid #D8D8D8;
		border-radius: 4px;
		color: #fff;
		padding: 10px 20px;
		min-width: 150px;
		text-align: center;
		margin-top: 20px;
		cursor: pointer;
		display: inline-block;
	}
	
	.container ::v-deep .uni-navbar {
	    background: var(--mar-bg);
	}
</style>
