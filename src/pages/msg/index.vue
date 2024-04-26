<template>
	<view :class="isOpen?'pc-open':'pc-close'">
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main u-flex ">
				<pcSideBar :pageIndex="15" @menu-event="parentMenu"></pcSideBar>
				<view class="pc-wrapper flex_bd">
					<view class="pc-wrapper-head u-flex u-m-b-20">
						<text class="iconfont icon-more-info u-font-36 u-m-r-16"></text>
						<text class="u-font-36">{{$t('public3')}}</text>
					</view>
					<view class="top-link-tabs flex-center u-m-b-30 ">
						<view class="n-tab_item cur_pointer" :class="tabsKey == 1?'active':''"
							@click="changeTabs(1)">
								<text class="item-text">{{$t('系统通知')}}</text>
							</view>
						<view class="n-tab_item cur_pointer" :class="tabsKey == 2?'active':''"
							@click="changeTabs(2)">
								<text class="item-text">{{$t('个人通知')}}</text>
							</view>
					</view>
					<template v-if="tabsKey == 1">
						<template v-if="empty == 1">
							<scroll-view style="height: calc(100vh - 230px);" scroll-y="true"
								@scrolltolower="scrolltolowerChnage">
								<view class="news-list" v-for="(item,index) in noticeList" :key="`list${index}`">
									<view class="u-flex u-col-top">
										<view class="msg-box">
											<view class="iconfont icon-gonggaozhongxin"></view>
										</view>
										<view class="flex_bd u-m-l-20">
											<view class="news-list-head">
												<view class="news-list-title ">{{$t(item.title)}}</view>
											</view>
											<view class="news-list-attr u-flex u-row-between">
												<view class="list-cate">
													<text class="text">{{$t('反波胆项目组')}}</text>
												</view>
												<view class="list-time u-m-l-14" v-if="item.is_show_time == 1">
													{{item.add_time}}
												</view>
											</view>
											<view class="list-desc u-m-b-30 u-m-t-20 u-m-r-30" v-html="$t(item.content)">
											</view>
											<view class="btn btn--submit" @click="goSystemMsg(item)">
												<text class="u-font-28">{{$t('点击查看详情')}}</text>
											</view>
										</view>
										<u-image :src="item.img" mode="aspectFill" width="200px" height="120px"
											borderRadius="6px">
											<u-loading slot="loading"></u-loading>
										</u-image>
									</view>
									
								</view>
								<view class="load-more-box">
									<uni-load-more :status="status_one" :contentText="contentText_one"></uni-load-more>
								</view>
							</scroll-view>
						</template>
						<template v-if="empty == 0">
							<!--  fullLiftText="暂无系统通知" -->
							<listEmpty :isDefault="true" class="u-bd-8" :listHighly='400'>
							</listEmpty>
						</template>
					</template>
					<!-- 个人通知-消息 -->
					<template v-if="tabsKey == 2">
						<template v-if="showEmpty == 1">
							<scroll-view style="height: calc(100vh - 230px);" scroll-y="true"
								@scrolltolower="scrolltolowerChnage">
								<view @click="goShow(item)" class="news-list" v-for="(item,index) in msgList"
									:key="`list${index}`">
									<view class="news-list-head u-m-b-20">
										<view class="person-title m-font-16">{{$t(item.title)}}</view>
										<view class="list-time u-m-auto">{{item.add_time}}</view>
									</view>
									<view class="news-list-body ">
										<view class="list-desc u-m-b-30" v-html="$t(item.content)"></view>
									</view>
									<view class="btn btn--submit" >
										<text class="u-font-28">{{$t('点击查看详情')}}</text>
									</view>
								</view>
								<view class="load-more-box">
									<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
								</view>
							</scroll-view>
						</template>
						<template v-if="showEmpty == 0">
							<!--  fullLiftText="暂无个人通知" -->
							<listEmpty :isDefault="true" class="u-bd-8" :listHighly='400'>
							</listEmpty>
						</template>
					</template>
				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content" :data-theme="themeMode">
				<view class="container">
					<uniNavHeader :title="$t('public3')" isback></uniNavHeader>
					<view class="bs-content">
						<view class="top-link-tabs flex-center ">
							<view class="n-tab_item" :class="tabsKey == 1?'active':''" @click="changeTabs(1)">
								<text class="item-text">{{$t('系统通知')}}</text>
							</view>
							<view class="n-tab_item" :class="tabsKey == 2?'active':''" @click="changeTabs(2)">
								<text class="item-text">{{$t('个人通知')}}</text>
								<text class="tab-badge" v-if="unreadCount>0">{{unreadCount}}</text>
							</view>
						</view>
						<template v-if="tabsKey == 1">
							<template v-if="empty == 1">
								<view class="news-list" v-for="(item,index) in noticeList" :key="`list${index}`">
									<view class="list-time u-m-b-10">
										{{item.add_time}}
									</view>
									<view class="news-list-title u-m-b-20">{{$t(item.title)}}</view>
									<u-image :src="item.img" mode="aspectFill" width="100%" height="340rpx"
										loading-icon="@/static/images/dw/loading.png"
										error-icon="@/static/images/dw/loading.png" borderRadius="var(--card-radius)">
										<u-loading slot="loading"></u-loading>
										<u-image src="@/static/images/dw/loading.png" slot="error" mode="aspectFill"
											width="100%" height="340rpx" borderRadius="var(--card-radius)">
										</u-image>
									</u-image>
									<view @click="goSystemMsg(item)"
										class="text-yellow u-m-t-20">
										{{$t('点击查看详情')}}
									</view>
								</view>
								<view class="load-more-box">
									<uni-load-more :status="status_one" :contentText="contentText_one"></uni-load-more>
								</view>
							</template>
							<template v-if="empty == 0">
								<!--  fullLiftText="暂无系统通知" -->
								<listEmpty :isDefault="true" class="u-bd-8" :listHighly='400'>
								</listEmpty>
							</template>
						</template>
						<!-- 个人通知-消息 -->
						<template v-if="tabsKey == 2">
							<template v-if="showEmpty == 1">
								<view @click="goShow(item)" class="news-list" v-for="(item,index) in msgList"
									:key="`list${index}`">
									<view class="news-list-head u-m-b-20">
										<view class="m-c-w">{{$t(item.title)}}</view>
										<view class="list-time u-m-auto">{{item.add_time}}</view>
									</view>
									<!-- <view class="news-list-body">
										<view class="list-desc u-m-b-30" v-html="$t(item.content)"></view>
									</view> -->
									<view class="text-yellow">{{$t('点击查看详情')}}</view>
								</view>
								<view class="load-more-box">
									<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
								</view>
							</template>
							<template v-if="showEmpty == 0">
								<!--  fullLiftText="暂无个人通知" -->
								<listEmpty :isDefault="true" class="u-bd-8" :listHighly='400'>
								</listEmpty>
							</template>
						</template>
					</view>
				</view>
			</view>
		</template>
		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			listEmpty,
			pcNavHeader,
			pcBg,
			pcSideBar
		},
		data() {
			return {
				unreadCount: 0,
				href: '',
				sideshow: false,
				// 加载
				msgList: [],
				page: 1,
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				contentText_one: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				showEmpty: null,
				tabsKey: 1,
				noticeList: [],
				status_one: 'more',
				page_one: 1,
				empty: null,
				tabs:[{
						name: this.$t("系统通知") 
					},
					{
						name: this.$t("个人通知")
					},
				]
			}
		},
		onLoad() {
			this.getnoticeList('add');
		},
		async onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('消息中心')
			});
		},
		onReachBottom() {
			if (this.tabsKey == 1) {
				if (this.status_one == 'noMore') {
					return;
				}
				this.getnoticeList();
			} else {
				if (this.status == 'noMore') {
					return;
				}
				this.getmsgList();
			}
		},
		mounted() {
			this.getmsgunread();
		},
		methods: {
			parentMenu() {
				this.menuToggle()
			},
			scrolltolowerChnage() {
				if (this.tabsKey == 1) {
					if (this.status_one == 'noMore') {
						return;
					}
					this.getnoticeList();
				} else {
					if (this.status == 'noMore') {
						return;
					}
					this.getmsgList();
				}
			},
			async getmsgunread() {
				let ret = await this.$u.api.msgunread_p();
				if (ret) {
					this.unreadCount = ret.data.count;
				}
			},
			changeTabs(e) {
				this.tabsKey = e;
				this.empty = null;
				this.showEmpty = null;
				if (e == 1) {
					this.page_one = 1;
					this.noticeList = [];
					this.getnoticeList('add');
				} else {
					this.page = 1;
					this.msgList = [];
					this.getmsgList('add');
				}
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async getmsgList(add) {
				uni.showLoading({
					mask: true,
					title: this.$t("loading")
				});
				let ret = await this.$u.api.msglist_p({
					page: this.page,
					limit: 10
				});
				if (ret) {
					uni.hideLoading();
					if (add) {
						this.msgList = ret.data;
					} else {
						this.msgList = this.msgList.concat(ret.data);
					}
					if (ret.data.length == 10) {
						this.status = "loading";
						this.page++;
					} else {
						this.status = "noMore";
					}
					if (this.msgList.length > 0) {
						this.showEmpty = 1;
					} else {
						this.showEmpty = 0;
					}
				}
			},
			async getnoticeList(add) {
				uni.showLoading({
					mask: true,
					title: this.$t("loading")
				});

				let ret = await this.$u.api.message_system_msg_p({
					page: this.page_one,
					limit: 10
					// type: 'all'
				});
				if (ret) {
					uni.hideLoading();
					if (add) {
						this.noticeList = ret.data;
					} else {
						this.noticeList = this.noticeList.concat(ret.data);
					}
					if (ret.data.length == 10) {
						this.status_one = "loading";
						this.page_one++;
					} else {
						this.status_one = "noMore";
					}
					if (this.noticeList.length > 0) {
						this.empty = 1;
					} else {
						this.empty = 0;
					}
				}
			},
			goShow(index) {
				this.$go('/pages/msg/msgDetail?id=' + index.id)
			},
			goSystemMsg(index) {
				if(index.action_id){
					this.$go('/pages/activityHall/activityDetail?id=' + index.action_id)
				}else {
					this.$go('/pages/msg/msgDetail?id=' + index.id)
				}
			}
		}
	}
