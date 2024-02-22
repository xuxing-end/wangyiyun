<template>
  <div class="test">
    <h1 style="background-color: #000;">我是亮亮</h1>
    <h1 style="background-color: #f00;">我是然然</h1>
    <h1 style="background-color: #580;">我是东东</h1>
    <h1 style="background-color: #351;">我是铭铭</h1>
    <h1 style="background-color: #859;">我是鑫鑫</h1>
    <ul>
      <li v-for="(t, i) of listName" :key="i" :style="i==id ? {color:'#ff0'} : '{}'">{{ t }}</li>
    </ul>
    <a href="#" @click="top">返回顶部</a>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      id: 0,
      listName: ["亮亮", "然然", "东东", "铭铭", "鑫鑫"], //滚动的列表
    };
  },
  methods: {
    top(){
      this.id=0
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      console.log(scrollTop)
      if (scrollTop > 0 && scrollTop < 700) {
        this.id = 0
      } else if(scrollTop > 700 && scrollTop < 1500) {
        this.id = 1
      } else if(scrollTop > 1500 && scrollTop < 2300){
        this.id = 2
      } else if(scrollTop > 2300 && scrollTop < 3125){
        this.id = 3
      } else if(scrollTop > 3125){
        this.id = 4
      }
    },
  },
  mounted(){
    window.addEventListener("scroll",this.handleScroll)
  }
};
</script>
<style scoped>
 .test>h1{
   width: 100%;
   height: 800px;
   text-align: center;
   color: #fff;
   line-height: 800px;
 }
 .test>ul{
   position: fixed;
   top: 40%;
   color: #fff;
   list-style: none;
 }
</style>