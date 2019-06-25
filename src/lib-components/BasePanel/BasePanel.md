基本用法

```vue
<!-- <template>
  <base-panel title="标题">
    lorem ...
    lorem ...
    lorem ...
    lorem ...
  </base-panel>
</template> -->

<template>
  <base-panel class="m20">
    <div slot="head">标题 <i class="el-icon-user"></i> </div>
    lorem ... <br/>  
    lorem ... <br/>  
    lorem ... <br/>  
    lorem ... <br/>  
    lorem ... <br/>  
    lorem ... <br/>  
    lorem ... <br/>  
    lorem ... <br/>  
    lorem ...
  </base-panel>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>
<style>
.m20 {
  margin: 20px;
}
</style>
```
