let count = 1;
const container = document.getElementById("container");

const getUserAction = () => {
    container.innerHTML = count++;
}

/**
 * 示例代码一
 * 到时间间隔才执行，如果在间隔期间触发那么则重新计时。
 * @param {Function} fn 需要进行防抖处理的函数
 * @param {Number} time 时间间隔,单位ms
 */

function debounce1(fn, time) {
    let timeId;
    return function (...args) {
        clearTimeout(timeId);
        timeId = setTimeout(() => {
            fn.apply(this, args)
        }, time)
    }
}

/**
 * 示例代码二
 * 一种可以第一次就默认执行的代码形式
 * @param {Function} fn 需要进行防抖处理的函数
 * @param {Number} wait 时间间隔,单位ms
 * @param {Boolean} immediate 第一次是否默认执行
 */
function debounce2(fn, wait, immediate) {
    let timeID, result;
    return function (...args) {
        timeID && clearTimeout(timeID);
        if (immediate) {
            let callNow = !timeID;
            timeID = setTimeout(() => {
                timeID = null;
            }, wait);
            callNow && (result = fn.apply(this, args));
        } else {
            timeID = setTimeout(() => {
                fn.apply(this, args)
            }, wait)
        }
        return result;
    }
}

/**
 * 示例代码三
 * 一个防抖的类，可以实现防抖，以及防抖的取消
 * @param {Function} fn 需要进行防抖处理的函数
 * @param {Number} wait 时间间隔,单位ms
 * @param {Boolean} immediate 第一次是否默认执行
 */
class Debounced {
    constructor() {
        this.timeId = null;
    }

    debounce(fn, wait, immediate) { //一个防抖函数
        let result;
        return function (...args) {
            this.timeId && clearTimeout(this.timeId);
            if (immediate) { //如果为true，则第一次默认执行
                var callNow = !this.timeId;
                this.timeId = setTimeout(() => {
                    this.timeId = null;
                }, wait);
                callNow && (result = fn.apply(this, args))
            } else {
                this.timeId = setTimeout(() => {
                    fn.apply(this, args)
                }, wait);
            }
            return result;
        }
    }
    cancel() {
        clearTimeout(this.timeId);
        this.timeId = null;
    }
}

/*示例化对象*/ 
const d = new Debounced();
container.onmousemove = d.debounce(getUserAction, 1000, true).bind(d); //这里要绑定this的指向
document.getElementById("btn").onclick = d.cancel.bind(d); //这里要绑定this的指向




