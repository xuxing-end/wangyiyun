<template>
  <div>
    <hr />
    <ul id="aa1">
      <li>
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li>&gt;</li>
          <li>{{ detail.head }}</li>
        </ul>
      </li>
      <li><img src="tu/56.png" alt="" /><a href="javascript:;">分享</a></li>
    </ul>
    <!--商品详情部分开始-->
    <div id="xiangqing" class="mb-5">
      <!--详情左边-->
      <div id="xqleft">
        <div style="width: 100%">
          <img
            class="w-100"
            v-for="(t, i) of imgs.big"
            :key="i"
            :src="t.img"
            :style="leftindex == i ? show : noshow"
          />
        </div>
        <div @mousemove="move" @mouseenter="jinru" @mouseleave="jinru"></div>
        <div :style="bgImg ? nohover : yeshover" id="hover"></div>
        <div>
          <div v-for="(t, i) of imgs.small" :key="i">
            <img
              :src="t.img"
              @click="imgevent(i)"
              :style="leftindex == i ? pricolor : nopricolor"
            />
          </div>
        </div>
      </div>
      <!--详情右边-->
      <div id="xqright">
        <div :style="bgImg ? 'display:none' : 'display:block'">
          <img
            :style="bgImg ? nobgImg : yesbgImg"
            :src="imgs.bgImg[leftindex].img"
          />
        </div>
        <h3 class="mb-3">{{ detright.text1 }}</h3>
        <p class="mb-4">{{ detright.text2 }}</p>
        <h2 class="mb-4">{{ price }}</h2>
        <div
          v-show="detright.zx.top.text1 != undefined"
          class="row no-gutters mt-4"
        >
          <div class="col-1 text-muted mt-2">促销:</div>
          <!--打折区域-->
          <div id="dazhe" class="col-11" style="position: relative">
            <!--打折显示区域-->
            <div id="youhuijuan" class="d-flex justify-content-between p-2">
              <div>
                <div class="small">{{ detright.zx.top.text1 }}</div>
                <span class="mx-2">{{ detright.zx.top.text2 }}</span>
                <a
                  href="javascript:;"
                  style="text-decoration: none"
                  @click="roll"
                  :style="rollcount == 0 ? { color: '#999' } : {}"
                  class="ml-2"
                  >领劵</a
                >
              </div>
              <div class="d-flex" v-if="detright.zx.bottom.length !== 0">
                全部优惠卷({{ detright.zx.bottom.length + 1 }})
                <p class="p-0 mx-2 m-0 font-weight-bold">&gt;</p>
              </div>
            </div>
            <!--优惠券被隐藏部分-->
            <div
              id="youhuijuan"
              class="col-12 p-2 youhuinone d-none"
              v-for="(t, i) of detright.zx.bottom"
              :key="i"
              :style="t.bottom"
            >
              <div>
                <div class="small">{{ t.text1 }}</div>
                <span class="mx-2 mx-1">{{ t.text2 }}</span>
                <a
                  href="javascript:;"
                  style="text-decoration: none"
                  @click="roll"
                  :style="rollcount == 0 ? { color: '#999' } : {}"
                  class="ml-2"
                  >领劵</a
                >
              </div>
            </div>
            <!--隐藏部分结束-->
          </div>
        </div>
        <!--版本选择部分-->
        <div class="row no-gutters mt-4 position-relative">
          <div v-show="detright.ys.length !== 0" class="col-1 text-muted mt-2">
            颜色:
          </div>
          <div id="xuanze" class="col-11 d-flex flex-wrap">
            <button
              :disabled="detail.count != undefined"
              style="width: 30%"
              :style="index == i ? pricolor : nopricolor"
              v-for="(t, i) of detright.ys"
              :key="i"
              @click="pri(t, i)"
            >
              {{ t.text }}
            </button>
          </div>
          <!--隐藏区域的颜色-->
          <div id="yanse" :style="ysstyle" style="color: red">
            <ul class="list-unstyled d-flex justify-content-between ml-2 m-0">
              <li>
                <span class="mx-1">!</span>
                <span style="color: #d04e4e">请选择颜色 :</span>
              </li>
              <li class="mr-2"><p @click="ysno" class="m-0">×</p></li>
            </ul>
            <button
              :disabled="detail.count != undefined"
              style="width: 30%"
              :style="index == i ? pricolor : nopricolor"
              v-for="(t, i) of detright.ys"
              :key="i"
              @click="pri(t, i)"
            >
              {{ t.text }}
            </button>
          </div>
        </div>
        <!--数量加减部分-->
        <div id="jiajian" class="row no-gutters mt-2">
          <div class="col-1 text-muted mt-2">数量:</div>
          <ul class="list-unstyled d-flex mt-1">
            <li>
              <button
                class="font-weight-bold"
                :disabled="shu == 1"
                @click="shuliang(-1)"
              >
                -
              </button>
            </li>
            <li><input style="outline: none" type="text" v-model="shu" /></li>
            <li>
              <button
                :disabled="detail.count != undefined || shu == 50"
                @click="shuliang(+1)"
                class="font-weight-bold"
              >
                +
              </button>
            </li>
          </ul>
        </div>
        <!--服务部分-->
        <div id="fuwu" class="row no-gutters mt-2 mb-2">
          <div class="col-1 text-muted mt-2">服务:</div>
          <ul class="list-unstyled d-flex mt-2">
            <li
              @click="yesfw"
              style="cursor: pointer"
              v-for="(t, i) of detright.fw"
              :key="i"
            >
              {{ t.text }}
            </li>
          </ul>
          <div
            :style="fwtype"
            id="fwmove"
            v-show="detright.fw[0] != undefined"
            :class="isfw"
            @mousedown.stop="fwmove($event)"
          >
            <span
              style="cursor: move"
              class="d-flex justify-content-between px-4"
            >
              <p>服务</p>
              <p @click="nofw">×</p>
            </span>
            <ul>
              <li v-show="detright.fw[0] != undefined">7天无理由退货</li>
              <p v-show="detright.fw[0] != undefined">
                该商品支持7天无理由退货，买家在商品签收日起7天内可在线发起退货申请
              </p>
              <li v-show="detright.fw[1] != undefined">15天无忧换货</li>
              <p v-show="detright.fw[1] != undefined">
                该商品支持15天无忧换货，买家在商品签收之日起15天内可在线发起换货申请
              </p>
              <li v-show="detright.fw[2] != undefined">满119包邮</li>
              <p v-show="detright.fw[2] != undefined">
                单笔订单金额（不含运费）满119元享受包邮服务
              </p>
              <li v-show="detright.fw[3] != undefined">商家发货</li>
              <p v-show="detright.fw[3] != undefined">
                该商品由道衍文化发展（北京）有限公司在2个工作日内发货（法定节假日顺延）。严格审核供应商资质，正品保证，100%正规渠道商品
              </p>
              <li v-show="detright.fw[4] != undefined">网易自营</li>
              <p v-show="detright.fw[4] != undefined">
                该商品为网易自营，品质保证
              </p>
              <li v-show="detright.fw[5] != undefined">部分地区无法配送</li>
              <p v-show="detright.fw[5] != undefined">
                该商品部分地区无法配送，请查阅详情页详细说明
              </p>
            </ul>
            <button @click="nofw">知道了</button>
          </div>
        </div>
        <!--加入购物车阶段-->
        <a id="xiajia" v-if="detail.count !== undefined" href="#">已下架</a>
        <div v-else id="goumai" class="col-12 d-flex p-0">
          <a @click="ysyes" href="javascript:;">立即购买</a>
          <a @click="store" href="javascript:;" class="d-flex">
            <img src="tu/63.png" />
            加入购物车
          </a>
        </div>
      </div>
    </div>
    <!--商品详情部分结束-->
    <!--优惠套餐部分开始-->
    <!--<div id="taocan" class="mt-5">
      <h3 class="py-2">优惠套餐</h3>
      <div class="d-flex justify-content-between">
             套餐左边
        <div class="d-flex">
             左边商品
          <div class="w-25">
            <img src="tu/64.png" class="w-100" />
            <h6 class="px-3 pb-1 m-0">
              i19蓝牙5.0真无线耳机 光感入耳 无线充电
            </h6>
            <div class="d-flex justify-content-center px-3 pb-2">
              <p class="xianjia my-0">￥299</p>
              <p class="yuanjia my-0">￥299</p>
            </div>
          </div>
          <p style="font-size: 50px; color: #bcbcbc; margin-top: 50px">+</p>
              右边商品
          <div class="w-25">
            <img src="tu/65.png" class="w-100" />
            <h6 class="px-3 pb-1 m-0">爱国者 MP3-501 蓝牙外放mp3随身听</h6>
            <div class="d-flex justify-content-center px-3 pb-2">
              <p class="xianjia my-0">￥139</p>
              <p class="yuanjia my-0">￥159</p>
            </div>
          </div>
        </div>
             套餐右边
        <div id="taocanyou" class="px-4">
          <div class="font-18">
            <p class="mb-4">
              共2件，已选择 <span style="color: #d33a31">1</span> 件搭配商品
            </p>
            <span>套餐价:</span
            ><span style="color: #d33a31; font-size: 25px">￥438</span>
            <p class="font-18 mt-2">可优惠:&nbsp;¥20</p>
            <a href="#">立即购买</a>
          </div>
        </div>
      </div>
    </div>-->
    <!--优惠套餐部分结束-->
    <!--商品详细部分开始-->
    <div id="xiangxi" class="d-flex justify-content-between pt-5">
      <!--商品详细左边-->
      <div id="xiangxizuo">
        <ul class="list-unstyled">
          <li class="font-18 font-weight-bold">商品详情</li>
        </ul>
        <img
          class="w-100"
          v-for="(t, i) of detail.largeimg"
          :key="i"
          :src="t.img"
        />
      </div>
      <!--商品详细右边-->
      <div id="xiangxiyou">
        <ul class="list-unstyled">
          <li class="font-18 font-weight-bold">热门商品</li>
        </ul>
        <div
          class="d-flex justify-content-between mb-5"
          v-for="(t, i) of detail.wares"
          :key="i"
        >
          <router-link @click.native="refresh" :to="`/details/${t.wid}`"
            ><img :src="t.img" class="w-100"
          /></router-link>
          <div class="font-18 d-flex flex-column justify-content-between ml-3">
            <div class="py-3">
              <span class="xk mr-1" v-show="t.xk !== ''">{{ t.xk }}</span>
              <router-link @click.native="refresh" :to="`/details/${t.wid}`">{{
                t.text
              }}</router-link>
            </div>
            <p class="xianjia">￥{{ t.jg }}</p>
          </div>
          <div id="flot" v-show="t.tj.xianjia !== undefined">
            <p>{{ t.tj.xianjia }}</p>
            <p>{{ t.tj.yuanjia }}</p>
          </div>
        </div>
      </div>
    </div>
    <!--商品详细部分结束-->
    <!--页脚部分-->
    <foot :length="length"></foot>
  </div>
