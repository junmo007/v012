<template>
	<view>
		<view class="content" :data-theme="themeMode">
			<view class="container">
				<uniNavHeader :title="$t('手机号码')" :profile="false" isback></uniNavHeader>
				<view class="bs-wrapper">
					<view class="user-profile-panel u-p-30">
						<view class="u-m-b-16">
							<text>{{$t('手机号码')}}</text>
							<text style="color: #D12C2C;">*</text>
						</view>
						<view class="form-cell_row u-flex">
							<view class="select-h u-flex">
								<image :src="selecQuIcon" style="width: 20px;height: 14px;margin-left: 10px;">
								</image>
								<quSelect class="quSelectStyle" ref="easySelect" size="mini" :value="'+'+selecQu"
									@selectOne="selectQhao" :options="quOptions">
								</quSelect>
							</view>
							<view class="flex_bd">
								<uni-easyinput type="number" v-model="formData.phone" :styles="styles" />
							</view>
						</view>
						<view class="u-m-b-20 u-m-t-30">
							<text>{{$t('验证码')}}</text>
							<text style="color: #D12C2C;">*</text>
						</view>
						<view class="form-cell_row u-flex">
							<view class="flex_bd">
								<uni-easyinput type="number" :styles="styles" v-model="formData.code" />
							</view>
							<button @tap="getPhoneCode()" class="phoneCodeBtn btn ">
								{{$t(phoneCodeText)}}
							</button>
							<u-verification-code seconds="60" ref="registCode" @change="phoneCodeChange"
								:start-text="$t('获取验证码')" :end-text="$t('rep_sned')" change-text="XS">
							</u-verification-code>
						</view>
						<view class="u-m-t-30">
							<view>{{$t("手机号码已被绑定")}}</view>
							<view @click="logout_common" class="logout-btn u-m-t-30">{{$t('logout')}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="pu-foot ">
				<view class="btn btn--submit active-btn" @click="editPhoneBtn">
					{{$t('public6')}}
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
					qh: '',
					phone: '',
					code: '',
				},
				quOptions: [],
				selecQu: '',
				selecQuIcon: '',
				phoneCodeText: '',
				styles: {
					color: '#ffffff',
					borderColor: 'transparent',
					borderRadius: "0",
					boxShadow: 'var(--shadow-bg)'
				}
			}
		},
		onLoad() {
			let idc = this.$helper.get('idc');
			this.quOptions = idc;
			this.selecQu = this.userInfo_common.qh ? this.userInfo_common.qh : this.$helper.get('idc_default');
			this.selecQuIcon = this.$helper.get('idc_default_flag');
			uni.setNavigationBarTitle({
				title: this.$t('手机号码')
			});
			this.getUserInfo_common();
		},
		methods: {
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
			async editPhoneBtn() {
				if (this.formData.phone == '') {
					this.$refs.uTips.show({
						title: this.$t('手机号不能为空')
					});
				} else {
					uni.showLoading({
						title: this.$t('loading')
					})
					let info = {
						qh: this.selecQu,
						phone: this.formData.phone,
						code: this.formData.code
					};
					let res = await this.$u.api.useredit_p(info);
					uni.hideLoading();
					if (res.code == 1) {
						await this.getUserInfo_common();
						this.$refs.registCode.start();
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
			phoneCodeChange(e) {
				this.phoneCodeText = e;
			},
			selectQhao(options) {
				this.selecQu = options.label;
				this.$helper.set('idc_default_flag', options.flag);
				this.selecQuIcon = options.flag;
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

	.profile-panel {
		padding: 15px;
	}

	.user-profile-panel ::v-deep .easy-select {
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
