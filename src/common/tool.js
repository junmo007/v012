// 乘法
export const accMul = (arg1, arg2) => {
	var m = 0;
	var s1 = arg1.toString();
	var s2 = arg2.toString();
	try {
		m = m + s1.split('.')[1].length;
	} catch (e) {}
	try {
		m = m + s2.split('.')[1].length;
	} catch (e) {}
	var end = Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
	return Number(end);
}

// 除法
export const accDiv = (arg1, arg2) => {
	if (!arg1 || !arg2) return arg1;
	var t1 = 0,
		t2 = 0,
		r1, r2;
	try {
		t1 = arg1.toString().split(".")[1].length;
	} catch (e) {}
	try {
		t2 = arg2.toString().split(".")[1].length;
	} catch (e) {}
	r1 = Number(arg1.toString().replace(".", ""));
	r2 = Number(arg2.toString().replace(".", ""));
	return (r1 / r2) * Math.pow(10, t2 - t1);
}

// 减法
export const accSub = (arg1, arg2) => {
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
	n = (r1 >= r2) ? r1 : r2;
	return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
}

// 加法
export const accAdd = (arg1, arg2) => {
	var r1, r2, m, c;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	c = Math.abs(r1 - r2);
	m = Math.pow(10, Math.max(r1, r2));
	if (c > 0) {
		var cm = Math.pow(10, c);
		if (r1 > r2) {
			arg1 = Number(arg1.toString().replace(".", ""));
			arg2 = Number(arg2.toString().replace(".", "")) * cm;
		} else {
			arg1 = Number(arg1.toString().replace(".", "")) * cm;
			arg2 = Number(arg2.toString().replace(".", ""));
		}
	} else {
		arg1 = Number(arg1.toString().replace(".", ""));
		arg2 = Number(arg2.toString().replace(".", ""));
	}
	return (arg1 + arg2) / m;
}

// 创建链接
export const createURL = (url, param) => {
	let urlLink = '';
	for (let key in param) {
		let link = `&${key}=${param[key]}`;
		urlLink += link;
	}
	urlLink = url + '?' + urlLink.substr(1);
	return urlLink.replace(' ', '');
}

// UTZ时间转北京时间
export const utc2beijing = (utc_datetime) => {
	// 转为正常的时间格式 年-月-日 时:分:秒
	var T_pos = utc_datetime.indexOf('T');
	var Z_pos = utc_datetime.indexOf('Z');
	var year_month_day = utc_datetime.substr(0, T_pos);
	var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
	var new_datetime = year_month_day + " " + hour_minute_second;
	// 处理成为时间戳
	timestamp = new Date(Date.parse(new_datetime));
	timestamp = timestamp.getTime();
	timestamp = timestamp / 1000;
	// 增加8个小时，北京时间比utc时间多八个时区
	var timestamp = timestamp + 8 * 60 * 60;
	// 时间戳转为时间
	// var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
	// return beijing_datetime;
	var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	return Y + M + D + h + m + s;
}

// 数组排序
export const compare = (property) => {
	return function(a, b) {
		var value1 = parseInt(a[property]);
		var value2 = parseInt(b[property]);
		return value2 - value1;
	}
}

// 获取日期 day=0是今天
export const getDate = (day) => {
	var date = new Date();
	date.setTime(date.getTime() - 24 * 60 * 60 * day);
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

// 强制转成小数点后面2位
export const changeTwoDecimal_f = (x) => {
	var f_x = parseFloat(x);
	if (isNaN(f_x)) {
		return false;
	}
	f_x = Math.round(f_x * 100) / 100;
	var s_x = f_x.toString();
	var pos_decimal = s_x.indexOf('.');
	if (pos_decimal < 0) {
		pos_decimal = s_x.length;
		s_x += '.';
	}
	while (s_x.length <= pos_decimal + 2) {
		s_x += '0';
	}
	return s_x;
}
// 时间戳转化位日期格式
export const timestampToTime = (timestamp) => {
	var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = date.getDate() + ' ';
	var h = date.getHours() + ':';
	var m = date.getMinutes() + ':';
	var s = date.getSeconds();
	return Y + M + D + h + m + s;
}
// 跳转
export const go = (url) => {
	if (url == 'back') {
		uni.navigateBack();
	} else {
		uni.navigateTo({
			url: url
		})
	}
}