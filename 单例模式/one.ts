namespace one{
    class Singleton {
        name:string
        constructor(name:string){
            this.name = name;
        }

        intance:Singleton | null = null;

        getName(){
            console.log(this.name)
        }

        getInstance = ()=>{
            if(this.intance == void 0){
                this.intance = new Singleton("test")
            }
            return this.intance;
        }

    }

    //动态创建命令空间
    interface interNamespace {
        [propname:string]:any
    }
    const myApp:interNamespace = {}
    myApp.namespace = function(name:any){
        const parts = name.split(".");
        let current = myApp;
        for(let i in parts){
            if(!current[parts[i]]){
                current[parts[i]] = {}
            }

            current = current[parts[i]];
        }
    }


    //使用闭包封装私有变量
    const user = (function(){
        var _name = 'sven',
            _age = 29;

        return {
            getUserInfo:function(){
                return _name + _age
            }
        }
    })()

    //惰性单例
    class SingleTon{
        getInstance(){
            let instance:null | SingleTon = null;
            if(instance == void 0){
                instance = new SingleTon()
            }
            return instance;
        }
    }

    //通用的惰性单例
    var f = function(fn:Function){
        var result:any
        return (...args:[])=>{
            return result || (result = fn.apply(args))
        }

    }


    interface interObj{
        name:string,
        age:number
    }

    const justOne = ()=>{
        let instance:null | interObj
        return (obj:interObj)=>{
            if(instance == void 0) instance = obj
            return instance
        }
    }

    const fn = justOne()

    const a = fn({name:"黄晓明",age:18});
    const b = fn({name:"安吉拉大宝贝",age:18});

    console.log(a) //{ name: '黄晓明', age: 18 }
    console.log(b) //{ name: '黄晓明', age: 18 }
}