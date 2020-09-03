namespace Bus{
    type callback = (...args:any)=>any;
    interface interHandlers {
        [propName:string]:Array<callback>
    }
    class EventEmitter{
        public handlers:interHandlers
        //handlers用于存储事件与回调之间的对应关系
        constructor(){
            this.handlers = {}
        }

        //on方法用于安装事件监听器，它接受目标事件名和回调函数作为参数
        on(eventName:string,cb:callback){
            if(!this.handlers[eventName]){
                //如果没有，那么首先初始化一个监听函数队列
                this.handlers[eventName] = []
            }

            //将回调函数推入目标事件的监听函数队列里去
            this.handlers[eventName].push(cb)
        }

        //emit方法用于触发目标事件，它接受事件名和监听函数作为参数
        emit(eventName:string,...args:any){
            //检查目标事件是否有监听函数队列
            if(this.handlers[eventName]){
                //如果有，则逐个调用队列里的回调函数
                this.handlers[eventName].forEach(cb=>{
                    cb(...args)
                })
            }
        }

        //移除某个事件回调队列里的指定回调函数
        off(eventName:string,cb:callback){
            const callbacks = this.handlers[eventName];
            const idx = callbacks.indexOf(cb)
            if(idx !== -1){
                callbacks.splice(idx,1)
            }
        }

        //为事件注册单次监听器
        once(eventName:string,cb:callback){
            //对回调函数进行包装，使其执行完毕自动被移除
            const wrapper = (...args:any)=>{
                cb(...args);
                this.off(eventName,wrapper)
            }
            this.on(eventName,wrapper)
        }
    }
}