<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader isback :title="$t('agent28')" @clickLeft="menuClick"></uniNavHeader>
			<!-- sidebar -->
			<view class="sidebar" :class="sideshow?'is-show':''">
				<uniSideHeader @menuClick="menuClick" nIndex="7"></uniSideHeader>
			</view>
			<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
			<!-- main -->
			<view class="bs-container">
				<view class="bs-content">
					<template v-if="showEmpty == 1">
						<view class="">
							<uni-table class="fbd-table" emptyText="">
								<!-- 表头行 -->
								<uni-tr>
									<uni-th align="left">{{$t('agent62')}}</uni-th>
									<uni-th align="right">{{$t('user71')}}</uni-th>
								</uni-tr>
								<!-- 表格数据行 -->
								<uni-tr v-for="(item,index) in dataList" :key="`list${index}`">
									<uni-td>{{item.username}}</uni-td>
									<uni-td align="right">{{item.w_price}}</uni-td>
								</uni-tr>
							</uni-table>
						</view>
						<uni-load-more :status="status"></uni-load-more>
					</template>
					<template v-if="showEmpty == 0">
						<listEmpty :isDefault="true" text='暂无总提现' list='list' :listHighly='500'></listEmpty>
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
				href: '',
				sideshow: false,
				// tab
				tmShow: false,
				dataList: [],
				page: 1,
				level: 1,
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				showEmpty: null
			}
		},
		onLoad(e) {
			this.level = e.level;
			this.getDataList();
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
				let ret = await this.$u.api.teamcashlist_p({
					level: this.level,
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
			tmClick() {
				this.tmShow = !this.tmShow
			}
		}
	}
</script>

<style lang="scss">
</style>
