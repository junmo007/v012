<template>
	<view class="left-main">
		<view class="left-logo">
			<image src="../../../static/images/pc/logo3.png" mode="widthFix"></image>
		</view>
		<view class="left-time">
			<view class="left-label u-m-b-30">
				{{$t('欧洲锦标赛前')}}
			</view>
			<u-count-down  :timestamp="5906880" show-days  font-size="40" separator-color="#ffffff" color="#ffffff" bg-color="#1E1739" border-color="#644CBC" height="60px" ></u-count-down>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {}
		},
		methods: {}
	}
</script>

<style lang="scss">
	.left-time{
		position: absolute;
		bottom: 30px;
		text-align: center;
		width: 100%;
		left:0;
		.left-label{
			font-size: 16px;
		}
	}
	
	.left-main ::v-deep .u-countdown-item{
		padding: 10px;
		height: 60px;
		width: 60px;
		border-radius: 16px;
		flex-direction: column;
		font-size: 18px;
		border: 1px solid #644CBC;
	}
	.left-logo{
		font-size: 0;
		image{
			width: 172px;
		}
	}
</style>
