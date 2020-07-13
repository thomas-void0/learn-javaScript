"use strict";
/*
 * @Author: your name
 * @Date: 2020-07-13 18:02:27
 * @LastEditTime: 2020-07-13 19:36:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \_webpack-based:\code\learn-javaScript\push-pop方法的实现\pop.ts
 */
Array.prototype.pop = function () {
    var O = Object(this);
    var len = O.length >>> 0;
    if (len === 0) {
        O.length = 0;
        return undefined;
    }
    len--;
    var value = O[len];
    delete O[len];
    O.length = len;
    return value;
};
