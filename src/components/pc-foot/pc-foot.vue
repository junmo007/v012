<template>
	<view class="index-footer">
		<view class="index-foot-main">
			<view class="foot-row u-flex u-col-top">
				<view class="foot-col">
					<view class="foot-label u-font-36 u-m-b-32">
						{{$t('联系我们')}}
					</view>
					<view class="foot-item-info text-D1CCE9">
						<view class="item">{{$t('聊天支持')}}</view>
						<view class="item">{{$t('FeedbackEmail')}}</view>
					</view>
				</view>
				<view class="foot-col">
					<view class="foot-label u-font-36 u-m-b-50">
						{{$t('分享')}}
					</view>
					<view class="share-link u-flex u-m-b-50">
						<view class="share-item">
							<image src="../../static/images/pc/TikTok.png" mode=""></image>
						</view>
						<view class="share-item">
							<image src="../../static/images/pc/telegram.png" mode=""></image>
						</view>
						<view class="share-item">
							<image src="../../static/images/pc/vk.png" mode=""></image>
						</view>
						<view class="share-item">
							<image src="../../static/images/pc/instgram.png" mode=""></image>
						</view>
						<view class="share-item">
							<image src="../../static/images/pc/Facebook.png" mode=""></image>
						</view>
					</view>
					<view class="share-store">
						<view class="store-card">
							<image src="../../static/images/pc/appstore.png" mode=""></image>
							<view class="flex_bd">
								App Store
							</view>
						</view>
						<view class="store-card">
							<image src="../../static/images/pc/playstore.png" mode=""></image>
							<view class="flex_bd">
								Play Store
							</view>
						</view>
					</view>
				</view>
				<view class="foot-end">
					<view class="foot-label u-font-36 u-m-b-32">
						{{$t('帮助我们改善产品体验')}}
					</view>
					<view class="faq-body u-m-b-30">
						<textarea placeholder-style="color:var(--text-light)" class="faq-textarea"
							:placeholder="$t('FeedbackText1')" cols="20" v-model="faqText"
							rows="10"></textarea>
					</view>
					<view class="faq-foot u-flex">
						<view class="faq-button">
							<button class="btn btn--default" @click="getfeedback(faqText)">{{$t('留言')}}</button>
						</view>
						<view class="flex_bd text-gray">
							{{$t('或给我们发电子邮件')}}: <text class="text-yellow" @click="platUrl($t('FeedbackEmailUrl'))">{{$t('FeedbackEmail')}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="foot-row">
				<image src="../../static/images/pc/foot-cooper.png" mode="widthFix" class="foot-coopertion"></image>
			</view>
			<view class="foot-row">
				<view class="foot-content text-light">
					{{$t('indexBottomInfo2')}}
				</view>
			</view>
			<view class="foot-row">
				<image src="../../static/images/pc/foot-end.png" mode="widthFix" class="foot-coopertion"></image>
			</view>
			<view class="foot-row">
				<view class="foot-content text-light">
					{{$t('indexBottomInfo')}}
				</view>
			</view>
		</view>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080"></u-top-tips>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				faqText:'',
				rule:{}
			}
		},
		mounted() {
			this.rule = this.$helper.get('rule');
		},
		props: {},
		methods: {
			async getfeedback(content) {
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.feedback_add_p({
					content
				});
				if (res) {
					uni.hideLoading();
					this.faqText = '';
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
				}
			},
		}
	}
</script>

<style lang="scss">
	.foot-item-info{
		line-height: 24px;
	}
	.text-D1CCE9{
		color: #D1CCE9;
	}
	.index-footer {
		margin-left: 268px;
		background-color: #312B4F;
	}
	.foot-coopertion{
		width: 1022px;
	}
	.index-foot-main{
		max-width: 1100px;
		padding: 40px 0 40px 40px;
	}
	.foot-row{
		margin-bottom: 32px;
		&:last-child{
			margin-bottom: 0;
		}
	}
	.foot-col{
		flex: 1;
	}
	.foot-content{
		line-height: 24px;
	}
	.faq-body{
		.faq-textarea{
			border-radius: 16px;
			border: 1px solid #644CBC;
			width: 342px;
			height: 72px;
			padding: 10px;
		}
	}
	.faq-button{
		margin-right: 10px;
		.btn{
			border-radius: 8px;
			padding: 6px 16px;
			min-width: 94px;
			text-align: center;
		}
	}
	
	.share-item{
		margin-right:24px;
		cursor: pointer;
		image{
			width: 20px;
			height: 20px;
		}
	}
	
	.foot-end{
		width: 342px;
	}
	.share-store{
		display: flex;
		align-items: center;
	}
	.store-card{
		display: flex;
		align-items: center;
		margin-right: 10px;
		padding: 0 12px;
		height: 40px;
		border-radius: 10px;
		border:1px solid rgba(255, 255, 255, .1);
		image{
			width: 22px;
			height: 22px;
			margin-right: 10px;
		}
	}
	
	
	
	
	
	
</style>
