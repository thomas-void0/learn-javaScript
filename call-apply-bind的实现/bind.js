"use strict";
//一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
// 也就是说当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效。
Function.prototype.bind = function (context) {
    // 必须要函数才可调用bind
    if (typeof this !== 'function') {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var self = this;
    // 收集初始化传入的参数
    var args = Array.prototype.slice.call(arguments, 1);
    // 为了防止修改bBound的原型对象导致原函数的原型对象被修改，这里引入一个中间函数进行处理
    var fNOP = /** @class */ (function () {
        function fNOP() {
        }
        return fNOP;
    }());
    ;
    var bBound = function () {
        //收集调用的时候传入的参数
        var bindArgs = Array.prototype.slice.call(arguments);
        // 判断是调用还是实例化
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    };
    // 绑定原函数的原型对象，获取原函数原型对象属性的访问权
    fNOP.prototype = this.prototype;
    bBound.prototype = new fNOP();
    return bBound;
};
