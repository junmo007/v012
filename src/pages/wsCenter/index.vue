<template>
	<view :class="isOpen?'pc-open':'pc-close'">
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main u-flex u-col-top">
				<pcSideBar :pageIndex="8" @menu-event="parentMenu"></pcSideBar>
				<view class="pc-wrapper flex_bd">
					<u-row gutter="40">
						<u-col span="5">
							<view class="bs-panel-top u-flex u-m-b-30">
								<text class="u-font-36">{{$t('menu8')}}</text>
								<text @click="openN"
									class="text-yellow u-font-32 u-m-l-10 cur_pointer">{{$t('代理协议')}}</text>
							</view>
							<view class="bs-panel" style="height: 386px;">
								<view class="inv-body ">
									<view class="inv-top u-flex m-font-20 m-font-b u-m-b-10">
										<text class="inv-tt">{{$t('Hello!')}}</text>
										<text class="inv-tt">{{$t('Team Leader')}}</text>
									</view>
									<view class="top-text u-flex m-font-14"
										@click="$go('/pages/wsCenter/distributionRecord')">
										<view class="top-label u-c-g">{{$t('营收总览')}}</view>
									</view>
									<!-- <view class="inv-data u-flex u-m-b-40">
										<view class="col" @click="$go('/pages/wsCenter/distributionRecord')">
											<view class="inv-card">
												<view class="d-value ">{{historyProfitCount}}</view>
												<view class="d-label">{{$t('agent60')}}</view>
											</view>
										</view>
										<view class="col" @click="$go('/pages/wsCenter/distributionRecord')">
											<view class="inv-card">
												<view class="d-value ">{{profitCount}}</view>
												<view class="d-label">{{$t('昨日收益')}}</view>
											</view>
										</view>
									</view> -->
									<view class="inv-data u-flex u-m-b-40">
										<view class="col" @click="$go('/pages/wsCenter/distributionRecord')">
											<view class="inv-card">
												<view class="d-value ">{{userRebate1?userRebate1+' ₽':'0.00 ₽'}}
												</view>
												<view class="d-label">{{$t('agent60')}}</view>
											</view>
										</view>
										<view class="col" @click="$go('/pages/wsCenter/distributionRecord')">
											<view class="inv-card">
												<view class="d-value ">{{userRebate2?userRebate2+' ₽':'0.00 ₽'}}
												</view>
												<view class="d-label">{{$t('昨日收益')}}</view>
											</view>
										</view>
									</view>
									<view class="ws-cells u-m-b-30">
										<view class="time-bar">
											<view class="m-font-16" @click="dataShow = true">{{$t(sreachData)}}
											</view>
											<view class="iconfont icon-calendar u-m-l-10 u-c-g"
												@click="dataShow = true">
											</view>
											<view class="cleaTime m-line-1" v-if="start_time" @click="clearTime">
												{{$t('清除')}}
											</view>
										</view>
									</view>
									<view class="wsCenter-card card-team-v">
										<view class="card-v">
											<view class="card-v-icon">
												<image src="../../static/images/discount-coupon.png" mode="">
												</image>
											</view>
											<view class="card-v-h line-2 m-font-16">{{$t('agent9')}}</view>
											<view class="card-v-bd m-font-16">
												{{team.agent_balance?team.agent_balance+' ₽':'0.00 ₽'}}
											</view>
										</view>
										<view class="card-v">
											<view class="card-v-icon">
												<image src="../../static/images/up-user.png" mode=""></image>
											</view>
											<view class="card-v-h line-2 m-font-16">{{$t('团队新增')}}</view>
											<view class="card-v-bd m-font-16">
												{{newTeamUser.user_count?newTeamUser.user_count:0}}
											</view>
										</view>
										<view class="card-v">
											<view class="card-v-icon">
												<image src="../../static/images/gift-rating-bow.png" mode="">
												</image>
											</view>
											<view class="card-v-h line-2 m-font-16">{{$t('agent38')}}</view>
											<view class="card-v-bd m-font-16">
												{{team.tg_balance?team.tg_balance+' ₽':'0.00 ₽'}}
											</view>
										</view>
									</view>
								</view>
							</view>
						</u-col>
						<u-col span="5">
							<view class="bs-panel-top u-flex u-m-b-30">
								<text class="u-font-36">{{$t('agent37')}}</text>
								<view class="u-m-l-10 text-yellow cur_pointer">
									<text @click="$go(`/pages/wsCenter/team`)" class="u-font-32 ">{{$t('查看所有')}}</text>
									<text class="iconfont icon-right"></text>
								</view>
							</view>
							<view class="bs-panel team-card m-rela" style="height: 386px;">
								<view class="t-data-postion u-flex u-row-center u-p-t-40 u-m-b-20">
									<view class="t-data-row u-flex u-m-r-60">
										<view class="bar-num  ">
											{{(numberLimit(newTeamUser.user_count1)?numberLimit(newTeamUser.user_count1):0)}}
										</view>
										<view class="bar-item">
											{{ $t('LV.1')}}
										</view>
									</view>
									<view class="t-data-row u-flex u-m-r-60">
										<view class="bar-num  ">
											{{(numberLimit(newTeamUser.user_count2)?numberLimit(newTeamUser.user_count2):0)}}
										</view>
										<view class="bar-item">
											{{ $t('LV.2')}}
										</view>
									</view>
									<view class="t-data-row u-flex">
										<view class="bar-num  ">
											{{(numberLimit(newTeamUser.user_count3)?numberLimit(newTeamUser.user_count3):0)}}
										</view>
										<view class="bar-item">
											{{ $t('LV.3')}}
										</view>
									</view>
								</view>
								<view class="u-flex-charts">
									<qiun-data-charts type="ring" :opts="opts" :chartData="chartData" />
								</view>
							</view>
						</u-col>
						<u-col span="10" class="u-m-t-50">
							<view class="bs-panel-top u-m-b-30">
								<text class="u-font-36">{{$t('我的返佣')}}</text>
							</view>
							<view class="wsCenter-card bs-panel">
								<template v-if="userTeamRecord.length > 0">
									<view class="record-header w_100 u-flex u-row-between u-p-30 u-c-g m-font-12">
										<view class="record-header-item w_25">{{$t('agent62')}}</view>
										<view class="record-header-item w_25 u-text-center">{{$t('user34')}}
										</view>
										<view class="record-header-item w_25 u-text-center">{{$t('user33')}}
										</view>
										<view class="record-header-item w_25 u-text-right">{{$t('时间')}}
										</view>
									</view>
									<view class="record-body w_100 u-flex u-row-between u-p-30 m-font-12"
										v-for="(item,index) in userTeamRecord" :key="`userTeamRecord${index}`">
										<view class="record-header-item w_25">{{item.username}}</view>
										<view class="record-header-item w_25 u-text-center record-header-item-nomaoril">
											<text v-if="item.status == 1">{{$t('agent56')}}</text>
											<text v-if="item.status == 2">{{$t('agent57')}}</text>
											<text v-if="item.status == 3 || item.status == 4">{{$t('agent58')}}</text>
										</view>
										<view class="record-header-item w_25 u-text-center">{{item.money}}
										</view>
										<view class="record-header-item w_25 u-text-right">
											{{item.create_time}}
										</view>
									</view>
								</template>
								<template v-if="userTeamRecord.length == 0">
									<listEmpty :isDefault="true" :listHighly='300'>
									</listEmpty>
								</template>
							</view>
						</u-col>
					</u-row>

				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content" :data-theme="themeMode">
				<view class="container" :class="sideshow?'is-mask':''">
					<uniNavHeader :title="this.$t('menu8')" @clickLeft="menuClick" ref="header" isback>
					</uniNavHeader>
					<!-- main -->
					<view class="bs-wrapper">
						<view class="u-p-r-30 u-p-l-30 u-p-b-30 u-flex u-row-right">
							<!-- <view class="site-tit m-font-18 m-font-b">{{$t('menu8')}}</view> -->
							<view @click="openN" class="text-yellow m-font-16">{{$t('代理协议')}}</view>
						</view>
						<template v-if="wsCenterCar == 1">
							<view class="gooLight">
								<view class="gooLight-true">
									<view class="inv-top u-flex m-font-20 m-font-b u-m-b-10">
										<text class="inv-tt">{{$t('Hello!')}}</text>
										<text class="inv-tt">{{$t('Team Leader')}}</text>
									</view>
									<view class="inv-body u-m-b-60">
										<view class="top-text u-flex m-font-14"
											@click="$go('/pages/wsCenter/distributionRecord')">
											<view class="top-label u-c-g">{{$t('营收总览')}}</view>
										</view>
										<!-- <view class="inv-data u-flex u-m-b-40">
											<view class="col" @click="$go('/pages/wsCenter/distributionRecord')">
												<view class="inv-card">
													<view class="d-value ">{{historyProfitCount}}</view>
													<view class="d-label">{{$t('agent60')}}</view>
												</view>
											</view>
											<view class="col" @click="$go('/pages/wsCenter/distributionRecord')">
												<view class="inv-card">
													<view class="d-value ">{{profitCount}}</view>
													<view class="d-label">{{$t('昨日收益')}}</view>
												</view>
											</view>
										</view> -->
										<view class="inv-data u-flex u-m-b-60">
											<view class="col" @click="$go('/pages/wsCenter/distributionRecord')">
												<view class="inv-card">
													<view class="d-value ">{{userRebate1?formatCurrency(userRebate1)+' ₽':'0 ₽'}}
													</view>
													<view class="d-label">{{$t('agent60')}}</view>
												</view>
											</view>
											<view class="col" @click="$go('/pages/wsCenter/distributionRecord')">
												<view class="inv-card">
													<view class="d-value ">{{userRebate2?formatCurrency(userRebate2)+' ₽':'0 ₽'}}
													</view>
													<view class="d-label">{{$t('昨日收益')}}</view>
												</view>
											</view>
										</view>
										<view class="ws-cells u-m-b-30">
											<view class="time-bar">
												<view class="m-font-16" @click="dataShow = true">{{$t(showSreachData)}}
												</view>
												<view class="iconfont icon-calendar u-m-l-10 u-c-g"
													@click="dataShow = true">
												</view>
												<view class="cleaTime m-line-1" v-if="start_time" @click="clearTime">
													{{$t('清除')}}
												</view>
											</view>
										</view>
										<view class="wsCenter-card card-team-v">
											<view class="card-v">
												<view class="card-v-icon">
													<image src="../../static/images/discount-coupon.png" mode="">
													</image>
												</view>
												<view class="card-v-h line-2 m-font-16">{{$t('agent9')}}</view>
												<view class="card-v-bd m-font-16">
													{{team.agent_balance?formatCurrency(team.agent_balance)+' ₽':'0 ₽'}}
												</view>
											</view>
											<view class="card-v">
												<view class="card-v-icon">
													<image src="../../static/images/up-user.png" mode=""></image>
												</view>
												<view class="card-v-h line-2 m-font-16">{{$t('团队新增')}}</view>
												<view class="card-v-bd m-font-16">
													{{newTeamUser.user_count?newTeamUser.user_count:0}}
												</view>
											</view>
											<view class="card-v">
												<view class="card-v-icon">
													<image src="../../static/images/gift-rating-bow.png" mode="">
													</image>
												</view>
												<view class="card-v-h line-2 m-font-16">{{$t('agent38')}}</view>
												<view class="card-v-bd m-font-16">
													{{team.tg_balance?formatCurrency(team.tg_balance)+' ₽':'0 ₽'}}
												</view>
											</view>
										</view>
									</view>

									<!-- 我的团队 -->
									<view class="ws-cells u-m-b-60" v-if="newTeamUserSta">
										<view class="u-flex u-m-b-20">
											<view class="tt u-strong m-font-b m-font-18">{{$t('agent37')}}</view>
											<view class="u-flex blue-color u-m-auto m-font-16"
												@click="$go(`/pages/wsCenter/team`)">
												<text>{{$t("查看所有")}}</text>
												<text class="iconfont icon-right"></text>
											</view>
										</view>
										<view class="wsCenter-card team-card u-flex m-rela">
											<view class="u-flex charts-mobile-class">
												<qiun-data-charts type="ring" :opts="opts" :chartData="chartData" />
											</view>
											<view class="flex_bd">
												<view class="t-data-row">
													<view class="bar-num">
														{{(numberLimit(newTeamUser.user_count1)?numberLimit(newTeamUser.user_count1):0)}}
													</view>
													<view class="bar-item">
														{{ $t('LV.1')}}
													</view>
												</view>
												<view class="t-data-row">
													<view class="bar-num">
														{{(numberLimit(newTeamUser.user_count2)?numberLimit(newTeamUser.user_count2):0)}}
													</view>
													<view class="bar-item">
														{{ $t('LV.2')}}
													</view>
												</view>
												<view class="t-data-row">
													<view class="bar-num">
														{{(numberLimit(newTeamUser.user_count3)?numberLimit(newTeamUser.user_count3):0)}}
													</view>
													<view class="bar-item">
														{{ $t('LV.3')}}
													</view>
												</view>
											</view>
										</view>
									</view>
									<!-- 我的返佣 -->
									<view class="ws-cells u-m-b-20">
										<view class="u-flex u-m-b-20">
											<view class="tt m-font-b m-font-18 u-strong">{{$t('我的返佣')}}</view>
											<!-- <view class="blue-color u-m-auto"
												@click="$go(`/pages/wsCenter/retrunCommission`)">
												<text>{{$t("查看所有")}}</text>
												<text class="iconfont icon-right"></text>
											</view> -->
										</view>
										<view class="wsCenter-card">
											<template v-if="userTeamRecord.length > 0">
												<view
													class="record-header w_100 u-flex u-row-between u-p-30 u-c-g m-font-12">
													<view class="record-header-item w_25">{{$t('agent62')}}</view>
													<view class="record-header-item w_25 u-text-center">{{$t('user34')}}
													</view>
													<view class="record-header-item w_25 u-text-center">{{$t('user33')}}
													</view>
													<view class="record-header-item w_25 u-text-right">{{$t('时间')}}
													</view>
												</view>
												<view class="record-body w_100 u-flex u-row-between u-p-30 m-font-12"
													v-for="(item,index) in userTeamRecord"
													:key="`userTeamRecord${index}`">
													<view class="record-header-item w_25">{{item.username}}</view>
													<view
														class="record-header-item w_25 u-text-center record-header-item-nomaoril">
														<text v-if="item.status == 1">{{$t('agent56')}}</text>
														<text v-if="item.status == 2">{{$t('agent57')}}</text>
														<text
															v-if="item.status == 3 || item.status == 4">{{$t('agent58')}}</text>
													</view>
													<view class="record-header-item w_25 u-text-center">{{formatCurrency(item.money)}}
													</view>
													<view class="record-header-item w_25 u-text-right">
														{{item.create_time}}
													</view>
												</view>
											</template>
											<template v-if="userTeamRecord.length == 0">
												<listEmpty :isDefault="true" :listHighly='300'>
												</listEmpty>
											</template>
										</view>
									</view>
									<view style="height: 135px;"></view>
									<view class="inv-foot">
										<uni-row :gutter="20">
											<uni-col :span="24">
												<view class="inv-copy-cell u-m-b-20">
													<view class="inv-label">{{$t('agent12')}}</view>
													<view class="flex_bd">
														<view class="m-line-1">{{teampromotion.rec_url}}</view>
													</view>
													<image src="../../static/images/file_copy.png" class="copy-icon"
														@click="copy(teampromotion.rec_url,'iscopya')"></image>
												</view>
											</uni-col>
											<uni-col :span="24">
												<view class="inv-copy-cell">
													<view class="inv-label">{{$t('agent13')}}</view>
													<view class="flex_bd">
														<view class="m-line-1">{{teampromotion.rec_code}}</view>
													</view>
													<image src="../../static/images/file_copy.png" class="copy-icon"
														@click="copy(teampromotion.rec_code,'iscopya')"></image>
												</view>
											</uni-col>
										</uni-row>
									</view>
								</view>
							</view>
						</template>
						<template v-if="wsCenterCar == 0">
							<view class="gooLight u-p-l-20 u-p-r-20">
								<view class="ws-applay">
									<view class="ws-banner">
										<image :src="$t('wsCenterTopImg')" mode="widthFix"></image>
									</view>
									<view class="ws-article">
										<view class="hd-cont">
											<view class="t1 u-strong m-c-w">{{$t('agent68')}}</view>
										</view>
										<view class="ws-content">
											<view class="ws-level-cell" :class="isIR?'m-text-right':''">
												<view class="tt">
													1: {{$t('agent9')}}
												</view>
												<view class="info">{{$t('agent70')}}</view>
											</view>
											<view class="ws-level-cell" :class="isIR?'m-text-right':''">
												<view class="tt">
													2: {{$t('agent38')}}
												</view>
												<view class="info">{{$t('agent71')}}</view>
											</view>
											<view class="ws-level-cell" :class="isIR?'m-text-right':''">
												<view class="tt">
													3: {{$t('agent73')}}
												</view>
												<view class="info">{{$t('agent72')}}</view>
											</view>
										</view>
										<view class="bs-ws-button u-flex u-row-center">
											<button type="default" @click="applyAgent()" v-if="isagent==0"
												class="btn btn-block btn--submit m-line-1">{{$t('agent77')}}</button>
											<button type="default" v-if="isagent==2"
												class="btn btn-block btn--gray m-line-1">{{$t('agent78')}} </button>
										</view>
									</view>
								</view>
							</view>
						</template>
					</view>
				</view>
			</view>
		</template>
		<!-- <uni-popup ref="angAPopup" type="bottom">
			<view class="bs-popup pc_pop">
				<view class="bs-popup-hd">
					<view class="tt" :class="isIR?'m-text-right':''">
						{{$t('代理协议')}}
					</view>
					<view class="iconfont icon-close " @click="closeN()"></view>
				</view>
				<view class="bs-popup-body">
					<scroll-view scroll-y="true" style="height: 60vh;">
						<view class="art-body text-gray" style="overflow: auto;" :class="isIR?'m-text-right':''"
							v-html="web_rule_common_3"></view>
					</scroll-view>
				</view>
			</view>
		</uni-popup> -->
		<u-popup v-model="angAPopup" mode="bottom" :mask-custom-style="uPopMaskCustomStyle" borderRadius="32"
			z-index="10001">
			<view class="bs-popup pc_pop">
				<view class="bs-popup-hd">
					<view class="tt m-c-w">{{$t('代理协议')}}</view>
					<image src="@/static/images/index/close.png"
						style="width: 32px;height: 32px;position: absolute;right: 15px;" @click="closeN">
					</image>
				</view>
				<view class="bs-popup-body">
					<scroll-view class="rule-body-class" :scroll-y="true" :show-scrollbar="true"
						:scroll-with-animation="true">
						<view class="art-body" v-html="web_rule_common_3"></view>
					</scroll-view>
					<view class="rule-body-btn" @click="closeN">{{$t('确定')}}</view>
				</view>
			</view>
		</u-popup>
		<!-- 营收3 -->
		<uni-popup ref="wsCenterPop" type="bottom" mask-background-color="rgba(0, 0, 0, 0.8)" :is-mask-click="false">
			<view class="bs-popup-wscenter"
				:class="itemKeysImg < 4 ? 'wsPopImg1' : itemKeysImg < 6 ? 'wsPopImg2' : 'wsPopImg3'">
				<scroll-view scroll-x="true">
					<view class="u-flex u-m-t-20 u-m-b-20 u-col-bottom">
						<view v-for="(item,index) in wsDateList" :key="index" class="waItem"
							:class="[index>0?'u-m-l-30':'',item.is_curr == 1 ? 'activeWaItem':'']"
							@click="activeChange(item.keys,item,index)">
							<view class="topText" :class="[item.day < activsItem.day ?'u-c-9':'']">
								{{item.day}}
							</view>
							<view class="u-m-b-10 " :class="[item.day < activsItem.day ?'m-c-w':'']">
								{{$t(item.weeks)}}
							</view>
							<template v-if="item.day < activsItem.day">
								<u-image src="/static/images/skin/default/waPop4.png" mode="widthFix" width="20px"
									height="15px"></u-image>
							</template>
							<template v-if="item.is_curr == 1">
								<u-image src="/static/images/skin/default/waPop5.png" mode="widthFix" width="15px"
									height="15px"></u-image>
							</template>
							<template v-if="item.is_curr == 0">
								<view class="waitem2"></view>
							</template>
						</view>
					</view>
				</scroll-view>
				<scroll-view scroll-y="true" style="height: 80px;" class="skin-color m-font-16">
					<text>{{$t('您')}}</text>
					<text class="u-m-l-6">{{activsItem.date}}</text>
					<text class="u-m-l-6">{{$t('已经赚取')}}</text>
					<text class="u-m-l-6">{{numberLimit(activsItem.money)}}</text>
					<text class="u-m-l-6">{{$t('wsIndexInfo')}}</text>
				</scroll-view>
				<view class="bs-foot-button flex-center justify-center">
					<button type="default" @click="wsCenterPopClose()" class="btn btn--wsCenter">{{$t('我已知晓')}}</button>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="noticeInfoPopup" type="bottom">
			<view class="bs-popup u-m-20 pc_pop">
				<view class="iconfont icon-close u-abso" style="top: 20px;right: 20px;" @click="closenoticeInfo()">
				</view>
				<view class="bs-popup-hd font-30">{{$t("公告")}}</view>
				<view class="contentPopup" v-for="(v,i) in noticeInfo" :key="`${i}`+'list'">
					<view class="text_time u-p-26" v-if="v.is_show_time == 1">{{$t(v.add_time)}}</view>
					<view class="text_title u-p-r-26 u-p-l-26">{{$t(v.title)}}</view>
					<scroll-view scroll-y="true" style="max-height: 250px;" class="u-p-t-20 u-p-r-26 u-p-l-26 u-p-b-40">
						<text class="text_content u-p-b-50">{{$t(v.content)}}</text>
					</scroll-view>
				</view>
			</view>
		</uni-popup>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
		</u-top-tips>
		<!-- <u-calendar v-model="dataShow" color="#888" activeBgColor="var(--calendar-active-bg)"
			rangeColor="var(--calendar-active-bg)" rangeBgColor="var(--rangeBgColor-bg)" mode="range"
			@change="dataConfirm" :modeString="mobile_common?'bottom':'center'"></u-calendar> -->


		<u-picker v-model="dataShow" mode="time" :safe-area-inset-bottom="true" :title="$t('选择日期')" cancel-color="#fff"
			confirm-color="#fff" @confirm="dataConfirm" :isShowDay="false">
		</u-picker>

	</view>

