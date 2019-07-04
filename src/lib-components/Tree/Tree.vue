<!--
 * @Description: 树形列表组件 支持跨树拖拽 隐藏指定项
 * @Author: Dean
 * @Date: 2019-07-02 10:29:01
 * @LastEditTime: 2019-07-04 11:47:59
 * @LastEditors: Please set LastEditors
 -->
<template>
  <draggable class="base-tree drag-area"
             tag="ul"
             ref="BaseTree"
             v-bind="$attrs"
             v-on="$listeners"
             ghostClass="tree-gost"
             :clone="clone"
             :list="data"
             :group="group"
             :value="value"
             :current="current"
             :move="onMove"
             @input="emitter">
    <!-- {{'attrs:' + JSON.stringify($attrs)}} -->
    <!-- {{'current:' + this.current}} -->

    <!-- <transition-group type="transition" :name="!drag ? 'flip-list' : null"> -->
    <!-- <transition-group type="transition"
                      name="flip-list"> -->
    <li v-for="item in realValue"
        v-if="!(item[hidden.key] && item[hidden.key] === hidden.value)"
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
              :item="item">
          {{ item[props.label || 'label'] }}
        </slot>
      </p>
      <base-tree v-bind="$attrs"
                 :data="item[props.children || 'children']"
                 :class="{fold: _isFold(item.uid)}"
                 v-show="!_isFold(item.uid)"
                 :group="group"
                 :props="props"
                 :depth="depth + 1"
                 :hidden="hidden">
        <template slot="label"
                  slot-scope="{item}">
          <slot name="label"
                :item="item">
            <!-- {{ item[props.label || 'label'] }} -->
          </slot>
        </template>
      </base-tree>
    </li>
    <!-- </transition-group> -->
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
    // },
    /** 隐藏参数配置 */
    hidden: {
      type: Object,
      default: () => {
        return {
          // key: 'hidden',
          // value: true,
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
    /** 选中项*/
    current: {
      type: String,
      default: ''
    },
    /** 层深*/
    depth: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      folds: [],
      drag: false
      // current: ''
    }
  },
  watch: {},
  computed: {
    realValue() {
      return this.value ? this.value : this.data
    },
    activeValue() {
      return EventBus.activeValue
    }
  },
  created() {},
  methods: {
    onStart(event) {
      // console.log(event.originalEvent.ctrlKey)
    },
    onOver(event) {
      console.log(1)
    },

    onMove(evt, originalEvent) {
      // this.$refs.BaseTree.save()
      // console.log(originalEvent.clientY)
      // console.log(evt.dragged)
      // console.log(evt.draggedRect)
      // console.log(evt.dragged.className)
      // if (document.querySelector('.border-current')) {
      //   document
      //     .querySelector('.border-current')
      //     .classList.remove('border-current')
      // }
      // evt.related.classList.add('border-current')
      // console.log(evt.relatedRect)
      // console.log(originalEvent.clientY)
    },
    clone(data) {
      let copy = JSON.parse(JSON.stringify(data))
      let isClone = this.group && this.group.pull === 'clone'
      return isClone ? this._setUId(copy) : copy
    },
    emitter(value) {
      this.$emit('input', value)
    },
    /** 点击事件 */
    handleClick(item) {
      EventBus.$emit('active', item.uid)
      this.handleItemClick && this.handleItemClick(item)
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
        flag =
          children.filter(item => item[this.hidden.key] !== this.hidden.value)
            .length > 0
      } else {
        flag = false
      }
      return flag
    }
  }
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
.base-tree.fold {
  /* height: 0; */
  /* overflow: hidden; */
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
  border: solid #ececec 1px;
  background-color: #fff;
  transition: 0.3s;
}

.base-tree-item-inner:hover {
  /* background-color: aliceblue; */
}
.base-tree-item-inner.current {
  background-color: darkseagreen;
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

.tree-gost {
  /* background-color: aliceblue; */
}
.border-current {
  border: 1px solid blue;
}
</style>
