Function.prototype.apply = function (context,arr){
    context = context || window;
    // 获取当前调用的函数
    context.fn = this;
    // 获取当前的参数
    var result,args=[];
    if(!arr){
        result = context.fn();
    }else{
        // 判断参数是否是一个数组
        if(Object.prototype.toString.call(arr) !== '[object Array]'){
            throw new Error('传入的参数必须是一个数组');
        } 
        for(var i=0;i<arr.length;i++){
            args.push('arr[' + i + ']')
        }
        result = eval('context.fn(' + args + ')');
    }
    delete context.fn;
    return result;
}