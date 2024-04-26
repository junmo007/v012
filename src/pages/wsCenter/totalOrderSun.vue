<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader @clickLeft="menuClick"></uniNavHeader>
			<!-- sidebar -->
			<view class="site-head u-flex u-m-b-30">
				<view class="site-tit">
					<text>{{$t('投注人数')}}</text>
					<view class="line"></view>
				</view>
				<view class="site-back" @click="common_back">
					<text class="iconfont icon-close"></text>
				</view>
			</view>
			<!-- main -->
			<view class="bs-panel" v-if="false">
				<view class="ws-panel">
					<view class="u-m-l-8">
						<view>{{$t('投注人数')}}</view>
						<view class="u-m-t-10 m-font-b m-font-16">{{teamstat.order_count}}</view>
					</view>
					<view class="u-m-t-10">
						<u-row gutter="16">
							<u-col span="4">
								<view class="team-user-car-level">
									<view class="lv-txt">{{$t('level_1')}}</view>
									<view class="m-c-w m-font-16">{{teamstat.order_count1}}</view>
								</view>
							</u-col>
							<u-col span="4">
								<view class="team-user-car-level">
									<view class="lv-txt">{{$t('level_2')}}</view>
									<view class="m-c-w m-font-16">{{teamstat.order_count2}}</view>
								</view>
							</u-col>
							<u-col span="4">
								<view class="team-user-car-level">
									<view class="lv-txt">{{$t('level_3')}}</view>
									<view class="m-c-w m-font-16">{{teamstat.order_count3}}</view>
								</view>
							</u-col>
						</u-row>
					</view>
				</view>
			</view>
		</view>
		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	export default {
		components: {
			uniNavHeader,
			pcBg
		},
		data() {
			return {
				href: '',
				sideshow: false,
				teamstat: {},
			}
		},
		onLoad() {
			this.getTeamstat();
		},
		methods: {
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async getTeamstat() {
				uni.showLoading({
					title: this.$t('loading')
				});
				let ret = await this.$u.api.team_ordernum_p({
					isday: 1
				});
				if (ret) {
					uni.hideLoading();
					this.teamstat = ret.data;
				}
			}
		}
	}
</script>

<style lang="scss">
	.bs-panel {
		height: calc(100vh - 95px);
	}
</style>
