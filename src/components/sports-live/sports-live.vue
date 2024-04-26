<template>
	<view>
		<view id="dplayer" style="width:100%;height:245px"></view>
	</view>
</template>

<script>
	import DPlayer from 'dplayer';
	import Hls from 'hls.js';
	export default {
		props: {
			videoURL1: {
				type: String,
				default: ''
			},
			lang: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				dplayer: null
			}
		},
		mounted() {

		},
		destroyed() {
			// this.dplayer.destroy();
		},
		methods: {
			dplayerChange(videoURL) {
				this.dplayer = new DPlayer({
					container: document.getElementById('dplayer'),
					live: true, //是否直播
					hotkey: true, //热键
					autoplay: true, //是否自动播放
					lang: this.lang ? 'zh-cn' : 'en', //设置语言
					video: {
						url: videoURL,
						type: "customHls", //这一步必须要写，播放直播流
						customType: {
							customHls: function(video, player) {
								const hls = new Hls();
								hls.loadSource(video.src);
								hls.attachMedia(video);
							},
						},
					}
				});
			}
		}
	}
</script>
