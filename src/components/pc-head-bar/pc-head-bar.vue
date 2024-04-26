<template>
	<view class="u-rela header-main">
		<view class="header-navbar">
			<view class="header-left">
				<view class="header-menun-class cur_pointer active u-m-r-20" @click="testLogin_go('/pages/index/index')">
					<text class="iconfont icon-house u-m-r-10"></text>
					<text>{{$t('主页')}}</text>
				</view>
				<view class="header-menun-class cur_pointer" @click="beforeSwitch">
					<text class="iconfont icon-a-soccerline"></text>
				</view>
			</view>
			<view class="header-right">
				<view class="header-menun-class cur_pointer u-flex" @click="testLogin_go('/pages/ucenter/recharge')">
					<view class="header-balance-class">
						<view class="u-strong">{{userBalance.balance1?userBalance.balance1+' ₽':'0.00 ₽'}}</view>
						<view class="iconfont icon-plus-square u-m-l-20"></view>
					</view>
				</view>
				<view class="header-menun-class cur_pointer u-m-l-20" @click="testLogin_go('/pages/ucenter/index')">
					<view class="header-user-class u-flex">
						<view class="flex_bd">
							<view class="">{{userInfo_common.username}}</view>
							<view class="u-m-t-5 highlight m-font-12">{{userInfo_common.level_name}}</view>
						</view>
						<image class="header-user-photo u-m-l-20" src="../../static/images/pc/userpic.png" mode=""></image>
					</view>
				</view>
				<view class="header-menun-class cur_pointer u-m-l-20" @click="testLogin_go('/pages/msg/index')">
					<text class="iconfont icon-bell1"></text>
				</view>
			</view>
		</view>
		
		<view class="u-flex u-row-between pc-header-bg" v-if="false">
			<view class="w_20">
				<image :src="$t('headerLeftImg')" class="cur_pointer headerLeftImgClass" mode="heightFix" @click="paBackHome"></image>
			</view>
			<view class="w_80">
				<view class="h_30 u-flex u-row-between">
					<view class="announHead u-flex m-rela" style="color: #FFC10E;">
						<image src="@/static/images/pc/msg.png"
							style="width:32px;height: 32px;margin-top: 8px;position: absolute;left: 20px" mode="">
						</image>
						<view class="m-line-1">{{$t('为了您的资金安全,请勿使用他人银行卡进行充值')}}</view>
					</view>
					<view class="u-flex">
						<view @click="$go('/pages/help/help')" class="cur_pointer hepl-btn">{{$t('帮助中心')}}
						</view>
						<view class="right-reg u-flex u-m-l-30">
							<view class="u-flex">
								<view class="m-c-w u-p-t-6">{{userBalance.balance?userBalance.balance:'-----'}}</view>
								<view class="iconfont cur_pointer icon-shuaxin cur_pointer u-m-l-10 m-c-w"
									style="transition: .3s all;" @click="getBalance"
									:class="balanceShow?'up-data':''"></view>
							</view>
							<view class="reg-btn cur_pointer" @click="testLogin_go('/pages/ucenter/recharge')">
								{{$t('user4')}}
							</view>
						</view>
						<view class="pc-header u-m-l-36 cur_pointer">
							<easySelect ref="easySelect" size="header" :value="selecValue" :icon="iconV"
								@selectOne="selectOne"></easySelect>
						</view>
					</view>
				</view>
				<view class="h_60 u-flex u-row-between">
					<!-- <view class="u-flex">
						<view v-for="(item,index) in tabslist" :key="`tabslist${index}`" class="game-tabs-item"
							@click="gameTabsChange(index,item.id)" v-if="tabslist.length > 0"
							:class="gameTabsCurrent == index ? 'game-item-active' : ''">
							<view class="u-flex">
								<view class="game-type">
									<view class="game-tabs-item-name">
										<view class="game-tabs-item-marquee">
											{{$t(item.name)}}
										</view>
									</view>
								</view>
								<view class="iconfont icon-dw u-m-l-4"></view>
							</view>
						</view>
					</view> -->
					<view></view>
					<view class="u-flex">
						<template v-if="userInfo_common">
							<!-- <uni-tooltip :content="$t('任务中心')"> -->
							<view class="u-m-r-14 cur_pointer head-btn m-line-1"
								@click="testLogin_go('/pages/share/index')">
								{{$t('任务中心')}}
							</view>
							<!-- <view class="u-m-r-14 cur_pointer head-btn" @click="testLogin_go('/pages/share/index')">
								<image :src="$t('rwzxt')" style="width: 110px;height: 22px;"></image>
							</view> -->

							<!-- </uni-tooltip> -->
							<!-- <uni-tooltip :content="$t('赛事结果')"> -->
							<view class="u-m-r-14 cur_pointer head-btn m-line-1"
								@click="testLogin_go('/pages/gameResults/index')">
								{{$t('赛事结果')}}
							</view>
							<!-- <view class="u-m-r-14 cur_pointer head-btn"
								@click="testLogin_go('/pages/gameResults/index')">
								<image :src="$t('ssjgt')" style="width: 110px;height: 22px;"></image>
							</view> -->
							<!-- </uni-tooltip> -->
							<!-- <uni-tooltip :content="$t('VIP中心')"> -->
							<view class="u-m-r-30 cur_pointer head-btn m-line-1"
								@click="testLogin_go('/pages/ucenter/vip')">
								{{$t('VIP中心')}}
							</view>
							<!-- <view class="u-m-r-30 cur_pointer head-btn" @click="testLogin_go('/pages/ucenter/vip')">
								<image :src="$t('vipzxt')" style="width: 110px;height: 22px;"></image>
							</view> -->
							<!-- </uni-tooltip> -->
						</template>
						<view class="u-flex" v-if="!userInfo_common">
							<uni-tooltip :content="$t('login')">
								<view class="pc-login-btn m-line-1" @click="$go('/pages/login/index')">{{$t('login')}}
								</view>
							</uni-tooltip>
							<uni-tooltip :content="$t('register')">
								<view class="pc-register-btn m-line-1" @click="$go('/pages/register/index')">
									{{$t('register')}}
								</view>
							</uni-tooltip>
						</view>
						<view class="u-flex user-box" v-if="userInfo_common">
							<u-image class="user-photo" width="45px" height="45px" borderRadius="50%"
								:src="userDefaultHeader" mode="widthFix">
								<u-loading slot="loading"></u-loading>
							</u-image>
							<view class="line-1 m-font-b u-m-l-12">
								<view class="">{{userInfo_common.username}}</view>
								<view class="u-flex u-m-t-2">
									<image style="width: 20px;height:18px;"
										src="@/static/images/skin/bluelight/gift2.png" mode="widthFix">
									</image>
									<view style="font-style: italic;color: #F7D4A4;">{{userInfo_common.level_name}}
									</view>
								</view>
							</view>
							<view class="user-menu">
								<view class="user-menu-item" v-for="(item,index) in userMenu" :key="`userMenu${index}`"
									@click="testLogin_go(item.url)">
									<view class="u-flex">
										<u-image width="15px" :src="item.icon" mode="widthFix">
										</u-image>
										<view class="u-p-b-12 u-p-l-26">{{$t(item.text)}}</view>
									</view>
									<view class="iconfont icon-right u-p-b-12"></view>
								</view>
								<view class="user-menu-item" @click="logout_common">
									<view class="u-flex">
										<u-image width="15px" src="@/static/images/pc/user-menu-7.png" mode="widthFix">
										</u-image>
										<view class="u-p-b-12 u-p-l-26">{{$t('退出登录')}}</view>
									</view>
									<!-- <view class="iconfont icon-right u-p-b-12"></view> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="top-game" v-if="gameData.length > 0">
			<view class="u-flex u-flex-nowrap u-m-b-50">
				<view v-for="(item,index) in gameData" :key="`gameData${index}`"
					class="game-item u-flex flex--direction u-row-between cur_pointer">
					<view class="u-p-20">
						<view class="game-name">{{$t(item.name)}}</view>
					</view>
					<image :src="item.icon" mode="widthFix" style="width: 139px;border-radius: 0 0 10px 10px"
						@click="item.g_id?gameClick(item.g_id,item.tc_code):gameWebClick(item.tc_id)">
					</image>
				</view>
			</view>
			<uni-pagination :show-icon="true" :total="gameCount" :pageSize="9" @change="paginationChange" />
		</view>
		<view class="top-game-close" v-if="gameClose" @click="gameCloseChange"></view>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
		</u-top-tips>
	</view>
