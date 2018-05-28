<template>
  <div class="panel-inner clickable next" @click="next">
    <div class="panel-content"><i class="material-icons">settings_remote</i></div>
    <div class="panel-title">{{name}}</div>
  </div>
</template>

<script>
export default {
  name: 'PanelIrTransmitter',
  props: ['resource', 'name', 'x'],
  methods: {
    next () {
      this.$router.push({
        name: this.x ? 'irx' : 'ir',
        query: {resource: this.resource, name: this.name}
      })
    }
  }
}
</script>
