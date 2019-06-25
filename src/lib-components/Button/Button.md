基本用法

```vue
<template>
  <base-button @click="handleClick" type="danger"> BUTTON </base-button>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleClick() {
      return new Promise((reslove, reject) => {
        setTimeout(() => {
          reslove('Hi')
        }, 2000)
      })
    }
  }
}
</script>
```
