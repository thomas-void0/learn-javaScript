"use strict";
/*
 * @Author: your name
 * @Date: 2020-07-03 16:17:24
 * @LastEditTime: 2020-07-03 16:40:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \_webpack-based:\code\learn-javaScript\map-reduce的实现\map.ts
 */
Array.prototype.map = function (callbackFn, thisArg) {
    // 进行检查
    if (this === null || this === undefined) {
        throw new TypeError("cannot read property 'map' of null or undefined");
    }
    // 如果callbackFn不是函数
    if (Object.prototype.toString.call(callbackFn) !== '[object Function]') {
        throw new TypeError(callbackFn + "is not a function");
    }
    var O = Object(this); //获取到调用map方法的数组
    var T = thisArg; //获取到需要绑定的this
    var len = O.length >>> 0; //获取到调用map方法的数组长度
    var result = []; //定义一个结果数组
    for (var k = 0; k < len; k++) {
        //查找数组原型链
        if (k in O) {
            var value = O[k]; //获取到本次循环的值
            var mapValue = callbackFn.call(T, value, k, O);
            result.push(mapValue);
        }
    }
    return result;
};
