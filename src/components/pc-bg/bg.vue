<template>
	<view>
		<!-- <view class="pc-bg">
			<image :src="$t('web_pc_bg')" mode="aspectFill"></image>
		</view> -->
	</view>
</template>

<script>
</script>

<style lang="scss">
	.pc-bg {
		background: var(--body-bg);
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -1;
	}
	
	.pc-bg image {
		width: 100vw;
		height: 100vh;
	}
</style>