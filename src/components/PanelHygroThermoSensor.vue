<template>
  <el-tooltip :open-delay="1000" :content="tipContent">
    <div class="panel-inner">
      <div class="panel-content">
        <animated-number class="temperature" :value="temperature" />
        <small>°C</small><animated-number class="humidity" :value="humidity" />
        <small>%</small>
      </div>
      <div class="panel-title">{{name}}</div>
    </div>
  </el-tooltip>
</template>

<script>
import AnimatedNumber from './AnimatedNumber'

export default {
  name: 'PanelHygroThermoSensor',
  components: {AnimatedNumber},
  props: ['resource', 'name'],
  computed: {
    temperature () {
      const data = this.$store.state.service.resources[this.resource]
      return data && data.temperature ? data.temperature : null
    },
    humidity () {
      const data = this.$store.state.service.resources[this.resource]
      return data && data.humidity ? data.humidity : null
    },
    tipContent () {
      const data = this.$store.state.service.resources[this.resource]
      if (data && data.temperature && data.humidity) {
        return `T:${data.temperature}, H:${data.humidity}`
      } else {
        return 'Unavailable'
      }
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
