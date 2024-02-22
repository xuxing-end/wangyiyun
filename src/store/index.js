import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    indexState:0,
    shopping:[],
    title:"网易云音乐"
  },
  mutations: {
    updateState(state,num){
      state.indexState=num
      localStorage.setItem('state',state.indexState)
      console.log(state.indexState)
    },
    vxmessage(state,num){
      state.shopping=[1,2,5]
      console.log(num)
    },
    setTitle(state,title){
        state.title = title
    }
  },
  actions: {
      aSetTitle(context,title){
          context.commit('setTitle',title)
      }
  },
  modules: {
  }
})
