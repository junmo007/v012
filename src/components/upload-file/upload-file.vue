<template>
	<view>
		<uni-file-picker v-model="imageValue" file-mediatype="image" mode="grid" file-extname="png,jpg,jpeg" :limit="1"
			@success="success" @fail="fail" :sourceType="['album']" :image-styles="imageStyles">
			选择
		</uni-file-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue: [],
				imageStyles: {
					height: 60, // 边框高度
					width: 60, // 边框宽度
					border: '1px solid #ccc'
				}
			}
		},
		methods: {
			// 上传成功
			success(e) {
				console.log('上传成功', e);
			},
			// 上传失败
			fail(e) {
				console.log('上传失败：', e);
			}
		}
	}
</script>

<style>

</style>
