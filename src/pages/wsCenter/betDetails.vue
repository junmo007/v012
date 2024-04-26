<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader isback :title="$t('Betting details')" @clickLeft="menuClick"></uniNavHeader>
			<!-- sidebar -->
			<view class="sidebar" :class="sideshow?'is-show':''">
				<uniSideHeader @menuClick="menuClick" nIndex="6"></uniSideHeader>
			</view>
			<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
			<!-- main -->
			<view class="bs-container">
				<view class="u-m-20">
					<template v-if="showEmpty == 1">
						<view class="panel">
							<view class="panel-record-list">
								<uni-collapse accordion class="collapse-stripe">
									<uni-collapse-item title-border="none" :border="false"
										v-for="(item,index) in dataList" :key="`list${index}`">
										<template v-slot:title>
											<view class="grant-row zBetween">
												<view class="grant-left">
													<view class="g-title">{{item.zd_number}}</view>
													<view class="g-time">{{item.add_time}}</view>
												</view>
												<view class="grant-info" style="text-align: right;">
													<view class="g-id">{{item.tz_price}}</view>
													<text class="text-orange"
														v-if="item.status == 1">{{$t('已下单')}}</text>
													<text class="text-red" v-if="item.status == 2">{{$t('已撤单')}}</text>
													<text class="text-green"
														v-if="item.status == 3">{{$t('trade13')}}</text>
													<text class="text-green"
														v-if="item.status == 4">{{$t('trade12')}}</text>
												</view>
											</view>
										</template>
										<view class="bs-collapse-content">
											<view class="bs-info-cells">
												<view class="bs-info_flex flex-center">
													<view class="rlabel">{{$t('类型')}}</view>
													<view class="flex_bd">{{item.money_type == 1?$t('余额'):$t('基金')}}
													</view>
												</view>
												<view class="bs-info_flex flex-center">
													<view class="rlabel">{{$t('Investment content')}}</view>
													<view class="flex_bd">{{item.zd_fs}} : {{item.kd_fs}}</view>
												</view>
												<view class="bs-info_flex flex-center">
													<view class="rlabel">{{$t('investment amount')}}</view>
													<view class="flex_bd">{{item.tz_price}}</view>
												</view>
												<view class="bs-info_flex flex-center">
													<view class="rlabel">{{$t('order time')}}</view>
													<view class="flex_bd">{{item.add_time}}</view>
												</view>
											</view>
										</view>
									</uni-collapse-item>
									<uni-load-more :status="status"></uni-load-more>
								</uni-collapse>
							</view>
						</view>
					</template>
					<template v-if="showEmpty == 0">
						<listEmpty :isDefault="true" :listHighly='530'></listEmpty>
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
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			listEmpty,
			pcBg
		},
		data() {
			return {
				sideshow: false,
				dataList: [],
				page: 1,
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				uid: null,
				showEmpty: null,
			}
		},
		async onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('充值记录')
			});
		},
		async onLoad(options) {
			if (options.id) {
				this.uid = options.id;
				this.getDataList();
			} else {
				this.$go('back');
			}
		},
		onReachBottom() {
			if (this.status == 'noMore') {
				return;
			}
			this.getDataList();
		},
		methods: {
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async getDataList() {
				let ret = await this.$u.api.team_get_order_p({
					uid: this.uid,
					page: this.page,
					limit: 20,
				});
				if (ret) {
					if (ret.data.length > 0) {
						this.showEmpty = 1;
						for (let i = 0; i < ret.data.length; i++) {
							this.dataList.push(ret.data[i]);
						}
						// 加载状态结束
						if (ret.data.length < 20) {
							this.status = "noMore";
						} else {
							this.status = "loading";
							this.page++;
						}
					} else {
						this.showEmpty = 0;
						this.status = "noMore";
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	.diy-progress ::v-deep .uni-progress-inner-bar::after {
		content: '';
		width: 27px;
		height: 27px;
		display: block;
		position: absolute;
		right: -1px;
		top: 50%;
		margin-top: -14px;

		background-size: contain;
	}
</style>
