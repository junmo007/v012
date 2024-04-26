let path = process.env.VUE_APP_API_BASE_URL;


// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
let system_infoTwo = '/staticCaches/system.info.json'; // 系统配置_新配置
let system_info = '/system/info'; // 系统配置
let captcha = '/login/captcha'; // 获取验证码
let login = '/login/login'; // 登录
let register = '/login/register'; // 注册
let ranking = '/ranking/index'; // 榜单
let banner = '/banner/index'; // 首页轮播图
let matchlist = '/match/list'; // 赛事列表
let match_hot_match = '/match/hot_match'; // 热门赛事
let match_vip_match = '/match/vip_match'; // vip赛事
let matchplay = '/match/play'; // 赛事波胆
let userInfo = '/my/info'; // 用户详情
let userBalance = '/my/get_balance'; // 用户余额
let getquick = '/my/quick'; // 获取快捷金额
let editquick = '/my/editquick'; // 修改快捷金额
let useredit = '/my/editinfo'; // 修改用户资料
let matchbuy = '/match/buy'; // 下单
let matchrevoke = '/match/revoke'; // 撤单
let leaguelist = "/match/league"; // 获取联盟
let analyst = '/analyst/getlists'; // 获取分析师
let analystr = '/analyst/getdetail'; // 获取分析师
let trading = '/trading/list'; // 获取正在交易记录
let matchresult = '/match/result'; // 获取赛果
let history = '/trading/history'; // 获取历史报表
let historList = '/trading/history_list'; // 获取历史报表
let bankList = '/bank/lists'; // 获取银行列表
let mybankList = '/bank/my'; // 获取我的银行卡列表
let delbank = '/bank/del'; // 删除我的银行卡
let addBank = '/bank/add'; // 添加银行卡
let deposit = '/recharge/deposit'; // 获取平台收款账户
let rechargeparame = '/recharge/parame'; // 充值参数
let rechargeapply = '/recharge/apply'; // 申请充值
let rechargerecord = '/recharge/record'; // 充值记录
let withdrawapply = '/withdraw/apply'; // 申请提现
let withdrawrecord = '/withdraw/record'; // 提现记录
let withdrawlimit = '/withdraw/limit'; // 提现记录
let waterrecord = '/my/waterrecord'; // 账变记录
let newslist = '/news/list'; // 问答列表
let newsdetail = '/news/detail'; // 问答详情
let noticelist = '/notice/list'; // 赛事资讯
let noticedetail = '/notice/detail'; // 赛事资讯详情
let team = '/team/core'; // 代理总览
let teamapply = '/team/apply'; // 代理申请
let teamrecord = '/team/record'; // 代理佣金记录
let teamreport = '/team/report'; // 代理财务报表
let teamstatorder = '/team/statorder'; // 注单统计（代理）
let teamorderlist = '/team/orderlist'; // 注单记录（代理）
let teamuser = '/team/user'; // 代理团队
let teamuserdetail = '/team/detail'; // 代理团队明细
let teampromotion = '/team/promotion'; // 推广码
let teampopularize = '/team/popularize'; // 推广奖励
let teamstatreg = '/team/statreg'; // 注册统计（代理）
let teamstatrecharge = '/team/statrecharge'; // 充值统计（代理）
let teamrechargelist = '/team/rechargelist'; // 充值记录（代理）
let teamstatcash = '/team/statcash'; // 提现统计（代理）
let teamcashlist = '/team/cashlist'; // 提现记录（代理）
let teamstatprofit = '/team/statprofit'; // 盈利统计（代理）
let msgunread = '/message/unread'; // 消息未读
let msglist = '/message/list'; // 消息列表
let msgdetail = '/message/detail'; // 消息详情
let actionlist = '/action/list'; // 活动列表
let actiondetail = '/action/detail'; // 活动详情
let actionapply = '/action/apply'; // 活动申请
let doanload = '/doanload/index'; // 下载
let sendcode = '/sendcode/index'; // 发送手机验证码
let send_mail_code = '/sendcode/mail'; // 发送邮箱验证码
let forget = '/forget/pwd'; // 手机忘记密码
let forget_mail = '/forget/mail'; // 邮箱忘记密码
let logout = '/my/logout'; // 登出
let rule = '/rule/index'; // 规则
let recharge_mosaic = '/recharge/mosaic'; // 彩金記錄
let team_get_order = '/team/get_order'; // 微商下级信息详情
let sysparam = '/system/param';
let upload_img = '/upload/img';
let recharge_get_all = '/recharge/get_all'; // 所有收款方式

