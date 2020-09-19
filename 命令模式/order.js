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
    //实现开门的功能：
    //实现门的示例对象
    var GarageDoor = /** @class */ (function () {
        function GarageDoor() {
        }
        GarageDoor.prototype.on = function () {
            console.log("open the door");
        };
        GarageDoor.prototype.off = function () {
            console.log("close the door");
        };
        return GarageDoor;
    }());
    // 实现门的命令对象
    var ControlGarageDoor = /** @class */ (function () {
        function ControlGarageDoor(door) {
            this.door = door;
        }
        ControlGarageDoor.prototype.execute = function () {
            this.door.on();
        };
        return ControlGarageDoor;
    }());
    //实现门的遥控器
    var DoorRemoteControl = /** @class */ (function () {
        function DoorRemoteControl(remote) {
            this.remote = remote;
        }
        DoorRemoteControl.prototype.buttonWasPress = function () {
            this.remote.execute();
        };
        return DoorRemoteControl;
    }());
    //测试
    var doorTest = new DoorRemoteControl(new ControlGarageDoor(new GarageDoor()));
    doorTest.buttonWasPress();
})(order || (order = {}));
