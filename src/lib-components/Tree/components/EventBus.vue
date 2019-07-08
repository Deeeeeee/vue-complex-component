<script>
import Vue from 'vue'
export default new Vue({
  name: 'EventBus',
  data() {
    return {
      activeValue: ''
    }
  },
  created() {
    this.$on('active', this.active)
  },
  methods: {
    active(value) {
      this.activeValue === value ? null : (this.activeValue = value)
    }
  }
})
</script>