</template>

<script>
	import easySelect from "@/components/easy-language-login/easy-select.vue"
	export default {
		components: {
			easySelect
		},
		data() {
			return {
				userMenu: [
					// {
					// 	text: '资金明细',
					// 	icon: require('@/static/images/pc/user-menu-1.png')
					// },
					{
						text: '注单记录',
						icon: require('@/static/images/pc/user-menu-2.png'),
						url: '/pages/tradeing/index',
						isOut: 0
					}, {
						text: 'menu9',
						icon: require('@/static/images/pc/user-menu-8.png'),
						url: '/pages/activityHall/index',
						isOut: 0
					}, {
						text: '安全中心',
						icon: require('@/static/images/pc/user-menu-3.png'),
						url: '/pages/ucenter/profile',
						isOut: 0
					}, {
						text: '卡片管理',
						icon: require('@/static/images/pc/user-menu-4.png'),
						url: '/pages/ucenter/bankCard',
						isOut: 0
					}, {
						text: '邀请好友',
						icon: require('@/static/images/pc/user-menu-5.png'),
						url: '/pages/invte/invte',
						isOut: 0
					}, {
						text: '消息',
						icon: require('@/static/images/pc/user-menu-6.png'),
						url: '/pages/msg/index',
						isOut: 0
					}
				],
				gameTabsCurrent: null,
				balanceShow: false,
				selecValue: '',
				iconV: '',
				gameClose: false,
				gameData: [],
				tabslist: [],
				gameCount: 0,
				loginStatus: false
			}
		},
		props: {},
		activated() {
			this.langChange();
			this.userInfo_common = this.$helper.get('userInfo');
			this.userBalance = this.$helper.get('userBalance');
			this.loginStatus = this.$helper.get('loginStatus');
		},
		mounted() {
			this.langChange();
			this.userInfo_common = this.$helper.get('userInfo');
			this.userBalance = this.$helper.get('userBalance');
			this.headUserVip = this.$helper.get('userInfo').level_name;
			this.getUserHeader();
			// this.gameGetType();
		},
		methods: {
			gameWebClick(tc_id) {
				this.testLogin_go(`/pages/game/game_web?t_id=${this.tabslist[this.gameTabsCurrent].id}&tc_id=${tc_id}`);
			},
			paginationChange(i) {
				this.getGame(this.tabslist[this.gameTabsCurrent].id, i.current);
			},
			// 获取游戏分类
			async gameGetType() {
				let res = await this.$u.api.game_get_type_p();
				if (res && res.code == 1) {
					this.tabslist = res.data;
				}
			},
			langChange() {
				this.selecValue = this.$helper.get('i18n_lang');
				let all_lang = this.$helper.get('alllang');
				if (all_lang != null) {
					for (let i = 0; i < all_lang.length; i++) {
						if (this.selecValue == all_lang[i].value) {
							this.iconV = all_lang[i].icon;
						}
					}
				}
			},
			gameCloseChange() {
				this.gameTabsCurrent = null;
				this.gameData = [];
				this.gameClose = false;
			},
			selectOne(options) {
				this.$helper.setLang(options.label);
				this.$i18n.locale = options.label;
				this.selecValue = options.label;
				this.iconV = options.icon;
				this.langStatus = true;
				this.$router.go(0);
			},
			async headUserBan() {
				await this.getUserBalance();
			},
			gameTabsChange(index, tc_id) {
				if (this.gameTabsCurrent == index) {
					this.gameTabsCurrent = null;
					this.gameData = [];
					this.gameClose = false;
				} else {
					this.gameTabsCurrent = index;
					this.gameClose = true;
					this.gameData = [];
					this.getGame(tc_id, 1);
				}
			},
			async getGame(tc_id, page) {
				uni.showLoading({
					title: this.$t('loading')
				});
				let parme = {};
				parme = {
					page,
					limit: 9,
					type: tc_id ? tc_id : ''
				}
				let res = await this.$u.api.game_type_third_p(parme);
				if (res && res.code == 1) {
					this.gameData = res.data;
					this.gameCount = res.count;
					if (res.count == 0) {
						this.$refs.uTips.show({
							title: this.$t('暂无数据')
						});
					}
					uni.hideLoading();
				}
			},
			gameClick(gid, tc_code) {
				let api = this.$helper.get('rule').game_url;
				if (api) {
					this.getGameUrl(gid, api + '/game/login_game', tc_code);
				} else {
					this.successChange(gid, tc_code);
				}
			},
			async getGameUrl(gid, api, tc_code) {
				uni.showLoading({
					title: this.$t('loading')
				});
				this.$u.post(api, {
					platform: 1,
					gid
				}).then(async res => {
					uni.hideLoading();
					if (res && res.code == 1) {
						location.href = res.data;
					} else {
						this.$refs.uTips.show({
							title: this.$t(res.msg)
						});
					}
				});
			},
			async successChange(gid, tc_code) {
				let res = await this.$u.api.game_login_game_p({
					platform: 1,
					gid
				});
				if (res && res.code == 1) {
					location.href = res.data;
				} else {
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
				}
			},
			async getBalance() {
				uni.showLoading({
					title: this.$t('loading')
				});
				let api = this.$helper.get('rule').game_url;
				if (api) {
					this.$u.post(api + '/game/user_transout', {
						tid: 0
					}).then(async res => {
						if (res) {
							uni.hideLoading();
							await this.getUserBalance();
						}
						this.balanceShow = !this.balanceShow;
						setTimeout(_ => {
							if (!this.balanceShow) {
								this.balanceShow = true;
							}
						}, 200);
					});
				} else {
					let res = await this.$u.api.game_user_transout_p({
						tid: 0
					});
					if (res) {
						uni.hideLoading();
						await this.getUserBalance();
					}
					this.balanceShow = !this.balanceShow;
					setTimeout(_ => {
						if (!this.balanceShow) {
							this.balanceShow = true;
						}
					}, 200);
				}
			},
			beforeSwitch(e) {
				let option = this.$helper.get('game_data_v2');
				if (this.loginStatus) {
					if (option.tc_code == 'PB') {
						this.$helper.set('game_back_url', window.location.href);
					}
					uni.navigateTo({
						url: '/pages/sportsThird/sportsThird?gid=' + option.id
						// url: '/pages/sports/index'
					})
				} else {
					uni.redirectTo({
						url: '/pages/login/index'
					});
				}
			},
		}
	}
