<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader isback :title="$t('详情')" @clickLeft="menuClick"></uniNavHeader>
			<!-- sidebar -->
			<view class="sidebar" :class="sideshow?'is-show':''">
				<uniSideHeader @menuClick="menuClick" nIndex="-1"></uniSideHeader>
			</view>
			<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
			<view class="bs-container">
				<view class="bs-content">
					<template v-if="fundData.price">
						<view class="panel u-p-30 u-bd-8">
							<view class="u-text-center u-m-t-50 u-m-b-50">
								<view>{{$t(fundData.msg)}}</view>
								<h2 class="u-m-t-14" :class="fundData.type == 1?'u-c-g':'u-c-r'">
									{{fundData.type == 1?'+' + $t(fundData.price) : '-' + $t(fundData.price)}}
								</h2>
							</view>
							<u-line color="#3F4249" margin="40px 0 20px 0"></u-line>
							<view class="u-flex u-row-between">
								<view class="u-c-9">{{$t('基金简称')}}</view>
								<view>{{$t(fundData.msg)}}</view>
							</view>
							<!-- <view class="u-flex u-row-between u-m-t-26">
							<view class="u-c-9">{{$t('利率')}}</view>
							<view>{{fundData.interest + '%'}}</view>
						</view> -->
							<view class="u-flex u-row-between u-m-t-26">
								<view class="u-c-9">{{$t('投资时间')}}</view>
								<view>{{fundData.add_time}}</view>
							</view>
							<view class="u-flex u-row-between u-m-t-26">
								<view class="u-c-9">{{$t('订单号')}}</view>
								<view>{{fundData.order_sn}}</view>
							</view>
						</view>
					</template>
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
				sideshow: false,
				fundData: {}
			}
		},
		async onLoad(e) {
			if (e.id) {
				this.getDetails(e.id);
			} else {
				this.$go('back')
			}
		},
		methods: {
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async getDetails(id) {
				uni.showLoading({
					title: this.$t('loading')
				})
				let res = await this.$u.api.savings_funds_record_details_p({
					id
				});
				if (res) {
					uni.hideLoading();
					this.fundData = res.data;
				}
			}
		}
	}
</script>

<style lang="scss">
	.u-c-g {
		color: #21cd61;
	}

	.u-c-r {
		color: #FF1900;
	}
</style>
