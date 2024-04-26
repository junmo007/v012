<template>
	<view>
		<view class="user-profile-pc  w_80">
			<!-- 手机 -->
			<template v-if="(phoneBind == 1 || phoneBind == 3) && phoneCheck == 1">
				<view class="pr-cell-bar u-flex cur_pointer" @click="!userInfo_common.yphone?$go('/pages/ucenter/bindPhone'):''">
					<view class="u-flex">
						<view class="pu-tt m-font-16 u-m-r-20">
							{{!userInfo_common.yphone?$t('未绑定手机号码'):$t('手机号码')}}
						</view>
					</view>
					<text class="iconfont icon-duix u-m-auto text-green" v-if="userInfo_common.yphone"></text>
					<text class="iconfont icon-right m-font-b m-font-14" v-else></text>
				</view>
			</template>
			<!-- 邮箱 -->
			<template v-if="(phoneBind == 2 || phoneBind == 3) && phoneCheck == 1">
				<view class="pr-cell-bar u-flex cur_pointer" @click="!userInfo_common.mail2?$go('/pages/ucenter/bindMail'):''">
					<view class="u-flex">
						<view class="pu-tt m-font-16 u-m-r-20">{{$t('邮箱')}}</view>
						<image src="@/static/images/index-footer/Check.png"
							style="width: 16px;height: 16px;" v-if="userInfo_common.mail2"></image>
					</view>
					<view class="iconfont icon-right m-font-b m-font-14"></view>
				</view>
			</template>
			<!-- 登录密码 -->
			<view class="pr-cell-bar u-flex cur_pointer" @click="setloginPwd = true">
				<view class="flex_bd">
					<view class="pu-tt m-font-16 u-m-r-20">{{$t('登录密码')}}</view>
				</view>
				<text class="iconfont icon-duix u-m-auto text-green" v-if="userInfo_common.ispass == 1"></text>
				<text class="iconfont icon-right m-font-b m-font-14" v-else></text>
			</view>
			<!-- 提现密码 -->
			<view class="pr-cell-bar u-flex cur_pointer" @click="setWithdrawPwd = true">
				<view class="pu-tt m-font-16 u-m-r-20">{{!userInfo_common.withdrawal_psd?$t('提现密码'):$t('修改提现密码')}}
				</view>
				<text class="iconfont icon-duix u-m-auto text-green" v-if="userInfo_common.withdrawal_psd"></text>
				<text class="iconfont icon-right m-font-b m-font-14" v-else></text>
			</view>
			<!-- 实名验证 -->
			<view class=" pr-cell-bar u-flex cur_pointer" @click="showCertify">
				<view class="flex_bd u-flex">
					<view class="pu-tt m-font-16 u-m-r-20">{{$t('实名验证')}}</view>
					<image src="@/static/images/index-footer/Check.png"
						style="width: 16px;height: 16px;" v-if="certificates.force_sta == 3">
					</image>
				</view>
				<view v-if="certificates.force_sta == 2" class="text-yellow">{{$t('正在审核中')}}</view>
				<view class="iconfont icon-right m-font-b m-font-14" v-if="certificates.force_sta == 1"></view>
			</view>
		</view>
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
		<u-popup v-model="setloginPwd"  mode="center" :mask-close-able="false" border-radius="20">
			<view class="bs-popup pc_pop">
				<view class="bs-popup-hd">
					<view class="tt m-c-w">{{$t('登录密码')}}</view>
					<view class="iconfont icon-close" @click="setloginPwd = false"></view>
				</view>
				<view class="bs-popup-body">
					<view >
						<template v-if="userInfo_common.u_t_id == 0">
							<view class="u-m-b-20">
								<text>{{$t('旧密码')}}</text>
								<text style="color: #D12C2C;">*</text>
							</view>
							<view class="form-cell_row u-flex u-m-b-30 ">
								<uni-easyinput class="" type="password" v-model="formData.oLoginPwd" :styles="styles" />
							</view>
						</template>
						<view class="u-m-b-20">
							<text>{{$t('新登录密码')}}</text>
							<text style="color: #D12C2C;">*</text>
						</view>
						<view class="form-cell_row u-flex u-m-b-30 ">
							<uni-easyinput class="" type="password" v-model="formData.nLoginPwd_1" :styles="styles" />
						</view>
						<view class="u-m-b-20">
							<text>{{$t('确认新登录密码')}}</text>
							<text style="color: #D12C2C;">*</text>
						</view>
						<view class="form-cell_row u-flex u-m-b-30 ">
							<uni-easyinput class="" type="password" v-model="formData.nLoginPwd_2" :styles="styles" />
						</view>
						<view class="pu-foot">
							<view class="btn btn--submit m-font-b editInfoBtn" @click="editLoginBtn"
								:class="formData.oLoginPwd.length > 5 && formData.nLoginPwd_1.length > 5 && formData.nLoginPwd_2.length > 5?'active-btn':''">
								{{$t('public6')}}
							</view>
						</view>
					</view>
				</view>
			</view>
			
		</u-popup>
		<u-popup v-model="setWithdrawPwd"  mode="center" :mask-close-able="false" border-radius="20">
			<view class="bs-popup pc_pop">
				<view class="bs-popup-hd">
					<view class="tt m-c-w">{{$t('实名验证')}}</view>
					<view class="iconfont icon-close" @click="setWithdrawPwd = false"></view>
				</view>
				<view class="bs-popup-body">
					<view >
						<!-- 绑定提现密码 -->
						<template v-if="!userInfo_common.withdrawal_psd">
							<view >
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
											<uni-easyinput maxlength=6 type="number" :styles="styles"
												v-model="formData.withdrawal_psd" />
										</view>
									</view>
									<view class="u-m-b-20">
										<text>{{$t('确认新提现密码')}}</text>
										<text style="color: #D12C2C;">*</text>
									</view>
									<view class="form-cell_row u-m-b-30">
										<view class="flex_bd">
											<uni-easyinput maxlength=6 type="number" :styles="styles"
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
							<view >
								<view class="u-m-b-20">
									<text>{{$t('登录密码')}}</text>
									<text style="color: #D12C2C;">*</text>
								</view>
								<view class="form-cell_row u-m-b-30">
									<view class="flex_bd">
										<uni-easyinput maxlength=6 type="password" :styles="styles" v-model="formData.oLoginPwd"
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
			</view>
		</u-popup>
		<u-popup v-model="setCert"  mode="center" :mask-close-able="false" border-radius="20" z-index="888">
			<view class="bs-popup pc_pop">
				<view class="bs-popup-hd">
					<view class="tt m-c-w">{{$t('修改提现密码')}}</view>
					<view class="iconfont icon-close" @click="setCert = false"></view>
				</view>
				<view class="bs-popup-body">
					<view >
						<view class="u-m-b-20">
							<text>{{$t('请输入您的姓名')}}</text>
							<text style="color: #D12C2C;">*</text>
						</view>
						<view class="form-cell_row u-flex u-m-b-30">
							<uni-easyinput class="" type="text" v-model="formData.real_name" :styles="styles" />
						</view>
						<view class="u-m-b-20 u-m-t-30">
							<text>{{$t('证件类型')}}</text>
							<text style="color: #D12C2C;">*</text>
						</view>
						<view class="certifica-cell u-flex u-row-between u-p-l-20 u-p-r-20"
							@click="certificaType = true">
							<view>{{selectStatus}}</view>
							<view class="iconfont icon-sj-down u-font-xs u-m-l-10" style="color: #D1CCE9;"></view>
						</view>
						<view class="u-m-b-20 u-m-t-30">
							<text>{{$t('证件号')}}</text>
							<text style="color: #D12C2C;">*</text>
						</view>
						<view class="form-cell_row u-flex u-m-b-30">
							<uni-easyinput class="" type="text" v-model="formData.licenseNumber" :styles="styles" />
						</view>
						<view class="u-m-b-20 u-m-t-30">
							<text>{{$t('证件照')}}</text>
							<text style="color: #D12C2C;">*</text>
						</view>
						<u-upload upload-text="" :multiple="false" max-count="1" :header="uploadHeader" ref="front"
							:source-type="['album', 'camera']" del-bg-color="#644CBC" :action="action"
							@clear="uploadClear" :show-progress="false" @on-change="onChangeUpload"
							@on-progress="onChange" :custom-btn="true">
							<view slot="addBtn" class="sc_img_1">
								<u-image width="24px" height="24px" :src="pz_img_1">
									<u-loading slot="loading"></u-loading>
								</u-image>
								<view class="upload-text">{{$t('正面')}}</view>
							</view>
						</u-upload>
						<template v-if="tradingKey == 3 || tradingKey == 4">
							<view style="height: 20px;"></view>
							<u-upload upload-text="" :multiple="false" max-count="1" :header="uploadHeader"
								ref="reverseSide" :source-type="['album', 'camera']" del-bg-color="#644CBC"
								:action="action" :show-progress="false" @on-success="onChangeUpload_fm"
								@on-progress="onChange" :custom-btn="true">
								<view slot="addBtn" class="sc_img_1">
									<u-image width="24px" height="24px" :src="pz_img_1">
										<u-loading slot="loading"></u-loading>
									</u-image>
									<view class="upload-text">{{$t('反面')}}</view>
								</view>
							</u-upload>
						</template>
					
						<view class="pu-foot u-m-t-30">
							<view class="btn btn--submit m-font-b editInfoBtn" @click="bankUserRealName"
								:class="formData.real_name.length > 0?'active-btn':''">{{$t('public6')}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="certificaType" mode="center" borderRadius="32">
			<view class="bs-popup pc_pop">
				<view class="bs-popup-hd">
					<view class="tt">
						{{$t('请选择')}}
					</view>
					<view class="iconfont icon-close" @click="certificaType = false"></view>
				</view>
				<view class="bs-popup-bd">
					<view class="filter-cell" v-for="(item,index) in caterange" :key="`caterange${index}`"
						@click="catechange(item.value,item.text)">
						<view class="u-flex u-row-between">
							<view>{{item.text}}</view>
							<view class="iconfont icon-dui text-yellow" v-if="tradingKey == item.value"></view>
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
			pcSideBar
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
					real_name: '',
					
					licenseNumber: '',
					
					withdrawal_psd2:""
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
				phoneBindingMarks: '', //手机绑定说明
				phoneBind: null,
				phoneCheck: null, //手机 邮箱 验证开启
				withdrawalCheckType: null, //修改提现密码 验证方式
				withdrawalStatus: null, //是否开启
				nav_title_status: null,
				styles: {
					color: '#ffffff',
					borderColor: 'transparent',
					borderRadius: "0",
					boxShadow: 'var(--shadow-bg)'
				},
				page: 1,
				loginInfo: [],
				setUserPwdPop: false,
				certificates:{
					force_sta:1
				},
				setloginPwd:false,
				setWithdrawPwd:false,
				setCert:false,
				certificaType: false,
				selectStatus: this.$t('国内护照'),
				tradingKey: 1,
				caterange: [{
						value: 1,
						text: this.$t('国内护照')
					},
					{
						value: 2,
						text: this.$t('国际护照')
					},
					{
						value: 3,
						text: this.$t('驾驶证')
					},
					{
						value: 4,
						text: this.$t('居留许可证')
					}
				],
				uploadHeader: {},
				action: '',
				pz_img_1: "../../static/images/ucenter/add.png",
				pz_img_2: '',
				pz_img_3: '',
			}
		},
		mounted() {
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
			this.getUserInfo_common();
			this.getCertificate()
			
			var token = this.$helper.get('token');
			var token_key = this.$helper.get('token_key');
			this.uploadHeader.usertoken = token;
			this.uploadHeader.usertokenkey = token_key;
			this.action = process.env.VUE_APP_API_BASE_URL + '/upload/img';
		},
		onLoad(setpwd) {
			if (setpwd) {
				if (!this.$helper.get('userInfo').withdrawal_psd) {
					this.onInfo = 4;
					this.editInfoIndex = null;
				}
				this.setpwd = setpwd.setpwd;
			}
			// this.getMyLogin();
			this.getMarks();
		},
		methods: {
			showCertify(){
				this.setCert = true
				console.log('11111111')
			},
			setUserPwdChange() {
				this.setUserPwdPop = true;
			},
			//获取实名认证信息
			async getCertificate() {
				let res = await this.$u.api.user_certificate_p({
				});
				if (res && res.code == 1) {
					if(res.data){
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
			getMarks() {
				if (this.$t('phoneBindingMarks') != 'phoneBindingMarks') {
					this.phoneBindingMarks = this.$t('phoneBindingMarks');
				} else {
					this.phoneBindingMarks = '';
				}
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
			onChange() {
				uni.showLoading({
					title: this.$t('上传中请稍等')
				})
			},
			onChangeUpload(res, index, lists, name) {
				uni.hideLoading();
				this.pz_img_2 = lists[0].response.data.file;
			},
			onChangeUpload_fm(res, index, lists, name) {
				uni.hideLoading();
				this.pz_img_3 = lists[0].response.data.file;
			},
			catechange(e, i) {
				this.selectStatus = i;
				this.tradingKey = e;
				this.certificaType = false;
			},
			// 绑定姓名
			async bankUserRealName() {
				if (this.tradingKey == 3 || this.tradingKey == 4) {
					if (this.formData.real_name == '' || this.formData.licenseNumber == '' || this.pz_img_2 == '' ||
						this.pz_img_3 == '') {
						this.$refs.uTips.show({
							title: this.$t('请完善信息')
						});
						return
					}
				} else {
					if (this.formData.real_name == '' || this.formData.licenseNumber == '' || this.pz_img_2 == '') {
						this.$refs.uTips.show({
							title: this.$t('请完善信息')
						});
						return
					}
				}
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.useredit_p({
					autonym_name: this.formData.real_name,
					autonym_type: this.tradingKey,
					autonym_code: this.formData.licenseNumber,
					autonym_cover_is: this.pz_img_2,
					autonym_cover_the: this.pz_img_3
				});
				uni.hideLoading();
				if (res && res.code == 1) {
					this.formData.real_name = '';
					this.formData.licenseNumber = '';
					this.pz_img_2 = '';
					this.pz_img_3 = '';
					this.$refs.front.clear();
					if (this.tradingKey == 3 || this.tradingKey == 4) {
						this.$refs.reverseSide.clear();
					}
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
					await this.getUserInfo_common();
					setTimeout(() => {
						this.common_back();
					}, 3000);
				} else {
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
				}
			}
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
	.pr-cell-bar{
		height: 46px;
		border-bottom: 1px solid #1d1737;
		font-size: 14px;
		color: #D1CCE9;
		.icon-right{
			margin-left: auto;
		}
	}
	
	.w_80 {
		max-width: 80%;
	}
	.filter-cell {
		padding: 16px;
		border-bottom: 1px solid #4c4882;
	}
	.filter-cell:last-child {
		border-bottom: 0;
	}
	.certifica-cell {
		background-color: #1E1739;
		border: 1px solid #644CBC;
		border-radius: 15px;
		height: 54px;
	}
	
	.sc_img_1 {
		width: 360px;
		height: 200px;
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
		border-radius: 16px;
		background: rgba(49, 43, 79, 1);
		border: 1px dashed rgba(65, 61, 113, 1);
	}
	
	.upload-text {
		position: absolute;
		bottom: 20px;
	}
	.pu-foot .btn {
		height: 50px;
		line-height: 50px;
		width: 100%;
	}
	
	
	
</style>
