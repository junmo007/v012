<template>
	<view>
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main u-flex">
				<pcSideBar :pageIndex="99"></pcSideBar>
				<view class="m-bg-w m-c-0 pc-main-right">
					<view class="m-font-b u-m-b-30">{{$t('user4')}}</view>
					<view class="game-tabs">
						<u-tabs height="70" bar-height="0" bg-color="none" gutter="60" active-color="#ffffff"
							inactive-color="#ffffff" :list="rechargeList" :current="topTabsCurrent"
							@change="topTabsChange">
						</u-tabs>
					</view>
					<view class="wt-form">
						<uni-forms err-show-type="toast" ref="form" :modelValue="formData" :rules="rules"
							:label-width="280" :border="false" label-position="top">
							<uni-forms-item name="account" :label="$t('充值渠道')">
								<view class="ac-select-bar">
									<view class="rec-select-flex" @click="rechShow">
										<view class="flex_bd">
											<view class="val m-line-1">{{rechargeCarName}}</view>
										</view>
										<view class="iconfont icon-down" style="transition: .3s all;"
											:style="rechcollapse?'transform: rotateZ(180deg);':'transform: rotateZ(0);'">
										</view>
									</view>
									<view class="select-collapse u-m-t-8" v-if="rechcollapse">
										<!-- 银行卡充值卡 -->
										<view class="ac-rec-row" v-for="(itm,ind) in allBank" v-if="mShowStatus == 0"
											:key="`allBank${ind}`" :class="[active_id == itm.id?'ac-rec-row-active':'']"
											@click="selectCarChange(itm,0)">
											<template v-if="itm.logo">
												<u-image width="30px" height="30px" borderRadius="8px" :src="itm.logo">
													<u-loading slot="loading"></u-loading>
												</u-image>
											</template>
											<view class="label m-line-1">
												{{$t(itm.pay_type ==1||itm.pay_type ==2?itm.pay_name:itm.bank_name)}}
											</view>
										</view>
										<!-- USDT充值卡 -->
										<view class="ac-rec-row" v-for="(itm,ind) in allUsdt" v-if="mShowStatus == 1"
											:key="`allUsdt${ind}`" :class="[active_id == itm.id?'ac-rec-row-active':'']"
											@click="selectCarChange(itm,1)">
											<template v-if="itm.logo">
												<u-image width="30px" height="30px" borderRadius="8px" :src="itm.logo">
													<u-loading slot="loading"></u-loading>
												</u-image>
											</template>
											<view class="label m-line-1">
												{{$t(itm.pay_type ==1||itm.pay_type ==2?itm.pay_name:itm.bank_name)}}
											</view>
										</view>
										<!-- 电子钱包充值卡 -->
										<view class="ac-rec-row" v-for="(itm,ind) in allWallet" v-if="mShowStatus == 2"
											:key="`allWallet${ind}`"
											:class="[active_id == itm.id?'ac-rec-row-active':'']"
											@click="selectCarChange(itm,2)">
											<template v-if="itm.logo">
												<u-image width="30px" height="30px" borderRadius="8px" :src="itm.logo">
													<u-loading slot="loading"></u-loading>
												</u-image>
											</template>
											<view class="label">
												{{$t(itm.pay_type ==1||itm.pay_type ==2||itm.pay_type ==5?itm.pay_name:itm.bank_name)}}
											</view>
										</view>
										<!-- PIX充值卡 -->
										<view class="ac-rec-row" v-for="(itm,ind) in allPix" v-if="mShowStatus == 3"
											:key="`allPix${ind}`" :class="[active_id == itm.id?'ac-rec-row-active':'']"
											@click="selectCarChange(itm,3)">
											<template v-if="itm.logo">
												<u-image width="30px" height="30px" borderRadius="8px" :src="itm.logo">
													<u-loading slot="loading"></u-loading>
												</u-image>
											</template>
											<view class="label m-line-1">
												{{$t(itm.pay_type ==1||itm.pay_type ==2||itm.pay_type ==7?itm.pay_name:itm.bank_name)}}
											</view>
										</view>
										<!-- 网商 -->
										<view class="ac-rec-row" v-for="(itm,ind) in payAgent" v-if="mShowStatus == 4"
											:key="`payAgent${ind}`"
											:class="[active_id == itm.id?'ac-rec-row-active':'']"
											@click="selectCarChange(itm,4)">
											<view class="label m-line-1">
												{{$t(itm.nickname)}}
											</view>
										</view>
									</view>
								</view>
							</uni-forms-item>
							<!-- 网商账号信息 -->
							<template v-if="mShowStatus == 4 && (depositInfo.whats_app || depositInfo.telegram)">
								<view class="ac-select-bar">
									<view class="select-collapse u-m-t-8">
										<template v-if="depositInfo.telegram">
											<view class="ac-rec-row" @click="common_copy(depositInfo.telegram)">
												<view class="label">
													{{$t('telegram')}}
												</view>
												<view class="u-flex">
													<view class="u-c-8">{{depositInfo.telegram}}</view>
													<image src="@/static/images/dw/copy.png"
														style="width: 18px;height: 18px;" class="u-m-l-14" mode="">
													</image>
												</view>
											</view>
										</template>
										<template v-if="depositInfo.whats_app">
											<view class="ac-rec-row" @click="common_copy(depositInfo.whats_app)">
												<view class="label">
													{{$t('whats')}}
												</view>
												<view class="u-flex">
													<view class="u-c-8">{{depositInfo.whats_app}}</view>
													<image src="@/static/images/dw/copy.png"
														style="width: 18px;height: 18px;" class="u-m-l-14" mode="">
													</image>
												</view>
											</view>
										</template>
									</view>
								</view>
							</template>
							<!-- 线下充值账号信息 -->
							<template v-if="mShowStatus != 4">
								<view class="ac-select-bar"
									v-if="rechargeType != 1 && rechargeType != 2 && rechargeType != 5 && rechargeType != 7 && rechargeType != null">
									<view class="select-collapse u-m-t-8">
										<view class="ac-rec-row" v-if="depositInfo.bank_qrcode"
											@click="picClick_2(depositInfo.bank_qrcode)">
											<u-image width="65px" height="65px" borderRadius="8px"
												:src="depositInfo.bank_qrcode">
												<u-loading slot="loading"></u-loading>
											</u-image>
											<!-- {{depositInfo.bank_qrcode}} -->
										</view>
										<template v-if="depositInfo.bank_name">
											<view class="ac-rec-row" @click="common_copy(depositInfo.bank_name)">
												<view class="label">
													{{mShowStatus == 0?$t('user42'):mShowStatus==2?$t('电子钱包名称'):mShowStatus==3?$t('PIX名称'):$t('链名称')}}
												</view>
												<view class="u-flex">
													<view class="u-c-8">{{depositInfo.bank_name}}</view>
													<image src="@/static/images/dw/copy.png"
														style="width: 18px;height: 18px;" class="u-m-l-14" mode="">
													</image>
												</view>
											</view>
										</template>
										<template v-if="depositInfo.bank_number">
											<view class="ac-rec-row" @click="common_copy(depositInfo.bank_number)">
												<view class="label">
													{{mShowStatus == 0?$t('user43'):mShowStatus==2?$t('电子钱包账户'):mShowStatus==3?$t('PIX账户'):$t('收币地址')}}
												</view>
												<view class="u-flex">
													<view class="u-c-8">{{depositInfo.bank_number}}</view>
													<image src="@/static/images/dw/copy.png"
														style="width: 18px;height: 18px;" class="u-m-l-14" mode="">
													</image>
												</view>
											</view>
										</template>
										<template v-if="depositInfo.bank_khm">
											<view class="ac-rec-row" @click="common_copy(depositInfo.bank_khm)">
												<view class="label">
													{{$t('user40')}}
												</view>
												<view class="u-flex">
													<view class="u-c-8">{{depositInfo.bank_khm}}</view>
													<image src="@/static/images/dw/copy.png"
														style="width: 18px;height: 18px;" class="u-m-l-14" mode="">
													</image>
												</view>
											</view>
										</template>
										<template v-if="depositInfo.financial">
											<view class="ac-rec-row" @click="common_copy(depositInfo.financial)">
												<view class="label">
													{{$t('金融编码')}}
												</view>
												<view class="u-flex">
													<view class="u-c-8">{{depositInfo.financial}}</view>
													<image src="@/static/images/dw/copy.png"
														style="width: 18px;height: 18px;" class="u-m-l-14" mode="">
													</image>
												</view>
											</view>
										</template>
										<template v-if="depositInfo.bank_open">
											<view class="ac-rec-row" @click="common_copy(depositInfo.bank_open)">
												<view class="label">
													{{$t('开户行')}}
												</view>
												<view class="u-flex">
													<view class="u-c-8">{{depositInfo.bank_open}}</view>
													<image src="@/static/images/dw/copy.png"
														style="width: 18px;height: 18px;" class="u-m-l-14" mode="">
													</image>
												</view>
											</view>
										</template>
									</view>
								</view>
								<view class="u-m-b-20 u-m-t-30 u-flex u-row-between u-col-bottom">
									<view class="u-font-32">{{$t('存款金额')}}</view>
									<view class="u-flex">
										<template v-if="showRechargeRate == 1 && depositInfo.currencyApi.recharge_rate">
											<!-- <view class="m-font-12 text-f">
										{{$t('当前汇率')}} {{depositInfo.currencyApi.recharge_rate}}
									</view> -->
											<view class="text-yellow u-m-l-14">
												{{$t('到账金额')}}
												{{parseFloat(rechargePrice * depositInfo.currencyApi.recharge_rate).toFixed(2) + ' ' + (currency_type==1?'USDT':bankAll.currency_code)}}
											</view>
										</template>
									</view>
								</view>
								<view class="u-flex">
									<view class="flex_bd">
										<uni-easyinput type="number" v-model="rechargePrice" @input="rechargeInput"
											:placeholder="$t('user60')" :disabled="rechargeInputDis" :styles="styles" />
									</view>
									<template v-if="showRechargeRate == 1 && depositInfo.currencyApi.recharge_rate">
										<view class="huil_class">1 : {{depositInfo.currencyApi.recharge_rate}}
										</view>
									</template>
								</view>
								<!-- 是否显示汇率 -->
								<!-- <template v-if="showRechargeRate == 1 && depositInfo.currencyApi.recharge_rate">
							<view class="u-m-t-20 u-m-b-20"> <text class="u-c-9">{{$t('当前汇率')}}：</text>
								{{depositInfo.currencyApi.recharge_rate}}
							</view>
							<view class="u-m-b-20">
								<text
									class="u-c-9">{{$t('到账金额')}}：</text>{{parseFloat(rechargePrice * depositInfo.currencyApi.recharge_rate).toFixed(2) + (currency_type==1?'USDT':bankAll.currency_code)}}
							</view>
						</template> -->
								<!-- 快捷金额 -->
								<view class="w_100 u-flex u-flex-wrap quickBox" v-if="showQuM">
									<!--  v-if="depositInfo.currencyApi.name != 'RUB'" -->
									<template v-if="carQuick.length > 0">
										<view v-for="(item,index) in carQuick" :key="`${index}`+'quick'"
											class="u-m-t-20 u-m-r-20"
											:class="item == rechargePrice?'quickListActive_m':'quickList_m'"
											@click="showQuickListIndexBank(item,index)">
											<view class="m-rela">
												<text>{{item}}</text>
												<text class="quickSuv"
													:class="item == rechargePrice?'quickSubActive':''"
													v-if="quickSub[index]">{{quickSub[index]?'+'+quickSub[index]:''}}</text>
											</view>
										</view>
									</template>
									<template v-else>
										<template v-if="mShowStatus==0||mShowStatus==2||mShowStatus==3">
											<view v-for="(item,index) in quickRechargeBank" :key="`${index}`+'quick'"
												class="u-m-t-20 u-m-r-20"
												:class="item == rechargePrice?'quickListActive_m':'quickList_m'"
												@click="showQuickListIndexBank(item,index)">
												<!-- <view>{{item}}</view> -->
												<view class="m-rela">
													<text>{{item}}</text>
													<text class="quickSuv"
														:class="item == rechargePrice?'quickSubActive':''"
														v-if="quickSub[index]">{{quickSub[index]?'+'+quickSub[index]:''}}</text>
												</view>
											</view>
										</template>
										<template v-if="mShowStatus==1">
											<view v-for="(item,index) in quickRechargeUsdt" :key="`${index}`+'quick'"
												class="u-m-t-20 u-m-r-20"
												:class="item == rechargePrice?'quickListActive_m':'quickList_m'"
												@click="showQuickListIndexBank(item,index)">
												<!-- <view>{{item}}</view> -->
												<view class="m-rela">
													<text>{{item}}</text>
													<text class="quickSuv"
														:class="item == rechargePrice?'quickSubActive':''"
														v-if="quickSub[index]">{{quickSub[index]?'+'+quickSub[index]:''}}</text>
												</view>
											</view>
										</template>
									</template>
								</view>
								<view class="u-m-b-20 u-m-t-30" v-for="(item,index) in rechargeArr" :key="index">
									<view class="u-font-32 skin-text u-m-b-20 u-m-t-30">{{$t(item.title)}}</view>
									<view class="flex_bd">
										<uni-easyinput type="text" v-model="item.titleValue"
											:placeholder="$t(item.remark)" :styles="styles" />
									</view>
								</view>
								<template
									v-if="rechargeType != 1 && rechargeType != 2 && rechargeType != 5 && rechargeType != 7 && rechargeType != null">
									<!-- <uni-forms-item name="bname" :label="$t('流水单号')">
								<uni-easyinput type="number" v-model="formData.bname" :placeholder='$t("填写流水单号")'
									:styles="styles" />
							</uni-forms-item> -->
									<uni-forms-item name="bname" :label="$t('上传付款凭证')" class="u-m-t-30">
										<!-- <view class="sc_img_1" v-if="pz_img_2==''" @click="sc_pz">
											<u-image width="26px" height="20px" v-if="pz_img_2== '' " :src="pz_img_1">
												<u-loading slot="loading"></u-loading>
											</u-image>
										</view>
										<view class="u-rela" v-else>
											<image :src="pz_img_2" class="pzImg" @click="picClick_2(pz_img_2)">
											</image>
											<view class="iconfont icon-cuocha pz_close" @click.stop="closePzImg"
												v-if="pz_img_2">
											</view>
										</view> -->
										<u-upload upload-text="" :multiple="false" max-count="1" :header="uploadHeader"
											:source-type="['album']" del-bg-color="#2B44B1" :action="action"
											:show-progress="false" @on-change="onChangeUpload" :custom-btn="true">
											<view slot="addBtn" class="sc_img_1">
												<u-image width="26px" height="20px" :src="pz_img_1">
													<u-loading slot="loading"></u-loading>
												</u-image>
											</view>
										</u-upload>
									</uni-forms-item>
								</template>
							</template>
						</uni-forms>
						<template v-if="mShowStatus != 4">
							<view class="wt-foot u-m-t-50">
								<view class="btn btn--submit m-font-b" @click="onlineSubmit">{{$t('确认充值')}}
								</view>
							</view>
							<u-line margin="20px 0" border-style="dashed" color="var(--u-line-bg)" />
							<view class="wt-tip">
								<!-- 提示信息 -->
								<template v-if="mShowStatus == 0">
									<!-- 银行卡提示信息 -->
									<view class="u-m-b-40">{{bankTips}}</view>
									<!-- 链接 -->
									<view class="u-m-b-40 text-ygui" @click="backUrl">{{bankTipsUrl}}</view>
								</template>
								<template v-if="mShowStatus == 1">
									<!-- USDT提示信息 -->
									<view class="u-m-b-40">{{usdtTips}}</view>
									<view class="u-m-b-40 text-ygui" @click="usdtUrl">{{usdtTipsUrl}}</view>
								</template>
								<template v-if="mShowStatus == 2">
									<!-- 电子钱包提示信息 -->
									<view class="u-m-b-40">{{walletTips}}</view>
									<view class="u-m-b-40 text-ygui" @click="walletUrl">{{walletTipsUrl}}</view>
								</template>
								<template v-if="mShowStatus == 3">
									<!-- PIX提示信息 -->
									<view class="u-m-b-40">{{pixTips}}</view>
									<view class="u-m-b-40 text-ygui" @click="pixUrl">{{pixTipsUrl}}</view>
								</template>
								<!-- 电子钱包 客服信息 -->
								<template v-if="isTelegram && mShowStatus == 2">
									<!--  @click="telegramClick" -->
									<view class="pixClass-1 u-flex u-m-b-20">
										<view class="re_pix_kf"></view>
										<view class="u-m-l-20 m-c-w" style="max-width: 270px;">
											<view style="font-size: 16px">{{$t('Telegram')}}</view>
											<view class="u-m-t-10">{{$t('TelegramInfo')}}</view>
										</view>
									</view>
								</template>
								<template v-if="isWhatsapp && mShowStatus == 2">
									<view class="pixClass-2 u-flex u-m-t-20 u-m-b-20" @click="whatsappClick">
										<view class="re_pix_wa"></view>
										<view class="u-m-l-20 m-c-w" style="max-width: 270px;">
											<view style="font-size: 16px">{{$t('Whatsapp')}}</view>
											<view class="u-m-t-10">{{$t('WhatsappInfo')}}</view>
										</view>
									</view>
								</template>
								<view class="u-m-t-20">
									<!-- {{mShowStatus == 0?$t('银行卡充值提示'):mShowStatus==2?$t('电子钱包充值提示'):mShowStatus==3?$t('PIX充值提示'):''}} -->
									{{mShowStatus == 0?$t(bankTitlePrompt):mShowStatus==2?$t(walletTitlePrompt):mShowStatus==3?$t(PIXTitlePrompt):$t(usdtTitlePrompt)}}
								</view>
								<view class="u-m-t-10">
									{{mShowStatus == 0?$t(bankRechargePrompt):mShowStatus==2?$t(walletRechargePrompt):mShowStatus==3?$t(PIXRechargePrompt):$t(usdtRechargePromptValue)}}
								</view>
							</view>
						</template>

						<!-- <view class="flex-center u-m-t-20" v-if="web_rule_common_4">
						<checkbox style="transform: scale(.8);color: var(--ui-color-normal)" value="cb" checked="true" />
						<text>{{$t('user61')}} <text class="text-ygui" @click="openX">{{$t('user62')}}</text></text>
					</view> -->
					</view>
				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content" :data-theme="themeMode">
				<view class="container">
					<uniNavHeader isback :title="$t('user4')"></uniNavHeader>
					<view class="bs-wrapper-top">
						<view class="game-tabs">
							<u-tabs height="70" bar-height="0" bg-color="none" gutter="60" active-color="#ffffff"
								inactive-color="#ffffff" :list="rechargeList" :current="topTabsCurrent"
								@change="topTabsChange">
							</u-tabs>
						</view>
						<view class="dw-line"></view>
					</view>
					<view class="bs-wrapper-bottom">
						<!-- 充值 -->
						<view class="wt-form">
							<!-- <uni-forms err-show-type="toast" ref="form" :modelValue="formData" :rules="rules"
								:border="false">
								<uni-forms-item name="account">
									<view class="ac-select-bar">
										<view class="u-m-b-16 u-m-t-20">
											<text>{{$t('充值渠道')}}</text>
											<text style="color: #D12C2C;">*</text>
										</view>
										<view class="rec-select-flex" @click="rechShow">
											<view class="flex_bd">
												<view class="val m-line-1">{{rechargeCarName}}</view>
											</view>
											<image src="@/static/images/dw/arror.png"
												style="width: 34px;height: 34px;transition: .3s all;"
												:style="rechcollapse?'transform: rotateZ(180deg);':'transform: rotateZ(0);'">
											</image>
										</view>
										<view class="select-collapse u-m-t-8" v-if="rechcollapse">
											<view class="ac-rec-row" v-for="(itm,ind) in allBank"
												v-if="mShowStatus == 0" :key="`allBank${ind}`"
												:class="[active_id == itm.id?'ac-rec-row-active':'']"
												@click="selectCarChange(itm,0)">
												<template v-if="itm.logo">
													<u-image width="30px" height="30px" borderRadius="8px"
														:src="itm.logo">
														<u-loading slot="loading"></u-loading>
													</u-image>
												</template>
												<view class="label m-line-1">
													{{$t(itm.pay_type ==1||itm.pay_type ==2?itm.pay_name:itm.bank_name)}}
												</view>
											</view>
											<view class="ac-rec-row" v-for="(itm,ind) in allUsdt"
												v-if="mShowStatus == 1" :key="`allUsdt${ind}`"
												:class="[active_id == itm.id?'ac-rec-row-active':'']"
												@click="selectCarChange(itm,1)">
												<template v-if="itm.logo">
													<u-image width="30px" height="30px" borderRadius="8px"
														:src="itm.logo">
														<u-loading slot="loading"></u-loading>
													</u-image>
												</template>
												<view class="label m-line-1">
													{{$t(itm.pay_type ==1||itm.pay_type ==2?itm.pay_name:itm.bank_name)}}
												</view>
											</view>
											<view class="ac-rec-row" v-for="(itm,ind) in allWallet"
												v-if="mShowStatus == 2" :key="`allWallet${ind}`"
												:class="[active_id == itm.id?'ac-rec-row-active':'']"
												@click="selectCarChange(itm,2)">
												<template v-if="itm.logo">
													<u-image width="30px" height="30px" borderRadius="8px"
														:src="itm.logo">
														<u-loading slot="loading"></u-loading>
													</u-image>
												</template>
												<view class="label">
													{{$t(itm.pay_type ==1||itm.pay_type ==2||itm.pay_type ==5?itm.pay_name:itm.bank_name)}}
												</view>
											</view>
											<view class="ac-rec-row" v-for="(itm,ind) in allPix" v-if="mShowStatus == 3"
												:key="`allPix${ind}`"
												:class="[active_id == itm.id?'ac-rec-row-active':'']"
												@click="selectCarChange(itm,3)">
												<template v-if="itm.logo">
													<u-image width="30px" height="30px" borderRadius="8px"
														:src="itm.logo">
														<u-loading slot="loading"></u-loading>
													</u-image>
												</template>
												<view class="label m-line-1">
													{{$t(itm.pay_type ==1||itm.pay_type ==2||itm.pay_type ==7?itm.pay_name:itm.bank_name)}}
												</view>
											</view>
											<view class="ac-rec-row" v-for="(itm,ind) in payAgent"
												v-if="mShowStatus == 4" :key="`payAgent${ind}`"
												:class="[active_id == itm.id?'ac-rec-row-active':'']"
												@click="selectCarChange(itm,4)">
												<template v-if="itm.logo">
													<u-image width="30px" height="30px" borderRadius="8px"
														:src="itm.logo">
														<u-loading slot="loading"></u-loading>
													</u-image>
												</template>
												<view class="label m-line-1">
													{{$t(itm.nickname)}}
												</view>
											</view>
										</view>
									</view>
								</uni-forms-item>
								<template v-if="mShowStatus == 4 && (depositInfo.whats_app || depositInfo.telegram)">
									<view class="ac-select-bar">
										<view class="select-collapse u-m-t-8">
											<template v-if="depositInfo.telegram">
												<view class="ac-rec-row" @click="common_copy(depositInfo.telegram)">
													<view class="label">
														{{$t('telegram')}}
													</view>
													<view class="u-flex">
														<view class="u-c-8">{{depositInfo.telegram}}</view>
														<image src="@/static/images/dw/copy.png"
															style="width: 18px;height: 18px;" class="u-m-l-14" mode="">
														</image>
													</view>
												</view>
											</template>
											<template v-if="depositInfo.whats_app">
												<view class="ac-rec-row" @click="common_copy(depositInfo.whats_app)">
													<view class="label">
														{{$t('whats')}}
													</view>
													<view class="u-flex">
														<view class="u-c-8">{{depositInfo.whats_app}}</view>
														<image src="@/static/images/dw/copy.png"
															style="width: 18px;height: 18px;" class="u-m-l-14" mode="">
														</image>
													</view>
												</view>
											</template>
										</view>
									</view>
								</template>
								<template v-if="mShowStatus != 4">
									<view class="ac-select-bar"
										v-if="rechargeType != 1 && rechargeType != 2 && rechargeType != 5 && rechargeType != 7 && rechargeType != null">
										<view class="select-collapse u-m-t-8">
											<view class="ac-rec-row" v-if="depositInfo.bank_qrcode"
												@click="picClick_2(depositInfo.bank_qrcode)">
												<u-image width="65px" height="65px" borderRadius="8px"
													:src="depositInfo.bank_qrcode">
													<u-loading slot="loading"></u-loading>
												</u-image>
											</view>
											<template v-if="depositInfo.bank_name">
												<view class="ac-rec-row" @click="common_copy(depositInfo.bank_name)">
													<view class="label">
														{{mShowStatus == 0?$t('user42'):mShowStatus==2?$t('电子钱包名称'):mShowStatus==3?$t('PIX名称'):$t('链名称')}}
													</view>
													<view class="u-flex">
														<view class="u-c-8">{{depositInfo.bank_name}}</view>
														<image src="@/static/images/dw/copy.png"
															style="width: 18px;height: 18px;" class="u-m-l-14" mode="">
														</image>
													</view>
												</view>
											</template>
											<template v-if="depositInfo.bank_number">
												<view class="ac-rec-row" @click="common_copy(depositInfo.bank_number)">
													<view class="label">
														{{mShowStatus == 0?$t('user43'):mShowStatus==2?$t('电子钱包账户'):mShowStatus==3?$t('PIX账户'):$t('收币地址')}}
													</view>
													<view class="u-flex">
														<view class="u-c-8">{{depositInfo.bank_number}}</view>
														<image src="@/static/images/dw/copy.png"
															style="width: 18px;height: 18px;" class="u-m-l-14" mode="">
														</image>
													</view>
												</view>
											</template>
											<template v-if="depositInfo.bank_khm">
												<view class="ac-rec-row" @click="common_copy(depositInfo.bank_khm)">
													<view class="label">
														{{$t('user40')}}
													</view>
													<view class="u-flex">
														<view class="u-c-8">{{depositInfo.bank_khm}}</view>
														<image src="@/static/images/dw/copy.png"
															style="width: 18px;height: 18px;" class="u-m-l-14" mode="">
														</image>
													</view>
												</view>
											</template>
											<template v-if="depositInfo.financial">
												<view class="ac-rec-row" @click="common_copy(depositInfo.financial)">
													<view class="label">
														{{$t('金融编码')}}
													</view>
													<view class="u-flex">
														<view class="u-c-8">{{depositInfo.financial}}</view>
														<image src="@/static/images/dw/copy.png"
															style="width: 18px;height: 18px;" class="u-m-l-14" mode="">
														</image>
													</view>
												</view>
											</template>
											<template v-if="depositInfo.bank_open">
												<view class="ac-rec-row" @click="common_copy(depositInfo.bank_open)">
													<view class="label">
														{{$t('开户行')}}
													</view>
													<view class="u-flex">
														<view class="u-c-8">{{depositInfo.bank_open}}</view>
														<image src="@/static/images/dw/copy.png"
															style="width: 18px;height: 18px;" class="u-m-l-14" mode="">
														</image>
													</view>
												</view>
											</template>
										</view>
									</view>
									<view class="u-m-b-20 u-m-t-30 u-flex u-row-between u-col-bottom">
										<view class="">
											<text>{{$t('存款金额')}}</text>
											<text style="color: #D12C2C;">*</text>
										</view>
										<view class="u-flex">
											<template
												v-if="showRechargeRate == 1 && depositInfo.currencyApi.recharge_rate">
												<view class="text-yellow u-m-l-14">
													{{$t('到账金额')}}
													{{parseFloat(rechargePrice * depositInfo.currencyApi.recharge_rate).toFixed(2) + ' ' + (currency_type==1?'USDT':bankAll.currency_code)}}
												</view>
											</template>
										</view>
									</view>
									<view class="u-flex">
										<view class="flex_bd">
											<uni-easyinput type="number" v-model="rechargePrice" @input="rechargeInput"
												:placeholder="$t('user60')" :disabled="rechargeInputDis"
												:styles="styles" />
										</view>
										<template v-if="showRechargeRate == 1 && depositInfo.currencyApi.recharge_rate">
											<view class="huil_class">1 : {{depositInfo.currencyApi.recharge_rate}}
											</view>
										</template>
									</view>
									<view class="w_100 u-flex u-flex-wrap u-m-t-20" v-if="showQuM">
										<template v-if="carQuick.length > 0">
											<view v-for="(item,index) in carQuick" :key="`${index}`+'quick'"
												class="u-m-10"
												:class="item == rechargePrice?'quickListActive_m':'quickList_m'"
												@click="showQuickListIndexBank(item,index)">
												<view class="m-rela">
													<text>{{toThousands(item)}}</text>
													<text class="u-abso"
														style="font-size: 10px;top: -12px;right: 1px;">{{quickSub[index]?quickSub[index]:''}}</text>
												</view>
											</view>
										</template>
										<template v-else>
											<template v-if="mShowStatus==0||mShowStatus==2||mShowStatus==3">
												<view v-for="(item,index) in quickRechargeBank"
													:key="`${index}`+'quick'" class="u-m-10"
													:class="item == rechargePrice?'quickListActive_m':'quickList_m'"
													@click="showQuickListIndexBank(item,index)">
													<view class="m-rela">
														<text>{{toThousands(item)}}</text>
														<text class="u-abso"
															style="font-size: 10px;top: -12px;right: 1px;">{{quickSub[index]?quickSub[index]:''}}</text>
													</view>
												</view>
											</template>
											<template v-if="mShowStatus==1">
												<view v-for="(item,index) in quickRechargeUsdt"
													:key="`${index}`+'quick'" class="u-m-10"
													:class="item == rechargePrice?'quickListActive_m':'quickList_m'"
													@click="showQuickListIndexBank(item,index)">
													<view class="m-rela">
														<text>{{toThousands(item)}}</text>
														<text class="u-abso"
															style="font-size: 10px;top: -12px;right: 1px;">{{quickSub[index]?quickSub[index]:''}}</text>
													</view>
												</view>
											</template>
										</template>
									</view>
									<view class="u-m-b-20 u-m-t-30" v-for="(item,index) in rechargeArr" :key="index">
										<view class="u-m-b-16 u-m-t-20">
											<text>{{$t(item.title)}}</text>
											<text style="color: #D12C2C;">*</text>
										</view>
										<view class="flex_bd">
											<uni-easyinput type="text" v-model="item.titleValue"
												:placeholder="$t(item.remark)" :styles="styles" />
										</view>
									</view>
									<template
										v-if="rechargeType != 1 && rechargeType != 2 && rechargeType != 5 && rechargeType != 7 && rechargeType != null">
										<uni-forms-item name="bname" class="u-m-t-30">
											<view class="u-m-b-16 u-m-t-20">
												<text>{{$t('上传付款凭证')}}</text>
												<text style="color: #D12C2C;">*</text>
											</view>
											<u-upload upload-text="" :multiple="false" max-count="1"
												:header="uploadHeader" :source-type="['album', 'camera']"
												del-bg-color="#2B44B1" :action="action" :show-progress="false"
												@on-change="onChangeUpload" :custom-btn="true">
												<view slot="addBtn" class="sc_img_1">
													<u-image width="26px" height="20px" :src="pz_img_1">
														<u-loading slot="loading"></u-loading>
													</u-image>
												</view>
											</u-upload>
										</uni-forms-item>
									</template>
								</template>
							</uni-forms> -->

							<view class="u-m-b-20 u-m-t-30">
								<view class="">
									<text>{{$t('存款金额')}}</text>
									<text style="color: #D12C2C;">*</text>
								</view>
							</view>
							<view class="u-flex">
								<view class="flex_bd">
									<uni-easyinput type="number" v-model="rechargePrice" @input="rechargeInput"
										:placeholder="$t('user60')" :disabled="rechargeInputDis" :styles="styles" />
								</view>
								<template v-if="showRechargeRate == 1 && depositInfo.currencyApi.recharge_rate">
									<view class="huil_class">1 : {{depositInfo.currencyApi.recharge_rate}}
									</view>
								</template>
							</view>
							<view class="u-flex u-m-t-14">
								<template v-if="showRechargeRate == 1 && depositInfo.currencyApi.recharge_rate">
									<view class="text-yellow">
										{{$t('到账金额')}}
										{{parseFloat(rechargePrice * depositInfo.currencyApi.recharge_rate).toFixed(2) + ' ' + (currency_type==1?'USDT':bankAll.currency_code)}}
									</view>
								</template>
							</view>
							<!-- 快捷金额 -->
							<view class="w_100 u-flex u-flex-wrap u-m-t-20">
								<template v-if="mShowStatus==0||mShowStatus==2||mShowStatus==3">
									<view v-for="(item,index) in quickRechargeBank" :key="`${index}`+'quick'"
										class="u-m-10" :class="item == rechargePrice?'quickListActive_m':'quickList_m'"
										@click="showQuickListIndexBank(item,index)">
										<view class="m-rela">
											<text>{{toThousands(item)}}</text>
											<text class="u-abso"
												style="font-size: 10px;top: -12px;right: 1px;">{{quickSub[index]?quickSub[index]:''}}</text>
										</view>
									</view>
								</template>
								<template v-if="mShowStatus==1">
									<view v-for="(item,index) in quickRechargeUsdt" :key="`${index}`+'quick'"
										class="u-m-10" :class="item == rechargePrice?'quickListActive_m':'quickList_m'"
										@click="showQuickListIndexBank(item,index)">
										<view class="m-rela">
											<text>{{toThousands(item)}}</text>
											<text class="u-abso"
												style="font-size: 10px;top: -12px;right: 1px;">{{quickSub[index]?quickSub[index]:''}}</text>
										</view>
									</view>
								</template>
							</view>
							<view class="wt-foot u-m-t-50">
								<view class="btn btn--submit m-font-b" @click="onlineSubmit">{{$t('确认充值')}}
								</view>
							</view>
							<view class="wt-tip"
								v-if="bankRechargePrompt || walletRechargePrompt || PIXRechargePrompt || usdtRechargePromptValue">
								{{mShowStatus == 0?$t(bankRechargePrompt):mShowStatus==2?$t(walletRechargePrompt):mShowStatus==3?$t(PIXRechargePrompt):$t(usdtRechargePromptValue)}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>
		<!--充值规则  -->
		<uni-popup ref="rulePopup" type="center">
			<view class="bs-popup bs-center-popup">
				<view class="bs-popup-hd">{{$t('user85')}}</view>
				<scroll-view scroll-y="true" style="height: 350px;">
					<view class="bs-popup-body bs-popup-bg-1" style="touch-action: none">
						<view class="art-body" style="overflow: auto;" v-html="web_rule_common_4"></view>
					</view>
				</scroll-view>
				<view class="bs-foot-button flex-center justify-center" style="padding:0 15px 15px 15px">
					<button type="default" @click="closeX()" class="btn btn--default">{{$t('public6')}}</button>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="rechargeSuc" type="bottom">
			<view class="uc-pop">
				<view class="u-p-40 pop-bottom">
					<view class="u-flex u-row-center flex--direction">
						<image src="@/static/images/dw/su.png" style="width: 88px;height: 88px;" mode=""></image>
						<view class="u-p-t-20 u-p-b-20">{{$t('充值成功')}}</view>
						<view class="u-m-t-20 u-c-9">{{$t('您的充值需求已发送')}}</view>
						<view class="w_100 btn--submit u-text-center u-p-20 u-m-t-30" @click="rechargeSucClose">
							<view class="m-line-1 m-font-b">{{$t('继续充值')}}</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="rechargeErr" type="bottom">
			<view class="uc-pop">
				<view class="u-p-40 pop-bottom">
					<view class="u-flex u-row-center flex--direction">
						<image src="@/static/images/dw/error.png" style="width: 88px;height: 88px;" mode=""></image>
						<view class="u-p-t-20 u-p-b-20">{{$t('充值失败')}}</view>
						<view class="u-m-t-20 u-c-9">{{$t(errorText)}}</view>
						<view class="w_100 btn--submit u-text-center u-p-20 u-m-t-30" @click="rechargeErrClose">
							<view class="m-line-1 m-font-b">{{$t('确定')}}</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
		</u-top-tips>
		<!-- 渲染FORM表单 -->
		<view class="" v-if="payInfo">
			<div v-html="payInfo.form"></div>
		</view>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	import uploadFile from "@/components/upload-file/upload-file.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			pcNavHeader,
			pcSideBar,
			uploadFile
		},
		data() {
			return {
				sideshow: false,
				// 表单
				recharge_rate: 0,
				currency_code: "",
				formData: {
					rprice: '',
				},
				tabs: [],
				depositInfo: {},
				rules: {
					// 对name字段进行必填验证					
					rprice: {
						rules: [{
							required: true,
							errorMessage: this.$t('user831'),
						}, ]
					},
				},
				// news
				payInfo: '',
				bankAll: {}, //所有平台收款信息
				currency_type: 0, //货币类型
				sBtnL: 0,
				sBtnF: 0,
				onlinePriceMin: 0, //线上充值金额最低
				onlinePriceMax: 0, //线上充值金额最高
				offlinePriceMin: 0, //线下充值金额最低
				offlinePriceMax: 0, //线下充值金额最高
				onlineUsdtShow: 0, //线上USDT充值汇率
				onlineBankShow: 0, //线下USDT充值汇率
				onelineBankId: 0, //线上充值卡id
				offlineBankId: 0, //线下充值卡id
				onlinePayType: 0,
				offlinePayType: 0,
				offlineUsdtShow: 0,
				offlineBankShow: 0,
				showBankUsdtStatus: 0,
				onlineUsdtType: '',
				onLinePay: {
					onlinePrice: '',
					offlinePrice: '',
					bankcrad: ''
				},
				receivingCode: '',
				pz_img_1: "../../static/images/skin/default/push.png",
				pz_img_2: "",
				rechargePriceInput: '../../static/images/topboom/money_circle.png',
				rechargeList: [],
				rechargePrice: '',
				customStyle: {
					paddingLeft: '40px',
					borderRadius: '16px',
					backgroundColor: '#25282F',
					borderColor: '#3F4249',
					color: "#000",
					height: "50px"
				},
				quickRechargeBank: [],
				quickRechargeUsdt: [],
				quickListIndexBank: null,
				quickListIndexUsdt: null,
				allBankInfo: [], //组合线上线下银行卡
				allBank: [], //银行卡
				allUsdt: [], //USDT
				allWallet: [], //电子钱包
				allPix: [], //PIX
				bankId: null,
				usdt_type: '',
				rechargeType: null,
				usdt_bank_name: '',
				showRechargeRate: null,
				rechargeRemarks: '',
				mRecharge: false,
				navBarText: '',
				mShowStatus: 0, // 0银行卡 1USDT 2电子钱包 3PIX
				payMinPrice: '', //最低充值
				payMaxPrice: '', //最高充值
				rechargeArr: [],
				submitRechargeArr: [],
				set_content_str: '',
				bankTitlePrompt: '', //银行卡充值提示 title
				walletTitlePrompt: '', //电子钱包充值提示 title
				PIXTitlePrompt: '', //PIX充值提示 title
				usdtTitlePrompt: '', //USDT充值提示 title
				bankRechargePrompt: '', //银行卡充值提示 value
				walletRechargePrompt: '', //电子钱包充值提示 value
				PIXRechargePrompt: '', //PIX充值提示 value
				usdtRechargePromptValue: '', //USDT充值提示 value
				bankTips: '', // 银行卡提示信息
				usdtTips: '', // USDT提示信息
				walletTips: '', // 电子钱包提示信息
				pixTips: '', // PIX提示信息
				bankTipsUrl: '', //银行卡显示链接
				usdtTipsUrl: '', //USDT显示链接
				walletTipsUrl: '', //电子钱包显示链接
				pixTipsUrl: '', //PIX显示链接
				isTelegram: false,
				isWhatsapp: false,
				topTabsCurrent: 0,
				styles: {
					color: "#fff",
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
				tipShow: true,
				rechcollapse: false,
				rechargeCarName: this.$t('请选择卡片'),
				rechargeInfo: false,
				active_id: null,
				payAgent: [],
				quickSub: [],
				carQuick: [],
				rechargeInputDis: false,
				action: '',
				uploadHeader: {},
				showQuM: false,
				errorText: ''
			}
		},
		async onLoad() {
			await this.recharge_get_all();
			await this.getRechargeParame();
			// await this.getRule_common(4);
			await this.getRechargeRemarks();
			await this.getTips();
		},
		onShow() {
			this.getWithStatus();
		},
		methods: {
			rechargeInput(e) {
				this.$nextTick(_ => {
					this.rechargePrice = this.clearNoNum(e);
				})
			},
			rechargeSucClose() {
				this.$refs.rechargeSuc.close()
			},
			goRechargeSucClose() {
				this.$refs.rechargeSuc.close();
				this.$go('/pages/ucenter/record');
			},
			rechargeSucChange() {
				this.$refs.rechargeSuc.open()
			},
			rechargeErrClose() {
				this.$refs.rechargeErr.close()
			},
			rechargeErrChange() {
				this.$refs.rechargeErr.open()
			},
			topTabsChange(i) {
				this.usdt_type = '';
				this.rechargeInputDis = false;
				this.quickSub = [];
				this.carQuick = [];
				this.rechargeArr = [];
				this.depositInfo = {};
				this.rechargeCarName = this.$t('请选择卡片');
				this.showRechargeRate = null;
				this.rechcollapse = false;
				this.rechargeType = null;
				this.active_id = null;
				this.rechargeInfo = false;
				this.rechargePrice = '';
				this.quickListIndexBank = null;
				this.quickListIndexBank = null;
				this.topTabsCurrent = i;
				if (this.allUsdt.length > 0) {
					this.usdt_type = this.allUsdt[0].usdt_type;
				}
				if (this.rechargeList[i].uname == 'bank') {
					this.mShowStatus = 0;
					this.depositInfo = this.allBank[0];
					// this.getPrepaidPhoneInformation('bank');
				} else if (this.rechargeList[i].uname == 'usdt') {
					this.mShowStatus = 1;
					this.depositInfo = this.allUsdt[0];
					// this.getPrepaidPhoneInformation('usdt');
				} else if (this.rechargeList[i].uname == 'wallet') {
					this.mShowStatus = 2;
					this.depositInfo = this.allWallet[0];
					// this.getPrepaidPhoneInformation('wallet');
				} else if (this.rechargeList[i].uname == 'pix') {
					this.mShowStatus = 3;
					this.depositInfo = this.allPix[0];
					// this.getPrepaidPhoneInformation('pix');
				} else if (this.rechargeList[i].uname == 'pay_agent') {
					this.mShowStatus = 4;
					// this.getPrepaidPhoneInformation('pay_agent');
				};
				
				if (this.currency_type == 2 && (this.rechargeList[i].uname == 'bank' || this.rechargeList[i].uname ==
						'pix' || this.rechargeList[i].uname == 'wallet')) {
					this.showRechargeRate = 0;
				} else if (this.currency_type == 1 && (this.rechargeList[i].uname == 'bank' || this.rechargeList[i].keys ==
						'pix' || this.rechargeList[i].uname == 'wallet')) {
					this.showRechargeRate = 1;
				} else if (this.currency_type == 2 && this.rechargeList[i].uname == 'usdt') {
					this.showRechargeRate = 1;
				} else if (this.currency_type == 1 && this.rechargeList[i].uname == 'usdt') {
					this.showRechargeRate = 0;
				}
				
			},
			selectCarChange(e, i) {
				this.carQuick = [];
				this.rechcollapse = false;
				this.rechargeInfo = false;
				this.active_id = null;
				if (e.is_input == 1) {
					this.rechargePrice = '';
					this.rechargeInputDis = true;
				} else {
					this.rechargeInputDis = false;
				}
				this.showBankUsdtStatus = 0;
				if (e.currencyApi.name == 'RUB') {
					this.showQuM = false;
				} else {
					this.showQuM = true;
				}
				// 是否显示汇率
				if (this.currency_type == 2 && e.type == 1) {
					this.showRechargeRate = 1
				}
				if (this.currency_type == 1 && (e.type == 0 || e.type == 2 || e.type == 3)) {
					this.showRechargeRate = 1
				}
				if (this.currency_type == 1 && e.type == 1) {
					this.showRechargeRate = 0
				}
				if (this.currency_type == 2 && (e.type == 0 || e.type == 2 || e.type == 3)) {
					this.showRechargeRate = 0
				}
				// 卡片选择
				if (i == 3) {
					if (e.pay_type == 1 || e.pay_type == 2 || e.pay_type == 7) {
						this.rechargeCarName = e.pay_name;
					} else {
						this.rechargeCarName = e.bank_name;
					}
				} else if (i == 2) {
					if (e.pay_type == 1 || e.pay_type == 2 || e.pay_type == 5) {
						this.rechargeCarName = e.pay_name;
					} else {
						this.rechargeCarName = e.bank_name;
					}
				} else if (i == 1) {
					if (e.pay_type == 1 || e.pay_type == 2) {
						this.rechargeCarName = e.pay_name;
					} else {
						this.rechargeCarName = e.bank_name;
					}
				} else if (i == 0) {
					if (e.pay_type == 1 || e.pay_type == 2) {
						this.rechargeCarName = e.pay_name;
					} else {
						this.rechargeCarName = e.bank_name;
					}
				} else if (i == 4) {
					this.rechargeCarName = e.nickname;
				}
				// 获取卡片信息
				this.bankId = e.id;
				this.active_id = e.id;
				this.usdt_type = e.usdt_type;
				this.rechargeType = e.pay_type;
				this.usdt_bank_name = e.bank_name;
				this.showBankUsdtStatus = e.type;
				this.depositInfo = e;
				if (this.depositInfo.fast_pay) {
					this.carQuick = this.depositInfo.fast_pay;
				}
				if (this.depositInfo.rebateSet) {
					let quickBank = {};
					if (this.carQuick.length > 0) {
						quickBank = this.carQuick;
					} else {
						if (this.mShowStatus == 0 || this.mShowStatus == 2 || this.mShowStatus == 3) {
							quickBank = this.quickRechargeBank;
						} else {
							quickBank = this.quickRechargeUsdt;
						}
					}
					let arr = [];
					for (let i in quickBank) {
						arr[i] = 0;
						for (let j in this.depositInfo.rebateSet) {
							if (Number(quickBank[i]) >= Number(this.depositInfo.rebateSet[j].min) &&
								Number(quickBank[i]) < Number(this.depositInfo.rebateSet[j].max)) {
								arr[i] = Number(quickBank[i]) * (Number(this.depositInfo.rebateSet[j].proportion) / 100);
							}
						}
					}
					this.quickSub = arr;
				} else {
					this.quickSub = [];
				}
			},
			getWithStatus() {
				if (this.$helper.get('userInfo').sc_date == 1) {
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}
			},
			backUrl() {
				let href = this.$t('back_url');
				window.location.href = href;
			},
			usdtUrl() {
				let href = this.$t('usdt_url');
				window.location.href = href;
			},
			walletUrl() {
				let href = this.$t('wallet_url');
				window.location.href = href;
			},
			pixUrl() {
				let href = this.$t('pix_url');
				window.location.href = href;
			},
			//获取充值信息
			getPrepaidPhoneInformation(pay_type) {
				let query = {
					pay_type
				}
				this.$u.api.get_prepaid_phon_information(query).then(res => {
					res.data.set_content.forEach(item => {
						item.titleValue = ""
						item.remarkValue = ""
						this.rechargeArr.push(item)
					})
				})
			},
			getTips() {
				this.action = process.env.VUE_APP_API_BASE_URL + '/upload/img';
				var token = this.$helper.get('token');
				var token_key = this.$helper.get('token_key');
				this.uploadHeader.usertoken = token;
				this.uploadHeader.usertokenkey = token_key;
				// 获取银行卡提示信息
				if (this.$t('bankTips') != 'bankTips') {
					this.bankTips = this.$t('bankTips');
				} else {
					this.bankTips = '';
				};
				// 获取USDT提示信息
				if (this.$t('usdtTips') != 'usdtTips') {
					this.usdtTips = this.$t('usdtTips');
				} else {
					this.usdtTips = '';
				};
				// 获取电子钱包提示信息
				if (this.$t('walletTips') != 'walletTips') {
					this.walletTips = this.$t('walletTips');
				} else {
					this.walletTips = '';
				};
				// 获取PIX提示信息
				if (this.$t('pixTips') != 'pixTips') {
					this.pixTips = this.$t('pixTips');
				} else {
					this.pixTips = '';
				};
				// 链接
				if (this.$t('bankTipsUrl') != 'bankTipsUrl') {
					this.bankTipsUrl = this.$t('bankTipsUrl');
				} else {
					this.bankTipsUrl = '';
				};
				if (this.$t('usdtTipsUrl') != 'usdtTipsUrl') {
					this.usdtTipsUrl = this.$t('usdtTipsUrl');
				} else {
					this.usdtTipsUrl = '';
				};
				if (this.$t('walletTipsUrl') != 'walletTipsUrl') {
					this.walletTipsUrl = this.$t('walletTipsUrl');
				} else {
					this.walletTipsUrl = '';
				};
				if (this.$t('pixTipsUrl') != 'pixTipsUrl') {
					this.pixTipsUrl = this.$t('pixTipsUrl');
				} else {
					this.pixTipsUrl = '';
				};
				//银行卡充值提示 title
				if (this.$t('bankTitlePrompt') != 'bankTitlePrompt') {
					this.bankTitlePrompt = this.$t('bankTitlePrompt');
				} else {
					this.bankTitlePrompt = '';
				};
				//电子钱包充值提示 title
				if (this.$t('walletTitlePrompt') != 'walletTitlePrompt') {
					this.walletTitlePrompt = this.$t('walletTitlePrompt');
				} else {
					this.walletTitlePrompt = '';
				};
				//PIX充值提示 title
				if (this.$t('PIXTitlePrompt') != 'PIXTitlePrompt') {
					this.PIXTitlePrompt = this.$t('PIXTitlePrompt');
				} else {
					this.PIXTitlePrompt = '';
				};
				//USDT充值提示 title
				if (this.$t('usdtTitlePrompt') != 'usdtTitlePrompt') {
					this.usdtTitlePrompt = this.$t('usdtTitlePrompt');
				} else {
					this.usdtTitlePrompt = '';
				};
				//银行卡充值提示 value
				if (this.$t('bankRechargePrompt') != 'bankRechargePrompt') {
					this.bankRechargePrompt = this.$t('bankRechargePrompt');
				} else {
					this.bankRechargePrompt = '';
				};
				//电子钱包充值提示 value
				if (this.$t('walletRechargePrompt') != 'walletRechargePrompt') {
					this.walletRechargePrompt = this.$t('walletRechargePrompt');
				} else {
					this.walletRechargePrompt = '';
				};
				//PIX充值提示 value
				if (this.$t('PIXRechargePrompt') != 'PIXRechargePrompt') {
					this.PIXRechargePrompt = this.$t('PIXRechargePrompt');
				} else {
					this.PIXRechargePrompt = '';
				};
				//USDT充值提示 value
				if (this.$t('usdtRechargePrompt') != 'usdtRechargePrompt') {
					this.usdtRechargePromptValue = this.$t('usdtRechargePrompt');
				} else {
					this.usdtRechargePromptValue = '';
				};
				// 是否显示电子钱包客服列表
				if (this.$t('TelegramInfo') != 'TelegramInfo') {
					this.isTelegram = true;
				} else {
					this.isTelegram = false;
				};
				if (this.$t('WhatsappInfo') != 'WhatsappInfo') {
					this.isWhatsapp = true;
				} else {
					this.isWhatsapp = false;
				};
			},
			telegramClick() {
				switch (uni.getSystemInfoSync().platform) {
					case 'android':
						window.open(this.$t('telegram_go_url'), '_blank');
						break;
					case 'ios':
						window.location.href = this.$t('telegram_go_url');
						break;
					default:
						window.location.href = this.$t('telegram_go_url');
						break;
				}
			},
			whatsappClick() {
				switch (uni.getSystemInfoSync().platform) {
					case 'android':
						window.open(this.$t('whatsapp_go_url'), '_blank');
						break;
					case 'ios':
						window.location.href = this.$t('whatsapp_go_url');
						break;
					default:
						window.location.href = this.$t('whatsapp_go_url');
						break;
				}
			},
			getRechargeRemarks() {
				if (this.$t('rechargeRemarks') != 'rechargeRemarks') {
					this.rechargeRemarks = this.$t('rechargeRemarks');
				} else {
					this.rechargeRemarks = '';
				}
			},
			showQuickListIndexBank(price, e) {
				this.quickListIndexBank = e;
				this.rechargePrice = price;
			},
			// 获取充值状态
			async getRechargeParame() {
				uni.showLoading({
					title: this.$t('loading')
				})
				let res = await this.$u.api.rechargeparame_p();
				if (res) {
					uni.hideLoading();
					this.quickRechargeBank = res.data.quick_recharge;
					this.quickRechargeUsdt = res.data.usdt_quick_recharge;
				}
			},
			menuClick() {
				this.sideshow = !this.sideshow;
			},
			async recharge_get_all() {
				uni.showLoading({
					title: this.$t('loading')
				})
				let res = await this.$u.api.recharge_get_all_p();
				if (res) {
					uni.hideLoading();
					this.bankAll = res.data;
					// 根据接口拼接线上线下数据
					this.allBankInfo = res.data.offline.concat(res.data.online);
					for (let i in this.allBankInfo) {
						// 获取银行卡
						if (this.allBankInfo[i].type == 0) {
							this.allBank.push(this.allBankInfo[i]);
						}
						// 获取USDT
						if (this.allBankInfo[i].type == 1) {
							this.allUsdt.push(this.allBankInfo[i]);
						}
						// 获取电子钱包
						if (this.allBankInfo[i].type == 2) {
							this.allWallet.push(this.allBankInfo[i]);
						}
						// 获取PIX
						if (this.allBankInfo[i].type == 3) {
							this.allPix.push(this.allBankInfo[i]);
						}
					};
					this.payAgent = res.data.pay_agent;
					this.$nextTick(_ => {
						if (this.payAgent.length > 0) {
							this.rechargeList.unshift({
								name: this.$t('银商'),
								uname: 'pay_agent',
								img: '../../static/images/topboom/payment_card_outline_24.png',
								disabled: false,
							});
							this.mShowStatus = 4;
						}
						if (this.allPix.length > 0) {
							this.rechargeList.unshift({
								name: this.$t('PIX'),
								uname: 'pix',
								img: '../../static/images/topboom/pix.png',
								disabled: false,
							});
							this.mShowStatus = 3;
						}
						if (this.allWallet.length > 0) {
							this.rechargeList.unshift({
								name: this.$t('电子钱包'),
								uname: 'wallet',
								img: '../../static/images/topboom/payment_card_outline_24.png',
								disabled: false,
							});
							this.mShowStatus = 2;
						}
						if (this.allUsdt.length > 0) {
							this.rechargeList.unshift({
								name: this.$t('USDT'),
								uname: 'usdt',
								img: '../../static/images/topboom/USDT.png',
								disabled: false,
							});
							this.mShowStatus = 1;
						}
						if (this.allBank.length > 0) {
							this.rechargeList.unshift({
								name: this.$t('银行卡'),
								uname: 'bank',
								img: '../../static/images/topboom/payment_card_outline_24.png',
								disabled: false,
							});
							this.mShowStatus = 0;
						}
						this.currency_type = res.data.currency_defa; //货币类型
					});
					if (this.currency_type == 2 && (this.rechargeList[0].uname == 'bank' || this.rechargeList[0]
							.uname == 'pix' || this.rechargeList[0].uname == 'wallet')) {
						this.isUsdt = 0;
					} else if (this.currency_type == 1 && (this.withdrawList[0].keys == 'bank' || this
							.rechargeList[0].uname == 'pix' || this
							.rechargeList[0].uname == 'wallet')) {
						this.isUsdt = 1;
					} else if (this.currency_type == 2 && this.rechargeList[0].uname == 'usdt') {
						this.isUsdt = 1;
					} else if (this.currency_type == 1 && this.rechargeList[0].uname == 'usdt') {
						this.isUsdt = 0;
					}
				}
			},
			async onlineSubmit() {
				var _this = this;
				// if (_this.rechargeType == null) {
				// 	_this.$refs.uTips.show({
				// 		title: _this.$t('请选择充值卡')
				// 	});
				// } else 
				if (_this.rechargePrice == '') {
					_this.$refs.uTips.show({
						title: _this.$t('请输入充值个数')
					});
				} else {
					let numberPrice = Number(_this.rechargePrice);
					let numberPayMinPrice = Number(this.payMinPrice);
					let numberPaxMinPrice = Number(this.payMaxPrice);
					if (numberPayMinPrice > 1) {
						if (numberPrice < numberPayMinPrice) {
							_this.$refs.uTips.show({
								title: _this.$t('金额过小')
							});
						} else if (numberPaxMinPrice < numberPrice) {
							_this.$refs.uTips.show({
								title: _this.$t('金额过大')
							});
						} else {
							_this.userRecharge();
						}
					} else {
						_this.userRecharge();
					}
				}
			},
			async offLineSubmit() {
				var _this = this;
				if (_this.pz_img_2 == "") {
					_this.$refs.uTips.show({
						title: _this.$t('请上传凭证')
					});
				} else {
					if (this.setRecharge()) {
						uni.showLoading({
							title: this.$t('loading')
						})
						let parm2 = {
							type: _this.rechargeType,
							bank_sk_id: _this.bankId,
							credentials: _this.pz_img_2,
							apply_price: _this.rechargePrice,
							// remarks: _this.onLinePay.bankcrad,
							set_content: _this.set_content_str,
						};

						let res = await this.$u.api.rechargeapply_p(parm2);
						if (res.code == 1) {
							uni.hideLoading();
							this.rechargeSucChange();
							this.rechargePrice = '';
							this.quickListIndexBank = null;
							this.quickListIndexUsdt = null;
							this.closePzImg();
						} else {
							this.rechargeErrChange();
							this.errorText = res.msg;
							// _this.$refs.uTips.show({
							// 	title: _this.$t(res.msg)
							// });
						}
					}

				}
			},
			async userRecharge() {
				var _this = this;
				if (_this.rechargePrice == '') {
					_this.$refs.uTips.show({
						title: _this.$t('请输入充值个数')
					});
				} else {
					let parm1 = {
						// type: _this.rechargeType,
						// pay_set_id: _this.bankId,
						type: this.topTabsCurrent == 0 ? 1 : 2,
						// pay_set_id: 0,
						apply_price: _this.rechargePrice,
						usdt_type: _this.usdt_type
					};
					// if (_this.rechargeType == 1 || _this.rechargeType == 2 || _this.rechargeType == 5 || _this
					// 	.rechargeType == 7) {
					uni.showLoading({
						title: _this.$t('loading')
					});
					let res = await this.$u.api.rechargeapply_p(parm1);
					if (res.code == 1) {
						uni.hideLoading();
						if (res.data.handle_type == "navto") {
							switch (uni.getSystemInfoSync().platform) {
								case 'android':
									window.open(res.data.pay_url);
									break;
								case 'ios':
									window.location.href = res.data.pay_url;
									break;
								default:
									window.open(res.data.pay_url);
									break;
							}
						} else {
							_this.payInfo = res.data
							uni.showLoading({
								title: _this.$t('loading')
							})
							setTimeout(function() {
								uni.hideLoading();
								document.getElementById("paysubmit").submit()
							}, 1000)
						}
					} else {
						_this.$refs.uTips.show({
							title: _this.$t(res.msg)
						});
					}
					// } else {
					// 	this.offLineSubmit();
					// }
				}
			},
			setRecharge() {
				let that = this;
				this.submitRechargeArr = [];
				let list = this.rechargeArr;
				var a = 0;
				that.set_content_str = '';
				try {
					list.forEach((item, index) => {
						if (item.required == '1' && item.titleValue.trim() == '') {
							// uni.showToast({
							// 	title: this.$t('请输入') + this.$t(item.title),
							// 	icon: "none"
							// })
							// title: that.$t('请输入') + that.$t(item.title)
							that.$refs.uTips.show({
								title: that.$t(item.title)
							});
							a += 1;
							throw new Error("EndIterative");

						} else {
							a = 0;
							let s = index < list.length - 1 ? ',' : '';
							that.set_content_str += item.title + ':' + item.titleValue + s;
							this.submitRechargeArr.push(item);

						}
					})
				} catch (e) {

				}

				if (a > 0) {
					return false
				} else {
					return true
				}
			},

			open() {
				this.$refs.popup.open('bottom')
			},
			close() {
				this.$refs.popup.close()
			},
			// 规则
			openX() {
				this.$refs.rulePopup.open()
			},
			closeX() {
				this.$refs.rulePopup.close()
			},
			// 查看凭证大图
			picClick_2(picClick_2) {
				uni.previewImage({
					current: 0,
					urls: [picClick_2],
				});
			},
			onChangeUpload(res, index, lists, name) {
				this.pz_img_2 = lists[0].response.data.file;
			},
			// 上传凭证
			sc_pz() {
				let _self = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					// success: function(res) {
					// 	uni.showLoading({
					// 		title: _self.$t("loading")
					// 	});
					// 	const tempFilePaths = res.tempFilePaths;
					// 	const token = _self.$helper.get('token');
					// 	const token_key = _self.$helper.get('token_key');
					// 	const uploadTask = uni.uploadFile({
					// 		url: _self.$u.api.path + '/upload/img',
					// 		filePath: tempFilePaths[0],
					// 		name: 'file',
					// 		header: {
					// 			'usertoken': token,
					// 			'usertokenkey': token_key
					// 		},
					// 		success: function(uploadFileRes) {
					// 			let res = JSON.parse(uploadFileRes.data);
					// 			if (res.code == 1) {
					// 				uni.hideLoading();
					// 				_self.pz_img_2 = res.data.file;
					// 			} else {
					// 				_self.$refs.uTips.show({
					// 					title: _self.$t(res.msg)
					// 				});
					// 			}
					// 		}
					// 	});
					// 	uploadTask.onProgressUpdate(function(res) {
					// 		_self.percent = res.progress;
					// 	});
					// },
					error: function(e) {}
				});
			},
			closePzImg() {
				this.pz_img_2 = '';
			},
			rechShow() {
				this.rechcollapse = !this.rechcollapse;
			},
			rechInfo() {
				this.rechargeInfo = !this.rechargeInfo;
			}
		}
	}
