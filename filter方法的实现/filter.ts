/*
 * @Author: your name
 * @Date: 2020-07-13 19:37:59
 * @LastEditTime: 2020-07-13 19:59:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \_webpack-based:\code\learn-javaScript\filter方法的实现\filter.ts
 */ 
Array.prototype.filter = function<S>(
    callbackfn:(value:any,index:number,array:any[])=>value is S,
    thisArg?:any
):S[]{
    if(this === null || this === undefined){
        throw new TypeError("Cannot read property 'filter' of null or undefined");
    }

    // 处理回调函数异常
    if(Object.prototype.toString.call(callbackfn) != "[object Function]"){
        throw new TypeError(callbackfn + ' is not a function')
    }

    let O = Object(this);
    let len = O.length >>> 0;
    let resLen = 0;
    let res = [];
    let T = thisArg || undefined;

    for(let i = 0;i < len;i++){
        if(i in O){
            let element = O[i];
            if(callbackfn.call(T,element,i,O)){
                // 如果满足条件就加入到数组中
                res[resLen++] = element; 
            }
        }
    }
    return res;
}