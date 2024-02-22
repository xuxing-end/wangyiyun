<template>
  <div id="tou" :style="bgco[index]">
    <div id="original">
      <ul id="list">
        <li v-for="(t,i) of imgs" :key="i" :style="i==index ? active : noactive">
          <router-link :to="`/lbdetails/${i+1}`">
            <img :src="t.img">
          </router-link>
        </li>
      </ul>
      <button @click="change(-1)" class="btn">&lt;</button>
      <button @click="change(+1)" class="btn" id="goNext">&gt;</button>
      <ul id="stop">
        <li @click="stoped(i)" v-for="i of imgs.length" :key="i" :style="i-1==index ? stopd :nostopd"></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      imgs:[],
      //用index来跟下边判断，下边与index值相符合，则给他正确的样式用三木进行判断就行，之后工作就好做了，左右的东西都围绕着index的值进行变换就行了
      index:0,
      //让li进行样式判断选择，给被选中的层级+1
      active:{"z-index":1},
      noactive:{"z-index":0},
      //为定时器做准备，防止秒换
      time:0,
      stopd:{'background-color':'red','width':15+'px','height':15+'px'},
      nostopd:{'background-color':'#fff','margin-top':3+'px'},
      bgco:[
        {'background-color':"#A62249"},
        {'background-color':"#CB2820"},
        {'background-color':"#730101"},
        {'background-color':"#1E1E1E"},
        {'background-color':"#92E2D9"},
        {'background-color':"#FEC7DA"}
      ]
    }
  },
  methods:{
    change(n){
      this.index+=n;
      //每调用一次change函数time清除0，当time为20的时候再回执行定时器函数，防止快速切屏
      this.time=0
      if(this.index>this.imgs.length-1){
        this.index=0
      }else if(this.index<0){
        this.index=this.imgs.length-1
      }
    },
    stoped(i){
      this.index=i-1
      this.time=0
    }
  },
  mounted(){
      setInterval(() => {
        this.time++
        if(this.time>20){   
           this.index++
           this.time=0
          if(this.index>this.imgs.length-1){
            this.index=0
          }
        } 
      },100);
      this.axios.get('/lunbo',).then(result=>{
         this.imgs=result.data
         console.log(this.imgs)
      })
  }
}
</script>
<style scoped>
@import '../assets/lunbo.css';
</style>