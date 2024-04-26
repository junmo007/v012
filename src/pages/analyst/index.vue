<template>
	<view class="container" :class="sideshow?'is-mask':''">
		<uniNavHeader :title="$t('menu4')" @clickLeft="menuClick"></uniNavHeader>
		<!-- sidebar -->
		<view class="sidebar" :class="sideshow?'is-show':''">
			<uniSideHeader @menuClick="menuClick" nIndex="3"></uniSideHeader>
		</view>
		<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
		<!-- main -->
		<view class="bs-container">
			<view class="bs-content">
				<!-- pc -->
				<view class="pc-show">
					<view class="row ">
						<view class="col-auto ">
							<view class="analyster-panel">
								<view class="a-tag" v-if="analystFirst.level == 0">{{$t("game31")}} Top1</view>
								<view class="ana-rank" v-if="analystFirst.level == 0"><text>NO.1</text></view>								
								<view class="analyster-grid flex-center">
									<view class="ana-avatar">
										<image :src="analystFirst.head" mode=""></image>
									</view>
									<view class="flex_bd">
										<view class="ana-heading">
											<text>{{analystFirst.name}}</text>
											<text class="tag" v-if="analystFirst.level == 0">{{$t("game32")}}</text>
											<text class="tag" v-if="analystFirst.level > 0">{{$t("game48")}}</text>
										</view>
										<view class="ana-cell">
											<view class="hd">{{$t("game33")}}</view>
											<view class="bd" v-html="$t(analystFirst.position)"></view>
										</view>
										<view class="ana-cell">
											<view class="hd">{{$t("game34")}}</view>
											<view class="bd" v-html="$t(analystFirst.intro)"></view>
										</view>
										<view class="ana-end-cell">
											{{$t("game35")}}：<text class="text-green per-val">{{analystFirst.accuracy}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="col-40">
							<!-- 其他设计师 -->
							<view class="other-panel">
								<view class="other-panel_hd">{{$t("game36")}}：</view>
								<view class="analyster-swiper-list">
									<swiper class="analyster-swiper" :indicator-dots="indicatorDots"
										:autoplay="autoplay" :interval="interval" :duration="duration" :current="curDot"
										:circular='circular'>
										<swiper-item class="flex-center justify-zBetween" v-for="(v, k) in analystPList" :key="`analystPList${k}`">
											<view class="analyster-item-box" v-for="(item, index) in v" :key="`v${index}`" @click="swicthAnalyster(item, index)">
												<view class="a-photo">
													<image :src="item.head" mode=""></image>
													<view class="a-button">{{$t("game37")}}</view>
												</view>
												<view class="a-name">{{item.name}}</view>
												<view class="a-price">{{$t("game38")}}：{{item.accuracy}}</view>
											</view>
										</swiper-item>
									</swiper>
									<view class="iconfont icon-left" @click="leftImg()"></view>
									<view class="iconfont icon-right" @click="rightImg()"></view>
								</view>
							</view>
						</view>
					</view>
					<!-- 包赔赛事 -->
					<view class="analyst-lists">
						<view class="analyst-list-card" v-for="(v,index) in analystRecord" :key="`analystRecord${index}`">							
							<view class="analyst-heading zBetween">
								<view class="analy-tt" v-if="v.indemnity == 0">{{$t("game39")}}</view>
								<view class="analy-tt" v-if="v.indemnity == 1">{{$t("game40")}}</view>
								<view class="analy-v">{{$t("user7")}}：{{userInfo_common.balance}}</view>
							</view>
							<view class="analy-list-body flex-center">
								<view class="analy-left">
									<view class="analy-item">{{$t("game41")}}：{{$t(v.ls_name)}}</view>
									<view class="analy-item">{{$t("game42")}}：{{v.sc_time}}</view>
									<view class="analy-item analy-item-tip">{{$t("game43")}}：{{$t("game44")}}</view>
								</view>
								<view class="analy-score">
									<view class="text" v-if="v.type == 0">{{$t("game45")}}：{{$t("game2")}}</view>
									<view class="text" v-if="v.type == 1">{{$t("game45")}}：{{$t("game1")}}</view>
									<view class="score-value">{{v.zd_fraction}}：{{v.kd_fraction}}</view>
									<view class="text">{{$t("game46")}}：{{v.odds}}%</view>
								</view>
								<view class="analy-vs-cell">
									<view class="analy-top-vs flex-center justify-center">
										<view class="team-text">{{$t(v.zd_name)}}</view>
										<view class="vs-icon">
											<!-- <image src="../../static/images/analyst/vs.png" mode=""></image> -->
										</view>
										<view class="team-text">{{$t(v.kd_name)}}</view>
									</view>
									<view class="analy-select-bar flex-center justify-center">
										<view class="analy-select-btns flex-center">
											<uni-data-checkbox selectedColor="var(--ui-color-normal)"  v-model="analystFirst.selectValue" mode="tag" :localdata="analystFirst.selectData" @change="selectChange"></uni-data-checkbox>
											<view class="set-icon" @click="open()"><text class="iconfont icon-shezhi"></text></view>
										</view>
										<view class="select-action-box flex-center">
											<input type="text" class="button" v-model="analystFirst.diyValue" @input="gameInputpc($event,index)" :placeholder="$t('game47')" placeholder-style="color:var(--ui-color-normal)" />
											<view class="button btn--default" @click="baoTouClick(index, v.id)" v-if="v.indemnity == 0 && v.is_status == 0">{{$t("game32")}}</view>
											<view class="button btn--default" @click="baoTouClick(index, v.id)" v-if="v.indemnity == 1 && v.is_status == 0">{{$t("game48")}}</view>
											<view class="button btn--default" v-if="v.is_status == 1" style="background: #31b468 !important; border: 1px solid #31b468 !important;">{{$t("game59")}}</view>
											<view class="button btn--default" v-if="v.is_status == 2" style="background: #272323 !important; border: 1px solid #272323 !important;">{{$t("game58")}}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 手机 z展示-->
				<view class="m-show">
					<view class="analys-m-list">
						<!-- cell -->
						<view class="analys-m-list-cell" v-for="(item,index) in analystList" :key="`analystList2${index}`">
							<view class="analys-m-list-heading">
								<view class="ana-rank" v-if="item.level == 0"><text>NO.1</text></view>
								<view class="ana-top-cell flex-center">
									<view class="a-tag" v-if="item.level == 0">{{$t("game31")}} Top1</view>
									<view class="ana-top-text">{{$t("game35")}}：<text class="text-green per-val">{{item.accuracy}}</text></view>
								</view>
								<view class="analyster-m-grid flex-center">
									<view class="ana-avatar">
										<image :src="item.head" mode=""></image>
									</view>
									<view class="flex_bd">
										<view class="ana-heading">
											<text>{{item.name}}</text>
											<text class="tag" v-if="index == 0">{{$t("game32")}}</text>
											<text class="tag" v-if="index > 0">{{$t("game48")}}</text>
										</view>
										<view class="ana-cell">
											<view class="hd">{{$t("game33")}}</view>
											<view class="bd line-2" v-html="$t(item.position)"></view>
										</view>
										<view class="ana-cell">
											<view class="hd">{{$t("game34")}}</view>
											<view class="bd iconfont" :class="item.isIntroShow?'ht-auto icon-up':'line-2 icon-down'" @click="analayIntro(item,index)"  v-html="$t(item.intro)"><text ></text></view>
										</view>
									</view>
								</view>
							</view>
							<view class="analys-m-toggle-body" v-show="item.isSubShow" v-for="(v,k) in item.record" :key="`record${k}`">
								<view class="analyst-mm_list-card">
									<view class="analyst-heading zBetween">
										<view class="analy-tt" v-if="v.indemnity == 0">{{$t("game39")}}</view>
										<view class="analy-tt" v-if="v.indemnity == 1">{{$t("game40")}}</view>
										<view class="analy-v">{{$t("user7")}}：{{userInfo_common.balance}}</view>
									</view>
									<view class="analy-mm_flex flex-center">
										<view class="analy-score">
											<view class="text" v-if="v.type == 0">{{$t("game45")}}：{{$t("game2")}}</view>
											<view class="text" v-if="v.type == 1">{{$t("game45")}}：{{$t("game1")}}</view>
											<view class="score-value">{{v.zd_fraction}}：{{v.kd_fraction}}</view>
											<view class="text">{{$t("game46")}}：{{v.odds}}%</view>
										</view>
										<view class="analy-vs-cell flex_bd">
											<view class="analy-top-vs flex-center ">
												<view class="team-text">{{$t(v.zd_name)}}</view>
												<view class="vs-icon">
													<!-- <image src="../../static/images/analyst/vs.png" mode=""></image> -->
												</view>
												<view class="team-text">{{$t(v.kd_name)}}</view>
											</view>
											<view class="analy-items">
												<view class="analy-item">{{$t("game41")}}：{{$t(v.ls_name)}}</view>
												<view class="analy-item">{{$t("game42")}}：{{v.sc_time}}</view>
											</view>
										</view>
									</view>
									<view class="analy-select-bar  ">
										<view class="analy-select-btns flex-center">
											<uni-data-checkbox selectedColor="var(--ui-color-normal)" v-model="item.selectValue" mode="tag" :localdata="item.selectData" @change="selectChange"></uni-data-checkbox>
											<!-- <view class="button">100</view>
											<view class="button">500</view>
											<view class="button">900</view> -->
											<view class="set-icon" @click="open()"><text class="iconfont icon-shezhi"></text></view>
										</view>
										<view class="select-action-box flex-center">
											<input type="text" class="button" v-model="item.diyValue" @input="gameInput($event,index)" :placeholder="$t('game47')" placeholder-style="color:var(--ui-color-normal)" />
											<view class="button btn--default" @click="baoTouClick(index, v.id)" v-if="v.indemnity == 0 && v.is_status == 0">{{$t("game32")}}</view>
											<view class="button btn--default" @click="baoTouClick(index, v.id)" v-if="v.indemnity == 1 && v.is_status == 0">{{$t("game48")}}</view>
											<view class="button btn--default" v-if="v.is_status == 1" style="background: #31b468 !important; border: 1px solid #31b468 !important;">{{$t("game59")}}</view>
											<view class="button btn--default" v-if="v.is_status == 2" style="background: #272323 !important; border: 1px solid #272323 !important;">{{$t("game58")}}</view>
										</view>
									</view>
									<view class="analy-item analy-item-tip">{{$t("game43")}}：{{$t("game44")}}</view>
								</view>
							</view>
							
							<view class="ana-togle" @click="analayToggle(item,index)">
								<view v-show="!item.isSubShow"><text>{{$t("game49")}}{{item.name}}{{$t("game51")}}</text><text class="iconfont icon-down"></text></view>
								<view v-show="item.isSubShow"><text>{{$t("game50")}}</text><text class="iconfont icon-up"></text></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--设置金额  -->
		<uni-popup ref="pricePopup" type="bottom">
			<view class="bs-popup">
				<view class="bs-popup-hd">{{$t("game7")}} <view class="iconfont icon-close" @click="close"></view>
				</view>
				<view class="bs-popup-body">
					<view class="popup-form">
						<uni-forms err-show-type="toast" ref="form1" :modelValue="formData" :rules="rules"
							:label-width="300" :border="false" labelPosition="top">
							<uni-forms-item name="firval" :label='$t("game3")'>
								<uni-easyinput type="number" v-model="formData.firval" :placeholder='$t("public4")' />
							</uni-forms-item>
							<uni-forms-item name="secval" :label='$t("game4")'>
								<uni-easyinput type="number" v-model="formData.secval" :placeholder='$t("public4")' />
							</uni-forms-item>
							<uni-forms-item name="thirdval" :label='$t("game5")'>
								<uni-easyinput type="number" v-model="formData.thirdval" :placeholder='$t("public4")' />
							</uni-forms-item>
						</uni-forms>
					</view>
					<view class="popup-btns flex-center">
						<view class="col">
							<button type="default" @click="close" class="btn btn--default-solid">{{$t("public5")}}</button>
						</view>
						<view class="col">
							<button type="default" @click="submit" class="btn btn--default">{{$t("public6")}}</button>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- footer 移动端 -->
		<view class="m-footer alalyst-active">
			<uniNavFooter fIndex="2"></uniNavFooter>
		</view>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import uniNavFooter from '@/components/uni-foot-bar/uni-foot-bar.vue'
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,uniNavFooter
		},
		data() {
			return {
				href: '',
				sideshow: false,
				indicatorDots: false,
				autoplay: false,
				circular: false,
				interval: 2000,
				duration: 500,
				curDot: 0,
				
				// 数值框
				gameValue:0,
				anaCur: 0,
				analystList:[],
				analystPList:[],
				analystFirst:[],
				analystRecord:[],
				formData: {
					firval: '',
					secval: '',
					thirdval: '',
				},
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
				},
				
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:this.$t('menu4')
			});
			this.getAnalyst();
		},
		onReachBottom() {},
		methods: {
			async getAnalyst(){
				uni.showLoading({
					mask:true,
					title: this.$t("loading")
				});
				let ret = await this.$u.api.analyst_p();
				if (ret) {
					this.analystFirst = ret.data[0];
					this.analystRecord = ret.data[0].record;
					this.analystList = ret.data;
					this.analystPList = ret.pdata;
				}
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			analayIntro(item,ind) {
				this.analystList.forEach(i => { 
					if (i.isIntroShow !== this.analystList[ind].isIntroShow) { 
						i.isIntroShow = false; 
					} 
				}); 
				item.isIntroShow = !item.isIntroShow; 
			},
			// tab
			tabchange(i) {
				this.cur = i
			},
			leftImg() {
				this.circular = false
				let num = this.analystPList.length - 1
				if (this.curDot <= 0) {
					this.circular = true
					this.curDot = num
				} else {
					this.curDot--
				}
			},
			rightImg() {
				this.circular = true
				let num = this.analystPList.length - 1
				if (this.curDot >= num) {
					this.curDot = 0
				} else {
					this.curDot++
				}
			},

			// 手机分析师
			analayToggle(item,ind) {
				this.analystList.forEach(i => { 
					if (i.isSubShow !== this.analystList[ind].isSubShow) { 
						i.isSubShow = false; 
					} 
				}); 
				item.isSubShow = ! item.isSubShow; 
			},
			// 弹窗
			open() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.pricePopup.open('center')
			},
			close() {
				this.$refs.pricePopup.close()
			},
			// 提交
			submit() {
				this.$refs.form1.validate().then(async res => {
					uni.showLoading({
						mask:true,
						title: this.$t("loading")
					});
					let ret = await this.$u.api.editquick_p({
						quick1:res.firval,
						quick2:res.secval,
						quick3:res.thirdval
					});
					if (ret) {
						this.getAnalyst();
						uni.hideLoading();
						this.close();
					}
				}).catch(err => {
					
				})
			},
			// 分析师点击头像
			swicthAnalyster(e,index){
				this.analystFirst = e;
				this.analystRecord = e.record;
			},
			selectChange(e){
				this.gameValue = e.detail.value
			},
			gameInput(e, index){
				this.gameValue = e.detail.value
				this.analystList[index].selectValue = -9   // 827
			},
			gameInputpc(e, index){
				this.gameValue = e.detail.value
				this.analystFirst.selectValue = -9   // 827
			},
			// 包赔跟投
			async baoTouClick(e, ar_id){				
				if(this.gameValue == 0){
					this.$u.toast(this.$t("game52"));
				}else{
					uni.showLoading({
						mask:true,
						title: this.$t("loading")
					});
					let ret = await this.$u.api.matchbuy_p({
						'ar_id': ar_id,
						'money': this.gameValue,
					});
					if (ret) {
						this.getUserInfo_common();
						this.$u.toast(this.$t(ret.msg));
					}
				}
			}
			
			
		}
	}
</script>

<style lang="scss">
	.analy-score {
		width: 130px;
		height: 118px;
		border-radius: 8px;
		background-repeat: no-repeat;
		background-size: cover;
	}
	
	// 9.22
	.ana-cell .bd{
		padding-right: 30rpx;
		position: relative;
	}
	.ana-cell .iconfont{
		font-size:14px;
	}
	.ana-cell .icon-down:before{
		float: right;
		margin: 2px 0;
		opacity: 0.5;
	}
	
	.ana-cell .icon-up:before{
		float: right;
		margin: 2px 0;
		opacity: 0.5;
	}
</style>
