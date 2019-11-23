//登录过滤器

// var global = getApp().globalData;
import { localStorageType, userInfo } from '../store/types';

var pageRoute = ''
var path = ''

function isLogin(){
	return wx.getStorageSync(userInfo.hospitalUserInfo).userId && wx.getStorageSync(userInfo.doctorUserInfo).access_token
}
//是否授权
function isAuth() {
	return wx.getStorageSync(localStorageType.userInfo).openid
}

function getPageInstance() {
	var pages = getCurrentPages();
	return pages[pages.length - 1];
}
function getOptions() {
	var pages = getCurrentPages()    //获取加载的页面

	var currentPage = pages[pages.length - 1]
	var options = currentPage.options
	return options;
}
function getUrlOptions(){
	var map = getOptions()
	var url = ''
	for (var key in map) {
		url = url + key+'='+map[key]+'&'
	}
	return url
}

//先判断授权  再判断登录
function identityFilter(pageObj) {
	if (pageObj.onLoad && pageObj.data) {
		let _onLoad = pageObj.onLoad;
		pageObj.onLoad = function () {

			if (isAuth() && isLogin()) {
				//获取页面实例，防止this劫持
				let currentInstance = getPageInstance();
				_onLoad.call(currentInstance, getOptions());
			}else{
				pageRoute = getPageInstance().route
				path = 'pageRoute=' + pageRoute + '&' + getUrlOptions()
				console.log(path)
			}
		}
	}
	if (pageObj.onShow && pageObj.data) {
		let _onShow = pageObj.onShow;
		pageObj.onShow = function () {

			if (isAuth() && isLogin()) {
				//获取页面实例，防止this劫持
				let currentInstance = getPageInstance();
				_onShow.call(currentInstance, getOptions());
			}
		}
	}
	// if (pageObj.onReady && pageObj.data) {
		let _onReady = pageObj.onReady; 
		pageObj.onReady = function () {

			if (!isAuth()) {  //未授权
				console.log(path)
				wx.reLaunch({
					url: '/pages/auth/auth?' + path,
				})
			} else if (!isLogin()) { //如果未登录则 跳转到登录页
				console.log(path)
				wx.reLaunch({
					url: '/pages/login/login?' + path,
				})
			} else if (_onReady) {
				let currentInstance = getPageInstance();
				_onReady.call(currentInstance, getOptions());
			}
		}
	// }

	return pageObj;
}
//只判断授权
function identityFilterAuth(pageObj) {
	if (pageObj.onLoad && pageObj.data) {
		let _onLoad = pageObj.onLoad;
		pageObj.onLoad = function () {

			if (!isAuth()) {  //未授权

				pageRoute = getPageInstance().route
				path = 'pageRoute=' + pageRoute + '&' + getUrlOptions()

			} else {
				//获取页面实例，防止this劫持
				let currentInstance = getPageInstance();
				_onLoad.call(currentInstance, getOptions());
			}
		}
	}

	if (pageObj.onShow && pageObj.data) {
		let _onShow = pageObj.onShow;
		pageObj.onShow = function () {

			if (isAuth()){
				//获取页面实例，防止this劫持
				let currentInstance = getPageInstance();
				_onShow.call(currentInstance, getOptions());
			}
		}
	}

	// if (pageObj.onReady && pageObj.data) {
		let _onReady = pageObj.onReady;
		pageObj.onReady = function () {

			if (!isAuth()) {  //未授权
				wx.reLaunch({
					url: '/pages/auth/auth?' + path,
				})
			} else if (_onReady) {
				let currentInstance = getPageInstance();
				_onReady.call(currentInstance, getOptions());
			}
		}
	// }

	return pageObj;
}


exports.identityFilter = identityFilter;
exports.identityFilterAuth = identityFilterAuth;