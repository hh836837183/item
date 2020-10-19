// 引入axios qs
import axios from 'axios'
import Vue from "vue"
import qs from 'qs'
// axios 配置
Vue.prototype.$imgPre = "http://localhost:3000"
let baseUrl = "/api";
axios.interceptors.response.use(res => {
  console.group('=====本次请求的地址是:' + res.config.url);
  console.log(res);
  console.groupEnd();
  return res
})


//---------------------------------------------------------------------------------------------------------------
//菜单
//添加
export const reqMenuAdd = (params) => {
  return axios({
    url: baseUrl + "/api/menuadd",
    method: "post",
    data: qs.stringify(params)
  })
}

//列表
export const reqMenuList = () => {
  return axios({
    url: baseUrl + "/api/menulist",
    method: "get",
    params: {
      istree: true
    }
  })
}
//删除
export const reqMenuDel = (id) => {
  return axios({
    url: baseUrl + "/api/menudelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  })
}

//1条
export const reqMenuDetail = (id) => {
  return axios({
    url: baseUrl + "/api/menuinfo",
    method: "get",
    params: {
      id: id
    }
  })
}

//修改
export const reqMenuUpdate = (params) => {
  return axios({
    url: baseUrl + "/api/menuedit",
    method: "post",
    data: qs.stringify(params)
  })
}

//---------------------------------------------------------------------------------------------------------------
// 2.角色管理
//添加
export const reqroleAdd = (params) => {
  return axios({
    url: baseUrl + "/api/roleadd",
    method: "post",
    data: qs.stringify(params)
  })
}

//角色列表
export const reqroleList = () => {
  return axios({
    url: baseUrl + "/api/rolelist",
    method: "get",
  })
}
//删除
export const reqroleDel = (id) => {
  return axios({
    url: baseUrl + "/api/roledelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  })
}

//1条
export const reqroleDetail = (id) => {
  return axios({
    url: baseUrl + "/api/roleinfo",
    method: "get",
    params: {
      id: id
    }
  })
}

//修改
export const reqroleUpdate = (params) => {
  return axios({
    url: baseUrl + "/api/roleedit",
    method: "post",
    data: qs.stringify(params)
  })
}

//---------------------------------------------------------------------------------------------------------------
// 3.管理员管理
//添加
export const requserAdd = (params) => {
  return axios({
    url: baseUrl + "/api/useradd",
    method: "post",
    data: qs.stringify(params)
  })
}
// 总数
export const requserCount = () => {
  return axios({
    url: baseUrl + "/api/usercount",
  })
}

//角色列表
export const requserList = (params) => {
  return axios({
    url: baseUrl + "/api/userlist",
    method: "get",
    params: params
  })
}
//删除
export const requserDel = (uid) => {
  return axios({
    url: baseUrl + "/api/userdelete",
    method: "post",
    data: qs.stringify({
      uid: uid
    })
  })
}

//1条
export const requserDetail = (uid) => {
  return axios({
    url: baseUrl + "/api/userinfo",
    method: "get",
    params: {
      uid: uid
    }
  })
}

//修改
export const requserUpdate = (params) => {
  return axios({
    url: baseUrl + "/api/useredit",
    method: "post",
    data: qs.stringify(params)
  })
}

//---------------------------------------------------------------------------------------------------------------
//4.商品分类管理***************/
//添加
export const reqcateAdd = (params) => {
  let data = new FormData()
  for (let i in params) {
    data.append(i, params[i])
  }
  return axios({
    url: baseUrl + "/api/cateadd",
    method: "post",
    data: data
  })
}

//列表
export const reqcateList = (params) => {
  return axios({
    url: baseUrl + "/api/catelist",
    method: "get",
    params: params
  })
}
//删除
export const reqcateDel = (id) => {
  return axios({
    url: baseUrl + "/api/catedelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  })
}

//1条
export const reqcateDetail = (id) => {
  return axios({
    url: baseUrl + "/api/cateinfo",
    method: "get",
    params: {
      id: id
    }
  })
}

//修改
export const reqcateUpdate = (params) => {
  let data = new FormData()
  for (let i in params) {
    data.append(i, params[i])
  }
  return axios({
    url: baseUrl + "/api/cateedit",
    method: "post",
    data: data
  })
}

//---------------------------------------------------------------------------------------------------------------
/*********商品规格管理***************/
//添加
export const reqspecsAdd = (params) => {
  return axios({
    url: baseUrl + "/api/specsadd",
    method: "post",
    data: params
  })

}

//管理员总数
export const reqspecsCount = () => {
  return axios({
    url: baseUrl + "/api/specscount",
  })
}

//列表 params={page:1,size:10}
export const reqspecsList = (params) => {
  return axios({
    url: baseUrl + "/api/specslist",
    method: "get",
    params: params
  })
}
//删除
export const reqspecsDel = (id) => {
  return axios({
    url: baseUrl + "/api/specsdelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  })
}

//1条
export const reqspecsDetail = (id) => {
  return axios({
    url: baseUrl + "/api/specsinfo",
    method: "get",
    params: {
      id: id
    }
  })
}

//修改
export const reqspcesUpdate = (params) => {
  return axios({
    url: baseUrl + "/api/specsedit",
    method: "post",
    data: params
  })
}


//7..会员管理/

//列表
export const reqmemberlist = () => {
  return axios({
    url: baseUrl + "/api/memberlist",
  })
}

//一条数据
export const reqmemberDetail = (uid) => {
  return axios({
    url: baseUrl + "/api/memberinfo",
    params: {
      uid: uid
    }
  })
}

//修改
export const reqmemberUpdate = (params) => {
  return axios({
    url: baseUrl + "/api/memberedit",
    method: "post",
    data: qs.stringify(params)
  })
}



//---------------------------------------------------------------------------------------------------------------
// 6商品管理
//添加
export const reqgoodsAdd = (form) => {
  let data = new FormData()
  for (let i in form) {
    data.append(i, form[i])
  }
  return axios({
    url: baseUrl + "/api/goodsadd",
    method: "post",
    data: data
  })
}

// 总数
export const reqgoodsCount = () => {
  return axios({
    url: baseUrl + "/api/goodscount",
  })
}

//角色列表
export const reqgoodsList = (params) => {
  return axios({
    url: baseUrl + "/api/goodslist",
    method: "get",
    params: params
  })
}
//删除
export const reqgoodsDel = (id) => {
  return axios({
    url: baseUrl + "/api/goodsdelete",
    method: "post",
    data: {
      id
    }
  })
}

//1条
export const reqgoodsDetail = (id) => {
  return axios({
    url: baseUrl + "/api/goodsinfo",
    method: "get",
    params: {
      id: id
    }
  })
}

//修改
export const reqgoodsUpdate = (params) => {
  return axios({
    url: baseUrl + "/api/goodsedit",
    method: "post",
    data: qs.stringify(params)
  })
}














//---------------------------------------------------------------------------------------------------------------
//8.轮播图管理***************/
//添加
export const reqbannerAdd = (params) => {
  let data = new FormData()
  for (let i in params) {
    data.append(i, params[i])
  }
  return axios({
    url: baseUrl + "/api/banneradd",
    method: "post",
    data: data
  })
}

//列表
export const reqbannerList = () => {
  return axios({
    url: baseUrl + "/api/bannerlist",
    method: "get",
  })
}
//1条
export const reqbannerDetail = (id) => {
  return axios({
    url: baseUrl + "/api/bannerinfo",
    method: "get",
    params: {
      id: id
    }
  })
}


//修改
export const reqbannerUpdate = (params) => {
  let data = new FormData()
  for (let i in params) {
    data.append(i, params[i])
  }
  return axios({
    url: baseUrl + "/api/banneredit",
    method: "post",
    data: data
  })
}

//删除
export const reqbannerDel = (id) => {
  return axios({
    url: baseUrl + "/api/bannerdelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  })
}









// 9.秒杀
//添加
export const reqseckAdd = (params) => {
  return axios({
    url: baseUrl + "/api/seckadd",
    method: "post",
    data: qs.stringify(params)
  })
}

//列表
export const reqseckList = () => {
  return axios({
    url: baseUrl + "/api/secklist",
    method: "get",
  })
}
//删除
export const reqseckDel = (id) => {
  return axios({
    url: baseUrl + "/api/seckdelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  })
}

//1条
export const reqseckDetail = (id) => {
  return axios({
    url: baseUrl + "/api/seckinfo",
    method: "get",
    params: {
      id: id
    }
  })
}

//修改
export const reqseckUpdate = (params) => {
  return axios({
    url: baseUrl + "/api/seckedit",
    method: "post",
    data: qs.stringify(params)
  })
}






//-------------------管理员登录-=------------
export const reqLogin = (params) => {
  return axios({
    url: baseUrl + "/api/userlogin",
    method: "post",
    data: qs.stringify(params)
  })
}
