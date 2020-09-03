"use strict";
//关于气象站的显示设计
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
//实现接口
var WeatherData = /** @class */ (function () {
    function WeatherData() {
    }
    WeatherData.prototype.registerObserver = function () { };
    WeatherData.prototype.removeObserver = function () { };
    WeatherData.prototype.notifyObserver = function () { };
    WeatherData.prototype.getTem = function () { }; //得到温度
    WeatherData.prototype.getHum = function () { }; //得到湿度
    WeatherData.prototype.getPressure = function () { }; //得到大气压
    WeatherData.prototype.messurementsChanged = function () { }; //通知调用
    return WeatherData;
}());
//实现观察者接口
var Observer = /** @class */ (function () {
    function Observer() {
    }
    Observer.prototype.update = function () { };
    return Observer;
}());
//布告板实现，在此处实际上布告板就相当于我们的观察者
var Board = /** @class */ (function () {
    function Board() {
    }
    Board.prototype.display = function () { console.log("显示相应信息"); };
    Board.prototype.update = function () {
        console.log("获取通知信息");
    };
    return Board;
}());
//操作实现
var Weatcher;
(function (Weatcher) {
    //再weatherData中实现主题接口
    var WeatherData = /** @class */ (function () {
        function WeatherData() {
            this.tem = 0;
            this.hum = 0;
            this.pressure = 0;
            this.ObserverList = [];
        }
        //当注册观察者的时候，我们只要把它加入到ObserverList中即可
        WeatherData.prototype.registerObserver = function (o) {
            this.ObserverList.push(o);
        };
        //当删除观察者的时候，我们只需要将其从ObserverList中删除即可
        WeatherData.prototype.removeObserver = function (o) {
            this.ObserverList = this.ObserverList.filter(function (item) { return item !== o; });
        };
        //把状态告诉每一个观察者，因为观察者们都实现了update方法。所以可以很方便的通知到
        WeatherData.prototype.notifyObserver = function () {
            var _this = this;
            this.ObserverList.forEach(function (item) {
                item.update(_this.tem, _this.hum, _this.pressure);
            });
        };
        //当从气象站获取到更新数据的时候，我们通知每一个观察者
        WeatherData.prototype.measurementsChanged = function () {
            this.notifyObserver();
        };
        //测试方法，模拟气象站调用
        WeatherData.prototype.setMeasurements = function (tem, hum, pressure) {
            this.tem = tem;
            this.hum = hum;
            this.pressure = pressure;
            this.measurementsChanged();
        };
        return WeatherData;
    }());
    //创建我们的天气布告板
    var CurrentConditionsDisplay = /** @class */ (function () {
        function CurrentConditionsDisplay(weatherData) {
            this.tem = 0;
            this.hum = 0;
            this.pressure = 0;
            this.weatherData = weatherData;
            this.weatherData.registerObserver(this);
        }
        //当update被调用的时候，存储温度、湿度、气压的值然后调用display进行显示
        CurrentConditionsDisplay.prototype.update = function (tem, hum, pressure) {
            this.tem = tem;
            this.hum = hum;
            this.pressure = pressure;
            this.display();
        };
        CurrentConditionsDisplay.prototype.display = function () {
            console.log("温度:", this.tem);
            console.log("湿度:", this.hum);
            console.log("气压:", this.pressure);
        };
        return CurrentConditionsDisplay;
    }());
    //建立测试程序
    var WeatherStation = /** @class */ (function () {
        function WeatherStation() {
            this.weatherData = new WeatherData(); //新建一个发布者实例。并且用这个发布者实例注册布告板
            new CurrentConditionsDisplay(this.weatherData); //新建布告板实例
        }
        WeatherStation.prototype.test = function () {
            this.weatherData.setMeasurements(11, 12, 13); //通知参数
        };
        return WeatherStation;
    }());
    new WeatherStation().test();
})(Weatcher || (Weatcher = {}));
var Product;
(function (Product) {
    var Dep = /** @class */ (function () {
        function Dep() {
            this.ObserverList = [];
        }
        Dep.prototype.add = function (o) {
            this.ObserverList.push(o);
        };
        Dep.prototype.remove = function (o) {
            this.ObserverList = this.ObserverList.filter(function (item) { return item != o; });
        };
        Dep.prototype.notify = function (state) {
            this.ObserverList.forEach(function (item) { return item.update(state); });
        };
        return Dep;
    }());
    var Observer = /** @class */ (function () {
        function Observer() {
        }
        Observer.prototype.update = function (state) {
            console.log("通知更新");
        };
        return Observer;
    }());
    //具体实现
    var PrdPublisher = /** @class */ (function (_super) {
        __extends(PrdPublisher, _super);
        function PrdPublisher() {
            var _this = _super.call(this) || this;
            // 初始化需求文档
            _this.prdState = null;
            // 韩梅梅还没有拉群，开发群目前为空
            _this.observers = [];
            return _this;
        }
        //该方法用于获取文件信息
        PrdPublisher.prototype.getPrdState = function () {
            return this.prdState;
        };
        //该方法用于设置文件信息
        PrdPublisher.prototype.setPrdState = function (state) {
            this.prdState = state;
            this.notify(this.prdState); //调用通知更新
        };
        return PrdPublisher;
    }(Dep));
    var DeveloperObserver = /** @class */ (function (_super) {
        __extends(DeveloperObserver, _super);
        function DeveloperObserver() {
            var _this = _super.call(this) || this;
            _this.prdState = null;
            return _this;
        }
        DeveloperObserver.prototype.update = function (state) {
            console.log("更新消息");
            state && (this.prdState = state);
            //调用工作函数
            this.work();
        };
        DeveloperObserver.prototype.work = function () {
            for (var i = 0; i < 3; i++) {
                console.log("work:", this.prdState);
            }
        };
        return DeveloperObserver;
    }(Observer));
    // 创建订阅者：
    var JS = new DeveloperObserver();
    // 创建订阅者：
    var JAVA = new DeveloperObserver();
    //创建发布者
    var PM = new PrdPublisher();
    //增加订阅者
    PM.add(JS);
    PM.add(JAVA);
    console.log(PM.getPrdState());
    PM.setPrdState("哈哈哈哈");
    //删除订阅者
    PM.remove(JS);
    PM.setPrdState("====");
})(Product || (Product = {}));
