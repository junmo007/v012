// 主题样式
export default {
	addColor(init) {
		let keys = ['blueDrak', 'blueLight']
		let obj = themes[keys.indexOf(init) != -1 ? init : 'blueLight']
		console.log(obj);
		// html 添加主题样式
		for (let key in obj) {
			document.documentElement.style.setProperty(key, obj[key]);
		}
	}
}
