import {
	userInfo,
	IS_CHECK,
  localStorageType
} from '../store/types.js';
import { clinicCache} from '../assets/js/cache_clinic_certification.js';
import {doctorCertification} from '../assets/js/cache_doctor_certification.js';
import { indexCache } from '../assets/js/index_cache.js'
import getHeaders from './headers.js';
import apiRoot from '../config/prod.env.js';
import service from '../api/service';

//无法使用index 中接口 循环引用
function logoutHospital(params) {
	let globalData = getApp().globalData
	return service.postP(apiRoot.bjApi + '/user/api/user/clinicLogout', {}, globalData.hospitalHeader);
}


export default{

	//退出清空数据
	exitClearData: function () {

		//注销接口
		logoutHospital()
			.then((result) => {
				wx.hideLoading()
			})
			.catch(function (error) {
				console.log(error);
				wx.hideLoading()
			})


    //清空认证数据
    clinicCache.removeClinicInfo()
    doctorCertification.removeClinicInfo()
    //清空首页的缓存
    indexCache.removeClinicInfo()
		wx.removeStorageSync(userInfo.hospitalUserInfo)
		wx.removeStorageSync(userInfo.doctorUserInfo)
		wx.removeStorageSync(userInfo.hospitalUserDetailInfo)
		wx.removeStorageSync(IS_CHECK)
    wx.removeStorageSync(localStorageType.searchHistory);
		getApp().globalData.hospitalHeader = getHeaders('')
		getApp().globalData.shoppingCarCount = 0
		getApp().globalData.shareCarCount = 0
		getApp().globalData.shareDrugs = []
		getApp().globalData.diagnos = ""
		getApp().globalData.isCheck = false
		getApp().globalData.isNeedRefresh=true
    getApp().globalData.isNeedRefreshPage = true

		wx.reLaunch({
			url: '/pages/login/login'
		})

	}

}