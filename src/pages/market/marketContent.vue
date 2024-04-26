<template>
	<view :class="isOpen?'pc-open':'pc-close'">
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main u-flex u-col-top pc-has-right">
				<pcSideBar :pageIndex="0" @menu-event="parentMenu"></pcSideBar>
				<view class="pc-wrapper">
					<view class="top-back u-m-b-32" v-if="matchbdlist.length> 0">
						<button class="btn btn--back" @click="common_back()">
							<text class="iconfont icon-left"></text>
							<text>{{$t('返回')}}</text>
						</button>
					</view>
					<view class="market-top-info u-m-b-30" v-if="matchbdlist.length> 0">
						<view class="vs-game-card">
							<view class="col">
								<template v-if="matchplay.zd_logo">
									<u-image width="80px" height="80px" border-radius="50%" :src="matchplay.zd_logo">
										<u-loading slot="loading"></u-loading>
									</u-image>
								</template>
								<template v-else>
									<u-image width="80px" height="80px" border-radius="50%" :src="marketHeaderZD">
										<u-loading slot="loading"></u-loading>
									</u-image>
								</template>
								<view class="game-card-title  m-font-b">{{$t(matchplay.zd_name)}}</view>
							</view>
							<view class="vs-middle">
								<view class="m-font-b text-light u-m-b-10">VS</view>
								<view class="u-font-36">{{matchplay.update_time}}</view>
							</view>
							<view class="col">
								<template v-if="matchplay.kd_logo">
									<u-image width="80px" height="80px" border-radius="50%" :src="matchplay.kd_logo">
										<u-loading slot="loading"></u-loading>
									</u-image>
								</template>
								<template v-else>
									<u-image width="80px" height="80px" border-radius="50%" :src="marketHeaderKD">
										<u-loading slot="loading"></u-loading>
									</u-image>
								</template>
								<view class="game-card-title m-font-b">{{$t(matchplay.kd_name)}}</view>
							</view>
						</view>
						<view class="market-top-button">

						</view>
					</view>
					<view class="pc-main-cell pc-overflow-y">
						<view class="mark-table" v-if="matchbdlist.length> 0">
							<view class="mark-table-head">
								<view class="mark-row">
									<view class="flex_bd">
										<view class="td">{{$t("game21")}}</view>
										<view class="td">{{$t("获利")}}</view>
										<view class="td">{{$t("game20")}}</view>
									</view>
									<view class="mk-right">
									</view>
								</view>
							</view>
							<view class="mark-table-body">
								<template v-if="sc_vip">
									<view class="mark-row" v-for="(item,index) in matchbdlist" :key="`list${index}`">
										<view class="flex_bd dark-VIP-item">
											<view class="vip-market-left-icon"></view>
											<view class="td" v-if="item.zd != 'other'"
												style="border-radius: 16px 0 0 16px;">
												<view class="td-score">
													<text class="span">{{item.zd}}</text>
													<text class="vs">:</text>
													<text class="span">{{item.kd}}</text>
												</view>
											</view>
											<view class="td" v-if="item.zd == 'other'"
												style="border-radius: 16px 0 0 16px;"><text>{{$t(item.zd)}}</text>
											</view>
											<view class="td">{{item.fbd_pl}}%</view>
											<view class="td">{{item.can_business}}</view>
										</view>
										<view class="mk-right">
											<view class="mark-bet mark-vip-bet" @click="openList(item)">{{$t("game28")}}
											</view>
										</view>
									</view>
								</template>
								<template v-if="!sc_vip">
									<view class="mark-row" v-for="(item,index) in matchbdlist" :key="`list${index}`">
										<view class="flex_bd">
											<view class="td" v-if="item.zd != 'other'">
												<!--  @click="openX" -->
												<view class="td-score">
													<text class="span">{{item.zd}}</text>
													<text class="vs">:</text>
													<text class="span">{{item.kd}}</text>
												</view>
											</view>
											<!-- @click="openX" -->
											<view class="td" v-if="item.zd == 'other'"><text>{{$t(item.zd)}}</text>
											</view>
											<view class="td">{{item.fbd_pl}}%</view>
											<view class="td">{{item.can_business}}</view>
										</view>
										<view class="mk-right">
											<view class="mark-bet" @click="openList(item)">{{$t("game28")}}</view>
										</view>
									</view>
								</template>
							</view>
						</view>
					</view>
				</view>
				<view class="pc-right-bar">
					<pcSideTrade></pcSideTrade>
				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content" :data-theme="themeMode">
				<view class="container">
					<uniNavHeader isback :title="$t('menu1')" @clickLeft="menuClick" ref="header"></uniNavHeader>
					<template v-if="tutorialKey == 4">
						<view class="userTutorialMask"></view>
						<view class="finishClass u-flex" @click="skipTutorial">
							<view class="u-m-r-20">{{$t('跳过')}}</view>
							<image src="@/static/images/index/c_close.png" style="width: 20px;height: 20px;"></image>
						</view>
					</template>
					<view class="gooLight">
						<view class="vs-game-cell" v-if="matchplay.ls_name">
							<view class="u-p-40">
								<view class="vs-game-card u-col-top">
									<view class="col clickOver">
										<template v-if="matchplay.zd_logo">
											<u-image width="50px" height="50px" :src="matchplay.zd_logo"
												border-radius="100">
												<u-loading slot="loading"></u-loading>
											</u-image>
										</template>
										<template v-else>
											<u-image width="50px" height="50px" :src="marketHeaderZD"
												border-radius="100">
												<u-loading slot="loading"></u-loading>
											</u-image>
										</template>
										<view class="m-font-16 u-m-t-10">{{$t(matchplay.zd_name)}}</view>
									</view>
									<view class="vs-middle clickOver">
										<view class="lg-vs u-c-g m-font-b">VS</view>
										<view class="m-font-12">{{matchplay.sc_time}}</view>
									</view>
									<view class="col clickOver">
										<template v-if="matchplay.kd_logo">
											<u-image width="50px" height="50px" :src="matchplay.kd_logo"
												border-radius="100">
												<u-loading slot="loading"></u-loading>
											</u-image>
										</template>
										<template v-else>
											<u-image width="50px" height="50px" :src="marketHeaderKD"
												border-radius="100">
												<u-loading slot="loading"></u-loading>
											</u-image>
										</template>
										<view class="m-font-16 u-m-t-10">{{$t(matchplay.kd_name)}}</view>
									</view>
								</view>
							</view>
						</view>
						<template v-if="orderList.length > 0">
							<view class="u-m-30">
								<view class="u-flex u-row-center">
									<image src="@/static/images/index/emoji01.png" mode=""
										style="width: 20px;height: 20px;">
									</image>
									<view class="u-m-l-10 m-font-13">{{$t("即将进行")}}</view>
								</view>
								<view class="market-quick-card m-font-12">
									<view class="qk-row qk-td u-flex u-row-between" @click="fastopen(item)"
										v-for="(item,index) in orderList" :key="`orderList${index}`">
										<view class="qk-item u-text-center m-c-7">{{item.username}}</view>
										<view class="qk-item u-text-center m-c-f">{{item.zd_fs + ' : ' + item.kd_fs}}
										</view>
										<view class="qk-item m-c-7">{{item.tz_price1}}</view>
									</view>
								</view>
							</view>
						</template>
						<view class="m-rela">
							<view class="mark-table" v-if="matchbdlist.length> 0">

								<template v-if="tutorialKey == 4">
									<view class="tutorial-4 TutorialInfoClass_bf">
										<view>{{$t('选择一个比分进行投注')}}</view>
										<view class="u-text-right text-yellow u-m-t-10" @click="tutorialChange(6)">
											{{$t('下一步')}}
										</view>
									</view>
								</template>

								<view class="mark-table-head">
									<view class="mark-row">
										<view class="flex_bd m-font-12 u-c-g">
											<view class="td">{{$t("game21")}}</view>
											<view class="td">{{$t("获利")}}</view>
											<view class="td">{{$t("game20")}}</view>
											<view class="td"></view>
										</view>
									</view>
								</view>
								<view class="mark-table-body">
									<view class="mark-row u-p-b-12 u-m-t-12" v-for="(item,index) in matchbdlist"
										:key="`list${index}`">
										<view class="flex_bd">
											<!--  @click="openX" -->
											<view class="td" v-if="item.zd != 'other'">
												<view class="td-score m-font-18 m-font-b u-flex">
													<view class="span">{{item.zd}}</view>
													<view class="vs u-m-l-14 u-m-r-14">:</view>
													<view class="span">{{item.kd}}</view>
												</view>
											</view>
											<view class="td m-font-18 m-font-b" v-if="item.zd == 'other'">
												<text>{{$t(item.zd)}}</text>
											</view>
											<view class="td m-font-18">{{item.fbd_pl}}%</view>
											<view class="td u-c-g2 m-font-18">{{item.can_business}}</view>
											<view class="td mark-bet m-font-14" @click="openList(item)"
												:class="tutorialKey == 4?'userTutorialPosition_play':''">
												{{$t("game28")}}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
		</u-top-tips>
		<!-- 详情弹窗 -->
		<u-popup v-model="morePopup" mode="bottom" border-radius="35" :mask-custom-style="uPopMaskCustomStyle">
			<view class="bs-popup  ">
				<view class="bs-popup-hd">{{$t("user6")}}
					<view class="iconfont icon-close" @click="closeX()"></view>
				</view>
				<view class="bs-popup-bd">
					<view class="market-detail-page">
						<scroll-view scroll-y="true" style="height: 300px">
							<view class="j-trade-list">
								<view class="j-trade-cell flex-center" v-for="(item,index) in matchbdlist"
									:key="`list2${index}`">
									<view class="j-bifen" v-if="item.zd != 'other'">{{item.zd}}-{{item.kd}}</view>
									<view class="j-bifen" v-if="item.zd == 'other'">{{$t(item.zd)}}</view>
									<view class="diy-progress">
										<view class="u-flex">
											<u-line-progress active-color="#3a7fe6" :show-percent="false"
												:striped-active="true" inactive-color="var(--ui-color-light)"
												:percent="item.ratio">
											</u-line-progress>
											<view class="u-m-l-16">{{item.ratio}}%</view>
										</view>
									</view>
									<view class="j-trade-val">{{item.zhudan_amount}}</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 列表弹窗 -->
		<u-popup v-model="listPopup" :mode="mobile_common?'bottom':'center'" :width="mobile_common?'':'390px'"
			border-radius="32" :mask-custom-style="uPopMaskCustomStyle" @close="VIPPlayClass = false">
			<view class="bs-popup bs-dist-popup ">
				<!-- <view class="iconfont icon-close" @click="closeList()"></view> -->
				<!-- <view @click="goMatchplay(matchplay.sc_id)" class="matchplayClass">
					<text>{{$t('public7')}}</text>
					<text class="iconfont icon-right" style="font-size: 13px;font-weight: 600;"></text>
				</view> -->
				<view class="bs-popup-hd u-flex u-row-center">
					<view>{{$t("赛事详情")}}</view>
					<view class="iconfont icon-close" @click="closeList"></view>
				</view>
				<scroll-view scroll-y="true" style="max-height: 70vh;">
					<view class="bs-popup-body">
						<view class="game-popup-top u-m-b-30">
							<view class="vs-game-card">
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
									<view class="vs-score m-font-b u-flex">
										<view class="m-font-30">{{matchbd.zd}}</view>
										<view class="u-m-l-20 u-m-r-20 m-font-20">:</view>
										<view class="m-font-30">{{matchbd.kd}}</view>
									</view>
									<view class="vs-middle-color u-font-28">{{odds}}%</view>
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
								<uni-forms-item name="jprice" clearSize="32" class="u-m-b-30">
									<view class="u-m-b-16 u-m-t-20">
										<text>{{$t('game10')}}</text>
										<text style="color: #D12C2C;">*</text>
									</view>
									<uni-easyinput type="number" v-model="formData.jprice" ref="money"
										:placeholder="$t('public4')" @input="input" :styles="styles" />
								</uni-forms-item>
								<view class="u-flex u-m-b-30">
									<view>{{$t("game8")}}:</view>
									<view class="u-m-l-10">{{resultPrice}}</view>
								</view>
								<view class="u-flex u-row-between bet-balance">
									<view>{{$t('user1')}}</view>
									<view class="">{{formatCurrency(userInfo_common.balance)}} ₽</view>
								</view>
							</uni-forms>
						</view>

						<view class="popup-btns flex-center ">
							<view class="col"><button type="default" @click="submit(1)"
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
							:disabled-keyboard="false" :dot-fill="true" :focus="true" :breathe="true"></uMessageInput>
						<view class="u-m-t-20 u-c-9">{{$t('请输入赛事密码')}}</view>
						<view class="w_100 btn--submit u-text-center u-p-20 u-m-t-30" @click="marketVipClose">
							<view class="m-line-1 m-font-b">{{$t('取消')}}</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
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
		<uni-popup ref="orderError" type="bottom" :type="mobile_common?'bottom':'center'">
			<view class="uc-pop" :style="'width:' + (mobile_common ? '100%' : '390px')">
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
		<uni-popup ref="orderKuaiPayPopup" :type="mobile_common?'bottom':'center'">
			<view class="bs-popup orderPayPopup" :style="'width:' + (mobile_common ? '100%' : '390px')">
				<view class="u-p-20 u-row-right">
					<view class="iconfont icon-close" @click="orderKuaiPayClose"></view>
				</view>
				<view class="bs-popup-bd">
					<view class="res-tip">
						<image src="/static/images/success.png" mode=""></image>
						<view class="text">{{$t('user37')}}</view>
					</view>
					<view class="popup-btns ">
						<view class="col">
							<button type="default" @click="goTradeing"
								class="btn btn-sm btn--submit">{{$t("前往交易明细")}}</button>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 下单完成弹窗 -->
		<uni-popup ref="falsePopup" :type="mobile_common?'bottom':'center'">
			<view class="bs-popup orderPayPopup">
				<view class="u-p-20 u-row-right">
					<view class="iconfont icon-close" @click="falseclose"></view>
				</view>
				<view class="bs-popup-b u-m-30">
					<view class="res-tip">
						<image src="/static/images/false.png" mode=""></image>
						<view class="text">{{falsetext}}</view>
					</view>
					<view class="popup-btns ">
						<view class="col">
							<button type="default" @click="falseclose"
								class="btn btn-sm btn--other">{{$t("public5")}}</button>
						</view>
						<view class="col">
							<button type="default" @click="$go('/pages/ucenter/recharge')"
								class="btn btn-sm btn--submit">{{$t("去充值")}}</button>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!--设置金额  -->
		<uni-popup ref="pricePopup" :type="mobile_common?'bottom':'center'">
			<view class="bs-popup bs-dist-popup">
				<view class="bs-popup-hd">
					<view class="tt">{{$t("game7")}}</view>
					<view class="iconfont icon-close" @click="close"></view>
				</view>
				<view class="bs-popup-bd u-p-30">
					<view class="vs-form ">
						<uni-forms err-show-type="toast" ref="form1" :modelValue="formData" :rules="rules"
							:label-width="300" :border="false" labelPosition="top">
							<uni-forms-item name="firval" :label='$t("game3")' class="u-m-b-30">
								<uni-easyinput type="number" v-model="formData.firval" :placeholder='$t("public4")'
									:styles="styles" />
							</uni-forms-item>
							<uni-forms-item name="secval" :label='$t("game4")' class="u-m-b-30">
								<uni-easyinput type="number" v-model="formData.secval" :placeholder='$t("public4")'
									:styles="styles" />
							</uni-forms-item>
							<uni-forms-item name="thirdval" :label='$t("game5")'>
								<uni-easyinput type="number" v-model="formData.thirdval" :placeholder='$t("public4")'
									:styles="styles" />
							</uni-forms-item>
						</uni-forms>
					</view>
					<view class="popup-btns flex-center">
						<view class="col">
							<button type="default" @click="quicksubmit"
								class="btn btn--submit">{{$t("public6")}}</button>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!--快速投注  -->
		<u-popup v-model="fastPopup" mode="bottom" :mask-custom-style="uPopMaskCustomStyle" borderRadius="32">
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
	</view>
