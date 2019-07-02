<template>
  <draggable class="base-tree drag-area"
             tag="ul"
             v-bind="$attrs"
             v-on="$listeners"
             :list="data"
             :group="group">
    <!-- {{'attrs:' + JSON.stringify($attrs)}} -->
    <li v-for="item in data"
        class="base-tree-item"
        :key="item[props.key || 'id']">
      <p class="base-tree-item-inner"
         @click="handleClick(item)">
        <slot name="label"
              :item="item">
          {{ item[props.label || 'label'] }}
        </slot>
      </p>
      <base-tree v-bind="$attrs"
                 :data="item[props.children || 'children']"
                 :group="group"
                 :props="props">
        <template slot="label"
                  slot-scope="{item}">
          <slot name="label"
                :item="item">
            <!-- {{ item[props.label || 'label'] }} -->
          </slot>
        </template>
      </base-tree>
    </li>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'BaseTree',
  components: {
    draggable
  },
  props: {
    /** 传入的列表数据 */
    data: {
      type: Array,
      default: () => []
    },
    /** item参数配置 */
    props: {
      type: Object,
      default: () => {
        return {
          // label: 'label',
          // key: 'id',
          // children: 'childeren',
          // disabled: false
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
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  watch: {},
  computed: {},
  created() {},
  methods: {
    /** 点击事件 */
    handleClick(item) {
      console.log(item)
      this.handleItemClick && this.handleItemClick(item)
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
  /* padding-bottom: 5px; */
  /* padding-left: 0; */
}
.base-tree {
  padding-bottom: 5px;
}
.base-tree-item {
  padding-left: 20px;
}
.base-tree-item:first-child {
  /* margin-top: 5px; */
}
.base-tree-item-inner {
  padding: 5px;
  cursor: pointer;
}
.base-tree-item-inner:hover,
.base-tree-item-inner.current {
  background-color: #f5f7fa;
}
</style>
