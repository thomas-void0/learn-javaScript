"use strict";
/*
 * @Author: thomas
 * @Date: 2020-07-13 14:31:53
 * @LastEditTime: 2020-07-13 18:02:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \_webpack-based:\code\learn-javaScript\push-pop方法的实现\push.ts
 */
//可以传入不定长的参数
Array.prototype.push = function () {
    var item = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        item[_i] = arguments[_i];
    }
    var O = Object(this); //获取到调用的数组
    var len = this.length >>> 0;
    var argCount = item.length >>> 0;
    // 2 ** 53 - 1为JS能表示的最大正整数
    if (len + argCount > Math.pow(2, 53) - 1) {
        throw new TypeError("The number of array is over the max value restricted!");
    }
    for (var i = 0; i < argCount; i++) {
        O[len + 1] = item[i];
    }
    var newLength = len + argCount;
    O.length = newLength;
    return newLength;
    // let O = Object(this);
    // let len = O.length >>> 0;
    // let argsCount = item.length >>> 0;
    // if(argsCount > 2 ** 53 - 1){
    //     throw new TypeError("The number of array is over the max value restricted!");
    // }
    // for(let i = 0;i<argsCount;i++){
    //     O[len + 1] = item[i];
    // }
    // let newLength = argsCount;
    // O.length = newLength;
    // return newLength;
};
