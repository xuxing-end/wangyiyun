<template>
  <div id="header" class="album">
    <!--上半部分专辑销售区域开始-->
    <div>
      <h3 class="mb-3">{{header.top}}</h3>
      <div class="d-flex  justify-content-between text-center flex-wrap">
        <div id="over" v-for="(t,i) of albumBottom" :key="i">
          <img :src="t.aimg">
          <img src="AlbumImg/9.png" alt="">
          <p>{{t.text1}}</p>
          <span>{{t.text2}}</span>
          <p>{{t.price}}</p>
        </div>
      </div>
    </div>
    <!--上半部分专辑销售区域结束-->
    <!--下半部分一层楼开始-->
    <div id="bottom" class="d-flex justify-content-between">
      <!--固定部分一层楼左边开始-->
      <ul class="list-unstyled d-flex">
        <li style="cursor: pointer;"  class="mx-2" v-for="(t,i) of fixedTop.left" :key="i" :style="index==i ? yes :no" @click="yseCoat(i)">
          {{t}}
        </li>
      </ul>
      <!--固定部分一层楼左边结束-->
      <!--固定部分一层楼右边开始-->
      <div class="d-flex">
        <!--右边可点击部分开始-->
        <ul class="d-flex list-unstyled">
          <li class="mx-2" v-for="(t,i) of fixedTop.right" :key="i">{{t}}</li>
        </ul>
        <!--右边可点击部分结束-->
        <!--右边规则部分开始-->
        <div style="cursor: pointer;"  @mouseenter="rule" @mouseleave="updaterule" class="d-flex position-relative">
          <div><img :src="fixedTop.others.img" ></div>
          <span>{{fixedTop.others.text}}</span>
          <!--规则部分hove隐藏部分开始-->
          <div id="rule" :style="ruleState" class=" position-absolute list-unstyled pl-3">
            <div class="py-2" v-for="(t,i) of fixedTop.others.hover" :key="i">{{t}}</div>
          </div>
          <!--规则部分hove隐藏部分结束-->
        </div>
        <!--右边规则部分结束-->
      </div>
    </div>
    <!--固定部分一层楼右边结束-->
    <!--下半部分一层楼结束-->
    <!--固定部分二层楼开始-->
      <div id="fixedBottom">
        <!--固定部分二层楼左边开始-->
        <ul class="list-unstyled d-flex justify-content-around">
          <li v-for="(t,i) of fixedBottom.left" :key="i">{{t}}</li>
        </ul>
        <!--固定部分二层楼左边结束-->
        <!--固定部分二层楼右边开始-->
        <ul class="list-unstyled d-flex justify-content-around">
          <li v-for="(t,i) of fixedBottom.right" :key="i">{{t}}</li>
        </ul>
        <!--固定部分二层楼右边结束-->
      <!--固定部分二层楼结束-->
      </div>
    <!--固定部分二层楼结束-->
    <!--活动跳转区域开始-->
    <div v-if="iscoat" id="headCoat">
      <router-link :to="`/discdetails/${t.id}`" id="coat" v-for="(t,index) of coat" :key="index" class="d-flex py-2 justify-content-between">
        <div class="d-flex">
          <div id="coatLeft" class="d-flex mr-5">
            <div class="mr-3">
              <p v-show="t==index+1" :style="t<4 ? red :nored" v-for="(t,i) of coat.length" :key="i"> {{t}}
              </p>
              <p>{{t.heat}}</p>
            </div>
            <div>
              <img :src="t.img">
              <img src="AlbumImg/23.png">
            </div>
          </div>
          <p>{{t.text1}}</p>
        </div>
        <div  class="d-flex w-50 justify-content-between">
          <p>{{t.text2}}</p>
          <p class=" text-muted">{{t.text3}}</p>
        </div>
      </router-link>
    </div>
    <!--活动跳转区域结束-->
    <!--活动跳转区域开始-->
    <div v-else id="headCoat">
      <div id="coat" v-for="(t,index) of coat2" :key="index" class="d-flex py-2 justify-content-between">
        <div class="d-flex">
          <div id="coatLeft" class="d-flex mr-5">
            <div class="mr-3">
              <p v-show="t==index+1" :style="t<4 ? red :nored" v-for="(t,i) of coat2.length" :key="i">{{t}}</p>
              <p>{{t.heat}}</p>
            </div>
            <div>
              <img :src="t.img">
              <img src="AlbumImg/23.png">
            </div>
          </div>
          <p>{{t.text1}}</p>
        </div>
        <div  class="d-flex w-50 justify-content-between">
          <p>{{t.text2}}</p>
          <p class=" text-muted">{{t.text3}}</p>
        </div>
      </div>
    </div>
    <!--活动跳转区域结束-->
  </div>
