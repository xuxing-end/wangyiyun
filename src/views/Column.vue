<template>
<div class="column">
  <!--顶部分割线-->
  <hr/>
  <!--页面开始-->
  <!--顶部照片开始-->
  <div class="columnHead mt-5">
    <div style="text-align: center;" class="mb-5"><img :src="column.head.img" class="w-100"></div>
  <!--顶部照片结束-->
  <!--主体循环部分开始-->
  <div id="home">
    <!--用于准备循环部分branch分支-->
    <div class="mb-5" v-for="(t,i) of home" :key="i" style="width:23%">
        <!--图片部分-->
        <router-link :to="`/details/${t.wid}`"><img style="width:100%" :src="t.wimg"></router-link>
        <!--文字简介部分-->
        <div id="xk" class="px-4 pt-2">
          <span v-show="t.xk!=''">{{t.xk}}</span>
          <router-link style="color:#000" :to="`/details/${t.wid}`">{{t.text}}</router-link>
        </div>
        <!--价格部分-->
        <p>￥{{t.jg}}</p>
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
import Foot from '../components/Foot.vue'
export default {
  components: { Foot },
  data(){
    return{
      //接住接口column下的所有数据
      column:{head:{img:""}},
      //接住cloumn下的主要部分home
      home:[]
    }
  },
  mounted(){
    this.axios.get("/column").then(result=>{
      this.column=result.data,
      console.log(this.column)
      this.home=this.column.home
    })
  }
}
</script>
<style>
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
  margin-left: 30px;
}
.columnHead #home>div>div:last-child>p:last-child{
  text-decoration: line-through;
  color: #e8e8e8;
}
.columnHead #xk{
  height: 50px;
  overflow: hidden;
}
.columnHead #xk>span:first-child{
  color:red;
  border: 1px solid red;
  font-size: 12px;
  box-sizing: border-box;
}
</style>