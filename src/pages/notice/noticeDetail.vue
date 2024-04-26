<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader isback :title="this.$t('menu10')" @clickLeft="menuClick"></uniNavHeader>
			<!-- sidebar -->
			<view class="sidebar" :class="sideshow?'is-show':''">
				<uniSideHeader @menuClick="menuClick" nIndex="9"></uniSideHeader>
			</view>
			<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
			<!-- main -->
			<view class="bs-wrapper">
				<view class="site-head u-flex u-m-b-30">
					<view class="site-tit">
						<text>{{$t('menu10')}}</text>
						<view class="line"></view>
					</view>
					<view class="site-back" @click="common_back">
						<text class="iconfont icon-close"></text>
					</view>
				</view>
				<view class="fan-card">
					<view class="art-content" v-if="notice.content">
						<view class="art-heading">
							<view class="art-title">{{notice.title}}</view>
							<view class="art-meta flex-center">
								<view class="time" style="margin: 0;" v-if="notice.is_show_time == 1">
									{{notice.add_time}}
								</view>
							</view>
						</view>
						<view class="art-body" v-html="notice.content"></view>
					</view>
				</view>
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
				notice_id: '',
				notice: {},
			}
		},
		async onLoad(options) {
			uni.setNavigationBarTitle({
				title: this.$t('menu10')
			});
			if (options.id) {
				this.notice_id = options.id;
				this.getnotice();
			} else {
				this.$go('back');
			}
		},
		methods: {
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async getnotice() {
				uni.showLoading({
					title: this.$t('loading')
				});
				let ret = await this.$u.api.noticedetail_p({
					id: this.notice_id
				});
				if (ret) {
					uni.hideLoading();
					this.notice = ret.data;
				}
			},
		}
	}
</script>

<style lang="scss">
	// 新闻列表
	.art-content {
		position: relative;
		padding: 20px;
		cursor: pointer;

		.art-title {
			font-weight: bold;
			background: var(--tab-active);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			margin-bottom: 10px;
		}

		.list-desc {
			font-size: 14px;
		}

		.list-time {
			margin-top: 20px;
			font-size: 12px;
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
</style>
