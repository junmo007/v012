<template>
	<view class="content">
		<view class="container">
			<uniNavHeader isback :title="$t('您想问什么')"></uniNavHeader>
			<view class="bs-wrapper u-p-b-20">
				<template v-if="showNews == 1">
					<view class="cunsultingCar">
						<view class="u-font-xl keep-word m-font-16 m-font-b">{{newsDetail.news_title}}</view>
						<view class="keep-word u-m-t-16 m-font-16">
							{{$t('答')}} : <view class="art-body u-c-g" v-html="newsDetail.news_content"></view>
						</view>
					</view>
				</template>
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
				newsDetail: {},
				showNews: 0
			}
		},
		onLoad(news_id) {
			if (news_id.news_id) {
				this.getNewsDetail(news_id.news_id);
			} else {
				this.$go('back')
			}
		},
		async onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('您想问什么')
			});
		},
		methods: {
			menuClick() {
				this.sideshow = !this.sideshow
			},
			// 获取问答详情
			async getNewsDetail(news_id) {
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.newsdetail_p({
					news_id
				});
				uni.hideLoading();
				if (res && res.code == 1) {
					this.newsDetail = res.data;
					if (this.newsDetail) {
						this.showNews = 1;
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.cunsultingCar {
		padding: 15px;
		border-radius: 16px;
		background-color: rgba(62, 54, 100, 1);
		box-shadow: 0px 4px 10px rgba(24, 25, 32, 0.1);
	}
</style>
