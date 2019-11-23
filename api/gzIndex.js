import apiRoot from '../config/prod.env.js';
import service from './service';
import {userInfo} from '../store/types';
var CusBase64 = require('../utils/base64.js');
export default
{
  //获取默认地址信息
  getDefaultAddress(params){
  var header={
			'Authorization': 'Bearer ' + wx.getStorageSync(userInfo.doctorUserInfo).access_token,
      'Content-Type':'application/json'
  }
    return service.get(apiRoot.DOCTOR_LOGIN_ROOT+'/deliveryAddresses/default',params,header);
  },
  //设置默认地址信息
  setDefaultAddress(params){
  	var header={
			'Authorization': 'Bearer ' + wx.getStorageSync(userInfo.doctorUserInfo).access_token,
      'Content-Type':'application/json'
  } 
    return service.put(apiRoot.DOCTOR_LOGIN_ROOT+'/deliveryAddresses/'+params.id+'/default',params,header);
  },
  //获取地址列表
  getAddressList(params){
  	 var header={
			'Authorization': 'Bearer ' + wx.getStorageSync(userInfo.doctorUserInfo).access_token,
      'Content-Type':'application/json'
  }
    return service.get(apiRoot.DOCTOR_LOGIN_ROOT+'/deliveryAddresses/',params,header);
  },
  //新增地址信息
  createAddress(params){
  	 var header={
			'Authorization': 'Bearer ' + wx.getStorageSync(userInfo.doctorUserInfo).access_token,
      'Content-Type':'application/json'
  }
    return service.post(apiRoot.DOCTOR_LOGIN_ROOT+'/deliveryAddresses/',params,header);
  },
  //删除地址
  deleteAddress(params){
  	 var header={
			'Authorization': 'Bearer ' + wx.getStorageSync(userInfo.doctorUserInfo).access_token,
      'Content-Type':'application/json'
  }
    return service.delete(apiRoot.DOCTOR_LOGIN_ROOT+'/deliveryAddresses/'+params.id,params,header);
  },
  //修改地址信息
  updateAddress(params){
  	 var header={
			'Authorization': 'Bearer ' + wx.getStorageSync(userInfo.doctorUserInfo).access_token,
      'Content-Type':'application/json'
  }
    return service.put(apiRoot.DOCTOR_LOGIN_ROOT+'/deliveryAddresses/'+params.id,params,header);
  },
	//获取标准地区编码
	getAreaRegions(params){
        var header={
            'Authorization': 'Bearer ' + wx.getStorageSync(userInfo.doctorUserInfo).access_token,
            'Content-Type':'application/json'
        };
        return service.get(apiRoot.DOCTOR_LOGIN_ROOT+'/area/areaRegions',params,header);
	},
	//医生获取userId
	doctorAccount(token){
		var header = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Bearer ' + token
		}
		return service.get(apiRoot.DOCTOR_LOGIN_ROOT + '/account', {}, header);
	},
  //产品详情
  productDetail(params){
		return service.get(apiRoot.detailapi + '/details/api/mobile/mainData/' + params.productCode + '?filterOnlyMall=true');
  },
	//获取tickets
	tickets(params) {

		var header = {
			'Content-Type': 'application/json'
		}
		return service.post(apiRoot.ACCOUNT_ROOT + '/v2/captcha/sms/tickets', params, header)
	},
	//获取验证码
	captchas(params) {

		var header = {
			'Content-Type': 'application/json'
		}
		return service.post(apiRoot.ACCOUNT_ROOT + '/v2/captcha/sms/captchas', params, header)
	},
	//获取图形验证码
	imageCaptchas() {

		var header = {
			'Content-Type': 'application/json'
		}
		return service.post(apiRoot.ACCOUNT_ROOT + '/v2/captcha/image/captchas', {}, header)
	},
	//验证码登录
	smsLogin(params) {

		var header = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'organizationCode': 'app.jianke'
		}
		return service.post(apiRoot.ACCOUNT_ROOT + '/passport/account/smsLogin', params, header)
	},

	//刷新患者端token
	refreshToken() {
		var basic = 'mall_app:app_password'
		var result = CusBase64.CusBASE64.encoder(basic);

		var refresh_token = wx.getStorageSync(userInfo.doctorUserInfo).refresh_token

		// console.log('basic==' + result)
		// console.log('refresh_token==' + refresh_token)

		var header = {
			'Authorization': 'Basic ' + result,
			'Content-Type': 'application/x-www-form-urlencoded',
		}

		var params ={
			'grant_type':'refresh_token',
			'refresh_token': refresh_token
		}

		return service.post(apiRoot.AUTH_ROOT + '/uaa/oauth/token', params, header)
	},

	//登陆医生
	loginDoctor(params) {
		var header = {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
		return service.post(apiRoot.ACCOUNT_ROOT + '/passport/account/login', params, header);
	},
	//获取物流信息
	ordersLogistics(params){
		var header = {
			'Authorization': 'Bearer ' + wx.getStorageSync(userInfo.doctorUserInfo).access_token,
			'Content-Type': 'application/json'
		}
		return service.get(apiRoot.DOCTOR_LOGIN_ROOT + '/v2/orders/logistics', params, header);
	},
	//发送电子发票封装接口
	sendEmail(params){
		var header = {
			'Authorization': 'Bearer ' + wx.getStorageSync(userInfo.doctorUserInfo).access_token,
			'Content-Type': 'application/json'
		}
		return service.get(apiRoot.GZ_API+'/invoices/sendEmail',params, header);
}
  
}