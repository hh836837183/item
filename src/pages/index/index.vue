<template>
  <el-container class="index">
    <el-aside class="left" width="200px">
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#20222a"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        unique-opened
      >
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <div v-for="item in userInfo.menus" :key="item.id">
          <el-submenu :index="item.id+''" v-if="item.children">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item v-else :index="item.url">{{item.title}}</el-menu-item>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="content">
          <h3 class="username">{{userInfo.username}}</h3>
          <el-button type="danger" @click="out()">退出登录</el-button>
        </div>
      </el-header>
      <el-main class="main">
        <el-breadcrumb v-if="$route.name" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 二级路由出口 -->
        <router-view class="con"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({
      changeUserInfoAction:"changeUserInfoAction"
    }),
    out(){
      this.changeUserInfoAction({});
      this.$router.push("/login")
    }
  },
  mounted() {},
};
</script>
<style scoped>
.username{
  margin-right: 20px;
  font-size: 20px;
  font-weight: 700;
  color: #000;
}
.index {
  height: 100vh;
}
.left {
  background: #20222a;
}
.header {
  background:#ccc;
}
.con {
  padding-top: 20px;
}
.content{
  float: right;
}
.content h3{
  float: left;
  line-height: 60px;
  font-weight: 400;
}
.content .el-button{
  float: left;
  margin-top: 10px;
}
</style>