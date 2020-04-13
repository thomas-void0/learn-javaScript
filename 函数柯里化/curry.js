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
    //截取到除了第一个函数参数以外的其他参数
    var args = [].slice.call(arguments,1);
    return function(){
        var newArgs = args.concat([].slice.call(arguments));//得到后面传入的参数 
        return fn.apply(this,newArgs)
    }
}

function curry(fn,length){
    length = length || fn.length; //表示传入函数的参数个数
    var slice = Array.prototype.slice;
    return function(){
        if(arguments.length < length){
            var combined = [fn].concat(slice.call(arguments));
            return curry(sub_curry.apply(this,combined),length - arguments.length);
        }else{
            return fn.apply(this,arguments);
        }
    }
}