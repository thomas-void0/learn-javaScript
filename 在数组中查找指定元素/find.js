//es6中的findIndex
var num = [1,2,3,4,5,6].findIndex(item=>{
    return item>3
})

console.log(num);//返回索引值

//实现es6中的findIndex

function findIndex(array,predicate,context){
    for(var i = 0;i<array.length;i++){
        if(predicate.call(context,array[i],i,array)) return i;
    }
    return i;
}

var returnIndex = findIndex([1,2,3,4,5],function(item,i,array){
    if(item == 3) return true;
})

console.log(returnIndex);

//实现findLastIndex
function findLastIndex(array,predicate,context){
    for(var i = array.length - 1;i>0;i--){
        if(predicate.call(context,array[i],i,array)) return i;
    }
    return i;
}
var returnIndex2 = findLastIndex([1,2,3,4,5],function(item,i,array){
    if(item == 3) return true;
})

console.log(returnIndex2);

//createIndexFinder
//创建出一个findIndex或者是findLastIndex
function createIndexFinder(dir){
    return function(array,predicate,context){
        //得到数组长度
        var length = array.length;
        //根据dir判断是findIndex还是findLastIndex
        // 1为正序，-1为逆序
        var index = dir > 0 ? 0 : length - 1;
        //index>=0 防止无限循环
        for(;index>=0 && index<length;index+=dir){
            if(predicate.call(context,array[index],index,array)) return index;
        }
        return -1;
    }
}
var findIndex = createIndexFinder(1);
var findLastIndex = createIndexFinder(-1);

//sortedIndex,使用二分法
function sortedIndex(array,obj){
    var low = 0, high = array.length;

    while(low < high){
        var mid = Math.floor((low + high) / 2);
        //如果在前一半数据中找到了，那么high就等于mid反之low等于mid+1
        if(array[mid] < obj) low = mid + 1;
        else high = mid;
    }

    return high;
}

//第二版
function cb(func,context){
    if(context === void 0) return func;
    return function(){
        return func.apply(context,arguments);
    }
}