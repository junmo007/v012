<template>
	<view>
		<template v-if="!mobile_common">
			<pcNavHeader ref="pcHeader"></pcNavHeader>
			<view class="pc-main u-flex">
				<pcSideBar :pageIndex="99" ref="pcSideBar"></pcSideBar>
				<view class="m-bg-w m-c-0 pc-main-right">
					<view class="m-font-b u-m-b-30">{{$t('user5')}}</view>
					<template v-if="isDataShow == 1">
						<view class="game-tabs">
							<u-tabs height="70" bar-height="0" bg-color="none" gutter="60" active-color="#ffffff"
								inactive-color="#ffffff" :list="withdrawList" :current="topTabsCurrent"
								@change="topTabsChange">
							</u-tabs>
						</view>
						<view class="wt-form">
							<uni-forms err-show-type="toast" ref="form" :modelValue="formData" :rules="rules"
								:label-width="280" :border="false" label-position="top">
								<uni-forms-item name="account" :label="$t('提现卡')">
									<view class="ac-select-bar">
										<view class="rec-select-flex" @click="rechShow">
											<view class="flex_bd">
												<view class="val m-line-1">{{withdrawCarName}}</view>
											</view>
											<view class="iconfont icon-down" style="transition: .3s all;"
												:style="rechcollapse?'transform: rotateZ(180deg);':'transform: rotateZ(0);'">
											</view>
										</view>
										<view class="select-collapse u-m-t-8" v-if="rechcollapse">
											<!-- 银行卡提现卡 -->
											<view class="ac-rec-row" v-for="(itm,ind) in allBank" :key="`allBank${ind}`"
												v-if="mShowStatus == 0"
												:class="[active_id == itm.id?'ac-rec-row-active':'']"
												@click="selectCarChange(itm)">
												<u-image width="30px" height="30px" borderRadius="8px"
													:src="$t('BankCardCashImg')">
													<u-loading slot="loading"></u-loading>
												</u-image>
												<view class="label m-line-1">
													{{itm.pay_type ==1||itm.pay_type ==2?itm.pay_name:itm.bank_name + `(${itm.bank_number})`}}
												</view>
											</view>
											<!-- USDT提现卡 -->
											<view class="ac-rec-row" v-for="(itm,ind) in allUsdt" :key="`allUsdt${ind}`"
												v-if="mShowStatus == 1"
												:class="[active_id == itm.id?'ac-rec-row-active':'']"
												@click="selectCarChange(itm)">
												<u-image width="30px" height="30px" borderRadius="8px"
													:src="$t('USDTCardCashImg')">
													<u-loading slot="loading"></u-loading>
												</u-image>
												<view class="label m-line-1">
													{{itm.pay_type ==1||itm.pay_type ==2?itm.pay_name:itm.bank_name + `(${itm.bank_number})`}}
												</view>
											</view>
											<!-- 电子钱包提现卡 -->
											<view class="ac-rec-row" v-for="(itm,ind) in allWallet"
												:key="`allWallet{ind}`" v-if="mShowStatus == 2"
												:class="[active_id == itm.id?'ac-rec-row-active':'']"
												@click="selectCarChange(itm)">
												<u-image width="30px" height="30px" borderRadius="8px"
													:src="$t('WalletCardCashImg')">
													<u-loading slot="loading"></u-loading>
												</u-image>
												<view class="label m-line-1">
													{{itm.pay_type ==1||itm.pay_type ==2?itm.pay_name:itm.bank_name + `(${itm.bank_number})`}}
												</view>
											</view>
											<!-- PIX提现卡 -->
											<view class="ac-rec-row" v-for="(itm,ind) in allPix" :key="`allPix${ind}`"
												v-if="mShowStatus == 3"
												:class="[active_id == itm.id?'ac-rec-row-active':'']"
												@click="selectCarChange(itm)">
												<u-image width="30px" height="30px" borderRadius="8px"
													:src="$t('PixCardCashImg')">
													<u-loading slot="loading"></u-loading>
												</u-image>
												<view class="label m-line-1">
													{{itm.pay_type ==1||itm.pay_type ==2?itm.pay_name:itm.bank_name + `(${itm.bank_number})`}}
												</view>
											</view>
										</view>
									</view>
								</uni-forms-item>
								<uni-forms-item name="price" :label="$t('提取金额')">
									<view class="w_100 u-flex">
										<view class="flex-1">
											<uni-easyinput type="number" v-model="rechargePrice" @input="rechargeInput"
												:placeholder='$t("请输入提取金额")' :disabled="isInput" :styles="styles" />
										</view>
										<template v-if="isUsdt == 1 && withdrawCarName != $t('请选择卡片')">
											<view class="u-m-l-20 withRate">{{withdrawal_rate}}</view>
										</template>
									</view>
									<template v-if="isUsdt == 1">
										<template v-if="currency_type == 1">
											<view class="u-m-t-10 u-font-xs text-orange">{{$t('到账金额')}}
												{{((rechargePrice - (rechargePrice * service_charge) / 100) * withdrawal_rate).toFixed(2) + currency_code}}
											</view>
										</template>
										<template v-else>
											<view class="u-m-t-10 u-font-xs text-orange">{{$t('到账金额')}}
												{{dzPrice + 'USDT'}}
											</view>
										</template>
									</template>
								</uni-forms-item>
							</uni-forms>


							<view class="w_100 u-flex quickBox u-flex-wrap" v-if="carQuick.length > 0">
								<view v-for="(item,index) in carQuick" :key="`${index}`+'quick'"
									class="u-m-t-20 u-m-r-20"
									:class="item == rechargePrice?'quickListActive_m':'quickList_m'"
									@click="showQuickListIndexBank(item)">
									<view class="m-rela">{{item}}</view>
								</view>
							</view>


							<!-- 汇率、到账 备份 -->
							<!-- <template v-if="isUsdt == 1">
							<view class="skin-text"> <text class="u-c-9">{{$t('当前汇率')}}：</text>
								{{withdrawal_rate}}
							</view>
							<template v-if="currency_type == 1">
								<view class="u-m-t-10 skin-text">
									<text class="u-c-9">{{$t('到账金额')}}：</text>：
									{{((rechargePrice - (rechargePrice * service_charge) / 100) * withdrawal_rate).toFixed(2) + currency_code}}
								</view>
							</template>
							<template v-else>
								<view class="u-m-t-10 skin-text">
									<text class="u-c-9">{{$t('到账金额')}}：</text>
									{{dzPrice + 'USDT'}}
								</view>
							</template>
						</template> -->
							<!-- <u-line margin="20px 0" border-style="dashed" color="var(--u-line-bg)" /> -->
							<view class="info-glod">
								<template v-if="formData.rpersent">
									<view class="u-m-t-20" v-if="formData.rpersent[0] > 0">
										<text class="u-c-9">{{$t('user74')}}:</text>
										<text class="u-m-l-8 skin-text">{{formData.rpersent}}</text>
									</view>
								</template>
								<view class="u-m-t-20">
									<text class="u-c-9">{{$t('user76')}}:</text>
									<text class="u-m-l-8 skin-text">{{formData.rnum}}</text>
								</view>
								<view class="u-m-t-20">
									<text class="u-c-9">{{$t('当前流水剩余')}}:</text>
									<text class="u-m-l-8 skin-text">{{deUserSavings}}</text>
								</view>
								<view class="u-m-t-20">
									<text class="u-c-9">{{$t('单笔提现最低')}}:</text>
									<text class="u-m-l-8 skin-text">{{formData.minimum}}</text>
								</view>
								<view class="u-m-t-20">
									<text class="u-c-9">{{$t('单笔提现最高')}}:</text>
									<text class="u-m-l-8 skin-text">{{formData.highest}}</text>
								</view>
							</view>
							<view class="wt-foot u-m-t-50">
								<view class="btn btn--submit" @click="verifyPayment">{{$t('确认提现')}}</view>
							</view>
							<u-line margin="20px 0" border-style="dashed" color="var(--u-line-bg)" />
							<view class="wt-tip">
								{{withdrawalRemarks}}
							</view>
						</view>
					</template>
					<template v-if="isDataShow == 0">
						<view class="p-t-120">
							<listEmpty :isDefault="true" fullLiftText="您还未添加银行卡!" class="u-bd-8" :listHighly='200'>
							</listEmpty>
							<view class="u-text-center">{{$t('')}}</view>
							<view class="u-m-t-50 u-flex u-row-center">
								<view class="noCarBtn" @click="common_back">{{$t('public5')}}</view>
								<view class="u-m-l-50 noCarBtn noCarBtn-yes" @click="$go('/pages/ucenter/bankCard')">
									{{$t('public6')}}
								</view>
							</view>
						</view>
					</template>
				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<template v-if="isDataShow == 1">
				<view class="content" :data-theme="themeMode">
					<view class="container">
						<uniNavHeader isback :title="$t('user5')" ref="header"></uniNavHeader>
						<view class="bs-wrapper-top">
							<view class="game-tabs">
								<u-tabs height="70" bar-height="0" bg-color="none" gutter="60" active-color="#ffffff"
									inactive-color="#ffffff" :list="withdrawList" :current="topTabsCurrent"
									@change="topTabsChange">
								</u-tabs>
							</view>
							<view class="dw-line"></view>
						</view>
						<view class="bs-wrapper-bottom">
							<view class="wt-form">
								<uni-forms err-show-type="toast" ref="form" :modelValue="formData" :rules="rules"
									:label-width="280" :border="false" label-position="top">
									<uni-forms-item name="account" :label="$t('提现卡')">
										<view class="ac-select-bar">

											<view class="rec-select-flex" @click="rechShow">
												<view class="flex_bd u-flex">
													<u-image width="30px" height="30px" borderRadius="8px"
														:src="$t('BankCardCashImg')"
														v-if="mShowStatus == 0 && bankid != 0 && bankid != null">
														<u-loading slot="loading"></u-loading>
													</u-image>
													<u-image width="30px" height="30px" borderRadius="8px"
														:src="$t('USDTCardCashImg')"
														v-if="mShowStatus == 1 && bankid != 0 && bankid != null">
														<u-loading slot="loading"></u-loading>
													</u-image>
													<u-image width="30px" height="30px" borderRadius="8px"
														:src="$t('WalletCardCashImg')"
														v-if="mShowStatus == 2 && bankid != 0 && bankid != null">
														<u-loading slot="loading"></u-loading>
													</u-image>
													<u-image width="30px" height="30px" borderRadius="8px"
														:src="$t('PixCardCashImg')"
														v-if="mShowStatus == 3 && bankid != 0 && bankid != null">
														<u-loading slot="loading"></u-loading>
													</u-image>
													<view class="val m-line-1 u-m-l-14">{{withdrawCarName}}</view>
												</view>
												<image src="@/static/images/dw/arror.png"
													style="width: 34px;height: 34px;transition: .3s all;"
													:style="rechcollapse?'transform: rotateZ(180deg);':'transform: rotateZ(0);'">
												</image>
											</view>

											<view class="select-collapse u-m-t-8" v-if="rechcollapse">
												<!-- 银行卡提现卡 -->
												<view class="ac-rec-row" v-for="(itm,ind) in allBank"
													:key="`allBank${ind}`" v-if="mShowStatus == 0"
													:class="[active_id == itm.id?'ac-rec-row-active':'']"
													@click="selectCarChange(itm)">
													<u-image width="30px" height="30px" borderRadius="8px"
														:src="$t('BankCardCashImg')">
														<u-loading slot="loading"></u-loading>
													</u-image>
													<view class="label m-line-1">
														{{itm.pay_type ==1||itm.pay_type ==2?itm.pay_name:itm.bank_name + `(${itm.bank_number})`}}
													</view>
												</view>
												<!-- USDT提现卡 -->
												<view class="ac-rec-row" v-for="(itm,ind) in allUsdt"
													:key="`allUsdt${ind}`" v-if="mShowStatus == 1"
													:class="[active_id == itm.id?'ac-rec-row-active':'']"
													@click="selectCarChange(itm)">
													<u-image width="30px" height="30px" borderRadius="8px"
														:src="$t('USDTCardCashImg')">
														<u-loading slot="loading"></u-loading>
													</u-image>
													<view class="label m-line-1">
														{{itm.pay_type ==1||itm.pay_type ==2?itm.pay_name:itm.bank_name + `(${itm.bank_number})`}}
													</view>
												</view>
												<!-- 电子钱包提现卡 -->
												<view class="ac-rec-row" v-for="(itm,ind) in allWallet"
													:key="`allWallet{ind}`" v-if="mShowStatus == 2"
													:class="[active_id == itm.id?'ac-rec-row-active':'']"
													@click="selectCarChange(itm)">
													<u-image width="30px" height="30px" borderRadius="8px"
														:src="$t('WalletCardCashImg')">
														<u-loading slot="loading"></u-loading>
													</u-image>
													<view class="label m-line-1">
														{{itm.pay_type ==1||itm.pay_type ==2?itm.pay_name:itm.bank_name + `(${itm.bank_number})`}}
													</view>
												</view>
												<!-- PIX提现卡 -->
												<view class="ac-rec-row" v-for="(itm,ind) in allPix"
													:key="`allPix${ind}`" v-if="mShowStatus == 3"
													:class="[active_id == itm.id?'ac-rec-row-active':'']"
													@click="selectCarChange(itm)">
													<u-image width="30px" height="30px" borderRadius="8px"
														:src="$t('PixCardCashImg')">
														<u-loading slot="loading"></u-loading>
													</u-image>
													<view class="label m-line-1">
														{{itm.pay_type ==1||itm.pay_type ==2?itm.pay_name:itm.bank_name + `(${itm.bank_number})`}}
													</view>
												</view>
											</view>
										</view>
									</uni-forms-item>
									<uni-forms-item name="price" :label="$t('提取金额')">
										<view class="w_100 u-flex">
											<view class="flex-1">
												<uni-easyinput type="number" v-model="rechargePrice"
													@input="rechargeInput" :placeholder="$t('请输入提取金额')" :disabled="isInput" :styles="styles" />
											</view>
											<template v-if="isUsdt == 1 && withdrawCarName != $t('请选择卡片')">
												<view class="u-m-l-20 withRate">1 : {{withdrawal_rate}}</view>
											</template>
										</view>
										<!-- <template v-if="isUsdt == 1"> -->
										<template v-if="currency_type == 1">
											<view class="u-m-t-14">{{$t('到账金额')}}
												{{((rechargePrice - (rechargePrice * service_charge) / 100) * withdrawal_rate).toFixed(2) + (currency_code?currency_code:'')}}
											</view>
										</template>
										<template v-else>
											<view class="u-m-t-14">{{$t('到账金额')}}
												{{dzPrice + (currency_code?currency_code:'')}}
											</view>
										</template>
										<!-- </template> -->
									</uni-forms-item>
								</uni-forms>


								<view class="w_100 u-flex u-flex-wrap u-m-b-20" v-if="carQuick.length > 0">
									<view v-for="(item,index) in carQuick" :key="`${index}`+'quick'" class="u-m-10"
										:class="item == rechargePrice?'quickListActive_m':'quickList_m'"
										@click="showQuickListIndexBank(item)">
										<view class="m-rela">{{item}}</view>
									</view>
								</view>


								<!-- <u-line margin="20px 0" border-style="dashed" color="var(--u-line-bg)" /> -->
								<view class="wt-tip">
									<template v-if="formData.rpersent">
										<view v-if="formData.rpersent[0] > 0">
											<text class="u-c-g">{{$t('user74')}}:</text>
											<text class="u-m-l-8 m-c-w">{{formData.rpersent}}</text>
										</view>
									</template>
									<view :class="formData.rpersent[0] > 0?'u-m-t-20':''">
										<text class="u-c-g">{{$t('user76')}}:</text>
										<text class="u-m-l-8 m-c-w">{{formData.rnum}}</text>
									</view>
									<view class="u-m-t-20">
										<text class="u-c-g">{{$t('当前流水剩余')}}:</text>
										<text class="u-m-l-8 m-c-w">{{deUserSavings}}</text>
									</view>
									<view class="u-m-t-20">
										<text class="u-c-g">{{$t('单笔提现最低')}}:</text>
										<text class="u-m-l-8 m-c-w">{{mShowStatus == 1 ? formatCurrency(withdrawlimit.usdt_min_amount) : formatCurrency(formData.minimum)}}</text>
									</view>
									<view class="u-m-t-20">
										<text class="u-c-g">{{$t('单笔提现最高')}}:</text>
										<text class="u-m-l-8 m-c-w">{{mShowStatus == 1 ? formatCurrency(withdrawlimit.usdt_max_amount) : formatCurrency(formData.highest)}}</text>
									</view>
								</view>
								<view class="wt-foot u-m-t-50">
									<view class="btn btn--submit m-font-18" @click="verifyPayment">{{$t('确认提现')}}</view>
								</view>
								<!-- <u-line margin="20px 0" border-style="dashed" color="var(--u-line-bg)" /> -->
								<view class="wt-tip" v-if="withdrawalRemarks">
									{{withdrawalRemarks}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</template>
			<template v-if="isDataShow == 0">
				<uniNavHeader :title="$t('user5')" ref="header"></uniNavHeader>
				<view class="p-t-120">
					<listEmpty :isDefault="true" fullLiftText="您还未添加银行卡!" class="u-bd-8" :listHighly='200'>
					</listEmpty>
					<view class="u-text-center">{{$t('')}}</view>
					<view class="u-m-t-50 u-flex u-row-center">
						<view class="noCarBtn" @click="common_back">{{$t('public5')}}</view>
						<view class="u-m-l-50 noCarBtn noCarBtn-yes" @click="$go('/pages/ucenter/bankCard')">
							{{$t('public6')}}
						</view>
					</view>
				</view>
			</template>
		</template>

		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
		</u-top-tips>
		<!-- 请输入支付密码 -->
		<u-popup mode="center" v-model="show" :closeable="true" :mask-close-able="closeAble" borderRadius="32"
			:mask-custom-style="uPopMaskCustomStyle">
			<view class="bs-popup bs-center-popup" style="background: transparent;">
				<view class="bs-popup-hd navbar-color" style="font-size:14px;justify-content: center;">
					{{$t('user22')}}
				</view>
				<view class="u-text-center u-m-t-20 m-font-b m-font-20">
					{{bankType == 1 ? $t('USDTCurUnit') : $t('CurUnit')}} {{rechargePrice}}
				</view>
				<view class="bs-popup-body">
					<uMessageInput @finish="finish" name="withdrawal_psd" :maxlength="6" width="70"
						activeColor="rgb(242, 163, 9)" :disabled-keyboard="false" :dot-fill="true" :focus="true"
						:breathe="true"></uMessageInput>
				</view>
			</view>
		</u-popup>

		<!-- 设置支付密码 -->
		<!-- <uni-popup ref="withdrawal_psd_popup" type="center">
			<view class="bs-popup bs-center-popup userpwd">
				<view class="u-text-center navbar-color">{{$t('设置提现密码')}}</view>
				<uni-forms err-show-type="toast" ref="pform" :modelValue="add_withdrawal_pwd" :label-width="86">
					<uni-forms-item :label="$t('请输入登录密码')" name="logo_pwd" labelPosition="top" labelWidth=450>
						<uni-easyinput :clearable="false" type="password" v-model="add_withdrawal_pwd.logo_pwd"
							style="color: var(--navbar-color);" :placeholder="$t('请输入登录密码')" />
					</uni-forms-item>
					<uni-forms-item :label="$t('设置提现密码')" name="add_w_pwd" labelPosition="top" labelWidth=450>
						<uni-easyinput :clearable="false" type="number" v-model="add_withdrawal_pwd.add_w_pwd"
							style="color: var(--navbar-color);" maxlength="6" :placeholder="$t('请输入提现密码')" />
					</uni-forms-item>
				</uni-forms>
				<view class="u-text-right">
					<button type="default" @click="setUpWithdrawal_pwd()" class="btn btn--default">{{$t('设置')}}</button>
				</view>
			</view>
		</uni-popup> -->


		<!-- <uni-popup ref="withdrawal_psd_popup" mode="bottom">
			<view class="bs-popup pc_pop">
				<view class="bs-popup-hd">
					<view class="tt m-c-w">{{$t('设置提现密码')}}</view>
				</view>
				<view class="bs-popup-body">
					<uni-forms err-show-type="toast" ref="pform" :modelValue="add_withdrawal_pwd" :label-width="86">
						<uni-forms-item :label="$t('请输入登录密码')" name="logo_pwd" labelPosition="top" labelWidth=450>
							<uni-easyinput :clearable="false" type="password" v-model="add_withdrawal_pwd.logo_pwd"
								style="color: var(--navbar-color);" :placeholder="$t('请输入登录密码')" />
						</uni-forms-item>
						<uni-forms-item :label="$t('设置提现密码')" name="add_w_pwd" labelPosition="top" labelWidth=450>
							<uni-easyinput :clearable="false" type="password" v-model="add_withdrawal_pwd.add_w_pwd"
								style="color: var(--navbar-color);" maxlength="6" :placeholder="$t('请输入提现密码')" />
						</uni-forms-item>
					</uni-forms>
					<view @click="setUpWithdrawal_pwd" class="u-p-30 u-text-center btn--submit w_100 u-m-t-30 m-line-1 m-font-18">
						{{$t('设置')}}</view>
				</view>
			</view>
		</uni-popup> -->

		<u-popup v-model="withdrawal_psd_popup" mode="bottom" :mask-custom-style="uPopMaskCustomStyle" borderRadius="32"
			z-index="10001">
			<view class="bs-popup pc_pop">
				<view class="bs-popup-hd">
					<view class="tt m-c-w">{{$t('设置提现密码')}}</view>
					<image src="@/static/images/index/close.png"
						style="width: 32px;height: 32px;position: absolute;right: 15px;" mode=""
						@click="withdrawal_psd_popup = false">
					</image>
				</view>
				<view class="bs-popup-body">
					<uni-forms err-show-type="toast" ref="pform" :modelValue="add_withdrawal_pwd" :label-width="86">
						<uni-forms-item :label="$t('请输入登录密码')" name="logo_pwd" labelPosition="top" labelWidth=450>
							<uni-easyinput :clearable="false" type="password" v-model="add_withdrawal_pwd.logo_pwd"
								style="color: var(--navbar-color);" :placeholder="$t('请输入登录密码')" />
						</uni-forms-item>
						<uni-forms-item :label="$t('设置提现密码')" name="add_w_pwd" labelPosition="top" labelWidth=450>
							<uni-easyinput :clearable="false" type="password" v-model="add_withdrawal_pwd.add_w_pwd"
								style="color: var(--navbar-color);" maxlength="6" :placeholder="$t('请输入提现密码')" />
						</uni-forms-item>
					</uni-forms>
					<view @click="setUpWithdrawal_pwd"
						class="u-p-30 u-text-center btn--submit w_100 u-m-t-30 m-line-1 m-font-18">
						{{$t('设置')}}
					</view>
				</view>
			</view>
		</u-popup>

		<!-- 支付密码提示-->
		<u-modal v-model="show_modal_pwd" :title="$t('提示')" :content="$t('wpsd1')" :confirm-text="$t('public6')"
			:cancel-text="$t('public5')" :show-cancel-button="true" @confirm="showWith_pop" borderRadius="32"
			:titleStyle="{color: '#fff'}" :contentStyle="{color: '#fff'}" :confirmStyle="{color: '#E9AE3A'}">
		</u-modal>


		<!-- 开启绑定邮箱-需邮箱验证 -->
		<uni-popup ref="mailPopup" type="center">
			<view class="bs-popup bs-center-popup">
				<view class="bs-popup-hd navbar-color">{{$t('提现')}}
					<view class="iconfont icon-close" @click="mailPopupClose"></view>
				</view>
				<view class="bs-popup-body">
					<view class="u-p-b-30">
						<uni-easyinput class="u-m-t-20" maxlength="6" type="password" :placeholder="$t('提现密码')"
							v-model="w_psd" />
						<!-- 邮箱验证 -->
						<template v-if="phoneEmilStyleStatus == 1">
							<view class="u-m-t-50 navbar-color">{{userInfo_common.mail2}}</view>
							<view class="u-m-t-10 u-flex">
								<uni-easyinput type="number" :placeholder="$t('请输入邮箱验证码')" v-model="mailCode" />
								<view>
									<u-button @tap="getMailCode()"
										style="height: 50px;background-color: rgba(233, 174, 58, 1);" type="primary"
										class="u-m-l-30 phoneCodeBtn">
										{{$t(mailCodeText)}}
									</u-button>
									<u-verification-code seconds="60" ref="mailCodeKey" @change="mailCodeChange"
										:start-text="$t('获取验证码')" :end-text="$t('rep_sned')" change-text="XS">
									</u-verification-code>
								</view>
							</view>
						</template>
						<!-- 手机验证 -->
						<template v-if="phoneEmilStyleStatus == 2">
							<view class="u-m-t-50 navbar-color">{{userInfo_common.phone}}</view>
							<view class="u-m-t-20 u-flex">
								<uni-easyinput type="number" :placeholder="$t('请输入手机验证码')" v-model="phoneCode" />
								<u-button @tap="getPhoneCode()"
									style="height: 50px;background-color: rgba(233, 174, 58, 1);" type="primary"
									class="u-m-l-20 phoneCodeBtn">
									{{$t(phoneCodeText)}}
								</u-button>
								<u-verification-code seconds="60" ref="phoneCodeKey" @change="phoneCodeChange"
									:start-text="$t('获取验证码')" :end-text="$t('rep_sned')" change-text="XS">
								</u-verification-code>
							</view>
						</template>
						<view class="u-text-center u-m-t-16">
							<text class="navbar-color">{{phoneEmilStyleStatus==1?$t('邮箱无法使用'):$t('手机无法使用')}}？</text>
							<text class="skin-color cur_pointer"
								@click="$go('/pages/ucenter/kefu')">{{$t('联系客服')}}</text>
						</view>
					</view>
					<view class="bs-foot-button flex-center justify-center">
						<view @click="withdrawEmail" class="btn btn--default">{{$t('public6')}}</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- 绑定邮箱/手机-->
		<u-popup v-model="mailPopup_two" mode="center" borderRadius="40" :mask-custom-style="uPopMaskCustomStyle">
			<view class="bs-popup bs-center-popup">
				<view class="bs-popup-hd navbar-color">{{phoneEmilStyleStatus == 1?$t('绑定邮箱'):$t('绑定手机')}}
					<view class="iconfont icon-close" @click="mailPopupClose_two"></view>
				</view>
				<view class="bs-popup-body">
					<view class="u-text-center">
						<!-- <image class="onEditImg"
						:src="phoneEmilStyleStatus == 1?'../../static/images/editInfo/onMail.png':'../../static/images/editInfo/onPhone.png'"
						mode="">
					</image> -->
						<!-- <view>{{phoneEmilStyleStatus == 1?$t('未绑定邮箱'):$t('未绑定手机')}}</view> -->
						<view class="u-m-b-26 navbar-color">
							<h3>{{phoneEmilStyleStatus == 1?$t('请绑定邮箱'):$t('请绑定手机')}}</h3>
						</view>
					</view>
					<!-- 绑定邮箱 -->
					<template v-if="phoneEmilStyleStatus == 1">
						<view class="u-m-t-30 u-p-b-30">
							<uni-easyinput class="u-m-t-20" type="text" :placeholder="$t('请输入邮箱')" v-model="mail_two" />
							<view class="u-m-t-20 u-flex">
								<uni-easyinput type="number" :placeholder="$t('请输入邮箱验证码')" v-model="mailCode_two" />
								<u-button @tap="getMailCode_two()"
									style="height: 50px;background-color: rgba(233, 174, 58, 1);border-radius: 16px;"
									type="primary" class="u-m-l-30 phoneCodeBtn">
									{{$t(mailCodeText_two)}}
								</u-button>
								<u-verification-code seconds="60" ref="mailCodeKey_two" @change="mailCodeChange_two"
									:start-text="$t('获取验证码')" :end-text="$t('rep_sned')" change-text="XS">
								</u-verification-code>
							</view>
						</view>
					</template>
					<!-- 绑定手机 -->
					<template v-if="phoneEmilStyleStatus == 2">
						<view class="w_100 u-flex u-row-between u-m-t-50">
							<view style="width: 23%;" class="phoneSelect">
								<quSelect class="quSelectStyle" ref="easySelect" size="mini" :value="'+'+ selecQu"
									@selectOne="selectQhao" :options="quOptions">
								</quSelect>
							</view>
							<view style="width: 75%;">
								<uni-easyinput type="number" v-model="phoneBank" :placeholder="$t('请输入手机号码')" />
							</view>
						</view>
						<view class="u-flex u-m-t-20">
							<uni-easyinput type="number" :placeholder="$t('请输入手机验证码')" v-model="phoneCode_two" />
							<u-button @tap="getPhoneCode_two()"
								style="height: 50px;background-color: rgba(233, 174, 58, 1);border-radius: 16px;"
								type="primary" class="u-m-l-20 phoneCodeBtn">
								{{$t(phoneCodeText_two)}}
							</u-button>
							<u-verification-code seconds="60" ref="phoneCodeKey_two" @change="phoneCodeChange_two"
								:start-text="$t('获取验证码')" :end-text="$t('rep_sned')" change-text="XS">
							</u-verification-code>
						</view>
					</template>
					<view class="bs-foot-button flex-center justify-center">
						<button type="default" @click="editMailBtn" class="btn btn--default">{{$t('public6')}}</button>
					</view>
				</view>
			</view>
		</u-popup>
		<uni-popup ref="tipShow" type="bottom">
			<view class="uc-pop">
				<view class="u-p-40 pop-bottom">
					<view class="u-flex u-row-center flex--direction">
						<image src="@/static/images/dw/su.png" style="width: 88px;height: 88px;" mode=""></image>
						<view class="u-p-t-20 u-p-b-20">{{$t('提现成功')}}</view>
						<view class="u-m-t-20 u-c-9">{{$t('您的提现需求已发送')}}</view>
						<view class="w_100 btn--submit u-text-center u-p-30 u-m-t-30" @click="keepTipShow">
							<view class="m-line-1 m-font-18">{{$t('继续提现')}}</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import uMessageInput from '@/components/u-message-input/u-message-input.vue'
	import quSelect from "@/components/easy-select/easy-select.vue"
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			uMessageInput,
			quSelect,
			pcNavHeader,
			listEmpty,
			pcSideBar
		},
		data() {
			return {
				show: false,
				closeAble: false,
				show_modal_pwd: false,
				add_withdrawal_pwd: {
					logo_pwd: '',
					add_w_pwd: ''
				},
				content: this.$t('您还没有银行卡'),
				isUsdt: 0,
				formData: {
					accountVal: '0.00',
					rpersent: '',
					minimum: '',
					highest: '',
					rnum: '',
					rprice: '',
				},
				bankList: [],
				withdrawlimit: {},
				amountReceived: 0,
				withdrawal_rate: 0,
				selectprice: [],
				uselectprice: [],
				w_psd: '',
				service_charge: '',
				usdt_charge: '',
				rules: {
					rprice: {
						rules: [{
							required: true,
							errorMessage: this.$t('user72'),
						}, ]
					},
				},
				currency_type: 0,
				currency_code: '',
				bankid: null,
				allBank: [], //银行卡
				allUsdt: [], //USDT
				allWallet: [], //电子钱包
				allPix: [], //PIX
				withdrawList: [],
				depositType: null,
				allBankValue: '', //默认
				rechargePrice: '',
				quickRechargeUsdt: [],
				isDataShow: null,
				mShowStatus: null, // 0银行卡 1USDT 2电子钱包 3PIX
				navBarText: '',
				withdrawalRemarks: '',
				emailTest: false, // 支付类型 true需要邮箱验证码
				phoneTest: false, // 支付类型 true需要手机验证码
				emailPhoneTest: false, //是否开启验证方式 
				mailCode: '',
				mailCodeText: '',
				mail_two: '',
				mailCode_two: '',
				mailCodeText_two: '',
				phoneCode: '',
				phoneCodeText: '',
				selecQu: '',
				quOptions: [],
				phoneEmilStyleStatus: null, // 1邮箱，2手机
				withdrawalCheckType: null, //验证类型 1手机，2邮箱，3都开启，任意验证，4同时关闭
				withdrawalStatus: null, //提现验证 1开启，0关闭
				phoneBank: '',
				phoneCode_two: '',
				phoneCodeText_two: '',
				userBalance: null, //用户余额
				userSavings: null, //用户流水
				topTabsCurrent: 0,
				styles: {
					color: '#fff',
					borderColor: 'var(--textPwdStyle-bg)',
					borderRadius: "16px",
					boxShadow: 'var(--shadow-bg)',
				},
				formData: {
					bankValue: 0,
					price: '',
					per: '',
					yzm: '',
					bname: '',
					bvalue: '',
					pocturl: ''
				},
				rechcollapse: false,
				withdrawCarName: this.$t('请选择卡片'),
				active_id: null,
				mailPopup_two: false,
				carQuick: [],
				isInput: false,
				deUserSavings: '',
				bankType: 0,
				withdrawal_psd_popup: false
			}
		},
		async onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('提现')
			});
			await this.getrechargeparame();
			await this.getbankList();
			this.getApple();
			this.getWithStatus();
		},
		onLoad() {
			this.getwithdrawlimit();
			this.getWithdrawalRemarks();
		},
		computed: {
			dzPrice() {
				let dzPrice = ((this.rechargePrice - (this.rechargePrice * this.usdt_charge) / 100) * this.withdrawal_rate)
					.toFixed(2);
				return dzPrice;
			}
		},
		methods: {
			showQuickListIndexBank(price, e) {
				this.rechargePrice = price;
			},
			rechargeInput(e) {
				this.$nextTick(_ => {
					this.rechargePrice = this.clearNoNum(e);
				})
			},
			selectCarChange(e) {
				if (e.fast_pay) {
					this.carQuick = e.fast_pay;
				}
				if (e.is_input == 1) {
					this.isInput = true;
					this.rechargePrice = '';
				} else {
					this.isInput = false;
				}
				this.withdrawal_rate = 0;
				this.bankid = e.id;
				this.rechcollapse = false;
				this.active_id = null;
				this.active_id = e.id;
				this.bankType = e.bank_type;
				this.currency_code = e.currency_code;
				this.withdrawal_rate = e.withdrawal_rate;
				if (e.pay_type == 1 || e.pay_type == 2) {
					this.withdrawCarName = e.pay_name + `(${e.bank_number})`;
				} else {
					this.withdrawCarName = e.bank_name + `(${e.bank_number})`;
				}
			},
			topTabsChange(i) {
				this.bankid = null;
				this.carQuick = [];
				this.isInput = false;
				this.rechargePrice = '';
				this.currency_code = '';
				this.rechcollapse = false;
				this.active_id = null;
				this.withdrawCarName = this.$t('请选择卡片');
				this.topTabsCurrent = i;
				if (this.withdrawList[i].keys == 'bank') {
					this.mShowStatus = 0;
					this.formData.rpersent = this.service_charge + "%";
				} else if (this.withdrawList[i].keys == 'usdt') {
					this.mShowStatus = 1;
					this.formData.rpersent = this.usdt_charge + "%";
				} else if (this.withdrawList[i].keys == 'wallet') {
					this.mShowStatus = 2;
					this.formData.rpersent = this.service_charge + "%";
				} else if (this.withdrawList[i].keys == 'pix') {
					this.mShowStatus = 3;
					this.formData.rpersent = this.service_charge + "%";
				};
				if (this.currency_type == 2 && (this.withdrawList[i].keys == 'bank' || this.withdrawList[i].keys ==
						'pix' || this.withdrawList[i].keys == 'wallet')) {
					this.isUsdt = 0;
				} else if (this.currency_type == 1 && (this.withdrawList[i].keys == 'bank' || this.withdrawList[i].keys ==
						'pix' || this.withdrawList[i].keys == 'wallet')) {
					this.isUsdt = 1;
				} else if (this.currency_type == 2 && this.withdrawList[i].keys == 'usdt') {
					this.isUsdt = 1;
				} else if (this.currency_type == 1 && this.withdrawList[i].keys == 'usdt') {
					this.isUsdt = 0;
				}
			},
			getWithStatus() {
				if (this.$helper.get('userInfo').sc_date == 1) {
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}
			},
			selectQhao(options) {
				this.selecQu = options.label
			},
			mailEdit() {
				this.$refs.mailPopup.open();
			},
			mailPopupClose() {
				this.$refs.mailPopup.close();
			},
			mailEdit_two() {
				this.mailPopup_two = true;
			},
			mailPopupClose_two() {
				this.mailPopup_two = false;
			},
			mailCodeChange(e) {
				this.mailCodeText = e;
			},
			phoneCodeChange(e) {
				this.phoneCodeText = e;
			},
			mailCodeChange_two(e) {
				this.mailCodeText_two = e;
			},
			phoneCodeChange_two(e) {
				this.phoneCodeText_two = e;
			},
			// 获取邮箱验证码
			async getMailCode() {
				let _this = this;
				if (_this.$refs.mailCodeKey.canGetCode) {
					uni.showLoading({
						title: this.$t('loading')
					})
					let res = await _this.$u.api.send_mail_code_p({
						email: _this.userInfo_common.mail,
						type: 1
					});
					if (res.code == 1) {
						uni.hideLoading();
						_this.$refs.uTips.show({
							title: _this.$t(res.msg)
						});
						_this.$refs.mailCodeKey.start();
					} else {
						_this.$refs.uTips.show({
							title: _this.$t(res.msg)
						});
					}
				}
			},
			// 获取手机验证码
			async getPhoneCode() {
				let _this = this;
				if (_this.$refs.phoneCodeKey.canGetCode) {
					uni.showLoading({
						title: this.$t('loading')
					})
					let res = await _this.$u.api.sendcode_p({
						qh: this.selecQu,
						phone: _this.userInfo_common.yphone,
						type: 1
					});
					if (res.code == 1) {
						uni.hideLoading();
						_this.$refs.uTips.show({
							title: _this.$t(res.msg)
						});
						_this.$refs.phoneCodeKey.start();
					} else {
						_this.$refs.uTips.show({
							title: _this.$t(res.msg)
						});
					}
				}
			},
			// 获取邮箱验证码
			async getMailCode_two() {
				let _this = this;
				if (_this.mail_two == '') {
					_this.$refs.uTips.show({
						title: _this.$t('邮箱不能为空')
					});
				} else {
					if (_this.$refs.mailCodeKey_two.canGetCode) {
						if (_this.$u.test.email(_this.mail_two)) {
							uni.showLoading({
								title: this.$t('loading')
							})
							let res = await _this.$u.api.send_mail_code_p({
								email: _this.mail_two
							});
							if (res.code == 1) {
								uni.hideLoading();
								_this.$refs.uTips.show({
									title: _this.$t(res.msg)
								});
								_this.$refs.mailCodeKey_two.start();
							} else {
								_this.$refs.uTips.show({
									title: _this.$t(res.msg)
								});
							}
						} else {
							_this.$refs.uTips.show({
								title: _this.$t('邮箱格式不正确')
							});
						}
					}
				}
			},
			// 绑定邮箱/手机
			async editMailBtn() {
				if (this.phoneEmilStyleStatus == 1) {
					// 当前条件为邮箱验证
					if (this.mail_two == '' || this.mailCode_two == '') {
						this.$refs.uTips.show({
							title: this.$t('请输入完整信息')
						});
					} else {
						uni.showLoading({
							title: this.$t('loading')
						});
						let res = await this.$u.api.useredit_p({
							mail: this.mail_two,
							mail_code: this.mailCode_two
						});
						if (res) {
							this.getUserInfo_common();
							this.mailPopupClose_two();
							uni.hideLoading();
							this.$refs.uTips.show({
								title: this.$t(res.msg)
							});
						} else {
							this.$refs.uTips.show({
								title: this.$t(res.msg)
							});
						}
					}
				} else {
					// 当前条件为手机验证
					if (this.phoneBank == '' || this.phoneCode_two == '') {
						this.$refs.uTips.show({
							title: this.$t('请输入完整信息')
						});
					} else {
						uni.showLoading({
							title: this.$t('loading')
						})
						let info = {
							qh: this.selecQu,
							phone: this.phoneBank,
							code: this.phoneCode_two
						};
						let res = await this.$u.api.useredit_p(info);
						if (res.code == 1) {
							uni.hideLoading();
							this.$refs.uTips.show({
								title: this.$t(res.msg)
							});
							this.$refs.phoneCodeKey_two.start();
							this.getUserInfo_common();
							this.mailPopupClose_two();
						} else {
							uni.hideLoading();
							this.$refs.uTips.show({
								title: this.$t(res.msg)
							});
						}
					}
				}
			},
			async getPhoneCode_two() {
				let _this = this;
				if (_this.phoneBank == '') {
					this.$refs.uTips.show({
						title: this.$t('手机号不能为空')
					});
				} else {
					if (_this.$refs.phoneCodeKey_two.canGetCode) {
						uni.showLoading({
							title: this.$t('loading')
						})
						let res = await _this.$u.api.sendcode_p({
							qh: this.selecQu,
							phone: _this.phoneBank,
							type: 2
						});
						if (res.code == 1) {
							uni.hideLoading();
							_this.$refs.uTips.show({
								title: _this.$t(res.msg)
							});
							_this.$refs.phoneCodeKey_two.start();
						} else {
							_this.$refs.uTips.show({
								title: _this.$t(res.msg)
							});
						}
					}
				}
			},
			getApple() {
				let idc = this.$helper.get('idc');
				this.quOptions = idc;
				this.selecQu = this.userInfo_common.qh ? this.userInfo_common.qh : this.$helper.get('idc_default');
				this.withdrawalCheckType = this.$helper.get('rule').withdrawal_check_type;
				this.withdrawalStatus = this.$helper.get('rule').withdrawal_status;
				if (this.withdrawalCheckType == 2 && this.withdrawalStatus == 1 && this.userInfo_common.is_check_phone ==
					1) {
					// 邮箱验证开启，提现需提供邮箱验证码
					this.emailTest = true;
					this.phoneEmilStyleStatus = 1;
				} else {
					// 邮箱验证关闭，提现无需提供邮箱验证码
					this.emailTest = false;
				};
				if (this.withdrawalCheckType == 1 && this.withdrawalStatus == 1 && this.userInfo_common.is_check_phone ==
					1) {
					// 手机验证开启，提现需提供手机验证码
					this.phoneTest = true;
					this.phoneEmilStyleStatus = 2;
				} else {
					// 手机验证关闭，提现无需提供手机验证码
					this.phoneTest = false;
				};
				if (this.withdrawalCheckType == 4 || this.withdrawalStatus == 0) {
					this.emailPhoneTest = true;
				} else {
					this.emailPhoneTest = false;
				}

			},
			getWithdrawalRemarks() {
				if (this.$t('withdrawalRemarks') != 'withdrawalRemarks') {
					this.withdrawalRemarks = this.$t('withdrawalRemarks');
				} else {
					this.withdrawalRemarks = '';
				}
			},
			async getrechargeparame() {
				let ret = await this.$u.api.rechargeparame_p();
				if (ret && ret.code == 1) {
					this.currency_type = ret.data.currency_type;
					// this.currency_code = ret.data.currency_code;
					// this.withdrawal_rate = ret.data.withdrawal_rate;
					this.quickRechargeBank = ret.data.quick_withdrawal;
					this.quickRechargeUsdt = ret.data.usdt_quick_withdrawal;
					this.userBalance = ret.data.balance;
					this.userSavings = ret.data.savings;
					//this.userBalance = ret.data.balance ? ret.data.balance : -1;
					//this.userSavings = ret.data.savings ? ret.data.savings : -1;
				}
			},
			async getbankList() {
				uni.showLoading({
					title: this.$t('loading')
				})
				this.allBank = [];
				this.allUsdt = [];
				this.allWallet = [];
				this.allPix = [];
				this.bankList = [];
				this.withdrawList = [];
				let res = await this.$u.api.mybankList_p({
					bank_type: 'all'
				});
				if (res) {
					this.bankList = res.data;
					for (let i in this.bankList) {
						// 获取银行卡
						if (this.bankList[i].bank_type == 0) {
							this.allBank.push(this.bankList[i]);
						}
						// 获取USDT
						if (this.bankList[i].bank_type == 1) {
							this.allUsdt.push(this.bankList[i]);
						}
						// 获取电子钱包
						if (this.bankList[i].bank_type == 2) {
							this.allWallet.push(this.bankList[i]);
						}
						// 获取PIX
						if (this.bankList[i].bank_type == 3) {
							this.allPix.push(this.bankList[i]);
						}
					};
					if (this.allPix.length > 0) {
						this.withdrawList.unshift({
							name: this.$t('PIX'),
							img: '../../static/images/topboom/pix.png',
							disabled: false,
							keys: 'pix'
						});
						this.depositType = 3;
						this.formData.rpersent = this.service_charge + "%";
						this.allBankValue = this.$t('PIX'); //默认
						this.mShowStatus = 3;
					};
					if (this.allWallet.length > 0) {
						this.withdrawList.unshift({
							name: this.$t('电子钱包'),
							img: '../../static/images/topboom/payment_card_outline_24.png',
							disabled: false,
							keys: 'wallet'
						});
						this.depositType = 2;
						this.formData.rpersent = this.service_charge + "%";
						this.allBankValue = this.$t('电子钱包'); //默认
						this.mShowStatus = 2;
					};
					if (this.allUsdt.length > 0) {
						this.withdrawList.unshift({
							name: this.$t('USDT'),
							img: '../../static/images/topboom/USDT.png',
							disabled: false,
							keys: 'usdt'
						});
						this.depositType = 1;
						this.formData.rpersent = this.usdt_charge + "%";
						this.allBankValue = this.$t('USDT'); //默认
						this.mShowStatus = 1;
					};
					if (this.allBank.length > 0) {
						this.withdrawList.unshift({
							name: this.$t('银行卡'),
							img: '../../static/images/topboom/payment_card_outline_24.png',
							disabled: false,
							keys: 'bank'
						});
						this.depositType = 0;
						this.formData.rpersent = this.service_charge + "%";
						this.allBankValue = this.$t('银行卡'); //默认
						this.mShowStatus = 0;
					};
					if (this.withdrawList.length > 0) {
						this.isDataShow = 1;
						if (this.currency_type == 2 && (this.withdrawList[0].keys == 'bank' || this.withdrawList[0]
								.keys == 'pix' || this.withdrawList[0].keys == 'wallet')) {
							this.isUsdt = 0;
						} else if (this.currency_type == 1 && (this.withdrawList[0].keys == 'bank' || this
								.withdrawList[0].keys == 'pix' || this
								.withdrawList[0].keys == 'wallet')) {
							this.isUsdt = 1;
						} else if (this.currency_type == 2 && this.withdrawList[0].keys == 'usdt') {
							this.isUsdt = 1;
						} else if (this.currency_type == 1 && this.withdrawList[0].keys == 'usdt') {
							this.isUsdt = 0;
						}
					} else {
						this.isDataShow = 0;
					}
					uni.hideLoading();
				}
			},
			async getwithdrawlimit() {
				let ret = await this.$u.api.withdrawlimit_p({});
				if (ret) {
					this.withdrawlimit = ret.data;
					this.formData.accountVal = this.userInfo_common.balance;
					this.formData.minimum = ret.data.min_amount;
					this.formData.highest = ret.data.max_amount;
					this.formData.rnum = ret.data.day_limit;
					this.service_charge = ret.data.service_charge;
					this.usdt_charge = ret.data.usdt_charge;
					this.deUserSavings = ret.data.savings;
				}
			},
			verifyPayment() {
				let _this = this;
				// 是否输入金额/是否选择提现卡
				if (this.rechargePrice != "" && this.bankid > 0) {
					// 判断用户余额是否充足
					// if (Number(_this.rechargePrice) <= Number(_this.userBalance) || Number(_this.userBalance) == -1) {
					if (Number(_this.rechargePrice) <= Number(_this.userBalance)) {
						// 判断用户流水是否充足
						if (Number(_this.userBalance) - Number(_this.rechargePrice) < Number(_this.userSavings) && Number(
								_this.userSavings) > 0) {
							_this.$refs.uTips.show({
								title: _this.$t('提现流水倍数不满足')
							});
						} else {
							uni.showLoading({
								title: _this.$t("loading")
							});
							if (_this.userInfo_common.withdrawal_psd) {
								uni.hideLoading();
								if ((_this.phoneTest || _this.emailTest) && !_this.emailPhoneTest) {
									if (_this.emailTest) {
										// 如果想要邮箱验证码，则弹出发送邮箱验证码框
										if (_this.userInfo_common.mail) {
											// 邮箱存在：直接提供邮箱验证码
											_this.mailEdit();
										} else {
											// 邮箱不存在：则需要绑定邮箱
											_this.mailEdit_two();
										}
									}
									if (this.phoneTest) {
										// 如果想要邮箱验证码，则弹出发送邮箱验证码框
										if (_this.userInfo_common.yphone) {
											// 手机存在：直接提供手机验证码
											_this.mailEdit();
										} else {
											// 手机不存在：则需要绑定手机
											_this.mailEdit_two();
										}
									}
								} else {
									// 如果不需要邮箱验证码，则正常显示提现密码框
									_this.show = true;
								}
							} else {
								uni.hideLoading();
								_this.show_modal_pwd = true;
							}
						}
					} else {
						_this.$refs.uTips.show({
							title: _this.$t('余额不足')
						});
					}
				} else {
					_this.$refs.uTips.show({
						title: _this.$t('请填写完整资料')
					});
				}
			},
			async setUpWithdrawal_pwd() {

				if (this.add_withdrawal_pwd.add_w_pwd.length == 6) {
					uni.showLoading({
						title: this.$t("loading")
					});
					let res = await this.$u.api.useredit_p({
						old_password: this.add_withdrawal_pwd.logo_pwd,
						withdrawal_psd: this.add_withdrawal_pwd.add_w_pwd
					}).then(res => {
						uni.hideLoading();
						if (res.code == 1) {
							this.getUserInfo_common();
							this.closeWallet();
							this.$refs.uTips.show({
								title: this.$t(res.msg)
							});
						} else {
							this.closeWallet();
							this.$refs.uTips.show({
								title: this.$t(res.msg)
							});
						}
					})
				} else {
					this.closeWallet();
					this.$refs.uTips.show({
						title: this.$t('提现密码长度为6位')
					});
				}
			},
			showWith_pop() {
				this.withdrawal_psd_popup = true;
			},
			closeWallet() {
				this.withdrawal_psd_popup = false;
			},
			// 支付密码弹窗
			finish(e) {
				this.rechcollapse = false;
				this.w_psd = e;
				this.submit1();
			},
			async submit1() {
				if (this.bankid == 0 || this.bankid == null) {
					this.$refs.uTips.show({
						title: this.$t('user66')
					});
				} else {
					uni.showLoading({
						mask: true,
						title: this.$t("loading")
					});
					let parm = {};
					parm = {
						bank_id: this.bankid,
						w_price: this.rechargePrice,
						wpass: this.w_psd,
						email_code: this.mailCode ? this.mailCode : this.phoneCode,
						phone_code: this.mailCode ? this.mailCode : this.phoneCode,
						ispass: '1',
					}
					// if (this.emailTest || this.phoneTest) {
					// 	parm = {
					// 		bank_id: this.bankid,
					// 		w_price: this.rechargePrice,
					// 		wpass: this.w_psd,
					// 		email_code: this.phoneEmilStyleStatus == 1 ? this.mailCode : this.phoneCode,
					// 		ispass: '1',
					// 	}
					// } else {
					// 	parm = {
					// 		bank_id: this.bankid,
					// 		w_price: this.rechargePrice,
					// 		wpass: this.w_psd,
					// 		ispass: '1',
					// 	}
					// }
					let ret = await this.$u.api.withdrawapply_p(parm);
					if (ret.code == 1) {
						this.show = false;
						if (this.mobile_common) {
							this.$refs.header.headUserBan();
						} else {
							this.$refs.pcHeader.getBalance();
							this.$refs.pcSideBar.getBalance();
						}
						// this.getUserInfo_common();
						this.getwithdrawlimit();
						this.getrechargeparame();
						this.w_psd = '';
						this.mailCode = '';
						this.phoneCode = '';
						this.$refs.tipShow.open();
						this.mailPopupClose();
						// this.$refs.uTips.show({
						// 	title: this.$t(ret.msg)
						// });
					} else {
						this.show = false;
						this.w_psd = '';
						this.mailCode = '';
						this.phoneCode = '';
						this.mailPopupClose();
						this.$refs.uTips.show({
							title: this.$t(ret.msg)
						});
					}
				}
			},
			keepTipShow() {
				this.rechcollapse = false;
				this.active_id = null;
				this.withdrawCarName = this.$t('请选择卡片');
				this.rechargePrice = '';
				this.$refs.tipShow.close();
			},
			withdrawEmail() {
				if (this.phoneEmilStyleStatus == 1) {
					if (this.w_psd == '' || this.mailCode == '') {
						this.$refs.uTips.show({
							title: this.$t('请填写完整资料')
						});
					} else {
						if (this.w_psd.length == 6) {
							this.submit1();
						} else {
							this.$refs.uTips.show({
								title: this.$t('提现密码长度为6位')
							});
						}
					}
				} else {
					if (this.w_psd == '' || this.phoneCode == '') {
						this.$refs.uTips.show({
							title: this.$t('请填写完整资料')
						});
					} else {
						if (this.w_psd.length == 6) {
							this.submit1();
						} else {
							this.$refs.uTips.show({
								title: this.$t('提现密码长度为6位')
							});
						}
					}
				}
			},
			rechShow() {
				this.rechcollapse = !this.rechcollapse;
			}
		}
	}
