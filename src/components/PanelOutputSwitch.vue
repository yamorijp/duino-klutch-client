<template>
  <div class="panel-inner clickable" @click="toggle">
    <div class="panel-content"><i class="material-icons">{{ iconify }}</i></div>
    <div class="panel-title">{{name}}</div>
  </div>
</template>

<script>
import client from '../api/client'

const icons = {
  nan: 'hourglass_empty',
  on: 'flash_on',
  off: 'flash_off'
}

export default {
  name: 'PanelInputSwitch',
  props: ['resource', 'name'],
  computed: {
    iconify () {
      const data = this.$store.state.service.resources[this.resource]
      if (data && data.state !== undefined) {
        return data.state ? icons.on : icons.off
      }
      return icons.nan
    }
  },
  methods: {
    async toggle () {
      await client(this, this.resource + '/toggle')
    }
  }
}
</script>
