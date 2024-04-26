<template>
	<view>
		<view class="content" :data-theme="themeMode">
			<view class="container">
				<uniNavHeader :title="$t('登录密码')" :profile="false" isback></uniNavHeader>
				<view class="bs-wrapper">
					<view class="user-profile-panel u-p-20">
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
					oLoginPwd: '',
					nLoginPwd_1: '',
					nLoginPwd_2: ''
				},
				styles: {
					color: '#ffffff',
					borderColor: 'transparent',
					borderRadius: "0",
					boxShadow: 'var(--shadow-bg)'
				}
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('登录密码')
			});
			this.getUserInfo_common();
		},
		methods: {
			editLoginBtn() {
				if (this.userInfo_common.u_t_id > 0) {
					if (this.formData.nLoginPwd_1 == '' || this.formData.nLoginPwd_2 == '') {
						this.$refs.uTips.show({
							title: this.$t('请输入完整信息')
						});
					} else {
						this.loginChange();
					}
				} else {
					if (this.formData.oLoginPwd == '' || this.formData.nLoginPwd_1 == '' || this.formData
						.nLoginPwd_2 == '') {
						this.$refs.uTips.show({
							title: this.$t('请输入完整信息')
						});
					} else {
						this.loginChange();
					}
				}
			},
			async loginChange(){
				if (this.formData.nLoginPwd_1 != this.formData.nLoginPwd_2) {
					this.$refs.uTips.show({
						title: this.$t('密码不一致')
					});
				} else {
					uni.showLoading({
						title: this.$t('loading')
					});
					let param1 = {
						old_password: this.formData.oLoginPwd,
						password: this.formData.nLoginPwd_1
					}
					let param2 = {
						password: this.formData.nLoginPwd_1
					}
					let res = await this.$u.api.useredit_p(this.userInfo_common.u_t_id > 0 ? param2 : param1);
					uni.hideLoading();
					if (res.code == 1) {
						this.formData.oLoginPwd = '';
						this.formData.nLoginPwd_1 = '';
						this.formData.nLoginPwd_2 = '';
						this.$refs.uTips.show({
							title: this.$t('设置成功请重新登录')
						});
						await this.getUserInfo_common();
						setTimeout(() => {
							this.logout_common();
						}, 3000);
					} else {
						this.$refs.uTips.show({
							title: this.$t(res.msg)
						});
					}
				}
			}
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
</style>
