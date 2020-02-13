//typeof的检测能力是非常有限的，但是Object.prototype.toString()的检测能力确实非常显著

console.log(Object.prototype.toString.call('123')); //[object String]
console.log(Object.prototype.toString.call(123)); //[object Number]
console.log(Object.prototype.toString.call(true));//[object Boolean]
console.log(Object.prototype.toString.call({a:1}));// [object Object]  
console.log(Object.prototype.toString.call([1,2,3]));// [object Array]  
console.log(Object.prototype.toString.call(function(){}));// [object Function]
console.log(Object.prototype.toString.call(new Date()));// [object Date] 
console.log(Object.prototype.toString.call(new Error()));// [object Error] 
console.log(Object.prototype.toString.call(/a/));// [object RegExp]  
console.log(Object.prototype.toString.call(undefined));// [object Undefined]
console.log(Object.prototype.toString.call(null));// [object Null]
console.log(Object.prototype.toString.call(arguments));// [object Arguments]

//  写一个type检测函数
var class2type = {}

// 生成class2type映射
"Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").map(item=>{
    class2type[`[Object ${item}]`] = item.toLowerCase();
})

function type(obj){
    return typeof obj === "object" || typeof obj === "function" ? 
    class2type[Object.prototype.toString.call(obj)] || "object" : typeof obj 
}

//缺点是，在IE6中 Object.prototype.toString.call(null) === "[Object Object]"  Object.prototype.toString.call(undefined) === "[Object Object]" 

function type2(obj){
    if(obj == null){ //如果obj是undefined或者null的时候就返回"undefined" 或者 "null"
        return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ? 
    class2type[Object.prototype.toString.call(obj)] || "object" : typeof obj
}
  

/*对于纯粹对象的检测上面的模式就行不通了*/
/*纯粹的对象就是：通过{}或者new Object创建的对象 */ 

/*以下是jquery3.0版本对存粹对象检测的源码*/ 

var class3type = {};
// 想当于Object.prototype.toString
var toString = class3type.toString;

// 相当于Object.prototype.hasOwnProperty
var hasOwn = class3type.hasOwnProperty;

function isPlainObject(obj){
    var proto,Ctor;

    //排除掉明显不是obj的以及一些宿主对象如window
    if(!obj || toString.call(obj) !== "[object object]"){
        return false;
    }

    /**
     * getPrototypeOf :获取obj的原型
     */
    proto = Object.getPrototypeOf(obj);

    //没有原型的对象是存粹的，Object.create(null) 就在这里返回true
    if(!proto){
        return true;
    }

    /**
     * 以下判断通过new Object方式创建的对象
     * 判断proto是否有constructor属性,如果有就让Ctor的值为proto.constructor
     * 如果是Object函数创建的对象，Ctor在这里就等于object构造函数
     */
    Ctor = hasOwn.call(proto,"constructor") && proto.constructor;

    //在这里判断Ctor构造函数是不是Objcet构造函数函数，用于区分自定义构造函数和Object构造函数
    return typeof Ctor === "function" && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
}

/*jq判断空对象源码*/ 
//其实所谓的 isEmptyObject 就是判断是否有属性，for 循环一旦执行，就说明有属性，有属性就会返回 false。
function isEmptyObject(obj){
    var name;
    for(name in obj){
        return false;
    }
    return true;
}

/*对于window对象的检测*/ 
//window对象作为客户端js的全局对象，他有一个window属性指向自身，我们可以利用这个特性判断是否是window对象
function isWindow(obj){
    return obj !== null && obj === obj.window;
}

/*jquery中的isArrayLike*/
//针对数组和类数组都会返回true，源码如下： 
function isArrayLike(obj){
    //obj 必须有length属性
    var length = !!obj && "length" in obj && obj.length;
    var typeRes = type(obj);

    // 排除函数和window对象
    if(typeRes === "function" || isWindow(obj)){
        return false
    }

    return typeRes === "array" || length === 0 || typeof length === "number" 
        && length > 0 && (length - 1) in obj;
} 

/*
如果 isArrayLike 返回true，至少要满足三个条件之一：
1,是数组
2,长度为 0 这是为了检测空的arguments
3,lengths 属性是大于 0 的数字类型，并且obj[length - 1]必须存在*/

//underscore中对isArrayLike的实现
var MAX_ARRAY_INDEX = Math.pow(2,53) - 1;

var isArrayLike = function(collection){
    var length = getLength(collection);
    return typeof length == "number" && length >= 0 && length <= MAX_ARRAY_INDEX;
}

// underscore中判断是不是DOM元素的源码
function isElement(obj){
    return !!(obj && obj.nodeType === 1);
}