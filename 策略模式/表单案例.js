"use strict";
var _Form;
(function (_Form) {
    var strategies = {
        isNonEmpty: function (value, errorMsg) {
            if (value == void 0)
                return errorMsg;
        },
        minLength: function (value, length, errorMsg) {
            if (value.length < length)
                return errorMsg;
        },
        isMobile: function (value, errorMsg) {
            if (!/(^1[3|5|8][0-9]{9}$)/.test(value))
                return errorMsg;
        }
    };
    var Validator = /** @class */ (function () {
        function Validator() {
            this.rules = []; //用于保存校验规则的数组
        }
        Validator.prototype.add = function (dom, cb, errorMsg) {
            var ary = cb.split(":"); // 把 strategy 和参数分开
            this.rules.push(function () {
                var strategy = ary.shift(); // 用户挑选的 strategy 
                ary.unshift(dom.value); // 把 input 的 value 添加进参数列表
                ary.push(errorMsg); // 把 errorMsg 添加进参数列表
                return strategy && strategies[strategy].apply(dom, ary);
            });
        };
        Validator.prototype.start = function () {
            for (var i = 0; i < this.rules.length; i++) {
                var msg = this.rules[i]();
                if (msg)
                    return msg;
            }
            return "";
        };
        return Validator;
    }());
    var validataFunc = function () {
        var validator = new Validator(); // 创建一个 validator 对象
        /***************添加一些校验规则****************/
        validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空~');
        validator.add(registerForm.password, 'minLength:6', '密码长度不能少于 6 位~');
        validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确~');
        var errMessage = validator.start(); //获得校验结果
        return errMessage;
    };
    var registerForm = document.getElementById('registerForm');
    registerForm.onsubmit = function () {
        var errorMsg = validataFunc(); // 如果 errorMsg 有确切的返回值，说明未通过校验
        if (errorMsg) {
            alert(errorMsg);
            return false;
        }
    };
})(_Form || (_Form = {}));
