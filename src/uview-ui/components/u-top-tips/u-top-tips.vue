<template>
	<view class="u-tips" :class="[isType?'u-' + type:'skin-bg', isShow ? 'u-tip-show' : '']" :style="{
		top: navbarHeight + 'px',
		zIndex: uZIndex,
		borderRadius: tipsBorderRadius + 'px'
	}">
		<!-- width: tipsWidth + '%', -->
		<view class="u-flex u-row-between u-col-center w_100">
			<view>{{ title }}</view>
			<view style="width: 40px;height: 40px;padding: 15px 0 0 15px;">
				<view class="circle-box">
					<view class="circle_process" v-if="isShow">
					  <view class="wrapper right">
					    <view class="circle rightcircle"></view>
					  </view>
					  <view class="wrapper left">
					    <view class="circle leftcircle" id="leftcircle"></view>
					  </view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * topTips 顶部提示
	 * @description 该组件一般用于页面顶部向下滑出一个提示，尔后自动收起的场景。
	 * @tutorial https://www.uviewui.com/components/topTips.html
	 * @property {String Number} navbar-height 导航栏高度(包含状态栏高度在内)，单位PX
	 * @property {String Number} z-index z-index值（默认975）
	 * @example <u-top-tips ref="uTips"></u-top-tips>
	 */
	export default {
		name: "u-top-tips",
		props: {
			// 导航栏高度，用于提示的初始化
			navbarHeight: {
				type: [Number, String],
				// #ifndef H5
				default: 0,
				// #endif
				// #ifdef H5
				default: 44,
				// #endif
			},
			// z-index值
			zIndex: {
				type: [Number, String],
				default: ''
			},
			// 是否使用type主题
			isType: {
				type: Boolean,
				default: true
			},
			// 宽度
			tipsWidth: {
				type: String,
				default: '100'
			},
			// 外边距
			tipsMargin: {
				type: String,
				default: '0'
			},
			// 圆角
			tipsBorderRadius: {
				type: String,
				default: '0'
			}
		},
		data() {
			return {
				timer: null, // 定时器
				isShow: false, // 是否显示消息组件
				title: '', // 组件中显示的消息内容
				type: 'primary', // 消息的类型（颜色不同），primary，success，error，warning，info
				duration: 3000, // 组件显示的时间，单位为毫秒
			};
		},
		computed: {
			uZIndex() {
				return this.zIndex ? this.zIndex : this.$u.zIndex.topTips;
			}
		},
		methods: {
			show(config = {}) {
				// 先清除定时器（可能是上一次定义的，需要清除了再开始新的）
				clearTimeout(this.timer);
				// 时间，内容，类型主题(type)等参数
				if (config.duration) this.duration = config.duration;
				if (config.type) this.type = config.type;
				this.title = config.title;
				this.isShow = true;
				// 倒计时
				this.timer = setTimeout(() => {
					this.isShow = false;
					clearTimeout(this.timer);
					this.timer = null;
				}, this.duration);
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../libs/css/style.components.scss";
	
	view {
		box-sizing: border-box;
	}

	// 顶部弹出类型样式
	.u-tips {
		height: 62px;
		width: calc(100% - 30px);
		position: fixed;
		z-index: 1;
		padding: 20rpx 30rpx;
		color: #ffffff;
		font-size: 28rpx;
		left: 0;
		right: 0;
		@include vue-flex;
		align-items: center;
		justify-content: center;
		margin-left: 15px;
		margin-top: 15px;
		opacity: 0;
		// 此处为最核心点，translateY(-100%)意味着将其从Y轴隐藏（隐藏到顶部(h5)或者说导航栏(app)下面）
		transform: translateY(-200%);
		transition: all 0.35s linear;
	}
	
	@media (min-width: 900px) {
		.u-tips {
			width: 460px;
			margin: 0 auto;
		}
	}

	.u-tip-show {
		transform: translateY(0);
		opacity: 1;
		z-index: 99;
	}

	.u-primary {
		background: $u-type-primary;
	}

	.u-success {
		background: $u-type-success;
	}

	.u-warning {
		background: $u-type-warning;
	}

	.u-error {
		background: $u-type-error;
	}

	.u-info {
		background: $u-type-info;
	}
	
	.skin-bg {
		background: rgba(26, 26, 34, .89);
		box-shadow: 0px 5px 18px 0px rgba(23,123,74,0.1400);
		border-radius: 10px;
	}
	// 提示圈圈
	.circle-box{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		background: #0C0D0F;
		border-radius: 50%;
	}
	.circle_process {
	    position: relative;
	    width: 12px;
	    height: 12px;
	  }
	  .circle_process .wrapper {
	    width: 6px;
	    height: 12px;
	    position: absolute;
	    top: 0;
	    overflow: hidden;
	  }
	  .circle_process .right {
	    right: 0;
	  }
	  .circle_process .left {
	    left: 0;
	  }
	  .circle_process .circle {
	    width: 12px;
	    height: 12px;
	    border: 2px solid var(--doanload-color-1);
	    border-radius: 50%;
	    box-sizing: border-box;
	    position: absolute;
	    top: 0;
	    transform: rotate(-135deg);
	  }
	  .circle_process .rightcircle {
	    border-top: 2px solid transparent;
	    border-right: 2px solid transparent;
	    right: 0;
	    -webkit-animation: circle_right 3.1s linear infinite;
	  }
	  .circle_process .leftcircle {
	    border-bottom: 2px solid transparent;
	    border-left: 2px solid transparent;
	    left: 0;
	    -webkit-animation: circle_left 3.1s linear infinite;
	  }
	  @-webkit-keyframes circle_right {
	    0% {
	      -webkit-transform: rotate(-135deg);
	    }
	    50%,
	    100% {
	      -webkit-transform: rotate(45deg);
	    }
	  }
	  @-webkit-keyframes circle_left {
	    0%,
	    50% {
	      -webkit-transform: rotate(-135deg);
	    }
	    100% {
	      -webkit-transform: rotate(45deg);
	    }
	  }
</style>
