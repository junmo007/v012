<template>
	<view class="u-rela">
		<view class="u-flex u-row-between pc-header-bg">
			<image :src="$t('headerLeftImg')" class="w_20 cur_pointer headerLeftImgClass" mode="heightFix"
				@click="paBackHome"></image>
			<view class="w_80">
				<view class="h_30 u-flex u-row-between">
					<view>
						<text class="iconfont icon-gonggao1 u-m-r-10"></text>
						<text>{{$t('为了您的资金安全,请勿使用他人银行卡进行充值')}}</text>
					</view>
					<view class="u-flex">
						<view @click="$go('/pages/help/help')" class="cur_pointer main-skin-color">{{$t('帮助中心')}}</view>
						<view class="right-reg u-flex u-m-l-30" v-if="userInfo_common">
							<view>
								<text class="m-c-w">{{userBalance.balance}}</text>
								<text class="iconfont cur_pointer icon-shuaxin u-m-l-10 m-c-w"></text>
							</view>
							<view class="reg-btn cur_pointer" @click="$go('/pages/ucenter/recharge')">{{$t('user4')}}
							</view>
						</view>
						<view class="pc-header u-m-l-36 cur_pointer">
							<easySelect ref="easySelect" size="header" :value="selecValue" :icon="iconV"
								@selectOne="selectOne"></easySelect>
						</view>
					</view>
				</view>
				<view class="h_60 u-flex u-row-between">
					<view class="u-flex">
						<view v-for="(item,index) in tabslist" :key="`tabslist${index}`" class="game-tabs-item"
							@click="gameTabsChange(index,item.id)" v-if="tabslist.length > 0"
							:class="gameTabsCurrent == index ? 'game-item-active' : ''">
							<!-- <text>{{$t(item.name)}}</text> -->
							<view class="u-flex">
								<view class="game-type">
									<view class="game-tabs-item-name">
										<view
											class="game-tabs-item-marquee">
											{{$t(item.name)}}
										</view>
									</view>
								</view>
								<view class="iconfont icon-dw u-m-l-4"></view>
							</view>
						</view>
					</view>
					<view class="u-flex">
						<view class="u-m-r-36 cur_pointer" @click="testLogin_go('/pages/share/index')">{{$t('任务中心')}}
						</view>
						<view class="u-m-r-36 cur_pointer" @click="testLogin_go('/pages/gameResults/index')">
							{{$t('赛事结果')}}
						</view>
						<view class="u-m-r-36 cur_pointer" @click="testLogin_go('/pages/ucenter/vip')">{{$t('VIP中心')}}
						</view>
						<!-- <view class="u-m-r-36">{{$t('VIP中心')}}</view> -->
						<view class="u-flex" v-if="!userInfo_common">
							<view class="pc-login-btn" @click="$go('/pages/login/index')">{{$t('login')}}</view>
							<view class="pc-register-btn" @click="$go('/pages/register/index')">{{$t('register')}}
							</view>
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
									<view class="iconfont icon-right u-p-b-12"></view>
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
				gameCount: 0
			}
		},
		props: {},
		activated() {
			this.langChange();
			this.userInfo_common = this.$helper.get('userInfo');
			this.userBalance = this.$helper.get('userBalance');
		},
		mounted() {
			this.langChange();
			this.userInfo_common = this.$helper.get('userInfo');
			this.userBalance = this.$helper.get('userBalance');
			this.headUserVip = this.$helper.get('userInfo').level_name;
			this.getUserHeader();
			this.gameGetType();
		},
		methods: {
			gameWebClick(tc_id) {
				this.$go(`/pages/game/game_web?t_id=${this.tabslist[this.gameTabsCurrent].id}&tc_id=${tc_id}`);
			},
			paginationChange(i) {
				this.getGame(this.tabslist[this.gameTabsCurrent].id, i.current);
			},
			// 获取游戏分类
			async gameGetType() {
				// game_type_third_p
				// game_get_type_p
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
					if(res.count == 0){
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
			}
		}
	}
</script>

