<template>
  <div class="lbdetails">
    <div>
      <div v-if="id==1">
        <img src="https://p1.music.126.net/3f678b3961910eb2227325fc66655f91.jpg?imageView&thumbnail=625x0&quality=80&tostatic=0&interlace=0&type=webp">
        <div id="first1_1" class=" position-relative">
          <img src="https://p1.music.126.net/db8c73e2b9112a668315274007491d15.jpg?imageView&thumbnail=625x0&quality=80&tostatic=0&interlace=0&type=webp">
          <div class="position-absolute"></div>
        </div>
        <div id="first1_2" class=" position-relative">
          <img src="https://p1.music.126.net/b7cd85b83ded9cd7d65d25970d59a10d.jpg?imageView&thumbnail=625x0&quality=80&tostatic=0&interlace=0&type=webp">
          <div class="position-absolute"></div>
        </div>
        <div id="first1_3" class=" position-relative">
          <img src="https://p1.music.126.net/0a65598301ed1289a2bf1524964aeff3.jpg?imageView&thumbnail=625x0&quality=80&tostatic=0&interlace=0&type=webp">
          <div class="position-absolute"></div>
          <p class="position-absolute"></p>
          <p class="position-absolute"></p>
        </div>
      </div>
      <div v-else-if="id==2">
        <img src="https://p1.music.126.net/3645325f4e00115ab06cbf62858238a0.jpg?imageView&thumbnail=625x0&quality=80&tostatic=0&interlace=0&type=webp">
        <div id="first2_1" class=" position-relative">
          <img src="https://p1.music.126.net/ef0335bf47502bd29188ca0f1986efbb.jpg?imageView&thumbnail=625x0&quality=80&tostatic=0&interlace=0&type=webp">
          <p class="position-absolute"><span></span></p>
          <p class="position-absolute"><span></span></p>
          <p class="position-absolute"><span></span></p>
        </div>
        <img src="https://p1.music.126.net/737748ede6ca9ef7f27d4fbad73b3caa.jpg?imageView&thumbnail=625x0&quality=80&tostatic=0&interlace=0&type=webp">
        <div id="first2_2" class=" position-relative">
          <img src="https://p1.music.126.net/33408aa17e337f2479ad1876f99d9b0c.jpg?imageView&thumbnail=625x0&quality=80&tostatic=0&interlace=0&type=webp">
          <router-link to="/" class="position-absolute"></router-link>
        </div>
        <img src="https://p1.music.126.net/ffe1b464ef6a970cb9ca9364c20ca0a3.jpg?imageView&thumbnail=625x0&quality=80&tostatic=0&interlace=0&type=webp">
      </div>
    </div>
  </div>
</template>
<script>
 
export default {
  data(){
    return{
      id:""
    }
  },
  mounted(){
    let id=this.$route.params.id
    this.id=id
  }
}
</script>
<style scoped>
  .lbdetails>div:first-child{
    width: 41.8%;
    margin: 0 auto;
  }
  .lbdetails #first1_1>div{
    width: 512px;
    height: 462px;
    top:240px;
    left: 51px;
    cursor: pointer;
    background-color: #000;
    opacity: .5;
  }
  .lbdetails #first1_2>div{
    width: 501px;
    height: 433px;
    top:270px;
    left: 62px;
    cursor: pointer;
    background-color: #f00;
    opacity: .5;
  }
  .lbdetails #first1_3>div{
    width: 501px;
    height: 440px;
    top:232px;
    left: 63px;
    cursor: pointer;
    background-color: #ff0;
    opacity: .5;
  }
  .lbdetails #first1_3>p:nth-child(3){
    width: 282px;
    height: 188px;
    top:746px;
    left: 35px;
    cursor: pointer;
    background-color: #ff0;
    opacity: .5;
  }
  .lbdetails #first1_3>p:nth-child(4){
    width: 269px;
    height: 188px;
    top:746px;
    left: 332px;
    cursor: pointer;
    background-color: #ff0;
    opacity: .5;
  }
  .lbdetails #first2_1>p:nth-child(2){
    width: 166px;
    height: 229px;
    top:116px;
    left: 44px;
    cursor: pointer;
    background-color: #000;
    opacity: .8;
  }
  .lbdetails #first2_1>p:nth-child(3){
    width: 166px;
    height: 229px;
    top:116px;
    left: 229px;
    cursor: pointer;
    background-color: #000;
    opacity: .8;
  }
  .lbdetails #first2_1>p:nth-child(4){
    width: 166px;
    height: 229px;
    top:116px;
    left: 414px;
    cursor: pointer;
    background-color: #000;
    opacity: .8;
  }
  .lbdetails #first2_1 span{
    display: block;
    width: 100px;
    height:100px;
    border-radius: 50%;
    background-color: #f00;
    margin-top:50%;
    margin-left:18%;
  }
  .lbdetails #first2_2>a:nth-child(2){
    display: block;
    width: 554px;
    height: 303px;
    top:20px;
    left: 35px;
    cursor: pointer;
    background-color: #f00;
    opacity: .8;
  }
</style>