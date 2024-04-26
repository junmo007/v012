<template>
	<view :class="isOpen?'pc-open':'pc-close'">
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main u-flex u-col-top pc-has-right">
				<pcSideBar :pageIndex="3" @menu-event="parentMenu"></pcSideBar>
				<view class="pc-wrapper">
					<view class="pc-wrapper-head u-flex u-m-b-20">
						<text class="iconfont icon-more-info u-font-36 u-m-r-16"></text>
						<text class="u-font-36">{{$t('客服中心')}}</text>
					</view>
					<view class="top-link-tabs flex-center " style="margin-bottom: 16px;">
						<view class="n-tab_item" @click="changeTab(index)" :class="current == index ? 'active':''"
							v-for="(item,index) in caterange">
							<text class="item-text">{{item.text}}</text>
						</view>
					</view>
					<view class="about-content">
						<view class="m-font-b u-m-b-20">{{caterange[current].text}}</view>
						<template v-if="ruleType == 6">
							<view class="art-body" v-html="web_rule_common_6"></view>
						</template>
						<template v-if="ruleType == 2">
							<view class="art-body" v-html="web_rule_common_2"></view>
						</template>
						<template v-if="ruleType == 7">
							<view class="art-body" v-html="web_rule_common_7"></view>
						</template>
						<template v-if="ruleType == 8">
							<view class="art-body" v-html="web_rule_common_8"></view>
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
				<view class="container">
					<uniNavHeader isback :title="this.$t('客服中心')"></uniNavHeader>
					<view class="bs-wrapper">
						<view class="u-flex u-row-between w_100">
							<view class="help-top-1" @click="$go('/pages/ucenter/openai')">
								<view class="text">
									<view class="m-font-18">{{$t('text1')}}</view>
									<view class="u-c-g m-font-16 u-m-t-16">{{$t('text2')}}</view>
								</view>
								<view class="bottom-bg"></view>
							</view>
							<view class="help-top-1 u-m-l-14" @click="platUrl($t('help-top-link-2'))">
								<view class="text">
									<view class="m-font-18">{{$t('text3')}}</view>
									<view class="u-c-g m-font-16 u-m-t-16">{{$t('text4')}}</view>
								</view>
								<view class="bottom-bg2"></view>
							</view>
						</view>
						<view class="help-top-2 u-m-t-14" @click="common_copy($t('text6'))">
							<view class="text">
								<view class="m-font-18">{{$t('text5')}}</view>
								<view class="u-c-g m-font-16 u-m-t-16">{{$t('text6')}}</view>
							</view>
							<view class="bottom-bg3"></view>
						</view>
						<view class="u-flex u-row-center u-m-t-40 u-m-b-30">
							<image src="@/static/images/index/emoji01.png" mode="" style="width: 20px;height: 20px;">
							</image>
							<view class="u-m-l-10">{{$t("常见问题")}}</view>
						</view>
						<uni-collapse ref="collapse" v-model="collvalue">
							<uni-collapse-item class="collapseClass" :marketV2="true" :open="true">
								<template v-slot:title>
									<view class="flex-1 m-font-16">{{$t('游戏规则')}}</view>
								</template>
								<view class="help-content u-p-16">
									<view class="art-body u-c-g" v-html="web_rule_common_6"></view>
								</view>
							</uni-collapse-item>
							<uni-collapse-item class="collapseClass" :marketV2="true">
								<template v-slot:title>
									<view class="flex-1 m-font-16">{{$t('什么是逆向策略')}}</view>
								</template>
								<view class="help-content u-p-16">
									<view class="art-body u-c-g" v-html="web_rule_common_2"></view>
								</view>
							</uni-collapse-item>
							<uni-collapse-item class="collapseClass" :marketV2="true">
								<template v-slot:title>
									<view class="flex-1 m-font-16">{{$t('如何申请代理')}}</view>
								</template>
								<view class="help-content u-p-16">
									<view class="art-body u-c-g" v-html="web_rule_common_7"></view>
								</view>
							</uni-collapse-item>
							<uni-collapse-item class="collapseClass" :marketV2="true">
								<template v-slot:title>
									<view class="flex-1 m-font-16">{{$t('其他游戏说明')}}</view>
								</template>
								<view class="help-content u-p-16">
									<view class="art-body u-c-g" v-html="web_rule_common_8"></view>
								</view>
							</uni-collapse-item>
						</uni-collapse>
						<!-- <view class="help-select-bar u-m-t-30">
							<view class="help-select">
								<uni-data-select v-model="cateValue" :localdata="caterange" @change="catechange"
									:clear="false">
								</uni-data-select>
							</view>
						</view>
						<view class="help-body u-m-t-30 h_300_x">
							<uni-collapse accordion ref="collapse" v-model="collvalue">
								<uni-collapse-item>
									<template v-slot:title>
										<view>{{caterange[current].text}}</view>
									</template>
									<view class="help-content">
										<template v-if="ruleType == 6">
											<view class="art-body" v-html="web_rule_common_6"></view>
										</template>
										<template v-if="ruleType == 2">
											<view class="art-body" v-html="web_rule_common_2"></view>
										</template>
										<template v-if="ruleType == 7">
											<view class="art-body" v-html="web_rule_common_7"></view>
										</template>
										<template v-if="ruleType == 8">
											<view class="art-body" v-html="web_rule_common_8"></view>
										</template>
									</view>
								</uni-collapse-item>
							</uni-collapse>
						</view> -->
					</view>
				</view>
			</view>
		</template>
		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	import pcSideTrade from "@/components/pc-side-trade/trade.vue"

	export default {
		components: {
			uniNavHeader,
			listEmpty,
			pcNavHeader,
			pcBg,
			pcSideBar,
			pcSideTrade
		},
		data() {
			return {
				cateValue: 0,
				current: 0,
				caterange: [{
						value: 0,
						text: `1.${this.$t('游戏规则')}`
					},
					{
						value: 1,
						text: `2.${this.$t('什么是逆向策略')}`
					},
					{
						value: 2,
						text: `3.${this.$t('如何申请代理')}`
					},
					{
						value: 3,
						text: `4.${this.$t('其他游戏说明')}`
					},
				],
				collvalue: "0",
				ruleType: 6
			}
		},
		async onLoad() {
			this.getRule_common(6);
			this.getRule_common(2);
			this.getRule_common(7);
			this.getRule_common(8);
			uni.setNavigationBarTitle({
				title: this.$t('客服中心')
			});
		},
		methods: {
			changeTab(e) {
				this.current = e;
				switch (e) {
					case 0:
						this.ruleType = 6;
						this.getRule_common(6);
						break;
					case 1:
						this.ruleType = 2;
						this.getRule_common(2);
						break;
					case 2:
						this.ruleType = 7;
						this.getRule_common(7);
						break;
					case 3:
						this.ruleType = 8;
						this.getRule_common(8);
						break;
					default:
						break;
				}
			},
			parentMenu() {
				this.menuToggle()
			},
			catechange(e) {
				this.current = e;
				switch (e) {
					case 0:
						this.ruleType = 6;
						this.getRule_common(6);
						break;
					case 1:
						this.ruleType = 2;
						this.getRule_common(2);
						break;
					case 2:
						this.ruleType = 7;
						this.getRule_common(7);
						break;
					case 3:
						this.ruleType = 8;
						this.getRule_common(8);
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
	.help-body {
		::v-deep .uni-collapse-item__title-text {
			color: #ffffff;
			font-size: 16px;
		}

		::v-deep .uni-icons {
			color: var(--link-color) !important;
		}
	}

	.left-select {
		height: calc(100vh - 120px);
		background-image: var(--help-left-select-bg);
	}

	.left-select .left-select-item {
		padding: 15px 5px 15px 30px;
	}

	.left-select .left-select-active-item {
		background-color: var(--left-select-active-item-bg);
	}

	.right-text {
		background-color: #fff;
		height: calc(100vh - 120px);
		width: 100%;
		padding: 30px;
		overflow-x: scroll;
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
	.about-content {
		background: #312B4F;
		border-radius: 16px;
		padding: 16px;

	}

	.help-top-1 {
		position: relative;
		width: 50%;
		height: 286rpx;
		background-image: url('@/static/images/help/bg.png');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		background-color: rgba(62, 54, 100, 1);
		border-radius: 16px;
		overflow: hidden;
		padding: 15px;
	}
	
	.help-top-1::before {
		content: '';
		position: absolute;
		border-radius: 16px;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(to bottom, rgba(62, 54, 100, .68), rgba(62, 54, 100, .68));
	}

	.help-top-1 .bottom-bg {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 100px;
		height: 85px;
		background-image: url('@/static/images/help/1-right.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		z-index: 1;
	}
	
	.help-top-1 .bottom-bg2 {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 100px;
		height: 85px;
		background-image: url('@/static/images/help/2-right.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		z-index: 1;
	}
	
	.help-top-1 .text {
		position: relative;
		z-index: 2;
	}
	
	.help-top-2 {
		position: relative;
		width: 100%;
		height: 192rpx;
		background-image: url('@/static/images/help/bg-2.png');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		background-color: rgba(62, 54, 100, 1);
		border-radius: 16px;
		overflow: hidden;
		padding: 15px;
	}
	
	.help-top-2 .bottom-bg3 {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 100px;
		height: 85px;
		background-image: url('@/static/images/help/3-right.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		z-index: 1;
	}
	
	.help-top-2::before {
		content: '';
		position: absolute;
		border-radius: 16px;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(to bottom, rgba(62, 54, 100, .68), rgba(62, 54, 100, .68));
	}
	
	.help-top-2 .text {
		position: relative;
		z-index: 2;
	}
	
</style>
