// 冒泡排序
let arr = [5,4,2,1,8,6,5,4,3]
let val = null
for(let i=0; i<arr.length-1; i++){//轮数
    for(let j=0; j<arr.length-1-i; j++){//次数
        if(arr[j] > arr[j+1]){
            val = arr[j]
            arr[j] = arr[j+1]
            arr[j+1] = val
        }
    }
}
console.log(arr)