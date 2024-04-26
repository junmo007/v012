<template>
	<view>
		<uniNavHeader :title="$t('提现密码')" :profile="false" isback></uniNavHeader>
		<view class="bs-wrapper">
			<view class="gooLight">
				<!-- 绑定提现密码 -->
				<template v-if="!userInfo_common.withdrawal_psd">
					<view class="user-profile-panel u-p-20">
						<view class="pu-body">
							<view class="u-m-b-20">
								<text>{{$t('登录密码')}}</text>
								<text style="color: #D12C2C;">*</text>
							</view>
							<view class="form-cell_row u-m-b-30">
								<view class="flex_bd">
									<uni-easyinput :styles="styles" type="password" v-model="formData.oLoginPwd" />
								</view>
							</view>
							<view class="u-m-b-20">
								<text>{{$t('新提现密码')}}</text>
								<text style="color: #D12C2C;">*</text>
							</view>
							<view class="form-cell_row u-m-b-30">
								<view class="flex_bd">
									<uni-easyinput maxlength=6 type="password" :styles="styles"
										v-model="formData.withdrawal_psd" />
								</view>
							</view>
							<view class="u-m-b-20">
								<text>{{$t('确认新提现密码')}}</text>
								<text style="color: #D12C2C;">*</text>
							</view>
							<view class="form-cell_row u-m-b-30">
								<view class="flex_bd">
									<uni-easyinput maxlength=6 type="password" :styles="styles"
										v-model="formData.withdrawal_psd2" />
								</view>
							</view>
							<view class="pu-foot">
								<view class="btn btn--submit m-font-b active-btn" @click="withdrawalPwdClick">
									{{$t('public6')}}
								</view>
							</view>
						</view>
						<template v-if="userInfo_common.ispass == 0">
							<view class="login-pwd u-flex u-row-center flex--direction">
								<view class="u-m-l-30 u-m-r-30">{{$t('您还未设置登录密码')}}</view>
								<view class="w_100 btn--submit u-text-center u-p-20 u-m-t-30" @click="setUserPwdChange">
									<view class="m-line-1 m-font-b m-font-18">{{$t('前往')}}</view>
								</view>
							</view>
						</template>
					</view>
				</template>
				<!-- 修改提现密码 -->
				<template v-if="withdrawalCheckType != 0 && withdrawalStatus == 1 && userInfo_common.withdrawal_psd">
					<view class="user-profile-panel u-p-20 pu-body">
						<view class="u-m-b-20">
							<text>{{$t('登录密码')}}</text>
							<text style="color: #D12C2C;">*</text>
						</view>
						<view class="form-cell_row u-m-b-30">
							<view class="flex_bd">
								<uni-easyinput type="password" :styles="styles" v-model="formData.oLoginPwd"
									:placeholder="$t('请输入登录密码')" />
							</view>
						</view>
						<view class="u-m-b-20">
							<text>{{$t('新提现密码')}}</text>
							<text style="color: #D12C2C;">*</text>
						</view>
						<view class="form-cell_row u-m-b-30">
							<view class="flex_bd">
								<uni-easyinput maxlength=6 type="password" :styles="styles"
									v-model="formData.withdrawal_psd" :placeholder="$t('请输入新提现密码')" />
							</view>
						</view>
						<view class="u-m-b-20">
							<text>{{$t('确认新提现密码')}}</text>
							<text style="color: #D12C2C;">*</text>
						</view>
						<view class="form-cell_row u-m-b-30">
							<view class="flex_bd">
								<uni-easyinput maxlength=6 type="password" :styles="styles"
									v-model="formData.withdrawal_psd2" :placeholder="$t('请确认新提现密码')" />
							</view>
						</view>
						<template v-if="withdrawalCheckType != 0 && withdrawalStatus == 1">
							<!-- 手机修改提现密码 -->
							<template v-if="withdrawalCheckType == 1">
								<template v-if="userInfo_common.phone">
									<view class="u-m-t-30">
										<text>{{'+'+selecQu}}</text>
										<text class="u-m-l-8">{{userInfo_common.phone}}</text>
										<text style="color: #D12C2C;">*</text>
									</view>
									<view class="form-cell_row u-flex u-m-b-30 u-m-t-10">
										<view class="flex_bd">
											<uni-easyinput type="number" :placeholder="$t('请输入手机验证码')" :styles="styles"
												v-model="formData.code" />
										</view>
										<button @tap="getPhoneCode_two()"
											class="phoneCodeBtn btn">{{$t(phoneCodeText_two)}}
										</button>
										<u-verification-code seconds="60" ref="phoneCode" @change="phoneCodeChange_two"
											:start-text="$t('获取验证码')" :end-text="$t('rep_sned')" change-text="XS">
										</u-verification-code>
									</view>
								</template>
								<template v-if="!userInfo_common.phone">
									<view class="u-m-t-30 u-text-center">
										<view>{{$t('您还没绑定手机')}}</view>
									</view>
								</template>
							</template>
							<!-- 邮箱修改提现密码 -->
							<template v-if="withdrawalCheckType == 2">
								<template v-if="userInfo_common.mail2">
									<view class="u-m-t-30">
										<text>{{userInfo_common.mail2}}</text>
										<text style="color: #D12C2C;">*</text>
									</view>
									<view class="form-cell_row u-flex u-m-b-30 u-m-t-10">
										<view class="flex_bd">
											<uni-easyinput type="number" :placeholder="$t('请输入邮箱验证码')" :styles="styles"
												v-model="formData.mailCode" />
										</view>
										<button @tap="getMailCode_two()"
											class="phoneCodeBtn btn">{{$t(mailCodeText_two)}}
										</button>
										<u-verification-code seconds="60" ref="mailCodeKey_two"
											@change="mailCodeChange_two" :start-text="$t('获取验证码')"
											:end-text="$t('rep_sned')" change-text="XS">
										</u-verification-code>
									</view>
								</template>
								<template v-if="!userInfo_common.mail2">
									<view class="u-m-t-30 u-text-center">
										<view>{{$t('您还没绑定邮箱')}}</view>
									</view>
								</template>
							</template>
						</template>
						<view class="pu-foot">
							<template v-if="withdrawalCheckType == 1 && userInfo_common.phone">
								<view class="btn btn--submit m-font-b active-btn" @click="editUserWith">
									{{$t('public6')}}
								</view>
							</template>
							<template v-if="withdrawalCheckType == 2 && userInfo_common.mail2">
								<view class="btn btn--submit m-font-b active-btn" @click="editUserWith">
									{{$t('public6')}}
								</view>
							</template>
						</view>
					</view>
				</template>
			</view>
		</view>


		<u-popup v-model="setUserPwdPop" mode="bottom" :mask-custom-style="uPopMaskCustomStyle" borderRadius="32"
			z-index="10001">
			<view class="bs-popup pc_pop">
				<view class="bs-popup-hd">
					<view class="tt m-c-w">{{$t('账号信息完善')}}</view>
					<image src="@/static/images/index/close.png"
						style="width: 32px;height: 32px;position: absolute;right: 15px;" mode=""
						@click="setUserPwdPop = false">
					</image>
				</view>
				<view class="bs-popup-body">
					<view class="pop-user-name m-line-1 u-m-b-30 m-font-18 m-font-b">{{userInfo_common.username}}</view>
					<view class="u-m-b-20">
						<text>{{$t('设置登陆密码')}}</text>
						<text style="color: #D12C2C;">*</text>
					</view>
					<view class="form-cell u-flex">
						<uni-easyinput class="" type="password" v-model="formData.nLoginPwd_1" :styles="styles"
							placeholder="" />
					</view>
					<view class="u-m-b-20 u-m-t-40">
						<text>{{$t('重复登陆密码')}}</text>
						<text style="color: #D12C2C;">*</text>
					</view>
					<view class="form-cell u-flex u-m-b-30">
						<uni-easyinput class="" type="password" v-model="formData.nLoginPwd_2" :styles="styles"
							placeholder="" />
					</view>
					<view class="u-flex u-row-center w_100 u-m-t-50">
						<view class="w_50 btn--other u-text-center u-p-20 u-m-r-10" @click="setUserPwdPop = false">
							<view class="m-line-1 m-font-b m-font-18">{{$t('public5')}}</view>
						</view>
						<view class="w_50 btn--submit u-text-center u-p-20 u-m-l-10" @click="setUserLoginPwd">
							<view class="m-line-1 m-font-b m-font-18">{{$t('public6')}}</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
		</u-top-tips>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import quSelect from "@/components/easy-select/easy-select.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			quSelect,
		},
		data() {
			return {
				formData: {
					qh: '',
					phone: '',
					code: '',
					mailCode: '',
					oLoginPwd: '',
					nLoginPwd_1: '',
					nLoginPwd_2: '',
					withdrawal_psd: '',
					withdrawal_psd2:""
				},
				phoneCodeText_two: '',
				mailCodeText_two: '',
				selecQu: '',
				withdrawalCheckType: null, //修改提现密码 验证方式
				withdrawalStatus: null, //是否开启
				styles: {
					color: '#ffffff',
					borderColor: 'transparent',
					borderRadius: "0",
					boxShadow: 'var(--shadow-bg)'
				},
				setUserPwdPop: false
			}
		},
		onLoad() {
			this.getUserInfo_common();
			this.formData.phone = this.userInfo_common.yphone;
			this.formData.qh = this.userInfo_common.qh;
			this.selecQu = this.userInfo_common.qh ? this.userInfo_common.qh : this.$helper.get('idc_default');
			this.withdrawalCheckType = this.$helper.get('rule').withdrawal_check_type;
			this.withdrawalStatus = this.$helper.get('rule').withdrawal_status;
		},
		methods: {
			// 设置登录密码
			async setUserLoginPwd() {
				if (this.formData.nLoginPwd_1 == '' || this.formData.nLoginPwd_2 == '') {
					this.$refs.uTips.show({
						title: this.$t('请输入完整信息')
					});
				} else {
					if (this.formData.nLoginPwd_1 != this.formData.nLoginPwd_2) {
						this.$refs.uTips.show({
							title: this.$t('密码不一致')
						});
					} else {
						uni.showLoading({
							title: this.$t('loading')
						})
						let res = await this.$u.api.useredit_p({
							password: this.formData.nLoginPwd_1
						});
						if (res.code == 1) {
							this.formData.nLoginPwd_1 = '';
							this.formData.nLoginPwd_2 = '';
							this.setUserPwdPop = false;
							uni.hideLoading();
							this.$refs.uTips.show({
								title: this.$t('设置成功请重新登录')
							});
							this.getUserInfo_common();
							setTimeout(() => {
								this.logout_common();
							}, 3000);
						} else {
							uni.hideLoading();
							this.$refs.uTips.show({
								title: this.$t(res.msg)
							});
						}
					}
				}
			},
			setUserPwdChange() {
				this.setUserPwdPop = true;
			},
			phoneCodeChange_two(e) {
				this.phoneCodeText_two = e;
			},
			mailCodeChange_two(e) {
				this.mailCodeText_two = e;
			},
			// 设置提现密码
			withdrawalPwdClick() {
				if (this.formData.oLoginPwd == '' || this.formData.withdrawal_psd == '' || this.formData
					.withdrawal_psd2 == '') {
					this.$refs.uTips.show({
						title: this.$t('请输入完整信息')
					});
				} else {
					this.withdrawalChange();
				}
			},
			async withdrawalChange() {
				if (this.formData.withdrawal_psd != this.formData.withdrawal_psd2) {
					this.$refs.uTips.show({
						title: this.$t('密码不一致')
					});
				} else {
					uni.showLoading({
						title: this.$t('loading')
					})
					let param = {
						old_password: this.formData.oLoginPwd,
						withdrawal_psd: this.formData.withdrawal_psd
					}
					let res = await this.$u.api.useredit_p(param);
					uni.hideLoading();
					if (res.code == 1) {
						this.formData.oLoginPwd = '';
						this.formData.withdrawal_psd = '';
						this.formData.withdrawal_psd2 = '';
						this.$refs.uTips.show({
							title: this.$t(res.msg)
						});
						setTimeout(() => {
							this.common_back();
						}, 3000);
					} else {
						this.$refs.uTips.show({
							title: this.$t(res.msg)
						});
					}
				}
			},
			async getPhoneCode_two() {
				if (this.$refs.phoneCode.canGetCode) {
					uni.showLoading({
						title: this.$t('loading')
					})
					let info = {
						qh: this.selecQu,
						phone: this.userInfo_common.yphone
					}
					let res = await this.$u.api.sendcode_p(info);
					if (res.code == 1) {
						uni.hideLoading();
						this.$refs.uTips.show({
							title: this.$t(res.msg)
						});
						this.$refs.phoneCode.start();
					} else {
						this.$refs.uTips.show({
							title: this.$t(res.msg)
						});
					}
				}
			},
			// 修改提现密码
			async editUserWith() {
				// 手机修改
				if (this.withdrawalCheckType == 1) {
					if (this.formData.code == '' || this.formData.withdrawal_psd == '' ||
						this.formData.withdrawal_psd2 == '' || this.formData.oLoginPwd == '') {
						this.$refs.uTips.show({
							title: this.$t('请输入完整信息')
						});
					} else {
						if (this.formData.withdrawal_psd != this.formData.withdrawal_psd2) {
							this.$refs.uTips.show({
								title: this.$t('密码不一致')
							});
						} else {
							uni.showLoading({
								title: this.$t('loading')
							})
							let param = {
								qh: this.selecQu,
								phone: this.formData.phone,
								code: this.formData.code,
								old_password: this.formData.oLoginPwd,
								withdrawal_psd: this.formData.withdrawal_psd
							}
							let res = await this.$u.api.useredit_p(param);
							if (res.code == 1) {
								this.formData.phone = '';
								this.formData.code = '';
								this.formData.oLoginPwd = '';
								this.formData.withdrawal_psd = '';
								this.formData.withdrawal_psd2 = '';
								this.getUserInfo_common();
								uni.hideLoading();
								this.$refs.uTips.show({
									title: this.$t(res.msg)
								});
							} else {
								uni.hideLoading();
								this.$refs.uTips.show({
									title: this.$t(res.msg)
								});
							}
						}
					}
					// 邮箱修改
				} else if (this.withdrawalCheckType == 2) {
					if (this.formData.mailCode == '' || this.formData.withdrawal_psd ==
						'' || this.formData.withdrawal_psd2 == '' || this.formData.oLoginPwd == '') {
						this.$refs.uTips.show({
							title: this.$t('请输入完整信息')
						});
					} else {
						if (this.formData.withdrawal_psd != this.formData.withdrawal_psd2) {
							this.$refs.uTips.show({
								title: this.$t('密码不一致')
							});
						} else {
							uni.showLoading({
								title: this.$t('loading')
							})
							let param = {
								mail: this.userInfo_common.mail,
								mail_code: this.formData.mailCode,
								old_password: this.formData.oLoginPwd,
								withdrawal_psd: this.formData.withdrawal_psd
							}
							let res = await this.$u.api.useredit_p(param);
							if (res.code == 1) {
								this.formData.mail = '';
								this.formData.mailCode = '';
								this.formData.oLoginPwd = '';
								this.formData.withdrawal_psd = '';
								this.formData.withdrawal_psd2 = '';
								this.getUserInfo_common();
								uni.hideLoading();
								this.$refs.uTips.show({
									title: this.$t(res.msg)
								});
							} else {
								uni.hideLoading();
								this.$refs.uTips.show({
									title: this.$t(res.msg)
								});
							}
						}
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	.phoneCodeBtn {
		min-width: 100px;
		padding: 0 10px;
		font-weight: bold;
		background: #E9AE3A;
		color: #FFFFFF;
		height: 34px;
		border-radius: 10px;
		margin-right: 10px;
	}

	.bs-wrapper {
		background: var(--mar-bg);
		padding: 70px 0 0 0 !important;
	}

	.gooLight {
		border-radius: 15px 15px 0 0;
		padding: 15px;
	}

	.profile-panel {
		padding: 15px;
	}

	.bs-panel ::v-deep .easy-select {
		width: 60px !important;
		border: 0;
	}

	.pu-foot {
		position: fixed;
		left: 0;
		right: 0;
		padding: 15px 15px 30px 15px;
		z-index: 22;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pu-foot .btn {
		height: 50px;
		line-height: 50px;
		width: 100%;
	}

	.form-cell_row {
		display: flex;
		align-items: center;
		background-color: #1E1739;
		border: 1px solid #644CBC;
		border-radius: 15px;
		height: 54px;
	}
</style>
