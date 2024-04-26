<template>
	<view class="pc-aside" :class="isOpen?'aside-open':'aside-close'">
		<view class="aside-arrow" @click="menu" v-if="!isOpen">
			<u-icon name="arrow-right-double" color="#4c4882" size="28"></u-icon>
		</view>
		<view class="aside-top u-flex " @click="menu">
			<view class="iconfont icon-menun header-menun-class u-m-r-30 cur_pointer">
			</view>
			<image src="../../static/images/pc/aside-logo.png" mode="widthFix"></image>
		</view>
		<view class="aside-link u-flex u-m-b-20">
			<view class="flex-1">
				<view class="cur_pointer">
					<image src="../../static/images/pc/photo-ball.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="flex-1">
				<view class="cur_pointer" @click="$go('/pages/luckyDraw/luckyDraw')">
					<image src="../../static/images/pc/photo-wheel.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="aside-button u-m-b-40">
			<button class="btn btn-block btn--submit" @click="$go('/pages/ucenter/vipClub')">VIP</button>
		</view>
		<view class="aside-navbar u-m-b-40">
			<view class="navbar-label u-m-b-10">
				{{$t('体育比赛')}}
			</view>
			<view class="u-m-b-20">
				<view class="u-flex side-item cur_pointer" v-for="(item,index) in userMenu1" :key="`userMenu${index}`"
					:class="item.pageIndex == pageIndex ? 'side-item-acitve' : ''" @click="$go(item.url)">
					<text class="iconfont u-font-40" :class="item.icon"></text>
					<text class="u-p-text u-p-l-30">{{$t(item.text)}}</text>
				</view>
			</view>
		</view>
		<view class="aside-navbar">
			<view class="navbar-label u-m-b-10">
				{{$t('9D Earn')}}
			</view>
			<view class="u-m-b-20">
				<view class="u-flex side-item cur_pointer" v-for="(item,index) in userMenu2" :key="`userMenu${index}`"
					:class="item.pageIndex == pageIndex ? 'side-item-acitve' : ''" @click="$go(item.url)">
					<text class="iconfont u-font-40" :class="item.icon"></text>
					<text class="u-p-text u-p-l-30">{{$t(item.text)}}</text>
				</view>
				<!-- <view class="u-flex side-item cur_pointer" @click="toRescue">
					<u-image width="20px" height="16px" src="@/static/images/pc/side/kefu.png">
					</u-image>
					<view class="u-p-text u-p-l-20">{{$t("Online customer service")}}
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				balanceShow: false,
				userMenu1:[
					{
						text: '市场列表',
						icon: "icon-a-soccersolid",
						url: '/pages/market/index',
						pageIndex: 0
					},{
						text: 'menu5',
						icon: "icon-a-soccersolid",
						url: '/pages/gameResults/index',
						pageIndex: 5
					},
				],
				userMenu2: [
					{
						text: 'agent37',
						icon: "icon-user-multiple",
						url: '/pages/wsCenter/team',
						pageIndex: 2
					}, {
						text: 'menu1',
						icon: "icon-target--shop",
						url: '/pages/market/index',
						pageIndex: 1
					},
					{
						text: 'menu9',
						icon: "icon-arrow-roadmap",
						url: '/pages/activityHall/index',
						pageIndex: 9
					}, {
						text: 'menu8',
						icon: "icon-graph-bar",
						url: '/pages/wsCenter/index',
						pageIndex: 8
					}, {
						text: '支持',
						icon: "icon-f_per_help",
						url: '/pages/help/help',
						pageIndex: 3
					}, {
						text: '邀请好友',
						icon: "icon-business-handshake",
						url: '/pages/invte/invte',
						pageIndex: 4
					},{
						text: '关于我们',
						icon: "icon-more-info",
						url: '/pages/ucenter/about',
						pageIndex: 6
					}
				],
				sideShow:true
			}
		},
		props: {
			pageIndex: {
				type: Number,
				default: 99
			}
		},
		activated() {
			this.userBalance = this.$helper.get('userBalance');
		},
		mounted() {
			this.userBalance = this.$helper.get('userBalance');
			this.headUserVip = this.$helper.get('userInfo').level_name;
			this.getUserHeader();
		},
		methods: {
			menu(){
				this.menuToggle()
				this.$emit('menu-event');
			}
		}
	}
</script>

<style lang="scss">
	.side-item{
		position: relative;
		padding: 0 15px;
		height: 46px;
		display: flex;
		align-items: center;
		font-size: 0;
		.u-p-text{
			font-size: 16px;
		}
		::after{
			content: '';
			height: 1px;
			background-color: #4c4882;
			position: absolute;
			left: 46px;
			bottom: 0;
			right: 0;
		}
	}
	.navbar-label{
		padding: 0 10px;
		font-size: 13px;
	}
	.aside-link{
		padding:0 5px;
		height: 90px;
		.flex-1{
			padding:0 4px;
			font-size: 0;
		}
		image{
			width: 100%;
		}
	}
	.pc-aside{
		z-index: 22;
		position: fixed;
		left: 0;
		top:0;
		bottom: 0;
		width: 268px;
		background-color: #312B4F;
		border-right: 1px solid #3E3664;
		transition:all .3s;
	}
	.pc-aside.aside-close{
		transform: translateX(-268px);
	}
	
	
	.header-menun-class {
		padding: 10px;
		color: #D1CCE9;
		border-radius: 50%;
		background-color: #413D71;
	}
	.side-item-acitve{
		background-color: #1E1739;
	}
	.aside-top{
		height: 60px;
		padding: 0 10px;
	}
	.aside-top image{
		width: 160px;
	}
	
	.aside-button{
		padding: 0 10px;
		.btn{
			height: 46px;
		}
	}
	
	.aside-arrow{
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		right: -20px;
		top: 45%;
		transform: translateY(-50%);
		background-color: #312B4F;
		width: 20px;
		height: 50px;
		cursor: pointer;
		border-radius: 0 30px 30px 0;
		border-right: 1px solid #3E3664;
	}
	
	
	
	
</style>