let savings_funds_lists = '/savings_funds/lists'; // 基金列表
let savings_funds_get_fund_order_list = '/savings_funds/get_fund_order_list'; // 我的基金列表
let savings_funds_details = '/savings_funds/fund_details'; // 基金投资详情
let savings_funds_fund_apply = '/savings_funds/fund_apply'; // 购买基金
let savings_funds_fund_withdrawal_balance = '/savings_funds/fund_withdrawal_balance'; // 购买基金
let savings_funds_get_my_fund = '/savings_funds/get_my_fund'; // 我的基金
let savings_funds_mx_list = '/savings_funds/fund_mx_list'; // 活期基金账变记录
let savings_funds_transfer_in = '/savings_funds/transfer_in'; // 余额转入
let savings_funds_transfer_out = '/savings_funds/transfer_out'; // 余额转出
let savings_funds_record_details = '/savings_funds/fund_record_details'; // 余额转出
let login_third_login_url = '/login/get_third_login_url'; // 
let login_third_login = '/login/third_login'; // 
let login_get_third_login = '/login/get_third_login'; // 

let prepaid_phon_information = '/recharge/get_bank_set_content'; // 获取充值银行卡信息

let lotteryconfig_url = "/action/lotteryconfig"; //奖品/配置信息
let lotteryrecord_url = "/action/lotteryrecord"; //抽奖记录
let lottery_url = "/action/lottery"; //抽奖
let lottery_set_address = "/lottery/set_address"; //设置收货地址
let service_list = "/service/list"; //客服列表

let flyer_game_login = "/flyer_game/login"; //飞机小游戏认证登录
let flyer_game_list = "/flyer_game/list"; //飞行员中心
let flyer_game_zhudan = "/flyer_game/zhudan"; //飞行员注单记录
let flyer_game_flyer_in = "/flyer_game/flyer_in"; //飞行员注单记录
let flyer_game_flyer_out = "/flyer_game/flyer_out"; //飞行员注单记录
let user_vip = "/user/vip"; //vip等级
let team_ordernum = "/team/ordernum"; //注单人数统计

let game_transin = "/game/transin"; //余额转入三方平台
let game_transout = "/game/transout"; //余额转出三方平台
let game_user_platform_balance = "/game/user_platform_balance"; //飞行游戏 首页跟登录时访问（转回余额）

let order_list = "/order/list"; //跟投记录
let my_login = "/my/login"; //登录日志
let game_third = "/game/third"; //游戏平台
let match_stat = "/match/stat"; //赛事数量统计
let match_list_lea = "/match/list1"; //赛事联盟分组
let feedback_add = "/feedback/add"; //反馈内容
let message_system_msg = "/message/system_msg"; //系统消息
let team_profit = "/team/profit"; //代理返佣统计(周)

let game_get_url = "/game/get_url"; //获取游戏路径
let game_get_game_url = "/game/get_game_url"; //游戏入口统计状态-列表
let game_index = "/game/index"; //游戏首页
let game_get_type = "/game/get_type"; //游戏分类
let game_order_sports = "/game/order2"; //三方体育订单
let game_order_t = "/game/order4"; //三方游戏投注榜单

