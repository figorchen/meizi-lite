import apiRoot from '../config/prod.env.js';
import service from './service';
import {
    localStorageType,
    userInfo,
    LAST_USER_PHONE
} from '../store/types';
import exitDialog from '../utils/exitDialog'


service.baseUrl()
    .interceptor(res => {
        if (res && res.statusCode != 200 && res.statusCode != 201 && res.statusCode != 404) {
            var msg = (res && res.data && res.data.msg) ? res.data.msg.info : "数据获取失败";
            wx.showToast({
                icon: "none",
                title: msg,
                duration: 2000
            })
        } else if (res && res.data && res.data.msg && res.data.msg.code == 10001) { //北京接口登录失效
            console.log('登录失效')
            wx.hideLoading()
            exitDialog.showExitDialog()
            return false
        }
        return true;
    })


var globalData = getApp().globalData

export default {
    //北京接口

    //创建处方
    createPrescrip(params) {

        return service.post(apiRoot.bjApi + '/prescription/api/prescription/share/savePrescription', params, globalData.hospitalHeader);
    },
    // 获取订单确认信息
    getOrderConfirmInfo(params) {

        return service.post(apiRoot.bjApi + '/order/api/order/initShareOrder', params, globalData.hospitalHeader);
    },
    //订单提交
    postSubmitOrder(params) {
        return service.post(apiRoot.bjApi + '/order/api/order/placeOrder', params, globalData.hospitalHeader);
    },
    //订单支付
    postPayOrder(params) {

        return service.post(apiRoot.bjApi + '/pay/create/orderPay', params, globalData.hospitalHeader);
    },
    //订单列表
    orderList(params) {
        return service.postP(apiRoot.bjApi + '/order/api/order/newOrderList', params, globalData.hospitalHeader);
    },
    //删除订单
    deleteOrder(params) {
        return service.post(apiRoot.bjApi + "/order/api/order/deleteOrder", params, globalData.hospitalHeader);
    },
    // //再次购买订单
    buyAgain(params) {
        return service.post(apiRoot.bjApi + "/order/api/order/buyAgain", params, globalData.hospitalHeader);
    },
    //获取登录的sessionKey
    getSessionKey(params) {
        return service.post(apiRoot.bgLogin + '/api/wxUtil/getMiniWxSession', params);
    },
    //获取userID openID unionId
    getUserData(params) {
        return service.post(apiRoot.bgLogin + '/api/wxUtil/getMiniUserInfo', params, globalData.hospitalHeader);
    },
    DoctorInfo(params) {

        return service.post(apiRoot.bjApi + '/search/api/doctor/doctorDetail', params, globalData.hospitalHeader);
    },
    //根据药品名搜索药品
    searchDrugByName(params) {

        return service.getP(apiRoot.bjApi + '/search/search', params, globalData.hospitalHeader);
    },
    //搜索推荐药品
    searchDrugName(params) {

        return service.get(apiRoot.bjApi + '/search/suggest', params, globalData.hospitalHeader);
    },
    //根据药品类型
    queryDrugByCategory(params) {

        return service.getP(apiRoot.bjApi + '/product/listByCategory', params, globalData.hospitalHeader);
    },
    //登陆医院
    loginHospital(params) {
        return service.post(apiRoot.bjApi + '/user/api/user/clinicLogin', params, globalData.hospitalHeader);
    },

    //退出登录
    logoutHospital(params) {
        return service.postP(apiRoot.bjApi + '/user/api/user/clinicLogout', {}, globalData.hospitalHeader);
    },

    //获取分享记录
    prescriptionSharingRecord(params) {

        return service.post(apiRoot.bjApi + '/prescription/api/prescription/share/getPrescriptionShareRecord', params, globalData.hospitalHeader);
    },

    //获取分享处方支付记录
    getPreSharePayRecord(params) {

        return service.get(apiRoot.bjApi + '/prescription/api/prescription/share/getPreSharePayRecord', params, globalData.hospitalHeader);
    },

    //获取处方分享详情
    prescriptionDetail(params) {

        return service.get(apiRoot.bjApi + '/prescription/api/prescription/detailDoctor', params, globalData.hospitalHeader);
    },


    //获取处方分享详情通过sharedCode
    shareDetail(params) {

        return service.get(apiRoot.bjApi + '/prescription/api/prescription/clinic/share/detail', params, globalData.hospitalHeader);
    },


    //医院医生信息
    hospitalUserInfo(params, header) {

        if (!header) {
            header = globalData.hospitalHeader
        }

        return service.get(apiRoot.bjApi + '/user/api/hospitalUser/getUserInfo', params, header);

    },

    //医院订单详情
    hospitalInitOrder(params) {

        return service.post(apiRoot.bjApi + '/order/api/clinicorder/initOrder', params, globalData.hospitalHeader);

    },
    //医院提交订单
    hospitalpostSubmit(params) {

        return service.postP(apiRoot.bjApi + '/order/api/clinicorder/placeOrder', params, globalData.hospitalHeader);
    },
    //-药品分类接口  采购清单页面
    purchaseList(params) {

        return service.getP(apiRoot.bjApi + '/cart/info/list', params, globalData.hospitalHeader);
    },

    //我的药房--药品分类接口
    listCategory(params) {

        return service.get(apiRoot.bjApi + '/product/listCategory', params, globalData.hospitalHeader);
    },
    //常用药
    getRecommendProduct(params) {

        return service.get(apiRoot.bjApi + '/product/getRecommendProduct', params, globalData.hospitalHeader);
    },

    //添加到购物车
    addToCar(params) {

        return service.postP(apiRoot.bjApi + '/cart/op/addCart', params, globalData.hospitalHeader);
    },
    //添加到购物车并校验
    addToCarAndCheck(params) {

        return service.post(apiRoot.bjApi + '/cart/op/addCartStock', params, globalData.hospitalHeader);
    },
    // 处方分享
    sharePrescription(params) {
        return service.post(apiRoot.bjApi + '/prescription/api/prescription/clinic/share/create', params, globalData.hospitalHeader);
    },
    //删除购物车
    delCart(params) {
        return service.delete(apiRoot.bjApi + '/cart/op/delCart', params, globalData.hospitalHeader);
    },
    //首页特价或销量高商品列表接口
    getPromotionList(params) {
        return service.getP(apiRoot.bjApi + '/activity/business/config/combinationFindPromotionList', params, globalData.hospitalHeader);
    },
    //查询药品限购信息
    getLimitInfo(patientId, productId) {
        var params = {
            patientId: patientId,
            productId: productId
        }

        return service.postP(apiRoot.bjApi + '/order/api/clinicorder/limitedProductNum', params, globalData.hospitalHeader);
    },
    //查询医生邀请记录
    getInviteDoctorRecord(params) {

        return service.get(apiRoot.bjApi + '/user/api/hospitalUser/getInviteDoctorRecord', params, globalData.hospitalHeader);
    },
    //查询医生邀请界面的二维码
    getInviteDoctorQRCode(params) {
        return service.get(apiRoot.bjApi + '/user/api/myUser/getInviteQrcode', params, globalData.hospitalHeader);
    },
    //查询云医币列表
    getCurrencyList(params) {
        return service.post(apiRoot.bjApi + '/activity/coin/clinic/userCoinDetailList', params, globalData.hospitalHeader);
    },
    //查询优惠券
    getCouponList(params) {
        return service.postP(apiRoot.bjApi + '/activity/coupon/clinic/userCouponList', params, globalData.hospitalHeader);
    },
    //-----------------------认证相关
    /**
     * 获取所有区域
     */
    getAllAreaRegion() {
        var params = {
            "level": 3
        }
        return service.getP(apiRoot.bjApi + '/core/api/baseData/getAllAreaRegion', params, globalData.hospitalHeader)
    },
    /**
     * 根据医院名查询医院是否存在
     */
    existHospital(nameCn) {
        var params = {
            nameCn: nameCn
        }
        return service.postP(apiRoot.bjApi + '/core/api/baseData/existHospital', params, globalData.hospitalHeader)
    },
    /**
     * 医院证书照片上传接口
     */
    uploadHospitalPics(filePath, data) {
        var params = {
            url: apiRoot.bjApi + "/core/api/baseData/uploadHospitalPics",
            header: globalData.hospitalHeader,
            data: data,
            filePath: filePath
        }
        return service.uploadFile(params)
    },
    /**
     * 保存医院
     */
    saveHospital(params) {

        return service.postP(apiRoot.bjApi + '/core/api/baseData/saveHospital', params, globalData.hospitalHeader)
    },
    /**
     * 获取科室信息
     */
    getDepartment() {
        var params = {
            "dataType": "1"
        }
        return service.getP(apiRoot.bjApi + '/core/api/baseData/getDepartment', params, globalData.hospitalHeader)
    },
    /**
     * 获取医生的职称
     */
    getDoctorTitle() {
        var params = {
            "type": "3"
        }
        return service.getP(apiRoot.bjApi + '/core/api/common/basedata', params, globalData.hospitalHeader)
    },
    /**
     * 上传医生图片
     */
    uploadDoctorPics(filePath, data) {
        var params = {
            url: apiRoot.bjApi + "/user/api/image/upload",
            header: globalData.hospitalHeader,
            data: data,
            filePath: filePath
        }
        return service.uploadFile(params)
    },
    /**
     * 提交认证信息
     */
    sumitUserInfo(params) {
        return service.postP(apiRoot.bjApi + "/user/api/hospitalUser/sumitUserInfo", params, globalData.hospitalHeader)
    },
    getBannerList(params) {
        return service.get(apiRoot.bjApi + 'base/banner/list', params, globalData.hospitalHeader);
    },
    listBannerAndMessage(params) {
        return service.get(apiRoot.bjApi + '/base/bannerAndMessage/listBannerAndMessage', params, globalData.hospitalHeader);
    },
    //查询当前医生所有的可用的云医币和优惠券
    getAllCouponAndCoin() {

        return service.get(apiRoot.bjApi + '/user/api/account/getAllCouponAndCoin', {}, globalData.hospitalHeader);
    },
    conponInitSelect(params) {
        return service.get(apiRoot.bjApi + '/pay/coupon/clinic/initSelect', params, globalData.hospitalHeader);
    },
    //获取可用和不可用优惠券
    getUseableCoupon(params) {
        return service.get(apiRoot.bjApi + '/pay/coupon/clinic/userUseCouponList', params, globalData.hospitalHeader);
    },
    //批量删除购物车数据
    removeDrugs(productCodeList) {
        var params = {
            productCodeList: productCodeList,
            patientId: wx.getStorageSync(userInfo.doctorUserInfo).id
        }
        return service.postP(apiRoot.bjApi + '/cart/op/batchDelCartNew', params, globalData.hospitalHeader);
    },

    //绑定诊所
    bindHospital(params) {
        return service.post(apiRoot.bjApi + '/core/api/baseData/bindHospitalUser', params, globalData.hospitalHeader);
    },
    //获取某个商品当前在购物车内数量
    getCurretNum(productCode) {
        var params = {
            productCode: productCode,
            patientId: wx.getStorageSync(userInfo.doctorUserInfo).id
        }
        return service.getP(apiRoot.bjApi + '/cart/info/currentNum', params, globalData.hospitalHeader);
    },
    //获取登录方式
    checkLoginType() {

        return service.get(apiRoot.bjApi + '/base/init/conf', {}, globalData.hospitalHeader);
    },
    //订单详情
    orderDetail(orderId) {
        var params = {
            orderId: orderId,
            patientId: wx.getStorageSync(userInfo.doctorUserInfo).id
        }
        return service.getP(apiRoot.bjApi + '/order/api/order/orderDetail', params, globalData.hospitalHeader);
    },
    //取消订单
    cancelOrder(orderId) {
        var params = {
            orderCode: orderId
        }
        return service.postP(apiRoot.bjApi + '/order/api/order/cancelOrder', params, globalData.hospitalHeader);
    },
    // 获取建议价
    advicePrice(code) {
        var params = {
            productCode: code
        }
        return service.getP(apiRoot.bjApi + '/product/price/getSuggest', params, globalData.hospitalHeader);
    },
    // 获取当前购物车所有商品数量
    queryCarNum(code) {
        var params = {
            patientId: wx.getStorageSync(userInfo.doctorUserInfo).id
        }
        return service.getP(apiRoot.bjApi + '/cart/info/allCurrentNum', params, globalData.hospitalHeader);
    },

    //增加缺货统计
    insertstockoutrecord(productId, productName, recordNum) {
        let params = {
            userId: wx.getStorageSync(userInfo.hospitalUserInfo).userId,
            phone: wx.getStorageSync(LAST_USER_PHONE),
            productId: productId,
            productName: productName,
            recordNum: recordNum
        }
        return service.postP(apiRoot.bjApi + '/order/api/stockoutRecord/insertStockoutRecord', params, globalData.hospitalHeader);
    },
    //获取资讯内容
    getInformationDetail(params){
        return service.get(apiRoot.bjApi + '/base/api/information/getInformationDetail', params, globalData.hospitalHeader);
    },
    //点赞资讯
    praiseInformation(params){
        return service.get(apiRoot.bjApi + '/base/api/information/praiseInformation', params, globalData.hospitalHeader);
    },
    //根据资讯获取处方
    getPrescriptionByInformationId(params){
        return service.get(apiRoot.bjApi + '/base/api/information/getPrescriptionByInformationId', params, globalData.hospitalHeader);
    },
    //阅读资讯
    browseInformation(params){
        return service.get(apiRoot.bjApi + '/base/api/information/browseInformation', params, globalData.hospitalHeader);
    },

    //获取电子发票封装接口
    getInvoicesUrl(params){
         return service.getP(apiRoot.bjApi+'/order/api/order/getInvoicesUrl',params, globalData.hospitalHeader);
    },
    
    //添加愿望清单
    insertSupportDrug(params){
        return service.post(apiRoot.bjApi + '/order/api/supportDrug/insertSupportDrug', params, globalData.hospitalHeader);
    },
    //获取我的愿望清单列表
    getMyWishList(params){
        return service.postP(apiRoot.bjApi+'/order/api/supportDrug/getMySupportDrugList', params, globalData.hospitalHeader)
    },
    //查看愿望清单详情
    getWishListDetail(params){
        return service.getP(apiRoot.bjApi+'/order/api/supportDrug/getById',params,globalData.hospitalHeader)
    },
    //愿望清单,七牛云获取图片token
    getUptoken(params){
        return service.postP(apiRoot.bjApi+'/user/api/image/getUptoken',params,globalData.hospitalHeader)
    },
    //资质查询
    getQualification(params){
        return service.getP(apiRoot.bjApi+'/base/qualification/list',params,globalData.hospitalHeader)
    }

}