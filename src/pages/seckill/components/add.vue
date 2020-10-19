<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加管理员' : '编辑管理员'"
      :visible.sync="info.isshow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="开始日期"
              v-model="form.begintime"
              style="width: 100%"
              value-format="timestamp"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              type="fixed-time"
              placeholder="结束日期"
              v-model="form.endtime"
              style="width: 100%"
              value-format="timestamp"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="一级分类">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择上级菜单"
            @change="changeFirst"
          >
            <el-option label="请选择" disabled value=""></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" placeholder="请选择上级菜单">
            <el-option label="请选择" disabled value=""></el-option>
            <el-option
              v-for="item in second"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品">
          <el-select v-model="form.goodsid" placeholder="请选择上级菜单">
            <el-option label="请选择" disabled value=""></el-option>
            <el-option
              v-for="item in second"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
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
  reqseckAdd,
  reqseckDetail,
  reqseckUpdate,
  reqcateList,
} from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      second: [],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqcateListAction: "cate/reqListAction",
      reqListAction: "seck/reqListAction",
    }),
    changeFirst() {
      this.getSecondList();
    },
    getSecondList() {
      reqcateList({ pid: this.form.first_cateid }).then((res) => {
        //二级分类list
        this.second = res.data.list;
      });
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
      reqseckDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id =id;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    empty() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
    },
    updata() {
      reqseckUpdate(this.form).then((res) => {
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
    add() {
      console.log(this.form.first_cateid);
      reqseckAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.info.isshow = false;
          successAlert(res.data.msg);
          this.reqListAction();
          this.empty();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.cateList.length == 0) {
      this.reqListAction();
    }
    this.reqcateListAction();
  },
};
</script>
<style scoped>
</style>