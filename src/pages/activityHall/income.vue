<template>
	<view class="container" :class="sideshow?'is-mask':''">
		<uniNavHeader isback :title="$t('活动收入')" @clickLeft="menuClick"></uniNavHeader>
		<!-- sidebar -->
		<view class="sidebar" :class="sideshow?'is-show':''">
			<uniSideHeader @menuClick="menuClick" nIndex="6"></uniSideHeader>
		</view>
		<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
		<view >
			<template v-if="showEmpty == 1">
				<view class="result-main">
					<view class="fun-list-card" v-for="(item, index) in tableList" :key="`list${index}`">
						<view class="fundItemClass" @click="getTeamData(item)">
							<image :src="item.a_type == 3?'../../static/images/topboom/down.png':'../../static/images/topboom/up.png'" mode=""></image>
							<view class="flex_bd">
								<view class="title">{{$t(item.msg)}}</view>
								<view class="u-font-xs text-gray">{{item.add_time}}</view>
							</view>
							<view class="">
								{{item.a_type == 3?'+' + $t(item.price) : '-' + $t(item.price)}}
							</view>
						</view>
					</view>
					<view class="load-more-box">
						<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
					</view>
				</view>
			</template>
			<template  v-if="showEmpty == 0">
				<listEmpty :isDefault="true" text='暂无活动收入' list='list' :listHighly='530'></listEmpty>
			</template>
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
				tableList: [],
				p: 1,
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				showEmpty: null
			}
		},
		async onLoad() {
			await this.getTableList();
		},
		onReachBottom() {
			if (this.status == 'noMore') {
				return;
			}
			this.getTableList();
		},
		methods: {
			menuClick() {
				this.sideshow = !this.sideshow
			},
			// 获取基金列表
			async getTableList() {
				uni.showLoading({
					title: this.$t('loading')
				})
				let res = await this.$u.api.recharge_mosaic_p({
					limit: 20,
					page: this.p
				});
				if (res) {
					uni.hideLoading();
					if (res.data.length > 0) {
						this.showEmpty = 1;
						for (let i = 0; i < res.data.length; i++) {
							this.tableList.push(res.data[i]);
						}
						if (res.data.length < 20) {
							this.status = "noMore";
						} else {
							this.status = "loading";
							this.p++;
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

<style lang="scss">
	.result-main{
		padding:16px;
	}
	.fundSubmit {
		width: 50%;
		color: #fff;
		height: 40px;
		margin: 0 auto;
		cursor: pointer;
		line-height: 40px;
		text-align: center;
		border-radius: 40px;
		background-color: var(--ui-color-normal);
	}

	@media (max-width:750px) {
		.m-footer {
			display: block;
		}

		.pc-show {
			display: none;
		}
	}

	@media (min-width:751px) {
		.m-footer {
			display: none;
		}

		.m-show {
			display: none;
		}
	}

	.recordPosition {
		top: 15px;
		right: 20px;
		color: #fff;
	}

	.reocrdImg {
		width: 15px;
		height: 15px;
		margin-right: 4px;
	}
</style>
