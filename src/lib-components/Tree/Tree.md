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
  <el-row :gutter="20">
    <el-col :span="12" class="box">
      <base-tree :data="data" :props="{label: 'name',key:'uid'}" :group="{name:'group',animation: 200,}" :hidden="{key:'hidden', value: true}" :handleItemClick="onSelect">
        <template slot="label" slot-scope="{item}">
          {{item.name}}
          <i class="el-icon-circle-plus-outline icon"></i>
          <i class="el-icon-delete icon"></i>
        </template>
      </base-tree>
    </el-col>
    <el-col :span="12" class="box">
      <base-tree :data="data2" :props="{label: 'name',key:'uid'}" :group="{name:'group', pull: 'clone', put: false}">
        <template slot="label" slot-scope="{item}">
          {{item.name}} 
          <i class="el-icon-circle-plus-outline icon"></i>
          <i class="el-icon-delete icon"></i>
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
      current: '',
      data: [
        {
          name: '河北省',
          id: 1,
          uid: '1',
          children: [
            {
              name: '石家庄市',
              id: 11,
              uid: '11',
              children: []
            },
            {
              name: '保定市',
              id: 12,
              uid: '12',
              children: [
                {
                  name: '驴肉火烧',
                  hidden: true,
                  id: 121,
                  uid: '121',
                  children: []
                },
                {
                  name: '高碑店市',
                  id: 122,
                  uid: '122',
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: '浙江省',
          id: 2,
          uid: '2',
          children: [
            {
              name: '杭州市',
              id: 21,
              uid: '21',
              children: []
            },
            {
              name: '嘉兴市',
              id: 22,
              uid: '22',
              children: [
                {
                  name: '海宁市',
                  id: 221,
                  uid: '221',
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
          uid: '_1',
          children: [
            {
              name: '石家庄市2',
              id: 11,
              uid: '_11',
              children: []
            },
            {
              name: '保定市2',
              id: 12,
              uid: '_12',
              children: [
                {
                  name: '高碑店市2',
                  id: 121,
                  uid: '_121',
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: '浙江省2',
          id: 2,
          uid: '_2',
          children: [
            {
              name: '杭州市2',
              id: 21,
              uid: '_21',
              children: []
            },
            {
              name: '嘉兴市2',
              id: 22,
              uid: '_22',
              children: [
                {
                  name: '海宁市2',
                  id: 221,
                  uid: '_221',
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
    onSelect(item) {},
    handleClick2() {
      this.$message('click button2')
    }
  }
}
</script>
<style>
.icon {
  line-height: 40px;
  float: right;
  margin-left: 5px;
}
.box {
  border: 1px solid #efefef;
  padding: 10px;
}
</style>
```
