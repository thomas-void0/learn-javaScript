"use strict";
/*
 * @Author: your name
 * @Date: 2020-07-13 19:37:59
 * @LastEditTime: 2020-07-13 19:59:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \_webpack-based:\code\learn-javaScript\filter方法的实现\filter.ts
 */
Array.prototype.filter = function (callbackfn, thisArg) {
    if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'filter' of null or undefined");
    }
    // 处理回调函数异常
    if (Object.prototype.toString.call(callbackfn) != "[object Function]") {
        throw new TypeError(callbackfn + ' is not a function');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    var resLen = 0;
    var res = [];
    var T = thisArg || undefined;
    for (var i = 0; i < len; i++) {
        if (i in O) {
            var element = O[i];
            if (callbackfn.call(T, element, i, O)) {
                // 如果满足条件就加入到数组中
                res[resLen++] = element;
            }
        }
    }
    return res;
};
