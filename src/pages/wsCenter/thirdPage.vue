<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader isback :title="$t('agent30')" @clickLeft="menuClick"></uniNavHeader>
			<!-- sidebar -->
			<view class="sidebar" :class="sideshow?'is-show':''">
				<uniSideHeader @menuClick="menuClick" nIndex="7"></uniSideHeader>
			</view>
			<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
			<!-- main -->
			<view class="bs-container">
				<view class="tm-top-cell">
					<view class="tm-search flex-center">
						<view class="flex_bd">
							<input type="text" v-model="keyword" value="" :placeholder="$t('agent39')" />
						</view>
						<button type="default" class="btn tm-search-button" @click="search"></button>
					</view>
				</view>
				<view class="bs-content">
					<template v-if="showEmpty == 1">
						<view class="team-m-list">
							<view @click="goShow(res)" class="team-list-cell flex-center"
								v-for="(res, index) in teamUserList" :key="`list${index}`">
								<view class="t-circle">
									<view
										style="width: 45px; height: 45px; border-radius: 50%;background-color: var(--ui-color-normal);font-size: 22px;">
										{{res.username[0]}}
									</view>
								</view>
								<view class="flex_bd">
									<view class="t-id">{{res.username}}</view>
									<view class="t-time">{{res.add_time}}</view>
									<view class="t-level">Level{{res.level}}</view>
								</view>
								<view class="iconfont icon-right"></view>
							</view>
						</view>
						<view class="load-more-box">
							<uni-load-more :status="status"></uni-load-more>
						</view>
					</template>
					<template v-if="showEmpty == 0">
						<listEmpty :isDefault="true" :listHighly='500'></listEmpty>
					</template>
				</view>
			</view>
		</view>
		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			listEmpty,
			pcBg
		},
		data() {
			return {
				href: '',
				sideshow: false,
				// tab
				tmShow: false,
				teamuser: [],
				teamUserList: [],
				keyword: "",
				page: 1,
				level: 1,
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				showEmpty: null,
			}
		},
		onLoad(e) {
			this.level = e.level;
			this.getTeamuser();
		},
		onReachBottom() {
			if (this.status == 'noMore') {
				return;
			}
			this.getTeamuser();
		},
		methods: {
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async search() {
				this.page = 1;
				this.teamUserList = [];
				this.getTeamuser();
			},
			async getTeamuser() {
				let ret = await this.$u.api.teamuser_p({
					username: this.keyword,
					level: this.level,
					isday: 1,
					page: this.page,
					limit: 10,
				});
				if (ret) {
					this.teamuser = ret.data;
					if (ret.data.list.length > 0) {
						this.showEmpty = 1;
						for (let i = 0; i < ret.data.list.length; i++) {
							this.teamUserList.push(ret.data.list[i]);
						}
						// 加载状态结束
						if (ret.data.list.length < 10) {
							this.status = "noMore";
						} else {
							this.status = "loading";
							this.page++;
						}
					} else {
						this.showEmpty = 0;
						this.status = "noMore";
					}
				}
			},
			tmClick() {
				this.tmShow = !this.tmShow
			},
			goShow(index) {
				var _this = this
				uni.navigateTo({
					url: '/pages/wsCenter/teamDetail?id=' + index.id
				});
			}
		}
	}
</script>

<style lang="scss">
</style>
