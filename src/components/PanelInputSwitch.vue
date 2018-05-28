<template>
  <div class="panel-inner">
    <div class="panel-content"><i class="material-icons">{{ iconify }}</i></div>
    <div class="panel-title">{{ name }}</div>
  </div>
</template>

<script>
const icons = {
  nan: 'hourglass_empty',
  on: 'link',
  off: 'link_off'
}

export default {
  name: 'PanelStateSwitch',
  props: ['resource', 'name'],
  computed: {
    iconify () {
      const data = this.$store.state.service.resources[this.resource]
      if (data && data.state !== undefined) {
        return data.state ? icons.on : icons.off
      }
      return icons.nan
    }
  }
}
</script>
