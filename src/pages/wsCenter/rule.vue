<template>
	<view class="container" :class="sideshow?'is-mask':''">
		<uniNavHeader @clickLeft="menuClick"></uniNavHeader>
		<!-- sidebar -->
		<view class="sidebar" :class="sideshow?'is-show':''">
			<uniSideHeader @menuClick="menuClick" nIndex="7"></uniSideHeader>
		</view>
		<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
		<!-- main -->
		<view class="bs-container">
			<view class="bs-content">
				<view class="panel">
					<view class="panel-body">
						<view class="art-body">
							<p>代理身份：<br>
							平台会员皆为代理</p>
							
							<p>结算时间：<br>
							代理奖金将于每日 12:00 pm 前自动计算发放 <br>
							奖金计算方式（下级代理产生盈利即可领取）：<br>
							1. 第一级代理盈利的8%<br>
							2. 第二级代理盈利的5%<br>
							3. 第三级代理盈利的3%</p>
							
							<p>举例说明：<br>
							本日1级代理盈利累积：10000 ₫,可领取奖励800 ₫ <br>
							本日2级代理盈利累积：10000 ₫,可领取奖励500 ₫ <br>
							本日3级代理盈利累积：10000 ₫,可领取奖励300 ₫ <br>
							您本日可领取奖⾦为： 800+500+300=1600 ₫</p>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	export default {
		components: {
			uniNavHeader,
			uniSideHeader
		},
		data() {
			return {
				href: '',
				sideshow: false,
				// tab
			}
		},
		onReachBottom() {},
		methods: {
			menuClick() {
				this.sideshow = !this.sideshow
			},
			// tab
			tabchange(i) {
				this.cur = i
			}
		}
	}
</script>

<style lang="scss">
	
</style>