<style lang="scss">
	.w_20 {
		background-color: var(--w_20-bg);
	}

	.w_80 {
		width: 100%;
	}

	.h_30 {
		color: #ccc;
		background-color: var(--h_30-bg);
		height: 30px;
		line-height: 30px;
		padding: 0 50px 0 20px;
	}

	.h_60 {
		color: #fff;
		background-color: var(--h_60-bg);
		min-height: 60px;
		// line-height: 60px;
		padding: 0 50px 0 10px;
	}
	
	.pc-header-bg {
		background: linear-gradient(to bottom,var(--h_30-bg),var(--h_60-bg));
	}

	.game-tabs-item {
		cursor: pointer;
		padding: 0 15px;
		position: relative;
		max-width: 100px;
	}

	.game-tabs-item::before {
		content: '';
		position: absolute;
		top: 15%;
		right: -3px;
		width: 1px;
		height: 20px;
		background-color: #999;
	}

	.game-tabs-item:last-child::before {
		content: none;
	}

	.line-1 {
		line-height: 1;
	}

	.user-box {
		position: relative;
	}

	.user-menu {
		border-radius: 0 0 8px 8px;
		position: absolute;
		top: 22px;
		left: -50px;
		visibility: hidden;
		padding-top: 30px;
		z-index: 1099;
	}

	.user-menu .icon-right {
		font-weight: bold;
		color: #3D4B83;
	}

	.user-box:hover .user-menu {
		visibility: visible;
	}

	.user-menu-item {
		background-color: var(--user-menu-item-bg);
		padding: 5px 20px 0 20px;
		color: var(--main-skin-color);
		display: flex;
		line-height: 26px;
		align-items: center;
		width: 200px;
		justify-content: space-between;
		border-bottom: 1px solid var(--user-menu-item-border);
		cursor: pointer;
	}

	.user-menu-item:last-child {
		border-bottom: none !important;
	}

	.user-box:hover .user-menu {
		display: block;
	}

	.right-reg {
		padding: 0 0 0 10px;
		background-color: var(--right-reg-bg);
		border-radius: 5px;
	}

	.reg-btn {
		color: #fff;
		padding: 0 5px;
		cursor: pointer;
		margin-left: 5px;
		border-radius: 5px;
		background: var(--reg-btn-bg);
	}

	.top-game {
		width: 100vw;
		height: 330px;
		padding: 0 260px;
		background-color: #111B3F;
		position: absolute;
		z-index: 999;
		opacity: 0;
		animation: .6s fade-in forwards;
	}

	@media (min-width: 1400px) and (max-width: 1750px) {
		.top-game {
			padding: 0 120px;
		}
	}

	@keyframes fade-in {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	.top-game .game-name {
		padding: 5px;
		color: #fff;
		font-weight: bold;
		text-align: center;
		border-radius: 5px;
		border: 1px solid #ccc;
	}

	.game-item-active {
		color: #3461ff;
	}

	.game-item {
		width: 139px;
		height: 250px;
		margin-right: 18px;
		border-radius: 10px;
		background-image: linear-gradient(175deg, #0C1532, #172857);
	}

	.pc-header ::v-deep .easy-select .easy-select-options-item {
		padding: 0 5px;
	}

	.pc-header ::v-deep .icon-close-position {
		top: 0;
		right: 0;
	}

	.pc-header ::v-deep .input-box {
		color: #fff;
	}

	.pc-header ::v-deep .easy-select-down-tag .iconfont {
		color: #fff;
	}

	.top-game-close {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100vh;
		width: 100vw;
	}

	.pc-login-btn {
		// height: 30px;line-height: 30px;
		// border: 1px solid #2C65DF;
		border-radius: 8px;
		font-size: 12px;
		padding: 6px 20px;
		margin-right: 15px;
		cursor: pointer;
		color: #fff;
		background: #306DF0;
	}

	.pc-register-btn {
		// height: 30px;line-height: 30px;
		// border: 1px solid #2C65DF;
		border-radius: 8px;
		font-size: 12px;
		padding: 6px 20px;
		cursor: pointer;
		color: #fff;
		background: #306DF0;
	}
	
	.headerLeftImgClass {
		height: 90px;
		padding: 10px 20px;
		background-color: var(--h_60-bg);
	}
	
	@media (max-width: 1580px) and (min-width: 1440px){
		.headerLeftImgClass {
			height: 92px;
		}
	}
	
	@media (max-width: 1439px) and (min-width: 1350px){
		.headerLeftImgClass {
			height: 106px;
		}
	}
	
	@media (max-width: 1349px){
		.headerLeftImgClass {
			display: none;
		}
	}
	
	
	.game-type {
		overflow: hidden;
		padding: 0 2px;
	}
	
	.game-type .game-tabs-item-name {
		width: 100%;
		animation: marquee-wrap 5s infinite linear;
	}
	
	.game-type .game-tabs-item-marquee {
		font-weight: bold;
		float: left;
		white-space: nowrap;
		min-width: 100%;
		animation: marquee-content 5s infinite linear;
	}
	
	@keyframes marquee-wrap {
	
		0%,
		30% {
			transform: translateX(0);
		}
	
		70%,
		100% {
			transform: translateX(100%);
		}
	}
	
	@keyframes marquee-content {
	
		0%,
		30% {
			transform: translateX(0);
		}
	
		70%,
		100% {
			transform: translateX(-100%);
		}
	}
</style>
