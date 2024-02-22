<template>
  <div class="header">
    <div class="topHeader py-2 d-flex justify-content-between">
      <!--左边部分开始-->
      <div class="d-flex" style="width:500px">
        <img src="tu/1.png" class="mr-2 " />
        <div id="text" class="d-flex mt-1">
          <h3 @click="setTitleName" style="cursor: pointer;">{{ title }}</h3>
          <p></p>
          <h3>商城</h3>
        </div>
      </div>
      <!--左边部分结束-->
      <div id="right" class="d-flex mx-3">
        <input
          @focus="show"
          data-show="yes"
          v-model="input"
          placeholder="H16真无线"
        />
        <div>
          <img src="tu/2.png" style="width:80%" class="mt-2" />
        </div>
        <div class="d-flex">
          <img v-if="this.state == 1" class="ml-3" :src="avatar" />
          <router-link to="/login" v-else class="mx-3 log">登录</router-link>
          <p></p>
          <span></span>
          <ul>
            <li v-show="this.state == 1">我的订单</li>
            <li v-show="this.state == 0">手机号登录</li>
            <li v-show="this.state == 1">我的优惠券1张</li>
            <li v-show="this.state == 0">微信登录</li>
            <li v-show="this.state == 1">我的收货地址</li>
            <li v-show="this.state == 0">QQ登录</li>
            <li v-show="this.state == 1">网易云音乐首页</li>
            <li v-show="this.state == 0">新浪微博登录</li>
            <li v-show="this.state == 1" @click="change(0)">退出</li>
            <li v-show="this.state == 0">
              网易邮箱账号登录
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ul id="show" :style="isshow">
      <li data-show="yes">热门推荐</li>
      <li data-show="yes" v-for="(t, i) of message" :key="i">
        <router-link @click.native="yy" :to="`/details/${t.wid}`">
          <span>{{ t.text }}</span>
        </router-link>
      </li>
      <li data-show="yes" v-show="message.length < 1">
        <router-link @click.native="yy" to="/details/1">
          <span
            >i19蓝牙5.0真无线耳机 光感入耳 记忆配对 无线充电 苹果安卓通用</span
          >
        </router-link>
      </li>
      <li data-show="yes" v-show="message.length < 2">
        <router-link @click.native="yy" to="/details/4">
          <span
            >漫步者（EDIFIER）MINI-BUDS
            真无线蓝牙5.0小巧入耳式手机音乐通话耳机</span
          >
        </router-link>
      </li>
      <li data-show="yes" v-show="message.length < 3">
        <router-link @click.native="yy" to="/details/35">
          <span>小黄鸭/B.Duck 正版授权联名款 K3真无线TWS蓝牙耳机入耳式</span>
        </router-link>
      </li>
      <li data-show="yes" v-show="message.length < 4">
        <router-link @click.native="yy" to="/details/33">
          <span
            >联想击音TWS01【双耳磁吸】晨鼓真无线 专业Hifi音效低功耗蓝牙
            半入耳式通话跑步运动降噪</span
          >
        </router-link>
      </li>
      <li data-show="yes" v-show="message.length < 5">
        <router-link @click.native="yy" to="/details/52">
          <span>银魂官方正版授权真选组定春钱包</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapMutations, mapState, mapActions } from "vuex"
