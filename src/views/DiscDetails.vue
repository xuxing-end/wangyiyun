<template>
<div>
  <div class="disc">
    <hr />
    <!--顶部首页分享区域开始-->
    <ul id="aa1">
      <li>
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li>&gt;</li>
          <li>{{page.head}}</li>
        </ul>
      </li>
      <li><img src="tu/56.png" alt="" /><a href="javascript:;">分享</a></li>
    </ul>
    <!--顶部首页分享区域结束-->
    <!--详情主页部分开始-->
    <div class="d-flex my-3">
      <!--左边图片开始-->
      <div><img :src="page.topleftimg"></div>
      <!--左边图片结束-->
      <!--右边小详情开始-->
      <div id="right" class="ml-5 pl-5">
        <!--片名-->
        <h3 class="mb-3">{{page.topright.text1}}</h3>
        <!--作者名字-->
        <router-link to="javascript:;" class="mb-3 d-block">{{page.topright.text2}}</router-link>
        <!--价格-->
        <h2>¥{{price}}</h2>
        <!--数量增加开始-->
        <div id="count" class="w-100 d-flex">
          <p class="mr-3">数量</p>
          <div>
            <button @click="regulation(-1)" :disabled="count<2">-</button>
            <input v-model="count">
            <button @click="regulation(+1)" :disabled="String(count).length==4">+</button>
          </div>
          <div>已售出：229549张</div>
        </div>
        <!--数量增加结束-->
        <!--购买环节 buy购买-->
        <button id="buy">立即支持</button>
      </div>
      <!--右边小详情结束-->
    </div>
    <!--详情主页部分结束-->
    <!--下边具体详情页开始-->
    <div class="row no-gutters mt-5 justify-content-between">
      <!--左边开始-->
      <div id="detailsLeft" class="col-7">
        <ul class="d-flex  justify-content-between list-unstyled position-relative">
          <li class=" font-weight-bold">数字专辑详情</li>
          <li style="cursor: pointer;" @click="yesxuzhi" class="small text-muted">数字专辑购买须知</li>
          <li :style="xuzhi" class=" position-absolute">
            <div class="d-flex justify-content-between">
              <div class="text-muted">购买须知</div>
              <div @click="noxuzhi">×</div>
            </div>
            <ul class="list-unstyled">
              <li>1.数字专辑购买后，不支持退款、换货。</li>
              <li>2.因版权原因，数字专辑默认不支持海外用户购买。</li>
              <li>3.赠送给海外好友也无法保证好友可用该专辑。</li>
              <li>4.若购买5分钟后发现仍无法正常使用，可以尝试先重启下云音乐客户端。</li>
              <li @click="noxuzhi" class="my-4">知道了</li>
            </ul>
          </li>
        </ul>
        <div>
          <p class=" font-weight-bold">专辑介绍</p>
          <div :style="height" class="small text-muted mb-3">{{page.bottomleft.text1}}<br>{{page.bottomleft.text1}}
          </div>
          <!--carry执行-->
          <ul v-if="page.bottomleft.text1.length+page.bottomleft.text1.length>270" @click="carry" class="d-flex list-unstyled justify-content-center text-muted">
            <li>{{zk}}</li>
            <li v-html="r"></li>
          </ul>
        </div>
        <video style="outline: none;cursor: pointer;" controls width="680" height="380" src="http://vodkgeyttp8.vod.126.net/cloudmusic/mv/20171110050742/7c2c06d1-de2f-4998-b772-33d41fe09a51/0e1c162a166ff79409935f20ba511101.mp4?wsSecret=cb4c0547a2f318913372541bda60be62&wsTime=1612761205" poster="AlbumImg/25.jpg">
        </video>
        <ul class="d-flex list-unstyled position-relative">
          <li>歌曲列表</li>
          <li>i</li>
          <li class="px-2 py-2 position-absolute">购买单曲不参与粉丝榜</li>
        </ul>
        <div class="d-flex justify-content-between" v-for="(t,i) of list" :key="i" id="last">
          <p v-show="i==index" v-for="(t,index) of list.length" :key="index">{{t}}</p>
          <ul class="d-flex  justify-content-between list-unstyled">
            <li>{{t.text1}}</li>
            <li>{{t.text2}}</li>
          </ul>
        </div>
      </div>
      <!--左边结束-->
      <!--右边开始-->
      <div id="detailsRight" class="col-4">
        <ul class="list-unstyled">
          <li>今日畅销</li>
        </ul>
        <div v-for="(t,i) of bottomright" :key="i" class="d-flex">
          <router-link @click.native="refresh" :to="`/discdetails/${t.id}`"><img :src="t.img"></router-link>
          <div class="mt-3 ml-3">
            <router-link style="color:#000;margin-top:10px;display:block;" @click.native="refresh" :to="`/discdetails/${t.id}`">{{t.text1}}</router-link>
            <p>{{t.text2}}</p>
          </div>
        </div>
      </div>
      <!--右边结束-->
    </div>
    <!--下边具体详情页结束-->
    
  </div>
  <foot></foot>
</div>
</template>
<script>
import Foot from '../components/Foot.vue'
export default {
  components: { Foot },
  data(){
    return{
      //购买数量
      count:1,
      //专辑介绍高度
      height:{"height":100+"px"},
      zk:"展开全部",
      r:"&gt;",
      //购买需知
      xuzhi:{"display": "none"},
      //接受传递过来的参数
      page:{"topright":{"text1":""},"bottomleft":{"text1":""}},
      //接受歌曲列表
      list:[],
      //接受右边的转跳数据
      bottomright:[],
      //价格
      price:""
    }
  },
  watch:{
    count(){
      this.price=this.count*this.page.topright.text3
      var i=String(this.count).length
      if(this.count<1){
        this.count=1
      }
      if(i<0){
        this.count=1
      }else if(i>4){
        this.count=String(this.count).slice(0,4)
      } 
    }
  },
  methods:{
    refresh(){
      this.$router.go(0)
    },
    regulation(n){
       var count=Number(this.count) 
       count+=n
       this.count=count
      this.price=this.count*this.page.topright.text3 
    },
    yesxuzhi(){
      this.xuzhi={"display": ""}
    },
    noxuzhi(){
      this.xuzhi={"display": "none"}
    },
    carry(){
      if(this.zk=="展开全部"){
        this.height={"height":""}
        this.zk="收起"
        this.r="&lt;"
    console.log(this.height)
      }else{
        this.height={"height":100+"px"}
        this.zk="展开全部"
        this.r="&gt;"
      }
    }
  },
  mounted(){
    let id=this.$route.params.id
    console.log(id)
    this.axios.get(`/album`).then(result=>{
      this.page=result.data.bottom.coat[id-1].others
      console.log(this.page)
      this.list=this.page.bottomleft.list
      this.bottomright=this.page.bottomright
      this.price=this.page.topright.text3
    })
  }
}
</script>
<style scoped>
@import '../assets/disc.css'
</style>