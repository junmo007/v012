<template>
	<view>
		<template v-if="!mobile_common">
			<view class="log-bg">
				<view class="fell-form">
					<view class="u-flex backHomeBtn" @click="no_Login">
						<text class="iconfont icon-close"></text>
					</view>
					<view class="left">
						<left></left>
					</view>
					<view class="right ">
						<view >
							<!-- <view class="login-tabs">
								<view class="login-tabs-item active">{{$t('login')}}</view>
								<view class="login-tabs-item" @tap.stop="$go('/pages/register/index')">
									{{$t('register')}}
								</view>
							</view> -->
							<view class="u-flex u-row-between u-m-b-50">
								<view class="left-title u-font-40">
									<view class="u-font-64">{{$t('欢迎登录')}} 👋</view>
									<view class="u-flex u-m-t-10 text-gray u-font-xs">
										<view>{{$t('还没有账号')}}?</view>
										<text class="text-yellow u-m-l-10"
											@click="$go('/pages/register/index')">{{$t('去注册')}}</text>
									</view>
								</view>
								<!-- <view class="pc-login">
									<easySelect ref="easySelect" size="header" :value="selecValue" :icon="iconV"
										@selectOne="selectOne"></easySelect>
								</view> -->
							</view>
							<uni-forms err-show-type="toast" ref="form" :modelValue="formData" :rules="rules"
								:label-width="300" :border="false" label-position="top">
								<uni-forms-item name="account" class="" :label="$t('用户名')">
									<uni-easyinput type="text" v-model="formData.account" :placeholder='$t("login2")'
										:styles="stylesPc" />
								</uni-forms-item>
								<uni-forms-item name="pwd" class="" :label="$t('密码')">
									<!-- <view class="iconfont icon-mm"></view> -->
									<uni-easyinput type="password" v-model="formData.pwd" :placeholder='$t("login3")'
										:styles="stylesPc" />
								</uni-forms-item>
								<uni-forms-item class="form-item-code " name="yzm"
									:label="$t('Picture verification code')"
									v-show="code_check == 1 || code_check == 2">
									<uni-easyinput type="number" v-model="formData.yzm" :placeholder='$t("login4")'
										:styles="stylesPc" />
									<view class="link-code-box">
										<view class="link-code cur_pointer" v-if="captcha">
											<image :src="captcha" mode="" @click="ucaptcha"
												style="width: 100px;height: 44px; border-radius: 16px;" />
										</view>
										<image src="@/static/images/index/new_data.png" class="yzm-class"
											:class="yzm_img?'up-data':''" @click="ucaptcha" v-if="captcha"></image>
									</view>
								</uni-forms-item>
							</uni-forms>
							<view class="sw-forms-item zBetween u-m-t-10">
								<view class="agree-label flex-center">
									<switch checked @change="switch1Change" style="transform:scale(0.6)"
										color="var(--blue-color)" />
									<text class="link-color">{{$t("login6")}}</text>
								</view>
								<template v-if="withdrawalCheckType != 0 && withdrawalStatus == 1">
									<view @click="forgetPassword" class="cur_pointer text-gray">
										{{$t('login5')}}
									</view>
								</template>
							</view>

							<!-- <view class="sw-agrement">
								<label class="flex skin-text">
									<checkbox color="var(--blue-color)" style="transform:scale(0.8)" value="cb"
										checked="true" />
									{{$t("register9")}}
								</label>
								<view @click="openX()" class="blue-color u-m-l-48"><<{{$t("register7")}}>></view>
							</view> -->

							<view class="form-footer">
								<view class="u-flex u-col-top">
									<u-button @click="submit" class="btn btn--submit" size="large"
										:throttle-time="1000">
										{{$t("login")}}
									</u-button>
								</view>
							</view>

							<!-- <view class="u-flex u-row-center w_100 skin-text u-text-center u-m-t-40 u-m-b-40">
								<text class="iconfont icon-kefu5 blue-color u-m-r-8"></text>
								<navigator @click="toRescue" class="blue-color">{{$t("Online customer service")}}
								</navigator>
							</view> -->
							<view class="thirdClass-label u-text-center u-m-t-30 u-m-b-20">
								<text class="text-light">{{$t("第三方登陆")}}</text>
							</view>
							<view class="pc-thirdClass u-flex  ">
								<view class="col" v-for="(item, index) in third_login"
									:class="index > 0 ? '' : ''" :key="`third_login${index}`">
									<view class="thirdClass-card"
										@click="get_third_login_url(item.id,item.third_sys_sign)">
										<image :src="item.icon" style="width: 50rpx;height: 50rpx;"
											class="cur_pointer"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content" :data-theme="themeMode">
				<view class="form-wrapper">
					<view class="form-main">
						<image src="@/static/images/index/close.png" @click="no_Login"
							style="width: 32px;height:32px;right: 15px;top: 25px;position: absolute;z-index: 1099;">
						</image>
						<view class="form-cells">
							<!-- <view class="u-flex u-row-between u-col-top w_100">
								<view class="w_50 u-text-center login-tabs_item left">{{$t('login')}}</view>
								<view class="w_50 u-text-center login-tabs_item right"
									@tap.stop="$go('/pages/register/index')">{{$t('register')}}</view>
							</view> -->
							<view class="form-cells-item m-font-14">
								<view class="u-flex u-row-between u-m-t-20 u-col-top">
									<view class="m-font-32 m-font-b max-w_60">{{$t('欢迎回来')}}</view>
									<easySelect ref="easySelect" size="header" :value="selecValue" :icon="iconV"
										@selectOne="selectOne"></easySelect>
								</view>
								<view @tap="testClick" style="height: 15px;"></view>
								<uni-forms err-show-type="toast" ref="form" :modelValue="formData" :rules="rules"
									:border="false">
									<view class="u-m-b-16 u-m-t-30">
										<text>{{$t('用户名')}}</text>
										<text style="color: #D12C2C;">*</text>
									</view>
									<uni-forms-item name="account">
										<!-- :placeholder='$t("login2")' -->
										<uni-easyinput type="text" v-model="formData.account" :styles="styles" />
									</uni-forms-item>
									<view class="u-m-b-16 u-m-t-20">
										<text>{{$t('密码')}}</text>
										<text style="color: #D12C2C;">*</text>
									</view>
									<uni-forms-item name="pwd">
										<!-- :placeholder='$t("login3")' -->
										<uni-easyinput type="password" v-model="formData.pwd" :styles="styles" />
									</uni-forms-item>
									<view class="u-m-b-16 u-m-t-20">
										<text>{{$t('验证码')}}</text>
										<text style="color: #D12C2C;">*</text>
									</view>
									<uni-forms-item class="form-item-code" name="yzm"
										v-show="code_check == 1 || code_check == 2">
										<!-- :placeholder='$t("login4")' -->
										<uni-easyinput type="number" v-model="formData.yzm" :styles="styles" />
										<view class="link-code-box">
											<view class="link-code" v-if="captcha">
												<image :src="captcha" mode=""
													style="width: 90px;height: 46px;border-radius: 13px;"
													@click="ucaptcha" />
											</view>
											<!-- <view class="iconfont icon-shuaxin" @click="ucaptcha" v-if="captcha">
											</view> -->
											<!-- <image src="@/static/images/index/new_data.png" class="yzm-class"
												:class="yzm_img?'up-data':''" @click="ucaptcha" v-if="captcha"></image> -->
										</view>
									</uni-forms-item>
								</uni-forms>
								<view class="sw-forms-item zBetween">
									<!-- <view class="agree-label flex-center"> -->
									<u-checkbox-group @change="checkboxGroupChange">
										<u-checkbox @change="checkboxChange" v-model="item.checked"
											active-color="#E9AE3A" v-for="(item, index) in list" :key="index"
											:name="item.name">
											<view class="m-c-w m-font-16">{{item.name}}</view>
										</u-checkbox>
									</u-checkbox-group>
									<!-- <switch checked @change="switch1Change" style="transform:scale(0.6)"
											color="var(--blue-color)" />
										<text class="">{{$t("login6")}}</text> -->
									<!-- </view> -->
									<template v-if="withdrawalCheckType != 0 && withdrawalStatus == 1">
										<view @click="forgetPassword" class="m-font-16">
											{{$t('login5')}}
										</view>
									</template>
								</view>
								<view class="form-footer">
									<view class="u-flex u-col-top">
										<u-button @click="submit" class="btn btn--submit-login"
											:custom-style="customStyleButton" :throttle-time="1000">
											{{$t("login")}}
										</u-button>
									</view>
								</view>
								<view class="thirdClass flex--direction">
									<view class="ot-card" v-for="(item, index) in third_login"
										:class="index > 0 ? 'u-m-t-20' : ''" :key="`third_login${index}`"
										@click="get_third_login_url(item.id,item.third_sys_sign)">
										<image :src="item.icon" style="width: 50rpx;height: 50rpx;margin-right: 20rpx;"
											class="cur_pointer"></image>
										<text class="m-font-18">{{item.name}}</text>
									</view>
								</view>
								<view class="u-flex u-row-center u-m-t-30 m-font-16">
									<view>{{$t('还没有账号')}}?</view>
									<view class="text-yellow u-m-l-10" @click="$go('/pages/register/index')">
										{{$t('去注册')}}</view>
								</view>
								<view class="u-flex u-row-center w_100 u-text-center u-m-t-80" @click="toRescue">
									<!-- <text class="iconfont icon-kefu5 u-m-r-8"></text> -->
									<image src="@/static/images/index-footer/service.png"
										style="width: 16px;height: 16px;margin-right: 8px;"></image>
									<navigator class="text-yellow">{{$t("Online customer service")}}
									</navigator>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>
		<!-- 忘记密码 -->
		<u-popup v-model="forgetPasswordPopup" mode="center" width="350px" borderRadius="30" :mask-custom-style="uPopMaskCustomStyle">
			<view class="bs-popup">
				<view class="bs-popup-hd-bg m-c-w">
					{{$t('login5')}}
					<view class="iconfont icon-close m-c-w" @click="forgetPasswordClose"></view>
				</view>
				<view class="bs-popup-body">
					<uni-easyinput class="u-m-t-20" type="password" v-model="setData.nLoginPwd_1" :styles="styles"
						:placeholder="$t('请输入新登录密码')" />
					<uni-easyinput class="u-m-t-20" type="password" v-model="setData.nLoginPwd_2" :styles="styles"
						:placeholder="$t('请确认新登录密码')" />
					<template v-if="phoneBind == 1">
						<view class="w_100 u-flex u-row-between u-m-t-20">
							<view style="width: 23%;border-radius: 16px;">
								<quSelect class="quSelectStyle" ref="easySelect" size="mini" :value="'+'+selecQu"
									@selectOne="selectQhao" :options="quOptions">
								</quSelect>
							</view>
							<view style="width: 75%;">
								<uni-easyinput type="number" v-model="setData.phone" :placeholder="$t('user18')"
									:styles="styles" />
							</view>
						</view>
						<view class="u-flex u-m-t-20">
							<uni-easyinput type="number" :placeholder="$t('请输入手机验证码')" v-model="setData.code"
								:styles="styles" />
							<view>
								<u-button @tap="getPhoneCode" type="error" class="u-m-l-10 phoneCodeBtn">
									{{$t(phoneCodeText)}}
								</u-button>
								<u-verification-code seconds="60" ref="registCode" @change="phoneCodeChange"
									:start-text="$t('获取验证码')" :end-text="$t('rep_sned')" change-text="XS">
								</u-verification-code>
							</view>
						</view>
					</template>
					<template v-if="phoneBind == 2">
						<uni-easyinput class="u-m-t-20" type="text" v-model="setData.mail" :placeholder="$t('请输入邮箱')"
							:styles="styles" />
						<view class="u-flex u-m-t-20">
							<uni-easyinput type="number" :placeholder="$t('请输入邮箱验证码')" v-model="setData.mailCode"
								:styles="styles" />
							<view>
								<u-button @tap="getMailCode" type="error" class="u-m-l-10 phoneCodeBtn">
									{{$t(mailCodeText)}}
								</u-button>
								<u-verification-code seconds="60" ref="MailCodeKey" @change="mailCodeChange"
									:start-text="$t('获取验证码')" :end-text="$t('rep_sned')" change-text="XS">
								</u-verification-code>
							</view>
						</view>
					</template>
					<view style="height: 30px;"></view>
					<view class="u-text-center">
						<text class="u-m-r-8">{{$t('phoneUnbaleUse')}}</text>
						<text style="color: var(--ui-color-normal);" @click="toRescue"
							class="cur_pointer">{{$t('请联系客服')}}</text>
					</view>
					<view class="bs-foot-button flex-center justify-center">
						<button type="default" @click="editLoginPwdBtn"
							class="btn btn--default w_50">{{$t('修改密码')}}</button>
					</view>
				</view>
			</view>
		</u-popup>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10999"></u-top-tips>
		<!-- 服务条款 -->
		<uni-popup ref="rulePopup" type="center">
			<view class="bs-popup u-m-l-16 u-m-r-16 pc_pop">
				<view class="bs-popup-hd-bg m-c-w">
					<view class="tt">{{$t('register7')}}</view>
				</view>
				<view class="bs-popup-body">
					<scroll-view scroll-y="true" style="height: 350px;" @scrolltolower="scroll">
						<view class="art-body" v-html="web_rule_common_5"></view>
					</scroll-view>
					<view class="bs-foot-button flex-center justify-center">
						<!-- <button type="default" v-if="!disshow" class="btn no-btn-default w_50">{{$t('同意')}}</button> -->
						<!-- <button type="default" v-else @click="closeX" class="btn btn--submit w_50">{{$t('同意')}}</button> -->
						<button type="default" class="btn no-btn-default w_50"
							v-if="countdown > 1">{{$t('同意') + '(' + countdown + 's)'}}</button>
						<button type="default" v-else @click="closeX" class="btn btn--login w_50">{{$t('同意')}}</button>
					</view>
				</view>
			</view>
			<view class="bs-popup_foot">
				<text class="iconfont icon-close" @click="closeX"></text>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import easySelect from "@/components/easy-language-login/easy-select.vue"
	import quSelect from "@/components/easy-select/easy-select.vue"
	import pcBg from "@/components/pc-bg/bg.vue"
	import left from "../register/components/left.vue"
	export default {
		components: {
			easySelect,
			quSelect,
			pcBg,
			left
		},
		data() {
			return {
				// 验证
				formData: {
					account: '',
					pwd: '',
					yzm: ''
				},
				setData: {
					phone: '',
					code: '',
					nLoginPwd_1: '',
					nLoginPwd_2: '',
					mail: '',
					mailCode: '',
				},
				mailCodeText: '',
				rules: {
					// 对name字段进行必填验证
					account: {
						rules: [{
							required: true,
							errorMessage: this.$t("login2"),
						}]
					},
					pwd: {
						rules: [{
							required: true,
							errorMessage: this.$t("login3"),
						}]
					},
					yzm: {
						rules: [{
							required: true,
							errorMessage: this.$t("login4"),
						}]
					}
				},
				selecValue: 'CN',
				iconV: '../../static/images/cn.png',
				captcha: '',
				code_key: '',
				code_check: 0,
				quOptions: [],
				selecQu: '',
				phoneCodeText: '',
				phoneBind: null,
				phoneCheck: null,
				third_login: [],
				thirdLoginStatus: null,
				doanLoadShow: false,
				doanLoadAnd: false, // 安卓下载
				doanLoadIOS: false, // IOS下载
				iosBut: 0,
				androidDownloadUrl: '',
				iosDownloadUrl: '',
				androidIos: null, // 1安卓 2IOS
				showOne: true,
				showTwo: false,
				URLTailDecoration: '',
				showTopTips: false,
				styles: {
					color: '#ffffff',
					border: 'var(--easyinput__border)',
					borderRadius: "8px"
				},
				stylesPc: {
					color: '#ffffff',
					borderRadius: "16px",
					borderColor: "#644CBC",
					height: "46px"
				},
				forgetPasswordPopup: false,
				withdrawalCheckType: null,
				withdrawalStatus: null,
				remInfo: true, //是否记住信息 默认为true
				yzm_img: false,
				countdown: 5,
				list: [{
					name: this.$t('login6'),
					checked: false,
					disabled: false
				}],
				customStyleButton: {
					fontSize: '18px'
				}
			}
		},
		async onLoad(e) {
			await this.setHeadInfo();
			await this.setCapableTitle();
			await this.getDoanload();
			this.getRule_common(5);
			this.getTopLang();
			if (this.userToken_common) {
				this.$go("/pages/index/index");
			}
			this.ucaptcha();
			uni.setNavigationBarTitle({
				title: this.$t('login1')
			});
			this.thirdLoginStatus = this.$helper.get('rule').thirdLoginStatus;
			if (this.thirdLoginStatus == 1) {
				this.get_third_login();
			}
			this.selecValue = this.$helper.get('i18n_lang');
			let all_lang = this.$helper.get('alllang');
			this.$helper.set('shouNotice', false);
			this.$helper.set('shouActivity', false);
			this.$helper.set('shouCooperation', false);
			if (all_lang != '') {
				for (let i = 0; i < all_lang.length; i++) {
					if (this.selecValue == all_lang[i].value) {
						this.iconV = all_lang[i].icon;
					}
				}
				let rule = this.$helper.get('rule');
				this.code_check = rule.code_check;
			}
		},
		onShow() {
			this.onShowChange();
		},
		methods: {
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				//console.log(e);
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				// console.log(e);
			},
			testClick() {},
			openX() {
				this.$refs.rulePopup.open();
				this.count = setInterval(() => {
					if (this.countdown > 1) {
						this.countdown -= 1;
					} else {
						return
					}
				}, 1000);
			},
			closeX() {
				this.$refs.rulePopup.close();
				clearInterval(this.count);
				this.countdown = 5;
			},
			onShowChange() {
				this.phoneBind = this.$helper.get('rule').phone_bind;
				this.withdrawalCheckType = this.$helper.get('rule').withdrawal_check_type;
				this.withdrawalStatus = this.$helper.get('rule').withdrawal_status;
				let idc = this.$helper.get('idc');
				this.quOptions = idc;
				this.selecQu = this.userInfo_common.qh ? this.userInfo_common.qh : this.$helper.get('idc_default');
				this.phoneCheck = this.$helper.get('rule').phone_check;
				this.getBtoa(this.formData.account, true, 'userName');
				this.getBtoa(this.formData.pwd, true, 'userPwd');
			},
			getTopLang() {
				if (this.$t('URLTailDecoration') != 'URLTailDecoration') {
					this.URLTailDecoration = this.$t('URLTailDecoration');
					this.showTopTips = true;
				} else {
					this.URLTailDecoration = '';
					this.showTopTips = false;
				}
			},
			androidDownload() {
				window.location.href = this.$t('AndroidDownloadUrl_Looks');
			},
			iosDownload() {
				if (this.iosBut == 0) {
					window.location.href = this.$t('IOSDownloadUrl_Looks');
					this.iosBut = 1;
				} else {
					window.location.href = 'https://www.pgyer.com/app/getProvisionFile';
				}
			},
			async getDoanload() {
				switch (uni.getSystemInfoSync().platform) {
					case 'android':
						this.androidIos = 1;
						break;
					case 'ios':
						this.androidIos = 2;
						break;
					default:
						this.androidIos = 1;
						break;
				}
				if (this.$t('AndroidDownloadUrl_Looks') != 'AndroidDownloadUrl_Looks') {
					this.doanLoadAnd = true;
				} else {
					this.doanLoadAnd = false;
				}
				if (this.$t('IOSDownloadUrl_Looks') != 'IOSDownloadUrl_Looks') {
					this.doanLoadIOS = true;
				} else {
					this.doanLoadIOS = false;
				}
			},
			forgetPassword() {
				this.forgetPasswordPopup = true;
				// this.$go('/pages/login/forgetPwd');
			},
			forgetPasswordClose() {
				this.setData.code = '';
				this.setData.phone = '';
				this.setData.nLoginPwd_2 = '';
				this.setData.nLoginPwd_1 = '';
				this.forgetPasswordPopup = false;
			},
			selectQhao(options) {
				this.selecQu = options.label
			},
			phoneCodeChange(e) {
				this.phoneCodeText = e;
			},
			mailCodeChange(e) {
				this.mailCodeText = e;
			},
			// 登录密码
			async editLoginPwdBtn() {
				let _this = this;
				if (_this.phoneBind == 1) {
					if (_this.setData.nLoginPwd_1 == '' || _this.setData.nLoginPwd_2 == '' || _this.setData.phone ==
						'' ||
						_this.setData.code == '') {
						_this.$refs.uTips.show({
							title: _this.$t('请输入完整信息')
						});
						return
					} else {
						if (_this.setData.nLoginPwd_1 != _this.setData.nLoginPwd_2) {
							_this.$refs.uTips.show({
								title: _this.$t('密码不一致')
							});
						} else {
							let param = {
								qh: _this.selecQu,
								phone: _this.setData.phone,
								password: _this.setData.nLoginPwd_1,
								code: _this.setData.code
							}
							uni.showLoading({
								title: _this.$t('loading')
							})
							let res = await _this.$u.api.forget_p(param);
							if (res) {
								if (res.code == 1) {
									_this.setData.code = '';
									_this.setData.phone = '';
									_this.setData.nLoginPwd_2 = '';
									_this.setData.nLoginPwd_1 = '';
									uni.hideLoading();
									_this.$refs.uTips.show({
										title: _this.$t(res.msg)
									});
								} else {
									uni.hideLoading();
									_this.$refs.uTips.show({
										title: _this.$t(res.msg)
									});
								}
							}
						}
					}
				}
				if (_this.phoneBind == 2) {
					if (_this.setData.nLoginPwd_1 == '' || _this.setData.nLoginPwd_2 == '' || _this.setData.mail ==
						'' ||
						_this.setData.mailCode == '') {
						_this.$refs.uTips.show({
							title: _this.$t('请输入完整信息')
						});
						return
					} else {
						if (_this.setData.nLoginPwd_1 != _this.setData.nLoginPwd_2) {
							_this.$refs.uTips.show({
								title: _this.$t('密码不一致')
							});
						} else {
							let param = {
								mail: _this.setData.mail,
								mail_code: _this.setData.mailCode,
								password: _this.setData.nLoginPwd_1,
							}
							let res = await _this.$u.api.forget_mail_p(param);
							if (res) {
								if (res.code == 1) {
									_this.setData.mail = '';
									_this.setData.mailCode = '';
									_this.setData.nLoginPwd_1 = '';
									uni.hideLoading();
									_this.$refs.uTips.show({
										title: _this.$t(res.msg)
									});
								} else {
									uni.hideLoading();
									_this.$refs.uTips.show({
										title: _this.$t(res.msg)
									});
								}
							}
						}
					}
				}
			},
			async getMailCode() {
				let _this = this;
				if (_this.setData.mail == '') {
					_this.$refs.uTips.show({
						title: _this.$t('邮箱不能为空')
					});
				} else {
					if (_this.$refs.MailCodeKey.canGetCode) {
						if (this.$u.test.email(_this.setData.mail)) {
							uni.showLoading({
								title: _this.$t('loading')
							})
							let info = {
								email: _this.setData.mail
							}
							let res = await _this.$u.api.send_mail_code_p(info);
							if (res) {
								if (res.code == 1) {
									uni.hideLoading();
									_this.$refs.uTips.show({
										title: _this.$t(res.msg)
									});
									_this.$refs.MailCodeKey.start();
								} else {
									_this.$refs.uTips.show({
										title: _this.$t(res.msg)
									});
								}
							}
						} else {
							_this.$refs.uTips.show({
								title: _this.$t('邮箱格式不正确')
							});
						}
					}
				}
			},
			async getPhoneCode() {
				if (this.setData.phone == '') {
					this.$refs.uTips.show({
						title: this.$t('手机号不能为空')
					});
				} else {
					if (this.$refs.registCode.canGetCode) {
						uni.showLoading({
							title: this.$t('loading')
						})
						let info = {
							qh: this.selecQu,
							phone: this.setData.phone
						}
						let res = await this.$u.api.sendcode_p(info);
						if (res) {
							if (res.code == 1) {
								uni.hideLoading();
								this.$refs.uTips.show({
									title: this.$t(res.msg)
								});
								this.$refs.registCode.start();
							} else {
								this.$refs.uTips.show({
									title: this.$t(res.msg)
								});
							}
						}
					}
				}
			},
			async initParam() {
				let ret = await this.$u.api.sysparam_p({});
				if (ret) {
					this.selecValue = ret.data.lang;
					this.iconV = ret.data.icon;
					this.$helper.get('i18n_lang', ret.data.lang);
					this.code_check = ret.data.code_check;
					this.$i18n.locale = ret.data.lang;
				}
			},
			// 提交
			submit() {
				let _this = this;
				this.$refs.form.validate().then(async res => {
					this.userLogin_common(res.account, res.pwd, res.yzm, _this.code_key);
					this.ucaptcha();
					if (this.remInfo) {
						this.setBtoa(res.account, true, 'userName');
						this.setBtoa(res.pwd, true, 'userPwd');
					}
				}).catch(err => {})
			},
			async ucaptcha() {
				let ret = await this.$u.api.captcha_p({
					info: 1
				});
				if (ret) {
					this.captcha = ret.data.base64;
					this.code_key = ret.data.key;
					this.yzm_img = !this.yzm_img;
					setTimeout(_ => {
						if (!this.yzm_img) {
							this.yzm_img = true;
						}
					}, 200);
				}
			},
			switch1Change: function(e) {
				this.remInfo = e.detail.value;
			},
			selectOne(options) {
				this.$helper.setLang(options.label);
				this.$i18n.locale = options.label;
				this.selecValue = options.label;
				this.iconV = options.icon;
				//this.$router.go(0);
			},
			_isMobile() {
				let flag = navigator.userAgent.match(
					/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
				)
				return flag;
			},
			async get_third_login_url(id,third_sys_sign) {
				let urlHref = new URL(window.location.href); // 创建URL对象
				let cleanUrl = urlHref.origin + urlHref.pathname; // 获取不带参数的URL部分
				this.$helper.set('thirdLoginId', id);
				this.$helper.set('thirdLoginSign', third_sys_sign);
				let ret = await this.$u.api.get_third_login_url({
					id: id,
					href: cleanUrl,
					rec_code: this.$helper.get('share_code')?this.$helper.get('share_code'):''
				});
				if (ret && ret.code == 1) {
					window.location.href = ret.data.url;
				}else {
					this.$refs.uTips.show({
						title: this.$t(ret.msg)
					});
				}
			},
			async get_third_login() {
				let ret = await this.$u.api.get_third_login();
				if (ret) {
					this.third_login = ret.data;
				}
			}
		}
	}
