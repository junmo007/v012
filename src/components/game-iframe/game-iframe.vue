<template>
	<view>
		<view class="iframeClass">
			<u-icon name="more-circle" color="#999" size="50" class="top-icon" @click="gameMenu = !gameMenu"></u-icon>
			<view class="right-mune m-c-w" v-if="gameMenu">
				<view class="iconfont icon-guanbi2" style="font-size: 26px;" @click="gameMenuClose"></view>
				<view class="iconfont icon-qianbao m-m-t-10" style="font-size: 26px;" @click="goRe"></view>
				<view class="iconfont icon-zhuye m-m-t-10" style="font-size: 26px;" @click="goHo"></view>
			</view>
			<iframe name="iframeGame" id="gameIframeId iframe" :src="iframeUrl" frameborder="0" width="100%" height="100%"
				scrolling="no"></iframe>
				
			<template v-if="isThirdGame">
				<view class="loading-box">
					<view class="loading-wrapper">
						<view class="loading-third"></view>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				iframeHeight: '245px',
				gameMenu: false,
				isThirdGame: true
			}
		},
		props: {
			iframeUrl: {
				type: String,
				default: ''
			}
		},
		mounted() {
			// this.iframeHeight = (window.innerHeight - 108) + 'px';
			// this.iframeHeight = window.innerHeight + 'px';
			// console.log(this.iframeHeight,'window.innerHeight');
			setTimeout(_=>{
				this.isThirdGame = false;
			},3000);
		},
		methods: {
			gameMenuClose(){
				this.gameMenu = false;
				this.$emit('gameMenuClose');
			},
			goRe(){
				this.gameMenu = false;
				this.$go('/pages/ucenter/recharge');
			},
			goHo(){
				this.gameMenu = false;
				this.$go('/pages/index/index');
			}
		}
	}
</script>

<style lang="scss">
	.iframeClass {
		position: relative;
		height: 100vh;
		width: 100vw;
		background: var(--body-bg);
	}
	
	.top-icon {
		position: fixed;
		top: 30px;
		right: 30px;
	}
	
	.right-mune {
		width: 36px;
		height: 120px;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: fixed;
		top: 63px;
		right: 30px;
		padding: 26 16px;
		border-radius: 5px;
		background: rgba(0, 0, 0, .2);
	}
	
	.m-m-t-10 {
		margin-top: 10px;
	}
	
	.loading-box {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		min-height: 100vh;
		background: var(--body-bg);
		user-select: none;
		z-index: 9999;
		overflow: hidden;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	@media (min-width: 750px) {
		.loading-box {
			width: 465px;
			margin: 0 50%;
			-webkit-transform: translateX(-50%);
			transform: translateX(-50%);
		}
	}
	
	.loading-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -30%);
		display: flex;
		flex-direction: column;
	}
	
	.loading-third {
		// border: 10px solid #3a347e;
		border: 10px solid var(--loading-third-bg);
		border-radius: 50%;
		border-top: 10px solid var(--body-bg);
		width: 85px;
		height: 85px;
		-webkit-animation: spin .7s linear infinite;
		animation: spin .7s linear infinite;
	}
	
	@-webkit-keyframes spin {
		0% {
			-webkit-transform: rotate(0deg);
		}
	
		100% {
			-webkit-transform: rotate(360deg);
		}
	}
	
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
	
		100% {
			transform: rotate(360deg);
		}
	}
</style>
