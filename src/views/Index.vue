<template>
    <div id="bod">
      <head></head>
      <div class="carousel text-center" data-ride="carousel">
        <Lunbo></Lunbo>
        <!--ul小LOGO导航区域开始-->
        <ul id="a1" class="text-center">
          <li>
            <router-link to="/column" style="text-decoration: none;">
            <img :src="others[0].imgs.img1" />
            <span
              ><a style="text-decoration: none; color: #000" href="#"
                >{{others[0].imgs.img1text}}</a
              ></span
            >
            </router-link>
          </li>
          <li>
            <router-link style="text-decoration: none;" to="/variouskind">
              <img :src="others[0].imgs.img2" />
              <span
                ><a style="text-decoration: none; color: #000" href="#"
                  >{{others[0].imgs.img2text}}</a
                ></span
              >
            </router-link>
          </li>
          <li>
            <router-link style="text-decoration: none; " to="/Variouskind2">
            <img :src="others[0].imgs.img3" />
            <span
              ><a style="text-decoration: none; color: #000" href="#"
                >{{others[0].imgs.img3text}}</a
              ></span
            >
            </router-link>
          </li>
          <li>
            <router-link to="/credit" style="display: flex; justify-content: center;text-decoration: none;">
              <img :src="others[0].imgs.img4" />
              <div style="font-size: 13px; margin-top: 4px; margin-left: 7px">
                <a style="text-decoration: none; color: #000" href="#">{{others[0].imgs.img4text.top}}</a
                ><br />
                <a style="text-decoration: none; color: #f00" href="#">{{others[0].imgs.img4text.bot}}</a
                ><br />
              </div>
            </router-link>
          </li>
        </ul>
        <!--ul小LOGO导航区域结束-->
      </div>
      <!--上册销售商品区域开始区域开始-->
      <div id="b1" style="width: 80%">
        <!--中间两个块级图片导航开始-->
        <div id="b2" style="width: 100%; margin-top: 50px">
          <router-link to="/column" style="width: 49%">
            <a href="#"><img :src="others[0].others.img1" class="w-100" /></a>
          </router-link>
          <router-link to="/colright" style="width: 49%">
            <a href="#"><img :src="others[0].others.img2" class="w-100" /></a>
          </router-link>
        </div>
        <!--中间两个块级图片导航结束-->
        <!--销售商品开始-->
        <div id="b3" class="mt-5">
          <h3 style="font-weight: bold" class="mb-3">{{others[0].others.text1}}</h3>
          <div class="text-center dafangge" style="font-size: 16px">
            <div class="fangge" v-for="p of shop" :key="p.wid">
              <router-link :to="`/details/${p.wid}`"><img :src="p.wimg" /></router-link>
              <div class="p-2">
                <span class="xiaokuang" v-show="p.xk !== ''">{{ p.xk }}</span>
                <span
                  ><router-link to="/details">{{ p.text }}</router-link></span>
                <p style="color: #f00">￥{{ p.jg }}</p>
                <div class="dazhe" v-show="p.tejia.yuanjia !== undefined">
                  <p>￥{{ p.tejia.xianjia }}</p>
                  <p>￥{{ p.tejia.yuanjia }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--销售商品结束-->
      </div>
      <!--上册销售商品区域开始区域结束-->
      <!--中层小型碟片区域开始-->
      <router-link to="/Album" target="_blank" id="c1" class="py-3 px-4 my-5 album">
        <!--左侧区域开始-->
        <div class="w-50">
          <img :src="others[0].others.middle.limg" />
          <span>{{others[0].others.middle.text1}}</span>
          <p class="small text-muted">{{others[0].others.middle.text2}}</p>
          <!--<p>-->
          <h5 class="font-weight-bold">{{others[0].others.middle.text3}}</h5>
          <!--</p>-->
        </div>
        <!--左侧区域结束-->
        <!--右侧区域开始-->
        <div id="c2" class="w-25">
          <img :src="others[0].others.middle.rimg1" style="width: 90px; height: 90px" />
          <div>
            <img :src="others[0].others.middle.rimg2" style="width: 112px; height: 112px" />
            <img :src="others[0].others.middle.rimg3" style="width: 30px; height: 108px" />
          </div>
        </div>
        <!--右侧区域结束-->
      </router-link>
      <!--中层小型碟片区域结束-->
      <div id="d1">
        <h3 style="font-weight: bold" class="mb-3">{{others[0].others.text2}}</h3>
        <div class="text-center dafangge" style="font-size: 16px">
          <div class="fangge" v-for="p of shop2" :key="p.wid">
            <a href="javascript:;"><img :src="p.wimg" /></a>
            <div class="p-2">
              <span class="xiaokuang" v-show="p.xk !== ''">{{ p.xk }}</span>
              <span
                ><a href="#">{{ p.text }}</a></span
              >
              <p style="color: #f00">￥{{ p.jg }}</p>
              <div class="dazhe" v-show="p.tejia.yuanjia !== undefined">
                <p>￥{{ p.tejia.xianjia }}</p>
                <p>￥{{ p.tejia.yuanjia }}</p>
              </div>
            </div>
          </div>
        </div>
      </div> 
      <foot ref="myfoot"></foot>
    </div>
  </template>
  <script>
  import Lunbo from '../components/lunbo'
  export default {
    data() {
      return {
        shop: [],
        shop2: [],
        others:[
          {"imgs":{"img4text":{
            "top":"",
            "bot":""}
            },
           "others":{
             img1:"",
             middle:{"limg":""}
           }
        }]
      };
    },
    mounted() {
      
    window.addEventListener("scroll",this.$refs.myfoot.handleScroll)
      this.request.get("/index").then((result) => {
        this.shop = result.data.slice(0, 8);
        this.shop2 = result.data.slice(8,32);
        this.others = result.data.slice(-1)
        console.log(this.others)
      });
    },
    components:{Lunbo}
  };
  </script>
  <style scoped>
  @import '../assets/lunbo.css';
  .album{
    color: #999;
    text-decoration: none;
  }
  #bod {
    max-width: 100%;
    min-width: 1300px !important;
  }
  #head {
    width: 100%;
  }
  body {
    background-color: #fff !important;
  }
  #a1 {
    list-style: none;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
  }
  #a1 li {
    width: 257px;
  }
  #a1 > li + li {
    border-left: 1px solid #ccc;
  }
  #b1 {
    width: 1100px;
    margin: 0 auto;
  }
  #b2 {
    display: flex;
    justify-content: space-between;
  }
  .dafangge {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .dafangge a {
    color: #000;
  }
  .dafangge > div {
    width: 20%;
  }
  .dafangge img {
    background-color: rgb(249, 249, 249);
    margin-bottom: 5px;
    width: 100%;
  }
  #c1 {
    display: flex;
    justify-content: space-between;
    background-color: rgb(249, 249, 249);
    width: 80%;
    margin: 0 auto;
    text-decoration: none;
    color: #000;
    margin-bottom: 130px !important;
    margin-top: 100px !important;
  }
  #c1 span {
    font-weight: bold;
    font-size: 2rem;
  }
  #c1 > div:first-child img {
    width: 9%;
    margin-bottom: 12px;
  }
  #c2 {
    display: flex;
    position: relative;
  }
  #c2 > img {
    width: 100px;
    height: 100px;
    margin-top: 20px;
  }
  #c2 > div {
    position: absolute;
    top: 9px;
    left: 47px;
    width: 100%;
  }
  #d1 {
    width: 80%;
    margin: 0 auto;
  }
  
  .xiaokuang {
    border: 1px solid #f00;
    color: #f00;
    font-size: 13px;
  }
  .yuanjia {
    width: 70px;
    height: 70px;
    background-color: #f00;
    border-radius: 50%;
    top: 20px;
    left: 20px;
  }
  .w-53 {
    width: 53px;
  }
  .fangge {
    position: relative;
    width: 24% !important;
  }
  .dazhe {
    top: 10px;
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: rgb(211, 58, 49);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .dazhe > p:first-child {
    margin-bottom: 0;
    margin-top: 12px;
    color: #fff;
  }
  .dazhe > p:last-child {
    color: #e8e8e8;
    text-decoration: line-through;
  }
  </style>