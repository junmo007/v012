<template>
	<view class="content" :data-theme="themeMode">
		<!-- main -->
		<view class="u-rela u-flex u-row-center m-30">
			<view class="backBtn iconfont icon-left" @click="pwdBack"></view>
			<view class="m-font-18 m-line-1 m-rl-50">{{$t('密码找回')}}</view>
		</view>
		<view class="p-15">
			<view class="top-img">
				<view class="box-text">
					<view>{{$t('账号安全中心')}}</view>
					<view class="line"></view>
				</view>
				<image src="@/static/images/skin/bluelight/forgeimg.png" mode=""></image>
			</view>
			<!-- 提供账号 -->
			<template v-if="stepCount == 1">
				<view class="u-m-b-16">{{$t('请输入您需要找回的账号')}}</view>
				<u-input v-model="userName" type="text" class="u-m-b-30" :password-icon="true"
					:placeholder="$t('请输入您的账号')" :custom-style="styles" />
				<view class="bs-foot-button flex-center justify-center">
					<button type="default" @click="nextNameType" class="btn btn--default">{{$t('下一步')}}</button>
				</view>
			</template>
			<!-- 找回方式 -->
			<template v-if="stepCount == 2">
				<view class="u-m-b-16">{{$t('找回方式')}}</view>
				<view class="selectType u-m-b-30">
					<uni-data-select v-model="cateValue" :localdata="caterange" @change="typeChange"
						:placeholder="$t('请选择找回方式')" :emptyTips="$t('无选项')" :clear="false">
					</uni-data-select>
				</view>
				<view class="bs-foot-button flex-center justify-center">
					<button type="default" @click="nextEdit" class="btn btn--default">{{$t('下一步')}}</button>
				</view>
			</template>
			<!-- 填写账号信息 -->
			<template v-if="stepCount == 3">
				<view class="u-m-b-16">{{$t('找回方式')}}</view>
				<view class="selectType u-m-b-26">
					<uni-data-select v-model="cateValue" :localdata="caterange" @change="typeChange"
						:placeholder="$t('请选择找回方式')" :emptyTips="$t('无选项')" :clear="false">
					</uni-data-select>
				</view>
				<!-- 手机找回 -->
				<template v-if="cateValue == 1">
					<view class="u-m-b-16">{{$t('register6')}}</view>
					<view class="w_100 u-flex u-row-between u-m-t-20 u-m-b-26">
						<view style="width: 23%;">
							<quSelect class="quSelectStyle" ref="easySelect" size="mini" :value="'+'+selecQu"
								@selectOne="selectQhao" :options="quOptions">
							</quSelect>
						</view>
						<view style="width: 75%;">
							<u-input v-model="phoneNumber" type="text" :clearable="false" placeholder=""
								:custom-style="styles" />
						</view>
					</view>
					<view class="u-m-b-16">{{$t('验证码')}}</view>
					<view class="u-flex u-m-b-30">
						<u-input v-model="phoneCode" type="number" :clearable="false" placeholder=""
							:custom-style="styles2" />
						<view>
							<u-button @tap="getPhoneCode" type="error" class="phoneCodeBtn">
								{{$t(phoneCodeText)}}
							</u-button>
							<u-verification-code seconds="60" ref="registCode" @change="phoneCodeChange"
								:start-text="$t('获取验证码')" :end-text="$t('rep_sned')" change-text="XS">
							</u-verification-code>
						</view>
					</view>
					<view class="bs-foot-button flex-center justify-center">
						<button type="default" @click="phoneNext" class="btn btn--default">{{$t('下一步')}}</button>
					</view>
				</template>
				<template v-if="cateValue == 2">
					<view class="u-m-b-16">{{$t('邮箱地址')}}</view>
					<u-input v-model="mailNumber" type="text" :clearable="false" placeholder=""
						:custom-style="styles" />
					<view class="u-m-b-16 u-m-t-26">{{$t('验证码')}}</view>
					<view class="u-flex u-m-b-30">
						<u-input v-model="mailCode" type="number" :clearable="false" placeholder=""
							:custom-style="styles2" />
						<view>
							<u-button @tap="getMailCode" type="error" class="phoneCodeBtn">
								{{$t(mailCodeText)}}
							</u-button>
							<u-verification-code seconds="60" ref="MailCodeKey" @change="mailCodeChange"
								:start-text="$t('获取验证码')" :end-text="$t('rep_sned')" change-text="XS">
							</u-verification-code>
						</view>
					</view>
					<view class="bs-foot-button flex-center justify-center">
						<button type="default" @click="mailNext" class="btn btn--default">{{$t('下一步')}}</button>
					</view>
				</template>
				<!-- 三方验证 暂时不开启
				<!-- <view class="u-m-b-16">{{$t('验证码')}}</view>
				<u-input v-model="tripartiteCode" type="number" :clearable="false" placeholder=""
					:custom-style="styles" /> -->
			</template>
			<!-- 提供新密码 -->
			<template v-if="stepCount == 4">
				<view class="u-m-b-16">{{$t('新密码')}}</view>
				<u-input v-model="nLoginPwd_1" :password-icon="true" type="password" :clearable="false" placeholder=""
					:custom-style="styles" />
				<view class="u-m-b-16 u-m-t-26">{{$t('重复新密码')}}</view>
				<u-input v-model="nLoginPwd_2" :password-icon="true" type="password" :clearable="false" placeholder=""
					:custom-style="styles" />
				<view class="bs-foot-button flex-center justify-center u-m-t-30">
					<button type="default" @click="infoEdit" class="btn btn--default">{{$t('完成')}}</button>
				</view>
			</template>
		</view>
		<pcBg></pcBg>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10999"></u-top-tips>
	</view>