</script>

<style lang="scss">
	.info-glod {
		background-color: #F6F7F8;
		padding: 10px;
		border-radius: 16px;
	}

	.onEditImg {
		width: 60px;
		height: 60px;
		margin: 10px 0 15px 0;
	}

	.quSelectStyle {
		width: 100% !important;
		height: 50px !important;
		border-radius: 16px !important;
		border: 1px solid #604db6 !important;
	}

	.wt-foot .btn {
		height: 54px !important;
		line-height: 54px !important;
		width: 100% !important;
	}

	.game-tabs {
		margin: 0 15px;

		::v-deep .u-tab-item {
			margin-right: 10px;
			color: var(--tab-item-color) !important;
		}

		::v-deep .item-active {
			padding-bottom: 2px;
			position: relative;
			color: #ffffff !important;
		}

		::v-deep .item-active::after {
			content: '';
			left: 0;
			right: 0;
			bottom: 0;
			transform: translateY(10%);
			position: absolute;
			width: 100%;
			height: 4px;
			border-radius: 3px 3px 0px 0px;
			background: rgba(233, 174, 58, 1);
			box-shadow: 0px 0px 6px 2px rgba(255, 184, 0, 0.5);
		}
	}

	.phoneCodeBtn {
		border-radius: 16px !important;
	}

	.phoneSelect ::v-deep .easy-select .easy-select-options {
		left: 0 !important;
	}
</style>
