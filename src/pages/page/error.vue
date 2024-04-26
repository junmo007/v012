<template>
	<view class="page-out">
		<view class="uni-padding-wrap uni-common-mt">
			<view class="u-flex u-row-center u-m-t-40">
				<image src="../page/img/matter.png" mode="widthFix" style="width: 180px;"></image>
			</view>
			<view class="u-text-center matter-text">Z ... ZZZ ... ZZZZ</view>
			<view class="u-text-center matter-info">There is a little problem with your network, please click the button
				below, and then send the screenshot to our customer service, so that our engineers can solve your
				network failure more quickly, thank you.</view>
				
				<template v-if="network">
					
					<view class="err">
						<view class="errItem u-m-t-30" v-if="network.country || network.city || network.region">
							<view class="left">city :</view>
							<view class="right">{{network.country + ' ~	 ' + network.city + ' ~	 ' + network.region}}</view>
						</view>
						<view class="errItem" v-if="network.asn">
							<view class="left">asn :</view>
							<view class="right">{{network.asn}}</view>
						</view>
						<view class="errItem" v-if="network.longitude || network.latitude">
							<view class="left">latitude and longitude :</view>
							<view class="right">{{network.longitude + ' ~	 ' + network.latitude}}</view>
						</view>
						<view class="errItem" v-if="network.isp">
							<view class="left">isp :</view>
							<view class="right">{{network.isp}}</view>
						</view>
						<view class="errItem" v-if="network.ip">
							<view class="left">ip :</view>
							<view class="right">{{network.ip}}</view>
						</view>
						<view class="errItem" v-if="errUrl">
							<view class="left">URL :</view>
							<view class="right">{{errUrl}}</view>
						</view>	
						<view class="errItem" v-if="errMsg">
							<view class="left">errMsg :</view>
							<view class="right">{{errMsg}}</view>
						</view>
					</view>
				</template>
				
				<view class="u-text-center matter-info u-m-t-30 u-flex flex--direction u-row-center">
					<view>Device Information :</view>
					<view class="">{{userAgent}}</view>
				</view>
					
			<!-- <view style="background:#FFFFFF; padding:40rpx;" class="uni-center">
				<icon type="warn" size="46" class="uni-common-mb uni-common-mt" />
				<view class="uni-hello-text uni-common-mt">{{$t('Network load failed')}}</view>
				<block>
					<view class="uni-hello-text uni-center uni-common-mt">{{$t('Please check your network')}}</view>
					<view class="uni-hello-text uni-center uni-common-mt" v-if="errUrl">URL:{{errUrl}}</view>
					<view class="uni-hello-text uni-center uni-common-mt" v-if="errMsg">{{errMsg}}</view>
				</block>
			</view> -->
			<view class="uni-btn-v uni-common-mt">
				<button type="primary" @tap="platUrl('https://whoer.net')">{{$t('GO to check')}}</button>
				<button type="default" class="u-m-t-20" @tap="home">{{$t('Reconnect')}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				errUrl: '',
				errMsg: '',
				userAgent: '',
				network: {}
			}
		},
		onLoad(query) {
			this.errUrl = this.$helper.get('showErrorUrl');
			this.errMsg = this.$helper.get('showErrorMsg');
			this.userAgent = navigator.userAgent;
			uni.request({
				url: 'https://api.ip.sb/geoip',
				success: (res) => {
					this.network = res.data;
				}
			});
		},
		methods: {
			home() {
				this.$helper.clear();
				window.location.href = "/"
			}
		}
	}
</script>

<style scoped>
	.uni-padding-wrap {
		color: #fff;
		padding: 0 30rpx;
	}

	.uni-common-mt {
		margin-top: 30rpx;
	}

	.uni-common-mb {
		margin-bottom: 30rpx;
	}

	.uni-hello-text {
		color: #7A7E83;
	}

	.uni-center {
		text-align: center;
	}

	/* 竖向百分百按钮 */
	.uni-btn-v {
		padding: 10rpx 0;
	}

	.uni-btn-v button {
		margin: 20rpx auto;
		width: 60%;
	}

	.matter-text {
		margin-top: 14px;
		font-size: 26px;
	}
	
	.matter-info {
		font-size: 16px;
	}
	
	.err .errItem {
		display: flex;
		border-left: 1px solid #ccc;
		border-right: 1px solid #ccc;
		border-top: 1px solid #ccc;
	}
	
	.err .errItem view {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	
	.err .errItem:first-child {
		border-radius: 5px 5px 0 0;
	}
	
	.err .errItem:last-child {
		border-radius: 0 0 5px 5px;
		border-bottom: 1px solid #ccc;
	}
	
	.err .errItem .left {
		min-width: 38%;
		border-right: 1px solid #fff;
		padding: 8px;
		font-weight: bold;
		color: #999;
	}
	
	.err .errItem .right {
		width: 100%;
		padding: 8px;
	}
</style>
