import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import {
  state,
  getters,
  mutations
} from "./mutatuins"
import {
  actions
} from "./acions"
import menu from "./modules/menu"
import role from "./modules/role"
import user from "./modules/user"
import member from "./modules/member"
import cate from "./modules/cate"
import specs from "./modules/specs"
import banner from "./modules/banner"
import goods from "./modules/goods"
import seck from "./modules/seck"



export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    menu,
    role,
    user,
    member,
    cate,
    specs,
    banner,
    goods,
    seck
  }
})
