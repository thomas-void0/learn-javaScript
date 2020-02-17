//Math.max 和 Math.min 如果不传递参数
console.log(Math.max()); //-Infinity
console.log(Math.min()); //Infinity

//原始方式求最大值最小值
var arr = [6, 4, 1, 8, 2, 11, 23];

var result = arr[0]

for(var i=1;i<arr.length;i++){
    if(arr[i]>result){
        result = arr[i];
    }
}

console.log(result);

// 使用reduce的方法
function max(prev,next){
    return Math.max(prev,next)
}

console.log(arr.reduce(max));

//排序后取得最大值
arr.sort(function(a,b){
    return a - b;
})
console.log(arr[arr.length - 1]);

//给Math.max传递多个参数的办法 
//1，eval
var max = eval("Math.max(" + arr + ")")
console.log(max);

//2，apply
console.log(Math.max.apply(null,arr));

//3，ES6的...
console.log(Math.max(...arr));