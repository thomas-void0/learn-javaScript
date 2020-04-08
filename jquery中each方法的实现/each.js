//判断数组映射
const typeStr = "Boolean String Number Null Undefined Function Object Array Date RegExp Error Symbol Map Set WeakMap WeakSet";
const typeArr = typeStr.split(" ");

function handleTypeArr(typeArr){
    return typeArr.reduce((pre,type)=>pre.set(`[object ${type}]`,type),new Map());
}

const newTypeObj = handleTypeArr(typeArr);

//检测数据的类型
function type(obj){
    const objType = Object.prototype.toString.call(obj);
    return newTypeObj.get(objType).toLowerCase();
}

// 检测是否为window对象
function isWindow(obj){
    return obj != null && obj === obj.window;
}

//检测是否为数组(因为涉及到了类数组，所以需要此检测)
function isArrayLike(obj){
    var length = !!obj && "length" in obj && obj.length;
    var typeRes = type(obj);//检测数据的类型

    //排除掉函数和window对象
    if(typeRes === 'function' || isWindow(obj)){
        return false;
    }

    /**
     * 1,如果是数组，则返回true
     * 2,如果不是数组，但是同时长度为0的伪数组，则返回true
     * 3,如果有长度属性并且长度属性为number，同时长度属性的值大于0，
     * 并且对象中存在这个长度属性-1的key的值。
     * （简单来说就是一个索引值正常的伪数组），则返回true
     */
    return typeRes === 'array' || length === 0 || 
        typeof length === "number" && length > 0 && (length - 1) in obj;
}
// 第一版本
function each(obj,callback){
    var length,i=0;
    if(isArrayLike(obj)){
        length = obj.length;
        for(;i<length;i++){
            callback(i,obj[i]);
        }
    }else{
        for(i in obj){
            callback(i,obj[i]);
        }
    }

    return obj;
}


