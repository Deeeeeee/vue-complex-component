基本用法

```vue
<template>
  <base-panel title="标题">
    lorem ...
  </base-panel>
</template>

<template>
  <base-panel>
    <div slot="head">标题 <i class="el-icon-user"></i> </div>
    lorem ...
  </base-panel>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleClick(){
      return new Promise((reslove,reject) => {
        setTimeout(() => {
          reslove('Hi')
        },2000)
      })
    }
  }
}
</script>
```