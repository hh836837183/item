<template>
  <div class="add">
    <el-dialog :visible.sync="info.isshow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
          留空则不修改
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cls">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd"
          >添加</el-button
        >
        <el-button type="primary" @click="updata" v-else>编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { warningAlert, successAlert } from "../../../utils/alert";
import { indexRoutes } from "../../../router/index";
import {
  reqmemberUpdate,
  reqmemberDetail,
} from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form:{
         uid: 0,
        nickname: "",
        phone: "",
        password: 1,
        url: "",
        status: 1,
      }
    };
  },
  computed: {
    ...mapGetters({
      list: "member/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "member/reqListAction",
    }),
    cls() {
      this.info.isshow = false;
      if (!this.info.isadd) {
        this.empty();
      }
    },
    // 显示和影藏表单
    isshow() {
      this.info.isshow = false;
    },
    updata() {
      reqmemberUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.isshow = false;
          this.reqListAction();
          this.empty();
        } else {
          // 失败弹窗
          warningAlert(res.data.msg);
        }
      });
    },
 
    look(id) {
      reqmemberDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 清空表单
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    // 更加顶级菜单修改菜单目录
    changetype() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
  },
  mounted() {
    this.reqListAction();
  },
};
</script>
<style scoped>
.add {
  width: 500px;
}
</style>