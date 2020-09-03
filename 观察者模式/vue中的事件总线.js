"use strict";
var Bus;
(function (Bus) {
    var EventEmitter = /** @class */ (function () {
        //handlers用于存储事件与回调之间的对应关系
        function EventEmitter() {
            this.handlers = {};
        }
        //on方法用于安装事件监听器，它接受目标事件名和回调函数作为参数
        EventEmitter.prototype.on = function (eventName, cb) {
            if (!this.handlers[eventName]) {
                //如果没有，那么首先初始化一个监听函数队列
                this.handlers[eventName] = [];
            }
            //将回调函数推入目标事件的监听函数队列里去
            this.handlers[eventName].push(cb);
        };
        //emit方法用于触发目标事件，它接受事件名和监听函数作为参数
        EventEmitter.prototype.emit = function (eventName) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            //检查目标事件是否有监听函数队列
            if (this.handlers[eventName]) {
                //如果有，则逐个调用队列里的回调函数
                this.handlers[eventName].forEach(function (cb) {
                    cb.apply(void 0, args);
                });
            }
        };
        //移除某个事件回调队列里的指定回调函数
        EventEmitter.prototype.off = function (eventName, cb) {
            var callbacks = this.handlers[eventName];
            var idx = callbacks.indexOf(cb);
            if (idx !== -1) {
                callbacks.splice(idx, 1);
            }
        };
        //为事件注册单次监听器
        EventEmitter.prototype.once = function (eventName, cb) {
            var _this = this;
            //对回调函数进行包装，使其执行完毕自动被移除
            var wrapper = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                cb.apply(void 0, args);
                _this.off(eventName, wrapper);
            };
            this.on(eventName, wrapper);
        };
        return EventEmitter;
    }());
})(Bus || (Bus = {}));