</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	import pcSideTrade from "@/components/pc-side-trade/trade.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			pcBg,
			listEmpty,
			pcNavHeader,
			pcSideBar,
			pcSideTrade
		},
		data() {
			return {
				sideshow: false,
				agent_rule: '',
				// tab
				current: 0,
				team: {},
				noticeInfo: '',
				wsCenterCar: null,
				isagent: null,
				teamUser: {},
				newTeamUser: {},
				newTeamUserSta: false,
				teamStatreg: null,
				teamStatreCharge: null,
				withdrawCount: null,
				orderCount: null,
				profitCount: null,
				ordernumCount: null,
				historyProfitCount: null,
				dataShow: false,
				sreachData: this.$t('选择日期'),
				showSreachData: this.$t('选择日期'),
				start_time: '',
				end_time: '',
				// 图表
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				chartData: {
					series: [{
						data: [{
							"name": "LV.1",
							"value": 0,
							"labelShow": false
						}, {
							"name": "LV.2",
							"value": 0,
							"labelShow": false
						}, {
							"name": "LV.3",
							"value": 0,
							"labelShow": false
						}]
					}]
				},
				opts: {
					timing: "easeOut",
					duration: 1000,
					rotate: false,
					rotateLock: false,
					color: ["#D7E2E7", "#EC8D00", "#B64E14"],
					padding: [5, 5, 5, 5],
					fontSize: 13,
					fontColor: "#666666",
					dataLabel: true,
					dataPointShape: true,
					dataPointShapeType: "solid",
					touchMoveLimit: 60,
					enableScroll: false,
					enableMarkLine: false,
					legend: {
						show: false,
						position: "right",
						lineHeight: 0,
						float: "center",
						padding: 5,
						margin: 5,
						backgroundColor: "rgba(0,0,0,0)",
						borderColor: "rgba(0,0,0,0)",
						borderWidth: 0,
						fontSize: 0,
						fontColor: "#666666",
						hiddenColor: "#CECECE",
						itemGap: 10
					},
					title: {
						name: "",
						fontSize: 12,
						color: "#fff",
						offsetX: 0,
						offsetY: 0
					},
					subtitle: {
						name: "70",
						fontSize: 22,
						color: "#fff",
						offsetX: 0,
						offsetY: 0
					},
					extra: {
						ring: {
							ringWidth: 30,
							activeOpacity: 0.5,
							activeRadius: 10,
							offsetAngle: 0,
							labelWidth: 15,
							border: true,
							borderWidth: 2,
							borderColor: "#413D71",
							centerColor: "#413D71",
							customRadius: 0,
							linearType: "none"
						},
						tooltip: {
							showBox: true,
							showArrow: true,
							showCategory: false,
							borderWidth: 0,
							borderRadius: 0,
							borderColor: "#000000",
							borderOpacity: 0.7,
							bgColor: "#000000",
							bgOpacity: 0.7,
							gridType: "solid",
							dashLength: 4,
							gridColor: "#CCCCCC",
							boxPadding: 3,
							fontSize: 13,
							lineHeight: 20,
							fontColor: "#FFFFFF",
							legendShow: true,
							legendShape: "auto",
							splitLine: true,
							horizentalLine: false,
							xAxisLabel: false,
							yAxisLabel: false,
							labelBgColor: "#FFFFFF",
							labelBgOpacity: 0.7,
							labelFontColor: "#666666"
						}
					},
				},
				userTeamRecord: [],
				wsDateList: [],
				activsKeys: null,
				activsItem: {},
				itemKeysImg: 1,
				teampromotion: {},
				userRebate1: 0,
				userRebate2: 0,
				angAPopup: false
			}
		},
		async onLoad() {
			this.getRule_common(3);
			this.getteampromotion();
			uni.setNavigationBarTitle({
				title: this.$t('menu8')
			});
			this.getTeam();
		},
		methods: {
			// 推广链接
			async getteampromotion() {
				let ret = await this.$u.api.teampromotion_p();
				if (ret) {
					this.teampromotion = ret.data;
				}
			},
			activeChange(keys, item, index) {
				this.activsKeys = null;
				// this.activsItem = {};
				this.activsKeys = keys;
				// this.activsItem = item;
				if (this.wsDateList[index].isDay == 1) {
					this.wsDateList[index].isDay = 1;
				} else {
					this.wsDateList[index].isDay = 2;
				}
			},
			dataConfirm(e) {
				this.start_time = '';
				this.end_time = '';
				this.sreachData = e.year + '/' + e.month + '-' + e.year + '/' + e.month;
				this.start_time = e.year + '/' + e.month + '-' + e.year + '/' + e.month;
				this.showSreachData = e.year + '/' + e.month;
				this.end_time = e.endDate;
				this.newTeamUser = {};
				this.getNewTeamuser(this.sreachData);
			},
			clearTime() {
				this.start_time = '';
				this.end_time = '';
				this.sreachData = this.$t('选择日期');
				this.showSreachData = this.$t('选择日期');
				this.newTeamUser = {};
				this.getNewTeamuser();
			},
			// 获取我的返佣
			async getTeamrecord() {
				let res = await this.$u.api.teamrecord_p({
					page: 1,
					limit: 6,
					is_stat: 0
				});
				if (res && res.code == 1) {
					this.userTeamRecord = res.data.data;
				}
			},
			// 获取我的返佣 - 总统计
			async getUserRebate1() {
				let res = await this.$u.api.teamrecord_p({
					is_stat: 1,
					isday: 0
				});
				if (res && res.code == 1) {
					this.userRebate1 = res.data.sum;
				}
			},
			// 获取我的返佣 - 昨日统计
			async getUserRebate2() {
				let res = await this.$u.api.teamrecord_p({
					is_stat: 1,
					isday: 2
				});
				if (res && res.code == 1) {
					this.userRebate2 = res.data.sum;
				}
			},
			isPopChange() {
				var items = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
				this.itemKeysImg = items[Math.floor(Math.random() * items.length)];
				let showNotice = this.$helper.get('shouCooperation');
				if (showNotice) {
					this.$refs.wsCenterPop.open();
				}
			},
			async getNoticeList() {
				let res = await this.$u.api.noticelist_p({
					show_loca: 2,
					limit: 1
				});
				if (res.data.length > 0) {
					this.noticeInfo = res.data;
					let showNotice = this.$helper.get('shouCooperation');
					if (showNotice) {
						this.$refs.noticeInfoPopup.open('center');
						this.$helper.set('shouCooperation', false);
					}
				}
			},
			closenoticeInfo() {
				this.$refs.noticeInfoPopup.close();
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async applyAgent() {
				let ret = await this.$u.api.teamapply_p();
				if (ret) {
					if (ret.code == 1) {
						this.getTeam();
					} else {
						this.$refs.uTips.show({
							title: this.$t(ret.msg)
						});
					}
				}
			},
			async getTeam() {
				uni.showLoading({
					mask: true,
					title: this.$t("loading")
				});
				let ret = await this.$u.api.team_p();
				if (ret) {
					uni.hideLoading();
					this.team = ret.data;
					if (ret.code == 103 || ret.code == 105) {
						this.isagent = 0;
						this.wsCenterCar = 0;
					} else if (ret.code == 104) {
						this.isagent = 2
						this.wsCenterCar = 0;
					} else {
						this.team = ret.data;
						if (ret.code == 1) {
							this.wsCenterCar = 1;
							this.getNewTeamuser(); // 团队新增人数
							// this.getNoticeList(); // 公告
							this.getTeamStatProfit(); // 总盈利
							this.getHistoryTeamStatProfit(); // 历史收益统计
							this.getTeamrecord(); //用户返佣



							this.getUserRebate1(); //用户返佣 - 总统及
							this.getUserRebate2(); //用户返佣 - 昨日统计

							// this.isPopChange();
							// if (this.$helper.get('shouCooperation')) {
							// 	this.getTeamProfit();
							// }
							// this.getTeamuser(); // 团队人数统计
							this.getTeamStatreg(); // 新注册
							this.getTeamStatreCharge(); // 新充值
							this.getTeamStatcash(); // 总提现
							this.getTeamStatOrder(); // 总注单
							// this.getTeamStatOrderNum(); // 投注人数统计
						}
					}
				}
			},
			wsCenterPopClose() {
				this.activsKeys = null;
				for (let index in this.wsDateList) {
					if (this.wsDateList[index].isDay == 1) {
						this.wsDateList[index].isDay = 1;
					} else {
						this.wsDateList[index].isDay = 0;
					}
				}
				this.$refs.wsCenterPop.close();
				this.$helper.set('shouCooperation', false);
			},
			// 规则
			openN() {
				this.angAPopup = true;
			},
			closeN() {
				this.angAPopup = false;
			},
			// 今日团队新增人数
			async getNewTeamuser(date) {
				let res = await this.$u.api.teamuser_p({
					level: 4,
					isday: 0,
					date: date ? date : ''
				});
				if (res && res.code == 1) {
					this.newTeamUserSta = true;
					this.newTeamUser = res.data;
					this.chartData.series[0].data[0].value = res.data.user_count1;
					this.chartData.series[0].data[1].value = res.data.user_count2;
					this.chartData.series[0].data[2].value = res.data.user_count3;
					this.opts.subtitle.name = res.data.user_count;
				}
			},
			// 团队人数
			async getTeamuser() {
				let res = await this.$u.api.teamuser_p({
					level: 4,
					isday: 0
				});
				if (res) {
					this.teamUser = res.data;
				}
			},
			// 新注册统计
			async getTeamStatreg() {
				let res = await this.$u.api.teamstatreg_p({
					isday: 1
				});
				if (res) {
					this.teamStatreg = res.data.reg_count;
				}
			},
			// 新充值统计
			async getTeamStatreCharge() {
				let res = await this.$u.api.teamstatrecharge_p({
					isday: 1
				});
				if (res) {
					this.teamStatreCharge = res.data.recharge_count;
				}
			},
			// 总提现统计
			async getTeamStatcash() {
				let res = await this.$u.api.teamstatcash_p({
					isday: 1
				});
				if (res) {
					this.withdrawCount = res.data.withdraw_count;
				}
			},
			// 总注单统计
			async getTeamStatOrder() {
				let res = await this.$u.api.teamstatorder_p({
					isday: 1
				});
				if (res) {
					this.orderCount = res.data.order_count;
				}
			},
			// 昨日总盈利统计
			async getTeamStatProfit() {
				let res = await this.$u.api.teamstatprofit_p({
					isday: 2
				});
				if (res) {
					this.profitCount = res.data.profit_count;
				}
			},
			// 历史总盈利统计
			async getHistoryTeamStatProfit() {
				let res = await this.$u.api.teamstatprofit_p({
					isday: 0
				});
				if (res) {
					this.historyProfitCount = res.data.profit_count;
				}
			},
			// 投注人数统计
			async getTeamStatOrderNum() {
				let res = await this.$u.api.team_ordernum_p({
					isday: 0
				});
				if (res) {
					this.ordernumCount = res.data.order_count;
				}
			},
			// 营收推广数据
			async getTeamProfit() {
				let res = await this.$u.api.team_profit_p();
				if (res && res.code == 1) {
					var obj = res.data;
					for (let i in obj) {
						if (obj[i].is_curr == 1) {
							this.activsItem = obj[i];
						}
						if (obj[i].day < this.activsItem.day) {
							obj[i].other = 1;
						} else {
							obj[i].other = 0;
						}
						this.wsDateList.push(obj[i]);
					}
					this.wsDateList.sort(this.compare('day'));
				}
			},
		}
	}
