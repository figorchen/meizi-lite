import {envir_Status} from '../store/types.js';
if (envir_Status.value){
	//线上环境
  module.exports={
    bjApi: 'https://bj-api.jianke.com',
		bgLogin: "https://bj-wx.jianke.com/ask",
		detailapi: 'https://wcgi.jianke.com',		
		AUTH_ROOT: 'https://auth.jianke.com',
		ACCOUNT_ROOT:'https://wcgi.jianke.com',
		DOCTOR_LOGIN_ROOT:'https://acgi.jianke.com',
		protocolApi:'https://bj-h5.jianke.com/smallClinic',
		GZ_API:'https://acgi.jianke.com'
  }
}else{
		//测试环境
  module.exports = {
		  bjApi: 'https://bjtest.jianke.com', //北京测试环境
	 //	 bjApi: 'http://bj-api.d.jianke.com', //北京开发环境
		bgLogin: "https://bjtest.jianke.com/wechat",
	//	 bgLogin: "http://bj-api.d.jianke.com/wechat",
		detailapi: 'https://bj-tst.jianke.com',
		AUTH_ROOT: 'http://member-oauth2.tst.jianke.com',
		ACCOUNT_ROOT: 'https://cs-wcgi.jianke.com',
		DOCTOR_LOGIN_ROOT: 'http://acgi.tst.jianke.com',
		protocolApi: 'https://bjtesth5.jianke.com/smallClinic',
		GZ_API:'https://cs-acgi-bj.jianke.com'

  }

}