// 去重
let arr = [1,4,4,5,2,8,8,5,4,1,3,6,5,2,8]
let newArr = []
for(let key of arr){
    // 查看新数组里面是否有此值
    let state = newArr.indexOf(key)
    // 却没有进行末尾添加
    if(state === -1){
        newArr.push(key)
    }
}
console.log(newArr)
