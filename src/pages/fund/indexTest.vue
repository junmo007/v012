<template>
	<view>
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-fund-top">
				<view class="site-head u-flex">
					<view class="site-tit u-flex">
						<view class="m-font-i left-icon">9L</view>
						<text>{{$t('9L理财')}}</text>
					</view>
					<!-- <view class="site-back" @click="common_back">
					<text class="iconfont icon-close"></text>
				</view> -->
				</view>
				<view class="u-flex u-row-between u-m-t-16 u-m-b-26">
					<view class="u-flex">
						<view class="site-head-item">{{$t('零风险')}}</view>
						<view class="site-head-item">{{$t('零手续费')}}</view>
						<view class="site-head-item">{{$t('随时兑换')}}</view>
					</view>
					<view class="u-flex m-c-o" @click="infoPop = true">
						<view class="cur_pointer">{{$t('9L简介')}}</view>
						<view class="iconfont icon-right"></view>
					</view>
				</view>
			</view>
			<view class="pc-main">
				<u-row gutter="0" justify="center">
					<u-col span="2">
						<view class="left-select">
							<view class="left-select-item cur_pointer" v-for="(item,index) in caterange"
								:key="`caterange${index}`"
								:class="currentFoot == index ? 'left-select-active-item' : ''"
								@click="currentFootChange(index)">
								{{item.text}}
							</view>
						</view>
					</u-col>
					<u-col span="10">
						<view class="right-text u-c-0">
							<template v-if="currentFoot == 0">
								<scroll-view style="height: calc(100vh - 230px);" scroll-y="true"
									@scrolltolower="scrolltolowerChnage">
									<view class="game-tabs">
										<u-tabs height="64" bar-height="0" bg-color="none" gutter="80"
											active-color="#ffffff" inactive-color="#ffffff" :list="wtlist"
											:current="wtcurrent" @change="wtchange">
										</u-tabs>
									</view>
									<view class=" og-card">
										<!-- <view class="u-flex u-row-between u-m-t-16">
										<view>{{$t('价格')}}</view>
										<view>1 9L = 100</view>
									</view> -->
										<view class="u-flex u-row-between u-m-t-16">
											<view>{{$t('投资类型') }}</view>
											<view>{{fastList.fund_type == 1 ? $t('活期') : $t('定期')}}</view>

										</view>
										<view class="u-flex u-row-between u-m-t-16">
											<view>{{$t('预估年利率')}}</view>
											<view class="m-c-o">{{fastList.interest?fastList.interest:'0' +'%'}}</view>
										</view>
										<!-- <view class="u-flex u-row-between u-m-t-16">
											<view>{{$t('年化收益高达')}}</view>
											<view class="m-c-o">
												{{fastList.fund_interest_type?fastList.fund_interest_type:'0'}}
											</view>
										</view> -->
										<view class="u-flex u-row-between u-m-t-16 w_100">
											<u-input v-model="hq_price" type="number"
												:placeholder="$t('最低申购额')+fastList.min_money" :custom-style="qh_style"
												@input="priceChange" />
											<image src="@/static/images/pc/fcar-kuery.png"
												style="width: 23px;margin: 0 12px;" mode="widthFix"></image>
											<u-input v-model="hq_price_dis" type="number"
												:placeholder="$t(fundConfig.token_name)" :custom-style="qh_style2"
												:disabled="true" />
										</view>
										<!-- <view class="u-m-t-16">
										<view class="m-font-b">{{$t('平台福利')}}</view>
										<view class="u-flex u-row-between fuli-select">
											<view>充值卷LV1</view>
											<view class="iconfont icon-down"></view>
										</view>
									</view> -->
										<view class="fund-btn"
											@click="fastList.fund_type == 1 ? fundSubmit(hq_price) : ding_fundSubmit()">
											{{$t('申购')}}
										</view>
									</view>
									<view class="u-m-t-26 og-list">
										<view class="og-list-item" v-for="(item,index) in huo_fundList"
											:key="`huo_fundList${index}`">
											<view class="u-flex u-row-between">
												<view class="u-flex">
													<view class="m-font-b">{{item.type == 1 ? $t('赎回') : $t('申购')}}
													</view>
													<view class="site-head-item u-m-l-12">
														{{item.f_type == 1 ? $t('活期') : $t('定期')}}
													</view>
												</view>
												<view class="u-flex">
													<view class="">{{$t('订单')}}: </view>
													<view class="u-m-l-12">{{item.order_sn}}</view>
												</view>
											</view>
											<view class="u-flex u-row-between">
												<view class="u-c-9">{{$t('数量')}}</view>
												<!-- <view class="">{{$t('预估年利率')}}</view> -->
											</view>
											<view class="u-flex u-row-between">
												<view class="">{{item.price}} {{$t(fundConfig.token_name)}}</view>
												<!-- <view class="">1.4%</view> -->
											</view>
											<view class="u-c-9 u-m-t-14">{{item.add_time}}</view>
										</view>
									</view>
								</scroll-view>
							</template>
							<template v-if="currentFoot == 1">
								<scroll-view style="height: calc(100vh - 230px);" scroll-y="true"
									@scrolltolower="scrolltolowerChnage">
									<view class="pc-og-card2">
										<view style="width: 500px;">
											<view class="u-flex flex--direction u-row-center">
												<view class="m-c-w m-font-14 m-font-b">{{$t('总资产')}}</view>
												<view class="m-c-w m-font-22 m-font-b">{{userFund.live_fund_money}}
												</view>
											</view>
											<view class="u-flex u-row-between w_100 u-m-t-20">
												<view class="u-flex u-row-center flex--direction w_50">
													<view class="m-c-w">{{$t('持有收益')}}</view>
													<view class="u-c-g u-m-t-10">{{userFund.hold_income}}</view>
												</view>
												<view style="width: 1px;height: 35px;background-color: #fff;"></view>
												<view class="u-flex u-row-center flex--direction w_50">
													<view class="m-c-w">{{$t('累计收益')}}</view>
													<view class="u-c-g u-m-t-10">{{userFund.total_income}}</view>
												</view>
											</view>
										</view>
									</view>
									<view class="og-list-item" v-for="(item,index) in fundOrderList"
										:key="`fundOrderList${index}`" @click="fundOrderListChange(item)">
										<view class="u-flex">
											<view class="m-font-b">{{item.type == 1 ? $t('活期') : $t('定期')}}</view>
											<view class="site-head-item u-m-l-12">{{item.few_days+$t('天')}}</view>
										</view>
										<view class="u-flex u-row-between w_100 u-m-t-20">
											<view class="w_33">
												<view class="u-c-9">{{$t('数量')}}</view>
												<view class="u-m-t-8">{{item.price}} {{$t(fundConfig.token_name)}}
												</view>
											</view>
											<view class="u-text-center w_33">
												<view class="u-c-9">{{$t('预估年利率')}}</view>
												<view class="u-m-t-8">{{item.interest_type}}%</view>
											</view>
											<view class="u-text-right w_33">
												<view class="u-c-9">{{$t('预计总收益')}}</view>
												<view class="u-m-t-8 m-c-o">{{item.all_earnings}}
													{{$t(fundConfig.token_name)}}
												</view>
											</view>
										</view>
									</view>
								</scroll-view>
							</template>
						</view>
					</u-col>
				</u-row>

			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content">
				<view class="container" :class="sideshow?'is-mask':''">
					<uniNavHeader :title="this.$t('储蓄基金')" @clickLeft="menuClick" ref="header"></uniNavHeader>
					<view class="mar-panel">
						<view class="site-head u-flex">
							<view class="site-tit u-flex">
								<view class="m-font-i left-icon">9L</view>
								<text>{{$t('9L理财')}}</text>
							</view>
							<view class="site-back" @click="common_back">
								<text class="iconfont icon-close"></text>
							</view>
						</view>
						<view class="u-flex u-row-between u-m-t-16 u-m-b-26">
							<view class="u-flex">
								<!-- <view class="site-head-item m-line-1">{{$t('零风险')}}</view> -->
								<!-- <view class="site-head-item m-line-1">{{$t('零手续费')}}</view> -->
								<!-- <view class="site-head-item m-line-1">{{$t('随时兑换')}}</view> -->
								<view class="site-head-item game-tabs-item">
									<view class="game-type">
										<view class="game-tabs-item-name">
											<view class="game-tabs-item-marquee">
												{{$t('零风险')}}
											</view>
										</view>
									</view>
								</view>
								<view class="site-head-item game-tabs-item">
									<view class="game-type">
										<view class="game-tabs-item-name">
											<view class="game-tabs-item-marquee">
												{{$t('零手续费')}}
											</view>
										</view>
									</view>
								</view>
								<view class="site-head-item game-tabs-item">
									<view class="game-type">
										<view class="game-tabs-item-name">
											<view class="game-tabs-item-marquee">
												{{$t('随时兑换')}}
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="u-flex m-c-o" @click="infoPop = true">
								<view class="m-line-1">{{$t('9L简介')}}</view>
								<view class="iconfont icon-right"></view>
							</view>
						</view>
						<view class="mar-panel-bg">
							<template v-if="currentFoot == 0">
								<view class="game-tabs u-m-b-20">
									<u-tabs height="68" bar-height="6" bar-width="80" bg-color="none" gutter="36" 
								active-color="#FFFFFF" inactive-color="#9792B2" :list="wtlist"
										:current="wtcurrent" @change="wtchange">
									</u-tabs>
								</view>
								<view class="og-card">
									
									<!-- <view class="u-flex u-row-between u-m-t-16">
									<view>{{$t('价格')}}</view>
									<view>1 9L = 100</view>
								</view> -->
									<view class="u-flex u-row-between u-m-t-16">
										<view>{{$t('投资类型') }}</view>
										<view>{{fastList.fund_type == 1 ? $t('活期') : $t('定期')}}</view>

									</view>
									<view class="u-flex u-row-between u-m-t-16">
										<view>{{$t('预估年利率')}}</view>
										<view class="m-c-o">{{fastList.interest?fastList.interest:'0' +'%'}}</view>
									</view>
									<!-- <view class="u-flex u-row-between u-m-t-16">
										<view>{{$t('年化收益高达')}}</view>
										<view class="m-c-o">
											{{fastList.fund_interest_type?fastList.fund_interest_type:'0'}}
										</view>
									</view> -->
									<view class="u-flex u-row-between u-m-t-16 w_100">
										<u-input v-model="hq_price" type="number"
											:placeholder="$t('最低申购额')+fastList.min_money" :custom-style="qh_style"
											@input="priceChange" />
										<image src="@/static/images/pc/fcar-kuery.png"
											style="width: 23px;margin: 0 12px;" mode="widthFix"></image>
										<u-input v-model="hq_price_dis" type="number"
											:placeholder="$t(fundConfig.token_name)" :custom-style="qh_style2"
											:disabled="true" />
									</view>
									<!-- <view class="u-m-t-16">
									<view class="m-font-b">{{$t('平台福利')}}</view>
									<view class="u-flex u-row-between fuli-select">
										<view>充值卷LV1</view>
										<view class="iconfont icon-down"></view>
									</view>
								</view> -->
									<view class="fund-btn"
										@click="fastList.fund_type == 1 ? fundSubmit(hq_price) : ding_fundSubmit()">
										{{$t('申购')}}
									</view>
								</view>
								<view class="u-m-t-26 og-list">
									<view class="og-list-item" v-for="(item,index) in huo_fundList"
										:key="`huo_fundList${index}`">
										<view class="u-flex u-row-between">
											<view class="u-flex">
												<view class="m-font-b">{{item.type == 1 ? $t('赎回') : $t('申购')}}</view>
												<view class="site-head-item u-m-l-12">
													{{item.f_type == 1 ? $t('活期') : $t('定期')}}
												</view>
											</view>
											<view class="u-flex">
												<view class="">{{$t('订单')}}: </view>
												<view class="u-m-l-12">{{item.order_sn}}</view>
											</view>
										</view>
										<view class="u-flex u-row-between">
											<view class="u-c-9">{{$t('数量')}}</view>
											<!-- <view class="">{{$t('预估年利率')}}</view> -->
										</view>
										<view class="u-flex u-row-between">
											<view class="">{{item.price}} {{$t(fundConfig.token_name)}}</view>
											<!-- <view class="">1.4%</view> -->
										</view>
										<view class="u-c-9 u-m-t-14">{{item.add_time}}</view>
									</view>
								</view>
							</template>
							<template v-if="currentFoot == 1">
								<view class="og-card2">
									<view class="u-flex flex--direction u-row-center">
										<view class="m-c-w m-font-14 m-font-b">{{$t('总资产')}}</view>
										<view class="m-c-w m-font-22 m-font-b">{{userFund.live_fund_money}}</view>
									</view>
									<view class="u-flex u-row-between w_100 u-m-t-20">
										<view class="u-flex u-row-center flex--direction w_50">
											<view class="m-c-w">{{$t('持有收益')}}</view>
											<view class="u-c-g u-m-t-10">{{userFund.hold_income}}</view>
										</view>
										<view style="width: 1px;height: 35px;background-color: #fff;"></view>
										<view class="u-flex u-row-center flex--direction w_50">
											<view class="m-c-w">{{$t('累计收益')}}</view>
											<view class="u-c-g u-m-t-10">{{userFund.total_income}}</view>
										</view>
									</view>
								</view>
								<view class="og-list-item" v-for="(item,index) in fundOrderList"
									:key="`fundOrderList${index}`" @click="fundOrderListChange(item)">
									<view class="u-flex">
										<view class="m-font-b">{{item.type == 1 ? $t('活期') : $t('定期')}}</view>
										<view class="site-head-item u-m-l-12">{{item.few_days+$t('天')}}</view>
									</view>
									<view class="u-flex u-row-between w_100 u-m-t-20">
										<view class="w_33">
											<view class="u-c-9">{{$t('数量')}}</view>
											<view class="u-m-t-8">{{item.price}} {{$t(fundConfig.token_name)}}</view>
										</view>
										<view class="u-text-center w_33">
											<view class="u-c-9">{{$t('预估年利率')}}</view>
											<view class="u-m-t-8">{{item.interest_type}}%</view>
										</view>
										<view class="u-text-right w_33">
											<view class="u-c-9">{{$t('预计总收益')}}</view>
											<view class="u-m-t-8 m-c-o">{{item.all_earnings}}
												{{$t(fundConfig.token_name)}}
											</view>
										</view>
									</view>
								</view>
							</template>
						</view>
					</view>
					<view class="og-footer u-flex u-row-between">
						<view class="w_50 u-flex flex--direction u-row-center" @click="currentFootChange(0)">
							<image src="@/static/images/pc/fund-footer-a.png" style="width: 25px;" mode="widthFix"
								v-if="currentFoot == 0"></image>
							<image src="@/static/images/pc/fund-footer.png" style="width: 25px;" mode="widthFix" v-else>
							</image>
							<view class="u-m-t-8" :class="currentFoot == 0 ? 'm-c-b' : ''">{{$t('9L理财')}}</view>
						</view>
						<view class="w_50 u-flex flex--direction u-row-center" @click="currentFootChange(1)">
							<image src="@/static/images/pc/fund-footer-2a.png" style="width: 25px;" mode="widthFix"
								v-if="currentFoot == 1"></image>
							<image src="@/static/images/pc/fund-footer-2.png" style="width: 25px;" mode="widthFix"
								v-else>
							</image>
							<view class="u-m-t-8" :class="currentFoot == 1 ? 'm-c-b' : ''">{{$t('我的持仓')}}</view>
						</view>
					</view>
				</view>
				<pcBg></pcBg>
			</view>
		</template>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10999">
		</u-top-tips>
		<u-popup v-model="huo_fundOutSetPop" mode="bottom" borderRadius="16" @close="closeSet"
			:mask-custom-style="uPopMaskCustomStyle">
			<view class="bs-popup " style="width: 100%;">
				<view class="bs-popup-hd">{{$t('定期')}}
					<view class="iconfont icon-close" @click="closeFundOutSetPop()"></view>
				</view>
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
							<u-tabs active-color="#ffffff" inactive-color="#ffffff" bg-color="none" :show-bar="false"
								:list="wtlist" :current="wtcurrent" @change="wtchange" height="64" font-size="24">
							</u-tabs>
						</view>
					</view>
					<view class="u-flex wt-fund-row">
						<view class="flex_bd">
							<view class="wt-label u-flex u-row-between u-m-b-20 skin-text">
								<view class="tt">{{$t('转入金额')}}</view>
							</view>
							<u-input :placeholder="$t('请输入转入金额')" height="80" v-model="rechargePrice" type="number"
								:clearable="false" :customStyle="customStyle" />
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
							<view class="btn btn-green" @click="openFundPopup_into_ding">
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
					<view class="bs-foot-button flex-center">
						<view @click="closeFundOutSetPop()" class="btn btn--gray ">
							{{$t('public5')}}
						</view>
						<view @click="ding_fundSubmit" class="btn btn--default">
							{{$t('public6')}}
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
		<u-popup v-model="fundPopup_into" mode="bottom">
			<view class="bs-popup bs-center-popup">
				<view class="bs-popup-hd">{{$t('活期')}}
					<view class="iconfont icon-close" @click="closeOpenFundPopup_into()"></view>
				</view>
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
					<view class="bs-foot-button flex-center">
						<view @click="closeOpenFundPopup_into()" class="btn btn--gray ">
							{{$t('public5')}}
						</view>
						<view @click="fundSubmit(huo_into_price)" class="btn btn--submit">
							{{$t('public6')}}
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 活期转出金额 -->
		<u-popup v-model="fundPopup_out" mode="bottom">
			<view class="bs-popup ">
				<view class="bs-popup-hd">{{$t('活期')}}
					<view class="iconfont icon-close" @click="closeOpenFundPopup_out()"></view>
				</view>
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
					<view class="bs-foot-button flex-center">
						<view @click="closeOpenFundPopup_out()" class="btn btn--gray ">
							{{$t('public5')}}
						</view>
						<view @click="setFundPrice(huo_out_price)" class="btn btn--default">
							{{$t('public6')}}
						</view>
					</view>
				</view>
			</view>
		</u-popup>

		<!-- 定期转入金额 -->
		<u-popup v-model="fundPopup_ding_into" mode="bottom">
			<view class="bs-popup ">
				<view class="bs-popup-hd">{{$t('定期')}}
					<view class="iconfont icon-close" @click="closeFundPopup_into_ding()"></view>
				</view>
				<view class="bs-popup-body">
					<view class="wt-form_row">
						<view class="wt-label u-flex u-row-between u-m-b-20 skin-text">
							{{$t('转入金额')}}
						</view>
						<u-input :placeholder="$t('请输入转入金额')" height="80" v-model="ding_into_price" type="number"
							:clearable="false" :customStyle="customStyle" />
					</view>
					<view class="wt-form_row u-m-t-30">
						<view class="wt-label u-flex u-row-between u-m-b-20 skin-text">
							{{$t('提现密码')}}
						</view>
						<u-input :placeholder="$t('请输入提现密码')" height="80" v-model="withdrawal_psd" maxlength=6
							type="password" :clearable="false" :customStyle="customStyle" />
					</view>
					<view class="bs-foot-button flex-center">
						<view @click="closeFundPopup_into_ding()" class="btn btn--gray ">
							{{$t('public5')}}
						</view>
						<view @click="fundSubmit(ding_into_price)" class="btn btn--default">
							{{$t('public6')}}
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 定期转出金额 -->
		<u-popup v-model="fundPopup_ding_out" mode="bottom">
			<view class="bs-popup ">
				<view class="bs-popup-hd">{{$t('定期')}}
					<view class="iconfont icon-close" @click="closeFundPopup_out_ding()"></view>
				</view>
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

					<view class="bs-foot-button flex-center">
						<view @click="closeFundPopup_out_ding()" class="btn btn--gray ">
							{{$t('public5')}}
						</view>
						<view @click="setFundPrice(ding_out_price)" class="btn btn--default">
							{{$t('public6')}}
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


		<!-- 基金简介 -->
		<u-popup v-model="infoPop" mode="bottom" border-radius="20">
			<view class="bs-popup">
				<view class="bs-popup-hd u-flex u-row-between">
					<view>{{$t('9L简介')}}</view>
					<view class="iconfont icon-close " @click="infoPop = false"></view>
				</view>
				<view class="bs-popup-bd">
					<!-- <view>{{$t('9LInfo')}}</view> -->
					<scroll-view class="turntable-container-scroll" scroll-y="true">
						<!-- <view class="bs-popup-body m-c-w" v-html="rule"></view> -->
						<!-- <view class="art-body" :v-html="$t('turntable-rule-'lotteryConfig[turnCount].id)"></view> -->
						<image :src="$t('9LInfo')" mode="widthFix" style="width: 100%"></image>
					</scroll-view>
				</view>
			</view>
		</u-popup>

		<!-- 详情 -->
		<u-popup v-model="fundOrderPop" mode="bottom" borderRadius="20">
			<view class="bs-popup">
				<view class="bs-popup-hd u-flex u-row-between">
					<view>{{fundOrderData.type == 1 ? $t('活期') : $t('定期')}}</view>
					<view class="iconfont icon-close " @click="fundOrderPop = false"></view>
				</view>
				<view class="bs-popup-body">
					<view class="u-flex u-row-between u-m-t-20">
						<view>{{$t('总余额')}}</view>
						<view>{{$t(fundOrderData.price)}}</view>
					</view>
					<view class="u-flex u-row-between u-m-t-20">
						<view>{{$t('参考年化')}}</view>
						<view>{{$t(fundOrderData.interest_type)}}%</view>
					</view>
					<view class="u-flex u-row-between u-m-t-20">
						<view>{{$t('锁仓期限')}}</view>
						<view>{{$t(fundOrderData.few_days)}}</view>
					</view>
					<view class="u-flex u-row-between u-m-t-20">
						<view>{{$t('申购日期')}}</view>
						<view>{{$t(fundOrderData.add_time)}}</view>
					</view>
					<view class="u-flex u-row-between u-m-t-20">
						<view>{{$t('计息开始日')}}</view>
						<view>{{$t(fundOrderData.fund_start_time)}}</view>
					</view>
					<view class="u-flex u-row-between u-m-t-20">
						<view>{{$t('计息结束日')}}</view>
						<view>{{$t(fundOrderData.fund_end_time)}}</view>
					</view>
					<!-- <view class="u-flex u-row-between u-m-t-20">
					<view>{{$t('计息天数')}}</view>
					<view>{{$t(fundOrderData.few_days)}}</view>
				</view> -->
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import uniNavFooter from '@/components/uni-foot-bar/uni-foot-bar.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			uniNavFooter,
			pcBg,
			listEmpty,
			pcNavHeader
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
					color: 'var(--navbar-color)',
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
				queryIndex: 2,
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
						text: this.$t("OG理财")
					},
					{
						value: 1,
						text: this.$t("我的持仓")
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
				// new
				hq_price: '',
				hq_price_dis: '',
				qh_style: {
					backgroundColor: '#1E1739',
					borderRadius: '20px',
					paddingLeft: '10px',
					borderColor:"#644CBC",
					color:"#ffffff"
				},
				qh_style2: {
					backgroundColor: '#1E1739',
					borderRadius: '20px',
					paddingLeft: '10px',
					borderColor:"#644CBC",
					color:"#ffffff"
				},
				currentFoot: 0,
				infoPop: false,
				fundConfig: {},
				fundOrderList: [],
				fundOrderData: {},
				fundOrderPop: false
			}
		},
		async onLoad(e) {
			this.getSavingsFundsFundList();
			this.getSavingsFundsList('add'); //活期记录列表
			this.getSavingsFundsGetFundOrderList();
			this.getUserFund();
			this.current = e.current;
			// if (this.current == 0) {
			// 	this.queryIndex = 2;
			// 	await this.getUserFund();
			// } else if (this.current == 1) {
			// 	this.queryIndex = 1;
			// }
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
			scrolltolowerChnage() {
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
			priceChange(i) {
				this.hq_price_dis = i *= this.fundConfig.exchange;
			},
			// 获取基金列表
			async getSavingsFundsFundList() {
				let res = await this.$u.api.savings_funds_fund_list_p({
					page: 1,
					limit: 20
				});
				if (res && res.code == 1) {
					let arr = res.data.fund;
					this.fundConfig = res.data.fund_config
					if (arr.length > 0) {
						this.wtlist = arr;
						this.fastList = res.data.fund[0];
						this.fund_id = res.data.fund[0].id;
					}
				}
			},
			//获取活期账变记录
			async getSavingsFundsList(add) {
				uni.showLoading({
					title: this.$t('loading')
				})
				let res = await this.$u.api.savings_funds_mx_list_p({
					page: this.huo_p,
					limit: 10,
					f_type: 0
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
			// 定期申购
			async ding_fundSubmit() {
				if (!this.hq_price) {
					this.$refs.uTips.show({
						title: this.$t('请输入余额')
					});
					return
				}
				uni.showLoading({
					title: this.$t('loading')
				});
				let param = {};
				if (this.queryIndex == 2) {
					param = {
						price: this.hq_price,
						fund_id: this.fund_id
						// records_id 加息卷id
					};
				}
				let res = await this.$u.api.savings_funds_fund_apply_p(param);
				if (res.code == 1) {
					this.hq_price = '';
					this.hq_price_dis = '';
					this.huo_p = 1;
					this.huo_fundList = [];
					this.getSavingsFundsList('add'); //活期记录列表
					this.$refs.header.headUserBan();
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
				} else {
					this.hq_price = '';
					this.hq_price_dis = '';
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
				}
				uni.hideLoading();
			},
			currentFootChange(i) {
				this.currentFoot = i;
			},
			// 投资记录
			async getSavingsFundsGetFundOrderList() {
				let res = await this.$u.api.savings_funds_get_fund_order_list_p({
					f_status: 'all',
					page: 1,
					limit: 10
				});
				if (res && res.code == 1) {
					console.log(res, 'res');
					this.fundOrderList = res.data;
				}
			},
			fundOrderListChange(i) {
				this.fundOrderData = i;
				this.fundOrderPop = true;
			},
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
					// type: this.queryIndex
					type: '1'
				});
				if (res) {
					uni.hideLoading();
					this.userFund = res.data;
				}
			},
			goSetPwd() {
				this.$go('/pages/ucenter/profile?setpwd=' + true);
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
					this.huo_fundList = [];
					this.getSavingsFundsList('add'); //活期记录列表
				}
				this.userFund = {};
				this.getUserFund();
			},
			// 用户转入基金
			async fundSubmit(price) {
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.savings_funds_transfer_in_p({
					type: '1',
					withdrawal_psd: this.withdrawal_psd,
					price
				});
				if (res.code == 1) {
					this.closeOpenFundPopup_into();
					this.huo_into_price = '';
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
				this.hq_price = '';
				this.hq_price_dis = '';
				this.fastList = {};
				this.wtcurrent = index;
				this.fastList = this.wtlist[index];
				this.fund_id = this.wtlist[index].id;
			}
		}
	}
