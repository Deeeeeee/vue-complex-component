<!--
 * @Description: 树形列表组件 支持跨树拖拽 隐藏指定项
 * @Author: Dean
 * @Date: 2019-07-02 10:29:01
 * @LastEditTime: 2019-07-10 20:23:25
 * @LastEditors: Please set LastEditors
 * @Todo 1.背景色修改 2.返回索引
-->

<template>
  <draggable class="base-tree drag-area"
             :uid="uid"
             tag="ul"
             v-bind="$attrs"
             v-on="$listeners"
             ghostClass="tree-gost"
             filter=".no-data"
             :clone="clone"
             :list="data"
             :group="group">
    <div class="no-data"
         v-if="depth===1 && data.length === 0">暂无数据</div>
    <li v-for="(item,index) in data"
        :data-uid="item.uid"
        v-else
        class="base-tree-item"
        :key="item[props.key || 'id']">
      <p class="base-tree-item-inner"
         :class="{current: activeValue === item.uid}"
         @click="handleClick(item)">
        <i class="el-icon-caret-bottom"
           v-if="_canFold(item)"
           :class="{fold: _isFold(item.uid)}"
           @click.stop="toggleFold(item.uid)"></i>
        <slot name="label"
              :item="item"
              :$index="index">
          {{ item[props.label || 'label'] }}
        </slot>
      </p>
      <base-tree :uid="uid"
                 v-bind="$attrs"
                 v-on="$listeners"
                 v-if="!isOneLevel"
                 :data="item[props.children || 'children']"
                 :class="{fold: _isFold(item.uid)}"
                 v-show="!_isFold(item.uid)"
                 filter=".no-data"
                 :handleItemClick="handleItemClick"
                 :handleItemClone="handleItemClone"
                 :group="group"
                 :props="props"
                 :depth="depth + 1">
        <template slot="label"
                  slot-scope="{item, $index}">
          <slot name="label"
                :item="item"
                :$index="$index">>
            <!-- {{ item[props.label || 'label'] }} -->
          </slot>
        </template>
      </base-tree>
    </li>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import EventBus from './components/EventBus.vue'
import {log} from 'util'
export default {
  name: 'BaseTree',
  components: {
    draggable
  },
  props: {
    uid: {
      type: String
    },
    /**
     * 传入的列表数据 使用v-model绑定
     */
    value: {
      type: Array,
      default: null
    },
    /**
     * 传入的列表数据 使用 :data 绑定
     */
    data: {
      type: Array,
      default: null
    },
    /** item参数配置 */
    props: {
      type: Object,
      default: () => {
        return {
          // label: 'label',
          // key: 'id',
          // children: 'childeren'
        }
      }
    },
    /** 组名 */
    group: {
      type: Object,
      required: true
    },
    /** 列表项点击事件 返回Promise*/
    handleItemClick: {
      type: Function
    },
    /** clone并脱出时 返回Promise*/
    handleItemClone: {
      type: Function
    },
    /** 层深*/
    depth: {
      type: Number,
      default: 1
    },
    isOneLevel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      folds: [],
      drag: false
    }
  },
  watch: {},
  computed: {
    activeValue() {
      return EventBus.activeValue[this.uid]
    }
  },
  created() {
    if (this.depth === 1 && this.handleItemClick) {
      EventBus.$emit('active', {id: this.uid, value: null})
    }
  },
  methods: {
    onStart(event) {
      // console.log(event.originalEvent.ctrlKey)
    },
    onOver(event) {
      console.log(1)
    },
    clone(data) {
      let copy = JSON.parse(JSON.stringify(data))
      let isClone = this.group && this.group.pull === 'clone'
      let newData = isClone ? this._setUId(copy) : copy
      this.handleItemClone && this.handleItemClone(newData)
      return newData
    },
    /** 点击事件 */
    handleClick(item) {
      if (this.handleItemClick) {
        EventBus.$emit('active', {id: this.uid, value: item.uid})
        this.handleItemClick(item)
      }
    },
    /**
     * @description: 选中状态
     * @param uid  {string}
     * @return:
     */
    toggleFold(uid) {
      if (this._isFold(uid)) {
        this.folds.splice(this.folds.indexOf(uid), 1)
      } else {
        this.folds.push(uid)
      }
    },

    /**
     * @description: 获取唯一ID
     * @param {type}
     * @return: 唯一ID
     */
    _guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
        c
      ) {
        let r = (Math.random() * 16) | 0
        let v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    },
    /**
     * @description: 递归设置拖拽数据的uid
     * @param data {object} 拖拽目标对应的数据
     * @return: {obj} 设置了唯一ID的新数据
     */
    _setUId(data) {
      data.uid = this._guid()
      if (data[this.props.children || 'children']) {
        data[this.props.children || 'children'].map(item => {
          this._setUId(item)
        })
      }
      return data
    },
    /**
     * @description: 是否折叠
     * @param uid {string}
     * @return: {boolean}
     */
    _isFold(uid) {
      return this.folds.indexOf(uid) > -1
    },
    /**
     * @description: 是否显示折叠按钮
     * @param item {object}
     * @return: {boolean}
     */
    _canFold(item) {
      let flag
      let children = item[this.props.children || 'children']
      if (children && children.length > 0) {
        flag = true
      } else {
        flag = false
      }
      return flag
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped>
ul,
li,
p {
  padding: 0;
  margin: 0;
  list-style: none;
}
.base-tree {
  font-size: 14px;
  transition: 0.3s;
  /* padding-bottom: 5px; */
  /* padding-left: 0; */
}
.base-tree-item {
  padding-left: 20px;
  line-height: 40px;
}
.base-tree-item-inner {
  position: relative;
  padding: 5px;
  padding-left: 20px;
  cursor: pointer;
  border: solid #ccc 1px;
  background-color: #fff;
  transition: 0.3s;
}
/*
.base-tree-item-inner:hover {
} */
.base-tree-item-inner.current {
  background-color: aliceblue !important;
}
.el-icon-caret-bottom {
  /* position: absolute;
  top: 50%;
  margin-top: -7px;
  left: 5px; */
  margin-left: -18px;
  transition: 0.3s;
  width: 14px;
  height: 14px;
  text-align: center;
  display: inline-block;
}
.el-icon-caret-bottom.fold {
  transform: rotate(-90deg);
}

.flip-list-move {
  transition: transform 0.5s;
}
.border-current {
  border-top: 1px solid blueviolet;
}
.no-data {
  color: #999;
  line-height: 50px;
  text-align: center;
}
</style>
