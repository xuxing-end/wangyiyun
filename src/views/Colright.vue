<template>
<div class="column">
  <!--顶部分割线-->
  <hr/>
  <!--页面开始-->
  <!--顶部照片开始-->
  <div class="columnHead mt-5">
    <div style="text-align: center;" class="mb-5"><img :src="colright.head.img" class="w-100"></div>
  <!--顶部照片结束-->
  <!--主体循环部分开始-->
  <div id="home">
    <!--用于准备循环部分branch分支-->
    <div class="mb-5" v-for="(t,i) of home" :key="i" style="width:23%">
        <!--图片部分-->
        <router-link :to="`/details/${t.wid}`"><img style="width:100%" :src="t.wimg"></router-link>
        <!--文字简介部分-->
        <div id="xk" class="px-4 mt-2">
          <span v-show="t.xk!=''">{{t.xk}}</span>
          <router-link style="color:#000" :to="`/details/${t.wid}`">{{t.text}}</router-link>
        </div>
        <!--价格部分-->
        <p>￥{{t.jg}}</p>
        <!--卖光了-->
        <router-link  v-show="t.count!=undefined" :to="`/details/${t.wid}`" id="No">
          卖光了
        </router-link>
        <!--原价现价部分-->
        <div v-show="t.tejia.xianjia!==undefined">
          <p class="m-0">￥{{t.tejia.xianjia}}</p>
          <p class="m-0">￥{{t.tejia.yuanjia}}</p>
        </div>
    </div>
  </div>
  <!--主体循环部分结束-->
  </div>
  <foot></foot>
  <!--页面结束-->
</div>
</template>
<script>
export default {
  data(){
    return{
      colright:{head:{img:""}},
      home:[]
    }
  },
  mounted(){
    this.axios.get('/colright').then(result=>{
      this.colright=result.data
      this.home=this.colright.home
    })
  }
}
</script>
<style scoped>
.columnHead{
  width:77%;
  margin: 0 auto;
}
.columnHead #home{
  display: flex;
  justify-content: space-between;
  text-align: center;
  flex-wrap: wrap;
}
.columnHead #home>div{
  position: relative;
}
.columnHead #home>div>a>img:first-child{
  background-color: #e8e8e8;
}
.columnHead #home>div>p:nth-child(3){
  color: red;
}
.columnHead #home>div>div:last-child{
  width: 50px;
  height: 50px;
  background-color: red;
  border-radius: 50%;
  color: #fff;
  position: absolute;
  top: 15px;
  left:0px;
}
.columnHead #home>div>div:last-child>p:last-child{
  text-decoration: line-through;
  color: #e8e8e8;
}
.columnHead #xk{
  max-height: 50px;
  overflow: hidden;
}
.columnHead #xk>span:first-child{
  color:red;
  border: 1px solid red;
  font-size: 12px;
  box-sizing: border-box;
}
.columnHead #No{
  position: absolute;
  color: #fff;
  background-color: #000;
  width: 130px;
  height:130px;
  font-size: 20px;
  opacity: .8;
  line-height: 130px;
  text-align: center;
  border-radius:50% ;
  top: 23%;
  left: 35%;
text-decoration: none;
}
</style>