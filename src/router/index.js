import {
  TabPane
} from 'element-ui'
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)

function checkedEnter(path, next) {
  let menus_url = store.state.userInfo.menus_url;
  if (menus_url.includes(path)) {
    next()
  } else {
    next("/")
  }
};

Vue.use(Router)
export let indexRoutes = [{
    path: "menu",
    name: "菜单管理",
    component: () => import("../pages/menu/menu.vue"),
    beforeEnter(to, from, next) {
      checkedEnter('/menu', next)
    }
  },
  {
    path: "role",
    name: "角色管理",
    component: () => import("../pages/role/role.vue"),
    beforeEnter(to, from, next) {
      checkedEnter('/role', next)
    }
  },
  {
    path: "manage",
    name: "管理员管理",
    component: () => import("../pages/manage/manage.vue"),
    beforeEnter(to, from, next) {
      checkedEnter('/manage', next)
    }
  },
  {
    path: "cate",
    name: "商品分类",
    component: () => import("../pages/cate/cate.vue"),
    beforeEnter(to, from, next) {
      checkedEnter('/cate', next)
    }
  },
  {
    path: "specs",
    name: "商品规格",
    component: () => import("../pages/specs/specs.vue"),
    beforeEnter(to, from, next) {
      checkedEnter('/specs', next)
    }
  },
  {
    path: "goods",
    name: "商品管理",
    component: () => import("../pages/goods/goods.vue"),
    beforeEnter(to, from, next) {
      checkedEnter('/goods', next)
    }
  },
  {
    path: "member",
    name: "会员管理",
    component: () => import("../pages/member/member"),
    beforeEnter(to, from, next) {
      checkedEnter('/member', next)
    }
  },
  {
    path: "banner",
    name: "轮播图管理",
    component: () => import("../pages/banner/banner.vue"),
    beforeEnter(to, from, next) {
      checkedEnter('/banner', next)
    }
  },
  {
    path: "seckill",
    name: "秒杀活动",
    component: () => import("../pages/seckill/seckill.vue"),
    beforeEnter(to, from, next) {
      checkedEnter('/seckill', next)
    }
  },
  {
    path: "home",
    name: "主页",
    component: () => import("../pages/home/home.vue"),
    beforeEnter(to, from, next) {
      checkedEnter('/home', next)
    }
  }
]
let router = new Router({
  routes: [{
      path: "/login",
      component: () => import("../pages/login/login.vue")
    },
    {
      path: "/",
      component: () => import("../pages/index/index.vue"),
      children: [{
          path: "",
          component: () => import("../pages/home/home.vue"),
        },
        ...indexRoutes
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next();
    return;
  }
  if (store.state.userInfo.token) {
    next();
    return;
  }

  next('/login')

})

export default router
