<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加管理员' : '编辑管理员'"
      :visible.sync="info.isshow"
      @opened="opened"
    >
      <el-form ref="form" :model="form" label-width="80px">
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
        <el-form-item label="二级菜单">
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
        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
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
        <el-form-item label="商品规格">
          <el-select
            v-model="form.specsid"
            placeholder="请选择上级菜单"
            @change="changeSpecs"
          >
            <el-option label="请选择" disabled value=""></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性">
          <el-select v-model="form.specsattr" placeholder="" multiple>
            <el-option label="请选择" disabled value=""></el-option>
            <el-option
              v-for="item in goodsAttrList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品">
          <el-radio-group v-model="form.isnew">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-radio-group v-model="form.ishot">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="商品描述">
          <!-- <textarea v-model="form.description" cols="30" rows="10"></textarea> -->
          <!-- 富文本 -->
          <div v-if="info.isshow" id="editor"></div>
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
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
import { warningAlert, successAlert } from "../../../utils/alert";
import {
  reqcateList,
  reqgoodsAdd,
  reqgoodsDetail,
  reqgoodsUpdate,
  reqspecsList,
} from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      // cateList:[{rolename:1},{rolename:2}],
      imgUrl: "",
      second: [],
      goodsAttrList: [],
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 1,
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specsList: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      reqcateList: "cate/reqListAction",
      reqListAction: "goods/reqListAction",
      reqTotalAction: "goods/reqTotalAction",
      reqSpecsList: "specs/reqListAction",
    }),
    opened() {
      //富文本
      this.editor = new E("#editor");
      this.editor.create();
      //编辑器创建完成以后再赋值
      this.editor.txt.html(this.form.description);
    },
    // 获取二级分类
    changeFirst() {
      this.form.second_cateid = "";
      this.getSecondList();
    },
    getSecondList() {
      reqcateList({ pid: this.form.first_cateid }).then((res) => {
        //二级分类list
        this.second = res.data.list;
      });
    },
//获取属性内容
    changeSpecs() {
      this.form.specsattr = "";
      this.getAttrsArr();
    },
    getAttrsArr() {
      //属性
      let obj = this.specsList.find((item) => item.id == this.form.specsid);
      console.log(obj.attrs);
      this.goodsAttrList = obj.attrs;
    },
    getFile2(e) {
      let file = e.raw;
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
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
      reqgoodsDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.getSecondList();
          this.imgUrl = this.$imgPre + this.form.img;
          this.form.specsattr = JSON.parse(this.form.specsattr);
          this.getAttrsArr();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], 
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.secondCateLis = [];
      this.imgUrl = "";
      this.goodsAttrList = [];
    },
    updata() {
      console.log(1);
      this.form.description = this.editor.txt.html();
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      reqgoodsUpdate(data).then((res) => {
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
    add() {
      this.form.description = this.editor.txt.html();
      let data = {
        ...this.form,
      };
      console.log(data);
      reqgoodsAdd(data).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.info.isshow = false;
          this.reqListAction();
          this.reqTotalAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.cateList.length == 0) {
      this.reqcateList();
    }
    this.reqSpecsList(true);
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