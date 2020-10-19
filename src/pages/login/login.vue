<template>
  <div class="login">
    <div class="big">
      <h3 class="center">登录</h3>
      <el-input
        class="mt"
        v-model="form.username"
        placeholder="请输入账号"
        clearable
      ></el-input>
      <el-input
        v-model="form.password"
        placeholder="请输入密码"
        show-password
        class="mt"
        clearable
      ></el-input>
      <div class="center">
        <el-button type="primary" class="mt" @click="login"
          >成功按钮</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqLogin } from "../../utils/request";
import { warningAlert, successAlert } from "../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      changeUserInfoAction:'changeUserInfoAction'
    }),
    login() {
      reqLogin(this.form).then((res) => {
        if (res.data.code == 200) {
          //登录成功
          successAlert("登录成功");
          // res.data.list  用户信息 存起来，供很多组件使用
          this.changeUserInfoAction(res.data.list);
          console.log(this.$store);
              // 跳转页面
          this.$router.push("/");
         } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553443, #303d60);
  position: relative;
}
h3 {
  font-size: 30px;
  font-weight: 700;
}
.center {
  text-align: center;
}
.mt {
  margin-top: 20px;
}
.big {
  width: 400px;
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 20px;
}
</style>