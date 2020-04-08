##### 功能介绍

1.  异步请求 loading 处理
2.  el-button 与 router-link 结合 实现按钮链接

##### 基本用法

```vue
<template>
<div>
  <base-button :on-click="handleClick1" type="danger"> Async Button </base-button>
  <base-button :loading="true" type="primary"> Loading Button </base-button>
  <base-button @click="handleClick2" type="warning"> Base Button </base-button>
  <base-button :link="{path:'/home',query:{id:100}}" type="success"> Link Button </base-button>
  <base-button outLink="http://www.baidu.com" type="success"> Out Link Button </base-button>
</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleClick1() {
      return new Promise((reslove, reject) => {
        setTimeout(() => {
          reslove('Hi')
          this.$message('click button1')
        }, 2000)
      })
    },
    handleClick2() {
      this.$message('click button2')
    }
  }
}
</script>
```
