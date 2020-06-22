Function.prototype.call = function(context){
    context = context || window;
    //获取当前调用call的函数，这个函数实际上也是我们需要绑定this进行执行的对象
    context.fn = this;
    //获取当前传入call函数的参数值
    var args = [],result;
    for(var i=1;i<arguments.length;i++){
        args.push('arguments[' + i + ']');
    }
    if(args.length >= 0){
        result = eval('content.fn(' + args + ')');
    }else{
        result = context.fn();
    }
    
    delete context.fn;
    return result;
}
