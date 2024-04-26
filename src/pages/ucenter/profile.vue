<template>
	<view>
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<!-- 轮播图 -->
			<view class="pc-main u-flex">
				<pcSideBar :pageIndex="2"></pcSideBar>
				<view class="m-bg-w m-c-0 pc-main-right">
					<view class="m-font-b u-m-b-30">{{$t('user8')}}</view>
					<!-- 手机 -->
					<template v-if="(phoneBind == 1 || phoneBind == 3) && phoneCheck == 1">
						<view class="pu-cell">
							<view class="pu-cell-bar" @click="!userInfo_common.yphone?cellOnInfo(1,'手机号码'):''">
								<view class="pu-tt">{{!userInfo_common.yphone?$t('未绑定手机号码'):$t('手机号码')}}
								</view>
								<view class="pu-info" :class="!userInfo_common.phone?'text-green':'text-orange'">
									{{userInfo_common.yphone?'+'+userInfo_common.qh+' '+userInfo_common.phone:$t('未绑定')}}
								</view>
								<view class="iconfont icon-right m-font-b m-font-14 u-m-l-8 m-c-6"
									v-if="!userInfo_common.yphone"
									style="transition: .3s all;transform: rotateZ(90deg)">
								</view>
							</view>

						</view>
					</template>
					<!-- 邮箱 -->
					<template v-if="(phoneBind == 2 || phoneBind == 3) && phoneCheck == 1">
						<view class="pu-cell">
							<view class="pu-cell-bar" @click="!userInfo_common.mail2?cellOnInfo(2,'邮箱'):''">
								<view class="pu-tt">{{$t('邮箱')}}</view>
								<view class="pu-info" :class="!userInfo_common.mail2?'text-orange':'text-green'">
									{{userInfo_common.mail2?userInfo_common.mail2:$t('未绑定')}}
								</view>
								<view class="iconfont icon-right m-font-b m-font-14 u-m-l-8 m-c-6"
									v-if="!userInfo_common.mail2" style="transition: .3s all;"
									:style="onInfo == 2 && editInfoIndex == null?'transform: rotateZ(90deg);':'transform: rotateZ(0);'">
								</view>
							</view>
							<view class="profile-panel pu-body" v-if="onInfo == 2 && editInfoIndex == null">
								<view class="m-line-1 u-m-b-10">{{$t('邮箱')}}</view>
								<view class="form-cell u-m-b-30 u-flex">
									<uni-easyinput type="text" v-model="formData.mail" :placeholder="$t('请输入邮箱')"
										:styles="styles" />
								</view>
								<view class="m-line-1 u-m-b-10">{{$t('邮箱验证码')}}</view>
								<view class="form-cell u-flex u-m-b-30 ">
									<view class="flex_bd">
										<uni-easyinput type="number" :placeholder="$t('请输入邮箱验证码')" :styles="styles"
											v-model="formData.mailCode" />
									</view>
									<button @tap="getMailCode()" class="phoneCodeBtn btn">{{$t(mailCodeText)}}
									</button>
									<u-verification-code seconds="60" ref="mailCodeKey" @change="mailCodeChange"
										:start-text="$t('获取验证码')" :end-text="$t('rep_sned')" change-text="XS">
									</u-verification-code>
								</view>
								<view class="pu-foot">
									<view class="btn btn--gray m-font-b" @click="editMailBtn"
										:class="formData.mailCode.length > 3 && formData.mail.length > 3?'active-btn':''">
										{{$t('public6')}}
									</view>
								</view>
							</view>
						</view>
					</template>
					<!-- 登录密码 -->
					<view class="pu-cell cur_pointer">
						<view class="pu-cell-bar" @click="cellChange(3,'登录密码')">
							<view class="pu-tt">{{$t('登录密码')}}</view>
							<!-- <view class="pu-info text-green">******</view> -->
							<view class="pu-info" :class="userInfo_common.ispass == 1 ? 'text-green':'text-orange'">
								{{userInfo_common.ispass == 1?'******':$t('未绑定')}}
							</view>
							<view class="iconfont icon-right m-font-b m-font-14 u-m-l-8 m-c-6"
								style="transition: .3s all;"
								:style="editInfoIndex == 3?'transform: rotateZ(90deg);':'transform: rotateZ(0);'">
							</view>
						</view>
						<view class="profile-panel pu-body" v-if="editInfoIndex == 3">
							<!-- <view class="u-c-9">{{$t('使用旧密码修改登录密码')}}</view> -->
							<view class="u-m-b-20">{{$t('旧密码')}}</view>
							<view class="form-cell u-flex u-m-b-30 ">
								<uni-easyinput class="" type="password" v-model="formData.oLoginPwd" :styles="styles"
									:placeholder="$t('请输入旧密码')" />
							</view>
							<view class="u-m-b-20">{{$t('新登录密码')}}</view>
							<view class="form-cell u-flex u-m-b-30 ">
								<uni-easyinput class="" type="password" v-model="formData.nLoginPwd_1" :styles="styles"
									:placeholder="$t('请输入新登录密码')" />
							</view>
							<view class="u-m-b-20">{{$t('确认新登录密码')}}</view>
							<view class="form-cell u-flex u-m-b-30 ">
								<uni-easyinput class="" type="password" v-model="formData.nLoginPwd_2" :styles="styles"
									:placeholder="$t('请确认新登录密码')" />
							</view>
							<view class="pu-foot">
								<view class="btn btn--gray m-font-b editInfoBtn" @click="editLoginBtn"
									:class="formData.oLoginPwd.length > 5 && formData.nLoginPwd_1.length > 5 && formData.nLoginPwd_2.length > 5?'active-btn':''">
									{{$t('public6')}}
								</view>
							</view>
						</view>
					</view>
					<!-- 提现密码 - 设置 - 修改 -->
					<view class="pu-cell">
						<view class="pu-cell-bar"
							@click="!userInfo_common.withdrawal_psd?cellOnInfo(4,'提现密码'):cellOnInfo(44,'修改提现密码')">
							<view class="pu-tt">{{$t('提现密码')}}</view>
							<view class="pu-info" :class="!userInfo_common.withdrawal_psd?'text-orange':'text-green'">
								{{!userInfo_common.withdrawal_psd?$t('未设置'):'******'}}
							</view>
							<template
								v-if="(withdrawalCheckType != 0 && withdrawalStatus == 1) || !userInfo_common.withdrawal_psd">
								<view class="iconfont icon-right m-font-b m-font-14 u-m-l-8 m-c-6"
									style="transition: .3s all;"
									:style="onInfo == 4 || onInfo == 44 && editInfoIndex == null?'transform: rotateZ(90deg);':'transform: rotateZ(0);'">
								</view>
							</template>
						</view>

					</view>
					<!-- 实名验证 -->
					<view class=" pu-cell">
						<view class="pu-cell-bar" @click="!userInfo_common.real_name?cellOnInfo(5,'实名验证'):''">
							<view class="pu-tt">{{$t('实名验证')}}</view>
							<view class="pu-info" :class="userInfo_common.real_name?'text-green':'text-orange'">
								{{userInfo_common.real_name?userInfo_common.real_name:$t('未绑定')}}
							</view>
							<view class="iconfont icon-right m-font-b m-font-14 u-m-l-8 m-c-6"
								v-if="!userInfo_common.real_name" style="transition: .3s all;"
								:style="onInfo == 5 && editInfoIndex == null?'transform: rotateZ(90deg);':'transform: rotateZ(0);'">
							</view>
						</view>
						<view class="profile-panel pu-body" v-if="onInfo == 5 && editInfoIndex == null">
							<view class="form-cell u-m-b-30">
								<view class="flex_bd">
									<uni-easyinput class="" type="text" v-model="formData.real_name" :styles="styles"
										:placeholder="$t('请输入您的姓名')" />
								</view>
							</view>
							<view class="u-text-center u-m-b-30">
								<text class="u-c-r">*</text>
								<text class="u-m-l-8">{{$t('realNameTip')}}</text>
							</view>
							<view class="pu-foot">
								<view class="btn btn--gray m-font-b editInfoBtn" @click="bankUserRealName"
									:class="formData.real_name.length > 0?'active-btn':''">{{$t('public6')}}
								</view>
							</view>
						</view>
					</view>
					<view class="pu-cell">
						<view class="pu-cell-bar" @click="cellOnInfo(6,'登录日志')">
							<view class="pu-tt">{{$t('登录日志')}}</view>
							<view class="pu-info">
								<view class="iconfont icon-right m-font-b m-font-14 u-p-t-6 u-m-l-8 m-c-6"
									style="transition: .3s all;"
									:style="onInfo == 6 && editInfoIndex == null?'transform: rotateZ(90deg);':'transform: rotateZ(0);'">
								</view>
							</view>
						</view>
						<view class="profile-panel pu-body" v-if="onInfo == 6 && editInfoIndex == null">
							<view class="rz-cell u-m-b-30" v-for="(item, index) in loginInfo" :key="index">
								<view class="m-font-16 m-font-b">{{getOS(item.device)}}</view>
								<view class="m-c-6 m-line-1 u-m-t-8">{{item.device}}</view>
								<view class="m-c-6 u-m-t-8">{{item.login_time}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content" :data-theme="themeMode">
				<view class="container">
					<uniNavHeader :title="$t('user8')" :profile="false" isback></uniNavHeader>
					<!-- main -->
					<view class="bs-wrapper">
						<view class="user-profile-panel">
							<!-- 手机 -->
							<template v-if="(phoneBind == 1 || phoneBind == 3) && phoneCheck == 1">
								<view class="pu-cell"
									@click="!userInfo_common.yphone?$go('/pages/ucenter/bindPhone'):''">
									<view class="pu-cell-bar u-flex u-row-between">
										<view class="u-flex">
											<view class="pu-tt m-font-16 u-m-r-20">
												{{!userInfo_common.yphone?$t('未绑定手机号码'):$t('手机号码')}}
											</view>
											<image src="@/static/images/index-footer/Check.png"
												style="width: 16px;height: 16px;" v-if="userInfo_common.yphone"></image>
										</view>
										<view class="iconfont icon-right m-font-b m-font-14"></view>
									</view>
								</view>
							</template>
							<!-- 邮箱 -->
							<template v-if="(phoneBind == 2 || phoneBind == 3) && phoneCheck == 1">
								<view class="pu-cell" @click="!userInfo_common.mail2?$go('/pages/ucenter/bindMail'):''">
									<view class="pu-cell-bar u-flex u-row-between">
										<view class="u-flex">
											<view class="pu-tt m-font-16 u-m-r-20">{{$t('邮箱')}}</view>
											<image src="@/static/images/index-footer/Check.png"
												style="width: 16px;height: 16px;" v-if="userInfo_common.mail2"></image>
										</view>
										<view class="iconfont icon-right m-font-b m-font-14"></view>
									</view>
								</view>
							</template>
							<!-- 登录密码 -->
							<view class="pu-cell" @click="$go('/pages/ucenter/bindLoginPwd')">
								<view class="pu-cell-bar u-flex u-row-between">
									<view class="u-flex">
										<view class="pu-tt m-font-16 u-m-r-20">{{$t('登录密码')}}</view>
										<image src="@/static/images/index-footer/Check.png"
											style="width: 16px;height: 16px;" v-if="userInfo_common.ispass == 1">
										</image>
									</view>
									<view class="iconfont icon-right m-font-b m-font-14"></view>
								</view>
							</view>
							<!-- 提现密码 -->
							<view class="pu-cell"
								@click="((withdrawalCheckType == 1 || withdrawalCheckType == 2) && withdrawalStatus == 1) || !userInfo_common.withdrawal_psd?$go('/pages/ucenter/bindWithdrawPwd'):''">
								<view class="pu-cell-bar u-flex u-row-between">
									<view class="u-flex">
										<view class="pu-tt m-font-16 u-m-r-20">
											{{!userInfo_common.withdrawal_psd?$t('提现密码'):$t('提现密码')}}
										</view>
										<image src="@/static/images/index-footer/Check.png"
											style="width: 16px;height: 16px;" v-if="userInfo_common.withdrawal_psd">
										</image>
									</view>
									<view class="iconfont icon-right m-font-b m-font-14"
										v-if="((withdrawalCheckType == 1 || withdrawalCheckType == 2) && withdrawalStatus == 1) || !userInfo_common.withdrawal_psd">
									</view>
								</view>
							</view>
							<!-- 实名验证 -->
							<view class=" pu-cell"
								@click="certificates.force_sta == 1?$go('/pages/ucenter/bindCertifyPwd'):''">
								<view class="pu-cell-bar u-flex u-row-between">
									<view class="u-flex">
										<view class="pu-tt m-font-16 u-m-r-20">{{$t('实名验证')}}</view>
										<image src="@/static/images/index-footer/Check.png"
											style="width: 16px;height: 16px;" v-if="certificates.force_sta == 3">
										</image>
									</view>
									<view v-if="certificates.force_sta == 2" class="text-yellow">{{$t('正在审核中')}}</view>
									<view class="iconfont icon-right m-font-b m-font-14"
										v-if="certificates.force_sta == 1"></view>
								</view>
							</view>
							<!-- <view class="pu-cell" @click="$go('/pages/ucenter/bindLog')">
								<view class="pu-cell-bar u-flex u-row-between">
									<view class="pu-tt m-font-16">{{$t('登录日志')}}</view>
									<view class="iconfont icon-right m-font-b m-font-14"></view>
								</view>
							</view> -->
						</view>
					</view>
				</view>
			</view>
		</template>
		<u-popup v-model="setUserPwdPop" mode="center" :mask-close-able="false" border-radius="20">
			<view class="uc-pop">
				<view class="u-flex u-row-between u-p-30 pop-top top-bd">
					<view class="u-m-t-10 m-font-b">{{$t('账号信息完善')}}</view>
				</view>
				<view class="u-p-t-40 u-p-l-40 u-p-r-40 u-p-b-60 pop-bottom bottom-bd profile-panel">
					<view class="u-p-b-20">{{$t('您的平台登陆账号')}}</view>
					<view class="pop-user-name m-line-1 u-m-b-30">{{userInfo_common.username}}</view>
					<view class="u-p-b-20">{{$t('设置登陆密码')}}</view>
					<view class="form-cell u-flex">
						<uni-easyinput class="" type="password" v-model="formData.nLoginPwd_1" :styles="styles"
							placeholder="" />
					</view>
					<view class="u-m-b-30 text-orange m-font-12">{{$t('密码支持格式')}}</view>
					<view class="u-p-b-20">{{$t('重复登陆密码')}}</view>
					<view class="form-cell u-flex u-m-b-30">
						<uni-easyinput class="" type="password" v-model="formData.nLoginPwd_2" :styles="styles"
							placeholder="" />
					</view>
					<view class="u-flex u-row-center w_100 u-m-t-50">
						<view class="w_50 btn--other u-text-center u-p-20 u-m-r-10" @click="setUserPwdPop = false">
							<view class="m-line-1 m-font-b">{{$t('public5')}}</view>
						</view>
						<view class="w_50 btn--submit u-text-center u-p-20 u-m-l-10" @click="setUserLoginPwd">
							<view class="m-line-1 m-font-b">{{$t('public6')}}</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
		</u-top-tips>
		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import quSelect from "@/components/easy-select/easy-select.vue"
	import pcBg from "@/components/pc-bg/bg.vue"
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			quSelect,
			pcNavHeader,
			pcBg,
			pcSideBar,
		},
		data() {
			return {
				sideshow: false,
				// 弹窗
				formData: {
					//birthday: '',
					qh: '',
					phone: '',
					code: '',
					mail: '',
					mailCode: '',
					oLoginPwd: '',
					nLoginPwd_1: '',
					nLoginPwd_2: '',
					withdrawal_psd: '',
					real_name: ''
				},
				quOptions: [],
				selecQu: '',
				selecQuIcon: '',
				phoneCodeText: '',
				phoneCodeText_two: '',
				mailCodeText: '',
				mailCodeText_two: '',
				onInfo: null,
				editInfoIndex: null, // 1手机号码 2邮箱 3登录密码 4提现密码
				phoneBind: null,
				phoneCheck: null, //手机 邮箱 验证开启
				withdrawalCheckType: null, //修改提现密码 验证方式
				withdrawalStatus: null, //是否开启
				nav_title_status: null,
				styles: {
					color: '#000',
					borderColor: 'var(--user-info-input-bg)',
					borderRadius: "16px",
					boxShadow: 'var(--shadow-bg)'
				},
				page: 1,
				loginInfo: [],
				setUserPwdPop: false,
				certificates: {
					force_sta: 1
				}
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('个人资料')
			});
			this.getUserInfo_common();
			this.formData.birthday = this.userInfo_common.birthday;
			this.formData.qh = this.userInfo_common.qh;
			this.formData.phone = this.userInfo_common.yphone;
			this.phoneBind = this.$helper.get('rule').phone_bind;
			this.phoneCheck = this.$helper.get('rule').phone_check;
			this.nav_title_status = parseInt(this.$helper.get('rule').force_pwd) == 1;
			this.withdrawalCheckType = this.$helper.get('rule').withdrawal_check_type;
			this.withdrawalStatus = this.$helper.get('rule').withdrawal_status;
			let idc = this.$helper.get('idc');
			this.quOptions = idc;
			this.selecQu = this.userInfo_common.qh ? this.userInfo_common.qh : this.$helper.get('idc_default');
			this.selecQuIcon = this.$helper.get('idc_default_flag');
		},
		async onLoad(setpwd) {
			if (setpwd) {
				if (!this.$helper.get('userInfo').withdrawal_psd) {
					this.onInfo = 4;
					this.editInfoIndex = null;
				}
				this.setpwd = setpwd.setpwd;
			}
			// this.getMyLogin();
			await this.getCertificate();
		},
		methods: {
			setUserPwdChange() {
				this.setUserPwdPop = true;
			},
			//获取实名认证信息
			async getCertificate() {
				let res = await this.$u.api.user_certificate_p({});
				if (res && res.code == 1) {
					if (res.data) {
						this.certificates = res.data;
					}
				}
			},
			async getMyLogin() {
				let res = await this.$u.api.my_login_p({
					page: this.page,
					limit: 10
				});
				if (res && res.code == 1) {
					this.loginInfo = res.data;
				}
			},
			cellChange(e, item) {
				this.editInfoIndex = e == this.editInfoIndex ? !e : e;
			},
			cellOnInfo(e, item) {
				this.editInfoIndex = null;
				this.onInfo = e == this.onInfo ? !e : e;
			},
			// 修改登录密码
			async editLoginBtn() {
				if (this.formData.oLoginPwd == '' || this.formData.nLoginPwd_1 == '' || this.formData.nLoginPwd_2 ==
					'') {
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
						let param = {
							old_password: this.formData.oLoginPwd,
							password: this.formData.nLoginPwd_1
						}
						let res = await this.$u.api.useredit_p(param);
						if (res.code == 1) {
							this.formData.oLoginPwd = '';
							this.formData.nLoginPwd_1 = '';
							this.formData.nLoginPwd_2 = '';
							this.onInfo = null;
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
			},
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
							this.onInfo = 4;
							this.setUserPwdPop = false;
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
			},
			// 修改提现密码
			async editUserWith() {
				// 手机修改
				if (this.withdrawalCheckType == 1) {
					if (this.formData.code == '' || this.formData.withdrawal_psd == '' ||
						this.formData.withdrawal_psd2 == '') {
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
								withdrawal_psd: this.formData.withdrawal_psd
							}
							let res = await this.$u.api.useredit_p(param);
							if (res.code == 1) {
								this.formData.phone = '';
								this.formData.code = '';
								this.formData.withdrawal_psd = '';
								this.formData.withdrawal_psd2 = '';
								this.onInfo = null;
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
						'' || this.formData.withdrawal_psd2 == '') {
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
								withdrawal_psd: this.formData.withdrawal_psd
							}
							let res = await this.$u.api.useredit_p(param);
							if (res.code == 1) {
								this.formData.mail = '';
								this.formData.mailCode = '';
								this.formData.withdrawal_psd = '';
								this.formData.withdrawal_psd2 = '';
								this.onInfo = null;
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
			// 设置提现密码
			async withdrawalPwdClick() {
				if (this.formData.oLoginPwd == '' || this.formData.withdrawal_psd == '' || this.formData
					.withdrawal_psd2 == '') {
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
							old_password: this.formData.oLoginPwd,
							withdrawal_psd: this.formData.withdrawal_psd
						}
						let res = await this.$u.api.useredit_p(param);
						if (res.code == 1) {
							this.formData.oLoginPwd = '';
							this.formData.withdrawal_psd = '';
							this.formData.withdrawal_psd2 = '';
							this.onInfo = null;
							await this.getUserInfo_common();
							uni.hideLoading();
							if (this.setpwd && parseInt(this.$helper.get('rule').force_pwd) == 1) {
								this.setpwd = false;
								this.$helper.set('testPwd', false);
							} else if (this.setpwd) {
								this.onInfo = null;
								this.editInfoIndex = null;
								this.setpwd = false;
								this.$helper.set('testPwd', false);
							}
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
			},
			async editPhoneBtn() {
				uni.showLoading({
					title: this.$t('loading')
				})
				if (this.formData.phone == '') {
					this.$refs.uTips.show({
						title: this.$t('手机号不能为空')
					});
				} else {
					let info = {
						qh: this.selecQu,
						phone: this.formData.phone,
						code: this.formData.code
					};
					let res = await this.$u.api.useredit_p(info);
					if (res.code == 1) {
						uni.hideLoading();
						this.$refs.registCode.start();
						this.onInfo = null;
						this.$refs.uTips.show({
							title: this.$t(res.msg)
						});
						this.getUserInfo_common();
					} else {
						uni.hideLoading();
						this.$refs.uTips.show({
							title: this.$t(res.msg)
						});
					}
				}
			},
			// 绑定邮箱
			async editMailBtn() {
				if (this.formData.mail == '' || this.formData.mailCode == '') {
					this.$refs.uTips.show({
						title: this.$t('请输入完整信息')
					});
				} else {
					uni.showLoading({
						title: this.$t('loading')
					});
					let res = await this.$u.api.useredit_p({
						mail: this.formData.mail,
						mail_code: this.formData.mailCode
					});
					if (res) {
						this.formData.mail = '';
						this.formData.mailCode = '';
						this.getUserInfo_common();
						this.onInfo = null;
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
			},
			// 绑定姓名
			async bankUserRealName() {
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.useredit_p({
					real_name: this.formData.real_name
				});
				if (res) {
					uni.hideLoading();
					this.getUserInfo_common();
					this.formData.real_name = '';
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
				} else {
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
				}
			},
			selectQhao(options) {
				this.selecQu = options.label;
				this.$helper.set('idc_default_flag', options.flag);
				this.selecQuIcon = options.flag;
			},
			phoneCodeChange(e) {
				this.phoneCodeText = e;
			},
			phoneCodeChange_two(e) {
				this.phoneCodeText_two = e;
			},
			mailCodeChange(e) {
				this.mailCodeText = e;
			},
			mailCodeChange_two(e) {
				this.mailCodeText_two = e;
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			// 提交
			submit() {
				this.$refs.form.validate().then(async res => {
					uni.showLoading({
						mask: true,
						title: this.$t("loading")
					});
					let ret = await this.$u.api.useredit_p(res);
					if (ret.code == 1) {
						this.getUserInfo_common();
						this.setShow = false;
						this.$refs.uTips.show({
							title: this.$t(ret.msg)
						});
					} else {
						this.$refs.uTips.show({
							title: this.$t(ret.msg)
						});
					}
				}).catch(err => {

				})
			},
			// 邮箱
			async getMailCode() {
				let _this = this;
				if (_this.formData.mail == '') {
					_this.$refs.uTips.show({
						title: _this.$t('邮箱不能为空')
					});
				} else {
					if (_this.$refs.mailCodeKey.canGetCode) {
						if (_this.$u.test.email(_this.formData.mail)) {
							uni.showLoading({
								title: _this.$t('loading')
							})
							let info = {
								email: _this.formData.mail
							}
							let res = await _this.$u.api.send_mail_code_p(info);
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
						} else {
							_this.$refs.uTips.show({
								title: _this.$t('邮箱格式不正确')
							});
						}
					}
				}
			},
			async getMailCode_two() {
				let _this = this;
				if (_this.$refs.mailCodeKey_two.canGetCode) {
					uni.showLoading({
						title: _this.$t('loading')
					})
					let info = {
						email: _this.userInfo_common.mail
					}
					let res = await _this.$u.api.send_mail_code_p(info);
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
				}
			},
			async getPhoneCode() {
				if (this.formData.phone == '') {
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
							phone: this.formData.phone,
							type: 2
						}
						let res = await this.$u.api.sendcode_p(info);
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
		}
	}
</script>

<style lang="scss">
	.quSelectStyle {
		width: 70px !important;
		// height: 42px !important;
		border: 0 !important;
		border-right: 1px solid #5552A8 !important;
		border-radius: 0px;
		color: #000;
	}

	.phoneCodeBtn {
		min-width: 100px;
		padding: 0 10px;
		font-weight: bold;
		background: linear-gradient(to bottom, var(--btn-submit-bg-1) 35%, var(--btn-submit-bg-1));
		color: #FFFFFF;
		height: 42px;
		border-radius: 0 10px 10px 0;
	}

	.editInfoBtn {
		height: 52px;
		width: 100%;
	}

	.u-c-r {
		color: #f00;
	}

	.profile-panel {
		padding: 15px;
	}

	.profile-panel ::v-deep .uni-easyinput__content {
		height: 42px;
		border-radius: 0px;
		border: 0 !important
	}

	.profile-panel ::v-deep .content-clear-icon {
		margin-right: 10px;
	}

	.pu-foot {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pu-foot .btn {
		height: 40px;
		line-height: 40px;
		width: 100%;
	}

	.pu-cell-bar .icon-right {
		color: var(--link-color);
	}

	.active-btn {
		background: linear-gradient(to right, var(--btn-submit-bg-1) 35%, var(--btn-submit-bg-2)) !important;
		color: #ffffff !important;
	}

	.pop-user-name {
		background-color: #4e4cb8;
		border-radius: 8px;
		height: 42px;
		line-height: 42px;
		text-align: center;
		padding: 0 5px;
	}
</style>
