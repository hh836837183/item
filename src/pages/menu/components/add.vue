<template>
  <div class="add">
    <el-dialog :visible.sync="info.isshow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.pid" @change="changetype">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio-group v-model="form.type">
            <el-radio :label="1" disabled>目录</el-radio>
            <el-radio :label="2" disabled>菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单图标" v-if="form.type == 1">
          <el-select v-model="form.icon" placeholder="请选择图标">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-else>
          <el-select v-model="form.url" placeholder="请选择地址">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="'/' + item.path"
            >
            </el-option>
          </el-select>
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
  reqMenuAdd,
  reqMenuDetail,
  reqMenuUpdate,
} from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      icons: [
        "el-icon-s-tools",
        "el-icon-user",
        "el-icon-camera",
        "el-icon-message-solid",
      ],
      // 获取列表数据
      indexRoutes: indexRoutes,
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
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
      reqListAction: "menu/reqListAction",
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
      reqMenuUpdate(this.form).then((res) => {
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
    // 添加数据
    add() {
      reqMenuAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          // 成功弹窗
          this.reqListAction();
          successAlert(res.data.msg);
          // 让弹框消失
          this.info.isshow = false;
          this.empty();
        } else {
          // 失败弹窗
          warningAlert(res.data.msg);
        }
      });
    },
    look(id) {
      reqMenuDetail(id).then((res) => {
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