</template>
<!--样式-->
<style scoped>
@import "../assets/details.css";
</style>
<!--函数-->
<script>
import { snow } from "color-name";
import Foot from "../components/Foot.vue";
export default {
  props: ["wid"],
  components: { Foot },
  data() {
    return {
      length: "10",
      shu: 1,
      //直接给一个对象行进数组解构，拿需要的那一部分
      detail: { largeimg: { img1: "" } },
      //那detright详情右边信息
      detright: {
        zx: { top: { text1: "" }, bottom: {} },
        ys: { length: "" },
        fw: [{}],
      },
      //那详情左边所有图片
      imgs: {
        small: { img1: "" },
        big: { img1: "" },
        bgImg: [{ img: "" }],
        bgImg: { 0: "" },
      },
      //拿推荐区域的货物商品信息
      wares: {},
      //颜色隐藏区域的显示与隐藏控制
      ysstyle: { display: "none" },
      //页面刚开始刷新给的价格
      price: "",
      //优惠券颜色管理的数量
      rollcount: 1,
      //详情颜色区域和小图片区域被选中给的颜色
      pricolor: {
        border: "1px solid #f00",
        "box-sizing": "border-box",
      },
      //详情颜色区域和小图片区域没被选中不给的颜色
      nopricolor: {},
      //控制详情右边是否被选中
      index: -1,
      //用于判断左边大图标被选中的样式
      show: { "z-index": 2 },
      //用于判断左边大图标没有选中的样式
      noshow: {},
      //用于控制左边大图是否被选中
      leftindex: 0,
      //控制放大镜是否显示
      bgImg: true,
      //悬浮样式
      yeshover: { display: "block" },
      nohover: { display: "none" },
      //放大镜样式
      yesbgImg: { display: "block" },
      nobgImg: { display: "none" },
      //浮动的块级服务区域是否打开
      isfw: {
        "d-none": true,
      },
      //控制服务移动的变量
      fwstate: false,
      //控制服务移动的属性
      fwtype: {
        left: "30%",
        top: "30%",
      },
      //存储购物车内容
      message: {},
      //检查是否数组中有货物
      stlength: "",
      //检查是否数组中货物内容
      stmessage: {},
    };
  },
  methods: {
    store() {
      let id = localStorage.getItem("id");
      if (localStorage.getItem("state") == 0) {
        this.$alert("请先进行登录", "信息提示", {
          confirmButtonText: "确定",
        });
      } else {
        if (this.index == -1) {
          this.ysstyle = { display: "block" };
        } else {
          this.axios
            .get("/store", {
              params: {
                //yanse: this.message.yanse,
                id: id,
              },
            })
            .then((res) => {
              let arr = res.data[0].message;
              this.stlength = arr.some((item) => {
                return item.yanse == this.message.yanse;
              });
              if (this.stlength) {
                arr.forEach((item) => {
                  if (item.yanse == this.message.yanse) {
                    item.value++;
                  }
                });
              } else {
                arr.push(this.message);
                alert("添加成功");
              }
              let msg = {
                id: id,
                message: arr,
              };
              this.axios.patch(`/store/${id}`, msg);
              this.length++;
              console.log(arr);
            });
          // .then((result) => {
          //   this.stlength = result.data.length;
          //   this.stmessage = result.data[0];
          //   if (this.stlength == 0) {
          //     console.log(this.stlength);
          //     this.axios.post("/store", this.message).then((res) => {
          //       alert("添加成功");
          //       this.axios.get("/store").then((result) => {
          //         this.length = result.data.reduce((tot, item) => {
          //           return tot + item.value;
          //         }, 0);
          //         console.log("数量:" + this.length);
          //       });
          //     });
          //   } else if (this.stlength === 1) {
          //     console.log(this.stlength);
          //     let id = this.stmessage.id;
          //     this.stmessage.value += 1;
          //     this.axios.patch(`/store/${id}`, this.stmessage);
          //     this.axios.get("/store").then((result) => {
          //       this.length = result.data.reduce((tot, item) => {
          //         return tot + item.value;
          //       }, 0);
          //       console.log("数量:" + this.length);
          //     });
          //   }
          // });
        }
      }
    },
    ysyes() {
      let state = localStorage.getItem("state");
      if (state == 1) {
        if (this.index == -1 && this.detright.ys.length !== 0) {
          this.ysstyle = { display: "block" };
        } else {
          let arr = [];
          arr.push(this.message);
          sessionStorage.setItem("vxmsg", JSON.stringify(arr));
          this.$router.push("/confirm");
        }
      } else {
        this.$alert("请先进行登录", "信息提示", {
          confirmButtonText: "确定",
        });
      }
      sessionStorage.setItem("liji", "yes");
    },
    ysno() {
      this.ysstyle = { display: "none" };
    },
    fwmove(e) {
      if (e.target.nodeName == "SPAN") {
        let element = e.currentTarget;
        //算出鼠标相对元素的位置
        let disX = e.clientX - element.offsetLeft;
        let disY = e.clientY - element.offsetTop;
        document.onmousemove = (e) => {
          //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let left = e.clientX - disX;
          let top = e.clientY - disY;
          if (left < 0) {
            left = 0;
          } else if (
            left >
            document.documentElement.clientWidth - element.offsetWidth
          ) {
            left = document.documentElement.clientWidth - element.offsetWidth;
          }
          if (top < 0) {
            top = 0;
          } else if (
            top >
            document.documentElement.clientHeight - element.offsetHeight
          ) {
            top = document.documentElement.clientHeight - element.offsetHeight;
          }
          //移动当前元素;
          this.fwtype = {
            left: left + "px",
            top: top + "px",
          };
        };
        document.onmouseup = (e) => {
          //鼠标弹起来的时候不再移动
          document.onmousemove = null;
          //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
          document.onmouseup = null;
        };
      }
    },
    roll() {
      if (localStorage.getItem("state") == 0) {
        this.$alert("请先进行登录", "提示信息", {
          confirmButtonText: "确定",
        });
      } else {
        this.$alert("领取成功,请在优惠券库中进行查看", "提示信息", {
          confirmButtonText: "确定",
        });
        this.rollcount = 0;
      }
    },
    nofw() {
      this.isfw = { "d-none": true };
    },
    yesfw() {
      this.isfw = { "d-none": false };
    },
    move(e) {
      let width = e.currentTarget.offsetWidth;
      let left = e.offsetX - 100;
      let top = e.offsetY - 100;
      if (left < 0) left = 0;
      else if (left > width - 207) left = width - 207;
      if (top < 0) top = 0;
      else if (top > width - 207) top = width - 207;
      this.yeshover = { display: " block", left: `${left}px`, top: `${top}px` };
      this.yesbgImg = { left: `-${left * 1.1}px`, top: `-${top * 1.1}px` };
    },
    jinru() {
      this.bgImg = !this.bgImg;
    },
    refresh() {
      this.$router.go(0);
    },
    shuliang(n) {
      let shu = Number(this.shu) + n;
      this.shu = shu;
      if (this.shu < 2) {
        this.isdisabled = true;
      } else {
        this.isdisabled = false;
      }
    },
    imgevent(i) {
      this.leftindex = i;
    },
    pri(t, i) {
      this.index = i;
      this.price = t.sal;
      this.leftindex = i;
      this.ysstyle = { display: "none" };
      this.message = {
        img: this.imgs.small[this.leftindex].img,
        text: this.detright.text1,
        yanse: this.detright.ys[this.index].text,
        price: this.price,
        value: 1,
        check: true,
      };
    },
  },
  watch: {
    shu() {
      if (this.shu < 1) {
        this.shu = 1;
      } else if (this.shu > 50) {
        this.shu = 50;
        this.$alert("单品已达上限", "警告信息", {
          confirmButtonText: "确定",
        });
      }
    },
  },
  mounted() {
    let id = localStorage.getItem("id");
    if (localStorage.getItem("state") == 0) {
      this.length = 0;
    } else {
      this.axios
        .get("/store", {
          params: {
            id: id,
          }
        })
        .then((result) => {
          this.length = result.data[0].message.reduce((tot, item) => {
            return tot + item.value;
          }, 0);
          console.log("数量:" + this.length);
        });
    }

    this.axios
      .get("/index", {
        params: {
          wid: this.wid,
        },
      })
      .then((result) => {
        this.detail = result.data[0].detail;
        this.detright = this.detail.detright;
        this.imgs = this.detail.imgs;
        console.log(this.imgs);
        this.wares = this.detail.wares;
        this.price = this.detright.text3;
        if (this.detright.ys.length == 0) {
          this.index = 0;
        }
        console.log(this.index);
      });
  },
};
</script>
