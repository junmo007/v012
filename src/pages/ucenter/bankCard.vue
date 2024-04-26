<template>
	<view>
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main u-flex">
				<pcSideBar :pageIndex="3"></pcSideBar>
				<view class="m-bg-w m-c-0 pc-main-right">
					<view class="m-font-b u-m-b-30">{{$t('user27')}}</view>
					<view class="pc-bank-cells u-flex u-flex-wrap w_100">
						<view class="pc-bank-card m-c-0 pc-bank-card-add cur_pc" @click="showa = true">
							<view class="iconfont icon-jia"></view>
							<view class="u-m-t-10">{{$t('user39')}}</view>
						</view>
						<view class="col" v-for="(item,index) in bankList" :key="`list${index}`">
							<view class="pc-bank-card" :class="'pc-bank-style'+item.bank_type">
								<!-- <view class="bank-lg">{{item.bank_name}}</view> -->
								<view class="bank-pos">
									<text class="pos" v-if="item.bank_type == 0">{{$t('user29')}}</text>
									<text class="pos" v-if="item.bank_type == 1">{{$t('USDT')}}</text>
									<text class="pos" v-if="item.bank_type == 2">{{$t('电子钱包')}}</text>
									<text class="pos" v-if="item.bank_type == 3">{{$t('PIX')}}</text>
								</view>
								<view class="bank-foot">
									<!-- <text class="title" v-if="index == bankList.length - 1">*** *** ***
										{{item.bankcrad}}</text>
									<text class="title" v-else>********* {{item.bankcrad}}</text> -->
									<text class="title">********* {{item.bankcrad}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content" :data-theme="themeMode">
				<view class="container">
					<uniNavHeader isback :title="$t('user27')"></uniNavHeader>
					<!-- main -->
					<view class="game-wrapper u-p-b-20">
						<view class="gooLight">
							<view class="bank-cells">
								<template v-if="showEmpty == 1">
									<view class="col" v-for="(item,index) in bankList" :key="`list${index}`">
										<view class="bank-card" :class="'bank-style'+item.bank_type">
											<view class="bank-pos m-font-b">
												<text class="pos" v-if="item.bank_type == 0">{{$t('user29')}}</text>
												<text class="pos" v-if="item.bank_type == 1">{{$t('USDT')}}</text>
												<text class="pos" v-if="item.bank_type == 2">{{$t('电子钱包')}}</text>
												<text class="pos" v-if="item.bank_type == 3">{{$t('PIX')}}</text>
											</view>
											<view class="bank-item" v-if="index == bankList.length - 1">
												<view class="m-font-14">{{item.bank_name}}</view>
												<view class="bank-number">*** *** *** {{item.bankcrad}}</view>
											</view>
											<view class="bank-item" v-else>
												<view class="">{{item.bank_name}}</view>
												<view class="bank-number">*** *** *** {{item.bankcrad}}</view>
											</view>
										</view>
									</view>
								</template>
								<template v-if="showEmpty == 0">
									<listEmpty :isDefault="true" :listHighly='450'>
									</listEmpty>
								</template>
								<view class="bank-add-cell">
									<view class="btn--default" @click="addBankChange"
										:class="bankList.length < 1 ? 'u-m-t-50':''">
										<text class="tt ">{{$t('user39')}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10999">
		</u-top-tips>
		<!-- 类型 -->
		<u-popup v-model="showa" mode="bottom" :custom-style="customStyle" border-radius="32" @close="closea"
			:mask-custom-style="uPopMaskCustomStyle">
			<view class="bs-popup">
				<view class="bs-popup-hd">
					<view class="tt">{{$t('卡类型')}}</view>
					<image src="@/static/images/index/close.png"
						style="width: 32px;height: 32px;position: absolute;right: 15px;" mode="" @click="closea">
					</image>
				</view>
				<view class="bs-popup-bd">
					<view class="bank_type-select u-p-30">
						<radio-group @change="selectBankType">
							<label class="btn btn-type" v-for="(item, index) in paytype" :key="index">
								<view class="m-font-16">{{$t(item)}}</view>
								<view class="radio-item">
									<radio :value="item" :checked="index === typeCur" />
								</view>
								<view class="iconfont icon-right highlight"></view>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 卡包管理-新增Pix1 -->
		<u-popup v-model="showb" mode="bottom" border-radius="32" :custom-style="customStyle" @close="closeb"
			:mask-custom-style="uPopMaskCustomStyle" :width="mobile_common?'':'460px'">
			<view class="bs-popup-hd u-p-30">
				<image src="@/static/images/index/menu/back.png"
					style="width: 32px;height: 32px;position: absolute;left: 15px;" @click="backShowb">
				</image>
				<view class="tt">{{$t(formData.bank_type)}}</view>
				<image src="@/static/images/index/close.png"
					style="width: 32px;height: 32px;position: absolute;right: 15px;" mode="" @click="closeb">
				</image>
			</view>
			<view class="bs-popup-bd">
				<view class="form-main u-p-30">
					<uni-forms err-show-type="toast" ref="form" :modelValue="formData" :rules="rules" :border="false">
						<!-- 银行卡 添加 -->
						<uni-forms-item name="bname" v-if="isUsdt==0 || isUsdt==99">
							<view class="u-m-b-16">
								<text>{{$t('user40')}}</text>
								<text style="color: #D12C2C;">*</text>
							</view>
							<uni-easyinput type="text" v-model="formData.bname" :styles="styles" />
						</uni-forms-item>
						<template v-if="isUsdt==0">
							<uni-forms-item name="bnumbar">
								<view class="u-m-b-16 u-m-t-20">
									<text>{{$t('user43')}}</text>
									<text style="color: #D12C2C;">*</text>
								</view>
								<uni-easyinput type="number" v-model="formData.bnumbar" :styles="styles" />
							</uni-forms-item>
						</template>
						<template v-if="isUsdt==99">
							<uni-forms-item name="phoneBnumbar" class="form-item-phone">
								<view class="u-m-b-16 u-m-t-20">
									<text>{{$t('register6')}}</text>
									<text style="color: #D12C2C;">*</text>
								</view>
								<uni-easyinput type="number" v-model="formData.phoneBnumbar" :styles="styles" />
								<view class="label-icon" slot="left" v-if="isUsdt==99">
									<image :src="selecQuIcon" style="width: 20px;height: 14px;"></image>
									<quSelect class="quSelectM" ref="easySelect" size="mini" :value="''+selecQu"
										@selectOne="selectQhao" :options="quOptions">
									</quSelect>
								</view>
							</uni-forms-item>
						</template>
						<uni-forms-item name="bselect" v-if="isUsdt==0 || isUsdt==99">
							<view class="u-m-b-16 u-m-t-20">
								<text>{{$t('user42')}}</text>
								<text style="color: #D12C2C;">*</text>
							</view>
							<template v-if="isUsdt==0">
								<view class="u-flex u-row-between u-p-l-20 u-p-r-20 w_100 phoneBankSelect" @click="bankChange">
									<view>{{$t(seleceBankName)}}</view>
									<u-icon name="arrow-down" color="#e9ae3a" size="28"></u-icon>
								</view>
								<view class="bankSelectClass" v-if="showSelectBank">
									<scroll-view class="bankSelectScrollView" :scroll-y="true" :show-scrollbar="true" :scroll-with-animation="true">
										<view class="bankSelect u-m-t-10" v-for="(item,index) in bankNameType"
											:key="`bankNameType${index}`" @click="SelectChange(index,item.name)">
											<view class="u-flex u-p-20 u-row-between">
												<image :src="item.icon" mode="heightFix" style="height: 30px;"></image>
												<u-icon name="checkmark" color="#e9ae3a" size="28" v-if="index == selectKey"></u-icon>
											</view>
										</view>
									</scroll-view>
								</view>
							</template>
							<template v-if="isUsdt==99">
								<view class="u-flex u-row-between u-p-l-20 u-p-r-20 w_100 phoneBankSelect" @click="phoneBankChange">
									<view>{{$t(selecePhoneBankName)}}</view>
									<u-icon name="arrow-down" color="#e9ae3a" size="28"></u-icon>
								</view>
								<view class="bankSelectClass" v-if="showSelectPhoneBank">
									<scroll-view class="bankSelectScrollView" :scroll-y="true" :show-scrollbar="true" :scroll-with-animation="true">
										<view class="bankSelect u-m-t-10" v-for="(item,index) in phoneBankNameType"
											:key="`phoneBankNameType${index}`" @click="phoneSelectChange(index,item.name)">
											<view class="u-flex u-p-20 u-row-between">
												<image :src="item.icon" mode="heightFix" style="height: 30px;"></image>
												<u-icon name="checkmark" color="#e9ae3a" size="28" v-if="index == phoneSelectKey"></u-icon>
											</view>
										</view>
									</scroll-view>
								</view>
							</template>
						</uni-forms-item>
						<uni-forms-item name="kaihuih" v-if="isBankOpen == 1 && (isUsdt==0 || isUsdt==99)">
							<view class="u-m-b-16 u-m-t-20">
								<text>{{$t('user47')}}</text>
								<text style="color: #D12C2C;">*</text>
							</view>
							<uni-easyinput type="text" v-model="formData.kaihuih" :styles="styles" />
						</uni-forms-item>
						<uni-forms-item name="financial" v-if="bankFinancial == 1 && (isUsdt==0 || isUsdt==99)">
							<view class="u-m-b-16 u-m-t-20">
								<text>{{$t('金融代码')}}</text>
								<text style="color: #D12C2C;">*</text>
							</view>
							<uni-easyinput type="text" v-model="formData.financial" :styles="styles" />
						</uni-forms-item>
						<!-- USDT 添加 -->
						<uni-forms-item name="usdt_address" v-if="isUsdt==1">
							<view class="u-m-b-16">
								<text>{{$t('收币地址')}}</text>
								<text style="color: #D12C2C;">*</text>
							</view>
							<uni-easyinput type="text" v-model="formData.usdt_address" :styles="styles" />
						</uni-forms-item>
						<uni-forms-item name="usdt_type" v-if="isUsdt==1">
							<view class="u-m-b-16 u-m-t-20">
								<text>{{$t('链名称')}}</text>
								<text style="color: #D12C2C;">*</text>
							</view>
							<uni-data-select v-model="cateValue" :localdata="caterange" @change="catechange"
								:placeholder="$t('请选择')" :clear="false">
							</uni-data-select>
						</uni-forms-item>
						<!-- 电子钱包添加 -->
						<uni-forms-item name="ele_name" v-if="isUsdt==2">
							<view class="u-m-b-16">
								<text>{{$t('开户名')}}</text>
								<text style="color: #D12C2C;">*</text>
							</view>
							<uni-easyinput type="text" v-model="formData.ele_name" :styles="styles" />
						</uni-forms-item>
						<uni-forms-item name="ele_mber" v-if="isUsdt==2">
							<view class="u-m-b-16 u-m-t-20">
								<text>{{$t('钱包号码')}}</text>
								<text style="color: #D12C2C;">*</text>
							</view>
							<uni-easyinput type="number" v-model="formData.ele_mber" :styles="styles" />
						</uni-forms-item>
						<!-- PIX 添加 -->
						<uni-forms-item name="pix_name" v-if="isUsdt==3">
							<view class="u-m-b-16">
								<text>{{$t('开户名')}}</text>
								<text style="color: #D12C2C;">*</text>
							</view>
							<uni-easyinput type="text" v-model="formData.pix_name" :styles="styles" />
						</uni-forms-item>
						<uni-forms-item name="pix_type" v-if="isUsdt==3">
							<view class="u-m-b-16 u-m-t-20">
								<text>{{$t('TIPO DE CHAVE')}}</text>
								<text style="color: #D12C2C;">*</text>
							</view>
							<uni-data-select v-model="catePixValue" :localdata="cateRangePix" @change="cateChangePix"
								:placeholder="$t('请选择')" :clear="false">
							</uni-data-select>
						</uni-forms-item>
						<uni-forms-item name="pix_number" v-if="isUsdt==3">
							<view class="u-m-b-16 u-m-t-20">
								<text>{{$t('CHAVE PIX')}}</text>
								<text style="color: #D12C2C;">*</text>
							</view>
							<uni-easyinput type="text" v-model="formData.pix_number" :styles="styles" />
						</uni-forms-item>
					</uni-forms>
					<view class="space-foot-box">
						<button type="default" @click="submit(1)"
							class="btn btn--submit m-font-18">{{$t('public6')}}</button>
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="testPwd" mode="bottom" :custom-style="customStyle" borderRadius="32"
			:mask-custom-style="uPopMaskCustomStyle">
			<view class="bs-popup-hd u-p-30">
				<view class="tt">{{$t('身份验证')}}</view>
				<image src="@/static/images/index/close.png"
					style="width: 32px;height: 32px;position: absolute;right: 15px;" mode="" @click="testPwd = false">
				</image>
			</view>
			<view class="bs-popup-bd">
				<template v-if="userInfo_common.withdrawal_psd">
					<view class="u-p-40">
						<view class="u-c-g m-font-16 u-m-b-20">{{$t('请输入您的交易密码')}}:</view>
						<u-input v-model="formData.withdrawal_psd" type="password" :clearable="false" maxlength="6"
							:placeholder="$t('请输入提现密码')" :border="false" :custom-style="textPwdStyle" />
						<view class="space-foot-box" style="margin: 0 auto;">
							<button type="default" @click="submit(2)"
								class="btn btn--submit redLightBg">{{$t('public6')}}</button>
						</view>
					</view>
				</template>
				<template v-if="!userInfo_common.withdrawal_psd">
					<view class="u-p-30">
						<view>{{$t('未设置提现密码')}}</view>
						<view class="u-c-g m-font-16 u-m-b-20 u-m-t-20">{{$t('为了您的账号安全请前往安全中心')}}</view>
						<view class="space-foot-box">
							<button type="default" @click="testPwdChange"
								class="btn btn--submit redLightBg">{{$t('public6')}}</button>
						</view>
					</view>
				</template>
			</view>
		</u-popup>
		<u-popup v-model="withdrawalPwdPop" mode="bottom" :custom-style="customStyle" borderRadius="32"
			:mask-custom-style="uPopMaskCustomStyle">
			<view class="bs-popup-hd u-p-30">
				<view class="tt">{{$t('未设置提现密码')}}</view>
				<image src="@/static/images/index/close.png"
					style="width: 32px;height: 32px;position: absolute;right: 15px;" mode=""
					@click="withdrawalPwdPop = false">
				</image>
			</view>
			<view class="bs-popup-bd">
				<view class="u-p-30">
					<view class="m-font-16 u-c-g u-m-b-20">{{$t('为了您的账号安全请前往安全中心')}}</view>
					<view class="space-foot-box">
						<button type="default" @click="testPwdChange"
							class="btn btn--submit redLightBg m-font-18">{{$t('public6')}}</button>
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="realNamePop" mode="bottom" :custom-style="customStyle" borderRadius="32"
			:mask-custom-style="uPopMaskCustomStyle">
			<view class="bs-popup-hd u-p-30">
				<view class="tt">{{$t('未实名验证')}}</view>
				<image src="@/static/images/index/close.png"
					style="width: 32px;height: 32px;position: absolute;right: 15px;" mode=""
					@click="realNamePop = false">
				</image>
			</view>
			<view class="bs-popup-bd">
				<view class="u-p-30">
					<view class="m-font-16 u-c-g u-m-b-20">{{$t('为了您的账号安全请前往安全中心')}}</view>
					<view class="space-foot-box">
						<button type="default" @click="realNameChange"
							class="btn btn--submit redLightBg m-font-18">{{$t('public6')}}</button>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	import quSelect from "@/components/easy-select/easy-select.vue"

	export default {
		components: {
			uniNavHeader,
			listEmpty,
			pcNavHeader,
			quSelect,
			pcSideBar
		},
		data() {
			return {
				bankList: [],
				bankLen: 5,
				typeCur: 9999,
				showa: false,
				showb: false,
				customStyle: {
					"backgroundColor": "none",
					"borderRadius": "var(--u-pop-border-radius)"
				},
				// 表单
				formData: {
					bank_type: '',
					bname: '',
					bnumbar: '',
					phoneBnumbar: '',
					bselect: '',
					kaihuih: '',
					financial: '',
					usdt_address: '',
					bank_type_arr: '',
					usdt_type: '',
					usdt_qrcode: '',
					ele_name: '',
					ele_mber: '',
					pix_name: '',
					pix_type: '',
					pix_number: '',
					pix_sHao: '',
					withdrawal_psd: ''
				},
				isUsdt: 0,
				bank: [],
				paytype: [],
				usdtType: [],
				pixType: [],
				cateValue: 0,
				caterange: [],
				bankCaterange: [],
				catePixValue: 0,
				cateRangePix: [],
				selecQu: '',
				selecQuIcon: '',
				quOptions: [],
				rules: {
					// 对name字段进行必填验证
					bname: {
						rules: [{
							required: true,
							errorMessage: this.$t('user41'),
						}]
					},
					phoneBnumbar: {
						rules: [{
							required: true,
							errorMessage: this.$t('请输入手机号'),
						}]
					},
					bselect: {
						rules: [{
							required: true,
							errorMessage: this.$t('请选择银行'),
						}]
					},
					bnumbar: {
						rules: [{
							required: true,
							errorMessage: this.$t('user44'),
						}]
					},
					
					financial: {
						rules: [{
							required: true,
							errorMessage: this.$t('请输入金融代码'),
						}]
					},
					bank_type_arr: {
						rules: [{
							required: true,
							errorMessage: this.$t('请选择货币类型'),
						}]
					},
					kaihuih: {
						rules: [{
							required: true,
							errorMessage: this.$t('请输入开户行'),
						}]
					},
					usdt_address: {
						rules: [{
							required: true,
							errorMessage: this.$t('请输入收币地址'),
						}]
					},
					usdt_type: {
						rules: [{
							required: true,
							errorMessage: this.$t('请选择链名称'),
						}]
					},
					ele_name: {
						rules: [{
							required: true,
							errorMessage: this.$t('请输入开户名'),
						}]
					},
					ele_mber: {
						rules: [{
							required: true,
							errorMessage: this.$t('请输入钱包号码'),
						}]
					},
					pix_name: {
						rules: [{
							required: true,
							errorMessage: this.$t('请输入开户名'),
						}]
					},
					pix_type: {
						rules: [{
							required: true,
							errorMessage: this.$t('请选择类型'),
						}]
					},
					pix_number: {
						rules: [{
							required: true,
							errorMessage: this.$t('请输入PIX账号'),
						}]
					},
					pix_sHao: {
						rules: [{
							required: true,
							errorMessage: this.$t('请输入税号'),
						}]
					},
					withdrawal_psd: {
						rules: [{
							required: true,
							errorMessage: this.$t('请输入提现密码'),
						}]
					}
				},
				bankType: [],
				bankTypeId: 0,
				qrcodeImage: [],
				Ele: '',
				bankFinancial: null,
				isBankOpen: null,
				withdrawalStatus: null,
				styles: {
					color: 'var(--navbar-color)',
					background: 'var(--form-main-uni-easyinput__content)',
					borderRadius: "var(--card-radius)",
					border: 'var(--easyinput__border)'
				},
				textPwdStyle: {
					color: 'var(--navbar-color)',
					paddingLeft: '10px',
					height: "50px",
					borderRadius: "var(--card-radius)",
					background: 'var(--form-main-uni-easyinput__content)',
					boxShadow: 'var(--shadow-bg)',
					border: 'var(--easyinput__border)'
				},
				testPwd: false,
				showEmpty: null,
				withdrawalPwdPop: false,
				realNamePop: false,
				certificates: {
					force_sta: 1
				},
				bankNameType: [],
				phoneBankNameType: [],
				selecePhoneBankName: this.$t('请选择'),
				seleceBankName: this.$t('请选择'),
				showSelectPhoneBank: false,
				showSelectBank: false,
				phoneSelectKey: null,
				selectKey: null
			}
		},
		async onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('卡片管理')
			});
			this.getWithStatus();
			this.getbankList();
		},
		async onLoad() {
			this.withdrawalStatus = this.$helper.get('rule').bind_card_status;
			this.getbank();
			this.rechargeparame();
			this.getUserCertificate();
			this.getUserInfo_common();
			this.getBankPhoneBank();
			this.selecQu = this.$helper.get('idc_default');
			this.selecQuIcon = this.$helper.get('idc_default_flag');
			let idc = this.$helper.get('idc');
			if (idc == '') {
				this.initParam();
			} else {
				for (let i in idc) {
					this.quOptions.push(idc[i]);
				}
			}
		},
		methods: {
			phoneSelectChange(i,name){
				this.selecePhoneBankName = name;
				this.phoneSelectKey = i;
				this.showSelectPhoneBank = false;
				this.formData.bselect = name
			},
			SelectChange(i,name){
				this.seleceBankName = name;
				this.selectKey = i;
				this.showSelectBank = false;
				this.formData.bselect = name
			},
			phoneBankChange(){
				this.showSelectPhoneBank = !this.showSelectPhoneBank;
			},
			bankChange(){
				this.showSelectBank = !this.showSelectBank;
			},
			async getUserCertificate() {
				let res = await this.$u.api.user_certificate_p();
				if (res && res.code == 1) {
					if(res.data){
						this.certificates = res.data;
					}
				}
			},
			async getBankPhoneBank() {
				let res = await this.$u.api.bank_phone_bank_p();
				if (res && res.code == 1) {
					this.bankNameType = res.data.bank;
					this.phoneBankNameType = res.data.phone_bank;
				}
			},
			bankNameCatechange(e) {
				this.formData.bselect = e;
			},
			phoneBankNameCatechange(e) {
				this.formData.bselect = e;
			},
			addBankChange() {
				if (this.$helper.get('rule').force_certi == 1) {
					if (this.certificates.force_sta == 1) {
						this.$refs.uTips.show({
							title: this.$t('您还未实名')
						});
					} else if (this.certificates.force_sta == 2) {
						this.$refs.uTips.show({
							title: this.$t('您的实名正在审核中')
						});
					} else if (this.certificates.force_sta == 3) {
						this.addChange();
					}
				} else {
					this.addChange();
				}
			},
			addChange() {
				if (!this.userInfo_common.withdrawal_psd) {
					this.withdrawalPwdPop = true;
					return
				}
				if (this.certificates.force_sta == 1) {
					this.realNamePop = true;
					return
				}
				this.showa = true;
			},
			testPwdChange() {
				this.testPwd = false;
				this.showa = false;
				this.showb = false;
				this.$go('/pages/ucenter/profile')
			},
			realNameChange() {
				this.realNamePop = false;
				this.showa = false;
				this.showb = false;
				this.$go('/pages/ucenter/profile');
			},
			backShowb() {
				this.showb = false;
				this.showa = true;
			},
			getWithStatus() {
				if (this.$helper.get('userInfo').sc_date == 1) {
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}
			},
			url(url) {
				uni.navigateTo({
					url: url
				});
			},
			catechange(e) {
				this.formData.usdt_type = e;
			},
			bankCatechange(e) {
				this.bankTypeId = e;
				this.formData.bank_type_arr = e;
			},
			async deleteBank(item) {
				uni.showLoading({
					mask: true,
					title: this.$t("loading")
				});
				let res = await this.$u.api.delbank_p({
					bank_id: item.id
				});
				if (res.code == 1) {
					this.getbankList();
					this.$u.toast(this.$t(res.msg));
				} else {
					this.$u.toast(this.$t(res.msg));
				}
			},
			async getbankList() {
				uni.showLoading({
					title: this.$t('loading')
				})
				let ret = await this.$u.api.mybankList_p();
				if (ret) {
					if (ret.data.length > 0) {
						this.showEmpty = 1;
						uni.hideLoading();
						this.bankLen = 5 - ret.data.length;
						this.bankList = ret.data;
					} else {
						this.showEmpty = 0;
					}
				}
			},
			async getbank() {
				uni.showLoading({
					title: this.$t('loading')
				})
				let ret = await this.$u.api.bankList_p();
				if (ret) {
					let paytype_obj = ret.data.paytype;
					if (paytype_obj) {
						uni.hideLoading();
					}
					let paytype_arr2 = [];
					let paytype_arr1 = [];
					let b = 0;
					for (var a in paytype_obj) {
						if (paytype_obj[a] != 'PIX') {
							paytype_arr2.push(paytype_obj[a])
						} else {
							b += 1;
							paytype_arr1.push(paytype_obj[a]);
						}
					}
					if (b > 0) {
						this.isUsdt = 3;
					}
					// 加手机银行
					paytype_arr2.push("手机银行");
					this.paytype = [...paytype_arr1, ...paytype_arr2];
					this.usdtType = ret.data.usdt_type;
					for (let i in this.usdtType) {
						this.caterange.push({
							value: i,
							text: this.usdtType[i]
						})
					}
					this.pixType = ret.data.pix_type;
					for (let i in this.pixType) {
						this.cateRangePix.push({
							value: i,
							text: this.pixType[i]
						})
					}
					this.bankType = ret.data.all_currency;
					for (let i in this.bankType) {
						this.bankCaterange.push({
							value: this.bankType[i].id,
							text: this.bankType[i].country_code
						})
					}
					let keys = Object.keys(this.paytype);
					let key = keys[0];
					if (this.paytype[key] == "USDT") {
						this.isUsdt = 1;
					}
					this.formData.bank_type = this.paytype[key];
				}
			},
			selectBankType(evt) {
				this.formData.bank_type = evt.detail.value;
				this.formData.withdrawal_psd = '';
				if (this.formData.bank_type == "USDT") {
					this.isUsdt = 1;
				} else if (this.formData.bank_type == "电子钱包") {
					this.isUsdt = 2;
				} else if (this.formData.bank_type == "PIX") {
					this.isUsdt = 3;
				} else if (this.formData.bank_type == "手机银行") {
					this.isUsdt = 99;
				} else {
					this.isUsdt = 0;
				}
				this.showb = true
				this.showa = false
				for (let i = 0; i < this.paytype.length; i++) {
					if (this.paytype[i] === evt.detail.value) {
						this.typeCur = i;
						break;
					}
				}
			},
			closea() {
				this.showa = false;
				this.typeCur = 999;
			},
			closeb() {
				this.showb = false;
				this.typeCur = 999;
			},
			selectUsdtType() {
				this.formData.usdt_type = this.$refs.addRequestUsdtType.value;
			},
			cateChangePix(e) {
				this.formData.pix_type = e;
			},
			selectPixType() {
				this.formData.pix_type = this.$refs.addRequestPixType.value;
			},
			// 获取银行卡-金融代码状态
			async rechargeparame() {
				let res = await this.$u.api.rechargeparame_p();
				if (res) {
					this.bankFinancial = res.data.bank.financial_status;
					this.isBankOpen = res.data.is_bank_open;
				}
			},
			testUserPwd() {
				this.testPwd = true;
			},
			submit(i) {
				this.$refs.form.validate().then(async res => {
					if (this.withdrawalStatus == 1 && i == 1) {
						this.testPwd = true;
						return false
					}
					let parm = {};
					if (this.isUsdt == 1) {
						parm = {
							bank_type: 1,
							bank_name: this.formData.usdt_type,
							bank_number: this.formData.usdt_address,
							bank_open: this.formData.usdt_qrcode,
							bank_hm: this.formData.usdt_type,
							withdrawal_psd: this.formData.withdrawal_psd ? this.formData.withdrawal_psd :
								''
						};
					} else if (this.isUsdt == 2) {
						parm = {
							bank_type: 2,
							bank_name: this.formData.ele_name,
							bank_hm: this.formData.ele_name,
							bank_number: this.formData.ele_mber,
							bank_open: this.Ele,
							withdrawal_psd: this.formData.withdrawal_psd ? this.formData.withdrawal_psd :
								''
						};
					} else if (this.isUsdt == 3) {
						parm = {
							bank_type: 3,
							bank_name: this.formData.pix_type,
							bank_hm: this.formData.pix_name,
							bank_number: this.formData.pix_number,
							financial: this.formData.pix_sHao ? res.pix_sHao : '',
							withdrawal_psd: this.formData.withdrawal_psd ? this.formData.withdrawal_psd :
								''
						};
					} else if (this.isUsdt == 99) {
						let number = this.selecQu + this.formData.phoneBnumbar;
						parm = {
							bank_type: 0,
							bind_bank_type: 2,
							currency_id: this.bankTypeId,
							bank_name: this.formData.bselect,
							bank_number: number,
							bank_open: this.formData.kaihuih ? this.formData.kaihuih : '',
							bank_hm: this.formData.bname,
							financial: this.formData.financial,
							withdrawal_psd: this.formData.withdrawal_psd ? this.formData.withdrawal_psd :
								''
						};
					} else {
						parm = {
							bank_type: 0,
							bind_bank_type: 1,
							currency_id: this.bankTypeId,
							bank_name: this.formData.bselect,
							bank_number: this.formData.bnumbar,
							bank_open: this.formData.kaihuih ? this.formData.kaihuih : '',
							bank_hm: this.formData.bname,
							financial: this.formData.financial,
							withdrawal_psd: this.formData.withdrawal_psd ? this.formData.withdrawal_psd :
								''
						};
					}
					if (parm) {
						uni.showLoading({
							mask: true,
							title: this.$t("loading")
						});
						let ret = await this.$u.api.addBank_p(parm);
						if (ret.code == 1) {
							this.$refs.uTips.show({
								title: this.$t(ret.msg)
							});
							this.testPwd = false;
							this.showb = false;
							this.typeCur = 999;
							this.getbankList();
						} else {
							this.$refs.uTips.show({
								title: this.$t(ret.msg)
							});
						}
					}
				}).catch(err => {

				})
			},
			selectQhao(options) {
				this.selecQu = options.label;
				this.selecQuIcon = options.flag;
			},
			qrcodeImageSelect() {
				let _self = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						uni.showLoading({
							mask: true,
							title: _self.$t("loading")
						});
						const tempFilePaths = res.tempFilePaths;
						const token = _self.$helper.get('token');
						const token_key = _self.$helper.get('token_key');
						const uploadTask = uni.uploadFile({
							url: _self.$u.api.path + '/upload/img',
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								'usertoken': token,
								'usertokenkey': token_key
							},
							success: async function(uploadFileRes) {
								let res = JSON.parse(uploadFileRes.data);
								if (res.code == 1) {
									_self.Ele = res.data.file;
									_self.$refs.uTips.show({
										title: _self.$t(res.msg)
									});
								} else {
									_self.$refs.uTips.show({
										title: _self.$t(res.msg)
									});
								}
							}
						});
					},
					error: function(e) {
						console.log(e);
					}
				});
			},
			updateQrcode() {
				let _self = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						uni.showLoading({
							mask: true,
							title: _self.$t("loading")
						});
						const tempFilePaths = res.tempFilePaths;
						const token = _self.$helper.get('token');
						const token_key = _self.$helper.get('token_key');
						const uploadTask = uni.uploadFile({
							url: _self.$u.api.path + '/upload/img',
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								'usertoken': token,
								'usertokenkey': token_key
							},
							success: async function(uploadFileRes) {
								let res = JSON.parse(uploadFileRes.data);
								if (res.code == 1) {
									_self.formData.usdt_qrcode = res.data.file;
									_self.$refs.uTips.show({
										title: _self.$t(res.msg)
									});
								} else {
									_self.$refs.uTips.show({
										title: _self.$t(res.msg)
									});
								}
							}
						});

						uploadTask.onProgressUpdate(function(res) {
							_self.percent = res.progress;
						});
					},
					error: function(e) {
						console.log(e);
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.bank-style0 {
		background: var(--bank-0);
	}

	.bank-style2 {
		background: var(--bank-2);
	}

	.bank-style1 {
		background: var(--bank-1);
	}

	.bank-style3 {
		background: var(--bank-3);
	}

	.pc-bank-style0 {
		background-image: url('/static/images/pc/bank-0.png');
	}

	.pc-bank-style1 {
		background-image: url('/static/images/pc/bank-1.png');
	}

	.pc-bank-style2 {
		background-image: url('/static/images/pc/bank-2.png');
	}

	.pc-bank-style3 {
		background-image: url('/static/images/pc/bank-3.png');
	}


	.u-popup-blue {
		background-color: var(--bs-form-hd-bg);
	}

	.userCarAddPop {
		::v-deep .u-input__right-icon {
			position: absolute;
			right: 10px;
			top: 50%;
			transform: translateY(-50%);
		}
	}

	@media (min-width: 750px) {
		.userCarAddPop {
			border-radius: 0;
		}
	}

	.bs-popup {
		min-width: 250px !important;
	}

	.container {
		background: var(--mar-bg);
	}

	.site-head {
		background: var(--mar-bg);
		padding: 0 27px 15px;
	}

	.game-wrapper {
		padding: 70px 0 0 0 !important;
	}

	.bs-popup-hd {
		font-weight: 400;
		justify-content: center;
		background-color: #302b4d;
		border-bottom: 1px solid #4c4882;
	}

	.bs-form-hd {
		border-radius: 8px 8px 0 0;
	}

	.gooLight {
		border-radius: 15px 15px 0 0;
		padding: 15px 15px 115px 15px;
	}

	.u-popup-style .bs-form-hd .icon-close {
		padding: 2px;
		border-radius: 50%;
		color: #101D71;
		background-color: #C4C4C4;
	}

	.pc-main-right {
		padding: 30px;
	}

	.quSelectM {
		width: 48px !important;
		border: 0;
		height: 26px;
		color: #fff;
	}

	.is-input-border {
		padding-left: 80px;
	}

	.phoneBankSelect {
		font-size: 16px;
		height: 50px;
		border-radius: 16px;
		border: 1px solid #604db6;
	}
	
	.bankSelectScrollView {
		overflow: hidden;
		max-height: 20vh;
	}

	.bankSelect {
		font-size: 16px;
		border-radius: 16px;
		background-color: #302b4d;
	}
</style>
