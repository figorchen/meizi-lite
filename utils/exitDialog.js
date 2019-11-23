import {
  userInfo,
	IS_CHECK
} from '../store/types';

import exit from '../utils/exitUtil.js'

function exitDialog() {
	wx.showModal({
		title: '提示',
		content: '登录失效,请重新登录',
		showCancel: false,
		success: function (res) {
			if (res.confirm) {
				exit.exitClearData()
			} else {
				exitDialog()
			}
		}
	})
}

export default {

   showExitDialog() {
		 exitDialog()
  },

  //校验用户审核状态 以及 弹出 审核通过提示框
	 showUserBusinessStatusDialog(userBusinessStatus, oldUserBusinessStatus) {
		 
    //审核通过状态 直接return
    if (oldUserBusinessStatus == 1 || oldUserBusinessStatus == 3 || oldUserBusinessStatus == 5) {
      return true
    }

    var toastTxt = ''
    if (userBusinessStatus == 3) { //医生审核通过
			toastTxt = '医生验证通过，已为您开通在线开药权限,您需要重新登录以便使用该权限。'
    } else if (userBusinessStatus == 5) { //诊所审核通过
			toastTxt = '机构验证通过，已为您开通药品采购权限,您需要重新登录以便使用该权限。'
    }
    if (!toastTxt) {
      return true
    }

    wx.showModal({
      title: '提示',
      content: toastTxt,
      showCancel: false,
      success: function(res) {
				exit.exitClearData()
      }
    })
		return false
  },

}