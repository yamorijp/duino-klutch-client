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
  on: 'monitor',
  off: 'desktop_access_disabled'
}

export default {
  name: 'PanelDisplay',
  props: ['resource', 'name'],
  data () {
    return {
      popperOptions: {}
    }
  },
  computed: {
    iconify () {
      return this.resourceData ? icons.on : icons.nan
    },
    resourceData () {
      const data = this.$store.state.service.resources[this.resource]
      return data || null
    },
    tipContent () {
      return this.resourceData ? 'OK' : 'Unavailable'
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
