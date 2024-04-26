<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader @clickLeft="menuClick"></uniNavHeader>
			<!-- sidebar -->
			<view class="site-head u-flex u-m-b-30">
				<view class="site-tit">
					<text>{{$t('agent28')}}</text>
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
						<view>{{$t('agent28')}}</view>
						<view class="u-m-t-10 m-font-b m-font-16">{{teamstat.withdraw_count}}</view>
					</view>
					<view class="u-m-t-10">
						<u-row gutter="16">
							<u-col span="4">
								<view class="team-user-car-level">
									<view class="lv-txt">{{$t('level_1')}}</view>
									<view class="m-c-w m-font-16">{{teamstat.withdraw_count1}}</view>
								</view>
							</u-col>
							<u-col span="4">
								<view class="team-user-car-level">
									<view class="lv-txt">{{$t('level_2')}}</view>
									<view class="m-c-w m-font-16">{{teamstat.withdraw_count2}}</view>
								</view>
							</u-col>
							<u-col span="4">
								<view class="team-user-car-level">
									<view class="lv-txt">{{$t('level_3')}}</view>
									<view class="m-c-w m-font-16">{{teamstat.withdraw_count3}}</view>
								</view>
							</u-col>
						</u-row>
					</view>
				</view>
				<!-- 等级选择 -->
				<scroll-view scroll-x="true" style="min-height: 60px;">
					<view class="u-flex u-m-t-30">
						<view class="team-user-tabs-level"
							:class="teamTabsCurrent == 4 ? 'team-user-tabs-level-active' : ''"
							@click="teamTabsChange(4)">
							{{$t('全部')}}
						</view>
						<view class="team-user-tabs-level"
							:class="teamTabsCurrent == 1 ? 'team-user-tabs-level-active' : ''"
							@click="teamTabsChange(1)">
							{{$t('level_1')}}
						</view>
						<view class="team-user-tabs-level"
							:class="teamTabsCurrent == 2 ? 'team-user-tabs-level-active' : ''"
							@click="teamTabsChange(2)">
							{{$t('level_2')}}
						</view>
						<view class="team-user-tabs-level"
							:class="teamTabsCurrent == 3 ? 'team-user-tabs-level-active' : ''"
							@click="teamTabsChange(3)">
							{{$t('level_3')}}
						</view>
					</view>
				</scroll-view>
				<template v-if="showEmpty == 1">
					<u-row gutter="16" class="u-m-t-30 team-tabel-header">
						<u-col span="8">
							<view class="">
								{{$t('agent62')}}
							</view>
						</u-col>
						<u-col span="4" text-align="right">
							<view class="">
								{{$t('user71')}}
							</view>
						</u-col>
					</u-row>
					<u-row gutter="16" class="u-m-t-30 team-tabel-list" v-for="(item,index) in dataList" :key="index">
						<u-col span="8">
							<view class="team-tabel-item">
								{{item.username}}
							</view>
						</u-col>
						<u-col span="4" text-align="right">
							<view class="team-tabel-item">
								{{item.w_price}}
							</view>
						</u-col>
					</u-row>
					<view class="load-more-box">
						<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
					</view>
				</template>
				<template v-if="showEmpty == 2">
					<listEmpty :isDefault="true" :listHighly='320'></listEmpty>
				</template>
			</view>
		</view>
		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	export default {
		components: {
			uniNavHeader,
			listEmpty,
			pcBg
		},
		data() {
			return {
				href: '',
				sideshow: false,
				teamstat: {},
				teamTabsCurrent: 4,
				page: 1,
				status: 'more',
				dataList: [],
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				showEmpty: null
			}
		},
		async onLoad() {
			this.getTeamstat();
			await this.getDataList('add');
		},
		onReachBottom() {
			if (this.status == 'noMore') {
				return;
			}
			this.getDataList();
		},
		methods: {
			async teamTabsChange(i) {
				this.teamTabsCurrent = i;
				this.showEmpty = null;
				this.page = 1;
				this.dataList = [];
				await this.getDataList('add');
			},
			async getDataList(add) {
				uni.showLoading({
					title: this.$t('loading')
				});
				let ret = await this.$u.api.teamcashlist_p({
					level: this.teamTabsCurrent,
					page: this.page,
					limit: 10,
				});
				if (ret) {
					uni.hideLoading();
					if (ret.data.length > 0) {
						this.showEmpty = 1;
						if (add) {
							this.dataList = ret.data;
						} else {
							this.dataList = this.dataList.concat(ret.data);
						}
						if (ret.data.length == 10) {
							this.status = "loading";
							this.page++;
						} else {
							this.status = "noMore";
						}
					} else {
						this.showEmpty = 2;
						this.status = "noMore";
					}
				}
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async getTeamstat() {
				let ret = await this.$u.api.teamstatcash_p();
				if (ret) {
					this.teamstat = ret.data;
				}
			},
			goShow(index) {
				uni.navigateTo({
					url: '/pages/wsCenter/withdrawal?level=' + index
				});
			}
		}
	}
</script>

<style lang="scss">
	.bs-panel {
		height: calc(100vh - 95px);
	}
</style>
