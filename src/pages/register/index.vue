<template>
	<view>
		<template v-if="!mobile_common">
			<view class="log-bg">
				<view class="fell-form">
					<!-- <image :src="$t('headerLeftImg')" class="loginHeaderImg"></image> -->
					<view class="u-flex backHomeBtn" @click="$go('/pages/login/index')">
						<text class="iconfont icon-close"></text>
					</view>
					<view class="condition" :style="!isPwd?'display: none':''">
						<view class="one">
							<view class="horn"></view>
							<view class="m-font-b">{{$t('最低要求')}}</view>
							<view class="u-flex u-m-t-16">
								<view class="dian"></view>
								<view class="m-font-12 u-c-9 u-m-l-10">{{$t('MinimumRequirementsText1')}}</view>
							</view>
							<view class="u-flex u-m-t-16">
								<view class="dian"></view>
								<view class="m-font-12 u-c-9 u-m-l-10">{{$t('MinimumRequirementsText2')}}</view>
							</view>
							<view class="u-flex u-m-t-16">
								<view class="dian"></view>
								<view class="m-font-12 u-c-9 u-m-l-10">{{$t('MinimumRequirementsText3')}}</view>
							</view>
						</view>
						<!-- <view class="two">
							<view class="m-font-b">{{$t('建议')}}</view>
							<view class="u-flex u-m-t-16">
								<view class="dian"></view>
								<view class="m-font-12 u-c-9 u-m-l-10">{{$t('SuggestionText1')}}</view>
							</view>
							<view class="u-flex u-m-t-16">
								<view class="dian"></view>
								<view class="m-font-12 u-c-9 u-m-l-10">{{$t('SuggestionText2')}}</view>
							</view>
							<view class="u-flex u-m-t-16">
								<view class="dian"></view>
								<view class="m-font-12 u-c-9 u-m-l-10">{{$t('SuggestionText3')}}</view>
							</view>
						</view> -->
					</view>
					<view class="left">
						<left></left>
					</view>
					<view class="right">
						<view>
							<view class="u-flex u-row-between u-m-b-30">
								<view class="left-title ">
									<view class="u-font-64">{{$t('欢迎注册')}} 👋</view>
								</view>
								<!-- <view class="pc-login">
									<easySelect ref="easySelect" size="header" :value="selecValue" :icon="iconV"
										@selectOne="selectOne"></easySelect>
								</view> -->
							</view>
							<!-- <view class="login-tabs">
								<view class="login-tabs-item" @tap.stop="$go('/pages/login/index')">{{$t('login')}}
								</view>
								<view class="login-tabs-item active">{{$t('register')}}</view>
							</view> -->
							<uni-forms err-show-type="toast" ref="form" :modelValue="formData" :rules="rules"
								:border="false" label-position="top" :label-width="300">
								<!-- <view class="iconfont icon-guanbi2 pwd-error"
									:style="(isStr&&isNumber&&lensix)||isLoad?'display: none':''"></view> -->
								<uni-forms-item name="account" :label="$t('用户名')">
									<uni-easyinput type="text" v-model="formData.account" :placeholder='$t("register2")'
										:styles="stylesPc" />
								</uni-forms-item>
								<uni-forms-item name="pwd" class="m-rela" :label="$t('密码')">
									<uni-easyinput type="password" v-model="formData.pwd" :placeholder='$t("register3")'
										:styles="stylesPc" @input="pwdInput" @focus="focusPwd" @blur="blurPwd"
										:class="(isStr&&isNumber&&lensix)||isLoad?'':'noTestPwd'"
										style="border-radius: 50px;" />
								</uni-forms-item>
								<!-- 推广码 -->
								<uni-forms-item name="tcode" v-show="promotion_code == 1" :label="$t('register5')">
									<!-- <view class="iconfont icon-yzm"></view> -->
									<uni-easyinput type="text" v-model="formData.tcode" :disabled="tcodeDisable"
										:placeholder='$t("register5")' :styles="stylesPc" />
								</uni-forms-item>
								<!-- phone -->
								<view class="m-rela" v-show="phone_bind == 1">
									<!-- <view class="u-abso" style="top: 8px;left: 0;">{{$t('register6')}}</view> -->
									<uni-forms-item class="form-item-hao form-item-pc-phone" name="phone"
										:label="$t('register6')">
										<uni-easyinput type="number" v-model="formData.phone"
											:placeholder='$t("register6")' :styles="stylesPc" />
										<!-- <view class="label-icon" slot="left"> -->
										<view style="position: absolute;top: 0;left: 10px;" class="u-flex">
											<image :src="selecQuIcon" style="width: 20px;height: 14px;"></image>
											<quSelect style="width:62px; border: 0;height: 46px;color:#ffffff; "
												ref="easySelect" size="mini" :value="''+selecQu" @selectOne="selectQhao"
												:options="quOptions"></quSelect>
										</view>
										<!-- </view> -->
									</uni-forms-item>
								</view>
								<!-- 发送手机验证码 -->
								<uni-forms-item name="phoneCode" style="position: relative;z-index: 10;"
									:label="$t('验证码')" v-if="phone_check == 1 && phone_bind == 1">
									<view class="u-flex form-item-pc-icon">
										<view class="iconfont icon-yzm"></view>
										<uni-easyinput :clearable="false" type="number" v-model="formData.phoneCode"
											:styles="stylesPc" :placeholder="$t('login4')" />
										<u-button @tap="getPhoneCode" type="error" class="u-m-l-30 btn btn--default"
											style="height: 46px;">
											{{$t(registText)}}
										</u-button>
										<u-verification-code seconds="60" ref="registCode" @change="phoneCodeChange"
											:start-text="$t('获取验证码')" :end-text="$t('rep_sned')" change-text="XS">
										</u-verification-code>
									</view>
								</uni-forms-item>
								<!-- 图片验证码 -->
								<uni-forms-item class="form-item-code" name="yzm"
									:label="$t('Picture verification code')" v-if="code_check == 1 || code_check == 3">
									<!-- <view class="iconfont icon-yzm"></view> -->
									<image src="@/static/images/pc/login/yzm.png" class="login-icon" mode=""
										style="width: 14px;height: 16px;"></image>
									<uni-easyinput type="number" :clearable="false" v-model="formData.yzm"
										:placeholder='$t("login4")' :styles="stylesPc" />
									<view class="link-code-box flex-center" v-if="captcha">
										<view class="link-code cur_pointer">
											<image :src="captcha" mode="" @click="ucaptcha"
												style="width: 100px;height: 30px;" />
										</view>
										<image src="@/static/images/index/new_data.png" class="yzm-class"
											:class="yzm_img?'up-data':''" @click="ucaptcha" v-if="captcha"></image>
									</view>
								</uni-forms-item>
								<!-- 邮箱 -->
								<uni-forms-item name="email" v-if="phone_bind == 2" :label="$t('邮箱')">
									<!-- <view class="iconfont icon-em"></view> -->
									<image src="@/static/images/pc/login/email.png" class="login-icon" mode=""
										style="width: 16px;height: 18px;"></image>
									<uni-easyinput type="text" v-model="formData.email" :placeholder="$t('请输入邮箱')"
										:styles="stylesPc" />
								</uni-forms-item>
								<!-- 发送邮箱验证码 -->
								<uni-forms-item name="emailCode" :label="$t('验证码')"
									style="position: relative;z-index: 10;" v-if="phone_check == 1 && phone_bind == 2">
									<view class="u-flex">
										<!-- <view class="iconfont icon-yzm"></view> -->
										<image src="@/static/images/pc/login/yzm.png" class="login-icon" mode=""
											style="width: 14px;height: 16px;"></image>
										<uni-easyinput :clearable="false" type="number" v-model="formData.emailCode"
											:styles="stylesPc" :placeholder="$t('login4')" />
										<u-button @tap="getMailCode" type="error" class="u-m-l-30 btn-get-code "
											style="background: linear-gradient(var(--btn-submit-bg-1), var(--btn-submit-bg-2))!important;color: #FFFFFF;height: 36px;border: 0;">
											{{$t(emailText)}}
										</u-button>
										<u-verification-code seconds="60" ref="mailCodeKey" @change="emailCodeChange"
											:start-text="$t('获取验证码')" :end-text="$t('rep_sned')" change-text="XS">
										</u-verification-code>
									</view>
								</uni-forms-item>
							</uni-forms>
							<view class="sw-agrement">
								<label class="flex skin-text">
									<checkbox color="var(--blue-color)" style="transform:scale(0.8)" value="cb"
										checked="true" />
									{{$t("register9")}}
								</label>
								<view @click="openX()" class="blue-color u-m-l-48">
									<<{{$t("register7")}}>>
								</view>
							</view>
							<view class="form-footer">
								<u-button @click="isStr&&isNumber&&lensix?submit():''" size="large" class="btn"
									:class="isStr&&isNumber&&lensix ?'btn--submit':'no-btn-default'"
									:throttle-time="1000">{{$t("register")}}</u-button>
							</view>
							<!-- <view class="u-flex u-row-center w_100 skin-text u-text-center u-m-t-40 u-m-b-40">
								<text class="iconfont icon-kefu5 blue-color u-m-r-8"></text>
								<navigator @click="toRescue" class="blue-color">{{$t("Online customer service")}}
								</navigator>
							</view> -->
							<view class="thirdClass-label u-text-center u-m-t-30 u-m-b-20">
								<text class="text-light">{{$t("第三方登陆")}}</text>
							</view>
							<view class="pc-thirdClass u-flex  ">
								<view class="col" v-for="(item, index) in third_login" :class="index > 0 ? '' : ''"
									:key="`third_login${index}`">
									<view class="thirdClass-card"
										@click="get_third_login_url(item.id,item.third_sys_sign)">
										<image :src="item.icon" style="width: 50rpx;height: 50rpx;" class="cur_pointer">
										</image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content" :data-theme="themeMode">
				<view class="form-wrapper">
					<view class="form-main">
						<image src="@/static/images/index/close.png" @click="no_Login"
							style="width: 32px;height:32px;right: 15px;top: 25px;position: absolute;z-index: 1099;">
						</image>
						<view class="form-cells">
							<view class="form-cells-item">
								<view class="u-flex u-row-between u-m-t-20 u-col-top">
									<view class="m-font-32 m-font-b max-w_60">{{$t('欢迎注册')}}</view>
									<easySelect ref="easySelect" size="header" :value="selecValue" :icon="iconV"
										class="u-m-t-20" @selectOne="selectOne"></easySelect>
								</view>
								<view class="u-flex u-row-center u-m-t-30">
									<view>{{$t('您有账户吗')}}</view>
									<view class="text-yellow" @click="$go('/pages/login/index')">{{$t('登录')}}</view>
								</view>
								<view @tap="testClick" style="height: 15px;"></view>
								<uni-forms err-show-type="toast" ref="form" :modelValue="formData" :rules="rules"
									:border="false">
									<view class="u-m-b-16 u-m-t-30">
										<text>{{$t('用户名')}}</text>
										<text style="color: #D12C2C;">*</text>
									</view>
									<uni-forms-item name="account">
										<uni-easyinput type="text" v-model="formData.account" :styles="styles" />
									</uni-forms-item>
									<uni-forms-item name="pwd" class="m-rela">
										<view class="u-m-b-16 u-m-t-20">
											<text>{{$t('密码')}}</text>
											<text style="color: #D12C2C;">*</text>
										</view>
										<uni-easyinput type="password" v-model="formData.pwd" :styles="styles"
											@input="pwdInput" @focus="focusPwd" @blur="blurPwd"
											:class="(isStr&&isNumber&&lensix)||isLoad?'':'noTestPwd'"
											style="border-radius: 50px;" />
										<!-- 密码条件 -->
										<template v-if="isPwd">
											<view class="u-abso" style="left: 0;right: 35px;bottom: 10px;">
												<view class="u-flex tip-flex u-m-t-20 u-p-l-30 u-p-r-30">
													<view class="Simple" v-if="isNumber&&!isStr&&!lensix">
														<view class="u-m-b-10 u-text-center">{{$t('LOW')}}</view>
														<view class="u-flex">
															<view class="line1 u-m-r-12"></view>
															<view class="line2 u-m-r-12"></view>
															<view class="line3"></view>
														</view>
													</view>
													<view class="intermediate" v-if="isStr&&isNumber&&!lensix">
														<view class="u-m-b-10 u-text-center">{{$t('MID')}}</view>
														<view class="u-flex">
															<view class="line1 u-m-r-12"></view>
															<view class="line2 u-m-r-12"></view>
															<view class="line3"></view>
														</view>
													</view>

													<view class="intermediate" v-if="!isStr&&isNumber&&lensix">
														<view class="u-m-b-10 u-text-center">{{$t('MID')}}</view>
														<view class="u-flex">
															<view class="line1 u-m-r-12"></view>
															<view class="line2 u-m-r-12"></view>
															<view class="line3"></view>
														</view>
													</view>

													<view class="advanced" v-if="lensix&&isStr&&isNumber">
														<view class="u-m-b-10 u-text-center">{{$t('MID')}}</view>
														<view class="u-flex">
															<view class="line1 u-m-r-12"></view>
															<view class="line2 u-m-r-12"></view>
															<view class="line3"></view>
														</view>
													</view>
												</view>
											</view>
										</template>
									</uni-forms-item>
									<!-- 推广码 -->
									<template v-if="promotion_code == 1">
										<uni-forms-item name="tcode">
											<view class="u-m-b-16 u-m-t-20">
												<text>{{$t('register5')}}</text>
												<text style="color: #D12C2C;">*</text>
											</view>
											<uni-easyinput type="text" v-model="formData.tcode" :disabled="tcodeDisable"
												:styles="styles" />
										</uni-forms-item>
									</template>
									<!-- phone -->
									<template v-if="phone_bind == 1 || phone_bind == 2">
										<view class="m-rela">
											<uni-forms-item class="form-item-hao form-item-phone" name="phone">
												<view class="u-m-b-16 u-m-t-20">
													<text>{{$t('register6')}}</text>
													<text style="color: #D12C2C;">*</text>
												</view>
												<uni-easyinput type="number" v-model="formData.phone"
													:styles="styles" />
												<view class="label-icon" slot="left">
													<image :src="selecQuIcon" style="width: 20px;height: 14px;"></image>
													<quSelect class="quSelectM" ref="easySelect" size="mini"
														:value="''+selecQu" @selectOne="selectQhao"
														:options="quOptions">
													</quSelect>
												</view>
											</uni-forms-item>
										</view>
									</template>
									<!-- 发送手机验证码 -->
									<template v-if="phone_check == 1 && phone_bind == 1">
										<uni-forms-item name="phoneCode" style="position: relative;z-index: 10;">
											<view class="u-m-b-16 u-m-t-20">
												<text>{{$t('验证码')}}</text>
												<text style="color: #D12C2C;">*</text>
											</view>
											<view class="u-flex">
												<uni-easyinput :clearable="false" type="number"
													v-model="formData.phoneCode" :styles="styles" />
												<u-button @tap="getPhoneCode" type="error"
													class="u-m-l-30 btn btn--default" style="height: 50px;">
													{{$t(registText)}}
												</u-button>
												<u-verification-code seconds="60" ref="registCode"
													@change="phoneCodeChange" :start-text="$t('获取验证码')"
													:end-text="$t('rep_sned')" change-text="XS">
												</u-verification-code>
											</view>
										</uni-forms-item>
									</template>
									<!-- 图片验证码 -->
									<template v-if="code_check == 1 || code_check == 3">
										<uni-forms-item class="form-item-code" name="yzm">
											<view class="u-m-b-16 u-m-t-20">
												<text>{{$t('Picture verification code')}}</text>
												<text style="color: #D12C2C;">*</text>
											</view>
											<uni-easyinput type="number" :clearable="false" v-model="formData.yzm"
												:styles="styles" />
											<view class="link-code-box flex-center" v-if="captcha">
												<view class="link-code" v-if="captcha">
													<image :src="captcha" mode=""
														style="width: 100px;height: 46px;border-radius: 13px;"
														@click="ucaptcha" />
												</view>
											</view>
										</uni-forms-item>
									</template>
									<!-- 邮箱 -->
									<template v-if="phone_bind == 2 || phone_bind == 1">
										<uni-forms-item name="email">
											<view class="u-m-b-16 u-m-t-20">
												<text>{{$t('邮箱')}}</text>
												<text style="color: #D12C2C;">*</text>
											</view>
											<uni-easyinput type="text" v-model="formData.email" :styles="styles" />
										</uni-forms-item>
									</template>
									<!-- 发送邮箱验证码 -->
									<template v-if="phone_check == 1 && phone_bind == 2">
										<uni-forms-item name="emailCode" style="position: relative;z-index: 10;">
											<view class="u-m-b-16 u-m-t-20">
												<text>{{$t('验证码')}}</text>
												<text style="color: #D12C2C;">*</text>
											</view>
											<view class="u-flex">
												<uni-easyinput :clearable="false" type="number"
													v-model="formData.emailCode" :styles="styles" />
												<u-button @tap="getMailCode" type="error" class="u-m-l-30 btn-get-code "
													style="background: linear-gradient(var(--btn-submit-bg-1), var(--btn-submit-bg-2))!important;color: #FFFFFF;height: 40px; border-radius: 16px;height: 50px; border: 0;">
													{{$t(emailText)}}
												</u-button>
												<u-verification-code seconds="60" ref="mailCodeKey"
													@change="emailCodeChange" :start-text="$t('获取验证码')"
													:end-text="$t('rep_sned')" change-text="XS">
												</u-verification-code>
											</view>
										</uni-forms-item>
									</template>
								</uni-forms>
								<view class="sw-forms-item u-flex u-col-top u-m-t-20">
									<u-checkbox-group @change="checkboxGroupChange" width="20px" height="20px">
										<u-checkbox @change="checkboxChange" v-model="item.checked"
											active-color="#E9AE3A" v-for="(item, index) in list" :key="index"
											:name="item.name">
											<view>{{item.name}}</view>
										</u-checkbox>
									</u-checkbox-group>
									<view class="u-m-l-10 u-m-b-6">
										<text>{{$t('register9')}}</text>
										<text class="text-yellow" @click="openX">{{$t('register7')}}</text>
									</view>
								</view>
								<view class="form-footer">
									<u-button @click="submit" class="btn btn--submit-login m-font-18"
										:custom-style="customStyleButton" :throttle-time="1000">
										{{$t("注册按钮")}}
									</u-button>
								</view>
								<view class="thirdClass flex--direction">
									<view class="ot-card" v-for="(item, index) in third_login"
										:class="index > 0 ? 'u-m-t-20' : ''" :key="`third_login${index}`"
										@click="get_third_login_url(item.id,item.third_sys_sign)">
										<image :src="item.icon" style="width: 50rpx;height: 50rpx;margin-right: 20rpx;"
											class="cur_pointer"></image>
										<text class="m-font-18">{{$t(item.name)}}</text>
									</view>
								</view>
								<!-- <view class="u-flex u-row-center w_100 skin-text u-text-center u-m-t-40 u-m-b-40">
									<text class="iconfont icon-kefu5 blue-color u-m-r-8"></text>
									<navigator @click="toRescue" class="blue-color">{{$t("Online customer service")}}
									</navigator>
								</view> -->
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
		</u-top-tips>
		<!-- 服务条款 -->
		<u-popup v-model="rulePopup" mode="bottom" :mask-custom-style="uPopMaskCustomStyle" borderRadius="32"
			z-index="10001" @close="closeX">
			<view class="bs-popup pc_pop">
				<view class="bs-popup-hd">
					<view class="tt m-c-w">{{$t('register7')}}</view>
					<image src="@/static/images/index/close.png"
						style="width: 32px;height: 32px;position: absolute;right: 15px;" @click="closeX">
					</image>
				</view>
				<view class="bs-popup-body">
					<scroll-view class="rule-body-class" :scroll-y="true" :show-scrollbar="true"
						:scroll-with-animation="true">
						<view class="art-body" v-html="web_rule_common_5"></view>
					</scroll-view>
					<view class="rule-body-btn" @click="closeX">{{$t('确定')}}</view>
				</view>
			</view>
		</u-popup>
	</view>