let game_index_new = "/game/index1"; //游戏首页 2.0
let game_list = "/game/list"; //游戏列表 2.0
let game_detail = "/game/detail"; //游戏详情 2.0
let game_user_transout = "/game/user_transout"; //余额转出三方平台 2.0
let game_login_game = "/game/login_game"; //获取游戏路径 2.0
let game_order = "/game/order"; //三方游戏记录 2.0

let refresh_vip = "/refresh/vip"; //刷新VIP

let buy_vip = "/buy/vip"; //购买VIP
let online_user = "/online/user"; //获取在线人数
let cooperativepartner_lists = "/cooperativepartner/lists"; //合作伙伴列表

let match_list_all = "/match/list1/all"; //赛事 - 全部
let match_list_today = "/match/list1/today"; //赛事 - 今日
let match_list_tomorrow = "/match/list1/tomorrow"; //赛事 - 明日
let game_get_detail = "/game/get_detail"; //游戏详情
let game_game_collect = "/game/game_collect"; //游戏收藏
let game_fb_login_game = "/game/fb_login_game"; //fb未登录获取赛事使用
let down_data = "/down/data"; //下载链接



let lottery_lotteryconfig = "/lottery/lotteryconfig"; //转盘列表
let lottery_lotteryprize = "/lottery/lotteryprize"; //转盘奖品
let lottery_lotteryrecord = "/lottery/lotteryrecord"; //转盘记录
let lottery_lottery = "/lottery/lottery"; //转盘抽奖
let lottery_cashvolume = "/lottery/cashvolume"; //现金卷列表
let lottery_setcashvolume = "/lottery/setcashvolume"; //现金卷兑换
let action_type = "/action/type"; //活动分类
let reward_list = "/reward/list"; //任务列表
let reward_pay_receive = "/reward/pay_receive"; //领取任务奖励
let savings_funds_fund_list = "/savings_funds/fund_list"; //基金列表（新）
let lottery_card_case = "/lottery/card_case"; //卡包列表
let lottery_playcard = "/lottery/playcard"; //卡卷兑换


let game_type_third = "/game/type_third"; //分类获取三方
let game_third_game = "/game/third_game"; //三方获取游戏
let transfer_search_name = "/transfer/search_name"; //用户名查询用户
let transfer_list = "/transfer/list"; //转账记录
let transfer_play = "/transfer/play"; //提交转账
let transfer_config = "/transfer/config"; //转账配置
let action_get_action_rewards = "/action/get_action_rewards"; //获取邀请活动的可获取奖励
let action_apply_rewards = "/action/apply_rewards"; //提交邀请活动的奖励申请
let action_apply_rewards_logs = "/action/apply_rewards_logs"; //活动申请记录
let action_share_detail = "/action/share_detail"; //获取邀请活动可获取奖励
let my_handsel_play = "/my/handsel_play"; //领取单项彩金
let my_handsel_record = "/my/handsel_record"; //彩金记录
let team_profit_sell = "/team/profit_sell"; //领取全部代理返佣
let vip_apply = "/vip/apply"; //申请VIP彩金
let system_false_profit = "/system/rebate_profit"; //虚假注单&返佣盈利
let user_certificate = "/my/user_certificate";// 用户实名信息
let my_handsel_count = "/my/handsel_count";// 彩金统计
let my_user_is_new = "/my/user_is_new";// 修改用户状态为老用户
let bank_phone_bank = "/bank/phone_bank";// 手机银行列表
let team_app_share = "/team/app_share";// app应用分享
let gpt_send = "/gpt/send";// openAI



