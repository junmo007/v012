const tokenKey = "token";
const i18nKey = "i18n_lang"
const prefix = "ft_"
export default {
	set(key, value) {
		if (typeof value === 'object') {
			value = JSON.stringify(value)
		}
		uni.setStorageSync(prefix + key, value);
	},
	get(key) {
		const value = uni.getStorageSync(prefix + key);
		try {
			return JSON.parse(value);
		} catch (error) {
			return value
		}
	},
	rm(key) {
		uni.removeStorageSync(prefix + key);
	},
	clear() {
		uni.clearStorageSync();
	},
	getWebUrl() {
		return window.location.protocol + '//' + window.location.host
	},
	setToken(token) {
		this.set(tokenKey, token);
	},
	getToken() {
		return this.get(tokenKey);
	},
	forgetToken() {
		this.rm(tokenKey);
		this.rm('userinfo');
	},
	getLang() {
		return this.get(i18nKey);
	},
	setLang(lang) {
		this.set(i18nKey, lang);
	},
	setHeadInfo() {
		let rule = this.get('rule');
		if (rule.favicon) {
			var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
			link.type = 'image/x-icon';
			link.rel = 'shortcut icon';
			link.href = rule.favicon;
			document.getElementsByTagName('head')[0].appendChild(link);
		}
		if (rule.web_name) {
			document.title = rule.web_name
			uni.setNavigationBarTitle({
				title: rule.web_name
			});
		}
	},
	dataURLtoBlob(dataurl) {
		var arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], {
			type: mime
		});
	},
	fileToBase64(file, callback) {
		let r = new FileReader();
		r.onload = function() {
			callback(r.result)
		}
		r.readAsDataURL(file);
	},
	downloadFile(url, name = 'What\'s the fuvk') {
		var a = document.createElement("a")
		a.setAttribute("href", url)
		a.setAttribute("download", name)
		a.setAttribute("target", "_blank")
		let clickEvent = document.createEvent("MouseEvents");
		clickEvent.initEvent("click", true, true);
		a.dispatchEvent(clickEvent);
	},
	downloadFileByBase64(base64, name) {
		var myBlob = this.dataURLtoBlob(base64)
		var myUrl = URL.createObjectURL(myBlob)
		this.downloadFile(myUrl, name)
	},
	// 不对图片进行压缩，直接转成base64
	directTurnIntoBase64(fileObj, callback) {
		var r = new FileReader();
		// 转成base64
		r.onload = () => {
			//变成字符串
			let imgBase64 = r.result;
			callback(imgBase64);
		}
		r.readAsDataURL(fileObj); //转成Base64格式
	},
	// base64转file
	dataURLtoFile(dataurl) {
		let filename = Math.random().toString(36).substr(2) + '.png';
		let arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, {
			type: mime
		});
	},
	// 对图片进行压缩
	compressImg(fileObj, callback) {
		if (typeof(FileReader) === 'undefined') {
			console.log("当前浏览器内核不支持base64图标压缩");
			//调用上传方式不压缩
			callback('');
		} else {
			try {
				var reader = new FileReader();
				reader.readAsDataURL(fileObj);
				reader.onload = function(e) {
					var image = new Image();
					image.src = e.target.result
					image.onload = function(e) {
						let square = 200, //定义画布的大小，也就是图片压缩之后的像素
							canvas = document.createElement('canvas'),
							context = canvas.getContext('2d'),
							imageWidth = 200, //压缩图片的大小
							imageHeight = 200,
							offsetX = 0,
							offsetY = 0;
						canvas.width = imageWidth;
						canvas.height = imageHeight;
						context.clearRect(0, 0, imageWidth, imageHeight);

						if (this.width > this.height) {
							let imageWidth = Math.round(imageHeight * this.width / this.height);
							//let imageHeight = imageHeight;
							let offsetX = -Math.round((imageWidth - imageHeight) / 2);
						} else {
							let imageHeight = Math.round(imageWidth * this.height / this.width);
							//let imageWidth = imageWidth;
							let offsetY = -Math.round((imageHeight - imageWidth) / 2);
						}
						context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);
						let data = canvas.toDataURL('image/jpeg');
						//压缩完成执行回调
						callback(data);
					};
				};
			} catch (e) {
				console.log("压缩失败!");
				//调用直接上传方式  不压缩
				callback('')
			}
		}
	},
	getNowFormatDate() {
		var date = new Date();
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
	},
}
