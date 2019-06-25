基本用法

```vue
<template>
  <button-async :onClick="handleClick" type="danger"> BUTTON </button-async>
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
