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
var pizz;
(function (pizz) {
    //head first披萨案例
    //初步封装
    var orderPizz = /** @class */ (function () {
        function orderPizz(type) {
            this.type = type;
        }
        orderPizz.prototype.prepare = function () { };
        orderPizz.prototype.bake = function () { };
        orderPizz.prototype.cut = function () { };
        orderPizz.prototype.box = function () { };
        return orderPizz;
    }());
    var SimplePizzaFactory = /** @class */ (function () {
        function SimplePizzaFactory() {
        }
        SimplePizzaFactory.prototype.createPizza = function (type) {
            var pizza = null;
            if (type === "1") {
                return new ChesePizza();
            }
            return new Pizza();
        };
        return SimplePizzaFactory;
    }());
    var Pizza = /** @class */ (function () {
        function Pizza() {
        }
        return Pizza;
    }());
    var ChesePizza = /** @class */ (function (_super) {
        __extends(ChesePizza, _super);
        function ChesePizza() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ChesePizza;
    }(Pizza));
    var PizzaStore = /** @class */ (function () {
        function PizzaStore(factory) {
            this.factory = factory;
        }
        PizzaStore.prototype.orderPizz = function (type) {
            var pizza = this.factory.createPizza("1");
            var prepare = function () { };
            var bake = function () { };
            var cut = function () { };
            var box = function () { };
        };
        return PizzaStore;
    }());
    // function createPizza(type:string){
    //     return new Pizza()
    // }
    //新建一个pizza类
    var newPizzaStore = /** @class */ (function () {
        function newPizzaStore() {
        }
        newPizzaStore.prototype.orderPizza = function (type) {
            var pizza = null;
            pizza = this.createPizza(type);
            //do something
        };
        return newPizzaStore;
    }());
    //子类继承，实现自己独特的createPizza方法
    var NYPizzaStore = /** @class */ (function (_super) {
        __extends(NYPizzaStore, _super);
        function NYPizzaStore() {
            var _this = _super.call(this) || this;
            _this.createPizza = function (type) {
                var NYChesePizza = new Pizza();
                return NYChesePizza;
            };
            return _this;
        }
        return NYPizzaStore;
    }(newPizzaStore));
    //所有的工厂模式都用来封装对象的创建。工厂方法模式通过让子类决定该创建的对象是什么，来达到将对象创建的过程封装的目的。
})(pizz || (pizz = {}));
