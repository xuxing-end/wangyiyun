// 递归深拷贝
let oldObj = {
    name:"张三",
    age:18,
    aihao:["打游戏", "喝酒", "泡妹"],
    pengyou:{
        name:"小明"
    }
}

function deepClone(obj){
    // 如果没值或者类型不为对象直接返回
    if(typeof obj !== 'object' || obj === null){
        return obj
    }

    let cloneObj = null

    // 判断是否为数组进行默认值
    if(Array.isArray(obj)){
        cloneObj = []
    }else{
        cloneObj = {}
    }

    // 循环赋值
    for(let key in obj){
        // 只拷贝当前所有属性，不拷贝原型
        if(obj.hasOwnProperty(key)){
            cloneObj[key] = deepClone(obj[key])
        }
    }
    return cloneObj
}

let newObj = deepClone(oldObj)
newObj.name = "李四"
newObj.age = 22
newObj.aihao[0] = "读书"
newObj.aihao[1] = "看报"
newObj.aihao[0] = "看报"
newObj.pengyou.name = "小红"

console.log(oldObj)
console.log(newObj)