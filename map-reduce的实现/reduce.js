"use strict";
/*
 * @Author: thomas
 * @Date: 2020-07-03 16:18:20
 * @LastEditTime: 2020-07-07 08:57:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \_webpack-based:\code\learn-javaScript\map-reduce的实现\reduce.ts
 */
Array.prototype.reduce = function (callbackFn, initValue) {
    // 首先进行类型检查
    if (this === null || this === undefined) {
        throw new TypeError("cannot read property 'reduce' of null or undefined");
    }
    // 进行callbackFn建查
    if (Object.prototype.toString.call(callbackFn) !== '[object Function]') {
        throw new TypeError(callbackFn + 'is not a function');
    }
    var O = Object(this); //获取当前调用reduce的数组
    var len = O.length >>> 0; //获取到调用reduce的数组的长度
    var accumulator = initValue;
    var k = 0;
    // 如果没有初始值的情况下,获取到数组的第一个值作为initValue
    if (accumulator === void 0) {
        for (; k < len; k++) {
            if (k in O) {
                accumulator = O[k];
                k++;
                break; //跳出循环
            }
        }
    }
    //判读数组是否为空，抛出异常
    if (k === len && accumulator === void 0) {
        throw new Error("Each element of the array is empty");
    }
    //调用传入的回调函数
    for (; k < len; k++) {
        if (k in O) {
            accumulator = callbackFn.call(undefined, accumulator, O[k], k, O);
        }
    }
    return accumulator;
};
