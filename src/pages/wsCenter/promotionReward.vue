<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader isback :title="$t('agent34')" @clickLeft="menuClick"></uniNavHeader>
			<view class="bs-content">
				<view class="ref-panel">
					<view class="panel-body">
						<view class="level-top u-m-b-20">
							<view class="tt">
								{{teampopularize.people}}
							</view>
							<view class="vip-span">
								<image src="../../static/images/old/crow.png" class="vip-ico" mode=""></image>
								<text>{{userInfo_common.level_name}}</text>
							</view>
						</view>
						<view class="level-hd u-e-7 u-m-b-60">{{$t('agent46')}}</view>
						<view class="diy-progress">
							<progress :percent="teampopularize.percentage" backgroundColor="#1A1D2480"
								activeColor="#FFBC05" active stroke-width="8" show-info />
						</view>
						<view class="level-ft u-e-7 flex-center ">
							<text class="text">{{$t('agent53')}}</text>
							<text class="text">{{teampopularize.people}}/{{teampopularize.task_volume}}</text>
						</view>
					</view>
				</view>
				<view class="vpanel">
					<view class="ws-level-m-list">
						<view class="ws-level-cell " v-for="(item, index) in teampopularize.not_finish"
							:key="`finish${index}`">
							<view class="m-lv-heading flex-center">
								<view class="vip-span">
									<image src="../../static/images/old/crow.png" class="vip-ico" mode=""></image>
									<text>{{item.stratum}}</text>
								</view>
								<view class="tt">{{$t('agent50')}}{{item.stratum_number}}</view>
							</view>
							<view class="lv-grid flex-center">
								<view class="info">{{$t('agent48')}} {{item.stratum_number}}
									{{$t('agent61')}}{{$t('agent49')}}{{item.stratum_bonus}}</view>
								<view @click="openTui()" class="button">
									<text>{{$t('agent52')}}</text> <text class="iconfont icon-right text-pick"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="vpanel" v-if="isfinish">
					<view class="ws-level-m_hd u-m-b-20">{{$t('agent51')}}</view>
					<view class="ws-level-m-list">
						<view class="ws-level-cell " v-for="(item, index) in teampopularize.finish"
							:key="`list${index}`">
							<view class="m-lv-heading flex-center">
								<view class="vip-span">
									<image src="../../static/images/old/crow.png" class="vip-ico" mode=""></image>
									<text>{{item.stratum}}</text>
								</view>
								<view class="tt">{{$t('agent50')}}{{item.stratum_number}}</view>
							</view>
							<view class="lv-grid flex-center">
								<view class="info">{{$t('agent48')}} {{item.stratum_number}}
									{{$t('agent61')}}{{$t('agent49')}}{{item.stratum_bonus}}</view>
								<view class="button">
									<text>{{$t('agent47')}}</text> <text class="iconfont icon-right text-pick"></text>
								</view>
							</view>
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
				isfinish: true,
				teampopularize: [],
				medalLeval: [],
				medal_1: '../../static/images/ws/font_1.png',
				medal_2: '../../static/images/ws/font_2.png',
				medal_3: '../../static/images/ws/font_3.png',
				medal_4: '../../static/images/ws/font_4.png',
				medal_5: '../../static/images/ws/font_5.png',
				medal_6: '../../static/images/ws/font_6.png'
			}
		},
		onLoad() {
			this.getTeampopularize();
		},
		onReachBottom() {},
		methods: {
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async getTeampopularize() {
				uni.showLoading({
					title: this.$t('loading')
				});
				let ret = await this.$u.api.teampopularize_p();
				if (ret) {
					uni.hideLoading();
					this.teampopularize = ret.data;
					if (this.teampopularize.finish.length == 0) {
						this.isfinish = false;
					}
				}
			},
			openTui() {
				uni.navigateTo({
					url: '/pages/wsCenter/QRcode'
				});
			}
		}
	}
</script>

<style lang="scss">
	.pages {
		height: 100vh;
		max-width: 100vw;
		box-sizing: border-box;
		// scrollbar-width: none; /* firefox */
		// -ms-overflow-style: none; /* IE 10+ */
		// overflow-x: hidden;
		// overflow-y: auto;
	}

	.topBG {
		background-size: 100% auto;
		background-repeat: no-repeat;
		// background-image: url(../../static/images/bg/rewardBG.png);
		background-image: var(--promotionTopBG);

		position: relative;
		height: 40%;
	}

	.diy-progress ::v-deep .uni-progress-inner-bar::after {
		content: '';
		width: 27px;
		height: 27px;
		display: block;
		position: absolute;
		top: 50%;
		right: -20px;
		margin-top: -30px;
		background-size: contain;
	}

	.ws-level-cell .level-nn {
		width: 38px;
		height: 37px;
		line-height: 36px;
		text-align: center;
		margin-right: 16px;
		color: #FFFFFF;
		background-size: 100% 100%;
	}

	.medalCount {
		border: 1px solid #efd1a5;
		display: inline-block;
		background-color: #ecc894;
		padding: 0 16px;
		border-radius: 16px;
		margin-top: 5px;
	}

	.diy-progress .uni-progress-info {
		display: none;
	}

	.diy-progress {
		max-width: 100vw;
		color: #fff;
	}
</style>
