
function gouzao(name,age){
    this.name = name,
    this.age = age
}
gouzao.prototype.jieshao = function(){
    console.log(`我的名字叫${this.name},我今年${this.age}岁了`)
}
 
// let ming = new gouzao('小明',19)
// let hong = new gouzao('小红',20)

function shouNew(fn,...args){
    // 1创建一个新对象
    let obj = {}
    // 2新创建的对象原型指向构造函数原型
    obj.__proto__ = fn.prototype
    // 3替换构造函数中的this为创建的新对象，并执行构造函数中的代码
    fn.apply(obj,args)
    // 4返回创建的对象
    return obj
}

let ming = shouNew(gouzao,'小明',19)
let hong = shouNew(gouzao,'小红',20)

console.log(ming);
ming.jieshao()
console.log(hong);
hong.jieshao()