</script>

<style lang="scss">
	.game-tabs {
		margin-bottom: 15px;
		height: 68rpx;
		box-sizing: content-box;
		border-bottom: 2px solid #4D4886;
		::v-deep .u-tab-bar{
			background-color: #E9AE3A!important;
			border-radius: 6px 6px 0 0!important;
			box-shadow: 1px -3px 6px #FFB80080;
			margin-bottom:-1px;
		}
	}
	.mar-panel {
		padding-bottom: 80px;

		.mar-panel-bg {
			background: #312B4F;
			margin: 0 -15px -15px;
			padding: 15px;
			border-radius: 16px 16px 0 0;
			min-height: calc(100vh - 205px);
		}
	}

	.site-head-item {
		color: #fff;
		padding: 3px 15px;
		border-radius: 20px;
		margin-right: 5px;
		background-color: #E9AE3A;
	}

	.m-c-g {
		color: #61DF3B;
	}

	.left-icon {
		color: #fff;
		padding: 2px 3px;
		margin-right: 5px;
		border-radius: 5px;
		background-color: #7B75E2;
	}

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

		.btn {
			width: calc(50% - 10px);
		}
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

	.og-card {
		padding: 20px;
		border-radius: 10px;
		box-shadow: var(--card-shadow);
		background-color: #413D71;
	}

	.og-card2 {
		background: #2F3E8C;
		padding: 20px 20px 40px 20px;
		min-height: 100px;
		background-size: 100% 100%;
		border-radius: 10px;
		box-shadow: var(--card-shadow);
		background-repeat: no-repeat;
	}

	.pc-og-card2 {
		padding: 20px 20px 40px 20px;
		min-height: 100px;
		background-image: url('@/static/images/pc/pc-fund-car2.png');
		background-size: cover;
		border-radius: 10px;
		box-shadow: var(--card-shadow);
		background-repeat: no-repeat;
	}

	.m-c-o {
		color: #E78531;
	}

	.m-c-b {
		color: #3270E0;
	}

	.fuli-select {
		margin-top: 10px;
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 10px;

		.icon-down {
			transform: scale(.7);
			color: #B2B2B2;
		}
	}

	.fund-btn {
		color: #fff;
		margin-top: 15px;
		padding: 10px 15px;
		text-align: center;
		border-radius: 10px;
		background-color: #E9AE3A;
	}

	.og-list-item {
		padding: 15px;
		margin-top: 15px;
		border-radius: 10px;
		background-color: #413D71;
		box-shadow: var(--card-shadow);
	}

	.content {
		position: relative;
	}

	.og-footer {
		padding: 8px 0;
		height: 65px;
		border-top: 1px solid rgb(77, 72, 134);
		background: rgba(16, 22, 44, 0.95) !important;
		box-shadow: 0px -4px 38px 0px rgba(255, 255, 255, 0.1);
		overflow: hidden;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}


	.left-select {
		height: calc(100vh - 120px);
		// background-image: var(--help-left-select-bg);
		background-image: linear-gradient(175deg, #162754, #0D1735);
	}

	.left-select .left-select-item {
		padding: 15px 5px 15px 30px;
	}

	.left-select .left-select-active-item {
		background-color: var(--left-select-active-item-bg);
	}

	.right-text {
		background-color: #f5f0f0;
		height: calc(100vh - 120px);
		width: 100%;
		padding: 30px;
	}

	.pc-fund-top {
		padding: 30px 15% 15px;
		background-image: linear-gradient(175deg, #0F227B, #15339F);
	}
	
	.turntable-container-scroll {
		height: 300px;
	}
	
	.game-tabs-item {
		max-width: 80px;
	}
	
	.game-type {
		overflow: hidden;
		padding: 0 2px;
	}
	
	.game-type .game-tabs-item-name {
		width: 100%;
		animation: marquee-wrap 5s infinite linear;
	}
	
	.game-type .game-tabs-item-marquee {
		// font-weight: bold;
		float: left;
		white-space: nowrap;
		min-width: 100%;
		animation: marquee-content 5s infinite linear;
	}
	
	@keyframes marquee-wrap {
	
		0%,
		30% {
			transform: translateX(0);
		}
	
		70%,
		100% {
			transform: translateX(100%);
		}
	}
	
	@keyframes marquee-content {
	
		0%,
		30% {
			transform: translateX(0);
		}
	
		70%,
		100% {
			transform: translateX(-100%);
		}
	}
</style>
