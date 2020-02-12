//关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。
const container = document.getElementById("container");
let conut = 1;
function getUserAction(){
    container.innerHTML = conut++;
}
//使用时间戳 ---第一次可以默认执行
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

//使用定时器 --- 离开之后同样可以执行
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

// container.onmousemove = throttle2(getUserAction,1000);

function throttle3(func,wait){
    var timeId,oldTime=0;

    return function(...args){
        var nowTime = +Date.now();
        var remainder = wait - (nowTime - oldTime);
        //第一次可以默认执行
        if(remainder <= 0){ //说明到时间了，需要执行了
            if(timeId){
                clearTimeout(timeId)
                timeId = null;
            }
            oldTime = nowTime;
            func.apply(this,args);
        }else if(!timeId){ //如果在时间周期中触发，则执行这个语句块
            timeId = setTimeout(() => {
                oldTime = +Date.now();
                timeId = null;
                func.apply(this,args);
            }, remainder);
        }
    }
}

function throttle4(func,wait,options){
    var timeout,context;
    var previous = 0;
    !options && (options = {}); //如果没有传值，则给一个空对象
    
    var throttled = function(...args){
        var now = +Date.now();
        (!previous && options.leading === false) && (previous = now); //说明不需要首次执行
        var remaining = wait - (now - previous);
        context = this;
        if(remaining <= 0 || remaining > wait){
            if(timeout){
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context,args);
        }else if(!timeout && options.trailing !== false){
            timeout = setTimeout(()=>{
                previous = options.leading === false ? 0 : +Date.now();
                timeout = null;
                func.apply(context,args);
            },remaining)
        }
    }
    return throttled
}

// container.onmousemove = throttle3(getUserAction,1000);

// function throttle(fn,wait){
//     let oldTime=0;
//     return function(...args){
//         let nowTime = +Date.now();
//         let remaining = wait - (nowTime - oldTime); //计算出触发的剩余时间
//         if(remaining <= 0){ //到了时间才执行
//             oldTime = nowTime;
//             fn.apply(this,args);
//         }
//     }
// }

// function throttle(fn,wait){
//     let timeId;
//     return function(...args){
//         !timeId && (
//             timeId = setTimeout(()=>{
//                 fn.apply(this,args)
//                 timeId = null; //到了wait时间后才置为null,下一次定时器才得以执行
//             },wait)
//         )        
//     }
// }

// function throttle(fn,wait,options){
//     let timeId,oldTime=0;
//     !options && (options = {}); //如果options没有传递，那么就定义为一个空对象

//     return function(...args){
//         let nowTime = +Date.now(); //得到当前的时间
//         !oldTime && options.leading === false && (oldTime = nowTime); //如果满足条件则第一次不执行
//         let remaining = wait - (nowTime - oldTime); //计算出剩余的时间
//         action = true;
//         if(remaining <= 0){ 
//             //如果进来以后发现有一个定时器存在,为了避免执行2次.清除掉这个定时器,并且执行函数.
//             if(timeId){
//                 clearTimeout(timeId);
//                 timeId = null;
//             }
//             oldTime = nowTime;
//             fn.apply(this,args);
//         }else if(!timeId && options.trailing !== false){
//             //如果是在中途触发了这个函数,那么根据计算出的剩余执行时间.在剩余执行时间达到后调用定时器执行一次fn
//             timeId = setTimeout(()=>{
//                 oldTime = nowTime;
//                 timeId = null;
//                 fn.apply(this,args);
//             },remaining) 
//         }
//     }
// }

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

const t = new Throttled();

container.onmousemove = t.throttle(getUserAction,10000,options).bind(t);
document.getElementById("btn").onclick = t.cancel.bind(t);