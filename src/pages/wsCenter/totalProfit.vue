<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader isback :title="$t('agent26')" @clickLeft="menuClick"></uniNavHeader>
			<!-- sidebar -->
			<view class="sidebar" :class="sideshow?'is-show':''">
				<uniSideHeader @menuClick="menuClick" nIndex="7"></uniSideHeader>
			</view>
			<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
			<!-- main -->
			<view class="bs-container" v-if="false">
				<view class="bs-content">
					<view class="ws-top ">
						<view class="panel-body">
							<view class="ws-user flex-center">
								<image :src="userDefaultHeader" mode=""></image><text>{{userInfo.username}}</text>
							</view>
							<view class="ws-info-cell">
								<view class="val">{{$t('agent26')}}</view>
								<view class="val">{{teamstat.profit_count}}</view>
							</view>
						</view>
					</view>
					<view class="ws-grid">
						<view @click="goShow(1)" class="j-cell">
							<view class="j-number">
								<image src="../../static/images/old/cup1.png" mode=""></image>
							</view>
							<view class="flex_bd">
								<view class="lv-txt">{{$t('level_1')}}</view>
							</view>
							<view class="lv-value">{{teamstat.profit_count1}}</view>
						</view>
						<view @click="goShow(2)" class="j-cell">
							<view class="j-number">
								<image src="../../static/images/old/cup2.png" mode=""></image>
							</view>
							<view class="flex_bd">
								<view class="lv-txt">{{$t('level_2')}}</view>
							</view>
							<view class="lv-value">{{teamstat.profit_count2}}</view>
						</view>
						<view @click="goShow(3)" class="j-cell">
							<view class="j-number">
								<image src="../../static/images/old/cup3.png" mode=""></image>
							</view>
							<view class="flex_bd">
								<view class="lv-txt">{{$t('level_3')}}</view>
							</view>
							<view class="lv-value">{{teamstat.profit_count3}}</view>
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
				teamstat: [],
				userInfo: []
			}
		},
		onShow() {
			this.userInfo = this.$helper.get('userInfo');
		},
		onLoad() {
			this.getTeamstat();
		},
		onReachBottom() {},
		methods: {
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async getTeamstat() {
				let ret = await this.$u.api.teamstatprofit_p();
				if (ret) {
					this.teamstat = ret.data;
				}
			},
			goShow(index) {
				uni.navigateTo({
					url: '/pages/wsCenter/zhudanprofit?level=' + index
				});
			}
		}
	}
</script>

<style lang="scss">
	.j-cell::after {
		border-bottom: 0;
	}
</style>
