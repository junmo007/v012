<template>
	<view :class="isOpen?'pc-open':'pc-close'" class="u-skeleton">
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main u-flex u-col-top pc-has-right">
				<pcSideBar :pageIndex="51" @menu-event="parentMenu"></pcSideBar>
				<view class="pc-wrapper">
					<swiper class="index-swiper-pc" :indicator-dots="false" :autoplay="autoplay" :circular="true"
						:interval="3000" :duration="duration" v-if="bannerList.length > 0" next-margin="40%"
						:current="currentIndex" @change="swiperChangePC">
						<swiper-item v-for="(item,index) in bannerList" :key="`bannerList${index}`"
							@click="testLogin_go(item.url)">
							<u-image :src="item.img" :class="currentIndex == index ? '' : 'u-m-l-30'" height="280px"
								mode="widthFix" class="swiper-bg"></u-image>
						</swiper-item>
					</swiper>
					<view class="u-flex u-row-between w_100  u-m-b-30">
						<view class="pc-index-item2 cur_pointer" v-if="turntableStatus == 1"
							@click="testLogin_go('/pages/luckyDraw/luckyDraw')">
							<u-image src="@/static/images/pc/Lucky3.png" borderRadius="15px" mode="widthFix">
								<u-loading slot="loading"></u-loading>
							</u-image>
							<view class="u-abso u-flex u-row-right u-col-bottom u-c-w"
								style="bottom: 15px;left: 10px;right: 10px">
								<!-- <view class="m-font-b m-font-16">{{$t('幸运转盘')}}</view> -->
								<view class="index-btn">{{$t('去抽奖')}}</view>
							</view>
						</view>
						<view class="pc-index-item2 cur_pointer" @click="testLogin_go('/pages/wsCenter/index')">
							<u-image src="@/static/images/pc/Center3.png" borderRadius="15px" mode="widthFix">
								<u-loading slot="loading"></u-loading>
							</u-image>
							<view class="u-abso u-flex u-row-right u-col-bottom u-c-w"
								style="bottom: 15px;left: 10px;right: 10px">
								<!-- <view class="m-font-b m-font-16">{{$t('代理中心')}}</view> -->
								<view class="index-btn">{{$t('去代理')}}</view>
							</view>
						</view>
						<view class="pc-index-item2 cur_pointer" @click="testLogin_go('/pages/invte/invte')">
							<u-image src="@/static/images/pc/Invite3.png" borderRadius="15px" mode="widthFix">
								<u-loading slot="loading"></u-loading>
							</u-image>
							<view class="u-abso u-flex u-row-right u-col-bottom u-c-w"
								style="bottom: 15px;left: 10px;right: 10px">
								<!-- <view class="m-font-b m-font-16">{{$t('邀请好友')}}</view> -->
								<view class="index-btn">{{$t('去邀请')}}</view>
							</view>
						</view>
					</view>
					<view class="index-panel" v-if="matchList.length > 0">
						<view class="u-skeleton-fillet">
							<view class="index-game-main">
								<u-row gutter="30" align="top">
									<u-col span="6">
										<view class="u-flex index-panel_hd u-m-b-20">
											<image src="@/static/images/index/emoji02.gif" mode=""
												style="width: 24px;height: 24px;">
											</image>
											<view class="u-m-l-10 m-font-18 m-font-b">{{$t("热门赛事")}}</view>
										</view>
										<view class="game-scroll">
											<view class="m-index-market radius-16 u-m-b-20"
												@click.stop="openList(item,false)"
												:class="[item.is_vip == 1?'m-index-market-pwd':'',item.bgImg < 4 ? 'm-market-soon-1' : item.bgImg < 6 ? 'm-market-soon-2' : 'm-market-soon-3']"
												v-for="(item,index) in matchList" :key="`matchList${index}`"
												v-if="item.is_vip !== 1">
												<view class="top clickOver u-p-20 u-flex ">
													<text class="iconfont icon-alarm-fill text-D1CCE9"></text>
													<text class="no-flex text-D1CCE9">{{$t('倒计时')}}:</text>
													<u-count-down :timestamp="item.tz_end_time" bg-color="none"
														color="#E9AE3A"></u-count-down>
													<u-circle-progress active-color="#E9AE3A" :percent="item.bl"
														bg-color="" width="20" class="u-m-auto">
													</u-circle-progress>
													<view class="u-m-l-10">
														{{item.count_zhudan_amount}}{{$t('game18')}}
													</view>
													<view class="market-pwd m-c-w u-flex"
														v-if="item.is_pwd == 1 && item.is_vip == 2">
														<view class="iconfont icon-shoucang4"></view>
														<view class="iconfont icon-suoding u-m-l-20"></view>
													</view>
													<view class="market-pwd m-c-w u-flex"
														v-else-if="item.is_vip == 1 && item.is_pwd == 2">
														<view class="iconfont icon-shoucang4"></view>
														<view class="u-m-l-8 u-m-r-8 u-m-l-20">VIP</view>
													</view>
													<view class="market-pwd m-c-w u-flex"
														v-else-if="item.is_vip == 1 && item.is_pwd == 1">
														<view class="iconfont icon-shoucang4"></view>
														<view class="u-m-l-8 u-m-r-8">VIP</view>
														<view class="iconfont icon-suoding"></view>
													</view>
													<!-- <view class="u-m-auto">{{item.bd.fbd_pl}}%</view> -->
												</view>
												<view class="line clickOver"></view>
												<view class="center clickOver u-flex u-row-between ">
													<view class="left u-flex flex--direction u-row-center w_45">
														<template v-if="item.zd_logo">
															<u-image :src="item.zd_logo" width="40px" height="40px"
																borderRadius="50%">
															</u-image>
														</template>
														<template v-else>
															<u-image :src="marketHeaderZD" width="40px" height="40px"
																borderRadius="50%">
															</u-image>
														</template>
														<view class="m-line-1 u-m-t-20">{{item.zd_name}}</view>
													</view>
													<view class="text-nowrap u-text-center u-m-r-30 u-m-l-30 ">
														<view class="u-flex u-row-center m-font-64 m-font-b ">
															<view>{{item.bd.zd}}</view>
															<view class="u-m-l-10 u-m-r-10 u-p-b-8">:</view>
															<view>{{item.bd.kd}}</view>
														</view>
														<view class="line-1">{{item.sc_time}}</view>
													</view>
													<view class="right u-flex flex--direction u-row-center w_45">
														<template v-if="item.kd_logo">
															<u-image :src="item.kd_logo" width="40px" height="40px"
																borderRadius="50%">
															</u-image>
														</template>
														<template v-else>
															<u-image :src="marketHeaderKD" width="40px" height="40px"
																borderRadius="50%">
															</u-image>
														</template>
														<view class="m-line-1 u-m-t-20">{{item.kd_name}}</view>
													</view>
												</view>
											</view>
										</view>
										<view class="match-all-count-btn u-flex u-row-center u-m-t-20"
											@click="testLogin_go('/pages/market/index')">
											<view>{{$t('全部赛事')}}-{{match_all_count}}</view>
											<view class="iconfont icon-right"></view>
										</view>
									</u-col>
									<u-col span="6">
										<view class="u-flex index-panel_hd u-m-b-20">
											<image src="@/static/images/pc/star.png" mode=""
												style="width: 20px;height: 20px;">
											</image>
											<view class="u-m-l-10 m-font-18 m-font-b">{{$t("VIP")}}</view>
										</view>
										<view class="game-scroll">
											<view class="m-index-market radius-16 u-m-b-20"
												@click.stop="openList(item,false)"
												:class="[item.is_vip == 1?'m-index-market-pwd':'',item.bgImg < 4 ? 'm-market-soon-1' : item.bgImg < 6 ? 'm-market-soon-2' : 'm-market-soon-3']"
												v-for="(item,index) in matchListVip" :key="`matchList${index}`"
												v-if="matchListVip.length > 0">
												<view class="top clickOver u-p-20 u-flex"
													:class="item.is_pwd == 1 || item.is_vip == 1 ?'u-flex u-row-between':''">
													<view class="market-pwd m-c-w u-flex"
														v-if="item.is_pwd == 1 && item.is_vip == 2">
														<view class="iconfont icon-shoucang4"></view>
														<view class="iconfont icon-suoding u-m-l-10"></view>
													</view>
													<view class="market-pwd m-c-w u-flex"
														v-else-if="item.is_vip == 1 && item.is_pwd == 2">
														<view class="iconfont icon-shoucang4"></view>
														<view class="u-m-l-8 u-m-r-8 u-m-l-10">VIP</view>
													</view>
													<view class="market-pwd m-c-w u-flex"
														v-else-if="item.is_vip == 1 && item.is_pwd == 1">
														<view class="iconfont icon-shoucang4"></view>
														<view class="u-m-l-8 u-m-r-8">VIP</view>
														<view class="iconfont icon-suoding"></view>
													</view>
													<view class="u-flex">
														<text class="iconfont icon-alarm-fill text-D1CCE9"></text>
														<u-count-down :timestamp="item.tz_end_time" bg-color="none"
															color="#E9AE3A"></u-count-down>
													</view>
													<view class="u-flex">
														<u-circle-progress active-color="rgba(233, 174, 58, 1)"
															:percent="item.bl" bg-color="" width="20">
														</u-circle-progress>
														<view class="u-m-l-14">
															{{item.count_zhudan_amount}}{{$t('game18')}}
														</view>
													</view>
												</view>
												<view class="line clickOver"></view>
												<view class="center clickOver u-flex u-row-between ">
													<view class="left u-flex flex--direction u-row-center w_45">
														<template v-if="item.zd_logo">
															<u-image :src="item.zd_logo" width="40px" height="40px"
																borderRadius="50%">
															</u-image>
														</template>
														<template v-else>
															<u-image :src="marketHeaderZD" width="40px" height="40px"
																borderRadius="50%">
															</u-image>
														</template>
														<view class="m-line-1 u-m-t-20">{{item.zd_name}}</view>
													</view>
													<view class="text-nowrap u-text-center u-m-r-30 u-m-l-30 ">
														<view class="u-flex u-row-center m-font-64 m-font-b ">
															<view>{{item.bd.zd}}</view>
															<view class="u-m-l-10 u-m-r-10 u-p-b-8">:</view>
															<view>{{item.bd.kd}}</view>
														</view>
														<view class="line-1">{{item.sc_time}}</view>
													</view>
													<view class="right u-flex flex--direction u-row-center w_45">
														<template v-if="item.kd_logo">
															<u-image :src="item.kd_logo" width="40px" height="40px"
																borderRadius="50%">
															</u-image>
														</template>
														<template v-else>
															<u-image :src="marketHeaderKD" width="40px" height="40px"
																borderRadius="50%">
															</u-image>
														</template>
														<view class="m-line-1 u-m-t-20">{{item.kd_name}}</view>
													</view>
												</view>
											</view>
											<template v-if="matchListVip.length == 0">
												<listEmpty :isDefault="true" text='暂时没有数据哟!' list='list'
													:listHighly='300'>
												</listEmpty>
											</template>
										</view>
										<view class="match-all-count-btn u-flex u-row-center u-m-t-20"
											@click="testLogin_go('/pages/market/index')">
											<view>{{$t('全部赛事')}}-{{match_all_count}}</view>
											<view class="iconfont icon-right"></view>
										</view>
									</u-col>
								</u-row>
							</view>

						</view>
						<view class="pc-mar-tabs2 cur_pointer" @click="showMarket" v-if="matchList.length == 4">
							{{$t('更多赛事')}}
						</view>
					</view>
					<view class="index-panel">
						<view class="pc-tabs u-m-b-30">
							<u-tabs height="84" bar-height="6" bar-width="100" bg-color="none" gutter="40"
								active-color="#ffffff" inactive-color="#ffffff" :list="tabs" :current="current"
								@change="changeTab">
							</u-tabs>
						</view>
						<template v-if="quicklyKeys == 0">
							<view class="panel-table">
								<view class="u-flex u-row-between panel-table-head ">
									<view class="table-col-1 text-light">{{$t('赛事')}}</view>
									<view class="table-col-2 text-light">{{$t('user33')}}</view>
								</view>
								<view v-for="(item,index) in orderList" :key="`orderList${index}`">
									<view class="u-flex u-row-between bs-table-bottom-item cur_pointer"
										@click="fastopen(item)">
										<view class="u-flex">
											<!-- <image src="@/static/images/pc/kuea-market.png"
												style="min-width: 70px;width: 70px;height: 41px;margin-right: auto;">
											</image> -->
											<image :src="item.zd_logo" class="ksgt-1"></image>
											<image :src="item.kd_logo" class="ksgt-1 ksgt-2"></image>
											<view class="u-m-l-20">
												<view class="u-flex ">
													<view class="m-line-1">{{item.zd_name}}</view>
													<view class="u-p-l-20 u-p-r-20">-</view>
													<view class="zd-fs-class">{{item.zd_fs}}</view>
												</view>
												<view class="u-flex  u-m-t-10">
													<view class="m-line-1">{{item.kd_name}}</view>
													<view class="u-p-l-20 u-p-r-20">-</view>
													<view class="kd-fs-class">{{item.kd_fs}}</view>
												</view>
											</view>
										</view>
										<view class="u-font-32">
											{{item.tz_price1?item.tz_price1+' ₽':'0.00 ₽'}}
										</view>
									</view>
								</view>
							</view>
						</template>
						<template v-if="quicklyKeys == 1">
							<view class="panel-table">
								<view class="u-flex u-row-between panel-table-head ">
									<view class="table-col-1 text-light">{{$t('用户名称')}}</view>
									<view class="table-col-2 text-light">{{$t('总获利')}}</view>
								</view>
								<view v-for="(item,index) in ranking" :key="`ranking${index}`">
									<view class="u-flex u-row-between bs-table-bottom-item">
										<view class="u-flex">
											<view class="rankingClass" :class="`ranking${index}`"></view>
											<view>{{item.name}}</view>
										</view>
										<view class="u-font-32">
											{{numberLimit(item.zhl)?numberLimit(item.zhl)+' ₽':'0.00 ₽'}}
										</view>
									</view>
								</view>
							</view>
						</template>
					</view>
				</view>
				<view class="pc-right-bar">
					<pcSideTrade></pcSideTrade>
				</view>
			</view>
			<pcFoot></pcFoot>
		</template>
		<!-- 移动端 -->
		<template v-if="mobile_common">
			<template v-if="!isGuide">
				<view class="content" :data-theme="themeMode">
					<view class="index-container container">
						<uniNavHeader :title="$t('web_name')" @clickLeft="menuClick" @headerPwd="headerPwd"
							ref="header">
						</uniNavHeader>
						<template
							v-if="userInfo_common.is_new == 1 && (tutorialKey == 1 || tutorialKey == 2 || tutorialKey == 3)">
							<view :class="tutorialKey == 3?'userTutorialMask_bf':'userTutorialMask'"
								v-if="userTutorial">
							</view>
							<view :class="[tutorialKey == 1?'tutorial-1':tutorialKey == 2?'tutorial-2':tutorialKey == 3?'tutorial-3':'',
							tutorialKey == 3?'TutorialInfoClass_bf':'TutorialInfoClass']" v-if="userTutorial">
								<template v-if="tutorialKey == 1">
									<view>{{$t('热门赛事新手指导')}}</view>
								</template>
								<!-- <template v-if="tutorialKey == 2">
									<view>{{$t('赛事详细信息新手指导')}}</view>
								</template>
								<template v-if="tutorialKey == 3">
									<view>{{$t('更多比分信息新手指导')}}</view>
								</template> -->
								<view class="u-text-right text-yellow u-m-t-10" @click="tutorialChange(4)">
									{{$t('下一步')}}
								</view>
							</view>
							<template v-if="userTutorial">
								<view class="finishClass u-flex" @click="skipTutorialIndex">
									<view class="u-m-r-20">{{$t('跳过')}}</view>
									<image src="@/static/images/index/c_close.png" style="width: 20px;height: 20px;">
									</image>
								</view>
							</template>
							<!-- <template v-if="tutorialKey == 3 && userTutorial">
								<view class="u-flex finishClass_fb" @click="tutorialChange(4)">
									<view>{{$t('更多比分')}}</view>
									<view class="iconfont icon-right"></view>
								</view>
							</template> -->

						</template>
						<template v-if="!userTutorial">
							<view class="index-main">
								<view class="index-banner" v-if="bannerList.length > 0">
									<swiper :indicator-dots="false" :autoplay="autoplay" class="index-swiper-banner"
										:current="currentIndex" @change="swiperChangePC" :interval="3000"
										:duration="duration" v-if="bannerList.length > 0">
										<swiper-item v-for="(item,index) in bannerList" :key="`list${index}`"
											@click="swiperChange(item.url)">
											<u-image :src="item.img" width="100%" mode="widthFix" class="swiper-bg">
											</u-image>
										</swiper-item>
									</swiper>
								</view>
							</view>
						</template>
						<view class="index-main-border">
							<template v-if="!userTutorial">
								<view class="index-notice-bar u-p-b-30">
									<u-notice-bar mode="horizontal" :list="indexNoticeList"
										bg-color="rgba(49, 43, 79, 1)" color="#fff" border-radius="40"></u-notice-bar>
								</view>
							</template>
							<view class="u-p-b-30 u-skeleton-fillet index-pare-class">
								<view class="u-flex u-row-center">
									<image src="@/static/images/index/emoji01.png" mode=""
										style="width: 20px;height: 20px;">
									</image>
									<view class="u-m-l-10 m-font-18 m-font-b">{{$t("即将进行")}} {{tutorialKey}}</view>
								</view>
								<view class="m-market-soon u-flex u-m-t-30"
									@click="testLogin_go(`/pages/market/marketContent?id=${matchList2.sc_id}&is_pwd=${matchList2.is_pwd}`)">
									<view class="u-flex clickOver">
										<view class="ksgt-1">
											<image :src="matchList2.zd_logo" v-if="matchList2.zd_logo"></image>
											<image :src="marketHeaderZD" v-if="!matchList2.zd_logo"></image>
										</view>
										<view class="ksgt-1 ksgt-2">
											<image :src="matchList2.kd_logo" v-if="matchList2.kd_logo"></image>
											<image :src="marketHeaderKD" v-if="!matchList2.kd_logo"></image>
										</view>
									</view>
									<view class="u-m-l-20 clickOver">
										<view class="u-flex u-m-b-10">
											<view class="m-line-1">{{matchList2.zd_name}}</view>
											<view class="u-c-9 u-m-l-10 u-m-r-10 u-text-center"
												style="min-width: 30px;">VS</view>
											<view class="m-line-1">{{matchList2.kd_name}}</view>
										</view>
										<view>{{matchList2.sc_time}}</view>
									</view>
								</view>
								<!-- VIP赛事入口 -->
								<view class="u-flex u-row-right u-m-t-60 index-vip-cell"
									@click="testLogin_go('/pages/market/indexVip')">
									<image src="@/static/images/index/Group.png" mode=""
										style="width: 112px;height: 75px;position: absolute;left: 19px;top: -5px;">
									</image>
									<view class="u-flex">
										<view class="m-font-16 u-m-r-10">{{$t('VIP赛事')}}</view>
										<view class="iconfont icon-right"></view>
									</view>
								</view>
								<view class="u-flex u-row-center u-m-t-60 u-m-b-30" id="scrollBody">
									<image src="@/static/images/index/emoji02.gif" mode=""
										style="width: 20px;height: 20px;">
									</image>
									<view class="u-m-l-10 u-m-t-10 m-font-18 m-font-b">{{$t("热门赛事")}}</view>
								</view>
								<view class="m-index-market" v-for="(item,index) in matchList"
									:key="`matchList${index}`" @click.stop="openList(item,false)"
									:class="[index>0?'u-m-t-20':'',item.is_vip == 1?'m-index-market-pwd':'',item.bgImg < 4 ? 'm-market-soon-1' : item.bgImg < 6 ? 'm-market-soon-2' : 'm-market-soon-3',userTutorial && index == 0 && tutorialKey == 1 ?'userTutorialPosition':'']">
									<view class="top clickOver u-p-30"
										:class="item.is_pwd == 1 || item.is_vip == 1 ?'u-flex u-row-between':''">
										<view class="market-pwd m-c-w u-flex"
											v-if="item.is_pwd == 1 && item.is_vip == 2">
											<view class="iconfont icon-shoucang4"></view>
											<view class="iconfont icon-suoding u-m-l-20"></view>
										</view>
										<view class="market-pwd m-c-w u-flex"
											v-else-if="item.is_vip == 1 && item.is_pwd == 2">
											<view class="iconfont icon-shoucang4"></view>
											<view class="u-m-l-8 u-m-r-8 u-m-l-20">{{$t('VIP'+(Number(item.bet_level) - 1))}}</view>
										</view>
										<view class="market-pwd m-c-w u-flex"
											v-else-if="item.is_vip == 1 && item.is_pwd == 1">
											<view class="iconfont icon-shoucang4"></view>
											<view class="u-m-l-8 u-m-r-8">{{$t('VIP'+(Number(item.bet_level) - 1))}}</view>
											<view class="iconfont icon-suoding"></view>
										</view>
										<view class="u-flex u-row-center">
											<view>{{$t('比赛时间')}}</view>
											<view class="text-yellow u-m-l-10">{{item.sc_time}}</view>
										</view>
									</view>
									<view class="line clickOver"></view>
									<view class="center clickOver u-flex u-row-between u-p-30">
										<view class="left u-flex flex--direction u-row-center w_45">
											<template v-if="item.zd_logo">
												<u-image :src="item.zd_logo" width="40px" height="40px"
													borderRadius="50%">
												</u-image>
											</template>
											<template v-else>
												<u-image :src="marketHeaderZD" width="40px" height="40px"
													borderRadius="50%">
												</u-image>
											</template>
											<view class="m-line-1 u-m-t-20">{{item.zd_name}}</view>
										</view>
										<view class="vs m-font-24 m-font-b u-m-r-30 u-m-l-30 u-flex">
											<view>{{item.bd.zd}}</view>
											<view class="u-m-l-10 u-m-r-10 u-p-b-8">:</view>
											<view>{{item.bd.kd}}</view>
										</view>
										<view class="right u-flex flex--direction u-row-center w_45">
											<template v-if="item.kd_logo">
												<u-image :src="item.kd_logo" width="40px" height="40px"
													borderRadius="50%">
												</u-image>
											</template>
											<template v-else>
												<u-image :src="marketHeaderKD" width="40px" height="40px"
													borderRadius="50%">
												</u-image>
											</template>
											<view class="m-line-1 u-m-t-20">{{item.kd_name}}</view>
										</view>
									</view>
									<view class="line clickOver"></view>
									<view
										class="bottom clickOver u-flex u-row-between u-p-t-20 u-p-b-20 u-p-r-30 u-p-l-30">
										<view class="u-flex">
											<u-circle-progress active-color="rgba(233, 174, 58, 1)" :percent="item.bl"
												bg-color="" width="20">
											</u-circle-progress>
											<view class="u-m-l-14">
												{{item.count_zhudan_amount}}{{$t('game18')}}
											</view>
										</view>
										<view>{{item.bd.fbd_pl}}%</view>
									</view>
								</view>
								<view class="match-all-count-btn u-flex u-row-center"
									@click="testLogin_go('/pages/market/index')">
									<view>{{$t('全部赛事')}}-{{match_all_count}}</view>
									<view class="iconfont icon-right"></view>
								</view>
							</view>
							<template v-if="orderList.length > 0">
								<view class="u-p-b-30 u-skeleton-fillet index-pare-class u-m-t-30">
									<view class="u-flex u-row-center">
										<image src="@/static/images/index/emoji01.png" mode=""
											style="width: 20px;height: 20px;">
										</image>
										<view class="u-m-l-10 m-font-18 m-font-b">{{$t("快速跟投")}}</view>
									</view>
									<view class="u-flex u-row-between u-m-t-40 u-m-b-20 u-p-l-50 u-p-r-50">
										<view>{{$t('赛事')}}</view>
										<view>{{$t('user33')}}</view>
									</view>
									<view v-for="(item,index) in orderList" :key="`orderList${index}`">
										<view class="u-flex u-row-between bs-table-bottom-item" @click="fastopen(item)">
											<view class="u-flex flex-1">
												<view class="u-flex">
													<view class="ksgt-1">
														<image :src="item.zd_logo"></image>
													</view>
													<view class="ksgt-1 ksgt-2">
														<image :src="item.kd_logo"></image>
													</view>
												</view>
												<view class="u-m-l-20">
													<view>{{item.zd_name}} - {{item.zd_fs}}</view>
													<view class="u-m-t-10">{{item.kd_name}} - {{item.kd_fs}}</view>
												</view>
											</view>
											<view class="bs-table-bottom-item-price">{{item.tz_price1}}
											</view>
										</view>
									</view>
								</view>
							</template>

							<view class="u-p-b-30 u-skeleton-fillet index-pare-bottom-class u-m-t-30">
								<view class="u-text-center u-m-b-30 m-font-18">{{$t('合作伙伴')}}</view>
								<view class="u-flex flex--direction u-row-center">
									<image src="@/static/images/index-footer/FrameBottom.png" mode="heightFix"
										style="max-height: 100px;"></image>
									<!-- <image src="@/static/images/index/FrameBottom.png" mode="heightFix" class="u-m-t-30"
										style="max-height: 40px;">
									</image> -->
								</view>
								<u-line class="u-line" color="rgba(77, 72, 134, 1)" margin="20px 0"></u-line>
								<view class="u-flex u-row-between u-c-g index-footer-about-list">
									<!-- @click="platUrl($t('OfficialWebsite'))" -->
									<view>{{$t('关于我们')}}</view>
									<!-- <view @click="toRescue">{{$t('联系我们')}}</view> -->
									<view @click="TermsServicePop = true">{{$t('register7')}}</view>
								</view>
								<view class="u-m-t-30 u-c-g2 u-text-center">{{$t('indexBottomInfo')}}</view>
							</view>
						</view>
						<!-- <view class="index-help-class">
							<view data-id="eeJ1idqt27Q" class="livechat_button">
							</view>
						</view> -->
						<view class="index-help-class" @click="toRescue">
							<image src="@/static/images/index/index-help.png"></image>
						</view>
						<uniNavFooter :Index="0"></uniNavFooter>
					</view>
				</view>
			</template>
			<u-skeleton :loading="skeletonLoading" :animation="true" bgColor="var(--body-bg)"
				el-color="var(--u-skeletonA)" bg-color="var(--u-skeletonB)"></u-skeleton>
			<!-- 转盘 -->
			<turntable ref="myWheel" @configBan="configBan"></turntable>
			<template v-if="isGuide">
				<guide @guideChange="guideChange"></guide>
			</template>
		</template>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
			</u-top-tips>
			<u-popup v-model="TermsServicePop" mode="bottom" :mask-custom-style="uPopMaskCustomStyle" borderRadius="32"
				z-index="10001">
				<view class="bs-popup pc_pop">
					<view class="bs-popup-hd">
						<view class="tt m-c-w">{{$t('register7')}}</view>
						<image src="@/static/images/index/close.png"
							style="width: 32px;height: 32px;position: absolute;right: 15px;" mode=""
							@click="TermsServicePop = false">
						</image>
					</view>
					<view class="bs-popup-body">
						<scroll-view style="max-height: 40vh;min-height: 40vh;" scroll-y="true">
							<!-- <view>{{$t('TermsServiceDescription')}}</view> -->
							<view class="art-body" v-html="web_rule_common_5"></view>
						</scroll-view>
					</view>
				</view>
			</u-popup>
			<!-- 列表弹窗 -->
			<u-popup v-model="listPopup" :mode="mobile_common?'bottom':'center'" border-radius="32"
				:mask-custom-style="uPopMaskCustomStyle" @close="VIPPlayClass = false" :mask-close-able="false">
				<view class="bs-popup bs-dist-popup no-border">
					<!-- <view class="iconfont icon-close" @click="closeList()"></view> -->
					<!-- <view @click="goMatchplay(matchplay.sc_id)" class="matchplayClass">
					<text>{{$t('public7')}}</text>
					<text class="iconfont icon-right" style="font-size: 13px;font-weight: 600;"></text>
				</view> -->
					<view class="bs-popup-market-hd u-flex u-row-center">
						<view>{{$t("赛事详情")}}</view>
						<view class="iconfont icon-close" @click="closeList"></view>
					</view>
					<scroll-view scroll-y="true" style="max-height: 70vh;">
						<view class="bs-popup-body">
							<view class="game-popup-top u-m-b-30">
								<view class="vs-game-card u-col-top">
									<view class="col clickOver">
										<template v-if="matchplay.zd_logo">
											<image :src="matchplay.zd_logo" class="marketHeader">
											</image>
										</template>
										<template v-else>
											<image :src="marketHeaderZD" mode="" class="marketHeader">
											</image>
										</template>
										<view class="team-tit">{{$t(matchplay.zd_name)}}</view>
									</view>
									<view class="vs-middle u-text-center clickOver">
										<view class="vs-score m-font-b u-flex" v-if="matchplay.bd">
											<view class="m-font-30">{{matchplay.bd.zd}}</view>
											<view class="u-m-l-20 u-m-r-20 m-font-20">:</view>
											<view class="m-font-30">{{matchplay.bd.kd}}</view>
										</view>
										<view class="vs-middle-color">{{odds}}%</view>
									</view>
									<view class="col clickOver">
										<template v-if="matchplay.kd_logo">
											<image :src="matchplay.kd_logo" class="marketHeader">
											</image>
										</template>
										<template v-else>
											<image :src="marketHeaderKD" mode="" class="marketHeader">
											</image>
										</template>
										<view class="team-tit">{{$t(matchplay.kd_name)}}</view>
									</view>
								</view>
							</view>
							<view class="vs-form">
								<uni-forms err-show-type="toast" ref="form" :modelValue="formData" :rules="rules"
									:border="false">
									<uni-forms-item name="jprice">
										<view class="u-m-b-16 u-m-t-20">
											<text>{{$t('game10')}}</text>
											<text style="color: #D12C2C;">*</text>
										</view>
										<uni-easyinput type="number" v-model="formData.jprice" ref="money"
											:placeholder="$t('public4')" @input="input" :styles="styles"
											:disabled="userTutorial && (tutorialKey == 2 || tutorialKey == 3)?true:false" />
									</uni-forms-item>
									<view class="u-flex u-row-between">
										<view class="u-flex u-m-t-30 u-m-b-30 m-font-16">
											<view>{{$t("game8")}}:</view>
											<view class="u-m-l-10 m-font-b">{{resultPrice}}</view>
										</view>
										<view class="u-flex" @click="marketChange">
											<view>{{$t('更多比分')}}</view>
											<view class="iconfont icon-right"></view>
										</view>
									</view>
									<view class="u-flex u-row-between bet-balance">
										<view>{{$t('user1')}}</view>
										<view class="m-font-b m-font-16">{{userInfo_common.balance1}} ₽</view>
									</view>
								</uni-forms>
							</view>
							<view class="popup-btns flex-center ">
								<view class="col"><button type="default" @click="submit(1,matchplay.is_pwd)"
										class="btn btn--submit">{{$t("public6")}}</button></view>
							</view>
						</view>
					</scroll-view>
				</view>
			</u-popup>
			<uni-popup ref="marketVipPop" type="bottom">
				<view class="uc-pop">
					<view class="u-p-40 pop-bottom">
						<view class="u-flex u-row-center flex--direction">
							<uMessageInput @finish="finish" :maxlength="6" width="70" activeColor="rgba(242, 163, 9, 1)"
								:disabled-keyboard="false" :dot-fill="true" :focus="true" :breathe="true">
							</uMessageInput>
							<view class="u-m-t-20 u-c-9">{{$t('请输入赛事密码')}}</view>
							<view class="w_100 btn--submit u-text-center u-p-20 u-m-t-30" @click="marketVipClose">
								<view class="m-line-1 m-font-b">{{$t('取消')}}</view>
							</view>
						</view>
					</view>
				</view>
			</uni-popup>
			<!-- 选择支付通道 -->
			<u-popup v-model="payType" mode="bottom" border-radius="35" :mask-custom-style="uPopMaskCustomStyle">
				<view class="u-p-30">
					<view class="iconfont icon-left u-font-30 u-m-l-10 u-c-9 u-abso" style="left: 20px;top: 20px;"
						@click="payStatus"></view>
					<view class="u-text-center topText">{{$t('选择支付方式')}}</view>
					<view class="u-flex u-row-between u-m-t-50" @click="funClassClick(1)">
						<view>
							<view class="u-e-7 u-m-b-20">{{$t('user1')}}</view>
							<view class="u-font-30">{{userInfo_common.balance1}}</view>
						</view>
						<template v-if="moneyType == 1">
							<view class="iconfont icon-dui u-font-40 u-m-l-10 text-pick "></view>
						</template>
					</view>
					<view class="u-flex u-row-between u-m-t-50" @click="funClassClick(2)">
						<view class="">
							<view class="u-e-7 u-m-b-20">{{$t('活期余额')}}</view>
							<view class="u-font-30">{{userInfo_common.live_fund_money}}</view>
						</view>
						<template v-if="moneyType == 2">
							<view class="iconfont icon-dui u-font-40 u-m-l-10 text-pick "></view>
						</template>
					</view>
					<view style="height: 60px;"></view>
					<view @click="payStatus" class="payTypeBtn">{{$t("public6")}}</view>
				</view>
			</u-popup>
			<!-- 下单完成弹窗 -->
			<!-- <uni-popup ref="orderPayPopup" type="center">
			<view class="bs-popup orderPayPopup pc_pop">
				<view class="u-row-right">
					<view class="iconfont icon-close u-m-t-14" @click="orderPayClose"></view>
				</view>
				<view class="bs-popup-body">
					<view class="res-tip">
						<image src="/static/images/skin/bluelight/chenggong.png" mode=""></image>
						<view class="text">{{$t('user37')}}</view>
					</view>
					<view class="popup-btns flex-center">
						<view class="col">
							<button type="default" @click="goTradeing"
								class="btn btn-sm btn--market--left">{{$t("前往交易明细")}}</button>
						</view>
						<view class="col">
							<button type="default" @click="continueBuy"
								class="btn btn-sm btn--market--right">{{$t("继续下注")}}</button>
						</view>
					</view>
				</view>
			</view>
		</uni-popup> -->
			<uni-popup ref="orderPayPopup" type="bottom">
				<view class="uc-pop">
					<view class="u-p-40 pop-bottom">
						<view class="u-flex u-row-center flex--direction">
							<image src="@/static/images/dw/su.png" style="width: 88px;height: 88px;" mode=""></image>
							<view class="u-p-t-20 u-p-b-20 m-font-20 m-font-b">{{$t('下注成功')}}</view>
							<view class="u-m-t-20 u-c-g u-text-center m-font-16">{{$t('您的投注已被接受')}}</view>
							<view class="w_100 btn--submit u-text-center u-p-30 u-m-t-30" @click="continueBuy">
								<view class="m-line-1 m-font-18">{{$t('确定')}}</view>
							</view>
						</view>
					</view>
				</view>
			</uni-popup>
			<uni-popup ref="orderError" type="bottom">
				<view class="uc-pop">
					<view class="u-p-40 pop-bottom">
						<view class="u-flex u-row-center flex--direction">
							<image src="@/static/images/dw/error.png" style="width: 88px;height: 88px;" mode=""></image>
							<view class="u-p-t-20 u-p-b-20 m-font-20 m-font-b">{{$t('下注失败')}}</view>
							<view class="u-m-t-20 u-c-g u-text-center m-font-16">{{$t(playMsg)}}</view>
							<view class="w_100 btn--submit u-text-center u-p-30 u-m-t-30" @click="orderErrorClose">
								<view class="m-line-1 m-font-18">{{$t('确定')}}</view>
							</view>
						</view>
					</view>
				</view>
			</uni-popup>
		
			<uni-popup ref="orderKuaiPayPopup" type="center">
				<view class="bs-popup orderPayPopup pc_pop">
					<view class="u-row-right">
						<view class="iconfont icon-close u-m-t-20" @click="orderKuaiPayClose"></view>
					</view>
					<view class="bs-popup-body">
						<view class="res-tip">
							<image src="/static/images/skin/default/success.png" mode=""></image>
							<view class="text">{{$t('user37')}}</view>
						</view>
						<view class="popup-btns flex-center">
							<view class="col">
								<button type="default" @click="goTradeing"
									class="btn btn-sm btn--grey">{{$t("前往交易明细")}}</button>
							</view>
						</view>
					</view>
				</view>
			</uni-popup>
			<!--设置金额  -->
			<u-popup v-model="pricePopup" :mode="mobile_common?'bottom':'center'" borderRadius="32"
				:mask-custom-style="uPopMaskCustomStyle">
				<view class="bs-popup bs-dist-popup">
					<view class="bs-popup-hd m-c-w">
						{{$t("game7")}}
						<view class="iconfont icon-close" @click="close"></view>
					</view>
					<scroll-view scroll-y="true" style="max-height: 60vh;">
						<view class="bs-popup-body">
							<view class="vs-form">
								<uni-forms err-show-type="toast" ref="form1" :modelValue="formData" :rules="rules"
									:label-width="300" :border="false" labelPosition="top">
									<uni-forms-item name="firval" :label='$t("game3")' class="u-m-b-20">
										<uni-easyinput type="number" v-model="formData.firval" :styles="styles"
											:placeholder='$t("public4")' />
									</uni-forms-item>
									<uni-forms-item name="secval" :label='$t("game4")' class="u-m-b-20">
										<uni-easyinput type="number" v-model="formData.secval" :styles="styles"
											:placeholder='$t("public4")' />
									</uni-forms-item>
									<uni-forms-item name="thirdval" :label='$t("game5")' class="u-m-b-20">
										<uni-easyinput type="number" v-model="formData.thirdval" :styles="styles"
											:placeholder='$t("public4")' />
									</uni-forms-item>
								</uni-forms>
							</view>
							<view class="popup-btns flex-center">
								<view class="col">
									<button type="default" @click="close"
										class="btn btn--gray highlight">{{$t("public5")}}</button>
								</view>
								<view class="col">
									<button type="default" @click="quicksubmit"
										class="btn btn--default">{{$t("public6")}}</button>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</u-popup>
			<!-- 快速跟投注 -->
			<u-popup v-model="fastPopup" :mode="mobile_common?'bottom':'center'" :mask-custom-style="uPopMaskCustomStyle" borderRadius="32">
				<view class="bs-popup pc_pop">
					<view class="bs-popup-hd">
						<view class="tt m-c-w">{{$t("赛事详情")}}</view>
						<view class="iconfont icon-close" @click="fastclose"></view>
					</view>
					<view class="bs-popup-body">
						<!-- <view class="fast-user">
							<view class="u-flex u-row-between">
								<view class="u-c-g">{{$t('投注者')}}</view>
								<view class="text-yellow">{{$t(otherOrderList.username)}}</view>
							</view>
							<view class="u-c-g2 u-m-t-10">{{otherOrderList.sc_time}}</view>
						</view> -->
						<view class="ks-fan-card">
							<view class="u-flex w_100 clickOver">
								<view class="u-flex">
									<view class="ksgt-1">
										<image :src="otherOrderList.zd_logo"></image>
									</view>
									<view class="ksgt-1 ksgt-2">
										<image :src="otherOrderList.kd_logo"></image>
									</view>
								</view>
								<view class="u-m-l-26 u-flex u-row-between w_100">
									<view class="m-c-w w_50 u-text-center m-line-1">{{otherOrderList.zd_name}}</view>
									<view class="u-c-g2 u-m-l-10 u-m-r-10 u-text-center" style="min-width: 30px;">VS
									</view>
									<view class="m-c-w w_50 u-text-center m-line-1">{{otherOrderList.kd_name}}</view>
								</view>
							</view>
							<view class="u-flex u-row-between u-m-t-20 u-p-b-20 clickOver"
								style="border-bottom: 1px solid #1E1739;">
								<view>{{otherOrderList.ls_name}} {{otherOrderList.zd_fs}}:{{otherOrderList.kd_fs}}
								</view>
								<view>{{otherOrderList.peilv}}%</view>
							</view>
							<view class="u-flex u-row-between u-m-t-20 clickOver">
								<image src="@/static/images/index/vec1.png" mode="heightFix" style="height: 7rpx;">
								</image>
								<view class="no-flex u-m-l-10 u-m-r-10">{{$t('赛事详情')}}</view>
								<image src="@/static/images/index/vec2.png" mode="heightFix" style="height: 7rpx;">
								</image>
							</view>
							<view class="fast-previews clickOver">
								<view class="fast-preview u-flex u-row-between u-m-t-20 u-p-b-20"
									style="border-bottom: 1px solid #1E1739;">
									<view class="label">{{$t('总投注')}}</view>
									<view class="value">{{otherOrderList.tz_price1+' ₽'}}</view>
								</view>
								<view class="fast-preview u-flex u-row-between u-m-t-20 u-p-b-20"
									style="border-bottom: 1px solid #1E1739;">
									<view class="label">{{$t('game8')}}</view>
									<view class="ks-price-label">
										{{parseFloat(otherOrderList.tz_price * otherOrderList.peilv / 100).toFixed(0)+' ₽'}}
									</view>
								</view>
							</view>
						</view>
						<view class="popup-btns flex-center">
							<view class="col">
								<button type="default" class="btn btn--submit"
									@click="submit(2,otherOrderList.is_pwd)">{{$t("快速投注")}}</button>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
			<!-- 初始化弹窗 -->
			<uni-popup ref="noticeInfoPopup"  :type="mobile_common?'bottom':'center'">
				<view class="bs-popup noticeIndexM_bg u-m-l-30 u-m-r-30 pc_pop">
					<view class="bs-popup-hd font-30 u-row-center " style="line-height: 50px;">
						<view class="tit m-c-w">{{$t("公告")}}</view>
						<view class="iconfont icon-close" @click="closenoticeInfo()"></view>
					</view>
					<view class="contentPopup u-p-30" v-for="(v,i) in noticeInfo" :key="`${i}`+'list'">
						<view class="text_title u-m-b-10 m-c-w">{{$t(v.title)}}
						</view>
						<scroll-view scroll-y="true" class="art-body-content" :show-scrollbar="true">
							<view class="w_100" v-html="v.content">
							</view>
							<view class="text_time u-p-t-50" v-if="v.is_show_time == 1">{{$t(v.add_time)}}</view>
						</scroll-view>
					</view>
				</view>
			</uni-popup>
			<!-- 活动 -->
			<u-popup v-model="activtyPop" mode="bottom" :mask-custom-style="uPopMaskCustomStyle" borderRadius="32">
				<view class="bs-popup pc_pop">
					<view class="bs-popup-hd">
						<!-- <template v-if="tabsCurrent == 0">
						<view class="tt m-c-w">{{$t('公告')}}</view>
					</template>
					<template v-if="tabsCurrent == 1">
						<view class="tt m-c-w">{{$t(activtyData.c_title)}}</view>
					</template> -->
						<view class="game-tabs">
							<u-tabs height="60" bar-height="0" bg-color="none" gutter="60" active-color="#ffffff"
								inactive-color="#ffffff" :list="tabsList" :current="tabsCurrent" @change="tabsChange">
							</u-tabs>
						</view>
						<image src="@/static/images/index/close.png"
							style="width: 32px;height: 32px;position: absolute;right: 15px;" mode=""
							@click="activtyPop = false">
						</image>
					</view>
					<!-- <view class="m-rela">
					<view class="game-tabs">
						<u-tabs height="70" bar-height="0" bg-color="none" gutter="60" active-color="#ffffff"
							inactive-color="#ffffff" :list="tabsList" :current="tabsCurrent" @change="tabsChange">
						</u-tabs>
					</view>
					<view class="dw-line"></view>
				</view> -->
					<scroll-view style="max-height: 60vh;min-height: 60vh;" scroll-y="true">
						<template v-if="tabsCurrent == 0">
							<view class="contentPopup u-p-30" v-for="(v,i) in noticeInfo" :key="`${i}`+'list'">
								<view class="text_title u-m-b-10 m-font-18 m-font-b">{{$t(v.title)}}
								</view>
								<view class="w_100 u-c-g" v-html="v.content">
								</view>
								<view class="text_time u-p-t-50" v-if="v.is_show_time == 1">{{$t(v.add_time)}}</view>
							</view>
						</template>
						<template v-if="tabsCurrent == 1">
							<view class="bs-popup-body">
								<!-- <u-image :src="activtyData.c_img" mode="aspectFill" width="100%" height="184px"
									loading-icon="@/static/images/dw/loading.png"
									error-icon="@/static/images/dw/loading.png" borderRadius="var(--card-radius)">
									<u-loading slot="loading"></u-loading>
									<u-image src="@/static/images/dw/loading.png" slot="error" mode="aspectFill"
										width="100%" height="340rpx" borderRadius="var(--card-radius)">
									</u-image>
								</u-image> -->
								<view class="art-body" v-html="activtyData.c_detail"></view>
								<view class="popup-btns flex-center">
									<button type="default" @click="activtyChange(activtyData.id)"
										class="btn btn--submit">{{$t("public6")}}</button>
								</view>
							</view>
						</template>
					</scroll-view>
				</view>
			</u-popup>
			<!-- 强制绑定提现密码 -->
			<!-- <view class="u-withdrawal" v-if="setUserPwd">
			<u-modal v-model="setUserPwd" :confirm-text="$t('确定')" :content="$t('您还没设置提现密码')"
				confirm-color="var(--ui-color-dark)" @confirm="goSetPwd">
			</u-modal>
		</view> -->
			<u-popup v-model="setUserPwdpopup" mode="center" :mask-close-able="false" border-radius="20">
				<view class="uc-pop">
					<view class="u-flex u-row-between u-p-30 pop-top top-bd">
						<view class="u-m-t-10 m-font-b">{{$t('提示')}}</view>
					</view>
					<view class="u-p-40 pop-bottom bottom-bd">
						<view class="u-p-t-20 u-p-b-20">{{$t('您还没设置提现密码')}}</view>
						<view class="u-flex u-row-center w_100 u-m-t-30">
							<view class="w_50 btn--submit u-text-center u-p-20" @click="goSetPwd">
								<view class="m-line-1 m-font-b">{{$t('前往')}}</view>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
			<!-- 强制绑定手机 -->
			<u-popup v-model="setUserPhonePop" mode="center" :mask-close-able="false" border-radius="20">
				<view class="uc-pop">
					<view class="u-flex u-row-between u-p-30 pop-top top-bd">
						<view class="u-m-t-10 m-font-b">{{$t('提示')}}</view>
					</view>
					<view class="u-p-40 pop-bottom bottom-bd">
						<view class="u-p-t-20 u-p-b-20">{{$t('您还没绑定手机')}}</view>
						<view class="u-flex u-row-center w_100 u-m-t-30">
							<view class="w_50 btn--submit u-text-center u-p-20" @click="bindPhoneChange">
								<view class="m-line-1 m-font-b">{{$t('前往')}}</view>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
			<!-- 强制绑定邮箱 -->
			<u-popup v-model="setUserMailPop" mode="center" :mask-close-able="false" border-radius="20">
				<view class="uc-pop">
					<view class="u-flex u-row-between u-p-30 pop-top top-bd">
						<view class="u-m-t-10 m-font-b">{{$t('提示')}}</view>
					</view>
					<view class="u-p-40 pop-bottom bottom-bd">
						<view class="u-p-t-20 u-p-b-20">{{$t('您还没绑定邮箱')}}</view>
						<view class="u-flex u-row-center w_100 u-m-t-30">
							<view class="w_50 btn--submit u-text-center u-p-20" @click="bindMailChange">
								<view class="m-line-1 m-font-b">{{$t('前往')}}</view>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
			<!-- 反馈 -->
			<u-popup v-model="faqModel" mode="bottom" border-radius="16" :mask-custom-style="uPopMaskCustomStyle">
				<view class="bs-popup">
					<view class="bs-popup-body">
						<view class="faq-top u-m-b-30">{{$t('帮助我们改善产品体验')}}</view>
						<view class="faq-body u-m-b-30">
							<textarea placeholder-style="color:var(--text-light)" :placeholder="$t('FeedbackText1')"
								cols="30" v-model="faqText" rows="10"></textarea>
						</view>
						<view class="faq-foot">
							<view class="faq-tip">{{$t('现在因您的宝贵反馈而获得奖励')}}</view>
							<view class="faq-button">
								<button class="btn btn--default" @click="getfeedback(faqText)">{{$t('留言')}}</button>
							</view>
							<view class="faq-tip">{{$t('或给我们发电子邮件')}}: <text class="text-blue"
									@click="platUrl($t('FeedbackEmailUrl'))">{{$t('FeedbackEmail')}}</text>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
	</view>
