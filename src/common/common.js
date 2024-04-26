module.exports = {
	data() {
		return {
			// 0 关于我们，1 总则，2 反波胆，3 代理规则， 4 充值规则，5 注册服务条款，6 游戏规则，7 如何申请代理，8 其他游戏说明
			web_rule_common_0: '', //公告、关于我们
			web_rule_common_1: '', //公告、规格
			web_rule_common_2: '', //公告、反波胆
			web_rule_common_3: '', //公告、代理规则
			web_rule_common_4: '', //公告、充值规则
			web_rule_common_5: '', //公告、注册服务条款
			web_rule_common_6: '', //公告、游戏规则
			web_rule_common_7: '', //公告、如何申请代理
			web_rule_common_8: '', //公告、其他游戏说明
			userInfo_common: {}, //用户信息
			userToken_common: '', //用户token
			// platformAPI_common: '' //动态切换域名
			mobile_common: true, // 是否为移动端设备
			// isUserWith_common: Boolean, // 用户提现密码状态
			skeletonLoading: true, // 骨架屏加载状态
			userDefaultHeader: '', //用户头像
			marketHeaderZD: '', //主队头像
			marketHeaderKD: '', //客队头像
			isGoogle: 2, //是否为上架用户账号  1是 0否
			userBalance: {}, //用户余额
			userVip: '0',
			uPopMaskCustomStyle: {
				background: 'rgba(0, 0, 0, .5)'
			},
			themeMode: '',
			outThirdBalance: false, //三方余额转出弹窗
			isIR: false,
			indexGameImg_common: 0,
			userBalanceAdjustment: '',
			isOpen: true,
			userTutorial: false,
			tutorialKey: 1
		}
	},
	onShow() {
		this.userInfo_common = this.$helper.get('userInfo');
		this.userBalance = this.$helper.get('userBalance');
		this.userToken_common = this.$helper.get('token');
		// this.isUserWith_common = this.$helper.get('userInfo').withdrawal_psd;
		this.setHeadInfo();
		this.getUserHeader();
		this.getMaeketHeader();
	},
	async onLoad() {
		await this.addMeta('#1e1739');
		await this.getMobile();
		await this.getDetails();
	},
	onReachBottom() {},
	methods: {
		// 金额小数点
		formatCurrency(amount) {
			// 检查是否已经有小数点
			let string = amount.toString();
			if (string.includes('.')) {
				let m = string.replace(/\.?0+$/, '');
				return new Intl.NumberFormat().format(m);
				// return 99999;
			}
			return new Intl.NumberFormat().format(string);
		},
		async skipTutorial() {
			let res = await this.$u.api.my_user_is_new_p();
			if (res && res.code == 1) {
				this.tutorialKey = 0;
				this.userTutorial = false;
				this.$helper.rm('tutorialKey');
				this.$refs.uTips.show({
					title: this.$t('您已完成指导')
				});
				await this.getUserInfo_common();
			}
		},
		async withDrawChange() {
			if (this.userInfo_common) {
				if (this.$helper.get('rule').force_certi == 1) {
					let res = await this.$u.api.user_certificate_p();
					if (res && res.code == 1) {
						if (res.data.force_sta == 1) {
							this.$refs.uTips.show({
								title: this.$t('您还未实名')
							});
						} else if (res.data.force_sta == 2) {
							this.$refs.uTips.show({
								title: this.$t('您的实名正在审核中')
							});
						} else if (res.data.force_sta == 3) {
							this.testLogin_go('/pages/ucenter/withdraw');
						}
					}
				} else {
					this.testLogin_go('/pages/ucenter/withdraw');
				}
			} else {
				this.testLogin_go('/pages/login/index');
			}
		},
		swiperChange(url) {
			if (this.containsProtocol(url)) {
				this.platUrl(url);
			} else {
				this.$go(url);
			}
		},
		containsProtocol(url) {
			return /^https?:\/\//i.test(url);
		},
		menuToggle() {

			this.isOpen = !this.isOpen
		},
		toThousands(num) {
			var numStr = (num || 0).toString();
			return numStr.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
		},
		numberLimit(money) {
			if (money) {
				if (typeof money === 'number') {
					let money1 = (money || 0).toString();
					return money1.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
				} else {
					let money1 = money.replace(/,/g, "");
					let money2 = Number(money1);
					let money3 = money2.toFixed(0);
					let money4 = (money3 || 0).toString();
					return money4.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
				}
			} else {
				return money
			}
		},
		paBackHome() {
			uni.reLaunch({
				url: '/pages/index/index'
			})
		},
		async pc_gameListClisk_common(name, tid, gid, key, tcCode) {
			let this_ = this;
			if (this_.$helper.get('token')) {
				if (key == 1) {
					uni.showLoading({
						title: this_.$t('loading')
					});
					let res = await this_.$u.api.game_login_game_p({
						platform: this_.mobile_common ? 2 : 1,
						back_url: window.location.href,
						gid
					});
					if (res && res.code == 1) {
						uni.hideLoading();
						this.platUrl(res.data);
					} else {
						this.$refs.uTips.show({
							title: this.$t(res.msg)
						});
					}
				} else {
					this.$refs.uTips.show({
						title: this.$t('待开放')
					});
				}
			} else {
				this.$go('/pages/login/index');
			}
		},
		// 删除url中某个参数,并跳转
		funcUrlDel(name) {
			var loca = window.location;
			var baseUrl = loca.origin + loca.pathname + "?";
			var query = loca.search.substr(1);
			if (query.indexOf(name) > -1) {
				var obj = {}
				var arr = query.split("&");
				for (var i = 0; i < arr.length; i++) {
					arr[i] = arr[i].split("=");
					obj[arr[i][0]] = arr[i][1];
				};
				delete obj[name];
				var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g,
					"&");
				return url
			};
		},
		// 游戏 - star
		async gameListClisk_common(name, tid, gid, key, tcCode) {
			let this_ = this;
			if (this_.$helper.get('token')) {
				if (key == 1) {
					if (tcCode == 'PB') {
						this.commonPBchange();
					}
					// 平博三方 IOS 特殊处理
					if (tcCode == 'PB' && uni.getSystemInfoSync().platform == 'ios') {
						uni.showLoading({
							title: this_.$t('loading')
						});
						let PB_res = await this_.$u.api.game_login_game_p({
							platform: 2,
							back_url: window.location.href,
							gid
						});
						if (PB_res && PB_res.code == 1) {
							uni.hideLoading();
							location.href = PB_res.data;
						} else {
							this.$refs.uTips.show({
								title: this.$t('请联系客服')
							});
						}
					} else if (tcCode == 'ZB') {
						uni.showLoading({
							title: this_.$t('loading')
						});
						let ZB_res = await this_.$u.api.game_login_game_p({
							platform: 2,
							back_url: window.location.href,
							gid
						});
						if (ZB_res && ZB_res.code == 1) {
							uni.hideLoading();
							location.href = ZB_res.data;
						} else {
							this.$refs.uTips.show({
								title: this.$t('请联系客服')
							});
						}
					} else {
						if (name == 'SaBa') {
							uni.showLoading({
								title: this_.$t('loading')
							});
							let query = {
								platform: this_.mobile_common ? 2 : 1,
								gid
							}
							let res = await this_.$u.api.game_get_api(query);
							if (res) {
								uni.hideLoading();
								if (res.code == 1) {
									if (res.data.url) {
										location.href = res.data.url;
									} else {
										location.href = res.data;
									}
								} else {
									this_.$refs.uTips.show({
										title: this_.$t(res.msg)
									});
								}
							}
						} else if (name == 'Pilot') {
							this_.$go('/pages/pilot/index?gid=' + gid);
						} else {
							uni.navigateTo({
								url: '/pages/otherGame/otherGame?tid=' + tid + '&gid=' + gid
							})
						}
					}
				} else {
					this.$refs.uTips.show({
						title: this.$t('待开放')
					});
				}
			} else {
				this.$go('/pages/login/index');
			}
		},
		async getIndexGame_common() {
			let res = await this.$u.api.game_list_p({
				page: 1,
				limit: 1,
				push: 1
			});
			if (res && res.code == 1 && res.data.length > 0) {
				this.indexGameImg_common = 1;
				this.$store.commit("setIndexGameObj", res.data[0]);
			} else {
				this.indexGameImg_common = 0;
			}
		},
		getIsIR() {
			if (this.$helper.getLang() == 'IR') {
				this.isIR = true;
			} else {
				this.isIR = false;
			}
		},
		// 三方
		onEvent(event_name, param, eventToken) {
			try {
				if (window.AndroidEM && window.AndroidEM.onEvent == undefined) {
					return false;
				}
				if (window.AndroidEM && window.AndroidEM.onPurchase == undefined) {
					return false;
				}
			} catch (err) {
				return false;
			}
			window.AndroidEM.onEvent(event_name, param, eventToken);
			return true;
		},
		purchase(amount, currency, eventToken) {
			try {
				if (window.AndroidEM && window.AndroidEM.onEvent == undefined) {
					return false;
				}
				if (window.AndroidEM && window.AndroidEM.onPurchase == undefined) {
					return false;
				}
			} catch (err) {
				return false;
			}
			window.AndroidEM.onPurchase(amount, currency.replace(/\s/g, ''), eventToken);
			return true;
		},
		getEventToken(name) {
			if (this.requestPar[name]) {
				return this.requestPar[name];
			}
			return name;
		},
		initParam() {
			this.requestPar = {};
			var query = window.location.search.substring(1);
			var vars = query.split("&");
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split("=");
				this.requestPar[pair[0]] = pair[1];
			}
		},
		// pb 体育 处理
		commonPBchange() {
			var pinnacleOrigin = '.tender88.com';
			window.addEventListener("message", (event) => {
				// check pinnacle origin
				if (event.origin && event.origin.toLowerCase().endsWith(pinnacleOrigin)) {
					var postData = event.data;
					switch (postData.action) {
						case 'OPEN_WINDOW':
							var url = postData.url;
							window.open(url);
							break;
						default:
							break;
					}
				}
			});
		},
		// base64加密
		setBtoa(enc, isLoca, locaName) {
			if (isLoca) {
				this.$helper.set(locaName, window.btoa(enc));
			} else {
				return window.btoa(enc);
			}
		},
		// base64解密
		getBtoa(dec, isLoca, locaName) {
			if (isLoca) {
				return window.atob(this.$helper.get(locaName));
			} else {
				return window.atob(dec);
			}
		},
		configColor(init) {
			let keys = ['blueDrak', 'blueLight']
			const obj = themes[keys.indexOf(init) != -1 ? init : 'blueLight']
			// html 添加主题样式
			for (constkey in obj) {
				document.documentElement.style.setProperty(key, obj[key]);
			}
		},
		// 三方游戏返回
		// async gameBack() {
		// 	let res = await this.$u.api.game_user_platform_balance_p();
		// 	if (res && res.code == 1) {
		// 		this.$refs.header.getUserBalance();
		// 	}
		// },
		goIndex() {
			uni.reLaunch({
				url: "/pages/index/index"
			})
		},
		// 获取用户余额
		async getUserBalance() {
			this.userBalance = this.$helper.get('userBalance');
			let res = await this.$u.api.userBalance_p();
			if (res) {
				this.$helper.set('userBalance', res.data);
				this.userBalance = res.data;
				let isThird = window.location.href.indexOf('otherGame') == -1;
				let isThirdFoot = window.location.href.indexOf('sportsThird') == -1;
				if (res.data.third_balance > 0 && isThird && isThirdFoot) {
					this.outThirdBalance = true;
				} else {
					this.outThirdBalance = false;
				}
			}
		},
		// 争对越南盾更改余额格式
		balanceFormat(money, fixed = 0) {
			if (money) {
				if (typeof money === 'number') {
					let money1 = money.toFixed(fixed);
					return money1
				} else {
					let money1 = money.replace(/,/g, "");
					let money2 = Number(money1);
					let money3 = money2.toFixed(fixed);
					return money3
				}
			}
		},
		// 获取用户VIP等级
		async getUserVip() {
			if (this.$helper.get('userVip')) {
				this.userVip = this.$helper.get('userVip');
			}
			let res = await this.$u.api.refresh_vip_p();
			if (res) {
				this.$helper.set('userVip', res.data);
				this.userVip = res.data;
			}
		},

		/**
		 * 页面对象  
		 * 获取高度的父级元素  
		 * 宽度变量名 
		 * 高度变量名 
		 * 宽高比例 
		 * 图片占据父级元素的百分之多少 默认百分百
		 */
		$get_width(obj, elment, w, h, proportion, percentage = 1) {
			const query = uni.createSelectorQuery().in(obj)
			query.select(elment).boundingClientRect()
			query.selectViewport().scrollOffset()
			query.exec(function(res) {
				if (res[0]) {
					obj[w] = (res[0].width * percentage).toFixed(2)
					obj[h] = ((res[0].width * percentage) * proportion).toFixed(2)
				}
			})
		},
		setHeadInfo() {
			let rule = this.$helper.get('rule');
			let headFavicon = document.getElementById("headFavicon");
			let IOSicon_one = document.getElementById("IOSicon_one");
			let IOSicon_two = document.getElementById("IOSicon_one");
			let Description_the = document.getElementById("DescriptionBall");
			if (rule && !headFavicon) {
				var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
				link.rel = 'shortcut icon';
				link.href = this.$t('favicon');
				link.id = 'headFavicon';
				document.getElementsByTagName('head')[0].appendChild(link);
			}
			if (rule && !IOSicon_one) {
				var link = document.querySelector("link[rel*='apple-touch-icon']") || document
					.createElement('link');
				link.rel = 'apple-touch-icon';
				link.href = this.$t('favicon');
				link.id = 'IOSicon_one';
				document.getElementsByTagName('head')[0].appendChild(link);
			}
			if (rule && !IOSicon_two) {
				var link = document.createElement("link");
				link.setAttribute("rel", "apple-touch-icon-precomposed");
				link.setAttribute("sizes", "180x180");
				link.setAttribute("href", this.$t('favicon'));
				link.setAttribute("id", 'IOSicon_two');
				document.getElementsByTagName("head")[0].appendChild(link);
			}
			if (rule && Description_the) {
				Description_the.content = this.$t('DescriptionInfo');
			}
		},
		setCapableTitle() {
			var link = document.getElementById("metaAppTitle");
			link.setAttribute("content", this.$t('web_name'));
		},
		// 动态生成meta
		addMeta(content) {
			let topColor = document.getElementById("topBoxStyle");
			let metaBarStyle = document.getElementById("metaBarStyle");
			let loadingmask = document.getElementById("loading-mask");
			topColor.content = content;
			metaBarStyle.content = content;
		},
		getDetails() {
			if (parseInt(this.$helper.get('userInfo').sc_date) == 1) {
				this.isGoogle = this.$helper.get('userInfo').sc_date;
			}
		},
		clearNoNum(value) {
			value = value + ''; //转为字符串
			value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符   
			value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
			value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
			value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数   
			if (value.indexOf(".") < 0 && value != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
				value = parseFloat(value);
			}
			return value
		},
		// 用户头像
		getUserHeader() {
			if (this.$t('userDefaultHeader') != 'userDefaultHeader') {
				this.userDefaultHeader = this.$t('userDefaultHeader');
			} else {
				this.userDefaultHeader = '@/static/images/index/menu/ava.png';
			}
		},
		// 主队、客队头像
		getMaeketHeader() {
			if (this.$t('marketHeaderZD') != 'marketHeaderZD') {
				this.marketHeaderZD = this.$t('marketHeaderZD');
			} else {
				this.marketHeaderZD = '/static/images/old/market_zd.png';
			}
			if (this.$t('marketHeaderKD') != 'marketHeaderKD') {
				this.marketHeaderKD = this.$t('marketHeaderKD');
			} else {
				this.marketHeaderKD = '/static/images/old/market_kd.png';
			}
		},
		// 是否为移动端
		_isMobile() {
			let flag = navigator.userAgent.match(
				/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
			);
			return flag;
		},
		common_set(key, value) {
			// uni.setStorageSync
			localStorage.setItem(key, value);
		},
		getMobile() {
			if (this._isMobile()) {
				/*
				 * 移动端
				 */
				this.mobile_common = true;
			} else {
				/*
				 * pc端
				 */
				this.mobile_common = true;
			}
		},
		// 登录
		async userLogin_common(username,
			password,
			code_value,
			code_key) {
			uni.showLoading({
				title: this.$t('loading')
			})
			let ret = await this.$u.api.login_p({
				username,
				password,
				code_value,
				code_key
			});
			if (ret.code == 1) {
				uni.hideLoading();
				this.userToken_common = ret.data.token;
				this.userInfo_common = ret.data;
				this.loginStatus = true;
				this.$helper.set('token', ret.data.token);
				this.$helper.set('token_key', ret.data.token_key);
				// 模拟返回数据
				// this.$helper.set('platform_api', 'https://api.bf-9.com');
				this.$helper.set('shouNotice', true);
				this.$helper.set('showActivity', true);
				this.$helper.set('shouCooperation', true);
				this.$helper.set('loginStatus', true);
				this.$helper.set('isGuide', true);
				// await this.getUserBalance(); //获取用户余额
				// await this.getUserVip();
				await this.getUserInfo_common(); //获取用户信息
				// var pages = getCurrentPages(); //获取页面
				// var beforePage = pages[pages.length - 2]; //上个页面
				// if (beforePage) {
				// 	this.$go('/' + beforePage.route);
				// } else {
				// 	this.$go("/pages/index/index");
				// }
				this.$go("/pages/index/index");
				// this.$router.go(0);
			} else {
				uni.hideLoading();
				this.$refs.uTips.show({
					title: this.$t(ret.msg)
				});
			}
		},
		async logout_common() {
			this.userInfo_common = {};
			this.userBalance = {};
			let ret = await this.$u.api.logout_p();
			this.$helper.set('token', '');
			this.$helper.set('token_key', '');
			this.$helper.set('userInfo', '');
			this.$helper.set('shouNotice', false);
			this.$helper.set('shouActivity', false);
			this.$helper.set('shouCooperation', false);
			this.$helper.set('loginStatus', false);
			this.$helper.set('userBalance', '');
			uni.navigateTo({
				url: '/pages/login/index'
			});
		},
		// 0 关于我们 1 总则 2 反波胆 3 代理规则 4 充值规则 5 注册服务条款
		async getRule_common(type) {
			let lang = this.$helper.getLang();
			// let webRule = this.$helper.get(`web-rule${type}_${lang}`);
			// if (webRule) {
			// 	this[`web_rule_common_${type}`] = webRule.content;
			// 	if (this[`web_rule_common_${type}`]) {
			// 		setTimeout(() => {
			// 			this.$helper.rm(`web-rule${type}_${lang}`);
			// 		}, 86400000);
			// 	}
			// } else {
			// 	let res = await this.$u.api.rule_p({
			// 		type: type
			// 	});
			// 	if (res.data != null) {
			// 		this.$helper.set(`web-rule${type}_${lang}`, res.data);
			// 		this[`web_rule_common_${type}`] = res.data.content;
			// 	}
			// };
			let res = await this.$u.api.rule_p({
				type: type
			});
			if (res.data != null) {
				this[`web_rule_common_${type}`] = res.data.content;
			}
		},
		// 获取用户信息
		async getUserInfo_common() {
			let res = await this.$u.api.userInfo_p();
			if (res) {
				this.$helper.set('userInfo', res.data);
				this.$helper.set('userBalanceOther', res.data.balance1);
				this.userInfo_common = res.data;
				this.isGoogle = res.data.sc_date;
				if (parseInt(this.$helper.get('rule').force_pwd) == 1) {
					this.$helper.set('userWithPwd', res.data.withdrawal_psd);
					if (res.data.withdrawal_psd) {
						this.$helper.set('testPwd', false);
					} else {
						this.$helper.set('testPwd', true);
					}
				}
			}
		},
		// 更换用户头像
		async userHeadImg_common() {
			let _self = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: (res) => {
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
						success: async (uploadFileRes) => {
							let res = JSON.parse(uploadFileRes.data);
							if (res.code == 1) {
								_self.userInfo_common.head_img = res.data.file;
								let ret = await _self.$u.api.useredit_p({
									head_img: res.data.file
								});
								if (ret.code == 1) {
									this.getUserInfo_common();
									_self.$refs.uTips.show({
										title: _self.$t(ret.msg)
									});
								} else {
									_self.$refs.uTips.show({
										title: _self.$t(ret.msg)
									});
								}
							} else if (res.code == 1000) {
								Vue.prototype.$u.toast(res.msg);
								_self.$helper.set('token', '');
								_self.$helper.set('token_key', '');
								_self.$helper.set('userInfo', '');
								uni.navigateTo({
									url: '/pages/login/index'
								});
							} else {
								_self.$refs.uTips.show({
									title: _self.$t(ret.msg)
								});
							}
						}
					});
					uploadTask.onProgressUpdate((res) => {
						_self.percent = res.progress;
					});
				},
				error: function(e) {
					console.log(e);
				}
			});
		},
		// 复制
		common_copy(value) {
			//提示模板
			uni.showToast({
				content: value, //模板中提示的内容
				confirmText: this.$t('agent1'),
				success: () => { //点击复制内容的后调函数
					//uni.setClipboardData方法就是讲内容复制到粘贴板
					uni.setClipboardData({
						data: value, //要被复制的内容
						success: () => { //复制成功的回调函数
							uni.showToast({ //提示
								title: this.$t('agent2')
							})
						}
					});
				}
			});
		},
		// 时间戳转化位日期格式
		timestampToTime(timestamp) {
			var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			var D = date.getDate() + ' ';
			var h = date.getHours() + ':';
			var m = date.getMinutes() + ':';
			var s = date.getSeconds();
			// return Y + M + D + h + m + s;
			return M + D + h + m + s;
		},
		// 返回1级
		common_back() {
			let pages = getCurrentPages();
			if (pages && pages.length > 1) {
				uni.navigateBack({
					delta: 1,
				});
			} else {
				history.back();
			}
		},
		// 返回2级
		common_back_two() {
			let pages = getCurrentPages();
			if (pages && pages.length > 1) {
				uni.navigateBack({
					delta: 2,
				});
			} else {
				history.back(-2);
			}
		},
		common_login_back() {
			var pages = getCurrentPages(); //获取页面
			var beforePage = pages[pages.length - 2]; //上个页面
			if (beforePage) {
				let isLoginPage = beforePage.route.indexOf('login');
				if (isLoginPage != -1) {
					this.$go('/pages/index/index');
				} else {
					if (pages && pages.length > 1) {
						uni.navigateBack({
							delta: 1,
						});
					} else {
						history.back();
					}
				}
			} else {
				this.$go('/pages/index/index');
			}
		},
		// 联系客服
		toRescue() {
			if (this.$helper.get('rule').ai_service == 1) {
				this.$go('/pages/ucenter/openai');
			} else {
				let service_url = this.$helper.get('rule');
				if (this.mobile_common) {
					// window.open(service_url.mobile_service_url, '_blank');
					switch (uni.getSystemInfoSync().platform) {
						case 'android':
							window.open(service_url.mobile_service_url, '_blank');
							break;
						case 'ios':
							window.location.href = service_url.mobile_service_url;
							break;
						default:
							window.location.href = service_url.mobile_service_url;
							break;
					}
				} else {
					window.open(service_url.pc_service_url, '_blank');
				}
			}
		},
		// 跳转链接
		platUrl(url) {
			if (this.mobile_common) {
				switch (uni.getSystemInfoSync().platform) {
					case 'android':
						window.open(url, '_blank');
						break;
					case 'ios':
						window.location.href = url;
						break;
					default:
						window.location.href = url;
						break;
				}
			} else {
				window.open(url, '_blank');
			}
		},
		// 跳转链接
		platUrl2(url) {
			if (this.mobile_common) {
				window.open(url, '_blank');
			} else {
				window.open(url, '_blank');
			}
		},
		// 截取字符 可用于截取订单号
		ellipsis(str, first, last) {
			var strC = String(str);
			var len = strC.length;
			var xx = strC.substring(first, len - last);
			var str1 = strC.replace(xx, "...");
			return str1
		},
		// 验证登录跳转
		testLogin_go(url) {
			if (this.userInfo_common) {
				uni.navigateTo({
					url: url
				})
			} else {
				this.$go('/pages/login/index')
			}
		},
		// 充值跳转
		recharge_go(url) {
			if (this.userInfo_common) {
				uni.navigateTo({
					url: url
				});
			} else {
				this.$go('/pages/login/index')
			}
		},
		// 提现跳转
		withdrawal_go(url) {
			if (this.userInfo_common) {
				uni.navigateTo({
					url: url
				});
			} else {
				this.$go('/pages/login/index')
			}
		},
		getOS(parameter) {
			var u = parameter;
			if (!!u.match(/compatible/i) || u.match(/Windows/i)) {
				return this.$t('windows');
			} else if (!!u.match(/Macintosh/i) || u.match(/MacIntel/i)) {
				return this.$t('macOS');
			} else if (!!u.match(/iphone/i) || u.match(/Ipad/i)) {
				return this.$t('ios');
			} else if (!!u.match(/android/i)) {
				return this.$t('android');
			} else {
				return this.$t('other');
			}
		},
		toTop() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 400,
			});
		},
		// 根据值排序
		compare(property) {
			return (a, b) => {
				var value1 = a[property];
				var value2 = b[property];
				return value1 - value2;
			}
		},
		goHome(url) {
			uni.switchTab({
				url
			})
		},
		no_Login() {
			uni.navigateTo({
				url: '/pages/index/index'
			});
		},
		localStorageClose() {
			localStorage.clear();
			window.location.reload(true);
		}
	}
}
