/**
 * 第一版，简易的curry化函数
 * @param {Function} fn 
 */
var curry = function(fn){
    var args = [].slice.call(arguments,1);
    return function(){
        var newArgs = args.concat([].slice.call(arguments));
        return fn.apply(this,newArgs);
    }
}

//使用这个柯里化函数
function add(a,b){
    console.log(a + b);
}

var addCurry = curry(add,1,2);
addCurry();

var addCurry = curry(add,1);
addCurry(2)

var addCurry = curry(add);
addCurry(1,2)

/**
 * 第二版，函数柯里化
 * @param {Function} fn 
 */
function sub_curry(fn){
    var args = [].slice.call(arguments);

    return function(){
        var newArgs = args.concat([].slice.call(arguments));//接受传入的新参数
        return fn.apply(this,newArgs);
    }
}

function curry2(fn,length){
    length = length || fn.length; //得到传入的参数个数或者函数的形参个数
    var slice = Array.prototype.slice; 
    return function(){
        //传入的值不够 继续返回函数
        if(arguments.length < length){
            var combined = [fn].concat(slice.call(arguments));//得到所有的参数
            return curry2(sub_curry.apply(this,combined),length - arguments.length);
        }else{
            //传入的值够了，直接执行 
            return fn.apply(this,arguments)
        }
    }
}