</template>
<script>
	// window.__lc = window.__lc || {};
	// window.__lc.license = 17609148;;
	// (function(n, t, c) {
	// 	function i(n) {
	// 		return e._h ? e._h.apply(null, n) : e._q.push(n)
	// 	}
	// 	var e = {
	// 		_q: [],
	// 		_h: null,
	// 		_v: "2.0",
	// 		on: function() {
	// 			i(["on", c.call(arguments)])
	// 		},
	// 		once: function() {
	// 			i(["once", c.call(arguments)])
	// 		},
	// 		off: function() {
	// 			i(["off", c.call(arguments)])
	// 		},
	// 		get: function() {
	// 			if (!e._h) throw new Error("[LiveChatWidget] You can't use getters before load.");
	// 			return i(["get", c.call(arguments)])
	// 		},
	// 		call: function() {
	// 			i(["call", c.call(arguments)])
	// 		},
	// 		init: function() {
	// 			var n = t.createElement("script");
	// 			n.async = !0, n.type = "text/javascript", n.src = "https://cdn.livechatinc.com/tracking.js", t
	// 				.head.appendChild(n)
	// 		}
	// 	};
	// 	!n.__lc.asyncInit && e.init(), n.LiveChatWidget = n.LiveChatWidget || e
	// }(window, document, [].slice))
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import uniNavFooter from '@/components/uni-foot-bar/uni-foot-bar.vue'
	import guide from '@/components/guides/guides.vue'
	import easySelect from "@/components/easy-language/easy-select.vue"
	import gameSwiper from "@/components/my-swiper/game-swiper.vue"
	import turntable from "@/components/turntable-list/draw-one/draw-one.vue"
	import uMessageInput from '@/components/u-message-input/u-message-input.vue'
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	import pcSideTrade from "@/components/pc-side-trade/trade.vue"
	import pcFoot from "@/components/pc-foot/pc-foot.vue"
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import {
		accAdd
	} from '@/common/tool.js'
	export default {
		components: {
			uniNavHeader,
			uniNavFooter,
			guide,
			easySelect,
			gameSwiper,
			turntable,
			pcNavHeader,
			uMessageInput,
			pcSideBar,
			pcSideTrade,
			pcFoot,
			listEmpty

		},
		data() {
			return {
				skeletonLoading: true, // 是否显示骨架屏组件
				matchList2: {},
				marketSwiperCurrent: 0,
				marketSwiperCurrent2: 0,
				marketSwiperCurrent3: 0,
				sideshow: false,
				matchList: [],
				matchListVip: [],
				matchListResult: [],
				matchListResult_one: [],
				matchListResult_two: [],
				matchplay: [],
				matchbd: [],
				quickmoney: [],
				indicatorDots: true,
				autoplay: true,
				interval: 7000,
				duration: 500,
				odds: 0,
				formData: {
					firval: '',
					secval: '',
					thirdval: '',
					jprice: ''
				},
				betdetila: {},
				ranking: [],
				selecLang: '',
				bannerList: [],
				resultPrice: 0,
				ygValue: 2,
				rules: {
					// 对name字段进行必填验证
					firval: {
						rules: [{
							required: true,
							errorMessage: this.$t("public4"),
						}, ]
					},
					secval: {
						rules: [{
							required: true,
							errorMessage: this.$t("public4"),
						}, ]
					},
					thirdval: {
						rules: [{
							required: true,
							errorMessage: this.$t("public4"),
						}, ]
					},
					jprice: {
						rules: [{
							required: true,
							errorMessage: this.$t("请输入交易金额"),
						}, ]
					},
				},
				// 初始化弹窗
				noticeInfo: [],
				moneyType: 1, //1余额 2基金
				circleColor: '',
				fundShowType: null,
				ticeList: [],
				noticeList: [],
				clickNoticeUrl: [],
				ticeBarIndex: null,
				doanload: {},
				lucky_x: 0,
				lucky_y: 0,
				listPopup: false,
				payType: false, //选择支付渠道
				morePopup: false,
				pricePopup: false,
				luckyStatus: 0,
				isFlyerStatus: null, //小飞机入口
				showPilot: true,
				gameListArr: [],
				gameListResult: [],
				gameSwiperCurrent: 0,
				setUserPwd: false, //强制绑定密码
				index_nav_status: false,
				styles: {
					color: '#ffffff',
					borderColor: '#1a1a22',
					borderRadius: "16px"
				},
				backshowtip: 0,
				cateValue: 0,
				caterange: [{
						value: 0,
						text: this.$t("user1")
					},
					{
						value: 1,
						text: this.$t("活期余额")
					},
				],
				game_item_w1: 0,
				game_item_h1: 0,
				game_item_w2: 0,
				game_item_h2: 0,
				orderList: [],
				otherOrderList: {},
				isGuide: false,
				match_all_count: '', //全部赛事数量
				// 暗黑 明亮模式
				// themeMode: 'dark',
				faqModel: false, //反馈
				selecValue: 'CN',
				iconV: '@/static/images/cn.png',
				faqText: '', //用户反馈内容
				skeleton2: 1, //第一行热门赛事
				skeleton3: 1, //第二行热门赛事
				marketProfit: false,
				setUserPwdpopup: false,
				setUserPhonePop: false,
				setUserMailPop: false,
				rightPx: '',
				onlineUserCount: 0,
				onlineTime: null,
				zSwiperOptions: {
					effect: 'cards',
					// slidesPerView: 'auto',
					// loopedSlides: 2,
					cardsEffect: {
						rotate: false,
						perSlideOffset: 14,
					},
					autoplay: {
						delay: 2000, //2s切换一次
					}
				},
				slideCustomStyle: {
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: '36rpx'
				},
				indexGameList: [],
				cooperList: [],
				indexGameType: [],
				VIPPlayClass: false,
				quicklyKeys: 0,
				turntableStatus: 0,
				scrollTop: 0,
				scrollCustomStyle: {
					background: '#394156',
					borderRadius: '5px'
				},
				scrollIconStyle: {
					color: '#000',
					fontSize: '16px'
				},
				currentIndex: 0,
				currentIndexFooter: 0,
				pcMarketCount: 4,
				gameHotList: [],
				gameSwiperCurrent: 0,
				androidIos: null, // 1安卓 2IOS
				iosBut: 0,
				androidIos: null, // 1安卓 2IOS
				doanLoadAnd: false, // 安卓下载
				doanLoadIOS: false, // IOS下载
				swiperDisable: true,
				playMsg: '',
				fastPopup: false,
				activtyPop: false,
				activtyData: {},
				tabsList: [{
					name: this.$t('公告')
				}, {
					name: this.$t('活动')
				}],
				tabsCurrent: 0,
				TermsServicePop: false,
				indexNoticeList: [],
				current: 0,
			}
		},
		computed: {
			tabs() {
				return [{
						name: this.$t("最新投注")
					},
					{
						name: this.$t("排行榜")
					},
				]
			},
		},
		watch: {
			gameListArr(l1) {
				if (l1.length > 0) {
					this.$nextTick(function() {
						this.$get_width(this, '.gameView1', 'game_item_w1', 'game_item_h1', 1, 1);
						this.game_item_w2 = this.game_item_h2 = (this.game_item_h1 / 2) - 2 + 'px'
						this.game_item_w1 = this.game_item_w1 + 'px'
						this.game_item_h1 = this.game_item_h1 + 'px'
					})
				}
			},
		},
		async onShow() {
			if (this.userToken_common) {
				if(!this.$helper.get('isGuide')){
					this.onShowChange();
				}else{
					await this.getGuide();
				}
			}
			this.turntableStatus = this.$helper.get('rule').turntableStatus;
			this.selecLang = uni.getStorageSync('i18n_lang');
			this.rightPx = '10px';
			if (this.mobile_common) {
				this.getDoanload();
			}
			uni.setNavigationBarTitle({
				title: this.$t('web_name')
			});
		},
		async onLoad() {
			await this.getMobile();
			await this.setHeadInfo();
			await this.setCapableTitle();
			this.getmatch(); // 热门赛事
			this.getmatch2(); // 即将进行赛事
			this.getOrderList();
			this.getBanner();
			this.getGameList();
			this.getRule_common(5);
			this.getSystemFalseProfit();
			// this.getGameHotList();
			if (!this.mobile_common) {
				this.getRanking();
				this.getmatchVip() // pc 需要
			}
		},
		// onHide() {
		// 	clearTimeout(this.onlineTime);
		// },
		onReachBottom() {},
		mounted() {
			this.getColor();
			this.selecValue = this.$helper.getLang();
			let all_lang = this.$helper.get('alllang');
			if (all_lang != null) {
				for (let i = 0; i < all_lang.length; i++) {
					if (this.selecValue == all_lang[i].value) {
						this.iconV = all_lang[i].icon;
					}
				}
			}
		},
		methods: {
			async skipTutorialIndex(){
				await this.skipTutorial();
				await this.onShowChange();
			},
			onShowChange(){
				if (this.userInfo_common.is_new == 1) {
					this.userTutorial = true;
					if (this.$helper.get('tutorialKey') > 1) {
						this.tutorialKey = this.$helper.get('tutorialKey');
					}else  {
						this.tutorialKey = 1;
					}
					return
				} else {
					this.userTutorial = false;
				}
				// 强制绑定手机
				if (this.$helper.get('loginStatus') && parseInt(this.$helper.get('rule').phone_force_bind) == 1 &&
					parseInt(this.$helper.get('rule').phone_bind) == 1 && !this.userInfo_common.yphone && this
					.userInfo_common.is_new == 2) {
					this.setUserPhoneOpen();
					return
				}
				// 强制绑定邮箱
				if (this.$helper.get('loginStatus') && parseInt(this.$helper.get('rule').phone_force_bind) == 1 &&
					parseInt(this.$helper.get('rule').phone_bind) == 2 && !this.userInfo_common.mail && this
					.userInfo_common.is_new == 2) {
					this.setUserMailOpen();
					return
				}
				// 强制绑定提现密码
				if (this.$helper.get('testPwd') && !this.$helper.get('userWithPwd') && this.$helper.get(
						'loginStatus') && parseInt(this.$helper.get('rule').force_pwd) == 1 && !this
					.index_nav_status && !this.setUserPwdpopup && this.userInfo_common.is_new == 2) {
					this.setUserPwdOpen();
					return
				}
				this.showActivity = this.$helper.get('showActivity');
				if (this.showActivity && this.userInfo_common.is_new == 2) {
					this.getActivity();
				}
			},
			userTutorialStatus() {
				if ((this.tutorialKey == 1 || this.tutorialKey == 2 || this.tutorialKey == 3) && this.userTutorial && this
					.userInfo_common) {
					this.tutorialChange(this.$helper.get('tutorialKey'));
				}
			},
			bindPhoneChange() {
				this.setUserPhonePop = false;
				this.$go('/pages/ucenter/bindPhone');
			},
			bindMailChange() {
				this.setUserMailPop = false;
				this.$go('/pages/ucenter/bindMail');
			},
			tutorialChange(i) {
				this.tutorialKey = i;
				this.$helper.set('tutorialKey', i);
				// if (i == 2 || i == 3) {
				// 	this.openList(this.matchList[0], false);
				// } else if (i == 4) {
				// 	this.listPopup = false;
				// 	this.$go(
				// 		`/pages/market/marketContent?id=${this.matchList[0].sc_id}&is_pwd=${this.matchList[0].is_pwd}`);
				// }
				this.$go(
					`/pages/market/marketContent?id=${this.matchList[0].sc_id}&is_pwd=${this.matchList[0].is_pwd}`);
			},
			async getSystemFalseProfit() {
				let text1 = this.$t('恭喜用户');
				let text2 = this.$t('领取代理佣金');
				let text3 = this.$t('下注赛事盈利');
				this.indexNoticeList = [];
				let res = await this.$u.api.system_false_profit_p();
				if (res && res.code == 1) {
					let arr = [];
					arr = res.data;
					for (let i in arr) {
						arr[i].quer = text1 + ' ' + arr[i].username + ' ' + (arr[i].type == 1 ? text3 : text2) + ' ' +
							arr[i].price;
						this.indexNoticeList.push(arr[i].quer);
					}
				}
			},
			guideChange(e) {
				this.isGuide = e;
				this.onShowChange();
			},
			getGuide() {
				let gui = this.$helper.get('isGuide');
				if (gui && this.$helper.get('token_key')) {
					this.isGuide = true;
					this.$helper.set('isGuide', false);
					return false
				} else {
					this.isGuide = false;
				}
			},
			tabsChange(e) {
				this.tabsCurrent = e;
			},
			getmatch2() {
				this.$u.api.matchlist_p({
					limit: 1,
					date: 'today'
				}).then(res => {
					if (res && res.code == 1) {
						this.matchList2 = res.data.list[0];
					}
				});
			},
			async finish(e) {
				uni.showLoading({
					title: this.$t("loading")
				});
				this.marketVipClose();
				let ret = await this.$u.api.matchbuy_p({
					sc_id: this.matchplay.sc_id,
					bd_id: this.matchbd.bd_id,
					money: this.formData.jprice,
					money_type: 1,
					match_pwd: e
				});
				if (ret.code == 1) {
					this.orderList = [];
					if (this.mobile_common) {
						this.$refs.header.headUserBan();
					}
					uni.hideLoading();
					this.closeList();
					this.$refs.orderPayPopup.open();
					this.formData.jprice = '';
					this.input(0);
				} else {
					uni.hideLoading();
					this.playMsg = ret.msg;
					this.orderErrorChange();
				}
			},
			marketVipChange() {
				this.listPopup = false;
				this.$refs.marketVipPop.open()
			},
			marketVipClose() {
				this.listPopup = true;
				this.$refs.marketVipPop.close()
			},
			marketChange() {
				this.listPopup = false;
				this.$go(`/pages/market/marketContent?id=${this.matchplay.sc_id}&is_pwd=${this.matchplay.is_pwd}`)
			},
			swiperTransition(e) {
				this.swiperDisable = false;
			},
			swiperAnimationfinish(e) {
				this.swiperDisable = true;
			},
			androidDownload() {
				window.location.href = this.$t('AndroidDownloadUrl_Looks');
			},
			iosDownload() {
				if (this.iosBut == 0) {
					window.location.href = this.$t('IOSDownloadUrl_Looks');
					this.iosBut = 1;
				} else {
					window.location.href = 'https://www.pgyer.com/app/getProvisionFile';
				}
			},
			async getDoanload() {
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
				if (this.$t('AndroidDownloadUrl_Looks') != 'AndroidDownloadUrl_Looks') {
					this.doanLoadAnd = true;
				} else {
					this.doanLoadAnd = false;
				}
				if (this.$t('IOSDownloadUrl_Looks') != 'IOSDownloadUrl_Looks') {
					this.doanLoadIOS = true;
				} else {
					this.doanLoadIOS = false;
				}
			},
			hotChange(i) {
				this.gameSwiperCurrent = i.detail.current;
			},
			async getGameHotList() {
				let res = await this.$u.api.game_index_new_p();
				if (res && res.code == 1) {
					// this.gameHotList = res.hot;
					let hotList = res.hot;
					let newList = res.new;
					for (let i in hotList) {
						hotList[i].labelImg = require('@/static/images/index/hot.png');
						hotList[i].labelText = 'HOT';
					}
					for (let i in newList) {
						newList[i].labelImg = require('@/static/images/index/new.png');
						newList[i].labelText = 'NEW';
					}
					this.gameHotList = hotList.concat(newList);
				}
			},
			swiperChangePC(i) {
				this.currentIndex = i.detail.current;
			},
			swiperChangeFooter(i) {
				this.currentIndexFooter = i.detail.current;
			},
			quicklyChange(i) {
				this.quicklyKeys = i;
			},
			changeTab(index) {
				this.quicklyKeys = index;
				this.current = index;
			},
			wheelDialog() {
				if (this.$helper.get('token')) {
					this.$nextTick(() => {
						this.$refs.myWheel.wheelshowChange();
					})
				} else {
					this.$go('/pages/login/index');
				}
			},
			configBan() {
				this.$refs.header.headUserBan();
			},
			goSports() {
				let option = this.$helper.get('game_data_v2');
				uni.navigateTo({
					url: '/pages/sportsThird/sportsThird?gid=' + option.id
					// url: '/pages/sports/index'
				})
			},
			async getGameType() {
				let res = await this.$u.api.game_get_type_p();
				if (res && res.code == 1) {
					this.indexGameType = res.data;
				}
			},
			async getIndexGame() {
				let parme = {
					page: 1,
					limit: 15,
				};
				let res = await this.$u.api.game_list_p(parme);
				if (res) {
					this.indexGameList = res.data;
				}
			},
			// 获取合作伙伴
			async getCooperativepartnerLists() {
				let res = await this.$u.api.cooperativepartner_lists_p({
					is_all: 1
				})
				if (res) {
					this.cooperList = res.data;
				}
			},
			async getonline_user() {
				let res = await this.$u.api.online_user_p();
				if (res) {
					this.onlineUserCount = res.data;
					clearTimeout(this.onlineTime);
					this.onlineTime = setTimeout(() => {
						this.getonline_user();
					}, 10000);
				}
			},
			async getGameList() {
				let res = await this.$u.api.game_list_p({
					page: 1,
					limit: 1,
					sports: 1
				});
				if (res && res.data.length > 0) {
					this.$helper.set('game_data_v2', res.data[0]);
				}
			},
			setUserPwdOpen() {
				this.setUserPwdpopup = true;
			},
			setUserPwdClose() {
				this.setUserPwdpopup = false;
			},
			setUserPhoneOpen() {
				this.setUserPhonePop = true;
			},
			setUserPhoneClose() {
				this.setUserPhonePop = false;
			},
			setUserMailOpen() {
				this.setUserMailPop = true;
			},
			setUserMailClose() {
				this.setUserMailPop = false;
			},
			// 用户反馈
			async getfeedback(content) {
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.feedback_add_p({
					content
				});
				if (res) {
					uni.hideLoading();
					this.faqModel = false;
					this.faqText = '';
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
				}
			},
			// 快速投注
			fastopen(item) {
				if (this.userInfo_common) {
					this.otherOrderList = {};
					this.otherOrderList = item;
					this.fastPopup = true;
				} else {
					this.$go('/pages/login/index');
				}
			},
			fastclose() {
				this.fastPopup = false;
			},
			// 跟投
			async getOrderList() {
				let res = await this.$u.api.order_list_p({
					limit: 10
				});
				if (res && res.code == 1) {
					this.orderList = res.data;
				}
			},
			swiperMarketList(e) {
				this.marketSwiperCurrent = e.detail.current;
			},
			swiperMarketList2(e) {
				this.marketSwiperCurrent2 = e.detail.current;
			},
			swiperMarketList3(e) {
				this.marketSwiperCurrent3 = e.detail.current;
			},
			swiperGameList(e) {
				this.gameSwiperCurrent = e.detail.current;
			},
			goMatchplay(id) {
				this.listPopup = false;
				this.$go('/pages/market/marketContent?id=' + id);
			},
			headerPwd(e) {
				this.index_nav_status = e;
			},
			goSetPwd() {
				this.setUserPwdClose();
				this.$go('/pages/ucenter/profile?setpwd=' + true);
			},
			async getGameStatus() {
				let res = await this.$u.api.game_get_game_url_p();
				if (res) {
					this.gameListResult = res.data;
					let arr1 = [];
					for (var i = 0; i < 3; i += 3) {
						arr1.push(this.gameListResult.slice(i, 3));
					}
					if (this.gameListResult.length > 2) {
						let arr2 = [];
						for (var i = 3; i < this.gameListResult.length; i += 6) {
							arr2.push(this.gameListResult.slice(i, i + 6));
						}
						this.gameListArr = [...arr1, ...arr2];
					} else {
						this.gameListArr = arr1;
					}
					for (let j in this.gameListArr) {
						if (j > 0) {
							if (this.gameListArr[j].length > 1 && this.gameListArr[j].length < 6) {
								this.gameListArr[j] = [...this.gameListArr[j], ...new Array(6 - this.gameListArr[j]
									.length).fill('')];
							}
						}
					}
				}
			},
			async gameListClisk() {
				let this_ = this;
				if (this_.userToken_common) {
					if (this.$store.state.indexGameObj.game_status == 1) {
						if (this.$store.state.indexGameObj.tc_code == 'PB') {
							this.commonPBchange();
						}
						// 平博三方 IOS 特殊处理
						if (this.$store.state.indexGameObj.tc_code == 'PB' && uni.getSystemInfoSync().platform ==
							'ios') {
							uni.showLoading({
								title: this_.$t('loading')
							});
							let PB_res = await this_.$u.api.game_login_game_p({
								platform: 2,
								back_url: window.location.href,
								gid: this.$store.state.indexGameObj.id
							});
							if (PB_res && PB_res.code == 1) {
								uni.hideLoading();
								location.href = PB_res.data;
							} else {
								this.$refs.uTips.show({
									title: this.$t('请联系客服')
								});
							}
						} else {
							uni.navigateTo({
								url: '/pages/otherGame/otherGame?tid=' + this.$store.state.indexGameObj
									.g_tcid + '&gid=' + this.$store.state.indexGameObj.id
							})
						}
					} else {
						this.$refs.uTips.show({
							title: this.$t('待开放')
						});
					}
				} else {
					this.$go('/pages/login/index');
				}
			},
			//抽奖配置
			async luckyDrawIsShow() {
				let that = this;
				let res = await that.$u.api.lotteryconfig_api();
				if (res) {
					if (res.code == 1) {
						that.luckyStatus = res.data.status * 1;
					}
				}
			},
			goService() {
				window.open(this.doanload.pc_service_url, '_blank');
			},
			noticeBarClick(t) {
				for (let a in this.clickNoticeUrl) {
					if (this.userToken_common && t == a) {
						if (this.clickNoticeUrl[a]) {
							if (type == 1) {
								this.$go('/pages/notice/noticeDetail?id=' + this.clickNoticeUrl[a]);
							} else if (type == 2) {
								this.$go('/pages/notice/index?id=' + this.clickNoticeUrl[a]);
							}
						}
					}
				}
			},
			funClassClick(e) {
				this.resultPrice = 0;
				this.formData.jprice = '';
				this.moneyType = e;
			},
			showFundType(e) {
				this.resultPrice = 0;
				this.formData.jprice = '';
				this.moneyType = e;
			},
			getColor() {
				if (this.mobile_common) {
					let elem = document.getElementById("circleColor");
					if (elem) {
						let theCSSprop = window.getComputedStyle(elem, null);
						this.circleColor = theCSSprop.getPropertyValue("color");
					}
				}
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			ygChange(e) {
				this.ygValue = e.detail.value;
				if (e.detail.value == 1) {
					this.odds = this.matchbd.zbd_pl;
				} else {
					this.odds = this.matchbd.fbd_pl;
				}
				this.input(this.formData.jprice);
			},
			_isMobile() {
				let flag = navigator.userAgent.match(
					/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
				)
				return flag;
			},
			// jump(item) {
			// 	if (this.userToken_common) {
			// 		this.$go('/pages/login/index')
			// 	} else {
			// 		this.$go(item.url);
			// 	}
			// },
			getBanner() {
				this.$u.api.banner_p().then(ret => {
					if (ret && ret.code == 1) {
						if (!this._isMobile()) {
							for (let key in ret.data['pc']) {
								if (ret.data['pc'][key].lang == this.$helper.getLang() && ret.data['pc'][
										key
									].show_position == 1) {
									this.bannerList.push(ret.data.pc[key]);
								}
							}
						} else {
							if (ret.data['mobile'].length > 0) {
								for (let key in ret.data['mobile']) {
									if (ret.data['mobile'][key].lang == this.$helper.getLang() && ret.data[
											'mobile'][key].show_position == 1) {
										this.bannerList.push(ret.data.mobile[key]);
									}
								}
							}
						}
						// for (let key in ret.data['pc']) {
						// 	if (ret.data['pc'][key].lang == this.$helper.getLang() && ret.data['pc'][
						// 			key
						// 		].show_position == 1) {
						// 		this.bannerList.push(ret.data.pc[key]);
						// 	}
						// }
					}
				});
			},
			showMarket() {
				this.pcMarketCount = 14;
				this.getmatch();
			},
			getmatch() {
				this.$u.api.match_hot_match_p().then(res => {
					this.skeletonLoading = false;
					if (res && res.code == 1) {
						let arr = res.data.list;
						this.match_all_count = res.data.all_count;
						for (let i in arr) {
							let items = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
							arr[i].bgImg = items[Math.floor(Math.random() * items.length)]
						}
						this.matchList = arr;
						// if (this.$helper.get('tutorialKey') > 1) {
						// 	this.userTutorialStatus();
						// }
					}
				});
			},
			getmatchVip() {
				this.$u.api.match_vip_match_p().then(res => {
					this.skeletonLoading = false;
					if (res && res.code == 1) {
						let arr = res.data.list;
						this.match_all_count = res.data.all_count;
						for (let i in arr) {
							let items = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
							arr[i].bgImg = items[Math.floor(Math.random() * items.length)]
						}
						this.matchListVip = arr;
					}
				});
			},
			// 公告弹窗
			async getNoticeList() {
				let res = await this.$u.api.noticelist_p({
					show_loca: 1,
					limit: 1,
					type: 0
				});
				if (res.data.length > 0 && res.code == 1) {
					this.noticeInfo = res.data;
					let showNotice = this.$helper.get('shouNotice');
					if (showNotice) {
						this.$refs.noticeInfoPopup.open();
						this.$helper.set('shouNotice', false);
					}
				}
			},
			async getActivity() {
				let ret = await this.$u.api.noticelist_p({
					show_loca: 1,
					limit: 1,
					type: 0
				});
				if (ret.data.length > 0 && ret.code == 1) {
					this.noticeInfo = ret.data;
				}
				let res = await this.$u.api.actionlist_p({
					limit: 1
				});
				if (res.data.length > 0 && res.code == 1) {
					this.activtyData = res.data[0];
					let showActivity = this.$helper.get('showActivity');
					if (showActivity) {
						this.activtyPop = true;
						this.$helper.set('showActivity', false);
					}
				}
			},
			activtyChange(id) {
				this.activtyPop = false;
				this.$go('/pages/activityHall/activityDetail?id=' + id);
			},
			// 跑马灯
			async getNoticeBar(e) {
				this.ticeList = [];
				this.noticeList = [];
				this.clickNoticeUrl = [];
				let res = await this.$u.api.noticelist_p({
					type: 1, //跑马灯新增参数
					show_loca: 1,
					limit: 10
				});
				if (res.data.length > 0) {
					this.ticeList = res.data;
				}
				for (let a in this.ticeList) {
					let str = this.ticeList[a].content.split('\n').map(e => e.replace(/<\/?p>/g, '')).join('\b');
					this.noticeList.push(str);
					this.clickNoticeUrl.push(this.ticeList[a].id);
				}
			},
			closenoticeInfo() {
				this.$refs.noticeInfoPopup.close();
			},
			getRanking() {
				this.$u.api.ranking_p().then(res => {
					if (res.data != null) {
						this.ranking = res.data;
					}
				});
			},
			// 弹窗
			open() {
				this.listPopup = false;
				this.pricePopup = true;
			},
			async close() {
				this.pricePopup = false;
				if (this.isGoogle != 1) {
					this.listPopup = true;
				}
			},
			async getquick() {
				if (this.$t('profitCommission') != 'profitCommission') {
					this.marketProfit = true;
				} else {
					this.marketProfit = false;
				}
				this.quickmoney = this.$helper.get('index-quickmoney');
				let res = await this.$u.api.getquick_p();
				if (res) {
					if (res.code == 1) {
						this.$helper.set('index-quickmoney', res.data);
						this.quickmoney = res.data;
					}
				}
			},
			payStatus() {
				if (this.isGoogle != 1) {
					this.listPopup = true;
				}
				this.payType = false;
			},
			// 弹窗
			async openList(sc, VIPkeys) {
				if (this.userToken_common) {
					// 是否新手指导
					if (this.userTutorial && this.tutorialKey == 1) {
						this.tutorialChange(4);
					} else {
						this.$go(`/pages/market/marketContent?id=${sc.sc_id}&is_pwd=${sc.is_pwd}`);
						// this.matchplay = sc;
						// this.matchbd = sc.bd;
						// this.odds = sc.bd.fbd_pl;
						// this.ygValue = 2;
						// this.formData.jprice = '';
						// this.resultPrice = 0;
						// if (this.fundShowType == 1) {
						// 	this.getUserInfo_common();
						// }
						// if (this.isGoogle != 1) {
						// 	this.listPopup = true;
						// 	if (VIPkeys) {
						// 		this.VIPPlayClass = VIPkeys;
						// 	}
						// }
					}
				} else {
					this.$go('/pages/login/index');
				}
			},
			closeList() {
				// if (this.userTutorial && this.tutorialKey == 2) {
				// 	this.tutorialChange(3);
				// } else {
				// 	this.listPopup = false;
				// }
				this.listPopup = false;
			},
			addMoney(money, type) {
				if (this.moneyType == 1) {
					if (type == 0) {
						let m = this.$refs.money.val;
						if ((typeof m) == 'undefined') {
							m = 0;
						}
						money = accAdd(money, parseInt(m * 1));
						if (money > this.userInfo_common.balance) {
							money = this.userInfo_common.balance;
						}
					}
					this.formData.jprice = money;
					this.$refs.money.val = money;
					this.input(money);
				} else if (this.moneyType == 2) {
					if (type == 0) {
						let m = this.$refs.money.val;
						if ((typeof m) == 'undefined') {
							m = 0;
						}
						money = accAdd(money, parseInt(m * 1));
						if (money > this.userInfo_common.live_fund_money) {
							money = this.userInfo_common.live_fund_money;
						}
					}
					this.formData.jprice = money;
					this.$refs.money.val = money;
					this.input(money);
				}
			},
			quicksubmit() {
				this.$refs.form1.validate().then(async res => {
					uni.showLoading({
						mask: true,
						title: this.$t("loading")
					});
					let ret = await this.$u.api.editquick_p({
						quick1: res.firval,
						quick2: res.secval,
						quick3: res.thirdval
					});
					if (ret) {
						this.quickmoney.quick1 = res.firval;
						this.quickmoney.quick2 = res.secval;
						this.quickmoney.quick3 = res.thirdval;
						uni.hideLoading();
						this.close();
					}
				}).catch(err => {

				})
			},
			orderErrorChange() {
				this.$refs.orderError.open();
			},
			orderErrorClose() {
				this.$refs.orderError.close();
			},
			async submit(type, is_pwd) { // 1普通投注 2快速跟投
				if (type == 1) {
					// if (this.userTutorial && this.tutorialKey == 2) {
					// 	this.tutorialChange(3);
					// 	return
					// }
					if (this.formData.jprice == '') {
						this.$refs.uTips.show({
							title: this.$t('请输入交易金额')
						});
					} else {
						if (is_pwd == 1) {
							this.marketVipChange();
						} else {
							uni.showLoading({
								title: this.$t("loading")
							});
							let ret = await this.$u.api.matchbuy_p({
								sc_id: this.matchplay.sc_id,
								bd_id: this.matchbd.bd_id,
								money: this.formData.jprice,
								money_type: 1
							});
							if (ret.code == 1) {
								this.orderList = [];
								this.getOrderList();
								if (this.mobile_common) {
									this.$refs.header.headUserBan();
								}
								uni.hideLoading();
								this.closeList();
								this.$refs.orderPayPopup.open();
								this.formData.jprice = '';
								this.input(0);
							} else {
								uni.hideLoading();
								this.playMsg = ret.msg;
								this.orderErrorChange();
							}
						}
					}
				} else {
					uni.showLoading({
						mask: true,
						title: this.$t("loading")
					});
					let money = 0;
					if (this.userInfo_common.balance > 0) {
						if (this.userInfo_common.balance > this.otherOrderList.tz_price) {
							money = this.otherOrderList.tz_price;
						} else {
							money = this.userInfo_common.balance;
						}
					} else {
						this.$refs.uTips.show({
							title: this.$t('余额不足')
						});
					}
					let ret = await this.$u.api.matchbuy_p({
						sc_id: this.otherOrderList.sc_id,
						bd_id: this.otherOrderList.bd_id,
						zd_type: this.ygValue,
						money: this.otherOrderList.tz_price
					});
					if (ret.code == 1) {
						this.orderList = [];
						this.getOrderList();
						if (this.mobile_common) {
							this.$refs.header.headUserBan();
						}
						uni.hideLoading();
						this.fastPopup = false;
						this.$refs.orderPayPopup.open();
					} else {
						uni.hideLoading();
						this.playMsg = ret.msg;
						this.orderErrorChange();
					}
				}
			},
			continueBuy() {
				this.$refs.orderPayPopup.close();
			},
			goTradeing() {
				uni.navigateTo({
					url: '/pages/tradeing/index'
				});
				this.orderPayClose();
				this.orderKuaiPayClose();
			},
			orderPayClose() {
				this.$refs.orderPayPopup.close();
			},
			orderKuaiPayClose() {
				this.$refs.orderKuaiPayPopup.close();
			},
			// 交易金额，预估获利
			input(e) {
				if (this.moneyType == 1) {
					if (parseInt(e) > this.userInfo_common.balance) {
						e = this.userInfo_common.balance;
					}
					this.resultPrice = parseFloat(e * this.odds / 100).toFixed(2)
				} else if (this.moneyType == 2) {
					if (parseInt(e) > this.userInfo_common.live_fund_money) {
						e = this.userInfo_common.live_fund_money;
					}
					this.resultPrice = parseFloat(e * this.odds / 100).toFixed(2)
				}
			},

			catechange(e) {
				this.cateValue = e;
				if (e == 0) {
					this.moneyType = 1;
				} else {
					this.moneyType = 2;
				}
			},
			useOutClickSide() {
				this.$refs.easySelect.hideOptions && this.$refs.easySelect.hideOptions();
			},
			showLang(e) {
				this.show = e;
				this.tips = true;
			},
			selectOne(options) {
				this.$helper.setLang(options.label);
				this.$i18n.locale = options.label;
				this.selecValue = options.label;
				this.iconV = options.icon;
				this.langStatus = true;
				this.$router.go(0);
			},
		}
	}
</script>

<style lang="scss">
	.content {
		background: #ffffff;
	}

	.index-banner {
		padding: 15px 10px;
		background: #1E1739;
	}

	.index-main {
		background-image: var(--index-main-bg);
		background-repeat: no-repeat;
		background-position: center top;
		background-size: contain;
		padding-top: 60px;
		padding-bottom: 0;
		padding-right: 0;
		padding-left: 0;
	}

	.index-main-border {
		background: #1E1739;
		padding-bottom: 20px;
	}

	.game-popup-top {
		padding: 15px;
		background-image: url('@/static/images/index/m-coon3.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
		border-radius: 16px;
		position: relative;
	}


	.game-popup-top::after {
		content: "";
		border-radius: 16px;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(to bottom, rgba(53, 49, 103, 0.88), rgba(53, 49, 103, 0.88));
	}


	.vs-form ::v-deep .uni-select__selector {
		top: auto;
		bottom: calc(100% + 6px);
	}

	.foot-grid {
		padding-top: 10px;
		padding-bottom: 20px;

		.text {
			font-size: 10px;
			color: var(--text-light)
		}

		.text-top {}

		.text-bottom {}
	}

	.lang-swicth {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--card-radius);
	}

	.faq-swicth {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
		color: #fff;
		background: #000F50;
		margin-left: 10px;
		min-width: 200px;
		padding: 0 10px;
		line-height: 1;
		border-radius: var(--card-radius);

		.icon-icomsg {
			font-size: 20px;
		}
	}

	.faq-top {
		text-align: center;
		font-size: 16px;
		padding: 10px 0;
	}

	.faq-body {
		textarea {
			width: 100%;
			font-size: 14px;
			border-radius: 8px;
			padding: 10px 15px;
			background-color: var(--textarea-bg);
		}
	}

	.faq-foot {
		text-align: center;

		.faq-tip {
			color: var(--text-light);
			font-size: 12px;
		}

		.faq-button {
			padding: 15px 0;

			.btn {
				height: 40px;
				width: 100%;
			}
		}
	}

	.lang-content {
		width: 100%;

		::v-deep .easy-select .easy-select-suffix {
			right: auto;
			left: 50%;
			color: #fff;
			margin-left: 30px;
		}

		::v-deep .easy-select {
			height: 50px !important;
		}

		::v-deep .input-box {
			color: #fff;
			background: #000F50;
			justify-content: center;
			height: 50px !important;
		}

		::v-deep .easy-select .easy-select-options {
			// padding: 50px 25px 30px 25px;
			background: #0A0B1F;
		}

		::v-deep .easy-select .easy-select-options-item {
			border-bottom: none;
			color: #fff;
			padding: 15px 15px;
			transform: translateY(65%);
		}

		::v-deep .easy-select-options-item .iconfont {
			color: #fff;
		}

		::v-deep .active {
			background-color: #000F50;
			border-radius: 7px;

		}

		::v-deep .easy-select-options .icon-close {
			background-color: #C4C4C4;
			padding: 3px;
			border-radius: 50%;
			top: 15px !important;
			right: 15px !important;
		}

		::v-deep .easy-select .easy-select-options.show {
			transform: translateY(-60px);
		}
	}

	.zSwiperCooperImage {
		height: 40px;
		width: 100px;
	}

	.indexGameBoxClass {
		height: 500px;
		margin: 0 7px;
		position: relative;
	}

	@media (min-width: 750px) {
		.lang-content {
			overflow: hidden;

			::v-deep .easy-select .easy-select-suffix {
				right: auto;
				left: 50%;
				margin-left: 30px;
			}

			::v-deep .easy-select {
				height: 50px !important;
			}

			::v-deep .input-box {
				justify-content: center;
				height: 50px !important;
			}

			::v-deep .easy-select .easy-select-options {
				padding: 30px 20px 20px 20px;
				width: 465px;
				left: 38%;
			}
		}

		.bs-popup-hd {
			background-color: var(--bs-popup-hd) !important;
		}

		.bs-popup-hd .tt {
			color: #000;
		}
	}

	.panel-line {
		width: 5px;
		height: 15px;
		margin-right: 5px;
		background: #4960BB;
		border-radius: 2px;
	}

	.index-tt {
		display: flex;
		align-items: center;
		font-size: 15px;
		font-weight: bold;
		font-family: Bahnschrift;
		font-weight: bold;
		background: linear-gradient(-8deg, #D3D3D3 0%, #306DF0 83.7890625%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.index-pare-class {
		border-radius: 16px;
		background-color: #302A4E;
		padding: 10px 10px 0 10px;
	}

	.index-pare-bottom-class {
		margin: 0 10px;
		border-radius: 16px;
		background-color: #302A4E;
		padding: 10px 10px 0 10px;
	}

	.convertClass {
		color: #142F96;
		font-weight: bold;
		position: absolute;
		top: 50px;
		right: 25px;
	}

	.service {
		position: fixed;
		bottom: 86px;
		right: 70px;
		z-index: 9;
	}

	.index-swiper-pc {
		height: 275px;
	}

	@media (max-width: 1580px) and (min-width: 1440px) {
		.index-swiper-pc {
			height: 244px;
		}
	}

	@media (max-width: 1439px) and (min-width: 1350px) {
		.index-swiper-pc {
			height: 230px;
		}
	}

	@media (max-width: 1349px) {
		.index-swiper-pc {
			height: 230px;
		}
	}

	@media (min-width: 1920px) {
		.index-swiper-pc {
			height: 300px;
		}
	}



	.bottom-mobile-index-img {
		width: 100px;
		height: 45px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid #324274;
		border-radius: 8px;
	}

	.VisitMobileWebClass {
		color: #7784AA;
		font-size: 22px;
	}

	.VisitMobileClass {
		width: 276px;
		margin: 0 auto;
		padding: 13px 30px;
		border-radius: 12px;
		background: #122D7E;
	}

	.footer {
		margin: -1px 0;
		border-radius: 0;
		background: #00175C;
	}

	.footer-firth-img {
		height: 74px;
		width: 74px;
		margin-right: 40px;
	}

	.footer-firth-mobile-img {
		height: 35px;
		width: 35px;
		margin-right: 10px;
	}

	.foot-mobile-line {
		margin: 20px 0;
		height: 1px;
		border-bottom: 1px solid #111B3F;
	}

	.footer-danload-img {
		height: 74px;
		width: 74px;
	}

	.footer-firth-img2 {
		width: 60px;
		height: 73px;
		margin-right: 30px;
	}

	.bs-table .uni-table-th {
		padding: 18px 10px 6px !important;
	}

	.bs-table .inline-title {
		display: inline-flex;
		min-width: 0 !important;
	}

	.bs-table .uni-table-tr:nth-child(2) .uni-table-td {
		padding-top: 0 !important;
	}

	.index-bg {
		background-size: cover;
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		background: var(--pc-main);
	}

	@media (min-width: 950px) {
		.centerClass {
			width: 42px;
		}
	}

	// @media (min-width: 1920px) {
	// 	.pc-main {
	// 		width: 1920px;
	// 		margin: 0 auto;
	// 	}

	// 	.index-footer {
	// 		width: 1920px;
	// 		margin: 0 auto;
	// 	}
	// }




	.mobilePCClass:hover {
		color: #fff;

		.mobilePCDanloadClass {
			animation: .6s fade-in forwards;
		}
	}

	.mobilePCDanloadClass {
		opacity: 0;
		padding: 15px;
		border-radius: 5px;
		background-color: #fff;
		position: absolute;
		bottom: -120px;
		left: 27px;
		z-index: 1;
	}

	.mobilePCDanloadClass:before {
		content: "";
		position: absolute;
		bottom: 100%;
		left: 50%;
		border-style: solid;
		border-width: 10px;
		border-color: transparent transparent #fff transparent;
		transform: translateX(-50%);
	}

	.anzhuoPCClass:hover {
		color: #fff;

		.anzhuoPCDanloadClass {
			animation: .6s fade-in forwards;
		}
	}

	.anzhuoPCDanloadClass {
		opacity: 0;
		padding: 15px;
		border-radius: 5px;
		background-color: #fff;
		position: absolute;
		bottom: -120px;
		left: 54px;
		z-index: 1;
	}

	.anzhuoPCDanloadClass:before {
		content: "";
		position: absolute;
		bottom: 100%;
		left: 50%;
		border-style: solid;
		border-width: 10px;
		border-color: transparent transparent #fff transparent;
		transform: translateX(-50%);
	}

	.IOSPCClass:hover {
		color: #fff;

		.iosPCDanloadClass {
			animation: .6s fade-in forwards;
		}
	}

	.iosPCDanloadClass {
		opacity: 0;
		padding: 15px;
		border-radius: 5px;
		background-color: #fff;
		position: absolute;
		bottom: -120px;
		left: 80px;
		z-index: 1;
	}

	.iosPCDanloadClass:before {
		content: "";
		position: absolute;
		bottom: 100%;
		right: 50%;
		border-style: solid;
		border-width: 10px;
		border-color: transparent transparent #fff transparent;
		transform: translateX(50%);
	}

	@keyframes fade-in {
		0% {
			opacity: 0;
			display: none;
		}

		100% {
			opacity: 1;
			display: inline-block;
		}
	}

	.index-game-tabs {
		display: flex;
		overflow-x: scroll;
		background: #091757;
	}

	.game-tabs-item {
		cursor: pointer;
		max-width: 100px;
		color: #fff;
		padding: 10px 15px;
		position: relative;
	}

	.game-tabs-item::before {
		content: '';
		position: absolute;
		top: 25%;
		right: -3px;
		width: 2px;
		height: 22px;
		border-radius: 10px;
		background-image: linear-gradient(to bottom, #2a3970 5%, #545596, #2a3970);
	}

	.game-tabs-item:last-child::before {
		content: none;
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
		float: left;
		white-space: nowrap;
		min-width: 100%;
		animation: marquee-content 5s infinite linear;
	}


	.p-casino__wrapper__item-frame {
		border: 4px solid #fff;
		border-radius: 22px;
		box-sizing: border-box;
		height: 199px;
		left: 28%;
		pointer-events: none;
		position: relative;
		top: 44px;
		width: 158px;
		z-index: 9;
	}

	.p-casino__wrapper__item-frame_two {
		border: 4px solid #fff;
		border-radius: 22px;
		box-sizing: border-box;
		height: 199px;
		left: 28%;
		pointer-events: none;
		position: relative;
		top: 44px;
		width: 158px;
		z-index: 2;
	}

	.indexGameBoxClass__border {
		border: 1px solid rgba(255, 255, 255, .6);
		border-radius: 10px;
		box-sizing: border-box;
		height: 480px;
		left: 0;
		pointer-events: none;
		position: absolute;
		top: 0;
		width: 100%;
		z-index: 2;
	}

	.game-index-swiper {
		height: 220px;
		position: absolute;
		top: 23px;
		left: 3px;
		right: 3px;
		z-index: 2;
	}

	// .game-card-bg {
	// 	position: relative;
	// 	z-index: 10;
	// }

	.current-game-card-active {
		transform: scale(1);
		transition: all .8s;
		position: relative;
		z-index: 100;
	}

	.label-active-img {
		transition: all .8s;
		// transform: scale(1.6);
		position: absolute;
		top: 14px;
		left: -16px;
		width: 112px;
		height: 115px;
		z-index: 1000;
	}

	.label-view {
		width: 47px;
		height: 4px;
		position: absolute;
		top: 44px;
		left: 143px;
		z-index: 10;
		border-radius: 100px 0 100px 0;
		background-image: url('@/static/images/index/hot.png');
		background-size: 100%;
		background-repeat: no-repeat;
	}

	.label-list-img {
		transition: all .8s;
		// transform: scale(1);
		position: absolute;
		top: 37px;
		left: 4px;
		width: 70px;
		height: 72px;
		z-index: 10;
	}

	.label-text-active {
		top: 43px;
		color: #fff;
		left: -10px;
		width: 80px;
		position: absolute;
		z-index: 1099;
		text-align: center;
		transition: all 1s;
		transform: rotate(-45deg) scale(0.85);
	}

	.label-text {
		top: 55px;
		color: #fff;
		left: -10px;
		width: 80px;
		position: absolute;
		z-index: 200;
		text-align: center;
		transition: all 1s;
		transform: rotate(-45deg) scale(0.85);
	}

	.current-game-card {
		transform: scale(.85);
		transition: all .8s;
		position: relative;
		z-index: 1;
	}

	.game-rela {
		position: relative;
		z-index: 9;
	}

	.game-index-fon {
		position: absolute;
		bottom: 120px;
		right: 15px;
		left: 15px;
		z-index: 10;
	}

	.game-index-play-btn {
		position: absolute;
		bottom: 0;
		right: 15px;
		left: 15px;
		z-index: 10;
		display: flex;
		justify-content: center;
	}

	.game-btn {
		color: #fff;
		background: #3270E0;
		border-radius: 10px;
		min-width: 200px;
		padding: 10px 10px;
	}

	.game-index-play-btn image {
		width: 20px;
		height: 20px;
	}

	.game-card-active-bg {
		width: 100%;
		height: 480px;
		position: absolute;
		top: 0;
		left: 0;
		background-size: cover;
		background-repeat: no-repeat;
		filter: blur(3px);
		z-index: -1;
		border-radius: 12px;
	}

	.m-c-ho {
		color: #7784AA;
	}

	.swiper-bg {
		background: #1E1739;
	}

	.index-more {
		color: #306DF0;
		padding: 5px 10px;
		border-radius: 6px;
		border: 1px solid #0A4183;
	}

	// .container ::v-deep .uni-navbar {
	// 	background: linear-gradient(0deg, #0D1C6F, #111B3F);
	// }

	.announHead {
		background: #122D7E;
		box-shadow: 5px 8px 16px 0px rgba(6, 7, 37, 0.09);
		border-radius: 22px;
		padding: 10px 20px 10px 40px;
		flex: 1;
		margin-bottom: 15px;
	}

	.announHead-mobile {
		overflow: hidden;
		padding: 0 2px;
	}

	.announHead-mobile .announHead-item-name {
		width: 100%;
		animation: marquee-wrap 8s infinite linear;
	}

	.announHead-mobile .announHead-item-marquee {
		// font-weight: bold;
		float: left;
		white-space: nowrap;
		min-width: 100%;
		animation: marquee-content 8s infinite linear;
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

	.market-countdown-item {
		width: 27px;
		font-size: 16px;
		text-align: center;
	}

	.foot-row .col {
		width: 25%;
		text-align: center;
	}

	.noticeIndexM_bg .art-body-content {
		max-height: 350px;
		white-space: pre-wrap;
	}

	.noticeIndexM_bg .art-body-content ::v-deep img:first-child {
		width: 100%;
		margin-bottom: 10px;
	}

	.pc-line-progress ::v-deep .u-active {
		background-image: url('@/static/images/index/progress2.png') !important;
		position: relative;
	}

	.pc-line-progress ::v-deep .u-progress {
		border: 1px solid #1569B7;
		padding: 2px;
	}

	.progressLast {
		background-image: url('@/static/images/index/progressLast.png') !important;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		width: 32px;
		height: 19px;
		position: absolute;
		right: -3px;
	}

	.index-vip-cell {
		height: 66px;
		padding: 15px;
		position: relative;
		border-radius: 12px;
		background-color: #34305A;
		// background-image: url('@/static/images/index/Group2.png');
		background-image: url('@/static/images/index/Quick-market.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.m-market-soon {
		position: relative;
		background: #3E3E6C;
		padding: 15px;
		border-radius: 12px;
		background-image: url('@/static/images/index/m-coon3.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.m-market-soon::after {
		content: '';
		border-radius: 12px;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(to bottom, rgba(53, 49, 103, 0.88), rgba(53, 49, 103, 0.88));
	}

	.m-index-market {
		position: relative;
		background-color: #3E3E6C;
		border-radius: 16px;
	}

	.m-market-soon-1 {
		background: url('@/static/images/index/m-coon1.png') center no-repeat;
		background-size: cover;
	}

	.m-market-soon-2 {
		background: url('@/static/images/index/m-coon2.png') center no-repeat;
		background-size: cover;
	}

	.m-market-soon-3 {
		background: url('@/static/images/index/m-coon3.png') center no-repeat;
		background-size: cover;
	}

	.m-index-market-pwd {
		border: 2px solid rgba(233, 174, 58, 1);
	}

	.m-index-market .line {
		height: 1px;
		background-color: #312B4F;
	}

	.m-index-market::after {
		content: '';
		border-radius: 16px;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(to bottom, rgba(53, 49, 103, 0.88), rgba(53, 49, 103, 0.88));
	}

	.market-pwd {
		padding: 3px 8px;
		border-radius: 4px;
		background: linear-gradient(to bottom, rgba(240, 176, 0, 1), rgba(236, 141, 0, 1));

		.icon-shoucang4 {
			font-size: 14px;
		}
	}

	.match-all-count-btn {
		margin-top: 20px;
		padding: 14px 20px;
		border-radius: 16px;
		background-color: rgba(100, 76, 188, 1);
	}

	.bet-balance {
		height: 50px;
		padding: 0 10px;
		line-height: 50px;
		border-radius: 16px;
		background-color: rgba(62, 54, 100, 1);
	}

	.fast-user {
		padding: 10px 0;
		margin-bottom: 10px;
		border-bottom: 1px solid #4c4882;
	}

	.game-tabs {
		margin-top: 20px;

		::v-deep .u-tab-item {
			bottom: 1px;
			margin-right: 10px;
			color: var(--tab-item-color) !important;
		}

		::v-deep .item-active {
			padding-bottom: 2px;
			position: relative;
			color: #ffffff !important;
		}

		::v-deep .item-active::after {
			content: '';
			left: 0;
			right: 0;
			bottom: 0;
			transform: translateY(10%);
			position: absolute;
			width: 100%;
			height: 4px;
			border-radius: 3px 3px 0px 0px;
			background: rgba(233, 174, 58, 1);
			box-shadow: 0px 0px 6px 2px rgba(255, 184, 0, 0.5);
		}
	}

	.index-footer-about-list {
		margin: 0 10%;
	}

	.index-help-class {
		position: fixed;
		z-index: 999;
		right: 0;
		bottom: 80px;
	}

	.index-help-class image {
		width: 106px;
		height: 116px;
	}

	// pc
	.pc-tabs {
		position: relative;
		line-height: 1;
		border-bottom: 1px solid #4c4882;
		height: 43px;

		::v-deep .u-tab-item {
			cursor: pointer;
			height: 43px;
		}

		.btn--submit {
			border-radius: 10px;
			padding: 0 16px;
			position: absolute;
			right: 0;
			top: 0;
			height: 36px;
		}

		::v-deep .item-active {
			background-image: url('/static/images/pc/tab_cur.png');
			background-position: center bottom;
			background-size: contain;
			background-repeat: no-repeat;
		}

		::v-deep .u-tab-bar {
			background-color: #E9AE3A !important;
			border-radius: 6px 6px 0 0 !important;
			box-shadow: 1px -3px 6px #FFB80080;
			margin-bottom: -2px;
		}
	}

	.panel-table {
		border-radius: 24px;
		background-color: #312B4F;
		padding: 8px;

		.table-col-1 {
			min-width: 100px;
			padding: 5px 10px;
			text-align: center;
		}

		.table-col-2 {
			min-width: 100px;
			padding: 5px 10px;
			text-align: center;
		}
	}

	.index-game-main {
		margin: 0 -6px;

		::v-deep .u-countdown-item {
			margin: 0;
			padding: 0;
		}

		::v-deep .m-font-12 {
			margin: 0 !important;
			font-size: 13px !important;
		}
	}

	.bs-table-bottom-item {
		padding: 12px;
	}

	.index-panel_hd {
		line-height: 1;
	}

	.radius-16 {
		border-radius: 16px !important;
	}

	.m-font-64 {
		font-size: 32px;
	}

	.text-nowrap {
		white-space: nowrap;
	}

	.text-D1CCE9 {
		color: #D1CCE9;
	}

	.m-index-market {
		.top {
			height: 36px;
		}
	}

	.game-scroll {
		height: 426px;
		overflow: hidden;
		overflow-y: scroll;

		.m-index-market {
			height: 132px;
		}

		.center {
			height: 98px;

		}
	}
</style>
