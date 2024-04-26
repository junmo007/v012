<template>
	<view>
		<view class="content" :data-theme="themeMode">
			<view class="container">
				<uniNavHeader :title="$t('登录日志')" :profile="false" isback></uniNavHeader>
				<view class="bs-wrapper">
					<view class="pu-body" v-if="onInfo == 6 && editInfoIndex == null">
						<view class="log-cell fan-card u-p-30 u-m-b-30" v-for="(item, index) in loginInfo" :key="index">
							<image class="log-icon" src="../../static/images/phone.png" mode=""></image>
							<view class="flex_bd">
								<view class="m-font-16 m-font-b u-font-40">{{getOS(item.device)}}</view>
								<view class="m-c-6 m-line-1 u-m-t-8 u-font-24 text-gray">{{item.device}}</view>
								<view class="m-c-6 u-m-t-8">{{item.login_time}}</view>
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
				onInfo: 6,
				editInfoIndex: null,
				loginInfo: [],
				page: 1
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('登录日志')
			});
		},
		onLoad(setpwd) {
			if (setpwd) {
				if (!this.$helper.get('userInfo').withdrawal_psd) {
					this.onInfo = 6;
					this.editInfoIndex = null;
				}
				this.setpwd = setpwd.setpwd;
			}
			this.getMyLogin();
		},
		methods: {
			async getMyLogin() {
				let res = await this.$u.api.my_login_p({
					page: this.page,
					limit: 10
				});
				if (res && res.code == 1) {
					this.loginInfo = res.data;
				}
			},
		}
	}
</script>

<style lang="scss">
	.log-cell {
		display: flex;
		align-items: center;

		.log-icon {
			display: block;
			width: 32px;
			height: 32px;
			margin-right: 15px;
		}
	}
</style>
