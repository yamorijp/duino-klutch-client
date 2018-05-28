<template>
  <div class="panel-inner">
    <div class="panel-content">
      <span class="temperature">{{temperature}}</span> <small>°C</small><span class="humidity">{{humidity}}</span> <small>%</small>
    </div>
    <div class="panel-title">{{name}}</div>
  </div>
</template>

<script>
export default {
  name: 'PanelHygroThermoSensor',
  props: ['resource', 'name'],
  computed: {
    temperature () {
      const data = this.$store.state.service.resources[this.resource]
      return data && data.temperature ? data.temperature : '--'
    },
    humidity () {
      const data = this.$store.state.service.resources[this.resource]
      return data && data.humidity ? data.humidity : '--'
    }
  }
}
</script>
<style lang="stylus" scoped>
.humidity
  border-left 1px solid #ccc
  padding-left 5px
  margin-left 5px
</style>
