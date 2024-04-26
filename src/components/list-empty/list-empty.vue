<template>
	<view>
		<view class="u-flex-col u-row-center" :style="{height:listHighly+'px'}">
			<template v-if="isDefault">
				<view class="u-flex u-row-center">
					<view>
						<view class="u-flex u-row-center">
							<image class="positionAuto" :src="defaultImg" mode="">
							</image>
						</view>
						<view class="m-font-16 u-text-center u-m-t-50">{{$t(fullLiftText)}}</view>
					</view>
				</view>
			</template>
			<template v-else>
				<u-empty :text="$t(text)" :mode="list"></u-empty>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		name: "empty",
		props: {
			text: {
				type: String,
				default: '暂无数据'
			},
			list: {
				type: String,
				default: 'list'
			},
			listHighly: {
				type: Number,
				default: 300
			},
			isDefault: {
				type: Boolean,
				default: false
			},
			defaultImg: {
				type: String,
				default: '../../static/images/index/empty.png?a=1',
			},
			fullLiftText: {
				type: String,
				default: '暂无数据'
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.Auto {
		margin: 0 auto;
	}

	.positionAuto {
		height: 125px;
		width: 125px;
		margin: 0 auto;
		// background: var(--body-bg);
	}
</style>
