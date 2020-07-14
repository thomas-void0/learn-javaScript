/*
 * @Author: your name
 * @Date: 2020-07-13 20:01:05
 * @LastEditTime: 2020-07-14 16:13:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \_webpack-based:\code\learn-javaScript\splice的实现\splice.ts
 */ 
Array.prototype.splice = function(
    start:number,
    deleteCount?:number | undefined
):any[]{
    const argumentsLen = arguments.length; //得到传入的参数长度
    const array = Object(this); //得到调用splice方法的数组
    const len = array.length; //得到调用splice方法的数组的长度
    const deleteArr = new Array(deleteCount); //创建一个存储删除元素的数组
    const addElements = Array.prototype.slice.call(arguments,2); //获取到需要添加的元素

    // 拷贝删除的元素
    sliceDeleteElements(
        array,
        start,
        deleteCount,
        deleteArr
    )

    //对元素进行位移操作
    if(addElements.length > 0 && deleteCount){
        movePostElements(
            array,
            start,
            len,
            deleteCount,
            addElements
        )        
    }

    // 对源数组进行替换操作
    for(let i = 0;i<addElements.length;i++){
        array[start + i] = addElements[i];
    }

    return deleteArr //返回被删除的项目
}

// 让deleteArr数组中存储需要被删除的元素
function sliceDeleteElements(
    array:any[],
    start:number,
    deleteCount:number | undefined,
    deleteArr:any[]
):void{
    if(deleteCount){
        for(let i = 0;i<deleteCount;i++){
            let index = start + i;
            if(index in array){
                //获取被删除的元素
                let current = array[index]; 
                // 将被删除的元素添加到存储数组中
                deleteArr[i] = current;
            }
        }
    }else{
        for(let i = 0;i<array.length - start;i++){
            let index = start + i;
            if(index in array){
                deleteArr[i] = array[index];
            }
        }
    }
}

// 对数组元素进行位移操作
function movePostElements(
    array:any[],
    start:number,
    len:number,
    deleteCount:number,
    addElements:any[]
):void{
    const addLen = addElements.length;

    // 1，删除数量和替换数量一致,就不需要进行位移操作，直接赋值即可
    if(deleteCount === addLen) return;

    // 2，删除数量大于替换数量
    if(deleteCount > addLen){
        // 从被删除的最后一个元素开始遍历
        for(let i = start + deleteCount;i<len;i++){
            // 得到要被移动的元素的索引值
            let fromIndex = i; 
            // 要被移动到的新位置的索引值
            let toIndex = i - (deleteCount - addLen);
            // 将原本位置上的元素进行覆盖
            if(fromIndex in array){
                array[toIndex] = array[fromIndex];
            }else{
                delete array[toIndex];
            }
        }   

        // 去除掉多余长度的元素，目前应该的长度是 len + addLen - deleteCount,
        // 把超过这个长度的数组元素都去除掉
        for(let i = len - 1;i >= len + addLen - deleteCount;i--){
            delete array[i];
        }
    }

    // 3，删除数量小于替换数量
    if(deleteCount < addLen){
        // 如果删除的元素少于添加的元素，那么后面的元素向后移动addLen - deleteCount位
        // 遍历需要被位移的元素
        for(let i = len - 1;i >= start + deleteCount;i--){
            // 需要被往后挪动的元素位置索引
            let fromIndex = i;
            // 需要被挪动到的位置，这里是倒序的。
            let toIndex = i + (addLen - deleteCount); 
            if(fromIndex in array){
                array[toIndex] = array[fromIndex];
            }else{
                delete array[toIndex]
            }
        }

    }


}

// 边界情况处理

//对start索引值的处理
function computeStartIndex(start:number,len:number){
    // 处理索引负数的情况,从反方向取索引值
    if(start < 0){
        return start + len > 0 ? start + len : 0;
    }
    // 如果大于数组长度情况下
    return start >= len ? len : start;
}

//对deleteCount删除个数的处理
function computeDeleteCount(
    start:number,
    len:number,
    deleteCount:number,
    argumentsLen:number
):number{
    //如果删除数目没有传，那么默认删除后面的
    if(argumentsLen === 1){
        return len - start;
    }

    //删除数目过小
    if(argumentsLen < 0){
        return 0;
    }

    //删除数目过大
    if(deleteCount > len - start){
        return len - start;
    }

    return deleteCount;
}