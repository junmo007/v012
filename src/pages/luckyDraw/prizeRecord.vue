<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader isback :title="$t('抽奖记录')" @clickLeft="menuClick"></uniNavHeader>
			<!-- sidebar -->
			<view class="sidebar" :class="sideshow?'is-show':''">
				<uniSideHeader @menuClick="menuClick" nIndex="99"></uniSideHeader>
			</view>
			<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
			<!-- main -->
			<view class="bs-content">

				<template v-if="showEmpty == 1">
					<view v-for="(item, index) in rollList" :key="index" class="" :class="index>0?'u-m-t-20':''">
						<view class="u-p-20 recordCar u-flex">
							<u-image :src="item.pic?item.pic:'/static/images/lucky/cranGus.png'" mode="widthFix"
								width="100" class="u-m-r-20"></u-image>
							<view>
								<view class="u-m-t-20">{{ item.time }}</view>
								<view class="u-m-t-10">
									{{ item.prize_type == 3 ? $t(item.title) : $t('bonus') + ' : ' + item.prize_price }}
								</view>
							</view>
						</view>
					</view>
					<view class="load-more-box">
						<uni-load-more :status="status"></uni-load-more>
					</view>
				</template>
				<template v-if="showEmpty == 0">
					<listEmpty :isDefault="true" class="u-bd-8" :listHighly='300'>
					</listEmpty>
				</template>
			</view>
		</view>
	</view>
</template>




<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			listEmpty
		},
		data() {
			return {
				href: '',
				sideshow: false,
				rollList: [],
				data: [],
				num: 5,
				count: 0,
				page: 1,
				showEmpty: null,
				status: 'more',
			}
		},
		onLoad() {
			this.getlottery();
		},
		onReachBottom() {
			if (this.status == 'noMore') {
				return;
			}
			this.getlottery();
		},
		methods: {
			async getlottery() {
				let that = this;
				let query = {
					page: this.page,
					limit: 10,
					state: 1,
					prize_type: 0,
				}
				let res = await that.$u.api.lotteryrecord_api(query);
				if (res) {
					if (res.data.data.length > 0) {
						this.showEmpty = 1;
						for (let i = 0; i < res.data.data.length; i++) {
							this.rollList.push(res.data.data[i]);
						}
						// 加载状态结束
						if (res.data.data.length < 10) {
							this.status = "noMore";
						} else {
							this.status = "loading";
							this.page++;
						}
					} else {
						this.showEmpty = 0;
					}
				} else {
					this.showEmpty = 0;
					this.status = "noMore";
				}
			},
			paginChange(e) {
				let current = e.current;
				this.getlottery(current);
				// this.rollList = this.data.slice((current-1)*10,current*10);
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
		}
	}
</script>

<style lang="scss">
	.bs-content {
		min-height: 100vh;
		min-width: 100vw;
		// background-image: url(../../static/images/lucky/winning-record.jpg);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		overflow: hidden;
		overflow-y: scroll;
	}

	.recordCar {
		// background-image: url(../../static/images/lucky/recordCar.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		height: 80px;
		color: #fff;
	}
</style>
