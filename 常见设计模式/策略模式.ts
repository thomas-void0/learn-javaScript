
//飞行行为接口
interface FlyBehavior{
    flyWithWings:()=>void,
    flyNoWay:()=>void
}

//叫声的接口
interface QuackBehavior{
    quack:()=>void,
    Squack:()=>void,
    MuteQuack:()=>void
}

//飞行类
class flyBehavior implements FlyBehavior{
    flyWithWings(){
        return "fly"
    }
    flyNoWay(){
        return "noFly"
    }
}

//叫声类
class quackBehavior implements QuackBehavior{
    quack(){
        return "呱呱叫"
    }
    Squack(){
        return "吱吱叫"
    }
    MuteQuack(){
        return "不会叫"
    }
}

//Duck类
abstract class Duck{
    swim(){}
    display(){}
    setPerformFLy(){}
    setPerformQuack(){}
    // performFly(){}
    // performQuack(){}
}

//野Duck
class MallardDuck extends Duck{
    quackBehavior:string;
    flyBehavior:string;
    constructor(){
        super()
        this.quackBehavior = new quackBehavior().quack(); //行为
        this.flyBehavior = new flyBehavior().flyWithWings();//类        
    }
    display(){
        console.log("mallard view")
    }
    swim(){
        console.log("swim")
    }
}

//处理预热价
function perPrice(originPrice:number){
    if(originPrice >= 100){
        return originPrice - 20;
    }
    return originPrice * 0.9;
}

//处理促销价
function onSalePrice(originPrice:number){
    if(originPrice >= 100){
        return originPrice - 30;
    }
    return originPrice * 0.8;
}

//处理返场价
function backPrice(originPrice:number){
    if(originPrice >= 200){
        return originPrice - 50
    }
    return originPrice
}

// 处理尝鲜价
function freshPrice(originPrice:number){
    return originPrice * 0.5;
}

//处理 询价逻辑的分发 ——> 询价逻辑的执行
function askPrice(tag:string,originPrice:number):number | void{
    if(tag === "pre") return perPrice(originPrice);
    if(tag === "onSale") return onSalePrice(originPrice);
    if(tag === "back") return backPrice(originPrice);
    if(tag === 'fresh') return freshPrice(originPrice);
}

//以上还没有实现 对扩展开放，对修改封闭的原则

interface PriceProcessor{
    [propName:string]:(originPrice:number)=>number
}

// 定义一个询价处理器对象
const priceProcessor:PriceProcessor = {
    pre(originPrice:number){
        if(originPrice >= 100) return originPrice - 20;
        return originPrice * 0.9;
    },
    onSale(originPrice:number){
        if(originPrice >= 100) return originPrice - 30;
        return originPrice * 0.8;
    },
    back(originPrice:number){
        if(originPrice >= 200) return originPrice - 20;
        return originPrice
    },
    fresh(originPrice:number){
        return originPrice * 0.5;
    }
}


//设置询价函数
function _askPrice(tag:string,originPrice:number):number | void{
    return priceProcessor[tag](originPrice);
}

//扩展新状态
priceProcessor.newUser = function(originPrice:number){
    if(originPrice >= 100){
        return originPrice - 50;
    }
    return originPrice;
}