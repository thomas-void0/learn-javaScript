namespace Form {
    // interface interForm{
    //     [propname:string]:any
    // }
    // type Form = HTMLElement & interForm
    // const registerForm:Form | null = document.getElementById( 'registerForm' );

    // //不使用策略模式的情况下
    // if(registerForm){
    //     registerForm.onsubmit = function(){
    //         if(registerForm.userName.value === ''){
    //             alert ( '用户名不能为空' ); 
    //             return false;
    //         }

    //         if(registerForm.password.value.length < 6){
    //             alert ( '密码长度不能少于 6 位' ); 
    //             return false;
    //         }

    //         if ( !/(^1[3|5|8][0-9]{9}$)/.test( registerForm.phoneNumber.value ) ){ 
    //             alert ( '手机号码格式不正确' ); 
    //             return false; 
    //         }

    //     }
    // }
}

namespace _Form{
    
    //使用策略模式重构表单校验
    interface interStrategies  {
        [propname:string]:any
    }
    const strategies:interStrategies = {
        isNonEmpty(value:string, errorMsg:string){ //不能为空
            if(value == void 0) return errorMsg;
        },
        minLength(value:string,length:number,errorMsg:string){ //限制最小长度
            if(value.length < length) return errorMsg;
        },
        isMobile(value:string, errorMsg:string){ // 手机号码格式
            if(!/(^1[3|5|8][0-9]{9}$)/.test( value )) return errorMsg
        }
    }

    class Validator {
        rules:Array<any>
        constructor(){
            this.rules = [] //用于保存校验规则的数组
        }
        add(dom:Form,cb:string,errorMsg:string){
            const ary = cb.split(":");// 把 strategy 和参数分开
            this.rules.push(function(){// 把校验的步骤用空函数包装起来，并且放入 cache
                var strategy = ary.shift(); // 用户挑选的 strategy 
                ary.unshift( dom.value ); // 把 input 的 value 添加进参数列表
                ary.push( errorMsg ); // 把 errorMsg 添加进参数列表
                return strategy && strategies[ strategy ].apply( dom, ary );
            })
        }
        start():string{
           for(let i=0;i<this.rules.length;i++){
                var msg = this.rules[i]()
                if(msg) return msg;
           }
           return ""
        }
    }

    const validataFunc = function(){
        const validator = new Validator(); // 创建一个 validator 对象

        /***************添加一些校验规则****************/
        validator.add((registerForm as Form).userName, 'isNonEmpty', '用户名不能为空~');
        validator.add((registerForm as Form).password, 'minLength:6', '密码长度不能少于 6 位~');
        validator.add((registerForm as Form).phoneNumber, 'isMobile', '手机号码格式不正确~');

        const errMessage = validator.start() //获得校验结果
        return errMessage;
    }

    interface interForm{
        [propname:string]:any
    }
    type Form = HTMLElement & interForm
    const registerForm:Form | null = document.getElementById( 'registerForm' );
    (registerForm as Form).onsubmit = function(){
        const errorMsg = validataFunc(); // 如果 errorMsg 有确切的返回值，说明未通过校验
        if(errorMsg){
            alert(errorMsg)
            return false
        }
    }

}