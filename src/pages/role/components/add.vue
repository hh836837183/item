<template>
  <div>
    <el-dialog title="角色添加" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="角色名字">
            <el-input v-model="form.rolename"></el-input>
          </el-form-item>
          <!-- 树形结构 -->
          <el-form-item label="角色权限">
            <el-tree
              ref="tree"
              :data="list"
              show-checkbox
              node-key="id"
              :props="{ children: 'children', label: 'title' }"
            >
            </el-tree>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              v-model="form.status"
              :active-value="1"
              :inactive-value="2"
            ></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="add" v-if="info.isadd"
              >添加</el-button
            >
            <el-button type="primary" @click="updata" v-else>修改</el-button>
            <el-button @click="cls">取消</el-button>
          </el-form-item>
        </el-form>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { warningAlert, successAlert } from "../../../utils/alert";
import {
  reqroleAdd,
  reqroleList,
  reqroleDetail,
  reqroleUpdate,
} from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus: "[]",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqMenuListAction: "menu/reqListAction",
      reqRoleList: "role/reqListAction",
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
    look(id) {
      reqroleDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    empty() {
      this.form = {
        rolename: "",
        menus: "[]",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    updata() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqroleUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.isshow = false;
          this.reqRoleList();
          this.empty();
        } else {
          // 失败弹窗
          warningAlert(res.data.msg);
        }
      });
    },
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqroleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.info.isshow = false;
          successAlert(res.data.msg);
          this.reqRoleList();
          this.empty();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.list.length == 0) {
      this.reqMenuListAction();
    }
  },
};
</script>
<style scoped>




</style>