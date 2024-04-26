<script>
	export default {
		onLaunch: function(e) {
			let showError = this.$helper.get('showError');
			// if (showError) {
			// 	uni.reLaunch({
			// 		url:"/pages/page/error"
			// 	})
			// }
		},

	}
</script>
<style lang="scss">
	@import url("/static/css/skin_blue_light.css");

	/*每个页面公共css */
	@import url("@/static/fonts/iconfont.css");
	@import url("/static/css/common.css");
	@import "uview-ui/index.scss";

	page {
		color: #fff;
		font-size: 14px;
		min-height: 100vh;
		background: #1e1739;
		background-color: #1e1739;
		padding-top: constant(safe-area-inset-top);
		padding-top: env(safe-area-inset-top);
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		@font-face {
			font-family: 'TTHoves-Black';
			src: url('@/static/fonts/TTHoves-Regular.ttf');
		}
		font-family: 'TTHoves-Black',serif;
	}

	.content {
		min-height: 100vh;
		color: var(--body-color);
		background: var(--body-bg);
	}

	html {
		--status-bar-height: 0px;
		--top-window-height: 0px;
		--window-left: 0px;
		--window-right: 0px;
		--window-margin: 0px;
		--window-top: calc(var(--top-window-height) + 0px);
		--window-bottom: calc(70px + env(safe-area-inset-bottom));
	}
	
</style>
