namespace pizz {
    //head first披萨案例
    //初步封装
    class orderPizz{
        type:string
        constructor(type:string){
            this.type = type;
        }

        prepare(){}
        bake(){}
        cut(){}
        box(){}
    }

    class SimplePizzaFactory{
        createPizza(type:string):Pizza{
            let pizza:null | string = null;
            if(type === "1"){
                return new ChesePizza()
            }
            return new Pizza()
        }
    }

    class Pizza{
        
    }

    class ChesePizza extends Pizza{}

    class PizzaStore{
        factory:SimplePizzaFactory
        constructor(factory:SimplePizzaFactory){
            this.factory = factory;
        }

        orderPizz(type:string){
            const pizza = this.factory.createPizza("1");

            const prepare = ()=>{}
            const bake = ()=>{}
            const cut = ()=>{}
            const box = ()=>{}
        }
    }

    // function createPizza(type:string){
    //     return new Pizza()
    // }

    //新建一个pizza类
    abstract class newPizzaStore{
        orderPizza(type:string){
            let pizza:null | Pizza = null
            pizza = this.createPizza(type)

            //do something
        }

        abstract createPizza:(type:string)=>Pizza
    }

    //子类继承，实现自己独特的createPizza方法

    class NYPizzaStore extends newPizzaStore {
        constructor() {
            super()
        }

        createPizza = (type:string)=>{
            let  NYChesePizza = new Pizza()
            return NYChesePizza
        }
    }
    
    //所有的工厂模式都用来封装对象的创建。工厂方法模式通过让子类决定该创建的对象是什么，来达到将对象创建的过程封装的目的。
    
}