</script>

<style lang="scss">
	.bs-content {
		padding-top: 70px;
	}

	// 新闻列表
	.news-list {
		position: relative;
		padding: 15px;
		cursor: pointer;
		border-radius: 15px;
		margin-bottom: 12px;
		background: rgba(49, 43, 79, 1);

		.btn--gray {
			width: 100%;
			border-radius: 4px;
		}

		.news-list-head {
			display: flex;
			align-items: center;
			// margin-bottom: 10px;
		}

		.news-list-title {
			font-size: 15px;
		}

		.list-desc {
			line-height: 1.8;
		}

		.list-cate .text {
			color: #D1CCE9;
		}

		.list-time {
			font-size: 12px;
			color: #D1CCE9;
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

	.btn--market--details {
		background: #fff !important;
		color: var(--pa-skin-color) !important;
		border-radius: 5px !important;
	}

	.msg-box {
		color: #fff;
		border-radius: 50%;
		background-color: #EC8D00;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
	}


	.container {
		::v-deep .uni-navbar {
			background: var(--mar-bg);
		}
	}
	.w_80{
		width: 80%;
	}
	.game-tabs {
		position: relative;
		margin-bottom: 15px;
		height: 84rpx;
		box-sizing: content-box;
		border-bottom: 2px solid #4D4886;
	
		::v-deep .u-tab-bar {
			background-color: #E9AE3A !important;
			border-radius: 6px 6px 0 0 !important;
			box-shadow: 1px -3px 6px #FFB80080;
			margin-bottom: -2px;
		}
	
	}
</style>