</script>

<style lang="scss">
	.header-main{
		position: fixed;
		z-index: 999;
		left: 268px;
		right: 0;
		top: 0;
		background-color: #312B4F;
		border-bottom: 1px solid #3E3664;
		transition: all .3s;
		.header-navbar{
			display: flex;
			align-items: center;
			height: 60px;
			padding: 0 15px;
		}
		.header-left{
			display: flex;
			align-items: center;
		}
		.header-right{
			display: flex;
			align-items: center;
			margin-left: auto;
		}
	}
	
	.header-menun-class {
		color: #D1CCE9;
		border-radius: 36px;
		background-color: #413D71;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 36px;
		height: 36px;
		image{
			width: 16px;
			height: 16px;
		}
		&.active {
			padding: 0 15px;
		}
	}
	.header-left .header-menun-class{
		background-color: #0D0D0D;
	}
	.header-balance-class{
		display: flex;
		align-items: center;
		padding: 0 16px;
		.icon-plus-square{
			color: #E9AE3A;
			font-size: 20px;
		}
	}
	
	.header-user-class{
		padding: 5px 5px 5px 15px;
		text-align: right;
		.header-user-photo{
			width: 26px;
			height: 26px;
			border-radius: 30px;
		}
	}
	
	
	
	
	
	
	
</style>
