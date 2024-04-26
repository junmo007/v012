<template>
	<view class="g-container">
		<view class="g-banner">
			<image src="@/static/images/skin/default/guide_banner.jpg" mode="widthFix"></image>
		</view>
		<view class="g-footer">
			<view class="fan-card">
				<view class="g-label highlight u-m-b-30 u-strong">{{$t('FIFA World Cup Qatar 2022')}}</view>
				<u-count-down :show-days="true" :timestamp="timestamp" separator="colon" separator-size="60"
					font-size="30" bg-color="var(--guid-time-bg)" color="#ffffff" separator-color="#ffffff"></u-count-down>
				<view class="time-list u-flex">
					<view class="col">{{$t('DAYS')}}</view>
					<view class="col">{{$t('HOURS')}}</view>
					<view class="col">{{$t('MINUTES')}}</view>
					<view class="col">{{$t('SECONDS')}}</view>
				</view>
			</view>
			<view class="g-fined-footer">
				<view class="fan-arrow">
					<view class="bounceInLeft box-arrow animated" @click="$go('/pages/index/index')"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				timestamp: 4492800,
			}
		},
		async onLoad() { },
		methods: {
			catechange(e) {
				console.log("e:", e);
			},
		}
	}
</script>

<style lang="scss">
	.box-arrow{
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
			padding: 20px 0px;
			width: 40px;
			text-align: center;
			margin: 0 11px;
		}
	}

	.g-footer {
		position: absolute;
		width: 100%;
		bottom: 0;
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
		image {
			width: 100%;
		}
	}

	.g-fined-footer {
		position: fixed;
		bottom: 20px;
		left: 20px;
		right: 20px;
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
</style>
