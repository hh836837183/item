<template>
  <div class="menu">
    <div class="bt">
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
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    edit(uid) {
      this.info.isshow = true;
      this.$refs.add.look(uid)
    },
    isshow() {
      this.info.isshow = true;
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