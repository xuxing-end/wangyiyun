<template>
  <div id="enroll">
    <div class="home">
      <ul class="d-flex  flex-wrap  list-unstyled pt-5">
        <!--手机号-->
        <li class="col-12  d-flex">
          <p class="col-3  d-flex  justify-content-end">手机号码:</p>
          <input
            v-model="inputsj"
            type="text"
            @blur="bsj"
            @focus="sj"
            class="w-100"
          />
          <p class="col-5 ">{{ shouji }}</p>
        </li>
        <!--密码-->
        <li class="col-12  d-flex">
          <p class="col-3  d-flex  justify-content-end">设置密码:</p>
          <input
            type="password"
            v-model="inputmm"
            @blur="bmm"
            @focus="mm"
            class="w-100"
          />
          <p class="col-5 ">{{ mima }}</p>
        </li>
        <!--确认密码-->
        <li class="col-12  d-flex">
          <p class="col-3  d-flex  justify-content-end">确认密码:</p>
          <input
            type="password"
            v-model="inputmm2"
            @blur="bmm2"
            @focus="mm2"
            class="w-100"
          />
          <p class="col-5 ">{{ mima2 }}</p>
        </li>
        <!--常用邮箱-->
        <li class="col-12  d-flex">
          <p class="col-3  d-flex  justify-content-end">常用邮箱:</p>
          <input
            type="text"
            v-model="inputyx"
            @blur="byx"
            @focus="yx"
            class="w-100"
          />
          <p class="col-5 ">{{ youxiang }}</p>
        </li>
        <!--QQ号码-->
        <li class="col-12  d-flex">
          <p class="col-3  d-flex  justify-content-end">QQ号码:</p>
          <input
            type="text"
            v-model="inputqq"
            @focus="qq"
            @blur="bqq"
            class="w-100"
          />
          <p class="col-5 ">{{ QQ }}</p>
        </li>
        <!--验证码-->
        <li class="col-12  d-flex position-relative">
          <p class="col-3  d-flex  justify-content-end">验证码:</p>
          <input
            type="text"
            v-model="inputyzm"
            @focus="yzm"
            @blur="byzm"
            style="width:12%"
            class="mr-4"
          />
          <span @click="yz">获取验证码</span>
          <p class="col-5 ">{{ yanzheng }}</p>
          <!--验证码随机数-->
          <div class="position-absolute" id="unm" v-show="sjstate">
            {{ num }}
          </div>
        </li>
      </ul>
      <!--确认提交-->
      <div style="margin:0 auto" class="mt-5  w-50">
        <el-button
          type="primary"
          style="text-align: center;"
          class="mb-2 w-100 d-block"
          @click="zhuce"
          >确认提交注册</el-button
        >
        <div class="d-flex">
          <span class="xr" @click="succ">{{ dui }}</span>
          <span class="mx-3" style="color:#999">我已阅读并同意</span>
          <span style="color:#409EFF">服务条款</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //验证码双向绑定
      inputyzm: "",
      //QQ号双向绑定
      inputqq: "",
      //常用邮箱双向绑定
      inputyx: "",
      //确认密码双向绑定
      inputmm2: "",
      //密码双向绑定
      inputmm: "",
      //手机号双向绑定
      inputsj: "",
      shouji: "",
      mima: "",
      mima2: "",
      youxiang: "",
      QQ: "",
      yanzheng: "",
      //随机数
      sjstate: false,
      //倒计时
      num: 60,
      //接受验证码
      yzmess: "",
      //确认已阅读
      dui: "√",
      loginMessage: [],
      //检查手机号重复
      length: "",
      //用户头像
      img: "",
    };
  },
  methods: {
    succ() {
      if (this.dui == "") {
        this.dui = "√";
      } else {
        this.dui = "";
      }
    },
    //手机开始
    sj() {
      this.shouji = "";
    },
    bsj() {
      //写正则
      let sj = /^1[3-9]\d{9}$/;
      let state = sj.test(this.inputsj);
      if (state) {
        this.axios
          .get("/login", {
            params: {
              手机号: this.inputsj,
            },
          })
          .then((res) => {
            this.length = res.data.length;
            if (this.length == 0) {
              this.shouji = "手机号格式正确";
              return true;
            } else {
              this.shouji = "手机号已被注册";
              return false;
            }
          });
      } else {
        this.shouji = "手机号格式错误";
        return false;
      }
    },
    //手机结束
    //密码1开始
    mm() {
      this.mima = "";
    },
    bmm() {
      //写正则
      let mm = /^[a-z]+[A-Z]+\d{6,10}$/;
      let state = mm.test(this.inputmm);
      if (state) {
        this.mima = "密码格式正确";
        return true;
      } else {
        this.mima = "密码格式错误";
        return false;
      }
    },
    //密码1结束
    //确认密码开始
    mm2() {
      this.mima2 = "";
    },
    bmm2() {
      if (this.mima == "密码格式正确") {
        if (this.inputmm == this.inputmm2) {
          this.mima2 = "确认密码输入正确";
          return true;
        } else {
          this.mima2 = "两次输入密码不一致";
          return false;
        }
      } else {
      }
    },
    //确认密码结束
    //常用邮箱开始
    yx() {
      this.youxiang = "";
    },
    byx() {
      let yx = this.inputyx.indexOf("@");
      if (yx == "-1") {
        this.youxiang = "邮箱格式错误";
        return false;
      } else {
        this.youxiang = "邮箱格式正确";
        return true;
      }
    },
    //常用邮箱结束
    //QQ号码开始
    qq() {
      this.QQ = "";
    },
    bqq() {
      let qq = /^\d{6,10}$/;
      let state = qq.test(this.inputqq);
      if (state) {
        this.QQ = "QQ格式输入正确";
        return true;
      } else {
        this.QQ = "QQ格式输入错误";
        return false;
      }
    },
    //QQ号码结束
    //验证码开始
    yz() {
      if (this.sjstate) {
      } else {
        this.sjstate = true;
      }
    },
    //触发获取光标事件
    yzm() {
      this.yanzheng = "";
    },
    byzm() {
      if (this.yzmess !== "") {
        if (this.inputyzm == this.yzmess) {
          this.yanzheng = "验证码格式正确";
          return true;
        } else {
          this.yanzheng = "验证码格式错误";
          return false;
        }
      }
    },
    //验证码结束
    zhuce() {
      if (this.dui == "") {
      } else {
        if (this.inputsj == "") {
          this.shouji = "手机号格式错误";
        }
        if (
          //this.bsj() &&
          this.shouji == "手机号格式正确" &&
          this.bmm() &&
          this.bmm2() &&
          this.byx() &&
          this.bqq() &&
          this.byzm()
        ) {
          let avatar = parseInt(Math.random() * 59 + 1);
          this.loginMessage = {
            手机号: this.inputsj,
            密码: this.inputmm,
            邮箱: this.inputyx,
            QQ号: this.inputqq,
            avatar: `lol/${avatar}.png`,
          };
          console.log("成功");
          //添加购物车
          this.axios.post("/store", { message: [] });
          //向数据库发送消息
          this.axios.post("/login", this.loginMessage);
          this.$confirm("是否进入登录页面?", "注册成功", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success ",
          })
            .then(() => {
              this.$router.push("/login");
            })
            .catch(() => {
              this.$router.go(0);
            });
        } else {
          console.log("错误");
          console.log(this.bsj());
        }
      }
    },
  },
  watch: {
    sjstate() {
      if (this.sjstate) {
        let yan = setInterval(() => {
          this.num--;
        }, 1000);
        if (this.num < 0) {
          clearInterval(yan);
          this.num = 60;
        }
      }
    },
    num() {
      if (this.num == 50) {
        let a = parseInt(Math.random() * 10000);
        this.yzmess = a;
        this.$notify.success({
          title: "验证码",
          message: a,
          showClose: false,
        });
      }
      if (this.num < 0) {
        this.sjstate = 60;
        this.sjstate = false;
        if (this.yanzheng == "") {
        } else {
          this.yanzheng = "验证码格式错误";
        }
        this.yzmess = "";
      }
    },
  },
};
</script>
<style>
#enroll {
  width: 77%;
  margin: 0 auto;
  height: 802px;
  background: url("../assets/enroll.jpg")
    no-repeat;
  background-size: 100%;
  position: relative;
}
#enroll .home {
  background-color: rgba(173, 232, 250, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -350px;
  width: 700px;
  height: 500px;
  box-shadow: 0px 0px 10px 1px #05a0d3;
}
input {
  border: 0;
  outline: 0;
  margin-top: 0;
  padding-top: 0;
  height: 26px;
  padding-left: 15px;
}
#enroll .home > ul span {
  background-color: #009ed8;
  height: 26px;
  padding: 0 5px;
  width: 120px;
  text-align: center;
  cursor: pointer;
}
#enroll .xr {
  background-color: #fff;
  width: 20px;
  height: 20px;
  display: block;
  text-align: center;
  color: #f00;
  cursor: pointer;
}
#enroll #unm {
  top: 31px;
  left: 183px;
  background-color: #ff0;
  width: 70px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #f00;
}
</style>
