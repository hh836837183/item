<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加管理员' : '编辑管理员'"
      :visible.sync="info.isshow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid" placeholder="请选择上级菜单">
            <el-option label="请选择" disabled value=""></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
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
          >添 加</el-button
        >
        <el-button type="primary" @click="updata" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { warningAlert, successAlert } from "../../../utils/alert";
import {
  requserAdd,
  requserDetail,
  requserUpdate,
} from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      reqRoleListAction: "role/reqListAction",
      reqManageList: "user/reqListAction",
      reqTotalAction: "user/reqTotalAction",
    }),
    cls() {
      this.info.isshow = false;
      this.ls();
    },
    ls() {
      if (!this.info.isadd) {
        this.empty();
      }
    },
    look(uid) {
      requserDetail(uid).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.password = "";
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    updata() {
      requserUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.isshow = false;
          this.reqManageList();
          this.empty();
        } else {
          // 失败弹窗
          warningAlert(res.data.msg);
        }
      });
    },
    add() {
      console.log(this.form);
      requserAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.info.isshow = false;
          successAlert(res.data.msg);
          this.reqManageList();
          this.empty();
          this.reqTotalAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.roleList.length == 0) {
      this.reqRoleListAction();
    }
  },
};
</script>
<style scoped>
</style>