export default {
  data() {
    return {
      isshow: { display: "none" },
      state: "",
      update: "",
      avatar: "",
      input: "",
      message: [],
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
      }, {
          date: '2016-05-04',
          name: '王中虎',
          address: '上海市普陀区金沙江路 1517 弄'
      }, {
          date: '2016-05-01',
          name: '王大虎',
          address: '上海市普陀区金沙江路 1519 弄'
      }, {
          date: '2016-05-03',
          name: '王狂虎',
          address: '上海市普陀区金沙江路 1516 弄'
      }]
    };
  },
  watch: {
    input() {
      this.axios.get("/index").then((res) => {
        if (this.input.trim() !== "") {
          this.message = [];
          let mes = res.data.filter((item) => {
            if (item.text !== undefined) {
              return item.text.indexOf(this.input.trim()) !== -1;
            }
          });
          this.message = mes.slice(0, 5);
        }
      });
      console.log(this.message);
    },
  },
  computed:{
      ...mapState(["title"])
  },
  mounted() {
    window.addEventListener("click", (e) => {
      if (e.target.dataset.show !== "yes") {
        this.isshow = { display: "none" };
      }
    });
    this.avatar = localStorage.getItem("avatar");
    this.axios.get("/store").then((result) => {
      this.update = result.data.reduce((tot, item) => {
        return tot + item.value;
      }, 0);
    });
  },
  methods: {
    ...mapMutations(["setTitle"]),
    ...mapActions(["aSetTitle"]),
    setTitleName(){
        if(this.title === "网易云音乐"){
            this.aSetTitle("标题")
        }else{
            this.aSetTitle("网易云音乐")
        }
    },
    yy() {
      setTimeout(()=>{
       this.$router.go(0);
      },500)
    },
    loadComments() {
      var list = localStorage.getItem("state");
      this.state = list;
    },
    show() {
      this.isshow = { display: "block" };
    },
    change(n) {
      this.$store.commit("updateState", n);
      this.$router.go(0);
      let url = this.$route.fullPath;
      if (url == "/store") {
        this.$router.push("/");
        this.$router.go(0);
      }
    },
  },
  created() {
    this.loadComments();
  },
};
</script>
<style>
.header {
  width: 79%;
  margin: 0 auto;
  position: relative;
}
.header #text p {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #f00;
  margin: 13px 12px;
}
.header #right > input {
  height: 30px;
  width: 300px;
  outline: none;
  border-radius: 15px;
  padding-left: 15px;
  margin-top: 8px;
  border: 1px solid #e8e8e8;
  margin-right: 30px;
}
.header #right > div:nth-child(2) {
  transform: translateY(-5px);
}
.header #right > div:nth-child(3) > h5 {
  cursor: pointer;
  transform: translateY(10px);
}
.header #right > div:nth-child(3) > img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 3px 5px;
  cursor: pointer;
}
.header #right > div:nth-child(3) > p {
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: black;
  transform: translate(5px, 18px);
  cursor: pointer;
  transition: transform 1s;
}
.header #right > div:nth-child(3):hover p {
  border-top-color: transparent;
  border-bottom-color: black;
  transform: translate(5px, 7px);
}
.header #show {
  background-color: #fff !important;
  list-style: none;
  border: 1px solid #666;
  width: 300px;
  padding: 0;
  border-radius: 7px;
  position: absolute;
  right: 200px;
  top: 53px;
  z-index: 20;
}
.header #show span {
  display: block;
  width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #999;
}
.header #show a {
  text-decoration: none;
}
.header #show > li:first-child {
  border-bottom: 1px solid #000;
  color: #000;
}
.header #show li {
  color: #666;
  height: 30px;
  padding-left: 15px;
  line-height: 30px;
  cursor: pointer;
}
.header #show li:not(:first-child):hover {
  background-color: #e8e8e8;
}
.header #show li a {
  color: #f00;
}
.header #right > div:last-child > ul {
  width: 164px;
  position: absolute;
  z-index: 20;
  right: -44px;
  top: 56px;
  border: 1px solid #000;
  list-style: none;
  background-color: #fff;
  padding: 0;
  font-size: 12px;
  display: none;
}
.header #right > div:last-child > ul:last-child > li {
  padding: 5px 20px;
  cursor: pointer;
}
.header #right > div:last-child > ul:last-child > li:hover {
  background-color: #e8e8e8;
}
.header #right > div:last-child:hover ul {
  display: block;
}
.header #right > div > span {
  width: 85px;
  height: 10px;
  background-color: #fff;
  position: absolute;
  top: 51px;
  right: 0;
}
.header .log {
  color: #000;
  font-size: 1.7rem;
  text-decoration: none;
}
</style>
