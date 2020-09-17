"use strict";
var one;
(function (one) {
    var Singleton = /** @class */ (function () {
        function Singleton(name) {
            var _this = this;
            this.intance = null;
            this.getInstance = function () {
                if (_this.intance == void 0) {
                    _this.intance = new Singleton("test");
                }
                return _this.intance;
            };
            this.name = name;
        }
        Singleton.prototype.getName = function () {
            console.log(this.name);
        };
        return Singleton;
    }());
})(one || (one = {}));