</script>

<style lang="scss">
	.loginDoanload {
		top: -100%;
		left: 0;
		right: 0;
		position: fixed;
		z-index: 90;
		transition: .3s all;
	}

	.loginDoanload.show {
		top: 0;
		animation-delay: .4s;
		padding-top: constant(safe-area-inset-top);
		/*兼容 IOS<11.2*/
		padding-top: env(safe-area-inset-top);
		/*兼容 IOS>11.2*/
	}

	.w_50 {
		width: 50%;
	}

	.m_bg {
		height: 65px;
		background: linear-gradient(var(--doanload-color-1), var(--doanload-color-2)) !important;
	}


	.quSelectStyle {
		width: 100% !important;
		height: 50px !important;
		background-color: var(--form-main-uni-easyinput__content);
		border: var(--easyinput__border) !important;
		border-radius: 16px;
	}

	.phoneCodeBtn {
		height: 50px !important;
		color: #FFFFFF;
		border-radius: 16px;
		background: linear-gradient(var(--btn-submit-bg-1), var(--btn-submit-bg-2)) !important;
		box-shadow: var(--btn--submit--shadow) !important;
	}

	@media (min-width:751px) {
		.football_icon {
			position: absolute;
			right: 0;
			bottom: 230px;
			display: none !important;
		}
	}

	@media (max-width:750px) {


		.football_icon {
			position: absolute;
			right: 0;
			bottom: 50px;
		}
	}

	.download_btn {
		min-width: 85px;
		max-width: 140px;
		padding: 0 6px;
		height: 30px;
		text-align: center;
		cursor: pointer;
		line-height: 28px;
		border-radius: 6px;
		color: #ffffff;
		background: var(--doanload-bg);
		box-shadow: 0px 2px 5px rgba(24, 25, 32, 0.4);
	}

	.font-size-12 {
		font-size: 12px !important;
	}

	.webNameFont {
		color: #fff;
		font-size: 20px;
		font-weight: 600;
	}

	.webConent {
		margin-left: 5px;
		max-width: 150px;
	}

	.c-w {
		color: #fff;
	}

	.RULclass {
		height: 35px;
		background: linear-gradient(var(--doanload-color-1), var(--doanload-color-2)) !important;
	}

	.bs-popup-body ::v-deep .is-input-border {
		border: var(--easyinput__border) !important;
	}

	.log-bg {
		width: 100vw;
		height: 100vh;
		background-image: url('@/static/images/pc/log2.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.log-bg .fell-form {
		background-color: #1E1739;
		color: #ffffff;
		width: 800px;
		min-height: 600px;
		padding: 12px;
		border-radius: 24px;
		display: flex;
		position: relative;
	}

	.log-bg .fell-form .left {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 380px;
		flex: 1;
		border-radius: 16px;
		background-image: url('@/static/images/pc/log-left2.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;

	}

	.log-bg .fell-form .right {
		width: 400px;
		padding:10px 30px 30px 30px;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.login-tabs {
		display: flex;
		border-radius: 40px;
		border: 1px solid #ccc;
		height: 40px;
		line-height: 40px;
		width: 100%;
	}

	.login-tabs-item {
		width: 50%;
		text-align: center;
		border-radius: 40px;
		cursor: pointer;
	}

	.login-tabs-item.active {
		color: #fff;
		background-color: var(--login-tabs-item-active);
	}

	.form-main ::v-deep .easy-select .easy-select-options.show {
		margin-top: 0 !important;
	}

	.thirdClass {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-top: 10px;
		margin-bottom: 30px;
	}

	.sw-agrement {
		margin-bottom: 15px;
	}

	.no-btn-default {
		color: #2B44B1 !important;
		background-color: #ccc;
		border-radius: 6px;
	}

	.pc-login ::v-deep .easy-select .easy-select-options.show {
		margin-top: 0;
	}

	.backHomeBtn {
		position: absolute;
		top: 16px;
		right: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: #D1CCE9;
		background-color: #413D71;
		width: 32px;
		height: 32px;
		border-radius: 10px;
	}

	.loginHeaderImg {
		width: 150px;
		height: 60px;
		position: absolute;
		top: -58px;
		left: -32px;
	}
	.sw-forms-item{
		margin-bottom: 30px;
	}
	.sw-forms-item ::v-deep .u-checkbox__icon-wrap {
		background-color: #312B4F;
		border: 2px solid #4D4886;
	}

	.right ::v-deep .uni-easyinput__content {
		height: 46px;
		border-radius: 16px;
	}
	.u-font-64{
		font-size: 32px;
	}
	.pc-thirdClass{
		margin: 0 -6px;
		.col{
			flex:1;
			padding: 0 6px;
		}
	}
	.thirdClass-card{
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #312B4F;
		border: 1px solid #413D71;
		height: 48px;
		border-radius: 8px;
	}
	
	
</style>
