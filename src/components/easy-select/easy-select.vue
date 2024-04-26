<template>
	<view class="easy-select" @click.stop="trigger" :style="[easySelectSize]">
		<input type="text" v-model="value" :placeholder="$t(placeholder)" disabled clearable>
		<view class="easy-select-suffix" :style="{border: '1px solid rgba（0,0,0,0)'}">
			<view class="easy-select-down-tag cur_pointer">
				<view class="iconfont icon-up"></view>
			</view>
		</view>
		<view class="easy-select-options" v-if="showOptions"
			:style="{'min-width': boundingClientRect.width + 'px', top: optionsGroupTop, margin: optionsGroupMargin}">
			<scroll-view scroll-y="true" class="scroll-Y">
				<view class="easy-select-options-item" v-for="item in options" :key="item.value"
					@click.stop="select(item)" :class="{active: currentSelect.label === item.label}">
					<view class="u-flex">
						<image :src="item.flag" style="width: 20px;height: 14px;border-radius: 3px;" mode=""></image>
						<view class="easy-select-label u-m-l-10">{{item.label}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="u-tips" v-if="showOptions" @click="tipsClick"></view>
	</view>
</template>

<script>
	/**
	 * easy-select
	 * @author Snoop zhang
	 * @description Select Component
	 * */
	const COMPONENT_NAME = 'easy-select'
	const MAX_OPTIONS_HEIGHT = 137 // 修改务必也修改easy-select-options的css部分
	const OPTIONS_ITEM_HEIGHT = 33 // 修改务必也修改easy-select-options-item的css部分
	const OPTIONS_MARGIN = 10
	const OPTIONS_PADDING = 6 * 2 + 2 // + 2是border
	const OPTIONS_OTHER_HEIGHT = OPTIONS_MARGIN + OPTIONS_PADDING
	const STORAGE_KEY = '_easyWindowHeight'
	const SIZE = {
		'medium': {
			width: '240px',
			height: '40px'
		},
		'small': {
			width: '200px',
			height: '30px'
		},
		'mini': {
			width: '160px',
			height: '30px'
		}
	}

	export default {
		name: COMPONENT_NAME,
		props: {
			windowHeight: {
				type: [Number, String],
				default: 0
			},
			placeholder: {
				type: String,
				default: '请选择'
			},
			value: {
				type: String,
				default: 'options'
			},
			flag: {
				type: String,
				default: 'options'
			},
			size: {
				type: String,
				default: 'medium'
			},
			options: {
				type: Array,
				default () {
					return [{
						value: 'options',
						label: 'options'
					}, {
						value: 'options2',
						label: 'options'
					}, {
						value: 'options3',
						label: 'options'
					}, {
						value: 'options4',
						label: 'options'
					}, {
						value: 'options5',
						label: 'options'
					}]
				}
			}
		},
		data() {
			return {
				showOptions: false,
				boundingClientRect: {},
				currentSelect: {},
				optionsGroupTop: 'auto',
				optionsGroupMargin: ''
			}
		},
		computed: {
			showSuffix() {
				return this.showOptions ? 'showOptions' : 'no-showOptions'
			},
			easySelectSize() {
				let size = this.size.toLowerCase()
				if (size in SIZE) {
					return {
						width: SIZE[size].width,
						height: SIZE[size].height
					}
				} else {
					return {}
				}
			}
		},
		mounted() {
			const elQuery = uni.createSelectorQuery().in(this)
			elQuery.select('.easy-select').boundingClientRect(data => {
				this.boundingClientRect = data
			}).exec();
			try {
				if (!this.windowHeight) {
					const storageHeihgt = this.$helper.get(STORAGE_KEY)
					if (storageHeihgt) {
						this.easyWindowHeight = storageHeihgt
						return
					}
					const res = uni.getSystemInfoSync();
					this.easyWindowHeight = res.windowHeight
					this.$helper.set(STORAGE_KEY, this.easyWindowHeight)
				}
			} catch (e) {
				// error
			}
		},
		methods: {
			trigger(e) {
				const view = uni.createSelectorQuery().in(this)
				view.select('.easy-select').fields({
					rect: true
				}, data => {
					let {
						top,
						bottom
					} = data
					const thresholdHeight = Math.min(MAX_OPTIONS_HEIGHT + OPTIONS_MARGIN, (this.options.length *
							OPTIONS_ITEM_HEIGHT) +
						OPTIONS_OTHER_HEIGHT)
					bottom = Number(this.windowHeight || this.easyWindowHeight) - (top + this.boundingClientRect
						.height) // 距离底部的距离等于视口的高度减上top加select组件的高度

					// judge direction
					if (bottom < thresholdHeight) {
						this.optionsGroupDirection = 'up'
						this.optionsGroupTop = -thresholdHeight - 12 + 'px'
						this.optionsGroupMargin = '0'
					} else {
						this.optionsGroupDirection = 'down'
						this.optionsGroupTop = 'auto'
						this.optionsGroupMargin = '10px 0 0 0'
					}

					// if (this.scrollTop < )
					this.showOptions = !this.showOptions
				}).exec();
			},
			select(options) {
				this.showOptions = false;
				this.currentSelect = options;
				this.$emit('selectOne', options);
			},
			tipsClick() {
				return this.showOptions ? 'showOptions' : 'no-showOptions'
			},
			hideOptions() {
				this.showOptions = false
			}
		}
	}
</script>

<style scoped>
	.easy-select {
		position: relative;
		border: 1px solid #dcdfe6;
		border-radius: 4px;
		/* font-size: 28rpx; */
		color: var(--navbar-color);
		outline: none;
		box-sizing: content-box;
		height: 26px;
	}

	.easy-select input {
		padding: 0 10rpx;
		padding-right: 30rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		height: 100% !important;
		min-height: 100% !important;
	}

	.easy-select .easy-select-suffix {
		position: absolute;
		box-sizing: border-box;
		height: 100%;
		right: 5px;
		top: 0;
		display: flex;
		align-items: center;
		transform: rotate(180deg);
		transition: all .3s;
		transform-origin: center;
	}

	.easy-select .showOptions {
		transform: rotate(0) !important;
	}

	.easy-select .no-showOptions {
		transform: rotate(180deg) !important;
	}

	.easy-select .easy-select-options {
		width: 68px;
		text-align: center;
		position: absolute;
		padding: 6px 0;
		margin-top: 10px;
		left: -28px;
		border-radius: 4px;
		background: #312B4F;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		box-sizing: border-box;
		transform-origin: center top;
		z-index: 2238;
	}

	.scroll-Y {
		max-height: 176px;
	}

	/* 改=================== */
	.easy-select .easy-select-options-item {
		padding: 0 20rpx;
		position: relative;
		white-space: nowrap;
		font-size: 14px;
		color: #606266;
		height: 33px;
		line-height: 33px;
		box-sizing: border-box;
	}

	.easy-select .active {
		background: #4D4886;
	}
	
	.easy-select .active .easy-select-label {
		color: #fff;
	}

	.easy-select-down-tag {
		line-height: 1;
	}

	.easy-select-down-tag .iconfont {
		font-size: 12px;
	}

	.u-tips {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 998;
	}
	
	.easy-select-label {
		color: var(--body-color);
	}
</style>
