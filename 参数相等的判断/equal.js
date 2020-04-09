console.log(+0 === -0); //true
console.log(NaN === NaN); //false
console.log((+0).toString()); //'0'
console.log((-0).toString());//'0'

console.log(1/+0); //Infinity
console.log(1/-0); //-Infinity

// 对于正负零的判断
function eq(a,b){
    if(a === b) return a !== 0 || 1/a === 1/b;
    return false; //其他情况下return false
}

console.log(eq(0,0)); //true
console.log(eq(+0,-0)); //false

//对比NaN
function eq2(a,b){
    if(a !== a) return b !== b;
}

console.log(eq2(NaN,NaN));//true

/**
 * 第一版参数对比函数,用来过滤掉简单的类型比较，复杂的对象使用deepEq函数进行处理
 * @param {Any} a 
 * @param {Any} b 
 */
function eqFirst(a,b){
    //结果为true区分出+0和-0
    if(a === b) return a !== 0 || 1/a !== 1/b;

    //typeof null的结果为object，这里判断，是为了让有null的情况尽早退出函数
    if(a == null || a == null) return false;

    //判断NaN
    if(a !== a) return b !== b;

    // 判断参数a类型，如果是基本类型，在这里可以直接返回false
    //这里不加b !== function的情况是因为，如果一旦b是function，而a是基本类型的话，就会调用到deepEq函数，
    //而这样的对比是没有意义的
    var type = typeof a;
    if(type !== 'function' && type !== 'object' && typeof b !== 'object') return false;

    //更复杂的对象使用deepEq函数进行判断
    return deepEq(a,b);

}

// 对于String对象的判断
console.log(typeof 'Curly'); //string
console.log(typeof new String('Curly')); //object

console.log(Object.prototype.toString.call('Curly')); //[object String]
console.log(Object.prototype.toString.call(new String('Curly'))); //[object String]

console.log('Curly' + "" === new String('Curly') + ''); //true

//Boolean
var a = true;
var b = new Boolean(true);
console.log(+a === +b);//true

//Date
var a = new Date(2009, 9, 25);
var b = new Date(2009, 9, 25);
console.log(+a === +b);//true

//RegExp
var a = /a/i;
var b = new RegExp(/a/i);
console.log('' + a === '' + b) // true

// Number
var a = 1;
var b = new Number(1);
console.log(+a === +b); //true
//但是数字不能这么判断，因为
var a = new Number(NaN);
var d = new Number(NaN);
console.log(+a === +b); //false

// 所以只能使用特殊的判断方式
function eqNaN(a,b){
    if(+a !== +b) return +b !== +a;
}

console.log(eqNaN(a,b)); //true

// deepEq函数

var toString = Object.prototype.toString;
/**
 * 深度对比函数
 * @param {any} a 
 * @param {any} b 
 */
function deepEq(a,b){
    var className = toString.call(a);
    if(className !== toString.call(b)) return false;

    //除了Number以外，其他类型判断都比较相似
    switch (className) {
        case '[object RegExp]':
        case '[object String]':    
            return ''+ a === '' + b;
        case '[object Number]':
            if(+a !== a) return +b !== b;//判断是否为NaN的情况
            return +a === 0 ? 1/+a === 1/b : +a === +b; //判断是否为+0,-0的情况
        case '[object Date]':
        case '[object Boolean]':
            return +a === +b;
    }

    //关于构造函数的判断
    var areArrays = className === '[object Array]';
    //不是数组
    if(!areArrays){
        //过滤掉两个函数的情况
        if(typeof a != 'object' || typeof b != 'object')return false;

        var aCtor = a.constructor, bCtor=b.constructor;
        //aCtor和bCtor必须都存在并且都不是Object构造函数的情况下，aCtor不等于bCtor，那这两个对象就真的不相等啦
        if(aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor)
            && ('constructor' in a && 'constructor' in b)){
            return false;
        }
    }

    //...
}

//判断是否为函数
function isFunction(obj){
    return toString.call(obj) === '[object Function]';
}







