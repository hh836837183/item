<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加管理员' : '编辑管理员'"
      :visible.sync="info.isshow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <div class="content" v-for="(item, index) in attr" :key="index">
          <el-form-item label="规格属性" class="left">
            <el-input v-model="item.value"></el-input>
          </el-form-item>
          <el-button
            class="right"
            type="primary"
            v-if="index == 0"
            @click="addattr"
            >新增规格属性</el-button
          >
          <el-button class="right" @click="delattr(index)" type="danger" v-else>
            删除</el-button
          >
        </div>
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
  reqspecsAdd,
  reqspecsDetail,
  reqspcesUpdate,
} from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      attr: [{ value: 1 }, { value: 2 }],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqListAction: "specs/reqListAction",
      reqTotalAction: "specs/reqTotalAction",
    }),
    addattr() {
      this.attr.push({ value: "" });
    },
    delattr(index) {
      this.attr.splice(index, 1);
    },
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
      reqspecsDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list[0];
          this.attr = JSON.parse(this.form.attrs).map((item) => ({
            value: item,
          }));
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    empty() {
      this.attr = [{ value: "" }, { value: "" }];
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
    },
    updata() {
      if (!this.checkedData()) {
        return;
      }
      console.log(this.form);
      this.form.attrs = JSON.stringify(this.attr.map((item) => item.value));
      reqspcesUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    checkedData() {
      //验证规格名称
      if (this.form.specsname == "") {
        warningAlert("规格名称不能为空");
        return false;
      }

      //验证每一个属性值都不能为空
      if (this.attr.some((item) => item.value == "")) {
        warningAlert("所有的属性值都必填");
        return false;
      }
      return true;
    },
    add() {
      if (!this.checkedData()) {
        return;
      }
      this.form.attrs = JSON.stringify(this.attr.map((item) => item.value));
      reqspecsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.info.isshow = false;
          successAlert(res.data.msg);
          console.log(this.form);
          this.empty();
          this.reqListAction();
          this.reqTotalAction();
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
.content {
  display: flex;
  margin-bottom: 20px;
  height: 40px;
}
.left {
  width: 600px;
}
.right {
  flex: 1;
}
</style>