##### 功能介绍

1.  异步请求 loading 处理
2.  el-button 与 router-link 结合 实现按钮链接

##### 基本用法

```vue
<template>
<div class="">
  <el-row>
    <el-col :span="12">{{data}}</el-col>
    <el-col :span="12">{{data2}}</el-col>
  </el-row>
  <el-row>
    <el-col :span="12">
      <base-tree :data="data" :props="{label: 'name'}" :group="{name:'group'}">
        <template slot="label" slot-scope="{item}">
          <div slot="label-content" class="clearfix" v-if="item">
          {{item.name}} 
          <i class="el-icon-circle-plus-outline icon"></i>
          <i class="el-icon-delete icon"></i>
          </div>
        </template>
      </base-tree>
    </el-col>
    <el-col :span="12" :style="{backgroundColor: '#ececec'}">
      <base-tree :data="data2" :props="{label: 'name'}" :group="{name:'group', pull: 'clone', put: false}">
        <template slot="label" slot-scope="{item}">
          <div slot="label-content" class="clearfix" v-if="item">
          {{item.name}} 
          <i class="el-icon-circle-plus-outline icon"></i>
          <i class="el-icon-delete icon"></i>
          </div>
        </template>
      </base-tree>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          name: '河北省',
          id: 1,
          children: [
            {
              name: '石家庄市',
              id: 11,
              children: []
            },
            {
              name: '保定市',
              id: 12,
              children: [
                {
                  name: '高碑店市',
                  id: 121,
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: '浙江省',
          id: 2,
          children: [
            {
              name: '杭州市',
              id: 21,
              children: []
            },
            {
              name: '嘉兴市',
              id: 22,
              children: [
                {
                  name: '海宁市',
                  id: 221,
                  children: []
                }
              ]
            }
          ]
        }
      ],
      data2: [
        {
          name: '河北省2',
          id: 1,
          children: [
            {
              name: '石家庄市2',
              id: 11,
              children: []
            },
            {
              name: '保定市2',
              id: 12,
              children: [
                {
                  name: '高碑店市2',
                  id: 121,
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: '浙江省2',
          id: 2,
          children: [
            {
              name: '杭州市2',
              id: 21,
              children: []
            },
            {
              name: '嘉兴市2',
              id: 22,
              children: [
                {
                  name: '海宁市2',
                  id: 221,
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleClick1() {
      return new Promise((reslove, reject) => {
        setTimeout(() => {
          reslove('Hi')
          this.$message('click button1')
        }, 2000)
      })
    },
    handleClick2() {
      this.$message('click button2')
    }
  }
}
</script>
<style>
.icon {
  line-height: 20px;
  float: right;
  margin-left: 5px;
}
</style>
```
