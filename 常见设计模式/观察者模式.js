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
