<template>
	<view class="easy-select" @click.stop="trigger" :style="[easySelectSize]">
		<!-- <view class="input-box flex-center" style="display: flex;">
			<image :src="icon" mode="widthFix"></image> {{value}}
		</view> -->
		<!-- <view class="easy-select-suffix" :class="[showSuffix]">
			<view class="easy-select-down-tag"><text class="iconfont icon-arrup"></text></view>
		</view> -->
		
		
		<view class="u-flex u-row-between m-c-w menu-item-class u-m-t-30">
			<view class="u-flex">
				<image src="@/static/images/index/menu/11.png" style="height: 22px;width: 22px"></image>
				<view class="u-m-l-20 m-font-15">{{$t('语言')}}</view>
			</view>
			<view class="iconfont icon-right text-yellow"></view>
		</view>
		<!-- <view class="easy-select-options" v-if="showOptions" :style="{'min-width': boundingClientRect.width + 'px', top: optionsGroupTop, margin: optionsGroupMargin}"> -->
		<view class="easy-select-options" :class="showOptions?'show':''">
			<!-- <view class="iconfont icon-close u-abso" style="top: 0;right: 0;"></view> -->
			<image src="@/static/images/index/close.png"
				style="width: 32px;height: 32px;position: absolute;right: 15px;top: 7px;" mode="" @click="testPwd = false">
			</image>
			<view class="u-text-center" style="position: absolute;right: 15px;left: 15px;top: 12px;">
				{{$t('选择语言')}}
			</view>
			<!-- <scroll-view scroll-y="true" style="max-height: 400px;"> -->
				<view class="easy-select-options-item flex-center" style="display: flex;" v-for="(item,index) in lang"
					:key="`${index}`+ 'list'" @click.stop="select(item)"
					:class="currentSelect.label == item.label ? 'active' :''">
					<image :src="item.icon" width="28px" height="14px" mode="widthFix"></image><text>{{item.label}}</text>
					<text class="iconfont icon-dui text-orange" v-if="currentSelect.label === item.label"></text>
				</view>
			<!-- </scroll-view> -->
		</view>
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
		height: 35px;
		background: var(--btn-gray-color);
		border-radius: var(--card-radius);
		font-size: 12px;
		padding: 0 14px;
	}

	.easy-select-down-tag {
		font-size: 0;
		line-height: 1;
	}

	.easy-select-down-tag .iconfont {
		font-size: 12px;
		display: inline-block;
	}

	.input-box image {
		margin-right: 5px;
		width: 20px;
		height: 10px;
	}

	.easy-select {
		position: relative;
		color:var(--body-color);
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
		position: fixed;
		padding: 30px 20px 60px 20px;
		background: #1E1739;
		border-radius: 20px 20px 0px 0px;
		box-sizing: border-box;
		transform-origin: center top;
		z-index: 2238;
		width: 100%;
		left: 0;
		bottom: 0;
		transform: translateY(100%);
		transition: .3s all;
	}

	.easy-select .easy-select-options.show {
		transform: translateY(0);
	}

	.easy-select .easy-select-options-item {
		padding: 15px 0rpx;
		position: relative;
		white-space: nowrap;
		font-size: 14px;
		border-bottom: 1px solid #413D71;
		box-sizing: border-box;
	}

	.easy-select-options-item image {
		width: 28px;
		height: 14px;
		margin-right: 15px;
	}

	.easy-select-options-item .iconfont {
		margin-left: auto;
	}
	.easy-select-options .icon-close{
		z-index: 88;
		padding: 15px;
	}
	
</style>