</template>
<script>
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import uMessageInput from '@/components/u-message-input/u-message-input.vue'
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	import pcSideTrade from "@/components/pc-side-trade/trade.vue"
	import {
		accAdd
	} from '@/common/tool.js'
	export default {
		components: {
			uniSideHeader,
			uniNavHeader,
			pcNavHeader,
			uMessageInput,
			pcSideBar,
			pcSideTrade
		},
		data() {
			return {
				background: {
					backgroundColor: 'var(--ui-color-normal)',
				},
				sideshow: false,
				matchplay: [],
				matchbdlist: [],
				matchbd: {},
				odds: 0,
				quickmoney: [],
				sc_id: 0,
				formData: {
					firval: '',
					secval: '',
					thirdval: '',
					jprice: ''
				},
				resultPrice: 0,
				rules: {
					firval: {
						rules: [{
							required: true,
							errorMessage: this.$t("public4"),
						}]
					},
					secval: {
						rules: [{
							required: true,
							errorMessage: this.$t("public4"),
						}]
					},
					thirdval: {
						rules: [{
							required: true,
							errorMessage: this.$t("public4"),
						}]
					},
					jprice: {
						rules: [{
							required: true,
							errorMessage: this.$t("请输入交易金额"),
						}]
					}
				},
				fundShowType: null, //1开启 0关闭
				listPopup: false,
				morePopup: false,
				styles: {
					color: '#ffffff',
					borderColor: '#1a1a22',
					borderRadius: "16px"
				},
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
				falsetext: "",
				orderList: [],
				timerOrderList: null,
				otherOrderList: {},
				marketProfit: false,
				sc_vip: false,
				convertCount: '',
				playMsg: '',
				is_pwd: 0,
				fastPopup: false
			}
		},
		computed: {
			tabs() {
				return [this.$t("game17")]
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('menu1')
			});
			this.fundShowType = this.$helper.get('rule').fundStatus;
			if (!this.formData.jprice) {
				this.convertCount = '';
			}
			this.tutorialKey = this.$helper.get('tutorialKey');
		},
		onLoad(options) {
			if (options.id) {
				this.sc_id = options.id;
				this.sc_vip = options.VIP;
				this.is_pwd = options.is_pwd;
				this.getplay();
				if (this.tutorialKey != 4) {
					this.startTimer();
				}
			} else {
				this.$go('back');
			}
		},
		onUnload() {
			this.stopTimer(); // 页面销毁时清除定时器
		},
		onReachBottom() {},
		methods: {
			tutorialChange(i) {
				this.$helper.set('tutorialKey', i);
				this.$go(
					`/pages/ucenter/vipClub`)
			},
			parentMenu() {
				this.menuToggle()
			},
			orderErrorChange() {
				this.$refs.orderError.open();
			},
			orderErrorClose() {
				this.$refs.orderError.close();
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			openX() {
				this.morePopup = true;
			},
			closeX() {
				this.morePopup = false;
			},
			open() {
				this.listPopup = false;
				this.$refs.pricePopup.open();
			},
			close() {
				this.$refs.pricePopup.close();
				if (this.isGoogle != 1) {
					this.listPopup = true;
				}
			},
			// 快速投注
			fastopen(item) {
				this.otherOrderList = {};
				this.otherOrderList = item;
				this.fastPopup = true;
			},
			fastclose() {
				this.fastPopup = false;
			},
			falseclose() {
				this.$refs.falsePopup.close();
			},
			funClassClick(e) {
				this.resultPrice = 0;
				this.formData.jprice = '';
				this.moneyType = e;
			},
			async getplay() {
				let ret = await this.$u.api.matchplay_p({
					sc_id: this.sc_id
				});
				if (ret) {
					this.matchplay = ret.data;
					this.matchbdlist = ret.data.bd;
				}
			},
			// 快速跟投
			startTimer() {
				this.timerOrderList = setInterval(async () => {
					let res = await this.$u.api.order_list_p({
						sc_id: this.sc_id,
						limit: 8
					});
					if (res && res.code == 1) {
						this.orderList = res.data;
					}
				}, 3000);
			},
			stopTimer() {
				if (this.timerOrderList) {
					clearInterval(this.timerOrderList); // 清除定时器
					this.timerOrderList = null; // 清除引用
				}
			},
			async getquick() {
				if (this.$t('profitCommission') != 'profitCommission') {
					this.marketProfit = true;
				} else {
					this.marketProfit = false;
				}
				let ret = await this.$u.api.getquick_p();
				if (ret) {
					this.quickmoney = ret.data;
				}
			},
			// 弹窗
			async openList(bd) {
				if (this.tutorialKey == 4) {
					this.tutorialChange(6);
					return
				}
				this.matchbd = bd;
				this.odds = bd.fbd_pl;
				this.formData.jprice = '';
				this.resultPrice = 0;
				if (this.fundShowType == 1) {
					this.getUserInfo_common();
				}
				if (this.isGoogle != 1) {
					this.getUserBalance();
					this.listPopup = true;
				}
			},
			closeList() {
				this.listPopup = false;
			},
			addMoney(money, type) {
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
			},
			// 提交
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
					await this.getUserInfo_common();
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
			async submit(type) { // 1普通投注 2快速跟投
				if (type == 1) {
					if (this.formData.jprice == '') {
						this.$refs.uTips.show({
							title: this.$t('请输入交易金额')
						});
					} else {
						if (this.is_pwd == 1) {
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
								await this.getUserInfo_common();
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
						zd_type: 2,
						money: this.otherOrderList.tz_price
					});
					if (ret.code == 1) {
						await this.getUserInfo_common();
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
				this.$refs.orderPayPopup.close()
				if (this.isGoogle != 1) {
					this.listPopup = true;
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
				if (parseInt(e) > this.userInfo_common.balance) {
					e = this.userInfo_common.balance;
				}
				this.resultPrice = parseFloat(e * this.odds / 100).toFixed(2)
				this.$nextTick(_ => {
					this.formData.jprice = this.clearNoNum(e);
					this.convertCount = (this.formData.jprice / 1000).toFixed(2) + 'k';
				})
			}
		}
	}
</script>

<style lang="scss">
	.vs-game-cell {
		position: relative;
		border-radius: 16px;
		text-align: center;
		background: url('../../static/images/content-banner.png') no-repeat;
		background-size: cover;
		background-position: center;
	}

	.vs-game-cell::after {
		content: '';
		border-radius: 16px;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(to bottom, rgba(25, 25, 25, .2), rgba(25, 25, 25, .2));
	}

	.gooLight {
		padding-top: 70px;
	}

	.bs-wrapper-two {
		padding: 15px 0 !important;
		background-color: #312B4F;
		border-radius: 15px 15px 0 0;
	}

	::v-deep .u-drawer-bottom {
		background: #1A1D24;
	}

	.bs-popup-hd .tt {
		font-weight: bold;
		color: #fff;
	}

	.game-popup-top {
		padding: 20px;
		border-radius: 16px;
		text-align: center;
		background: url(../../static/images/content-banner.png) center no-repeat;
		background-size: cover;
	}

	.game-popup-top .vs-game-card .team-tit {
		color: #ffffff;
	}

	.game-popup-top .vs-game-card .vs-middle {
		color: #ffffff;
	}

	.vs-form ::v-deep .uni-select__selector {
		top: auto;
		bottom: calc(100% + 6px);
	}

	.market-top-info {
		background: url(../../static/images/pc/image-market-pc-bg.jpg) center no-repeat;
		background-size: cover;
		border-radius: 24px;
		height: 236px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.bet-balance {
		height: 50px;
		padding: 0 15px;
		line-height: 50px;
		border-radius: 16px;
		background-color: rgba(62, 54, 100, 1);
	}

	.vs-game-card {
		.col {
			width: 250px;
			text-align: center
		}

		.game-card-title {
			font-size: 24px;
			margin-top: 16px;
		}

		.vs-middle {
			font-size: 22px;
		}
	}

	// pc
	.mark-table {
		background-color: #312B4F;
		border-radius: 16px;
	}

	@media (min-width:750px) {
		.bs-popup-body {
			padding: 24px;
		}
	}

	.userTutorialPosition_play {
		z-index: 10999;
		border: 3px solid #312B4F;
	}
</style>
