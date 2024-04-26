<template>
	<view class="content" :data-theme="themeMode">
		<view class="container">
			<uniNavHeader :title="$t('public3')"></uniNavHeader>
			<!-- 选项 -->
			<view class="sports-panel">
				<view class="top-tabs">
					<view class="top-tabs-item"
						:class="[index > 0 ? 'no-left-bor':'',index == topTabsCurr?'top-tabs-active-item ':'']"
						v-for="(item,index) in tablist" :key="index" @click="topTabsChange(index)">
						<view class="u-flex flex--direction u-row-center">
							<!-- <image :src="index == topTabsCurr ? item.imgActive : item.img" v-if="item.img"
								style="width:18px;height:18px;" mode=""></image> -->
							<view class="">{{item.count}}</view>
							<view class="">{{item.uname}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="two-top-tabs u-skeleton-fillet">
				<u-tabs height="64" bar-height="0" bg-color="none" gutter="40" active-color="#ffffff"
					inactive-color="#ffffff" :list="typeTabsList" :current="current" @change="changeTab">
				</u-tabs>
			</view>
			<template v-if="recordsEmtpy == 1">
				<!-- 让球 -->
				<view class="u-flex m-p-10">
					<!-- <view class="u-flex raqiu-item border-right-1 u-col-bottom">
						<text class="t1">热门</text>
						<text class="t2 m-rl-5"> -- </text>
						<text class="t3 raqiu-active">全部</text>
					</view> -->
					<view class="u-flex raqiu-item u-col-bottom">
						<text class="t1" :class="orderBy == 0 ? 'raqiu-active' : ''"
							@click="changeOrderBy(0)">{{$t('时间')}}</text>
						<text class="t2 m-rl-5"> -- </text>
						<text class="t3" :class="orderBy == 1 ? 'raqiu-active' : ''"
							@click="changeOrderBy(1)">{{$t('联赛')}}</text>
					</view>
					<!-- <view class="u-flex raqiu-item-tabs">
						<u-tabs height="64" bar-height="0" bg-color="none" gutter="40" active-color="#ffffff"
							inactive-color="#ffffff" :list="ballTabslist" :current="ballCurrent"
							@change="ballChangeTab">
						</u-tabs>
					</view> -->
				</view>
				<!-- 赛事列表 -->
				<view class="index-mar">
					<view class="index-mar-item" :class="index > 0 ? 'm-m-t-20' : ''" v-for="(item,index) in matchBOX"
						:key="`matchBOX${index}`">
						<view class="index-mar-item-top u-flex u-row-between">
							<view class="m-rl-5 m-font-16">{{timestampToTime(item.bt)}}</view>
							<!-- <view class="u-flex">
								<image :src="item.lg.lurl" mode=""></image>
								<text class="u-m-l-4">{{item.lg.na}}</text>
							</view> -->
							<!-- <view class="iconfont icon-up"></view> -->
						</view>
						<view class="index-mar-item-bottom">
							<view class="index-mar-item-bottom-top u-flex u-row-between"
								@click="testLoginGo(`/pages/sports/matchDetail?matchId=${item.id}`)">
								<view class="u-flex">
									<view class="u-flex item-bottom-top-one u-flex">
										<image src="@/static/images/sports/sports-jb.png"
											style="min-width:16px;min-height:16px;" mode=""></image>
										<view class="m-rl-5">{{item.lg.na}}</view>
										<view class="iconfont icon-sanjiao3"
											style="font-size: 5px;margin: 0 5px;color: var(--sports-right-bg);"></view>
										<view class="">{{$t('第')+ item.fid +$t('节')}}</view>
										<!-- <text class="iconfont icon-szb" :class="!item.vs.have?'u-c-9':''"></text> -->
									</view>
									<view class="u-flex" v-if="item.nsg">
										<image src="@/static/images/sports/qizi.png" style="width: 10px;height: 15px;"
											mode=""></image>
										<text class="u-c-9"
											v-if="item.nsg.length > 0">{{item.nsg[0].sc[0] + ':' + item.nsg[0].sc[1]}}</text>
									</view>
								</view>
								<view class="u-flex u-c-9 rightTms">
									<view class="m-rl-5">{{item.tms}}</view>
									<view class="iconfont icon-right m-font-b m-font-14"></view>
								</view>
							</view>
							<view class="index-mar-item-bottom-bottom">
								<view class="item-bottom-top-two"
									@click="testLoginGo(`/pages/sports/matchDetail?matchId=${item.id}`)">
									<view class="u-flex">
										<view class="lurlClass" v-if="item.ts[0].lurl">
											<image :src="item.ts[0].lurl" style="width: 16px;height: 16px;" mode="">
											</image>
										</view>
										<text class="m-rl-5">{{item.ts[0].na}}</text>
										<!-- <text class="oriBg">1</text> -->
									</view>
									<view class="u-flex m-m-t-5">
										<view class="lurlClass" v-if="item.ts[1].lurl">
											<image :src="item.ts[1].lurl" style="width: 16px;height: 16px;" mode="">
											</image>
										</view>
										<text class="m-rl-5">{{item.ts[1].na}}</text>
									</view>
									<view class="u-flex"></view>
								</view>
								<view class="scoreClass u-flex">
									<template v-if="item.mg.length > 0">
										<view v-for="(subitem,subindex) in item.mg" :key="`itemMg${subindex}`">
											<view class="u-text-center u-m-b-10">{{subitem.nm}}</view>
											<view class="u-flex locking-box">
												<view class="locking locking-k" :class="im.check?'activeSelectMar':''"
													v-for="(im,it) in subitem.mks[0].op" :key="it"
													@click.stop="payMarChange(index,subindex,it,item.id,subitem.mks[0].id,index,im.ty)">
													<text>{{im.nm}}</text>
													<text v-if="im.od == -999" class="iconfont icon-suoding"></text>
													<text v-else>{{im.od}}</text>
												</view>
											</view>
										</view>
									</template>
									<template v-else>
										<view class="u-flex locking-box">
											<view class="locking locking-g iconfont icon-mm"></view>
											<view class="locking locking-g iconfont icon-mm"></view>
											<view class="locking locking-g iconfont icon-mm"></view>
										</view>
									</template>
								</view>
							</view>
						</view>
					</view>
				</view>
			</template>
			<template v-if="recordsEmtpy == 0">
				<listEmpty :isDefault="true" class="u-bd-8" :listHighly='530'>
				</listEmpty>
			</template>
			<view class="footer u-m-t-50">
				<view class="foot-row u-skeleton-fillet u-m-b-50">
					<view class="col">
						<navigator url="/pages/ucenter/about" class="text">{{$t('关于我们')}}</navigator>
					</view>
					<view class="col">
						<navigator url="/pages/ucenter/kefu" class="text">{{$t('联系我们')}}</navigator>
					</view>
					<view class="col">
						<navigator url="/pages/ucenter/about" class="text">{{$t('register7')}}
						</navigator>
					</view>
					<view class="col">
						<template v-if="androidIos == 1 && doanLoadAnd">
							<view class="download-link" @click="androidDownload">{{$t('下载APP')}}</view>
						</template>
						<template v-if="androidIos == 2 && doanLoadIOS">
							<view class="download-link" @click="iosDownload">
								{{iosBut==0?$t('下载APP'):iosBut==1?$t('信任开发者'):''}}
							</view>
						</template>
					</view>
				</view>
				<view class="foot-cells">
					<view class="end-logo">
						<u-image height="44px" width="44px" :src="$t('indexBottomLogo')" mode="heightFix">
						</u-image>
					</view>
					<view class="foot-grid">
						<view class="text text-top u-m-t-16" style="color: var(--sports-index-bottom-color);">
							{{$t('sportsFootInfo1')}}
						</view>
					</view>
				</view>
				<view class="foot-line"></view>
				<view class="u-flex u-row-center">
					<view class="huobiClass">{{$t('sportsFootInfo2')}}</view>
				</view>
				<view class="foot-info">
					{{$t('indexBottomInfo')}}
				</view>
			</view>
			<!-- 悬浮串关按钮 -->
			<view class="activity_list" v-if="betsPropsList.length > 0">
				<!-- <view class="matchNum" @click="payMarListPopupChange" v-if="payMarListSta"> -->
				<view class="matchNum" @click="payMarListPopupChange">
					<view class="box">
						<text class="box-text">{{betsPropsList.length}}</text>
					</view>
				</view>
			</view>
			<view @click="toTop" v-if="scrollTop"
				style="position: fixed;bottom: 110px;right: 20px;z-index: 999;box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.3);border-radius: 50%;">
				<image src="@/static/images/sports/main-arrow.png" style="width: 45px;height: 42px;" mode="">
				</image>
			</view>
			<!-- 下注单关弹窗 -->
			<u-popup v-model="payMarPopup" :mode="payMarMode" border-radius="16"
				:mask-custom-style="uPopMaskCustomStyle">
				<view class="bs-popup bs-dist-popup no-border">
					<view class="bs-popup-hd">
						<view class="m-c-w">{{$t("投注单")}}</view>
						<view class="iconfont icon-close m-c-w" @click="payMarPopup = false"></view>
					</view>
					<view style="background-color: var(--mar-bg);">
						<view class="w_100 u-flex u-row-center m-bg-w" style="border-radius: 10px 10px 0 0;">
							<view class="w_50 u-text-center guanClass" @click="guanChange(1)"
								:class="tabsGuanCurrent == 1 ? 'guanActiveClass' : ''">{{$t('单关')}}</view>
							<view class="w_50 u-text-center guanClass" @click="guanChange(2)" v-if="betDataBMS.length > 1"
								:class="tabsGuanCurrent == 2 ? 'guanActiveClass' : ''">{{$t('串关')}}</view>
						</view>
					</view>
					<scroll-view scroll-y="true" class="m-bg-w" style="max-height: 60vh;">
						<template v-if="tabsGuanCurrent == 1">
							<view v-for="(item,index) in betDataBMS" :key="`order${index}`"
								:class="index>0?'m-m-t-20':''">
								<view class="payOrder">
									<view v-if="item.op">{{item.op.nm}}</view>
									<view class="color-fb-skin m-m-t-10">
										@ <text class="m-font-18 m-font-b" v-if="item.op">{{item.op.od}}</text>
									</view>
									<view class="u-flex u-row-right rightBtn">
										<view class="hanClose" v-if="item.ss == 0">{{$t('盘口已关闭')}}</view>
										<view class="hanDelete" @click="payMarClose(index)">{{$t('删除')}}</view>
									</view>
								</view>
								<view class="u-flex u-row-between m-m-8 footer-input" @click="inputChange(index)">
									<view class="input-item">
										<text class="input-value">{{ item.priceInput1 }}</text>
									</view>
									<view class="placeholder">{{'限额'+' '+item.smin+'-'+item.smax}}</view>
								</view>
								<view class="compter-box m-m-8 u-flex u-row-between u-col-center" v-if="item.inputSta">
									<view class="compter-left u-flex u-col-center u-row-between u-flex-wrap">
										<view class="value" v-for="i in numKeypad" :key="i" @click="addKeypad(i,index)">
											{{i}}
										</view>
									</view>
									<view class="compter-right u-flex u-col-center u-row-between flex--direction">
										<view class="value" @click="addPayPrice(100,index)">100</view>
										<view class="value" @click="addPayPrice(200,index)">200</view>
										<view class="value" @click="addPayPrice(300,index)">300</view>
										<view class="value bg-value" @click="addPayPrice(500,index)">500</view>
									</view>
								</view>
							</view>
						</template>
						<template v-if="tabsGuanCurrent == 2">
							<view v-for="(item,index) in betDataBMS" :key="`order${index}`"
								:class="index>0?'m-m-t-20':''">
								<view class="payOrder">
									<view v-if="item.op">{{item.op.nm}}</view>
									<view class="color-fb-skin m-m-t-10">
										@ <text class="m-font-18 m-font-b" v-if="item.op">{{item.op.od}}</text>
									</view>
									<view class="u-flex u-row-right rightBtn">
										<view class="hanClose" v-if="item.ss == 0">{{$t('盘口已关闭')}}</view>
										<view class="hanDelete" @click="payMarClose(index)">{{$t('删除')}}</view>
									</view>
								</view>
							</view>
							<view v-for="(item,index) in marList" :key="`input${index}`">
								<view class="u-flex u-row-between m-m-8 footer-input" @click="shouInput(index)">
									<view class="top-box">
										<text>{{item.sn?item.sn:marList.length}}</text>
										<text>{{$t('串')}}</text>
										<text
											class="padding-left-sm">{{index == marList.length - 1 ? item.in+'*' : '1*'}}</text>
										<text class="padding-left-sm">{{item.in}}</text>
									</view>
									<view class="input-item">
										<text class="input-value">{{ item.priceInput2 }}</text>
									</view>
									<view class="placeholder">{{'限额'+' '+item.mi+'-'+item.mx}}</view>
								</view>
								<view class="compter-box m-m-8 u-flex u-row-between u-col-center" v-if="item.inputSta">
									<view class="compter-left u-flex u-col-center u-row-between u-flex-wrap">
										<view class="value" v-for="i in numKeypad" :key="i" @click="addKeypad(i,index)">
											{{i}}
										</view>
									</view>
									<view class="compter-right u-flex u-col-center u-row-between flex--direction">
										<view class="value" @click="addPayPrice(100,index)">100</view>
										<view class="value" @click="addPayPrice(200,index)">200</view>
										<view class="value" @click="addPayPrice(300,index)">300</view>
										<view class="value bg-value" @click="addPayPrice(500,index)">500</view>
									</view>
								</view>
							</view>
						</template>
					</scroll-view>
					<view class="bottom-btn m-bg-w">
						<view class="u-flex u-row-right u-col-center principal">
							{{$t('本金')}}:
							<text class="m-c-0" v-if="tabsGuanCurrent == 1">{{ betPrive }}</text>
							<text class="m-c-0" v-if="tabsGuanCurrent == 2">{{ betChuanPrive }}</text>
						</view>
						<view class="u-flex u-row-between u-col-center">
							<view class="add" @click="payMarListClose">{{$t('清除')}}</view>
							<view class="getMoney-btn" @click="tabsGuanCurrent == 1 ? betPlay() : betPlayTwo()">
								{{'投注'}}
								<text v-if="tabsGuanCurrent == 1">{{'可赢额:'+winAmount}}</text>
								<text v-if="tabsGuanCurrent == 2">{{'可赢额:'+winChuanAmount}}</text>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
			<uniNavFooter fIndex="1"></uniNavFooter>
			<pcBg></pcBg>
			<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10999">
			</u-top-tips>
		</view>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniNavFooter from '@/components/uni-foot-bar/uni-foot-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	export default {
		components: {
			uniNavHeader,
			uniNavFooter,
			listEmpty,
			pcBg
		},
		data() {
			return {
				tabsGuanCurrent: 1,
				topTabsCurr: 0,
				curr_data: {},
				current: 0,
				typeCode1: 0,
				typeCode2: 0,
				typeCode3: 0,
				typeCode5: 0,
				typeCode6: 0,
				typeCode15: 0,
				ballTabslist: [{
					id: 2,
					name: "让球",
					sort: 99,
				}, {
					id: 2,
					name: "大小",
					sort: 99,
				}, {
					id: 2,
					name: "独赢",
					sort: 99,
				}, {
					id: 2,
					name: "角球",
					sort: 99,
				}],
				ballCurrent: 0,
				roll: 0,
				Cascad: 0,
				todayMar: 0,
				morningDish: 0,
				matchBOX: [],
				rollSll: [],
				CascadSll: [],
				todayMarSll: [],
				morningDishSll: [],
				ChampionshipsSll: [],
				ZQtype: '',
				BQtype: '',
				LQtype: '',
				BBQtype: '',
				DZZQtype: '',
				DZLQtype: '',
				WQtype: '',
				MGZQtype: '',
				SQtype: '',
				PQtype: '',
				SNKQtype: '',
				ZHGDtype: '',
				QJtype: '',
				orderBy: 1, //1联赛 0时间
				recordsEmtpy: null,
				payMarPopup: false,
				numKeypad: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'X'],
				payPrice: '',
				betMatchMarketListType: [],
				typeDate: {
					lgNa: '',
					nm: '',
					od: 0
				},
				payOdKey: 0,
				availablePrice: 0,
				singlePassType: [],
				marType: 0,
				matchId: 0,
				payMarChangeTime: null,
				statisticalChangeTime: null,
				getListChangeTime: null,
				payMarListPopup: false,
				payMarListSta: false,
				betsPropsList: [],
				showMarBetList: {},
				scrollTop: false,
				marList: [],
				betCanshu: [],
				androidIos: null, // 1安卓 2IOS
				doanLoadAnd: false, // 安卓下载
				doanLoadIOS: false, // IOS下载
				iosBut: 0,
				// 单关
				betDataBMS: [],
				payMarMode: 'center'
			}
		},
		onLoad() {
			this.payMarListSta = this.$helper.get("payMarListSta") ? this.$helper.get("payMarListSta") : false;
			this.getUserToken();
			this.getDoanload();
			this.onLoadChange();
		},
		onPageScroll(e) {
			if (e.scrollTop > 500) {
				this.scrollTop = true;
			} else {
				this.scrollTop = false;
			}
		},
		onHide() {
			clearTimeout(this.statisticalChangeTime);
			clearTimeout(this.getListChangeTime);
			clearTimeout(this.payMarChangeTime);
		},
		onUnload() {
			clearTimeout(this.statisticalChangeTime);
			clearTimeout(this.getListChangeTime);
			clearTimeout(this.payMarChangeTime);
		},
		watch: {
			betDataBMS(newVal, oldVal) {
				for (let i in oldVal) {
					if (oldVal[i].priceInput1 && newVal[i]) {
						newVal[i].priceInput1 = oldVal[i].priceInput1;
					}
					if (newVal[i]) {
						newVal[i].inputSta = oldVal[i].inputSta;
					}
				}
			},
			marList(newVal, oldVal) {
				for (let i in oldVal) {
					if (oldVal[i].priceInput2 && newVal[i]) {
						newVal[i].priceInput2 = oldVal[i].priceInput2;
					}
					if (newVal[i]) {
						newVal[i].inputSta = oldVal[i].inputSta;
					}
				}
			},
			payPrice(newV, oldV) {
				this.availablePrice = (newV * this.typeDate.od).toFixed(2);
			},
			betsPropsList(newVal) {
				newVal.length > 0 ? this.getYesMar() : this.payMarListClear();
			},
		},
		computed: {
			//   单关总投注金额
			betPrive() {
				let count = 0;
				for (let i in this.betDataBMS) {
					count += this.betDataBMS[i].priceInput1 * 1;
				}
				return count ? count : 0;
			},
			//   单关可赢金额
			winAmount() {
				let count = 0;
				for (let i in this.betDataBMS) {
					count += this.betDataBMS[i].priceInput1 * this.betDataBMS[i].op ? this.betDataBMS[i].op.od * 1 : 1;
				}
				return count ? count.toFixed(2) : 0;
			},
			// 串关总投注余额
			betChuanPrive() {
				let count = 0;
				for (let i in this.marList) {
					if (this.marList[i].priceInput2) {
						count += this.marList[i].priceInput2 * this.marList[i].in;
					}
				}
				return count ? count.toFixed(2) : 0;
			},
			//   串关可赢金额
			winChuanAmount() {
				let count = 0;
				for (let i in this.marList) {
					if (this.marList[i].priceInput2) {
						count +=
							this.marList[i].priceInput2 *
							(this.marList[i].sodd - this.marList[i].in);
					}
				}
				return count ? count.toFixed(2) : 0;
			},
			typeTabsList() {
				// 滚球玩法
				if (this.topTabsCurr == 0) {
					return [{
						typeCode: 1,
						name: this.$t('足球') + ' ' + this.ZQtype,
						sportsImg: require('@/static/images/sports/zuqiu.png')
					}, {
						typeCode: 3,
						name: this.$t('篮球') + ' ' + this.LQtype,
						sportsImg: require('@/static/images/sports/lanqiu.png')
					}, {
						typeCode: 15,
						name: this.$t('兵兵球') + ' ' + this.BBQtype,
						sportsImg: require('@/static/images/sports/bbqiu.png')
					}, {
						typeCode: 177,
						name: this.$t('电子足球') + ' ' + this.DZZQtype,
						sportsImg: require('@/static/images/sports/dzzq.png')
					}, {
						typeCode: 178,
						name: this.$t('电子篮球') + ' ' + this.DZLQtype,
						sportsImg: require('@/static/images/sports/lanqiu.png')
					}]
				} else if (this.topTabsCurr == 1) {
					return [{
						typeCode: 1,
						name: this.$t('足球') + ' ' + this.ZQtype,
						sportsImg: require('@/static/images/sports/zuqiu.png')
					}, {
						typeCode: 2,
						name: this.$t('冰球') + ' ' + this.BQtype,
						sportsImg: require('@/static/images/sports/bqiu.png')
					}, {
						typeCode: 3,
						name: this.$t('篮球') + ' ' + this.LQtype,
						sportsImg: require('@/static/images/sports/lanqiu.png')
					}, {
						typeCode: 5,
						name: this.$t('网球') + ' ' + this.WQtype,
						sportsImg: require('@/static/images/sports/wqiu.png')
					}, {
						typeCode: 6,
						name: this.$t('美国足球') + ' ' + this.MGZQtype,
						sportsImg: require('@/static/images/sports/dzzq.png')
					}, {
						typeCode: 15,
						name: this.$t('兵兵球') + ' ' + this.BBQtype,
						sportsImg: require('@/static/images/sports/bbqiu.png')
					}]
				} else if (this.topTabsCurr == 2) {
					return [{
						typeCode: 1,
						name: this.$t('足球') + ' ' + this.ZQtype,
						sportsImg: require('@/static/images/sports/zuqiu.png')
					}, {
						typeCode: 2,
						name: this.$t('冰球') + ' ' + this.BQtype,
						sportsImg: require('@/static/images/sports/bqiu.png')
					}, {
						typeCode: 3,
						name: this.$t('篮球') + ' ' + this.LQtype,
						sportsImg: require('@/static/images/sports/lanqiu.png')
					}, {
						typeCode: 5,
						name: this.$t('网球') + ' ' + this.WQtype,
						sportsImg: require('@/static/images/sports/wqiu.png')
					}, {
						typeCode: 6,
						name: this.$t('美国足球') + ' ' + this.MGZQtype,
						sportsImg: require('@/static/images/sports/dzzq.png')
					}, {
						typeCode: 8,
						name: this.$t('手球') + ' ' + this.SQtype,
						sportsImg: require('@/static/images/sports/sqiu.png')
					}, {
						typeCode: 13,
						name: this.$t('排球') + ' ' + this.PQtype,
						sportsImg: require('@/static/images/sports/pqiu.png')
					}, {
						typeCode: 14,
						name: this.$t('兵兵球') + ' ' + this.BBQtype,
						sportsImg: require('@/static/images/sports/bbqiu.png')
					}, {
						typeCode: 16,
						name: this.$t('斯诺克台球') + ' ' + this.SNKQtype,
						sportsImg: require('@/static/images/sports/tqiu.png')
					}]
				} else if (this.topTabsCurr == 3) {
					return [{
						typeCode: 1,
						name: this.$t('足球') + ' ' + this.ZQtype,
						sportsImg: require('@/static/images/sports/zuqiu.png')
					}, {
						typeCode: 2,
						name: this.$t('冰球') + ' ' + this.BQtype,
						sportsImg: require('@/static/images/sports/bqiu.png')
					}, {
						typeCode: 3,
						name: this.$t('篮球') + ' ' + this.LQtype,
						sportsImg: require('@/static/images/sports/lanqiu.png')
					}, {
						typeCode: 5,
						name: this.$t('网球') + ' ' + this.WQtype,
						sportsImg: require('@/static/images/sports/wqiu.png')
					}, {
						typeCode: 6,
						name: this.$t('美国足球') + ' ' + this.MGZQtype,
						sportsImg: require('@/static/images/sports/dzzq.png')
					}, {
						typeCode: 8,
						name: this.$t('手球') + ' ' + this.SQtype,
						sportsImg: require('@/static/images/sports/sqiu.png')
					}, {
						typeCode: 13,
						name: this.$t('排球') + ' ' + this.PQtype,
						sportsImg: require('@/static/images/sports/pqiu.png')
					}, {
						typeCode: 16,
						name: this.$t('斯诺克台球') + ' ' + this.SNKQtype,
						sportsImg: require('@/static/images/sports/tqiu.png')
					}, {
						typeCode: 18,
						name: this.$t('综合格斗') + ' ' + this.ZHGDtype,
						sportsImg: require('@/static/images/sports/zhgd.png')
					}, {
						typeCode: 19,
						name: this.$t('拳击') + ' ' + this.QJtype,
						sportsImg: require('@/static/images/sports/qj.png')
					}]
				} else {
					return [{
						typeCode: 1,
						name: this.$t('足球') + ' ' + this.ZQtype,
						sportsImg: require('@/static/images/sports/zuqiu.png')
					}, {
						typeCode: 2,
						name: this.$t('冰球') + ' ' + this.BQtype,
						sportsImg: require('@/static/images/sports/bqiu.png')
					}, {
						typeCode: 3,
						name: this.$t('篮球') + ' ' + this.LQtype,
						sportsImg: require('@/static/images/sports/lanqiu.png')
					}, {
						typeCode: 5,
						name: this.$t('网球') + ' ' + this.WQtype,
						sportsImg: require('@/static/images/sports/wqiu.png')
					}, {
						typeCode: 6,
						name: this.$t('美国足球') + ' ' + this.MGZQtype,
						sportsImg: require('@/static/images/sports/dzzq.png')
					}, {
						typeCode: 16,
						name: this.$t('斯诺克台球') + ' ' + this.SNKQtype,
						sportsImg: require('@/static/images/sports/tqiu.png')
					}]
				}
			},
			tablist() {
				return [{
					uname: this.$t('滚球'),
					name: this.$t('滚球') + ' ' + this.roll,
					ty: 1,
					count: this.roll,
					ssl: this.rollSll,
					img: require('@/static/images/sports/live-1.png'),
					imgActive: require('@/static/images/sports/live-1.png')
					// imgActive: require('@/static/images/sports/live-2.png')
				}, {
					uname: this.$t('串关'),
					name: this.$t('串关') + ' ' + this.Cascad,
					ty: 2,
					count: this.Cascad,
					ssl: this.CascadSll,
					img: require('@/static/images/sports/chuan1.png'),
					imgActive: require('@/static/images/sports/chuan1.png')
					// imgActive: require('@/static/images/sports/chuan2.png')
				}, {
					uname: this.$t('今日'),
					name: this.$t('今日') + ' ' + this.todayMar,
					ty: 3,
					count: this.todayMar,
					ssl: this.todayMarSll,
					img: require('@/static/images/sports/today1.png'),
					imgActive: require('@/static/images/sports/today1.png')
					// imgActive: require('@/static/images/sports/today2.png')
				}, {
					uname: this.$t('早盘'),
					name: this.$t('早盘') + ' ' + this.morningDish,
					ty: 4,
					count: this.morningDish,
					ssl: this.morningDishSll,
					img: require('@/static/images/sports/zaop1.png'),
					imgActive: require('@/static/images/sports/zaop1.png')
					// imgActive: require('@/static/images/sports/zaop2.png')
				}]
			},
		},
		methods: {
			testLoginGo(url) {
				if (this.$helper.get('token')) {
					uni.navigateTo({
						url
					});
				} else {
					uni.navigateTo({
						url: '/pages/login/index'
					});
				}
			},
			onLoadChange() {
				// #ifdef MY-SKIN-DEFAULT
				this.payMarMode = 'center';
				// #endif
				// #ifdef MY-SKIN-GREEN
				this.payMarMode = 'bottom';
				// #endif
			},
			inputChange(index) {
				for (let i in this.betDataBMS) {
					if (index == i) {
						this.betDataBMS[i].inputSta = true;
					} else {
						this.betDataBMS[i].inputSta = false;
					}
				}
			},
			guanChange(i) {
				this.tabsGuanCurrent = i;
				clearTimeout(this.payMarChangeTime);
				this.play();
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
			getYesMar() {
				this.$helper.set("payMarListSta", true);
				let betMatchMarketListType = [];
				let arr2 = this.$helper.get("betsPropsList");
				if (arr2.length == 1) {
					this.payMarListSta = false;
					this.$helper.set("payMarListSta", this.payMarListSta);
				}
				for (let i in arr2) {
					let obj = {};
					obj.marketId = arr2[i].marketId,
						obj.matchId = arr2[i].matchId,
						obj.type = arr2[i].type,
						betMatchMarketListType.push(obj)
				}
				this.betCanshu = betMatchMarketListType || [];
				clearTimeout(this.payMarChangeTime);
				this.play();
			},
			payMarListClear() {
				this.payMarListSta = false;
				for (let i in this.matchBOX) {
					for (let j in this.matchBOX[i].mg) {
						for (let k in this.matchBOX[i].mg[j].mks[0].op) {
							this.matchBOX[i].mg[j].mks[0].op[k].check = false;
						}
					}
				}
				this.$helper.set("payMarListSta", this.payMarListSta);
			},
			payMarListClear_de(i) {
				this.betsPropsList.splice(i, 1);
				this.$helper.set("betsPropsList", this.betsPropsList);
			},
			payMarListPopupChange() {
				this.payMarPopup = true;
				let betMatchMarketListType = [];
				let arr2 = this.$helper.get("betsPropsList");
				for (let i in arr2) {
					let obj = {};
					obj.marketId = arr2[i].marketId,
						obj.matchId = arr2[i].matchId,
						obj.type = arr2[i].type,
						betMatchMarketListType.push(obj)
				}
				this.betCanshu = betMatchMarketListType;
				clearTimeout(this.payMarChangeTime);
				this.play();
			},
			addMarList() {
				this.payMarPopup = false;
				this.payMarListSta = true;
				if (this.betsPropsList.length == 1) {
					for (let i in this.betsPropsList) {
						for (let k in this.matchBOX) {
							if (this.betsPropsList[i].matchId == this.matchBOX[k].id) {
								this.matchBOX[this.betsPropsList[i].matchId_index].mg[this.betsPropsList[i].marketId_index]
									.mks[0].op[this.betsPropsList[i].type_index].check = true
							}
						}
					}
				}
				this.$helper.set("payMarListSta", this.payMarListSta);
			},
			// 获取用户余额
			getUserBase(ken, url) {
				uni.request({
					url: `${url}/v1/user/base`,
					method: 'POST',
					data: {
						languageType: "CMN",
					},
					header: {
						'Authorization': ken,
					},
					success: (res) => {
						this.$refs.uTips.show({
							title: this.$t(res.data.message)
						});
					},
					fail: (err) => {
						if (err) {
							this.$refs.uTips.show({
								title: this.$t(res.data.message)
							});
						}
					},
				});
			},
			betPlay() {
				if (this.$helper.get("token")) {
					let parList = [];
					let arr = this.betDataBMS;
					for (let i in arr) {
						if (!arr[i].priceInput1) {
							this.$refs.uTips.show({
								title: this.$t("请输入正确余额")
							});
							return;
						}
						let optionObj = {};
						let parObj = {};
						optionObj.marketId = arr[i].mid;
						optionObj.odds = arr[i].op.od;
						optionObj.optionType = arr[i].op.ty;
						optionObj.oddsFormat = 1;
						parObj.oddsChange = 2;
						parObj.unitStake = Number(arr[i].priceInput1);
						parObj.betOptionList = [optionObj];
						parList.push(parObj);
					}
					let param = {
						currencyId: this.$helper.get("sportsCurrencyId"),
						languageType: "CMN",
						singleBetList: parList
					};
					uni.request({
						url: `${this.$helper.get("sportsURL")}/v1/order/bet/singlePass`,
						method: 'POST',
						data: param,
						header: {
							'Authorization': this.$helper.get("sportsToken"),
						},
						success: (res) => {
							if (res.data.success) {
								this.marList = [];
								this.betDataBMS = [];
								this.betsPropsList = [];
								this.$helper.set("betsPropsList", this.betsPropsList);
								this.payMarPopup = false;
								this.$refs.uTips.show({
									title: this.$t('下注成功')
								});
							} else {
								this.$refs.uTips.show({
									title: this.$t(res.data.message)
								});
							}
						},
						fail: (err) => {
							if (err) {
								this.$refs.uTips.show({
									title: this.$t(res.data.message)
								});
							}
						},
					});
				} else {
					this.$go('/pages/login/index');
				}
			},
			betPlayTwo() {
				if (this.$helper.get("token")) {
					let arr = [];
					for (let i in this.marList) {
						if (this.marList[i].priceInput2) {
							let param = {};
							param.oddsChange = 2;
							param.seriesValue = this.marList[i].sn;
							param.unitStake = this.marList[i].priceInput2;
							arr.push(param);
						}
					}
					let arr2 = [];
					for (let i in this.betDataBMS) {
						let param = {};
						param.marketId = this.betDataBMS[i].mid;
						param.odds = this.betDataBMS[i].op.od;
						param.optionType = this.betDataBMS[i].op.ty;
						param.oddsFormat = 1;
						arr2.push(param);
					}
					let param = {
						betMultipleData: arr,
						betOptionList: arr2,
						currencyId: this.$helper.get("sportsCurrencyId"),
						languageType: "CMN"
					};
					uni.request({
						url: `${this.$helper.get("sportsURL")}/v1/order/betMultiple`,
						method: 'POST',
						data: param,
						header: {
							'Authorization': this.$helper.get("sportsToken"),
						},
						success: (res) => {
							if (res.data.success) {
								this.marList = [];
								this.betDataBMS = [];
								this.betsPropsList = [];
								this.$helper.set("betsPropsList", this.betsPropsList);
								this.payMarPopup = false;
								this.$refs.uTips.show({
									title: this.$t('下注成功')
								});
							} else {
								this.$refs.uTips.show({
									title: this.$t(res.data.message)
								});
							}
						},
						fail: (err) => {
							if (err) {
								this.$refs.uTips.show({
									title: this.$t(res.data.message)
								});
							}
						},
					});
				} else {
					this.$go('/pages/login/index');
				}

			},
			get_key(key) {
				let arr = []
				for (let i in this.betsPropsList) {
					arr[i] = this.betsPropsList[i][key]
				}
				return arr
			},
			payMarChange(index, subindex, mks_it, matchId, marketId, key, ty) {
				let param = {};
				param = {
					matchId: this.matchBOX[index].id,
					marketId: this.matchBOX[index].mg[subindex].mks[0].id,
					type: this.matchBOX[index].mg[subindex].mks[0].op[mks_it].ty,
					matchId_index: index,
					marketId_index: subindex,
					type_index: mks_it
				};
				//串关只剩一个选项时转成单关
				//串关同个赛事只能有一个
				//串关同个选项会取消
				let checkSta = this.matchBOX[index].mg[subindex].mks[0].op[mks_it].check;
				let betsPropsList = this.betsPropsList || [];
				let k_i = this.get_key('matchId').lastIndexOf(this.matchBOX[index].id)
				if (k_i >= 0) {
					for (let m in this.matchBOX[index].mg) {
						for (let k in this.matchBOX[index].mg[m].mks[0].op) {
							this.matchBOX[index].mg[m].mks[0].op[k].check = false;
						}
					}
					betsPropsList.splice(k_i, 1);
				}
				if (!checkSta) {
					betsPropsList.push(param)
				}
				this.matchBOX[index].mg[subindex].mks[0].op[mks_it].check = !checkSta;
				this.betsPropsList = betsPropsList
				this.$helper.set("betsPropsList", this.betsPropsList);
				this.index_or = index;
				this.subindex_or = subindex;
				this.matchId = matchId;
				this.marketId = marketId;
				this.payOdKey = key;
				this.marType = ty;
				var betMatchMarketListType = [];
				let arr2 = this.betsPropsList;
				for (let i in arr2) {
					let obj = {};
					obj.marketId = arr2[i].marketId,
						obj.matchId = arr2[i].matchId,
						obj.type = arr2[i].type,
						betMatchMarketListType.push(obj)
				}
				this.betCanshu = betMatchMarketListType;
			},
			play() {
				uni.request({
					url: `${this.$helper.get("sportsURL")}/v1/order/batchBetMatchMarketOfJumpLine`,
					method: 'POST',
					data: {
						betMatchMarketList: this.betCanshu,
						languageType: "CMN",
						currencyId: this.$helper.get("sportsCurrencyId"),
						isSelectSeries: this.tabsGuanCurrent == 1 ? false : true
					},
					header: {
						'Authorization': this.$helper.get("sportsToken"),
					},
					success: (res) => {
						if (res.data.success) {
							// 单关
							let arr1 = res.data.data.bms;
							for (let i in arr1) {
								if (i == 0) {
									arr1[i].inputSta = true;
								} else {
									arr1[i].inputSta = false;
								}
								arr1[i].priceInput1 = "";
							}
							this.betDataBMS = arr1;
							// 串关
							let arr2 = res.data.data.sos;
							for (let i in arr2) {
								if (i == 0) {
									arr2[i].inputSta = true;
								} else {
									arr2[i].inputSta = false;
								}
								arr2[i].priceInput2 = "";
							}
							this.marList = arr2;
							// this.typeDate.od = res.data.data.bms[0].op.od;
							// if (this.betsPropsList.length > 0) {
							// 	this.payMarChangeTime = setTimeout(() => {
							// 		this.play();
							// 	}, 3000);
							// }
						} else {
							this.$refs.uTips.show({
								title: this.$t(res.data.message)
							});
						}
					},
					fail: (err) => {
						if (err) {
							this.$refs.uTips.show({
								title: this.$t(res.data.message)
							});
						}
					}
				});
			},
			payMarClose(index) {
				this.matchBOX[this.betsPropsList[index].matchId_index].mg[this.betsPropsList[index].marketId_index].mks[0]
					.op[this.betsPropsList[index].type_index].check = false;
				this.betDataBMS.splice(index, 1);
				this.betsPropsList.splice(index, 1);
				this.$helper.set("betsPropsList", this.betsPropsList);
				if (this.betDataBMS.length == 0) {
					this.payMarPopup = false;
				} else if (this.betDataBMS.length == 1) {
					this.tabsGuanCurrent = 1;
				}
				// clearTimeout(this.payMarChangeTime);
			},
			payMarListClose() {
				this.betDataBMS = [];
				this.betsPropsList = [];
				this.$helper.set("betsPropsList", this.betsPropsList);
				this.payMarPopup = false;
				this.tabsGuanCurrent = 1;
			},
			async getUserToken() {
				let res = {};
				if (this.$helper.get('token')) {
					res = await this.$u.api.game_login_game_p({
						platform: 2,
						gid: 1346
					});
				} else {
					res = await this.$u.api.game_fb_login_game_p({
						platform: 2
					});
				}
				if (res) {
					let obj = res.data;
					this.sports_token = JSON.parse(obj);
					this.$helper.set('sportsToken', this.sports_token.token);
					this.$helper.set('sportsURL', this.sports_token.url);
					this.$helper.set('sportsCurrencyId', this.sports_token.currencyId);

					// await this.getUserBase(this.sports_token.token, this.sports_token.url);
					await this.getMatchList(this.sports_token.token, this.sports_token.url);
					await this.getMatchList2(this.sports_token.token, this.sports_token.url);
				}
			},
			async getMatchList(ken, url) {
				uni.request({
					url: `${url}/v1/match/statistical`,
					method: 'POST',
					data: {
						languageType: "CMN"
					},
					header: {
						'Authorization': ken,
					},
					success: (res) => {
						if (res) {
							this.curr_data = res.data.data;
							if (this.curr_data.sl.length > 0) {
								for (let i in this.curr_data.sl) {
									if (this.curr_data.sl[i].ty == 1) {
										this.roll = this.curr_data.sl[i].tc;
										this.rollSll = this.curr_data.sl[i].ssl;
									}
									if (this.curr_data.sl[i].ty == 2) {
										this.Cascad = this.curr_data.sl[i].tc;
										this.CascadSll = this.curr_data.sl[i].ssl;
									}
									if (this.curr_data.sl[i].ty == 3) {
										this.todayMar = this.curr_data.sl[i].tc;
										this.todayMarSll = this.curr_data.sl[i].ssl;
									}
									if (this.curr_data.sl[i].ty == 4) {
										this.morningDish = this.curr_data.sl[i].tc;
										this.morningDishSll = this.curr_data.sl[i].ssl;
									}
								}
								if (this.topTabsCurr == 0) {
									for (let t in this.rollSll) {
										if (this.rollSll[t].sid == 1) {
											this.ZQtype = this.rollSll[t].c;
										}
										if (this.rollSll[t].sid == 3) {
											this.LQtype = this.rollSll[t].c;
										}
										if (this.rollSll[t].sid == 15) {
											this.BBQtype = this.rollSll[t].c;
										}
										if (this.rollSll[t].sid == 177) {
											this.DZZQtype = this.rollSll[t].c;
										}
										if (this.rollSll[t].sid == 178) {
											this.DZLQtype = this.rollSll[t].c;
										}
									}
								}
							}
							this.statisticalChangeTime = setTimeout(() => {
								this.getMatchList(this.$helper.get('sportsToken'), this.$helper
									.get('sportsURL'));
							}, 3000);
						}
					},
					fail: (err) => {
						if (err) {
							this.$refs.uTips.show({
								title: this.$t(res.data.message)
							});
						}
					},
				});
			},
			getMatchList2(ken, url) {
				// this.matchBOX = this.$helper.get('matchBOXSports');
				this.betsPropsList = this.$helper.get("betsPropsList");
				uni.request({
					url: `${url?url:this.$helper.get('sportsURL')}/v1/match/getList`,
					method: 'POST',
					data: {
						languageType: "CMN",
						current: 1,
						size: 50,
						orderBy: this.orderBy,
						sportId: this.typeTabsList[this.current].typeCode,
						type: this.topTabsCurr + 1,
					},
					header: {
						'Authorization': ken ? ken : this.$helper.get('sportsToken'),
					},
					success: (res) => {
						if (res) {
							let arr = res.data.data.records;
							let arr_1 = [],
								arr_2 = [],
								arr_3 = []
							for (let b in this.betsPropsList) {
								arr_1.push(this.betsPropsList[b]['matchId'])
								arr_2.push(this.betsPropsList[b]['marketId'])
								arr_3.push(this.betsPropsList[b]['type'])
							}
							for (let i in arr) {
								if (arr_1.lastIndexOf(arr[i].id) >= 0) {
									for (let j in arr[i].mg) {
										if (arr_2.lastIndexOf(arr[i].mg[j].mks[0].id) >= 0) {
											for (let k in arr[i].mg[j].mks[0].op) {
												arr[i].mg[j].mks[0].op[k].check = false;
												for (let g in this.betsPropsList) {
													if (arr[i].id == this.betsPropsList[g].matchId && arr[i]
														.mg[j].mks[
															0].id == this.betsPropsList[g].marketId && k ==
														this
														.betsPropsList[g].type_index) {
														arr[i].mg[j].mks[0].op[k].check = true;
													}
												}
											}
										}
									}
								}
							}
							this.matchBOX = arr;
							// this.$helper.set('matchBOXSports', res.data.data.records);
							if (this.matchBOX.length > 0) {
								this.recordsEmtpy = 1;
							} else {
								this.recordsEmtpy = 0;
							}
							clearTimeout(this.getListChangeTime);
							this.getListChangeTime = setTimeout(() => {
								this.getMatchList2();
							}, 3000);
						}
					},
					fail: (err) => {
						if (err) {
							this.recordsEmtpy = 0;
							this.$refs.uTips.show({
								title: this.$t(res.data.message)
							});
						}
					},
				});
			},
			shouInput(index) {
				for (let i in this.marList) {
					if (i == index) {
						this.marList[i].inputSta = true;
					} else {
						this.marList[i].inputSta = false;
					}
				}
				this.$forceUpdate()
			},
			addKeypad(i, index) {
				if (this.tabsGuanCurrent == 1) {
					if (this.betDataBMS[index].priceInput1.length > 0) {
						if (i == 'X') {
							this.betDataBMS[index].priceInput1 = this.betDataBMS[index].priceInput1.slice(0, this
								.betDataBMS[index]
								.priceInput1.length - 1);
						} else {
							if (!this.betDataBMS[index].priceInput1.includes('.')) {
								this.betDataBMS[index].priceInput1 = this.betDataBMS[index].priceInput1 + i + '';
							}
						}
					} else {
						if (i != 'X') {
							this.betDataBMS[index].priceInput1 = this.betDataBMS[index].priceInput1 + i + '';
						}
					}
				} else {
					if (this.marList[index].priceInput2.length > 0) {
						if (i == 'X') {
							this.marList[index].priceInput2 = this.marList[index].priceInput2.slice(0, this
								.marList[index]
								.priceInput2.length - 1);
						} else {
							if (!this.marList[index].priceInput2.includes('.')) {
								this.marList[index].priceInput2 = this.marList[index].priceInput2 + i + '';
							}
						}
					} else {
						if (i != 'X') {
							this.marList[index].priceInput2 = this.marList[index].priceInput2 + i + '';
						}
					}
				}
			},
			addPayPrice(i, index) {
				if (this.tabsGuanCurrent == 1) {
					this.betDataBMS[index].priceInput1 = (Number(this.betDataBMS[index].priceInput1) + i) + '';
				} else {
					this.marList[index].priceInput2 = (Number(this.marList[index].priceInput2) + i) + '';
				}
			},
			changeOrderBy(index) {
				this.recordsEmtpy = null;
				this.orderBy = index;
				this.getMatchList2();
				clearTimeout(this.getListChangeTime);
			},
			changeTab(index) {
				clearTimeout(this.getListChangeTime);
				this.current = index;
				this.recordsEmtpy = null;
				this.getMatchList2();
			},
			ballChangeTab(index) {
				this.ballCurrent = index;
			},
			topTabsChange(index) {
				clearTimeout(this.getListChangeTime);
				this.current = 0;
				this.recordsEmtpy = null;
				this.topTabsCurr = index;
				this.getMatchList2();
				if (index == 0) {
					for (let t in this.rollSll) {
						if (this.rollSll[t].sid == 1) {
							this.ZQtype = this.rollSll[t].c;
						}
						if (this.rollSll[t].sid == 3) {
							this.LQtype = this.rollSll[t].c;
						}
						if (this.rollSll[t].sid == 15) {
							this.BBQtype = this.rollSll[t].c;
						}
						if (this.rollSll[t].sid == 177) {
							this.DZZQtype = this.rollSll[t].c;
						}
						if (this.rollSll[t].sid == 178) {
							this.DZLQtype = this.rollSll[t].c;
						}
					}
				} else if (index == 1) {
					for (let t in this.CascadSll) {
						if (this.CascadSll[t].sid == 1) {
							this.ZQtype = this.CascadSll[t].c;
						}
						if (this.CascadSll[t].sid == 2) {
							this.BQtype = this.CascadSll[t].c;
						}
						if (this.CascadSll[t].sid == 3) {
							this.LQtype = this.CascadSll[t].c;
						}
						if (this.CascadSll[t].sid == 5) {
							this.WQtype = this.CascadSll[t].c;
						}
						if (this.CascadSll[t].sid == 6) {
							this.MGZQtype = this.CascadSll[t].c;
						}
						if (this.CascadSll[t].sid == 15) {
							this.BBQtype = this.CascadSll[t].c;
						}
					}
				} else if (index == 2) {
					for (let t in this.todayMarSll) {
						if (this.todayMarSll[t].sid == 1) {
							this.ZQtype = this.todayMarSll[t].c;
						}
						if (this.todayMarSll[t].sid == 2) {
							this.BQtype = this.todayMarSll[t].c;
						}
						if (this.todayMarSll[t].sid == 3) {
							this.LQtype = this.todayMarSll[t].c;
						}
						if (this.todayMarSll[t].sid == 5) {
							this.WQtype = this.todayMarSll[t].c;
						}
						if (this.todayMarSll[t].sid == 6) {
							this.MGZQtype = this.todayMarSll[t].c;
						}
						if (this.todayMarSll[t].sid == 8) {
							this.SQtype = this.todayMarSll[t].c;
						}
						if (this.todayMarSll[t].sid == 13) {
							this.PQtype = this.todayMarSll[t].c;
						}
						if (this.todayMarSll[t].sid == 15) {
							this.BBQtype = this.todayMarSll[t].c;
						}
						if (this.todayMarSll[t].sid == 16) {
							this.SNKQtype = this.todayMarSll[t].c;
						}
					}
				} else if (index == 3) {
					for (let t in this.morningDishSll) {
						if (this.morningDishSll[t].sid == 1) {
							this.ZQtype = this.morningDishSll[t].c;
						}
						if (this.morningDishSll[t].sid == 2) {
							this.BQtype = this.morningDishSll[t].c;
						}
						if (this.morningDishSll[t].sid == 3) {
							this.LQtype = this.morningDishSll[t].c;
						}
						if (this.morningDishSll[t].sid == 5) {
							this.WQtype = this.morningDishSll[t].c;
						}
						if (this.morningDishSll[t].sid == 6) {
							this.MGZQtype = this.morningDishSll[t].c;
						}
						if (this.morningDishSll[t].sid == 8) {
							this.SQtype = this.morningDishSll[t].c;
						}
						if (this.morningDishSll[t].sid == 13) {
							this.PQtype = this.morningDishSll[t].c;
						}
						if (this.morningDishSll[t].sid == 16) {
							this.SNKQtype = this.morningDishSll[t].c;

						}
						if (this.morningDishSll[t].sid == 18) {
							this.ZHGDtype = this.morningDishSll[t].c;
						}
						if (this.morningDishSll[t].sid == 19) {
							this.QJtype = this.morningDishSll[t].c;
						}
					}
				} else {
					for (let t in this.ChampionshipsSll) {
						if (this.ChampionshipsSll[t].sid == 1) {
							this.ZQtype = this.ChampionshipsSll[t].c;
						}
						if (this.ChampionshipsSll[t].sid == 2) {
							this.BQtype = this.ChampionshipsSll[t].c;
						}
						if (this.ChampionshipsSll[t].sid == 3) {
							this.LQtype = this.ChampionshipsSll[t].c;
						}
						if (this.ChampionshipsSll[t].sid == 5) {
							this.WQtype = this.ChampionshipsSll[t].c;
						}
						if (this.ChampionshipsSll[t].sid == 6) {
							this.MGZQtype = this.ChampionshipsSll[t].c;
						}
						if (this.ChampionshipsSll[t].sid == 16) {
							this.SNKQtype = this.ChampionshipsSll[t].c;
						}
					}
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.sports-panel {
		padding: 60px 0 0 0;
		background: var(--mar-bg);
		padding: calc(60px + env(safe-area-inset-top)) 0 0 0;
	}

	.top-tabs {
		display: flex;
		overflow: scroll;
		border-radius: 16px 16px 0 0;
		background-color: var(--sports-top-tabs-bg);
	}

	.top-tabs-item {
		width: 25%;
		color: #fff;
		font-weight: bold;
		text-align: center;
		word-break: normal;
		padding: 10px 3px;
	}

	.top-tabs-active-item {
		color: #234EBC;
		font-weight: bold;
		border-radius: 16px 16px 0 0;
		background: var(--sports-index-tabs-active-bg);
	}

	.no-left-bor {
		border-left: 0 !important;
	}

	.two-top-tabs {
		// margin-top: 15px;
		padding: 10px;

		::v-deep .u-tab-item {
			border-radius: var(--tab-radius);
			background: var(--tab-item-bg);
			margin-right: 10px;
			border: 1px solid #ccc;
			color: var(--tab-item-color) !important;
		}

		::v-deep .item-active {
			// background: var(--tab-active);
			background: #2B44B1;
			color: #ffffff !important;
			border: none;
		}
	}

	.m-p-10 {
		padding: 0 10px 10px 10px;
	}

	.m-m-t-10 {
		margin-top: 10px;
	}

	.m-m-t-20 {
		margin-top: 20px;
	}

	.m-m-t-5 {
		margin-top: 5px;
	}

	.m-rl-5 {
		margin: 0 5px;
	}

	.raqiu-item {
		color: #000;
		display: flex;
		margin-right: 8px;
		padding-right: 8px;
	}

	.border-right-1 {
		border-right: 1px solid #ccc;
	}

	.raqiu-active {
		color: #384FB4;
		font-size: 15px;
	}

	.raqiu-item-tabs {
		::v-deep .u-tab-item {
			color: #999 !important;
			padding: 0 3px !important;
			margin: 0 3px !important;
		}

		::v-deep .item-active {
			color: #fff !important;
			border-bottom: 1px solid #fff !important;
		}
	}

	.index-mar {
		padding: 10px;
	}

	.m-m-8 {
		margin: 8px;
	}

	.index-mar-item {
		border-radius: var(--sports-index-item-bd);
		padding: 15px 10px 8px 10px;
		background-color: var(--sports-index-item-bg);
	}

	.index-mar-item-top {
		font-size: 12px;
		font-weight: bold;
		// padding-bottom: 8px;
		// border-bottom: 1px solid #ccc;

		image {
			width: 20px;
			height: 20px;
		}
	}

	.lurlClass {
		border-radius: 50px;
		width: 25px;
		height: 25px;
		background-color: var(--sports-lurlClass-bg);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.index-mar-item-bottom {}

	.index-mar-item-bottom-top {
		margin-top: 10px;
	}

	.item-bottom-top-one {
		margin-right: 20px;
		padding: 2px 12px;
		color: #fff;
		border-radius: var(--sports-item-bottom-top-bd);
		background-color: var(--sports-item-bottom-top-bg);

		image {
			width: 15px;
			height: 15px;
		}
	}

	.index-mar-item-bottom-bottom {}

	.item-bottom-top-two {
		margin-top: 10px;

		.oriBg {
			color: #fff;
			font-weight: bold;
			border-radius: 2px;
			background-color: #2252EC;
		}
	}

	.scoreClass {
		margin-top: 8px;
		padding-top: 8px;
		border-top: 2px solid var(--sports-scoreClass-solid);
		overflow-x: scroll;
	}

	.locking-box {}

	.locking {
		max-width: 62px;
		color: #999;
		height: 45px;
		font-weight: bold;
		text-align: center;
	}

	.locking-g {
		width: 45px;
		font-size: 23px;
		line-height: 43px;
		background: var(--sports-locking-g-bg);
	}

	.locking-g:first-child {
		border-radius: 8px 0 0 8px;
	}

	.locking-g:last-child {
		border-radius: 0 8px 8px 0;
	}

	.locking-k:first-child {
		border-radius: 8px 0 0 8px;
	}

	.locking-k:last-child {
		border-radius: 0 8px 8px 0;
	}

	.locking-k {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2px 6px;
		background: var(--sports-locking-k-bg);
		font-family: DIN;
		font-style: normal;
		font-weight: 700;
		font-size: 14px;
		line-height: 20px;
		color: #000;
		text-align: center;
		position: relative;
		min-width: 82px;
		min-height: 52px;
		margin-right: 4px;
		border: 2px solid var(--sports-locking-solid);
	}

	.payOrder {
		margin: 8px;
		padding: 10px;
		border-radius: var(--sports-color-fb-skin-bd);
		position: relative;
		background-color: var(--sports-details-payOrder-bg);
	}

	.rightBtn {
		background: #ccc;
		border-radius: 27px 0 17px 0;
		position: absolute;
		bottom: 0;
		right: 0;
		height: 26px;
	}

	.hanClose {
		position: relative;
		border-radius: 27px 0 17px 0;
		font-size: 12px;
		z-index: 1;
		background: red;
		color: #fff;
		padding: 5px 10px;
	}

	.hanDelete {
		position: relative;
		z-index: 2;
		font-size: 13px;
		color: rgba(0, 0, 0, .8);
		padding: 5px 10px;
	}

	.footer-input {
		position: relative;
	}

	.footer-input .top-box {
		position: absolute;
		top: -8px;
		left: 20px;
		padding: 0 10px;
		font-size: 13px;
		background: #251d73;
		z-index: 9;
		color: #fff;
		border-radius: 10px;
	}

	.pro-btn {
		font-size: 16px;
		font-weight: 600;
		padding: 8px 12px;
		background: #1AEACB;
		border-radius: 10px;
		color: #fff;
	}

	.placeholder {
		position: absolute;
		right: 8px;
		color: #ccc;
		font-size: 13px;
	}

	.footer-input .input-item {
		position: relative;
		border: 1px solid var(--sports-color-fb-skin);
		height: 37px;
		padding-left: 8px;
		border-radius: var(--sports-color-fb-skin-bd);
		line-height: 37px;
		width: 100%;
	}

	.input-value ::after {
		position: absolute;
		content: "";
		margin-left: 4px;
		width: 2px;
		height: 20px;
		border-radius: 1px;
		top: 8px;
		background: #44ad44;
		animation: input-data-value 1.5s linear infinite;
	}

	@keyframes input-data-value {
		0% {
			background: var(--sports-color-fb-skin);
		}

		50% {
			background: var(--bs-popup-hd);
		}

		100% {
			background: var(--sports-color-fb-skin);
		}
	}

	.compter-box .value {
		height: 41px;
		margin-top: 10px;
		font-size: 18px;
		font-weight: 600;
		width: 62px;
		background: var(--psorts-compter-box-value-bg);
		border-radius: var(--psorts-compter-box-value-bd);
		color: var(--psorts-compter-box-value-color);
		text-align: center;
		line-height: 41px;
	}

	.compter-box .compter-left {
		padding: 10px;
		padding-top: 0;
		width: calc(100% - 93px);
		background: var(--sports-compter-left-bg);
		border-radius: var(--sports-color-fb-skin-bd);
	}

	.compter-box .compter-left .value {
		width: 32%;
		text-align: center;
	}

	.compter-box .compter-right {
		padding: 10px;
		padding-top: 0;
		border-radius: var(--sports-color-fb-skin-bd);
		background: var(--sports-compter-left-bg);
	}


	.bottom-btn {
		padding: 0 8px;
		padding-bottom: 10px;
		border-radius: 0 0 15px 15px;
	}

	.bottom-btn .principal {
		font-size: 13px;
		color: #000;
		padding: 5px 10px;

		.m-c-0 {
			color: #BA9870;
			font-size: 13px;
			font-weight: bold;
		}
	}

	.bottom-btn .add {
		background: var(--sports-details-btn-bg-1);
		border-radius: var(--sports-detail-item-data-bd);
		padding: 10px 0;
		color: var(--sports-details-btn-color-1);
		font-size: 14px;
		width: 104px;
		text-align: center;
	}

	.bottom-btn .getMoney-btn {
		background: var(--sports-details-btn-bg-2);
		padding: 10px 0;
		border-radius: var(--sports-detail-item-data-bd);
		font-size: 14px;
		color: #fff;
		text-align: center;
		width: calc(100% - 120px);
	}

	.color-fb-skin {
		color: var(--sports-color-fb-skin);
	}

	.rightTms {
		color: #fff;
		border-radius: var(--sports-rightTms-bd);
		background-color: var(--sports-rightTms-bg);
	}

	.activity_list .matchNum {
		position: fixed;
		right: 20px;
		z-index: 99;
		top: 70vh;
		background: var(--sports--activity-list-matchNum-bg);
		width: 52px;
		height: 52px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 1px 2px 3px 4px rgb(0 0 0 / 10%);
	}

	.activity_list .matchNum .badge {
		background-color: #e43d33;
		position: absolute;
		right: 0;
		top: -0px;
		display: flex;
		overflow: hidden;
		box-sizing: border-box;
		justify-content: center;
		flex-direction: row;
		height: 16px;
		min-width: 16px;
		padding: 0 4px;
		line-height: 14px;
		color: #fff;
		border-radius: 50%;
		text-align: center;
		font-size: 10px;
	}

	.activeSelectMar {
		color: #fff;
		background: var(--tab-active);
	}

	.huobiClass {
		color: var(--sports-index-huobiClass-color);
		border-radius: 5px;
		padding: 2px 10px;
		background-color: var(--sports-index-huobiClass-bg);
	}

	.guanClass {
		line-height: 30px;
		margin: 0 15px;
	}

	.guanActiveClass {
		border-bottom: 2px solid var(--sports-color-fb-skin);
	}
</style>
