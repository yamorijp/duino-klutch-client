<template>
  <el-tooltip :open-delay="1000" :content="tipContent" :popper-options="popperOptions">
    <div class="panel-inner">
      <div class="panel-content"><i class="material-icons">{{ iconify }}</i></div>
      <div class="panel-title">{{ name }}</div>
    </div>
  </el-tooltip>
</template>

<script>
import moment from 'moment'

const icons = {
  nan: 'hourglass_empty',
  on: 'link',
  off: 'link_off'
}

export default {
  name: 'PanelStateSwitch',
  props: ['resource', 'name'],
  data () {
    return {
      tipContent: 'Unavailable', // 現在日時を使用するのでcomputedで作成しない
      popperOptions: {
        onUpdate: this.updateTipContent
      }
    }
  },
  computed: {
    iconify () {
      const data = this.resourceData
      if (data) {
        return data.state ? icons.on : icons.off
      }
      return icons.nan
    },
    resourceData () {
      const data = this.$store.state.service.resources[this.resource]
      return (data && data.state !== undefined) ? data : null
    }
  },
  watch: {
    'resourceData' () {
      this.updateTipContent()
    }
  },
  methods: {
    updateTipContent () {
      const data = this.resourceData
      if (data) {
        this.tipContent = `Turned ${data.state ? 'ON' : 'OFF'} ${moment.unix(data.updated).fromNow()}`
      } else {
        this.tipContent = 'Unavailable'
      }
    }
  }
}
</script>
