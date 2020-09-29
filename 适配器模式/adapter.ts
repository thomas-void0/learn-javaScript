namespace adapter{
    //鸭子类
    interface Duck{
        quack:()=>void,
        fly:()=>void
    }
    
    class MallardDuck implements Duck{
        quack(){
            console.log("嘎嘎叫")
        }
        fly(){
            console.log("fly")
        }
    }

    //火鸡类
    interface Turkey{
        gobble:()=>void,
        fly:()=>void
    }
    
    class WildTurkey implements Turkey{
        gobble(){
            console.log("咯咯叫")
        }
        fly(){
            console.log("turkey fly")
        }
    }

    //使用适配器的方式，让火鸡可以冒充鸭子
    class TurkeyAdapter implements Duck{
        turkey:Turkey
        constructor(turkey:Turkey){
            this.turkey = turkey;
        }

        quack(){
            this.turkey.gobble()
        }

        fly(){
            this.turkey.fly()
        }
    }
}