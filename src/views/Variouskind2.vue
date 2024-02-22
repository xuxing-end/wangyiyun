<template>
  <div class="variouskind">
    <hr />
    <div class="mt-5">
      <!--返回首页区域开始-->
      <ul class="list-unstyled d-flex pb-3 pl-0">
        <li><router-link to="/" style="color: #000">首页</router-link></li>
        <li class="text-muted">&gt;</li>
        <li class="text-muted">IP周边</li>
      </ul>
      <!--返回首页区域结束-->
      <!--选择样式区域开始-->
      <div id="opt">
        <!--品牌-->
        <div class="d-flex justify-content-between text-center">
          <div class="w-5 text-muted py-2">品牌:</div>
          <div class="w-90" :style="pinpaiheight">
            <ul class="list-unstyled d-flex flex-wrap">
              <li class="mr-4 font-15 py-2" v-for="(t, i) of brand" :key="i">
                {{ t.text }}
              </li>
            </ul>
          </div>
          <div
            v-if="more"
            @click="pinpai"
            class="w-8 d-flex flex-wrap py-2"
            style="font-size: 16px"
          >
            <div>更多</div>
            <div class="w-25">&gt;</div>
          </div>
          <div
            v-else
            @click="pinpai2"
            class="w-8 d-flex flex-wrap py-2"
            style="font-size: 16px"
          >
            <div>收起</div>
            <div class="w-25">&lt;</div>
          </div>
        </div>
        <!--分类-->
        <div class="d-flex justify-content-between text-center">
          <div class="w-5 text-muted">分类:</div>
          <div class="w-90">
            <ul class="list-unstyled d-flex flex-wrap m-0">
              <li class="mr-4" v-for="(t, i) of classify" :key="i">
                {{ t.text }}
              </li>
            </ul>
          </div>
          <div class="w-5"></div>
        </div>
        <!--价格-->
        <div class="d-flex">
          <div class="w-5 text-muted text-center">价格:</div>
          <span>
            <ul class="list-unstyled d-flex flex-wrap m-0">
              <li class="mr-4" v-for="(t, i) of price" :key="i">
                {{ t.text }}
              </li>
            </ul>
          </span>
          <div class="small ml-4" id="price">
            <span class="mr-2">自定义</span>
            <input type="text" placeholder="￥" v-model="price1" />
            <span class="mx-1">——</span>
            <input type="text" placeholder="￥" v-model="price2" />
            <button :style="buttonsty" @click="seek">确认</button>
          </div>
        </div>
      </div>
      <!--选择样式区域结束-->
      <!--价格排序区域开始-->
      <ul class="d-flex m-0 list-unstyled mt-4">
        <li
          :style="sortNumber == i ? sortColor : nosort"
          @click="paixu(i)"
          v-for="(t, i) of sort"
          :key="i"
        >
          {{ t.text }}
        </li>
      </ul>
      <!--价格排序区域结束-->
      <!--商品展示区域开始goods货物-->
      <div id="goods" class="d-flex justify-content-between mt-5 flex-wrap">
        <div v-for="(t, i) of arr" :key="i">
          <!--图片-->
          <div><img :src="t.wimg" /></div>
          <!--文本-->
          <div id="xk">
            <span v-show="t.xk != ''">{{ t.xk }}</span>
            <router-link style="color: #000" :to="`/details/${t.wid}`">{{
              t.text
            }}</router-link>
          </div>
          <!--价格-->
          <p>￥{{ t.jg }}</p>
          <!--漂浮现原价-->
          <div v-show="t.tejia.yuanjia != undefined">
            <p>￥{{ t.tejia.xianjia }}</p>
            <p>￥{{ t.tejia.yuanjia }}</p>
          </div>
        </div>
      </div>
      <!--商品展示区域结束-->
    </div>
    <foot></foot>
  </div>
