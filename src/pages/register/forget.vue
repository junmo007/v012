<template>
	<view class="form-wrapper">
		<view class="form-main">
			<view class="form-head zBetween">
				<view class="tt">{{$t('register14')}}</view>
			</view>
			<view class="form-cells">
				<uni-forms err-show-type="toast" ref="form" :modelValue="formData" :rules="rules" :label-width="0" :border="false">
					<uni-forms-item   name="account">
						<uni-easyinput type="text" :clearable="false" v-model="formData.account" :placeholder="$t('register2')" />
						
					</uni-forms-item>
					<uni-forms-item class="form-item-hao" name="phone">
						<uni-easyinput type="text" v-model="formData.phone" :placeholder="$t('register12')" />
						<view class="label-icon" slot="left">
							<quSelect style="width:44px; border: 0;height: 26px;" ref="easySelect" size="mini" :value="selecQu"  @selectOne="selectQhao"  :options="quOptions"></quSelect>
						</view>
					</uni-forms-item>
					<uni-forms-item class="form-item-code" name="yzm">
						<uni-easyinput type="text" v-model="formData.yzm" :placeholder="$t('login4')" />
						
						<view class="link-code-box">
							<button v-show="show" type="default" @click="getCode" class="btn btn--text" style="font-size: 14px;">{{$t('register15')}}</button>
							<button v-show="!show" type="default" class="btn btn--text">{{count}} s</button>
						</view>
					</uni-forms-item>
					<uni-forms-item  name="pwd">
						<uni-easyinput type="password" v-model="formData.pwd" :placeholder="$t('register3')" />
						
					</uni-forms-item>
					<uni-forms-item  name="repwd">
						<uni-easyinput type="password" v-model="formData.repwd" :placeholder="$t('register10')" />
						
					</uni-forms-item>
				</uni-forms>
				
				<view class="form-footer">
					<button @click="submit" class="btn btn--default">{{$t('register14')}}</button>
					<view class="form-link">{{$t("register8")}}？<navigator url="/pages/login/index" class="text-red">{{$t("login")}}</navigator></view>
				</view>
			</view>
		</view>
		<!-- <view class="form-tip">
			<navigator url="/pages/ucenter/kefu">如有任何疑问，请联系客服</navigator>
		</view> -->
		<upd></upd>
	</view>
</template>

<script>
	import upd from '@/components/upd/upd.vue'
	import easySelect from "@/components/easy-language/easy-select.vue"
	import quSelect from "@/components/easy-select/easy-select.vue"
	export default {
		components: {easySelect,quSelect},
		data() {
			return {
				// 验证
				formData: {
					account: '',
					phone: '',
					yzm: '',
					pwd: '',
					repwd: '',
				},
				rules: {
					// 对name字段进行必填验证
					account: {
						rules: [{
								required: true,
								errorMessage: this.$t('login2'),
							},
						]
					},
					phone: {
						rules: [{
								required: true,
								errorMessage: this.$t('register12'),
							},
						]
					},
					yzm: {
						rules: [{
								required: true,
								errorMessage: this.$t('login4'),
							},
						]
					},
					pwd: {
						rules: [{
								required: true,
								errorMessage: this.$t("login3"),
							},
						]
					},
					repwd: {
						rules: [{
								required: true,
								errorMessage: this.$t("register10"),
							},
						]
					},
					
				},
				selecValue: 'CN',
				iconV: '../../static/images/cn.png',
				// 区号
				selecQu: this.$helper.get('idc_default'),
				quOptions:[],
				show: true,
			   count: '',
			   timer: null,
			}
		},
		onLoad(){
			uni.setNavigationBarTitle({
				title:this.$t('register14')
			});
			let idc = this.$helper.get('idc');
			for (let i = 0; i < idc.length; i++) {
				this.quOptions.push(idc[i]);
			}
		},
		methods: {
			// 提交
			submit() {
				this.$refs.form.validate().then(async res => {
					uni.showLoading({
						mask:true,
						title: this.$t("loading"),
					});
					if(res.pwd == res.repwd){
						let ret = await this.$u.api.forget_p({
							username:res.account,
							phone:res.phone,
							password:res.pwd,
							vcode:res.yzm,
						});
						
						if(ret.code == 1){
							this.$u.toast(this.$t(ret.msg));
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/login/index'
								});
							}, 1000);
						}else{
							this.$u.toast(this.$t(ret.msg));
						}
					}else{
						this.$u.toast(this.$t("register13"));
					}					
				}).catch(err => {
					
				})
			},
			async getCode(){
				const TIME_COUNT = 60;
				let phone= this.formData.phone;
				if(phone){
					let ret = await this.$u.api.sendcode_p({
						phone:phone,
						areacode:this.selecQu
					});
					if (ret.code == 1) {
						if (!this.timer) {
							this.count = TIME_COUNT;
							this.show = false;
							this.timer = setInterval(() => {
								if (this.count > 0 && this.count <= TIME_COUNT) {
									this.count--;
								} else {
									this.show = true;
									clearInterval(this.timer);
									this.timer = null;
								}
							}, 1000)
						}
					}else{
						this.$u.toast(this.$t(ret.msg));
					}					
				}else{
					this.$u.toast(this.$t("user18"));
				}
			},
			switch1Change: function (e) {
			},
			selectOne(options) {
				this.$helper.setLang(options.label);
				this.$i18n.locale = options.label;
				this.selecValue = options.label
				this.iconV = options.icon
			},
			selectQhao(options) {
				this.selecQu = options.label
			},
		}
	}
</script>

<style lang="scss">
	.form-wrapper{
		position: relative;
		background-image: var(--loginRegister-bg-md);
		background-position: bottom;
		background-size: cover;
		background-repeat: no-repeat;
		min-height: 100vh;
		padding-right: 16px;
		padding-left: 16px;
		padding-top: 120px;
		padding-bottom: 120px;
	}
	@media (min-width:750px) {
		.form-wrapper{
			background-image: var(--loginRegister-bg);
			background-size: cover;
		}
	}
	.sw-agrement{
		margin-bottom: 15px;
	}
	.link-code-box .btn--text{
		margin: 3px 0;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
</style>
