namespace order{
    //实现一个命令接口
    interface interCommand{
        execute:()=>void
    }

    //实现一个打开电灯的命令
    class LightOnCommand implements interCommand {
        light:Light
        constructor(light:Light){
            this.light = light
        }
        execute(){
            this.light.on()
        }
    }

    class Light {
        on(){
            console.log("打开电灯")
        }
    }

    //设置遥控器对象
    class SimpleRemoteControl{
        slot:interCommand | null = null
        constructor(){}
        setCommand(command:interCommand){
            this.slot = command;
        }

        buttonWasPress(){
            this.slot?.execute()
        }
    }

    //新建命令模式客户
    class RemoteControlTest{
        remote:SimpleRemoteControl
        light:Light
        constructor(){
            this.remote = new SimpleRemoteControl()
            this.light = new Light()

            this.remote.setCommand(new LightOnCommand(this.light))//设置命令

            this.remote.buttonWasPress();//调用方法
        }
    }

    new RemoteControlTest()
}