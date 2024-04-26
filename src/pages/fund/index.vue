<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader :title="this.$t('储蓄基金')" @clickLeft="menuClick" ref="header" :pageActive="5"></uniNavHeader>
			<view class="mar-panel">
				<view class="site-head u-flex">
					<view class="site-tit">
						<text>{{$t('储蓄基金')}}</text>
						<view class="line"></view>
					</view>
					<view class="site-back" @click="common_back">
						<text class="iconfont icon-close"></text>
					</view>
				</view>
			</view>
			<view class="gooLight">
				<view class="bs-wrapper-two">
					<view class="form-row u-m-b-20">
						<view class="game-tabs ">
							<u-tabs height="64" bar-height="0" bg-color="none" gutter="80" active-color="#ffffff"
								inactive-color="#ffffff" :list="list_m" :current="current" @change="change">
							</u-tabs>
						</view>
					</view>
					<!-- 定期数据 -->
					<template v-if="current == 0">
						<template v-if="userFund.set_fund_money">
							<view class=" gradient-data">
								<view class="fund-a flex-center">
									<view class="flex_bd">
										<view class="a-label">{{$t('总余额')}}</view>
										<view class="f-val  u-m-t-10">{{userFund.set_fund_money}} <text
												class="m-font-12 u-p-l-10">{{$t("moneylabel")}}</text></view>
									</view>
									<!-- 新增预估获利 -->
									<view class="flex_bd">
										<view class="a-label">{{$t('锁定资金')}}</view>
										<view class="f-val  u-m-t-10">{{userFund.frozen_amount}} <text
												class="m-font-12 u-p-l-10">{{$t("moneylabel")}}</text></view>
									</view>
								</view>
								<view class="fund-b">
									<view class="col">
										<view class="fund-card">
											<view class="f-label">{{$t('昨日收益')}}</view>
											<view class="u-m-t-10 ">{{userFund.day_income}}</view>
										</view>
									</view>
									<view class="col">
										<view class="fund-card">
											<view class="f-label">{{$t('持有收益')}}</view>
											<view class="u-m-t-10 ">{{userFund.hold_income}}</view>
										</view>
									</view>
									<!-- 新增日利率 -->
									<view class="col">
										<view class="fund-card">
											<view class="f-label">{{$t('累计收益')}}</view>
											<view class="u-m-t-10 ">{{userFund.total_income}}</view>
										</view>
									</view>
								</view>
								<view class="fund-bottom u-flex ">
									<view class="flex_bd">
										<view class="btn btn--left" @click="showUutSetBtnType">
											{{$t('买入')}}
										</view>
									</view>
									<view class="flex_bd">
										<view class="btn btn--right" @click="openFundPopup_out_ding">
											{{$t('转出')}}
										</view>
									</view>
								</view>
							</view>
						</template>
						<view class="fun-cells">
							<template v-if="huo_list_emtpy == 1">
								<view class="fun-list-card" v-for="(item,index) in huo_fundList" :key="index">
									<view class="fundItemClass flex-center" @click="getTeamData(item)">
										<view class="flex_bd">
											<view class="title u-font-30 u-flex">
												<!-- <text v-if="item.msg == '定期基金转出'" class="dot dot-a"></text>
												<text v-else-if="item.msg == '定期基金转入'" class="dot dot-b"></text>
												<text v-else-if="item.msg == '定期余额基金购买'" class="dot dot-c"></text>
												<text v-else class="dot"></text> -->
												<text>{{$t(item.msg)}}</text>
											</view>
											<view class="u-font-xs u-m-b-10 u-m-r-10">{{$t('user32')}}: <text
													class="text-gray u-p-l-10">{{ellipsis(item.order_sn,5,6)}}</text>
											</view>
											<view class="u-font-xs text-gray">{{item.add_time}}</view>
										</view>
										<view :class="item.type == 1?'highlight':'text-red'">
											{{item.type == 1?'+' + $t(item.price) : '-' + $t(item.price)}}
										</view>
									</view>
								</view>
								<view class="load-more-box">
									<uni-load-more :status="huo_status" :contentText="huo_contentText"
										v-show="huo_fundList.length > 0">
									</uni-load-more>
								</view>
							</template>
							<template v-if="huo_list_emtpy == 2">
								<listEmpty :isDefault="true"></listEmpty>
							</template>
						</view>
					</template>
					<template v-if="current == 1">
						<template v-if="userFund.live_fund_money">
							<view class="gradient-data">
								<view class="fund-a ">
									<view class="funn-a-cell u-text-center">
										<view class="fun-label u-font-30">{{$t('总余额')}}</view>
										<view class="f-val u-m-t-10">{{userFund.live_fund_money}}</view>
									</view>
									<!-- 新增预估获利 -->
									<view class="funn-center-cell u-flex">
										<view class="fun-bar ">
											<text>{{$t('预估获利')}}</text>：
											<text>{{userFund.earnings}}</text>
										</view>
									</view>
								</view>
								<view class="fund-b ">
									<view class="col">
										<view class="fund-card">
											<view class="f-label u-m-b-10">
												{{userFund.fund_time_status==1?$t('上次收益'):$t('昨日收益')}}
											</view>
											<view class="val">{{userFund.day_income}}</view>
										</view>
									</view>
									<view class="col">
										<view class="fund-card">
											<view class="f-label u-m-b-10">{{$t('日利率')}}</view>
											<view class="val">{{userFund.interest}}</view>
										</view>
									</view>
									<view class="col">
										<view class="fund-card">
											<view class="f-label u-m-b-10">{{$t('累计收益')}}</view>
											<view class="val">{{userFund.total_income}}</view>
										</view>
									</view>
								</view>
								<view class="fund-bottom u-flex ">
									<view class="flex_bd">
										<view class="btn btn--left" @click="openFundPopup_into">
											<text>{{$t('转入')}}</text>
										</view>
									</view>
									<view class="flex_bd">
										<view class="btn btn--right" @click="openFundPopup_out">
											<text>{{$t('转出')}}</text>
										</view>
									</view>
								</view>
							</view>
						</template>
						<view class="fun-cells">

							<template v-if="huo_list_emtpy == 1">
								<view class="fun-list-card" v-for="(item,index) in huo_fundList" :key="index">
									<view class="fundItemClass flex-center" @click="getTeamData(item)">
										<view class="flex_bd">
											<view class="title u-font-30 u-flex">
												<!-- <text v-if="item.msg == '活期基金转出'" class="dot dot-a"></text>
												<text v-else-if="item.msg == '活期基金转入'" class="dot dot-b"></text>
												<text v-else-if="item.msg == '活期基金余额下单'" class="dot dot-c"></text>
												<text v-else class="dot"></text> -->
												<text>{{$t(item.msg)}}</text>
											</view>
											<view class="u-font-xs  u-m-b-10 ">{{$t('user32')}}:<text
													class="text-gray u-p-l-10">{{ellipsis(item.order_sn,5,6)}}</text>
											</view>
											<view class="u-font-xs  text-gray">{{item.add_time}}</view>
										</view>
										<view :class="item.type == 1?'highlight':'text-red'">
											{{item.type == 1?'+' + $t(item.price) : '-' + $t(item.price)}}
										</view>
									</view>
								</view>
								<view class="load-more-box">
									<uni-load-more :status="huo_status" :contentText="huo_contentText"
										v-show="huo_fundList.length > 0">
									</uni-load-more>
								</view>
							</template>
							<template v-if="huo_list_emtpy == 2">
								<listEmpty :isDefault="true"></listEmpty>
							</template>
						</view>
					</template>
				</view>
			</view>
			<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10999">
			</u-top-tips>
			<u-popup v-model="huo_fundOutSetPop" mode="bottom" borderRadius="32" @close="closeSet"
				:mask-custom-style="uPopMaskCustomStyle">
				<view class="bs-popup " style="width: 100%;">
					<view class="bs-popup-hd">{{$t('定期')}}
						<view class="iconfont icon-close" @click="closeFundOutSetPop()"></view>
					</view>
					<view class="bs-popup-body-top">
						<view class="bs-popup-body">
							<view class="fundData-card">
								<view class="wt-card-top">{{$t('天天收益')}}</view>
								<view class="wt-top-data">
									<view class="t-text">{{$t('最大金额')}}</view>
									<view class="t-val">{{fastList.max_money}}</view>
								</view>
								<view class="wt-card-data">
									<view class="col">
										<view class="w-label">{{$t('起购金额')}}</view>
										<view class="w-val">{{fastList.min_money}}</view>
									</view>
									<view class="col">
										<view class="w-label">{{$t('周期')}}</view>
										<view class="w-val">{{fastList.few_days}}</view>
									</view>
									<view class="col">
										<view class="w-label">{{$t('日利率')}}</view>
										<view class="w-val">{{fastList.interest}}</view>
									</view>
								</view>
								<view class="wt-tabs">
									<u-tabs active-color="#ffffff" inactive-color="#ffffff" bg-color="none"
										:show-bar="false" :list="wtlist" :current="wtcurrent" @change="wtchange"
										height="64" font-size="24"></u-tabs>
								</view>
							</view>
							<view class="u-flex wt-fund-row">
								<view class="flex_bd">
									<view class="wt-label u-flex u-row-between u-m-b-20 skin-text">
										<view class="tt">{{$t('转入金额')}}</view>
									</view>
									<u-input :placeholder="$t('请输入转入金额')" height="80" v-model="rechargePrice"
										type="number" :clearable="false" :customStyle="customStyle" />
								</view>
								<view class="wt-right skin-text">
									<view class="wt-label u-m-b-20">{{$t('预估日收益')}}</view>
									<view class="data-select-input">{{fundProfit}}</view>
								</view>
							</view>
							<view class="u-m-t-30 u-m-b-30 skin-input-bar u-p-20 u-bd-10">
								<view class="u-flex u-row-between ">
									<view class="item">
										{{$t('user1')}}:{{userFund.set_fund_money}}
									</view>
									<view class="btn btn-green u-p-l-30 u-p-r-30" @click="openFundPopup_into_ding">
										{{$t('转入')}}
									</view>
								</view>
							</view>
							<!-- <view class="popup-end-cell">
						<view class="u-flex u-m-b-20">
							<view class="p-label">{{$t('支付方式')}}</view>
							<view class="highlight u-m-auto">{{moneyType == 1?$t('user1'):$t('活期余额')}}</view>
							<view class="item highlight" v-if="moneyType == 1">{{userInfo_common.balance1}}</view>
							<view class="item highlight" v-if="moneyType == 2">
								{{userFund.set_fund_money}}
							</view>
						</view>
						<uni-data-select :emptyText="$t('请选择')" v-model="cateValue" :localdata="caterange" @change="catechange" :clear="false">
						</uni-data-select>
					</view> -->
							<view class="bs-foot-button flex-center w_100">
								<view @click="closeFundOutSetPop()" class="btn btn--gray u-bd-50 u-c-b w_30">
									{{$t('public5')}}
								</view>
								<view @click="ding_fundSubmit" class="btn btn--default u-bd-50 m-c-w w_70 u-m-l-20">
									{{$t('public6')}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-popup>

			<view class="u-withdrawal" v-if="setUserPwd">
				<u-modal v-model="setUserPwd" :confirm-text="$t('public6')" :content="$t('您还没设置提现密码')"
					confirm-color="var(--ui-color-dark)" @confirm="goSetPwd">
				</u-modal>
			</view>

			<!-- 活期转入金额 -->
			<u-popup v-model="fundPopup_into" mode="bottom" borderRadius="32">
				<view class="bs-popup bs-center-popup">
					<view class="bs-popup-hd">{{$t('活期')}}
						<view class="iconfont icon-close" @click="closeOpenFundPopup_into()"></view>
					</view>
					<view class="bs-popup-body-top">
						<view class="bs-popup-body">
							<view class="wt-form_row">
								<view class="wt-label u-flex u-row-between u-m-b-20 skin-text">
									{{$t('转入金额')}}
								</view>
								<u-input :placeholder="$t('请输入转入金额')" height="80" v-model="huo_into_price" type="number"
									:clearable="false" :customStyle="customStyle" />
							</view>
							<view class="wt-form_row u-m-t-30">
								<view class="wt-label u-flex u-row-between u-m-b-20 skin-text">
									{{$t('提现密码')}}
								</view>
								<u-input :placeholder="$t('请输入提现密码')" height="80" v-model="withdrawal_psd" maxlength=6
									type="password" :clearable="false" :customStyle="customStyle" />
							</view>
							<view class="bs-foot-button flex-center w_100">
								<view @click="closeOpenFundPopup_into()" class="btn btn--gray u-bd-50 u-c-b w_30">
									{{$t('public5')}}
								</view>
								<view @click="fundSubmit(huo_into_price)" class="btn btn--submit m-c-w w_70 u-m-l-20">
									{{$t('public6')}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
			<!-- 活期转出金额 -->
			<u-popup v-model="fundPopup_out" mode="bottom" borderRadius="32">
				<view class="bs-popup">
					<view class="bs-popup-hd">{{$t('活期')}}
						<view class="iconfont icon-close" @click="closeOpenFundPopup_out()"></view>
					</view>
					<view class="bs-popup-body-top">
						<view class="bs-popup-body">
							<view class="wt-form_row">
								<view class="wt-label u-flex u-row-between u-m-b-20 skin-text">
									{{$t('转出金额')}}
								</view>
								<u-input :placeholder="$t('请输入转出金额')" height="80" v-model="huo_out_price" type="number"
									:clearable="false" :customStyle="customStyle" />
							</view>
							<view class="wt-form_row u-m-t-30">
								<view class="wt-label u-flex u-row-between u-m-b-20 skin-text">
									{{$t('提现密码')}}
								</view>
								<u-input :placeholder="$t('请输入提现密码')" height="80" v-model="withdrawal_psd" maxlength=6
									type="password" :clearable="false" :customStyle="customStyle" />
							</view>
							<view class="bs-foot-button flex-center w_100">
								<view @click="closeOpenFundPopup_out()" class="btn btn--gray u-bd-50 u-c-b w_30">
									{{$t('public5')}}
								</view>
								<view @click="setFundPrice(huo_out_price)" class="btn btn--submit m-c-w w_70 u-m-l-20">
									{{$t('public6')}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-popup>

			<!-- 定期转入金额 -->
			<u-popup v-model="fundPopup_ding_into" mode="bottom" borderRadius="32">
				<view class="bs-popup">
					<view class="bs-popup-hd">{{$t('定期')}}
						<view class="iconfont icon-close" @click="closeFundPopup_into_ding()"></view>
					</view>
					<view class="bs-popup-body-top">
						<view class="bs-popup-body">
							<view class="wt-form_row">
								<view class="wt-label u-flex u-row-between u-m-b-20 skin-text">
									{{$t('转入金额')}}
								</view>
								<u-input :placeholder="$t('请输入转入金额')" height="80" v-model="ding_into_price"
									type="number" :clearable="false" :customStyle="customStyle" />
							</view>
							<view class="wt-form_row u-m-t-30">
								<view class="wt-label u-flex u-row-between u-m-b-20 skin-text">
									{{$t('提现密码')}}
								</view>
								<u-input :placeholder="$t('请输入提现密码')" height="80" v-model="withdrawal_psd" maxlength=6
									type="password" :clearable="false" :customStyle="customStyle" />
							</view>
							<view class="bs-foot-button flex-center w_100">
								<view @click="closeFundPopup_into_ding()" class="btn btn--gray u-bd-50 u-c-b w_30">
									{{$t('public5')}}
								</view>
								<view @click="fundSubmit(ding_into_price)" class="btn btn--submit m-c-w w_70 u-m-l-20">
									{{$t('public6')}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
			<!-- 定期转出金额 -->
			<u-popup v-model="fundPopup_ding_out" mode="bottom" borderRadius="32">
				<view class="bs-popup">
					<view class="bs-popup-hd">{{$t('定期')}}
						<view class="iconfont icon-close" @click="closeFundPopup_out_ding()"></view>
					</view>
					<view class="bs-popup-body-top">
						<view class="bs-popup-body">
							<view class="wt-form_row">
								<view class="wt-label u-flex u-row-between u-m-b-20 skin-text">
									{{$t('转出金额')}}
								</view>
								<u-input :placeholder="$t('请输入转出金额')" height="80" v-model="ding_out_price" type="number"
									:clearable="false" :customStyle="customStyle" />
							</view>
							<view class="wt-form_row u-m-t-30">
								<view class="wt-label u-flex u-row-between u-m-b-20 skin-text">
									{{$t('提现密码')}}
								</view>
								<u-input :placeholder="$t('请输入提现密码')" height="80" v-model="withdrawal_psd" maxlength=6
									type="password" :clearable="false" :customStyle="customStyle" />
							</view>

							<view class="bs-foot-button flex-center w_100">
								<view @click="closeFundPopup_out_ding()" class="btn btn--gray u-bd-50 u-c-b w_30">
									{{$t('public5')}}
								</view>
								<view @click="setFundPrice(ding_out_price)" class="btn btn--submit m-c-w w_70 u-m-l-20">
									{{$t('public6')}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</u-popup>

			<uni-popup ref="tuiPopup" type="bottom" mask-background-color="rgba(0,0,0,0.75)">
				<view class="bs-popup bs-center-popup">
					<view class="bs-popup-hd u-flex u-row-between">
						<view>{{$t(dataPop.name)}}</view>
						<view class="iconfont icon-close " @click="closeInfo()"></view>
					</view>
					<view style="">
						<view class="u-flex">
							<view style="min-width: 100px;">{{$t('user33')}} :</view>
							<view class=" u-m-auto">{{dataPop.min_money + '/' + dataPop.max_money}}</view>
						</view>
						<view class="u-flex u-m-t-26">
							<view style="min-width: 100px;">{{$t('周期')}} :</view>
							<view class=" u-m-auto">{{dataPop.few_days + $t('天')}}</view>
						</view>
						<view class="u-flex u-m-t-26">
							<view style="min-width: 100px;">{{dataPop.fund_interest_type==1?$t('日利率'):$t('总利率')}} :
							</view>
							<view class=" u-m-auto">{{dataPop.interest}}%</view>
						</view>
						<u-line margin="20px 0" color="#EBEEF5" />
						<view class="u-flex u-rela">
							<image :src="rechargePriceInput" class="inputLeftIcon" mode=""></image>
							<u-input :placeholder="$t('user60')" height="80" v-model="rechargePrice" type="number"
								:clearable="false" :customStyle="customStyle" />
						</view>
						<view class="u-flex u-m-t-26">
							<view style="min-width: 100px;">{{$t('定期余额')}} :</view>
							<view class="text-pick u-m-auto">{{userFund.set_fund_money}}</view>
						</view>
						<view class="u-flex u-m-t-26">
							<view style="min-width: 100px;">{{$t('game8')}} :</view>
							<view class="text-pick u-m-auto">{{fundProfit}}</view>
						</view>
						<!-- <view class="u-flex u-m-t-26 u-row-between">
						<view>
							<view @click="dingPayType(1)" class="noPayType"
								:class="payType == 1 ? 'payType' : 'noPayType'">{{$t('余额')}}</view>
							<view class="u-m-t-10">{{userInfo_common.balance1}}</view>
						</view>
						<view>
							<view @click="dingPayType(2)" class="noPayType"
								:class="payType == 2 ? 'payType' : 'noPayType'">{{$t('定期余额')}}</view>
							<view class="u-m-t-10">{{userFund.set_fund_money}}</view>
						</view>
					</view> -->
					</view>
					<view class="bs-foot-button flex-center justify-center">
						<view @click="ding_fundSubmit" class="btn btn--default fundSubmit">{{$t('确认投资')}}</view>
					</view>
				</view>
			</uni-popup>


			<!-- 活期账变记录 -->
			<u-popup v-model="investmentPop" mode="bottom">
				<view class="bs-popup">
					<view class="bs-popup-hd u-flex u-row-between">
						<view>{{$t('详情')}}</view>
						<view class="iconfont icon-close " @click="closeInvestmentPop()"></view>
					</view>
					<view class="bs-popup-body">
						<view class="u-flex u-row-between u-m-t-20">
							<view>{{$t('简称')}}</view>
							<view>{{$t(teamData.msg)}}</view>
						</view>
						<view class="u-flex u-row-between u-m-t-20">
							<view>{{$t(teamData.type==1?$t('转入'):$t('转出'))}}</view>
							<view :class="teamData.type == 1?'u-c-g':'u-c-r'">
								{{teamData.type == 1?'+' + $t(teamData.price) : '-' + $t(teamData.price)}}
							</view>
						</view>
						<view class="u-flex u-row-between u-m-t-20">
							<view>{{$t('投资时间')}}</view>
							<view>{{teamData.add_time}}</view>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import uniNavFooter from '@/components/uni-foot-bar/uni-foot-bar.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	import listEmpty from '@/components/list-empty/list-empty.vue'
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			uniNavFooter,
			pcBg,
			listEmpty
		},
		data() {
			return {
				sideshow: false,
				list_m: [{
						name: this.$t('定期')
					},
					{
						name: this.$t('活期')
					}
				],
				current: 0,
				customStyle: {
					paddingLeft: '15px',
					borderRadius: 'var(--card-radius)',
					height: '50px',
					color: '#000',
					boxShadow: 'var(--shadow-bg)',
					border: 'var(--easyinput__border)',
					backgroundColor: 'var(--form-main-uni-easyinput__content)',
				},
				p: 1,
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				huo_p: 1,
				huo_status: 'more',
				huo_contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				rechargePrice: '',
				rechargePriceInput: '../../static/images/topboom/money_circle.png',
				dataType: [],
				queryIndex: null,
				dataPop: {},
				fund_id: null,
				fundOut_day: 0.00,
				huo_fundList: [], // 活期基金列表
				navbarBack: {
					// backgroundImage: 'linear-gradient(to bottom, #58A8E3 , #5AA9E3)'
					backgroundImage: 'linear-gradient(to right, #991A40 -16.8%, #56082B 108.81%)'
				},
				userFund: {}, // 用户基金
				fundItem: {}, // 投注详情
				// payType: 2, // 1用户余额购买 2定期可用余额购买
				teamData: {}, //活期账变记录
				// 新

				cateValue: 0,
				caterange: [{
						value: 0,
						text: this.$t("user1")
					},
					{
						value: 1,
						text: this.$t("账号余额")
					},
				],
				wtlist: [],
				wtcurrent: 0,
				fastList: {}, //选项卡选中类型
				huo_into_price: '', //活期转入余额
				huo_out_price: '', //活期转出余额
				ding_into_price: '', //定期转入余额
				ding_out_price: '', //定期转出余额
				huo_fundOutSetPop: false,
				fundPopup_into: false,
				fundPopup_out: false,
				fundPopup_ding_into: false,
				fundPopup_ding_out: false,
				investmentPop: false,
				withdrawal_psd: '',
				setUserPwd: false,
				huo_list_emtpy: null,
			}
		},
		async onLoad(e) {
			if (e.current) {
				this.current = e.current;
				if (this.current == 0) {
					this.queryIndex = 2;
					await this.getUserFund();
					this.getSavingsFundsList('add'); //活期记录列表
					this.getSavingsFundsLists();
				} else if (this.current == 1) {
					this.queryIndex = 1;
				}
			} else {
				this.$go('back');
			}
		},

		onReachBottom() {
			if (this.current == 0) {
				if (this.huo_status == 'noMore') {
					return;
				} else {
					this.getSavingsFundsList(); // 获取活期账变记录
				}
			} else if (this.current == 1) {
				if (this.huo_status == 'noMore') {
					return;
				} else {
					this.getSavingsFundsList(); // 获取活期账变记录
				}
			}
		},
		computed: {
			fundProfit() {
				let fundProfit = '';
				if (this.fastList.fund_interest_type == 1) {
					fundProfit = (((this.rechargePrice * this.fastList.interest) * this.fastList.few_days) / 100)
						.toFixed(2);
				} else if (this.fastList.fund_interest_type == 2) {
					fundProfit = ((this.rechargePrice * this.fastList.interest) / 100).toFixed(2);
				}
				return fundProfit
			}
		},
		methods: {
			dingPayType(e) {
				this.payType = e;
			},
			closeInvestmentPop() {
				this.investmentPop = false;
			},
			// 活期账变数据弹窗
			getTeamData(e) {
				this.teamData = e;
				this.investmentPop = true;
			},
			//获取用户基金信息
			async getUserFund() {
				uni.showLoading({
					title: this.$t('loading')
				})
				let res = await this.$u.api.savings_funds_get_my_fund_p({
					type: this.queryIndex
				});
				if (res) {
					uni.hideLoading();
					this.userFund = res.data;
				}
			},
			goSetPwd() {
				this.$go('/pages/ucenter/profile?setpwd=' + true);
			},
			//获取活期账变记录
			async getSavingsFundsList(add) {
				uni.showLoading({
					title: this.$t('loading')
				})
				let res = await this.$u.api.savings_funds_mx_list_p({
					page: this.huo_p,
					limit: 10,
					f_type: this.queryIndex
				});
				if (res) {
					uni.hideLoading();
					if (res.data.length > 0) {
						if (add) {
							this.huo_fundList = res.data;
						} else {
							this.huo_fundList = this.huo_fundList.concat(res.data);
						}
						if (res.data.length == 10) {
							this.huo_status = "loading";
							this.huo_p++;
						} else {
							this.huo_status = "noMore";
						}
						if (this.huo_fundList.length > 0) {
							this.huo_list_emtpy = 1;
						} else {
							this.huo_list_emtpy = 2;
						}
					} else {
						this.huo_status = "noMore";
					}
				}
			},
			mrShowStatus() {
				let pages = getCurrentPages();
				if (pages && pages.length > 1) {
					uni.navigateBack({
						delta: 1,
					});
				} else {
					history.back();
				}
			},
			showUutSetBtnType(e) {
				this.closeFundPopup_out_ding();
				this.huo_fundOutSetPop = true;
			},
			closeFundOutSetPop() {
				this.rechargePrice = '';
				this.withdrawal_psd = '';
				this.huo_fundOutSetPop = false;
			},
			openFundPopup_into() {
				if (this.$helper.get('userInfo').withdrawal_psd) {
					this.fundPopup_into = true;
				} else {
					this.setUserPwd = true;
				}
			},
			closeOpenFundPopup_into() {
				this.huo_into_price = '';
				this.withdrawal_psd = '';
				this.fundPopup_into = false;
			},
			openFundPopup_out() {
				if (this.$helper.get('userInfo').withdrawal_psd) {
					this.fundPopup_out = true;
				} else {
					this.setUserPwd = true;
				}
			},
			closeOpenFundPopup_out() {
				this.huo_out_price = '';
				this.withdrawal_psd = '';
				this.fundPopup_out = false;
			},
			openFundPopup_into_ding() {
				if (this.$helper.get('userInfo').withdrawal_psd) {
					this.fundPopup_ding_into = true;
				} else {
					this.setUserPwd = true;
				}
			},
			closeFundPopup_into_ding() {
				this.ding_into_price = '';
				this.withdrawal_psd = '';
				this.fundPopup_ding_into = false;
			},
			openFundPopup_out_ding() {
				if (this.$helper.get('userInfo').withdrawal_psd) {
					this.fundPopup_ding_out = true;
				} else {
					this.setUserPwd = true;
				}
			},
			closeFundPopup_out_ding() {
				this.ding_out_price = '';
				this.withdrawal_psd = '';
				this.fundPopup_ding_out = false;
			},
			menuClick() {
				this.sideshow = !this.sideshow;
			},
			change(index) {
				this.current = index;
				this.huo_list_emtpy = null;
				if (this.current == 1) {
					this.queryIndex = 1;
					this.huo_p = 1;
					this.huo_fundList = [];
					this.getSavingsFundsList('add'); //活期记录列表
				} else if (this.current == 0) {
					this.queryIndex = 2;
					this.huo_p = 1;
					this.rechargePrice = '';
					this.dataType = [];
					this.huo_fundList = [];
					this.getSavingsFundsList('add'); //活期记录列表
					this.getSavingsFundsLists();
				}
				this.userFund = {};
				this.getUserFund();
			},
			// 获取基金列表
			async getSavingsFundsLists() {
				uni.showLoading({
					title: this.$t('loading')
				})
				let res = await this.$u.api.savings_funds_lists_p({
					// limit: 20,
					// page: this.p,
					fund_type: this.queryIndex,
					// fund_type: 2,
					type: 'all'
				});
				if (res) {
					uni.hideLoading();
					if (res.data.length > 0) {
						this.dataType = res.data;
						this.wtlist = this.dataType;
						this.fastList = this.wtlist[0];
						this.fund_id = this.wtlist[0].id;
					}
				}
			},
			// 用户转入基金
			async fundSubmit(price) {
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.savings_funds_transfer_in_p({
					type: this.queryIndex,
					withdrawal_psd: this.withdrawal_psd,
					price
				});
				if (res.code == 1) {
					if (this.queryIndex == 1) {
						this.closeOpenFundPopup_into();
						this.huo_into_price = '';
					} else {
						this.closeFundPopup_into_ding();
						this.ding_into_price = '';
					}
					this.getUserFund(); //用户基金信息
					this.huo_p = 1;
					this.withdrawal_psd = '';
					this.huo_fundList = [];
					this.getSavingsFundsList('add'); //活期记录列表
					this.$refs.header.headUserBan();
					uni.hideLoading();
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
				} else {
					if (this.queryIndex == 1) {
						this.closeOpenFundPopup_into();
						this.huo_into_price = '';
					} else {
						this.ding_into_price = '';
						this.closeFundPopup_into_ding();
					}
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
				}
			},
			// 投资
			async ding_fundSubmit() {
				uni.showLoading({
					title: this.$t('loading')
				});
				let param = {};
				if (this.queryIndex == 2) {
					param = {
						price: this.rechargePrice,
						fund_id: this.fund_id
						// money_type: this.payType //支付类型 1用户余额 2定期基金余额
					};
				}
				let res = await this.$u.api.savings_funds_fund_apply_p(param);
				if (res.code == 1) {
					// if (res.data.id) {
					// 	this.$go('/pages/fund/fundDetails?id=' + res.data.id)
					// };
					uni.hideLoading();
					this.rechargePrice = '';
					this.huo_p = 1;
					this.huo_fundList = [];
					this.huo_fundOutSetPop = false;
					this.wtcurrent = 0;
					this.getUserFund(); //用户基金信息
					this.$refs.header.headUserBan();
					this.closeInfo();
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
				} else {
					this.rechargePrice = '';
					uni.hideLoading();
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
					this.closeInfo();
				}
			},
			// 用户转出基金
			async setFundPrice(price) {
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.savings_funds_transfer_out_p({
					type: this.queryIndex,
					withdrawal_psd: this.withdrawal_psd,
					price
				});
				if (this.queryIndex == 1) {
					this.closeOpenFundPopup_out();
				} else {
					this.closeFundPopup_out_ding();
				}
				if (res.code == 1) {
					// if (res.data.id) {
					// 	this.$go('/pages/fund/fundDetails?id=' + res.data.id)
					// };
					this.ding_out_price = '';
					this.withdrawal_psd = '';
					this.huo_out_price = '';
					this.getUserFund(); //用户基金信息
					this.huo_p = 1;
					this.huo_fundList = [];
					this.getSavingsFundsList('add'); //活期记录列表
					this.$refs.header.headUserBan();
					uni.hideLoading();
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
				} else {
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
				}
			},
			showInfo(item, index) {
				this.rechargePrice = '';
				this.dataPop = item;
				this.fund_id = item.id;
				this.$refs.tuiPopup.open();
			},
			closeInfo() {
				this.$refs.tuiPopup.close();
			},
			closeSet() {
				this.fund_id = this.wtlist[0].id;
			},
			wtchange(index) {
				this.fastList = {};
				this.wtcurrent = index;
				this.fastList = this.wtlist[index];
				this.fund_id = this.wtlist[index].id;
			}
		}
	}
</script>

<style lang="scss">
	.recordPosition {
		top: 15px;
		right: 20px;
		color: #fff;
	}

	.reocrdImg {
		width: 15px;
		height: 15px;
		margin-right: 4px;
	}

	.m_reocrdImg {
		width: 18px;
		height: 18px;
	}

	.fundOutSetBtn {
		height: 40px;
		padding: 0 8px;
		cursor: pointer;
		min-width: 130px;
		line-height: 40px;
		text-align: center;
		border-radius: 6px;
		border: 1px solid #404040;
	}

	.fundOutSetBtn_active {
		color: #fff;
		height: 40px;
		padding: 0 8px;
		cursor: pointer;
		min-width: 130px;
		line-height: 40px;
		text-align: center;
		border-radius: 6px;
		background-color: var(--ui-color-normal);
		border: 1px solid var(--ui-color-normal);
	}

	.listActiveback {
		color: #606266;
		background: #dddfe8;
	}

	.bd-top {
		border-radius: 8px 8px 0 0;
	}

	.panel_fundBack {
		border-radius: 8px;
		background-color: #FFFFFF;
		box-shadow: 0px 4px 10px rgba(24, 25, 32, 0.1);
	}

	.topBg {
		height: calc(100vh - 60px);
		background-size: 100% auto;
		background-repeat: no-repeat;
		// background-image: url('../../static/images/fundBg.png');
		background-image: var(--fund-top-bg);
	}

	.huo_fundListStyle {
		padding: 20px 10px;
	}


	.u-c-g {
		color: #21cd61;
	}

	.u-c-r {
		color: #FF1900;
	}

	.noPayType {
		display: inline-block;
		font-size: 12px;
		padding: 3px 8px;
		border-radius: 5px;
		border: 1px solid #7A7E83;
		cursor: pointer;
	}

	.payType {
		display: inline-block;
		cursor: pointer;
		color: #fff;
		font-size: 12px;
		padding: 3px 8px;
		border-radius: 5px;
		border: 1px solid transparent;
		background-color: var(--ui-color-normal);
	}

	.PitsIconSize {
		font-size: 30px;
		background-image: -webkit-linear-gradient(bottom, var(--ui-color-normal), var(--ui-color-normal), var(--ui-color-dark));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.withBtn {
		width: 70%;
		color: #fff;
		font-size: 15px;
		cursor: pointer;
		padding: 8px 20px;
		margin: 10px auto;
		border-radius: 5px;
		text-align: center;
		background-color: var(--ui-color-normal);
	}

	.bs-foot-button {
		justify-content: space-between;
	}

	.gradient-data {
		padding: 16px;
		background: var(--gradient-data-img) center no-repeat;
		color: #ffffff;
		background-size: cover;
		border-radius: var(--card-radius);
		margin-bottom: 15px;
	}

	.fundData-card {
		background: var(--fundData-card) center no-repeat;
		background-size: cover;
		border-radius: var(--card-radius);
		margin-bottom: 20px;
		padding: 16px 6px;
		text-align: center;
		color: #ffffff;
	}

	.wt-card-top {
		font-size: 15px;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.wt-top-data {
		margin-bottom: 15px;

		.t-text {
			font-size: 12px;
			opacity: .6;
		}

		.t-val {
			font-size: 24px;
			font-weight: bold;
		}
	}

	.wt-card-data {
		display: flex;
		margin-bottom: 15px;

		.col {
			flex: 1;
			padding: 0 3px;
		}

		.w-label {
			word-break: break-all;
			font-size: 12px;
			margin-bottom: 6px;
			line-height: 1.2;
			opacity: .6;
		}

		.w-val {
			font-weight: bold;
		}
	}

	.u-drawer-center .bs-popup {
		min-width: 340px !important;
	}

	.uni-popup.bottom .bs-popup {
		color: var(--navbar-color);
	}

	// v2.0
	.game-tabs {
		::v-deep .u-tab-item {
			border-radius: var(--tab-radius);
			background: #F5F6F7;
			margin-right: 10px;
			border: 1px solid #ccc;
			color: var(--tab-item-color) !important;
		}

		::v-deep .item-active {
			background: #2B44B1;
			color: #ffffff !important;
			border: none;
			// height: 36px !important;
			// line-height: 36px !important;
		}
	}

	.container {
		::v-deep .uni-navbar {
			background: var(--mar-bg);
		}
	}

	.wt-form_row {
		::v-deep .u-input__right-icon {
			position: absolute;
			right: 10px;
			top: 50%;
			transform: translateY(-50%);
		}
	}
	
	.bs-popup-hd {
		color: #fff;
	}

	/* #ifdef MY-SKIN-BLUE-LIGHT */

	.container {
		background: var(--mar-bg);
	}

	.gooLight {
		background-color: #ebeff6;
		border-top: 1px solid #e9e6e5;
		border-radius: 15px 15px 0 0;
	}

	.bs-popup .icon-close {
		width: 23px;
		height: 23px;
		color: var(--bs-popup-hd);
		background-color: #ccc;
	}

	/* #endif */
</style>