</template>
<script>
export default {
  data(){
    return{
      //用来接收销售专辑部分数组
      header:{},
      //只接专辑唱片，进行解构
      albumBottom:[],
      //准备接受下边固定部分的上边数据
      fixedTop:{"others":{"img":""}},
      //准备接受下边固定部分的下边数据
      fixedBottom:{},
      //用于保存规则区域显示隐藏状态
      ruleState:{"display":"none"},
      //准备接收碟片跳转区域部分数据1
      coat:[],
      //准备接收碟片跳转区域部分数据2
      coat2:[],
      //碟片跳转区域的开头顺序号前三个给红色
      red:{"color":"red"},
      //碟片跳转区域的开头顺序号前三个给黑色
      nored:{"color":"#000"},
      //专辑与单曲之间切换
      iscoat:true,
      //专辑与单曲标题之间样式选中状态
      index:0,
      yes:{"font-weight": "bold","color":"#000","font-size": "22px","transform":" translateY(-9px)"},
      no:{}
    }
  },
  methods:{
    //鼠标进入事件
    rule(){
      this.ruleState={"display": "block"}
    },
    //鼠标移出事件
    updaterule(){
      this.ruleState={"display":"none"}
    },
    //专辑与单曲之间切换
    yseCoat(i){
      if(i==1){
        this.index=1
      }else{
        this.index=0
      }
      if(i==1){
        this.iscoat=false
      }else{
        this.iscoat=true
      }
    }
  },
  mounted(){
    this.axios.get("/album").then(result=>{
      //接收销售专辑部分数组
      this.header=result.data.head
      //只接专辑唱片，进行解构
      this.albumBottom=this.header.bottom
      //准备接受下边固定部分的上边数据
      this.fixedTop=result.data.bottom.fixed.top
      //准备接受下边固定部分的下边数据
      this.fixedBottom=result.data.bottom.fixed.bottom
      //准备接收碟片跳转区域部分数据
      let coat=result.data.bottom.coat
      this.coat=coat.sort((a,b)=>b.text3-a.text3)
      //准备接收碟片跳转区域部分数据
      let coat2=result.data.bottom.coat2
      this.coat2=coat2.sort((a,b)=>b.text3-a.text3)
    })
  }
}
</script>
<style>
 #header{
   background-color:#fff;
   border-top: 1px solid #e8e8e8;
 }
 .album>div:first-child{
   padding-top:50px;
   width: 77%;
   margin: 0 auto;
 }
 .album #over{
   width: 21%;
   margin-bottom: 40px;
 }
 .album #over p{
   margin: 0;
 }
 .album #over span{
   color: #666;
   font-size: 15px;
  }
 .album #over p:last-child{
   color: red;
 }
 .album #bottom{
   color: #9FA19F;
   width: 77%;
   margin: 0 auto;
   font-size: 18px;
 }
 .album #bottom>ul:first-child{
  width:50%;
 }
 .album #bottom>ul:first-child li{
  width:19%;
  margin:0
 }
 .album #bottom ul li{
   cursor: pointer;
 }
 .album #bottom ul li+li::before{
   content: "";
   margin-right: 10px;
 }
 .album #bottom>div:nth-child(2) span{
   font-size:13px;
   margin-top:5px;
 }
 .album #rule{
   background-color: #fff;
   width:1250px;
   left: -1160px;
   top: 50px;
   font-size: 12px;
   border: 1px solid #e8e8e8;
   box-shadow: 0px 0px 10px 2px #999;
   cursor: pointer;
 }
 .album #fixedBottom{
   width: 77%;
   margin: 0 auto;
   display: flex;
   font-size: 18px;
   color: #9FA19F;
   justify-content: space-between;
   padding: 0 10px;
   background-color: #F4F4F4;
   box-shadow: 0 0 0 0 #000;
 }
 .album #fixedBottom ul{
   width:40%;
   margin: 0;
   padding: 8px 0;
 }
  .album>div:last-child{
    width: 77%;
    margin: 0 auto;
  }
  .album #headCoat{
    border: 1px solid #e8e8e8;
  }
  .album #coat{
    text-decoration: none;
  }
  .album #coat:hover{
    cursor: pointer;
    background-color: #F7F7F7;
  }
  .album #coat>div:last-child{
    padding-right: 110px;
    width:32% !important;
  }
  .album #coat>div{
    align-items: center;
  }
  .album #coat>div:first-child>p:last-child{
    color: #000;
  }
  .album #coat>div:last-child>p{
    color: #000;
  }
  .album #coatLeft{
    margin-right: 96px !important;
  }
  .album #coatLeft>div:first-child{
    margin-top: 28px;
    font-size: 18px;
  }
  .album #coatLeft>div:first-child>p:last-child{
    font-size: 12px;
    color: #999;
  }
  .album #coatLeft p{
    margin: 0;
  }
  .album #coat>div:first-child{
    width: 50%;
    padding-left: 50px;
  }
</style>