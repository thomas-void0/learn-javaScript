//数组的扁平化，就是将一个嵌套多层的数组 array (嵌套可以是任何层数)转换为只有一层的数组。
//递归方式
var arr = [1, [2, [3, 4]]];

function flatten(arr){
    var result = [];
    for(var i in arr){
        if(Array.isArray(arr[i])){
            result = result.concat(arguments.callee(arr[i]));  //因为这里返回的是一个数组，所以需要使用concat的方式
        }else{
            result.push(arr[i])
        }
    }
    return result;
}

console.log(flatten(arr));

//如果数组的元素都是数字，那么可以考虑使用toString的方法， 
console.log(arr.toString()); //1,2,3,4

function flatten1(arr){
    return arr.toString().split(",").map(item=>+item);
}

console.log(flatten1(arr));

//使用reduce的方法
function flatten2(arr){
    return arr.reduce((pre,next)=>{
        return pre.concat(Array.isArray(next) ? arguments.callee(next) : next)
    },[])
}
console.log(flatten2(arr));

//ES6 增加了扩展运算符，用于取出参数对象的所有可遍历属性，拷贝到当前对象之中：
function flatten3(arr){
    while(arr.some(item=>Array.isArray(item))){
        arr = [].concat(...item)
    }
    return arr;
}

/**
 * 数组扁平化
 * @param  {Array} input   要处理的数组
 * @param  {boolean} shallow 是否只扁平一层
 * @param  {boolean} strict  是否严格处理元素，下面有解释
 * @param  {Array} output  这是为了方便递归而传递的参数
 * 源码地址：https://github.com/jashkenas/underscore/blob/master/underscore.js#L528
 */

 function flatten4(input,shallow,strict,output){
     //递归使用的时候会用到output
     output = output || [];     
     var idx = output.length;
     
     for(var i = 0,len = input.length;i<len;i++){
         var value = input[i]

        //  如果是数组，就进行处理 
         if(Array.isArray(value)){
             //如果是只扁平一层，遍历该数组，依次填入output
            if(shallow){
                var j = 0,length = value.length;
                while(j < length) output[idx++] = value[i++]
            }
            //如果是全部扁平就递归，传入已经处理的output，递归中接着处理output
            else{
                arguments.callee(value,shallow,strict,output);
                idx = output.length;
            }
         }
         //不是数组，根据strict的值判断是跳过不处理还是放入output
         else if(!strict){
            output[idx++] = value;
         }
     }
     return output;
 }
