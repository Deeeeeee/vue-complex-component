<template>
  <el-button :type="type"
             :size="size"
             :loading="loading"
             @click="handleClick"
             :disabled="disabled">
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: 'ButtonAsync',
  components: {},
  props: {
    /**  onClick接受一个函数 该函数返回一个不带finally()的Promise*/
    onClick: {
      // required: true,
      type: Function
    },
    /** 按钮类型 同el-button */
    type: {
      type: String,
      default: 'primary'
    },
    /** 按钮尺寸 同el-button */
    size: {
      type: String,
      default: 'small'
    },
    /** 按钮是否禁用 同el-button */
    disabled: {
      type: Boolean,
      default: false
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
  methods: {
    /** 点击事件 */
    handleClick() {
      this.loading = true
      try {
        this.onClick().finally(() => {
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

<style lang="scss" scoped>
</style>
