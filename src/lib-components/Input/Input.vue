<template>
  <el-input v-bind="$attrs"
            v-on="$listeners"
            @blur="blur"></el-input>
</template>

<script>
export default {
  name: 'BaseInput',
  components: {},
  props: {
    /** v-model的值是否去掉前后空格*/
    trim: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  created() {},
  methods: {
    blur() {
      if (this.trim) {
        /**
         * 用户输入时触发，回调参数为input中的输入值
         * @type {Function}
         */
        this.$emit('input', this.$attrs.value.trim())
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
