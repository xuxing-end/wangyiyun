<template>
  <div class="mt-5" id="tou">
    <div id="bod">
      <ul id="a1">
        <li v-for="(t, i) of foot[0].footer.text" :key="i">
          <a href="#">{{ t }}</a>
        </li>
      </ul>
      <p>{{ foot[0].footer.text1_1 }}</p>
      <span
        ><a href="#">{{ foot[0].footer.text1_2 }}</a></span
      ><br />
      <p>{{ foot[0].footer.text2_1 }}</p>
      <span
        ><a href="#">{{ foot[0].footer.text2_2 }}</a></span
      ><br />
      <p>
        <a href="#">{{ foot[0].footer.text3_1 }}</a>
      </p>
      <span
        ><a href="#">{{ foot[0].footer.text3_2 }}</a></span
      >
      <span
        ><a href="#">{{ foot[0].footer.text3_3 }}</a></span
      >
      <span>{{ foot[0].footer.text3_4 }}</span>
      <span
        ><a href="#">&nbsp;{{ foot[0].footer.text3_5 }}</a></span
      ><br />
      <p>{{ foot[0].footer.text4_1 }}</p>
      <span
        ><a href="#">{{ foot[0].footer.text4_2 }}</a></span
      >
      <!--右侧固定定位图开始-->
      <ul id="f1" :style="f1style">
        <li>
          <a href="#">{{ foot[0].footer.fixed1 }}</a>
        </li>
        <li>{{ foot[0].footer.fixed2 }}</li>
        <li>
          <a href="#">{{ foot[0].footer.fixed3 }}</a>
        </li>
        <li class="carts" @click="store">
          <div>
            <img :src="foot[0].footer.fixed4_1" style="width:80%" />{{
              foot[0].footer.fixed4_2
            }}
            <div>{{ length == undefined ? update : length }}</div>
          </div>
        </li>
        <li>
          <a href="#"
            ><img :src="foot[0].footer.fixed5_1" class="w-75" />{{
              foot[0].footer.fixed5_2
            }}</a
          >
        </li>
        <li>
          <div>&lt;</div>
          T&nbsp;O&nbsp;P
        </li>
      </ul>
      <!--右侧固定定位图结束-->
    </div>
  </div>
</template>
<script>
export default {
  props: ["length"],
  data() {
    return {
      foot: [{ footer: {} }],
      f1style: {
        top: "20%",
      },
      update: "",
      id: "",
    };
  },
  mounted() {
    if(this.$route.fullPath=="/"){
      this.f1style = { top: "80%" };
    }
    this.id = localStorage.getItem("id");
    this.axios
      .get("/store", {
        params: {
          id: localStorage.getItem("id"),
        },
      })
      .then((result) => {
        if (localStorage.getItem("state") == 0) {
          this.update = 0;
        } else {
          // console.log(localStorage.getItem("id"));
          // console.log(result.data[0].message);
          let arr = result.data[0].message;
          this.update = arr.reduce((tot, item) => {
            return tot + item.value;
          }, 0);
        }
      });
    console.log(length, typeof this.length);
    this.axios.get("/foot").then((result) => {
      this.foot = result.data;
    });
  },
  methods: {
    store() {
      let state = localStorage.getItem("state");
      if (state == 1) {
        this.$router.push("/store");
      } else {
        this.$alert("请先进行登录", "消息提示", {
          confirmButtonText: "确定",
        });
      }
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 278) {
        this.f1style = { top: "20%" };
      } else {
        this.f1style = { top: "80%" };
      }
    },
  },
};
</script>
<style scoped>
#tou {
  width: 100%;
  background-color: #e8e8e8;
}
#bod {
  width: 80%;
  background-color: #e8e8e8;
  margin: 0 auto;
  padding-top: 2rem;
  padding-bottom: 2rem;
  color: #666;
}
#a1 {
  list-style: none;
  color: #999;
  display: flex !important;
  padding: 0;
  margin-bottom: 5px;
  margin-left: 0;
  width: 50%;
}
#a1 a {
  color: #999;
  text-decoration: none;
}
#a1 li + li::before {
  content: "|";
  margin: 10px;
}
body a {
  color: #666;
  text-decoration: none;
}
body p {
  display: inline-block;
  margin-top: 5px;
  margin-bottom: 5px;
}
#f1 {
  list-style: none;
  border: 1px solid #000;
  position: fixed;
  right: 10px;
  background-color: #fff;
  width: 80px;
  padding-left: 0px;
  z-index: 10;
}
#f1 {
  color: #000;
  text-decoration: none;
}
#f1 li {
  padding: 10px;
  text-align: center;
}
#f1 li + li {
  border-top: 1px solid #999;
}
#f1 > li:last-child {
  background-color: #000;
  padding: 0;
  color: #fff;
  font-size: 19px;
}
#f1 > li:last-child div {
  transform: rotate(90deg);
  font-size: 30px;
  height: 15px;
  width: 100%;
  margin-left: 15px;
}
#f1 .carts {
  cursor: pointer;
  position: relative;
}
#f1 .carts > div {
  height: 65px;
}
#f1 .carts > div > div {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  line-height: 20px;
  color: #fff;
  right: 12%;
  text-align: center;
  position: absolute;
  background-color: #e62225;
  top: 3px;
}
</style>
