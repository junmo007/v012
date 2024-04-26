<template>
	<view class="container" :class="sideshow?'is-mask':''">
		<uniNavHeader :title="$t('menu5')" @clickLeft="menuClick"></uniNavHeader>
		<!-- sidebar -->
		<view class="sidebar" :class="sideshow?'is-show':''">
			<uniSideHeader @menuClick="menuClick" nIndex="4"></uniSideHeader>
		</view>
		<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
		<!-- main -->
		<view class="bs-content">
			<!-- pc 结果展示 -->
			<view class="u-flex u-row-between u-m-b-32 ">
				<view class="top-link-tabs u-flex " style="margin-bottom: 0;">
					<view class="n-tab_item  ">
						<view @click="$go('/pages/gameResults/index')" class="item-text">
							{{$t('game58')}}
						</view>
					</view>
					<view class="n-tab_item active">
						<view @click="$go('/pages/gameResults/progress')" class="item-text">
							{{$t('game59')}}
						</view>
					</view>
				</view>
				<view class="u-flex" @click="dataShow = true">
					<view class="riqiClass">
						<text class="iconfont icon-calendar"></text>
					</view>
					<view class="u-m-l-16">{{$t(sreachData)}}</view>
					<!-- <view class="u-m-l-16">
						<view class="iconfont icon-sj-down" style="transition: .3s all;"
							:style="dataShow?'transform: rotateZ(180deg);':'transform: rotateZ(0);'"></view>
					</view> -->
				</view>
			</view>
			<u-picker v-model="dataShow" mode="time" :safe-area-inset-bottom="true" :title="$t('选择日期')"
				cancel-color="#fff" confirm-color="#fff" @confirm="dataConfirm"></u-picker>
			<view class="" style="padding-top: 0;">
				<!-- 手机 结果展示 -->
				<!-- <view class="m-time-panel">
					<view class="g-time-bar flex-center">
						<view class="flex_bd">
							<uni-datetime-picker style="position: relative;z-index: 1;" type="date"
								:placeholder="$t('选择日期')" start="2021-1-20" end="2032-6-20"
								@change="onchange($event)" />
						</view>
						<button type="default" class="btn btn-search">
							<uni-icons size="18" type="search"></uni-icons>
						</button>
					</view>
				</view> -->
				<template v-if="showEmpty == 1">
					<view class="m-game-list">
						<view class="vs-game-cell" v-for="(item,index) in matchList" :key="`list2${index}`">
							<view class="vs-heading">
								<image src="../../static/images/old/Championship.png" mode=""></image><text>{{$t(item.ls_name)}}</text>
							</view>
							<view class="vs-game-card">
								<view class="col">
									<view class="macthB">{{$t(item.zd_name[0])}}</view>
									<view class="team-tit">{{$t(item.zd_name)}}</view>
								</view>
								<view class="vs-middle">
									<view class="vs-score">
										<text class="span">{{item.ls_res_zd_fs}}</text>
										<text class="vs">:</text>
										<text class="span">{{item.ls_res_kd_fs}}</text>
									</view>
									<view class="g-time">{{item.sc_time}}</view>
								</view>
								<view class="col">
									<view class="macthB">{{$t(item.kd_name[0])}}</view>
									<view class="team-tit">{{$t(item.kd_name)}}</view>
								</view>
							</view>
						</view>
					</view>
					<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
				</template>
				<template v-if="showEmpty == 0">
					<listEmpty :isDefault="true" class="u-bg-w u-bd-8 u-m-t-30"
						:listHighly='300'></listEmpty>
				</template>
			</view>
		</view>
		<!-- footer 移动端 -->
		<view class="m-footer alalyst-active">
			<uniNavFooter fIndex="2"></uniNavFooter>
		</view>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import uniNavFooter from '@/components/uni-foot-bar/uni-foot-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			uniNavFooter,
			listEmpty
		},
		data() {
			return {
				sideshow: false,
				page: 1,
				matchList: [],
				single: '',
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				showEmpty: null,
				enable: true,
				sreachData: this.$t('选择日期'),
				dataShow: false,
				dataTime: ''
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('menu5')
			});
		},
		onShow() {
			this.enable = true;
			this.getmatch();
		},
		onHide() {
			this.enable = false;
		},
		onReachBottom() {
			if (this.status == 'noMore') {
				return;
			}
			this.getmatch();
		},
		methods: {
			// 滚动
			lower() {
				if (this.status == 'noMore') {
					return;
				}
				this.getmatch();
			},
			dataConfirm(e) {
				this.sreachData = e.year + '-' + e.month + '-' + e.day;
				this.page = 1;
				this.matchList = [];
				this.getmatch(this.sreachData);
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			clearT() {
				this.single = '';
			},
			onchange(e) {
				this.single = e;
				this.page = 1;
				this.matchList = [];
				this.getmatch();
			},
			async getmatch(date) {
				uni.showLoading({
					mask: true,
					title: this.$t("loading")
				});
				let ret = await this.$u.api.matchresult_p({
					date: date ? date : '',
					page: this.page,
					type: 1,
					limit: 20,
				});

				if (ret) {
					//if(!this.single) this.single = ret.single;
					if (ret.data.list.length > 0) {
						this.showEmpty = 1;
						for (let i = 0; i < ret.data.list.length; i++) {
							this.matchList.push(ret.data.list[i]);
						}
						// 加载状态结束
						if (ret.data.list.length < 20) {
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


<style lang="scss" scoped>
	.table-heading ::v-deep .uni-table-loading {
		display: none !important;
	}

	.reuslt-scroll-Y {
		height: calc(100vh - 275px);
	}

	.vsClass {
		padding: 5px 15px;
		color: #fff !important;
		border-radius: 4px;
		background-image: linear-gradient(to right, #fda740, #fbbb33);
	}

	.team-tit {
		width: 49%;
		text-align: center;
	}
	
	.riqiClass {
		color: var(--body-color);
		font-size: 0;
	}
	.riqiClass image{
		width: 20px;
		height: 20px;
	}
	.n-tab_item{
		white-space: nowrap;
		padding: 0 15px;
	}
	.top-link-tabs .n-tab_item{
		min-width: 80px;
	}
</style>