</script>

<style lang="scss">
	.uni-calendar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: absolute;
	}


	.defaultBtn {
		color: #999;
		font-size: 14px;
		border-radius: 5px;
		background-color: #e6e6e6;
		cursor: pointer;
		display: inline-block;
		margin: 10px;
		width: 100%;
		padding: 6px 8px;
		text-align: center;
	}

	.shouBankDetail_btn {
		color: rgb(219, 155, 27);
		cursor: pointer;
		margin: 0 0 10px 10px;
	}

	.btnActive {
		color: #fff;
		background-color: var(--ui-color-normal);
		transition: all .4s;
	}

	.sc_img_1 {
		width: 100%;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 16px;
		padding: 16px 76px 16px 76px;
		background: rgba(49, 43, 79, 1);
		border: 1px dashed rgba(65, 61, 113, 1);
		// height: 100px;
		// display: flex;
		// align-items: center;
		// justify-content: center;
		// padding: 20px 25px;
		// border-radius: 6px;
		// background-color: var(--form-main-uni-easyinput__content);
		// border: var(--easyinput__border) !important;
		// box-shadow: var(--shadow-bg);
	}

	.pzImg {
		width: 100px;
		height: 100px;
		border-radius: 6px;
	}

	.pz_close {
		position: absolute !important;
		color: #fff;
		font-weight: bold;
		top: 20px;
		right: 20px;
		cursor: pointer;
		width: 20px;
		height: 20px;
	}

	.panel-top-tab {
		display: flex;
		justify-content: space-around;
	}

	.cur_pointer {
		cursor: pointer;
		height: 32px;
		padding: 0 5px;
		cursor: pointer;
		min-width: 80px;
		line-height: 32px;
		border-radius: 3px;
		text-align: center;
	}

	.marginLeft {
		margin-left: 100px;
	}

	.chongzActive {
		height: 32px;
		color: var(--ui-color-normal);
		padding: 0 5px;
		cursor: pointer;
		min-width: 80px;
		line-height: 32px;
		border-radius: 3px;
		text-align: center;
		border-bottom: 3px solid var(--ui-color-normal);
		transition: all .1s;
	}

	.input_amend {
		flex: 1;
		padding: 0 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		border: 2rpx solid #d2d2d2;
		border-radius: 20rpx;
	}

	.pixClass-1 {
		padding: 10px;
		border-radius: 10px;
		background: #48a0d9;
	}

	.pixClass-2 {
		padding: 10px;
		border-radius: 10px;
		background-image: linear-gradient(to right, #389842, #0f6d1f);
	}

	.re_pix_kf {
		background-image: url('../../static/images/old/re_pix_kf.png');
		width: 35px;
		height: 36px;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.re_pix_wa {
		background-image: url('../../static/images/old/re_pix_wa.png');
		width: 35px;
		height: 35px;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.wt-foot .btn {
		height: 48px !important;
		line-height: 48px !important;
		width: 100% !important;
	}

	.uni-forms-item__content .iconfont {
		position: static;
	}

	.pop-bottom .w_50 {
		width: calc(50% - 10px);
	}

	.huil_class {
		background-color: var(--form-main-uni-easyinput__content);
		border: var(--easyinput__border) !important;
		box-shadow: var(--shadow-bg);
		height: 50px;
		line-height: 50px;
		padding: 0 15px 0 10px;
		border-radius: 16px;
		margin-left: 10px;
	}

	.game-tabs {
		margin: 0 15px;

		::v-deep .u-tab-item {
			font-size: 14px;
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
</style>
