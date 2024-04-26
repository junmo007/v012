<template>
	<view class="container" :class="sideshow?'is-mask':''">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader isback :title="$t('menu1')" @clickLeft="menuClick"></uniNavHeader>
			<!-- sidebar -->
			<view class="sidebar" :class="sideshow?'is-show':''">
				<uniSideHeader @menuClick="menuClick" nIndex="0"></uniSideHeader>
			</view>
			<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
			<!-- main -->
			<view class="mark-m-row">
				<template v-if="matchList.length > 0">
					<view class="u-p-30">
						<view class="market-m-list" v-for="(res, index) in matchList" :key="`list7${index}`"
							@click="goList(res.sc_id)">
							<view class="vs-heading u-m-b-20">
								<text>{{$t(res.ls_name)}}</text>
							</view>
							<view class="market-game-card">
								<view class="col">
									<image :src="marketHeaderZD" mode="" class="marketHeader"></image>
									<view class="team-tit">{{$t(res.zd_name)}}</view>
								</view>
								<view class="vs-middle">
									<view class="vs-score">
										<text class="vs-lg">vs</text>
									</view>
									<view class="tt-time">{{res.sc_time}}</view>
								</view>
								<view class="col">
									<image :src="marketHeaderKD" mode="" class="marketHeader"></image>
									<view class="team-tit">{{$t(res.kd_name)}}</view>
								</view>
							</view>
						</view>
						<view class="load-more-box">
							<uni-load-more :status="status"></uni-load-more>
						</view>
					</view>
				</template>
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
				// list
				matchList: [],
				ls_id: 0,
				page: 1,
				// tab
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14'),
				}

			}
		},
		onLoad: function(options) {
			uni.setNavigationBarTitle({
				title: this.$t('menu1')
			});
			if (options.id) {
				this.ls_id = options.id;
				this.getmatch('add');
			} else {
				this.$go('back');
			}
		},
		onReachBottom() {
			if (this.status == 'noMore') {
				return;
			}
			this.getmatch();
		},
		methods: {
			menuClick() {
				this.sideshow = !this.sideshow
			},
			goList(id) {
				if (this.isGoogle != 1) {
					this.$go(`/pages/market/marketContent?id=${id}`);
				}
			},
			async getmatch(add) {
				uni.showLoading({
					title: this.$t('loading')
				});
				let ret = await this.$u.api.matchlist_p({
					ls_id: this.ls_id,
					page: this.page,
					limit: 10,
				});
				if (ret) {
					uni.hideLoading();
					if (ret.data.list.length > 0) {
						if (add) {
							this.matchList = ret.data.list;
						} else {
							this.matchList = this.matchList.concat(ret.data.list);
						}
						// 加载状态结束
						if (ret.data.list.length == 10) {
							this.status = "loading";
							this.page++;
						} else {
							this.status = "noMore";
						}
					} else {
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
		right: -14px;
		top: 50%;
		margin-top: -14px;

		background-size: contain;
	}

	.mark-user-card {
		background-image: var(--userInfo-card);
		background-size: cover;
		color: #FFFFFF;
	}

	.vs-top-card {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-repeat: no-repeat;
		background-image: var(--ucenter-note-top-bg);
		background-size: cover;
		height: 124px;
		color: #FFFFFF;
		border-radius: 12px 12px 0 0;
		text-align: center;
	}

	// bg 9.7
	.vs-game-box {
		// background: url(../../static/images/bg/2_objects@2x.png) center no-repeat;
		background-image: var(--match-card);
		background-size: cover;
	}
</style>
