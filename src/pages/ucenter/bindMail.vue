<template>
	<view>
		<view class="content" :data-theme="themeMode">
			<view class="container">
				<uniNavHeader :title="$t('邮箱')" :profile="false" isback></uniNavHeader>
				<view class="bs-wrapper">
					<view class="user-profile-panel u-p-20">
						<view class="pu-body">
							<view class="u-m-b-20">
								<text>{{$t('邮箱')}}</text>
								<text style="color: #D12C2C;">*</text>
							</view>
							<view class="form-cell_row u-m-b-30 u-flex">
								<uni-easyinput type="text" v-model="formData.mail" :placeholder="$t('请输入邮箱')"
									:styles="styles" />
							</view>
							<view class="u-m-b-20">
								<text>{{$t('邮箱验证码')}}</text>
								<text style="color: #D12C2C;">*</text>
							</view>
							<view class="form-cell_row u-flex u-m-b-30 ">
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
							<view class="u-m-t-30">
								<view>{{$t("邮箱已被绑定")}}</view>
								<view @click="logout_common" class="logout-btn u-m-t-30">{{$t('logout')}}</view>
							</view>
							<view class="pu-foot">
								<view class="btn btn--submit m-font-b" @click="editMailBtn"
									:class="formData.mailCode.length > 3 && formData.mail.length > 3?'active-btn':''">
									{{$t('public6')}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
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
					mail: '',
					mailCode: '',
				},
				mailCodeText: '',
				styles: {
					color: '#ffffff',
					borderColor: 'transparent',
					borderRadius: "0",
					boxShadow: 'var(--shadow-bg)'
				},
			}
		},
		onLoad(setpwd) {
			uni.setNavigationBarTitle({
				title: this.$t('邮箱')
			});
			this.getUserInfo_common();
		},
		methods: {
			mailCodeChange(e) {
				this.mailCodeText = e;
			},
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
		height: 52px;
		line-height: 52px;
		width: 100%;
	}

	.form-cell_row {
		background-color: #1E1739;
		border: 1px solid #644CBC;
		border-radius: 15px;
		height: 54px;
	}
	
	.logout-btn {
		padding: 15px;
		font-size: 18px;
		text-align: center;
		border-radius: 16px;
		background-color: #644CBC;
	}
</style>
