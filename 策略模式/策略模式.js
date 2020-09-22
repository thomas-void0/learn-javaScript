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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_OBJ = exports.REASONLIST = void 0;
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
// function computedTag (scorce:number){
//     const _keyList = Object.keys(strategyHusa);
//     const _key = _keyList.find((key:string)=>{
//         const _keyList = key.split("-");
//         return scorce > +_keyList[0] && scorce < +_keyList[1]
//     })
//     return _key || "else"
// }
//委托函数
// const delegationFunction2 = (scorce:number) =>{
//     const tag = computedTag(scorce);
//     strategyHusa[tag]()
// }
// delegationFunction2(5)
//新建一个constant.js文件,用于枚举所有的状态
exports.REASONLIST = [
    { key: "1", value: "原文案已开原创标" },
    { key: "2", value: "被微信删文" },
    { key: "3", value: "账号因该文案被微信屏蔽" },
    { key: "4", value: "被微信警告自主删文" },
    { key: "5", value: "微信审核未通过且被删文" },
    { key: "6", value: "账号被微信屏蔽" },
    { key: "7", value: "自行删文" },
    { key: "8", value: "原文链接缺失" },
    { key: "9", value: "自行添加原文链接" },
    { key: "10", value: "内容被修改" },
    { key: "11", value: "发文审核失败" },
    { key: "12", value: "研判错误" },
    { key: "13", value: "发错位置" },
    { key: "14", value: "原文链接为跳转长链" },
];
//index.js
//创建一个策略对象
var strategyValue = {};
exports.REASONLIST.forEach(function (_a) {
    var key = _a.key, value = _a.value;
    return strategyValue[key] = function () { return value; };
});
//创建委派函数
var delegationFunction3 = function (tag) { return strategyValue[tag](); };
//测试
console.log(delegationFunction3('1')); //原文案已开原创标
console.log(delegationFunction3('2')); //被微信删文
// if (data[i].bank_name == '工商银行') {
//     data[i].bankClass = 'icon-gongshang'
//   } else if (data[i].bank_name == '中国银行') {
//     data[i].bankClass = 'icon-zhongguo'
//   } else if (data[i].bank_name == '农业银行') {
//     data[i].bankClass = 'icon-nongye'
//   } else if (data[i].bank_name == '交通银行') {
//     data[i].bankClass = 'icon-jiaotong'
//   } else if (data[i].bank_name == '建设银行') {
//     data[i].bankClass = 'icon-jianshe'
//   } else if (data[i].bank_name == '兴业银行') {
//     data[i].bankClass = 'icon-xingye'
//   } else if (data[i].bank_name == '招商银行') {
//     data[i].bankClass = 'icon-zhaoshang'
//   } else if (data[i].bank_name == '浦发银行') {
//     data[i].bankClass = 'icon-pufa'
//   } else if (data[i].bank_name == '广发银行') {
//     data[i].bankClass = 'icon-guangfa'
//   } else if (data[i].bank_name == '平安银行') {
//     data[i].bankClass = 'icon-pingan'
//   } else if (data[i].bank_name == '中信银行') {
//     data[i].bankClass = 'icon-zhongxin'
//   } else if (data[i].bank_name == '华夏银行') {
//     data[i].bankClass = 'icon-huaxia'
//   } else if (data[i].bank_name == '光大银行') {
//     data[i].bankClass = 'icon-guangda'
//   } else if (data[i].bank_name == '民生银行') {
//     data[i].bankClass = 'icon-minsheng'
//   } else if (data[i].bank_name == '邮政储蓄银行') {
//     data[i].bankClass = 'icon-youzheng'
//   } else if (data[i].bank_name == '宁波银行') {
//     data[i].bankClass = 'icon-ningbo'
//   }
//新建constant.js文件，放置策略对象配置文件
exports.CONFIG_OBJ = {
    "1": "icon-zhifubao",
    "工商银行": "icon-gongshang",
    "中国银行": "icon-zhongguo",
    "农业银行": "icon-nongye",
    "交通银行": "icon-jiaotong",
    "建设银行": "icon-jianshe",
    "兴业银行": "icon-xingye",
    "招商银行": "icon-zhaoshang",
    "浦发银行": "icon-pufa",
    "广发银行": "icon-guangfa",
    "平安银行": "icon-pingan",
    "中信银行": "icon-zhongxin",
    "华夏银行": "icon-huaxia",
    "光大银行": "icon-guangda",
    "民生银行": "icon-minsheng",
    "邮政储蓄银行": "icon-youzheng",
    "宁波银行": "icon-ningbo",
};
//index.js
var _data = [];
var STRATEGY_OBJ = Object.keys(exports.CONFIG_OBJ).reduce(function (prev, key) {
    prev[key] = function () { return exports.CONFIG_OBJ[key]; };
    return prev;
}, {});
//创建委派函数
var dF = function (name) { return STRATEGY_OBJ[name](); };
var data1 = [
    { account_type: "1" },
    { bank_name: "建设银行" },
];
data1.forEach(function (_a, i) {
    var account_type = _a.account_type, bank_name = _a.bank_name;
    if (account_type === '1')
        return _data[i] = dF(account_type);
    _data[i] = bank_name && dF(bank_name) || '';
});
console.log("----->", _data);
