<template>
	<view :class="isOpen?'pc-open':'pc-close'">
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main u-flex u-col-top pc-has-right">
				<pcSideBar :pageIndex="6" @menu-event="parentMenu"></pcSideBar>
				<view class="pc-wrapper">
					<view class="pc-wrapper-head u-flex u-m-b-20">
						<text class="iconfont icon-more-info u-font-36 u-m-r-16"></text>
						<text class="u-font-36">{{$t('关于我们')}}</text>
					</view>
					<view class="top-link-tabs flex-center " style="margin-bottom: 16px;">
						<view class="n-tab_item" @click="changeTab(index)" :class="current == index ? 'active':''"
							v-for="(item,index) in caterange">
							<text class="item-text">{{item.text}}</text>
						</view>
					</view>
					<view class="about-content">
						<view class="m-font-b u-m-b-20">{{caterange[current].text}}</view>
						<template v-if="ruleType == 0">
							<view class="art-body" v-html="web_rule_common_0"></view>
						</template>
						<template v-if="ruleType == 1">
							<view class="art-body" v-html="web_rule_common_1"></view>
						</template>
						<template v-if="ruleType == 5">
							<view class="art-body" v-html="web_rule_common_5"></view>
						</template>
					</view>
				</view>
				<view class="pc-right-bar">
					<pcSideTrade></pcSideTrade>
				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content" :data-theme="themeMode">
				<view class="container" :class="sideshow?'is-mask':''">
					<uniNavHeader isback :title="$t('public19')" @clickLeft="menuClick"></uniNavHeader>
					<!-- main -->
					<view class="bs-wrapper">
						<uni-collapse ref="collapse" v-model="collvalue">
							<template>
								<uni-collapse-item class="collapseClass" :marketV2="true" :open="true">
									<template v-slot:title>
										<view class="flex-1 m-font-16">{{$t('关于我们')}}</view>
									</template>
									<view class="help-content u-p-16">
										<view class="art-body u-c-g" v-html="web_rule_common_0"></view>
									</view>
								</uni-collapse-item>
								<uni-collapse-item class="collapseClass" :marketV2="true">
									<template v-slot:title>
										<view class="flex-1 m-font-16">{{$t('用户协议')}}</view>
									</template>
									<view class="help-content u-p-16">
										<view class="art-body u-c-g" v-html="web_rule_common_1"></view>
									</view>
								</uni-collapse-item>
								<uni-collapse-item class="collapseClass" :marketV2="true">
									<template v-slot:title>
										<view class="flex-1 m-font-16">{{$t('register7')}}</view>
									</template>
									<view class="help-content u-p-16">
										<view class="art-body u-c-g" v-html="web_rule_common_5"></view>
									</view>
								</uni-collapse-item>
							</template>
						</uni-collapse>
					</view>
				</view>
				<pcBg></pcBg>
			</view>
		</template>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	import pcSideTrade from "@/components/pc-side-trade/trade.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			pcBg,
			pcNavHeader,
			pcSideBar,
			pcSideTrade
		},
		data() {
			return {
				sideshow: false,
				cateValue: 0,
				current: 0,
				caterange: [{
						value: 0,
						text: `1.${this.$t('关于我们')}`
					},
					{
						value: 1,
						text: `2.${this.$t('用户协议')}`
					},
					{
						value: 2,
						text: `3.${this.$t('register7')}`
					}
				],
				collvalue: "0",
				ruleType: 0
			}
		},
		async onLoad() {
			this.getRule_common(0);
			this.getRule_common(1);
			this.getRule_common(5);
		},
		async onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('public19')
			});
		},
		methods: {
			changeTab(e) {
				this.current = e;
				switch (e) {
					case 0:
						this.ruleType = 0;
						this.getRule_common(0);
						break;
					case 1:
						this.ruleType = 1;
						this.getRule_common(1);
						break;
					case 2:
						this.ruleType = 5;
						this.getRule_common(5);
						break;
						break;
					default:
						break;
				}
			},
			parentMenu(){
				this.menuToggle()
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			catechange(e) {
				this.current = e;
				switch (e) {
					case 0:
						this.ruleType = 0;
						this.getRule_common(0);
						break;
					case 1:
						this.ruleType = 1;
						this.getRule_common(1);
						break;
					case 2:
						this.ruleType = 5;
						this.getRule_common(5);
						break;
						break;
					default:
						break;
				}
			},
		}
	}
</script>

<style lang="scss">
	.left-select {
		height: calc(100vh - 120px);
		background-image: var(--help-left-select-bg);
	}

	.left-select .left-select-item {
		padding: 15px 0;
		text-align: center;
	}

	.left-select .left-select-active-item {
		background-color: var(--left-select-active-item-bg);
	}

	.right-text {
		background-color: #fff;
		height: calc(100vh - 120px);
		width: 100%;
		padding: 30px;
	}
	
	.collapseClass {
		margin-bottom: 12px;
	}
	
	.collapseClass ::v-deep .uni-collapse-item__wrap-content {
		border-radius: 0 0 16px 16px;
		background: #312B4F;
	}
	
	.collapseClass ::v-deep .uni-collapse-item__title-arrow {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #D1CCE9;
		border-radius: 50%;
		background-color: #4D4886;
	}
	// pc
	.about-content{
		background: #312B4F;
		border-radius: 16px;
		padding: 16px;
		
	}
	
	
	
</style>
