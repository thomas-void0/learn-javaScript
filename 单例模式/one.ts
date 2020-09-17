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

    
}