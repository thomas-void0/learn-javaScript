//判断数组映射
const typeStr = "Boolean String Number Null Undefined Function Object Array Date RegExp Error Symbol Map Set WeakMap WeakSet";
const typeArr = typeStr.split(" ");

function handleTypeArr(typeArr){
    return typeArr.reduce((pre,type)=>pre.set(`[object ${type}]`,type),new Map());
}

const newTypeObj = handleTypeArr(typeArr);

//检测数据的类型
function type(obj){
    const objType = Object.prototype.toString.call(obj);
    return newTypeObj.get(objType).toLowerCase();
}

// 检测是否为window对象
function isWindow(obj){
    return obj != null && obj === obj.window;
}

//检测是否为数组(因为涉及到了类数组，所以需要此检测)
function isArrayLike(obj){
    var length = !!obj && "length" in obj && obj.length;
    var typeRes = type(obj);//检测数据的类型

    //排除掉函数和window对象
    if(typeRes === 'function' || isWindow(obj)){
        return false;
    }

    /**
     * 1,如果是数组，则返回true
     * 2,如果不是数组，但是同时长度为0的伪数组，则返回true
     * 3,如果有长度属性并且长度属性为number，同时长度属性的值大于0，
     * 并且对象中存在这个长度属性-1的key的值。
     * （简单来说就是一个索引值正常的伪数组），则返回true
     */
    return typeRes === 'array' || length === 0 || 
        typeof length === "number" && length > 0 && (length - 1) in obj;
}

// ===================================================================================================

//测试数据
const testObj = {0:"name",1:"age",2:"sex",length:3};
const testArr = [1,2,3];

/**
 * 第一版本，不含中断的写法
 * @param {Object/Array/} obj 
 * @param {Function} callback 
 */
function each1(obj,callback){
    let length,i=0;

    //如果是数组或者伪数组，就使用for循环
    if(isArrayLike(obj)){
        length = obj.length;
        for(;i<length;i++){
            callback(i,obj[i]);
        }
    }else{
        //如果是对象，就使用for in
        for(i in obj){
            callback(i,obj[i]);
        }
    }

    return obj;
}

// each1(testArr,(i,value)=>{
//     console.log(`i==${i} value==${value}`);
//     /**
//      * i==0 value==1     
//      * i==1 value==2     
//      * i==2 value==3
//      */
// })

// each1(testObj,(key,value)=>{
//     console.log(`key==${key} value==${value}`);
//     /**
//      * key==0 value==name
//      * key==1 value==age 
//      * key==2 value==se
//      */
// })

/**
 * 第二版本，实现返回false就中断
 * @param {Object/Array/} obj 
 * @param {Function} callback 
 */
function each2(obj,callback){
    let length,i=0;
    
    if(isArrayLike(obj)){
        length = obj.length;
        for(;i<length;i++){
            if(callback(i,obj[i]) === false){
                break;
            }
        }
    }else{
        for(i in obj){
            if(callback(i,obj[i]) === false){
                break;
            }
        }
    }
}

// each2(testArr,(i,value)=>{
//     if(i > 1){
//         return false
//     }
//     console.log(`i==${i} value==${value}`);
//     /**
//      * i==0 value==1     
//      * i==1 value==2
//      */
// })

// each2(testObj,(key,value)=>{
//     if(key === 1){
//         return false;
//     }
//     console.log(`key==${key} value==${value}`);
//     /**
//      * key==0 value==name
//      */
// })

/**
 * 第三版本，绑定遍历项的this指向
 * @param {Object/Array/} obj 
 * @param {Function} callback 
 */
function each3(obj,callback){
    let length,i=0;

    if(isArrayLike(obj)){
        length = obj.length;
        for(;i<length;i++){
            //callback函数中的this指向当前遍历的元素
            if(callback.call(obj[i],i,obj[i]) === false){
                break;
            }        
        }
    }else{
        for(i in obj){
            if(callback.call(obj[i],i,obj[i]) === false){
                break;
            }
        }
    }
}

// each3(testArr,function(i,value){
//     console.log(`this==${this} i==${i} value==${value}`);
//     /**
//      * this==1 i==0 value==1
//      * this==2 i==1 value==2
//      * this==3 i==2 value==3
//      */
// })

// each3(testObj,function(key,value){
//     console.log(`this==${this} key==${key} value==${value}`);
//     /**
//      * this==name key==0 value==name
//      * this==age key==1 value==age  
//      * this==sex key==2 value==sex
//      */
// })

//关于for和each函数的速度比较
var arr = Array.from({length:1000000},(v,i)=>i);

console.time('for');
var i = 0;
for(;i<arr.length;i++){
    i += arr[i]
}
console.timeEnd('for'); 

console.time("each")
var j = 0;
each3(arr,function(i,value){
    j += value;
})
console.timeEnd("each")

//for: 0.122ms
//each: 31.453ms

// 可以看出，for 循环的性能是明显好于 each 函数的，each 函数本质上也是用的 for 循环，到底是慢在了哪里呢？

//不使用call
function each(obj, callback) {
    var i = 0;
    var length = obj.length
    for (; i < length; i++) {
        value = callback(i, obj[i]);
    }
}

//使用call绑定this
function eachWithCall(obj, callback) {
    var i = 0;
    var length = obj.length
    for (; i < length; i++) {
        value = callback.call(obj[i], i, obj[i]);
    }
}

var arr = Array.from({length: 1000000}, (v, i) => i);

console.time('each')
var i = 0;
each(arr, function(index, item){
    i += item;
})
console.timeEnd('each')


console.time('eachWithCall')
var j = 0;
eachWithCall(arr, function(index, item){
    j += item;
})
console.timeEnd('eachWithCall')

//each: 19.640ms
//eachWithCall: 27.211ms

 /**
 * each 函数和 eachWithCall 函数唯一的区别就是 eachWithCall 调用了 call，
 * 从结果我们可以推测出，call 会导致性能损失，但也正是 call 的存在，
 * 我们才能将 this 指向循环中当前的元素。
  */

//结束