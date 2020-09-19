"use strict";
var order;
(function (order) {
    //实现一个打开电灯的命令
    var LightOnCommand = /** @class */ (function () {
        function LightOnCommand(light) {
            this.light = light;
        }
        LightOnCommand.prototype.execute = function () {
            this.light.on();
        };
        return LightOnCommand;
    }());
    var Light = /** @class */ (function () {
        function Light() {
        }
        Light.prototype.on = function () {
            console.log("打开电灯");
        };
        return Light;
    }());
    //设置遥控器对象
    var SimpleRemoteControl = /** @class */ (function () {
        function SimpleRemoteControl() {
            this.slot = null;
        }
        SimpleRemoteControl.prototype.setCommand = function (command) {
            this.slot = command;
        };
        SimpleRemoteControl.prototype.buttonWasPress = function () {
            var _a;
            (_a = this.slot) === null || _a === void 0 ? void 0 : _a.execute();
        };
        return SimpleRemoteControl;
    }());
    //新建命令模式客户
    var RemoteControlTest = /** @class */ (function () {
        function RemoteControlTest() {
            this.remote = new SimpleRemoteControl();
            this.light = new Light();
            this.remote.setCommand(new LightOnCommand(this.light)); //设置命令
            this.remote.buttonWasPress(); //调用方法
        }
        return RemoteControlTest;
    }());
    new RemoteControlTest();
})(order || (order = {}));