// let get_upd_data = '/system/get_upd_data'; //系统维护接口
// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	let getSystemInfo = (params = {}) => vm.$u.get(system_info, params).catch(err => {
		return vm.$u.http.interceptor.error(err, system_info);
	});
	let getSystemInfoTwo = (params = {}) => vm.$u.get(system_infoTwo, params).catch(err => {
		return vm.$u.http.interceptor.error(err, system_infoTwo);
	});

	let getUploadImg = (params = {}) => vm.$u.post(upload_img, params).catch(err => {
		return vm.$u.http.interceptor.error(err, upload_img);
	});
	let rule_p = (params = {}) => vm.$u.post(rule, params);
	let doanload_p = (params = {}) => vm.$u.post(doanload, params);
	let captcha_p = (params = {}) => vm.$u.post(captcha, params);
	let login_p = (params = {}) => vm.$u.post(login, params);
	let register_p = (params = {}) => vm.$u.post(register, params);
	let matchlist_p = (params = {}) => vm.$u.post(matchlist, params);
	let match_hot_match_p = (params = {}) => vm.$u.get(match_hot_match, params);
	let match_vip_match_p = (params = {}) => vm.$u.get(match_vip_match, params);
	let matchplay_p = (params = {}) => vm.$u.post(matchplay, params);
	let userInfo_p = (params = {}) => vm.$u.post(userInfo, params);
	let userBalance_p = (params = {}) => vm.$u.post(userBalance, params);
	let getquick_p = (params = {}) => vm.$u.post(getquick, params);
	let editquick_p = (params = {}) => vm.$u.post(editquick, params);
	let matchbuy_p = (params = {}) => vm.$u.post(matchbuy, params);
	let matchrevoke_p = (params = {}) => vm.$u.post(matchrevoke, params);
	let leaguelist_p = (params = {}) => vm.$u.post(leaguelist, params);
	let analyst_p = (params = {}) => vm.$u.post(analyst, params);
	let trading_p = (params = {}) => vm.$u.post(trading, params);
	let analystr_p = (params = {}) => vm.$u.post(analystr, params);
	let matchresult_p = (params = {}) => vm.$u.post(matchresult, params);
	let history_p = (params = {}) => vm.$u.post(history, params);
	let historList_p = (params = {}) => vm.$u.post(historList, params);
	let bankList_p = (params = {}) => vm.$u.post(bankList, params);
	let mybankList_p = (params = {}) => vm.$u.post(mybankList, params);
	let delbank_p = (params = {}) => vm.$u.post(delbank, params);
	let addBank_p = (params = {}) => vm.$u.post(addBank, params);
	let deposit_p = (params = {}) => vm.$u.post(deposit, params);
	let rechargeparame_p = (params = {}) => vm.$u.post(rechargeparame, params);
	let rechargeapply_p = (params = {}) => vm.$u.post(rechargeapply, params);
	let rechargerecord_p = (params = {}) => vm.$u.post(rechargerecord, params);
	let withdrawapply_p = (params = {}) => vm.$u.post(withdrawapply, params);
	let withdrawrecord_p = (params = {}) => vm.$u.post(withdrawrecord, params);
	let withdrawlimit_p = (params = {}) => vm.$u.post(withdrawlimit, params);
	let waterrecord_p = (params = {}) => vm.$u.post(waterrecord, params);
	let newslist_p = (params = {}) => vm.$u.post(newslist, params);
	let newsdetail_p = (params = {}) => vm.$u.post(newsdetail, params);
	let noticelist_p = (params = {}) => vm.$u.post(noticelist, params);
	let noticedetail_p = (params = {}) => vm.$u.post(noticedetail, params);
	let team_p = (params = {}) => vm.$u.post(team, params);
	let teamrecord_p = (params = {}) => vm.$u.post(teamrecord, params);
	let teamreport_p = (params = {}) => vm.$u.post(teamreport, params);
	let teamstatorder_p = (params = {}) => vm.$u.post(teamstatorder, params);
	let teamorderlist_p = (params = {}) => vm.$u.post(teamorderlist, params);
	let teamuser_p = (params = {}) => vm.$u.post(teamuser, params);
	let teamuserdetail_p = (params = {}) => vm.$u.post(teamuserdetail, params);
	let teampromotion_p = (params = {}) => vm.$u.post(teampromotion, params);
	let teampopularize_p = (params = {}) => vm.$u.post(teampopularize, params);
	let teamstatreg_p = (params = {}) => vm.$u.post(teamstatreg, params);
	let teamstatrecharge_p = (params = {}) => vm.$u.post(teamstatrecharge, params);
	let teamrechargelist_p = (params = {}) => vm.$u.post(teamrechargelist, params);
	let teamstatcash_p = (params = {}) => vm.$u.post(teamstatcash, params);
	let teamcashlist_p = (params = {}) => vm.$u.post(teamcashlist, params);
	let teamstatprofit_p = (params = {}) => vm.$u.post(teamstatprofit, params);
	let msgunread_p = (params = {}) => vm.$u.post(msgunread, params);
	let msglist_p = (params = {}) => vm.$u.post(msglist, params);
	let msgdetail_p = (params = {}) => vm.$u.post(msgdetail, params);
	let useredit_p = (params = {}) => vm.$u.post(useredit, params);
	let ranking_p = (params = {}) => vm.$u.get(ranking, params);
	let actionlist_p = (params = {}) => vm.$u.post(actionlist, params);
	let actiondetail_p = (params = {}) => vm.$u.post(actiondetail, params);
	let actionapply_p = (params = {}) => vm.$u.post(actionapply, params);
	let teamapply_p = (params = {}) => vm.$u.post(teamapply, params);
	let banner_p = (params = {}) => vm.$u.get(banner, params);
	let sendcode_p = (params = {}) => vm.$u.post(sendcode, params);
	let send_mail_code_p = (params = {}) => vm.$u.post(send_mail_code, params);
	let forget_p = (params = {}) => vm.$u.post(forget, params);
	let forget_mail_p = (params = {}) => vm.$u.post(forget_mail, params);
	let logout_p = (params = {}) => vm.$u.post(logout, params);
	let sysparam_p = (params = {}) => vm.$u.post(sysparam, params);
	let recharge_mosaic_p = (params = {}) => vm.$u.post(recharge_mosaic, params);
	let team_get_order_p = (params = {}) => vm.$u.post(team_get_order, params);
	let recharge_get_all_p = (params = {}) => vm.$u.post(recharge_get_all, params);

	let savings_funds_lists_p = (params = {}) => vm.$u.post(savings_funds_lists, params);
	let savings_funds_get_fund_order_list_p = (params = {}) => vm.$u.post(savings_funds_get_fund_order_list,
		params);
	let savings_funds_details_p = (params = {}) => vm.$u.post(savings_funds_details, params);
	let savings_funds_fund_apply_p = (params = {}) => vm.$u.post(savings_funds_fund_apply, params);
	let savings_funds_fund_withdrawal_balance_p = (params = {}) => vm.$u.post(savings_funds_fund_withdrawal_balance,
		params);
	let savings_funds_get_my_fund_p = (params = {}) => vm.$u.post(savings_funds_get_my_fund, params);
	let savings_funds_mx_list_p = (params = {}) => vm.$u.post(savings_funds_mx_list, params);
	let savings_funds_transfer_in_p = (params = {}) => vm.$u.post(savings_funds_transfer_in, params);
	let savings_funds_transfer_out_p = (params = {}) => vm.$u.post(savings_funds_transfer_out, params);
	let savings_funds_record_details_p = (params = {}) => vm.$u.post(savings_funds_record_details, params);
	let get_third_login_url = (params = {}) => vm.$u.post(login_third_login_url, params);
	let third_login = (params = {}) => vm.$u.post(login_third_login, params);
	let get_third_login = (params = {}) => vm.$u.post(login_get_third_login, params);
	let game_get_api = (params = {}) => vm.$u.post(game_get_url, params);
	let game_login_game_p = (params = {}) => vm.$u.post(game_login_game, params);
	

	// let get_upd_data_p = (params = {}) => vm.$u.post(get_upd_data, params); 系统维护公告弹窗

	let get_prepaid_phon_information = (params = {}) => vm.$u.post(prepaid_phon_information, params);


	let lotteryconfig_api = (params = {}) => vm.$u.post(lotteryconfig_url, params);
	let lotteryrecord_api = (params = {}) => vm.$u.post(lotteryrecord_url, params);
	let lottery_api = (params = {}) => vm.$u.post(lottery_url, params);
	let lottery_set_address_p = (params = {}) => vm.$u.post(lottery_set_address, params);
	let service_list_p = (params = {}) => vm.$u.post(service_list, params);
	let flyer_game_login_p = (params = {}) => vm.$u.post(flyer_game_login, params);
	let flyer_game_list_p = (params = {}) => vm.$u.post(flyer_game_list, params);
	let flyer_game_zhudan_p = (params = {}) => vm.$u.post(flyer_game_zhudan, params);
	let flyer_game_flyer_in_p = (params = {}) => vm.$u.post(flyer_game_flyer_in, params);
	let flyer_game_flyer_out_p = (params = {}) => vm.$u.post(flyer_game_flyer_out, params);
	let game_get_game_url_p = (params = {}) => vm.$u.post(game_get_game_url, params);
	let user_vip_p = (params = {}) => vm.$u.post(user_vip, params);
	let team_ordernum_p = (params = {}) => vm.$u.post(team_ordernum, params);
	let game_transin_p = (params = {}) => vm.$u.post(game_transin, params);
	let game_transout_p = (params = {}) => vm.$u.post(game_transout, params);
	let game_user_platform_balance_p = (params = {}) => vm.$u.post(game_user_platform_balance, params);
	let game_list_p = (params = {}) => vm.$u.post(game_list, params);
	let game_detail_p = (params = {}) => vm.$u.post(game_detail, params);
	let game_user_transout_p = (params = {}) => vm.$u.post(game_user_transout, params);
	let order_list_p = (params = {}) => vm.$u.get(order_list, params);
	let game_get_type_p = (params = {}) => vm.$u.post(game_get_type, params);
	let game_order_p = (params = {}) => vm.$u.post(game_order, params);
	let my_login_p = (params = {}) => vm.$u.post(my_login, params);
	let game_third_p = (params = {}) => vm.$u.post(game_third, params);
	let game_order_sports_p = (params = {}) => vm.$u.post(game_order_sports, params);
	let match_stat_p = (params = {}) => vm.$u.post(match_stat, params);
	let match_list_lea_p = (params = {}) => vm.$u.post(match_list_lea, params);
	let game_order_t_p = (params = {}) => vm.$u.post(game_order_t, params);
	let feedback_add_p = (params = {}) => vm.$u.post(feedback_add, params);
	let message_system_msg_p = (params = {}) => vm.$u.post(message_system_msg, params);
	let team_profit_p = (params = {}) => vm.$u.post(team_profit, params);
	
	let game_index_p = (params = {}) => vm.$u.post(game_index, params);
	let game_index_new_p = (params = {}) => vm.$u.post(game_index_new, params);
	
	let refresh_vip_p = (params = {}) => vm.$u.post(refresh_vip, params);
	let buy_vip_p = (params = {}) => vm.$u.post(buy_vip, params);
	let online_user_p = (params = {}) => vm.$u.post(online_user, params);
	let cooperativepartner_lists_p = (params = {}) => vm.$u.post(cooperativepartner_lists, params);
	let match_list_all_g = (params = {}) => vm.$u.get(match_list_all, params);
	let match_list_today_g = (params = {}) => vm.$u.get(match_list_today, params);
	let match_list_tomorrow_g = (params = {}) => vm.$u.get(match_list_tomorrow, params);
	let game_get_detail_p = (params = {}) => vm.$u.post(game_get_detail, params);
	let game_game_collect_p = (params = {}) => vm.$u.post(game_game_collect, params);
	let game_fb_login_game_p = (params = {}) => vm.$u.post(game_fb_login_game, params);
	let down_data_p = (params = {}) => vm.$u.post(down_data, params);
	let lottery_lotteryconfig_p = (params = {}) => vm.$u.post(lottery_lotteryconfig, params);
	let lottery_lotteryprize_p = (params = {}) => vm.$u.post(lottery_lotteryprize, params);
	let lottery_lotteryrecord_p = (params = {}) => vm.$u.post(lottery_lotteryrecord, params);
	let lottery_lottery_p = (params = {}) => vm.$u.post(lottery_lottery, params);
	let lottery_cashvolume_p = (params = {}) => vm.$u.post(lottery_cashvolume, params);
	let lottery_setcashvolume_p = (params = {}) => vm.$u.post(lottery_setcashvolume, params);
	let action_type_p = (params = {}) => vm.$u.post(action_type, params);
	let reward_list_p = (params = {}) => vm.$u.post(reward_list, params);
	let reward_pay_receive_p = (params = {}) => vm.$u.post(reward_pay_receive, params);
	let savings_funds_fund_list_p = (params = {}) => vm.$u.post(savings_funds_fund_list, params);
	let lottery_card_case_p = (params = {}) => vm.$u.post(lottery_card_case, params);
	let lottery_playcard_p = (params = {}) => vm.$u.post(lottery_playcard, params);
	let game_type_third_p = (params = {}) => vm.$u.post(game_type_third, params);
	let game_third_game_p = (params = {}) => vm.$u.post(game_third_game, params);
	let transfer_search_name_p = (params = {}) => vm.$u.post(transfer_search_name, params);
	let transfer_list_p = (params = {}) => vm.$u.post(transfer_list, params);
	let transfer_play_p = (params = {}) => vm.$u.post(transfer_play, params);
	let transfer_config_p = (params = {}) => vm.$u.post(transfer_config, params);
	let action_get_action_rewards_p = (params = {}) => vm.$u.post(action_get_action_rewards, params);
	let action_apply_rewards_p = (params = {}) => vm.$u.post(action_apply_rewards, params);
	let action_apply_rewards_logs_p = (params = {}) => vm.$u.post(action_apply_rewards_logs, params);
	let action_share_detail_p = (params = {}) => vm.$u.post(action_share_detail, params);
	let my_handsel_play_p = (params = {}) => vm.$u.post(my_handsel_play, params);
	let my_handsel_record_p = (params = {}) => vm.$u.post(my_handsel_record, params);
	let team_profit_sell_p = (params = {}) => vm.$u.post(team_profit_sell, params);
	let vip_apply_p = (params = {}) => vm.$u.post(vip_apply, params);
	let system_false_profit_p = (params = {}) => vm.$u.get(system_false_profit, params);
	let user_certificate_p = (params = {}) => vm.$u.post(user_certificate, params);
	let my_handsel_count_p = (params = {}) => vm.$u.post(my_handsel_count, params);
	let my_user_is_new_p = (params = {}) => vm.$u.post(my_user_is_new, params);
	let bank_phone_bank_p = (params = {}) => vm.$u.post(bank_phone_bank, params);
	let team_app_share_p = (params = {}) => vm.$u.post(team_app_share, params);
	let gpt_send_p = (params = {}) => vm.$u.post(gpt_send, params);
	

	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		path,
		getSystemInfo,
		getSystemInfoTwo,
		rule_p,
		doanload_p,
		captcha_p,
		login_p,
		register_p,
		matchlist_p,
		match_hot_match_p,
		match_vip_match_p,
		matchplay_p,
		userInfo_p,
		userBalance_p,
		getquick_p,
		editquick_p,
		matchbuy_p,
		matchrevoke_p,
		leaguelist_p,
		analyst_p,
		trading_p,
		analystr_p,
		matchresult_p,
		history_p,
		historList_p,
		bankList_p,
		mybankList_p,
		delbank_p,
		addBank_p,
		deposit_p,
		rechargeparame_p,
		rechargeapply_p,
		rechargerecord_p,
		withdrawapply_p,
		withdrawrecord_p,
		withdrawlimit_p,
		waterrecord_p,
		newslist_p,
		newsdetail_p,
		noticelist_p,
		noticedetail_p,
		team_p,
		teamrecord_p,
		teamreport_p,
		teamstatorder_p,
		teamorderlist_p,
		teamuser_p,
		teamuserdetail_p,
		teampromotion_p,
		teampopularize_p,
		teamstatreg_p,
		teamstatrecharge_p,
		teamrechargelist_p,
		teamstatcash_p,
		teamcashlist_p,
		teamstatprofit_p,
		msgunread_p,
		msglist_p,
		msgdetail_p,
		useredit_p,
		ranking_p,
		actionlist_p,
		actiondetail_p,
		actionapply_p,
		teamapply_p,
		banner_p,
		sendcode_p,
		send_mail_code_p,
		forget_p,
		forget_mail_p,
		logout_p,
		sysparam_p,
		recharge_mosaic_p,
		team_get_order_p,
		recharge_get_all_p,
		savings_funds_lists_p,
		savings_funds_get_fund_order_list_p,
		savings_funds_fund_apply_p,
		savings_funds_details_p,
		savings_funds_fund_withdrawal_balance_p,
		savings_funds_get_my_fund_p,
		savings_funds_mx_list_p,
		savings_funds_transfer_in_p,
		savings_funds_transfer_out_p,
		savings_funds_record_details_p,
		get_third_login_url,
		get_third_login,
		third_login,
		game_get_api,
		game_login_game_p,
		get_prepaid_phon_information,
		lotteryconfig_api,
		lotteryrecord_api,
		lottery_api,
		lottery_set_address_p,
		service_list_p,
		// get_upd_data_p 系统维护公告弹窗
		flyer_game_login_p,
		flyer_game_list_p,
		flyer_game_zhudan_p,
		flyer_game_flyer_in_p,
		flyer_game_flyer_out_p,
		game_get_game_url_p,
		user_vip_p,
		team_ordernum_p,
		game_transin_p,
		game_transout_p,
		game_user_platform_balance_p,
		game_list_p,
		game_detail_p,
		game_user_transout_p,
		order_list_p,
		game_get_type_p,
		game_order_p,
		my_login_p,
		game_third_p,
		game_order_sports_p,
		match_stat_p,
		match_list_lea_p,
		game_index_p,
		game_order_t_p,
		feedback_add_p,
		message_system_msg_p,
		team_profit_p,
		game_index_new_p,
		refresh_vip_p,
		buy_vip_p,
		online_user_p,
		cooperativepartner_lists_p,
		match_list_all_g,
		match_list_today_g,
		match_list_tomorrow_g,
		game_get_detail_p,
		game_game_collect_p,
		game_fb_login_game_p,
		down_data_p,
		lottery_lotteryconfig_p,
		lottery_lotteryprize_p,
		lottery_lotteryrecord_p,
		lottery_lottery_p,
		lottery_cashvolume_p,
		lottery_setcashvolume_p,
		action_type_p,
		reward_list_p,
		reward_pay_receive_p,
		savings_funds_fund_list_p,
		lottery_card_case_p,
		lottery_playcard_p,
		game_type_third_p,
		game_third_game_p,
		transfer_search_name_p,
		transfer_list_p,
		transfer_play_p,
		transfer_config_p,
		action_get_action_rewards_p,
		action_apply_rewards_p,
		action_apply_rewards_logs_p,
		action_share_detail_p,
		my_handsel_play_p,
		my_handsel_record_p,
		team_profit_sell_p,
		vip_apply_p,
		system_false_profit_p,
		user_certificate_p,
		my_handsel_count_p,
		my_user_is_new_p,
		bank_phone_bank_p,
		team_app_share_p,
		gpt_send_p
	};
}

export default {
	install
}
