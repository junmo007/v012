<template>
	<view>
		<view class="content" :data-theme="themeMode">
			<view class="container">
				<uniNavHeader :title="$t('实名验证')" :profile="false" isback></uniNavHeader>
				<view class="bs-wrapper">
					<view class="user-profile-panel u-p-20 u-m-b-30">
						<view class="u-m-b-20">
							<text>{{$t('请输入您的姓名')}}</text>
							<text style="color: #D12C2C;">*</text>
						</view>
						<view class="form-cell_row u-flex u-m-b-30">
							<uni-easyinput class="" type="text" v-model="formData.real_name" :styles="styles" />
						</view>
						<view class="u-m-b-20 u-m-t-30">
							<text>{{$t('证件类型')}}</text>
							<text style="color: #D12C2C;">*</text>
						</view>
						<view class="certifica-cell u-flex u-row-between u-p-l-20 u-p-r-20"
							@click="certificaType = true">
							<view>{{selectStatus}}</view>
							<view class="iconfont icon-sj-down u-font-xs u-m-l-10" style="color: #D1CCE9;"></view>
						</view>
						<view class="u-m-b-20 u-m-t-30">
							<text>{{$t('证件号')}}</text>
							<text style="color: #D12C2C;">*</text>
						</view>
						<view class="form-cell_row u-flex u-m-b-30">
							<uni-easyinput class="" type="text" v-model="formData.licenseNumber" :styles="styles" />
						</view>
					</view>
					<view class="viewExamples" @click="$go('/pages/ucenter/bindCertifyPwdExamples')">{{$t('查看示例')}}
					</view>
					<view class="fm_class">
						<u-upload upload-text="" :multiple="false" max-count="1" :header="uploadHeader" ref="front"
							:source-type="['album', 'camera']" :action="action" :deletable="false"
							@clear="uploadClear" :show-progress="false" @on-change="onChangeUpload"
							@on-choose-complete="onChange" :custom-btn="true">
							<view slot="addBtn" class="sc_img_1 u-flex flex--direction">
								<u-image width="24px" height="24px" :src="pz_img_1">
									<u-loading slot="loading"></u-loading>
								</u-image>
								<view class="upload-text u-m-t-20">{{$t('正面')}}</view>
							</view>
						</u-upload>
						<view class="u-flex u-row-around" v-if="pz_img_2">
							<view class="u-flex" @click="onClearChange">
								<u-image width="20px" height="20px" :src="pz_img_1">
									<u-loading slot="loading"></u-loading>
								</u-image>
								<view class="u-m-l-10">{{$t('重拍')}}</view>
							</view>
							<view class="u-flex" @click="onClearZm">
								<u-image width="20px" height="20px" :src="pz_img_4">
									<u-loading slot="loading"></u-loading>
								</u-image>
								<view class="u-m-l-10">{{$t('删除')}}</view>
							</view>
						</view>
					</view>
					<template v-if="tradingKey == 3 || tradingKey == 4">
						<!-- <view class="fm_class">
							<u-upload upload-text="" :multiple="false" max-count="1" :header="uploadHeader"
								ref="reverseSide" :source-type="['album', 'camera']" del-bg-color="#644CBC"
								:action="action" :show-progress="false" @on-success="onChangeUpload_fm"
								@on-progress="onChange" :custom-btn="true">
								<view slot="addBtn" class="sc_img_1 u-flex flex--direction">
									<u-image width="24px" height="24px" :src="pz_img_1">
										<u-loading slot="loading"></u-loading>
									</u-image>
									<view class="upload-text u-m-t-20">{{$t('反面')}}</view>
								</view>
							</u-upload>
						</view> -->
						<view class="fm_class u-m-t-30">
							<u-upload upload-text="" :multiple="false" max-count="1" :header="uploadHeader" ref="reverseSide"
								:source-type="['album', 'camera']" :action="action" :deletable="false"
								@clear="uploadClear" :show-progress="false" @on-change="onChangeUpload_fm"
								@on-progress="onChange" :custom-btn="true">
								<view slot="addBtn" class="sc_img_1 u-flex flex--direction">
									<u-image width="24px" height="24px" :src="pz_img_1">
										<u-loading slot="loading"></u-loading>
									</u-image>
									<view class="upload-text u-m-t-20">{{$t('反面')}}</view>
								</view>
							</u-upload>
							<view class="u-flex u-row-around" v-if="pz_img_3">
								<view class="u-flex" @click="onClearChangeFm">
									<u-image width="20px" height="20px" :src="pz_img_1">
										<u-loading slot="loading"></u-loading>
									</u-image>
									<view class="u-m-l-10">{{$t('重拍')}}</view>
								</view>
								<view class="u-flex" @click="onClearFm">
									<u-image width="20px" height="20px" :src="pz_img_4">
										<u-loading slot="loading"></u-loading>
									</u-image>
									<view class="u-m-l-10">{{$t('删除')}}</view>
								</view>
							</view>
						</view>
					</template>
					<view class="u-m-t-30" v-if="realNameTips">{{$t('RealNameVerificationSecurityTips')}}</view>
					<view class="pu-foot">
						<view class="btn btn--submit m-font-b editInfoBtn" @click="bankUserRealName"
							:class="formData.real_name.length > 0?'active-btn':''">{{$t('public6')}}
						</view>
					</view>
					<view style="height: 200px;"></view>
				</view>
			</view>
		</view>
		<u-popup v-model="certificaType" mode="bottom" borderRadius="32">
			<view class="bs-popup-hd">
				<view class="tt">
					{{$t('请选择')}}
				</view>
				<image src="@/static/images/index/close.png"
					style="width: 32px;height: 32px;position: absolute;right: 15px;" mode=""
					@click="certificaType = false">
				</image>
			</view>
			<view class="bs-popup-bd">
				<view class="filter-cell" v-for="(item,index) in caterange" :key="`caterange${index}`"
					@click="catechange(item.value,item.text)">
					<view class="u-flex u-row-between">
						<view>{{item.text}}</view>
						<view class="iconfont icon-dui text-yellow" v-if="tradingKey == item.value"></view>
					</view>
				</view>
				<view style="height: 30px;"></view>
			</view>
		</u-popup>
		<uni-popup ref="tipShow" type="bottom">
			<view class="uc-pop">
				<view class="u-p-40 pop-bottom">
					<view class="u-flex u-row-center flex--direction">
						<image src="@/static/images/dw/su.png" style="width: 88px;height: 88px;" mode=""></image>
						<view class="u-p-t-20 u-p-b-20">{{$t('身份证明文件已发送')}}</view>
						<view class="u-m-t-20 u-c-9">{{$t('请等待验证')}}</view>
						<view class="w_100 btn--submit u-text-center u-p-30 u-m-t-30" @click="keepTipClose">
							<view class="m-line-1 m-font-18">{{$t('确定')}}</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
		</u-top-tips>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import quSelect from "@/components/easy-select/easy-select.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			quSelect,
		},
		data() {
			return {
				formData: {
					real_name: '',
					licenseNumber: ''
				},
				styles: {
					color: '#ffffff',
					borderColor: 'transparent',
					borderRadius: "0",
					boxShadow: 'var(--shadow-bg)'
				},
				certificaType: false,
				selectStatus: this.$t('国内护照'),
				tradingKey: 1,
				caterange: [{
						value: 1,
						text: this.$t('国内护照')
					},
					{
						value: 2,
						text: this.$t('国际护照')
					},
					{
						value: 3,
						text: this.$t('驾驶证')
					},
					{
						value: 4,
						text: this.$t('居留许可证')
					}
				],
				uploadHeader: {},
				action: '',
				pz_img_1: "../../static/images/ucenter/add2.png",
				pz_img_4: "../../static/images/ucenter/del.png",
				pz_img_2: '',
				pz_img_3: '',
				realNameTips: false
			}
		},
		onLoad() {
			var token = this.$helper.get('token');
			var token_key = this.$helper.get('token_key');
			this.uploadHeader.usertoken = token;
			this.uploadHeader.usertokenkey = token_key;
			this.action = process.env.VUE_APP_API_BASE_URL + '/upload/img';
			this.getRealNameTips();
			uni.setNavigationBarTitle({
				title: this.$t('实名验证')
			});
		},
		methods: {
			// 安全提示
			getRealNameTips() {
				if (this.$t('RealNameVerificationSecurityTips') != 'RealNameVerificationSecurityTips') {
					this.realNameTips = true;
				} else {
					this.realNameTips = false;
				}
			},
			onChange() {
				uni.showLoading({
					title: this.$t('上传中请稍等')
				})
			},
			keepTipClose(){
				this.$refs.tipShow.close();
			},
			onChangeUpload(res, index, lists, name) {
				uni.hideLoading();
				this.pz_img_2 = lists[0].response.data.file;
			},
			onClearChange(){
				this.pz_img_2 = '';
				this.$refs.front.clear();
				this.$refs.front.selectFile();
			},
			onClearZm(){
				this.pz_img_2 = '';
				this.$refs.front.clear();
			},
			onClearChangeFm(){
				this.pz_img_3 = '';
				this.$refs.reverseSide.clear();
				this.$refs.reverseSide.selectFile();
			},
			onClearFm(){
				this.pz_img_3 = '';
				this.$refs.reverseSide.clear();
			},
			onChangeUpload_fm(res, index, lists, name) {
				uni.hideLoading();
				this.pz_img_3 = lists[0].response.data.file;
			},
			catechange(e, i) {
				this.selectStatus = i;
				this.tradingKey = e;
				this.certificaType = false;
			},
			uploadChange(e){
				console.log(e);
			},
			// 绑定姓名
			async bankUserRealName() {
				if (this.tradingKey == 3 || this.tradingKey == 4) {
					if (this.formData.real_name == '' || this.formData.licenseNumber == '' || this.pz_img_2 == '' ||
						this.pz_img_3 == '') {
						this.$refs.uTips.show({
							title: this.$t('请完善信息')
						});
						return
					}
				} else {
					if (this.formData.real_name == '' || this.formData.licenseNumber == '' || this.pz_img_2 == '') {
						this.$refs.uTips.show({
							title: this.$t('请完善信息')
						});
						return
					}
				}
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.useredit_p({
					autonym_name: this.formData.real_name,
					autonym_type: this.tradingKey,
					autonym_code: this.formData.licenseNumber,
					autonym_cover_is: this.pz_img_2,
					autonym_cover_the: this.pz_img_3
				});
				uni.hideLoading();
				if (res && res.code == 1) {
					this.formData.real_name = '';
					this.formData.licenseNumber = '';
					this.pz_img_2 = '';
					this.pz_img_3 = '';
					this.$refs.front.clear();
					if (this.tradingKey == 3 || this.tradingKey == 4) {
						this.$refs.reverseSide.clear();
					}
					this.$refs.tipShow.open();
					await this.getUserInfo_common();
					// setTimeout(() => {
					// 	this.common_back();
					// }, 3000);
				} else {
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	.phoneCodeBtn {
		min-width: 100px;
		padding: 0 10px;
		font-weight: bold;
		background: #E9AE3A;
		color: #FFFFFF;
		height: 34px;
		border-radius: 10px;
		margin-right: 10px;
	}

	.pu-foot {
		position: fixed;
		left: 0;
		right: 0;
		padding: 15px 15px 30px 15px;
		z-index: 22;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pu-foot .btn {
		height: 50px;
		line-height: 50px;
		width: 100%;
	}

	.form-cell_row {
		background-color: #1E1739;
		border: 1px solid #644CBC;
		border-radius: 15px;
		height: 54px;
	}

	.filter-cell {
		padding: 16px;
		border-bottom: 1px solid #4c4882;
	}


	.certifica-cell {
		background-color: #1E1739;
		border: 1px solid #644CBC;
		border-radius: 15px;
		height: 54px;
	}

	.sc_img_1 {
		margin: 20px auto;
		width: 245px;
		height: 150px !important;
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		background: rgba(49, 43, 79, 1);
	}

	.fm_class {
		width: 100%;
		height: 230px;
		border-radius: 16px;
		background: rgba(49, 43, 79, 1);
		border: 1px dashed rgba(65, 61, 113, 1);
	}

	.fm_class ::v-deep .u-list-item {
		margin: 20px 18%;
		height: 140px !important;
		border-radius: 10px !important;
	}

	.fm_class ::v-deep .u-upload {
		justify-content: center;
	}

	.viewExamples {
		width: 100%;
		font-size: 16px;
		text-align: center;
		margin-bottom: 15px;
		border-radius: 12px;
		padding: 12px 20px;
		background: rgba(100, 76, 188, 1);
	}
</style>
