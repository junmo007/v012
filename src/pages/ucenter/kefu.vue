<template>
	<view class="content">
		<view class="container">
			<uniNavHeader isback :title="this.$t('问答中心')"></uniNavHeader>
			<view class="bs-wrapper">
				<view class="kefuCar u-p-b-30" v-if="newsList.length>0">
					<view class="u-flex u-p-l-30 u-p-r-30 u-p-t-30">
						<view class="iconfont icon-xiaoxi2 "></view>
						<view class="u-font-30 caiText ">{{$t('猜你想问')}}</view>
					</view>
					<u-cell-group :border="false" :class="index==0?'u-m-t-30':''" v-for="(item,index) in newsList" :key="index">
						<u-cell-item :border-bottom="false" :title="item.news_title" hoverClass="none"
							@click="$go('/pages/ucenter/consultingService?news_id='+item.id)"></u-cell-item>
					</u-cell-group>
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
				page: 1,
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				newsList: [],
				showEmpty: null
			}
		},
		onLoad() {
			this.getNewsList('add');
		},
		async onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('问答中心')
			});
		},
		onReachBottom() {
			if (this.status == 'noMore') {
				return;
			}
			this.getNewsList();
		},
		methods: {
			// 获取问答列表
			async getNewsList(add) {
				let res = await this.$u.api.newslist_p({
					page: this.page,
					limit: 10
				});
				if (res) {
					uni.hideLoading();
					if (add) {
						this.newsList = res.data;
					} else {
						this.newsList = this.newsList.concat(res.data);
					}
					if (res.data.length == 10) {
						this.status = "loading";
						this.page++;
					} else {
						this.status = "noMore";
					}
					if (this.newsList.length > 0) {
						this.showEmpty = 1;
					} else {
						this.showEmpty = 0;
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	.kefuCar {
		margin-top: 20px;
		border-radius: 16px;
		background: var(--card-style);
		box-shadow: var(--card-shadow);

		&::v-deep {
			.u-cell-item-box {
				background: var(--card-style);
				color: var(--body-color)
			}

			.u-cell {
				color: var(--body-color)
			}
		}
	}

	.caiText {
		margin: -1px 0 0 5px;
		font-style: italic;
	}

	.zixBtn {
		color: #fff;
		min-width: 60px;
		padding: 6px 10px;
		text-align: center;
		border-radius: 26px;
		background-color: var(--ui-color-normal);
	}
</style>
