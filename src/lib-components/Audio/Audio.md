<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-21 14:50:50
 * @LastEditTime: 2019-08-28 15:11:21
 * @LastEditors: Please set LastEditors
 -->

##### 功能介绍

1.  基于 audio 标签的音频播放器

##### 基本用法

```vue
<template>
<div>
  <div v-for="(item, index) in itemList" :key="index" style="padding: 0px 0px 20px;">
    <div style="color: #666;padding: 5px 0px;">{{item.descriptor}}</div>
    <base-audio
      :src="item.src"
      :progress-disabled="item.disabled"
      @timeupdate="onTimeUpdate"
      ></base-audio>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      itemList: [
        {
          src: 'https://oss.zhihanyun.com/1566972132184_2.mp3',
          disabled: false,
          descriptor: '默认' // 用于描述，并不是配置的属性
        },
        {
          src: 'https://oss.zhihanyun.com/1566972132184_2.mp3',
          disabled: true,
          descriptor: '禁止改变进度' // 用于描述，并不是配置的属性
        }
      ]
    }
  },
  methods: {
    onTimeUpdate(e) {
      console.log(e.target.currentTime)
    }
  }
}
</script>
```
