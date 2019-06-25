<template>
  <el-button v-bind="$attrs"
             :loading="loading"
             v-on="$listeners"
             @click="handleClick">
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: 'BaseButton',
  components: {},
  props: {},
  data() {
    return {
      loading: false
    }
  },
  watch: {},
  computed: {},
  created() {},
  methods: {
    /** 点击事件 */
    handleClick() {
      this.loading = true
      try {
        this.$listeners.click.fns().finally(() => {
          this.loading = false
        })
      } catch (err) {
        console.warn(err)
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
</style>
