<template>
	<view :class="isOpen?'pc-open':'pc-close'" :data-theme="themeMode">
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main u-flex">
				<pcSideBar :pageIndex="1"></pcSideBar>
				<view class="m-bg-w m-c-0 pc-main-right">
					<view class="m-font-b u-m-b-30">{{$t('menu2')}}</view>
					<view class="u-flex u-row-between" style="border-bottom: 1px solid #ccc;">
						<view class="u-flex">
							<view class="pc-n-tab_item" @click="changeTab(index)"
								:class="current == index ? 'active':''" v-for="(item,index) in tabs">
								<text class="item-text">{{item.name}}</text>
							</view>
						</view>
						<view class="u-flex">
							<view class="tra-filter">
								<view class="flex_bd" style="min-width: 200px;">
									<view class="u-flex u-time-bar" @click="dataShow = true">
										<view class="pc-skin-color">
											<text class="iconfont icon-calendar"></text>
										</view>
										<view class="u-m-l-16">{{$t(sreachData)}}</view>
									</view>
								</view>
								<view class="tra-select" style="min-width: 200px;" v-if="current == 0">
									<uni-data-select v-model="cateValue" :localdata="caterange" @change="catechange"
										:clear="false">
									</uni-data-select>
								</view>
							</view>
						</view>
					</view>
					<template v-if="current == 0">
						<template v-if="showEmpty == 1">
							<scroll-view style="height: calc(100vh - 250px);" scroll-y="true"
								@scrolltolower="scrolltolowerChnage">
								<view class="trade u-m-t-30">
									<view class="pc-trade-list-card m-bg-f tra-cells" v-for="(res,index) in tradingList"
										:key="`list1${index}`">
										<view class="u-flex u-row-between pc-tra-heading">
											<view class="m-c-0 m-font-b">{{$t(res.zd_name)}} VS {{$t(res.kd_name)}}
											</view>
											<view class="tra-cont text-green"
												:class="res.bet_level > 0 ? 'vip-tra-cells-color-e m-font-b' : ''">
												#{{res.zd_number}} <text class="iconfont icon-fuzhituceng u-p-l-10"
													:class="res.bet_level > 0 ? 'vip-tra-cells-color-e' : ''"
													@click="common_copy(res.zd_number)"></text>
											</view>
										</view>
										<view class="pc-tra-heading flex u-m-t-20"
											:class="res.bet_level > 0 ? 'vip-tra-heading' : ''">
											<view class="col u-flex">
												<view class="u-c-9 u-m-r-10">{{$t("game53")}}:</view>
												<view class="m-font-16 m-c-0">{{formatCurrency(res.tz_price)}}</view>
											</view>
											<view class="col u-flex" v-if="res.status != 3">
												<view class="u-c-9 u-m-r-10">
													{{res.status == 4?$t("实际获利"):$t("game8")}}:
												</view>
												<view class="m-font-16 u-c-b">{{formatCurrency(res.profit)}}</view>
											</view>
										</view>
										<view class="pc-tra-heading flex u-m-t-20">
											<view class="col u-flex">
												<view class="u-c-9 u-m-r-10">{{$t("下单时间")}}:</view>
												<view class="m-font-16 m-c-0">{{res.add_time}}</view>
											</view>
											<view class="col u-flex" v-if="res.status == 3 || res.status == 4">
												<view class="u-c-9 u-m-r-10">
													{{$t("结算时间")}}:
												</view>
												<view class="m-font-16 u-c-b">{{res.update_time}}</view>
											</view>
										</view>
										<view class="u-m-t-20" :class="res.bet_level > 0 ? 'vip-tra-cells' : ''">
											<view class="pc-tra-card" :class="res.bet_level > 0 ? 'vip-tra-card' : ''">
												<view class="tra-attrs flex"
													:class="res.bet_level > 0 ? 'vip-tra-attrs' : ''">
													<view class="col" v-if="res.money_type != 1">
														<view class="label u-m-b-10">{{$t('类型')}}</view>
														<view class="val text-red">
															{{res.money_type == 1?$t('余额'):$t('基金')}}
														</view>
													</view>
													<view class="col">
														<view class="label u-m-b-10">{{$t('比分')}}</view>
														<view class="val text-red">
															{{res.zd_fs}}-{{res.kd_fs}}
														</view>
													</view>
													<view class="col">
														<view class="label u-m-b-10">{{$t('赔率')}}</view>
														<view class="val text-red">
															<text>{{res.peilv}}%</text>
														</view>
													</view>
													<view class="col">
														<view class="label u-m-b-10">{{$t('user34')}}</view>
														<view class="val text-red">
															<text v-if="res.status == 1">{{$t('进行中')}}</text>
															<text v-if="res.status == 2">{{$t('已撤单')}}</text>
															<text v-if="res.status == 3"
																style="color:#f00;">{{$t('输')}}</text>
															<text v-if="res.status == 4"
																style="color:green;">{{$t('赢')}}</text>
														</view>
													</view>
												</view>
												<!-- <view class="item">{{$t(res.ls_name)}}</view> -->
											</view>
											<view class="tra-foot text-right u-m-t-16">
												<view :data-title="$t('gencz1')"
													v-if="showCel_order == 1 && res.status == 1">
													<view @click="revoke(res.id)" type="default" class="revokeBtn"
														:class="res.bet_level > 0 ? 'vip-revokeBtn' : ''">
														{{$t("gencz1")}}
													</view>
												</view>
											</view>
										</view>
									</view>
									<view class="load-more-box">
										<uni-load-more :status="status" :contentText="contentText">
										</uni-load-more>
									</view>
								</view>
							</scroll-view>
						</template>
						<template v-if="showEmpty == 0">
							<view class="u-p-30">
								<listEmpty :isDefault="true" class="u-bd-8" :listHighly='530'>
								</listEmpty>
							</view>
						</template>
					</template>
					<template v-if="current == 1">
						<view class="trade-main">
							<template v-if="showEmptyC == 1">
								<scroll-view style="height: calc(100vh - 250px);" scroll-y="true"
									@scrolltolower="scrolltolowerChnage">
									<view class="trade">
										<view class="trade-hd m-font-16 u-m-b-20 u-p-t-10">{{$t('注单列表')}}</view>
										<u-line color="var(--dotted-bg-1)" border-style="dotted" class="u-m-b-20">
										</u-line>
										<view class="fan-card trade-list-card" v-for="(item,index) in gameList"
											:key="`list2${index}`">
											<view class="tra-heading flex">
												<view class="tra-label">{{$t('trade4')}}: <text
														class="text-green">#{{ellipsis(item.gb_sn,5,6)}}</text>
													<text class="iconfont icon-fuzhituceng text-green u-p-l-10"
														@click="common_copy(item.gb_sn)"></text>
												</view>
											</view>
											<view class="tra-cells">
												<view class="tra-cell u-flex">
													<view class="label u-m-r-6">{{$t("游戏厅")}}:</view>
													<view class="item">{{$t(item.game_name)}}</view>
												</view>
												<view class="tra-cell u-flex">
													<view class="label u-m-r-6">{{$t("投注金额")}}:</view>
													<view class="item text-green">{{formatCurrency(item.gb_price)}}</view>
												</view>
												<view class="tra-cell u-flex">
													<view class="label u-m-r-6">{{$t("获利")}}:</view>
													<view class="item text-green">{{formatCurrency(item.gb_winprice)}}
													</view>
												</view>
												<view class="tra-cell u-flex">
													<view class="label u-m-r-6">{{$t("user34")}}:</view>
													<view class="item text-red" v-if="item.gb_winlose == 0">
														{{$t('无效')}}
													</view>
													<view class="item text-green" v-if="item.gb_winlose == 1">
														{{$t('user3')}}
													</view>
													<view class="item text-red" v-if="item.gb_winlose == 2">
														{{$t('trade13')}}
													</view>
													<view class="item text-green" v-if="item.gb_winlose == 3">
														{{$t('trade12')}}
													</view>
													<view class="item text-green" v-if="item.gb_winlose == 4">
														{{$t('平')}}
													</view>
													<view class="item u-m-auto" @click="toRescue">
														<text class="iconfont icon-kefu5 link-color"></text>
														<text
															class="blue-color u-font-xs">{{$t('Online customer service')}}</text>
													</view>
												</view>
											</view>
										</view>
										<view class="load-more-box">
											<uni-load-more :status="game_status" :contentText="game_content">
											</uni-load-more>
										</view>
									</view>
								</scroll-view>
							</template>
							<template v-if="showEmptyC == 0">
								<view class="u-p-30">
									<listEmpty :isDefault="true" class="u-bd-8" :listHighly='530'>
									</listEmpty>
								</view>
							</template>
						</view>
					</template>
					<template v-if="current == 2">
						<view class="trade-main">
							<template v-if="showEmptyC == 1">
								<scroll-view style="height: calc(100vh - 250px);" scroll-y="true"
									@scrolltolower="scrolltolowerChnage">
									<view class="trade">
										<view class="trade-hd u-m-b-20 u-p-t-10">
											<view class="trade-hd m-font-16 u-m-b-20">{{$t('注单列表')}}</view>
										</view>
										<u-line color="var(--dotted-bg-1)" border-style="dotted" class="u-m-b-20">
										</u-line>
										<view class="fan-card trade-list-card" v-for="(item,index) in gameList"
											:key="`list3${index}`">
											<view class="tra-heading flex">
												<view class="tra-label">{{$t('trade4')}}: <text
														class="text-green">#{{ellipsis(item.gb_sn, 5, 6)}}</text>
													<text class="iconfont icon-fuzhituceng text-green u-p-l-10"
														@click="common_copy(item.gb_sn)"></text>
												</view>
											</view>
											<view class="tra-cells">
												<view class="tra-cell u-flex">
													<view class="label u-p-r-10">{{$t("游戏厅")}}:</view>
													<view class="item">{{$t(item.game_name)}}</view>
												</view>
												<view class="tra-cell u-flex">
													<view class="label u-p-r-10">{{$t("投注金额")}}:</view>
													<view class="item text-green">{{formatCurrency(item.gb_price)}}</view>
												</view>
												<view class="tra-cell u-flex">
													<view class="u-flex">
														<view class="label u-p-r-10">{{$t("获利")}}:</view>
														<view class="item text-green">{{formatCurrency(item.gb_winprice)}}
														</view>
													</view>
													<view class="item u-m-auto" @click="toRescue">
														<text class="iconfont icon-kefu5 link-color"></text>
														<text
															class="blue-color u-font-xs">{{$t('Online customer service')}}</text>
													</view>
												</view>
											</view>
										</view>
										<view class="load-more-box">
											<uni-load-more :status="game_status" :contentText="game_content">
											</uni-load-more>
										</view>
									</view>
								</scroll-view>
							</template>
							<template v-if="showEmptyC == 0">
								<view class="u-p-30">
									<listEmpty :isDefault="true" class="u-bd-8" :listHighly='530'>
									</listEmpty>
								</view>
							</template>
						</view>
					</template>
				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content" :data-theme="themeMode">
				<view class="container" :class="sideshow?'is-mask':''">
					<uniNavHeader isback :title="$t('menu2')" @clickLeft="menuClick" ref="header" :pageActive="2">
					</uniNavHeader>
					<view class="gooLight">
						<view class="top-link-tabs flex-center u-p-t-20 u-m-b-0">
							<view class="n-tab_item" @click="changeTab(index)" :class="current == index ? 'active':''"
								v-for="(item,index) in tabs">
								<text class="item-text">{{item.name}}</text>
							</view>
							<!-- <image src="@/static/images/index/menu/search.png" @click="$go('/pages/tradeing/marketList')"
								style="width: 42px;height: 42px;position: absolute;right: 12px;bottom: 6px;">
							</image> -->
						</view>
						<view class="bs-wrapper-two">
							<template v-if="current == 0">
								<view class="trade-main">
									<view class="tra-filter">
										<view class="flex_bd">
											<view class="tra-item" @click="show = true">
												<text>{{selectStatus}}</text>
												<text class="iconfont icon-sj-down u-font-xs u-m-l-10"
													style="color: #D1CCE9;"></text>
											</view>
										</view>
										<view class="u-flex u-time-bar" @click="dataShow = true">
											<view class="u-m-r-16 m-font-16">{{$t(sreachData)}}</view>
											<text class="iconfont icon-calendar"></text>
										</view>
									</view>
									<template v-if="showEmpty == 1">
										<uni-collapse ref="collapse" v-model="collvalue">
											<uni-collapse-item class="collapseClass collapseTradingListClass"
												v-for="(res,index) in tradingList"
												:class="res.is_vip == 1 ? 'vip-item' : ''" :key="`list1${index}`"
												:open="collOpen">
												<template v-slot:title>
													<view class="tra-title tradingList-top-one">
														<view class="col-status m-font-16 u-c-g">
															<!-- {{res.status == 1 ?$t('进行中') : res.status == 2 ? $t('已撤单') : $t('已结算')}} -->
															{{'№ ' + res.zd_number}}
														</view>
														<view class="col-value m-font-18">
															{{res.tz_price?formatCurrency(res.tz_price)+' ₽':'0 ₽'}}
														</view>
													</view>
													<view class="line"></view>
													<view class="u-flex u-p-l-24 u-p-r-24 u-p-t-36 u-p-b-24">
														<view class="u-flex">
															<view class="ksgt-1">
																<image :src="res.zd_logo" v-if="res.zd_logo"></image>
																<image :src="marketHeaderZD" v-if="!res.zd_logo">
																</image>
															</view>
															<view class="ksgt-1 ksgt-2">
																<image :src="res.kd_logo" v-if="res.kd_logo"></image>
																<image :src="marketHeaderKD" v-if="!res.kd_logo">
																</image>
															</view>
														</view>
														<view class="u-m-l-20">
															<view class="u-flex w_100">
																<view class="u-flex"
																	@click.stop="common_copy(res.zd_name)">
																	<view
																		class="zd-name-wrap tradeing-market-name u-m-r-10">
																		<view class="zd-name-content">
																			<view class="zd-name-marquee m-font-16">
																				{{res.zd_name}}
																			</view>
																		</view>
																	</view>
																	<image src="@/static/images/file_copy.png"
																		style="width: 16px;height: 16px;"></image>
																</view>
																<view
																	class="u-c-9 u-m-l-10 u-m-r-10 u-text-center m-font-16"
																	style="min-width: 30px;">VS</view>
																<view class="u-flex"
																	@click.stop="common_copy(res.kd_name)">
																	<view
																		class="zd-name-wrap tradeing-market-name u-m-r-10">
																		<view class="zd-name-content">
																			<view class="zd-name-marquee m-font-16">
																				{{res.kd_name}}
																			</view>
																		</view>
																	</view>
																	<image src="@/static/images/file_copy.png"
																		style="width: 16px;height: 16px;"></image>
																</view>
															</view>
															<view class="u-c-g u-m-t-8">{{res.add_time}}</view>
															<view class="vip-item-label u-m-t-8" v-if="res.is_vip == 1">
																<view class="u-flex m-font-11">
																	<view
																		class="iconfont icon-shoucang4 m-font-12 u-m-r-12">
																	</view>
																	<view class="m-font-11 u-font-xs">VIP</view>
																</view>
															</view>
														</view>
													</view>
												</template>
												<view class="collapse-body">
													<!-- <view class="collapse-row" @click="common_copy(res.zd_number)">
														<view class="collapse-label">{{$t("trade4")}}</view>
														<view class="collapse-value">
															<text class="iconfont icon-fuzhi2"></text>
															<text>{{res.zd_number}}</text>
														</view>
													</view> -->
													<view class="collapse-row" v-if="res.status == 3 || res.status == 4">
														<view class="collapse-label">{{res.status == 3?$t("赢的金额"):$t("输的金额")}}</view>
														<view class="collapse-value">
															{{res.sy_res?formatCurrency(res.sy_res)+' ₽':'0 ₽'}}
														</view>
													</view>
													<view class="collapse-row"
														v-if="res.status == 3 || res.status == 4">
														<view class="collapse-label">{{$t("结算时间")}}</view>
														<view class="collapse-value">{{res.update_time}}</view>
													</view>
													<view class="collapse-row">
														<view class="collapse-label u-flex">
															<view class="u-m-r-10">{{$t(res.zd_name)}} VS
																{{$t(res.kd_name)}}</view>
															<image src="@/static/images/file_copy.png"
																@click.stop="common_copy(res.zd_name + ' VS ' + res.kd_name)"
																style="width: 16px;height: 16px;"></image>
														</view>
														<view class="collapse-value">
															{{res.zd_fs}} - {{res.kd_fs}}
														</view>
													</view>
													<view class="collapse-row">
														<view class="collapse-label">{{$t('赔率')}}</view>
														<view class="collapse-value">{{res.peilv}}%</view>
													</view>
													<view class="collapse-row">
														<view class="collapse-label">{{$t('user34')}}</view>
														<view class="collapse-value">
															<text v-if="res.status == 1">{{$t('进行中')}}</text>
															<text v-if="res.status == 2">{{$t('已撤单')}}</text>
															<text v-if="res.status == 3"
																style="color:#f00;">{{$t('输')}}</text>
															<text v-if="res.status == 4"
																style="color:green;">{{$t('赢')}}</text>
														</view>
													</view>
													<view class="collapse-row"
														v-if="showCel_order == 1 && res.status == 1">
														<view @click="revoke(res.id)"
															class="revokeBtn u-flex u-row-center">
															<image src="@/static/images/index/list-btn-close.png"
																style="width: 20px;height: 20px;"></image>
															<view class="u-m-l-20 m-font-16">{{$t("gencz1")}}</view>
														</view>
													</view>
												</view>
											</uni-collapse-item>
										</uni-collapse>
										<view class="load-more-box">
											<uni-load-more :status="status" :contentText="contentText">
											</uni-load-more>
										</view>
									</template>
									<template v-if="showEmpty == 0">
										<view class="u-p-30">
											<listEmpty :isDefault="true" class="u-bd-8" :listHighly='500'>
											</listEmpty>
										</view>
									</template>
								</view>
							</template>
							<!-- 体育订单 -->
							<template v-if="current == 1">
								<view class="trade-main">
									<view class="tra-filter">
										<view class="u-flex u-time-bar u-m-auto" @click="dataShow = true">
											<view class="u-m-r-16">{{$t(sreachData)}}</view>
											<text class="iconfont icon-calendar" style="color: #D1CCE9;"></text>
										</view>
									</view>
									<template v-if="showEmptyC == 1">
										<uni-collapse ref="collapse" v-model="collvalue">
											<template>
												<uni-collapse-item class="collapseClass"
													v-for="(item,index) in gameList" :key="`list2${index}`"
													:open="collOpen">
													<template v-slot:title>
														<view class="tra-title">
															<view class="col-status " v-if="item.gb_winlose == 0">
																<image src="../../static/images/ArrowUp.png" mode="">
																</image>
																<text class="m-font-16 u-c-g">{{$t('无效')}}</text>
															</view>
															<view class="col-status " v-if="item.gb_winlose == 1">
																<image src="../../static/images/plus-circle2.png"
																	mode=""></image>
																<text class="m-font-16 u-c-g">{{$t('user3')}}</text>
															</view>
															<view class="col-status " v-if="item.gb_winlose == 2">
																<image src="../../static/images/ArrowUp.png" mode="">
																</image>
																<text class="m-font-16 u-c-g">{{$t('trade13')}}</text>
															</view>
															<view class="col-status " v-if="item.gb_winlose == 3">
																<image src="../../static/images/plus-circle2.png"
																	mode=""></image>
																<text class="m-font-16 u-c-g">{{$t('trade12')}}</text>
															</view>
															<view class="col-status " v-if="item.gb_winlose == 4">
																<image src="../../static/images/plus-circle2.png"
																	mode=""></image>
																<text class="m-font-16 u-c-g">{{$t('平')}}</text>
															</view>
															<view class="col-value m-font-18">
																{{formatCurrency(item.gb_price)}}
															</view>
														</view>
													</template>
													<view class="collapse-body">
														<view class="collapse-row" @click="common_copy(item.gb_sn)">
															<view class="collapse-label">{{$t("trade4")}}</view>
															<view class="collapse-value">
																<text class="iconfont icon-fuzhi2"></text>
																<text>{{item.gb_sn}}</text>
															</view>
														</view>
														<view class="collapse-row">
															<view class="collapse-label">{{$t("游戏厅")}}</view>
															<view class="collapse-value">{{$t(item.game_name)}}</view>
														</view>
														<view class="collapse-row">
															<view class="collapse-label">{{$t("获利")}}</view>
															<view class="collapse-value">
																{{formatCurrency(item.gb_winprice)}}
															</view>
														</view>
													</view>
												</uni-collapse-item>
											</template>
										</uni-collapse>
									</template>
									<template v-if="showEmptyC == 0">
										<view class="u-p-30">
											<listEmpty :isDefault="true" class="u-bd-8" :listHighly='500'>
											</listEmpty>
										</view>
									</template>
								</view>
							</template>
							<template v-if="current == 2">
								<view class="trade-main">
									<view class="tra-filter">
										<view class="u-flex u-time-bar u-m-auto" @click="dataShow = true">
											<view class="u-m-r-16">{{$t(sreachData)}}</view>
											<text class="iconfont icon-calendar" style="color: #D1CCE9;"></text>
										</view>
									</view>
									<template v-if="showEmptyC == 1">
										<uni-collapse ref="collapse" v-model="collvalue">
											<template>
												<uni-collapse-item class="collapseClass"
													v-for="(item,index) in gameList" :key="`list3${index}`"
													:open="collOpen">
													<template v-slot:title>
														<view class="tra-title">
															<view class="col-status " v-if="item.gb_winlose == 0">
																<image src="../../static/images/ArrowUp.png" mode="">
																</image>
																<text>{{$t('无效')}}</text>
															</view>
															<view class="col-status " v-if="item.gb_winlose == 1">
																<image src="../../static/images/plus-circle2.png"
																	mode=""></image>
																<text>{{$t('user3')}}</text>
															</view>
															<view class="col-status " v-if="item.gb_winlose == 2">
																<image src="../../static/images/ArrowUp.png" mode="">
																</image>
																<text>{{$t('trade13')}}</text>
															</view>
															<view class="col-status " v-if="item.gb_winlose == 3">
																<image src="../../static/images/plus-circle2.png"
																	mode=""></image>
																<text>{{$t('trade12')}}</text>
															</view>
															<view class="col-status " v-if="item.gb_winlose == 4">
																<image src="../../static/images/plus-circle2.png"
																	mode=""></image>
																<text>{{$t('平')}}</text>
															</view>
															<view class="col-value">
																{{formatCurrency(item.gb_winprice)}}
															</view>
														</view>
													</template>
													<view class="collapse-body">
														<view class="collapse-row" @click="common_copy(item.gb_sn)">
															<view class="collapse-label">{{$t("trade4")}}</view>
															<view class="collapse-value">
																<text class="iconfont icon-fuzhi2"></text>
																<text>{{item.gb_sn}}</text>
															</view>
														</view>
														<view class="collapse-row">
															<view class="collapse-label">{{$t("游戏厅")}}</view>
															<view class="collapse-value">{{$t(item.game_name)}}</view>
														</view>

														<view class="collapse-row">
															<view class="collapse-label">{{$t('类型')}}</view>
															<view class="collapse-value">
																{{res.money_type == 1?$t('余额'):$t('基金')}}
															</view>
														</view>
													</view>
												</uni-collapse-item>
											</template>
										</uni-collapse>
									</template>
									<template v-if="showEmptyC == 0">
										<view class="u-p-30">
											<listEmpty :isDefault="true" class="u-bd-8" :listHighly='500'>
											</listEmpty>
										</view>
									</template>
								</view>
							</template>
						</view>
					</view>
				</view>
			</view>
		</template>
		<u-calendar v-model="dataShow" color="#888" activeBgColor="var(--calendar-active-bg)"
			rangeColor="var(--calendar-active-bg)" rangeBgColor="var(--rangeBgColor-bg)" mode="range"
			@change="dataConfirm" :modeString="mobile_common?'bottom':'center'"></u-calendar>

		<uni-popup ref="tipShow" type="bottom">
			<view class="uc-pop">
				<view class="u-p-40 pop-bottom">
					<view class="u-flex u-row-center flex--direction">
						<image src="@/static/images/dw/time.png" style="width: 88px;height: 88px;" mode=""></image>
						<view class="u-p-t-20 u-p-b-20 m-font-20 m-font-b">{{$t('提示')}}</view>
						<view class="u-m-t-20 u-c-g u-text-center m-font-16">{{$t('你正在取消已下注单')}}</view>
						<view class="w_100 btn--submit u-text-center u-p-30 u-m-t-30" @click="tipShowClose">
							<view class="m-line-1 m-font-18">{{$t('public5')}}</view>
						</view>
						<view class="w_100 btn--purple u-text-center u-p-30 u-m-t-30" @click="cancelOrder">
							<view class="m-line-1 m-font-18">{{$t('确定')}}</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>


		<u-popup v-model="show" mode="bottom" borderRadius="32">
			<view class="bs-popup-hd">
				<view class="tt">
					{{$t('请选择')}}
				</view>
				<image src="@/static/images/index/close.png"
					style="width: 32px;height: 32px;position: absolute;right: 15px;" mode="" @click="show = false">
				</image>
			</view>
			<view class="bs-popup-bd">
				<scroll-view scroll-y="true" style="max-height: calc(100vh - 100px);">
					<view class="filter-cell" v-for="(item,index) in caterange" :key="`caterange${index}`"
						@click="catechange(item.value,item.text)">
						<view class="u-flex u-row-between">
							<view>{{item.text}}</view>
							<view class="iconfont icon-dui text-yellow" v-if="tradingKey == item.value"></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
		</u-top-tips>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	export default {
		components: {
			uniNavHeader,
			listEmpty,
			pcNavHeader,
			pcSideBar
		},
		data() {
			return {
				sideshow: false,
				tradingList: [],
				page: 1,
				status: 'more',
				total_money: "0.00",
				total_profit: "0.00",
				time: '',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				contentTextC: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				turnShow: false, //刷新旋转样式
				showCel_order: null,
				showEmpty: null,
				showEmptyB: null,
				showEmptyC: 1,
				navBackground: {
					background: 'var(--ui-color-normal)'
				},
				itemData: {},
				cateValue: 1,
				caterange: [{
						value: 1,
						text: this.$t('全部')
					},
					{
						value: 2,
						text: this.$t('进行中')
					},
					{
						value: 3,
						text: this.$t('已撤单')
					},
					{
						value: 4,
						text: this.$t('已结算')
					}
				],
				sreachData: this.$t('选择日期'),
				dataShow: false,
				dataTime: '',
				orderId: '',
				start_time: '',
				end_time: '',
				tradingKey: 1,
				current: 0,
				sport_page: 1,
				sport_status: 'more',
				sportList: [],
				sport_content: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				gameList: [],
				game_status: 'more',
				game_page: 1,
				game_content: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				show: false,
				collvalue: '',
				collOpen: false,
				selectStatus: this.$t('请选择')
			}
		},
		computed: {
			tabs() {
				return [{
						name: this.$t("逆向策略")
					},
					{
						name: this.$t("三方体育")
					}
				]
			},
		},
		async onLoad(options) {
			await this.setHeadInfo();
			await this.setCapableTitle();
			uni.setNavigationBarTitle({
				title: this.$t('menu2')
			});
			this.getTrading('add');
			this.showCleOrder();
		},
		onReachBottom() {
			switch (this.current) {
				case 0:
					if (this.status == 'noMore') {
						return;
					}
					this.getTrading();
					break;
				case 1:
					if (this.game_status == 'noMore') {
						return;
					}
					this.getGameOrder();
					break;
				case 2:
					if (this.game_status == 'noMore') {
						return;
					}
					this.getGameOrder();
					break;
				default:
					break;
			}
		},
		methods: {
			tipShowChange() {
				this.$refs.tipShow.open();
			},
			tipShowClose() {
				this.$refs.tipShow.close();
			},
			scrolltolowerChnage() {
				switch (this.current) {
					case 0:
						if (this.status == 'noMore') {
							return;
						}
						this.getTrading();
						break;
					case 1:
						if (this.game_status == 'noMore') {
							return;
						}
						this.getGameOrder();
						break;
					case 2:
						if (this.game_status == 'noMore') {
							return;
						}
						this.getGameOrder();
						break;
					default:
						break;
				}
			},
			// 获取体育订单
			async getGameOrderSports(add) {
				let res = await this.$u.api.game_order_sports_p({
					page: this.sport_page,
					limit: 10,
					isday: 0,
					date: this.start_time ? this.start_time + '|' + this.end_time : ''
				});
				if (res) {
					if (add) {
						this.sportList = res.data;
					} else {
						this.sportList = this.sportList.concat(res.data)
					}
					if (res.data.length == 10) {
						this.sport_status = "loading";
						this.sport_page++;
					} else {
						this.sport_status = "noMore";
					}
					if (this.sportList.length > 0) {
						this.showEmptyB = 1;
					} else {
						this.showEmptyB = 0;
					}
				}
			},
			// 获取三方游戏订单
			async getGameOrder(add) {
				uni.showLoading({
					title: this.$t('loading')
				})
				let res = await this.$u.api.game_order_p({
					page: this.game_page,
					limit: 10,
					isday: 0,
					sports: this.current == 0 ? '' : this.current,
					date: this.start_time ? this.start_time + '|' + this.end_time : ''
				});
				if (res) {
					uni.hideLoading();
					if (add) {
						this.gameList = res.data;
					} else {
						this.gameList = this.gameList.concat(res.data)
					}
					if (res.data.length == 10) {
						this.game_status = "loading";
						this.game_page++;
					} else {
						this.game_status = "noMore";
					}
					if (this.gameList.length > 0) {
						this.showEmptyC = 1;
					} else {
						this.showEmptyC = 0;
					}
				}
			},
			changeTab(e) {
				this.start_time = '';
				this.end_time = '';
				this.sreachData = this.$t('选择日期');
				this.current = e;
				switch (e) {
					case 0:
						this.page = 1;
						this.status = 'loading';
						this.tradingList = [];
						this.getTrading('add');
						break;
					case 1:
						this.game_page = 1;
						this.game_status = 'loading';
						this.gameList = [];
						this.getGameOrder('add');
						break;
					case 2:
						this.game_page = 1;
						this.game_status = 'loading';
						this.gameList = [];
						this.getGameOrder('add');
						break;
					default:
						break;
				}
			},
			catechange(e, i) {
				this.selectStatus = i;
				this.start_time = '';
				this.end_time = '';
				this.sreachData = this.$t('选择日期');
				this.tradingKey = e;
				this.page = 1;
				this.status = 'loading';
				this.tradingList = [];
				this.getTrading('add');
				this.show = false;
			},
			//判断是否显示撤单功能
			showCleOrder() {
				let posi = this.$helper.get('rule');
				if (posi) {
					this.showCel_order = posi.revoke_order;
				}
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async cancelOrder() {
				uni.showLoading({
					mask: true,
					title: this.$t("loading")
				});
				let ret = await this.$u.api.matchrevoke_p({
					order_id: this.orderId
				});
				if (ret.code == 1) {
					this.tradingList = [];
					this.page = 1;
					this.getTrading();
					this.tipShowClose();
					this.getUserInfo_common();
					this.$refs.uTips.show({
						title: this.$t(ret.msg)
					});
				} else {
					this.$refs.uTips.show({
						title: this.$t(ret.msg)
					});
					this.tipShowClose();
				}
			},
			revoke(order_id) {
				this.orderId = '';
				this.tipShowChange();
				this.orderId = order_id;
			},
			async getTrading(add) {
				uni.showLoading({
					mask: true,
					title: this.$t("loading")
				});
				let ret = await this.$u.api.trading_p({
					page: this.page,
					limit: 10,
					zd_type: this.tradingKey,
					start_time: this.start_time,
					end_time: this.end_time
				});
				if (ret) {
					this.total_money = ret.data.total_money;
					this.total_profit = ret.data.total_profit;
					this.time = ret.data.time;
					if (add) {
						this.tradingList = ret.data.list;
					} else {
						this.tradingList = this.tradingList.concat(ret.data.list)
					}
					// 加载状态结束
					if (ret.data.list.length == 10) {
						this.status = "loading";
						this.page++;
					} else {
						this.status = "noMore";
					}
					if (this.tradingList.length > 0) {
						this.showEmpty = 1;
					} else {
						this.showEmpty = 0;
					}
				} else {
					this.showEmpty = 0;
					this.status = "noMore";
				}
			},
			dataConfirm(e) {
				this.start_time = '';
				this.end_time = '';
				// this.sreachData = e.startDate_my + '-' + e.endDate_my;
				this.sreachData = e.startMonth + '/' + e.startDay + '/' + e.startYear + ' - ' + e.endMonth + '/' + e
					.endDay + '/' + e.endYear;
				this.start_time = e.startDate;
				this.end_time = e.endDate
				switch (this.current) {
					case 0:
						this.page = 1;
						this.status = 'loading';
						this.tradingList = [];
						this.getTrading('add');
						break;
					case 1:
						// this.sport_page = 1;
						// this.sport_status = 'loading';
						// this.sportList = [];
						// this.getGameOrderSports('add');
						this.game_page = 1;
						this.game_status = 'loading';
						this.gameList = [];
						this.getGameOrder('add');
						break;
					case 2:
						this.game_page = 1;
						this.game_status = 'loading';
						this.gameList = [];
						this.getGameOrder('add');
						break;
					default:
						break;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.vip-item {
		border: 2px solid rgba(233, 174, 58, 1);
	}

	.vip-item-label {
		padding: 2px 6px;
		border-radius: 6px;
		display: inline-block;
		background: linear-gradient(180deg, #F0B000 0%, #EC8D00 100%);
	}

	.collapseClass {
		position: relative;
		border-radius: 16px;
		background-color: #3E3664;
		overflow: hidden;
		margin-bottom: 8px;

		.collapse-label {
			color: #D1CCE9;
		}

		.col-value {
			margin-right: 10px;
			font-size: 18px;
		}

		.collapse-body {
			background-color: #312B4F;
			color: #ffffff;
		}

		.collapse-row {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 12px;
			border-bottom: 1px solid #1d1737;
		}

		::v-deep .uni-collapse-item__title-arrow {
			width: 32px;
			height: 32px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #D1CCE9;
			border-radius: 50%;
			background-color: #4D4886;
		}
	}

	.collapseClass .line {
		position: absolute;
		left: 10px;
		right: 10px;
		top: 58px;
		border-bottom: 1px solid rgba(77, 72, 134, 1);
	}

	.tradingList-top-one {
		padding-right: 45px !important;
	}

	.collapseTradingListClass ::v-deep .uni-collapse-item--animation {
		position: absolute;
		right: 0;
		min-width: 32px;
		min-height: 32px;
		margin-top: -60px;
	}

	.tra-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 0 12px 12px;

		.col-status {
			display: flex;
			align-items: center;
		}
	}

	.col-status image {
		width: 20px;
		height: 20px;
	}


	.revokeBtn {
		width: 100%;
		padding: 12px 20px;
		border-radius: 12px;
		background: rgba(100, 76, 188, 1);
		text-align: center;
	}

	.gooLight {
		padding-top: 70px;
	}

	.pc-n-tab_item {
		min-width: 90px;
		height: 42px;
		background: #F6F7F9;
		border-radius: 3px;
		line-height: 42px;
		text-align: center;
		margin-right: 10px;
		cursor: pointer;
	}

	.pc-n-tab_item.active {
		color: #fff;
		background: var(--pc-n-tab_item-active);
	}

	.tra-select ::v-deep .uni-select .uni-select__input-text {
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		white-space: inherit;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.tra-select ::v-deep .uni-select .uni-select__selector-item {
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		white-space: inherit;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.filter-cell {
		padding: 16px;
		border-bottom: 1px solid #4c4882;
	}

	.tradeing-market-name {
		max-width: 23vw;
		min-width: 23vw;
		overflow: hidden;
	}
</style>
