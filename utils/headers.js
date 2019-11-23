
//用来构建header
function buildHeaders(hospitalUserInfo) {
	
  var traceinfo = 'applicationCode=jkCloudClinic' +
    ';source=5;loginSource=3;'

	if (hospitalUserInfo && hospitalUserInfo.userId) {
    traceinfo = traceinfo + 'userId=' + hospitalUserInfo.userId + ';'
  }

	if (hospitalUserInfo && hospitalUserInfo.userToken) {
    traceinfo = traceinfo + 'userToken=' + hospitalUserInfo.userToken + ';'
  }
  try {
    var systemInfo = wx.getSystemInfoSync()
    console.log(systemInfo)
    if(systemInfo){
      traceinfo += `osVersion=${systemInfo.system};model=${systemInfo.model};`
    }
  } catch (e) {
    // Do something when catch error
  }

  var header = {
    'traceinfo': traceinfo,
    'Content-Type': 'application/json'
  }
  return header
}

export default function getHeaders(hospitalUserInfo) {
  return buildHeaders(hospitalUserInfo)
}