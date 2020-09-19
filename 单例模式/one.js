"use strict";
var one;
(function (one) {
    var Singleton = /** @class */ (function () {
        function Singleton(name) {
            var _this = this;
            this.intance = null;
            this.getInstance = function () {
                if (_this.intance == void 0) {
                    _this.intance = new Singleton("test");
                }
                return _this.intance;
            };
            this.name = name;
        }
        Singleton.prototype.getName = function () {
            console.log(this.name);
        };
        return Singleton;
    }());
    var myApp = {};
    myApp.namespace = function (name) {
        var parts = name.split(".");
        var current = myApp;
        for (var i in parts) {
            if (!current[parts[i]]) {
                current[parts[i]] = {};
            }
            current = current[parts[i]];
        }
    };
    //使用闭包封装私有变量
    var user = (function () {
        var _name = 'sven', _age = 29;
        return {
            getUserInfo: function () {
                return _name + _age;
            }
        };
    })();
    //惰性单例
    var SingleTon = /** @class */ (function () {
        function SingleTon() {
        }
        SingleTon.prototype.getInstance = function () {
            var instance = null;
            if (instance == void 0) {
                instance = new SingleTon();
            }
            return instance;
        };
        return SingleTon;
    }());
    //通用的惰性单例
    var f = function (fn) {
        var result;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return result || (result = fn.apply(args));
        };
    };
})(one || (one = {}));
