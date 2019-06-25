基本用法

```vue
<template>
  <base-input placeholder='请输入' v-model='text' @blur='handleBlur'></base-input>
</template>

<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    handleBlur() {
      console.log('text值为："' + this.text + '"')
    }
  }
}
</script>
```
