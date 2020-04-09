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
    var type = typeof a;
    if(type !== 'function' && type !== 'object' && typeof b !== 'object') return false;

    //更复杂的对象使用deepEq函数进行判断
    return deepEq(a,b);

}