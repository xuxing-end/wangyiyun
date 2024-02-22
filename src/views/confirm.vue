<template>
  <div>
    <hr />
    <div class="confirm">
      <h3 class="py-3">订单确认</h3>
      <div id="home">
        <p class="m-0 pl-4">收货地址</p>
        <div class="py-3">
          <!--收货人加号码-->
          <div class="d-flex align-items-center">
            <p class="m-0 mx-4 pl-1">收&nbsp; &nbsp;货&nbsp;&nbsp;人:</p>
            <input
              type="text"
              v-model="shouhuoren"
              placeholder="为了提高发货速度,请填写您的真实姓名"
            />
            <p class="m-0 mx-4">手机号码:</p>
            <input type="text" v-model="shoujihao" />
          </div>
          <!--收货地区-->
          <div class="d-flex align-items-center">
            <p class="m-0 mx-4">收货地区:</p>
            <v-distpicker
              province="广东省"
              city="广州市"
              area="海珠区"
              @click="change1($event)"
            ></v-distpicker>
          </div>
          <!--详细地址-->
          <div class="d-flex">
            <p class="m-0 mx-4">详细地址:</p>
            <textarea
              v-model="dizhi"
              placeholder="无需重复填写省市区，小于120字"
            ></textarea>
          </div>
          <button class="d-block">保存新地址</button>
        </div>
      </div>
      <!--商品信息提交区域开始-->
      <div id="bottom" class="mt-5">
        <!--顶部导航开始-->
        <ul class=" list-unstyled d-flex m-0">
          <li class="col-6">商品信息</li>
          <li class="col-2">金额</li>
          <li class="col-2">数量</li>
          <li class="col-2">小计</li>
        </ul>
        <!--顶部导航结束-->
        <!--商品信息开始-->
        <ul class=" list-unstyled">
          <li class="d-flex" v-for="(t, i) of message" :key="i">
            <div class="col-6 d-flex">
              <img :src="t.img" />
              <div class="text d-flex flex-column justify-content-center ml-3">
                <p class="m-0 ">{{ t.text }}</p>
                <p class="m-0  text-muted">{{ t.yanse }}</p>
              </div>
            </div>
            <div
              class="col-2 d-flex flex-column justify-content-center text-center"
            >
              {{ t.price }}
            </div>
            <p
              class="col-2 d-flex flex-column justify-content-center text-center"
            >
              {{ t.value }}
            </p>
            <p
              class="col-2 d-flex flex-column justify-content-center text-center"
            >
              ￥{{ t.value * t.price.slice(1) }}
            </p>
          </li>
        </ul>
        <!--商品信息结束-->
        <!--优惠券提交区域开始-->
        <div class="d-flex  justify-content-between mx-3 pt-5 pb-5">
          <div>
            <p>全部优惠券(0)&gt;</p>
            <span class="kuang">无可用优惠券</span>
            <div class="d-flex">
              <button style="" id="btn" @click="btn">{{ suc }}</button>
              <p class=" text-muted m-0">我同意</p>
              <p class="m-0">《云音乐商城购买协议》</p>
            </div>
          </div>
          <ul id="settle" class=" list-unstyled d-flex flex-wrap">
            <li class="col-6"><span>商品合计:</span></li>
            <li class="col-6">
              <span>￥{{ price }}</span>
            </li>
            <li class="col-6 position-relative">
              <span>运费:</span>
              <p class=" position-absolute show">已享受免运费</p>
              <span></span>
            </li>
            <li class="col-6">
              <span>0</span>
            </li>
            <li class="col-6"><span>实付金额:</span></li>
            <li class="col-6">
              <span style="color:#D33A31">￥{{ price }}</span>
            </li>

            <span
              class="kuang ding"
              :style="
                suc == ''
                  ? { 'background-color': '#ccc' }
                  : { 'background-color': '#d33a31' }
              "
              @click="tijiao"
              >提交订单</span
            >
          </ul>
        </div>
        <!--优惠券提交区域结束-->
      </div>
      <!--商品信息提交区域结束-->
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
      shouhuoren: "",
      shoujihao: "",
      dizhi: "",
      suc: "√",
      message: [],
      price: "",
      //存放数据，在此数据中进行删减然后赋值
      updateMessage: [],
      index: [],
    };
  },
  methods: {
    change1(e) {
      console.log(e);
      let r = e;
    },
    tijiao() {
      let ms = {
        收货人: this.shouhuoren,
        手机号: this.shoujihao,
        地址: this.dizhi,
      };
      if (this.suc == "") {
      } else {
        if (this.shouhuoren == "") {
          this.$alert("收货人不能为空", "警告信息", {
            confirmButtonText: "确定",
          });
          return;
        } else if (this.shoujihao == "") {
          this.$alert("手机号不能为空", "警告信息", {
            confirmButtonText: "确定",
          });
          return;
        }
        let sj = /^1[0-9]{10}$/;
        let stat = sj.test(this.shoujihao);
        if (stat) {
          alert("订单提交成功");
          console.log(ms);
          //现价差是直接购买的还是通过购物车购买的
          let liji = sessionStorage.getItem("liji");
          //如果是直接购买则不进行购物车删除
          if (liji == "yes") {
            console.log("不进行删除");
          } else if (liji == "no") {
            //如果是通过购物车，则进行数组删除
            //翻转数组
            let i = this.index.reverse();
            i.forEach((item) => {
              this.updateMessage.splice(item, 1);
            });
            let id = localStorage.getItem("id");
            let msg = {
              id: id,
              message: this.updateMessage,
            };
            this.axios.patch(`/store/${id}`, msg);
          }
        } else {
          this.$alert("手机号格式错误", "警告信息", {
            confirmButtonText: "确定",
          });
        }
      }
    },
    btn() {
      if (this.suc == "") {
        this.suc = "√";
      } else {
        this.suc = "";
      }
    },
  },
  mounted() {
    let id = localStorage.getItem("id");
    this.axios
      .get("/store", {
        params: {
          id: id,
        },
      })
      .then((result) => {
        this.updateMessage = result.data[0].message;
      });
    let msg = JSON.parse(sessionStorage.getItem("vxmsg"));
    let xiabiao = JSON.parse(sessionStorage.getItem("vxi"));
    this.message = msg;
    this.index = xiabiao;
    console.log(this.index);
    this.price = this.message.reduce((tot, item) => {
      return tot + item.value * item.price.slice(1);
    }, 0);
  },
};
</script>
<style>
.confirm {
  width: 77%;
  margin: 0 auto;
}
.confirm > h3 {
  border-bottom: 2px solid #000;
}
.confirm #home {
  border: 1px solid #e5e5e5;
  margin-top: 25px;
}
.confirm #home > p {
  height: 40px;
  line-height: 40px;
  background-color: #f4f4f4;
  color: #999999;
}
.confirm #home > div:nth-child(2) > div:first-child > input {
  width: 350px;
}
.confirm #home > div:nth-child(2) > div {
  margin: 20px 0;
}
.confirm #home > div:nth-child(2) > button {
  width: 200px;
  height: 50px;
  margin: 0 auto !important;
  outline: 0;
  background-color: #d33a31;
  border: 0;
  color: #fff;
  cursor: pointer;
}
.confirm #home input {
  height: 40px;
  border: 1px solid #e5e5e5;
  outline: 0;
  padding: 10px;
  border-radius: 5px;
}
.confirm textarea {
  width: 500px;
  height: 120px;
  outline: none;
  resize: none;
}
.confirm #bottom {
  border: 1px solid #e5e5e5;
  margin-top: 25px;
}
.confirm #bottom > ul:first-child {
  height: 40px;
  line-height: 40px;
  background-color: #f4f4f4;
  color: #999999;
}
.confirm #bottom > ul:first-child > li:not(:first-child) {
  text-align: center;
}
.confirm #bottom > ul:nth-child(2) img {
  background-color: #f4f4f4;
}
.confirm #bottom > ul:nth-child(2) > li {
  padding: 30px 0;
}
.confirm #bottom > ul:nth-child(2) {
  border-bottom: 2px solid #f4f4f4;
}
.confirm .text {
  width: 70%;
}
.confirm .text > p:first-child {
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.confirm #btn {
  color: red;
  background-color: #fff;
  outline: 0;
  border: 1px solid #ccc;
  width: 25px;
  height: 25px;
  line-height: 25px;
  padding: 0;
  margin-right: 10px;
}
.confirm #settle {
  width: 300px;
  margin-right: 90px;
  text-align: center;
}
.confirm #settle li {
  height: 40px;
  padding: 0;
}
.confirm #settle li span {
  float: right;
}
.confirm .kuang {
  display: block;
  width: 200px;
  height: 60px;
  border: 1px solid #f4f4f4;
  background-color: #f5f5f5;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
  margin-bottom: 20px;
}
.confirm .ding {
  margin-top: 20px;
  margin-left: 100px;
  color: #fff;
}
.confirm .show {
  color: #d33a31;
  border: 1px solid #d33a31;
  padding: 2px 10px;
  left: -5px;
  top: -3px;
}
</style>
