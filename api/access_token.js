import commen from '../assets/js/commen';
import {localStorageType} from '../store/types';
import service from './service';
import apiRoot from '../config/prod.env.js';
export default 
{
	//检查本地是否有token
	isLogin()
	{
    var oauth =wx.getStorageSync(localStorageType.oAuth);
		if(oauth&&oauth.access_token)
		{
			return true;
		}
		return false;
	},
	//更新token,请求服务器token
	updateToken()
	{
		var header={
			'Authorization':'Basic d3hfZG9jdG9yOnd4X3Bhc3N3b3Jk',
      		'Content-Type':'application/x-www-form-urlencoded'
		}
    	var user = wx.getStorageSync(localStorageType.userInfo);
		if(!user||!user.openid)
		{
			return;
		}
		// const formData = new FormData();
		// formData.append('grant_type', 'password');
		// formData.append('username', user.openId);
		// formData.append('password', "");

		service.post(apiRoot.gzoauth+'/uaa/oauth/token',{"grant_type":"password","username":user.openid,'password':""},header)
		.then((result)=>{
		  	if(result&&result.data){
		        wx.setStorageSync(localStorageType.oAuth,result.data);
				return true;
			}
      		else{
	            return false;
	        }
		  })
		  .catch(function (error) {
		  		return false;
	    });
	},
	//获取本地token
	getLocalToken()
	{
     var oauth = wx.getStorageSync(localStorageType.oAuth);
		if(oauth&&oauth.access_token)
		{
			return oauth.access_token;
		}
		return "";
	},

	
}