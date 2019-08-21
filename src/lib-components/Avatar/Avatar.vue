<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-21 14:50:50
 * @LastEditTime: 2019-08-21 15:31:30
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <div class="demo-image">
      <div class="block"
           v-if="!personName">
        <el-image :style="imageStyle"
                  :src="url"
                  :fit="fit">
          <div slot="error"
               class="image-slot"
               :style="NoImageStyle">
            <i class="el-icon-user"></i>
          </div>
        </el-image>
      </div>
    </div>
    <div class="personName"
         v-if="personName"
         :style="personNameStyle">
      {{trueName}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseAvatar',
  props: {
    /** 头像的图片地址，如果不传则显示空图片样式 */
    url: {
      type: String
    },
    /** 图片的边框角度（除了百分比，其他需带上像素单位）*/
    radius: {
      type: String
    },
    /** 确定图片如何适应容器框，fill / contain / cover / none / scale-down */
    fit: {
      type: String
    },
    /** 显示带名字的头像，会隐藏掉图片头像 */
    personName: {
      type: String
    },
    /** 带名字的头像的背景色 */
    backgroundColor: {
      type: String
    },
    /** 带名字的头像的字体色 */
    color: {
      type: String
    },
    /** 图片的宽度（除了百分比，其他需带上像素单位）*/
    width: {
      type: String
    },
    /** 图片的高度（除了百分比，其他需带上像素单位）*/
    height: {
      type: String
    }
  },
  data() {
    return {
      trueName: this.personName
    }
  },
  computed: {
    imageStyle() {
      return `width: ${this.width ? this.width : '100px'};
              height: ${this.height ? this.height : '100px'};
              border-radius: ${this.radius};`
    },
    fontSize() {
      let length = this.personName.length,
        times = 6 // 文字减小的倍数
      if (length > 4) {
        // 大于4个字, 减小倍数
        times = length * 0.96
      }
      if (length > 5) {
        // 大于5个字, 只显示第一个字
        this.trueName = this.personName.substring(0, 1)
        return '36px'
      }
      return 30 - (length - 2) * times + 'px'
    },
    personNameStyle() {
      return `backgroundColor: ${this.backgroundColor};
              color: ${this.color};
              borderRadius: ${this.radius};
              fontSize: ${this.fontSize};
              width: ${this.width};
              height: ${this.height};`
    },
    NoImageStyle() {
      return `width: ${this.width};
              height: ${this.height};
              borderRadius: ${this.radius};`
    }
  }
}
</script>

<style>
.personName {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background: #f56c6c;
  color: #fff;
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background: #f5f7fa;
  font-size: 24px;
}
.el-icon-user {
  color: #999;
  font-size: 30px;
}
</style>
