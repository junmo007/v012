<template>
	<view class="">
		<u-mask :show="mask_show" :mask-click-able="false">
			<slot>
				<view style="width:100%;height:100%;" class="flex-center bar_content">
					<view   class="bar_content_img flex-center" :style="{'width':back_width+'px','height':back_height+'px'}">
						<view class="upd_title">{{upd.title}}</view>
						<view style="width:100%;">
							<view class="upd_content">{{upd.content}}</view>
						</view>
						<view style="opacity: 0;">0</view>
						<view style="opacity: 0;">0</view>
					</view>
				</view>
			</slot>
		</u-mask>
	</view>
</template>

<script>
	export default {
		name: "",
		components: {},
		props: {
			
		},
		data() {
			return {
				mask_show:false,
				back_width:700,
				back_height:614,
				upd:{
				},
			}
		},
		computed:{
			navs(){
				return [
					
				]
			}
		},
        mounted() {
			this.get_img_width()
			// this.get_upd_data(); 系统维护公告弹窗-正式版
		},
		methods: {
			get_img_width(){
				let _this = this
				uni.getSystemInfo({
				    success: function (res) {
						if(res.windowWidth < 990){
							let img_width = res.windowWidth * 0.9
							_this.back_height = (1.26 * img_width).toFixed(2) //1.26 是原图尺寸
							_this.back_width = img_width
						}
				    }
				});
			},
			// 系统维护公告弹窗
			// async get_upd_data(){
			// 	let res = await this.$u.api.get_upd_data_p();
			// 	if (res && res.data){
			// 		this.mask_show = res.data ? true : false ;
			// 		this.upd = res.data
			// 	}
			// }
		}
	};
</script>

<style lang="scss" scoped>

	.bar_content{
		justify-content:center;
	}
	.bar_content_img{
		color:#fff;
		background-image: url('../../static/images/upd_back.png');
		background-size:100% 100%;
		background-repeat: no-repeat;
		display:flex;
		flex-direction:column;
		justify-content:space-between;
		padding:30px 30px;
	}
	.upd_title{
		width:85%;
		text-align:center;
		font-size:30px;
		word-wrap:break-word;
	}
	.upd_content{
		width:60%;
		font-size:18px;
		word-wrap:break-word;
	}
	
	@media (max-width:990px) {
		.bar_content{
			justify-content:center;
		}
		.bar_content_img{
			color:#fff;
			background-image: url('../../static/images/upd_back_mobile.png');
			background-size:100% 100%;
			background-repeat: no-repeat;
			display:flex;
			flex-direction:column;
			justify-content:space-between;
			padding:30px 30px;
		}
		.upd_title{
			text-align:center;
			font-size:24px;
			word-wrap:break-word;
		}
		.upd_content{
			width:60%;
			font-size:14px;
			word-wrap:break-word;
		}
	}
</style>
