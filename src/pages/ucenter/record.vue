<template>
	<view>
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main u-flex">
				<pcSideBar :pageIndex="0"></pcSideBar>
				<view class="m-bg-w m-c-0 pc-main-right">
					<view class="u-flex u-row-between u-m-b-40">
						<view class="m-font-b">{{$t('资金明细')}}</view>
						<view class="form-row ">
							<view class="game-tabs">
								<u-tabs height="64" bar-height="0" bg-color="none" gutter="60" active-color="#ffffff"
									inactive-color="#ffffff" :list="tabsList" :current="current" @change="change">
								</u-tabs>
							</view>
						</view>
					</view>
					<view class="bs-wrapper-two">
						<view class="tra-filter u-m-b-30">
							<view class="flex_bd flex-1">
								<view class="u-flex u-time-bar" @click="dataShow = true">
									<view class="riqiClass">
										<text class="iconfont icon-calendar"></text>
									</view>
									<view class="u-m-l-6">{{$t(sreachData)}}</view>
								</view>
							</view>
							<template v-if="current == 3">
								<view class="tra-select">
									<uni-data-select v-model="cateValue" :localdata="caterange" @change="catechange"
										:clear="false">
									</uni-data-select>
								</view>
							</template>
							<template v-if="current == 4">
								<view class="tra-select">
									<uni-data-select v-model="t_cateValue" :localdata="t_caterange"
										@change="t_catechange" :clear="false">
									</uni-data-select>
								</view>
							</template>
						</view>
						<view class="panel-record-list">
							<template v-if="current == 0">
								<u-row gutter="16" class="dashed-bottom u-p-b-20 u-m-b-20 text-gray">
									<u-col span="4">
										<view>{{$t('类型')+'/'+$t('时间')}}</view>
									</u-col>
									<u-col span="4" text-align="center">
										<view>{{$t('数量')}}</view>
									</u-col>
									<u-col span="4" text-align="right">
										<view>{{$t('user34')}}</view>
									</u-col>
								</u-row>
								<template v-if="showEmpty == 1">
									<scroll-view style="height: calc(100vh - 350px);" scroll-y="true"
										@scrolltolower="scrolltolowerChnage">
										<view class="rec-card" :class="item.isCheck?'show':''"
											v-for="(item,index) in dataList" :key="`list${index}`">
											<view class="rec-card-bd rec-bd-top">
												<u-row gutter="16" class="u-p-b-20">
													<u-col span="4">
														<view class="skin-text">{{$t('user4')}}</view>
													</u-col>
													<u-col span="4" text-align="center">
														<view class="skin-text">{{formatCurrency(item.apply_price)}}</view>
													</u-col>
													<u-col span="4" text-align="right">
														<view
															:class="item.status==1?'text-yellow':item.status==2?'text-red':'text-green'">
															{{item.status == 1?$t('user35'):item.status == 2?$t('user36'):item.status == 3?$t('user37'):$t('user37')}}
														</view>
													</u-col>
												</u-row>
												<view class="text-gray">{{item.add_time}}</view>
												<template v-if="!item.isCheck">
													<view class="u-m-t-14 blue-color u-text-center cur_pointer"
														@click="isCheckClick(item.order_sn,1)">
														{{$t('点击查看更多')}}
													</view>
												</template>
											</view>
											<view class="rec-card-bd" v-if="item.isCheck">
												<view class="bs-info_flex u-text-right">
													<text class="text-gray">{{$t('有异议?')}}</text>
													<text class="text-green u-m-l-8"
														@click="toRescue">{{$t('联系客服')}}</text>
												</view>
												<view class="bs-info_flex flex-center" v-if="item.update_time">
													<view class="rlabel">{{$t('user68')}}:</view>
													<view class="flex_bd">{{item.update_time}}</view>
												</view>
												<view class="bs-info_flex flex-center">
													<view class="rlabel">{{$t('user32')}}:</view>
													<view class="flex_bd">{{item.order_sn}} <text
															class="iconfont icon-fuzhituceng"
															@click="common_copy(`${item.order_sn}`)"></text></view>
												</view>
												<view class="bs-info_flex flex-center">
													<view class="rlabel">{{$t('充值方式')}}:</view>
													<view class="flex_bd" v-if="item.channel==0">{{$t('线下转账')}}</view>
													<view class="flex_bd" v-if="item.channel==1">{{$t('在线充值')}}</view>
													<view class="flex_bd" v-if="item.channel==2">{{$t('USDT')}}</view>
													<view class="flex_bd" v-if="item.channel==3">{{$t('USDT转账')}}</view>
													<view class="flex_bd" v-if="item.channel==4">{{$t('电子钱包')}}</view>
													<view class="flex_bd" v-if="item.channel==6">{{$t('PIX')}}</view>
												</view>
												<view class="bs-info_flex flex-center">
													<view class="rlabel">{{$t('到账金额')}}:</view>
													<view class="flex_bd" v-if="item.arrival_price">
														{{formatCurrency(item.arrival_price)}}
													</view>
												</view>
												<view class="bs-info_flex flex-center">
													<view class="rlabel">{{$t('user51')}}:</view>
													<view class="flex_bd" v-if="item.remarks">{{item.remarks}} </view>
													<view class="flex_bd" v-if="!item.remarks">{{$t('user69')}}</view>
												</view>
											</view>
										</view>
										<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
									</scroll-view>
								</template>
								<template v-if="showEmpty == 0">
									<!--  fullLiftText="暂无充值" -->
									<listEmpty :isDefault="true" class="u-bd-8" :listHighly='300'>
									</listEmpty>
								</template>
							</template>
							<template v-if="current == 1">
								<u-row gutter="16" class="dashed-bottom u-p-b-20 u-m-b-20 text-gray">
									<u-col span="4">
										<view>{{$t('类型')+'/'+$t('时间')}}</view>
									</u-col>
									<u-col span="4" text-align="center">
										<view>{{$t('数量')}}</view>
									</u-col>
									<u-col span="4" text-align="right">
										<view>{{$t('user34')}}</view>
									</u-col>
								</u-row>
								<template v-if="showEmpty2 == 1">
									<scroll-view style="height: calc(100vh - 350px);" scroll-y="true"
										@scrolltolower="scrolltolowerChnage">
										<view class="rec-card" :class="item.isCheck?'show':''"
											v-for="(item,index) in dataList2" :key="`list${index}`">
											<view class="rec-card-bd rec-bd-top">
												<u-row gutter="16" class="u-p-b-20">
													<u-col span="4">
														<view class="skin-text">{{$t('user5')}}</view>
													</u-col>
													<u-col span="4" text-align="center">
														<view class="skin-text">{{formatCurrency(item.w_price)}}</view>
													</u-col>
													<u-col span="4" text-align="right">
														<view v-if="item.status==1" class="text-yellow">
															{{$t('agent78')}}
														</view>
														<view v-if="item.status==5" class="text-green">{{$t('game59')}}
														</view>
														<view v-if="item.status==3 || item.status==4"
															class="text-green">
															{{$t('user37')}}
														</view>
														<view v-if="item.status==2" class="text-red">{{$t('user36')}}
														</view>
													</u-col>
												</u-row>
												<view class="text-gray">{{item.add_time}}</view>
												<template v-if="!item.isCheck">
													<view class="u-m-t-14 text-blue u-text-center"
														@click="isCheckClick(item.order_sn,2)">
														{{$t('点击查看更多')}}
													</view>
												</template>
											</view>
											<view class="rec-card-bd" v-if="item.isCheck">
												<view class="bs-info_flex flex-center" v-if=" item.status > 1">
													<view class="rlabel">{{$t('user68')}}:</view>
													<view class="flex_bd">{{item.update_time}}</view>
												</view>
												<view class="bs-info_flex flex-center">
													<view class="rlabel">{{$t('user32')}}:</view>
													<view class="flex_bd">{{item.order_sn}} <text
															class="iconfont icon-fuzhituceng"
															@click="common_copy(`${item.order_sn}`)"></text></view>
												</view>
												<view class="bs-info_flex flex-center">
													<view class="rlabel">{{$t('充值方式')}}:</view>
													<view class="flex_bd" v-if="item.channel==0">{{$t('线下转账')}}</view>
													<view class="flex_bd" v-if="item.channel==1">{{$t('在线充值')}}</view>
													<view class="flex_bd" v-if="item.channel==2">{{$t('USDT')}}</view>
													<view class="flex_bd" v-if="item.channel==3">{{$t('USDT转账')}}</view>
													<view class="flex_bd" v-if="item.channel==4">{{$t('电子钱包')}}</view>
													<view class="flex_bd" v-if="item.channel==6">{{$t('PIX')}}</view>
												</view>
												<view class="bs-info_flex flex-center">
													<view class="rlabel">{{$t('到账金额')}}:</view>
													<view class="flex_bd" v-if="item.arrival_price">
														{{formatCurrency(item.arrival_price)}}
													</view>
												</view>
												<view class="bs-info_flex flex-center" v-if="item.w_remarks">
													<view class="rlabel">{{$t('user51')}}:</view>
													<view class="flex_bd">{{item.w_remarks}}</view>
												</view>
											</view>
										</view>
										<uni-load-more :status="status2" :contentText="contentText2"></uni-load-more>
									</scroll-view>
								</template>
								<template v-if="showEmpty2 == 0">
									<!--  fullLiftText="暂无提现" -->
									<listEmpty :isDefault="true" class="u-bd-8" :listHighly='300'>
									</listEmpty>
								</template>
							</template>
							<template v-if="current == 2">
								<template v-if="waterrecordEmpty == 1">
									<scroll-view style="height: calc(100vh - 350px);" scroll-y="true"
										@scrolltolower="scrolltolowerChnage">
										<u-row gutter="16" class="dashed-bottom u-p-b-20 u-m-b-20 text-gray">
											<u-col span="5">
												<view>{{$t('类型')+'/'+$t('时间')}}</view>
											</u-col>
											<u-col span="2" text-align="center">
											</u-col>
											<u-col span="5" text-align="right">
												<view>{{$t('user33')}}</view>
											</u-col>
										</u-row>
										<view class="rec-card" v-for="(item,index) in waterrecord" :key="index">
											<view class="rec-card-bd ">
												<u-row gutter="16">
													<u-col span="7">
														<view class="u-m-b-16">{{$t(item.msg)}}</view>
														<view class="text-gray ">{{item.add_time}}</view>
													</u-col>
													<u-col span="5" text-align="right">
														<view>{{item.type + formatCurrency(item.price)}}</view>
													</u-col>
												</u-row>
											</view>
										</view>
										<uni-load-more :status="wstatus" :contentText="wcontentText"></uni-load-more>
									</scroll-view>
								</template>
								<template v-if="waterrecordEmpty == 0">
									<listEmpty :isDefault="true" class="u-bd-8" :listHighly='300'>
									</listEmpty>
								</template>
							</template>
							<template v-if="current == 3">
								<u-row gutter="16" class="dashed-bottom u-p-b-20 u-m-b-20 text-gray">
									<u-col span="4">
										<view>{{$t('类型')}}</view>
									</u-col>
									<u-col span="4" text-align="center">
										<view>{{$t('user51')}}</view>
									</u-col>
									<u-col span="4" text-align="right">
										<view>{{$t('user33')}}</view>
									</u-col>
								</u-row>
								<template v-if="tableListEmpty == 1">
									<scroll-view style="height: calc(100vh - 350px);" scroll-y="true"
										@scrolltolower="scrolltolowerChnage">
										<view class="rec-card" v-for="(item,index) in tableList" :key="index">
											<view class="rec-card-bd rec-bd-top">
												<u-row gutter="16" class="u-p-b-20">
													<u-col span="4">
														<view>{{$t(item.msg)}}</view>
													</u-col>
													<u-col span="4" text-align="center">
														<view class="skin-text">{{formatCurrency(item.price)}}</view>
													</u-col>
													<u-col span="4" text-align="right">
														<view
															:class="item.status==1?'text-yellow':item.status==2?'text-red':'text-green'">
															{{item.status == 1?$t('user35'):item.status == 2?$t('user36'):item.status == 3?$t('user37'):$t('user37')}}
														</view>
													</u-col>
												</u-row>
												<view class="text-gray u-text-center">{{item.add_time}}</view>
											</view>
										</view>
										<uni-load-more :status="rstatus" :contentText="rcontentText"></uni-load-more>
									</scroll-view>
								</template>
								<template v-if="tableListEmpty == 0">
									<!--  fullLiftText="您尚未参加任意活动" -->
									<listEmpty :isDefault="true" class="u-bd-8" :listHighly='300'>
									</listEmpty>
								</template>
							</template>
							<template v-if="current == 4">
								<template v-if="transferListEmpty == 1">
									<scroll-view style="height: calc(100vh - 350px);" scroll-y="true"
										@scrolltolower="scrolltolowerChnage">
										<view v-for="(item,index) in transferList" :key="`transferList${index}`"
											class="rec-card rec-card-bd">
											<view class="solid-bottom u-p-b-14">
												<view class="u-flex u-row-between u-col-top">
													<view>
														<view class="bs-info_flex flex-center">
															<view class="rlabel">{{$t('转账账号')}}:</view>
															<view class="flex_bd">{{item.username}}</view>
														</view>
														<view class="bs-info_flex flex-center">
															<view class="rlabel">{{$t('接收账号')}}:</view>
															<view class="flex_bd">{{item.to_user_name}}</view>
														</view>
													</view>
													<view
														:class="item.state.val == 1 ? 'm-c-success' : item.state.val == 2 ? 'm-c-review' : 'm-c-error'">
														{{$t(item.state.text)}}
													</view>
												</view>
												<view class="bs-info_flex flex-center">
													<view class="rlabel">{{$t('user32')}}:</view>
													<view class="flex_bd">{{item.transfer_number}} <text
															class="iconfont icon-fuzhituceng"
															@click="common_copy(`${item.transfer_number}`)"></text>
													</view>
												</view>
											</view>
											<view class="u-m-t-14">
												<view class="bs-info_flex flex-center">
													<view class="rlabel">{{$t('金额')}}:</view>
													<view class="flex_bd"
														:class="item.type == 1 ? 'm-c-error' : 'm-c-review'">
														{{item.type == 1 ? '-' : '+'}}{{item.price}}
													</view>
												</view>
												<view class="bs-info_flex flex-center">
													<view class="rlabel">{{$t('手续费')}}:</view>
													<view class="flex_bd">{{item.charge}}</view>
												</view>
												<view class="bs-info_flex flex-center">
													<view class="rlabel">{{$t('日期')}}:</view>
													<view class="flex_bd">{{item.createTime}}</view>
												</view>
												<view class="bs-info_flex flex-center" v-if="item.msg">
													<view class="rlabel">{{$t('user51')}}:</view>
													<view class="flex_bd">{{$t(item.msg)}}</view>
												</view>
											</view>
										</view>
										<uni-load-more :status="t_status" :contentText="t_contentText"></uni-load-more>
									</scroll-view>
								</template>
								<template v-if="transferListEmpty == 0">
									<listEmpty :isDefault="true" class="u-bd-8" :listHighly='300'>
									</listEmpty>
								</template>
							</template>
						</view>
					</view>
				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content" :data-theme="themeMode">
				<view class="container">
					<uniNavHeader :title="$t('交易记录')" isback @clickLeft="menuClick"></uniNavHeader>
					<view class="bs-wrapper-top">
						<view class="game-tabs">
							<u-tabs height="64" bar-height="0" bg-color="none" gutter="60" active-color="#ffffff"
								inactive-color="#ffffff" :list="tabsList" :current="current" @change="change">
							</u-tabs>
						</view>
						<view class="dw-line"></view>
					</view>
					<view class="bs-wrapper-bottom">
						<view class="tra-filter u-m-b-30">
							<view class="flex_bd flex-1">
								<view class="u-flex u-time-bar" @click="dataShow = true">
									<view class="u-m-r-10 m-font-16">{{$t(sreachData)}}</view>
									<view class="iconfont icon-calendar u-c-g"></view>
								</view>
							</view>
							<template v-if="current == 3">
								<view class="mm-filter-item m-font-16" @click="typeSelectPop = true">
									<text>{{typeSelect}}</text><text
										class="iconfont icon-sj-down u-font-xs u-m-l-10 u-c-g"></text>
								</view>
							</template>
						</view>
						<view class="panel-record-list">
							<template v-if="current == 0">
								<template v-if="showEmpty == 1">
									<uni-collapse ref="collapse" v-model="collvalue">
										<uni-collapse-item class="collapseClass" v-for="(item,index) in dataList"
											:key="`dataList${index}`" :open="false">
											<template v-slot:title>
												<view class="tra-title">
													<view class="col-status">
														<image src="../../static/images/plus-circle2.png"
															style="width: 20px;height: 20px;">
														</image>
														<text class="m-font-16">{{item.status == 1?$t('user35'):item.status == 2?$t('user36'):item.status == 3?$t('user37'):$t('user37')}}</text>
													</view>
													<view class="col-value">
														{{formatCurrency(item.apply_price)+' ₽'}}
													</view>
												</view>
											</template>
											<view class="collapse-body">
												<view class="collapse-row" @click="common_copy(item.order_sn)">
													<view class="collapse-label">{{$t("trade4")}}</view>
													<view class="collapse-value">
														<text class="iconfont icon-fuzhi2"></text>
														<text>{{item.order_sn}}</text>
													</view>
												</view>
												<view class="collapse-row" v-if="item.update_time">
													<view class="collapse-label">{{$t("user68")}}</view>
													<view class="collapse-value">{{item.update_time}}
													</view>
												</view>
												<view class="collapse-row">
													<view class="collapse-label">{{$t("充值方式")}}</view>
													<view class="collapse-value" v-if="item.channel==0">{{$t("线下转账")}}
													</view>
													<view class="collapse-value" v-if="item.channel==1">{{$t("在线充值")}}
													</view>
													<view class="collapse-value" v-if="item.channel==2">{{$t("USDT")}}
													</view>
													<view class="collapse-value" v-if="item.channel==3">{{$t("USDT")}}
													</view>
													<view class="collapse-value" v-if="item.channel==4">{{$t("电子钱包")}}
													</view>
													<view class="collapse-value" v-if="item.channel==6">{{$t("PIX")}}
													</view>
												</view>
												<view class="collapse-row" v-if="item.arrival_price">
													<view class="collapse-label">{{$t("到账金额")}}</view>
													<view class="collapse-value">{{formatCurrency(item.arrival_price)+' ₽'}}
													</view>
												</view>
											</view>
										</uni-collapse-item>
									</uni-collapse>
									<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
								</template>
								<template v-if="showEmpty == 0">
									<listEmpty :isDefault="true" class="u-bd-8" :listHighly='300'>
									</listEmpty>
								</template>
							</template>
							<template v-if="current == 1">
								<template v-if="showEmpty2 == 1">
									<uni-collapse ref="collapse" v-model="collvalue">
										<uni-collapse-item class="collapseClass" v-for="(item,index) in dataList2"
											:key="`dataList2${index}`" :open="false">
											<template v-slot:title>
												<view class="tra-title">
													<view class="col-status">
														<image src="../../static/images/ArrowUp.png"
															style="width: 20px;height: 20px;">
														</image>
														<text class="m-font-16">{{item.status == 1?$t('agent78'):item.status == 2?$t('user36'):item.status == 3||item.status == 4?$t('user37'):$t('game59')}}</text>
													</view>
													<view class="col-value">
														{{formatCurrency(item.w_price)+' ₽'}}
													</view>
												</view>
											</template>
											<view class="collapse-body">
												<view class="collapse-row" @click="common_copy(item.order_sn)">
													<view class="collapse-label">{{$t("user32")}}</view>
													<view class="collapse-value">
														<text class="iconfont icon-fuzhi2"></text>
														<text>{{item.order_sn}}</text>
													</view>
												</view>
												<view class="collapse-row" v-if="item.status > 1">
													<view class="collapse-label">{{$t("user68")}}</view>
													<view class="collapse-value">{{item.update_time}}
													</view>
												</view>
												<view class="collapse-row">
													<view class="collapse-label">{{$t("提现方式")}}</view>
													<view class="collapse-value" v-if="item.channel==0">{{$t("线下转账")}}
													</view>
													<view class="collapse-value" v-if="item.channel==1">{{$t("在线提现")}}
													</view>
													<view class="collapse-value" v-if="item.channel==2">{{$t("USDT")}}
													</view>
													<view class="collapse-value" v-if="item.channel==3">{{$t("USDT")}}
													</view>
													<view class="collapse-value" v-if="item.channel==4">{{$t("电子钱包")}}
													</view>
													<view class="collapse-value" v-if="item.channel==6">{{$t("PIX")}}
													</view>
												</view>
												<view class="collapse-row" v-if="item.arrival_price">
													<view class="collapse-label">{{$t("到账金额")}}</view>
													<view class="collapse-value">{{formatCurrency(item.arrival_price)+' ₽'}}
													</view>
												</view>
											</view>
										</uni-collapse-item>
									</uni-collapse>
									<uni-load-more :status="status2" :contentText="contentText2"></uni-load-more>
								</template>
								<template v-if="showEmpty2 == 0">
									<!--  fullLiftText="暂无提现" -->
									<listEmpty :isDefault="true" class="u-bd-8" :listHighly='300'>
									</listEmpty>
								</template>
							</template>
							<template v-if="current == 2">
								<template v-if="waterrecordEmpty == 1">
									<uni-collapse ref="collapse" v-model="collvalue">
										<uni-collapse-item class="collapseClass" v-for="(item,index) in waterrecord"
											:key="`waterrecord${index}`" :open="true">
											<template v-slot:title>
												<view class="tra-title">
													<view class="col-status m-font-16">{{$t(item.msg)}}</view>
													<view class="col-value">
														{{item.type + formatCurrency(item.price)+' ₽'}}
													</view>
												</view>
											</template>
											<view class="collapse-body">
												<view class="collapse-row">
													<view class="collapse-label">{{$t("user68")}}</view>
													<view class="collapse-value">{{item.add_time}}
													</view>
												</view>
											</view>
										</uni-collapse-item>
									</uni-collapse>
									<uni-load-more :status="wstatus" :contentText="wcontentText"></uni-load-more>
								</template>
								<template v-if="waterrecordEmpty == 0">
									<listEmpty :isDefault="true" class="u-bd-8" :listHighly='300'>
									</listEmpty>
								</template>
							</template>
							<template v-if="current == 3">
								<template v-if="tableListEmpty == 1">
									<uni-collapse ref="collapse" v-model="collvalue">
										<uni-collapse-item class="collapseClass" v-for="(item,index) in tableList"
											:key="`tableList${index}`" :open="true">
											<template v-slot:title>
												<view class="tra-title">
													<view class="col-status m-font-16">{{$t(item.msg)}}</view>
													<view class="col-value">
														{{formatCurrency(item.price)+' ₽'}}
													</view>
												</view>
											</template>
											<view class="collapse-body">
												<view class="collapse-row">
													<view class="collapse-label">{{$t("状态")}}</view>
													<view class="collapse-value">
														{{item.status == 1?$t('user35'):item.status == 2?$t('user36'):item.status == 3?$t('user37'):$t('user37')}}
													</view>
												</view>
												<view class="collapse-row">
													<view class="collapse-label">{{$t("user68")}}</view>
													<view class="collapse-value">{{item.add_time}}
													</view>
												</view>
											</view>
										</uni-collapse-item>
									</uni-collapse>
									<uni-load-more :status="rstatus" :contentText="rcontentText"></uni-load-more>
								</template>
								<template v-if="tableListEmpty == 0">
									<!--  fullLiftText="您尚未参加任意活动" -->
									<listEmpty :isDefault="true" class="u-bd-8" :listHighly='300'>
									</listEmpty>
								</template>
							</template>
						</view>
					</view>
				</view>
			</view>
		</template>
		<u-calendar v-model="dataShow" color="#888" activeBgColor="var(--calendar-active-bg)"
			rangeColor="var(--calendar-active-bg)" rangeBgColor="var(--rangeBgColor-bg)" mode="range"
			@change="dataConfirm" :modeString="mobile_common?'bottom':'center'"></u-calendar>
		<u-popup v-model="typeSelectPop" mode="bottom" borderRadius="32" :mask-custom-style="uPopMaskCustomStyle">
			<view class="bs-popup-hd">
				<view class="tt">
					{{$t('请选择')}}
				</view>
				<image src="@/static/images/index/close.png"
					style="width: 32px;height: 32px;position: absolute;right: 15px;" mode=""
					@click="typeSelectPop = false">
				</image>
			</view>
			<view class="bs-popup-bd">
				<scroll-view scroll-y="true" style="max-height: calc(100vh - 400px);">
					<view class="filter-cell" v-for="(item,index) in caterange" :key="`caterange${index}`"
						@click="catechange(item.value,item.text)">
						<view class="u-flex u-row-between">
							<view>{{item.text}}</view>
							<view class="iconfont icon-dui text-yellow" v-if="cateKey == item.value"></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			listEmpty,
			pcNavHeader,
			pcSideBar
		},
		data() {
			return {
				tabsList: [{
					name: this.$t('user4')
				}, {
					name: this.$t('user5')
				}, {
					name: this.$t('账单')
				}, {
					name: this.$t('活动')
				}],
				current: 0,
				sideshow: false,
				dataList: [],
				page: 1,
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				dataList2: [],
				page2: 1,
				status2: 'more',
				contentText2: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				showEmpty: null,
				showEmpty2: null,
				enable: true,
				// xin
				cateValue: 0,
				caterange: [{
						value: 0,
						text: this.$t('赠送彩金')
					},
					{
						value: 1,
						text: this.$t('优惠活动')
					}
				],
				sreachData: this.$t('选择日期'),
				start_time: '',
				end_time: '',
				dataShow: false,
				dataTime: '',
				waterrecord: [],
				wpage: 1,
				wstatus: 'more',
				wcontentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				rpage: 1,
				tableList: [],
				rstatus: 'more',
				rcontentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				tableListEmpty: null,
				waterrecordEmpty: null,
				cateType: 1,
				t_cateValue: 3,
				t_caterange: [{
						value: 3,
						text: this.$t('全部')
					}, {
						value: 1,
						text: this.$t('转账')
					},
					{
						value: 2,
						text: this.$t('接收')
					}

				],
				t_page: 1,
				transferList: [],
				t_status: 'more',
				t_contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				transferListEmpty: null,
				t_cateType: 3,
				collvalue: '',
				typeSelect: this.$t('赠送彩金'),
				typeSelectPop: false,
				cateKey: 0,
			}
		},
		async onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('交易记录')
			});
			this.enable = true;
			this.getWithStatus();
		},
		onHide() {
			this.enable = false;
		},
		onLoad(e) {
			this.level = e.level;
			this.getDataList('add');
		},
		onReachBottom() {
			if (this.current == 0) {
				if (this.status == 'noMore') {
					return;
				}
				this.getDataList();
			} else if (this.current == 1) {
				if (this.status2 == 'noMore') {
					return;
				}
				this.getDataList2();
			} else if (this.current == 2) {
				if (this.wstatus == 'noMore') {
					return;
				}
				this.getwaterrecord();
			} else if (this.current == 3) {
				if (this.rstatus == 'noMore') {
					return;
				}
				this.getTableList();
			}
		},
		methods: {
			scrolltolowerChnage() {
				if (this.current == 0) {
					if (this.status == 'noMore') {
						return;
					}
					this.getDataList();
				} else if (this.current == 1) {
					if (this.status2 == 'noMore') {
						return;
					}
					this.getDataList2();
				} else if (this.current == 2) {
					if (this.wstatus == 'noMore') {
						return;
					}
					this.getwaterrecord();
				} else if (this.current == 3) {
					if (this.rstatus == 'noMore') {
						return;
					}
					this.getTableList();
				} else if (this.current == 4) {
					if (this.t_status == 'noMore') {
						return;
					}
					this.getTransferList();
				}
			},
			getWithStatus() {
				if (this.$helper.get('userInfo').sc_date == 1) {
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			change(index) {
				this.sreachData = this.$t('选择日期');
				this.typeSelect = this.$t('赠送彩金');
				this.current = index;
				this.showEmpty = null;
				this.showEmpty2 = null;
				this.tableListEmpty = null;
				this.waterrecordEmpty = null;
				this.cateValue = 0;
				this.start_time = '';
				this.end_time = '';
				if (index == 0) {
					this.page = 1;
					this.dataList = [];
					this.getDataList('add');
				} else if (index == 1) {
					this.page2 = 1;
					this.dataList2 = [];
					this.getDataList2('add');
				} else if (index == 2) {
					this.wpage = 1;
					this.waterrecord = [];
					this.getwaterrecord('add');
				} else if (index == 3) {
					this.rpage = 1;
					this.tableList = [];
					this.getTableList('add', 1);
				} else if (index == 4) {
					this.t_page = 1;
					this.transferList = [];
					this.getTransferList('add');
				}
			},
			catechange(e, i) {
				this.cateKey = e;
				this.typeSelect = i;
				this.sreachData = this.$t('选择日期');
				this.start_time = '';
				this.end_time = '';
				this.rpage = 1;
				this.tableList = [];
				this.cateType = e + 1;
				this.getTableList('add', this.cateType);
				this.typeSelectPop = false;
			},
			t_catechange(e) {
				this.sreachData = this.$t('选择日期');
				this.start_time = '';
				this.end_time = '';
				this.t_page = 1;
				this.t_cateType = e;
				this.transferList = [];
				this.getTransferList('add');
			},
			async getDataList(add) {
				uni.showLoading({
					title: this.$t('loading')
				})
				let ret = await this.$u.api.rechargerecord_p({
					page: this.page,
					limit: 20,
					start_time: this.start_time,
					end_time: this.end_time,
				});
				if (ret) {
					uni.hideLoading();
					let arr_data = ret.data;
					if (add) {
						this.dataList = arr_data;
					} else {
						this.dataList = this.dataList.concat(arr_data);
					}
					for (let a in this.dataList) {
						this.dataList[a].isCheck = false;
					}
					// 加载状态结束
					if (arr_data.length == 20) {
						this.status = "loading";
						this.page++;
					} else {
						this.status = "noMore";
					}
					if (this.dataList.length > 0) {
						this.showEmpty = 1;
					} else {
						this.showEmpty = 0;
					}
				}
			},
			async getDataList2(add) {
				uni.showLoading({
					title: this.$t('loading')
				})
				let ret = await this.$u.api.withdrawrecord_p({
					page: this.page2,
					limit: 20,
					start_time: this.start_time,
					end_time: this.end_time,
				});
				if (ret) {
					uni.hideLoading();
					if (add) {
						this.dataList2 = ret.data;
					} else {
						this.dataList2 = this.dataList2.concat(ret.data);
					}
					for (let a in this.dataList2) {
						this.dataList2[a].isCheck = false;
					}
					// 加载状态结束
					if (ret.data.length == 20) {
						this.status2 = "loading";
						this.page2++;
					} else {
						this.status2 = "noMore";
					}
					if (this.dataList2.length > 0) {
						this.showEmpty2 = 1;
					} else {
						this.showEmpty2 = 0;
					}
				}
			},
			async getwaterrecord(add) {
				uni.showLoading({
					title: this.$t('loading')
				})
				let ret = await this.$u.api.waterrecord_p({
					page: this.wpage,
					limit: 10,
					start_time: this.start_time,
					end_time: this.end_time,
				});
				if (ret) {
					uni.hideLoading();
					if (add) {
						this.waterrecord = ret.data;
					} else {
						this.waterrecord = this.waterrecord.concat(ret.data);
					}
					// 加载状态结束
					if (ret.data.length == 10) {
						this.wstatus = "loading";
						this.wpage++;
					} else {
						this.wstatus = "noMore";
					}
					if (this.waterrecord.length > 0) {
						this.waterrecordEmpty = 1;
					} else {
						this.waterrecordEmpty = 0;
					}
				}
			},
			// 获取活动收入列表
			async getTableList(add, type) {
				uni.showLoading({
					title: this.$t('loading')
				})
				let res = await this.$u.api.recharge_mosaic_p({
					limit: 10,
					page: this.rpage,
					type: type,
					start_time: this.start_time,
					end_time: this.end_time,
				});
				if (res) {
					uni.hideLoading();
					if (add) {
						this.tableList = res.data;
					} else {
						this.tableList = this.tableList.concat(res.data);
					}
					if (res.data.length == 10) {
						this.rstatus = "loading";
						this.rpage++;
					} else {
						this.rstatus = "noMore";
					}
					if (this.tableList.length > 0) {
						this.tableListEmpty = 1;
					} else {
						this.tableListEmpty = 0;
					}
				}
			},
			// 获取转账记录列表
			async getTransferList(add) {
				uni.showLoading({
					title: this.$t('loading')
				})
				let res = await this.$u.api.transfer_list_p({
					limit: 10,
					page: this.t_page,
					type: this.t_cateType,
					start_time: this.start_time,
					end_time: this.end_time,
				});
				if (res) {
					uni.hideLoading();
					if (add) {
						this.transferList = res.data;
					} else {
						this.transferList = this.transferList.concat(res.data);
					}
					if (res.data.length == 10) {
						this.t_status = "loading";
						this.t_page++;
					} else {
						this.t_status = "noMore";
					}
					if (this.transferList.length > 0) {
						this.transferListEmpty = 1;
					} else {
						this.transferListEmpty = 0;
					}
				}
			},
			isCheckClick(sn, key) {
				if (key == 1) {
					let arr = this.dataList;
					for (let i in arr) {
						if (sn == arr[i].order_sn) {
							arr[i].isCheck = true;
						}
					}
					this.dataList = arr;
				} else {
					let arr = this.dataList2;
					for (let i in arr) {
						if (sn == arr[i].order_sn) {
							arr[i].isCheck = true;
						}
					}
					this.dataList2 = arr;
				}
				this.$forceUpdate();
			},
			dataConfirm(e) {
				this.sreachData = this.$t('选择日期');
				this.start_time = '';
				this.end_time = '';
				// this.sreachData = e.startDate_my + '-' + e.endDate_my;
				this.sreachData = e.startMonth + '/' + e.startDay + '/' + e.startYear + ' - ' + e.endMonth + '/' + e
					.endDay + '/' + e.endYear;
				this.start_time = e.startDate;
				this.end_time = e.endDate;
				if (this.current == 0) {
					this.page = 1;
					this.dataList = [];
					this.getDataList('add');
				} else if (this.current == 1) {
					this.page2 = 1;
					this.dataList2 = [];
					this.getDataList2('add');
				} else if (this.current == 2) {
					this.wpage = 1;
					this.waterrecord = [];
					this.getwaterrecord('add');
				} else if (this.current == 3) {
					this.rpage = 1;
					this.tableList = [];
					this.getTableList('add', this.cateType);
				} else if (this.current == 4) {
					this.t_page = 1;
					this.transferList = [];
					this.getTransferList('add');
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	.revokeBtn {
		color: var(--body-color);
		padding: 3px 20px;
	}

	.riqiClass {
		color: #204BBB;
		font-size: 0;
		margin: 0 5px;
	}

	.riqiClass image {
		width: 20px;
		height: 20px;
	}

	.game-tabs {
		margin: 0 15px;

		::v-deep .u-tab-item {
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

	.container {
		::v-deep .uni-navbar {
			background: var(--mar-bg);
		}
	}

	.tra-select ::v-deep .uni-select__selector-item {
		line-height: 20px;
		padding: 10px;
	}

	.bs-wrapper-bd {
		background: var(--mar-bg);
	}

	.bs-wrapper-two {
		padding: 15px 10px !important;
		border-radius: 12px 12px 0 0;
		background: var(--body-bg);
	}

	.m-c-review {
		color: #2B44B1;
	}

	.m-c-success {
		color: #50DA1B;
	}

	.m-c-error {
		color: #FF0000;
	}

	.tra-select ::v-deep .uni-select__selector {
		border-radius: 6px !important;
		padding: 7px !important;
	}

	.tra-select ::v-deep .uni-select {
		border: none !important;
	}

	.collapseClass {
		border-radius: 16px;
		background-color: #3E3664;
		overflow: hidden;
		margin-bottom: 8px;

		.collapse-label {
			color: #D1CCE9;
		}

		.col-value {
			margin-right: 10px;
			font-size: 15px;
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

	.tra-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 0 12px 12px;

		.col-status {
			display: flex;
			align-items: center;

			image {
				width: 24px;
				height: 24px;
			}
		}
	}

	.filter-cell {
		padding: 16px;
		border-bottom: 1px solid #4c4882;
	}
	
	.filter-cell:last-child {
		margin-bottom: 40px;
		border-bottom: 1px solid #4c4882;
	}
</style>
