<template>
  <div class="add">
    <el-dialog :visible.sync="info.isshow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级菜单">
          <el-select v-model="form.pid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <div class="imgbox">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-change="getFile2"
            >
              <img v-if="imgUrl" :src="imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
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
import {
  reqcateAdd,
  reqcateDetail,
  reqcateUpdate,
} from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imgUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "cate/reqListAction",
    }),
    cls() {
      this.info.isshow = false;
      if (!this.info.isadd) {
        this.empty();
      }
    },
    getFile2(e) {
      let file = e.raw;
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    // 显示和影藏表单
    isshow() {
      this.info.isshow = false;
    },
    updata() {
      reqcateUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.isshow = false;
          this.reqListAction();
          this.empty();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 添加数据
    add() {
      reqcateAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.reqListAction();
          successAlert(res.data.msg);
          this.info.isshow = false;
          this.empty();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    look(id) {
      reqcateDetail(id).then((res) => {
        console.log(id);
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.imgUrl = this.$imgPre + this.form.img;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //清空
    empty() {
       this.imgUrl="",
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
    },
  },
  mounted() {
    this.reqListAction();
  },
};
</script>
<style scoped>
.imgbox {
  width: 150px;
  height: 150px;
  border: 1px solid #ccc;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
  /*  */
}
</style>