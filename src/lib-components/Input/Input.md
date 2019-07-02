##### 功能介绍

1.  为 el-input 添加 trim 功能

##### 基本用法

```vue
<template>
<div>
  Text: {{text}}
  <base-input placeholder="自动trim" v-model="text" @blur="handleBlur"></base-input>
  slot：
  <base-input placeholder="自动trim" v-model="text" @blur="handleBlur">
    <i slot="suffix" class="el-input__icon el-icon-date"></i>
  </base-input>
</div>
</template>

<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    handleBlur(val) {
      console.log('失去焦点，text值为："' + val.target.value + '"')
    }
  }
}
</script>
```
