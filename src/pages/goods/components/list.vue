<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="商品编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" sortable width="180">
      </el-table-column>
      <el-table-column
        prop="market_price"
        label="市场价格"
        sortable
        width="180"
      >
      </el-table-column>
      <el-table-column prop="img" label="图片" sortable width="180">
        <template slot-scope="scope">
          <img :src="$imgPre + scope.row.img" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否新品">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isnew == 1" type="primary"  class="bt1">是</el-button>
          <el-button v-else type="info"  class="bt1">否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否热卖">
        <template slot-scope="scope">
          <el-button v-if="scope.row.ishot == 1" type="primary" class="bt1"
            >是</el-button
          >
          <el-button v-else type="info" class="bt1">否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary"
             >启用</el-button
          >
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqgoodsDel } from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      size: "goods/size",
      total: "goods/total",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "goods/reqListAction",
      reqTotalAction: "goods/reqTotalAction",
      changePageAction: "goods/changePageAction",
    }),
    edit(id) {
      console.log(id);
      this.$emit("edit", id);
    },
    changePage(e) {
      this.changePageAction(e);
    },

    del(id) {
      console.log(id);
      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqgoodsDel(id).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.reqListAction();
              this.reqTotalAction();
            } else {
              warningAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    //获取的list
    this.reqListAction();
    //获取list的总数
    this.reqTotalAction();
  },
};
</script>
<style scoped>

 img{
   width: 50px;
   height: 50px;
 }
</style>