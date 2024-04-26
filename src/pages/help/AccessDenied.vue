<template>
	<view class="container" >
		<uniNavHeader :title="this.$t('帮助中心')" ></uniNavHeader>
		<view class="bs-content access-content u-text-center">
			<view class="acc-top u-m-b-40">
				<view class="u-flex u-row-center">
					<u-image :src="$t('favicon')" width="24px" height="24px" class="cur_pointer u-m-r-20"></u-image>
					<view class="webConent">
						<view class="webNameFont">{{$t('web_name')}}</view>
					</view>
				</view>
				<view class="name-v">Access Denied</view>
			</view>
			<view class="acc-bar_row u-flex u-row-center u-m-b-30">
				<view class="acc-label text-gray">Your IP Address :</view>
				<view class="acc-bar highlight">China - ShangHai(192.168.1.1)</view>
			</view>
			<view class="acc-pic u-m-b-30">
				<image src="@/static/images/skin/default/AccessDenied.png" mode="widthFix"></image>
			</view>
			<view class="acc-card fan-card u-m-b-30">
				根据您所在地区的法律法规,我们无法为您提供服务,
				给您造成的不便,敬请见谅,如有任何疑问,请联系24小
				时在线客服或联系项目组,我们将竭诚为您服务
			</view>
			<view class="acc-btn-row u-flex u-row-center u-m-b-60">
				<view class="btn btn--blue">联系客服</view>
				<view class="btn btn--default">尝试访问</view>
			</view>
			<view class="cooper-list flex">
				<view class="col">
					<image src="@/static/images/skin/default/hz1.png" mode=""></image>
					<view class="coop-label">合作商1P artners 1</view>
				</view>
				<view class="col">
					<image src="@/static/images/skin/default/hz2.png" mode=""></image>
					<view class="coop-label">合作商1P artners 1</view>
				</view>
				<view class="col">
					<image src="@/static/images/skin/default/hz1.png" mode=""></image>
					<view class="coop-label">合作商1P artners 1</view>
				</view>
				<view class="col">
					<image src="@/static/images/skin/default/hz2.png" mode=""></image>
					<view class="coop-label">合作商1P artners 1</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	export default {
		components: {
			uniNavHeader,
			listEmpty
		},
		data() {
			return {}
		},
		onLoad() {
			uni.onWindowResize((res) => {
				this.Width = res.size.windowWidth
			});
		},
		methods: {
			catechange(e) {
				console.log("e:", e);
			},
		}
	}
</script>

<style lang="scss">
	.acc-bar_row{
		font-size: 12px;
		.acc-bar {
			padding: 6px 12px;
			border-radius: 5px !important;
			background-color: var(--form-main-uni-easyinput__content);
			border: var(--easyinput__border) !important;
			box-shadow: var(--shadow-bg);
			margin-left: 10px;
		}
	}
	.acc-btn-row .btn{
		height: 36px;
		width: 110px;
		margin: 0 10px;
	}
	.acc-card{
		padding: 16px;
		margin: 0 20px;
	}
	.acc-pic image{
		width: 198px;
	}
	.acc-top{
		.name-v{
			font-weight: bold;
			font-size: 30px;
		}
	}
	.cooper-list{
		.col{
			width: 25%;
			text-align: center;
		}
		image{
			width: 50px;
			height: 50px;
			border-radius: 50px;
		}
		.coop-label{
			font-size: 12px;
			margin-top: 8px;
		}
	}
	.access-content {
		min-height:calc(100vh - 60px);
		margin-top: 60px;
	}

	/* #ifdef MY-SKIN-LIGHT */
	.container {
		::v-deep .uni-navbar {
			background: #ffffff;
		}
	}
	page{
		background-color: #ffffff!important;
	}
	/* #endif */
	
</style>
