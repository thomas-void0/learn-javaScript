
const container = document.getElementById("container");
let conut = 1;
function getUserAction(){
    container.innerHTML = conut++;
}

/*关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。*/

/**
 * 示例一
 * 使用时间戳的方式，实现节流---第一次可以默认执行
 * @param {Function} fn 
 * @param {Number} wait 
 */
function throttle1(fn,wait){
    let oldTime = 0;
    return function(...args){
        let nowTime = +Date.now();
        if(nowTime - oldTime > wait){
            fn.apply(this,args);
            oldTime = nowTime;
        }
    }
}

/**
 * 示例二
 * 使用定时器的方式 --- 离开之后可以执行
 * @param {Function} fn 
 * @param {Number} wait 
 */
function throttle2(fn ,wait){
    let timeId;
    return function(...args){
        !timeId && (
            timeId = setTimeout(() => {
                fn.apply(this,args);
                timeId = null;
            }, wait)
        )
    }
}

/**
 * 示例三
 * 1. 第一次默认立即触发。
 * 2. 并且结束了以后再触发一次。
 * @param {Function} fn 
 * @param {Number} wait 
 */
function throttle3(fn,wait){
    let timeId,oldTime=0;

    return function(...args){
        let nowTime = +Date.now();
        let remaining = wait - (nowTime - oldTime);
        if(remaining <= 0){ 
            //如果进来以后发现有一个定时器存在,为了避免执行2次.清除掉这个定时器,并且执行函数.
            if(timeId){
                clearTimeout(timeId);
                timeId = null;
            }
            oldTime = nowTime;
            fn.apply(this,args);
        }else if(!timeId){
            //如果是在中途触发了这个函数,那么根据计算出的剩余执行时间.在剩余执行时间达到后调用定时器执行一次fn
            timeId = setTimeout(()=>{
                oldTime = nowTime;
                timeId = null;
                fn.apply(this,args);
            },remaining) 
        }
    }
}

/**
 * 示例四
 * 可以通过传入参数决定头尾的有无。
 * leading：false 表示无头有尾
 * trailing: false 表示有头无尾
 * 注意：不能同时设置2个值都为false
 * @param {Function} fn 
 * @param {Number} wait 
 * @param {leading:Boolean,trailing:Boolean} options 
 */
function throttle4(fn,wait,options){
    let timeId,oldTime=0;
    !options && (options = {}); //如果options没有传递，那么就定义为一个空对象

    return function(...args){
        let nowTime = +Date.now();
        !oldTime && options.leading === false && (oldTime = nowTime); //第一次不执行
        let remaining = wait - (nowTime - oldTime);
        
        if(remaining <= 0){ 
            //如果进来以后发现有一个定时器存在,为了避免执行2次.清除掉这个定时器,并且执行函数.
            if(timeId){
                clearTimeout(timeId);
                timeId = null;
            }
            oldTime = nowTime;
            fn.apply(this,args);
        }else if(!timeId && options.trailing !== false){
            //如果是在中途触发了这个函数,那么根据计算出的剩余执行时间.在剩余执行时间达到后调用定时器执行一次fn
            timeId = setTimeout(()=>{
                oldTime = nowTime;
                timeId = null;
                fn.apply(this,args);
            },remaining) 
        }
    }
}

/**
 * 示例五
 * 封装的节流的类，throttle函数可以实现节流，cancel函数可以实现取消
 * leading：false 表示无头有尾
 * trailing: false 表示有头无尾
 * 注意：不能同时设置2个值都为false
 * @param {Function} fn 
 * @param {Number} wait 
 * @param {leading:Boolean,trailing:Boolean} options 
 */
class Throttled{
    constructor(){
        this.timeId = null; //记录定时器id
        this.oldTime = null; //记录上一次触发函数的时间
    }
    throttle(fn,wait,options){
        !options && (options = {});
        return function(...args){
            const nowTime = +Date.now();//获得当前的时间
            !this.oldTime && options.leading === false && (this.oldTime = nowTime);
            const remaining = wait - (nowTime - this.oldTime);

            if(remaining <= 0){
                if(this.timeId){
                    clearTimeout(this.timeId);
                    this.timeId = null;
                }
                this.oldTime = nowTime;
                fn.apply(this,args);
            }else if(!this.timeId && options.trailing !== false){
                this.timeId = setTimeout(() => {
                    this.oldTime = nowTime;
                    this.timeId = null;
                    fn.apply(this,args);
                }, remaining);
            }
        }
    }
    //取消节流 
    cancel(){
        clearTimeout(this.timeId);
        this.timeId = null;
        this.oldTime = 0;
    }
}

const options = {
    leading:true,
    trailing:false
}

/*实例化对象*/
const t = new Throttled();

/*调用的时候注意绑定this的指向*/
container.onmousemove = t.throttle(getUserAction,10000,options).bind(t);
document.getElementById("btn").onclick = t.cancel.bind(t);