<template>
  <router-link v-if="link"
               class="el-button--link"
               :to="link"
               :target='target'>
    <el-button v-bind="$attrs">
      <slot></slot>
    </el-button>
  </router-link>
  <a v-else-if="outLink"
     class="el-button--link"
     :href="outLink"
     :target='target'>
    <el-button v-bind="$attrs">
      <slot></slot>
    </el-button>
  </a>

  <el-button v-else
             v-bind="$attrs"
             :loading="onClick ? isLoading : loading"
             @click="handleClick">
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: 'BaseButton',
  components: {},
  props: {
    /** 点击事件 返回Promise*/
    onClick: {
      type: Function
    },
    loading: {
      type: Boolean
    },
    /**  开启内部跳转模式 参数参考router-link*/
    link: {
      type: [Object, String]
    },
    /**  开启外部跳转模式 参数参考a标签*/
    outLink: {
      type: String
    },
    /** 跳转模式 页面打开方式 */
    target: {
      type: String,
      default: '_self'
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  watch: {},
  computed: {},
  created() {
    console.log(this.$route)
  },
  methods: {
    /** 点击事件 */
    handleClick() {
      if (this.onClick) {
        this.isLoading = true
        try {
          this.onClick().finally(() => {
            this.isLoading = false
          })
        } catch (err) {
          console.warn(err)
          this.isLoading = false
        }
      } else if (this.$listeners.click) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style scoped>
.el-button--link + .el-button,
.el-button + .el-button--link,
.el-button--link + .el-button--link {
  margin-left: 10px;
}
</style>
