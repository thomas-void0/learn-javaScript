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

    new RemoteControlTest();


    //实现开门的功能：

    //实现门的示例对象
    class GarageDoor {
        on(){
            console.log("open the door")
        }
        off(){
            console.log("close the door")
        }
    }

    // 实现门的命令对象
    class ControlGarageDoor implements interCommand{
        //这里需要将门的实例对象联系起来
        door:GarageDoor
        constructor(door:GarageDoor){
            this.door = door;
        }
        execute(){
            this.door.on()  
        }
    }   

    //实现门的遥控器
    class DoorRemoteControl{
        //这里需要将命令实例对象联系起来
        remote:ControlGarageDoor
        constructor(remote:ControlGarageDoor){
            this.remote = remote
        }

        buttonWasPress(){
            this.remote.execute()
        }
    }

    //测试
    const doorTest = new DoorRemoteControl(new ControlGarageDoor(new GarageDoor()));
    doorTest.buttonWasPress()
}