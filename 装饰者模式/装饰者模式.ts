//head first咖啡代码
namespace coffe{
    //实现一个饮料抽象类
    abstract class Beverage{
        //关于饮品的描述
        description:string = ''

        //实现一个方法得到coffe描述
        getDescription(){
            return this.description
        }
        
        //子类中实现一个方法cost计算价格
        abstract cost:()=>number
    }

    //实现一个调料抽象类,继承饮料抽象类(装饰类)
    abstract class CodimentDcorator extends Beverage {
        //所有的调料装饰者都必须重新实现getDescription方法
        public abstract getDescription:()=>string
    }

    //实现一些具体的饮料
    class Espresso extends Beverage{
        constructor(description:string){
            super()
            this.description = description;
        }
        
        cost = ()=>{
            return 1.99
        }
    }

    class HouseBlend extends Beverage {
        constructor(description:string){
            super()
            this.description = description;
        }

        cost = ()=>{
            return .89
        }
    }

    //实现摩卡装饰者
    class Mocha extends CodimentDcorator {
        beverage:Beverage
        constructor(beverage:Beverage) {
            super()
            this.beverage = beverage
        }

        getDescription=()=>{
            return this.beverage.getDescription() + ",Mocha"
        }

        cost=()=>{
            return this.beverage.cost() + .20
        }
    }

    //实现soy装饰者
    class Soy extends CodimentDcorator{
        beverage:Beverage
        constructor(beverage:Beverage){
            super()
            this.beverage = beverage;
        }

        getDescription = ()=>{
            return this.beverage.getDescription() + ",Soy"
        }

        cost = ()=>{
            return this.beverage.cost() + .20
        }
    }

    //测试实现
    const testcoffe = new Espresso("this is test coffe");
    //不加调料直接打印出价格
    console.log(testcoffe.getDescription(),testcoffe.cost())

    //增加调料进行测试
    let d = new Mocha(testcoffe);
    d = new Mocha(testcoffe);
    d = new Soy(testcoffe);
    console.log(d.getDescription(),d.cost())
}
