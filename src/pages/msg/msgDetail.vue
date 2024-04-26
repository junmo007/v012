<template>
	<view :class="isOpen?'pc-open':'pc-close'">
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main u-flex w_80">
				<pcSideBar :pageIndex="15" @menu-event="parentMenu"></pcSideBar>
				<view class="pc-wrapper flex_bd">
					<view class="top-back u-m-b-32" >
						<button class="btn btn--back" @click="common_back()">
							<text class="iconfont icon-left"></text>
							<text class="u-font-28">{{$t('返回')}}</text>
						</button>
					</view>
					<view >
						<view class="fan-card" v-if="msg.content">
							<view class="art-content">
								<view class="art-heading">
									<view class="art-title">{{msg.title}}</view>
									<view class="art-meta ">
										<view class="text-light" >{{msg.add_time}}</view>
									</view>
								</view>
								<view class="art-body" v-html="msg.content"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content" :data-theme="themeMode">
				<view class="container" :class="sideshow?'is-mask':''">
					<uniNavHeader isback @clickLeft="menuClick" :title="$t('消息中心')"></uniNavHeader>
					<!-- main -->
					<view class="bs-wrapper">
							<view class="fan-card" v-if="msg.content">
								<view class="art-content">
									<view class="art-heading">
										<view class="text-yellow u-m-b-20">{{msg.title}}</view>
										<view class="art-meta flex-center">
											<view class="time" style="margin: 0;">{{msg.add_time}}</view>
										</view>
									</view>
									<view class="art-body" v-html="msg.content"></view>
								</view>
							</view>
					</view>
				</view>
			</view>
		</template>
		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	import pcSideTrade from "@/components/pc-side-trade/trade.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			pcNavHeader,
			pcBg,
			pcSideBar,
			pcSideTrade
		},
		data() {
			return {
				href: '',
				sideshow: false,
				msg_id: '',
				msg: {},
			}
		},
		async onLoad(options) {
			if (options.id) {
				this.msg_id = options.id;
				this.getnotice();
			} else {
				this.$go('back');
			}
		},
		async onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('消息中心')
			});
		},
		methods: {
			parentMenu(){
				this.menuToggle()
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async getnotice() {
				uni.showLoading({
					title: this.$t('loading')
				});
				let ret = await this.$u.api.msgdetail_p({
					msg_id: this.msg_id
				});
				if (ret) {
					uni.hideLoading();
					this.msg = ret.data;
				}
			},
		}
	}
</script>

<style lang="scss">
	.art-content {
		position: relative;
		padding: 20px;
		cursor: pointer;
	}
</style>
