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
var _a;
//飞行类
var flyBehavior = /** @class */ (function () {
    function flyBehavior() {
    }
    flyBehavior.prototype.flyWithWings = function () {
        return "fly";
    };
    flyBehavior.prototype.flyNoWay = function () {
        return "noFly";
    };
    return flyBehavior;
}());
//叫声类
var quackBehavior = /** @class */ (function () {
    function quackBehavior() {
    }
    quackBehavior.prototype.quack = function () {
        return "呱呱叫";
    };
    quackBehavior.prototype.Squack = function () {
        return "吱吱叫";
    };
    quackBehavior.prototype.MuteQuack = function () {
        return "不会叫";
    };
    return quackBehavior;
}());
//Duck类
var Duck = /** @class */ (function () {
    function Duck() {
    }
    Duck.prototype.swim = function () { };
    Duck.prototype.display = function () { };
    Duck.prototype.setPerformFLy = function () { };
    Duck.prototype.setPerformQuack = function () { };
    return Duck;
}());
//野Duck
var MallardDuck = /** @class */ (function (_super) {
    __extends(MallardDuck, _super);
    function MallardDuck() {
        var _this = _super.call(this) || this;
        _this.quackBehavior = new quackBehavior().quack(); //行为
        _this.flyBehavior = new flyBehavior().flyWithWings(); //类        
        return _this;
    }
    MallardDuck.prototype.display = function () {
        console.log("mallard view");
    };
    MallardDuck.prototype.swim = function () {
        console.log("swim");
    };
    return MallardDuck;
}(Duck));
//处理预热价
function perPrice(originPrice) {
    if (originPrice >= 100) {
        return originPrice - 20;
    }
    return originPrice * 0.9;
}
//处理促销价
function onSalePrice(originPrice) {
    if (originPrice >= 100) {
        return originPrice - 30;
    }
    return originPrice * 0.8;
}
//处理返场价
function backPrice(originPrice) {
    if (originPrice >= 200) {
        return originPrice - 50;
    }
    return originPrice;
}
// 处理尝鲜价
function freshPrice(originPrice) {
    return originPrice * 0.5;
}
//处理 询价逻辑的分发 ——> 询价逻辑的执行
function askPrice(tag, originPrice) {
    if (tag === "pre")
        return perPrice(originPrice);
    if (tag === "onSale")
        return onSalePrice(originPrice);
    if (tag === "back")
        return backPrice(originPrice);
    if (tag === 'fresh')
        return freshPrice(originPrice);
}
// 定义一个询价处理器对象
var priceProcessor = {
    pre: function (originPrice) {
        if (originPrice >= 100)
            return originPrice - 20;
        return originPrice * 0.9;
    },
    onSale: function (originPrice) {
        if (originPrice >= 100)
            return originPrice - 30;
        return originPrice * 0.8;
    },
    back: function (originPrice) {
        if (originPrice >= 200)
            return originPrice - 20;
        return originPrice;
    },
    fresh: function (originPrice) {
        return originPrice * 0.5;
    }
};
//设置询价函数
function _askPrice(tag, originPrice) {
    return priceProcessor[tag](originPrice);
}
//扩展新状态
priceProcessor.newUser = function (originPrice) {
    if (originPrice >= 100) {
        return originPrice - 50;
    }
    return originPrice;
};
//js设计模式开发实践
var calculateBonus = function (performancelevel, salary) {
    if (performancelevel === 'S') {
        return salary * 4;
    }
    if (performancelevel === "A") {
        return salary * 3;
    }
    if (performancelevel === "B") {
        return salary * 2;
    }
};
//使用组合函数重构代码
var performanceS = function (salary) {
    return salary * 4;
};
var performanceA = function (salary) {
    return salary * 3;
};
var performanceB = function (salary) {
    return salary * 2;
};
var calculateBonus1 = function (performancelevel, salary) {
    if (performancelevel === "S")
        return performanceS(salary);
    if (performancelevel === "A")
        return performanceA(salary);
    if (performancelevel === "B")
        return performanceB(salary);
};
//策略对象：封装具体的计算算法，对扩展开发，原则上不能进行修改。
var calculateBonusObj = {
    performanceS: function (salary) {
        return salary * 4;
    },
    performanceA: function (salary) {
        return salary * 3;
    },
    performanceB: function (salary) {
        return salary * 2;
    }
};
calculateBonusObj.performanceC = function (salary) {
    return salary;
};
//环境类：负责委托策略类进行具体的算法操作，不可修改
var calculateBonus2 = function (performancelevel, salary) {
    return calculateBonusObj[performancelevel](salary);
};
//策略模式：就是定义一系列算法，将其封装出来。通过组合的方式，使它们可以互相替换。
//示例实现
var _performanceS = function () { };
_performanceS.prototype.calculate = function (salary) {
    return salary * 4;
};
var _performanceA = function () { };
_performanceA.prototype.calculate = function (salary) {
    return salary * 3;
};
var _performanceB = function () { };
_performanceB.prototype.calculate = function (salary) {
    return salary * 2;
};
var Bouns = function () {
    this.salary = null;
    this.strategy = null;
};
Bouns.prototype.setSalary = function (salary) {
    this.salary = salary;
};
Bouns.prototype.setStrategy = function (strategy) {
    this.strategy = strategy;
};
Bouns.prototype.getBouns = function () {
    return this.strategy.calculate(this.salary);
};
var bouns = new Bouns();
bouns.setSalary(1000);
bouns.setStrategy(new _performanceS(bouns.salary));
console.log(bouns.getBouns());
//针对评级返回对应的分数
var grade = function (score) {
    var _score = score.toUpperCase();
    if (_score === "S") {
        return "90~100";
    }
    else if (_score === "A") {
        return "80~90";
    }
    else if (_score === "B") {
        return "70~80";
    }
    else if (_score === "C") {
        return "60~70";
    }
    else if (_score === "D") {
        return "50~60";
    }
    else if (_score === "E") {
        return "40~50";
    }
    //... more else if
    else {
        return 'else';
    }
};
//新建策略对象，封装算法
var strategyGrade = {
    S: function () {
        return "90~100";
    },
    A: function () {
        return "80~90";
    },
    B: function () {
        return "70~80";
    },
    C: function () {
        return "60~70";
    },
    D: function () {
        return "50~60";
    },
    E: function () {
        return "40~50";
    }
    //... more strategy object
};
//新建委托函数
var delegationFunction = function (tag) {
    var _tag = tag.toUpperCase();
    return strategyGrade[_tag](); //执行对应的算法
};
//产品新增需求了，
//1，增加一个F状态，
//2，把之前的E状态修改返回为40.5~50.5，
//3，删除掉原本的B状态
strategyGrade.F = function () {
    return '我是新增的F状态';
};
strategyGrade.E = function () {
    return '40.5~50.5';
};
delete strategyGrade.B;
// console.log(delegationFunction("F")) //我是新增的F状态
// console.log(delegationFunction("E")) //40.5~50.5
// console.log(delegationFunction("B")) // strategyGrade[_tag] is not a function
//定义key，在实际开发中，可以专门使用一个js文件放置这个配置参数
var LESS_THAN_TEN = "0-10";
//...more params
var ELSE = "else";
//定义策略对象
var strategyHusa = (_a = {},
    _a[LESS_THAN_TEN] = function () {
        console.log("0-10");
    },
    //... more function
    _a[ELSE] = function () {
        console.log("没有此情况的处理办法");
    },
    _a);
//计算得到tag
function computedTag(scorce) {
    var _keyList = Object.keys(strategyHusa);
    var _key = _keyList.find(function (key) {
        var _keyList = key.split("-");
        return scorce > +_keyList[0] && scorce < +_keyList[1];
    });
    return _key || "else";
}
//委托函数
var delegationFunction2 = function (scorce) {
    var tag = computedTag(scorce);
    strategyHusa[tag]();
};
delegationFunction2(5);
