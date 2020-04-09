console.log(+0 === -0); //true
console.log(NaN === NaN); //false
console.log((+0).toString()); //'0'
console.log((-0).toString());//'0'

console.log(1/+0); //Infinity
console.log(1/-0); //-Infinity

// 对于正负零的判断
function eq(a,b){
    if(a === b) return a !== 0 || 1/a === 1/b;
    return false; //其他情况下return false
}

console.log(eq(0,0)); //true
console.log(eq(+0,-0)); //false