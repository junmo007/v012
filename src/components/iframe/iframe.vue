<template>
	<view>
		<view class="iframeClass">
			<iframe name="iframeFB" id="iframeId" :src="iframeUrl" frameborder="0" width="100%" height="275px"
				scrolling="no"></iframe>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				iframeHeight: '245px'
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
		},
		methods: {
			closeLivePop() {
				this.$emit('closeLivePop', false);
			}
		}
	}
</script>

<style lang="scss">
	.iframeClass {
		max-height: 280px;
		background: var(--bs-popup-hd);
	}
</style>
