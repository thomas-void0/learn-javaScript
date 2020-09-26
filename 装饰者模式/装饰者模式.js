"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//head first咖啡代码
var coffe;
(function (coffe) {
    //实现一个饮料抽象类
    var Beverage = /** @class */ (function () {
        function Beverage() {
            //关于饮品的描述
            this.description = '';
        }
        //实现一个方法得到coffe描述
        Beverage.prototype.getDescription = function () {
            return this.description;
        };
        return Beverage;
    }());
    //实现一个调料抽象类,继承饮料抽象类(装饰类)
    var CodimentDcorator = /** @class */ (function (_super) {
        __extends(CodimentDcorator, _super);
        function CodimentDcorator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CodimentDcorator;
    }(Beverage));
    //实现一些具体的饮料
    var Espresso = /** @class */ (function (_super) {
        __extends(Espresso, _super);
        function Espresso(description) {
            var _this = _super.call(this) || this;
            _this.cost = function () {
                return 1.99;
            };
            _this.description = description;
            return _this;
        }
        return Espresso;
    }(Beverage));
    var HouseBlend = /** @class */ (function (_super) {
        __extends(HouseBlend, _super);
        function HouseBlend(description) {
            var _this = _super.call(this) || this;
            _this.cost = function () {
                return .89;
            };
            _this.description = description;
            return _this;
        }
        return HouseBlend;
    }(Beverage));
    //实现摩卡装饰者
    var Mocha = /** @class */ (function (_super) {
        __extends(Mocha, _super);
        function Mocha(beverage) {
            var _this = _super.call(this) || this;
            _this.getDescription = function () {
                return _this.beverage.getDescription() + ",Mocha";
            };
            _this.cost = function () {
                return _this.beverage.cost() + .20;
            };
            _this.beverage = beverage;
            return _this;
        }
        return Mocha;
    }(CodimentDcorator));
    //实现soy装饰者
    var Soy = /** @class */ (function (_super) {
        __extends(Soy, _super);
        function Soy(beverage) {
            var _this = _super.call(this) || this;
            _this.getDescription = function () {
                return _this.beverage.getDescription() + ",Soy";
            };
            _this.cost = function () {
                return _this.beverage.cost() + .20;
            };
            _this.beverage = beverage;
            return _this;
        }
        return Soy;
    }(CodimentDcorator));
    //测试实现
    var testcoffe = new Espresso("this is test coffe");
    //不加调料直接打印出价格
    //增加调料进行测试
    var d = new Mocha(testcoffe);
    d = new Mocha(testcoffe);
    d = new Soy(testcoffe);
})(coffe || (coffe = {}));
var air;
(function (air) {
    var Plane = /** @class */ (function () {
        function Plane() {
        }
        Plane.prototype.fire = function () {
            console.log("发射普通的子弹");
        };
        return Plane;
    }());
    //增加导弹和原子弹的装饰类
    var MissileDecorator = /** @class */ (function () {
        function MissileDecorator(plane) {
            this.plane = plane;
        }
        MissileDecorator.prototype.fire = function () {
            this.plane.fire();
            console.log("发射导弹");
        };
        return MissileDecorator;
    }());
    var AtomDecorator = /** @class */ (function () {
        function AtomDecorator(plane) {
            this.plane = plane;
        }
        AtomDecorator.prototype.fire = function () {
            this.plane.fire();
            console.log("发射原子弹");
        };
        return AtomDecorator;
    }());
    var plane = new Plane();
    plane = new MissileDecorator(plane);
    plane = new AtomDecorator(plane);
    // plane.fire()
    var newPlane = {
        fire: function () {
            console.log("发射普通子弹");
        }
    };
    var f1 = newPlane.fire;
    newPlane.fire = function () {
        f1();
        console.log("发射导弹");
    };
    var f2 = newPlane.fire;
    newPlane.fire = function () {
        f2();
        console.log("发射原子弹");
    };
    newPlane.fire();
})(air || (air = {}));
var JSDecorator;
(function (JSDecorator) {
    // window.onload = function(e:Event){
    //     console.log("hahaha")
    // }
    // //不能直接改写onload，否则会导致原本的代码失效，可以使用中间变量的方式去进行处理
    // const _onload = window.onload || function (e:Event){}
    // window.onload = function(e:Event){
    //     // _onload(e) //@ts-ignore
    //     console.log("扩展的方法")
    // }
    //在先执行a函数，再执行b函数。 或者说先执行b函数，再执行a函数。
    var fa = function (a, b) {
        console.log("a", a, b);
    };
    var fb = function (a, b) {
        console.log("b", a, b);
    };
    //传统的调用方式
    // fa()
    // fb()
    //使用AOP函数进行装饰后
    var before = function (f, beforeF) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            beforeF.apply(void 0, args);
            return f.apply(void 0, args);
        };
    };
    //before调用
    var _callback = before(fb, fa);
    _callback("before1", "before2");
    //a before1 before2 
    //b before1 before2
    var after = function (f, afterF) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var ret = f.apply(void 0, args);
            afterF.apply(void 0, args);
            return ret;
        };
    };
    //after调用
    var _callbackafter = after(fa, fb);
    _callbackafter();
    //a undefined
    //b undefined
    window.onload = function () {
        console.log("别人对load方法的监听");
    };
    //首先对可能覆盖的方法进行缓存
    var f = window.onload || function () { };
    //使用AOP装饰器
    var _before = function (f, beforeF) {
        return function () {
            beforeF.apply(this, arguments);
            return f.apply(this, arguments);
        };
    };
    //增加自己的方法
    var myF = function () {
        console.log("这是我新增的方法");
    };
    //进行装饰
    var fn = _before(f, myF);
    window.onload = fn;
})(JSDecorator || (JSDecorator = {}));
