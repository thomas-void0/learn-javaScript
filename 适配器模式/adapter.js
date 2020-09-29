"use strict";
var adapter;
(function (adapter) {
    var MallardDuck = /** @class */ (function () {
        function MallardDuck() {
        }
        MallardDuck.prototype.quack = function () {
            console.log("嘎嘎叫");
        };
        MallardDuck.prototype.fly = function () {
            console.log("fly");
        };
        return MallardDuck;
    }());
    var WildTurkey = /** @class */ (function () {
        function WildTurkey() {
        }
        WildTurkey.prototype.gobble = function () {
            console.log("咯咯叫");
        };
        WildTurkey.prototype.fly = function () {
            console.log("turkey fly");
        };
        return WildTurkey;
    }());
    //使用适配器的方式，让火鸡可以冒充鸭子
    var TurkeyAdapter = /** @class */ (function () {
        function TurkeyAdapter(turkey) {
            this.turkey = turkey;
        }
        TurkeyAdapter.prototype.quack = function () {
            this.turkey.gobble();
        };
        TurkeyAdapter.prototype.fly = function () {
            this.turkey.fly();
        };
        return TurkeyAdapter;
    }());
})(adapter || (adapter = {}));
