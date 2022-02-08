<template>
  <el-tooltip :open-delay="1000" :content="tipContent" :popper-options="popperOptions">
    <div class="panel-inner clickable" @click="clear">
      <div class="panel-content"><i class="material-icons">{{ iconify }}</i></div>
      <div class="panel-title">{{name}}</div>
    </div>
  </el-tooltip>
</template>

<script>
import client from '../api/client'

const icons = {
  nan: 'hourglass_empty',
  on: 'volume_up',
  off: 'volume_mute'
}

export default {
  name: 'PanelBuzzer',
  props: ['resource', 'name'],
  data () {
    return {
      popperOptions: {}
    }
  },
  computed: {
    iconify () {
      const data = this.resourceData
      if (data) {
        return data.repeating ? icons.on : icons.off
      }
      return icons.nan
    },
    resourceData () {
      const data = this.$store.state.service.resources[this.resource]
      return data || null
    },
    tipContent () {
      const data = this.resourceData
      if (data) {
        return data.repeating ? 'Repeating' : 'OK'
      } else {
        return 'Unavailable'
      }
    }
  },
  methods: {
    async clear () {
      if (!this.$store.state.service.requesting) {
        await client(this, this.resource + '/clear')
      }
    }
  }
}
</script>
