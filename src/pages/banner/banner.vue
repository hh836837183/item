<template>
  <div class="menu">
    <div class="bt">
      <el-button type="primary" @click="isshow" >添加</el-button>
    </div>
    <v-list @edit="edit"></v-list>
    <v-add :info="info" ref='add'></v-add>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vAdd from "./components/add";

export default {
  props: [],
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd:true
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    edit(id) {
      this.info.isshow = true;
      this.info.isadd=false
      this.$refs.add.look(id)
    },
    isshow() {
      this.info.isshow = true;
      this.info.isadd=true
    },
  },
  mounted() {},
};
</script>
<style scoped>
.bt {
  padding-bottom: 20px;
}
</style>