<template>
	<view class="easy-select" @click.stop="trigger" :style="[easySelectSize]">
		<view class="input-box flex-center u-flex">
			<image :src="icon"></image>
			<view class="m-font-16 u-m-l-10">{{value}}</view>
		</view>
		<!-- <view class="easy-select-suffix" :class="[showSuffix]">
			<view class="iconfont icon-dw u-m-b-8"></view>
		</view> -->
		<view class="easy-select-options" :class="showOptions?'show':''">
			<!-- <view class="iconfont icon-close u-abso icon-close-position"></view> -->
			<!-- <scroll-view scroll-y="true" style="max-height: 200px;"> -->
			<view class="easy-select-options-item flex-center u-flex" v-for="(item,index) in lang"
				:key="`${index}`+ 'lang'" @click.stop="select(item)"
				:class="currentSelect.label === item.label?'active':''">
				<image :src="item.icon"></image>
				<text>{{item.label}}</text>
				<!-- <text class="iconfont icon-dui text-orange" v-if="currentSelect.label === item.label"></text> -->
			</view>
			<!-- </scroll-view> -->
		</view>
		<view :class="showOptions?'u-lang-tips':''"></view>
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
		'header': {
			width: '90px',
			height: '30px'
		},
		'mini': {
			width: '100%',
			height: '35px'
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
				default: 'CN'
			},
			icon: {
				type: String,
				default: '../../static/images/cn.png'
			},
			size: {
				type: String,
				default: 'medium'
			},
			options: {
				type: Array,
				default () {
					return []
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
			lang() {
				let _this = this;
				let options = [];
				let selecValue = this.$helper.getLang();
				let all_lang = this.$helper.get('alllang');
				if (all_lang != null) {
					for (let i = 0; i < all_lang.length; i++) {
						options.push(all_lang[i]);
						if (selecValue == all_lang[i].value) {
							_this.currentSelect = all_lang[i];
						}

					}
				}
				return options;
			},
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
				this.$emit('showLang', false)
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
				this.showOptions = false
				this.currentSelect = options
				this.$emit('selectOne', options)
			},
			hideOptions() {
				this.showOptions = false;
			}
		}
	}
</script>

<style scoped>
	.input-box {
		width: 100%;
		height: 36px;
		border-radius: 8px;
		font-size: 12px;
		padding: 0 9px;
		background: rgba(49, 43, 79, 1);
	}

	.easy-select-down-tag {
		font-size: 0;
		line-height: 30px;
	}

	.easy-select-down-tag .iconfont {
		font-size: 12px;
		display: inline-block;
	}

	.input-box image {
		margin-right: 5px;
		width: 28px;
		height: 20px;
		border-radius: 3px;
	}

	.easy-select {
		position: relative;
		/* color: var(--navbar-color); */
		outline: none;
	}

	.easy-select input {
		padding: 0 18rpx;
		padding-right: 60rpx;
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
		right: 6px;
		top: 2px;
		display: flex;
		align-items: center;
		/* transform: rotate(180deg); */
		transition: all .3s;
		transform-origin: center;
	}

	.easy-select .showOptions {
		transform: rotate(180deg) !important;
	}

	.easy-select .no-showOptions {
		transform: rotate(0) !important;
	}

	.easy-select .easy-select-options {
		position: absolute;
		padding: 8px;
		background: #323547;
		box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.0400);
		border-radius: 10px;
		box-sizing: border-box;
		transform-origin: center top;
		z-index: 2238;
		width: 100%;
		right: 0;
		transition: .3s all;
		opacity: 0;
		visibility: hidden;
	}

	.easy-select .easy-select-options.show {
		/* transform: translateY(185%); */
		margin-top: 20px;
		opacity: 1;
		visibility: visible
	}

	.easy-select .easy-select-options-item {
		padding: 5px 2px;
		position: relative;
		white-space: nowrap;
		font-size: 14px;
		box-sizing: border-box;
		color: #fff;
		border: 1px solid transparent;
	}

	.active {
		border-radius: 8px;
		border: 1px solid #49558f !important;
		/* background-image: linear-gradient(180deg, #282E46 0%, #282E46 80%); */
	}

	.easy-select-options-item image {
		width: 28px;
		height: 20px;
		border-radius: 3px;
		margin-right: 5px;
	}

	.easy-select-options-item .iconfont {
		margin-left: auto;
	}

	.easy-select-options .icon-close {
		z-index: 88;
		padding: 12px;
	}

	.u-lang-tips {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
	}

	.icon-close-position {
		top: 0;
		right: 0;
	}
</style>
