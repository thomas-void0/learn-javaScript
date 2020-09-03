"use strict";
//关于气象站的显示设计
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
