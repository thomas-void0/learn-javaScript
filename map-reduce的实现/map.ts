/*
 * @Author: your name
 * @Date: 2020-07-03 16:17:24
 * @LastEditTime: 2020-07-03 16:40:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \_webpack-based:\code\learn-javaScript\map-reduce的实现\map.ts
 */ 
Array.prototype.map = function<U>(callbackFn:(value:any,index:number,array:any[])=>U,thisArg?:any):U[]{
    // 进行检查
    if(this === null || this === undefined){
        throw new TypeError("cannot read property 'map' of null or undefined");
    }

    // 如果callbackFn不是函数
    if(Object.prototype.toString.call(callbackFn) !== '[object Function]'){
        throw new TypeError(callbackFn + "is not a function")
    }

    let O = Object(this); //获取到调用map方法的数组
    let T = thisArg; //获取到需要绑定的this
    let len = O.length >>> 0; //获取到调用map方法的数组长度

    const result = [];//定义一个结果数组

    for(let k = 0;k<len;k++){
        //查找数组原型链
        if(k in O){
            let value = O[k]; //获取到本次循环的值
            let mapValue = callbackFn.call(T,value,k,O);
            result.push(mapValue)
        }
    }

    return result;
}

