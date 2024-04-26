<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader isback :title="$t('user27')" @clickLeft="menuClick"></uniNavHeader>
			<!-- sidebar -->
			<view class="sidebar" :class="sideshow?'is-show':''">
				<uniSideHeader nIndex="6"></uniSideHeader>
			</view>
			<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
			<!-- main -->
			<view class="bs-container">
				<view class="bs-content">
					<view class="add-bank-container" v-if="showDataEmtpe == 1">
						<view class="panel">
							<view class="bks-form ">
								<uni-forms err-show-type="toast" ref="form" :modelValue="formData" :rules="rules"
									:label-width="300" :border="false" labelPosition="top">
									<uni-forms-item class="label-mb10" name="bank_type" :label="$t('卡类型')">
										<select v-model="formData.bank_type" class="uni-combox-input"
											:placeholder="$t('卡类型')" :label-in-value="true" style="width: 100%;"
											@change="selectBankType" ref="addRequestBankType">
											<option v-for="(item, index) in paytype" :key="index" :value="item">
												{{$t(item)}}
											</option>
										</select>
									</uni-forms-item>
									<!-- 银行卡 添加 -->
									<uni-forms-item name="bname" :label="$t('user40')" v-if="isUsdt==0">
										<uni-easyinput type="text" v-model="formData.bname"
											:placeholder="$t('user41')" />
									</uni-forms-item>
									<uni-forms-item name="bselect" :label="$t('user42')" v-if="isUsdt==0">
										<uni-easyinput type="text" v-model="formData.bselect"
											:placeholder="$t('user421')" />
									</uni-forms-item>
									<uni-forms-item name="bnumbar" :label="$t('user43')" v-if="isUsdt==0">
										<uni-easyinput type="text" v-model="formData.bnumbar"
											:placeholder="$t('user44')" />
									</uni-forms-item>
									<uni-forms-item :label="$t('user47')" name="kaihuih"
										v-if="isBankOpen == 1 && isUsdt==0">
										<uni-easyinput type="text" v-model="formData.kaihuih"
											:placeholder="$t('请输入开户行')" />
									</uni-forms-item>
									<uni-forms-item :label="$t('金融代码')" name="financial"
										v-if="bankFinancial == 1 && isUsdt==0">
										<uni-easyinput type="text" v-model="formData.financial"
											:placeholder="$t('public4')" />
									</uni-forms-item>

									<!-- <view v-if="bankFinancial == 1 && isUsdt==0" class="u-p-b-20">
									<view>{{$t('金融代码')}}</view>
									<uni-easyinput type="text" v-model="formData.financial" :placeholder="$t('public4')" />
								</view> -->

									<!-- USDT 添加 -->
									<uni-forms-item name="usdt_address" :label="$t('收币地址')" v-if="isUsdt==1">
										<uni-easyinput type="text" v-model="formData.usdt_address"
											:placeholder="$t('public4')" />
									</uni-forms-item>
									<uni-forms-item name="usdt_type" :label="$t('链名称')" v-if="isUsdt==1">
										<select v-model="formData.usdt_type" class="uni-combox-input"
											:placeholder="$t('链名称')" :label-in-value="true" style="width: 100%;"
											@change="selectUsdtType" ref="addRequestUsdtType">
											<option v-for="(item, index) in usdtType" :key="index" :value="item">
												{{item}}
											</option>
										</select>
									</uni-forms-item>
									<!-- <uni-forms-item :label="$t('收币码')" v-if="isUsdt==1">
									<image :src="formData.usdt_qrcode" mode="" v-if="formData.usdt_qrcode"></image>
									<view class="select-price">
										<view class="price_item active" @click="updateQrcode()">{{$t('上传收币码')}}</view>
									</view>
								</uni-forms-item> -->
									<!-- 电子钱包添加 -->
									<uni-forms-item name="ele_name" :label="$t('开户名')" v-if="isUsdt==2">
										<uni-easyinput type="text" v-model="formData.ele_name"
											:placeholder="$t('public4')" />
									</uni-forms-item>
									<uni-forms-item name="ele_mber" :label="$t('钱包号码')" v-if="isUsdt==2">
										<uni-easyinput type="number" v-model="formData.ele_mber"
											:placeholder="$t('public4')" />
									</uni-forms-item>
									<!-- <uni-forms-item :label="$t('上传二维码')" v-if="isUsdt==2">
									<image :src="Ele" mode="" v-if="Ele"></image>
									<view class="select-price">
										<view class="price_item active" @click="qrcodeImageSelect()">{{$t('上传二维码')}}
										</view>
									</view>
								</uni-forms-item> -->
									<!-- PIX 添加 -->
									<uni-forms-item name="pix_name" :label="$t('开户名')" v-if="isUsdt==3">
										<uni-easyinput type="text" v-model="formData.pix_name"
											:placeholder="$t('public4')" />
									</uni-forms-item>
									<uni-forms-item name="pix_type" :label="$t('TIPO DE CHAVE')" v-if="isUsdt==3">
										<select v-model="formData.pix_type" class="uni-combox-input"
											:placeholder="$t('TIPO DE CHAVE')" :label-in-value="true"
											style="width: 100%;" @change="selectPixType" ref="addRequestPixType">
											<option v-for="(item, index) in pixType" :key="index" :value="item">
												{{$t(item)}}
											</option>
										</select>
									</uni-forms-item>
									<uni-forms-item name="pix_number" :label="$t('CHAVE PIX')" v-if="isUsdt==3">
										<uni-easyinput type="text" v-model="formData.pix_number"
											:placeholder="$t('public4')" />
									</uni-forms-item>
									<uni-forms-item name="withdrawal_psd" :label="$t('提现密码')"
										v-if="withdrawalStatus==1">
										<uni-easyinput maxlength=6 type="password" v-model="formData.withdrawal_psd"
											:placeholder="$t('请输入提现密码')" />
									</uni-forms-item>
									<!-- <uni-forms-item name="pix_sHao" :label="$t('税号')" v-if="isUsdt==3">
									<uni-easyinput type="text" v-model="formData.pix_sHao"
										:placeholder="$t('public4')" />
								</uni-forms-item> -->
								</uni-forms>
							</view>
						</view>
						<view class="space-foot-box">
							<button type="default" @click="submit" class="btn btn--submit">{{$t('public6')}}</button>
						</view>
					</view>
				</view>
			</view>
			<view class="u-withdrawal" v-if="setUserPwd">
				<u-modal v-model="setUserPwd" :confirm-text="$t('public6')" :content="$t('您还没设置提现密码')"
					confirm-color="var(--ui-color-dark)" @confirm="goSetPwd">
				</u-modal>
			</view>
		</view>
		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			pcBg
		},
		data() {
			return {
				href: '',
				sideshow: false,
				// 表单
				formData: {
					bank_type: '',
					bname: '',
					bselect: '',
					bnumbar: '',
					kaihuih: '',
					financial: '',
					usdt_address: '',
					usdt_type: '',
					usdt_qrcode: '',
					ele_name: '',
					ele_mber: '',
					pix_name: '',
					pix_type: '',
					pix_number: '',
					pix_sHao: '',
					withdrawal_psd: ''
				},
				isUsdt: 0,
				bank: [],
				paytype: [],
				usdtType: [],
				pixType: [],
				rules: {
					// 对name字段进行必填验证
					bname: {
						rules: [{
							required: true,
							errorMessage: this.$t('user41'),
						}, ]
					},
					bselect: {
						rules: [{
							required: true,
							errorMessage: this.$t('user421'),
						}, ]
					},
					bnumbar: {
						rules: [{
							required: true,
							errorMessage: this.$t('user44'),
						}, ]
					},
					financial: {
						rules: [{
							required: true,
							errorMessage: this.$t('请输入金融代码'),
						}, ]
					},
					kaihuih: {
						rules: [{
							required: true,
							errorMessage: this.$t('请输入开户行'),
						}, ]
					},
					usdt_address: {
						rules: [{
							required: true,
							errorMessage: this.$t('请输入收币地址'),
						}, ]
					},
					usdt_type: {
						rules: [{
							required: true,
							errorMessage: this.$t('请选择链名称'),
						}, ]
					},
					ele_name: {
						rules: [{
							required: true,
							errorMessage: this.$t('请输入开户名'),
						}, ]
					},
					ele_mber: {
						rules: [{
							required: true,
							errorMessage: this.$t('请输入钱包号码'),
						}, ]
					},
					pix_name: {
						rules: [{
							required: true,
							errorMessage: this.$t('请输入开户名'),
						}, ]
					},
					pix_type: {
						rules: [{
							required: true,
							errorMessage: this.$t('请选择类型'),
						}, ]
					},
					pix_number: {
						rules: [{
							required: true,
							errorMessage: this.$t('请输入PIX账号'),
						}, ]
					},
					pix_sHao: {
						rules: [{
							required: true,
							errorMessage: this.$t('请输入税号'),
						}, ]
					},
					withdrawal_psd: {
						rules: [{
							required: true,
							errorMessage: this.$t('请输入提现密码'),
						}]
					}
				},
				codeImageStyles: {
					width: 100,
					height: 100,
					border: {
						color: "#BBBBBB",
						width: 1,
						radius: '6px'
					}
				},
				qrcodeImage: [],
				Ele: '',
				bankFinancial: null,
				isBankOpen: null,
				withdrawalStatus: null,
				showDataEmtpe: null,
				setUserPwd: false,
			}
		},
		async onLoad() {
			await this.getbank();
			await this.rechargeparame();
		},
		async onShow() {
			await this.getWithdrawalStatus();
			uni.setNavigationBarTitle({
				title: this.$t('添加银行卡')
			});
		},
		methods: {
			getWithdrawalStatus() {
				this.withdrawalStatus = this.$helper.get('rule').bind_card_status;
				if (this.withdrawalStatus == 1) {
					if (!this.$helper.get('userInfo').withdrawal_psd) {
						this.setUserPwd = true;
					}
				}
			},
			goSetPwd() {
				this.$go('/pages/ucenter/profile?setpwd=' + true);
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async getbank() {
				uni.showLoading({
					title: this.$t('loading')
				})
				let ret = await this.$u.api.bankList_p();
				if (ret) {
					let paytype_obj = ret.data.paytype;
					if (paytype_obj) {
						this.showDataEmtpe = 1;
						uni.hideLoading();
					}
					let paytype_arr2 = [];
					let paytype_arr1 = [];
					let b = 0;
					for (var a in paytype_obj) {
						if (paytype_obj[a] != 'PIX') {
							paytype_arr2.push(paytype_obj[a])
						} else {
							b += 1;
							paytype_arr1.push(paytype_obj[a]);
						}
					}
					if (b > 0) {
						this.isUsdt = 3;
					}
					this.paytype = [...paytype_arr1, ...paytype_arr2];
					this.usdtType = ret.data.usdt_type;
					this.pixType = ret.data.pix_type;
					let keys = Object.keys(this.paytype);
					let key = keys[0];
					if (this.paytype[key] == "USDT") {
						this.isUsdt = 1;
					}
					this.formData.bank_type = this.paytype[key];
				}
			},
			selectBankType(e) {
				this.formData.bank_type = this.$refs.addRequestBankType.value;
				this.formData.withdrawal_psd = '';
				if (this.formData.bank_type == "USDT") {
					this.isUsdt = 1;
				} else if (this.formData.bank_type == "电子钱包") {
					this.isUsdt = 2;
				} else if (this.formData.bank_type == "PIX") {
					this.isUsdt = 3;
				} else {
					this.isUsdt = 0;
				}
			},
			selectUsdtType() {
				this.formData.usdt_type = this.$refs.addRequestUsdtType.value;
			},
			selectPixType() {
				this.formData.pix_type = this.$refs.addRequestPixType.value;
			},
			// 获取银行卡-金融代码状态
			async rechargeparame() {
				let res = await this.$u.api.rechargeparame_p();
				if (res) {
					this.bankFinancial = res.data.bank.financial_status;
					this.isBankOpen = res.data.is_bank_open;
				}
			},
			submit() {
				this.$refs.form.validate().then(async res => {
					let parm = {};
					if (res.bank_type == "USDT") {
						parm = {
							bank_type: 1,
							bank_name: res.usdt_type,
							bank_number: res.usdt_address,
							bank_open: this.formData.usdt_qrcode,
							bank_hm: res.usdt_type,
							withdrawal_psd: res.withdrawal_psd ? res.withdrawal_psd : ''
						};
					} else if (res.bank_type == "电子钱包") {
						parm = {
							bank_type: 2,
							bank_name: res.ele_name,
							bank_hm: res.ele_name,
							bank_number: res.ele_mber,
							bank_open: this.Ele,
							withdrawal_psd: res.withdrawal_psd ? res.withdrawal_psd : ''
						};
					} else if (res.bank_type == "PIX") {
						parm = {
							bank_type: 3,
							bank_name: res.pix_type,
							bank_hm: res.pix_name,
							bank_number: res.pix_number,
							financial: res.pix_sHao ? res.pix_sHao : '',
							withdrawal_psd: res.withdrawal_psd ? res.withdrawal_psd : ''
						};
					} else {
						parm = {
							bank_type: 0,
							bank_name: this.formData.bselect,
							bank_number: res.bnumbar,
							bank_open: res.kaihuih ? res.kaihuih : '',
							bank_hm: res.bname,
							financial: this.formData.financial,
							withdrawal_psd: res.withdrawal_psd ? res.withdrawal_psd : ''
						};
					}
					if (parm) {
						uni.showLoading({
							mask: true,
							title: this.$t("loading")
						});
						let ret = await this.$u.api.addBank_p(parm);
						if (ret.code == 1) {
							this.$u.toast(this.$t(ret.msg));
							// uni.navigateTo({
							// 	url: "/pages/ucenter/bankCard"
							// });
							this.common_back();
						} else {
							this.$u.toast(this.$t(ret.msg));
						}
					}
				}).catch(err => {

				})
			},
			qrcodeImageSelect() {
				let _self = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						uni.showLoading({
							mask: true,
							title: _self.$t("loading")
						});
						const tempFilePaths = res.tempFilePaths;
						const token = _self.$helper.get('token');
						const token_key = _self.$helper.get('token_key');
						const uploadTask = uni.uploadFile({
							url: _self.$u.api.path + '/upload/img',
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								'usertoken': token,
								'usertokenkey': token_key
							},
							success: async function(uploadFileRes) {
								let res = JSON.parse(uploadFileRes.data);
								if (res.code == 1) {
									_self.Ele = res.data.file;
									_self.$u.toast(_self.$t(res.msg));
								} else {
									_self.$u.toast(_self.$t(res.msg));
								}
							}
						});
					},
					error: function(e) {
						console.log(e);
					}
				});
			},
			updateQrcode() {
				let _self = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						uni.showLoading({
							mask: true,
							title: _self.$t("loading")
						});
						const tempFilePaths = res.tempFilePaths;
						const token = _self.$helper.get('token');
						const token_key = _self.$helper.get('token_key');
						const uploadTask = uni.uploadFile({
							url: _self.$u.api.path + '/upload/img',
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								'usertoken': token,
								'usertokenkey': token_key
							},
							success: async function(uploadFileRes) {
								let res = JSON.parse(uploadFileRes.data);
								if (res.code == 1) {
									_self.formData.usdt_qrcode = res.data.file;
									_self.$u.toast(_self.$t(res.msg));
								} else {
									_self.$u.toast(_self.$t(res.msg));
								}
							}
						});

						uploadTask.onProgressUpdate(function(res) {
							_self.percent = res.progress;
							/*console.log('上传进度' + res.progress);
							console.log('已经上传的数据长度' + res.totalBytesSent);
							console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);*/
						});
					},
					error: function(e) {
						console.log(e);
					}
				});
			},
		}
	}
</script>

<style lang="scss">

</style>