</script>

<style lang="scss">
	.time-bar {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
	}

	.cleaTime {
		align-items: center;
		height: 30px;
		line-height: 30px;
		max-width: 32%;
		margin-left: 20px;
		padding: 0 10px;
	}


	.wsCenClass {
		padding: 7px;
		font-weight: bold;
		margin-top: 15px;
		border-radius: 50%;
		background: var(--close-bg);
		color: var(--close-color);
	}

	.waItem {
		min-width: 60px;
		min-height: 75px;
		max-height: 75px;
		padding: 5px 5px;
		text-align: center;
		border-radius: var(--card-radius);
		background-color: var(--ws-day-bg);
		color: var(--ws-day-color);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.activeWaItem {
		min-width: 65px;
		min-height: 80px;
		max-height: 80px;
		background: var(--ws-day-active-bg);
		border: 2px solid #ff9935;
	}

	.waitem2 {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background-color: var(--ws-dot-bg);
		color: #ffffff;
	}

	.bs-popup-body ::v-deep table {
		border: 1px solid #999;
		padding: 5px;
		margin-bottom: 10px;
		border-radius: var(--card-radius);
		width: 100%;

		td {
			border: 1px solid #999;
			border-radius: var(--card-radius);
			text-align: center;
			padding: 6px;
			margin: 5px;
			animation: slowShining 3s infinite alternate;

			p {
				margin: 0;
			}
		}

		th {
			border: 1px solid #999;
			border-radius: var(--card-radius);
			text-align: center;
			padding: 6px;
			margin: 5px;
			animation: slowShiningTwo 3s infinite alternate;

			p {
				margin: 0;
			}
		}

		@keyframes slowShining {
			0% {
				box-shadow: 0 0 2px #999,
					0 0 4px var(--ui-color-dark),
					inset 0 0 6px var(--ui-color-dark);
			}

			100% {
				text-shadow: none;
				box-shadow: 0 0 10px var(--ui-color-dark),
					0 0 4px #999,
					inset 0 0 1px var(--ui-color-dark);
			}
		}

		@keyframes slowShiningTwo {
			0% {
				box-shadow: 0 0 2px #999,
					0 0 4px var(--ui-color-light),
					inset 0 0 6px var(--ui-color-light);
			}

			100% {
				text-shadow: none;
				box-shadow: 0 0 10px var(--ui-color-light),
					0 0 4px #999,
					inset 0 0 1px var(--ui-color-light);
			}
		}
	}

	.riqiClass .icon-calendar:before {
		content: "\edb8";
		color: #616b89;
	}

	.site-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: var(--mar-bg);
		// margin: -10px -16px 0 !important;
		padding: 0 15px 15px;
	}

	.bs-wrapper {
		padding: 70px 0 0 0 !important;
	}

	.gooLight {
		background: var(--mar-bg);
	}


	.gooLight-true {
		background-color: #312B4F;
		min-height: calc(100vh - 70px);
		padding: 10px;
		border-radius: 16px 16px 0 0;
	}


	@media (min-width: 975px) {
		.riqiClass {
			background-color: #09102A;
			border: 1px solid #101731 !important;
			border-radius: 6px !important;

			.icon-down {
				color: #204BBB;
			}
		}

		.cleaTime {
			align-items: center;
			height: 50px;
			line-height: 50px;
			max-width: 32%;
			margin-left: 10px;
			background-color: #09102A;
			border: 1px solid #101731 !important;
			border-radius: 6px !important;
			padding: 0 10px;
		}
	}

	.charts-mobile-class {
		width: 220px;
		position: absolute;
		left: -5%;
	}

	.wsCenter-card {
		color: #fff;
		border-radius: 16px;
		background: rgba(65, 61, 113, 1);
	}

	.record-header {
		border-bottom: 1px solid rgba(77, 72, 134, 1);
	}

	.record-body {
		border-bottom: 1px solid rgba(77, 72, 134, 1);
	}

	.record-body:last-child {
		border-bottom: none;
	}

	.bs-popup-hd {
		background-color: rgba(30, 23, 57, 1) !important;
	}

	.bs-popup-body {
		background-color: #312B4F !important;
	}

	.rule-body-class {
		padding: 15px;
		overflow: hidden;
		max-height: 60vh;
		min-height: 40vh;
		border-radius: 16px;
		background: rgba(30, 23, 57, 1);
	}

	.rule-body-btn {
		height: 54px;
		font-size: 18px;
		margin-top: 20px;
		line-height: 54px;
		padding: 0 24px;
		text-align: center;
		border-radius: 16px;
		background: rgba(233, 174, 58, 1);
	}

	// pc
	.bs-panel {
		background-color: #312B4F;
	}

	.bs-panel-top {
		line-height: 1;
		height: 28px;
	}

	@media (min-width:750px) {
		.bar-num {
			font-size: 24px;
		}
	}
</style>
