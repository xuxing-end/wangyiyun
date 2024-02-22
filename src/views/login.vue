<template>
  <div class="login mt-4 position-relative">
    <div class="home">
      <div class="img">
        <img :src="touxiang" alt="" />
        <p>登录</p>
      </div>
      <el-input
        placeholder="请输入账号/手机号"
        class="input"
        v-model="zhanghao"
        @blur="avatar"
      >
        <i slot="prefix" class="el-input__icon el-icon-user"></i> </el-input
      ><br />
      <el-input
        type="password"
        placeholder="请输入密码"
        class="input mt-3"
        v-model="mima"
      >
        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
      </el-input>
      <el-button
        type="primary"
        size="medium"
        class="w-100 mt-5 mb-2"
        @click="log"
        >登录</el-button
      >
      <a href="#">忘记密码？</a>
      <router-link to="/enroll">账号注册</router-link>
    </div>
    <el-button class="d-none" type="primary"> </el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      zhanghao: "",
      mima: "",
      touxiang: "tu/108.jpg",
    };
  },
  methods: {
    avatar() {
      this.axios
        .get("/login", {
          params: {
            手机号: this.zhanghao,
          },
        })
        .then((res) => {
          if (res.data.length == 0) {
            this.touxiang = "tu/108.jpg";
          } else {
            this.touxiang = res.data[0].avatar;
          }
        });
    },
    log() {
      this.axios
        .get("/login", {
          params: {
            手机号: this.zhanghao,
            密码: this.mima,
          },
        })
        .then((res) => {
          let length = res.data.length;
          if (length == 0) {
            this.$alert("账号或密码输入错误", "安全提示", {
              confirmButtonText: "确定",
            });
          } else {
            // token存储
            this.Cookies.remove("Authorization")
            this.Cookies.set("Authorization",'token123456789')
            const loading = this.$loading({
              lock: true,
              text: "登陆成功!正在加载首页...",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)",
            });
            setTimeout(() => {
              loading.close();
              this.$router.push("/");
              this.$router.go(0)
            }, 2000);
            this.$store.commit("updateState", 1);
            window.localStorage.setItem("avatar", res.data[0].avatar);
            window.localStorage.setItem("id", res.data[0].id);
          }
        });
    },
  },
};
</script>
<style>
.login {
  width: 77%;
  margin: 0 auto;
  background: url("../assets/login.jpg")
    no-repeat;
  background-size: 100%;
  height: 722px;
}
.login .img {
  text-align: center;
  margin-bottom: 30px;
}
.login .img > img {
  width: 15%;
  border-radius: 50%;
}
.login .img > p {
  color: #999;
}
.login .home {
  position: absolute;
  width: 400px;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -200px;
}
</style>
