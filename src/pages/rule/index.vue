<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader isback :title="$t('menu11')" @clickLeft="menuClick"></uniNavHeader>
			<!-- sidebar -->
			<view class="sidebar" :class="sideshow?'is-show':''">
				<uniSideHeader @menuClick="menuClick" nIndex="10"></uniSideHeader>
			</view>
			<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
			<!-- main -->
			<view class="bs-container">
				<view class="bs-content">
					<view class="top-link-tabs flex-center justify-center">
						<view class="n-tab_item" @click="changeTab(index)" :class="current == index ? 'active':''"
							v-for="(item,index) in tabs">
							<text class="item-text">{{item}}</text>
						</view>
					</view>
					<view class="panel panel-rule">
						<view class="panel-body">
							<view class="rule-main" v-if="current == 0">
								<view class="art-body" v-html="web_rule_common_1"></view>
							</view>
							<view class="rule-main" v-if="current == 1">
								<view class="bot-text" v-html="web_rule_common_2"></view>
							</view>
						</view>
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
				// tab
				current: 0,
				// list
				indicatorDots: false,
				autoplay: false,
				circular: false,
				interval: 2000,
				duration: 500,
				curDot: 0,
				list: ['../../static/images/x/demo.png', '../../static/images/index/indexbanner.jpg',
					'../../static/images/x/demo.png'
				]
			}
		},
		computed: {
			tabs() {
				return [this.$t('public26'), this.$t('public27')]
			}
		},
		async onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('menu11')
			});
			this.getRule_common(1);
			this.getRule_common(2);
		},
		methods: {
			menuClick() {
				this.sideshow = !this.sideshow
			},
			// tab
			changeTab(index) {
				this.current = index
			},
			leftImg() {
				this.circular = false
				let num = this.list.length - 1
				if (this.curDot <= 0) {
					this.circular = true
					this.curDot = num
				} else {
					this.curDot--
				}
			},
			rightImg() {
				this.circular = true
				let num = this.list.length - 1
				if (this.curDot >= num) {
					this.curDot = 0
				} else {
					this.curDot++
				}
			},
		}
	}
</script>

<style lang="scss">
	.panel-top-tab {
		border-bottom: 1px solid #DDDDDD;
	}

	.demo-swiper-panel {
		position: relative;
		margin: 0 auto;
		max-width: 490px;
	}

	.demo-swiper {
		height: 520px;

		swiper-item {
			height: 100%;
		}
	}

	.demo-pic {
		width: 100%;
		height: 100%;

		image {
			width: 100%;
			height: 100% !important;
			border-radius: 8px;
		}
	}

	.demo-swiper-panel .iconfont {
		position: absolute;
		font-size: 20px;
		cursor: pointer;
		top: 50%;
		transform: translateY(-50%);
		width: 40px;
		height: 40px;
		line-height: 40px;
		border-radius: 40px;
		background: #565b6e;
		color: #FFFFFF;
		text-align: center;
	}

	.demo-swiper-panel .icon-left {
		left: -50px;
	}

	.demo-swiper-panel .icon-right {
		right: -50px;
	}

	@media (max-width:750px) {
		.rule-main {
			padding: 0 0;
		}

		.demo-swiper {
			height: 380px;
		}

		.demo-swiper-panel {
			max-width: 360px;
		}

		.demo-swiper-panel .icon-left {
			left: -20px;
		}

		.demo-swiper-panel .icon-right {
			right: -20px;
		}
	}
</style>
