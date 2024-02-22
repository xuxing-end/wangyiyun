import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home', 
    component: Index
  },
  { //这里是懒加载
    path:"/details/:wid",
    props:true,
    component: () => import(
      /* webpackChunkName: "details" */ 
      '../views/Details.vue')
  },
  {
    path:"/album",
    component:()=>import(
      /* webpackChunkName:"album" */
      '../views/Album.vue')
  },
  {
    path:"/discdetails/:id",
    component:()=>import(
      /* webpackChunkName:"discdetails" */
      '../views/DiscDetails.vue')
  },
  {
    path:"/column",
    component:()=>import(
      /* webpackChunkName:"column" */
      '../views/Column.vue')
  },
  {
    path:"/colright",
    component:()=>import(
      /* webpackChunkName:"column" */
      '../views/Colright.vue')
  },
  {
    path:"/variouskind",
    component:()=>import(
      /*webpackChunkName:"variouskind"*/
      '../views/Variouskind')
  },
  {
    path:"/variouskind2",
    component:()=>import(
      /*webpackChunkName:"variouskind2"*/
      '../views/Variouskind2'
    )
  },
  {
    path:"/credit",
    component:()=>import(
      /*webpackChunkName:"credit"*/
      '../views/Credit'
    )
  },
  {
    path:"/lbdetails/:id",
    component:()=>import(
      /*webpackChunkName:"lbdetails"*/
      '../views/lbdetails'
    )
  },
  {
    path:"/store",
    component:()=>import(
      /*webpackChunkName:"store"*/
      '../views/store'
    )
  },
  {
    path:"/confirm",
    component:()=>import(
      /*webpackChunkName:"store"*/
      '../views/confirm'
    )
  },
  {
    path:"/test",
    component:()=>import(
      /*webpackChunkName:"store"*/
      '../views/test'
    )
  },
  {
    path:"/login",
    component:()=>import(
      /*webpackChunkName:"login"*/
      '../views/login'
    )
  },
  {
    path:"/enroll",
    component:()=>import(
      /*webpackChunkName:"enroll"*/
      '../views/enroll'
    )
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
