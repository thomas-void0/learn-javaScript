//关于气象站的显示设计

//发布者接口
interface S{
    registerObserver:()=>void,//注册观察者
    removeObserver:()=>void,//移除观察者
    notifyObserver:()=>void//通知观察者
}

//实现接口
class WeatherData implements S{
    registerObserver(){}
    removeObserver(){}
    notifyObserver(){}

    getTem(){} //得到温度
    getHum(){} //得到湿度
    getPressure(){}//得到大气压
    messurementsChanged(){} //通知调用
}

//观察者接口
interface O{
    update:()=>void //通知更新
}

//实现观察者接口
class Observer implements O{
    update(){}
}

//布告板显示接口
interface D{
    display:()=>void
}

//布告板实现，在此处实际上布告板就相当于我们的观察者
class Board implements D{
    display(){console.log("显示相应信息")}
    update(){
        console.log("获取通知信息")
    }
}

//操作实现
namespace Weatcher{
    //定义接口
    interface Subject{
        //这2个方法都需要一个观察者作为变量，该观察者是用来注册或者删除的
        registerObserver:(o:Observer)=>void,
        removeObserver:(o:Observer)=>void,

        //当状态发生改变时，该方法会被调用，以通知所有的观察者
        notifyObserver:()=>void
    }

    interface Observer{
        //当气象观测值改变的时候，主题会把这些状态值当作方法的参数，传递给观察者
        update:(temp:number,hum:number,pressure:number)=>void
    }

    interface DisplayElement{
        //当布告板需要显示的时候，调用此方法
        display:()=>void
    }

    //再weatherData中实现主题接口
    class WeatherData implements Subject{
        public ObserverList:Array<Observer> //用于记录观察者
        public tem:number = 0;
        public hum:number = 0;
        public pressure:number = 0;

        constructor(){
            this.ObserverList = []
        }
        
         //当注册观察者的时候，我们只要把它加入到ObserverList中即可
        registerObserver(o:Observer){
            this.ObserverList.push(o)
        }

        //当删除观察者的时候，我们只需要将其从ObserverList中删除即可
        removeObserver(o:Observer){
            this.ObserverList = this.ObserverList.filter(item=>item !== o)
        }

        //把状态告诉每一个观察者，因为观察者们都实现了update方法。所以可以很方便的通知到
        notifyObserver(){
            this.ObserverList.forEach(item=>{
                item.update(this.tem,this.hum,this.pressure)
            })
        }

        //当从气象站获取到更新数据的时候，我们通知每一个观察者
        measurementsChanged(){
            this.notifyObserver()
        }

        //测试方法，模拟气象站调用
        setMeasurements(tem:number,hum:number,pressure:number){
            this.tem = tem;
            this.hum = hum;
            this.pressure = pressure;
            this.measurementsChanged()
        }
    }


    //创建我们的天气布告板
    class CurrentConditionsDisplay implements Observer,DisplayElement{

        private tem:number = 0;
        private hum:number = 0;
        private pressure:number = 0;

        public weatherData:WeatherData;

        constructor(weatherData:WeatherData){
            this.weatherData = weatherData;
            this.weatherData.registerObserver(this);
        }

        //当update被调用的时候，存储温度、湿度、气压的值然后调用display进行显示
        update(tem:number,hum:number,pressure:number){
            this.tem = tem;
            this.hum = hum;
            this.pressure = pressure;
            this.display();
        }
        display(){
            console.log("温度:",this.tem);
            console.log("湿度:",this.hum);
            console.log("气压:",this.pressure);
        }
    }

    //建立测试程序
    class WeatherStation{
        public weatherData:WeatherData
        constructor(){
            this.weatherData = new WeatherData() //新建一个发布者实例。并且用这个发布者实例注册布告板
            new CurrentConditionsDisplay(this.weatherData) //新建布告板实例
        }
        
        test(){
            this.weatherData.setMeasurements(11,12,13);//通知参数
        }
    }

    new WeatherStation().test()
}