基本用法

```vue
<template>
  <base-input placeholder='请输入' v-model='text' @blur='handleBlur' @input='handlerInput'></base-input>
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
      console.log('失去焦点，text值为："' + this.text + '"')
    },
    handlerInput() {
      console.log('输入中')
    }
  }
}
</script>
```
