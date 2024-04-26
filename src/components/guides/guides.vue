<template>
	<view class="content">
		<view class="g-container">
			<view class="g-banner">
				<video
					src="https://d25osm21z7okmc.cloudfront.net/storage/img/20240421/5f7880ecccb1a5bb275cee14a7a5f8a2.mp4"
					:controls="false" object-fit="cover" ref="videoPlayer" :enable-progress-gesture="false"
					:vslide-gesture-in-fullscreen="false" style="width: 100vw;height: 100vh;"
					@loadedmetadata="videoLoad" :muted="false"></video>
			</view>
			<!-- <view class="g-icon">
				<u-icon name="volume-up-fill" size="44" v-if="!muted" @click="soundChange(true)"></u-icon>
				<u-icon name="volume-off-fill" size="44" v-if="muted" @click="soundChange(false)"></u-icon>
			</view> -->
			<view class="video-mask" v-if="videoMask"></view>
			<view class="g-bottom">
				<view class="u-text-center u-m-t-20">{{$t('距欧洲锦标赛剩余时间')}}</view>
				<view class="u-flex u-row-center u-m-t-30 u-m-b-30">
					<u-count-down :show-days="true" :timestamp="timestamp" separator="guides" separator-size="60"
						font-size="30" bg-color="var(--guid-time-bg)" color="#ffffff" separator-color="#ffffff">
					</u-count-down>
				</view>
				<!-- <view class="u-text-center text-yellow u-m-b-30">{{countdown + $t('秒后将自动进入程序')}}</view> -->
				<view class="guides-btn" @click="hideGuide">{{$t('跳过')+' '+countdown+'s'}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				timestamp: 0,
				countdown: 5,
				count: '',
				muted: true,
				videoMask: true
			}
		},
		mounted() {
			this.getTime();
			this.count = setInterval(() => {
				if (this.countdown > 1) {
					this.countdown -= 1;
				} else {
					return
				}
			}, 1000);
			setTimeout(_ => {
				this.hideGuide();
			}, 5000);
		},
		methods: {
			getTime() {
				var nowTime = Date.now();
				// 世界杯北京时间 - 当前时间
				this.timestamp = 1718294400 - Math.ceil(nowTime / 1000);
			},
			hideGuide() {
				this.muted = true;
				clearInterval(this.count);
				this.$emit('guideChange', false);
			},
			videoLoad() {
				this.videoMask = false;
				this.$refs.videoPlayer.play();
			},
			soundChange(e) {
				this.muted = e;
			}
		}
	}
</script>

<style lang="scss">
	.g-bottom {
		position: absolute;
		bottom: 40px;
		right: 15px;
		left: 15px;
		z-index: 2;
	}

	.g-icon {
		position: absolute;
		top: 30px;
		right: 15px;
		z-index: 2;
	}

	.box-arrow {
		display: inline-flex;
		width: 50px;
		height: 50px;
		background-position: center;
		background-repeat: no-repeat;
		background-size: contain;
		background-image: var(--arrow-bg);
	}

	.time-list .col {
		width: 70px;
		text-align: center;
		font-weight: bold;
		font-size: 12px;
		margin-top: 10px;
	}

	.g-container {
		position: relative;
		height: 100vh;
		overflow: hidden;
		padding-top: constant(safe-area-inset-top);
		padding-top: env(safe-area-inset-top);

		::v-deep .u-countdown-time {
			font-weight: bold
		}

		::v-deep .u-countdown {
			padding: 0 5px;
		}

		::v-deep .u-countdown-colon {
			font-size: 20px !important;
		}

		::v-deep .u-countdown-item {
			flex-direction: column !important;
			width: 63px !important;
			height: 63px !important;
			background-color: #1E1739 !important;
			border: 1px solid #644CBC !important;
			border-radius: 16px !important;
		}
	}

	.g-footer {
		position: absolute;
		width: 100%;
		bottom: 20px;
		left: 0;
		border-radius: 8px 8px 0 0;
		padding: 0 18px;
		color: #ffffff;
		background: var(--card-style);

		.fan-card {
			padding: 16px;
			margin-top: -20px;
		}
	}

	.g-banner {
		width: 100vh;
		height: 100vh;
	}

	.video-mask {
		width: 150px;
		height: 150px;
		background-color: #000;
		position: absolute;
		z-index: 15;
		left: calc(50% - 75px);
		top: calc(50% - 75px);
	}

	.g-fined-footer {
		position: fixed;
		bottom: 20px;
		left: 20px;
		right: 20px;
	}

	@media (min-width: 750px) {
		.g-fined-footer {
			cursor: pointer;
			width: 440px;
			margin: 0 auto;
		}
	}

	.fan-arrow {
		padding: 10px 0 20px 0;
		font-size: 0;
		text-align: right;

		image {
			width: 45px;
			height: 45px;
		}
	}

	@-webkit-keyframes bounceInLeft {

		0%,
		60%,
		75%,
		90%,
		to {
			-webkit-animation-timing-function: cubic-bezier(.215, .61, .355, 1);
			animation-timing-function: cubic-bezier(.215, .61, .355, 1)
		}

		0% {
			opacity: 0;
			-webkit-transform: translate3d(-200px, 0, 0);
			transform: translate3d(-200px, 0, 0)
		}

		60% {
			opacity: 1;
			-webkit-transform: translate3d(25px, 0, 0);
			transform: translate3d(25px, 0, 0)
		}

		75% {
			-webkit-transform: translate3d(-10px, 0, 0);
			transform: translate3d(-10px, 0, 0)
		}

		90% {
			-webkit-transform: translate3d(5px, 0, 0);
			transform: translate3d(5px, 0, 0)
		}

		to {
			-webkit-transform: none;
			transform: none
		}
	}

	@keyframes bounceInLeft {

		0%,
		60%,
		75%,
		90%,
		to {
			-webkit-animation-timing-function: cubic-bezier(.215, .61, .355, 1);
			animation-timing-function: cubic-bezier(.215, .61, .355, 1)
		}

		0% {
			opacity: 0;
			-webkit-transform: translate3d(-200px, 0, 0);
			transform: translate3d(-200px, 0, 0)
		}

		60% {
			opacity: 1;
			-webkit-transform: translate3d(25px, 0, 0);
			transform: translate3d(25px, 0, 0)
		}

		75% {
			-webkit-transform: translate3d(-10px, 0, 0);
			transform: translate3d(-10px, 0, 0)
		}

		90% {
			-webkit-transform: translate3d(5px, 0, 0);
			transform: translate3d(5px, 0, 0)
		}

		to {
			-webkit-transform: none;
			transform: none
		}
	}

	.bounceInLeft {
		-webkit-animation-name: bounceInLeft;
		animation-name: bounceInLeft
	}

	.animated {
		-webkit-animation-duration: 1s;
		animation-duration: 1s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both
	}

	.guides-btn {
		text-align: center;
		padding: 20px 24px;
		border-radius: 16px;
		background: rgba(233, 174, 58, 1);
	}
</style>
