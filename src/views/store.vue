<template>
  <div class="store">
    <hr />
    <div id="head">
      <!--顶部购物车导航区域开始-->
      <ul class="list-unstyled">
        <li>购物车</li>
      </ul>
      <!--顶部购物车导航区域结束-->
      <!--购物车开始-->
      <div v-if="massage.length !== 0">
        <!--购物车简介部分开始-->
        <ul class="list-unstyled d-flex align-items-center ml-2">
          <li class="col-1 d-flex align-items-center p-0">
            <input
              type="checkbox"
              class="checkbox mx-2"
              :checked="dis"
              @click="yesdis"
            />
            <span style="font-size: 19px; display: inline-block; color: #000"
              >全选</span
            >
          </li>
          <li class="col-5"><span style="font-size: 20px">商品</span></li>
          <li class="col-2 text-center">
            <span style="font-size: 20px">金额</span>
          </li>
          <li class="col-2 text-center">
            <span style="font-size: 20px">数量</span>
          </li>
          <li class="col-2 d-flex justify-content-around">
            <span style="font-size: 18px">小计</span>
            <span style="font-size: 18px">操作</span>
          </li>
        </ul>
        <!--购物车简介部分结束-->
        <!--购物车主体部分开始-->
        <ul id="home" class="list-unstyled">
          <!--购物车头部开始-->
          <li class="d-flex justify-content-between px-5 align-items-center">
            <p class="m-0" style="color: #9999a5">全场商品({{ length }})</p>
            <div class="d-flex">
              <div><img src="tu/106.jpg" /></div>
              <p class="m-0 p-1">
                全场满<span style="color: #d33a31">￥119</span>免运费
                <span v-show="money >= 0"
                  >(还差￥<span>{{ money }}</span
                  >)</span
                >
                <router-link v-show="money >= 0" to="/" class="ml-2"
                  >去凑单&gt;</router-link
                >
              </p>
            </div>
          </li>
          <!--购物车头部结束-->
          <!--购物车主要部分开始-->
          <!--购物车循环部分开始-->
          <li
            v-for="(t, i) of massage"
            :key="i"
            class="d-flex justify-content-between align-items-center py-4"
          >
            <div class="d-flex align-items-center col-6">
              <input
                type="checkbox"
                :checked="t.check"
                @click="checkd(t.check, t.yanse)"
              />
              <div style="background-color: #f4f4f4"><img :src="t.img" /></div>
              <div class="ml-4">
                <p
                  class="m-0"
                  style="
                    height: 29px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    width: 400px;
                  "
                >
                  {{ t.text }}
                </p>
                <p style="color: #999">{{ t.yanse }}</p>
              </div>
            </div>
            <p class="col-1 text-center">{{ t.price }}</p>
            <div style="border: 1px solid #e5e5e5" class="mb-2">
              <!--:disabled="val == 1"-->
              <button
                class="btn_"
                @click="update(-1, t.yanse, t.value)"
                :disabled="t.value == 1"
              >
                -
              </button>
              <input type="text" :value="t.value" />
              <button class="btn_" @click="update(+1, t.yanse, t.value)">
                +
              </button>
            </div>
            <div class="d-flex align-items-center col-2 justify-content-around">
              <p style="color: #db3a31">
                ￥{{ Number(t.price.slice(1)) * t.value }}
              </p>
              <p
                style="font-size: 30px; cursor: pointer"
                @click="move(t.yanse, i)"
              >
                ×
              </p>
            </div>
          </li>
          <!--购物车循环部分结束-->
          <ul class="list-unstyled">
            <li class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center ml-3">
                <input type="checkbox" :checked="dis" @click="yesdis" />
                <span class="ml-3 mr-5">全选</span>
                <p class="m-0" style="color: #999">
                  已选择 <span style="color: #d33a31">{{ length }}</span> 件商品
                </p>
              </div>
              <div class="d-flex align-items-center">
                <span style="color: #999" v-show="total >= 119"
                  >已享受免运费</span
                >
                <span style="color: #999" v-show="total < 119"
                  >差 <span>{{ money }}</span> 元免运费
                </span>
                <span class="mx-3"> | </span>
                <span>合计:</span>
                <h3 style="color: #d33a31" class="pt-2 ml-2 mr-5">
                  ¥{{ total }}
                </h3>
                <router-link
                  :to="total == 0 ? '' : '/confirm'"
                  class="link"
                  @click.native="vx"
                  :style="total !== 0 ? shi : bu"
                  >结算</router-link
                >
              </div>
            </li>
          </ul>
          <!--购物车主要部分结束-->
        </ul>
        <!--购物车主体部分结束-->
      </div>
      <div v-else class="text-center mt-5">
        <img src="tu/107.jpg" alt="" />
        <h4 class="ml-5 mt-4">
          <span>购物车还是空的 ,</span>
          <router-link to="/">去逛逛&gt;</router-link>
        </h4>
      </div>
      <!--购物车结束-->
      <!--销售商品开始-->
      <div id="shopp" class="mt-5">
        <h3 style="font-weight: bold" class="mb-3">热门推荐</h3>
        <div
          class="mt-4 text-center dafangge d-flex flex-wrap justify-content-between"
          style="font-size: 16px"
        >
          <div class="fangge" v-for="p of shop" :key="p.wid">
            <router-link :to="`/details/${p.wid}`"
              ><img
                :src="p.wimg"
                class="w-100"
                style="background-color: #f9f9f9"
            /></router-link>
            <div class="mt-2">
              <div>
                <span class="xiaokuang mr-1" v-show="p.xk !== ''">{{
                  p.xk
                }}</span>
                <span
                  ><router-link to="/details" style="color: #000">{{
                    p.text
                  }}</router-link></span
                >
              </div>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      shop: [],
      massage: [],
      total: "",
      //全选
      dis: true,
      //差的钱数
      money: "",
      stmes: {},
      //删除时对总价控制的一个状态
      tstate: "",
      //选中的商品数量
      length: "",
      shi: { "background-color": "#d44038" },
      bu: { "background-color": "#ccc" },
      //结算时所查找的数据
      vxmessage: [],
      xiabiao: [],
    };
  },
  methods: {
    vx() {
      if (this.length == 0) {
      } else {
        this.$router.go(0);
        this.massage.forEach((item, i) => {
          if (item.check) {
            this.vxmessage.push(item);
            this.xiabiao.push(i);
          }
        });
        sessionStorage.setItem("vxmsg", JSON.stringify(this.vxmessage));
        sessionStorage.setItem("vxi", JSON.stringify(this.xiabiao));
        sessionStorage.setItem("liji", "no");
      }
    },
    //对购物车正品内容里面的checkd进行修改
    checkd(state, yanse) {
      this.massage.forEach((item) => {
        if (yanse == item.yanse) {
          item.check = !state;
          // this.stmes = item;
          // this.stmes.check = !state;
          // this.axios.patch(`/store/${id}`, this.stmes);
        }
      });
      if (state) {
        this.dis = false;
        this.massage.forEach((item) => {
          if (yanse == item.yanse) {
            this.length = this.length - item.value;
          }
        });
      } else {
        this.massage.forEach((item) => {
          if (yanse == item.yanse) {
            this.length = this.length + item.value;
          }
        });
      }
      let yes = this.massage.every((item) => {
        return item.check == true;
      });
      if (yes) {
        this.dis = true;
      }
      this.total = this.massage.reduce((tot, item) => {
        return tot + item.price.slice(1) * item.value;
      }, 0);
      this.massage.forEach((item) => {
        if (item.check != true) {
          this.total -= item.price.slice(1) * item.value;
          this.money = 119 - this.total;
        }
      });
    },
    yesdis() {
      this.dis = !this.dis;
      if (this.dis) {
        this.total = this.massage.reduce((tot, item) => {
          return tot + item.price.slice(1) * item.value;
        }, 0);
        this.money = 119 - this.total;
        this.massage.forEach((item) => {
          item.check = true;
          this.length = this.massage.reduce((tot, item) => {
            return tot + item.value;
          }, 0);
        });
      } else {
        this.massage.forEach((item) => {
          item.check = false;
        });
        this.length = 0;
      }
      this.total = this.massage.reduce((tot, item) => {
        return tot + item.price.slice(1) * item.value;
      }, 0);
      this.massage.forEach((item) => {
        if (item.check != true) {
          this.total -= item.price.slice(1) * item.value;
          this.money = 119 - this.total;
        }
      });
      return true;
    },
    //进行加减时候的数值更改
    update(n, yanse, value) {
      //对input中的value进行更改
      this.massage.forEach((item) => {
        if (yanse == item.yanse) {
          item.value += n;
        }
      });
      this.massage.forEach((item) => {
        if (yanse == item.yanse) {
          if (item.check) {
            this.length += n;
            if (n == 1) {
              this.total += Number(item.price.slice(1));
              this.money = 119 - this.total;
            } else if (n == -1) {
              this.total -= Number(item.price.slice(1));
              this.money = 119 - this.total;
            }
          }
        }
      });
    },
    move(yanse, i) { 
      //总价开始
      this.massage.forEach((item) => {
        if (yanse == item.yanse) {
          if (item.check) {
            this.total = this.total - item.value * item.price.slice(1);
            this.money = 119 - this.total;
            //减去相对应的value里面的值
            this.length = this.length - item.value;
          }
        }
      });
      this.massage.splice(i, 1);
      // this.axios.delete(`/store/${id}`).then((res) => {
      //   console.log("删除成功1");
      //   //重新请求数据
      //   this.axios.get("/store").then((result) => {
      //     this.massage = result.data;
      //     console.log("拿到数据2");

      //     /*this.total = arr.reduce((tot, item) => {
      //       return tot + item;
      //     });*/
      //     console.log("我是总价3:" + this.total);
      //     //总价结束
      //     //对全选按钮的一个认证
      //     let yes = this.massage.every((item) => {
      //       return item.check;
      //     });
      //     if (yes) {
      //       this.dis = true;
      //     } else {
      //       this.dis = false;
      //       console.log("不行");
      //     }
      //   });
      // });
      return true;
    },
  },
  updated() {
    //当加载页面的时候进行判断，如果massage为空就不进行替换，负责替换数据库内容
    let id = localStorage.getItem("id");
    let msg = {
      id: id,
      message: this.massage,
    };
    this.axios.patch(`/store/${id}`, msg);
  },
  mounted() {
    this.axios
      .get("/store", {
        params: {
          id: localStorage.getItem("id"),
        },
      })
      .then((result) => {
        console.log(result.data);
        this.massage = result.data[0].message;
        if (this.dis) {
          this.massage.forEach((item) => {
            item.check = true;
          });
        }
        this.length = this.massage.reduce((tot, item) => {
          return tot + item.value;
        }, 0);
        this.total = this.massage.reduce((tot, item) => {
          return tot + item.price.slice(1) * item.value;
        }, 0);
        this.money = 119 - this.total;
      });
    this.axios.get("/index").then((result) => {
      this.shop = result.data.slice(0, 8);
    });
  },
};
</script>
<style>
.store > #head {
  width: 77%;
  margin: 0 auto;
}
.store > #head > ul:first-child > li {
  font-size: 20px;
  font-weight: bold;
}
.store > #head > ul:first-child {
  border-bottom: 1px solid #000;
  margin-top: 30px;
  padding-bottom: 10px;
}
.store > #head > ul:nth-child(2) {
  color: #999999;
}
input[type="checkbox"] {
  width: 20px;
  height: 20px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: 18px;
  margin-right: 10px;
  position: relative;
}

