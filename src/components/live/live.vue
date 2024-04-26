<template>
	<view class="live-popup">
		<scroll-view scroll-y="true" style="height: 330px;">
			<view class="webViewMask" @click="closeLivePop">
				<web-view :src="liveAddress" class="webViewLive" height="330px"></web-view>
				<view class="iconfont icon-close closeLiveIcon" @click.stop="closeLivePop"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				
			}
		},
		props: {
			liveAddress: {
				type: String,
				default: ""
			}
		},
		mounted() {
		},
		methods: {
			closeLivePop(){
				this.$emit('closeLivePop',false);
			}
		}
	}
</script>

<style lang="scss">
	.live-popup{
		position: fixed;
		left:0;
		right:0;
		bottom:0;
		top:0;
	}
	.webViewMask {
		position: fixed;
		top: 60px;
		bottom: 64px;
		min-height: 100vh;
		max-height: 100vh;
		overflow: hidden;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.8);
	}
	
	.webViewLive {
		position: absolute;
		top: 30%;
		left: 15px;
		right: 15px;
		height: 330px;
		border-radius: 15px;
		z-index: 1099!important;
	}
	
	.closeLiveIcon {
		position: absolute;
		top: 20%;
		left: 50%;
		color: var(--u-live-close);
		font-weight: bold;
		border: 2px solid var(--u-live-close);
		border-radius: 50%;
		padding: 3px;
	}
</style>