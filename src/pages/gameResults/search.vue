<template>
	<view class="content">
		<view class="container">
			<view class="bs-wrapper m-rela">
				<view class="search-navbar u-flex">
					<image src="@/static/images/index/menu/back.png"
						style="width: 42px;height: 42px;margin-right: 13px;" @click="common_back">
					</image>
					<u-search bg-color="#3E3664" border-color="#3E3664" search-icon-color="#9792B2"
						placeholder-color="var(--link-color)" color="var(--body-color)" shape="square" height="88"
						:show-action="false" v-model="searchKey" :placeholder="$t('Please Enter')"
						@search="marketSearch" @clear="clearChange">
					</u-search>
					<view class="text-yellow m-font-16 u-m-l-26" @click="clearChange">{{$t('清除')}}</view>
				</view>
				<template v-if="emtpy == 1">
				<view class="market-event-card" v-for="(item,index) in matchList" :key="`list2${index}`">
					<view class="event-logos">
						<view class="ksgt-1">
							<image :src="item.zd_logo" v-if="item.zd_logo"></image>
							<image :src="marketHeaderZD" v-if="!item.zd_logo"></image>
						</view>
						<view class="ksgt-1 ksgt-2">
							<image :src="item.kd_logo" v-if="item.kd_logo"></image>
							<image :src="marketHeaderKD" v-if="!item.kd_logo"></image>
						</view>
					</view>
					<view class="flex_bd">
						<view class="event-title u-m-b-10 u-flex m-font-16">
							<view class="team-tit u-flex  ">
								<view class="zd-name-wrap">
									<view class="zd-name-content">
										<view class="zd-name-marquee greendark-color">
											{{$t(item.zd_name)}}
										</view>
									</view>
								</view>
								<text class="u-m-l-10 m-font-b">{{item.ls_res_zd_fs}}</text>
							</view>
							<view class="m-font-b vs u-p-10">:</view>
							<view class="team-tit u-flex">
								<text class="u-m-r-10 m-font-b">{{item.ls_res_kd_fs}}</text>
								<view class="zd-name-wrap">
									<view class="zd-name-content">
										<view class="zd-name-marquee greendark-color">
											{{$t(item.kd_name)}}
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="event-time">{{item.sc_time}}</view>
					</view>
				</view>
				<view class="load-more-box">
					<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
				</view>
				</template>
				<template v-if="emtpy == 0">
					<listEmpty :isDefault="true"></listEmpty>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	export default {
		components: {
			uniNavHeader,
			listEmpty
		},
		data() {
			return {
				emtpy: 0,
				searchKey: '',
				page: 1,
				matchList: [],
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				}
			}
		},
		onLoad() {},
		onReachBottom() {
			if (this.status == 'noMore') {
				return;
			}
			this.getList();
		},
		methods: {
			marketSearch(e) {
				this.page = 1;
				this.matchList = [];
				this.searchKey = e;
				this.getList('add');
			},
			clearChange(e) {
				this.page = 1;
				this.matchList = [];
				this.searchKey = '';
				this.emtpy = 0;
			},
			async getList(add) {
				let res = await this.$u.api.matchresult_p({
					limit: 20,
					page: this.page,
					keywords: this.searchKey
				});
				if (res && res.code == 1) {
					if (add) {
						this.matchList = res.data.list;
					} else {
						this.matchList = this.matchList.concat(res.data.list);
					}
					if (res.data.list.length == 20) {
						this.status = "loading";
						this.page++;
					} else {
						this.status = "noMore";
					}
					if (this.matchList.length > 0) {
						this.emtpy = 1;
					} else {
						this.emtpy = 0;
					}
				} else {
					this.emtpy = 0;
				}
			},
		}
	}
</script>


<style lang="scss" scoped>
	.search-navbar {
		padding: 0 15px;
		height: 70px;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
	}

	.search-navbar ::v-deep .u-content {
		border-radius: 16px !important;
	}

	.market-event-card {
		display: flex;
		align-items: center;
		padding: 16px;
		margin-bottom: 7px;
		background-color: rgba(62, 54, 100, 1);
		border-radius: 16px;
	}

	.event-logos {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 10px;
	}

	.event-time {
		color: #D1CCE9;
	}

	.team-tit {
		max-width: 120px;
	}
</style>