input[type="checkbox"]::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  height: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

input[type="checkbox"]:checked::before {
  content: "\2713";
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border: 1px solid #7d7d7d;
  border-radius: 4px;
  color: #d44038;
  font-size: 20px;
  font-weight: bold;
}
.store #home > li:first-child {
  height: 60px;
  background-color: #f4f4f4;
}
.store #home {
  font-size: 20px;
  border: 1px solid #e5e5e5;
}
.store #home > ul:last-child {
  border-top: 1px solid #e5e5e5;
}
.store .btn_ {
  width: 30px;
  height: 30px;
  background-color: #fff;
  outline: 0;
  border: 0;
  cursor: pointer;
  padding: 0px;
}
.store .btn_ + input {
  width: 50px;
  border: 0;
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
  text-align: center;
  padding-top: 2px;
}
.store .fangge {
  position: relative;
  width: 24% !important;
}
.store .xiaokuang {
  border: 1px solid #f00;
  color: #f00;
  font-size: 13px;
}
.store .dazhe {
  top: 10px;
  left: 10px;
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgb(211, 58, 49);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.store .dazhe > p:first-child {
  margin-bottom: 0;
  margin-top: 12px;
  color: #fff;
}
.store .dazhe > p:last-child {
  color: #e8e8e8;
  text-decoration: line-through;
}
.store #shopp > h3 {
  border-bottom: 2px solid #000;
  padding-bottom: 20px;
}
.store .link {
  display: block;
  width: 170px;
  height: 50px;
  color: #fff;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
}
</style>
