<template>
	<view>
		<view class="content">
			<view class="container">
				<uniNavHeader :title="$t('例子')" :profile="false" isback></uniNavHeader>
				<view class="bs-wrapper-15">
					<view class="u-flex examples u-col-top">
						<view class="line u-m-t-14"></view>
						<view class="text u-m-l-20">{{$t('examplesText1')}}</view>
					</view>
					<view class="u-flex examples u-col-top u-m-t-20">
						<view class="line u-m-t-14"></view>
						<view class="text u-m-l-20">{{$t('examplesText2')}}</view>
					</view>
					<view class="u-flex examples u-col-top u-m-t-20">
						<view class="line u-m-t-14"></view>
						<view class="text u-m-l-20">{{$t('examplesText3')}}</view>
					</view>
					<view class="u-flex examples u-col-top u-m-t-20">
						<view class="line u-m-t-14"></view>
						<view class="text u-m-l-20">{{$t('examplesText4')}}</view>
					</view>
					<view class="u-m-t-40 u-m-b-20 m-font-18">{{$t('如何拍照')}}</view>
					<u-image width="100%" height="440rpx" :src="$t('examplesImg1')" class="u-m-b-20" borderRadius="32">
						<u-loading slot="loading"></u-loading>
					</u-image>
					<u-image width="100%" height="440rpx" :src="$t('examplesImg2')" borderRadius="32">
						<u-loading slot="loading"></u-loading>
					</u-image>
					<view class="u-flex u-m-t-40 u-m-b-20">
						<view class="iconfont icon-cuocha text-red m-font-22 u-m-r-14"></view>
						<view class="m-font-18">{{$t('错误示范')}}</view>
					</view>
					<u-image width="100%" height="440rpx" :src="$t('examplesImg3')" class="u-m-b-20" borderRadius="32">
						<u-loading slot="loading"></u-loading>
					</u-image>
					<u-image width="100%" height="440rpx" :src="$t('examplesImg4')" borderRadius="32">
						<u-loading slot="loading"></u-loading>
					</u-image>
				</view>
			</view>
		</view>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
		</u-top-tips>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	export default {
		components: {
			uniNavHeader,
		},
		data() {
			return {}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('例子')
			});
		},
		methods: {}
	}
</script>

<style lang="scss">
	.examples .line {
		width: 15px;
		height: 2px;
		background: rgba(233, 174, 58, 1);
	}

	.examples .text {
		font-size: 16px;
	}
</style>
