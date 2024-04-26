<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader :title="this.$t('menu10')" @clickLeft="menuClick"></uniNavHeader>
			<!-- main -->
			<view class="bs-wrapper">
				<view class="tab-card">
					<view class="site-head u-flex">
						<view class="site-tit">
							<text>{{$t('menu10')}}</text>
						</view>
						<view class="site-back" @click="common_back">
							<text class="iconfont icon-close"></text>
						</view>
					</view>
					<view class="tab-row">
						<view @click="$go('/pages/notice/index')" class="tab-row-item active">{{this.$t('menu10')}}
						</view>
						<view @click="$go('/pages/msg/index')" class="tab-row-item ">{{$t('public3')}}</view>
					</view>
				</view>
				<template v-if="showEmpty == 1">
					<scroll-view class="ht-panel-scroll" scroll-y="true" lower-threshold="30"
						@scrolltolower="scrollLower">
						<view @click="goShow(item)" class="news-list" v-for="(item,index) in noticeList"
							:key="`list${index}`">
							<view class="news-list-head">
								<view class="news-list-title ">{{item.title}}</view>
								<view class="list-time" v-if="item.is_show_time == 1">{{item.add_time}}</view>
							</view>
							<view class="news-list-body ">
								<view class="list-desc " v-html="item.content"></view>
								<view class="news-foot-more">
									<text class="line"></text> <text class="text-blue">{{$t('查看详情')}}</text> <text
										class="line"></text>
								</view>
							</view>
						</view>
						<view class="load-more-box">
							<uni-load-more :status="status"></uni-load-more>
						</view>
					</scroll-view>
				</template>
				<template v-if="showEmpty == 0">
					<!--  fullLiftText="暂无公告" -->
					<listEmpty :isDefault="true" class="u-bd-8" :listHighly='480'>
					</listEmpty>
				</template>
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
				noticeList: [],
				noticeFirst: [],
				selecLang: "",
				page: 1,
				status: 'more',
				Width: 992,
				showEmpty: null
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('menu10')
			});
			uni.onWindowResize((res) => {
				this.Width = res.size.windowWidth
			});
			this.getnoticeList();
		},
		methods: {
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async getnoticeList() {
				uni.showLoading({
					mask: true,
					title: this.$t("loading")
				});
				let ret = await this.$u.api.noticelist_p({
					page: this.page,
					limit: 10,
					type: 'all'
				});
				if (ret) {
					if (ret.data.length > 0) {
						this.showEmpty = 1;
						this.noticeFirst = ret.data[0];
					} else {
						this.showEmpty = 0;
					}
					for (let i = 0; i < ret.data.length; i++) {
						this.noticeList.push(ret.data[i]);
					}
					// 加载状态结束
					if (ret.data.length < 10) {
						this.status = "noMore";
					} else {
						this.status = "loading";
						this.page++;
					}
				} else {
					this.status = "noMore";
				}
			},
			// 加载
			scrollLower() {
				if (this.status == 'noMore') {
					return;
				}
				this.getnoticeList();
			},
			// 跳转 判断宽屏，手机。跳转还是当前页
			goShow(index) {
				var _this = this
				uni.getSystemInfo({
					success: function(res) {
						_this.Width = res.windowWidth
					}
				});
				if (this.Width >= 992) {
					this.noticeFirst = index;
				} else {
					uni.navigateTo({
						url: '/pages/notice/noticeDetail?id=' + index.id
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	// 新闻列表
	.news-list {
		position: relative;
		cursor: pointer;
		background: #191A20;
		border-radius: 12px;
		margin-bottom: 12px;

		.news-list-body {
			padding: 15px;
		}

		.news-foot-bar {
			height: 32px;
			line-height: 32px;
			text-align: center;
			background: #24282E;
			color: #02CC50;
			font-size: 13px;
			border-radius: 4px;
			margin-top: 20px;
		}

		.news-list-head {
			border-bottom: 1px dotted #2f3033;
			padding: 15px;
			display: flex;
			align-items: center;
		}

		.news-list-title {
			flex: 1;
			font-size: 15px;
		}

		.list-desc {
			font-size: 15px;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			color: #7e828b;
			opacity: .7;
		}

		.list-time {
			color: #7e828b;
			font-size: 12px;
		}

		.news-pic {
			margin-right: 15px;
			font-size: 0;

			image {
				display: block;
				width: 160px;
				height: 110px;
				border-radius: 10px;
			}
		}
	}

	@media (max-width:750px) {
		.news-list .list-desc {
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}

		.news-list .news-pic image {
			display: block;
			width: 120px;
			height: 80px;
		}
	}

	.news-foot-more {
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 16px;
	}

	.news-foot-more .line {
		display: inline-block;
		width: 38px;
		height: 1px;
		background-color: #898d97;
	}

	.news-foot-more .text-blue {
		padding: 0 10px;
	}
</style>
