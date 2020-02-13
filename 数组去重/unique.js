// 不使用的indexOf的方式。
function uniqueInit(array){
    const res=[];
    array.forEach(item=>{
        !res.some(rItem=>item===rItem) && res.push(item);
    })
    return res;
}
//利用indexOf的方式
function unique(array){
    const res = [];
    array.forEach(item=>{
        res.indexOf(item) === -1 && res.push(item)
    })
    return res;
}

//先排序，然后去重
function unique2(array){
    return [...array].sort((num1,num2)=>{
        if(num1 > num2){
            return 1
        }else if(num1 < num2){
            return -1
        }else{
            return 0
        }
    }).filter((item,index,newArray)=>item !== newArray[index+1]); 
}

// 使用object键值对
function unique3(array){
    var obj = {};
    return array.filter(item=>obj.hasOwnProperty(item) ? false : (obj[item]=true))
}
//优化
function unique4(array){
    var obj = {};
    return array.filter(item=>obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true))
}
var array = [1, 2, 1, 1, '1'];
console.log(unique4(array)); 
// ES6中的去重
const unique5 = array=>[...new Set(array)];