</template>

<script>
	import easySelect from "@/components/easy-language-login/easy-select.vue"
	import quSelect from "@/components/easy-select/easy-select.vue"
	import left from "./components/left.vue"
	export default {
		components: {
			easySelect,
			quSelect,
			left
		},
		data() {
			return {
				// 验证
				formData: {
					account: '',
					pwd: '',
					// repwd: '',
					tcode: '',
					phone: '',
					phoneCode: '',
					yzm: '',
					email: '',
					emailCode: ''
				},
				registText: '',
				emailText: '',
				rules: {
					// 对name字段进行必填验证
					account: {
						rules: [{
							required: true,
							errorMessage: this.$t("login2"),
						}]
					},
					pwd: {
						rules: [{
							required: true,
							errorMessage: this.$t("login3"),
						}]
					},
					yzm: {
						rules: [{
							required: true,
							errorMessage: this.$t("login4"),
						}]
					},
					tcode: {
						rules: [{
							required: true,
							errorMessage: this.$t("请输入推广码"),
						}]
					},
					phone: {
						rules: [{
							required: true,
							errorMessage: this.$t("请输入手机号"),
						}]
					},
					phoneCode: {
						rules: [{
							required: true,
							errorMessage: this.$t("请输入手机验证码"),
						}]
					},
					email: {
						rules: [{
							required: true,
							errorMessage: this.$t("请输入邮箱"),
						}]
					},
					emailCode: {
						rules: [{
							required: true,
							errorMessage: this.$t("请输入邮箱验证码"),
						}]
					}
				},
				selecValue: 'CN',
				iconV: '../../static/images/cn.png',
				captcha: '',
				code_key: '',
				code_check: 0,
				promotion_code: 0,
				phone_check: 0,
				// 区号
				selecQu: '',
				quOptions: [],
				phone_bind: 0,
				show: false,
				doanLoadAnd: false, // 安卓下载
				doanLoadIOS: false, // IOS下载
				iosBut: 0,
				androidDownloadUrl: '',
				iosDownloadUrl: '',
				androidIos: null, // 1安卓 2IOS
				showOne: true,
				showTwo: true,
				URLTailDecoration: '',
				showTopTips: false,
				// isReg: false, //密码是否包含小写字母
				isStr: false, //密码是否包含大小写字母
				isNumber: false, //密码是否包含数字
				lensix: false, //密码长度是否6位
				isPwd: false,
				isLoad: true,
				styles: {
					color: '#ffffff',
					borderColor: '#191a20',
					borderRadius: "16px"
				},
				stylesPc: {
					color: '#ffffff',
					borderRadius: "16px",
					borderColor: "#644CBC",
					height: "46px"
				},
				scrollTop: 0,
				disshow: false,
				tcodeDisable: false,
				yzm_img: false,
				selecQuIcon: '',
				list: [{
					checked: false,
					disabled: false
				}],
				rulePopup: false,
				customStyleButton: {
					fontSize: '18px'
				},
				third_login: [],
				thirdLoginStatus: null,
			}
		},
		async onLoad(e) {
			await this.setHeadInfo();
			await this.setCapableTitle();
			var that = this;
			await this.getDoanload();
			this.getTopLang();
			this.selecQu = this.$helper.get('idc_default');
			this.selecQuIcon = this.$helper.get('idc_default_flag');
			if (e.share_code) {
				this.$helper.set('share_code', Number(e.share_code));
				this.formData.tcode = e.share_code;
				this.tcodeDisable = true;
			} else {
				this.tcodeDisable = false;
			}
			let token = this.$helper.get('token');
			if (token) {
				this.$go("/pages/index/index");
			}
			let idc = this.$helper.get('idc');
			if (idc == '') {
				this.initParam();
			} else {
				for (let i in idc) {
					this.quOptions.push(idc[i]);
				}
				this.selecValue = this.$helper.get('i18n_lang');
				let all_lang = this.$helper.get('alllang');
				if (all_lang != null) {
					for (let i = 0; i < all_lang.length; i++) {
						if (this.selecValue == all_lang[i].value) {
							this.iconV = all_lang[i].icon;
						}
					}
				}
				let rule = this.$helper.get('rule');
				this.code_check = rule.code_check;
				this.promotion_code = rule.promotion_code;
				this.phone_check = rule.phone_check;
				this.phone_bind = rule.phone_bind;
			}
			this.getRule_common(5);
			if (this.code_check == 1 || this.code_check == 3) {
				this.getcaptcha();
			}
			uni.setNavigationBarTitle({
				title: this.$t('register1')
			});
			this.thirdLoginStatus = this.$helper.get('rule').thirdLoginStatus;
			if (this.thirdLoginStatus == 1) {
				this.get_third_login();
			}
		},
		methods: {
			async get_third_login_url(id, third_sys_sign) {
				let urlHref = new URL(window.location.href); // 创建URL对象
				let cleanUrl = urlHref.origin + urlHref.pathname; // 获取不带参数的URL部分
				this.$helper.set('thirdLoginId', id);
				this.$helper.set('thirdLoginSign', third_sys_sign);
				let ret = await this.$u.api.get_third_login_url({
					id: id,
					href: cleanUrl,
					rec_code: this.formData.tcode?this.formData.tcode:''
				});
				if (ret && ret.code == 1) {
					window.location.href = ret.data.url;
				}else {
					this.$refs.uTips.show({
						title: this.$t(ret.msg)
					});
				}
			},
			async get_third_login() {
				let ret = await this.$u.api.get_third_login();
				if (ret) {
					this.third_login = ret.data;
				}
			},
			checkboxChange() {
				this.list.map(val => {
					val.checked = true;
				});
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				// console.log(e);
			},
			testClick() {},
			scroll: function(e) {
				this.disshow = true;
			},
			focusPwd() {
				this.isPwd = true;
			},
			blurPwd() {
				this.isPwd = false;
				if (this.isStr && this.isNumber && this.lensix) {
					this.isLoad = true;
				} else {
					this.isLoad = false;
				}
			},
			pwdInput(e) {
				// var pattern2 = new RegExp("[A-Z][a-z]");
				var pattern2 = new RegExp("[a-zA-Z]");
				if (pattern2.test(e)) {
					this.isStr = true;
				} else {
					this.isStr = false;
				}
				var pattern3 = new RegExp("[0-9]");
				if (pattern3.test(e)) {
					this.isNumber = true;
				} else {
					this.isNumber = false;
				}
				if (e.length >= 6) {
					this.lensix = true;
				} else {
					this.lensix = false;
				}
			},
			getTopLang() {
				if (this.$t('URLTailDecoration') != 'URLTailDecoration') {
					this.URLTailDecoration = this.$t('URLTailDecoration');
					this.showTopTips = true;
				} else {
					this.URLTailDecoration = '';
					this.showTopTips = false;
				}
			},
			//邮箱格式验证
			checkEmail(value) {
				let _this = this;
				if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
					_this.$refs.uTips.show({
						title: _this.$t('邮箱格式不正确')
					});
					return false;
				} else {
					return true;
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
					// window.location.href = '../static/js/embedded.mobileprovision';//本地描述文件会过期
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
			getUrlParam(name) {
				var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
				var url = window.location.href || location.href;
				var result = url.split('?')[1] ? url.split('?')[1].match(reg) : false;
				return result ? decodeURIComponent(result[2]) : false;
			},
			async initParam() {
				let ret = await this.$u.api.sysparam_p({});
				if (ret) {
					let idc = ret.idc;
					this.selecQu = ret.idc_default;
					this.selecValue = ret.data.lang;
					this.iconV = ret.data.icon;
					this.$helper.get('i18n_lang', ret.data.lang);
					this.code_check = ret.data.code_check;
					this.promotion_code = ret.data.promotion_code;
					this.phone_check = ret.data.phone_check;
					this.$i18n.locale = ret.data.lang;
					for (let i = 0; i < idc.length; i++) {
						this.quOptions.push(idc[i]);
					}
					this.$router.go(0);
				}
			},

			async getcaptcha() {
				let ret = await this.$u.api.captcha_p();
				if (ret) {
					this.captcha = ret.data.base64;
					this.code_key = ret.data.key;
				}
			},
			async getMailCode() {
				let _this = this;
				if (_this.formData.email == '') {
					_this.$refs.uTips.show({
						title: _this.$t('邮箱不能为空')
					});
					return
				} else {
					if (_this.$refs.mailCodeKey.canGetCode) {
						if (_this.$u.test.email(_this.formData.email)) {
							uni.showLoading({
								title: _this.$t('loading')
							})
							let res = await _this.$u.api.send_mail_code_p({
								email: _this.formData.email
							});
							if (res.code == 1) {
								uni.hideLoading();
								_this.$refs.uTips.show({
									title: _this.$t(res.msg)
								});
								_this.$refs.mailCodeKey.start();
							} else {
								_this.$refs.uTips.show({
									title: _this.$t(res.msg)
								});
							}
						} else {
							_this.$refs.uTips.show({
								title: _this.$t('邮箱格式不正确')
							});
						}
					}
				}
			},
			async getPhoneCode() {
				let info = {
					qh: this.selecQu,
					phone: this.formData.phone
				}
				if (this.$refs.registCode.canGetCode) {
					let res = await this.$u.api.sendcode_p(info);
					if (res.code == 1) {
						this.$refs.uTips.show({
							title: this.$t(res.msg)
						});
						this.$refs.registCode.start();
					} else {
						this.$refs.uTips.show({
							title: this.$t(res.msg)
						});
					}
				}
			},
			// 提交
			submit() {
				let _this = this;
				if (!this.list[0].checked) {
					this.openX();
					return
				}
				this.$refs.form.validate().then(async res => {
					if (res.email && res.email.length > 0 && (this.phone_check == 1 || this.phone_check ==
						0) && (this.phone_bind == 2 || this.phone_bind == 1)) {
						let chkEmail = _this.checkEmail(res.email);
						if (!chkEmail) {
							return false;
						}
					}
					uni.showLoading({
						mask: true,
						title: this.$t("loading"),
					});
					let ret = await this.$u.api.register_p({
						username: res.account ? res.account : '',
						password: res.pwd ? res.pwd : '',
						code_value: res.yzm ? res.yzm : '',
						code_key: _this.code_key ? _this.code_key : '',
						areacode: _this.selecQu ? _this.selecQu : '',
						phone: res.phone ? res.phone : '',
						code: res.phoneCode ? res.phoneCode : '',
						rec_code: res.tcode ? res.tcode : '',
						mail: res.email ? res.email : '',
						mail_code: res.emailCode ? res.emailCode : ''
					});
					if (ret.code == 1) {
						uni.hideLoading();
						_this.$refs.uTips.show({
							title: _this.$t(ret.msg)
						});
						if (res.tcode && !this.mobile_common) {
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/index/index'
								});
							}, 1000);
						} else {
							this.$helper.set('token', ret.data.token);
							this.$helper.set('token_key', ret.data.token_key);
							this.$helper.set('shouNotice', true);
							this.$helper.set('shouActivity', true);
							this.$helper.set('shouCooperation', true);
							this.$helper.set('loginStatus', true);
							this.getUserInfo_common();
							setTimeout(() => {
								this.$go("/pages/index/index");
							}, 1000);
						}
					} else {
						if (_this.code_check == 1 || _this.code_check == 3) {
							_this.getcaptcha();
						}
						_this.$refs.uTips.show({
							title: _this.$t(ret.msg)
						});
					}
				}).catch(err => {

				})
			},
			phoneCodeChange(e) {
				this.registText = e;
			},
			emailCodeChange(e) {
				this.emailText = e;
			},
			async ucaptcha() {
				let ret = await this.$u.api.captcha_p();
				if (ret) {
					this.captcha = ret.data.base64;
					this.code_key = ret.data.key;
					this.yzm_img = !this.yzm_img;
					setTimeout(_ => {
						if (!this.yzm_img) {
							this.yzm_img = true;
						}
					}, 200);
				}
			},
			switch1Change: function(e) {

			},
			selectOne(options) {
				this.$helper.setLang(options.label);
				this.$i18n.locale = options.label;
				this.selecValue = options.label;
				this.iconV = options.icon;
				// this.$router.go(0);
			},
			selectQhao(options) {
				this.selecQu = options.label;
				this.$helper.set('idc_default_flag', options.flag);
				this.selecQuIcon = options.flag;
			},
			// 规则
			openX() {
				this.rulePopup = true;
			},
			closeX() {
				this.rulePopup = false;
				this.list.map(val => {
					val.checked = true;
				})
			}
		}
	}
