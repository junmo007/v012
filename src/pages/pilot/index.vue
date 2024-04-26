<template>
	<view class="content" :data-theme="themeMode">
		<u-navbar height="60" :background="navBackground" :custom-back="common_back" back-icon-color="#fff"
			title-color="#fff">
			<!-- <view class="w_100">
				<view class="m-c-w u-text-right u-m-r-24" @click="$go('/pages/pilot/pilotUser')">
					{{$t('Personal Center')}}
				</view>
			</view> -->
		</u-navbar>
		<template v-if="trueStatus">
			<web-view class="webViewClass" :src="url"></web-view>
		</template>
		<template v-else>
			<view class="bg"></view>
		</template>
		<!-- sidebar -->
		<pcBg></pcBg>
	</view>
</template>

<script>
	import pcBg from "@/components/pc-bg/bg.vue"
	export default {
		components: {
			pcBg
		},
		data() {
			return {
				navBackground: {
					backgroundImage: 'linear-gradient(to bottom, #0e1d26 , rgb(35, 59, 72))'
				},
				url: '',
				trueStatus: false,
			}
		},
		async onLoad(gid) {
			if (gid) {
				await this.getPrice(gid.gid);
			} else {
				this.$go('back');
			}
		},
		onShow() {
			// uni.$on('updateData', (data) => {
			// 	if(data){
			// 		this.url = '';
			// 		this.url = data;
			// 	}
			// })
		},
		methods: {
			async getPrice(gid) {
				uni.showLoading({
					mask: true,
					title: this.$t("loading")
				});
				let res1 = await this.$u.api.flyer_game_flyer_in_p({gid});
				if (res1) {
					uni.hideLoading();
					if (res1.code == 1) {
						let res = await this.$u.api.flyer_game_login_p({
							gid
						});
						if (res.url) {
							this.url = res.url;
							if (res.code == 1) {
								this.trueStatus = true;
							}
						} else {
							this.trueStatus = false;
						}
					} else {
						this.trueStatus = false;
						this.$u.toast(this.$t(res1.msg));
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.webViewClass {
		margin-top: 60px;
	}

	.bg {
		min-width: 100vw;
		min-height: 100vh;
		background-color: rgb(35, 59, 72);
	}
</style>
