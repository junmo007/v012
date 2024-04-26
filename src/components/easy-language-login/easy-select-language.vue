<template>
	<view class="easy-select" @click.stop="trigger" :style="[easySelectSize]">
		<view class="input-box u-flex u-row-between">
			<view class="u-flex">
				<image :src="icon" mode="widthFix"></image>
				<view>{{value}}</view>
			</view>
			<view class="iconfont icon-dw u-p-t-4"></view>
		</view>
		<u-popup v-model="showOptions" mode="center" width="90%" :mask-custom-style="maskStyle" :closeable="true"
			z-index="8888" borderRadius="30">
			<view class="showOptionsClass">
				<view v-for="(item,index) in lang" :key="`lang${index}`" :class="index > 0 ? 'u-m-t-30' : 'u-m-t-20'">
					<view class="u-flex u-row-between u-p-16" @click.stop="select(item)"
						:class="currentSelect.label === item.label ? 'lang-item' : ''">
						<view class="u-flex">
							<image :src="item.icon" style="width:30px;height:20px" mode=""></image>
							<view class="u-m-l-16">{{item.label}}</view>
						</view>
						<image src="@/static/images/skin/bluelight/lan-select.png" style="width:20px;height:20px;"
							mode="widthFix" v-if="currentSelect.label === item.label"></image>
					</view>
				</view>
			</view>
		</u-popup>
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
			width: '100px',
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
				optionsGroupMargin: '',
				maskStyle: {
					"zIndex": "8888",
					"top": '0',
					"transform": 'scale(1)',
					"background": 'rgba(0, 0, 0, 0.8)'
				}
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
		width: 100px;
		height: 30px;
		border: 1px solid #ccc;
		border-radius: 28px;
		font-size: 12px;
		padding: 0 10px;
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
		width: 25px;
		border-radius: 5px;
	}

	.easy-select {
		position: relative;
		/* color: var(--navbar-color); */
		outline: none;
	}

	.easy-select .easy-select-suffix {
		position: absolute;
		box-sizing: border-box;
		height: 100%;
		right: 6px;
		top: -2px;
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
		position: absolute;
		padding: 20px 15px;
		background: #49558f;
		box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.0400);
		border-radius: 10px;
		box-sizing: border-box;
		transform-origin: center top;
		z-index: 2238;
		width: 150%;
		right: 0;
		bottom: 55px;
		transform: translateY(130%);
		transition: .3s all;
		opacity: 0;
		visibility: hidden;
	}

	.easy-select .easy-select-options.show {
		transform: translateY(150%);
		opacity: 1;
		visibility: visible;
	}

	.easy-select .easy-select-options-item {
		padding: 15px 0px;
		position: relative;
		white-space: nowrap;
		font-size: 14px;
		border-bottom: 1px solid #ccc;
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

	.showOptionsClass {
		padding: 30px 20px 20px 20px;
		background: #49558f;
	}

	.lang-item {
		border: 3px solid transparent;
		border-image: linear-gradient(90deg, #F4DAB4, #F5892B) 1;
		border-radius: 5px;
		clip-path: inset(0 0 round 5px);
	}
</style>
