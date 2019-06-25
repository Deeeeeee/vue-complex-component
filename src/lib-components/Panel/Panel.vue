<template>
  <div class="base-panel">
    <div class="base-panel-head">
      <span v-if="title">{{title}}</span>
      <slot v-else
            name="head"></slot>
    </div>
    <div class="base-panel-body">
      <slot></slot>
    </div>
    <div class="base-panel-foot">
      <slot name="foot"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasePanel',
  components: {},
  props: {
    /** 标题 */
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false
    }
  },
  watch: {},
  computed: {},
  created() {},
  methods: {}
}
</script>

<style scoped>
.base-panel {
  border: 1px solid #ececec;
}
.base-panel-head {
  padding: 0 20px;
  border-bottom: 1px solid #ececec;
  height: 60px;
  line-height: 60px;
  font-size: 18px;
}
.base-panel-body {
  padding: 20px;
}
.base-panel-foot {
  padding: 0 20px;
}
</style>