</template>

<script>
	import pcBg from "@/components/pc-bg/bg.vue"
	import quSelect from "@/components/easy-select/easy-select.vue"
	export default {
		components: {
			pcBg,
			quSelect
		},
		data() {
			return {
				stepCount: 1, // 1 提供账号  2 选择找回方式
				styles: {
					color: 'var(--body-color)',
					border: 'var(--easyinput__border)',
					borderRadius: "8px",
					height: '46px',
					paddingLeft: '10px',
					background: '#38369a',
				},
				styles2: {
					color: 'var(--body-color)',
					border: 'var(--easyinput__border)',
					borderRadius: "8px 0 0 8px",
					height: '46px',
					paddingLeft: '10px',
					background: '#38369a',
				},
				cateValue: 0,
				caterange: [],
				userName: '',
				phoneBind: null, //验证类型 1手机，2邮箱，3都开启，任意验证，4同时关闭
				tripartiteCode: '',
				phoneNumber: '', //手机号码
				phoneCode: '', //手机验证码
				mailNumber: '', //邮箱号码
				mailCode: '', //邮箱验证码
				selecQu: '',
				quOptions: [],
				phoneCodeText: '',
				mailCodeText: '',
				nLoginPwd_1: '',
				nLoginPwd_2: '',
			}
		},
		async onLoad() {
			await this.getType();
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('login5')
			});
			this.quOptions = this.$helper.get('idc');
			this.selecQu = this.userInfo_common.qh ? this.userInfo_common.qh : this.$helper.get('idc_default');
		},
		methods: {
			phoneCodeChange(e) {
				this.phoneCodeText = e;
			},
			mailCodeChange(e) {
				this.mailCodeText = e;
			},
			selectQhao(options) {
				this.selecQu = options.label
			},
			getType() {
				this.caterange = [];
				this.phoneBind = this.$helper.get('rule').phone_bind;
				if (this.phoneBind == 1) {
					this.caterange.push({
						value: 1,
						text: this.$t('手机')
					})
				} else if (this.phoneBind == 2) {
					this.caterange.push({
						value: 2,
						text: this.$t('邮箱')
					})
				}
			},
			nextNameType() {
				if (this.userName.length > 0) {
					this.stepCount = 2;
				} else {
					this.$refs.uTips.show({
						title: this.$t('请输入账号')
					});
				}
			},
			nextEdit() {
				if (this.cateValue > 0) {
					this.stepCount = 3;
				} else {
					this.$refs.uTips.show({
						title: this.$t('请选择找回方式')
					});
				}
			},
			phoneNext() {
				if (this.phoneNumber.length > 4 && this.phoneCode.length > 3) {
					this.stepCount = 4;
				} else {
					this.$refs.uTips.show({
						title: this.$t('请输入完整信息')
					});
				}
			},
			mailNext() {
				if (this.mailNumber.length > 4 && this.mailCode.length > 3) {
					this.stepCount = 4;
				} else {
					this.$refs.uTips.show({
						title: this.$t('请输入完整信息')
					});
				}
			},
			pwdBack() {
				if (this.stepCount == 1) {
					this.common_back();
				} else {
					this.stepCount -= 1;
				}
			},
			typeChange(e) {
				this.cateValue = e;
			},
			async infoEdit() {
				let _this = this;
				if (_this.cateValue == 1) {
					if (_this.nLoginPwd_1 == '' || _this.nLoginPwd_2 == '' || _this.phoneNumber ==
						'' ||
						_this.phoneCode == '') {
						_this.$refs.uTips.show({
							title: _this.$t('请输入完整信息')
						});
						return
					} else {
						if (_this.nLoginPwd_1 != _this.nLoginPwd_2) {
							_this.$refs.uTips.show({
								title: _this.$t('密码不一致')
							});
						} else {
							uni.showLoading({
								title: _this.$t('loading')
							})
							let res = await _this.$u.api.forget_p({
								qh: _this.selecQu,
								phone: _this.phoneNumber,
								password: _this.setData.nLoginPwd_1,
								code: _this.phoneCode
							});
							if (res && res.code == 1) {
								_this.phoneCode = '';
								_this.phoneNumber = '';
								_this.nLoginPwd_2 = '';
								_this.nLoginPwd_1 = '';
								uni.hideLoading();
								_this.$refs.uTips.show({
									title: _this.$t(res.msg)
								});
								_this.userName = '';
								setTimeout(_ => {
									this.stepCount = 1;
								}, 3000);
							} else {
								uni.hideLoading();
								_this.$refs.uTips.show({
									title: _this.$t(res.msg)
								});
							}
						}
					}
				}
				if (_this.cateValue == 2) {
					if (_this.nLoginPwd_1 == '' || _this.nLoginPwd_2 == '' || _this.mailNumber ==
						'' ||
						_this.mailCode == '') {
						_this.$refs.uTips.show({
							title: _this.$t('请输入完整信息')
						});
						return
					} else {
						if (_this.nLoginPwd_1 != _this.nLoginPwd_2) {
							_this.$refs.uTips.show({
								title: _this.$t('密码不一致')
							});
						} else {
							let res = await _this.$u.api.forget_mail_p({
								mail: _this.mailNumber,
								mail_code: _this.mailCode,
								password: _this.nLoginPwd_1,
							});
							if (res && res.code == 1) {
								_this.mailNumber = '';
								_this.mailCode = '';
								_this.nLoginPwd_1 = '';
								uni.hideLoading();
								_this.$refs.uTips.show({
									title: _this.$t(res.msg)
								});
								_this.userName = '';
								setTimeout(_ => {
									this.stepCount = 1;
								}, 3000);
							} else {
								uni.hideLoading();
								_this.$refs.uTips.show({
									title: _this.$t(res.msg)
								});
							}
						}
					}
				}
			},
			async getMailCode() {
				let _this = this;
				if (_this.mailNumber == '') {
					_this.$refs.uTips.show({
						title: _this.$t('邮箱不能为空')
					});
				} else {
					if (_this.$refs.MailCodeKey.canGetCode) {
						if (this.$u.test.email(_this.mailNumber)) {
							uni.showLoading({
								title: _this.$t('loading')
							})
							let res = await _this.$u.api.send_mail_code_p({
								email: _this.mailNumber
							});
							if (res && res.code == 1) {
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
						} else {
							_this.$refs.uTips.show({
								title: _this.$t('邮箱格式不正确')
							});
						}
					}
				}
			},
			async getPhoneCode() {
				if (this.phoneNumber == '') {
					this.$refs.uTips.show({
						title: this.$t('手机号不能为空')
					});
				} else {
					if (this.$refs.registCode.canGetCode) {
						uni.showLoading({
							title: this.$t('loading')
						})
						let res = await this.$u.api.sendcode_p({
							qh: this.selecQu,
							phone: this.phoneNumber
						});
						if (res && res.code == 1) {
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
			},
		}
	}
</script>

<style lang="scss">
	.m-30 {
		padding: 30px 0;
	}

	.p-15 {
		padding: 15px;
	}
	
	.m-rl-50 {
		margin: 0 30px 0 60px;
	}
	
	.top-img {
		height: 240rpx;
		margin-bottom: 20px;
		position: relative;
	}
	
	.top-img .box-text {
		position: absolute;
		top: 80rpx;
		left: 25px;
		z-index: 10;
	}
	
	.top-img .box-text .line {
		width: 80px;
		height: 2px;
		margin-top: 10px;
		border-radius: 1px 0 0 1px;
		background: linear-gradient(to right, #fff 10%, rgba(240, 214, 84, 0));
	}
	
	.top-img image {
		width: 100%;
		height: 240rpx;
		border-radius: 8px;
	}

	.backBtn {
		padding: 8px;
		border-radius: 5px;
		background-color: #3c399f;
		position: absolute;
		left: 15px;
	}

	.selectType ::v-deep .uni-select__selector-item {
		line-height: 20px;
		padding: 10px;
	}

	.quSelectStyle {
		color: var(--body-color);
		width: 100% !important;
		height: 46px !important;
		background-color: var(--form-main-uni-easyinput__content);
		border: var(--easyinput__border) !important;
		border-radius: 8px;
	}

	.phoneCodeBtn {
		height: 46px !important;
		color: #FFFFFF;
		border-radius: 0 8px 8px 0;
		background: linear-gradient(var(--btn-submit-bg-1), var(--btn-submit-bg-2)) !important;
		box-shadow: var(--btn--submit--shadow) !important;
	}
</style>
