
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

//js设计模式开发实践
const calculateBonus = function (performancelevel:string,salary:number){
    if(performancelevel === 'S'){
        return salary * 4
    }

    if(performancelevel === "A"){
        return salary * 3
    }

    if(performancelevel === "B"){
        return salary * 2
    }
}

//使用组合函数重构代码
const performanceS = function(salary:number){
    return salary * 4
}
const performanceA = function(salary:number){
    return salary * 3
}
const performanceB = function(salary:number){
    return salary * 2
}

const calculateBonus1 = function(performancelevel:string,salary:number){
    if(performancelevel === "S") return performanceS(salary);
    if(performancelevel === "A") return performanceA(salary);
    if(performancelevel === "B") return performanceB(salary);
}

//使用策略模式重构
interface interCalculateBonusObj {
    [propname:string]:(salary:number)=>number
}

//策略对象：封装具体的计算算法，对扩展开发，原则上不能进行修改。
const calculateBonusObj:interCalculateBonusObj = {
    performanceS(salary:number){
        return salary * 4;
    },
    performanceA(salary:number){
        return salary * 3;
    },
    performanceB(salary:number){
        return salary * 2;
    }
}
calculateBonusObj.performanceC = function(salary:number){
    return salary;
}

//环境类：负责委托策略类进行具体的算法操作，不可修改
const calculateBonus2 = function(performancelevel:string,salary:number){
    return calculateBonusObj[performancelevel](salary)
}

//策略模式：就是定义一系列算法，将其封装出来。通过组合的方式，使它们可以互相替换。

//示例实现
const _performanceS:any = function(){};
_performanceS.prototype.calculate = function(salary:number){
    return salary * 4;
}

const _performanceA = function(){}
_performanceA.prototype.calculate = function(salary:number){
    return salary * 3;
}

const _performanceB = function(){}
_performanceB.prototype.calculate = function(salary:number){
    return salary * 2;
}


interface interBouns{
    salary:null | number;
    strategy:null | {
        prototype:{
            calculate:(salary:number)=>number
        }
    }
}


const Bouns:any = function(this:interBouns){
    this.salary = null; 
    this.strategy = null;
}

Bouns.prototype.setSalary = function(salary:number){
   this.salary = salary;
}

Bouns.prototype.setStrategy = function<T>(strategy:T){
    this.strategy = strategy;
}

Bouns.prototype.getBouns = function():number{
    return this.strategy.calculate(this.salary);
}

const bouns = new Bouns();
bouns.setSalary(1000)
bouns.setStrategy(new _performanceS(bouns.salary))
console.log(bouns.getBouns())


//针对评级返回对应的分数
const grade = (score:string):string=>{
    const _score = score.toUpperCase()
    if(_score === "S"){
        return "90~100"
    }else if(_score === "A"){
        return "80~90"
    }else if(_score === "B"){
        return "70~80"
    }else if(_score === "C"){
        return "60~70"
    }else if(_score === "D"){
        return "50~60"
    }else if(_score === "E"){
        return "40~50"
    }
    
    //... more else if

    else{
        return 'else'
    }
}


//新建策略对象，封装算法
const strategyGrade:{[propname:string]:()=>string} = {
    S(){
        return "90~100"
    },
    A(){
        return "80~90"
    },
    B(){
        return "70~80"
    },
    C(){
        return "60~70"
    },
    D(){
        return "50~60"
    },
    E(){
        return "40~50"
    }

    //... more strategy object
}

//新建委托函数
const delegationFunction = (tag:string) => {
    const _tag = tag.toUpperCase();
    return strategyGrade[_tag]() //执行对应的算法
}

//产品新增需求了，
//1，增加一个F状态，
//2，把之前的E状态修改返回为40.5~50.5，
//3，删除掉原本的B状态

strategyGrade.F = ()=>{
    return '我是新增的F状态'
}

strategyGrade.E = ()=>{
    return '40.5~50.5'
}

delete strategyGrade.B

console.log(delegationFunction("F")) //我是新增的F状态
console.log(delegationFunction("E")) //40.5~50.5
console.log(delegationFunction("B")) // strategyGrade[_tag] is not a function
