<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader isback :title="$t('user26')" @clickLeft="menuClick"></uniNavHeader>
			<!-- sidebar -->
			<view class="sidebar" :class="sideshow?'is-show':''">
				<uniSideHeader @menuClick="menuClick" nIndex="6"></uniSideHeader>
			</view>
			<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
			<!-- main -->
			<view class="bs-container">
				<view class="bs-content">
					<!-- table -->
					<view class="trade-main">
						<template v-if="showEmpty == 1">
							<view class="fun-list-card" v-for="(item,index) in waterrecord" :key="index">
								<view class="fundItemClass" @click="getTeamData(item)">
									<image
										:src="item.type == 1?'../../static/images/topboom/down.png':'../../static/images/topboom/up.png'"
										mode=""></image>
									<view class="flex_bd">
										<view class="title">{{$t(item.msg)}}</view>
										<view class="u-font-xs text-gray">{{item.add_time}}</view>
									</view>
									<view class="">
										<!-- {{item.type == 1?'+' + $t(item.price) : '-' + $t(item.price)}} -->
										{{item.type + $t(item.price)}}
									</view>
								</view>
							</view>

							<view class="load-more-box">
								<uni-load-more :status="status"></uni-load-more>
							</view>
						</template>
						<template v-if="showEmpty == 0">
							<listEmpty :isDefault="true" :listHighly='530'>
							</listEmpty>
						</template>
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
				href: '',
				sideshow: false,
				// 加载
				waterrecord: [],
				page: 1,
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				showEmpty: null
			}
		},
		async onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('有效交易明细')
			});
		},

		onLoad: function(options) {
			this.getwaterrecord();
		},
		onReachBottom() {
			if (this.status == 'noMore') {
				return;
			}
			this.getwaterrecord();
		},
		methods: {
			async getwaterrecord() {
				let ret = await this.$u.api.waterrecord_p({
					page: this.page,
					limit: 10,
				});

				if (ret) {
					if (ret.data.length > 0) {
						this.showEmpty = 1;
						for (let i = 0; i < ret.data.length; i++) {
							this.waterrecord.push(ret.data[i]);
						}
						// 加载状态结束
						if (ret.data.length < 10) {
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
			menuClick() {
				this.sideshow = !this.sideshow
			},
		}
	}
</script>
<style lang="scss" scoped>
	.trade-card {
		// background: url(../../static/images/trade/bg.png) no-repeat;
		background-image: var(--trading-card);
		background-size: cover;
		height: 110px;
		color: #FFFFFF;
		border-radius: 10px;
		padding: 30px;
		margin-bottom: 30px;

		.t-top {
			margin-bottom: 30px;

			.time {
				margin: 0 25px;
			}

			.icon-shuaxin {
				cursor: pointer;
			}
		}

		.trade-data {
			width: 100%;
		}

		.trade-data .col {
			width: 30%;

			.txt {
				margin-top: 10px;
				opacity: .8;
			}

			.val {
				line-height: 1;
				font-size: 30px;
			}
		}
	}

	@media (max-width:750px) {
		.trade-card {
			height: 110px;
			padding: 16px;
			border-radius: 5px;
			margin-bottom: 10px;

			.t-top {
				margin-bottom: 15px;

				.time {
					margin: 0 15px;
				}
			}

			.trade-data .col {
				width: 50%;

				.txt {
					margin-bottom: 8px;
					font-size: 12px;
				}

				.val {
					line-height: 1;
					font-size: 22px;
				}
			}
		}
	}

	.record-bg {
		background-size: 100%;
	}
</style>
