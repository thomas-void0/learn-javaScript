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