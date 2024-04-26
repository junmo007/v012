<template>
	<view class="">
		<div id="loading-mask pc_box">
			<div class="loading-wrapper">
				<image src="@/static/images/index/logo.png" style="width: 72px;height: 44px;"/>
			</div>
		</div>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.loading-mask {
		position: fixed;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		min-height: 100vh;
		/* background: #292174; */
		user-select: none;
		z-index: 9999;
		overflow: hidden;
	}
	
	.loading-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		align-items: center;
	}
</style>
