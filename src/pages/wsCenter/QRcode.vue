<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader isback :title="$t('agent34')" @clickLeft="menuClick"></uniNavHeader>
			<!-- sidebar -->
			<view class="sidebar" :class="sideshow?'is-show':''">
				<uniSideHeader @menuClick="menuClick" nIndex="7"></uniSideHeader>
			</view>
			<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
			<!-- main -->
			<view class="bs-container">
				<view class="bs-content">
					<view class="qr-cells">
						<view class="qr-cell">
							<view class="jlabel">{{$t('agent13')}}</view>
							<view class="j-value" @click='common_copy(teampromotion.rec_code)'>
								<view class="flex_bd">{{teampromotion.rec_code}}</view>
								<text class="iconfont icon-copy_outline"></text>
							</view>
						</view>
						<view class="qr-cell">
							<view class="jlabel">{{$t('agent12')}}</view>
							<view class="j-value" @click='common_copy(teampromotion.rec_url)'>
								<view class="flex_bd">
									<view class="ellipsis">{{teampromotion.rec_url}}</view>
								</view>
								<text class="iconfont icon-copy_outline"></text>
							</view>
						</view>
					</view>
					<view class="mwx-cell-box">
						<view class="panel-body">
							<image :src="teampromotion.qrcode_url" mode="widthFix"></image>
							<view class="wx-link">{{$t('agent10')}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			pcBg
		},
		data() {
			return {
				href: '',
				sideshow: false,
				teampromotion: [],
			}
		},
		onLoad() {
			this.getteampromotion();
		},
		onReachBottom() {},
		methods: {
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async getteampromotion() {
				let ret = await this.$u.api.teampromotion_p();
				if (ret) {
					this.teampromotion = ret.data;
				}
			},
		}
	}
</script>
<style lang="scss">
	.extensionBG {}

	.m-font-30 {
		font-size: 15px;
	}

	.m-line-2 {
		overflow: hidden;
		margin-left: 10px;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
</style>
