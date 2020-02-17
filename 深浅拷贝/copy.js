var arr = ['old', 1, true, null, undefined];
//浅拷贝
var new_arr = arr.concat();
new_arr[0] = "new"


//浅拷贝在引用类型的拷贝上存在局限性
var arr2 = [{old: 'old'}, ['old']];

var new_arr2 = arr2.concat();

new_arr2[0].old = 'new';

console.log(arr2);//[ { old: 'new' }, [ 'old' ] ]

console.log(new_arr2);//[ { old: 'new' }, [ 'old' ] ]


//简单的深拷贝实现，缺点是无法拷贝函数
var arr3 = [{old: 'old'}, ['old'],{func:function(){}}];

var new_arr3 = JSON.parse(JSON.stringify(arr3));

new_arr3[0].old = "new"

console.log(arr3); //[ { old: 'old' }, [ 'old' ], { func: [Function: func] } ]
console.log(new_arr3);//[ { old: 'new' }, [ 'old' ], {} ] //无法拷贝函数

//浅拷贝的实现
var shallowCopy = function(obj){
    //只拷贝对象
    if(typeof obj !== "object") return;
    //根据obj的类型判断是新建一个数组还是对象
    var newObj = obj instanceof Array ? [] : {};
    //遍历obj，并且判断是obj的属性才拷贝
    for(var key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key] = obj[key]
        }
    }
    return newObj;
}

var shallowCopy2 = obj=>{
   if(typeof obj !== 'object') return;
   var newObj = obj instanceof Array ? [] : {};
   Object.keys(obj).forEach(key=>obj.hasOwnProperty(key) && (newObj[key] = obj[key]))
   return newObj;
}

// 深拷贝的实现,使用递归的方式即可
var deepCopy = function (obj){
    if(typeof obj !== "object") return;
    var newObj = obj instanceof Array ? [] : {};
    Object.keys(obj).forEach(key=>obj.hasOwnProperty(key) && (
        newObj[key] = typeof obj[key] === "object" ?  arguments.callee(obj[key]) : obj[key]
    ));
    return newObj;
}

// jquery中的extend用法,合并两个或者更多的对象的内容到第一个对象中
//jQuery.extend(target, [,objcet1][,objectN])

//第一版extend函数
function extend(){
    var name,options,copy;
    var length = arguments.length;
    var i = 1;
    var target = arguments[0]

    for(;i<length;i++){
        options = arguments[i];
        if(options !== null){
            for(name in options){
                copy = options[name];
                if(copy !== undefined){
                    target[name] = copy;
                }
            }
        }
    }

    return target;
}


//extend深拷贝 jQuery.extend( [deep], target, object1 [, objectN ] )
//也就是说,函数的第一个参数传递一个布尔值,如果为true则进行深拷贝,如果为false则不进行深拷贝

function extend2(){
    let deep = false; //默认不进行深拷贝
    let length = arguments.length;
    let target = arguments[0];
    let options,copy;
    var i = 1;

    //如果第一个传递进来的是布尔值,那么deep是这个布尔值,否则target为argument[0]
    if(typeof target === "boolean"){
        deep = target;
        target = arguments[1] || {};
        i++;
    }

    //如果不是对象,那么就等于一个对象
    if(typeof target !== 'object') target={};

    for(;i<length;i++){
        options = arguments[i];//等于每一个传递进来的对象
        if(options != null){ //这里排除掉undefined和null 
            for(var name in options){
                src = target[name];
                copy = options[name];
                if(typeof copy === "object" && deep){ //进行深拷贝的条件
                    target[name] = arguments.callee(deep,src,copy)
                }else if(copy !== undefined){
                    target[name] = copy;
                }
            }
        }
    }

    return target;
}

function extend3(){
    //默认不进行深拷贝
    var deep = false;
    var name,options,src,copy;
    var length = arguments.length;

    //记录要复制的对象的下标 
    var i = 1;
    //第一个参数不传布尔值的情况下,target默认是第一个参数
    var target = arguments[0] || {};
    //如果第一个参数是布尔值,第二个参数才是target
    if(typeof target === "boolean"){
        deep = target;
        target = arguments[1];
        i++;
    }
    //如果target不是对象,我们是无法进行复制的,所以设置为{}
    if(typeof target !== "object"){
        target = {}
    }

    //循环遍历需要复制的对象
    for(;i<length;i++){
        //获取当前对象
        options = arguments[i];
        //要求不能为空,避免出现extend(a,,b)的情况
        if(options != null){
            for(name in options){
                //目标属性值
                src = target[name];
                //需要复制的对象的属性值
                copy = options[name];

                if(deep && copy && typeof copy === "object"){
                    //递归调用
                    target[name] = arguments.callee(deep,src,copy);
                }else if(copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    return target;
}

var obj1 = {
    a: 1,
    b: { b1: 1, b2: 2 }
};

var obj2 = {
    b: { b1: 3, b3: 4 },
    c: 3
};

var obj3 = {
    d: 4
}

console.log(extend2(true,obj1,obj2,obj3));

// 最终的版本
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

function extend(){
    //默认不进行深拷贝
    let deep = false;
    let name,options,src,copy,clone,copyIsArray;
    let length = arguments.length;
    //记录下下标
    let i = 1;
    let target = arguments[0] || {};
    //如果第一个参数是布尔值,那么第二个参数是target
    if(typeof target === "boolean"){
        deep = target;
        target = arguments[i] || {};
        i++; 
    }

    //如果target不是对象,我们是无法进行复制的,所以设置为{};
    if(typeof target !== "object" ){
        target = {};
    }

    //循环遍历需要复制的对象们
    for(;i<length;i++){
        //获取当前的对象
        options = arguments[i]
        //要求不能为空,避免extend(a,,b)这种情况的出现;
        if(options != null){
            for(name in options){
                //目标属性值
                src = target[name]
                //要复制的对象属性值
                copy = options[name]
                //解决循环引用
                if(target === copy){
                    continue;
                }

                //要递归的对象必须是plainObject或者数组
                if(deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))){
                    //要复制的对象属性值类型需要与目标属性值相同
                    if(copyIsArray){
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];
                    }else{
                        clone = src && isPlainObject(src) ? src : {};
                    }

                    target[name] = arguments.callee(deep,clone,copy);
                }else if(copy !== undefined){
                    target[name] = copy;
                }
            }
        }
    }

    return target;
}

var a = extend(true, [4, 5, 6, 7, 8, 9], [1, 2, 3]);
console.log(a) // 

var obj1 = {
    value: {
        3: 1
    }
}

var obj2 = {
    value: [5, 6, 7],

}

var b = extend(true, obj1, obj2) // 
var c = extend(true, obj2, obj1) // 

console.log(b);
console.log(c); //因为obj1的值实际上已经被改变了