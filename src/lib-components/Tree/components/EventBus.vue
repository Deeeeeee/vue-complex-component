<script>
import Vue from 'vue'
export default new Vue({
  name: 'EventBus',
  data() {
    return {
      activeValue: null
    }
  },
  created() {
    this.$on('active', this.active)
  },
  methods: {
    active(value) {
      // console.log('activeValue: ', this.activeValue)
      // console.log('value:', value)
      this.activeValue === value
        ? (this.activeValue = null)
        : (this.activeValue = value)
    }
  }
})
</script>
