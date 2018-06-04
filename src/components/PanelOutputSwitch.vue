<template>
  <el-tooltip :open-delay="1000" :content="tipContent" :popper-options="popperOptions">
    <div class="panel-inner clickable" @click="toggle">
      <div class="panel-content"><i class="material-icons">{{ iconify }}</i></div>
      <div class="panel-title">{{name}}</div>
    </div>
  </el-tooltip>
</template>

<script>
import client from '../api/client'
import moment from 'moment'

const icons = {
  nan: 'hourglass_empty',
  on: 'flash_on',
  off: 'flash_off'
}

export default {
  name: 'PanelInputSwitch',
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
    async toggle () {
      if (!this.$store.state.service.requesting) {
        await client(this, this.resource + '/toggle')
      }
    },
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
