<template>
  <el-tooltip :open-delay="1000" :content="tipContent">
    <div class="panel-inner">
      <div class="panel-content"><i class="material-icons">{{ iconify }}</i></div>
      <div class="panel-title">{{name}}</div>
    </div>
  </el-tooltip>
</template>

<script>
const icons = {
  nan: 'hourglass_empty',
  low: 'brightness_low',
  medium: 'brightness_medium',
  high: 'brightness_high'
}

export default {
  name: 'PanelAnalogSensor',
  props: ['resource', 'name'],
  computed: {
    iconify () {
      const data = this.$store.state.service.resources[this.resource]
      if (data && data.value) {
        if (data.value > 700) return icons.low
        if (data.value > 300) return icons.medium
        if (data.value > 0) return icons.high
      }
      return icons.nan
    },
    tipContent () {
      const data = this.$store.state.service.resources[this.resource]
      if (data && data.value) {
        return 'V:' + data.value
      } else {
        return 'Unavailable'
      }
    }
  }
}
</script>
