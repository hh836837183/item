<template>
  <div class="role">
    <el-button type="primary" @click="isshow">添加</el-button>
    <v-list @edit="edit"> </v-list>
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  props: [],
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    isshow() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    edit(uid) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.add.look(uid);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>