</script>

<style lang="scss">
	.w_50 {
		width: 50%;
	}

	.registerDoanload {
		top: -100%;
		left: 0;
		right: 0;
		position: fixed;
		z-index: 666;
		transition: .3s all;
	}

	.registerDoanload.show {
		top: 0;
		animation-delay: .4s;
		padding-top: constant(safe-area-inset-top);
		/*兼容 IOS<11.2*/
		padding-top: env(safe-area-inset-top);
		/*兼容 IOS>11.2*/
	}

	.m_bg {
		height: 65px;
		background: linear-gradient(var(--doanload-color-1), var(--doanload-color-2)) !important;
	}

	.form-wrapper {
		position: relative;
	}


	.sw-agrement {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 15px;
		margin-top: 10px;
	}


	.btn-get-code {
		font-size: 14px;
	}

	.download_btn {
		min-width: 85px;
		max-width: 140px;
		padding: 0 6px;
		height: 30px;
		text-align: center;
		cursor: pointer;
		line-height: 28px;
		border-radius: 6px;
		color: #ffffff !important;
		background: var(--doanload-bg);
		box-shadow: 0px 2px 5px rgba(24, 25, 32, 0.4);
	}

	.font-size-12 {
		font-size: 12px !important;
	}

	.webNameFont {
		color: #fff;
		font-size: 20px;
		font-weight: 600;
	}

	.webConent {
		margin-left: 5px;
		max-width: 150px;
	}

	.c-w {
		color: #fff;
	}

	.RULclass {
		height: 35px;
		background: linear-gradient(var(--doanload-color-1), var(--doanload-color-2)) !important;
	}

	.checkboxClass {
		border-radius: 50%;
		padding: 2px;
	}

	.checkReg {
		background-color: #bc132f;
	}

	.noCheckReg {
		background-color: #ccc;
	}

	.no-btn-default {
		color: #ffffff !important;
		background-color: #413D71;
	}

	.testPwd {
		background-color: #fff;
		border-radius: 20px;
		position: relative;
		height: 75px;
		z-index: 999;
		padding: 14px;
	}

	.zhid {
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: #fff;
		transform: rotateZ(45deg);
		bottom: -6px;
		left: 50%;
	}

	.noTestPwd ::v-deep .is-input-border {
		border: 1px solid #f00 !important;
	}

	.tip-flex {
		justify-content: flex-end;
	}

	.tip-flex .tip-flex-item {
		margin-left: 3px;
		font-size: 12px;
	}

	.tip-flex-item .line {
		height: 3px;
		margin-bottom: 5px;
	}

	.tip-red .line {
		background-color: #fc3c35;
	}

	.tip-ori .line {
		background-color: #e17b13;
	}

	.tip-orr .line {
		background-color: #69c125;
	}

	.tip-red .u-m {
		color: #fc3c35;
	}

	.tip-ori .u-m {
		color: #e17b13;
	}

	.tip-orr .u-m {
		color: #69c125;
	}

	.uni-forms-item__label {
		border: 2px solid #f00;
		width: 100% !important;
	}

	.log-bg {
		width: 100vw;
		height: 100vh;
		background-image: url('@/static/images/pc/log2.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.log-bg .fell-form {
		background-color: #1E1739;
		color: #ffffff;
		width: 800px;
		min-height: 600px;
		padding: 10px;
		border-radius: 24px;
		display: flex;
		position: relative;
	}

	.log-bg .fell-form .left {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 380px;
		flex: 1;
		border-radius: 16px;
		background-image: url('@/static/images/pc/log-left2.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;

	}

	.log-bg .fell-form .right {
		width: 400px;
		padding: 10px 30px 30px 30px;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.login-tabs {
		display: flex;
		border-radius: 40px;
		border: 1px solid #ccc;
		height: 40px;
		line-height: 40px;
		width: 100%;
	}

	.login-tabs-item {
		width: 50%;
		text-align: center;
		border-radius: 40px;
		cursor: pointer;
	}

	.login-tabs-item.active {
		color: #fff;
		background-color: var(--login-tabs-item-active);
	}

	.form-main ::v-deep .easy-select .easy-select-options.show {
		margin-top: 0 !important;
	}

	.condition {
		position: absolute;
		top: 280px;
		right: 48px;
		bottom: -210px;
		width: 300px;
		z-index: 999;
	}

	.condition .dian {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background-color: #50DA1B;
	}

	.condition .one {
		padding: 12px;
		position: relative;
		background: #413D71;
		border-radius: 10px;
	}

	.condition .one .horn {
		width: 15px;
		height: 15px;
		background: #413D71;
		transform: rotate(45deg);
		position: absolute;
		top: -8px;
		left: 50%;

	}

	.condition .two {
		padding: 12px;
		background: #F4F4F4;
		border-radius: 0 0 10px 10px;
	}

	.pc-login ::v-deep .easy-select .easy-select-options.show {
		margin-top: 0;
	}

	.fell-form ::v-deep .easy-select-options {
		margin-left: -15px !important;
	}


	.backHomeBtn {
		position: absolute;
		top: 20px;
		right: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: #D1CCE9;
		background-color: #413D71;
		width: 32px;
		height: 32px;
		border-radius: 10px;
	}

	.loginHeaderImg {
		width: 150px;
		height: 60px;
		position: absolute;
		top: -58px;
		left: -32px;
	}

	.pwd-error {
		position: absolute;
		top: 183px;
		right: 130px;
		z-index: 99;
		color: #f00;
	}

	.pwdMobile-error {
		position: absolute;
		top: 309px;
		right: 80px;
		z-index: 99;
		color: #f00;
	}

	.conditionMobile {
		width: 100%;
		margin-top: 20px;
		transform: 1s all;
	}

	.conditionMobile .dian {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background-color: #50DA1B;
	}

	.conditionMobile .one {
		padding: 12px;
		position: relative;
		background: #EBEEF8;
		border-radius: 10px;
	}

	.conditionMobile .one .horn {
		width: 15px;
		height: 15px;
		background: #EBEEF8;
		transform: rotate(45deg);
		position: absolute;
		left: 50%;
		top: -8px;

	}

	.conditionMobile .two {
		padding: 12px;
		background: #F4F4F4;
		border-radius: 0 0 10px 10px;
	}

	.quSelectM {
		width: 48px !important;
		border: 0;
		height: 26px;
		color: #fff;
	}

	.sw-forms-item ::v-deep .u-checkbox__icon-wrap {
		background-color: #312B4F;
		border: 2px solid #4D4886;
	}

	.thirdClass {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-top: 10px;
		margin-bottom: 30px;
	}

	.right ::v-deep .uni-easyinput__content {
		height: 46px;
		border-radius: 16px;
	}


	.Simple {
		.line1 {
			width: 16px;
			height: 4px;
			border-radius: 2px;
			background: rgba(209, 44, 44, 1);
		}

		.line2 {
			width: 16px;
			height: 4px;
			border-radius: 2px;
			background: rgba(100, 76, 188, 1);
		}

		.line3 {
			width: 16px;
			height: 4px;
			border-radius: 2px;
			background: rgba(100, 76, 188, 1);
		}
	}

	.intermediate {
		.line1 {
			width: 16px;
			height: 4px;
			border-radius: 2px;
			background: rgba(242, 163, 9, 1);
		}

		.line2 {
			width: 16px;
			height: 4px;
			border-radius: 2px;
			background: rgba(242, 163, 9, 1);
		}

		.line3 {
			width: 16px;
			height: 4px;
			border-radius: 2px;
			background: rgba(100, 76, 188, 1);
		}
	}

	.advanced {
		.line1 {
			width: 16px;
			height: 4px;
			border-radius: 2px;
			background: rgba(11, 211, 139, 1);
		}

		.line2 {
			width: 16px;
			height: 4px;
			border-radius: 2px;
			background: rgba(11, 211, 139, 1);
		}

		.line3 {
			width: 16px;
			height: 4px;
			border-radius: 2px;
			background: rgba(11, 211, 139, 1);
		}
	}

	.bs-popup-hd {
		background-color: rgba(30, 23, 57, 1) !important;
	}

	.bs-popup-body {
		background-color: #312B4F !important;
	}

	.rule-body-class {
		padding: 15px 0 15px 15px;
		overflow: hidden;
		max-height: 60vh;
		min-height: 40vh;
		border-radius: 16px;
		background: rgba(30, 23, 57, 1);
	}

	.rule-body-class::-webkit-scrollbar {
		display: inline-block;
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

	.bs-popup-body ::v-deep .uni-scroll-view {
		padding-right: 10px;
	}

	.u-font-64 {
		font-size: 32px;
	}

	.pc-thirdClass {
		margin: 0 -6px;

		.col {
			flex: 1;
			padding: 0 6px;
		}
	}

	.thirdClass-card {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #312B4F;
		border: 1px solid #413D71;
		height: 48px;
		border-radius: 8px;
	}
</style>
