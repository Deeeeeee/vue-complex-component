<template>
  <el-input v-bind="$attrs"
            v-on="$listeners"
            @blur="blur">
    <template slot='prefix'>
      <!-- @slot 输入框头部内容，只对 type="text" 有效 -->
      <slot name='prefix'></slot>
    </template>
    <template slot='suffix'>
      <!-- @slot 输入框尾部内容，只对 type="text" 有效 -->
      <slot name='suffix'></slot>
    </template> <template slot='prepend'>
      <!-- @slot 输入框前置内容，只对 type="text" 有效 -->
      <slot name='prepend'></slot>
    </template>
    <template slot='append'>
      <!-- @slot 输入框后置内容，只对 type="text" 有效 -->
      <slot name='append'></slot>
    </template>
  </el-input>
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

<style scoped>
</style>
