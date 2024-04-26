<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader isback :title="$t('agent36')" @clickLeft="menuClick"></uniNavHeader>
			<!-- sidebar -->
			<view class="sidebar" :class="sideshow?'is-show':''">
				<uniSideHeader @menuClick="menuClick" nIndex="7"></uniSideHeader>
			</view>
			<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
			<!-- main -->
			<view class="bs-container">
				<view class="gradient-bg">
					<view class="mark-user flex-center u-m-b-40">
						<view class="lg-avatar">
							<image :src="userDefaultHeader" mode=""></image>
						</view>
						<view class="flex_bd">
							<view class="uname">
								<text>{{userInfo_common.username}}</text>
							</view>
						</view>
						<navigator url="/pages/wsCenter/promotionReward" class="btn-sta">
							<text class="label">{{$t('agent32')}}</text>
						</navigator>
					</view>
				</view>
				<view class="bs-content bs-mt-panel">
					<view class="m-link-cell u-m-b-20 flex">
						<view class="col">
							<navigator url="/pages/ucenter/index" class="m-link-card">
								<text class="iconfont icon-user_circle_outline"></text>
								<view class="label">{{$t('menu7')}}</view>
							</navigator>
						</view>
						<view class="col">
							<navigator url="/pages/wsCenter/financialStatement" class="m-link-card active">
								<text class="iconfont icon-billhead_outline"></text>
								<view class="label">{{$t('agent36')}}</view>
							</navigator>
						</view>
						<view class="col">
							<navigator url="/pages/wsCenter/team" class="m-link-card">
								<text class="iconfont icon-users_3_outline"></text>
								<view class="label">{{$t('agent37')}}</view>
							</navigator>
						</view>
					</view>
					<view class="fin-cells u-flex">
						<view class="j-cell_item">
							<view class="jlabel u-e-7">{{$t('agent46')}}</view>
							<view class="j-value">{{teamreport.user_count}}</view>
						</view>
						<view class="j-cell_item">
							<view class="jlabel u-e-7">{{$t('agent64')}}</view>
							<view class="j-value">{{teamreport.extension}}</view>
						</view>
					</view>
					<view class="j-line"></view>
					<div class="fin-card-tabs">
						<u-tabs :list="tabs" :is-scroll="false" bg-color="none" :current="current" @change="changeTab"
							:bar-style="barStyle" active-color="#ffffff" inactive-color="#ffffff" bar-width="180"
							height="100"></u-tabs>
					</div>
					<!-- pane -->
					<view class="pane" v-if="current == 0">
						<view class="fina-cell">
							<uni-table class="fbd-table" :emptyText="$t('public13')">
								<!-- 表头行 -->
								<uni-tr>
									<uni-th align="center">{{$t('agent6')}}</uni-th>
									<uni-th align="center">{{$t('agent7')}}</uni-th>
									<uni-th align="center">{{$t('agent8')}}</uni-th>
									<uni-th align="center">{{$t('agent9')}}</uni-th>
								</uni-tr>
								<!-- 表格数据行 -->
								<uni-tr v-for="(item, index) in teamreport.lists" :key="`list${index}`">
									<uni-td align="center">{{index}}</uni-td>
									<uni-td align="center">{{item.people}}</uni-td>
									<uni-td align="center">{{item.effective}}</uni-td>
									<uni-td align="center">{{item.actual}}</uni-td>
								</uni-tr>
							</uni-table>
						</view>
					</view>
					<!-- pane -->
					<view class="pane" v-if="current == 1">
						<view class="fina-cell">
							<uni-table class="fbd-table" :emptyText="$t('public13')">
								<!-- 表头行 -->
								<uni-tr>
									<uni-th align="center">{{$t('agent6')}}</uni-th>
									<uni-th align="center">{{$t('agent7')}}</uni-th>
									<uni-th align="center">{{$t('agent8')}}</uni-th>
									<uni-th align="center">{{$t('agent9')}}</uni-th>
								</uni-tr>
								<!-- 表格数据行 -->
								<uni-tr v-for="(item, index) in teamreport.lists" :key="`list2${index}`">
									<uni-td align="center">{{index}}</uni-td>
									<uni-td align="center">{{item.people}}</uni-td>
									<uni-td align="center">{{item.effective}}</uni-td>
									<uni-td align="center">{{item.actual}}</uni-td>
								</uni-tr>
							</uni-table>
						</view>
					</view>
					<!-- pane -->
					<view class="pane" v-if="current == 2">
						<template v-if="reportType == 0">
							<view class="fina-cell" v-for="(v, k) in teamreports.lists" :key="`list3${k}`">
								<view class="u-flex u-row-between">
									<view class="fina-text">{{k}}</view>
									<view class="u-flex u-m-b-20" @click="dataShow = true">
										<view class="riqiClass">
											<text class="iconfont icon-calendar"></text>
										</view>
										<view class="u-m-l-16">{{$t(sreachData)}}</view>
										<view class="u-m-l-16">
											<view class="iconfont icon-sj-down" style="transition: .3s all;"
												:style="dataShow?'transform: rotateZ(180deg);':'transform: rotateZ(0);'">
											</view>
										</view>
									</view>
								</view>
								<uni-table class="fbd-table" :emptyText="$t('public13')">
									<!-- 表头行 -->
									<uni-tr>
										<uni-th align="center">{{$t('agent6')}}</uni-th>
										<uni-th align="center">{{$t('agent7')}}</uni-th>
										<uni-th align="center">{{$t('agent8')}}</uni-th>
										<uni-th align="center">{{$t('agent9')}}</uni-th>
									</uni-tr>
									<!-- 表格数据行 -->
									<uni-tr v-for="(item, index) in v" :key="`list4${index}`">
										<uni-td align="center">{{index}}</uni-td>
										<uni-td align="center">{{item.people}}</uni-td>
										<uni-td align="center">{{item.effective}}</uni-td>
										<uni-td align="center">{{item.actual}}</uni-td>
									</uni-tr>
								</uni-table>
							</view>
						</template>
						<template v-if="reportType == 3">
							<view class="u-flex u-row-between">
								<view class="fina-text"></view>
								<view class="u-flex u-m-b-20" @click="dataShow = true">
									<view class="riqiClass">
										<text class="iconfont icon-calendar"></text>
									</view>
									<view class="u-m-l-16">{{$t(sreachData)}}</view>
									<view class="u-m-l-16">
										<view class="iconfont icon-sj-down" style="transition: .3s all;"
											:style="dataShow?'transform: rotateZ(180deg);':'transform: rotateZ(0);'">
										</view>
									</view>
								</view>
							</view>
							<uni-table class="fbd-table" :emptyText="$t('public13')">
								<!-- 表头行 -->
								<uni-tr>
									<uni-th align="center">{{$t('agent6')}}</uni-th>
									<uni-th align="center">{{$t('agent7')}}</uni-th>
									<uni-th align="center">{{$t('agent8')}}</uni-th>
									<uni-th align="center">{{$t('agent9')}}</uni-th>
								</uni-tr>
								<!-- 表格数据行 -->
								<uni-tr v-for="(item, index) in teamreport.lists" :key="`list2${index}`">
									<uni-td align="center">{{index}}</uni-td>
									<uni-td align="center">{{item.people}}</uni-td>
									<uni-td align="center">{{item.effective}}</uni-td>
									<uni-td align="center">{{item.actual}}</uni-td>
								</uni-tr>
							</uni-table>
						</template>
					</view>
				</view>
				<u-picker v-model="dataShow" mode="time" :safe-area-inset-bottom="true" :title="$t('选择日期')"
					cancel-color="#fff" confirm-color="#fff" @confirm="dataConfirm" :isShowDay="false"></u-picker>
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
				// tab
				current: 0,
				teamreport: [],
				teamreports: [],
				reportType: 1,
				enable: true,
				tabs: [{
					name: this.$t('agent3')
				}, {
					name: this.$t('agent4')
				}, {
					name: this.$t('agent5'),
				}],
				barStyle: {
					background: 'var(--ui-color-normal)'
				},
				dataShow: false,
				sreachData: this.$t('选择日期'),
			}
		},
		onShow() {
			this.enable = true;
		},
		onHide() {
			this.enable = false;
		},
		onLoad() {
			this.getTeamreport();
		},
		onReachBottom() {},
		methods: {
			dataConfirm(e) {
				this.sreachData = e.year + '-' + e.month;
				this.reportType = 3;
				this.getTeamreport(this.sreachData);
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			// tab
			changeTab(i) {
				this.current = i
				if (i == 0) this.reportType = 1;
				if (i == 1) this.reportType = 2;
				if (i == 2) this.reportType = 0;
				this.sreachData = this.$t('选择日期');
				this.getTeamreport();
			},
			async getTeamreport() {
				let ret = await this.$u.api.teamreport_p({
					date_type: this.reportType,
					date: this.reportType == 3 ? this.sreachData + '|' + this.sreachData : ''
				});
				if (ret) {
					if (this.reportType == 0) {
						this.teamreports = ret.data;
					} else {
						this.teamreport = ret.data;
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.finanBG {
		// border: 1px solid #f00;
		// background-color: #000;
	}

	.j-cell {
		background: none;
	}

	.pane {
		margin-top: 16px;
	}

	.riqiClass {
		color: var(--body-color);
		font-size: 0;
	}

	.riqiClass image {
		width: 20px;
		height: 20px;
	}
</style>
