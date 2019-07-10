<script>
import Vue from 'vue'
export default new Vue({
  name: 'EventBus',
  data() {
    return {
      activeValue: {}
    }
  },

  created() {
    this.$on('active', this.active)
  },
  methods: {
    /**
     * @description: 触发选择
     * @param value {string} 值
     * @return:
     */
    active(data) {
      const {id, value} = data
      let obj = {}
      if (this.activeValue[id] === value) {
        obj[id] = null
        this.activeValue = {...this.activeValue, ...obj}
      } else {
        obj[id] = value
        this.activeValue = {...this.activeValue, ...obj}
      }
      // console.log('activeValue: ', this.activeValue)
    }
  }
})
</script>
