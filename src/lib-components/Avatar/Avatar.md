##### 功能介绍

1.  基于 element-ui
2.  传入指定参数，实现各种样式头像。

##### 基本用法

```vue
<template>
<div>
  <div v-for="(item, index) in itemList" :key="index" style="padding: 0px 0px 20px;">
    <div style="color: #666;padding: 5px 0px;">{{item.descriptor}}</div>
    <avatar
      :url="item.url"
      :radius="item.avatarRadius"
      :fit="item.fit"
      :personName="item.personName"
      :backgroundColor="item.backgroundColor"
      :color="item.color"
      :width="item.width"
      :height="item.height"></avatar>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      itemList: [
        {
          url:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          avatarRadius: '',
          fit: 'fill',
          backgroundColor: '',
          color: '',
          width: '',
          height: '',
          descriptor: '图片头像' // 用于描述，并不是配置的属性
        },
        {
          url:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          avatarRadius: '50%',
          fit: 'fill',
          backgroundColor: '',
          color: '',
          width: '',
          height: '',
          descriptor: '设置了边框的角度' // 用于描述，并不是配置的属性
        },
        {
          url:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          avatarRadius: '50%',
          fit: 'fill',
          backgroundColor: '',
          color: '',
          width: '150px',
          height: '150px',
          descriptor: '设置了宽高' // 用于描述，并不是配置的属性
        },
        {
          avatarRadius: '50%',
          fit: 'fill',
          backgroundColor: '',
          color: '',
          width: '',
          height: '',
          descriptor: '图片加载失败' // 用于描述，并不是配置的属性
        },
        {
          url: '',
          avatarRadius: '50%',
          fit: 'fill',
          personName: '诸葛孔明',
          backgroundColor: '',
          color: '',
          width: '',
          height: '',
          descriptor: '文字头像' // 用于描述，并不是配置的属性
        },
        {
          url: '',
          avatarRadius: '50%',
          fit: 'fill',
          personName: '曹操孟达',
          backgroundColor: '#67C23A',
          color: 'purple',
          width: '',
          height: '',
          descriptor: '改变背景色和字体色' // 用于描述，并不是配置的属性
        },
        {
          url: '',
          avatarRadius: '50%',
          fit: 'fill',
          personName: '诸葛亮',
          backgroundColor: '',
          color: '',
          width: '',
          height: '',
          descriptor: '文字大小跟着长度自适应' // 用于描述，并不是配置的属性
        },
        {
          url: '',
          avatarRadius: '50%',
          fit: 'fill',
          personName: '诸葛亮亮亮亮',
          backgroundColor: '',
          color: '',
          width: '',
          height: '',
          descriptor: '文字超过5个字，只显示第一个' // 用于描述，并不是配置的属性
        }
      ]
    }
  },
  methods: {}
}
</script>
```
