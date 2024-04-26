<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader isback :title="$t('public1')" @clickLeft="menuClick"></uniNavHeader>
			<!-- sidebar -->
			<view class="sidebar" :class="sideshow?'is-show':''">
				<uniSideHeader @menuClick="menuClick" nIndex="99"></uniSideHeader>
			</view>
			<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
			<!-- 弹幕效果 -->
			<l-barrage ref="lBarrage" @end="" :minTop="8" :maxTop="12" @end="endBarrage"></l-barrage>
			<view class="index-main">
				<!-- 轮播图 -->
				<view class="index-banner flex u-m-b-30">
					<view class="flex_bd u-skeleton-fillet">
						<swiper class="doanload-swiper" :indicator-dots="true" :autoplay="true"
							indicator-active-color="var(--bar-gradient)" :interval="7000" :duration="500">
							<swiper-item v-for="(item,index) in bannerList" :key="`list${index}`">
								<view class="doanload-swiper-banner" :style="{'background-image': `url(${item.img})`}">
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<!-- 安卓 下载列表 -->
				<view class="u-flex doan_hd u-col-center">
					<view class="leftLine"></view>
					<view class="rightText u-m-l-20 m-font-b">{{$t('安卓')}}</view>
				</view>
				<view>
					<view class="u-flex u-row-between u-m-t-30" v-for="(item,index) in an_arr" :key="`an_arr${index}`"
						:class="index > 0 ? '' : ''">
						<view class="u-flex">
							<image :src="item.icon" class="leftImg" mode="aspectFill"></image>
							<view class="u-m-l-30 u-c-9 u-line-2">{{$t(item.name)+': '+item.desc}}</view>
						</view>
						<view class="u-text-center u-m-l-30">
							<view class="doan-btn" @click="platUrl(item.link)">{{$t('下载')}}</view>
							<view class="u-c-9" style="font-size: 10px;">{{item.num+$t('次')}}</view>
						</view>
					</view>
				</view>
				<!-- IOS 下载列表 -->
				<view class="u-flex doan_hd u-col-center u-m-t-50">
					<view class="leftLine"></view>
					<view class="rightText u-m-l-20 m-font-b">{{$t('苹果')}}</view>
				</view>
				<view>
					<view class="u-flex u-row-between u-m-t-30" v-for="(item,index) in ios_arr" :key="`ios_arr${index}`"
						:class="index > 0 ? '' : ''">
						<view class="u-flex">
							<image :src="item.icon" class="leftImg" mode="aspectFill"></image>
							<view class="u-m-l-30 u-c-9 u-line-2">{{$t(item.name)+': '+item.desc}}</view>
						</view>
						<view class="u-text-center u-m-l-30">
							<view class="doan-btn" @click="platUrl(item.link)">{{$t('下载')}}</view>
							<view class="u-c-9" style="font-size: 10px;">{{item.num+$t('次')}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	import lBarrage from '@/components/l-barrage/l-barrage.vue'
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			pcBg,
		},
		data() {
			return {
				href: '',
				sideshow: false,
				doanload: '',
				img: "",
				iosBut: '0',
				androidIos: null, // 1安卓 2IOS
				platformIntroduction: '',
				dataArr: [],
				an_arr: [],
				ios_arr: [],
				bannerList: [],
				listData: [],
				lBarrage: []
			}
		},
		onLoad() {
			this.getBanner();
			this.getDownData();
		},
		async onShow() {
			this.getModel();
			// this.getWithStatus(); 测试用户禁止进入该页面
			uni.setNavigationBarTitle({
				title: this.$t('App下载')
			});
		},
		methods: {

			getBanner() {
				this.$u.api.banner_p().then(ret => {
					if (ret && ret.code == 1) {
						if (!this._isMobile()) {
							for (let key in ret.data['mobile']) {
								if (ret.data['mobile'][key].lang == this.$helper.getLang() && ret.data['mobile'][
										key
									].show_position == 4) {
									this.bannerList.push(ret.data.mobile[key]);
								}
							}
						} else {
							if (ret.data['mobile'].length > 0) {
								for (let key in ret.data['mobile']) {
									if (ret.data['mobile'][key].lang == this.$helper.getLang() && ret.data[
											'mobile'][key].show_position == 4) {
										this.bannerList.push(ret.data.mobile[key]);
									}
								}
							}
						}
					}
				});
			},
			async getDownData() {
				let res = await this.$u.api.down_data_p();
				if (res && res.code == 1) {
					if(res.data.barrage){
						this.$refs.lBarrage.start(res.data.barrage);
						let barrage = res.data.barrage;
						for (let i in barrage) {
							setTimeout(_ => {
								this.$refs.lffBarrage.add({
									item: barrage[i].desc
								});
							}, 2000)
						}
					}
					this.an_arr = res.data.android;
					this.ios_arr = res.data.mac;
				}
			},
			endBarrage(){
				this.getDownData();
			},
			getWithStatus() {
				if (this.$helper.get('userInfo').sc_date == 1) {
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}
			},
			getModel() {
				switch (uni.getSystemInfoSync().platform) {
					case 'android':
						this.androidIos = 1;
						break;
					case 'ios':
						this.androidIos = 2;
						break;
					default:
						this.androidIos = 1;
						break;
				}
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			// 安卓下载
			androidDownload() {
				window.location.href = this.doanload.android_download_url;
			},
			// IOS下载
			iosDownload() {
				if (this.iosBut == 0) {
					window.location.href = this.doanload.ios_download_url;
					this.iosBut = 1;
				} else {
					// window.location.href = '../static/js/embedded.mobileprovision';//本地描述文件会过期
					window.location.href = 'https://www.pgyer.com/app/getProvisionFile';
				}
			},
			async getDoanload() {
				let ret = await this.$u.api.doanload_p();
				if (ret) {
					this.doanload = ret.data;
				}
			},
		}
	}
</script>

<style lang="scss">
	.index-main {
		padding-top: 60px;
	}

	.doan_hd .leftLine {
		width: 8px;
		height: 18px;
		background: var(--bar-gradient);
	}

	.leftImg {
		min-width: 40px;
		min-height: 40px;
		max-width: 40px;
		max-height: 40px;
		border-radius: 5px;
	}

	.doan-btn {
		background: linear-gradient(to bottom, #80df36, #539323);
		min-width: 80px;
		text-align: center;
		padding: 5px 5px;
		border-radius: 5px;
	}

	.doanload-swiper {
		height: 300px;
		margin: 0 -15px;
	}

	.doanload-swiper-banner {
		border-radius: var(--card-radius);
		height: 300px;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		margin: 0 -15px;
	}
</style>
