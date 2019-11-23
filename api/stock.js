import apiRoot from '../config/prod.env.js';
import service from './service';

export default {
    getStock(drugList, showTip, callback, cancelCallback, finallyCallback, hospital) {
        if ((drugList instanceof Array ? drugList.length < 1 : !drugList)) {
            return
        }
        getApp().showLoading();
        let drugMap = new Map();
        let productCodeList = [];
        if (drugList instanceof Array) {
            drugList.forEach(function (drug) {
                productCodeList.push(drug.productCode);
                drugMap.set(parseInt(drug.productCode), drug)
            })
        } else {
            productCodeList.push(drugList.productCode);
            drugMap.set(parseInt(drugList.productCode), drugList)
        }

        let params = {
            productCodeList: productCodeList
        };
        if (hospital) {
            params.hospital = hospital
        }
        service.postP(apiRoot.bjApi + '/product/stock/getLast', params, getApp().globalData.hospitalHeader)
            .then((result) => {
                let tips = '';
                //遍历库存结果, 提出库存不够的药品名称, 显示模态弹窗
                for (let variable in result) {
                    console.log(variable);
                    let drug = drugMap.get(parseInt(variable));
                    let remainStock = result[variable];
                    drug.stock = remainStock;
                    if (remainStock < drug.amount && showTip) {
                        tips += '【' + drug.productName + '】数量超过剩余库存（' + remainStock + '）、'
                    }
                }
                if (finallyCallback) {
                    finallyCallback(drugList)
                }

                // 有些药品库存不够
                if (tips) {
                    getApp().hideLoading();
                    tips = tips.substring(0, tips.length - 1) + '，发货时间可能有所延迟，是否继续？'
                    wx.showModal({
                        confirmText: '继续',
                        cancelText: '取消',
                        confirmColor: '#59baff',
                        showCancel: !!cancelCallback,
                        content: tips,
                        success: function (res) {
                            if (res.confirm) {
                                if (callback) {
                                    callback(drugList);
                                }
                            } else {
                                if (cancelCallback) {
                                    cancelCallback(drugList)
                                }
                            }
                        }
                    })
                } else {
                    //库存充足
                    if (callback) {
                        callback(drugList);
                    }
                }
            }).catch(function () {
            if (callback) {
                callback(drugList);
            }
            if (finallyCallback) {
                finallyCallback(drugList)
            }
        }).finally(function () {
            getApp().hideLoading()
        })
    },
    stockPromise(data) {
        return service.postP(apiRoot.bjApi + '/product/stock/getLast', {productCodeList: data.productCodeList}, getApp().globalData.hospitalHeader)
            .then(result => {
                delete data.productCodeList;
                for(let variable in data.goodsDataList) {
                    if(!data.goodsDataList.hasOwnProperty(variable)) {
                        continue
                    }
                    let drug = data.goodsDataList[variable];
                    drug.stock = result[drug.productCode];
                }
                getApp().globalData.shoppingCarCount = data.num;
                return data;
            })
    },
    drugStockPromise(productCode) {
        return service.postP(apiRoot.bjApi + '/product/stock/getLast', {productCodeList: [productCode]}, getApp().globalData.hospitalHeader)
            .then(result => {
                return result[productCode];
            })
    },
}