</template>
<script>
import Foot from "../components/Foot.vue";
export default {
  components: { Foot },
  data() {
    return {
      //接受品牌区域
      brand: [],
      //接受分类区域
      classify: [],
      //接受价格区域
      price: [],
      //接收排序数据
      sort: [],
      //品牌高度隐藏
      pinpaiheight: {
        height: 80 + "px",
      },
      //more更多
      more: true,
      //价格的自定义价格
      price1: "",
      price2: "",
      //价格button的bgcl
      buttonsty: {
        "background-color": "#666",
      },
      //排序比较的数值
      sortNumber: 0,
      //排序被选中的的样式
      sortColor: { "font-weight": "bold" },
      nosort: {},
      //接收传递过来的数据并且进行价格查找所用
      message: [],
      //用来渲染页面所用
      arr: [],
    };
  },
  methods: {
    seek() {
      if (this.price1 == "" || this.price2 == "") {
      } else {
        let mes = this.message.filter((item) => {
          return (
            item.jg >= parseInt(this.price1) && item.jg <= parseInt(this.price2)
          );
        });
        if (this.sortNumber == 0) {
          this.arr = mes.sort((a, b) => a.wid - b.wid);
        } else if (this.sortNumber == 1) {
          this.arr = mes.sort((a, b) => a.jg - b.jg);
        } else if (this.sortNumber == 2) {
          this.arr = mes.sort((a, b) => b.jg - a.jg);
        }
      }
    },
    paixu(i) {
      this.sortNumber = i;
      if (i == 0) {
        this.arr = this.arr.sort((a, b) => a.wid - b.wid);
      } else if (i == 1) {
        this.arr = this.arr.sort((a, b) => a.jg - b.jg);
      } else if (i == 2) {
        this.arr = this.arr.sort((a, b) => b.jg - a.jg);
      }
    },
    pinpai() {
      this.pinpaiheight = {
        height: "",
      };
      this.more = false;
    },
    pinpai2() {
      this.pinpaiheight = {
        height: "80px",
      };
      this.more = true;
    },
  },
  mounted() {
    this.axios
      .get("/opt", {
        params: {
          name: "数码影音",
        },
      })
      .then((result) => {
        this.brand = result.data[0].brand;
        this.classify = result.data[0].classify;
        this.price = result.data[0].price;
        this.sort = result.data[0].sort;
        this.arr = result.data[0].message;
        this.message = result.data[0].message;
      });
  },
  watch: {
    price1() {
      let priceRegExp = this.price1.match(/\d+/g);
      if (priceRegExp != null) {
        var price = priceRegExp.reduce((box, value) => {
          return box + value;
        });
      }
      if (price == undefined) {
        this.price1 = "";
      } else {
        this.price1 = price;
      }
      if (this.price1 !== "" && this.price2 !== "") {
        this.buttonsty = {
          "background-color": "#d33a31",
          cursor: " pointer",
        };
      } else {
        this.buttonsty = { "background-color": "#666" };
      }
    },
    price2() {
      let priceRegExp = this.price2.match(/\d+/g);
      if (priceRegExp != null) {
        var price2 = priceRegExp.reduce((box, value) => {
          return box + value;
        });
      }
      if (price2 == undefined) {
        this.price2 = "";
      } else {
        this.price2 = price2;
      }
      if (this.price1 !== "" && this.price2 !== "") {
        this.buttonsty = {
          "background-color": "#d33a31",
          cursor: " pointer",
        };
      } else {
        this.buttonsty = { "background-color": "#666" };
      }
    },
  },
};
</script>
<style>
.variouskind .font-15 {
  font-size: 15px;
}
.variouskind .w-5 {
  width: 5%;
}
.variouskind .w-8 {
  width: 8%;
}
.variouskind .w-90 {
  width: 90%;
}
.variouskind > div:nth-child(2) {
  width: 77%;
  margin: 0 auto;
}
.variouskind > div:nth-child(2) > ul:first-child {
  font-size: 22px;
  border-bottom: 1px solid #000;
}
.variouskind > div:nth-child(2) ul li {
  margin-left: 8px;
}
.variouskind #opt {
  border: 1px solid #999;
}
.variouskind #opt ul li {
  cursor: pointer;
}
.variouskind #opt > div:first-child > div:nth-child(3) > div:last-child {
  transform: rotate(90deg) translate(-5px, -4px);
  font-size: 25px;
  cursor: pointer;
}
.variouskind #opt > div:first-child > div:last-child {
  height: 0;
  cursor: pointer;
}
.variouskind #opt > div:first-child > div:nth-child(2) {
  overflow: hidden;
}
.variouskind #opt > div + div {
  border-top: 1px solid #999;
  padding-top: 10px;
  padding-bottom: 10px;
}
.variouskind #price > input {
  width: 66px;
  height: 20px;
  outline: none;
}
.variouskind #price > button {
  width: 50px;
  height: 20px;
  line-height: 20px;
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  margin-left: 15px;
  color: #fff;
}
.variouskind #opt + ul li {
  margin-right: 20px;
  cursor: pointer;
}
.variouskind #goods > div {
  width: 23%;
  text-align: center;
  position: relative;
}
.variouskind #goods > div > div:first-child {
  background-color: #f9f9f9;
  cursor: pointer;
}
.variouskind #xk {
  max-height: 50px;
  overflow: hidden;
}
.variouskind #xk > span:first-child {
  color: #d33a31;
  border: 1px solid #d33a31;
  font-size: 12px;
  box-sizing: border-box;
}
.variouskind #goods > div > p:nth-child(3) {
  color: #d33a31;
}
.variouskind #goods > div > div:last-child {
  background-color: #d33a31;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  left: 10px;
}
.variouskind #goods > div > div:last-child > p {
  margin: 0;
  color: #fff;
  font-size: 15px;
}
.variouskind #goods > div > div:last-child > p:last-child {
  opacity: 0.5;
  text-decoration: line-through;
}
</style>
